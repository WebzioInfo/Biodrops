"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { EnrichedManufacturer } from "@/lib/manufacturerSlug";

interface ManufacturerLocationProps {
  manufacturer: EnrichedManufacturer;
}

export default function ManufacturerLocation({
  manufacturer,
}: ManufacturerLocationProps) {
  const queryText = [manufacturer.name, manufacturer.address, manufacturer.location]
    .filter((v): v is string => Boolean(v && v.trim() !== ""))
    .join(", ");

  const hasAddress = Boolean(manufacturer.address || manufacturer.location);
  const mapsUrl = queryText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`
    : null;

  return (
    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7">
      <div className="flex items-center gap-2.5 mb-4">
        <MapPin className="w-4 h-4 text-[#15b5a3]" />
        <h2 className="text-lg font-semibold text-[#070D0E] tracking-tight">
          Facility Location
        </h2>
      </div>

      {hasAddress ? (
        <div className="space-y-5">
          <div className="bg-[#F4F6F8] border border-[#E5E7EB] rounded-2xl p-5 space-y-2">
            {manufacturer.address && (
              <p className="text-sm text-[#070D0E] leading-relaxed">
                {manufacturer.address}
              </p>
            )}
            {manufacturer.location && (
              <p className="text-xs font-medium text-[#6B7C80]">
                Region: {manufacturer.location}
              </p>
            )}
          </div>

          {mapsUrl && (
            <div className="flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#070D0E] hover:bg-[#1a2426] text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#cfef00]" />
                Get Directions
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#F4F6F8] border border-[#E5E7EB] rounded-2xl p-5 text-xs text-[#6B7C80]">
          Address details for this manufacturing partner are not currently listed in the public registry.
        </div>
      )}
    </section>
  );
}

