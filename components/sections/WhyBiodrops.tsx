"use client";

import ScrollFade from "@/components/effects/ScrollFade";
import { ShieldCheck, Droplets, Bot, Award } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Zero Contaminants",
    body: "Our rigorous 14-stage purification process ensures that absolutely no harmful contaminants, heavy metals, or microscopic impurities remain in your water. We strip away the bad while maintaining the pristine quality of the water.",
  },
  {
    icon: Droplets,
    title: "Perfectly Balanced pH",
    body: "Water is life, and balance is key. Biodrops is engineered to have a perfectly balanced pH level that complements your body’s natural chemistry, promoting better hydration and overall well-being.",
  },
  {
    icon: Bot,
    title: "Untouched by Human Hands",
    body: "From the moment the water is sourced to the final sealed bottle, the entire Biodrops process is fully automated. This completely eliminates the risk of human error or contamination.",
  },
  {
    icon: Award,
    title: "Engineered for Absolute Purity",
    body: "We don’t just filter water; we engineer it. By combining advanced Reverse Osmosis, Micro Filtration, and UV sterilization, we guarantee a standard of purity that exceeds global health standards.",
  },
];

export default function WhyBiodrops() {
  return (
    <section id="why" className="relative w-full bg-[#F4F6F8] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ──── Section Header ──── */}
        <ScrollFade
          amount={0.25}
          duration={0.6}
          className="text-center mb-14 md:mb-20"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-4">
            <span className="w-8 h-px bg-[#070D0E]/20" />
            The Standard
            <span className="w-8 h-px bg-[#070D0E]/20" />
          </div>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#070D0E] font-medium tracking-tight mb-4"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Why <span className="text-[#56C7D9]">BIODROPS</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm md:text-base text-[#070D0E]/60 max-w-lg mx-auto leading-relaxed">
            Four core commitments that define every drop we produce — no compromises, no shortcuts.
          </p>
        </ScrollFade>

        {/* ──── 2×2 Value Cards Grid ──── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollFade
                key={item.title}
                amount={0.2}
                delay={index * 0.1}
                yOffset={24}
                duration={0.55}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-7 md:p-9 flex flex-col gap-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
              >
                {/* Icon Badge */}
                <div className="w-11 h-11 rounded-full bg-[#56C7D9]/10 flex items-center justify-center text-[#56C7D9] flex-shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-semibold text-[#070D0E] tracking-tight"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {item.title}
                </h3>

                {/* Body Copy */}
                <p className="text-sm md:text-[0.9rem] text-[#070D0E]/60 leading-relaxed">
                  {item.body}
                </p>
              </ScrollFade>
            );
          })}
        </div>

      </div>
    </section>
  );
}
