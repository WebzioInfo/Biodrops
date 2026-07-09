"use client";

import { motion } from "framer-motion";
import React from "react";

interface ValueItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface WhyUsClientProps {
  values: ValueItem[];
}

export function WhyUsHero({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

export function WhyUsGrid({ values }: WhyUsClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {values.map((val, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          className="group relative bg-[#111A1B] p-10 md:p-14 rounded-3xl overflow-hidden border border-white/5 hover:border-[#cfef00]/30 transition-colors duration-500"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-[#cfef00]/0 via-[#cfef00]/10 to-[#cfef00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 text-[#cfef00] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#cfef00] group-hover:text-black transition-all duration-300">
              {val.icon}
            </div>
            <h3 className="text-3xl font-serif mb-4 group-hover:text-[#cfef00] transition-colors duration-300">{val.title}</h3>
            <p className="text-white/60 leading-relaxed font-light text-lg">
              {val.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
