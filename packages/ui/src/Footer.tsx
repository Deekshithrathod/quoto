const Footer = ({ classes }: { classes?: string }) => {
	return (
		<div
			className={`text-center ${classes} text-sm font-medium text-[#828282] absolute bottom-0 w-full py-4`}>
			created by{" "}
			<a
				href="https://github.com/DeekshithRathod"
				className="underline font-bold"
				target="_blank">
				Deekshith Rathod
			</a>
		</div>
	);
};
export default Footer;
