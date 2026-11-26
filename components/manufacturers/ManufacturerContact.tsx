"use client";

import Link from "next/link";
import { Phone, Mail, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { EnrichedManufacturer } from "@/lib/manufacturerSlug";

interface ManufacturerContactProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerContact({
  manufacturer,
}: ManufacturerContactProps) {
  const websiteUrl = manufacturer.customDomain
    ? manufacturer.customDomain.startsWith("http")
      ? manufacturer.customDomain
      : `https://${manufacturer.customDomain}`
    : null;

  return (
    <section className="bg-[#070D0E] text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between w-full">
      <div>
        <h2 className="text-lg font-semibold tracking-tight mb-1.5">
          Direct Contact
        </h2>
        <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">
          Public contact details for {manufacturer.name}.
        </p>

        <div className="space-y-3 mb-8">
          {manufacturer.phone && (
            <a
              href={`tel:${manufacturer.phone}`}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#56C7D9]/50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#56C7D9] shrink-0" />
              <span className="text-sm font-medium text-white">{manufacturer.phone}</span>
            </a>
          )}

          {manufacturer.email && (
            <a
              href={`mailto:${manufacturer.email}`}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#56C7D9]/50 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#cfef00] shrink-0" />
              <span className="text-sm font-medium text-white break-all">
                {manufacturer.email}
              </span>
            </a>
          )}

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#56C7D9]/50 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#15b5a3] shrink-0" />
              <span className="text-sm font-medium text-white break-all">
                {manufacturer.customDomain}
              </span>
            </a>
          )}

          {!manufacturer.phone && !manufacturer.email && !websiteUrl && (
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-white/60">
              No direct public phone or email is listed for this partner. Please reach out via BIODROPS support.
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/KNOWYOURWATER"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#cfef00] hover:bg-[#c4e201] text-[#070D0E] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          Verify Batch Report
        </Link>

        <Link
          href="/#contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75 hover:text-white transition-colors"
        >
          BIODROPS Support
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}

