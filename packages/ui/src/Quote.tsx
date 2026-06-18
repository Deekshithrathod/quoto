type QuoteProps = {
  text: string;
  author?: string;
  genre?: string;
};

const Quote = ({ text, author, genre }: QuoteProps) => {
  const hasDetails = Boolean(author || genre);

  return (
    <blockquote className="quote-item mx-auto w-full border-l-8 border-l-[#F7DF94] pl-10 tracking-normal lg:max-w-3xl lg:pl-16">
      <details className="quote-disclosure group">
        <summary
          className="block cursor-pointer list-none text-xl leading-relaxed outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F7DF94] dark:text-[#F2F2F2] lg:text-4xl [&::-webkit-details-marker]:hidden"
          aria-label="Show quote details"
        >
          <span className="text-balance">&ldquo;{text}&rdquo;</span>
        </summary>
        <div className="quote-details mt-5 overflow-hidden border-t border-[#F7DF94]/60 pt-4 text-sm tracking-normal text-[#828282] dark:text-[#C9C9C9] lg:text-base">
          {hasDetails ? (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {author ? (
                <span>
                  <span className="font-bold text-[#333333] dark:text-[#F2F2F2]">
                    Author
                  </span>{" "}
                  {author}
                </span>
              ) : null}
              {genre ? (
                <span className="capitalize">
                  <span className="font-bold text-[#333333] dark:text-[#F2F2F2]">
                    Genre
                  </span>{" "}
                  {genre}
                </span>
              ) : null}
            </div>
          ) : (
            <span>Quote details unavailable</span>
          )}
        </div>
      </details>
    </blockquote>
  );
};

export default Quote;
