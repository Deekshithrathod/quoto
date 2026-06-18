"use client";

import { useEffect, useRef, useState } from "react";
import Quote from "./Quote";
import QuoteSkeleton from "./skeletons/QuoteSkeleton";
import MoveToTop from "./MoveToTop";

type QuoteItem = {
  id?: string;
  text: string;
  author: string;
  genre: string;
};

type AuthorQuotesResponse = {
  data: {
    quotes: QuoteItem[];
  };
};

const PAGE_SIZE = 20;

const LoadMore = ({ author }: { author: string }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const nextOffsetRef = useRef(PAGE_SIZE);
  const loadingRef = useRef(false);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    nextOffsetRef.current = PAGE_SIZE;
    loadingRef.current = false;
    setQuotes([]);
    setHasMore(true);
    setIsLoading(false);
  }, [author]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || loadingRef.current) return;

        loadingRef.current = true;
        setIsLoading(true);
        const currentOffset = nextOffsetRef.current;

        fetch(
          `/api/quotes/${encodeURIComponent(author)}?offset=${currentOffset}`,
        )
          .then(async (response) => {
            if (!response.ok) throw new Error("Unable to load quotes");
            return (await response.json()) as AuthorQuotesResponse;
          })
          .then((res) => {
            if (cancelled) return;
            const incoming = res.data.quotes;
            if (!incoming || incoming.length === 0) {
              setHasMore(false);
              return;
            }
            nextOffsetRef.current = currentOffset + PAGE_SIZE;
            setQuotes((prev) => [...prev, ...incoming]);
          })
          .catch(() => {
            if (!cancelled) setHasMore(false);
          })
          .finally(() => {
            if (cancelled) return;
            loadingRef.current = false;
            setIsLoading(false);
          });
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [author, hasMore]);

  return (
    <>
      <section className="mt-8 flex flex-col gap-12 lg:mt-20 lg:gap-20">
        {quotes.map((quote: QuoteItem, index: number) => (
          <Quote
            key={quote.id ?? `${quote.author}-${quote.text}-${index}`}
            text={quote.text}
            author={quote.author}
            genre={quote.genre}
          />
        ))}
      </section>
      {hasMore ? (
        <div ref={sentinelRef} className="min-h-24 py-10" aria-live="polite">
          {isLoading ? <QuoteSkeleton /> : null}
        </div>
      ) : (
        <MoveToTop />
      )}
    </>
  );
};

export default LoadMore;
