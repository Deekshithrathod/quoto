export const fetchRandomQuote = async () => {
	const response = await fetch(
		"https://api-quoto.onrender.com/v1/quote/random",
		{ cache: "no-store" }
	);
	const quote: { text: string; author: string; genre: string } =
		await response.json();
	return quote;
};
