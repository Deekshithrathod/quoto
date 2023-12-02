import { FaLongArrowAltRight } from "react-icons/fa";

const AuthorBtn = ({ author, genre }: { author: string; genre: string }) => {
	return (
		<div className="pl-6 mt-8 lg:mt-12">
			<button className="group flex items-center justify-between w-full text-[#4f4f4f] hover:text-[#F2f2f2] p-6 lg:p-10 bg-transparent hover:bg-[#333333]">
				<div className="flex flex-col items-start">
					<div className="text-xl capitalize">{author || "Unknown"}</div>
					<div className="text-sm lowercase text-[#828282]">
						{genre || "Unknown"}
					</div>
				</div>
				<div className="hidden group-hover:block">
					<FaLongArrowAltRight />
				</div>
			</button>
		</div>
	);
};
export default AuthorBtn;
