const AuthorBtnSkeleton = () => {
	return (
		<div className="pl-6 mt-8 lg:mt-12">
			<button className="flex items-center justify-between w-full p-6 lg:p-10 bg-[#333333]">
				<div className="flex flex-col items-start w-full gap-2">
					<div className="text-xl capitalize  bg-gray-200 rounded h-4 w-2/5 animate-pulse"></div>
					<div className="text-xl capitalize  bg-gray-100 rounded h-3 w-1/5 animate-pulse"></div>
				</div>
			</button>
		</div>
	);
};
export default AuthorBtnSkeleton;
