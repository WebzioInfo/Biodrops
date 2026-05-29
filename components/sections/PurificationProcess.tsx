"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Raw Water", desc: "Sourced directly from GWA." },
  { num: "02", title: "Raw Water Pump", desc: "Powered by a high-efficiency 3HP system." },
  { num: "03", title: "Raw Water Storage", desc: "Held in a 9000-liter capacity tank." },
  { num: "04", title: "Sand Filter", desc: "Filters at 6000L/HR to remove large particulates." },
  { num: "05", title: "Activated Carbon Filter", desc: "Absorbs organics and odors at 6000L/HR." },
  { num: "06", title: "5 Micron Filter", desc: "Removes finer suspended particles at 6000L/HR." },
  { num: "07", title: "High Pressure Pump", desc: "Driven by a powerful 7.5 HP motor." },
  { num: "08", title: "RO System", desc: "Reverse Osmosis processing at 6000 L/HR." },
  { num: "09", title: "Intermediate Tank", desc: "5000L temporary storage for processed water." },
  { num: "10", title: "Filter Feed Pump", desc: "4HP pump regulating flow to micro filters." },
  { num: "11", title: "Micro Filtration", desc: "0.1, 0.2, and 0.5 micron precision filters." },
  { num: "12", title: "UV System", desc: "High-intensity ultraviolet sterilization at 6000L/HR." },
  { num: "13", title: "Final Storage Tank", desc: "5000L capacity holding pristine purified water." },
  { num: "14", title: "Filling Point", desc: "Manual and automatic hygienic filling station." },
];

interface ProcessCardProps {
  step: typeof steps[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  totalSteps: number;
}

function ProcessCard({ step, index, scrollYProgress, totalSteps }: ProcessCardProps) {
  const active = index / (totalSteps - 1);
  const distance = 1 / (totalSteps - 1);
  const start = active - distance;
  const end = active + distance;

  // Constrain domains to [0, 1] to prevent WAAPI "Offsets must be monotonically non-decreasing" errors
  let domain = [start, active, end];
  // Increase max scale to 2.5 for a true "fly-through" zoom effect as it passes the camera
  let scaleR = [0.6, 1, 2.5]; 
  let opacityR = [0, 1, 0];
  let zR = [-1000, 0, 800];
  let rotateXR = [30, 0, -30];

  if (index === 0) {
    domain = [active, end];
    scaleR = [1, 2.5];
    opacityR = [1, 0];
    zR = [0, 800];
    rotateXR = [0, -30];
  } else if (index === totalSteps - 1) {
    domain = [start, active];
    scaleR = [0.6, 1];
    opacityR = [0, 1];
    zR = [-1000, 0];
    rotateXR = [30, 0];
  }

  const scale = useTransform(scrollYProgress, domain, scaleR);
  const opacity = useTransform(scrollYProgress, domain, opacityR);
  const z = useTransform(scrollYProgress, domain, zR);
  const rotateX = useTransform(scrollYProgress, domain, rotateXR);
  
  // Optimization: Remove invisible elements from the GPU paint cycle without triggering layout reflows
  const visibility = useTransform(opacity, (v) => (v <= 0.01 ? "hidden" : "visible"));

  return (
    <motion.div
      style={{
        visibility,
        scale,
        opacity,
        z,
        rotateX,
        zIndex: totalSteps - index, // Crucial fix: Ensures cards zooming past the camera are correctly rendered on top of cards appearing from behind.
        transformOrigin: "center center",
        pointerEvents: "none", // Prevent hidden cards from blocking clicks
      }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 w-full h-full will-change-transform"
    >
      {/* Removed the background container to make it completely seamless */}
      <div className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-6 md:py-20 px-4 md:px-16">
        <div className="text-[#56C7D9] text-[0.65rem] md:text-sm font-semibold tracking-[0.3em] mb-2 md:mb-6 uppercase flex items-center gap-4">
          <span className="w-8 h-px bg-[#56C7D9]/50" />
          Stage {step.num}
          <span className="w-8 h-px bg-[#56C7D9]/50" />
        </div>
        
        <h3 
          className="text-[clamp(1.6rem,5vw,4.5rem)] text-[#070D0E] font-medium mb-3 md:mb-6 leading-[1.1] tracking-tight text-center" 
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {step.title}
        </h3>
        
        <p className="text-xs sm:text-sm md:text-xl text-[#070D0E]/60 max-w-xs md:max-w-md tracking-wide leading-relaxed font-light text-center">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function PurificationProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="process" className="relative w-full h-[1000vh] bg-[#EEF4F6]">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>
        
        {/* Background Title (Static) */}
        <div className="absolute top-12 md:top-24 left-0 right-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 text-center">
           <div className="flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-2 md:mb-4">
            <span className="w-8 h-px bg-[#070D0E]/20" />
            The Process
            <span className="w-8 h-px bg-[#070D0E]/20" />
          </div>
          <h2 className="text-xl md:text-4xl text-[#070D0E] font-light leading-snug" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            Fourteen Stages of <span className="italic text-[#56C7D9] font-medium">Perfection</span>
          </h2>
        </div>

        {/* 3D Stacking Container */}
        <div className="relative w-full max-w-3xl aspect-[1/1] md:aspect-[16/9] flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {steps.map((step, index) => (
            <ProcessCard 
              key={step.num} 
              step={step} 
              index={index} 
              scrollYProgress={scrollYProgress} 
              totalSteps={steps.length} 
            />
          ))}
        </div>

        {/* Floating Skip Process Arrow Button */}
        <div className="absolute bottom-10 md:bottom-16 z-30 pointer-events-auto">
          <a
            href="#why"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("why")?.scrollIntoView({ behavior: "smooth" });
            }}
            title="Skip Process"
            className="group w-12 h-12 rounded-full border border-[#070D0E]/10 bg-white/60 backdrop-blur-xl flex items-center justify-center text-[#070D0E] hover:bg-[#070D0E] hover:text-white hover:border-[#070D0E] transition-all duration-300 shadow-sm"
          >
            <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
