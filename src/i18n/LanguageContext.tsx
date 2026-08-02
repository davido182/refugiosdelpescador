import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { translations, Lang } from "./translations";

type Dict = typeof translations["es"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "rdp-lang";

const detectLang = (): Lang => {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "es" || param === "en") return param;
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
};

const setMeta = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", content);
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  useEffect(() => {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', t.meta.title);
    setMeta('meta[name="twitter:title"]', t.meta.title);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[name="twitter:description"]', t.meta.description);
    setMeta('meta[property="og:locale"]', lang === "es" ? "es_EC" : "en_US");
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] as Dict }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
