const fs = require("node:fs/promises");
const path = require("node:path");

const apiUrl =
  "https://api-quoto.onrender.com/v1/quote/Bill%20Cosby?limit=12&offset=0";
const outputPath = path.join(
  __dirname,
  "..",
  "src",
  "generatedBillCosbyQuotes.json",
);

const fetchWithTimeout = async (url, timeoutMs) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const run = async () => {
  try {
    const response = await fetchWithTimeout(apiUrl, 30000);
    if (!response.ok) throw new Error(`API responded with ${response.status}`);

    const payload = await response.json();
    const quotes = payload?.data?.quotes?.filter(
      (quote) => quote?.author === "Bill Cosby" && quote?.text && quote?.genre,
    );

    if (!quotes || quotes.length < 4) {
      throw new Error("API returned too few Bill Cosby quotes");
    }

    await fs.writeFile(outputPath, `${JSON.stringify(quotes, null, 2)}\n`);
    console.log(`Fetched ${quotes.length} Bill Cosby quotes.`);
  } catch (error) {
    console.warn(
      `Using existing generated Bill Cosby quote data: ${error.message}`,
    );
  }
};

run();
