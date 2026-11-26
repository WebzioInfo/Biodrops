"use client";

import { EnrichedManufacturer } from "@/lib/manufacturerSlug";

interface ManufacturerAboutProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerAbout({ manufacturer }: ManufacturerAboutProps) {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7">
      <h2 className="text-lg font-semibold text-[#070D0E] tracking-tight mb-3">
        About {manufacturer.name}
      </h2>

      <div className="space-y-3 text-sm text-[#070D0E]/80 leading-relaxed">
        {manufacturer.about ? (
          <p className="whitespace-pre-line">{manufacturer.about}</p>
        ) : (
          <p>
            {manufacturer.name} is an authorized production partner in the BIODROPS manufacturing network, registered on the Aquora quality and production platform and traceable through BIODROPS&apos; public batch verification system.
          </p>
        )}
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#E5E7EB] text-xs">
        <div>
          <dt className="text-[#6B7C80] font-medium mb-0.5">Production Authorization</dt>
          <dd className="text-[#070D0E] font-semibold">
            {manufacturer.isBiodropsProduction
              ? "Verified BIODROPS Production Partner"
              : "Standard Partner"}
          </dd>
        </div>
        <div>
          <dt className="text-[#6B7C80] font-medium mb-0.5">Quality Governance</dt>
          <dd className="text-[#070D0E] font-semibold">
            {manufacturer.licenseNumber
              ? `Licensed (${manufacturer.licenseNumber})`
              : "BQMS & IS:14543 Monitored"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
