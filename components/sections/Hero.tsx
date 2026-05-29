"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-[#F4F6F8] overflow-hidden"
    >
      {/* Pattern Background Image with Flat Opacity */}
      <div 
        className="absolute inset-0 pointer-events-none bg-center bg-cover opacity-[0.2]"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />

      <motion.div 
        className="relative z-10 w-full max-w-7xl text-center flex flex-col items-center justify-center"
        style={{ paddingLeft: "max(1.5rem, 8vw)", paddingRight: "max(1.5rem, 8vw)" }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <motion.a
            href="https://biofixtechnology.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#070D0E]/10 bg-white/40 backdrop-blur-xl text-[0.65rem] tracking-[0.15em] uppercase font-semibold text-[#070D0E] hover:border-[#56C7D9]/50 transition-colors shadow-sm"
          >
            An initiative from <span className="text-[#56C7D9]">Biofix</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </motion.a>

          <motion.a
            href="#bqms"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#070D0E]/10 bg-white/40 backdrop-blur-xl text-[0.65rem] tracking-[0.15em] uppercase font-semibold text-[#070D0E] hover:border-[#56C7D9]/50 transition-colors shadow-sm"
          >
            Certified by <span className="text-[#56C7D9]">BQMS</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
          </motion.a>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#6B7C80] font-medium"
          >
            <span className="w-10 h-px bg-[#6B7C80]/30" />
            Mineral Water
            <span className="w-10 h-px bg-[#6B7C80]/30" />
          </motion.div>
        </div>

        <div className="overflow-hidden relative">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(3rem,7vw,7rem)] leading-[1] tracking-[-0.03em] text-[#070D0E]"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Quality Can Be<br/>
            <span className="italic text-[#56C7D9] font-medium">Canned.</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-10 max-w-lg mx-auto">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[1rem] leading-[1.8] text-[#6B7C80]"
          >
            Engineered for modern living. A masterpiece of hydration, 
            multi-stage purified and perfectly balanced.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14"
        >
          <a
            href="#product"
            className="group flex flex-col items-center gap-3 text-[#070D0E]"
          >
            <span className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold">Explore</span>
            <div className="w-10 h-10 rounded-full border border-[#070D0E]/20 flex items-center justify-center group-hover:border-[#56C7D9] transition-colors">
              ↓
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
