"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-[#F4F6F8] text-[#6B7C80] flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-10">
        
        {/* Brand Name & Initiative */}
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <Image 
            src="/images/logo.png" 
            alt="Biodrops Logo" 
            width={120} 
            height={32}
            className="h-8 w-auto object-contain opacity-80"
          />
          <a href="https://biofixtechnology.com" target="_blank" rel="noopener noreferrer" className="text-[0.65rem] tracking-[0.1em] uppercase text-[#6B7C80] hover:text-[#56C7D9] transition-colors flex items-center gap-1.5">
            An initiative from <span className="font-semibold text-[#070D0E]">Biofix</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>

        {/* Site Links */}
        <div className="flex items-center justify-center gap-8 text-[0.65rem] tracking-[0.2em] uppercase font-semibold w-full">
          <Link href="#process" className="hover:text-[#56C7D9] transition-colors text-center">Process</Link>
          <Link href="#why" className="hover:text-[#56C7D9] transition-colors text-center">Why Us</Link>
          <Link href="#bqms" className="hover:text-[#56C7D9] transition-colors text-center">BQMS</Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-8 mt-2 w-full">
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#6B7C80] hover:text-[#56C7D9] transition-colors hover:scale-110 transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="sr-only">Instagram</span>
          </a>

          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#6B7C80] hover:text-[#56C7D9] transition-colors hover:scale-110 transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span className="sr-only">Facebook</span>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-[#6B7C80] hover:text-[#56C7D9] transition-colors hover:scale-110 transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="sr-only">WhatsApp</span>
          </a>

          {/* Email */}
          <a href="mailto:hello@biodrops.com" className="text-[#6B7C80] hover:text-[#56C7D9] transition-colors hover:scale-110 transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span className="sr-only">Email</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[0.6rem] tracking-[0.1em] opacity-60 text-center w-full mt-4">
          © 2026 BIODROPS. ALL RIGHTS RESERVED.
        </p>

      </div>
    </footer>
  );
}
