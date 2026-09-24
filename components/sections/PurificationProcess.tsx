"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  ArrowRight,
  Activity,
} from "lucide-react";
import ScrollFade from "@/components/effects/ScrollFade";

interface StageSpec {
  label: string;
  value: string;
}

interface ProcessStage {
  num: string;
  title: string;
  phase: string;
  desc: string;
  specs: [StageSpec, StageSpec, StageSpec];
  qualityNote: string;
  image: string;
}

const STAGES: ProcessStage[] = [
  {
    num: "01",
    title: "Sand Media Filter",
    phase: "Pre-Treatment",
    desc: "Multi-graded quartz sand beds trap coarse physical impurities, silt, and suspended particles.",
    specs: [
      { label: "Intake Flow", value: "6,000 L/HR" },
      { label: "Media Type", value: "Graded Quartz Sand" },
      { label: "Turbidity Out", value: "< 0.5 NTU" }
    ],
    qualityNote: "Primary physical sediment removal down to 20 microns",
    image: "/images/process/sand-filter.jpg"
  },
  {
    num: "02",
    title: "Activated Carbon Filter",
    phase: "Pre-Treatment",
    desc: "High-grade virgin coconut shell carbon absorbs free chlorine, odors, and dissolved organic compounds.",
    specs: [
      { label: "Iodine Value", value: "950+ mg/g" },
      { label: "Chlorine Removal", value: "100% Free Cl" },
      { label: "Taste Rating", value: "Pure & Neutral" }
    ],
    qualityNote: "Complete de-chlorination and organic compound trap",
    image: "/images/process/carbon-filter.jpg"
  },
  {
    num: "03",
    title: "Iron Remover",
    phase: "Pre-Treatment",
    desc: "Specialized catalytic media oxidizes and strips out dissolved iron and manganese common in deep aquifers.",
    specs: [
      { label: "Iron Retention", value: "> 99.5%" },
      { label: "Catalytic Bed", value: "Manganese Greensand" },
      { label: "Output Iron", value: "< 0.05 ppm" }
    ],
    qualityNote: "Prevents metallic taste and protects downstream RO membranes",
    image: "/images/process/iron-remover.jpg"
  },
  {
    num: "04",
    title: "Secondary Sand Filter",
    phase: "Pre-RO Filtration",
    desc: "Secondary fine sand and anthracite polishing bed intercepts residual micro-flocs after iron removal.",
    specs: [
      { label: "Flow Rate", value: "6,000 L/HR" },
      { label: "Media Depth", value: "Dual Graded Bed" },
      { label: "Purity Index", value: "High Clarity" }
    ],
    qualityNote: "Secondary particulate barrier safeguarding RO membranes",
    image: "/images/process/sand-filter.jpg"
  },
  {
    num: "05",
    title: "Secondary Carbon Filter",
    phase: "Pre-RO Filtration",
    desc: "Secondary activated carbon column traps any remaining trace organics, ensuring pristine water clarity.",
    specs: [
      { label: "Filtration", value: "Deep Organic Trap" },
      { label: "Surface Area", value: "1,050 m²/g" },
      { label: "VOC Level", value: "Zero Detectable" }
    ],
    qualityNote: "Dual-pass carbon ensures 100% odor-free pure water",
    image: "/images/process/carbon-filter.jpg"
  },
  {
    num: "06",
    title: "Reverse Osmosis (RO)",
    phase: "Core Purification",
    desc: "Semi-permeable Thin-Film Composite membranes filter out dissolved salts, heavy metals, and chemicals.",
    specs: [
      { label: "TDS Rejection", value: "99.2% Nominal" },
      { label: "Pore Rating", value: "0.0001 Micron" },
      { label: "Product TDS", value: "75 ppm Pure" }
    ],
    qualityNote: "Core molecular purification removing heavy metals & salts",
    image: "/images/process/ro-system.jpg"
  },
  {
    num: "07",
    title: "Intermediate Tank",
    phase: "Buffering",
    desc: "Food-grade stainless steel holding reservoir balances purified RO water flow before remineralization.",
    specs: [
      { label: "Tank Capacity", value: "5,000 Liters" },
      { label: "Vessel Grade", value: "Food-Grade SS304" },
      { label: "Air Venting", value: "0.2µm HEPA Sterile" }
    ],
    qualityNote: "Hermetically sealed intermediate buffer for balanced processing",
    image: "/images/process/buffer-tank.jpg"
  },
  {
    num: "08",
    title: "0.2-Micron Precision Filter",
    phase: "Fine Polishing",
    desc: "Clinical-grade 0.2-micron pleated micro-cartridge intercepts microscopic particulates and cellular fragments.",
    specs: [
      { label: "Pore Rating", value: "0.20 Micron" },
      { label: "Filtration", value: "Absolute Beta 5000" },
      { label: "Colloid Trap", value: "99.999%" }
    ],
    qualityNote: "Hospital-grade absolute sub-micron clarity",
    image: "/images/process/submicron-filter.jpg"
  },
  {
    num: "09",
    title: "0.5-Micron Polishing Filter",
    phase: "Fine Polishing",
    desc: "Fine 0.5-micron polishing filter ensures ultra-clear, diamond-like optical clarity before mineral infusion.",
    specs: [
      { label: "Pore Rating", value: "0.50 Micron" },
      { label: "Retention", value: "99.8% Fine Solids" },
      { label: "Cartridge Type", value: "Spun Micro-Fibers" }
    ],
    qualityNote: "Eliminates fine micro-sediments for crystalline appearance",
    image: "/images/process/micron-filter.jpg"
  },
  {
    num: "10",
    title: "pH Boosting",
    phase: "Mineral Balance",
    desc: "Bio-active alkalizing media restores ideal mineral balance, elevating water pH to a healthy 7.2 – 7.5.",
    specs: [
      { label: "Target pH", value: "7.2 – 7.5 Alkaline" },
      { label: "Mechanism", value: "Natural Bio-Alkaline" },
      { label: "Acidity Level", value: "100% Neutralized" }
    ],
    qualityNote: "Matches human blood equilibrium for optimal cellular hydration",
    image: "/images/process/ph-booster.jpg"
  },
  {
    num: "11",
    title: "Essential Minerals",
    phase: "Mineral Balance",
    desc: "Carefully re-infuses vital healthy minerals (Calcium, Magnesium, Potassium) as per IS 14543 standards.",
    specs: [
      { label: "Calcium (Ca)", value: "Balanced for Health" },
      { label: "Magnesium (Mg)", value: "Vital Electrolytes" },
      { label: "Taste Quality", value: "Sweet, Smooth Taste" }
    ],
    qualityNote: "IS 14543 compliant electrolyte re-infusion for vitality & taste",
    image: "/images/natural-source.jpg"
  },
  {
    num: "12",
    title: "UV Filtration",
    phase: "Sterilization",
    desc: "Continuous 254nm ultraviolet radiation destroys 99.99% of bacteria and viruses without heat or chemicals.",
    specs: [
      { label: "Wavelength", value: "253.7 nm UV-C" },
      { label: "UV Dosage", value: "> 40 mJ/cm²" },
      { label: "Pathogen Count", value: "0.00 CFU/100ml" }
    ],
    qualityNote: "100% biological sterilization with zero chemical additives",
    image: "/images/process/uv-reactor.jpg"
  },
  {
    num: "13",
    title: "Ozonation",
    phase: "Sterilization",
    desc: "Micro-bubble ozone (O₃) infusion neutralizes any residual microorganisms and naturally preserves freshness.",
    specs: [
      { label: "Residual Ozone", value: "0.05 – 0.2 ppm" },
      { label: "Contact Time", value: "Strict IS 14543" },
      { label: "Decay Byproduct", value: "Pure Oxygen (O₂)" }
    ],
    qualityNote: "Powerful antimicrobial shield that naturally converts to pure oxygen",
    image: "/images/process/ozonation.jpg"
  },
  {
    num: "14",
    title: "Sterile Cleanroom Storage",
    phase: "Packaging",
    desc: "Positive-pressure sterile stainless steel holding reservoir feeds directly into robotic zero-touch filling lines.",
    specs: [
      { label: "Holding Volume", value: "9,000 Liters" },
      { label: "Air Filtration", value: "0.2µm HEPA Clean" },
      { label: "Packaging Line", value: "100% Touch-Free" }
    ],
    qualityNote: "Hospital-grade sterile holding guaranteeing untainted purity",
    image: "/images/process/filling-line.jpg"
  }
];

