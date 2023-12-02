import AuthorBtnSkeleton from "@repo/ui/src/skeletons/AuthorBtnSkeleton";
import QuoteSkeleton from "@repo/ui/src/skeletons/QuoteSkeleton";

const Loading = () => {
	return (
		<>
			<QuoteSkeleton />
			<AuthorBtnSkeleton />
		</>
	);
};
export default Loading;
