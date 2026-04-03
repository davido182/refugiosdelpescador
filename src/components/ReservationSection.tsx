import { Button } from "@/components/ui/button";

const ReservationSection = () => {
  return (
    <section id="reserva" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              Reservar
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
            Tu refugio te espera
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Reserva tu estancia y prepárate para vivir Galápagos de una manera diferente. 
            Sin prisas. Sin ruido. Solo tú, el mar y el tiempo que necesitas.
          </p>

          {/* Reservation options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Airbnb option */}
            <a 
              href="https://airbnb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl border-2 border-primary/10 hover:border-primary/30 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-cream transition-all duration-300 text-primary">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001 18.35l-1.217.713c-.27.16-.52.19-.75.08-.23-.11-.38-.32-.46-.62l-.42-1.54c-.08-.29-.25-.53-.51-.72l-1.28-.94c-.26-.19-.37-.44-.33-.75.04-.31.21-.52.51-.65l1.47-.53c.3-.11.52-.32.68-.62l.67-1.39c.16-.3.4-.45.71-.45.32 0 .55.15.71.45l.67 1.39c.15.3.38.51.68.62l1.47.53c.3.12.47.34.51.65.04.31-.07.56-.33.75l-1.28.94c-.26.19-.43.43-.51.72l-.42 1.54c-.08.3-.23.51-.46.62-.23.11-.48.08-.75-.08l-1.22-.72zM12 3c2.85 0 5.19 1.06 7.01 3.19.27.33.23.72-.13.98-.36.26-.75.21-1.02-.12-1.5-1.76-3.44-2.64-5.86-2.64s-4.36.88-5.86 2.64c-.27.33-.66.38-1.02.12-.36-.26-.4-.65-.13-.98C6.81 4.06 9.15 3 12 3zm0 3.6c2.08 0 3.78.77 5.11 2.32.26.31.22.7-.12.95-.34.25-.72.2-.98-.11-1.06-1.24-2.38-1.86-3.99-1.86-1.62 0-2.95.62-4 1.86-.26.31-.64.36-.98.11-.34-.25-.38-.64-.12-.95C8.22 7.37 9.92 6.6 12 6.6zm-.03 3.6c1.29 0 2.36.54 3.2 1.61.26.33.22.73-.11.99-.33.26-.72.21-.99-.12-.57-.72-1.27-1.08-2.1-1.08-.83 0-1.53.36-2.1 1.08-.27.33-.66.38-.99.12-.33-.26-.37-.66-.11-.99.84-1.07 1.91-1.61 3.2-1.61z"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">Reservar en Airbnb</h3>
                <p className="font-body text-muted-foreground text-sm">
                  Consulta disponibilidad y reserva de forma segura
                </p>
              </div>
            </a>

            {/* Direct contact option */}
            <a 
              href="mailto:contacto@refugiosdelpescador.com?subject=Consulta de disponibilidad"
              className="group p-8 rounded-2xl border-2 border-primary/10 hover:border-primary/30 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-cream transition-all duration-300 text-primary">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">Contacto Directo</h3>
                <p className="font-body text-muted-foreground text-sm">
                  Escríbenos para consultas personalizadas
                </p>
              </div>
            </a>
          </div>

          {/* Alternative CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="ocean" size="xl" asChild>
              <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer">
                Consultar disponibilidad
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
