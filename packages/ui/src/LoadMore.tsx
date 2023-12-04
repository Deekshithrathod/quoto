"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAuthorQuotes } from "../../../apps/web/app/lib/data";
import Quote from "./Quote";

const LoadMore = ({ author }: { author: string }) => {
	const { ref, inView } = useInView();
	const [offset, setOffset] = useState(20);
	const [total, setTotal] = useState(10);
	const [quotes, setQuotes] = useState<{ text: string }[]>([]);
	const [nomore, setNomore] = useState(false);

	useEffect(() => {
		if (inView && !nomore) {
			fetchAuthorQuotes(author, 20, offset).then((data) => {
				console.log(data);
				console.log(data.data);

				if (data.message) {
					setNomore(true);
					return;
				}
				const tot = data.pagination.total;
				setTotal(tot);

				if (offset + 20 >= total) {
					return;
				}

				setOffset(offset + 20);
				setQuotes([...quotes, ...data.data.quotes]);
			});
		}
	}, [inView]);

	return (
		<>
			<section className="flex flex-col gap-12 mt-8 lg:gap-20 lg:mt-20 mb-20">
				{quotes.map((quote: { text: string }) => (
					<Quote text={quote.text} />
				))}
			</section>
			<div
				ref={ref}
				className={`text-3xl bg-red-200 h-10 ${nomore && "animate-pulse"}`}>
				{nomore ? "No more quotes" : "LoadMore"}
			</div>
		</>
	);
};

export default LoadMore;
