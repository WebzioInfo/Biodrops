"use client";

import ScrollFade from "@/components/effects/ScrollFade";
import { Check } from "lucide-react";
import Image from "next/image";

interface WhyBiodropsProps {
  imagePosition?: "left" | "right";
}

const points = [
  "First local brand offering consumer-facing batch analysis transparency",
  "Fully automated, zero-contact washing, filling and sealing",
  "Consistent mineral balance and pH across every batch",
  "Quality governed under one integrated system (BQMS) rather than ad-hoc checks",
  "Backed by Biofix Technology LLP's engineering and plant-management expertise",
];

export default function WhyBiodrops({ imagePosition = "left" }: WhyBiodropsProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section
      id="why"
      className="relative w-full min-h-screen bg-[#F4F6F8] flex flex-col lg:flex-row items-stretch overflow-hidden"
    >
      {/* ──── Full-Bleed Image Column (50% on desktop, 50-60vh on mobile) ──── */}
      <div
        className={`relative w-full lg:w-1/2 h-[52vh] sm:h-[58vh] lg:min-h-screen lg:h-auto overflow-hidden flex-shrink-0 ${
          isImageLeft ? "lg:order-1" : "lg:order-2"
        } order-1`}
      >
        <ScrollFade
          direction={isImageLeft ? "right" : "left"}
          amount={0.15}
          duration={0.8}
          yOffset={16}
          xOffset={20}
          className="w-full h-full"
        >
          <div className="relative w-full h-full min-h-[52vh] sm:min-h-[58vh] lg:min-h-screen">
            {/* Product Image */}
            <Image
              src="/images/why-biodrops.jpg"
              alt="BIODROPS 20L Pure Mineral Water Jar"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority={false}
            />

            {/* 1. Horizontal fade on meeting edge - dialed back to ~65% to keep jar body, cap & label 100% crisp */}
            <div
              className={`absolute inset-0 pointer-events-none z-[2] ${
                isImageLeft
                  ? "hidden lg:block bg-gradient-to-r from-transparent from-65% via-[#F4F6F8]/50 via-82% to-[#F4F6F8]"
                  : "hidden lg:block bg-gradient-to-l from-transparent from-65% via-[#F4F6F8]/50 via-82% to-[#F4F6F8]"
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none z-[3] ${
                isImageLeft
                  ? "hidden lg:block bg-gradient-to-r from-transparent from-78% via-[#F4F6F8]/80 via-90% to-[#F4F6F8]"
                  : "hidden lg:block bg-gradient-to-l from-transparent from-78% via-[#F4F6F8]/80 via-90% to-[#F4F6F8]"
              }`}
            />

            {/* 2. Top edge soft dissolve - dialed back so pump remains crisp */}
            <div className="absolute top-0 inset-x-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-[4] bg-gradient-to-b from-[#F4F6F8]/85 via-[#F4F6F8]/30 to-transparent" />

            {/* 3. Bottom edge soft dissolve - dialed back so rocks and jar base remain crisp */}
            <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-[4] bg-gradient-to-t from-[#F4F6F8]/85 via-[#F4F6F8]/30 to-transparent" />

            {/* 4. Outer edge subtle feather */}
            <div
              className={`absolute inset-y-0 w-10 sm:w-16 pointer-events-none z-[2] ${
                isImageLeft
                  ? "left-0 bg-gradient-to-r from-[#F4F6F8]/25 to-transparent"
                  : "right-0 bg-gradient-to-l from-[#F4F6F8]/25 to-transparent"
              }`}
            />

            {/* 5. Mobile bottom dissolve into #F4F6F8 */}
            <div className="lg:hidden absolute inset-0 pointer-events-none z-[3] bg-gradient-to-t from-[#F4F6F8] via-[#F4F6F8]/60 via-25% to-transparent" />
          </div>
        </ScrollFade>
      </div>

      {/* ──── Content Column (50% on desktop) ──── */}
      <div
        className={`w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-12 xl:px-20 2xl:px-24 py-12 sm:py-16 lg:py-24 ${
          isImageLeft ? "lg:order-2" : "lg:order-1"
        } order-2`}
      >
        <div className="w-full max-w-xl">
          {/* Header / Intro */}
          <ScrollFade
            direction="left"
            amount={0.25}
            duration={0.6}
            xOffset={20}
            yOffset={16}
            className="mb-8 md:mb-10 text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-3">
              <span className="w-8 h-px bg-[#070D0E]/20" />
              The Standard
            </div>

            {/* Headline */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#070D0E] font-medium tracking-tight mb-4"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Why <span className="text-[#56C7D9]">BIODROPS</span>
            </h2>

            {/* Subheading */}
            <p className="text-sm md:text-base text-[#070D0E]/60 max-w-lg leading-relaxed font-light">
              Five core commitments that define every drop we produce — no compromises, no shortcuts.
            </p>
          </ScrollFade>

          {/* Checklist items */}
          <div className="flex flex-col gap-4 sm:gap-4.5 w-full">
            {points.map((point, index) => (
              <ScrollFade
                key={index}
                direction="left"
                amount={0.2}
                delay={0.1 + index * 0.08}
                yOffset={12}
                xOffset={16}
                duration={0.5}
                className="flex items-start sm:items-center gap-3.5 sm:gap-4 group"
              >
                {/* Icon Badge */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#56C7D9]/15 flex items-center justify-center text-[#00A8CC] flex-shrink-0 mt-0.5 sm:mt-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Check className="w-4 h-4 text-[#00A8CC]" strokeWidth={2.5} />
                </div>

                {/* Text */}
                <span
                  className="text-sm sm:text-[0.95rem] lg:text-[1rem] text-[#070D0E]/85 font-medium leading-snug"
                  style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                >
                  {point}
                </span>
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
