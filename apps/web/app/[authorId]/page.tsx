import Quote from "@repo/ui/src/Quote";
import { QuoteProp, fetchAuthorQuotes } from "../lib/data";
import LoadMore from "@repo/ui/src/LoadMore";
import { Metadata } from "next";

const getAuthorName = (authorId: string) => decodeURIComponent(authorId);

export async function generateMetadata({
  params,
}: {
  params: { authorId: string };
}): Promise<Metadata> {
  return {
    title: getAuthorName(params.authorId),
  };
}
const page = async ({ params }: { params: { authorId: string } }) => {
  const authorId = getAuthorName(params.authorId) || "Bill Gates";
  const quotes = await fetchAuthorQuotes(authorId, 0);

  return (
    <>
      <h1 className="text-2xl lg:text-4xl pl-12 lg:pl-16 lg:ml-2 font-bold mt-8 lg:mt-16">
        {authorId}
      </h1>
      <section className="flex flex-col gap-12 mt-8 lg:gap-20 lg:mt-20 mb-20">
        {quotes.data.quotes.map((quote: QuoteProp, index: number) => (
          <Quote
            key={quote.id ?? `${quote.author}-${quote.text}-${index}`}
            text={quote.text}
            author={quote.author}
            genre={quote.genre}
          />
        ))}
      </section>
      <LoadMore author={authorId} />
    </>
  );
};
export default page;
