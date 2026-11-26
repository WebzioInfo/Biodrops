"use client";

import { Building2 } from "lucide-react";
import { EnrichedManufacturer } from "@/lib/manufacturerSlug";
import { formatReadableDate, parseISODate } from "@/lib/date";

interface ManufacturerInformationProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerInformation({
  manufacturer,
}: ManufacturerInformationProps) {
  const rows: Array<{ label: string; value: string; mono?: boolean }> = [
    { label: "Business Name", value: manufacturer.name },
    ...(manufacturer.code
      ? [{ label: "Manufacturer Code", value: manufacturer.code, mono: true }]
      : []),
    ...(manufacturer.address
      ? [{ label: "Registered Address", value: manufacturer.address }]
      : []),
    ...(manufacturer.location
      ? [{ label: "City / Location", value: manufacturer.location }]
      : []),
    ...(manufacturer.licenseNumber
      ? [{ label: "License Number", value: manufacturer.licenseNumber, mono: true }]
      : []),
    ...(manufacturer.gstNumber
      ? [{ label: "GST Registration", value: manufacturer.gstNumber, mono: true }]
      : []),
    ...(manufacturer.email
      ? [{ label: "Official Email", value: manufacturer.email }]
      : []),
    ...(manufacturer.phone
      ? [{ label: "Contact Phone", value: manufacturer.phone }]
      : []),
    ...(manufacturer.createdAt
      ? [
        {
          label: "Partner Since",
          value: formatReadableDate(parseISODate(manufacturer.createdAt)),
        },
      ]
      : []),
  ];

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7">
      <div className="flex items-center gap-2.5 mb-4">
        <Building2 className="w-4 h-4 text-[#15b5a3]" />
        <h2 className="text-lg font-semibold text-[#070D0E] tracking-tight">
          Company Information
        </h2>
      </div>

      <div className="divide-y divide-[#E5E7EB]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
          >
            <span className="text-xs font-medium text-[#6B7C80]">{row.label}</span>
            <span
              className={`text-sm font-medium text-[#070D0E] sm:text-right break-words ${row.mono ? "font-mono" : ""
                }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

