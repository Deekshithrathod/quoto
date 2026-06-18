type QuoteProps = {
  text: string;
  author?: string;
  genre?: string;
};

const Quote = ({ text, author, genre }: QuoteProps) => {
  const hasDetails = Boolean(author || genre);

  return (
    <blockquote className="quote-item mx-auto w-full border-l-8 border-l-[#F7DF94] pl-10 tracking-normal lg:max-w-3xl lg:pl-16">
      <p className="text-balance text-xl leading-relaxed dark:text-[#F2F2F2] lg:text-4xl">
        &ldquo;{text}&rdquo;
      </p>
      {hasDetails ? (
        <div className="mt-5 border-t border-[#F7DF94]/60 pt-4 text-sm tracking-normal text-[#828282] dark:text-[#C9C9C9] lg:text-base">
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
        </div>
      ) : null}
    </blockquote>
  );
};

export default Quote;
