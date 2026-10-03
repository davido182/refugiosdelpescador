import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ReservationSection from "@/components/ReservationSection";
import { translations, BOOKING_URL } from "@/i18n/translations";

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderReservation = () =>
  render(
    <LanguageProvider>
      <ReservationSection />
    </LanguageProvider>
  );

describe("ReservationSection", () => {
  it("renders the section heading", () => {
    renderReservation();
    expect(
      screen.getByRole("heading", { name: translations.es.reservation.title })
    ).toBeInTheDocument();
  });

  it("renders the intro text", () => {
    renderReservation();
    expect(screen.getByText(translations.es.reservation.intro)).toBeInTheDocument();
  });

  it("renders the Booking.com option title", () => {
    renderReservation();
    expect(screen.getByText(translations.es.reservation.bookingTitle)).toBeInTheDocument();
  });

  it("renders the direct contact option title", () => {
    renderReservation();
    expect(screen.getByText(translations.es.reservation.contactTitle)).toBeInTheDocument();
  });

  it("Booking.com links point to the correct URL", () => {
    renderReservation();
    const links = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === BOOKING_URL);
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("Booking.com links open in a new tab", () => {
    renderReservation();
    const links = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === BOOKING_URL);
    links.forEach((link) => expect(link).toHaveAttribute("target", "_blank"));
  });

  it("email link uses correct email address", () => {
    renderReservation();
    const mailtoLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href")?.startsWith("mailto:"));
    expect(mailtoLinks.length).toBeGreaterThan(0);
    expect(mailtoLinks[0].getAttribute("href")).toContain(
      "contacto@refugiosdelpescador.com"
    );
  });

  it("renders all 4 house rules", () => {
    renderReservation();
    translations.es.reservation.rules.forEach((rule) => {
      expect(screen.getByText(rule)).toBeInTheDocument();
    });
  });

  it("renders the main CTA button link", () => {
    renderReservation();
    expect(
      screen.getByRole("link", { name: translations.es.reservation.cta })
    ).toBeInTheDocument();
  });

  it("has id='reserva' for anchor navigation", () => {
    const { container } = renderReservation();
    expect(container.querySelector("#reserva")).toBeInTheDocument();
  });
});
