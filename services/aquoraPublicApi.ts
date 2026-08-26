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
  address?: string | null;
  location?: string | null;
  licenseNumber?: string | null;
  gstNumber?: string | null;
  panNumber?: string | null;
  email?: string | null;
  phone?: string | null;
  isBiodropsProduction: boolean;
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

export interface AquoraBatchLicenses {
  fssai: string | null;
  bis: string | null;
}

export interface AquoraBatchWaterQuality {
  ph: string | number | null;
  tds: string | number | null;
  turbidity: string | number | null;
  microbiology: string | null;
  sterilization: string | null;
}

export interface AquoraBatchReport {
  available: boolean;
  publicDownloadAvailable?: boolean;
  downloadUrl?: string | null;
}

export interface AquoraBatchVerificationData {
  batchNumber: string;
  manufacturer: AquoraBatchManufacturer;
  manufacturing: AquoraBatchManufacturing;
  expiry: AquoraBatchExpiry;
  licenses: AquoraBatchLicenses;
  waterQuality: AquoraBatchWaterQuality;
  report: AquoraBatchReport;
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
 * Verifies a water production batch with Aquora Public API.
 * Normalizes input and fetches authoritative batch, manufacturer, QC parameters, and report status.
 */
export async function verifyAquoraBatch(
  batchNumber: string,
  signal?: AbortSignal
): Promise<AquoraBatchVerificationResponse> {
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
  const endpoint = `${baseUrl}/api/public/water-verification/${encodeURIComponent(sanitized)}`;

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

  if (!response.ok) {
    throw new Error(`Aquora verification error: ${response.status}`);
  }

  const data: AquoraBatchVerificationResponse = await response.json();
  return data;
}
