import type { Metadata, Viewport } from "next";
import { Inter, Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import FloatingActions from "@/components/layout/FloatingActions";

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

import {
  SITE_CONFIG,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateProductSchema,
  generateSitelinksSchema,
} from "@/lib/seoConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: "BIODROPS | Premium Mineral Water in Kerala | An Initiative from Biofix",
    template: "%s | BIODROPS by Biofix",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Packaged Drinking Water Kerala",
    "Mineral Water Supplier Kerala",
    "20L Mineral Water Jar Delivery",
    "Drinking Water Delivery Calicut",
    "Drinking Water Delivery Kerala",
    "BIS Certified Water Kerala",
    "ISI Certified Drinking Water",
    "IS 14543 Water",
    "FSSAI Certified Drinking Water",
    "Biofix Technology LLP",
    "BQMS Water Quality",
    "Corporate Drinking Water Supply",
    "Safe Drinking Water Kerala",
    "Premium Water Brand India",
    "BIODROPS",
    "Biodrops Water",
  ],
  authors: [{ name: SITE_CONFIG.parentCompany, url: SITE_CONFIG.parentCompanyUrl }],
  creator: SITE_CONFIG.parentCompany,
  publisher: SITE_CONFIG.parentCompany,
  category: "Food & Beverage",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/android-chrome-192x192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.siteUrl,
    title: "BIODROPS | Premium Mineral Water in Kerala | An Initiative from Biofix",
    description: SITE_CONFIG.description,
    siteName: "BIODROPS by Biofix",
    images: [
      {
        url: SITE_CONFIG.images.ogImage,
        width: 1200,
        height: 630,
        alt: "BIODROPS Premium 20L Mineral Water Jar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BIODROPS | Premium Mineral Water in Kerala",
    description:
      "14-stage purified, mineral-balanced 20L packaged drinking water with instant batch verification.",
    images: [SITE_CONFIG.images.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ea9452a026916520",
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
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/android-chrome-192x192.png?v=2" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon-32x32.png?v=2" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
        <link rel="author" href="/humans.txt" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                generateOrganizationSchema(),
                generateLocalBusinessSchema(),
                generateWebSiteSchema(),
                generateProductSchema(),
                generateSitelinksSchema(),
              ],
            }),
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <FloatingActions />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
