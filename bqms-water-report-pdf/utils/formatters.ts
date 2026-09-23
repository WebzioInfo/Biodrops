import { WaterReportData, WaterReportInputContract } from '../types/report.types';
import { STATIC_PARAMETERS } from './staticParameters';

/**
 * Converts a high-level WaterReportInputContract into the exact WaterReportData structure.
 * Strictly avoids inventing or substituting fake default values for metadata and parameters.
 */
export function formatReportDataFromContract(contract: WaterReportInputContract): WaterReportData {
  const metadata: Record<string, string> = {
    "Report Number": contract.reportNumber || "—",
    "Sample Code": contract.sampleCode || contract.batchNumber || "—",
    "Batch Number": contract.batchNumber || "—",
    "Customer / Client": contract.clientName || "—",
    "Company": contract.clientName || "—",
    "Collected On": contract.collectedOn || "—",
    "Sample Time": contract.collectedOn || "—",
    "Sample Source": contract.sampleSource || "—",
    "Location": contract.location || "—",
    "Production Date": contract.productionDate || "—",
    "Manufacturing Date": contract.productionDate || "—",
    "Best Before": contract.bestBefore || "—",
    "Collected By": contract.collectedBy || "—",
    "Tested By": contract.testedBy || "—",
    "Verified By": contract.verifiedBy || "—",
    "Report Generated": contract.reportGeneratedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    "Report Type": contract.reportType || "—",
    "Overall Status": contract.overallStatus || "—",
    "Report Status": contract.overallStatus || "—",
  };

  if (contract.clientAddress && contract.clientAddress !== "—") {
    metadata["Customer Address"] = contract.clientAddress;
    metadata["Address"] = contract.clientAddress;
  }

  if (contract.verificationUrl) {
    metadata["Verification URL"] = contract.verificationUrl;
  }

  if (contract.remarks) {
    metadata["Remarks"] = contract.remarks;
  } else {
    metadata["Remarks"] = "—";
  }

  const headers = ["Parameter", "Category", "Result", "Unit", "Standard", "Status"];
  
  let rows: (string | number)[][] = [];

  if (contract.parameters && contract.parameters.length > 0) {
    rows = contract.parameters.map((p) => {
      const isMissingResult = p.result === null || p.result === undefined || String(p.result).trim() === "" || String(p.result).trim() === "—";
      const resultStr = isMissingResult ? "—" : String(p.result);
      
      // If result is missing and status wasn't explicitly provided, don't allow a fake "PASS" or "WITHIN LIMIT"
      let statusStr = "—";
      if (!isMissingResult) {
        statusStr = p.status ? String(p.status) : "—";
      } else if (p.status && p.status !== "PASS" && p.status !== "WITHIN LIMIT" && p.status !== "WITHIN LIMITS") {
        statusStr = String(p.status);
      }

      const standardStr = isMissingResult && (!p.standard || p.standard === "—")
        ? "—"
        : (p.standard || "—");

      return [
        p.name,
        p.category,
        resultStr,
        p.unit || "",
        standardStr,
        statusStr
      ];
    });
  } else {
    // Default fallback to STATIC_PARAMETERS with clean "—" placeholders
    rows = STATIC_PARAMETERS.map((p) => {
      return [p.name, p.category, "—", p.unit || "", "—", "—"];
    });
  }

  return {
    title: "WATER QUALITY CONTROL TEST CERTIFICATE",
    headers,
    rows,
    metadata
  };
}
