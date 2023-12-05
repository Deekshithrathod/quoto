"use server";
import { unstable_noStore as noStore } from "next/cache";
type Quote = {
	text: string;
	author: string;
	genre: string;
};

type NotFoundResponse = {
	message: string;
	stack?: undefined;
};

export const fetchRandomQuote = async () => {
	noStore();
	const response = await fetch(
		"https://api-quoto.onrender.com/v1/quote/random"
	);
	const quote: Quote = await response.json();
	return quote;
};

export const fetchAuthorQuotes = async (
	author: string,
	limit: number,
	offset: number
) => {
	noStore();
	const response = await fetch(
		`https://api-quoto.onrender.com/v1/quote/${author}?limit=${limit}&offset=${offset}`
	);

	const quotes: {
		pagination: {
			total: number;
			limit: number;
			offset: number;
		};
		data: {
			quotes: Quote[];
		};
	} = await response.json();
	return quotes;
};
