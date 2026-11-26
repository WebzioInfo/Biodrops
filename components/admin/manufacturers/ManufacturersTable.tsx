"use client";

import Image from "next/image";
import {
  Eye,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Factory,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { AquoraManufacturerDto } from "@/services/aquoraPublicApi";
import { formatReadableDate, parseISODate } from "@/lib/date";
import ManufacturerStatusBadge from "./ManufacturerStatusBadge";
import { SortFieldValue, SortOrderValue } from "./ManufacturerFilters";

interface ManufacturersTableProps {
  items: AquoraManufacturerDto[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelect: (manufacturer: AquoraManufacturerDto) => void;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  sortBy: SortFieldValue;
  sortOrder: SortOrderValue;
  onSort: (field: SortFieldValue) => void;
}

function getInitials(name: string, badgeLetters?: string | null): string {
  if (badgeLetters && badgeLetters.trim()) {
    return badgeLetters.trim().toUpperCase().slice(0, 4);
  }
  if (!name) return "MF";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "MF"
  );
}

function formatCreatedDate(value: string): string {
  const parsed = parseISODate(value);
  return formatReadableDate(parsed);
}

export default function ManufacturersTable({
  items,
  loading,
  error,
  onRetry,
  onSelect,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  sortBy,
  onSort,
  sortOrder,
}: ManufacturersTableProps) {
  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-[#070D0E] mb-1">
          Unable to Load Manufacturers
        </h3>
        <p className="text-sm text-[#6B7C80] max-w-md mx-auto mb-5">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#070D0E] hover:bg-[#1a2426] text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="p-5 flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48" />
                <div className="h-3 bg-gray-100 rounded w-32" />
              </div>
              <div className="hidden md:block h-4 bg-gray-100 rounded w-36" />
              <div className="hidden lg:block h-6 bg-gray-100 rounded-full w-28" />
              <div className="h-8 bg-gray-200 rounded-xl w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#F4F6F8] text-[#6B7C80] flex items-center justify-center mx-auto mb-4">
          <Factory className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-[#070D0E] mb-1">
          No Manufacturers Found
        </h3>
        <p className="text-sm text-[#6B7C80] max-w-md mx-auto">
          No certified manufacturers match your current search or filter criteria.
        </p>
      </div>
    );
  }

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F4F6F8] border-b border-[#E5E7EB] text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7C80]">
              <th className="py-3.5 px-5">
                <button
                  type="button"
                  onClick={() => onSort("name")}
                  className="inline-flex items-center gap-1.5 hover:text-[#070D0E] cursor-pointer"
                >
                  Manufacturer
                  <ArrowUpDown
                    className={`w-3.5 h-3.5 ${
                      sortBy === "name" ? "text-[#15b5a3]" : "opacity-40"
                    }`}
                  />
                </button>
              </th>
              <th className="py-3.5 px-4">
                <button
                  type="button"
                  onClick={() => onSort("code")}
                  className="inline-flex items-center gap-1.5 hover:text-[#070D0E] cursor-pointer"
                >
                  Code
                  <ArrowUpDown
                    className={`w-3.5 h-3.5 ${
                      sortBy === "code" ? "text-[#15b5a3]" : "opacity-40"
                    }`}
                  />
                </button>
              </th>
              <th className="py-3.5 px-4">Contact</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">License</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">
                <button
                  type="button"
                  onClick={() => onSort("createdAt")}
                  className="inline-flex items-center gap-1.5 hover:text-[#070D0E] cursor-pointer"
                >
                  Created
                  <ArrowUpDown
                    className={`w-3.5 h-3.5 ${
                      sortBy === "createdAt" ? "text-[#15b5a3]" : "opacity-40"
                    }`}
                  />
                </button>
              </th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-sm">
            {items.map((mfg) => (
              <tr
                key={mfg.id}
                onClick={() => onSelect(mfg)}
                className="hover:bg-[#F4F6F8]/70 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    {mfg.logoUrl ? (
                      <Image
                        src={mfg.logoUrl}
                        alt={mfg.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB] shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#15b5a3]/10 text-[#15b5a3] font-bold text-xs flex items-center justify-center shrink-0">
                        {getInitials(mfg.name, mfg.badgeLetters)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold text-[#070D0E] group-hover:text-[#15b5a3] transition-colors truncate max-w-[220px]">
                        {mfg.name}
                      </div>
                      {mfg.subdomain && (
                        <div className="text-xs text-[#6B7C80] font-mono truncate max-w-[220px]">
                          {mfg.customDomain || `${mfg.subdomain}.aquora`}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F4F6F8] border border-[#E5E7EB] font-mono text-xs font-semibold text-[#070D0E]">
                    {mfg.code || "—"}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <div className="space-y-1 text-xs text-[#6B7C80]">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#56C7D9] shrink-0" />
                      <span className="truncate max-w-[180px]">{mfg.email || "—"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#56C7D9] shrink-0" />
                      <span>{mfg.phone || "—"}</span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-start gap-1.5 text-xs text-[#6B7C80] max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-[#6B7C80] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      {mfg.location || mfg.address || "—"}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4 text-xs font-medium text-[#070D0E]">
                  {mfg.licenseNumber ? (
                    <span className="font-mono">{mfg.licenseNumber}</span>
                  ) : (
                    <ManufacturerStatusBadge variant="license" active={false} />
                  )}
                </td>

                <td className="py-4 px-4">
                  <div className="flex flex-col items-start gap-1.5">
                    <ManufacturerStatusBadge
                      variant="production"
                      active={mfg.isBiodropsProduction}
                    />
                    <ManufacturerStatusBadge variant="verified" active={true} />
                  </div>
                </td>

                <td className="py-4 px-4 text-xs text-[#6B7C80] whitespace-nowrap">
                  {formatCreatedDate(mfg.createdAt)}
                </td>

                <td className="py-4 px-5 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(mfg);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F4F6F8] hover:bg-[#070D0E] text-[#070D0E] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden divide-y divide-[#E5E7EB]">
        {items.map((mfg) => (
          <div
            key={mfg.id}
            onClick={() => onSelect(mfg)}
            className="p-4 space-y-3 hover:bg-[#F4F6F8]/60 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {mfg.logoUrl ? (
                  <Image
                    src={mfg.logoUrl}
                    alt={mfg.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB] shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#15b5a3]/10 text-[#15b5a3] font-bold text-xs flex items-center justify-center shrink-0">
                    {getInitials(mfg.name, mfg.badgeLetters)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-[#070D0E] truncate">
                    {mfg.name}
                  </div>
                  <div className="text-xs text-[#6B7C80] font-mono">
                    {mfg.code || "—"}
                  </div>
                </div>
              </div>
              <ManufacturerStatusBadge
                variant="production"
                active={mfg.isBiodropsProduction}
              />
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-xs text-[#6B7C80]">
              {(mfg.location || mfg.address) && (
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{mfg.location || mfg.address}</span>
                </div>
              )}
              {mfg.licenseNumber && (
                <div>
                  <span className="font-semibold text-[#070D0E]">License:</span>{" "}
                  <span className="font-mono">{mfg.licenseNumber}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#6B7C80]">
                Added {formatCreatedDate(mfg.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#15b5a3]">
                <Eye className="w-3.5 h-3.5" />
                View Details
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="px-5 py-4 bg-[#F4F6F8]/60 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#6B7C80]">
          Showing <span className="font-semibold text-[#070D0E]">{startItem}</span>–
          <span className="font-semibold text-[#070D0E]">{endItem}</span> of{" "}
          <span className="font-semibold text-[#070D0E]">{totalCount}</span> manufacturers
          {sortOrder === "desc" ? " (Descending)" : ""}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-xs font-semibold text-[#070D0E] hover:border-[#56C7D9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>
          <span className="px-3 py-1 text-xs font-semibold text-[#070D0E]">
            Page {page} of {Math.max(1, totalPages)}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white text-xs font-semibold text-[#070D0E] hover:border-[#56C7D9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

