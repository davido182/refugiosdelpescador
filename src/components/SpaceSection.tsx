import interiorImage from "@/assets/interior-living.jpg";
import bedroomImage from "@/assets/bedroom.jpg";

const SpaceSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              El Espacio
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
            Diseñado para el descanso
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Un departamento completo de dos dormitorios donde cada espacio ha sido pensado 
            para ofrecerte la tranquilidad que mereces.
          </p>
        </div>

        {/* Main feature - Living room with Marlin */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-ocean">
            <img
              src={interiorImage}
              alt="Sala de estar con vista al mar y el marlín decorativo"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl text-cream mb-4">
                  El Marlín: Símbolo del Refugio
                </h3>
                <p className="font-body text-cream/90 text-lg leading-relaxed">
                  En el corazón del salón descansa un portacañas artesanal con forma de marlín, 
                  pieza única tallada por artesanos locales. Más que decoración, es el alma del refugio: 
                  un tributo al mar y a la tradición pesquera que da nombre a este lugar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bedroom 1 */}
          <div className="bg-background rounded-xl overflow-hidden shadow-soft group">
            <div className="h-48 overflow-hidden">
              <img
                src={bedroomImage}
                alt="Dormitorio principal"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 text-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="font-body text-sm tracking-wide uppercase">Dormitorio Principal</span>
              </div>
              <p className="font-body text-muted-foreground">
                Cama doble con sábanas de algodón, vistas serenas y la calma perfecta para renovar energías.
              </p>
            </div>
          </div>

          {/* Bedroom 2 */}
          <div className="bg-background rounded-xl overflow-hidden shadow-soft group">
            <div className="h-48 bg-primary/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 text-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="font-body text-sm tracking-wide uppercase">Segundo Dormitorio</span>
              </div>
              <p className="font-body text-muted-foreground">
                Flexible y acogedor, perfecto para familias pequeñas o viajeros que buscan espacio adicional.
              </p>
            </div>
          </div>

          {/* Common Areas */}
          <div className="bg-background rounded-xl overflow-hidden shadow-soft group md:col-span-2 lg:col-span-1">
            <div className="h-48 bg-primary/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3 text-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-body text-sm tracking-wide uppercase">Áreas Comunes</span>
              </div>
              <p className="font-body text-muted-foreground">
                Sala de estar con el icónico marlín, cocina equipada y espacios que invitan a la convivencia tranquila.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceSection;
