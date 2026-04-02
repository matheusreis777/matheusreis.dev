import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound page", () => {
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  it("renders 404 heading", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/",
    );
  });

  it("renders return to home link", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NotFound />
      </MemoryRouter>,
    );
    const link = screen.getByText("Return to Home");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});
