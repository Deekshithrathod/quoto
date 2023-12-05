import { MotionDiv } from ".";
import { item } from "./utils/animate";

const Quote = ({ text }: { text: string }) => {
	return (
		<MotionDiv
			variants={item}
			initial="hidden"
			whileInView="visible"
			transition={{
				duration: 0.3,
				ease: "easeInOut",
			}}
			className="text-xl lg:text-4xl tracking-wide w-full lg:max-w-3xl border-l-[#F7DF94] pl-10 lg:pl-16 border-l-8 mx-auto">
			" {text} "
		</MotionDiv>
	);
};
export default Quote;
