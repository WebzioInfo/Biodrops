"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Receipt,
  Factory,
  ShieldCheck,
  Lock,
  ExternalLink,
} from "lucide-react";
import { AquoraManufacturerDto } from "@/services/aquoraPublicApi";
import { formatReadableDate, parseISODate } from "@/lib/date";
import ManufacturerStatusBadge from "./ManufacturerStatusBadge";

interface ManufacturerDetailsProps {
  manufacturer: AquoraManufacturerDto | null;
  onClose: () => void;
}

function DetailRow({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 border-b border-[#E5E7EB]/70 last:border-b-0">
      <span className="text-xs font-medium text-[#6B7C80]">{label}</span>
      <span
        className={`text-xs sm:text-sm text-[#070D0E] font-medium sm:text-right break-all ${
          mono ? "font-mono" : ""
        }`}
      >
        {value && value.trim() !== "" ? value : "—"}
      </span>
    </div>
  );
}

export default function ManufacturerDetails({
  manufacturer,
  onClose,
}: ManufacturerDetailsProps) {
  useEffect(() => {
    if (!manufacturer) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [manufacturer, onClose]);

  return (
    <AnimatePresence>
      {manufacturer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070D0E]/50 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-xl bg-[#F4F6F8] h-full overflow-y-auto shadow-2xl border-l border-[#E5E7EB] flex flex-col"
            aria-label="Manufacturer Details"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-[#070D0E] text-white px-6 py-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                {manufacturer.logoUrl ? (
                  <Image
                    src={manufacturer.logoUrl}
                    alt={manufacturer.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#56C7D9]/20 text-[#56C7D9] font-bold text-sm flex items-center justify-center shrink-0 border border-[#56C7D9]/30">
                    {(manufacturer.badgeLetters || manufacturer.name.slice(0, 2)).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#cfef00] mb-0.5">
                    {manufacturer.code || "MANUFACTURER"}
                  </div>
                  <h2 className="text-lg font-semibold text-white truncate">
                    {manufacturer.name}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 flex-1">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                <ManufacturerStatusBadge
                  variant="production"
                  active={manufacturer.isBiodropsProduction}
                />
                <ManufacturerStatusBadge variant="verified" active={true} />
                <ManufacturerStatusBadge
                  variant="license"
                  active={Boolean(manufacturer.licenseNumber)}
                />
                <ManufacturerStatusBadge
                  variant="domain"
                  active={Boolean(manufacturer.customDomain)}
                />
              </div>

              {/* 1. Basic Information */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#070D0E] mb-3">
                  <Building2 className="w-4 h-4 text-[#56C7D9]" />
                  Basic Information
                </div>
                <DetailRow label="Legal / Display Name" value={manufacturer.name} />
                <DetailRow label="Manufacturer Code" value={manufacturer.code} mono />
                <DetailRow label="Badge Letters" value={manufacturer.badgeLetters} mono />
                <DetailRow label="Aquora Tenant ID" value={manufacturer.id} mono />
                <DetailRow
                  label="Registered On"
                  value={formatReadableDate(parseISODate(manufacturer.createdAt))}
                />
              </div>

              {/* 2. Contact Information */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#070D0E] mb-3">
                  <Phone className="w-4 h-4 text-[#15b5a3]" />
                  Contact Information
                </div>
                <DetailRow label="Owner / Plant Email" value={manufacturer.email} />
                <DetailRow label="Owner / Plant Phone" value={manufacturer.phone} />
                <div className="flex flex-wrap gap-2 pt-3">
                  {manufacturer.email && (
                    <a
                      href={`mailto:${manufacturer.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F6F8] hover:bg-[#56C7D9]/15 text-xs font-semibold text-[#070D0E] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#56C7D9]" />
                      Email Partner
                    </a>
                  )}
                  {manufacturer.phone && (
                    <a
                      href={`tel:${manufacturer.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F6F8] hover:bg-[#15b5a3]/15 text-xs font-semibold text-[#070D0E] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#15b5a3]" />
                      Call Partner
                    </a>
                  )}
                </div>
              </div>

              {/* 3. Address & Location */}
              {(manufacturer.address || manufacturer.location) && (
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#070D0E] mb-3">
                    <MapPin className="w-4 h-4 text-[#56C7D9]" />
                    Address &amp; Location
                  </div>
                  <DetailRow label="Facility Address" value={manufacturer.address} />
                  <DetailRow label="Location" value={manufacturer.location} />
                </div>
              )}

              {/* 4. License & Regulatory Information */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#070D0E] mb-3">
                  <FileText className="w-4 h-4 text-[#15b5a3]" />
                  License &amp; Regulatory Information
                </div>
                <DetailRow label="License Number" value={manufacturer.licenseNumber} mono />
                <DetailRow
                  label="Verification Status"
                  value="Active in Aquora Registry"
                />
              </div>

              {/* 5. Tax Information */}
              {(manufacturer.gstNumber || manufacturer.panNumber) && (
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#070D0E] mb-3">
                    <Receipt className="w-4 h-4 text-[#56C7D9]" />
                    Tax Information
                  </div>
                  <DetailRow label="GST Number" value={manufacturer.gstNumber} mono />
                  <DetailRow label="PAN Number" value={manufacturer.panNumber} mono />
                </div>
              )}

              {/* 6. Production & Domain Information */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#070D0E] mb-3">
                  <Factory className="w-4 h-4 text-[#15b5a3]" />
                  Production &amp; Tenant Routing
                </div>
                <DetailRow
                  label="Biodrops Production"
                  value={manufacturer.isBiodropsProduction ? "Enabled" : "Disabled"}
                />
                <DetailRow label="Aquora Subdomain" value={manufacturer.subdomain} mono />
                <DetailRow label="Custom Domain" value={manufacturer.customDomain} mono />
              </div>

              {/* 7. Extended Platform Fields Notice */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  Extended Aquora Platform Fields Locked
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  Fields such as <span className="font-mono">OwnerName</span>,{" "}
                  <span className="font-mono">SchemaName</span>,{" "}
                  <span className="font-mono">SubscriptionPlan</span>,{" "}
                  <span className="font-mono">ActiveUsersCount</span>, and edit/deactivate actions require Aquora SuperAdmin JWT authentication (<span className="font-mono">/api/v1/platform/tenants</span>).
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between gap-3">
              <Link
                href="/KNOWYOURWATER"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#15b5a3] hover:text-[#0f8c7e]"
              >
                <ShieldCheck className="w-4 h-4" />
                Verify Batches
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#070D0E] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#1a2426] cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

