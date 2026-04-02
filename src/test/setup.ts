import "@testing-library/jest-dom";
import { vi } from "vitest";

// Silence i18next promotional console output
vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
  const msg = String(args[0] ?? "");
  if (msg.includes("i18next") || msg.includes("Locize")) return;
  console.info(...args);
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => { },
  }),
});
