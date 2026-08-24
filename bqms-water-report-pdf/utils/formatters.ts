import { WaterReportData, WaterReportInputContract } from '../types/report.types';
import { STATIC_PARAMETERS } from './staticParameters';

/**
 * Converts a high-level WaterReportInputContract into the exact WaterReportData structure.
 */
export function formatReportDataFromContract(contract: WaterReportInputContract): WaterReportData {
  const metadata: Record<string, string> = {
    "Report Number": contract.reportNumber || "—",
    "Sample Code": contract.sampleCode || contract.batchNumber || "—",
    "Batch Number": contract.batchNumber || "—",
    "Customer / Client": contract.clientName || "N/A",
    "Company": contract.clientName || "N/A",
    "Collected On": contract.collectedOn || "—",
    "Sample Time": contract.collectedOn || "—",
    "Sample Source": contract.sampleSource || "Production Line",
    "Location": contract.location || "Plant Facility",
    "Production Date": contract.productionDate || "—",
    "Manufacturing Date": contract.productionDate || "—",
    "Best Before": contract.bestBefore || (contract.productionDate && contract.productionDate !== "—" ? `${contract.productionDate} (30 Days)` : "—"),
    "Collected By": contract.collectedBy || "QC Team",
    "Tested By": contract.testedBy || "QC Specialist",
    "Verified By": contract.verifiedBy || "Lab In-Charge",
    "Report Generated": contract.reportGeneratedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    "Report Type": contract.reportType || "Daily",
    "Overall Status": contract.overallStatus || "APPROVED",
    "Report Status": contract.overallStatus || "APPROVED",
  };

  if (contract.clientAddress) {
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
      return [
        p.name,
        p.category,
        String(p.result !== null && p.result !== undefined ? p.result : "—"),
        p.unit || "",
        p.standard || "—",
        p.status || "—"
      ];
    });
  } else {
    // Default fallback to STATIC_PARAMETERS
    rows = STATIC_PARAMETERS.map((p) => {
      let standardStr = "—";
      if (p.minAcceptable !== null && p.maxAcceptable !== null) {
        standardStr = p.minAcceptable === p.maxAcceptable ? String(p.minAcceptable) : `${p.minAcceptable} - ${p.maxAcceptable}`;
      } else if (p.minAcceptable !== null) {
        standardStr = `≥ ${p.minAcceptable}`;
      } else if (p.maxAcceptable !== null) {
        standardStr = `≤ ${p.maxAcceptable}`;
      }

      return [p.name, p.category, "—", p.unit || "", standardStr, "—"];
    });
  }

  return {
    title: "WATER QUALITY CONTROL TEST CERTIFICATE",
    headers,
    rows,
    metadata
  };
}
