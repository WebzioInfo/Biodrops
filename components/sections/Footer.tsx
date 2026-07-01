"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-10 bg-[#070D0E] text-white/50 overflow-hidden">
      <div
        className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col space-y-8"
      >
        {/* Top Section: Logo & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-3 border-b border-white/10 pb-8">
          {/* Logo & Biofix initiative */}
          <div className="flex flex-col items-start gap-2">
            <Image
              src="/images/logo.png"
              alt="Biodrops Logo"
              width={360}
              height={96}
              className="h-18 w-auto object-contain"
              priority
            />
            <a
              href="https://biofixtechnology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-white/60 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                An initiative from
                <Image
                  src="/images/biofix.png"
                  alt="Biofix Logo"
                  width={240}
                  height={72}
                  className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </span>
              <svg className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center mt-4 gap-6 text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-white/70">
            <Link href="/about" className="hover:text-[#cfef00] transition-colors">About</Link>
            <Link href="/process" className="hover:text-[#cfef00] transition-colors">Process</Link>
            <Link href="/why-us" className="hover:text-[#cfef00] transition-colors">Why Us</Link>
            <Link href="/certifications" className="hover:text-[#cfef00] transition-colors">Certifications</Link>
            <Link href="/bqms" className="hover:text-[#cfef00] transition-colors">BQMS</Link>
            <Link href="/faq" className="hover:text-[#cfef00] transition-colors">FAQ</Link>
            <Link href="/KNOWYOURWATER" className="hover:text-[#cfef00] transition-colors">Verify Batch</Link>
          </div>
        </div>

        {/* Centered Social Icons (luxury monochrome outline circular icons) */}
        <div className="w-full flex justify-center items-center gap-6 mt-2">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/biodrops.india?igsh=MW9ybTRheTh0N2ZwcA=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Instagram"
          >
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Facebook"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.45-1 1-1h2V2h-3c-3.1 0-4 1.88-4 4v2z" />
            </svg>
          </a>

          {/* Phone Call */}
          <a
            href="tel:+918884577773"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Call Us"
          >
            <Phone strokeWidth={1.5} size={20} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918884577773"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="WhatsApp"
          >
            <MessageCircle strokeWidth={1.5} size={20} />
          </a>

          {/* Email */}
          <a
            href="mailto:hello@biodrops.com"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Email"
          >
            <Mail strokeWidth={1.5} size={20} />
          </a>
        </div>

        {/* Copyright (Centered at the very bottom) */}
        <div className="w-full flex justify-center items-center mt-2">
          <p className="text-[0.65rem] tracking-[0.1em] opacity-60 text-center">
            © 2026 BIODROPS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
