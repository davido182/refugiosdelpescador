/**
 * Netlify Function: availability
 *
 * Proxy serverless que lee los feeds iCal (.ics) de Booking.com y Airbnb,
 * parsea las fechas bloqueadas/reservadas y las devuelve como JSON.
 *
 * Por qué necesitamos esto: los navegadores bloquean fetch directo a URLs
 * externas de iCal por política CORS. Esta función corre en el servidor
 * y no tiene esa restricción.
 *
 * Variables de entorno requeridas (Netlify → Site settings → Env vars):
 *   ICAL_BOOKING_URL   — URL iCal exportada desde Booking.com Extranet
 *   ICAL_AIRBNB_URL    — URL iCal exportada desde Airbnb → Calendar → Export
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface BlockedRange {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD (checkout day, exclusive)
  source: "booking" | "airbnb" | "manual";
  summary?: string;
}

interface AvailabilityResponse {
  blocked: BlockedRange[];
  fetchedAt: string;
  sources: {
    booking: "ok" | "error" | "not_configured";
    airbnb: "ok" | "error" | "not_configured";
  };
}

// ─── Utilidades iCal ──────────────────────────────────────────────────────────

/**
 * Convierte una fecha iCal a formato YYYY-MM-DD.
 * Los valores iCal pueden ser:
 *   - DATE: 20250615
 *   - DATETIME: 20250615T150000Z  /  20250615T150000
 */
function icalDateToISO(raw: string): string {
  // Quitar sufijos de timezone y hora si los hay
  const clean = raw.replace(/T.*$/, "").trim();
  if (clean.length === 8) {
    return `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
  }
  return clean;
}

/**
 * Parsea el texto raw de un archivo .ics y extrae los rangos bloqueados.
 * Solo procesa VEVENT con STATUS:CONFIRMED, STATUS:TENTATIVE o sin STATUS
 * (cualquier evento = bloqueo de fecha).
 */
function parseIcal(icsText: string, source: "booking" | "airbnb"): BlockedRange[] {
  const ranges: BlockedRange[] = [];

  // Unfold líneas iCal (los valores pueden continuar en la línea siguiente con espacio/tab)
  const unfolded = icsText.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
  const lines = unfolded.split(/\r?\n/);

  let inEvent = false;
  let dtStart: string | null = null;
  let dtEnd: string | null = null;
  let summary: string | null = null;
  let status: string | null = null;

  for (const line of lines) {
    const upper = line.toUpperCase();

    if (upper === "BEGIN:VEVENT") {
      inEvent = true;
      dtStart = null;
      dtEnd = null;
      summary = null;
      status = null;
      continue;
    }

    if (upper === "END:VEVENT") {
      inEvent = false;
      // Ignorar eventos cancelados explícitamente
      if (status === "CANCELLED") continue;
      // Ignorar el evento especial de Airbnb "Airbnb (Not available)"
      // que a veces tiene dtStart sin dtEnd — lo incluimos igualmente
      if (dtStart) {
        const end = dtEnd ?? dtStart; // si no hay DTEND, bloquear solo ese día
        ranges.push({
          start: icalDateToISO(dtStart),
          end: icalDateToISO(end),
          source,
          summary: summary ?? undefined,
        });
      }
      continue;
    }

    if (!inEvent) continue;

    // DTSTART puede venir como DTSTART, DTSTART;VALUE=DATE, DTSTART;TZID=...
    if (upper.startsWith("DTSTART")) {
      dtStart = line.split(":").slice(1).join(":");
      continue;
    }
    if (upper.startsWith("DTEND")) {
      dtEnd = line.split(":").slice(1).join(":");
      continue;
    }
    if (upper.startsWith("SUMMARY")) {
      summary = line.split(":").slice(1).join(":").trim();
      continue;
    }
    if (upper.startsWith("STATUS")) {
      status = line.split(":").slice(1).join(":").trim().toUpperCase();
      continue;
    }
  }

  return ranges;
}

// ─── Fetch con timeout ────────────────────────────────────────────────────────

async function fetchIcal(url: string, timeoutMs = 8000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        // Algunos servidores rechazan requests sin User-Agent
        "User-Agent": "RefugiosdelPescador/1.0 (calendar-sync)",
        "Accept": "text/calendar, text/plain, */*",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

// ─── Handler principal ────────────────────────────────────────────────────────

export const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext
) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "public, max-age=1800", // cachear 30 min — los iCal no cambian al instante
    "Content-Type": "application/json",
  };

  // Preflight OPTIONS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const bookingUrl = process.env.ICAL_BOOKING_URL;
  const airbnbUrl = process.env.ICAL_AIRBNB_URL;

  const result: AvailabilityResponse = {
    blocked: [],
    fetchedAt: new Date().toISOString(),
    sources: {
      booking: bookingUrl ? "ok" : "not_configured",
      airbnb: airbnbUrl ? "ok" : "not_configured",
    },
  };

  // ── Fetch Booking.com ────────────────────────────────────────────────────
  if (bookingUrl) {
    try {
      const icsText = await fetchIcal(bookingUrl);
      const ranges = parseIcal(icsText, "booking");
      result.blocked.push(...ranges);
    } catch (err) {
      console.error("[availability] Booking.com iCal error:", err);
      result.sources.booking = "error";
    }
  }

  // ── Fetch Airbnb ─────────────────────────────────────────────────────────
  if (airbnbUrl) {
    try {
      const icsText = await fetchIcal(airbnbUrl);
      const ranges = parseIcal(icsText, "airbnb");
      result.blocked.push(...ranges);
    } catch (err) {
      console.error("[availability] Airbnb iCal error:", err);
      result.sources.airbnb = "error";
    }
  }

  // Ordenar por fecha de inicio
  result.blocked.sort((a, b) => a.start.localeCompare(b.start));

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(result),
  };
};
