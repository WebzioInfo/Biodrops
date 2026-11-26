"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Factory,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Microscope,
  QrCode,
  Wind,
  Thermometer,
  Lock,
} from "lucide-react";
import ScrollFade from "@/components/effects/ScrollFade";

interface PhaseDetail {
  id: string;
  phaseNum: string;
  title: string;
  subtitle: string;
  stagesRange: string;
  image: string;
  summary: string;
  parameters: { label: string; value: string }[];
  highlights: string[];
}

const MANUFACTURING_PHASES: PhaseDetail[] = [
  {
    id: "pre-treatment",
    phaseNum: "01",
    title: "Raw Intake & Multi-Media Pre-Treatment",
    subtitle: "Dual-Pass Sediment, Chlorine & Iron Removal",
    stagesRange: "Stages 01 – 05",
    image: "/images/process/sand-filter.jpg",
    summary:
      "Raw aquifer water enters at 6,000 L/HR through multi-graded quartz sand beds, virgin coconut-shell activated carbon columns, and catalytic manganese greensand iron removers—followed by secondary polishing passes to protect downstream RO membranes.",
    parameters: [
      { label: "Intake Flow Rate", value: "6,000 L/HR" },
      { label: "Turbidity Out", value: "< 0.5 NTU" },
      { label: "Free Chlorine", value: "100% Removed" },
      { label: "Iron Retention", value: "> 99.5% (< 0.05 ppm)" },
    ],
    highlights: [
      "Primary & secondary graded quartz sand + anthracite beds trap silt down to 20 microns",
      "950+ mg/g iodine-value coconut shell carbon eliminates odors and VOCs",
      "Catalytic oxidation bed strips dissolved iron and manganese",
    ],
  },
  {
    id: "ro-buffering",
    phaseNum: "02",
    title: "Molecular Reverse Osmosis & SS304 Buffering",
    subtitle: "0.0001-Micron Membrane Separation",
    stagesRange: "Stages 06 – 07",
    image: "/images/process/ro-system.jpg",
    summary:
      "High-pressure industrial pumps drive pre-treated water through Thin-Film Composite (TFC) semi-permeable membranes, rejecting 99.2% of dissolved salts, heavy metals, and chemical impurities before entering a hermetically sealed 5,000-liter SS304 buffer tank.",
    parameters: [
      { label: "Pore Rating", value: "0.0001 Micron" },
      { label: "TDS Rejection", value: "99.2% Nominal" },
      { label: "Buffer Vessel", value: "5,000 L SS304" },
      { label: "Tank Venting", value: "0.2 µm HEPA Sterile" },
    ],
    highlights: [
      "Continuous automated TDS & pressure differential telemetry",
      "Food-grade SS304 stainless steel piping with zero PVC contact",
      "Hermetically sealed intermediate tank with sterile 0.2µm HEPA air breathers",
    ],
  },
  {
    id: "polishing-minerals",
    phaseNum: "03",
    title: "Sub-Micron Polishing & Mineral Infusion",
    subtitle: "Optical Clarity & IS 14543 Electrolyte Balance",
    stagesRange: "Stages 08 – 11",
    image: "/images/process/ph-booster.jpg",
    summary:
      "Pure RO permeate passes through clinical 0.2-micron absolute pleated cartridges and 0.5-micron polishing filters, then flows through bio-active alkalizing media and precision mineral dosing to restore healthy Calcium, Magnesium, and Potassium.",
    parameters: [
      { label: "Micro-Filtration", value: "0.2 µm & 0.5 µm" },
      { label: "Target pH", value: "7.2 – 7.5 Alkaline" },
      { label: "Target TDS", value: "~75 ppm Balanced" },
      { label: "Minerals Added", value: "Ca, Mg & K (IS 14543)" },
    ],
    highlights: [
      "Hospital-grade Beta 5000 absolute sub-micron particulate retention (99.999%)",
      "Natural pH elevation neutralizing acidity for smooth, crisp taste",
      "Precision automated dosing calibrated to BIS IS:14543 mineral standards",
    ],
  },
  {
    id: "sterilization-cleanroom",
    phaseNum: "04",
    title: "Dual UV-C & Ozonation Sterilization",
    subtitle: "Chemical-Free Microbial Elimination & Cleanroom Holding",
    stagesRange: "Stages 12 – 14",
    image: "/images/process/uv-reactor.jpg",
    summary:
      "Mineral-balanced water is irradiated in a 253.7 nm UV-C reactor (>40 mJ/cm²) and infused with micro-bubble ozone (O₃) before entering our 9,000-liter positive-pressure sterile SS304 holding reservoir.",
    parameters: [
      { label: "UV-C Wavelength", value: "253.7 nm (> 40 mJ/cm²)" },
      { label: "Residual Ozone", value: "0.05 – 0.20 ppm" },
      { label: "Pathogen Count", value: "0.00 CFU / 100 ml" },
      { label: "Cleanroom Storage", value: "9,000 L Positive Pressure" },
    ],
    highlights: [
      "99.99% pathogen inactivation with zero chemical taste or byproducts",
      "Ozone naturally decays into pure dissolved oxygen (O₂) after sealing",
      "Positive-pressure HEPA cleanroom prevents airborne contamination",
    ],
  },
  {
    id: "bottling-sealing",
    phaseNum: "05",
    title: "Robotic Jar Sanitization, Filling & Sealing",
    subtitle: "100% Touch-Free Automated Packaging Line",
    stagesRange: "Packaging & Traceability",
    image: "/images/process/filling-line.jpg",
    summary:
      "Every returned 20L polycarbonate jar undergoes a multi-stage automated wash, hot alkaline sanitization, and ozonated rinse inside an enclosed tunnel before robotic zero-contact filling, tamper-proof capping, and BQMS batch QR coding.",
    parameters: [
      { label: "Human Contact", value: "0% Touch-Free" },
      { label: "Jar Hygiene", value: "Hot + Ozonated Rinse" },
      { label: "Seal Type", value: "Tamper-Evident Induction" },
      { label: "Traceability", value: "Batch QR + BQMS Lock" },
    ],
    highlights: [
      "Multi-nozzle internal & external high-pressure wash with food-grade sanitizer",
      "Enclosed HEPA air-curtain filling zone eliminates dust and airborne microbes",
      "Every jar receives a unique batch code verifiable on /KNOWYOURWATER",
    ],
  },
];

