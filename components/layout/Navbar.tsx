"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Hide the navbar when scrolling is active
      setVisible(false);

      // Clear the timeout to debounce showing it again
      clearTimeout(timeoutId);

      // Show the navbar after scrolling has stopped for 10ms (0.01s)
      timeoutId = setTimeout(() => {
        setVisible(true);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        y: visible ? 0 : -100 
      }}
      transition={{ 
        opacity: { duration: 1.0, ease: "easeInOut" },
        y: { duration: 1.0, ease: "easeOut" }
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? "pt-[24px] px-4" : "pt-[30px] px-6"
      }`}
    >
      <div 
        className={`flex items-center justify-center gap-8 md:gap-14 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.25)] rounded-full ${
          scrolled 
            ? "bg-[#070D0E]/85 backdrop-blur-xl border border-white/10 pl-[75px] pr-[75px] py-3.5" 
            : "bg-[#070D0E]/70 backdrop-blur-xl border border-white/5 pl-[85px] pr-[85px] py-4.5"
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

        <nav className="hidden md:flex items-center gap-10">
          <Link href="#process" className="group relative text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors py-2">
            Process
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#56C7D9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link href="#why" className="group relative text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors py-2">
            Why Us
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#56C7D9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
          <Link href="#bqms" className="group relative text-[0.75rem] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors py-2">
            BQMS
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#56C7D9] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </Link>
        </nav>

        <a
          href="#contact"
          className="group relative inline-flex items-center justify-center px-8 py-3 bg-white rounded-full text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#070D0E] hover:bg-[#56C7D9] hover:text-[#070D0E] transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_20px_rgba(86,199,217,0.3)] overflow-hidden"
        >
          <span className="relative z-10">Contact</span>
        </a>
      </div>
    </motion.header>
  );
}
