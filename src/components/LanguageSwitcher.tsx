import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import type { Lang } from "@/i18n/translations";

const options: { code: Lang; label: string; aria: string }[] = [
  { code: "es", label: "ES", aria: "Cambiar a español" },
  { code: "en", label: "EN", aria: "Switch to English" },
];

const LanguageSwitcher = ({ inverted = false }: { inverted?: boolean }) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn(
        "flex items-center rounded-full border p-0.5",
        inverted ? "border-cream/40" : "border-primary/20",
      )}
    >
      {options.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-label={option.aria}
            aria-pressed={active}
            lang={option.code}
            className={cn(
              "px-2.5 py-1 rounded-full font-body text-xs tracking-widest uppercase transition-colors duration-300",
              active
                ? inverted
                  ? "bg-cream text-primary"
                  : "bg-primary text-primary-foreground"
                : inverted
                  ? "text-cream/70 hover:text-cream"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
