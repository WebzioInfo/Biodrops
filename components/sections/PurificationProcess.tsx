"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Pre-computed 14 node positions along a gentle undulating river curve with depth modulation
const nodePoints = [
  { x: 55,   y: 130, depth: 0.95, align: "bottom" },
  { x: 135,  y: 95,  depth: 0.85, align: "top" },
  { x: 215,  y: 72,  depth: 0.80, align: "top" },
  { x: 295,  y: 78,  depth: 0.82, align: "top" },
  { x: 375,  y: 110, depth: 0.90, align: "bottom" },
  { x: 455,  y: 148, depth: 1.05, align: "bottom" },
  { x: 540,  y: 164, depth: 1.10, align: "bottom" },
  { x: 625,  y: 148, depth: 1.05, align: "bottom" },
  { x: 705,  y: 108, depth: 0.90, align: "top" },
  { x: 785,  y: 74,  depth: 0.80, align: "top" },
  { x: 865,  y: 80,  depth: 0.82, align: "top" },
  { x: 945,  y: 115, depth: 0.90, align: "bottom" },
  { x: 1025, y: 152, depth: 1.06, align: "bottom" },
  { x: 1085, y: 135, depth: 0.98, align: "bottom" },
];

// Generates an exact, infinitely smooth Catmull-Rom to Cubic Bezier curve through all points
function buildSplinePath(pts: typeof nodePoints) {
  if (!pts.length) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

const fullCurvePath = buildSplinePath(nodePoints);

export default function PurificationProcess() {
  const [activeStage, setActiveStage] = useState(0);
  const mapScrollRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[activeStage];

  // Auto-scroll the map to keep active node comfortably in view on mobile screens
  useEffect(() => {
    if (!mapScrollRef.current) return;
    const container = mapScrollRef.current;
    if (container.scrollWidth > container.clientWidth) {
      const activePoint = nodePoints[activeStage];
      const targetScroll = (activePoint.x / 1140) * container.scrollWidth - container.clientWidth / 2;
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
    }
  }, [activeStage]);

  // Dashoffset calculation for the traveled route line
  // When activeStage is 0, only a subtle starting pulse is shown; up to activeStage 13 (all 100%)
  const travelProgress = activeStage === 0 ? 0.02 : activeStage / (steps.length - 1);
  const dashOffset = (1 - travelProgress) * 100;

  return (
    <section id="process" className="relative w-full bg-[#EEF4F6] py-16 md:py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-3">
            <span className="w-8 h-px bg-[#070D0E]/20" />
            The Process
            <span className="w-8 h-px bg-[#070D0E]/20" />
          </div>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl text-[#070D0E] font-light leading-snug"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Fourteen Stages of <span className="italic text-[#56C7D9] font-medium">Perfection</span>
          </h2>
        </div>

        {/* Content Area - Swaps via simple fade transition (no sliding / translate) */}
        <div className="max-w-2xl mx-auto text-center min-h-[150px] sm:min-h-[170px] flex flex-col items-center justify-center mb-6 md:mb-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center w-full"
            >
              <div className="text-[#15b5a3] md:text-[#56C7D9] text-[0.7rem] md:text-xs font-semibold tracking-[0.3em] uppercase mb-2 flex items-center gap-3">
                <span className="w-6 h-px bg-[#15b5a3]/40" />
                Stage {currentStep.num} of 14
                <span className="w-6 h-px bg-[#15b5a3]/40" />
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
        </div>

        {/* Curved Navigation Map Container */}
        <div className="relative w-full">
          {/* Subtle mobile scroll indicator hint */}
          <div className="md:hidden flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#070D0E]/40 mb-2">
            <span>← Swipe route or tap any stage →</span>
          </div>

          <div
            ref={mapScrollRef}
            tabIndex={0}
            aria-label="Process stages interactive map"
            className="w-full overflow-x-auto overflow-y-visible pb-8 pt-4 scroll-smooth focus:outline-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="min-w-[960px] lg:min-w-0 max-w-5xl mx-auto px-2">
              <svg
                viewBox="0 0 1140 230"
                className="w-full h-auto overflow-visible"
                role="region"
                aria-label="Fourteen purification stages map"
              >
                <defs>
                  {/* Subtle 3D road shadow / track gradient */}
                  <linearGradient id="unTraveledTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#070D0E" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#070D0E" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#070D0E" stopOpacity="0.08" />
                  </linearGradient>

                  {/* Luminous traveled route line */}
                  <linearGradient id="traveledRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#15b5a3" />
                    <stop offset="60%" stopColor="#56C7D9" />
                    <stop offset="100%" stopColor="#43b5c7" />
                  </linearGradient>

                  {/* Active node soft 3D lifted drop-shadow */}
                  <filter id="nodeActiveShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#56C7D9" floodOpacity="0.5" />
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#070D0E" floodOpacity="0.2" />
                  </filter>

                  {/* Inactive node resting shadow */}
                  <filter id="nodeDefaultShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#070D0E" floodOpacity="0.1" />
                  </filter>
                </defs>

                {/* 1. Underlying road depth / ambient track casing */}
                <path
                  d={fullCurvePath}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />

                {/* 2. Untraveled Base Route Path */}
                <path
                  d={fullCurvePath}
                  fill="none"
                  stroke="url(#unTraveledTrack)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* 3. Traveled Glow Aura */}
                <path
                  d={fullCurvePath}
                  fill="none"
                  stroke="#56C7D9"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeOpacity="0.25"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={dashOffset}
                  style={{
                    transition: "stroke-dashoffset 220ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* 4. Traveled Highlighted Route Line */}
                <path
                  d={fullCurvePath}
                  fill="none"
                  stroke="url(#traveledRouteGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={dashOffset}
                  style={{
                    transition: "stroke-dashoffset 220ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* 5. Interactive Nodes (1–14) */}
                {nodePoints.map((pt, idx) => {
                  const step = steps[idx];
                  const isActive = idx === activeStage;
                  const isTraveled = idx <= activeStage;
                  const baseRadius = 13 * pt.depth;
                  const activeRadius = baseRadius * 1.25;

                  // Label placement depending on wave trajectory
                  const isTop = pt.align === "top";
                  const labelY = isTop ? pt.y - baseRadius - 12 : pt.y + baseRadius + 18;

                  return (
                    <g
                      key={step.num}
                      onClick={() => setActiveStage(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Stage ${step.num}: ${step.title}`}
                      aria-current={isActive ? "step" : undefined}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveStage(idx);
                        }
                      }}
                      className="cursor-pointer group focus:outline-none"
                    >
                      {/* Invisible larger hit target for effortless tapping/clicking */}
                      <circle cx={pt.x} cy={pt.y} r={baseRadius * 2.2} fill="transparent" />

                      {/* Hover Halo (soft radial glow behind inactive node) */}
                      {!isActive && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={baseRadius * 1.9}
                          className="fill-[#56C7D9] opacity-0 group-hover:opacity-30 transition-all duration-200 pointer-events-none"
                        />
                      )}

                      {/* Node Circle */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isActive ? activeRadius : baseRadius}
                        filter={isActive ? "url(#nodeActiveShadow)" : "url(#nodeDefaultShadow)"}
                        className={`transition-all duration-200 ${
                          isActive
                            ? "fill-[#56C7D9] stroke-[#FFFFFF] stroke-2"
                            : isTraveled
                            ? "fill-[#FFFFFF] stroke-[#56C7D9] stroke-2 group-hover:stroke-[#56C7D9] group-hover:scale-110"
                            : "fill-[#FFFFFF] stroke-[#070D0E]/25 stroke-2 group-hover:stroke-[#56C7D9] group-hover:scale-110"
                        }`}
                        style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                      />

                      {/* Node Number Label */}
                      <text
                        x={pt.x}
                        y={pt.y + 0.5}
                        dominantBaseline="central"
                        textAnchor="middle"
                        className={`text-[10px] md:text-[11px] font-bold pointer-events-none transition-colors duration-200 ${
                          isActive
                            ? "fill-[#070D0E]"
                            : isTraveled
                            ? "fill-[#070D0E]/85"
                            : "fill-[#070D0E]/50 group-hover:fill-[#070D0E]"
                        }`}
                      >
                        {idx + 1}
                      </text>

                      {/* Stage Short Title (beside / above / below node) */}
                      <text
                        x={pt.x}
                        y={labelY}
                        textAnchor="middle"
                        className={`text-[9px] md:text-[10px] tracking-wider uppercase pointer-events-none transition-all duration-200 ${
                          isActive
                            ? "fill-[#070D0E] font-bold"
                            : "fill-[#070D0E]/50 group-hover:fill-[#070D0E] font-medium"
                        }`}
                      >
                        {step.short}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
