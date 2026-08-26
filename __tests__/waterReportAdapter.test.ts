import { describe, it, expect } from "vitest";
import { adaptVerifyBatchToWaterReport, getWaterReportFilename } from "../lib/biodropsWaterReportAdapter";
import { AquoraBatchVerificationResponse } from "../services/aquoraPublicApi";

describe("Water Report PDF Adapter with Aquora Data", () => {
  const sampleAquoraResponse: AquoraBatchVerificationResponse = {
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

  it("adapts Aquora batch response into WaterReportInputContract", () => {
    const contract = adaptVerifyBatchToWaterReport(sampleAquoraResponse);

    expect(contract.batchNumber).toBe("B-1234");
    expect(contract.clientName).toBe("Faiha");
    expect(contract.clientAddress).toBe("Biofix Water Quality Lab, Kondotty, Kerala");
    expect(contract.location).toBe("Biofix Water Quality Lab, Kondotty, Kerala");
    expect(contract.overallStatus).toBe("APPROVED");

    const phParam = contract.parameters.find((p) => p.name === "pH");
    expect(phParam?.result).toBe("7.4");
    expect(phParam?.status).toBe("PASS");

    const tdsParam = contract.parameters.find((p) => p.name === "TDS");
    expect(tdsParam?.result).toBe("145");
    expect(tdsParam?.status).toBe("PASS");

    const turbParam = contract.parameters.find((p) => p.name === "Turbidity");
    expect(turbParam?.result).toBe("0.4");
    expect(turbParam?.status).toBe("PASS");
  });

  it("generates correct filename for batch", () => {
    expect(getWaterReportFilename("B-1234")).toBe("Water-Report-B-1234.pdf");
    expect(getWaterReportFilename("1234")).toBe("Water-Report-1234.pdf");
  });
});
