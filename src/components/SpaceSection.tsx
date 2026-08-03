import interiorImage from "@/assets/salon-marlin.jpg";
import bedroomImage from "@/assets/dormitorio.jpg";
import kitchenImage from "@/assets/cocina.jpg";
import loungeImage from "@/assets/salon-vista.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const cardIcons = [
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>,
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
];

const SpaceSection = () => {
  const { t } = useLanguage();

  return (
    <section id="espacio" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              {t.space.label}
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
            {t.space.title}
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-2xl mx-auto">
            {t.space.intro}
          </p>
        </div>

        {/* Main feature - Living room with Marlin */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-ocean">
            <img
              src={interiorImage}
              alt={t.space.livingAlt}
              className="w-full h-[400px] md:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl text-cream mb-4">
                  {t.space.marlinTitle}
                </h3>
                <p className="font-body text-cream/90 text-lg leading-relaxed">
                  {t.space.marlinText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {t.space.cards.map((card, index) => (
            <div key={card.label} className="bg-background rounded-xl overflow-hidden shadow-soft group">
              <div className="h-48 overflow-hidden">
                <img
                  src={[bedroomImage, kitchenImage, loungeImage][index] ?? loungeImage}
                  alt={index === 0 ? t.space.bedroomAlt : card.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-accent">
                  {cardIcons[index]}
                  <span className="font-body text-sm tracking-wide uppercase">{card.label}</span>
                </div>
                <p className="font-body text-muted-foreground">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8">
            {t.space.amenitiesTitle}
          </h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {t.space.amenities.map((item) => (
              <li
                key={item}
                className="font-body text-sm text-foreground bg-background border border-primary/10 rounded-full px-4 py-2 shadow-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SpaceSection;
