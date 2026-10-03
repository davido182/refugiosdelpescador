import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ExperienceSection from "@/components/ExperienceSection";
import { translations } from "@/i18n/translations";

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderExperience = () =>
  render(
    <LanguageProvider>
      <ExperienceSection />
    </LanguageProvider>
  );

describe("ExperienceSection", () => {
  it("renders the section heading", () => {
    renderExperience();
    expect(
      screen.getByRole("heading", { name: translations.es.experience.title })
    ).toBeInTheDocument();
  });

  it("renders the intro text", () => {
    renderExperience();
    expect(screen.getByText(translations.es.experience.intro)).toBeInTheDocument();
  });

  it("renders all 4 experience cards", () => {
    renderExperience();
    translations.es.experience.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it("renders the quote", () => {
    renderExperience();
    expect(screen.getByText(translations.es.experience.quote)).toBeInTheDocument();
  });

  it("has id='experiencia' for anchor navigation", () => {
    const { container } = renderExperience();
    expect(container.querySelector("#experiencia")).toBeInTheDocument();
  });
});
