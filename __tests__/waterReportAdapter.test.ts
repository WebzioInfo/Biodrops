import { describe, it, expect } from "vitest";
import { adaptVerifyBatchToWaterReport, getWaterReportFilename } from "../lib/biodropsWaterReportAdapter";
import { AquoraBatchVerificationResponse } from "../services/aquoraPublicApi";
import { formatReportDataFromContract, getWaterReportDocumentDefinition, generateWaterReportPdfBuffer } from "../bqms-water-report-pdf";

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

    // Unentered chemical parameters are excluded from the report
    const chlorineParam = contract.parameters.find((p) => p.name === "Residual Free Chlorine");
    expect(chlorineParam).toBeUndefined();

    const sulphateParam = contract.parameters.find((p) => p.name === "Sulphate");
    expect(sulphateParam).toBeUndefined();

    const alkalinityParam = contract.parameters.find((p) => p.name === "Alkalinity");
    expect(alkalinityParam).toBeUndefined();

    // Unentered organoleptic parameters are excluded from the report
    const colourParam = contract.parameters.find((p) => p.name === "Colour");
    expect(colourParam).toBeUndefined();

    const odourParam = contract.parameters.find((p) => p.name === "Odour");
    expect(odourParam).toBeUndefined();

    const tasteParam = contract.parameters.find((p) => p.name === "Taste");
    expect(tasteParam).toBeUndefined();

    // Untested pathogens are excluded
    const pseudomonasParam = contract.parameters.find((p) => p.name === "Pseudomonas");
    expect(pseudomonasParam).toBeUndefined();

    const yeastParam = contract.parameters.find((p) => p.name === "Yeast & Mold");
    expect(yeastParam).toBeUndefined();

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

    // Untested parameters are excluded from the report
    expect(turbidity).toBeUndefined();
    expect(colour).toBeUndefined();
    expect(odour).toBeUndefined();

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
    expect(contract.parameters.length).toBe(0);
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

    // Verify row for unentered TDS is excluded
    const tdsRow = reportData.rows.find((r) => r[0] === "TDS");
    expect(tdsRow).toBeUndefined();

    // Verify PDFMake document definition builds cleanly with sample full contract
    const sampleContract = adaptVerifyBatchToWaterReport(sampleAquoraResponse);
    const docDef = getWaterReportDocumentDefinition(sampleContract);
    expect(docDef).toBeDefined();
    expect(docDef.content).toBeDefined();
    expect(docDef.content.length).toBeGreaterThan(0);

    // Verify page break structure guarantees 3-page layout without blank pages
    // Page 1: Report Info + Physical Table + Chemical Table
    // Page 2: Microbiology Header (pageBreak: before) + Table + Signatures
    // Page 3: Remarks (pageBreak: before)
    const microHeader = docDef.content.find((item: any) =>
      item.columns && item.columns.some((col: any) => col.text === "MICROBIOLOGICAL PARAMETERS")
    );
    expect(microHeader).toBeDefined();
    expect(microHeader.pageBreak).toBe("before");

    // If chemical parameters were present, verify chemical header pageBreak is undefined
    const chemHeader = docDef.content.find((item: any) =>
      item.columns && item.columns.some((col: any) => col.text === "CHEMICAL PARAMETERS")
    );
    if (chemHeader) {
      expect(chemHeader.pageBreak).toBeUndefined();
    }
  });

  it("includes generated time and date in reportGeneratedDate and metadata", () => {
    const contract = adaptVerifyBatchToWaterReport(sampleAquoraResponse);
    expect(contract.reportGeneratedDate).toBeDefined();
    // e.g. "19 Nov 2026, 03:45 PM"
    expect(contract.reportGeneratedDate).toMatch(/\d{2} [A-Za-z]{3} \d{4}, \d{1,2}:\d{2}\s?(?:AM|PM)/i);

    const reportData = formatReportDataFromContract(contract);
    expect(reportData.metadata?.["Report Generated"]).toBe(contract.reportGeneratedDate);
  });

  it("handles licenses cleanly: never displays null and includes custom licenses", () => {
    const batchWithLicenses = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-LIC-1",
        manufacturer: { name: "Test Plant" },
        manufacturing: { manufacturedDate: "2026-11-12" },
        expiry: { bestBefore: "2027-05-12" },
        licenses: {
          fssai: "11322000000000",
          bis: null, // No BIS
          others: [
            { name: "ISO 22000:2018", number: "FSMS-1002" },
            { name: "PCB Consent", number: "PCB/W/2026/88" }
          ]
        },
        waterQuality: { ph: "7.0", tds: "50", turbidity: "0.1" },
        report: { available: true }
      }
    } as any;

    const contract = adaptVerifyBatchToWaterReport(batchWithLicenses);
    expect(contract.remarks).toContain("FSSAI Lic No: 11322000000000");
    expect(contract.remarks).not.toContain("BIS CM/L No");
    expect(contract.remarks).not.toContain("null");
    expect(contract.remarks).toContain("ISO 22000:2018: FSMS-1002");
    expect(contract.remarks).toContain("PCB Consent: PCB/W/2026/88");
  });

  it("retains pending/incubating parameters and never fakes APPROVED when 12/13 completed", async () => {
    const partialResponse: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-PARTIAL-12-13",
        reportNumber: "RPT-B-PARTIAL-12-13",
        reportType: "DAILY",
        status: "SUBMITTED",
        completionStatus: "PARTIALLY_COMPLETED",
        totalParametersCount: 3,
        completedParametersCount: 2,
        pendingParametersCount: 1,
        overdueParametersCount: 0,
        manufacturer: { name: "Aiwa Minerals" },
        manufacturing: { manufacturedDate: "2026-11-25" },
        expiry: { bestBefore: "2027-05-25" },
        licenses: { fssai: "100200300" },
        waterQuality: { ph: "7.2", tds: "120", microbiology: "Pending", sterilization: "Passed" },
        parameters: [
          { name: "pH", category: "PHYSICAL", result: "7.2", unit: "—", standard: "6.5 - 8.5", status: "PASS", resultStatus: "COMPLETED", requiredDurationHours: 0, isOverdue: false },
          { name: "TDS", category: "PHYSICAL", result: "120", unit: "mg/L", standard: "0 - 500", status: "PASS", resultStatus: "COMPLETED", requiredDurationHours: 0, isOverdue: false },
          { name: "E.coli", category: "MICROBIOLOGY", result: null, unit: "CFU/100ml", standard: "Absent", status: "PENDING", resultStatus: "IN_PROGRESS", requiredDurationHours: 24, expectedCompletionAt: "2026-11-26T10:00:00Z", isOverdue: false },
        ],
        report: { available: true, publicDownloadAvailable: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(partialResponse);
    expect(contract.overallStatus).toBe("PENDING");
    expect(contract.completionStatus).toBe("PARTIALLY_COMPLETED");
    expect(contract.totalParametersCount).toBe(3);
    expect(contract.completedParametersCount).toBe(2);
    expect(contract.pendingParametersCount).toBe(1);
    expect(contract.parameters).toHaveLength(3);

    const ecoli = contract.parameters.find((p) => p.name === "E.coli");
    expect(ecoli?.result).toBe("—");
    expect(ecoli?.status).toBe("INCUBATING");

    const docDef = getWaterReportDocumentDefinition(contract);
    expect(docDef.content.length).toBeGreaterThan(0);

    // Verify real PDF buffer generates cleanly for partial report
    const pdfBuffer = await generateWaterReportPdfBuffer(contract);
    expect(pdfBuffer).toBeInstanceOf(Uint8Array);
    expect(Buffer.from(pdfBuffer.subarray(0, 5)).toString("utf8")).toBe("%PDF-");
  });

  it("marks overdue parameters and sets overallStatus to RESULTS_OVERDUE", () => {
    const overdueResponse: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-OVERDUE-1",
        reportType: "WEEKLY",
        status: "SUBMITTED",
        completionStatus: "RESULTS_OVERDUE",
        totalParametersCount: 2,
        completedParametersCount: 1,
        pendingParametersCount: 1,
        overdueParametersCount: 1,
        manufacturer: { name: "Aiwa Minerals" },
        manufacturing: { manufacturedDate: "2026-11-25" },
        expiry: { bestBefore: "2027-05-25" },
        licenses: {},
        waterQuality: { ph: "7.1", microbiology: "Pending", sterilization: "Passed" },
        parameters: [
          { name: "pH", category: "PHYSICAL", result: "7.1", unit: "—", standard: "6.5 - 8.5", status: "PASS", resultStatus: "COMPLETED", isOverdue: false },
          { name: "Coliform", category: "MICROBIOLOGY", result: null, unit: "CFU/100ml", standard: "Absent", status: "PENDING", resultStatus: "OVERDUE", requiredDurationHours: 24, isOverdue: true },
        ],
        report: { available: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(overdueResponse);
    expect(contract.overallStatus).toBe("RESULTS_OVERDUE");
    const coliform = contract.parameters.find((p) => p.name === "Coliform");
    expect(coliform?.result).toBe("—");
    expect(coliform?.status).toBe("OVERDUE");
  });

  it("sets overallStatus to FAIL when completed report has a failing parameter", () => {
    const failedResponse: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-FAIL-1",
        reportType: "DAILY",
        status: "APPROVED",
        completionStatus: "COMPLETED",
        totalParametersCount: 1,
        completedParametersCount: 1,
        pendingParametersCount: 0,
        overdueParametersCount: 0,
        manufacturer: { name: "Aiwa Minerals" },
        manufacturing: { manufacturedDate: "2026-11-25" },
        expiry: { bestBefore: "2027-05-25" },
        licenses: {},
        waterQuality: { ph: "9.2", microbiology: "Passed", sterilization: "Passed" },
        parameters: [
          { name: "pH", category: "PHYSICAL", result: "9.2", unit: "—", standard: "6.5 - 8.5", status: "FAIL", resultStatus: "COMPLETED", isOverdue: false },
        ],
        report: { available: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(failedResponse);
    expect(contract.overallStatus).toBe("FAIL");
  });

  it("includes only Weekly parameters when report has only Weekly microbiology parameters", () => {
    const weeklyOnlyResponse: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: "B-WEEKLY-ONLY",
        reportType: "WEEKLY",
        status: "SUBMITTED",
        completionStatus: "COMPLETED",
        totalParametersCount: 2,
        completedParametersCount: 2,
        pendingParametersCount: 0,
        overdueParametersCount: 0,
        manufacturer: { name: "Aiwa Minerals" },
        manufacturing: { manufacturedDate: "2026-11-25" },
        expiry: { bestBefore: "2027-05-25" },
        licenses: {},
        waterQuality: { ph: null, tds: null, turbidity: null, microbiology: "Passed", sterilization: "Passed" },
        parameters: [
          { name: "E.coli", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS", resultStatus: "COMPLETED", isOverdue: false },
          { name: "Coliform", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS", resultStatus: "COMPLETED", isOverdue: false },
        ],
        report: { available: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(weeklyOnlyResponse);
    expect(contract.parameters).toHaveLength(2);
    expect(contract.parameters.map((p) => p.name)).toEqual(["E.coli", "Coliform"]);
    expect(contract.parameters.find((p) => p.name === "pH")).toBeUndefined();
    expect(contract.parameters.find((p) => p.name === "TDS")).toBeUndefined();
  });

  it.each([3, 6, 10, 15])("preserves all %i parameters in PDF contract for Daily and Weekly reports", (count) => {
    const params = Array.from({ length: count }, (_, i) => ({
      name: `Param ${i + 1}`,
      category: i % 3 === 0 ? "PHYSICAL" : i % 3 === 1 ? "CHEMICAL" : "MICROBIOLOGY",
      result: i === count - 1 ? null : `${7 + (i % 3) * 0.2}`,
      unit: i % 3 === 2 ? "CFU/100ml" : "mg/L",
      standard: i % 3 === 2 ? "Absent" : "0 - 500",
      status: i === count - 1 ? "PENDING" : "PASS",
      resultStatus: i === count - 1 ? "PENDING_RESULT" : "COMPLETED",
      isOverdue: false,
    }));

    const response: AquoraBatchVerificationResponse = {
      success: true,
      verified: true,
      data: {
        batchNumber: `B-COUNT-${count}`,
        reportType: count >= 10 ? "WEEKLY" : "DAILY",
        status: "SUBMITTED",
        completionStatus: "PARTIALLY_COMPLETED",
        totalParametersCount: count,
        completedParametersCount: count - 1,
        pendingParametersCount: 1,
        overdueParametersCount: 0,
        manufacturer: { name: "Aiwa Minerals" },
        manufacturing: { manufacturedDate: "2026-11-25" },
        expiry: { bestBefore: "2027-05-25" },
        licenses: {},
        waterQuality: { ph: "7.2", tds: "100", turbidity: "0.2", microbiology: "Pending", sterilization: "Passed" },
        parameters: params,
        report: { available: true },
      },
    };

    const contract = adaptVerifyBatchToWaterReport(response);
    expect(contract.reportType).toBe(count >= 10 ? "WEEKLY" : "DAILY");
    expect(contract.parameters).toHaveLength(count);
    const docDef = getWaterReportDocumentDefinition(contract);
    expect(docDef.content.length).toBeGreaterThan(0);
  });
});
