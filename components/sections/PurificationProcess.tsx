"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFade from "@/components/effects/ScrollFade";

const steps = [
  { num: "01", title: "Raw Water", desc: "Sourced directly from GWA.", short: "Raw Water" },
  { num: "02", title: "Raw Water Pump", desc: "Powered by a high-efficiency 3HP system.", short: "Raw Pump" },
  { num: "03", title: "Raw Water Storage", desc: "Held in a 9000-liter capacity tank.", short: "Storage" },
  { num: "04", title: "Sand Filter", desc: "Filters at 6000L/HR to remove large particulates.", short: "Sand Filter" },
  { num: "05", title: "Activated Carbon Filter", desc: "Absorbs organics and odors at 6000L/HR.", short: "Carbon" },
  { num: "06", title: "5 Micron Filter", desc: "Removes finer suspended particles at 6000L/HR.", short: "5 Micron" },
  { num: "07", title: "High Pressure Pump", desc: "Driven by a powerful 7.5 HP motor.", short: "HP Pump" },
  { num: "08", title: "RO System", desc: "Reverse Osmosis processing at 6000 L/HR.", short: "RO System" },
  { num: "09", title: "Intermediate Tank", desc: "5000L temporary storage for processed water.", short: "Buffer" },
  { num: "10", title: "Filter Feed Pump", desc: "4HP pump regulating flow to micro filters.", short: "Feed Pump" },
  { num: "11", title: "Micro Filtration", desc: "0.1, 0.2, and 0.5 micron precision filters.", short: "Micro Filter" },
  { num: "12", title: "UV System", desc: "High-intensity ultraviolet sterilization at 6000L/HR.", short: "UV System" },
  { num: "13", title: "Final Storage Tank", desc: "5000L capacity holding pristine purified water.", short: "Pure Tank" },
  { num: "14", title: "Filling Point", desc: "Manual and automatic hygienic filling station.", short: "Filling" },
];

/* Desktop zigzag rows:
   Row 1 → stages 1-5  (left to right)
   Row 2 → stages 6-10 (right to left)
   Row 3 → stages 11-14 (left to right) */
const desktopRows = [
  { indices: [0, 1, 2, 3, 4], reversed: false },
  { indices: [5, 6, 7, 8, 9], reversed: true },
  { indices: [10, 11, 12, 13], reversed: false },
];

