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
  metadataBase: new URL("https://biodropsindia.com"),
  title: {
    default: "BIODROPS — Premium Mineral Water | An Initiative from Biofix",
    template: "%s | BIODROPS by Biofix",
  },
  description:
    "BIODROPS, an initiative from Biofix, delivers ultra-pure, 14-stage purified premium mineral water to your home and office. BIS and FSSAI certified safe drinking water in Kerala.",
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
    "BIODROPS",
    "Biofix",
  ],
  authors: [{ name: "Biofix Technology LLP" }],
  creator: "Biofix Technology LLP",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "BIODROPS — Premium Mineral Water | An Initiative from Biofix",
    description:
      "BIODROPS, an initiative from Biofix, delivers ultra-pure, 14-stage purified premium mineral water.",
    siteName: "BIODROPS by Biofix",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIODROPS — Premium Mineral Water",
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
        <link rel="author" href="/humans.txt" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://biodropsindia.com/#organization",
                  "name": "BIODROPS",
                  "alternateName": ["BIODROPS India", "BIODROPS Water"],
                  "url": "https://biodropsindia.com",
                  "logo": "https://biodropsindia.com/images/logo.png",
                  "description": "Premium packaged drinking water brand. Quality can be canned.",
                  "parentOrganization": {
                    "@type": "Organization",
                    "@id": "https://biofixtechnology.com/#parent_organization",
                    "name": "Biofix Technology LLP",
                    "url": "https://biofixtechnology.com"
                  },
                  "sameAs": [
                    "https://www.instagram.com/biodrops.india",
                    "https://facebook.com"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-88845-77773",
                    "contactType": "customer service",
                    "email": "hello@biodrops.com",
                    "areaServed": "IN",
                    "availableLanguage": "English"
                  }
                },
                {
                  "@type": "Brand",
                  "@id": "https://biodropsindia.com/#brand",
                  "name": "BIODROPS",
                  "slogan": "Quality can be canned.",
                  "logo": "https://biodropsindia.com/images/logo.png",
                  "parentBrand": {
                    "@type": "Brand",
                    "name": "Biofix"
                  }
                },
                {
                  "@type": "Product",
                  "@id": "https://biodropsindia.com/#product",
                  "name": "BIODROPS Premium Mineral Water 20L",
                  "brand": {
                    "@id": "https://biodropsindia.com/#brand"
                  },
                  "manufacturer": {
                    "@id": "https://biodropsindia.com/#organization"
                  },
                  "description": "14-stage purified premium packaged drinking water in a 20-liter heavy-duty jar featuring our signature BQMS pure lock safety sleeve.",
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
