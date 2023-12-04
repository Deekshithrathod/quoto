import AuthorBtnSkeleton from "@repo/ui/src/skeletons/AuthorBtnSkeleton";
import QuoteSkeleton from "@repo/ui/src/skeletons/QuoteSkeleton";

const Loading = () => {
	return (
		<div className="mt-16 lg:mt-24 ">
			<QuoteSkeleton />
			<AuthorBtnSkeleton />
		</div>
	);
};
export default Loading;
