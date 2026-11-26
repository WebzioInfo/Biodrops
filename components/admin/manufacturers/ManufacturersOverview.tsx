"use client";

import { Factory, ShieldCheck, FileCheck2, PhoneCall } from "lucide-react";
import { AquoraManufacturerDto } from "@/services/aquoraPublicApi";

interface ManufacturersOverviewProps {
  totalCount: number;
  items: AquoraManufacturerDto[];
  loading: boolean;
}

export default function ManufacturersOverview({
  totalCount,
  items,
  loading,
}: ManufacturersOverviewProps) {
  const biodropsPartnersCount = items.filter((m) => m.isBiodropsProduction).length;
  const licensedCount = items.filter(
    (m) => Boolean(m.licenseNumber && m.licenseNumber.trim() !== "")
  ).length;
  const contactableCount = items.filter(
    (m) => Boolean((m.email && m.email.trim() !== "") || (m.phone && m.phone.trim() !== ""))
  ).length;

  const cards = [
    {
      label: "Total Manufacturers",
      value: totalCount,
      hint: "Active in Aquora registry",
      icon: Factory,
      accent: "bg-[#56C7D9]/15 text-[#008299]",
    },
    {
      label: "Biodrops Partners (Page)",
      value: biodropsPartnersCount,
      hint: `Of ${items.length} loaded records`,
      icon: ShieldCheck,
      accent: "bg-[#15b5a3]/15 text-[#15b5a3]",
    },
    {
      label: "Licensed Facilities (Page)",
      value: licensedCount,
      hint: "With recorded license number",
      icon: FileCheck2,
      accent: "bg-[#cfef00]/30 text-[#070D0E]",
    },
    {
      label: "Contactable (Page)",
      value: contactableCount,
      hint: "Email or phone available",
      icon: PhoneCall,
      accent: "bg-slate-100 text-[#070D0E]",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-3.5 bg-gray-200 rounded w-28" />
              <div className="w-9 h-9 rounded-xl bg-gray-200" />
            </div>
            <div className="h-7 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7C80]">
                {card.label}
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.accent}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#070D0E] tracking-tight mb-1">
              {card.value}
            </div>
            <div className="text-xs text-[#6B7C80]">{card.hint}</div>
          </div>
        );
      })}
    </div>
  );
}

