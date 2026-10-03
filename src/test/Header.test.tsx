import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/Header";

// Mock the logo asset
vi.mock("@/assets/logo-rdp.png", () => ({ default: "logo-rdp.png" }));

beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderHeader = () =>
  render(
    <MemoryRouter>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </MemoryRouter>
  );

describe("Header", () => {
  it("renders the brand logo image", () => {
    renderHeader();
    const logo = screen.getByAltText("Refugios del Pescador");
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe("IMG");
  });

  it("renders the brand name text", () => {
    renderHeader();
    expect(screen.getByText("Refugios del Pescador")).toBeInTheDocument();
  });

  it("renders a book/reserve button", () => {
    renderHeader();
    // In Spanish the button says "Reservar"
    const btn = screen.getByRole("button", { name: /reservar/i });
    expect(btn).toBeInTheDocument();
  });

  it("logo links to the homepage", () => {
    renderHeader();
    const link = screen.getByRole("link", { name: /refugios del pescador/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("scrolls to #reserva section when book button clicked", () => {
    const section = document.createElement("section");
    section.id = "reserva";
    document.body.appendChild(section);

    renderHeader();
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /reservar/i }))
    ).not.toThrow();

    document.body.removeChild(section);
  });

  it("applies background styles after scroll", () => {
    renderHeader();
    const header = screen.getByRole("banner");
    // Initially transparent
    expect(header.className).toContain("bg-transparent");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    // After scroll, background should change
    expect(header.className).toContain("bg-background");
  });
});
