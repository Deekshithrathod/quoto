"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { QuoteProp, fetchAuthorQuotes } from "../../../apps/web/app/lib/data";
import Quote from "./Quote";
import QuoteSkeleton from "./skeletons/QuoteSkeleton";

let total = 10;
let offset = 20;

const LoadMore = ({ author }: { author: string }) => {
	const { ref, inView } = useInView();
	const [quotes, setQuotes] = useState<QuoteProp[]>([]);
	const [nomore, setNomore] = useState(false);

	useEffect(() => {
		if (inView && !nomore) {
			console.log("fetching");

			fetchAuthorQuotes(author, offset).then((res) => {
				console.log(res);
				console.log(res.data);

				if (!res.pagination) {
					setNomore(true);
					return;
				}

				offset += 20;
				setQuotes([...quotes, ...res.data.quotes]);
			});
		}
	}, [inView]);

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
			<div
				ref={ref}
				className={`text-xl bg-[#F7DF94] bg-opacity-40 rounded-md p-4 w-fit mb-20 ${
					!nomore && "animate-pulse"
				}`}>
				{nomore ? "No more quotes to show" : "Loading more quotes..."}
			</div>
			{!nomore && <QuoteSkeleton />}
		</>
	);
};

export default LoadMore;
