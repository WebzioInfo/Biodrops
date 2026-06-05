"use client";

import Link from "next/link";
import Image from "next/image";

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
          <div className="flex flex-wrap justify-end gap-6 text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-white/70">
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
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918884577773"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.974C16.588 1.83 14.116.804 11.487.804 6.052.804 1.63 5.223 1.627 10.66c-.001 1.7.45 3.355 1.305 4.8l-.294 1.074-.954 3.486 3.57-.936.803-.43zm12.56-6.195c-.302-.152-1.785-.881-2.062-.982-.278-.101-.48-.152-.68.152-.2.304-.778.982-.953 1.185-.175.203-.35.228-.652.076-.301-.152-1.272-.469-2.422-1.494-.895-.798-1.5-1.784-1.675-2.087-.175-.304-.019-.468.133-.619.136-.136.302-.355.454-.53.152-.178.202-.304.303-.507.101-.203.05-.38-.026-.531-.075-.152-.68-1.638-.931-2.247-.244-.587-.492-.507-.68-.517-.174-.009-.374-.011-.573-.011-.198 0-.521.075-.795.374-.274.297-1.047 1.02-1.047 2.486s1.07 2.88 1.219 3.082c.15.203 2.105 3.202 5.1 4.487.712.306 1.27.49 1.7.625.715.227 1.365.195 1.88.118.573-.085 1.785-.73 2.038-1.436.252-.706.252-1.314.176-1.436-.076-.123-.277-.198-.579-.349z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@biodrops.com"
            className="w-11 h-11 rounded-full border border-white/15 text-white/60 hover:border-[#cfef00] hover:text-[#cfef00] hover:bg-[#cfef00]/5 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title="Email"
          >
            <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
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