const JAR_SANITIZATION_STEPS = [
  {
    step: "01",
    title: "Visual & Leak Screening",
    desc: "Returned 20L jars are inspected for structural integrity, clarity, and odor before entering the automated wash conveyor.",
    icon: ShieldCheck,
  },
  {
    step: "02",
    title: "External High-Pressure Scrub",
    desc: "Rotary brushes and high-pressure jets strip away external dust, handling residue, and old labels.",
    icon: Droplets,
  },
  {
    step: "03",
    title: "Hot Alkaline & Sanitizer Wash",
    desc: "Internal inverted jetting with heated food-grade alkaline detergent dissolves biofilm and organic traces.",
    icon: Thermometer,
  },
  {
    step: "04",
    title: "Ozonated Pure Water Rinse",
    desc: "Final internal rinse using freshly ozonated product water ensures zero detergent residue and complete sterility.",
    icon: Sparkles,
  },
  {
    step: "05",
    title: "Cleanroom Fill & Tamper Seal",
    desc: "Automated rotary filler dispenses exactly 20L under HEPA positive pressure, followed by tamper-evident cap & QR coding.",
    icon: Lock,
  },
];

const FACILITY_SPECS = [
  { label: "Plant Capacity", value: "6,000 Liters / Hour Continuous", category: "Throughput" },
  { label: "Purification Architecture", value: "14-Stage Multi-Barrier (Dual Media + RO + UV + O₃)", category: "Engineering" },
  { label: "Contact Surfaces & Piping", value: "100% Food-Grade SS304 Stainless Steel", category: "Materials" },
  { label: "Cleanroom Air Standard", value: "0.2 µm HEPA Filtered Positive-Pressure Zone", category: "Hygiene" },
  { label: "Final Water Chemistry", value: "pH 7.2 – 7.5  |  TDS ~75 ppm  |  0.00 CFU/100ml", category: "Quality" },
  { label: "Standards & Licensing", value: "BIS IS:14543 · FSSAI · ISO 9001:2015 · BQMS", category: "Compliance" },
  { label: "Quality Governance", value: "Biofix Quality Management System (BQMS)", category: "Assurance" },
  { label: "Facility Location", value: "Kondotty, Malappuram, Kerala 673638", category: "Operations" },
];

