import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#070D0E] text-white/60 pt-20 pb-10 border-t border-white/5 overflow-hidden font-sans selection:bg-[#cfef00] selection:text-black">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Columns Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">

          {/* Column 1: Brand & Parent Company Info */}
          <div className="flex flex-col space-y-6 sm:col-span-2 lg:col-span-1">

            {/* Logo Grouping */}
            <div className="flex flex-row gap-0 sm:items-center">
              <Image
                src="/images/logo.png"
                alt="BIODROPS Logo"
                width={280}
                height={75}
                className="h-10 w-auto object-contain self-start"
                priority
              />

              <a
                href="https://biofixtechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-start gap-0 text-[0.65rem] tracking-[0.1em] uppercase font-bold text-white/60 hover:text-white focus-visible:text-white transition-colors md:-mt-2  focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded p-1"
                aria-label="Biofix Technology LLP - Parent Brand Website"
              >
                <span>An initiative</span>
                <span className="flex flex-row flex-nowrap items-center gap-1 whitespace-nowrap">
                  from
                  <Image
                    src="/images/biofix.png"
                    alt="Biofix Logo"
                    width={30}
                    height={9}
                    className="h-4 w-auto object-contain opacity-85 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                  />
                </span>
              </a>
            </div>

            {/* Brand Pitch & Tagline */}
            <div className="space-y-3">
              <p className="text-xs italic text-[#56C7D9] font-medium font-serif">
                "Quality can be canned."
              </p>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/biodrops.india?igsh=MW9ybTRheTh0N2ZwcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 hover:border-[#cfef00] hover:bg-[#cfef00]/5 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none"
                title="Follow BIODROPS on Instagram"
                aria-label="Follow BIODROPS on Instagram"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/918884577773"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 hover:border-[#cfef00] hover:bg-[#cfef00]/5 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none"
                title="Contact BIODROPS via WhatsApp"
                aria-label="Contact BIODROPS via WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>

          </div>

          {/* Column 2: Products & Quality */}
          <nav className="flex flex-col space-y-4" aria-label="Products and Quality Links">
            <h4 className="text-xs tracking-[0.25em] uppercase text-white font-bold border-b border-white/10 pb-3">
              Products & Quality
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href="/process"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  14-Stage Process
                </Link>
              </li>
              <li>
                <Link
                  href="/why-us"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  Why BIODROPS
                </Link>
              </li>
              <li>
                <Link
                  href="/bqms"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  BQMS System
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  Certifications
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Resources & Docs */}
          <nav className="flex flex-col space-y-4" aria-label="Resource Links">
            <h4 className="text-xs tracking-[0.25em] uppercase text-white font-bold border-b border-white/10 pb-3">
              Resources
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href="/KNOWYOURWATER"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded font-semibold text-[#56C7D9]"
                >
                  Verify Batch (Know Your Water)
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  FAQ & Help
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about-ai"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  AI Reference Guide
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Compliance & Legal */}
          <nav className="flex flex-col space-y-4" aria-label="Legal and Compliance Links">
            <h4 className="text-xs tracking-[0.25em] uppercase text-white font-bold border-b border-white/10 pb-3">
              Legal
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href="/privacy"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  prefetch={false}
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  Cookie Policy
                </Link>
              </li>
              <li className="hidden">
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-3 sm:py-2 text-white/60 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  LLMs.txt (AI Reference)
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 5: Contact & Operations */}
          <div className="flex flex-col space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs tracking-[0.25em] uppercase text-white font-bold border-b border-white/10 pb-3">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#56C7D9] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-white/70">
                  Biofix Technology LLP,<br />
                  MC Building, Bypass Road,<br />
                  Kondotty, Kerala 673638
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#56C7D9] shrink-0" />
                <a
                  href="tel:+918884577773"
                  className="inline-block py-3 sm:py-1 text-white/70 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  +91 88845 77773
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#56C7D9] shrink-0" />
                <a
                  href="mailto:hello@biodrops.com"
                  className="inline-block py-3 sm:py-1 text-white/70 hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded"
                >
                  hello@biodrops.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Credits & Legals */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[0.65rem] tracking-[0.15em] text-white/40">
          <div>
            © 2026 BIODROPS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <a
              href="https://webziointernational.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-[#cfef00] focus-visible:text-[#cfef00] transition-colors focus-visible:ring-2 focus-visible:ring-[#cfef00] focus-visible:outline-none rounded p-0.5"
              aria-label="Webzio International - Designed and Developed by Webzio"
            >
              Webzio
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
