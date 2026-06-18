import AuthorBtn from "@repo/ui/src/AuthorBtn";
import Quote from "@repo/ui/src/Quote";
import { fetchRandomQuote } from "./lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quoto | Random Quote",
};

const Page = async () => {
  const { text, author, genre } = await fetchRandomQuote();
  return (
    <div className="mt-16 lg:mt-24">
      <Quote text={text} author={author} genre={genre} />
      <AuthorBtn
        author={author}
        genre={genre}
        href={`/${encodeURIComponent(author)}`}
      />
    </div>
  );
};

export default Page;
