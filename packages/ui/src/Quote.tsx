const Quote = async ({ text }: { text: string }) => {
	return (
		<div className="text-xl lg:text-4xl tracking-wide w-full lg:max-w-3xl border-l-[#F7DF94] pl-10 lg:pl-16 border-l-8 mx-auto">
			"
			{text ||
				"I think the thing we see is that as people are using video games more, they tend to watch passive TV a bit less. And so using the PC for the Internet, playing video games, is starting to cut into the rather unbelievable amount of time people spend watching TV."}
			"
		</div>
	);
};
export default Quote;
