/**
 * BioDrops Public Verification Services
 * 
 * Re-exports from centralized Aquora Public API layer with backward-compatible adapters.
 */

import {
  AquoraManufacturerDto,
  AquoraBatchVerificationResponse,
  fetchAquoraManufacturers,
  verifyAquoraBatch,
} from "./aquoraPublicApi";

export type Manufacturer = AquoraManufacturerDto;
export type Organization = AquoraManufacturerDto;

export interface FetchManufacturersResponse {
  success: boolean;
  data: Manufacturer[];
  message?: string;
}

export type FetchOrganizationsResponse = FetchManufacturersResponse;
export type VerifyBatchResponse = AquoraBatchVerificationResponse;

/**
 * Fetches manufacturers from the Aquora Public API.
 */
export async function getManufacturers(
  signal?: AbortSignal
): Promise<FetchManufacturersResponse> {
  try {
    const items = await fetchAquoraManufacturers(undefined, signal);
    return {
      success: true,
      data: items,
      message: "Manufacturers retrieved successfully.",
    };
  } catch (error: any) {
    if (error.name === "AbortError") throw error;
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch manufacturers",
    };
  }
}

export async function fetchOrganizations(
  signal?: AbortSignal
): Promise<FetchOrganizationsResponse> {
  return getManufacturers(signal);
}

/**
 * Verifies batch with the Aquora Public API.
 */
export async function verifyBatch(
  batchNumber: string,
  signal?: AbortSignal
): Promise<VerifyBatchResponse> {
  return verifyAquoraBatch(batchNumber, signal);
}

export * from "./aquoraPublicApi";
