import "@repo/ui/styles.css";
import type { Metadata, Viewport } from "next";
import Footer from "@repo/ui/src/Footer";
import Header from "../components/Header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#181818",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quoto.brotherOf.dhruvarathod.com"),
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
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/android-chrome-192x192.png",
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
        url: "/opengraph-image.png",
      },
    ],
    url: "https://quoto.brotherOf.dhruvarathod.com",
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
        url: "/twitter-image.png",
        width: 1600,
        height: 900,
      },
    ],
  },

  // Apple config
  appleWebApp: {
    capable: true,
    title: "Quoto | Today's Quote",
    startupImage: "/icons/android-chrome-192x192.png",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        id="top"
        className="mx-auto flex min-h-screen w-[min(88vw,48rem)] flex-col bg-[#FAFAFA] font-sans font-medium text-[#333333] antialiased transition-colors duration-200 dark:bg-[#181818] dark:text-[#F2F2F2]"
      >
        <Header />
        <main className="flex-1 pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
