"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Update scrolled state (only when it crosses the 50px threshold)
    if (latest > 50 && !scrolled) {
      setScrolled(true);
    } else if (latest <= 50 && scrolled) {
      setScrolled(false);
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (latest > 100 && latest > previous) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -100,
        paddingTop: scrolled ? '12px' : '16px'
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none"
    >
      <div className="pointer-events-auto">
        <div
          className={`flex items-center justify-center gap-2 md:gap-3 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.25)] rounded-full px-4 md:px-6 py-2 md:py-3 ${scrolled
              ? "bg-[#070D0E]/85 backdrop-blur-xl border border-white/10"
              : "bg-[#070D0E]/70 backdrop-blur-xl border border-white/5"
            }`}
        >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Biodrops Logo"
            width={150}
            height={40}
            className="h-9 w-auto object-contain hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-4 md:gap-6">
          <Link href="/process" className="group relative text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors py-2">
            Process
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#56C7D9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link href="/why-us" className="group relative text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors py-2">
            Why Us
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#56C7D9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link href="/bqms" className="group relative text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors py-2">
            BQMS
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#56C7D9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
        </nav>

        <a
          href="/#contact"
          className="hidden md:inline-flex group relative items-center justify-center px-8 py-3 bg-[#cfef00] hover:bg-[#c4e201] rounded-full text-[0.75rem] font-bold tracking-[0.2em] uppercase text-black transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(207,239,0,0.25)] hover:shadow-[0_8px_20px_rgba(207,239,0,0.45)] overflow-hidden"
        >
          <span className="relative z-10">Contact</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden ml-2 p-2 text-white hover:text-[#56C7D9] transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-4 right-4 mt-4 bg-[#070D0E]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-6 md:hidden"
            >
              <Link href="/process" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-[#56C7D9] transition-colors w-full text-center py-2 border-b border-white/5">
                Process
              </Link>
              <Link href="/why-us" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-[#56C7D9] transition-colors w-full text-center py-2 border-b border-white/5">
                Why Us
              </Link>
              <Link href="/bqms" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-[#56C7D9] transition-colors w-full text-center py-2 border-b border-white/5">
                BQMS
              </Link>
              <a
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#cfef00] rounded-full text-xs font-bold tracking-[0.2em] uppercase text-black mt-2"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
