import { render, screen as rtlScreen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Quote from "./Quote";

describe("Quote", () => {
  it("reveals author and genre details when the quote is tapped", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Quote
        text="Stay hungry, stay foolish."
        author="Steve Jobs"
        genre="inspirational"
      />,
    );

    const details = container.querySelector("details");
    const quote = container.querySelector("summary");

    expect(details).not.toHaveAttribute("open");
    expect(quote).toHaveAttribute("aria-label", "Show quote details");

    if (!quote) throw new Error("Expected quote summary to render");
    await user.click(quote);

    expect(details).toHaveAttribute("open");
    expect(rtlScreen.getByText("Author")).toBeInTheDocument();
    expect(rtlScreen.getByText("Steve Jobs")).toBeInTheDocument();
    expect(rtlScreen.getByText("Genre")).toBeInTheDocument();
    expect(rtlScreen.getByText("inspirational")).toBeInTheDocument();
  });
});
