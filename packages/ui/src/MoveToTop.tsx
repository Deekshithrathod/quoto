const MoveToTop = () => {
	return (
		<div className="mb-20 flex w-fit items-center gap-4 text-base sm:text-lg">
			<span className="rounded-md bg-[#F7DF94]/40 px-4 py-3 text-[#333333] dark:text-[#F2F2F2]">
				No more quotes to show
			</span>
			<a
				href="#top"
				className="rounded-full bg-[#F7DF94]/40 p-4 text-[#333333] transition hover:bg-[#F7DF94]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7DF94] dark:text-[#F2F2F2]"
				aria-label="Move to top">
				<svg
					aria-hidden="true"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2">
					<path d="m18 15-6-6-6 6" />
				</svg>
			</a>
		</div>
	);
};
export default MoveToTop;
