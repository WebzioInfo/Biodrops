import { describe, it, expect, afterEach } from "vitest";
import { getManufacturers } from "../services/publicVerification";

describe("Manufacturer Service", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches manufacturers successfully from Aquora Public API", async () => {
    const mockApiResponse = {
      success: true,
      message: "Public BioDrops manufacturers retrieved successfully.",
      data: {
        items: [
          {
            id: "8714038a-36b0-4521-8b5e-9389ad045a65",
            name: "Faiha",
            code: "ACCOUNTANT_COMPANY",
            address: "Kondotty, Kerala",
            licenseNumber: "FSSAI 100234567890",
            email: "owner@faiha.com",
            phone: "+91 9876543210",
            isBiodropsProduction: true,
          },
        ],
        totalCount: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      },
    };

    global.fetch = async () =>
      ({
        ok: true,
        status: 200,
        json: async () => mockApiResponse,
      } as any);

    const response = await getManufacturers();
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(1);
    expect(response.data[0].name).toBe("Faiha");
    expect(response.data[0].isBiodropsProduction).toBe(true);
  });

  it("handles empty manufacturer list cleanly", async () => {
    const mockApiResponse = {
      success: true,
      message: "Public BioDrops manufacturers retrieved successfully.",
      data: {
        items: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      },
    };

    global.fetch = async () =>
      ({
        ok: true,
        status: 200,
        json: async () => mockApiResponse,
      } as any);

    const response = await getManufacturers();
    expect(response.success).toBe(true);
    expect(response.data).toHaveLength(0);
  });
});
