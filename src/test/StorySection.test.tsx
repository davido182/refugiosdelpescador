import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import StorySection from "@/components/StorySection";
import { translations } from "@/i18n/translations";

// Force Spanish for all tests in this file
beforeEach(() => {
  localStorage.setItem("rdp-lang", "es");
});

const renderStory = () =>
  render(
    <LanguageProvider>
      <StorySection />
    </LanguageProvider>
  );

describe("StorySection", () => {
  it("renders the section heading", () => {
    renderStory();
    expect(
      screen.getByRole("heading", { name: translations.es.story.title })
    ).toBeInTheDocument();
  });

  it("renders the section label", () => {
    renderStory();
    expect(screen.getByText(translations.es.story.label)).toBeInTheDocument();
  });

  it("renders the brand name within the first paragraph", () => {
    renderStory();
    expect(screen.getByText(translations.es.story.p1parts[1])).toBeInTheDocument();
  });

  it("renders paragraph 2 content", () => {
    renderStory();
    // Use partial match since text may wrap
    expect(
      screen.getByText((_, el) => {
        return el?.tagName === "P" && (el.textContent ?? "").includes("apartamento en San Cristóbal");
      })
    ).toBeInTheDocument();
  });

  it("renders paragraph 3 content", () => {
    renderStory();
    expect(
      screen.getByText((_, el) => {
        return el?.tagName === "P" && (el.textContent ?? "").includes("cada rincón habla del océano");
      })
    ).toBeInTheDocument();
  });

  it("has id='historia' for anchor navigation", () => {
    const { container } = renderStory();
    expect(container.querySelector("#historia")).toBeInTheDocument();
  });
});
