const ExperienceSection = () => {
  const experiences = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: "Snorkel sin prisas",
      description: "Sumérgete en aguas cristalinas donde tortugas, rayas y peces de colores te acompañan."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Caminatas contemplativas",
      description: "Senderos volcánicos, playas solitarias y miradores donde el tiempo se detiene."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      ),
      title: "Amaneceres únicos",
      description: "El sol emerge sobre el Pacífico con una luz que solo existe en estas islas."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Pesca responsable",
      description: "Para quienes lo deseen, la tradición local de pescar con respeto por el océano."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-primary text-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-cream/30" />
              <span className="font-body text-sm tracking-widest uppercase text-cream/70">
                La Experiencia
              </span>
              <div className="h-px w-12 bg-cream/30" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              Galápagos desde otro ritmo
            </h2>

            <p className="text-lg md:text-xl text-cream/80 font-body font-light max-w-3xl mx-auto leading-relaxed">
              Las islas más extraordinarias del planeta merecen ser vividas sin apuro. 
              Aquí no vienes a marcar destinos en una lista. Vienes a sumergirte, 
              a observar, a dejar que la naturaleza te encuentre.
            </p>
          </div>

          {/* Experiences grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-cream/10 hover:border-cream/30 hover:bg-cream/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center mb-4 group-hover:bg-cream/20 transition-colors duration-300">
                  {exp.icon}
                </div>
                <h3 className="font-display text-xl mb-2">{exp.title}</h3>
                <p className="font-body text-cream/70 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-16 text-center">
            <blockquote className="font-display text-2xl md:text-3xl italic text-cream/90 max-w-3xl mx-auto">
              "En Galápagos, el tiempo no corre. Fluye como el mar."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
