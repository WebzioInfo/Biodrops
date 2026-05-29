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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6"
      >
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/biodrops.india?igsh=MW9ybTRheTh0N2ZwcA==" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-11 h-11 rounded-full border border-[#070D0E]/15 text-[#070D0E]/60 hover:border-[#00A8CC] hover:text-[#00A8CC] hover:bg-[#00A8CC]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          title="Instagram"
        >
          <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>

        {/* Facebook */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-11 h-11 rounded-full border border-[#070D0E]/15 text-[#070D0E]/60 hover:border-[#00A8CC] hover:text-[#00A8CC] hover:bg-[#00A8CC]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          title="Facebook"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.45-1 1-1h2V2h-3c-3.1 0-4 1.88-4 4v2z"/>
          </svg>
        </a>

        {/* Phone Call */}
        <a 
          href="tel:+918884577773" 
          className="w-11 h-11 rounded-full border border-[#070D0E]/15 text-[#070D0E]/60 hover:border-[#00A8CC] hover:text-[#00A8CC] hover:bg-[#00A8CC]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          title="Call Us"
        >
          <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/918884577773" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-11 h-11 rounded-full border border-[#070D0E]/15 text-[#070D0E]/60 hover:border-[#00A8CC] hover:text-[#00A8CC] hover:bg-[#00A8CC]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          title="WhatsApp"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.974C16.588 1.83 14.116.804 11.487.804 6.052.804 1.63 5.223 1.627 10.66c-.001 1.7.45 3.355 1.305 4.8l-.294 1.074-.954 3.486 3.57-.936.803-.43zm12.56-6.195c-.302-.152-1.785-.881-2.062-.982-.278-.101-.48-.152-.68.152-.2.304-.778.982-.953 1.185-.175.203-.35.228-.652.076-.301-.152-1.272-.469-2.422-1.494-.895-.798-1.5-1.784-1.675-2.087-.175-.304-.019-.468.133-.619.136-.136.302-.355.454-.53.152-.178.202-.304.303-.507.101-.203.05-.38-.026-.531-.075-.152-.68-1.638-.931-2.247-.244-.587-.492-.507-.68-.517-.174-.009-.374-.011-.573-.011-.198 0-.521.075-.795.374-.274.297-1.047 1.02-1.047 2.486s1.07 2.88 1.219 3.082c.15.203 2.105 3.202 5.1 4.487.712.306 1.27.49 1.7.625.715.227 1.365.195 1.88.118.573-.085 1.785-.73 2.038-1.436.252-.706.252-1.314.176-1.436-.076-.123-.277-.198-.579-.349z"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
