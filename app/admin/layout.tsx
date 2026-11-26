"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Factory,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
  Lock,
  ChevronRight,
  Droplets,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Manufacturers",
    href: "/admin/manufacturers",
    icon: Factory,
    badge: "Live",
  },
  {
    label: "Batch Verification",
    href: "/KNOWYOURWATER",
    icon: ShieldCheck,
    external: false,
  },
  {
    label: "Purification Process",
    href: "/process",
    icon: Droplets,
    external: false,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = pathname?.includes("/manufacturers")
    ? "Manufacturer Management"
    : "Admin Console";

  return (
    <div
      className="min-h-screen bg-[#F4F6F8] text-[#070D0E] flex"
      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
    >
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#070D0E]/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#070D0E] text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-18 px-6 flex items-center justify-between border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="BIODROPS"
                width={130}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="px-2 py-0.5 rounded-full bg-[#56C7D9]/15 text-[#56C7D9] text-[10px] font-bold uppercase tracking-[0.16em]">
                Admin
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="px-4 py-6">
            <div className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              Operations
            </div>
            <nav className="space-y-1.5" aria-label="Admin Navigation">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-[#56C7D9]/15 text-[#56C7D9] border border-[#56C7D9]/25"
                        : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#cfef00] text-[#070D0E] text-[10px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Security / Upstream Status Card */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#cfef00] mb-1">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Read-Only Mode</span>
            </div>
            <p className="text-[11px] text-white/55 leading-relaxed">
              Connected to Aquora Public Registry. Write operations require Aquora SuperAdmin JWT &amp; NextAuth setup.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>Return to Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-18 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#E5E7EB] text-[#070D0E] hover:bg-[#F4F6F8]"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <nav className="flex items-center gap-1.5 text-[11px] text-[#6B7C80] font-medium mb-0.5">
                <Link href="/admin/manufacturers" className="hover:text-[#070D0E] transition-colors">
                  Admin
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#070D0E] truncate">{pageTitle}</span>
              </nav>
              <h1 className="text-base sm:text-lg font-semibold text-[#070D0E] tracking-tight truncate">
                {pageTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#15b5a3]/10 text-[#15b5a3] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#15b5a3]" />
              Aquora Upstream Synced
            </span>
          </div>
        </header>

        {/* Page Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

