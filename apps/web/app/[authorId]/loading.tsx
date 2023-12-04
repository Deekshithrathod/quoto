import QuoteSkeleton from "@repo/ui/src/skeletons/QuoteSkeleton";

const loading = () => {
	return (
		<>
			<div className="h-8 ml-12 lg:ml-16 lg:h-10 mt-8 lg:mt-16 bg-gray-300 animate-pulse w-2/6 rounded"></div>

			<div className="flex flex-col gap-12 mt-8 lg:gap-20 lg:mt-20 mb-20 w-full">
				<QuoteSkeleton />
				<QuoteSkeleton />
				<QuoteSkeleton />
				<QuoteSkeleton />
				<QuoteSkeleton />
			</div>
		</>
	);
};
export default loading;
