"use client";

import Image from "next/image";
import ScrollFade from "@/components/effects/ScrollFade";

/* ─── Shared Content Blocks ─── */

function Eyebrow() {
  return (
    <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.4em] uppercase text-[#6B7C80] font-medium mb-4 justify-start">
      <span className="w-8 h-px bg-[#6B7C80]/30" />
      MINERAL WATER
      <span className="w-8 h-px bg-[#6B7C80]/30" />
    </div>
  );
}

function Headline() {
  return (
    <h1
      className="text-[clamp(2.8rem,5.5vw,5.4rem)] leading-[1.05] tracking-[-0.03em] text-[#070D0E] font-bold mb-5 text-left"
      style={{ fontFamily: "'Clash Display', var(--font-space-grotesk), 'General Sans', sans-serif" }}
    >
      Quality Can Be<br />
      <span className="text-[#00A8CC]">Canned.</span>
    </h1>
  );
}

function Subcopy() {
  return (
    <p
      className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.7] text-[#6B7C80] font-light mb-8 max-w-lg text-left"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      Engineered for modern living. A masterpiece of hydration,
      multi-stage purified and perfectly balanced.
    </p>
  );
}

function PartnerLinks() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 justify-start">
      <a
        href="https://biofixtechnology.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-[#070D0E]/60 hover:text-[#070D0E] transition-colors"
      >
        <span className="flex items-center gap-2">
          An initiative from
          <Image
            src="/images/biofix.png"
            alt="Biofix Logo"
            width={120}
            height={36}
            className="h-7 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </span>
        <svg
          className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <span className="absolute bottom-[-6px] left-0 right-0 h-px bg-[#56C7D9]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </a>

      <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[#070D0E]/15" />

      <a
        href="bqms"
        className="group relative flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-[#070D0E]/60 hover:text-[#070D0E] transition-colors"
      >
        <span>Certified by <span className="text-[#56C7D9]">BQMS</span></span>
        <svg
          className="w-3.5 h-3.5 opacity-60 group-hover:translate-y-0.5 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute bottom-[-6px] left-0 right-0 h-px bg-[#56C7D9]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </a>
    </div>
  );
}

function ExploreCta() {
  return (
    <div className="mt-8 sm:mt-0 flex justify-start">
      <a
        href="#product"
        className="group flex flex-col items-center gap-2 text-[#070D0E]"
      >
        <span className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold">Explore</span>
        <div className="w-10 h-10 rounded-full border border-[#070D0E]/20 flex items-center justify-center group-hover:border-[#56C7D9] transition-colors">
          ↓
        </div>
      </a>
    </div>
  );
}

/* ─── Hero Section with Studio Background Image ─── */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center bg-[#F4F6F8] pt-28 pb-16 lg:py-24 px-6 sm:px-10 lg:px-12 overflow-hidden">
      {/* Full-section background studio image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/premium-jar-studio.jpg"
          alt="Biodrops Studio Jar Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[80%_center]"
        />

        {/* Subtle light fade overlay — strongest on the left where text sits, tapering off toward the jar */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F6F8]/90 via-[#F4F6F8]/65 to-transparent z-[1] hidden sm:block" />

        {/* Mobile light fade overlay — covering bottom and left where stacked text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F6F8]/95 via-[#F4F6F8]/70 to-[#F4F6F8]/30 z-[1] sm:hidden" />

        {/* Subtle uniform light ambient tint to tie the image into the page background */}
        <div className="absolute inset-0 bg-[#F4F6F8]/20 z-[2]" />
      </div>

      {/* Hero Content anchored on the left */}
      <ScrollFade
        amount={0.15}
        yOffset={20}
        duration={0.6}
        className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start text-left"
      >
        <div className="max-w-xl lg:max-w-2xl">
          <Eyebrow />
          <Headline />
          <h2 className="sr-only">
            Biodrops - Premium Packaged Drinking Water and Mineral Water in Kerala. An initiative from Biofix Technology LLP.
          </h2>
          <Subcopy />
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mt-2">
            <PartnerLinks />
            <ExploreCta />
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
