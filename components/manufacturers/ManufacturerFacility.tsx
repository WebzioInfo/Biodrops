"use client";

import { ShieldCheck } from "lucide-react";
import { EnrichedManufacturer } from "@/lib/manufacturerSlug";

interface ManufacturerFacilityProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerFacility({
  manufacturer,
}: ManufacturerFacilityProps) {
  const sections = [
    { label: "Factory Introduction", value: manufacturer.factoryIntroduction },
    { label: "Production Facility", value: manufacturer.productionFacilityDescription },
    { label: "Manufacturing Infrastructure", value: manufacturer.manufacturingInfrastructure },
    { label: "Quality Control Laboratory", value: manufacturer.qualityControlFacilities },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value && s.value.trim() !== ""));

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-lg font-semibold text-[#070D0E] tracking-tight">
          Manufacturing Facility
        </h2>

        {manufacturer.isBiodropsProduction && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#15b5a3]/10 text-[#15b5a3] text-xs font-semibold self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            Authorized Plant
          </span>
        )}
      </div>

      {sections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((item) => (
            <div key={item.label} className="border border-[#E5E7EB] rounded-xl p-4 bg-[#F4F6F8]/60">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B7C80] mb-1.5">
                {item.label}
              </h3>
              <p className="text-sm text-[#070D0E]/85 leading-relaxed whitespace-pre-line">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#6B7C80] leading-relaxed">
          This facility operates under BIODROPS production and quality verification standards. Detailed infrastructure notes have not yet been published by the partner.
        </p>
      )}
    </section>
  );
}
