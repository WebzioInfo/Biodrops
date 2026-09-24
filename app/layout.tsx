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

export const metadata: Metadata = {
  metadataBase: new URL("https://biodropsindia.com"),
  title: {
    default: "BIODROPS | Premium Mineral Water in Kerala | An Initiative from Biofix",
    template: "%s | BIODROPS by Biofix",
  },
  description:
    "BIODROPS is Kerala's leading premium packaged drinking water brand by Biofix Technology LLP. 14-stage purified, mineral-balanced 20L jars with instant online batch verification. BIS IS 14543 & FSSAI certified.",
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
  authors: [{ name: "Biofix Technology LLP", url: "https://biofixtechnology.com" }],
  creator: "Biofix Technology LLP",
  publisher: "Biofix Technology LLP",
  category: "Food & Beverage",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://biodropsindia.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://biodropsindia.com",
    title: "BIODROPS | Premium Mineral Water in Kerala | An Initiative from Biofix",
    description:
      "14-stage purified, mineral-balanced 20L packaged drinking water jars with online batch verification. BIS IS 14543 and FSSAI certified.",
    siteName: "BIODROPS by Biofix",
    images: [
      {
        url: "https://biodropsindia.com/images/premium-jar-studio.jpg",
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
    images: ["https://biodropsindia.com/images/premium-jar-studio.jpg"],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
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
                  "alternateName": ["BIODROPS India", "BIODROPS Water", "Biodrops Mineral Water"],
                  "url": "https://biodropsindia.com",
                  "logo": "https://biodropsindia.com/images/logo.png",
                  "image": "https://biodropsindia.com/images/premium-jar-studio.jpg",
                  "description": "Kerala's premium packaged drinking water brand. 14-stage purified, mineral-balanced water with online batch testing verification.",
                  "parentOrganization": {
                    "@type": "Organization",
                    "@id": "https://biofixtechnology.com/#parent_organization",
                    "name": "Biofix Technology LLP",
                    "url": "https://biofixtechnology.com"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressRegion": "Kerala",
                    "addressCountry": "IN"
                  },
                  "areaServed": [
                    {
                      "@type": "AdministrativeArea",
                      "name": "Kerala"
                    },
                    {
                      "@type": "Country",
                      "name": "India"
                    }
                  ],
                  "sameAs": [
                    "https://www.instagram.com/biodrops.india",
                    "https://biofixtechnology.com"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-88845-77773",
                    "contactType": "customer service",
                    "email": "hello@biodrops.com",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Malayalam"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://biodropsindia.com/#website",
                  "url": "https://biodropsindia.com",
                  "name": "BIODROPS",
                  "description": "Premium 14-stage purified packaged mineral water in Kerala. An initiative from Biofix.",
                  "publisher": {
                    "@id": "https://biodropsindia.com/#organization"
                  },
                  "inLanguage": "en-IN"
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
                  "image": "https://biodropsindia.com/images/premium-jar-studio.jpg",
                  "brand": {
                    "@id": "https://biodropsindia.com/#brand"
                  },
                  "manufacturer": {
                    "@id": "https://biodropsindia.com/#organization"
                  },
                  "description": "14-stage purified premium packaged drinking water in a 20-liter heavy-duty jar featuring our signature BQMS pure lock safety sleeve and online batch verification.",
                  "category": "Packaged Drinking Water",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                      "@id": "https://biodropsindia.com/#organization"
                    }
                  }
                },
                {
                  "@type": "ItemList",
                  "@id": "https://biodropsindia.com/#sitenavigation",
                  "name": "BIODROPS Primary Sitelinks",
                  "itemListElement": [
                    {
                      "@type": "SiteNavigationElement",
                      "position": 1,
                      "name": "Know Your Water",
                      "description": "Enter your 20L jar sleeve batch number to inspect certified water quality testing reports",
                      "url": "https://biodropsindia.com/KNOWYOURWATER"
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 2,
                      "name": "Purification Process",
                      "description": "Explore the clinical 14-stage water purification pipeline from sand filtration to UV and ozone sterilization",
                      "url": "https://biodropsindia.com/process"
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 3,
                      "name": "BQMS System",
                      "description": "Biofix Quality Management System ensuring BIS IS 14543 and FSSAI standards",
                      "url": "https://biodropsindia.com/bqms"
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 4,
                      "name": "Why BIODROPS",
                      "description": "Zero contaminants, balanced pH 7.4, and touch-free automated bottling in Kerala",
                      "url": "https://biodropsindia.com/why-us"
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 5,
                      "name": "Certifications",
                      "description": "BIS IS 14543, FSSAI, and ISO 9001:2015 national compliance and accreditations",
                      "url": "https://biodropsindia.com/certifications"
                    },
                    {
                      "@type": "SiteNavigationElement",
                      "position": 6,
                      "name": "Frequently Asked Questions",
                      "description": "Common questions about BIODROPS water purity, corporate delivery, and testing reports",
                      "url": "https://biodropsindia.com/faq"
                    }
                  ]
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
          <FloatingActions />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
