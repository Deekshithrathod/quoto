import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchAuthorQuotes, fetchRandomQuote } from "./data";

describe("quote data fallbacks", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a fallback random quote when the API request fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);

    const quote = await fetchRandomQuote();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api-quoto.onrender.com/v1/quote/random",
      expect.objectContaining({
        cache: "no-store",
        signal: expect.any(AbortSignal),
      }),
    );
    expect(quote.text).toEqual(expect.any(String));
    expect(quote.author).toEqual(expect.any(String));
    expect(quote.genre).toEqual(expect.any(String));
  });

  it("returns author-specific fallback quotes when author lookup fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const response = await fetchAuthorQuotes("Steve Jobs", 0);

    expect(response.pagination.total).toBeGreaterThan(0);
    expect(response.data.quotes.length).toBeGreaterThan(0);
    expect(
      response.data.quotes.every((quote) => quote.author === "Steve Jobs"),
    ).toBe(true);
  });
});
