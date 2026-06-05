"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BQMSSection() {
  return (
    <section id="bqms" className="relative w-full py-32 md:py-48 bg-[#FFFFFF] text-[#070D0E] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Subtle minimalist gradient background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full bg-[#56C7D9] opacity-[0.05] blur-[150px] absolute -right-40 top-0" />
      </div>

      <div 
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center"
      >
        
        {/* Left Side: Text Content */}
        <div className="relative flex flex-col items-start text-left w-full z-10">
          {/* Mobile Background Seal (visible on mobile only as a subtle watermark background) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-[0.08] pointer-events-none md:hidden z-0">
            <Image 
              src="/images/bqms-badge.png" 
              alt="BQMS Golden Standard Seal Background" 
              fill
              className="object-contain"
            />
          </div>

          {/* Eyebrow Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-center gap-6 text-[0.6rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-semibold mb-10 w-full"
          >
            <span className="w-12 h-px bg-[#070D0E]/20" />
            Biofix Quality Management System
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight mb-12 font-light"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            The <span className="italic text-[#56C7D9] font-medium">Golden Standard.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-lg md:text-xl text-[#070D0E]/60 leading-[1.8] font-light max-w-xl mb-10"
          >
            Biofix Quality Management System is our unique quality standard designed by Biofix Research Institute to maintain a golden standard of water quality. BQMS manages many firms in Kerala including packaged drinking water projects, restaurants, Laboratories and many other industrial institutions. Biodrops also keeps the golden standard by the strict quality guidelines of BQMS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex justify-center md:justify-start"
          >
            <a
              href="/bqms-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-6 px-[56px] py-[38px] bg-[#cfef00] hover:bg-[#c4e201] text-black text-[16px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-200 transform active:scale-95 shadow-[0_8px_25px_rgba(207,239,0,0.3)] hover:shadow-[0_12px_35px_rgba(207,239,0,0.5)] min-w-[320px] sm:min-w-[340px] text-center"
            >
              <span>View BQMS Brochure</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
                className="w-[30px] h-[30px] text-black transition-transform duration-300 ease-in-out group-hover:translate-y-[3px]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Image / Seal (visible on desktop only) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[1/2] md:aspect-[3/4] lg:aspect-[2/3] max-w-[400px] mx-auto hidden md:flex items-center justify-center -translate-y-28 md:-translate-y-48"
        >
          <Image 
            src="/images/bqms-badge.png" 
            alt="BQMS Golden Standard Seal" 
            fill
            className="object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
}
