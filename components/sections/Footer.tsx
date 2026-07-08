"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#070D0E] text-white/50 pt-16 pb-8 border-t border-white/5 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">

        {/* Main Columns Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 pb-12 border-b border-white/10">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col space-y-6 lg:col-span-1">
            <div className="flex flex-row gap-1">
              <Image
                src="/images/logo.png"
                alt="BIODROPS Logo"
                width={280}
                height={75}
                className="h-12 w-auto object-contain self-start"
                priority
              />

              <a
                href="https://biofixtechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-start gap-1.5 text-[0.65rem] tracking-[0.1em] uppercase font-bold text-white/60 hover:text-white transition-colors mt-2"
              >
                <span>An initiative</span>
                <span className="flex flex-row flex-nowrap items-center gap-1 whitespace-nowrap">
                  from
                  <Image
                    src="/images/biofix.png"
                    alt="Biofix Logo"
                    width={30}
                    height={9}
                    className="h-4 w-auto object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </span>
              </a>
            </div>

            <p className="text-xs text-white/40 leading-relaxed font-light">
              BIODROPS is a premium consumer brand dedicated to pure, mineral-balanced drinking water. Processed under our proprietary Biofix Quality Management System (BQMS).
            </p>

            <p className="text-xs italic text-[#56C7D9] font-medium font-serif">
              "Quality can be canned."
            </p>
          </div>

          {/* Column 2: Product & Process */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-bold border-b border-white/10 pb-2">
              Products & Quality
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/process" className="hover:text-[#cfef00] transition-colors">14-Stage Process</Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:text-[#cfef00] transition-colors">Why BIODROPS</Link>
              </li>
              <li>
                <Link href="/bqms" className="hover:text-[#cfef00] transition-colors">BQMS System</Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[#cfef00] transition-colors">Certifications</Link>
              </li>
              <li>
                <Link href="/KNOWYOURWATER" className="hover:text-[#cfef00] transition-colors">Verify Batch (Know Your Water)</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Docs */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-bold border-b border-white/10 pb-2">
              Knowledge Base
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/faq" className="hover:text-[#cfef00] transition-colors">FAQs & Help</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#cfef00] transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/about-ai" className="hover:text-[#cfef00] transition-colors font-semibold text-[#56C7D9]">AI Reference Guide</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-bold border-b border-white/10 pb-2">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#cfef00] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#cfef00] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#cfef00] transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Operations */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-white font-bold border-b border-white/10 pb-2">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#56C7D9] shrink-0 mt-0.5" />
                <span className="leading-tight text-white/70">
                  Biofix Technology LLP,<br />
                  MC Building, Bypass Road,<br />
                  Kondotty, Kerala 673638
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#56C7D9] shrink-0" />
                <a href="tel:+918884577773" className="hover:text-[#cfef00] transition-colors">+91 88845 77773</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#56C7D9] shrink-0" />
                <a href="mailto:hello@biodrops.com" className="hover:text-[#cfef00] transition-colors">hello@biodrops.com</a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/biodrops.india?igsh=MW9ybTRheTh0N2ZwcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-[#cfef00] hover:bg-[#cfef00]/5 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/918884577773"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 hover:border-[#cfef00] hover:bg-[#cfef00]/5 flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer Credits & Legals */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-[0.65rem] tracking-[0.1em] text-white/40">
          <div>
            © 2026 BIODROPS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed & Developed by</span>
            <a
              href="https://webziointernational.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-[#cfef00] transition-colors"
            >
              Webzio
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
