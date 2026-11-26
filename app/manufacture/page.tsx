import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import ManufacturersDirectoryClient from "@/components/manufacturers/ManufacturersDirectoryClient";

export const metadata: Metadata = {
  title: "Manufacturing Partners Directory | BIODROPS Mineral Water",
  description:
    "Meet BIODROPS' certified manufacturing partners across Kerala and India. Explore each verified bottling facility, regulatory licenses, locations, and direct contact details.",
  keywords: [
    "BIODROPS Manufacturing Partners",
    "Certified Mineral Water Manufacturers Kerala",
    "Packaged Drinking Water Bottling Partners",
    "BIS IS 14543 Water Plants",
    "Aquora Verified Manufacturers",
  ],
  alternates: {
    canonical: "https://www.biodropsindia.com/manufacture",
  },
  openGraph: {
    title: "Meet Our Manufacturing Partners | BIODROPS",
    description:
      "Behind every BIODROPS jar is a network of trusted manufacturing partners committed to quality, purity, and excellence.",
    url: "https://www.biodropsindia.com/manufacture",
    type: "website",
    images: [
      {
        url: "https://www.biodropsindia.com/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "BIODROPS Manufacturing Partners Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Manufacturing Partners | BIODROPS",
    description:
      "Discover BIODROPS' certified mineral water manufacturing partners committed to quality and purity.",
    images: ["https://www.biodropsindia.com/images/hero-bg.jpg"],
  },
};

export default function ManufacturePage() {
  const directorySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.biodropsindia.com/manufacture/#webpage",
        url: "https://www.biodropsindia.com/manufacture",
        name: "Manufacturing Partners Directory | BIODROPS Mineral Water",
        description:
          "Directory of certified BIODROPS mineral water manufacturing partners synchronized from the Aquora platform.",
        isPartOf: {
          "@id": "https://www.biodropsindia.com/#website",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.biodropsindia.com/manufacture/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.biodropsindia.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Manufacturing Partners",
            item: "https://www.biodropsindia.com/manufacture",
          },
        ],
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-[#F4F6F8] selection:bg-[#cfef00] selection:text-black"
      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      <ManufacturersDirectoryClient />

      <Footer />
    </div>
  );
}
