import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  fetchAquoraManufacturers,
  verifyAquoraBatch,
  getAquoraBaseUrl,
} from "../services/aquoraPublicApi";

describe("Aquora Public API Client", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("getAquoraBaseUrl", () => {
    it("returns empty string in browser environment for same-origin relative proxy", () => {
      // simulate browser window
      (global as any).window = {};
      expect(getAquoraBaseUrl()).toBe("");
      delete (global as any).window;
    });

    it("returns configured AQUORA_PUBLIC_API_URL in server environment", () => {
      delete (global as any).window;
      process.env.AQUORA_PUBLIC_API_URL = "http://localhost:5000";
      expect(getAquoraBaseUrl()).toBe("http://localhost:5000");
    });
  });

  describe("fetchAquoraManufacturers", () => {
    it("parses PagedResult from Aquora Public API", async () => {
      const mockResponse = {
        success: true,
        message: "Public BioDrops manufacturers retrieved successfully.",
        data: {
          items: [
            {
              id: "8714038a-36b0-4521-8b5e-9389ad045a65",
              name: "Faiha",
              code: "ACCOUNTANT_COMPANY",
              isBiodropsProduction: true,
              address: "Kondotty, Kerala",
              licenseNumber: "FSSAI 100234567890",
            },
            {
              id: "7d77da44-5307-489c-b474-bf9cdc6137ee",
              name: "Sinan Company",
              code: "SINAN_COMPANY",
              isBiodropsProduction: true,
              address: "Malappuram, Kerala",
              licenseNumber: null,
            },
          ],
          totalCount: 2,
          page: 1,
          pageSize: 10,
          totalPages: 1,
        },
      };

      global.fetch = async () =>
        ({
          ok: true,
          status: 200,
          json: async () => mockResponse,
        } as any);

      const result = await fetchAquoraManufacturers();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Faiha");
      expect(result[0].isBiodropsProduction).toBe(true);
      expect(result[1].name).toBe("Sinan Company");
    });

    it("throws clear error on upstream API failure", async () => {
      global.fetch = async () =>
        ({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        } as any);

      await expect(fetchAquoraManufacturers()).rejects.toThrow("Aquora Public API error: 500");
    });
  });

  describe("verifyAquoraBatch", () => {
    it("fetches and returns authoritative Aquora batch verification response", async () => {
      const mockBatchResponse = {
        success: true,
        verified: true,
        data: {
          batchNumber: "B-1234",
          manufacturer: {
            name: "Faiha",
            address: "Biofix Water Quality Lab, Kondotty, Kerala",
            location: "Biofix Water Quality Lab, Kondotty, Kerala",
          },
          manufacturing: {
            manufacturedDate: "2026-08-24",
          },
          expiry: {
            bestBefore: "2027-02-24",
            shelfLifeMonths: 6,
          },
          licenses: {
            fssai: "FSSAI 100234567890",
            bis: "BIS IS 14543",
          },
          waterQuality: {
            ph: "7.4",
            tds: "145",
            turbidity: "0.4",
            microbiology: "Passed",
            sterilization: "Passed",
          },
          report: {
            available: true,
            publicDownloadAvailable: false,
          },
        },
      };

      global.fetch = async (url: any) => {
        expect(String(url)).toContain("1234");
        return {
          ok: true,
          status: 200,
          json: async () => mockBatchResponse,
        } as any;
      };

      const result = await verifyAquoraBatch("1234");
      expect(result.success).toBe(true);
      expect(result.verified).toBe(true);
      expect(result.data?.batchNumber).toBe("B-1234");
      expect(result.data?.manufacturer.name).toBe("Faiha");
      expect(result.data?.waterQuality.ph).toBe("7.4");
      expect(result.data?.waterQuality.tds).toBe("145");
      expect(result.data?.waterQuality.turbidity).toBe("0.4");
    });

    it("throws BATCH_NOT_FOUND error on 404 response", async () => {
      global.fetch = async () =>
        ({
          ok: false,
          status: 404,
          statusText: "Not Found",
        } as any);

      await expect(verifyAquoraBatch("INVALID-BATCH")).rejects.toThrow("BATCH_NOT_FOUND");
    });
  });
});