export function ManufactureHero() {
  const kpis = [
    { value: "6,000 L/HR", label: "Processing Capacity", icon: Factory },
    { value: "14 Stages", label: "Purification Pipeline", icon: Cpu },
    { value: "0.2 µm HEPA", label: "Cleanroom Standard", icon: Wind },
    { value: "100%", label: "Touch-Free Bottling", icon: ShieldCheck },
  ];

  return (
    <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
      <ScrollFade
        amount={0.2}
        duration={0.55}
        yOffset={16}
        className="inline-flex items-center gap-4 text-[0.68rem] tracking-[0.32em] uppercase text-white/60 font-semibold mb-6"
      >
        <span className="w-10 h-px bg-[#cfef00]/60" />
        Manufacturing Excellence · Biofix Technology LLP
        <span className="w-10 h-px bg-[#cfef00]/60" />
      </ScrollFade>

      <ScrollFade
        amount={0.2}
        delay={0.08}
        duration={0.6}
        yOffset={24}
        className="text-[clamp(2.5rem,6vw,4.75rem)] font-light leading-[1.08] tracking-tight mb-6"
      >
        <h1>
          Inside Our <span className="text-[#56C7D9] font-medium">Zero-Contact</span>{" "}
          <span className="text-[#cfef00] font-medium">Facility.</span>
        </h1>
      </ScrollFade>

      <ScrollFade
        amount={0.2}
        delay={0.15}
        duration={0.55}
        yOffset={20}
        className="text-base md:text-xl text-white/65 max-w-3xl font-light leading-relaxed mb-12"
      >
        <p>
          Every 20L BIODROPS jar is engineered inside our BIS IS:14543 &amp; FSSAI-certified plant in Kerala—combining SS304 stainless steel architecture, 14-stage purification, robotic jar sanitization, and shift-wise BQMS laboratory verification.
        </p>
      </ScrollFade>

      {/* KPI Strip */}
      <ScrollFade
        amount={0.15}
        delay={0.22}
        duration={0.6}
        yOffset={20}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 text-left hover:border-[#56C7D9]/40 transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-[#56C7D9]/15 text-[#56C7D9] flex items-center justify-center mb-4">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-1">
                {kpi.value}
              </div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/50 font-medium">
                {kpi.label}
              </div>
            </div>
          );
        })}
      </ScrollFade>
    </div>
  );
}

