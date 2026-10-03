import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const renderSwitcher = (inverted = false) =>
  render(
    <LanguageProvider>
      <LanguageSwitcher inverted={inverted} />
    </LanguageProvider>
  );

describe("LanguageSwitcher", () => {
  beforeEach(() => localStorage.clear());

  it("renders ES and EN buttons", () => {
    renderSwitcher();
    expect(screen.getByLabelText(/cambiar a español/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/switch to english/i)).toBeInTheDocument();
  });

  it("ES button is pressed by default when lang is forced to es", () => {
    localStorage.setItem("rdp-lang", "es");
    renderSwitcher();
    expect(screen.getByLabelText(/cambiar a español/i)).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText(/switch to english/i)).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to EN when EN button is clicked", () => {
    renderSwitcher();
    fireEvent.click(screen.getByLabelText(/switch to english/i));
    expect(screen.getByLabelText(/switch to english/i)).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText(/cambiar a español/i)).toHaveAttribute("aria-pressed", "false");
  });

  it("has accessible group label", () => {
    renderSwitcher();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("renders without crashing with inverted=true", () => {
    expect(() => renderSwitcher(true)).not.toThrow();
  });
});
