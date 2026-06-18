"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { QuoteProp, fetchAuthorQuotes } from "../../../apps/web/app/lib/data";
import Quote from "./Quote";
import QuoteSkeleton from "./skeletons/QuoteSkeleton";
import MoveToTop from "./MoveToTop";

const LoadMore = ({ author }: { author: string }) => {
	const { ref, inView } = useInView();
	const [quotes, setQuotes] = useState<QuoteProp[]>([]);
	const [nomore, setNomore] = useState(false);
	const [offset, setOffset] = useState(20);

	useEffect(() => {
		if (inView && !nomore) {
			fetchAuthorQuotes(author, offset)
				.then((res) => {
					const incoming = res.data.quotes;
					if (!incoming || incoming.length === 0) {
						setNomore(true);
						return;
					}
					setOffset((prev) => prev + 20);
					setQuotes((prev) => [...prev, ...incoming]);
				})
				.catch(() => setNomore(true));
		}
	}, [inView, nomore, offset, author]);

	return (
		<>
			<section className="flex flex-col gap-12 mt-8 lg:gap-20 lg:mt-20 mb-20">
				{quotes.map((quote: QuoteProp, index: number) => (
					<Quote
						key={quote.id || index + "" + new Date().toTimeString()}
						text={quote.text}
					/>
				))}
			</section>
			{!nomore && (
				<div
					ref={ref}
					className={`text-xl bg-[#F7DF94] bg-opacity-40 rounded-md p-4 w-fit mb-20 ${
						!nomore && "animate-pulse"
					}`}>
					Loading more quotes...
				</div>
			)}
			{nomore ? <MoveToTop /> : <QuoteSkeleton />}
		</>
	);
};

export default LoadMore;
