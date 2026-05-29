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
        opacity: { duration: 0.08 },
        y: { duration: 0.12, ease: "easeOut" }
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? "pt-8 px-4" : "pt-14 px-6"
      }`}
    >
      <div 
        className={`flex items-center justify-center gap-10 md:gap-20 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-full ${
          scrolled 
            ? "bg-[#070D0E] border border-white/10 px-14 py-4.5" 
            : "bg-[#070D0E] border border-white/5 px-16 py-5.5"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/images/logo.png" 
            alt="Biodrops Logo" 
            width={150} 
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          <Link href="#process" className="text-[0.8rem] font-bold tracking-[0.18em] uppercase text-white/60 hover:text-[#56C7D9] transition-colors">
            Process
          </Link>
          <Link href="#why" className="text-[0.8rem] font-bold tracking-[0.18em] uppercase text-white/60 hover:text-[#56C7D9] transition-colors">
            Why Us
          </Link>
          <Link href="#bqms" className="text-[0.8rem] font-bold tracking-[0.18em] uppercase text-white/60 hover:text-[#56C7D9] transition-colors">
            BQMS
          </Link>
        </nav>

        <a
          href="#contact"
          className="group relative inline-flex items-center justify-center px-8 py-3 bg-white border border-white hover:border-[#56C7D9] rounded-full text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#070D0E] hover:text-white overflow-hidden transition-all duration-500 shadow-sm"
        >
          <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-[#56C7D9]/20 to-transparent transition-transform duration-1000 ease-out" />
          <span className="relative z-10">Contact</span>
        </a>
      </div>
    </motion.header>
  );
}
