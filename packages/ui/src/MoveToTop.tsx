"use client";
import { FaArrowUp } from "react-icons/fa";

const MoveToTop = () => {
	const handleMoveToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="text-xl w-fit mb-20 flex gap-6 " onClick={handleMoveToTop}>
			<span className="bg-[#F7DF94] bg-opacity-40 rounded-md p-4 cursor-pointer">
				No more quotes to show{" "}
			</span>
			<button className="bg-opacity-40 bg-[#F7DF94] rounded-full p-4 animate-[bounce_1.5s_ease-in-out_5]">
				<FaArrowUp />
			</button>
		</div>
	);
};
export default MoveToTop;
