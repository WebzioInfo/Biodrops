"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export type LicenseFilterValue = "all" | "licensed" | "unlicensed";
export type ProductionFilterValue = "all" | "biodrops" | "standard";
export type SortFieldValue = "name" | "code" | "createdAt";
export type SortOrderValue = "asc" | "desc";

interface ManufacturerFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  licenseFilter: LicenseFilterValue;
  onLicenseFilterChange: (value: LicenseFilterValue) => void;
  productionFilter: ProductionFilterValue;
  onProductionFilterChange: (value: ProductionFilterValue) => void;
  sortBy: SortFieldValue;
  onSortByChange: (value: SortFieldValue) => void;
  sortOrder: SortOrderValue;
  onSortOrderChange: (value: SortOrderValue) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  onReset: () => void;
}

export default function ManufacturerFilters({
  search,
  onSearchChange,
  licenseFilter,
  onLicenseFilterChange,
  productionFilter,
  onProductionFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  pageSize,
  onPageSizeChange,
  onReset,
}: ManufacturerFiltersProps) {
  const hasFilters =
    search.trim() !== "" ||
    licenseFilter !== "all" ||
    productionFilter !== "all" ||
    sortBy !== "name" ||
    sortOrder !== "asc";

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B7C80] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, code, or subdomain..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F8] border border-[#E5E7EB] rounded-xl text-sm text-[#070D0E] placeholder:text-[#6B7C80]/70 focus:border-[#56C7D9] focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7C80] mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters:</span>
          </div>

          <select
            aria-label="Filter by license status"
            value={licenseFilter}
            onChange={(e) => onLicenseFilterChange(e.target.value as LicenseFilterValue)}
            className="px-3 py-2 bg-[#F4F6F8] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#070D0E] focus:border-[#56C7D9] cursor-pointer"
          >
            <option value="all">All Licenses</option>
            <option value="licensed">Licensed Only</option>
            <option value="unlicensed">Pending License</option>
          </select>

          <select
            aria-label="Filter by production partner status"
            value={productionFilter}
            onChange={(e) => onProductionFilterChange(e.target.value as ProductionFilterValue)}
            className="px-3 py-2 bg-[#F4F6F8] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#070D0E] focus:border-[#56C7D9] cursor-pointer"
          >
            <option value="all">All Production Types</option>
            <option value="biodrops">Biodrops Partners</option>
            <option value="standard">Standard Tenants</option>
          </select>

          <select
            aria-label="Sort field"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortFieldValue)}
            className="px-3 py-2 bg-[#F4F6F8] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#070D0E] focus:border-[#56C7D9] cursor-pointer"
          >
            <option value="name">Sort: Name</option>
            <option value="code">Sort: Code</option>
            <option value="createdAt">Sort: Created Date</option>
          </select>

          <button
            type="button"
            onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 bg-[#F4F6F8] border border-[#E5E7EB] hover:border-[#56C7D9] rounded-xl text-xs font-semibold text-[#070D0E] transition-colors cursor-pointer"
            title="Toggle sort direction"
          >
            {sortOrder === "asc" ? "A → Z" : "Z → A"}
          </button>

          <select
            aria-label="Items per page"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-2 bg-[#F4F6F8] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#070D0E] focus:border-[#56C7D9] cursor-pointer"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>

          {hasFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#6B7C80] hover:text-[#070D0E] hover:bg-[#F4F6F8] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

