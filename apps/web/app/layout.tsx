import "@repo/ui/styles.css";

import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["500", "700"], // Add the desired font weights here
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
      <body className={`${raleway.className} font-medium`}>{children}</body>
    </html>
  );
}
