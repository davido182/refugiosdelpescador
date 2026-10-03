import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LocationSection from "@/components/LocationSection";
import { translations } from "@/i18n/translations";

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderLocation = () =>
  render(
    <LanguageProvider>
      <LocationSection />
    </LanguageProvider>
  );

describe("LocationSection", () => {
  it("renders the section heading", () => {
    renderLocation();
    expect(
      screen.getByRole("heading", { name: translations.es.location.title })
    ).toBeInTheDocument();
  });

  it("renders the city name", () => {
    renderLocation();
    expect(screen.getByText(translations.es.location.city)).toBeInTheDocument();
  });

  it("renders the location description", () => {
    renderLocation();
    expect(screen.getByText(translations.es.location.text)).toBeInTheDocument();
  });

  it("renders all 4 location features", () => {
    renderLocation();
    translations.es.location.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it("renders the Google Maps iframe", () => {
    renderLocation();
    const iframe = screen.getByTitle(translations.es.location.mapTitle);
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe("IFRAME");
  });

  it("iframe has a valid Google Maps src", () => {
    renderLocation();
    const iframe = screen.getByTitle(translations.es.location.mapTitle) as HTMLIFrameElement;
    expect(iframe.src).toContain("google.com/maps");
  });

  it("has id='ubicacion' for anchor navigation", () => {
    const { container } = renderLocation();
    expect(container.querySelector("#ubicacion")).toBeInTheDocument();
  });
});
