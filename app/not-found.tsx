import Link from "next/link";
import { ArrowLeft, Search, Droplets, ShieldCheck, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | BIODROPS",
  description: "The page you are looking for does not exist. Browse BIODROPS premium mineral water products, purification process, or batch verification.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F4F6F8] font-sans selection:bg-[#56C7D9] selection:text-white flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
        <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mx-auto mb-6">
          <Droplets className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold tracking-widest uppercase text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif text-[#070D0E] font-bold mt-4 mb-3">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mb-8 leading-relaxed">
          The link you followed may be broken or the page may have been moved.
          Explore our certified mineral water pipeline or verify your jar batch below.
        </p>

        {/* Helpful Shortcut Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
          <Link
            href="/KNOWYOURWATER"
            className="p-3.5 rounded-xl border border-gray-100 hover:border-[#0F766E]/30 hover:bg-[#F8FAFC] transition-all flex items-center gap-3 text-xs font-semibold text-gray-800"
          >
            <Search className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span>Verify Batch Report</span>
          </Link>

          <Link
            href="/process"
            className="p-3.5 rounded-xl border border-gray-100 hover:border-[#0F766E]/30 hover:bg-[#F8FAFC] transition-all flex items-center gap-3 text-xs font-semibold text-gray-800"
          >
            <ShieldCheck className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span>14-Stage Process</span>
          </Link>

          <Link
            href="/faq"
            className="p-3.5 rounded-xl border border-gray-100 hover:border-[#0F766E]/30 hover:bg-[#F8FAFC] transition-all flex items-center gap-3 text-xs font-semibold text-gray-800"
          >
            <HelpCircle className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span>Help & FAQ</span>
          </Link>

          <Link
            href="/#contact"
            className="p-3.5 rounded-xl border border-gray-100 hover:border-[#0F766E]/30 hover:bg-[#F8FAFC] transition-all flex items-center gap-3 text-xs font-semibold text-gray-800"
          >
            <Droplets className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span>Order 20L Jar</span>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
