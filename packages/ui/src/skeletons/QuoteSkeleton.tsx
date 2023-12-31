const QuoteSkeleton = () => {
	return (
		<div className="text-xl lg:text-4xl w-full lg:max-w-3xl border-l-[#F7DF94] pl-10 border-l-8 mx-auto  flex flex-col gap-1">
			<span>"</span>
			<p className="animate-pulse w-full h-4 lg:h-10 bg-slate-300 rounded-md"></p>
			<p className="animate-pulse w-full h-4 lg:h-10 bg-slate-300 rounded-md"></p>
			<p className="animate-pulse w-1/2  h-4 lg:h-10 bg-slate-300 rounded-md"></p>
			<span>"</span>
		</div>
	);
};
export default QuoteSkeleton;
