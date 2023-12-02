"use client";
import { MdAutorenew } from "react-icons/md";

const RandomBtn = () => {
	return (
		<button
			type="submit"
			className="flex items-center gap-2 pt-8 ml-auto text-base lg:text-base">
			random <MdAutorenew />
		</button>
	);
};
export default RandomBtn;