export function InteractiveProductionLine() {
  const [activePhaseId, setActivePhaseId] = useState(MANUFACTURING_PHASES[0].id);
  const activePhase =
    MANUFACTURING_PHASES.find((p) => p.id === activePhaseId) ?? MANUFACTURING_PHASES[0];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F4F6F8]">
      <div className="max-w-[1280px] mx-auto">
        <ScrollFade amount={0.2} duration={0.6} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.35em] uppercase text-[#6B7C80] font-semibold mb-3">
            <span className="w-8 h-px bg-[#6B7C80]/30" />
            End-to-End Architecture
            <span className="w-8 h-px bg-[#6B7C80]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[#070D0E] tracking-tight mb-4">
            Five-Phase <span className="text-[#56C7D9] font-medium">Production Line.</span>
          </h2>
          <p className="text-sm md:text-base text-[#6B7C80] font-light leading-relaxed">
            Select a manufacturing phase below to inspect the engineering parameters, equipment specifications, and quality controls at each step.
          </p>
        </ScrollFade>

        {/* Phase Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-10">
          {MANUFACTURING_PHASES.map((phase) => {
            const isActive = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhaseId(phase.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-[#070D0E] text-white border-[#070D0E] shadow-md"
                    : "bg-white text-[#070D0E]/70 border-[#E5E7EB] hover:border-[#56C7D9] hover:text-[#070D0E]"
                }`}
              >
                <span className={isActive ? "text-[#cfef00] mr-1.5" : "text-[#56C7D9] mr-1.5"}>
                  {phase.phaseNum}
                </span>
                {phase.stagesRange}
              </button>
            );
          })}
        </div>

        {/* Active Phase Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[460px] bg-[#070D0E]">
              <Image
                src={activePhase.image}
                alt={activePhase.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D0E]/85 via-[#070D0E]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#cfef00] text-black text-[10px] font-bold uppercase tracking-[0.18em] mb-2">
                  Phase {activePhase.phaseNum} · {activePhase.stagesRange}
                </span>
                <p className="text-xs text-white/80 font-light">{activePhase.subtitle}</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium text-[#070D0E] tracking-tight mb-4">
                  {activePhase.title}
                </h3>
                <p className="text-sm sm:text-base text-[#070D0E]/70 leading-relaxed mb-8 font-light">
                  {activePhase.summary}
                </p>

                {/* Engineering Parameters Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                  {activePhase.parameters.map((param) => (
                    <div
                      key={param.label}
                      className="bg-[#F4F6F8] border border-[#E5E7EB] rounded-2xl p-4"
                    >
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#6B7C80] font-semibold mb-1">
                        {param.label}
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-[#070D0E]">
                        {param.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2.5">
                  {activePhase.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-[#070D0E]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#56C7D9] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/process"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#070D0E] hover:text-[#56C7D9] transition-colors"
                >
                  View All 14 Stages
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-[#6B7C80] font-medium">
                  IS 14543 &amp; BQMS Monitored
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function JarSanitizationSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-[1280px] mx-auto">
        <ScrollFade amount={0.2} duration={0.6} className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.35em] uppercase text-[#6B7C80] font-semibold mb-3">
            <span className="w-8 h-px bg-[#6B7C80]/30" />
            Automated Packaging Hygiene
            <span className="w-8 h-px bg-[#6B7C80]/30" />
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-[#070D0E] tracking-tight mb-4">
            5-Step <span className="text-[#56C7D9] font-medium">Jar Sanitization.</span>
          </h2>
          <p className="text-sm md:text-base text-[#6B7C80] font-light leading-relaxed">
            Water purity is only half the equation. Every 20L polycarbonate jar passes through an enclosed, zero-contact washing, sanitizing, and cleanroom filling tunnel.
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {JAR_SANITIZATION_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollFade
                key={item.step}
                amount={0.15}
                delay={idx * 0.06}
                duration={0.5}
                yOffset={18}
                className="h-full"
              >
                <div className="h-full bg-[#F4F6F8] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between hover:border-[#56C7D9]/50 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#56C7D9]">
                        STEP {item.step}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#070D0E]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-[#070D0E] mb-2.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7C80] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function QualityLabAndSpecsSection() {
  return (
    <>
      {/* In-House BQMS Laboratory & Traceability */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#070D0E] text-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <ScrollFade amount={0.2} duration={0.6} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.35em] uppercase text-white/60 font-semibold">
              <span className="w-8 h-px bg-[#cfef00]/60" />
              BQMS Quality Assurance
            </div>

            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.1]">
              Tested Every Shift.{" "}
              <span className="text-[#cfef00] font-medium">Verified Online.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Our on-site Chemistry and Microbiology laboratory—governed by the Biofix Quality Management System (BQMS)—tests every production shift against BIS IS:14543 parameters before any batch is cleared for dispatch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
                <Microscope className="w-5 h-5 text-[#56C7D9] mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Microbiology Lab</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Daily coliform, E. coli, yeast, mold, and total plate count incubation ensuring 0.00 CFU/100ml.
                </p>
              </div>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
                <FlaskConical className="w-5 h-5 text-[#cfef00] mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Physico-Chemical Lab</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Hourly checks for pH (7.2–7.5), TDS (~75 ppm), turbidity, hardness, alkalinity, and residual ozone.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/KNOWYOURWATER"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#cfef00] hover:bg-[#c4e201] text-black text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-200 hover:scale-[1.02]"
              >
                <QrCode className="w-4 h-4" />
                Verify Batch Online
              </Link>
              <Link
                href="/bqms"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-[#56C7D9] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-colors"
              >
                Explore BQMS
              </Link>
            </div>
          </ScrollFade>

          <ScrollFade amount={0.2} delay={0.1} duration={0.6} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/bqms_images/testing.jpeg"
                alt="BIODROPS In-House Water Testing Laboratory"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfef00] font-bold">
                  Shift Testing
                </span>
                <p className="text-sm font-medium text-white">In-House Chemistry &amp; Micro Lab</p>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 sm:mt-8">
              <Image
                src="/bqms_images/licensing.jpeg"
                alt="BIS IS 14543 and FSSAI Compliance Documentation"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#56C7D9] font-bold">
                  Full Compliance
                </span>
                <p className="text-sm font-medium text-white">BIS IS:14543 &amp; FSSAI Audited</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* Facility Technical Specifications Table */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F4F6F8]">
        <div className="max-w-5xl mx-auto">
          <ScrollFade amount={0.2} duration={0.6} className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-[0.65rem] tracking-[0.35em] uppercase text-[#6B7C80] font-semibold mb-3">
              <span className="w-8 h-px bg-[#6B7C80]/30" />
              Technical Dossier
              <span className="w-8 h-px bg-[#6B7C80]/30" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-[#070D0E] tracking-tight">
              Plant <span className="text-[#56C7D9] font-medium">Specifications.</span>
            </h2>
          </ScrollFade>

          <ScrollFade amount={0.15} duration={0.6} className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y divide-[#E5E7EB]">
              {FACILITY_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 sm:py-5 items-center hover:bg-[#F4F6F8]/60 transition-colors"
                >
                  <div className="sm:col-span-2">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#56C7D9]/10 text-[#0097B2] text-[10px] font-bold uppercase tracking-[0.15em]">
                      {spec.category}
                    </span>
                  </div>
                  <div className="sm:col-span-4 text-sm font-medium text-[#070D0E]">
                    {spec.label}
                  </div>
                  <div className="sm:col-span-6 text-sm text-[#6B7C80] font-light sm:text-right">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </ScrollFade>

          {/* Bottom CTA */}
          <ScrollFade amount={0.2} delay={0.1} duration={0.55} className="mt-14 text-center">
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#56C7D9] mb-2">
                  <Gauge className="w-4 h-4" />
                  Corporate &amp; Bulk Partnerships
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-[#070D0E]">
                  Want to audit our facility or order in bulk?
                </h3>
              </div>
              <Link
                href="/#contact"
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-[#070D0E] hover:bg-[#1a2426] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-200 hover:scale-[1.02]"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}

