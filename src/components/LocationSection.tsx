const LocationSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/20" />
              <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
                Ubicación
              </span>
              <div className="h-px w-12 bg-primary/20" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
              Tu punto de partida en Galápagos
            </h2>
          </div>

          {/* Location card */}
          <div className="relative rounded-2xl overflow-hidden bg-primary/5 p-8 md:p-12">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <svg viewBox="0 0 200 200" fill="currentColor" className="text-primary">
                <circle cx="100" cy="100" r="80" />
              </svg>
            </div>

            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              {/* Text content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-body text-lg font-medium">Islas Galápagos, Ecuador</span>
                </div>

                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  El Refugio del Pescador se encuentra en una ubicación privilegiada que combina 
                  la cercanía a los puntos de interés con la privacidad que buscas. 
                  Lejos del bullicio pero cerca de todo lo que necesitas.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-body text-foreground">Zona tranquila y residencial</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-body text-foreground">Fácil acceso a playas y senderos</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-body text-foreground">Ambiente seguro y acogedor</span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                  {/* Stylized map illustration */}
                  <div className="relative w-full h-full p-8">
                    <div className="absolute inset-8 border-2 border-dashed border-primary/20 rounded-full" />
                    <div className="absolute inset-16 border-2 border-dashed border-primary/15 rounded-full" />
                    <div className="absolute inset-24 border-2 border-dashed border-primary/10 rounded-full" />
                    
                    {/* Center point */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-4 h-4 bg-accent rounded-full animate-ping absolute" />
                        <div className="w-4 h-4 bg-accent rounded-full relative" />
                      </div>
                    </div>

                    {/* Island shapes */}
                    <div className="absolute top-1/4 left-1/4 w-16 h-10 bg-primary/20 rounded-full transform rotate-12" />
                    <div className="absolute top-1/3 right-1/4 w-12 h-8 bg-primary/15 rounded-full transform -rotate-6" />
                    <div className="absolute bottom-1/3 left-1/3 w-20 h-12 bg-primary/25 rounded-full transform rotate-45" />
                  </div>
                </div>
                <p className="text-center mt-4 text-sm text-muted-foreground font-body">
                  La ubicación exacta se comparte al confirmar la reserva
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
