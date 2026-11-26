"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ShieldCheck, ArrowRight, FileText } from "lucide-react";
import { EnrichedManufacturer, getManufacturerInitials, toManufacturerSlug } from "@/lib/manufacturerSlug";

interface ManufacturerCardProps {
  manufacturer: EnrichedManufacturer;
  index: number;
}

export default function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  const slug = toManufacturerSlug(manufacturer.name);
  const locationText = manufacturer.location || manufacturer.address;
  const initials = getManufacturerInitials(manufacturer.name, manufacturer.badgeLetters);

  return (
    <Link
      href={`/manufacture/${slug}`}
      className="group h-full bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#56C7D9] hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Top Media / Identity Header */}
      <div className="relative h-32 bg-[#070D0E] overflow-hidden p-5 flex flex-col justify-between">
        {manufacturer.coverImageUrl && (
          <>
            <Image
              src={manufacturer.coverImageUrl}
              alt={manufacturer.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#070D0E]/55" />
          </>
        )}

        <div className="relative z-10 flex items-center justify-between gap-2">
          {manufacturer.code ? (
            <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] font-mono font-medium uppercase tracking-wider text-white/85">
              {manufacturer.code}
            </span>
          ) : (
            <span />
          )}
          {manufacturer.isBiodropsProduction && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#15b5a3]/20 border border-[#15b5a3]/35 text-[10px] font-semibold text-[#56C7D9]">
              <ShieldCheck className="w-3 h-3" />
              Verified Partner
            </span>
          )}
        </div>

        <div className="relative z-10">
          {manufacturer.logoUrl ? (
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-white/20 overflow-hidden">
              <Image
                src={manufacturer.logoUrl}
                alt={manufacturer.name}
                width={44}
                height={44}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-xl bg-[#56C7D9] text-[#070D0E] font-bold text-xs flex items-center justify-center">
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-[#070D0E] group-hover:text-[#15b5a3] transition-colors leading-snug mb-2">
          {manufacturer.name}
        </h3>

        {manufacturer.shortDescription && (
          <p className="text-xs sm:text-sm text-[#6B7C80] leading-relaxed line-clamp-2 mb-4">
            {manufacturer.shortDescription}
          </p>
        )}

        <div className="space-y-2 text-xs text-[#6B7C80] mt-auto pt-3 border-t border-[#E5E7EB]">
          {locationText && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#56C7D9] shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed">{locationText}</span>
            </div>
          )}

          {manufacturer.licenseNumber && (
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#15b5a3] shrink-0" />
              <span className="font-mono text-[#070D0E]/80 truncate">
                {manufacturer.licenseNumber}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#070D0E] group-hover:text-[#15b5a3] transition-colors">
          <span>View Company Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
