"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, ShieldCheck, FileText } from "lucide-react";
import { EnrichedManufacturer, getManufacturerInitials } from "@/lib/manufacturerSlug";

interface ManufacturerProfileHeroProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerProfileHero({
  manufacturer,
}: ManufacturerProfileHeroProps) {
  const initials = getManufacturerInitials(manufacturer.name, manufacturer.badgeLetters);
  const locationText = manufacturer.location || manufacturer.address;

  return (
    <section className="relative w-full pt-32 pb-14 md:pt-36 md:pb-16 px-4 sm:px-6 lg:px-8 bg-[#070D0E] text-white border-b border-white/10 overflow-hidden">
      {manufacturer.coverImageUrl && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={manufacturer.coverImageUrl}
            alt={`${manufacturer.name} facility`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#070D0E]/70" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/manufacture"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Manufacturing Partners
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-7">
          <div className="shrink-0">
            {manufacturer.logoUrl ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-1.5 border border-white/15 overflow-hidden">
                <Image
                  src={manufacturer.logoUrl}
                  alt={manufacturer.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#56C7D9] text-[#070D0E] font-bold text-xl flex items-center justify-center">
                {initials}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {manufacturer.isBiodropsProduction && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#15b5a3]/20 border border-[#15b5a3]/35 text-[11px] font-semibold text-[#56C7D9]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified BIODROPS Partner
                </span>
              )}
              {manufacturer.code && (
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-white/85">
                  {manufacturer.code}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mb-2 leading-tight">
              {manufacturer.name}
            </h1>

            {manufacturer.shortDescription && (
              <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed mb-3">
                {manufacturer.shortDescription}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/75">
              {locationText && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#56C7D9]" />
                  {locationText}
                </span>
              )}
              {manufacturer.licenseNumber && (
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <FileText className="w-3.5 h-3.5 text-[#cfef00]" />
                  License: {manufacturer.licenseNumber}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
