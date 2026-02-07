const StorySection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              Nuestra Historia
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8 leading-tight">
            Un refugio nacido del mar
          </h2>

          {/* Story content */}
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-body font-light leading-relaxed">
            <p>
              El nombre <span className="text-foreground font-normal italic">El Refugio del Pescador</span> no es casualidad. 
              Nace de una imagen que vive en nuestra memoria: la del pescador artesanal que, después de una jornada 
              en el mar, encuentra en tierra firme un lugar donde descansar, compartir historias y prepararse 
              para el próximo amanecer.
            </p>
            
            <p>
              Este espacio fue creado para quienes, como el pescador, buscan un lugar auténtico donde dejar atrás 
              el ruido del mundo y reconectar con lo esencial. Un refugio donde el tiempo se mide por la luz del sol 
              y el sonido de las olas.
            </p>

            <p>
              Aquí, cada rincón habla del océano. Cada detalle invita a la calma. 
              Porque creemos que viajar a Galápagos no es solo ver islas extraordinarias, 
              sino también encontrar un lugar donde sentirse verdaderamente en casa.
            </p>
          </div>

          {/* Decorative wave */}
          <div className="mt-16 flex justify-center">
            <svg className="w-24 h-6 text-primary/20" viewBox="0 0 100 20" fill="currentColor">
              <path d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10 V 20 H 0 Z" opacity="0.3"/>
              <path d="M0 15 Q 12.5 5, 25 15 T 50 15 T 75 15 T 100 15 V 20 H 0 Z" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
