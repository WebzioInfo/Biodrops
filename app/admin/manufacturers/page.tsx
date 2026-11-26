"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { RefreshCw, Lock, ShieldAlert, Plus } from "lucide-react";
import {
  fetchAquoraManufacturersPaged,
  AquoraManufacturerDto,
} from "@/services/aquoraPublicApi";
import ManufacturersOverview from "@/components/admin/manufacturers/ManufacturersOverview";
import ManufacturerFilters, {
  LicenseFilterValue,
  ProductionFilterValue,
  SortFieldValue,
  SortOrderValue,
} from "@/components/admin/manufacturers/ManufacturerFilters";
import ManufacturersTable from "@/components/admin/manufacturers/ManufacturersTable";
import ManufacturerDetails from "@/components/admin/manufacturers/ManufacturerDetails";

export default function AdminManufacturersPage() {
  const [items, setItems] = useState<AquoraManufacturerDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [licenseFilter, setLicenseFilter] = useState<LicenseFilterValue>("all");
  const [productionFilter, setProductionFilter] = useState<ProductionFilterValue>("all");
  const [sortBy, setSortBy] = useState<SortFieldValue>("name");
  const [sortOrder, setSortOrder] = useState<SortOrderValue>("asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<AquoraManufacturerDto | null>(null);

  const [refreshTick, setRefreshTick] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  // Debounce search input to avoid flooding /api/public/manufacturers
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    let active = true;
    fetchAquoraManufacturersPaged(
      {
        search: debouncedSearch.trim() || undefined,
        page,
        pageSize,
      },
      controller.signal
    )
      .then((result) => {
        if (!active) return;
        setItems(result.items);
        setTotalCount(result.totalCount);
        setTotalPages(result.totalPages);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch certified manufacturers from Aquora."
        );
      })
      .finally(() => {
        if (active && abortRef.current === controller) {
          setLoading(false);
          abortRef.current = null;
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [debouncedSearch, page, pageSize, refreshTick]);

  const loadManufacturers = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshTick((t) => t + 1);
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((mfg) => {
      if (licenseFilter === "licensed" && !mfg.licenseNumber?.trim()) return false;
      if (licenseFilter === "unlicensed" && mfg.licenseNumber?.trim()) return false;
      if (productionFilter === "biodrops" && !mfg.isBiodropsProduction) return false;
      if (productionFilter === "standard" && mfg.isBiodropsProduction) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "code") {
        comparison = (a.code || "").localeCompare(b.code || "");
      } else if (sortBy === "createdAt") {
        comparison =
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime();
      } else {
        comparison = (a.name || "").localeCompare(b.name || "");
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [items, licenseFilter, productionFilter, sortBy, sortOrder]);

  const handleSort = (field: SortFieldValue) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setLicenseFilter("all");
    setProductionFilter("all");
    setSortBy("name");
    setSortOrder("asc");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Security Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#070D0E] tracking-tight">
            Certified Production Partners
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7C80] mt-0.5">
            Live manufacturer directory synchronized from Aquora Platform Registry (<span className="font-mono">/api/public/manufacturers</span>).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadManufacturers}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] hover:border-[#56C7D9] rounded-xl text-xs font-semibold text-[#070D0E] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <button
            type="button"
            disabled
            title="Create Manufacturer requires NextAuth Admin Session + Aquora SuperAdmin JWT"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#070D0E]/10 text-[#070D0E]/45 rounded-xl text-xs font-bold uppercase tracking-[0.12em] cursor-not-allowed"
          >
            <Lock className="w-3.5 h-3.5" />
            <Plus className="w-3.5 h-3.5" />
            Add Manufacturer
          </button>
        </div>
      </div>

      {/* Read-Only Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Safe Read-Only Mode Active:</span>{" "}
          Create, Edit, and Deactivate actions are intentionally disabled because BIODROPS does not yet have NextAuth session protection or Aquora SuperAdmin JWT credentials (<span className="font-mono">/api/v1/platform/tenants</span>) configured on the server.
        </div>
      </div>

      {/* KPI Overview */}
      <ManufacturersOverview
        totalCount={totalCount}
        items={items}
        loading={loading}
      />

      {/* Search, Filter & Sort Bar */}
      <ManufacturerFilters
        search={search}
        onSearchChange={setSearch}
        licenseFilter={licenseFilter}
        onLicenseFilterChange={setLicenseFilter}
        productionFilter={productionFilter}
        onProductionFilterChange={setProductionFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        onReset={handleReset}
      />

      {/* Manufacturers Table & Pagination */}
      <ManufacturersTable
        items={filteredAndSortedItems}
        loading={loading}
        error={error}
        onRetry={loadManufacturers}
        onSelect={setSelectedManufacturer}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={setPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {/* Detail Slide-Over Drawer */}
      <ManufacturerDetails
        manufacturer={selectedManufacturer}
        onClose={() => setSelectedManufacturer(null)}
      />
    </div>
  );
}
