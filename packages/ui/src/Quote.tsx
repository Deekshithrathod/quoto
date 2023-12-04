const Quote = ({ text }: { text: string }) => {
	return (
		<div className="text-xl lg:text-4xl tracking-wide w-full lg:max-w-3xl border-l-[#F7DF94] pl-10 lg:pl-16 border-l-8 mx-auto">
			" {text} "
		</div>
	);
};
export default Quote;
