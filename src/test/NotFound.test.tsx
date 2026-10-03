import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/NotFound";

const renderNotFound = (path = "/some/missing-page") =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <NotFound />
      </MemoryRouter>
    </HelmetProvider>
  );

describe("NotFound (404)", () => {
  it("renders the 404 heading", () => {
    renderNotFound();
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
  });

  it("renders the 'Página no encontrada' message", () => {
    renderNotFound();
    expect(screen.getByText(/página no encontrada/i)).toBeInTheDocument();
  });

  it("renders a link back to the homepage", () => {
    renderNotFound();
    const link = screen.getByRole("link", { name: /volver al inicio/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
