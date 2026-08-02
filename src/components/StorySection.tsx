import { useLanguage } from "@/i18n/LanguageContext";

const StorySection = () => {
  const { t } = useLanguage();

  return (
    <section id="historia" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/20" />
            <span className="font-body text-sm tracking-widest uppercase text-muted-foreground">
              {t.story.label}
            </span>
            <div className="h-px w-12 bg-primary/20" />
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8 leading-tight">
            {t.story.title}
          </h2>

          {/* Story content */}
          <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-body font-light leading-relaxed">
            <p>
              {t.story.p1parts[0]}
              <span className="text-foreground font-normal italic">{t.story.p1parts[1]}</span>
              {t.story.p1parts[2]}
            </p>

            <p>{t.story.p2}</p>

            <p>{t.story.p3}</p>
          </div>

          {/* Decorative wave */}
          <div className="mt-16 flex justify-center">
            <svg className="w-24 h-6 text-primary/20" viewBox="0 0 100 20" fill="currentColor" aria-hidden="true">
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
