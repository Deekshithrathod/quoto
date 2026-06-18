import { render, screen as rtlScreen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Quote from "./Quote";

describe("Quote", () => {
  it("shows quote details when author and genre are provided", () => {
    render(
      <Quote
        text="Stay hungry, stay foolish."
        author="Steve Jobs"
        genre="inspirational"
      />,
    );

    expect(rtlScreen.getByText(/Stay hungry, stay foolish/i)).toBeVisible();
    expect(rtlScreen.getByText("Author")).toBeVisible();
    expect(rtlScreen.getByText("Steve Jobs")).toBeVisible();
    expect(rtlScreen.getByText("Genre")).toBeVisible();
    expect(rtlScreen.getByText("inspirational")).toBeVisible();
  });
});
