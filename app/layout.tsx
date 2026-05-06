import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "SnackBunny — No calorie counting, no guilt",
  description:
    "Tap your SnackBunny each time you snack. The more you tap, the chonkier it gets. Mindful snacking without the math.",
  icons: {
    icon: "/assets/snack-bunny-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="antialiased overflow-x-hidden">
        {children}
        <Analytics mode="production" />
      </body>
    </html>
  );
}
