import { describe, it, expect, afterEach } from "vitest";
import { verifyBatch } from "../services/publicVerification";

describe("Batch Verification Service", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("verifies batch successfully from Aquora Public API", async () => {
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

    global.fetch = async () =>
      ({
        ok: true,
        status: 200,
        json: async () => mockBatchResponse,
      } as any);

    const response = await verifyBatch("1234");
    expect(response.success).toBe(true);
    expect(response.verified).toBe(true);
    expect(response.data?.batchNumber).toBe("B-1234");
    expect(response.data?.manufacturer.name).toBe("Faiha");
  });

  it("throws BATCH_NOT_FOUND when batch does not exist", async () => {
    global.fetch = async () =>
      ({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as any);

    await expect(verifyBatch("UNKNOWN_BATCH")).rejects.toThrow("BATCH_NOT_FOUND");
  });
});
