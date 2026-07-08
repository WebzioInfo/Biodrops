import type { Metadata } from "next";
import FadeIn from "@/components/effects/FadeIn";
import Footer from "@/components/sections/Footer";

export const unstable_instant = { prefetch: "static" };

export const metadata: Metadata = {
  title: "Our Story - BIODROPS",
  description: "Learn about the vision behind BIODROPS, a premium packaged drinking water brand launched by Biofix Technology LLP. Engineered for absolute purity.",
  alternates: {
    canonical: "https://biodropsindia.com/about",
  },
  openGraph: {
    title: "Our Story - BIODROPS",
    description: "Learn about the vision behind BIODROPS, a premium packaged drinking water brand launched by Biofix Technology LLP.",
    url: "https://biodropsindia.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-32">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <FadeIn>
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#6B7C80] font-medium mb-6">
            <span className="w-12 h-px bg-[#6B7C80]/30" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#070D0E] mb-8 leading-tight">
            The Vision Behind <span className="italic text-[#56C7D9]">Biodrops.</span>
          </h1>
          
          <div className="prose prose-lg prose-gray max-w-none text-[#070D0E]/80">
            <p className="lead text-xl md:text-2xl font-light mb-8">
              Biodrops is a premium packaged drinking water brand, an ambitious initiative launched by <strong>Biofix Technology LLP</strong>.
            </p>
            
            <h2 className="text-3xl font-serif text-[#070D0E] mt-12 mb-6">Who is Biofix?</h2>
            <p className="mb-6">
              Biofix Technology LLP is a recognized industry leader in comprehensive water purification engineering and quality management systems. With years of experience establishing state-of-the-art mineral water plants across India, Biofix identified a critical gap in the consumer market: the need for truly safe, rigorously tested, and scientifically purified drinking water delivered directly to homes and businesses.
            </p>
 
            <h2 className="text-3xl font-serif text-[#070D0E] mt-12 mb-6">The Birth of Biodrops</h2>
            <p className="mb-6">
              Leveraging their engineering expertise and their proprietary Biofix Quality Management System (BQMS), Biofix launched Biodrops. The goal was simple yet profound: To create a flagship consumer product that embodies absolute perfection in hydration. 
            </p>
            <p>
              By controlling the entire manufacturing pipeline—from raw water sourcing to 14-stage RO purification, UV sterilization, and final packaging—Biodrops ensures that every 20L jar meets the strict standards set by the Bureau of Indian Standards (BIS) and the Food Safety and Standards Authority of India (FSSAI).
            </p>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
