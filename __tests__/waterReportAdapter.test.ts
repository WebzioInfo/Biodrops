import { describe, it, expect } from "vitest";
import { adaptVerifyBatchToWaterReport, getWaterReportFilename } from "../lib/biodropsWaterReportAdapter";
import { AquoraBatchVerificationResponse } from "../services/aquoraPublicApi";
import { formatReportDataFromContract, getWaterReportDocumentDefinition } from "../bqms-water-report-pdf";

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

  it("never invents defaults for unentered parameters in partial responses", () => {
    const contract = adaptVerifyBatchToWaterReport(sampleAquoraResponse);

    // Unentered chemical parameters must be "—" and not "0" or "WITHIN LIMIT"
    const chlorineParam = contract.parameters.find((p) => p.name === "Residual Free Chlorine");
    expect(chlorineParam?.result).toBe("—");
    expect(chlorineParam?.status).toBe("—");

    const sulphateParam = contract.parameters.find((p) => p.name === "Sulphate");
    expect(sulphateParam?.result).toBe("—");
    expect(sulphateParam?.status).toBe("—");

    const alkalinityParam = contract.parameters.find((p) => p.name === "Alkalinity");
    expect(alkalinityParam?.result).toBe("—");
    expect(alkalinityParam?.status).toBe("—");

    // Unentered organoleptic parameters must be "—" and not "Agreeable"
    const colourParam = contract.parameters.find((p) => p.name === "Colour");
    expect(colourParam?.result).toBe("—");
    expect(colourParam?.status).toBe("—");

    const odourParam = contract.parameters.find((p) => p.name === "Odour");
    expect(odourParam?.result).toBe("—");
    expect(odourParam?.status).toBe("—");

    const tasteParam = contract.parameters.find((p) => p.name === "Taste");
    expect(tasteParam?.result).toBe("—");
    expect(tasteParam?.status).toBe("—");

    // Untested pathogens must be "—" and not "Absent"
    const pseudomonasParam = contract.parameters.find((p) => p.name === "Pseudomonas");
    expect(pseudomonasParam?.result).toBe("—");
    expect(pseudomonasParam?.status).toBe("—");

    const yeastParam = contract.parameters.find((p) => p.name === "Yeast & Mold");
    expect(yeastParam?.result).toBe("—");
    expect(yeastParam?.status).toBe("—");

    // Unprovided personnel metadata must be "—" and not fake "QC Team"
    expect(contract.collectedBy).toBe("—");
    expect(contract.testedBy).toBe("—");
    expect(contract.verifiedBy).toBe("—");
  });

  it("strictly satisfies Acceptance Criteria 20 (pH=9, TDS=10, Turbidity=null, Colour=null, Odour=null)", () => {
    const partialBatch: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-TEST-20",
        manufacturer: {
          name: "Test Facility",
          address: "Kerala",
          location: "Kerala",
        },
        manufacturing: {
          manufacturedDate: "2026-09-01",
        },
        expiry: {
          bestBefore: "2027-03-01",
          shelfLifeMonths: 6,
        },
        licenses: {
          fssai: "12345",
          bis: "67890",
        },
        waterQuality: {
          ph: 9,
          tds: 10,
          turbidity: null,
          microbiology: null,
          sterilization: null,
        },
        report: {
          available: true,
        },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(partialBatch);

    const ph = contract.parameters.find((p) => p.name === "pH");
    const tds = contract.parameters.find((p) => p.name === "TDS");
    const turbidity = contract.parameters.find((p) => p.name === "Turbidity");
    const colour = contract.parameters.find((p) => p.name === "Colour");
    const odour = contract.parameters.find((p) => p.name === "Odour");

    expect(ph?.result).toBe("9");
    expect(ph?.status).toBe("ABOVE LIMIT");

    expect(tds?.result).toBe("10");
    expect(tds?.status).toBe("PASS");

    expect(turbidity?.result).toBe("—");
    expect(turbidity?.status).toBe("—");
    expect(turbidity?.standard).toBe("—");

    expect(colour?.result).toBe("—");
    expect(colour?.status).toBe("—");
    expect(colour?.standard).toBe("—");

    expect(odour?.result).toBe("—");
    expect(odour?.status).toBe("—");
    expect(odour?.standard).toBe("—");

    // Since pH was 9 (> 8.5 limit), overallStatus must be FAIL
    expect(contract.overallStatus).toBe("FAIL");
  });

  it("handles completely empty/missing data without inventing any values", () => {
    const emptyBatch: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "",
        manufacturer: {
          name: null,
          address: null,
          location: null,
        },
        manufacturing: {
          manufacturedDate: null,
        },
        expiry: {
          bestBefore: null,
          shelfLifeMonths: null,
        },
        licenses: {
          fssai: null,
          bis: null,
        },
        waterQuality: {
          ph: null,
          tds: null,
          turbidity: null,
          microbiology: null,
          sterilization: null,
        },
        report: {
          available: false,
        },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(emptyBatch);

    expect(contract.clientName).toBe("—");
    expect(contract.location).toBe("—");
    expect(contract.productionDate).toBe("—");
    expect(contract.bestBefore).toBe("—");
    expect(contract.collectedBy).toBe("—");
    expect(contract.testedBy).toBe("—");
    expect(contract.verifiedBy).toBe("—");
    expect(contract.overallStatus).toBe("—");

    contract.parameters.forEach((param) => {
      expect(param.result).toBe("—");
      expect(param.status).toBe("—");
      expect(param.standard).toBe("—");
    });
  });

  it("properly flags microbiology pathogens as FAIL when detected", () => {
    const failMicroBatch: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-FAIL-MICRO",
        manufacturer: { name: "Lab", address: "City", location: "City" },
        manufacturing: { manufacturedDate: "2026-09-01" },
        expiry: { bestBefore: "2027-03-01", shelfLifeMonths: 6 },
        licenses: { fssai: null, bis: null },
        waterQuality: {
          ph: "7.2",
          tds: "120",
          turbidity: "0.2",
          microbiology: "Coliform Pathogens Present",
          sterilization: "Active",
        },
        report: { available: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(failMicroBatch);

    const ecoli = contract.parameters.find((p) => p.name === "E.coli");
    const coliform = contract.parameters.find((p) => p.name === "Coliform");

    expect(ecoli?.result).toBe("Present");
    expect(ecoli?.status).toBe("FAIL");

    expect(coliform?.result).toBe("Present");
    expect(coliform?.status).toBe("FAIL");

    expect(contract.overallStatus).toBe("FAIL");
  });

  it("generates correct filename for batch", () => {
    expect(getWaterReportFilename("B-1234")).toBe("Water-Report-B-1234.pdf");
    expect(getWaterReportFilename("1234")).toBe("Water-Report-1234.pdf");
  });

  it("formats PDF report data and document definition faithfully without inventing values", () => {
    const partialBatch: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-9999",
        manufacturer: { name: "Aqua Lab", address: "City", location: "City" },
        manufacturing: { manufacturedDate: "2026-09-01" },
        expiry: { bestBefore: "2027-03-01", shelfLifeMonths: 6 },
        licenses: { fssai: null, bis: null },
        waterQuality: {
          ph: "7.0",
          tds: null,
          turbidity: null,
          microbiology: null,
          sterilization: null,
        },
        report: { available: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(partialBatch);
    const reportData = formatReportDataFromContract(contract);

    // Verify metadata
    expect(reportData.metadata?.["Customer / Client"]).toBe("Aqua Lab");
    expect(reportData.metadata?.["Collected By"]).toBe("—");
    expect(reportData.metadata?.["Tested By"]).toBe("—");
    expect(reportData.metadata?.["Verified By"]).toBe("—");

    // Verify row for pH is present and valid
    const phRow = reportData.rows.find((r) => r[0] === "pH");
    expect(phRow).toBeDefined();
    expect(phRow?.[2]).toBe("7.0");
    expect(phRow?.[5]).toBe("PASS");

    // Verify row for TDS is missing placeholder
    const tdsRow = reportData.rows.find((r) => r[0] === "TDS");
    expect(tdsRow).toBeDefined();
    expect(tdsRow?.[2]).toBe("—");
    expect(tdsRow?.[5]).toBe("—");

    // Verify PDFMake document definition builds cleanly
    const docDef = getWaterReportDocumentDefinition(contract);
    expect(docDef).toBeDefined();
    expect(docDef.content).toBeDefined();
    expect(docDef.content.length).toBeGreaterThan(0);
  });
});
