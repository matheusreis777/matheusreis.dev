import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock heavy child components to isolate App routing logic
vi.mock("./components/MouseGlow", () => ({
  default: () => <div data-testid="mouse-glow" />,
}));
vi.mock("./components/FloatingWhatsApp", () => ({
  default: () => <div data-testid="floating-whatsapp" />,
}));
vi.mock("./pages/Index", () => ({
  default: () => <div data-testid="index-page">Index</div>,
}));
vi.mock("./pages/NotFound", () => ({
  default: () => <div data-testid="not-found">404</div>,
}));
vi.mock("./pages/News", () => ({
  default: () => <div data-testid="news-page">News</div>,
}));
vi.mock("@vercel/analytics/react", () => ({ Analytics: () => null }));
vi.mock("./i18n/config", () => ({ default: {} }));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("index-page")).toBeInTheDocument();
  });

  it("renders mouse glow and floating whatsapp", () => {
    render(<App />);
    expect(screen.getByTestId("mouse-glow")).toBeInTheDocument();
    expect(screen.getByTestId("floating-whatsapp")).toBeInTheDocument();
  });
});
