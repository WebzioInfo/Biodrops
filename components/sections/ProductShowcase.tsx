"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      id="product" 
      className="relative w-full min-h-[100svh] py-24 md:py-32 flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/images/premium-jar-studio.jpg')",
        backgroundPosition: "80% center", // Keep the jar anchored on the right side
      }}
    >
      {/* Soft gradient overlay to ensure text readability over the background image */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 md:via-white/50 to-transparent pointer-events-none" />

      <div 
        className="relative z-10 w-full max-w-7xl flex flex-col items-start justify-center"
        style={{ paddingLeft: "max(1.5rem, 8vw)", paddingRight: "max(1.5rem, 8vw)" }}
      >
        
        {/* Left Side Content Container */}
        <div className="w-full max-w-xl flex flex-col items-start text-left">
          
          {/* Section Header */}
          <div className="flex items-center gap-4 text-[0.65rem] tracking-[0.4em] uppercase text-[#070D0E]/50 font-medium mb-12">
            <span className="w-8 h-px bg-[#070D0E]/30" />
            The Product
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] text-[#070D0E] tracking-tight mb-12"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Pure.<br/>
            <span className="text-[#56C7D9] italic font-medium">Uncompromised.</span>
          </motion.h2>

          {/* Thin minimalist divider line */}
          <div className="w-full h-px bg-[#070D0E]/10 mb-12" />

          {/* Asymmetric Minimalist Floating Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
            {[
              { 
                num: "01", 
                title: "14-Stage Process", 
                desc: "Rigorous filtration and sterilization stages to guarantee clinical-grade purity.",
                yOffset: "md:translate-y-0"
              },
              { 
                num: "02", 
                title: "edrops Delivery", 
                desc: "Fresh batches dispatched and tracked exclusively through our custom edrops network.",
                yOffset: "md:translate-y-12"
              },
              { 
                num: "03", 
                title: "Mineral Infused", 
                desc: "Perfect balance of essential minerals (pH 7.4) tailored for healthy daily hydration.",
                yOffset: "md:-translate-y-4"
              },
              { 
                num: "04", 
                title: "Sterile Lock", 
                desc: "Hygienically sealed under zero-contact environments with a solid threaded safety cap.",
                yOffset: "md:translate-y-8"
              },
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative overflow-hidden bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-xl rounded-3xl p-8 md:p-10 flex flex-col gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(86,199,217,0.08)] transition-all duration-500 group ${feature.yOffset}`}
              >
                {/* Glow Backdrop Gradient behind card content */}
                <div className="absolute -inset-40 bg-[radial-gradient(circle_at_center,rgba(86,199,217,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Large Background Number */}
                <span className="text-[5.5rem] font-light text-[#070D0E]/5 select-none absolute top-4 right-8 font-mono leading-none group-hover:text-[#56C7D9]/20 transition-colors duration-500">
                  {feature.num}
                </span>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-4 mt-6">
                  {/* Accent Line indicator */}
                  <span className="w-8 h-[2px] bg-[#56C7D9] transition-all duration-500 group-hover:w-16" />
                  
                  <h4 
                    className="text-2xl md:text-3xl font-medium tracking-tight text-[#070D0E] group-hover:text-[#56C7D9] transition-colors duration-500 mt-2"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    {feature.title}
                  </h4>
                  
                  <p className="text-sm md:text-base font-light text-[#070D0E]/60 leading-relaxed max-w-[300px]">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mt-20 md:mt-24 w-full flex justify-center md:justify-start"
          >
            <a
              href="https://edrops.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-4 px-16 py-6 bg-[#070D0E] border-2 border-[#070D0E] hover:border-[#56C7D9] rounded-full text-[0.85rem] font-bold tracking-[0.25em] uppercase text-white overflow-hidden transition-all duration-500 shadow-xl hover:scale-[1.04] active:scale-95 text-center w-full sm:w-auto min-w-[300px]"
            >
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-[#56C7D9]/20 to-transparent transition-transform duration-1000 ease-out" />
              <span className="relative z-10">Request Delivery</span>
              <svg className="relative z-10 w-4.5 h-4.5 text-white/50 group-hover:text-[#56C7D9] group-hover:translate-x-1.5 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
