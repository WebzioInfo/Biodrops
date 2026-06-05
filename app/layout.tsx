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
  metadataBase: new URL("https://biodrops.com"),
  title: {
    default: "Biodrops — Premium Mineral Water | An Initiative from Biofix",
    template: "%s | Biodrops by Biofix",
  },
  description:
    "Biodrops, an initiative from Biofix, delivers ultra-pure, 14-stage purified premium mineral water to your home and office. BIS and FSSAI certified safe drinking water in Kerala.",
  keywords: [
    "Packaged Drinking Water",
    "Mineral Water",
    "Premium Drinking Water",
    "Bottled Water Supplier",
    "Water Manufacturing Company",
    "Water Purification",
    "Safe Drinking Water",
    "BIS Certified Water",
    "ISI Certified Water",
    "Drinking Water Kerala",
    "Mineral Water Kerala",
    "Packaged Drinking Water India",
    "Biodrops",
    "Biofix",
  ],
  authors: [{ name: "Biofix Technology LLP" }],
  creator: "Biofix Technology LLP",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Biodrops — Premium Mineral Water | An Initiative from Biofix",
    description:
      "Biodrops, an initiative from Biofix, delivers ultra-pure, 14-stage purified premium mineral water.",
    siteName: "Biodrops by Biofix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biodrops — Premium Mineral Water",
    description: "Premium mineral water for modern living. An initiative from Biofix.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://biofixtechnology.com/#organization",
                  "name": "Biofix Technology LLP",
                  "url": "https://biofixtechnology.com",
                  "logo": "https://biodrops.com/images/biofix.png",
                  "description": "Experts in water purification and BQMS quality management.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "MC Building, Bypass Road",
                    "addressLocality": "Kondotty",
                    "addressRegion": "Kerala",
                    "postalCode": "673638",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "Product",
                  "@id": "https://biodrops.com/#product",
                  "name": "Biodrops Premium Mineral Water",
                  "brand": {
                    "@type": "Brand",
                    "name": "Biodrops"
                  },
                  "manufacturer": {
                    "@id": "https://biofixtechnology.com/#organization"
                  },
                  "description": "14-stage purified premium packaged drinking water.",
                  "category": "Packaged Drinking Water"
                }
              ]
            })
          }}
        />
      </head>
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
