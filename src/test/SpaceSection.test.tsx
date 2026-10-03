import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import SpaceSection from "@/components/SpaceSection";
import { translations } from "@/i18n/translations";

// Mock all image assets
vi.mock("@/assets/salon-marlin.jpg", () => ({ default: "salon-marlin.jpg" }));
vi.mock("@/assets/dormitorio.jpg", () => ({ default: "dormitorio.jpg" }));
vi.mock("@/assets/dormitorio-segundo.jpg", () => ({ default: "dormitorio-segundo.jpg" }));
vi.mock("@/assets/cocina.jpg", () => ({ default: "cocina.jpg" }));

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderSpace = () =>
  render(
    <LanguageProvider>
      <SpaceSection />
    </LanguageProvider>
  );

describe("SpaceSection", () => {
  it("renders the section heading", () => {
    renderSpace();
    expect(
      screen.getByRole("heading", { name: translations.es.space.title })
    ).toBeInTheDocument();
  });

  it("renders the marlin story title", () => {
    renderSpace();
    expect(screen.getByText(translations.es.space.marlinTitle)).toBeInTheDocument();
  });

  it("renders all 3 room cards", () => {
    renderSpace();
    translations.es.space.cards.forEach((card) => {
      expect(screen.getByText(card.label)).toBeInTheDocument();
      expect(screen.getByText(card.text)).toBeInTheDocument();
    });
  });

  it("renders all 8 amenity items", () => {
    renderSpace();
    translations.es.space.amenities.forEach((amenity) => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it("renders amenities heading", () => {
    renderSpace();
    expect(
      screen.getByRole("heading", { name: translations.es.space.amenitiesTitle })
    ).toBeInTheDocument();
  });

  it("has id='espacio' for anchor navigation", () => {
    const { container } = renderSpace();
    expect(container.querySelector("#espacio")).toBeInTheDocument();
  });
});
