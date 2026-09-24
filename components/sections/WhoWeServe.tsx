"use client";

import ScrollFade from "@/components/effects/ScrollFade";
import Image from "next/image";

interface Segment {
  title: string;
  desc: string;
  image: string;
}

const segments: Segment[] = [
  {
    title: "Corporate Offices",
    desc: "Bulk drinking-water subscriptions for enterprise buildings",
    image: "/images/serve/corporate-indian.jpg",
  },
  {
    title: "Hospitality",
    desc: "Premium supply for hotels, restaurants and cafés",
    image: "/images/serve/hospitality.jpg",
  },
  {
    title: "Institutions",
    desc: "Safety-certified water for hospitals, colleges and schools",
    image: "/images/serve/institutions.jpg",
  },
  {
    title: "Residential",
    desc: "Daily home-delivery subscriptions for families",
    image: "/images/serve/residential.jpg",
  },
];

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="relative w-full bg-[#F4F6F8] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ──── Section Header ──── */}
        <ScrollFade
          amount={0.25}
          duration={0.6}
          className="text-center mb-12 md:mb-16"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-4">
            <span className="w-8 h-px bg-[#070D0E]/20" />
            OUR REACH
            <span className="w-8 h-px bg-[#070D0E]/20" />
          </div>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#070D0E] font-medium tracking-tight mb-4"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Who We <span className="text-[#56C7D9]">Serve</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm md:text-base text-[#070D0E]/60 max-w-lg mx-auto leading-relaxed font-light">
            Premium drinking water, delivered wherever it's needed most.
          </p>
        </ScrollFade>

        {/* ──── 4-Column Grid ──── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 xl:gap-8">
          {segments.map((segment, index) => (
            <ScrollFade
              key={segment.title}
              amount={0.2}
              delay={index * 0.1}
              yOffset={24}
              duration={0.55}
              className="group relative h-[380px] sm:h-[420px] lg:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col justify-end p-6 md:p-7"
            >
              {/* Background Image */}
              <Image
                src={segment.image}
                alt={`BIODROPS Premium Drinking Water for ${segment.title} in Kerala`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Overlay (Bottom-to-Top) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D0E]/95 via-[#070D0E]/60 via-45% to-transparent pointer-events-none group-hover:from-[#070D0E] transition-colors duration-500" />

              {/* Bottom Text Content */}
              <div className="relative z-10 flex flex-col">
                <h3
                  className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {segment.title}
                </h3>
                <p
                  className="text-xs sm:text-sm text-white/75 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                >
                  {segment.desc}
                </p>
              </div>
            </ScrollFade>
          ))}
        </div>

      </div>
    </section>
  );
}
