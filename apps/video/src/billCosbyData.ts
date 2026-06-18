export type QuoteItem = {
  id?: string;
  text: string;
  author: string;
  genre: string;
};

type AuthorQuotesResponse = {
  data?: {
    quotes?: QuoteItem[];
  };
};

export const fallbackBillCosbyQuotes: QuoteItem[] = [
  {
    text: "Like everyone else who makes the mistake of getting older, I begin each day with coffee and obituaries.",
    author: "Bill Cosby",
    genre: "age",
  },
  {
    text: "The heart of marriage is memories and if the two of you happen to have the same ones and can savor your reruns, then your marriage is a gift from the gods.",
    author: "Bill Cosby",
    genre: "anniversary",
  },
  {
    text: "Civilization had too many rules for me, so I did my best to rewrite them.",
    author: "Bill Cosby",
    genre: "best",
  },
  {
    text: "Raising children is an incredibly hard and risky business in which no cumulative wisdom is gained: each generation repeats the mistakes the previous one made.",
    author: "Bill Cosby",
    genre: "business",
  },
  {
    text: "People can be more forgiving than you can imagine. But you have to forgive yourself. Let go of what's bitter and move on.",
    author: "Bill Cosby",
    genre: "forgiveness",
  },
  {
    text: "Decide that you want it more than you are afraid of it.",
    author: "Bill Cosby",
    genre: "motivational",
  },
];

export const getQuote = (quotes: QuoteItem[], index: number): QuoteItem =>
  quotes[index] ??
  fallbackBillCosbyQuotes[index] ??
  fallbackBillCosbyQuotes[0]!;

export const normalizeBillCosbyQuotes = (
  payload: AuthorQuotesResponse | QuoteItem[],
): QuoteItem[] => {
  const rawQuotes = Array.isArray(payload) ? payload : payload.data?.quotes;
  const quotes = rawQuotes?.filter(
    (quote) => quote.author === "Bill Cosby" && quote.text && quote.genre,
  );

  return quotes && quotes.length >= 4 ? quotes : fallbackBillCosbyQuotes;
};
