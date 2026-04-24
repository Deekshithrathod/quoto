"use server";
import { unstable_noStore as noStore } from "next/cache";

export type QuoteProp = {
	id?: string;
	text: string;
	author: string;
	genre: string;
};

const FALLBACK_QUOTES: QuoteProp[] = [
	{
		id: "f1",
		text: "The only way to do great work is to love what you do.",
		author: "Steve Jobs",
		genre: "inspirational",
	},
	{
		id: "f2",
		text: "In the middle of every difficulty lies opportunity.",
		author: "Albert Einstein",
		genre: "inspirational",
	},
	{
		id: "f3",
		text: "It does not matter how slowly you go as long as you do not stop.",
		author: "Confucius",
		genre: "perseverance",
	},
	{
		id: "f4",
		text: "Life is what happens when you're busy making other plans.",
		author: "John Lennon",
		genre: "life",
	},
	{
		id: "f5",
		text: "The future belongs to those who believe in the beauty of their dreams.",
		author: "Eleanor Roosevelt",
		genre: "inspirational",
	},
	{
		id: "f6",
		text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
		author: "Mother Teresa",
		genre: "love",
	},
	{
		id: "f7",
		text: "When you reach the end of your rope, tie a knot in it and hang on.",
		author: "Franklin D. Roosevelt",
		genre: "perseverance",
	},
	{
		id: "f8",
		text: "Always remember that you are absolutely unique. Just like everyone else.",
		author: "Margaret Mead",
		genre: "humor",
	},
	{
		id: "f9",
		text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
		author: "Ralph Waldo Emerson",
		genre: "inspirational",
	},
	{
		id: "f10",
		text: "You will face many defeats in life, but never let yourself be defeated.",
		author: "Maya Angelou",
		genre: "perseverance",
	},
	{
		id: "f11",
		text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
		author: "Nelson Mandela",
		genre: "inspirational",
	},
	{
		id: "f12",
		text: "In the end, it's not the years in your life that count. It's the life in your years.",
		author: "Abraham Lincoln",
		genre: "life",
	},
	{
		id: "f13",
		text: "Never let the fear of striking out keep you from playing the game.",
		author: "Babe Ruth",
		genre: "sports",
	},
	{
		id: "f14",
		text: "Life is either a daring adventure or nothing at all.",
		author: "Helen Keller",
		genre: "life",
	},
	{
		id: "f15",
		text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
		author: "Thomas A. Edison",
		genre: "perseverance",
	},
	{
		id: "f16",
		text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
		author: "Dr. Seuss",
		genre: "inspirational",
	},
	{
		id: "f17",
		text: "If life were predictable it would cease to be life and be without flavor.",
		author: "Eleanor Roosevelt",
		genre: "life",
	},
	{
		id: "f18",
		text: "If you look at what you have in life, you'll always have more.",
		author: "Oprah Winfrey",
		genre: "gratitude",
	},
	{
		id: "f19",
		text: "If you want to live a happy life, tie it to a goal, not to people or things.",
		author: "Albert Einstein",
		genre: "happiness",
	},
	{
		id: "f20",
		text: "Never let the fear of striking out keep you from playing the game.",
		author: "Babe Ruth",
		genre: "sports",
	},
	{
		id: "f21",
		text: "Money and success don't change people; they merely amplify what is already there.",
		author: "Will Smith",
		genre: "success",
	},
	{
		id: "f22",
		text: "Your time is limited, so don't waste it living someone else's life.",
		author: "Steve Jobs",
		genre: "life",
	},
	{
		id: "f23",
		text: "Not how long, but how well you have lived is the main thing.",
		author: "Seneca",
		genre: "philosophy",
	},
	{
		id: "f24",
		text: "If you're not stubborn, you'll give up on experiments too soon.",
		author: "Jeff Bezos",
		genre: "perseverance",
	},
	{
		id: "f25",
		text: "We must accept finite disappointment, but we must never lose infinite hope.",
		author: "Martin Luther King Jr.",
		genre: "hope",
	},
];

type AuthorQuotesResponse = {
	pagination: {
		total: number;
		limit: number;
		offset: number;
	};
	data: {
		quotes: QuoteProp[];
	};
};

const getFallbackForAuthor = (author: string, offset: number): AuthorQuotesResponse => {
	const authorQuotes = FALLBACK_QUOTES.filter(
		(q) => q.author.toLowerCase() === author.toLowerCase()
	);
	const pool = authorQuotes.length > 0 ? authorQuotes : FALLBACK_QUOTES;
	const page = pool.slice(offset, offset + 20);
	return {
		pagination: { total: pool.length, limit: 20, offset },
		data: { quotes: page },
	};
};

export const fetchRandomQuote = async (): Promise<QuoteProp> => {
	noStore();
	try {
		const response = await fetch(
			"https://api-quoto.onrender.com/v1/quote/random"
		);
		if (!response.ok) throw new Error(`API responded with ${response.status}`);
		return await response.json();
	} catch {
		return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
	}
};

export const fetchAuthorQuotes = async (
	author: string,
	offset: number
): Promise<AuthorQuotesResponse> => {
	noStore();
	try {
		const response = await fetch(
			`https://api-quoto.onrender.com/v1/quote/${author}?limit=20&offset=${offset}`
		);
		if (!response.ok) throw new Error(`API responded with ${response.status}`);
		return await response.json();
	} catch {
		return getFallbackForAuthor(author, offset);
	}
};
