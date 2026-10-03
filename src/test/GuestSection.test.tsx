import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import GuestSection from "@/components/GuestSection";
import { translations } from "@/i18n/translations";

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderGuests = () =>
  render(
    <LanguageProvider>
      <GuestSection />
    </LanguageProvider>
  );

describe("GuestSection", () => {
  it("renders the section heading", () => {
    renderGuests();
    expect(
      screen.getByRole("heading", { name: translations.es.guests.title })
    ).toBeInTheDocument();
  });

  it("renders the intro text", () => {
    renderGuests();
    expect(screen.getByText(translations.es.guests.intro)).toBeInTheDocument();
  });

  it("renders all 4 guest type cards", () => {
    renderGuests();
    translations.es.guests.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it("has id='huespedes' for anchor navigation", () => {
    const { container } = renderGuests();
    expect(container.querySelector("#huespedes")).toBeInTheDocument();
  });
});
