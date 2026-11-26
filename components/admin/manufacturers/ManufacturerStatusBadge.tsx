"use client";

import { ShieldCheck, CheckCircle2, Clock, Globe } from "lucide-react";

interface ManufacturerStatusBadgeProps {
  variant: "production" | "verified" | "license" | "domain";
  active: boolean;
  label?: string;
}

export default function ManufacturerStatusBadge({
  variant,
  active,
  label,
}: ManufacturerStatusBadgeProps) {
  if (variant === "production") {
    return active ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#15b5a3]/10 text-[#15b5a3] text-[11px] font-semibold">
        <ShieldCheck className="w-3.5 h-3.5" />
        {label ?? "Biodrops Partner"}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-[#6B7C80] text-[11px] font-medium">
        {label ?? "Standard Tenant"}
      </span>
    );
  }

  if (variant === "verified") {
    return active ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#cfef00]/25 text-[#070D0E] text-[11px] font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
        {label ?? "Verified Active"}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium">
        <Clock className="w-3.5 h-3.5" />
        {label ?? "Unverified"}
      </span>
    );
  }

  if (variant === "license") {
    return active ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#56C7D9]/15 text-[#008299] text-[11px] font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {label ?? "Licensed"}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium">
        <Clock className="w-3.5 h-3.5" />
        {label ?? "Pending"}
      </span>
    );
  }

  return active ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[#070D0E] text-[11px] font-medium">
      <Globe className="w-3.5 h-3.5 text-[#56C7D9]" />
      {label ?? "Custom Domain"}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-[#6B7C80] text-[11px] font-medium">
      {label ?? "Subdomain"}
    </span>
  );
}