export default function PurificationProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalStage, setModalStage] = useState<ProcessStage | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = STAGES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setModalStage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Drag Gesture
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  const currentStage = STAGES[activeIndex];

  return (
    <section
      id="process"
      className="relative w-full bg-[#F4F6F8] text-[#070D0E] py-20 md:py-28 overflow-hidden select-none"
    >
      {/* Subtle ambient light gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0F766E]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-[#56C7D9]/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* ──── Section Header ──── */}
        <ScrollFade amount={0.25} duration={0.6} className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-4 text-[0.7rem] md:text-xs tracking-[0.35em] uppercase text-[#0F766E] font-bold mb-3">
            <span className="w-8 h-px bg-[#0F766E]/30" />
            THE PROCESS
            <span className="w-8 h-px bg-[#0F766E]/30" />
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#070D0E] font-light tracking-tight leading-tight"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Fourteen Stages of{" "}
            <span className="text-[#0F766E] font-medium italic">Perfection</span>
          </h2>

          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Click or drag through our 14-stage certified BQMS purification pipeline.
            Click any stage to view full details and laboratory specifications.
          </p>
        </ScrollFade>

        {/* ──── 3D Cover Flow Perspective Carousel (Clean & Minimal Style) ──── */}
        <div
          ref={containerRef}
          className="relative w-full h-[520px] sm:h-[550px] md:h-[580px] flex items-center justify-center overflow-visible"
          style={{ perspective: "1200px" }}
        >
          {STAGES.map((stage, i) => {
            // Calculate relative offset with wrapping
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const absOffset = Math.abs(offset);
            const xOffset = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 170 : 260);
            const zIndex = 30 - absOffset * 10;
            const scale = 1 - absOffset * 0.12;
            const rotateY = offset * -14;
            const opacity = 1 - absOffset * 0.25;
            const brightness = 1 - absOffset * 0.15;

            return (
              <motion.div
                key={stage.num}
                className="absolute cursor-pointer will-change-transform"
                style={{
                  zIndex,
                  transformOrigin: "center center",
                }}
                animate={{
                  x: xOffset,
                  scale,
                  rotateY,
                  opacity,
                  filter: `brightness(${brightness})`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.8,
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(i);
                  }
                }}
              >
                {/* ──── Single Card Layout (Minimal Default UI + Click for Full Details) ──── */}
                <div
                  className={`w-[290px] sm:w-[330px] md:w-[350px] h-[450px] sm:h-[480px] md:h-[500px] bg-white text-zinc-900 rounded-[30px] sm:rounded-[34px] overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                    isCenter
                      ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.16),0_0_30px_rgba(15,118,110,0.14)] border border-gray-200/80 ring-1 ring-[#0F766E]/20"
                      : "shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-gray-200/60"
                  }`}
                >
                  {/* Top Image Section (60% height) */}
                  <div className="relative h-[250px] sm:h-[270px] md:h-[285px] w-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                      priority={isCenter}
                      className="object-cover"
                      unoptimized={stage.image.startsWith("http")}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

                    {/* Stage Number Badge (Top Left) */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
                      <span className="text-[11px] font-bold tracking-wider text-white uppercase">
                        STAGE {stage.num} OF 14
                      </span>
                    </div>

                    {/* Phase Badge (Top Right) */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-xs">
                      <span className="text-[10px] font-bold tracking-wide text-[#0F766E]">
                        {stage.phase}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content Section (Minimalist & Spacious) */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-white">
                    <div>
                      {/* Step Name / Title */}
                      <h3
                        className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-snug"
                        style={{ fontFamily: "'Satoshi', sans-serif" }}
                      >
                        {stage.title}
                      </h3>

                      {/* Stage Summary / Description Text */}
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed font-normal line-clamp-3 mt-3">
                        {stage.desc}
                      </p>
                    </div>

                    {/* Clean Action Strip */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                        BQMS Verified
                      </span>

                      {/* Button to open Modal with hover effect */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalStage(stage);
                        }}
                        className="group/btn px-4 py-2 rounded-full bg-[#0F766E] text-white text-xs font-semibold shadow-sm hover:bg-[#115E59] hover:shadow-md hover:shadow-[#0F766E]/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                        aria-label={`View full details for ${stage.title}`}
                      >
                        <span>Full Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ──── Floating Left / Right Navigation Arrows ──── */}
          <button
            onClick={prevSlide}
            aria-label="Previous Stage"
            className="absolute left-2 sm:left-6 md:left-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-[#0F766E] hover:border-[#0F766E] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Stage"
            className="absolute right-2 sm:right-6 md:right-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-[#0F766E] hover:border-[#0F766E] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* ──── Bottom Interactive Stage Pills (01 to 14) ──── */}
        <div className="w-full max-w-4xl mx-auto mt-6 flex flex-col items-center">
          {/* Active Stage Callout text */}
          <div className="text-center mb-3">
            <span className="text-xs text-[#0F766E] font-bold tracking-widest uppercase">
              Current: Stage {currentStage.num} — {currentStage.title}
            </span>
          </div>

          {/* 14 Clickable Stage Numbers */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-2 px-4 no-scrollbar">
            {STAGES.map((s, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#0F766E] text-white shadow-md shadow-[#0F766E]/20 scale-105 font-bold"
                      : "bg-white text-gray-500 hover:text-[#0F766E] border border-gray-200 hover:border-[#0F766E]/40"
                  }`}
                  aria-label={`Jump to stage ${s.num}`}
                >
                  {s.num}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-3">
            <span>Use</span>
            <kbd className="px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600 font-mono text-[10px]">←</kbd>
            <kbd className="px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600 font-mono text-[10px]">→</kbd>
            <span>keys or swipe to navigate</span>
          </div>
        </div>

      </div>

      {/* ──── Interactive Stage Detail Modal (Opens when clicking Details button) ──── */}
      <AnimatePresence>
        {modalStage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalStage(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[#070D0E] overflow-hidden border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalStage(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
                  Stage {modalStage.num} of 14
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {modalStage.phase}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {modalStage.title}
              </h3>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6 bg-[#F8FAFC] border border-gray-100 p-4 rounded-2xl">
                {modalStage.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F766E] mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#0F766E]" />
                  Process & Quality Standard
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {modalStage.desc}
                </p>
                <p className="text-xs text-gray-500 italic mt-1">
                  Standard: {modalStage.qualityNote}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                  <span className="text-xs font-bold text-gray-800">
                    BQMS Certified Stage
                  </span>
                </div>
                <button
                  onClick={() => setModalStage(null)}
                  className="px-5 py-2.5 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-[#0F766E]/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
