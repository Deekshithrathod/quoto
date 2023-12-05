"use client";
import RandomBtn from "@repo/ui/src/RandomBtn";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<header
			onClick={() => {
				console.log("clicked");
				if (pathname !== "/") {
					router.push("/");
				}
				router.refresh();
			}}>
			<nav>
				<RandomBtn />
			</nav>
		</header>
	);
};

export default Header;
