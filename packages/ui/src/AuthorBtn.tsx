import { FaLongArrowAltRight } from "react-icons/fa";
import { MotionDiv } from ".";
import { item } from "./utils/animate";

const AuthorBtn = ({ author, genre }: { author: string; genre: string }) => {
	return (
		<MotionDiv
			variants={item}
			initial="hidden"
			animate="visible"
			transition={{
				duration: 0.3,
				ease: "easeInOut",
				delay: 0.6,
			}}
			className="pl-6 mt-8 lg:mt-12">
			<button className="group flex items-center justify-between w-full text-[#4f4f4f] hover:text-[#F2f2f2] p-6 lg:p-10 bg-transparent hover:bg-[#333333]">
				<div className="flex flex-col items-start">
					<div className="text-xl capitalize">{author}</div>
					<div className="text-sm lowercase text-[#828282]">{genre}</div>
				</div>
				<div className="hidden group-hover:block">
					<FaLongArrowAltRight />
				</div>
			</button>
		</MotionDiv>
	);
};
export default AuthorBtn;
