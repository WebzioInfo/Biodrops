/**
 * Aquora Public API Client Layer for BioDrops
 * 
 * Centralized service for interacting with the Aquora Public API.
 * Authoritative source of truth for BioDrops Certified Manufacturers and Batch Verification.
 */

export interface AquoraManufacturerDto {
  id: string;
  name: string;
  code?: string;
  subdomain?: string;
  customDomain?: string | null;
  logoUrl?: string | null;
  badgeLetters?: string | null;
  address?: string | null;
  location?: string | null;
  licenseNumber?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  email?: string | null;
  phone?: string | null;
  isBiodropsProduction: boolean;
  shortDescription?: string | null;
  coverImageUrl?: string | null;
  city?: string | null;
  state?: string | null;
  createdAt: string;
}

export interface AquoraPublicGalleryImageDto {
  id: string;
  url: string;
  category: string;
  caption?: string | null;
  width: number;
  height: number;
  displayOrder: number;
}

export interface AquoraManufacturerProfileDto {
  id: string;
  name: string;
  displayName?: string | null;
  code: string;
  logoUrl?: string | null;
  badgeLetters?: string | null;
  coverImageUrl?: string | null;
  shortDescription?: string | null;
  about?: string | null;
  establishedYear?: number | null;
  email?: string | null;
  phone?: string | null;
  websiteUrl?: string | null;
  contactPerson?: string | null;
  address?: string | null;
  location?: {
    fullAddress?: string | null;
    city?: string | null;
    district?: string | null;
    state?: string | null;
    pinCode?: string | null;
    googleMapsUrl?: string | null;
    latitude?: number | null;
    longitude?: number | null;
  };
  licenseNumber?: string | null;
  gstNumber?: string | null;
  isBiodropsProduction: boolean;
  factoryIntroduction?: string | null;
  productionFacilityDescription?: string | null;
  manufacturingInfrastructure?: string | null;
  qualityControlFacilities?: string | null;
  gallery?: AquoraPublicGalleryImageDto[];
  createdAt: string;
}

export interface AquoraPagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AquoraApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  code?: string;
  errors?: string[];
}

export interface AquoraBatchManufacturer {
  id?: string;
  name: string | null;
  code?: string;
  subdomain?: string;
  customDomain?: string | null;
  logoUrl?: string | null;
  address: string | null;
  location: string | null;
  licenseNumber?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  email?: string | null;
  phone?: string | null;
  isBiodropsProduction?: boolean;
}

export interface AquoraBatchManufacturing {
  manufacturedDate: string | null;
}

export interface AquoraBatchExpiry {
  bestBefore: string | null;
  shelfLifeMonths: number | null;
}

export interface AquoraCustomLicense {
  name: string;
  number: string;
}

export interface AquoraBatchLicenses {
  fssai?: string | null;
  bis?: string | null;
  others?: AquoraCustomLicense[] | null;
}

export interface AquoraBatchWaterQuality {
  ph: string | number | null;
  tds: string | number | null;
  turbidity: string | number | null;
  microbiology: string | null;
  sterilization: string | null;
  [key: string]: any;
}

export interface AquoraBatchReport {
  available: boolean;
  publicDownloadAvailable?: boolean;
  downloadUrl?: string | null;
}

export interface AquoraBatchVerificationData {
  batchNumber: string;
  reportNumber?: string | null;
  sampleCode?: string | null;
  sampleNumber?: string | null;
  testedBy?: string | null;
  verifiedBy?: string | null;
  collectedBy?: string | null;
  reportType?: string | null;
  status?: string | null;
  completionStatus?: string | null;
  totalParametersCount?: number;
  completedParametersCount?: number;
  pendingParametersCount?: number;
  overdueParametersCount?: number;
  remarks?: string | null;
  manufacturer: AquoraBatchManufacturer;
  manufacturing: AquoraBatchManufacturing;
  expiry: AquoraBatchExpiry;
  licenses: AquoraBatchLicenses;
  waterQuality: AquoraBatchWaterQuality;
  report: AquoraBatchReport;
  parameters?: Array<{
    name: string;
    category?: string;
    result?: string | number | null;
    value?: number | null;
    unit?: string;
    standard?: string;
    status?: string;
    qualityStatus?: string;
    resultStatus?: string;
    requiredDurationHours?: number;
    startedAt?: string | null;
    expectedCompletionAt?: string | null;
    actualCompletedAt?: string | null;
    isOverdue?: boolean;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export interface AquoraBatchVerificationResponse {
  success: boolean;
  verified: boolean;
  code?: string | null;
  message?: string | null;
  data?: AquoraBatchVerificationData | null;
}

/**
 * Returns base URL for API requests.
 * In browser environment: returns empty string to use same-origin relative proxy routes (/api/public/...).
 * In server environment: uses configured environment variables with production fallback to https://aquora-backend.webziointernational.in.
 */
export const getAquoraBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return "";
  }
  const raw =
    process.env.AQUORA_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_AQUORA_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_AQUORA_API_URL ||
    process.env.AQUORA_API_URL ||
    "https://aquora-backend.webziointernational.in";

  return raw.trim().replace(/\/+$/, "");
};

/**
 * Fetches certified BioDrops manufacturers from Aquora Public API.
 * Strict Backend Rule: Aquora guarantees only tenants where IsBiodropsProduction === true are returned.
 */
