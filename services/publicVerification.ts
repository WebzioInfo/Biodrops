export interface VerifyBatchResponse {
  success: boolean;
  batchNumber: string;
  manufacturer: {
    name: string | null;
    address: string | null;
    location: string | null;
  };
  manufacturing: {
    mfgDate: string | null;
    bestBefore: string | null;
    shelfLife: string | null;
  };
  licenses: {
    fssai: string | null;
    bis: string | null;
  };
  waterQuality: {
    ph: number | string | null;
    tds: number | string | null;
    turbidity: string | null;
    microbiology: string | null;
    uv: boolean | null;
    ozone: boolean | null;
  };
  report: {
    available: boolean;
    downloadUrl: string | null;
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_BQMS_API_URL || "https://bqms.vercel.app";

export async function verifyBatch(
  batchNumber: string,
  signal?: AbortSignal
): Promise<VerifyBatchResponse> {
  const response = await fetch(`${BASE_URL}/api/public/verify/${encodeURIComponent(batchNumber)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("BATCH_NOT_FOUND");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: VerifyBatchResponse = await response.json();
  return data;
}

export interface Organization {
  id: string;
  name: string;
  address: string | null;
  licenseNumber: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
}

export interface FetchOrganizationsResponse {
  success: boolean;
  data?: Organization[];
  message?: string;
}

export async function fetchOrganizations(
  signal?: AbortSignal
): Promise<FetchOrganizationsResponse> {
  const response = await fetch(`${BASE_URL}/api/public/organizations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: FetchOrganizationsResponse = await response.json();
  return data;
}
