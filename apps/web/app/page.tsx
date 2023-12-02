import AuthorBtn from "@repo/ui/src/AuthorBtn";
import Quote from "@repo/ui/src/Quote";
import { fetchRandomQuote } from "./lib/data";

const Page = async () => {
	const { text, author, genre } = await fetchRandomQuote();
	return (
		<>
			<Quote text={text} />
			<AuthorBtn author={author} genre={genre} />
		</>
	);
};

export default Page;
