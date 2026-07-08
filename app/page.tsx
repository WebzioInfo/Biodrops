import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import PurificationProcess from "@/components/sections/PurificationProcess";
import WhyBiodrops from "@/components/sections/WhyBiodrops";
import ContactSection from "@/components/sections/ContactSection";
import BQMSSection from "@/components/sections/BQMSSection";
import Footer from "@/components/sections/Footer";

export const unstable_instant = { prefetch: "static" };

export const metadata: Metadata = {
  title: "BIODROPS | Pure, Mineral-Balanced Packaged Drinking Water",
  description: "BIODROPS is Kerala's premium packaged drinking water brand. Sourced and processed under the strict guidelines of Biofix Quality Management System (BQMS). Quality can be canned.",
  keywords: ["BIODROPS", "Packaged Drinking Water", "Mineral Water", "Biofix", "BQMS", "Kerala Water Supply"],
  alternates: {
    canonical: "https://biodropsindia.com",
  },
  openGraph: {
    title: "BIODROPS | Pure, Mineral-Balanced Packaged Drinking Water",
    description: "BIODROPS is Kerala's premium packaged drinking water brand. Sourced and processed under the strict guidelines of BQMS.",
    url: "https://biodropsindia.com",
    siteName: "BIODROPS",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="relative z-10 bg-[#F4F6F8]">
      <Hero />
      <ProductShowcase />
      <PurificationProcess />
      <WhyBiodrops />
      <BQMSSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
