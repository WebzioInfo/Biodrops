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
          className="mt-14 mb-16"
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

      {/* Social Media Links - Bottom Middle */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8 text-[#070D0E]/40 hover:text-[#070D0E]/80 transition-colors"
      >
        {/* WhatsApp */}
        <a 
          href="https://wa.me/918884577773" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#56C7D9] transition-all hover:scale-110 duration-300 flex items-center justify-center"
          title="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
          </svg>
        </a>

        {/* Telephone Call */}
        <a 
          href="tel:+918884577773" 
          className="hover:text-[#56C7D9] transition-all hover:scale-110 duration-300 flex items-center justify-center"
          title="Call Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>

        {/* Instagram */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#56C7D9] transition-all hover:scale-110 duration-300 flex items-center justify-center"
          title="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* Facebook */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-[#56C7D9] transition-all hover:scale-110 duration-300 flex items-center justify-center"
          title="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
