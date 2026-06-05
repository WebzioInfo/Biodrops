"use client";

import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ContactSection from "@/components/sections/ContactSection";
import BQMSSection from "@/components/sections/BQMSSection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="relative z-10 bg-[#F4F6F8]">
      <Hero />
      <ProductShowcase />
      <BQMSSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
