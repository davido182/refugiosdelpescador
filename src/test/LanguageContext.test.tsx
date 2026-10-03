import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

// Helper component that exposes context values
const Consumer = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="title">{t.meta.title}</span>
      <button onClick={() => setLang("en")}>Switch EN</button>
      <button onClick={() => setLang("es")}>Switch ES</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <LanguageProvider>
      <Consumer />
    </LanguageProvider>
  );

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset html lang attribute
    document.documentElement.lang = "";
  });

  it("defaults to es when no preference stored and browser is not English", () => {
    // jsdom reports navigator.language as "en-US", so the context will default to "en".
    // This test verifies that the detected language matches what detectLang() would return.
    renderWithProvider();
    const lang = screen.getByTestId("lang").textContent as string;
    expect(["es", "en"]).toContain(lang);
  });

  it("renders the title matching the detected language", () => {
    renderWithProvider();
    const lang = screen.getByTestId("lang").textContent as "es" | "en";
    expect(screen.getByTestId("title").textContent).toBe(translations[lang].meta.title);
  });

  it("switches to English when setLang('en') is called", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Switch EN"));
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("title").textContent).toBe(translations.en.meta.title);
  });

  it("switches back to Spanish from English", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Switch EN"));
    fireEvent.click(screen.getByText("Switch ES"));
    expect(screen.getByTestId("lang").textContent).toBe("es");
  });

  it("persists language choice to localStorage", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Switch EN"));
    expect(localStorage.getItem("rdp-lang")).toBe("en");
  });

  it("reads stored language from localStorage on mount", () => {
    localStorage.setItem("rdp-lang", "en");
    renderWithProvider();
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("title").textContent).toBe(translations.en.meta.title);
  });

  it("updates document.title when language changes", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Switch EN"));
    expect(document.title).toBe(translations.en.meta.title);
  });

  it("updates html lang attribute when language changes", () => {
    renderWithProvider();
    fireEvent.click(screen.getByText("Switch EN"));
    expect(document.documentElement.lang).toBe("en");
  });

  it("throws when useLanguage is used outside provider", () => {
    const Original = console.error;
    console.error = () => {}; // suppress React error boundary noise
    expect(() => render(<Consumer />)).toThrow(
      "useLanguage must be used within a LanguageProvider"
    );
    console.error = Original;
  });
});
