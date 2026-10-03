import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { format, isSameDay } from "date-fns";
import { es as dateEs, enUS as dateEn } from "date-fns/locale";
import { ArrowLeft, RefreshCw, Calendar, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAvailability } from "@/hooks/useAvailability";
import { useLanguage } from "@/i18n/LanguageContext";
import { BOOKING_URL, AIRBNB_URL } from "@/i18n/translations";

import "react-day-picker/dist/style.css";

// ─── Sub-componente: estado de fuentes (Booking / Airbnb) ─────────────────────

interface SourceBadgeProps {
  label: string;
  status: "ok" | "error" | "not_configured" | undefined;
  statusLabels: { ok: string; error: string; not_configured: string };
}

function SourceBadge({ label, status, statusLabels }: SourceBadgeProps) {
  const icons = {
    ok: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />,
    error: <XCircle className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />,
    not_configured: <MinusCircle className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />,
  };

  const icon = status ? icons[status] : icons.not_configured;
  const text = status ? statusLabels[status] : statusLabels.not_configured;

  return (
    <div className="flex items-center gap-2 text-sm font-body">
      {icon}
      <span className="text-foreground font-medium">{label}</span>
      <span className="text-muted-foreground">— {text}</span>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

const Reservar = () => {
  const { t, lang } = useLanguage();
  const p = t.bookingPage;
  const { blockedDates, isLoading, isError, sources, fetchedAt, refetch } =
    useAvailability();

  // Rango de fechas seleccionado por el usuario
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});

  const dateLocale = lang === "es" ? dateEs : dateEn;

  // Formatear fecha de última actualización
  const updatedLabel =
    fetchedAt
      ? `${p.updatedAt}: ${format(new Date(fetchedAt), "d MMM yyyy HH:mm", { locale: dateLocale })}`
      : null;

  // ── Estilos custom para react-day-picker ────────────────────────────────────
  // Usamos CSS variables del proyecto en vez de sobreescribir con un archivo externo
  const rdpClassNames = {
    root: "rdp-custom",
    months: "flex flex-col sm:flex-row gap-8",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "font-display text-base text-foreground",
    nav: "space-x-1 flex items-center",
    nav_button:
      "h-8 w-8 bg-transparent p-0 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell:
      "text-muted-foreground rounded-md w-9 font-body text-[0.8rem] font-normal",
    row: "flex w-full mt-2",
    cell: "h-9 w-9 text-center text-sm p-0 relative",
    day: "h-9 w-9 p-0 font-body text-sm rounded-md hover:bg-secondary/80 transition-colors aria-selected:opacity-100",
    day_selected:
      "bg-primary text-cream hover:bg-primary/90 focus:bg-primary rounded-md",
    day_today: "font-bold text-primary underline",
    day_outside: "text-muted-foreground/30 pointer-events-none",
    day_disabled:
      "text-muted-foreground/40 line-through bg-secondary/40 cursor-not-allowed hover:bg-secondary/40",
    day_range_middle: "rounded-none bg-primary/10 text-foreground",
    day_range_start: "bg-primary text-cream rounded-l-md",
    day_range_end: "bg-primary text-cream rounded-r-md",
    day_hidden: "invisible",
  };

  // Componer el mail con fechas si están seleccionadas
  const mailBody =
    range.from
      ? `${p.mailSubject}%0A%0AEntrada: ${format(range.from, "dd/MM/yyyy")}${
          range.to ? `%0ASalida: ${format(range.to, "dd/MM/yyyy")}` : ""
        }`
      : p.mailSubject;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{p.meta.title}</title>
        <meta name="description" content={p.meta.description} />
        <link
          rel="canonical"
          href="https://refugiosdelpescador.com/reservar"
        />
      </Helmet>

      <Header />

      <main className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="container mx-auto px-6">

          {/* Breadcrumb / back link */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {p.backHome}
            </Link>
          </div>

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/20" />
              <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
                {p.label}
              </span>
              <div className="h-px w-12 bg-primary/20" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
              {p.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto leading-relaxed">
              {p.intro}
            </p>
          </div>

          {/* ── Bloque principal: calendario + sidebar ── */}
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_320px] gap-10 items-start">

            {/* Calendario */}
            <div className="bg-secondary/20 rounded-2xl border border-primary/10 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                  {p.calendarTitle}
                </h2>

                {/* Botón refetch */}
                <button
                  onClick={() => void refetch()}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
                  aria-label={p.retryButton}
                  title={p.retryButton}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Estado: cargando */}
              {isLoading && (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <RefreshCw
                      className="w-8 h-8 text-primary animate-spin mx-auto mb-3"
                      aria-hidden="true"
                    />
                    <p className="font-body text-sm text-muted-foreground">
                      {p.loadingCalendar}
                    </p>
                  </div>
                </div>
              )}

              {/* Estado: error */}
              {isError && !isLoading && (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <XCircle
                    className="w-10 h-10 text-red-400"
                    aria-hidden="true"
                  />
                  <p className="font-body text-sm text-muted-foreground max-w-xs">
                    {p.errorCalendar}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void refetch()}
                  >
                    {p.retryButton}
                  </Button>
                </div>
              )}

              {/* Calendario DayPicker */}
              {!isLoading && (
                <div className={isError ? "opacity-50 pointer-events-none" : ""}>
                  <DayPicker
                    mode="range"
                    selected={{ from: range.from, to: range.to }}
                    onSelect={(r) => setRange({ from: r?.from, to: r?.to })}
                    numberOfMonths={2}
                    locale={dateLocale}
                    disabled={[
                      { before: new Date() }, // no permitir fechas pasadas
                      ...blockedDates,
                    ]}
                    classNames={rdpClassNames}
                    showOutsideDays={false}
                    modifiers={{
                      blocked: blockedDates,
                    }}
                    modifiersClassNames={{
                      blocked:
                        "!bg-secondary/50 !text-muted-foreground/40 line-through cursor-not-allowed hover:!bg-secondary/50",
                    }}
                  />
                </div>
              )}

              {/* Leyenda */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-primary/10">
                <div className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                  <span className="w-4 h-4 rounded bg-primary inline-block" />
                  {p.legend.available}
                </div>
                <div className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                  <span className="w-4 h-4 rounded bg-secondary/50 border border-border inline-block" />
                  {p.legend.blocked}
                </div>
                <div className="flex items-center gap-2 font-body text-xs text-muted-foreground">
                  <span className="w-4 h-4 rounded border-2 border-primary inline-block" />
                  {p.legend.today}
                </div>
              </div>

              {/* Fechas seleccionadas */}
              {range.from && (
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/15 font-body text-sm">
                  <span className="text-muted-foreground">
                    {lang === "es" ? "Entrada: " : "Check-in: "}
                  </span>
                  <span className="font-medium text-foreground">
                    {format(range.from, "d MMMM yyyy", { locale: dateLocale })}
                  </span>
                  {range.to && !isSameDay(range.from, range.to) && (
                    <>
                      <span className="text-muted-foreground mx-2">→</span>
                      <span className="text-muted-foreground">
                        {lang === "es" ? "Salida: " : "Check-out: "}
                      </span>
                      <span className="font-medium text-foreground">
                        {format(range.to, "d MMMM yyyy", { locale: dateLocale })}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Última actualización */}
              {updatedLabel && (
                <p className="mt-3 font-body text-xs text-muted-foreground/60 text-right">
                  {updatedLabel}
                </p>
              )}
            </div>

            {/* Sidebar derecho */}
            <div className="flex flex-col gap-6">

              {/* Estado de fuentes */}
              <div className="rounded-2xl border border-primary/10 bg-secondary/20 p-6">
                <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  {p.sourceStatus.title}
                </h3>
                <div className="flex flex-col gap-3">
                  <SourceBadge
                    label="Booking.com"
                    status={sources?.booking}
                    statusLabels={p.sourceStatus}
                  />
                  <SourceBadge
                    label="Airbnb"
                    status={sources?.airbnb}
                    statusLabels={p.sourceStatus}
                  />
                </div>
              </div>

              {/* CTAs de reserva */}
              <div className="rounded-2xl border border-primary/10 bg-secondary/20 p-6">
                <h3 className="font-display text-xl text-foreground mb-2">
                  {p.ctaTitle}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-5 leading-relaxed">
                  {p.ctaIntro}
                </p>

                <div className="flex flex-col gap-3">
                  <Button variant="ocean" size="lg" asChild className="w-full justify-center">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      {p.bookingBtn}
                    </a>
                  </Button>

                  <Button variant="outline" size="lg" asChild className="w-full justify-center">
                    <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">
                      {p.airbnbBtn}
                    </a>
                  </Button>

                  <Button variant="ghost" size="lg" asChild className="w-full justify-center">
                    <a
                      href={`mailto:contacto@refugiosdelpescador.com?subject=${encodeURIComponent(p.mailSubject)}&body=${mailBody}`}
                    >
                      {p.contactBtn}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Reglas de la casa */}
              <div className="rounded-2xl border border-primary/10 bg-secondary/20 p-6">
                <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  {p.rulesTitle}
                </h3>
                <ul className="flex flex-col gap-2">
                  {p.rules.map((rule) => (
                    <li
                      key={rule}
                      className="font-body text-sm text-foreground flex items-center gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0"
                        aria-hidden="true"
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reservar;
