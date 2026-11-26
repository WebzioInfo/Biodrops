"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Factory, RefreshCw } from "lucide-react";
import {
  fetchAquoraManufacturers,
  fetchAquoraManufacturerProfile,
} from "@/services/aquoraPublicApi";
import { EnrichedManufacturer, findManufacturerBySlug } from "@/lib/manufacturerSlug";
import ManufacturerProfileHero from "./ManufacturerProfileHero";
import ManufacturerAbout from "./ManufacturerAbout";
import ManufacturerInformation from "./ManufacturerInformation";
import ManufacturerFacility from "./ManufacturerFacility";
import ManufacturerGallery from "./ManufacturerGallery";
import ManufacturerLocation from "./ManufacturerLocation";
import ManufacturerContact from "./ManufacturerContact";

interface ManufacturerProfileClientProps {
  slug: string;
}

export default function ManufacturerProfileClient({ slug }: ManufacturerProfileClientProps) {
  const [manufacturer, setManufacturer] = useState<EnrichedManufacturer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    let active = true;

    fetchAquoraManufacturers({ pageSize: 100 }, controller.signal)
      .then(async (items) => {
        if (!active) return;
        const matched = findManufacturerBySlug(items || [], slug);
        if (!matched) {
          setManufacturer(null);
          setError(null);
          return;
        }

        let enriched: EnrichedManufacturer = matched;
        try {
          const profile = await fetchAquoraManufacturerProfile(matched.id, controller.signal);
          if (profile && active) {
            const locParts = [
              profile.location?.city,
              profile.location?.district,
              profile.location?.state,
            ].filter(Boolean);
            enriched = {
              ...matched,
              name: profile.displayName || profile.name || matched.name,
              logoUrl: profile.logoUrl ?? matched.logoUrl,
              coverImageUrl: profile.coverImageUrl ?? matched.coverImageUrl,
              shortDescription: profile.shortDescription ?? matched.shortDescription,
              about: profile.about,
              factoryIntroduction: profile.factoryIntroduction,
              productionFacilityDescription: profile.productionFacilityDescription,
              manufacturingInfrastructure: profile.manufacturingInfrastructure,
              qualityControlFacilities: profile.qualityControlFacilities,
              address: profile.address ?? matched.address,
              location: locParts.length > 0 ? locParts.join(", ") : matched.location,
              email: profile.email ?? matched.email,
              phone: profile.phone ?? matched.phone,
              customDomain: profile.websiteUrl ?? matched.customDomain,
              galleryImages: (profile.gallery || []).map((g) => ({
                url: g.url,
                caption: g.caption ?? undefined,
                category: g.category,
              })),
            };
          }
        } catch {
          // Graceful fallback to directory DTO if /profile is not available
        }

        if (active) {
          setManufacturer(enriched);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load manufacturer profile right now."
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
  }, [slug, refreshTick]);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshTick((t) => t + 1);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8]">
        <div className="bg-[#070D0E] pt-36 pb-20 px-6">
          <div className="max-w-6xl mx-auto animate-pulse space-y-5">
            <div className="h-4 bg-white/10 rounded w-44" />
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-white/10 shrink-0" />
              <div className="space-y-3 flex-1">
                <div className="h-5 bg-white/10 rounded w-36" />
                <div className="h-10 bg-white/15 rounded w-72" />
                <div className="h-4 bg-white/10 rounded w-96 max-w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
          <div className="lg:col-span-7 h-64 bg-white rounded-3xl border border-[#E5E7EB]" />
          <div className="lg:col-span-5 h-64 bg-white rounded-3xl border border-[#E5E7EB]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[75vh] bg-[#F4F6F8] flex items-center justify-center px-6 pt-28 pb-16">
        <div className="bg-white border border-red-200 rounded-3xl p-10 text-center max-w-lg w-full shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-[#070D0E] mb-2">
            Unable to Load Partner Profile
          </h1>
          <p className="text-sm text-[#6B7C80] mb-6">{error}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#070D0E] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-full cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
            <Link
              href="/manufacture"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#E5E7EB] text-[#070D0E] text-xs font-bold uppercase tracking-[0.16em] rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!manufacturer) {
    return (
      <div className="min-h-[75vh] bg-[#F4F6F8] flex items-center justify-center px-6 pt-28 pb-16">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-10 text-center max-w-lg w-full shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#F4F6F8] text-[#6B7C80] flex items-center justify-center mx-auto mb-4">
            <Factory className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-[#070D0E] mb-2">
            Manufacturing Partner Not Found
          </h1>
          <p className="text-sm text-[#6B7C80] mb-6">
            We could not find a certified BIODROPS manufacturing partner matching &ldquo;{slug}&rdquo;.
          </p>
          <Link
            href="/manufacture"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#070D0E] hover:bg-[#1a2426] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-full transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Browse All Partners
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F8]">
      <ManufacturerProfileHero manufacturer={manufacturer} />

      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Grid: About + Company Information */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              <ManufacturerAbout manufacturer={manufacturer} />
            </div>
            <div className="lg:col-span-5">
              <ManufacturerInformation manufacturer={manufacturer} />
            </div>
          </div>

          {/* Manufacturing Facility */}
          <ManufacturerFacility manufacturer={manufacturer} />

          {/* Photo Gallery */}
          <ManufacturerGallery manufacturer={manufacturer} />

          {/* Location + Direct Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-6">
              <ManufacturerLocation manufacturer={manufacturer} />
            </div>
            <div className="lg:col-span-6 flex">
              <div className="w-full flex">
                <ManufacturerContact manufacturer={manufacturer} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