export async function fetchAquoraManufacturers(
  options?: { search?: string; page?: number; pageSize?: number },
  signal?: AbortSignal
): Promise<AquoraManufacturerDto[]> {
  const baseUrl = getAquoraBaseUrl();
  const searchParams = new URLSearchParams();
  if (options?.search) searchParams.set("search", options.search);
  if (options?.page) searchParams.set("page", options.page.toString());
  if (options?.pageSize) searchParams.set("pageSize", options.pageSize.toString());

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const endpoint = `${baseUrl}/api/public/manufacturers${queryString}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Aquora Public API error: ${response.status} ${response.statusText}`);
  }

  const rawJson: AquoraApiResponse<AquoraPagedResult<AquoraManufacturerDto> | AquoraManufacturerDto[]> = await response.json();

  if (!rawJson.success || !rawJson.data) {
    return [];
  }

  // Handle both PagedResult ({ items: [...] }) and direct array responses
  if (Array.isArray(rawJson.data)) {
    return rawJson.data;
  }

  if (rawJson.data && Array.isArray((rawJson.data as AquoraPagedResult<AquoraManufacturerDto>).items)) {
    return (rawJson.data as AquoraPagedResult<AquoraManufacturerDto>).items;
  }

  return [];
}

/**
 * Fetches paginated certified BioDrops manufacturers from Aquora Public API.
 * Preserves pagination metadata (totalCount, page, pageSize, totalPages) for management views.
 */
export async function fetchAquoraManufacturersPaged(
  options?: { search?: string; page?: number; pageSize?: number },
  signal?: AbortSignal
): Promise<AquoraPagedResult<AquoraManufacturerDto>> {
  const baseUrl = getAquoraBaseUrl();
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 10;
  const searchParams = new URLSearchParams();
  if (options?.search) searchParams.set("search", options.search);
  searchParams.set("page", page.toString());
  searchParams.set("pageSize", pageSize.toString());

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const endpoint = `${baseUrl}/api/public/manufacturers${queryString}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Aquora Public API error: ${response.status} ${response.statusText}`);
  }

  const rawJson: AquoraApiResponse<AquoraPagedResult<AquoraManufacturerDto> | AquoraManufacturerDto[]> = await response.json();

  if (!rawJson.success || !rawJson.data) {
    return { items: [], totalCount: 0, page, pageSize, totalPages: 0 };
  }

  if (Array.isArray(rawJson.data)) {
    return {
      items: rawJson.data,
      totalCount: rawJson.data.length,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(rawJson.data.length / pageSize)),
    };
  }

  const paged = rawJson.data as AquoraPagedResult<AquoraManufacturerDto>;
  const items = Array.isArray(paged.items) ? paged.items : [];
  const totalCount = typeof paged.totalCount === "number" ? paged.totalCount : items.length;
  const resolvedPageSize = typeof paged.pageSize === "number" && paged.pageSize > 0 ? paged.pageSize : pageSize;
  const totalPages =
    typeof paged.totalPages === "number"
      ? paged.totalPages
      : Math.max(1, Math.ceil(totalCount / resolvedPageSize));

  return {
    items,
    totalCount,
    page: typeof paged.page === "number" ? paged.page : page,
    pageSize: resolvedPageSize,
    totalPages,
  };
}

/**
 * Fetches full public profile & gallery for a certified BioDrops manufacturer.
 * Returns null if the profile endpoint is not available (404) so callers can fall back gracefully.
 */
export async function fetchAquoraManufacturerProfile(
  id: string,
  signal?: AbortSignal
): Promise<AquoraManufacturerProfileDto | null> {
  if (!id) return null;
  const baseUrl = getAquoraBaseUrl();
  const endpoint = `${baseUrl}/api/public/manufacturers/${encodeURIComponent(id)}/profile`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    signal,
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Aquora Public API error: ${response.status} ${response.statusText}`);
  }

  const rawJson: AquoraApiResponse<AquoraManufacturerProfileDto> = await response.json();
  if (!rawJson.success || !rawJson.data) {
    return null;
  }

  return rawJson.data;
}

/**
 * Verifies a water production batch with Aquora Public API.
 * Normalizes input and fetches authoritative batch, manufacturer, QC parameters, and report status.
 * Supports lightweight summary by default, or full QC parameter results via options.full = true.
 */
export async function verifyAquoraBatch(
  batchNumber: string,
  optionsOrSignal?:
    | {
      full?: boolean;
      reportType?: string;
      tenantId?: string;
      tenantCode?: string;
      signal?: AbortSignal;
    }
    | AbortSignal
): Promise<AquoraBatchVerificationResponse> {
  const isSignal = typeof AbortSignal !== "undefined" && optionsOrSignal instanceof AbortSignal;
  const options = isSignal ? undefined : (optionsOrSignal as { full?: boolean; reportType?: string; tenantId?: string; tenantCode?: string; signal?: AbortSignal });
  const signal = isSignal ? optionsOrSignal : options?.signal;
  const full = options?.full;

  const sanitized = (batchNumber || "").trim();
  if (!sanitized) {
    return {
      success: false,
      verified: false,
      code: "INVALID_BATCH_NUMBER",
      message: "Batch number must be provided.",
    };
  }

  const baseUrl = getAquoraBaseUrl();
  const searchParams = new URLSearchParams();
  if (full) searchParams.set("full", "true");
  if (options?.reportType) searchParams.set("reportType", options.reportType);
  if (options?.tenantId) searchParams.set("tenantId", options.tenantId);
  if (options?.tenantCode) searchParams.set("tenantCode", options.tenantCode);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const endpoint = `${baseUrl}/api/public/water-verification/${encodeURIComponent(sanitized)}${query}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (response.status === 404) {
    throw new Error("BATCH_NOT_FOUND");
  }

  if (response.status === 409) {
    const conflictData: AquoraBatchVerificationResponse = await response.json();
    return conflictData;
  }

  if (!response.ok) {
    throw new Error(`Aquora verification error: ${response.status}`);
  }

  const data: AquoraBatchVerificationResponse = await response.json();
  return data;
}
