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
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
        style={{ paddingLeft: "max(1.5rem, 8vw)", paddingRight: "max(1.5rem, 8vw)" }}
      >
        
        {/* Left Side Content Container (Column span 7) */}
        <div className="lg:col-span-7 w-full flex flex-col items-start text-left">
          
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mt-8">
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
        </div>

        {/* Right Side: Button positioned at the bottom of the product image area */}
        <div className="lg:col-span-5 flex flex-col items-center justify-end w-full min-h-[300px] lg:self-stretch z-20 pb-6 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <a
              href="https://edrops.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-6 px-[56px] py-[38px] bg-[#cfef00] hover:bg-[#c4e201] text-black text-[16px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-200 transform active:scale-95 shadow-[0_8px_25px_rgba(207,239,0,0.3)] hover:shadow-[0_12px_35px_rgba(207,239,0,0.5)] min-w-[320px] sm:min-w-[340px] text-center"
            >
              <span>Request Delivery</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 74 74"
                className="w-[34px] h-[34px] transition-transform duration-300 ease-in-out group-hover:translate-x-[5px]"
              >
                <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
                <path
                  fill="black"
                  d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                ></path>
              </svg>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
