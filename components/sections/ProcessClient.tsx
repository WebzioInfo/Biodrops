"use client";

import ScrollFade from "@/components/effects/ScrollFade";
import React from "react";

interface StepItem {
  num: string;
  title: string;
  desc: string;
  merit: string;
}

interface ProcessStepsGridProps {
  steps: StepItem[];
}

export function ProcessHero() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
      <ScrollFade
        amount={0.2}
        duration={0.55}
        yOffset={16}
        className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-white/60 font-medium mb-6"
      >
        <span className="w-12 h-px bg-[#cfef00]/50" />
        The Standard of Purity
        <span className="w-12 h-px bg-[#cfef00]/50" />
      </ScrollFade>

      <ScrollFade
        amount={0.2}
        delay={0.1}
        duration={0.6}
        yOffset={24}
        className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1] mb-6 font-serif"
      >
        <h1>
          Fourteen Stages of <span className=" text-[#cfef00] font-medium">Perfection.</span>
        </h1>
      </ScrollFade>

      <ScrollFade
        amount={0.2}
        delay={0.18}
        duration={0.55}
        yOffset={20}
        className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
      >
        <p>
          Discover the meticulous, state-of-the-art purification process that transforms raw natural water into the pristine, perfectly balanced Biodrops standard.
        </p>
      </ScrollFade>
    </div>
  );
}

export function ProcessStepsGrid({ steps }: ProcessStepsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      {steps.map((step, index) => (
        <ScrollFade
          key={step.num}
          amount={0.15}
          delay={(index % 2) * 0.08}
          duration={0.5}
          yOffset={20}
          className="h-full"
        >
          <div className="group bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#56C7D9]/40 hover:-translate-y-0.5 transition-all duration-300">
            {/* Top: Stage Number, Title & Spec Description */}
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#cfef00]/20 text-[#070D0E] flex-shrink-0 flex items-center justify-center text-sm font-bold font-mono group-hover:bg-[#cfef00] transition-colors duration-300">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-xl sm:text-2xl font-serif text-[#070D0E] leading-snug">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#070D0E]/65 leading-relaxed pl-14 mb-4">
                {step.desc}
              </p>
            </div>

            {/* Bottom: The Advantage / Why this step matters */}
            <div className="pt-5 border-t border-[#E5E7EB] mt-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#00A8CC] uppercase">
                  The Advantage
                </span>
                <span className="text-[10px] text-[#070D0E]/25">·</span>
                <span className="text-[11px] text-[#070D0E]/50 font-medium italic">
                  Why this step matters
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#070D0E]/75 leading-relaxed font-light">
                {step.merit}
              </p>
            </div>
          </div>
        </ScrollFade>
      ))}
    </div>
  );
}
