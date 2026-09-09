"use client";

import ScrollFade from "@/components/effects/ScrollFade";
import Image from "next/image";
import { Filter, Truck, Droplets, ShieldCheck, Lock, ArrowRight } from "lucide-react";

export default function ProductShowcase() {
  const leftCards = [
    {
      num: "01",
      icon: Filter,
      title: "14-Stage Process",
      desc: "Rigorous filtration and sterilization stages to guarantee clinical-grade purity.",
    },
    {
      num: "02",
      icon: Truck,
      title: "edrops Delivery",
      desc: "Fresh batches dispatched and tracked exclusively through our custom edrops network.",
    },
  ];

  const rightCards = [
    {
      num: "03",
      icon: Droplets,
      title: "Mineral Infused",
      desc: "Perfect balance of essential minerals (pH 7.4) tailored for healthy daily hydration.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Sterile Lock",
      desc: "Hygienically sealed under zero-contact environments with a solid threaded safety cap.",
    },
  ];

  const cardClasses =
    "bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex-1";

  return (
    <section
      id="product"
      className="relative w-full py-24 md:py-32 bg-[#F4F6F8] overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center">

        {/* ──── Section Header (centered) ──── */}
        <ScrollFade
          amount={0.25}
          duration={0.6}
          className="flex flex-col items-center text-center mb-14 md:mb-20"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-[#0F766E] mb-4">
            <span className="w-[6px] h-[6px] rounded-full bg-[#0F766E]" />
            ENGINEERED SPECS
          </div>

          {/* Headline */}
          <h2
            className="text-[clamp(2.4rem,5vw,3.8rem)] text-[#070D0E] font-normal tracking-tight mb-4"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            The Product
          </h2>

          {/* Subheading */}
          <p className="text-sm md:text-base text-[#6B7C80] max-w-lg leading-relaxed">
            Crafted without compromise. A clinically tested hydration ecosystem
            built for longevity and vitality.
          </p>
        </ScrollFade>

        {/* ──── 3-Column Grid ──── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          {/* LEFT column — cards 01 & 02 */}
          <div className="flex flex-col gap-6">
            {leftCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollFade
                  key={card.num}
                  amount={0.2}
                  delay={i * 0.1}
                  yOffset={24}
                  duration={0.55}
                  className={cardClasses}
                >
                  {/* Top row: number + icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-semibold text-[#0F766E] font-mono tracking-wide">
                      {card.num}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                    </span>
                  </div>

                  {/* Body */}
                  <div>
                    <h3
                      className="text-lg md:text-xl font-semibold text-[#070D0E] mb-2 tracking-tight"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#6B7C80] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </ScrollFade>
              );
            })}
          </div>

          {/* CENTER column — badges, bottle, CTA */}
          <ScrollFade
            amount={0.2}
            delay={0.15}
            yOffset={24}
            duration={0.6}
            className="flex flex-col items-center justify-between py-2 gap-5"
          >
            {/* Top pill badge */}
            <div className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2 shadow-sm flex items-center gap-2 text-xs md:text-sm font-medium text-[#070D0E]">
              <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
              100% Food Grade PET
            </div>

            {/* Product bottle image */}
            <div className="relative w-full max-w-[260px] aspect-[3/4] flex items-center justify-center">
              <Image
                src="/images/biodrops-jar.png"
                alt="Biodrops Premium 20L Water Jar"
                fill
                sizes="(max-width: 768px) 220px, 260px"
                className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.10)]"
                priority
              />
            </div>

            {/* Bottom pill badge */}
            <div className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2 shadow-sm flex items-center gap-2 text-xs md:text-sm font-medium text-[#070D0E]">
              <Lock className="w-3.5 h-3.5 text-[#0F766E]" strokeWidth={2} />
              Tamper Evident Seal
            </div>

            {/* CTA Button */}
            <a
              href="https://edrops.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            >
              <span>REQUEST DELIVERY</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </a>
          </ScrollFade>

          {/* RIGHT column — cards 03 & 04 */}
          <div className="flex flex-col gap-6">
            {rightCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollFade
                  key={card.num}
                  amount={0.2}
                  delay={0.1 + i * 0.1}
                  yOffset={24}
                  duration={0.55}
                  className={cardClasses}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-semibold text-[#0F766E] font-mono tracking-wide">
                      {card.num}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-lg md:text-xl font-semibold text-[#070D0E] mb-2 tracking-tight"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#6B7C80] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
