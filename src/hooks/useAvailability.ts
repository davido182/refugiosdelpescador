/**
 * useAvailability
 *
 * Hook que consulta la Netlify Function /availability y devuelve
 * las fechas bloqueadas en un formato fácil de usar con react-day-picker.
 *
 * Expone:
 *  - blockedDates: Date[] con cada día individual bloqueado
 *  - isLoading, isError, error: estado de la query
 *  - sources: estado de cada plataforma ("ok" | "error" | "not_configured")
 *  - isDateBlocked(date): función helper para verificar un día concreto
 *  - refetch: para forzar una recarga manual
 */

import { useQuery } from "@tanstack/react-query";
import { eachDayOfInterval, parseISO, isWithinInterval, startOfDay } from "date-fns";

// ─── Tipos (espejo del contrato de la Netlify Function) ───────────────────────

export interface BlockedRange {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD (checkout day — generalmente exclusivo)
  source: "booking" | "airbnb" | "manual";
  summary?: string;
}

export interface AvailabilityData {
  blocked: BlockedRange[];
  fetchedAt: string;
  sources: {
    booking: "ok" | "error" | "not_configured";
    airbnb: "ok" | "error" | "not_configured";
  };
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchAvailability(): Promise<AvailabilityData> {
  // En desarrollo local (vite dev) no hay Netlify Functions corriendo,
  // así que devolvemos datos vacíos para que el calendario funcione igual.
  if (import.meta.env.DEV && !import.meta.env.VITE_AVAILABILITY_URL) {
    console.info("[useAvailability] Modo DEV sin VITE_AVAILABILITY_URL — usando datos vacíos");
    return {
      blocked: [],
      fetchedAt: new Date().toISOString(),
      sources: { booking: "not_configured", airbnb: "not_configured" },
    };
  }

  const url = import.meta.env.VITE_AVAILABILITY_URL ?? "/.netlify/functions/availability";

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Error consultando disponibilidad: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<AvailabilityData>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAvailability() {
  const query = useQuery<AvailabilityData, Error>({
    queryKey: ["availability"],
    queryFn: fetchAvailability,
    staleTime: 30 * 60 * 1000,   // 30 min — la función ya cachea en el servidor
    gcTime: 60 * 60 * 1000,      // mantener en memoria 1 hora
    retry: 2,
    refetchOnWindowFocus: false,
  });

  /**
   * Expande los rangos bloqueados a un array de Date individuales.
   * react-day-picker los usa directamente como `disabled`.
   *
   * iCal convention: DTEND en reservas de días completos es el día
   * de checkout (exclusivo), así que usamos [start, end - 1 día].
   */
  const blockedDates: Date[] = [];

  if (query.data?.blocked) {
    for (const range of query.data.blocked) {
      try {
        const startDate = parseISO(range.start);
        // El día de checkout (end) suele estar disponible para nuevos huéspedes,
        // así que excluimos ese día final.
        const endDate = parseISO(range.end);
        // Si start === end, bloquear solo ese día
        const intervalEnd = endDate > startDate
          ? new Date(endDate.getTime() - 86400000) // restar 1 día
          : startDate;

        const days = eachDayOfInterval({ start: startDate, end: intervalEnd });
        blockedDates.push(...days);
      } catch {
        // Ignorar rangos con fechas inválidas
      }
    }
  }

  /**
   * Helper: devuelve true si el día dado está bloqueado.
   */
  function isDateBlocked(date: Date): boolean {
    if (!query.data?.blocked) return false;
    const d = startOfDay(date);
    return query.data.blocked.some((range) => {
      try {
        return isWithinInterval(d, {
          start: startOfDay(parseISO(range.start)),
          end: startOfDay(parseISO(range.end)),
        });
      } catch {
        return false;
      }
    });
  }

  return {
    blockedDates,
    isDateBlocked,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    sources: query.data?.sources,
    fetchedAt: query.data?.fetchedAt,
    refetch: query.refetch,
  };
}
