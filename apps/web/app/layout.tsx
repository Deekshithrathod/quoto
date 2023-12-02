import "@repo/ui/styles.css";
import RandomBtn from "@repo/ui/src/RandomBtn";
import { handleClickServer } from "@repo/ui/src/action";
import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import Footer from "@repo/ui/src/Footer";

const raleway = Raleway({
	subsets: ["latin"],
	weight: ["500", "700"],
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["500", "700"],
});

export const metadata: Metadata = {
	title: "Quoto | Today's Quote",
	description: "Daily Nuggets of Insight",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en">
			<body
				className={`${raleway.className} font-medium w-4/5 mx-auto lg:max-w-3xl relative min-h-screen`}>
				<header>
					<nav>
						<form action={handleClickServer}>
							<RandomBtn />
						</form>
					</nav>
				</header>
				<main className="mt-16 lg:mt-24 pb-12">{children}</main>
				<Footer classes={`${montserrat.className}`} />
			</body>
		</html>
	);
}
