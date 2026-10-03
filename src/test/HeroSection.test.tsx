import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import HeroSection from "@/components/HeroSection";
import { translations } from "@/i18n/translations";

// Mock image asset
vi.mock("@/assets/hero-galapagos.jpg", () => ({ default: "hero-galapagos.jpg" }));

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderHero = () =>
  render(
    <LanguageProvider>
      <HeroSection />
    </LanguageProvider>
  );

describe("HeroSection", () => {
  it("renders the main title", () => {
    renderHero();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      translations.es.hero.title
    );
  });

  it("renders the hero image with correct alt text", () => {
    renderHero();
    expect(screen.getByAltText(translations.es.hero.imageAlt)).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    renderHero();
    expect(
      screen.getByRole("button", { name: translations.es.hero.cta })
    ).toBeInTheDocument();
  });

  it("renders all 3 feature badges", () => {
    renderHero();
    translations.es.hero.badges.forEach((badge) => {
      expect(screen.getByText(badge)).toBeInTheDocument();
    });
  });

  it("renders the location string", () => {
    renderHero();
    expect(screen.getByText(translations.es.hero.location)).toBeInTheDocument();
  });

  it("renders the discover label", () => {
    renderHero();
    expect(screen.getByText(translations.es.hero.discover)).toBeInTheDocument();
  });

  it("scroll-to-reserva button does not throw on click", () => {
    const section = document.createElement("section");
    section.id = "reserva";
    document.body.appendChild(section);

    renderHero();
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: translations.es.hero.cta }))
    ).not.toThrow();

    document.body.removeChild(section);
  });
});
