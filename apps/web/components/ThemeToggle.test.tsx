import {
  cleanup,
  render,
  screen as rtlScreen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = "dark";
  });

  it("defaults to dark mode and toggles to light mode", async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    const toggle = rtlScreen.getByRole("button", {
      name: "Switch to light mode",
    });

    expect(document.documentElement).toHaveClass("dark");

    await user.click(toggle);

    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("quoto-theme")).toBe("light");
    expect(
      rtlScreen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeVisible();
  });

  it("restores a saved light mode preference", async () => {
    window.localStorage.setItem("quoto-theme", "light");

    render(<ThemeToggle />);

    await waitFor(() => {
      expect(document.documentElement).not.toHaveClass("dark");
    });

    expect(
      rtlScreen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeVisible();
  });
});
