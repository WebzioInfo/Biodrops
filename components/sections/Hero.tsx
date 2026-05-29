"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-[#F4F6F8] overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-108 origin-center"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Vignette Blend Overlay to obscure bottom corner elements */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F4F6F8] via-[#F4F6F8]/50 to-transparent z-[1]" />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl text-center flex flex-col items-center justify-center"
        style={{ paddingLeft: "max(1.5rem, 8vw)", paddingRight: "max(1.5rem, 8vw)" }}
      >
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
            className="text-[clamp(3.5rem,7.5vw,7.5rem)] leading-[1.05] tracking-tight text-[#070D0E]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Quality Can Be<br/>
            <span className="italic text-[#00A8CC] font-normal">Canned.</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-10 max-w-xl mx-auto">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.7] text-[#6B7C80] font-light text-center"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Engineered for modern living. A masterpiece of hydration, 
            multi-stage purified and perfectly balanced.
          </motion.p>
        </div>

        {/* Relocated and Redesigned Biofix & BQMS Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-12">
          <motion.a
            href="https://biofixtechnology.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="group relative flex items-center gap-2.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-[#070D0E]/60 hover:text-[#070D0E] transition-colors"
          >
            <span className="flex items-center gap-2">
              An initiative from 
              <Image 
                src="/images/biofix.png" 
                alt="Biofix Logo" 
                width={120} 
                height={36}
                className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </span>
            <svg className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="absolute bottom-[-6px] left-0 right-0 h-px bg-[#56C7D9]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.a>

          <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[#070D0E]/15" />

          <motion.a
            href="#bqms"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="group relative flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-[#070D0E]/60 hover:text-[#070D0E] transition-colors"
          >
            <span>Certified by <span className="text-[#56C7D9]">BQMS</span></span>
            <svg className="w-3.5 h-3.5 opacity-60 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span className="absolute bottom-[-6px] left-0 right-0 h-px bg-[#56C7D9]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-28 mb-16"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8"
      >
        {/* WhatsApp */}
        <a 
          href="https://wa.me/918884577773" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-all hover:scale-125 duration-300 flex items-center justify-center"
          title="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(37,211,102,0.45)]">
            <path fill="#25D366" d="M12.003 21c-1.63 0-3.21-.42-4.62-1.21L3 21l1.24-4.22c-.87-1.51-1.33-3.23-1.33-4.99C2.91 6.18 7.09 2 12.23 2c2.49 0 4.83.97 6.59 2.73s2.73 4.1 2.73 6.59c-.01 5.62-4.19 9.8-9.33 9.8z"/>
            <path fill="#FFF" d="M16.92 14.88c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.69.87-.85 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.56.58.69.22 1.31.19 1.8.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.16-1.36-.07-.12-.26-.19-.53-.33z"/>
          </svg>
        </a>

        {/* Telephone Call */}
        <a 
          href="tel:+918884577773" 
          className="transition-all hover:scale-125 duration-300 flex items-center justify-center"
          title="Call Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(86,199,217,0.45)]">
            <circle cx="12" cy="12" r="10" fill="#56C7D9" />
            <path fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M17 13.46v1.82a1.21 1.21 0 0 1-1.32 1.21 12 12 0 0 1-5.23-1.86 11.83 11.83 0 0 1-3.64-3.64A12 12 0 0 1 4.95 5.76 1.21 1.21 0 0 1 6.16 4.54h1.82a1.21 1.21 0 0 1 1.21 1.04c.24 1.7.67 3.35 1.27 4.91a1.21 1.21 0 0 1-.27 1.27L9.12 13a9.71 9.71 0 0 0 3.64 3.64l1.24-1.24a1.21 1.21 0 0 1 1.27-.27c1.56.6 3.21 1.03 4.91 1.27A1.21 1.21 0 0 1 17 13.46z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a 
          href="https://www.instagram.com/biodrops.india?igsh=MW9ybTRheTh0N2ZwcA==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-all hover:scale-125 duration-300 flex items-center justify-center"
          title="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(225,48,108,0.45)]">
            <defs>
              <linearGradient id="ig-grad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C13584" />
                <stop offset="50%" stopColor="#E1306C" />
                <stop offset="100%" stopColor="#FD1D1D" />
              </linearGradient>
            </defs>
            <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#ig-grad)" />
            <rect width="12" height="12" x="6" y="6" rx="3" fill="none" stroke="#FFF" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="#FFF" strokeWidth="1.8" />
            <circle cx="16.5" cy="7.5" r="1" fill="#FFF" />
          </svg>
        </a>

        {/* Facebook */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-all hover:scale-125 duration-300 flex items-center justify-center"
          title="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(24,119,242,0.45)]">
            <circle cx="12" cy="12" r="10" fill="#1877F2"/>
            <path fill="#FFF" d="M14 12h-2v7H9.5v-7h-1.5V9.5h1.5v-2c0-1.8 1.1-2.8 2.8-2.8.8 0 1.5.1 1.7.1v2h-1.2c-.9 0-1.1.4-1.1 1v1.7h2.2l-.3 2.5z"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
