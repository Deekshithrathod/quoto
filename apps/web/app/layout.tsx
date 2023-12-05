import "@repo/ui/styles.css";
import type { Metadata, Viewport } from "next";
import { Montserrat, Raleway } from "next/font/google";
import Footer from "@repo/ui/src/Footer";
import Header from "../components/Header";

const raleway = Raleway({
	subsets: ["latin"],
	weight: ["500", "700"],
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["500", "700"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
	metadataBase: new URL("https://quoto-web.vercel.app/"),
	applicationName: "Quoto",
	authors: [{ name: "Deekshith Rathod" }],
	generator: "Next.js",
	keywords: [
		"Quoto",
		"Quotes",
		"Daily",
		"Nuggets",
		"Insight",
		"Fullstack",
		"Next.js",
		"React",
		"Tailwind",
		"Typescript",
		"Developer",
		"Turbo repo",
	],

	creator: "Deekshith Rathod",
	icons: {
		shortcut: "/favicon.ico",
		apple: "/icons/apple-touch-icon.png",
	},
	title: {
		template: "Quoto | %s",
		default: "Quoto",
	},
	description: "Daily nuggets of insight",
	manifest: "/manifest.json",
	openGraph: {
		title: "Quoto | Today's Quote",
		description: "Daily nuggets of insight",
		siteName: "Quoto",
		locale: "en",
		images: [
			{
				url: "/og.png",
			},
		],
		url: "https://quoto-web.vercel.app/",
		type: "website",
	},

	// OG: Twitter
	twitter: {
		site: "Quoto",
		title: "Quoto | Today's Quote",
		description: "Daily nuggets of insight",
		creator: "@DeekshithRathod",
		card: "summary_large_image",
		images: [
			{
				url: "/og.png",
				width: 192,
				height: 192,
			},
		],
	},

	// Apple config
	appleWebApp: {
		capable: true,
		title: "Quoto | Today's Quote",
		startupImage: "/icons/android-chrome-192x192.png",
		statusBarStyle: "black-translucent",
	},
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
				<Header />
				<main className="pb-12">{children}</main>
				<Footer classes={`${montserrat.className}`} />
			</body>
		</html>
	);
}
