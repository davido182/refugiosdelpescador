const GuestSection = () => {
  const guestTypes = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Parejas",
      description: "Que buscan un espacio íntimo y especial para reconectar lejos del ruido cotidiano."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Familias Pequeñas",
      description: "Con niños que sueñan con tortugas, leones marinos y aventuras que recordarán siempre."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Exploradores Conscientes",
      description: "Viajeros que entienden que lo extraordinario merece tiempo, respeto y contemplación."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Buscadores de Calma",
      description: "Quienes necesitan pausar, respirar y dejarse mecer por el ritmo lento del océano."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              Para Ti
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
            ¿Para quién es este refugio?
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            Este espacio no es para todos. Es para quienes entienden que el verdadero lujo 
            está en la simplicidad, la autenticidad y la conexión con la naturaleza.
          </p>
        </div>

        {/* Guest types grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {guestTypes.map((guest, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:shadow-soft"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-cream transition-all duration-300">
                  {guest.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-2">
                    {guest.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {guest.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestSection;
