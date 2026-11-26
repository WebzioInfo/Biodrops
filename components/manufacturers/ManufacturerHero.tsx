"use client";

import Image from "next/image";

interface ManufacturerHeroProps {
  partnerCount?: number;
}

export default function ManufacturerHero({ partnerCount }: ManufacturerHeroProps) {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#070D0E] text-white border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-bg.jpg"
          alt="BIODROPS Certified Manufacturing Network"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#070D0E]/75" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#56C7D9] mb-3">
          Certified Production Network
        </p>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white max-w-3xl leading-[1.12] mb-4">
          Meet Our Manufacturing Partners.
        </h1>

        <p className="text-sm sm:text-lg text-white/75 max-w-2xl font-normal leading-relaxed mb-6">
          Behind every BIODROPS jar is a network of trusted manufacturing partners committed to quality, purity, and excellence.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-white/70">
          <span>BIS IS:14543 &amp; BQMS Verified</span>
          {typeof partnerCount === "number" && partnerCount > 0 && (
            <>
              <span className="text-white/30">•</span>
              <span>{partnerCount} Active Production Partners</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
