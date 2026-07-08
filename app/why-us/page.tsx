import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import { WhyUsHero, WhyUsGrid } from "@/components/sections/WhyUsClient";

export const unstable_instant = { prefetch: "static" };

export const metadata: Metadata = {
  title: "Why Us - BIODROPS",
  description: "Learn why BIODROPS is the leading packaged mineral water brand in Kerala. Pristine hydration, perfectly balanced pH, untouched by human hands, and 14-stage purified.",
  alternates: {
    canonical: "https://biodropsindia.com/why-us",
  },
  openGraph: {
    title: "Why Us - BIODROPS",
    description: "Learn why BIODROPS is the leading packaged mineral water brand in Kerala.",
    url: "https://biodropsindia.com/why-us",
  },
};

const values = [
  {
    title: "Zero Contaminants",
    desc: "Our rigorous 14-stage purification process ensures that absolutely no harmful contaminants, heavy metals, or microscopic impurities remain in your water. We strip away the bad while maintaining the pristine quality of the water.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Perfectly Balanced pH",
    desc: "Water is life, and balance is key. Biodrops is engineered to have a perfectly balanced pH level that complements your body's natural chemistry, promoting better hydration and overall well-being.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Untouched by Human Hands",
    desc: "From the moment the water is sourced to the final sealed bottle, the entire Biodrops process is fully automated. This completely eliminates the risk of human error or contamination.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
  },
  {
    title: "Engineered for Absolute Purity",
    desc: "We don't just filter water; we engineer it. By combining advanced Reverse Osmosis, Micro Filtration, and UV sterilization, we guarantee a standard of purity that exceeds global health standards.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white pt-32">
 
      {/* Hero Section */}
      <section className="relative w-full pt-40 pb-24 px-6 overflow-hidden bg-[#FFFFFF] text-[#070D0E]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <Image
            src="/images/natural-source.jpg"
            alt="Natural Water Source"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
 
        <WhyUsHero>
          <div className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-[#070D0E]/50 font-medium mb-6">
            <span className="w-12 h-px bg-[#070D0E]/20" />
            The Standard
            <span className="w-12 h-px bg-[#070D0E]/20" />
          </div>
 
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1] mb-6 font-serif">
            Why Choose <span className="italic text-[#56C7D9] font-medium">Biodrops?</span>
          </h1>
 
          <p className="text-lg md:text-xl text-[#070D0E]/60 max-w-2xl font-light leading-relaxed">
            We don't just bottle water. We curate an experience of pristine hydration, engineered to fuel your body with the purest drop possible.
          </p>
        </WhyUsHero>
      </section>
 
      {/* Values Grid */}
      <section className="py-24 px-6 bg-[#070D0E] text-white">
        <div className="max-w-[1400px] mx-auto">
          <WhyUsGrid values={values} />
        </div>
      </section>
 
      {/* CTA Section */}
      <section className="py-32 px-6 bg-[#cfef00] text-[#070D0E] text-center flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-6xl font-serif mb-8">Taste the Difference.</h2>
        <a
          href="/#contact"
          className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#070D0E] hover:bg-[#111] rounded-full text-[0.8rem] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(7,13,14,0.3)]"
        >
          Contact Us Today
        </a>
      </section>
 
      <Footer />
    </main>
  );
}
