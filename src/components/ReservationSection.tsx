import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { BOOKING_URL } from "@/i18n/translations";

const ReservationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="reserva" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              {t.reservation.label}
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
            {t.reservation.title}
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.reservation.intro}
          </p>

          {/* Reservation options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Booking.com option */}
            <a 
              href={BOOKING_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl border-2 border-primary/10 hover:border-primary/30 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-cream transition-all duration-300 text-primary">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">{t.reservation.bookingTitle}</h3>
                <p className="font-body text-muted-foreground text-sm">
                  {t.reservation.bookingText}
                </p>
              </div>
            </a>

            {/* Direct contact option */}
            <a 
              href={`mailto:contacto@refugiosdelpescador.com?subject=${encodeURIComponent(t.reservation.mailSubject)}`}
              className="group p-8 rounded-2xl border-2 border-primary/10 hover:border-primary/30 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-cream transition-all duration-300 text-primary">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">{t.reservation.contactTitle}</h3>
                <p className="font-body text-muted-foreground text-sm">
                  {t.reservation.contactText}
                </p>
              </div>
            </a>
          </div>

          {/* House rules */}
          <div className="mb-12">
            <h3 className="font-body text-sm tracking-widest uppercase text-muted-foreground mb-5">
              {t.reservation.rulesTitle}
            </h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {t.reservation.rules.map((rule) => (
                <li
                  key={rule}
                  className="font-body text-sm text-foreground bg-secondary/50 rounded-full px-4 py-2"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Alternative CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="ocean" size="xl" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {t.reservation.cta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
