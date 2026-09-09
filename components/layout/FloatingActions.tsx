"use client";

import Link from "next/link";
import { ShoppingBag, ShieldCheck } from "lucide-react";

export default function FloatingActions() {
  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none"
    >
      {/* Button 2: Verify Batch (Internal Relative Link) */}
      <Link
        href="/KNOWYOURWATER"
        className="pointer-events-auto group inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-[#56C7D9] hover:bg-[#43B7C9] text-[#070D0E] rounded-full text-[0.72rem] sm:text-[0.78rem] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_6px_20px_rgba(86,199,217,0.35)] hover:shadow-[0_10px_24px_rgba(86,199,217,0.5)] border border-white/25 backdrop-blur-sm"
        title="Verify your batch purity at Know Your Water"
      >
        <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 stroke-[2.2]" />
        <span>Verify Batch</span>
      </Link>

      {/* Button 1: Order Now (External Shop Link) */}
      <a
        href="https://app.edrops.in/customer/shop"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-[#cfef00] hover:bg-[#c2e000] text-[#070D0E] rounded-full text-[0.72rem] sm:text-[0.78rem] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_6px_20px_rgba(207,239,0,0.35)] hover:shadow-[0_10px_24px_rgba(207,239,0,0.5)] border border-white/25 backdrop-blur-sm"
        title="Order Biodrops Mineral Water online"
      >
        <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 stroke-[2.2]" />
        <span>Order Now</span>
      </a>
    </aside>
  );
}
