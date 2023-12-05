import { MdAutorenew } from "react-icons/md";

const RandomBtn = () => {
	return (
		<button className="flex items-center gap-2 pt-8 ml-auto text-base lg:text-base">
			random
			<span>
				<MdAutorenew />
			</span>
		</button>
	);
};
export default RandomBtn;
