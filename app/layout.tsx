import type { Metadata, Viewport } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biodrops — Premium Mineral Water | Purity, Refined",
  description:
    "Biodrops delivers ultra-pure, multi-stage purified mineral water to your home and office. 20L hygienic packaging. UV sterilized. Ozone treated. Delivered fresh.",
  keywords: [
    "mineral water",
    "purified water",
    "water delivery",
    "Biodrops",
    "premium water",
    "RO water",
    "UV sterilized",
    "Kerala water delivery",
  ],
  authors: [{ name: "Biodrops" }],
  creator: "Biodrops",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Biodrops — Premium Mineral Water",
    description:
      "Multi-stage purified. UV sterilized. Hygienically sealed. Delivered fresh.",
    siteName: "Biodrops",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biodrops — Premium Mineral Water",
    description: "Purity, Refined. Premium mineral water for modern living.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`} suppressHydrationWarning>
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
