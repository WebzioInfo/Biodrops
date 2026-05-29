"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-20 bg-[#F4F6F8] text-[#6B7C80] overflow-hidden">
      <div 
        className="w-full max-w-7xl mx-auto px-6 flex flex-col gap-12"
        style={{ paddingLeft: "max(1.5rem, 8vw)", paddingRight: "max(1.5rem, 8vw)" }}
      >
        {/* Top Section: Logo & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-[#070D0E]/5 pb-12">
          {/* Logo & Biofix initiative */}
          <div className="flex flex-col items-start gap-4">
            <Image 
              src="/images/logo.png" 
              alt="Biodrops Logo" 
              width={180} 
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
            <a href="https://biofixtechnology.com" target="_blank" rel="noopener noreferrer" className="text-[0.65rem] tracking-[0.1em] uppercase text-[#6B7C80] hover:text-[#56C7D9] transition-colors flex items-center gap-1.5">
              An initiative from <span className="font-semibold text-[#070D0E]">Biofix</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 text-[0.7rem] tracking-[0.2em] uppercase font-semibold">
            <Link href="#process" className="hover:text-[#56C7D9] transition-colors">Process</Link>
            <Link href="#why" className="hover:text-[#56C7D9] transition-colors">Why Us</Link>
            <Link href="#bqms" className="hover:text-[#56C7D9] transition-colors">BQMS</Link>
          </div>
        </div>

        {/* Centered Social Icons (higher up and centered) */}
        <div className="w-full flex justify-center items-center gap-8 mt-2">
          {/* Instagram */}
          <a href="https://www.instagram.com/biodrops.india?igsh=MW9ybTRheTh0N2ZwcA==" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125 duration-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(225,48,108,0.45)]">
              <defs>
                <linearGradient id="ig-grad-footer" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C13584" />
                  <stop offset="50%" stopColor="#E1306C" />
                  <stop offset="100%" stopColor="#FD1D1D" />
                </linearGradient>
              </defs>
              <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#ig-grad-footer)" />
              <rect width="12" height="12" x="6" y="6" rx="3" fill="none" stroke="#FFF" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3" fill="none" stroke="#FFF" strokeWidth="1.8" />
              <circle cx="16.5" cy="7.5" r="1" fill="#FFF" />
            </svg>
            <span className="sr-only">Instagram</span>
          </a>

          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125 duration-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(24,119,242,0.45)]">
              <circle cx="12" cy="12" r="10" fill="#1877F2"/>
              <path fill="#FFF" d="M14 12h-2v7H9.5v-7h-1.5V9.5h1.5v-2c0-1.8 1.1-2.8 2.8-2.8.8 0 1.5.1 1.7.1v2h-1.2c-.9 0-1.1.4-1.1 1v1.7h2.2l-.3 2.5z"/>
            </svg>
            <span className="sr-only">Facebook</span>
          </a>

          {/* Phone Call */}
          <a href="tel:+918884577773" className="transition-all hover:scale-125 duration-300 flex items-center justify-center" title="Call Us">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(86,199,217,0.45)]">
              <circle cx="12" cy="12" r="10" fill="#56C7D9" />
              <path fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M17 13.46v1.82a1.21 1.21 0 0 1-1.32 1.21 12 12 0 0 1-5.23-1.86 11.83 11.83 0 0 1-3.64-3.64A12 12 0 0 1 4.95 5.76 1.21 1.21 0 0 1 6.16 4.54h1.82a1.21 1.21 0 0 1 1.21 1.04c.24 1.7.67 3.35 1.27 4.91a1.21 1.21 0 0 1-.27 1.27L9.12 13a9.71 9.71 0 0 0 3.64 3.64l1.24-1.24a1.21 1.21 0 0 1 1.27-.27c1.56.6 3.21 1.03 4.91 1.27A1.21 1.21 0 0 1 17 13.46z"/>
            </svg>
            <span className="sr-only">Phone Call</span>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/918884577773" target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125 duration-300 flex items-center justify-center" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(37,211,102,0.45)]">
              <path fill="#25D366" d="M12.003 21c-1.63 0-3.21-.42-4.62-1.21L3 21l1.24-4.22c-.87-1.51-1.33-3.23-1.33-4.99C2.91 6.18 7.09 2 12.23 2c2.49 0 4.83.97 6.59 2.73s2.73 4.1 2.73 6.59c-.01 5.62-4.19 9.8-9.33 9.8z"/>
              <path fill="#FFF" d="M16.92 14.88c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.69.87-.85 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.56.58.69.22 1.31.19 1.8.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.16-1.36-.07-.12-.26-.19-.53-.33z"/>
            </svg>
            <span className="sr-only">WhatsApp</span>
          </a>

          {/* Email */}
          <a href="mailto:hello@biodrops.com" className="transition-all hover:scale-125 duration-300 flex items-center justify-center" title="Email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" className="w-5.5 h-5.5 drop-shadow-[0_2px_8px_rgba(234,67,53,0.45)]">
              <circle cx="12" cy="12" r="10" fill="#EA4335" />
              <path fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 8l6 4 6-4v8H6V8z"/>
            </svg>
            <span className="sr-only">Email</span>
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
