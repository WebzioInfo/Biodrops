import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import PurificationProcess from "@/components/sections/PurificationProcess";
import WhyBiodrops from "@/components/sections/WhyBiodrops";
import WhoWeServe from "@/components/sections/WhoWeServe";
import ContactSection from "@/components/sections/ContactSection";
import BQMSSection from "@/components/sections/BQMSSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "BIODROPS™ Official Website | Premium Packaged Mineral Water Kerala",
  description:
    "Official website of BIODROPS, Kerala's premier 14-stage purified packaged drinking water by Biofix Technology LLP. 20L jars with BQMS Pure Lock and online batch verification. BIS IS 14543 & FSSAI certified.",
  keywords: [
    "Packaged Drinking Water Kerala",
    "Mineral Water Supplier Kerala",
    "20L Mineral Water Jar Delivery",
    "Drinking Water Delivery Calicut",
    "BIS Certified Mineral Water",
    "ISI 14543 Water Kerala",
    "Biofix Drinking Water",
    "BQMS Certified Water",
    "Commercial Water Supply Kerala",
    "Pure Drinking Water Kerala",
  ],
  alternates: {
    canonical: "https://www.biodropsindia.com",
  },
  openGraph: {
    title: "BIODROPS | Premium Mineral Water in Kerala",
    description:
      "14-stage purified, mineral-balanced 20L packaged drinking water jars with online batch verification. BIS IS 14543 and FSSAI certified.",
    url: "https://www.biodropsindia.com",
    siteName: "BIODROPS by Biofix",
    type: "website",
    images: [
      {
        url: "https://www.biodropsindia.com/images/premium-jar-studio.jpg",
        width: 1200,
        height: 630,
        alt: "BIODROPS 20L Premium Mineral Water Jar in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BIODROPS | Premium Mineral Water in Kerala",
    description: "Kerala's premier 14-stage purified packaged mineral water by Biofix.",
    images: ["https://www.biodropsindia.com/images/premium-jar-studio.jpg"],
  },
};

export default function HomePage() {
  return (
    <div className="relative z-10 bg-[#F4F6F8]">
      <Hero />
      <ProductShowcase />
      <PurificationProcess />
      <WhyBiodrops />
      <WhoWeServe />
      <BQMSSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
