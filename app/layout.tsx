import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Hero Cleaning Group LLC — Commercial Cleaning in DFW",
  description:
    "Reliable, responsive, and experienced commercial cleaning in Dallas-Fort Worth. Apartment turnovers, office cleaning, and post-construction for property managers and investors.",
  openGraph: {
    title: "Hero Cleaning Group LLC — Commercial Cleaning in DFW",
    description:
      "Apartment turnovers, office cleaning, and post-construction cleaning across the Dallas-Fort Worth Metroplex.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#05070d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body className="grain bg-ink font-sans text-white antialiased">
        <SmoothScroll />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
