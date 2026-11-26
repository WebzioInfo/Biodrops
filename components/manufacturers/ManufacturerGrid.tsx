"use client";

import { useState, useMemo } from "react";
import { Search, Factory, AlertCircle, RefreshCw } from "lucide-react";
import { AquoraManufacturerDto } from "@/services/aquoraPublicApi";
import ManufacturerCard from "./ManufacturerCard";

interface ManufacturerGridProps {
  manufacturers: AquoraManufacturerDto[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function ManufacturerGrid({
  manufacturers,
  loading,
  error,
  onRetry,
}: ManufacturerGridProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return manufacturers;
    return manufacturers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.code && m.code.toLowerCase().includes(q)) ||
        (m.address && m.address.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q))
    );
  }, [manufacturers, search]);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F6F8]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header + Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6B7C80] font-semibold mb-1.5">
              Verified Directory
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#070D0E] tracking-tight">
              Certified Production Partners
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#6B7C80] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search partner or city..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-sm text-[#070D0E] placeholder:text-[#6B7C80]/60 focus:border-[#56C7D9] shadow-xs transition-colors"
            />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="h-36 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-3.5 bg-gray-100 rounded w-full" />
                  <div className="h-3.5 bg-gray-100 rounded w-5/6" />
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-28" />
                    <div className="h-3 bg-gray-200 rounded w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-3xl p-10 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#070D0E] mb-2">
              Unable to Load Manufacturing Partners
            </h3>
            <p className="text-sm text-[#6B7C80] mb-6">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#070D0E] hover:bg-[#1a2426] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#F4F6F8] text-[#6B7C80] flex items-center justify-center mx-auto mb-4">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#070D0E] mb-2">
              No Manufacturing Partners Found
            </h3>
            <p className="text-sm text-[#6B7C80]">
              {search.trim()
                ? `No partners matched "${search.trim()}". Try clearing your search.`
                : "No certified manufacturing partners are currently listed."}
            </p>
          </div>
        )}

        {/* Partners Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((mfg, idx) => (
              <ManufacturerCard key={mfg.id} manufacturer={mfg} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

