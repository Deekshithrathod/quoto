"use client";

import { MdAutorenew } from "react-icons/md";

const RandomBtn = ({ loading }: { loading: boolean }) => {
	return (
		<button className="flex items-center gap-2 pt-8 ml-auto text-base lg:text-base">
			random
			<span className={`${loading ? "animate-spin" : ""}`}>
				<MdAutorenew />
			</span>
		</button>
	);
};
export default RandomBtn;
