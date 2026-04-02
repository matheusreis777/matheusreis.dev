import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Mock i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "nav.about": "Sobre",
        "nav.skills": "Skills",
        "nav.soft_skills": "Soft Skills",
        "nav.experience": "Experiência",
        "nav.projects": "Projetos",
        "nav.contact": "Contato",
        "nav.news": "Notícias",
      };
      return map[key] ?? key;
    },
    i18n: {
      language: "pt-BR",
      changeLanguage: vi.fn(),
    },
  }),
}));

describe("Navbar", () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar />
      </MemoryRouter>,
    );

  it("renders the brand logo", () => {
    renderNavbar();
    expect(screen.getByText("MRM")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderNavbar();
    expect(screen.getAllByText("Sobre").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Skills").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projetos").length).toBeGreaterThan(0);
  });

  it("renders language toggle button", () => {
    renderNavbar();
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
  });
});
