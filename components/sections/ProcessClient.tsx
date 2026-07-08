"use client";

import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-white/60 font-medium mb-6"
      >
        <span className="w-12 h-px bg-[#cfef00]/50" />
        The Standard of Purity
        <span className="w-12 h-px bg-[#cfef00]/50" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1] mb-6 font-serif"
      >
        Fourteen Stages of <span className="italic text-[#cfef00] font-medium">Perfection.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-lg md:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
      >
        Discover the meticulous, state-of-the-art purification process that transforms raw natural water into the pristine, perfectly balanced Biodrops standard.
      </motion.p>
    </div>
  );
}

export function ProcessStepsGrid({ steps }: ProcessStepsGridProps) {
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
              !isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Visual Number Container */}
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="text-[clamp(8rem,15vw,15rem)] font-bold text-[#070D0E]/5 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {step.num}
              </div>
              <div className="relative z-10 w-full max-w-[400px] aspect-square rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col items-center justify-center p-8 text-center group hover:-translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full bg-[#cfef00]/20 text-[#070D0E] flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-[#cfef00] group-hover:scale-110 transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-2xl font-serif text-[#070D0E] mb-4">{step.title}</h3>
                <p className="text-sm text-[#070D0E]/60">{step.desc}</p>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5">
                <div className="text-[11px] font-bold tracking-[0.2em] text-[#56C7D9] uppercase mb-4">The Advantage</div>
                <h4 className="text-2xl md:text-3xl font-light text-[#070D0E] leading-snug mb-6">
                  Why this step <span className="font-medium italic">matters</span>.
                </h4>
                <p className="text-[#070D0E]/70 leading-relaxed text-lg font-light">
                  {step.merit}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