export default function PurificationProcess() {
  const [activeStage, setActiveStage] = useState(0);
  const currentStep = steps[activeStage];

  return (
    <section id="process" className="relative w-full bg-[#EEF4F6] py-16 md:py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ──── Section Header ──── */}
        <ScrollFade amount={0.25} duration={0.6} className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-3">
            <span className="w-8 h-px bg-[#070D0E]/20" />
            The Process
            <span className="w-8 h-px bg-[#070D0E]/20" />
          </div>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl text-[#070D0E] font-light leading-snug"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Fourteen Stages of{" "}
            <span className=" text-[#56C7D9] font-medium">Perfection</span>
          </h2>
        </ScrollFade>

        {/* ──── Active Stage Detail Callout ──── */}
        <ScrollFade amount={0.25} delay={0.1} duration={0.55} className="max-w-2xl mx-auto text-center min-h-[120px] sm:min-h-[130px] flex flex-col items-center justify-center mb-6 md:mb-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-full"
            >
              <div className="text-[#0F766E] text-[0.7rem] md:text-xs font-semibold tracking-[0.3em] uppercase mb-2 flex items-center gap-3">
                <span className="w-6 h-px bg-[#0F766E]/40" />
                Stage {currentStep.num} of 14
                <span className="w-6 h-px bg-[#0F766E]/40" />
              </div>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl text-[#070D0E] font-medium mb-3 leading-tight tracking-tight"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                {currentStep.title}
              </h3>
              <p className="text-sm md:text-base text-[#070D0E]/70 max-w-md tracking-wide leading-relaxed font-light">
                {currentStep.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </ScrollFade>

        {/* ──── Interactive Path & Stages ──── */}
        <ScrollFade amount={0.2} delay={0.15} duration={0.6}>
          {/* ──── Desktop Zigzag Path ──── */}
        <div className="hidden md:flex flex-col max-w-4xl mx-auto">
          {desktopRows.map((row, rowIdx) => {
            const displayIndices = row.reversed
              ? [...row.indices].reverse()
              : row.indices;

            return (
              <div key={rowIdx}>
                {/* Row of nodes + connecting lines */}
                <div className="flex items-start">
                  {displayIndices.map((stageIdx, i) => {
                    const step = steps[stageIdx];
                    const isActive = stageIdx === activeStage;
                    const isTraveled = stageIdx <= activeStage;

                    return (
                      <div key={stageIdx} className="contents">
                        {/* Stage Node */}
                        <button
                          onClick={() => setActiveStage(stageIdx)}
                          className="flex flex-col items-center gap-1.5 flex-shrink-0 w-20 group focus:outline-none cursor-pointer"
                          aria-label={`Stage ${step.num}: ${step.title}`}
                          aria-current={isActive ? "step" : undefined}
                        >
                          <div
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive
                                ? "bg-[#56C7D9] border-white text-white shadow-lg shadow-[#56C7D9]/30 scale-110"
                                : isTraveled
                                  ? "bg-white border-[#56C7D9] text-[#070D0E] group-hover:scale-110"
                                  : "bg-white border-[#070D0E]/15 text-[#070D0E]/40 group-hover:border-[#56C7D9]/50 group-hover:scale-110"
                              }`}
                          >
                            {step.num}
                          </div>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-medium transition-colors duration-300 whitespace-nowrap ${isActive
                                ? "text-[#070D0E] font-bold"
                                : isTraveled
                                  ? "text-[#070D0E]/70"
                                  : "text-[#070D0E]/40 group-hover:text-[#070D0E]/70"
                              }`}
                          >
                            {step.short}
                          </span>
                        </button>

                        {/* Connecting horizontal line */}
                        {i < displayIndices.length - 1 && (
                          <div
                            className={`flex-1 h-[3px] mt-[19px] rounded-full transition-colors duration-300 ${Math.max(stageIdx, displayIndices[i + 1]) <= activeStage
                                ? "bg-[#56C7D9]"
                                : "bg-[#070D0E]/10"
                              }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Vertical connector to next row */}
                {rowIdx < desktopRows.length - 1 && (
                  <div
                    className={`flex ${rowIdx % 2 === 0 ? "justify-end" : "justify-start"} -mt-1`}
                  >
                    <div
                      className={`w-[3px] h-12 rounded-full transition-colors duration-300 ${desktopRows[rowIdx + 1].indices[0] <= activeStage
                          ? "bg-[#56C7D9]"
                          : "bg-[#070D0E]/10"
                        }`}
                      style={{
                        marginLeft: rowIdx % 2 !== 0 ? "38px" : undefined,
                        marginRight: rowIdx % 2 === 0 ? "38px" : undefined,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ──── Mobile 2-Column Grid ──── */}
        <div className="md:hidden grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
          {steps.map((step, idx) => {
            const isActive = idx === activeStage;
            const isTraveled = idx <= activeStage;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStage(idx)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${isActive
                    ? "bg-[#56C7D9]/10 border-[#56C7D9] shadow-sm"
                    : isTraveled
                      ? "bg-white border-[#56C7D9]/30"
                      : "bg-white/60 border-[#070D0E]/10"
                  }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${isActive
                      ? "bg-[#56C7D9] text-white"
                      : isTraveled
                        ? "bg-[#56C7D9]/10 text-[#0F766E]"
                        : "bg-[#070D0E]/5 text-[#070D0E]/40"
                    }`}
                >
                  {step.num}
                </div>
                <span
                  className={`text-xs font-medium truncate ${isActive ? "text-[#070D0E]" : "text-[#070D0E]/60"
                    }`}
                >
                  {step.short}
                </span>
              </button>
            );
          })}
        </div>
        </ScrollFade>

      </div>
    </section>
  );
}
