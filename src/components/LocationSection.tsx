import { useLanguage } from "@/i18n/LanguageContext";

const LocationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="ubicacion" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/20" />
              <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
                {t.location.label}
              </span>
              <div className="h-px w-12 bg-primary/20" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-tight">
              {t.location.title}
            </h2>
          </div>

          {/* Location card */}
          <div className="relative rounded-2xl overflow-hidden bg-primary/5 p-8 md:p-12">
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              {/* Text content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-body text-lg font-medium">{t.location.city}</span>
                </div>

                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  {t.location.text}
                </p>

                <ul className="space-y-4 pt-4">
                  {t.location.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-body text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Maps embed */}
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden shadow-soft">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d997.3287770222968!2d-89.59389418349193!3d-0.909999678693923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwNTQnMzQuNyJTIDg5wrAzNSczOC44Ilc!5e0!3m2!1ses!2ses!4v1775227521369!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t.location.mapTitle}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
