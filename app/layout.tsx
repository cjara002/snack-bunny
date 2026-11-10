import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

// Ship Font Awesome's CSS with the page instead of injecting it after
// hydration, which otherwise renders icons huge on first paint.
config.autoAddCss = false;

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "SnackBunny | Your progress has a face",
  description:
    "A gentle self-care companion for iPhone. Log meals, water, sleep and mood, and your bunny reflects your habits, never your body. Join the waitlist.",
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
