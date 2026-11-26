import { AquoraManufacturerDto } from "@/services/aquoraPublicApi";

/**
 * Extended optional fields that AQUORA does not currently return on PublicManufacturerDto,
 * prepared for future CMS / backend enrichment without breaking current contracts.
 */
export interface ManufacturerProfileMedia {
  coverImageUrl?: string | null;
  shortDescription?: string | null;
  about?: string | null;
  factoryIntroduction?: string | null;
  productionFacilityDescription?: string | null;
  manufacturingInfrastructure?: string | null;
  qualityControlFacilities?: string | null;
  galleryImages?: Array<{
    url: string;
    caption?: string;
    category?: string;
  }>;
}

export type EnrichedManufacturer = AquoraManufacturerDto & ManufacturerProfileMedia;

/**
 * Converts a manufacturer name into a URL-safe slug (e.g., "Faiha Water Solutions" -> "faiha-water-solutions").
 */
export function toManufacturerSlug(name: string): string {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Resolves a manufacturer from a list by URL slug, code, or ID.
 */
export function findManufacturerBySlug(
  manufacturers: AquoraManufacturerDto[],
  slug: string
): AquoraManufacturerDto | undefined {
  const normalized = (slug || "").toLowerCase().trim();
  if (!normalized) return undefined;

  return manufacturers.find(
    (mfg) =>
      toManufacturerSlug(mfg.name) === normalized ||
      (mfg.code && mfg.code.toLowerCase() === normalized) ||
      mfg.id.toLowerCase() === normalized
  );
}

/**
 * Returns crisp 2-4 character initials from badgeLetters or company name.
 */
export function getManufacturerInitials(name: string, badgeLetters?: string | null): string {
  if (badgeLetters && badgeLetters.trim()) {
    return badgeLetters.trim().toUpperCase().slice(0, 4);
  }
  if (!name) return "BD";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BD"
  );
}

