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

          {/* Phone Call */}
          <a href="tel:+918884577773" className="text-[#6B7C80] hover:text-[#56C7D9] transition-colors hover:scale-110 transform duration-300" title="Call Us">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="sr-only">Phone Call</span>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/918884577773" target="_blank" rel="noopener noreferrer" className="text-[#6B7C80] hover:text-[#56C7D9] transition-colors hover:scale-110 transform duration-300" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
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
