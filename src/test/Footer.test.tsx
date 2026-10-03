import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Footer from "@/components/Footer";
import { translations } from "@/i18n/translations";

vi.mock("@/assets/logo-rdp.png", () => ({ default: "logo-rdp.png" }));

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderFooter = () =>
  render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );

describe("Footer", () => {
  it("renders the brand logo", () => {
    renderFooter();
    expect(screen.getByAltText("Refugios del Pescador")).toBeInTheDocument();
  });

  it("renders the brand name heading", () => {
    renderFooter();
    expect(
      screen.getByRole("heading", { name: "Refugios del Pescador" })
    ).toBeInTheDocument();
  });

  it("renders the city location", () => {
    renderFooter();
    expect(screen.getByText(translations.es.footer.city)).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    renderFooter();
    expect(screen.getByText(translations.es.footer.tagline)).toBeInTheDocument();
  });

  it("renders the copyright year and rights text", () => {
    renderFooter();
    // The copyright paragraph contains the text split across nodes; use partial text match
    const para = screen.getByText(/todos los derechos reservados/i);
    expect(para).toBeInTheDocument();
  });

  it("renders the Facebook link", () => {
    renderFooter();
    const fb = screen.getByRole("link", { name: /facebook/i });
    expect(fb).toHaveAttribute("href", expect.stringContaining("facebook.com"));
    expect(fb).toHaveAttribute("target", "_blank");
  });

  it("renders Instagram and TikTok links", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tiktok/i })).toBeInTheDocument();
  });

  it("renders language switcher", () => {
    renderFooter();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});
