import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-galapagos.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToReserva = () => {
    document.getElementById('reserva')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={t.hero.imageAlt}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Decorative element */}
          <div className="flex justify-center mb-6 opacity-0 animate-fade-in">
            <div className="w-px h-16 bg-cream/40" />
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-cream leading-tight opacity-0 animate-fade-in-up">
            {t.hero.title}
            <span className="block font-body text-base md:text-xl lg:text-2xl font-light tracking-wide text-cream/80 mt-4">
              {t.hero.titleDescriptor}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-xl md:text-2xl text-cream/90 font-light max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
            {t.hero.subtitle}
          </p>

          {/* Location Tag */}
          <div className="flex items-center justify-center gap-2 text-cream/70 opacity-0 animate-fade-in-up animation-delay-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-body text-sm tracking-widest uppercase">{t.hero.location}</span>
          </div>

          {/* Key badges */}
          <ul className="flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-in-up animation-delay-400">
            {t.hero.badges.map((badge) => (
              <li
                key={badge}
                className="font-body text-xs md:text-sm text-cream/90 border border-cream/30 rounded-full px-4 py-1.5"
              >
                {badge}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="pt-8 opacity-0 animate-fade-in-up animation-delay-600">
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToReserva}
              className="group"
            >
              <span>{t.hero.cta}</span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800">
        <div className="flex flex-col items-center gap-2 text-cream/50">
          <span className="font-body text-xs tracking-widest uppercase">{t.hero.discover}</span>
          <div className="w-px h-8 bg-cream/30 animate-float" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
