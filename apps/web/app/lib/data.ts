"use server";
import { unstable_noStore as noStore } from "next/cache";
export type QuoteProp = {
	id?: string;
	text: string;
	author: string;
	genre: string;
};

export const fetchRandomQuote = async () => {
	noStore();
	const response = await fetch(
		"https://api-quoto.onrender.com/v1/quote/random"
	);
	const quote: QuoteProp = await response.json();
	return quote;
};

export const fetchAuthorQuotes = async (author: string, offset: number) => {
	noStore();
	const response = await fetch(
		`https://api-quoto.onrender.com/v1/quote/${author}?limit=20&offset=${offset}`
	);

	const quotes: {
		pagination: {
			total: number;
			limit: number;
			offset: number;
		};
		data: {
			quotes: QuoteProp[];
		};
	} = await response.json();
	return quotes;
};
