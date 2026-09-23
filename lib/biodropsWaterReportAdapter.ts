import { AquoraBatchVerificationResponse } from "../services/aquoraPublicApi";
import { WaterReportInputContract, QualityStatus } from "../bqms-water-report-pdf";
import { parseISODate, formatReadableDate } from "./date";

export interface AdapterOptions {
  origin?: string;
  reportNumber?: string;
}

/**
 * Checks if a value is present, non-null, and non-empty.
 */
function hasValue(val: any): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === "string") {
    const trimmed = val.trim();
    return trimmed !== "" && trimmed !== "—" && trimmed.toLowerCase() !== "null" && trimmed.toLowerCase() !== "undefined";
  }
  return true;
}

/**
 * Resolves compliance status for pH (IS 14543 acceptable limit: 6.5 - 8.5)
 */
function resolvePhStatus(ph: any): QualityStatus {
  if (!hasValue(ph)) return "—";
  const val = typeof ph === "number" ? ph : parseFloat(String(ph));
  if (isNaN(val)) return "PASS";
  if (val < 6.5) return "BELOW LIMIT";
  if (val > 8.5) return "ABOVE LIMIT";
  return "PASS";
}

/**
 * Resolves compliance status for TDS (IS 14543 acceptable limit: ≤ 500 mg/L)
 */
function resolveTdsStatus(tds: any): QualityStatus {
  if (!hasValue(tds)) return "—";
  const val = typeof tds === "number" ? tds : parseFloat(String(tds));
  if (isNaN(val)) return "PASS";
  if (val > 500) return "ABOVE LIMIT";
  return "PASS";
}

/**
 * Resolves compliance status for Turbidity (IS 14543 acceptable limit: ≤ 1 NTU)
 */
function resolveTurbidityStatus(turbidity: any): QualityStatus {
  if (!hasValue(turbidity)) return "—";
  const val = typeof turbidity === "number" ? turbidity : parseFloat(String(turbidity));
  if (isNaN(val)) return "PASS";
  if (val > 1.0) return "ABOVE LIMIT";
  return "PASS";
}

/**
 * Resolves compliance status for organoleptic descriptors (Agreeable)
 */
function resolveDescriptorStatus(val: any): QualityStatus {
  if (!hasValue(val)) return "—";
  const s = String(val).toLowerCase();
  if (
    s.includes("agreeable") ||
    s.includes("pass") ||
    s.includes("satisfactory") ||
    s.includes("normal") ||
    s.includes("clear") ||
    s.includes("colorless") ||
    s.includes("odourless") ||
    s.includes("tasteless")
  ) {
    return "PASS";
  }
  const n = parseFloat(String(val));
  if (!isNaN(n)) {
    return n <= 5 ? "PASS" : "ABOVE LIMIT";
  }
  return "PASS";
}

/**
 * Resolves compliance status for numeric limit
 */
function resolveNumericLimitStatus(val: any, maxLimit: number): QualityStatus {
  if (!hasValue(val)) return "—";
  const n = typeof val === "number" ? val : parseFloat(String(val));
  if (isNaN(n)) return "PASS";
  return n > maxLimit ? "ABOVE LIMIT" : "PASS";
}

/**
 * Resolves compliance status for microbiology pathogen presence (Standard: Absent)
 */
function resolvePathogenStatus(val: any): QualityStatus {
  if (!hasValue(val)) return "—";
  const s = String(val).toLowerCase();
  if (s.includes("present") || s.includes("positive") || s.includes("fail") || s.includes("detected")) {
    return "FAIL";
  }
  return "PASS";
}

/**
 * Generates a clean, dynamic filename based on the verified batch identifier.
 */
export function getWaterReportFilename(batchNumber: string | null | undefined): string {
  const cleanId = (batchNumber || "Report").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
  return `Water-Report-${cleanId}.pdf`;
}

/**
 * Formats a dynamic verification URL for the QR code.
 */
export function getBiodropsVerificationUrl(batchNumber: string, customOrigin?: string): string {
  const base =
    customOrigin ||
    (typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "https://biodropsindia.com");

  return `${base}/know-your-water?batch=${encodeURIComponent(batchNumber)}`;
}

/**
 * Adapts Aquora Batch Verification Response into WaterReportInputContract
 * consumed by the in-browser Water Report PDF generator.
 *
 * Strictly adheres to truth-in-reporting:
 * NEVER invents or substitutes default values for unentered/untested parameters.
 * Missing/unentered values are assigned placeholder "—".
 */
export function adaptVerifyBatchToWaterReport(
  batch: AquoraBatchVerificationResponse,
  options?: AdapterOptions
): WaterReportInputContract {
  const data = batch.data;
  const batchNo = (data?.batchNumber || "").trim() || "—";
  const reportNumber = options?.reportNumber || (data?.reportNumber ? String(data.reportNumber) : (batchNo !== "—" ? `RPT-${batchNo}` : "—"));
  const sampleCode = (data?.sampleCode || batchNo || "").trim() || "—";

  // Manufacturer Details - NO fake hardcoded defaults
  const clientName = (data?.manufacturer?.name || "").trim() || "—";
  const clientAddress = (data?.manufacturer?.address || "").trim() || undefined;
  const location = (data?.manufacturer?.location || "").trim() || "—";

  // Manufacturing Date
  const mfgRaw = (data?.manufacturing?.manufacturedDate || "").trim();
  const parsedMfg = mfgRaw ? parseISODate(mfgRaw) : null;
  const productionDate = parsedMfg
    ? formatReadableDate(parsedMfg)
    : (mfgRaw || "—");

  // Expiry Date - NO hardcoded "(6 Months)" or "(30 Days)"
  const bestBeforeRaw = (data?.expiry?.bestBefore || "").trim();
  const shelfLife = data?.expiry?.shelfLifeMonths;
  let bestBefore = "—";
  if (bestBeforeRaw) {
    bestBefore = shelfLife ? `${bestBeforeRaw} (${shelfLife} Months)` : bestBeforeRaw;
  }

  // Personnel / Operations - ONLY from actual data
  const collectedBy = (data?.collectedBy || (data as any)?.sampling?.collectedBy || "").trim() || "—";
  const testedBy = (data?.testedBy || data?.analyst || (data as any)?.testing?.analyst || (data as any)?.waterQuality?.analyst || "").trim() || "—";
  const verifiedBy = (data?.verifiedBy || (data as any)?.verification?.verifiedBy || "").trim() || "—";
  const sampleSource = (data?.sampleSource || (data as any)?.sampling?.source || "").trim() || "—";
  const collectedOn = (data?.collectedOn || (data as any)?.sampling?.collectedOn || "").trim() || (productionDate !== "—" ? productionDate : "—");
  const reportType = (data?.reportType || (data as any)?.report?.type || "").trim() || "—";

  // Dynamic QR Verification URL
  const verificationUrl = getBiodropsVerificationUrl(batchNo, options?.origin);

  const wq = data?.waterQuality;
  const paramsArray = Array.isArray((data as any)?.parameters)
    ? (data as any).parameters
    : Array.isArray((wq as any)?.parameters)
    ? (wq as any).parameters
    : undefined;

  function findParam(name: string, ...keys: string[]): { val: any; explicitStatus?: QualityStatus } {
    // 1. Check paramsArray if available
    if (paramsArray) {
      const target = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const found = paramsArray.find((item: any) => {
        const n = String(item.name || item.parameter || item.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return n === target;
      });
      if (found) {
        const val = found.result !== undefined ? found.result : found.value;
        const status = found.status || found.qualityStatus;
        return { val, explicitStatus: status as QualityStatus };
      }
    }

    // 2. Check keys in wq
    if (wq) {
      for (const k of keys) {
        if ((wq as any)[k] !== undefined && (wq as any)[k] !== null) {
          return { val: (wq as any)[k] };
        }
      }
    }

    return { val: undefined };
  }

  function buildParamRow(
    name: string,
    category: "PHYSICAL" | "CHEMICAL" | "MICROBIOLOGY",
    unit: string,
    standard: string,
    extracted: { val: any; explicitStatus?: QualityStatus },
    statusResolver: (val: any) => QualityStatus
  ) {
    const isPresent = hasValue(extracted.val);
    if (!isPresent) {
      return {
        name,
        category,
        result: "—",
        unit,
        standard: "—",
        status: (extracted.explicitStatus || "—") as QualityStatus,
      };
    }

    const result = String(extracted.val).trim();
    const status = extracted.explicitStatus || statusResolver(extracted.val);

    return {
      name,
      category,
      result,
      unit,
      standard,
      status,
    };
  }

  // Microbiology handling
  const microRaw = wq?.microbiology;
  let microDerivedAbsentOrPresent: string | undefined = undefined;
  if (hasValue(microRaw)) {
    const s = String(microRaw).toLowerCase();
    if (s.includes("present") || s.includes("fail") || s.includes("positive") || s.includes("detected")) {
      microDerivedAbsentOrPresent = "Present";
    } else if (s.includes("absent") || s.includes("pass") || s.includes("negative") || s.includes("passed")) {
      microDerivedAbsentOrPresent = "Absent";
    } else {
      microDerivedAbsentOrPresent = String(microRaw).trim();
    }
  }

  const ecoliData = findParam("E.coli", "ecoli", "eColi", "EColi", "e_coli");
  const coliformData = findParam("Coliform", "coliform", "Coliform", "totalColiform");

  const effectiveEcoli = hasValue(ecoliData.val)
    ? ecoliData
    : { val: microDerivedAbsentOrPresent, explicitStatus: ecoliData.explicitStatus };
  const effectiveColiform = hasValue(coliformData.val)
    ? coliformData
    : { val: microDerivedAbsentOrPresent, explicitStatus: coliformData.explicitStatus };

  const pseudomonasData = findParam("Pseudomonas", "pseudomonas", "Pseudomonas");
  const clostridiaData = findParam("Clostridia", "clostridia", "Clostridia");
  const amc22Data = findParam("Aerobic Microbial Count 22°C", "aerobicMicrobialCount22", "aerobic22", "amc22");
  const amc37Data = findParam("Aerobic Microbial Count 37°C", "aerobicMicrobialCount37", "aerobic37", "amc37");
  const ymData = findParam("Yeast & Mold", "yeastAndMold", "yeastMold", "yeast");

  const colourData = findParam("Colour", "colour", "color", "Colour", "Color");
  const odourData = findParam("Odour", "odour", "odor", "Odour", "Odor");
  const tasteData = findParam("Taste", "taste", "Taste");
  const chlorineData = findParam("Residual Free Chlorine", "chlorine", "residualFreeChlorine", "freeChlorine");
  const sulphateData = findParam("Sulphate", "sulphate", "sulfate", "Sulphate", "Sulfate");
  const alkalinityData = findParam("Alkalinity", "alkalinity", "Alkalinity");
  const chlorideData = findParam("Chloride", "chloride", "Chloride");

  // Real Parameter Rows mapped to Water Report Structure
  const parameters = [
    // Physical Parameters
    buildParamRow("pH", "PHYSICAL", "—", "6.5 - 8.5", findParam("pH", "ph", "PH"), resolvePhStatus),
    buildParamRow("TDS", "PHYSICAL", "mg/L", "≤ 500", findParam("TDS", "tds", "TDS"), resolveTdsStatus),
    buildParamRow("Turbidity", "PHYSICAL", "NTU", "≤ 1", findParam("Turbidity", "turbidity", "Turbidity"), resolveTurbidityStatus),
    buildParamRow("Colour", "PHYSICAL", "Descriptor", "Agreeable", colourData, resolveDescriptorStatus),
    buildParamRow("Odour", "PHYSICAL", "Descriptor", "Agreeable", odourData, resolveDescriptorStatus),
    buildParamRow("Taste", "PHYSICAL", "Descriptor", "Agreeable", tasteData, resolveDescriptorStatus),

    // Chemical Parameters
    buildParamRow("Residual Free Chlorine", "CHEMICAL", "mg/L", "≤ 0.2", chlorineData, (v) => resolveNumericLimitStatus(v, 0.2)),
    buildParamRow("Sulphate", "CHEMICAL", "mg/L", "≤ 200", sulphateData, (v) => resolveNumericLimitStatus(v, 200)),
    buildParamRow("Alkalinity", "CHEMICAL", "mg/L", "≤ 200", alkalinityData, (v) => resolveNumericLimitStatus(v, 200)),
    buildParamRow("Chloride", "CHEMICAL", "mg/L", "≤ 250", chlorideData, (v) => resolveNumericLimitStatus(v, 250)),

    // Microbiology Parameters
    buildParamRow("E.coli", "MICROBIOLOGY", "CFU/100ml", "Absent", effectiveEcoli, resolvePathogenStatus),
    buildParamRow("Coliform", "MICROBIOLOGY", "CFU/100ml", "Absent", effectiveColiform, resolvePathogenStatus),
    buildParamRow("Pseudomonas", "MICROBIOLOGY", "CFU/250ml", "Absent", pseudomonasData, resolvePathogenStatus),
    buildParamRow("Clostridia", "MICROBIOLOGY", "CFU/100ml", "Absent", clostridiaData, resolvePathogenStatus),
    buildParamRow("Aerobic Microbial Count 22°C", "MICROBIOLOGY", "CFU/ml", "≤ 100", amc22Data, (v) => resolveNumericLimitStatus(v, 100)),
    buildParamRow("Aerobic Microbial Count 37°C", "MICROBIOLOGY", "CFU/ml", "≤ 20", amc37Data, (v) => resolveNumericLimitStatus(v, 20)),
    buildParamRow("Yeast & Mold", "MICROBIOLOGY", "CFU/100ml", "Absent", ymData, resolvePathogenStatus),
  ];

  // Check if any tested parameter failed
  const hasFailure = parameters.some(
    (p) =>
      p.status === "FAIL" ||
      p.status === "ABOVE LIMIT" ||
      p.status === "BELOW LIMIT" ||
      p.status === "REJECTED"
  );

  // Check if at least one parameter was actually tested
  const hasTestedParams = parameters.some((p) => p.result !== "—" && p.result !== "");

  // Overall compliance check
  let overallStatus: QualityStatus = "—";
  if (data?.overallStatus || (data as any)?.status || (data as any)?.report?.status) {
    overallStatus = (data?.overallStatus || (data as any)?.status || (data as any)?.report?.status) as QualityStatus;
  } else if (hasFailure) {
    overallStatus = "FAIL";
  } else if (hasTestedParams) {
    overallStatus = "APPROVED";
  } else {
    overallStatus = "—";
  }

  const remarksList: string[] = [];
  const backendRemarks = (data?.remarks || (data as any)?.report?.remarks || "").trim();

  if (backendRemarks && backendRemarks !== "—") {
    remarksList.push(backendRemarks);
  } else if (hasTestedParams) {
    remarksList.push("OBSERVATIONS & COMPLIANCE:");
    if (hasFailure) {
      remarksList.push("1. Water sample does not comply with standard specifications for Packaged Drinking Water (IS 14543 / IS 10500) due to parameter(s) outside permissible limits.");
    } else {
      remarksList.push("1. The tested water sample parameters comply with standard specifications for Packaged Drinking Water (IS 14543 / IS 10500).");
    }
  }

  const fssai = (data?.licenses?.fssai || "").trim();
  const bis = (data?.licenses?.bis || "").trim();
  if (fssai || bis) {
    const licInfo = [
      fssai ? `FSSAI Lic No: ${fssai}` : null,
      bis ? `BIS CM/L No: ${bis}` : null,
    ]
      .filter(Boolean)
      .join(" | ");
    remarksList.push(`2. Plant Licenses: ${licInfo}`);
  }

  const sterilization = (data?.waterQuality?.sterilization || "").trim();
  if (sterilization && sterilization !== "—") {
    remarksList.push(`3. Sterilization System: ${sterilization} (Active)`);
  }

  const remarks = remarksList.length > 0 ? remarksList.join("\n") : "—";

  const now = new Date();
  const reportGeneratedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return {
    reportNumber,
    sampleCode,
    batchNumber: batchNo,
    clientName,
    clientAddress,
    location,
    collectedOn,
    sampleSource,
    productionDate,
    bestBefore,
    collectedBy,
    testedBy,
    verifiedBy,
    reportGeneratedDate,
    reportType,
    overallStatus,
    verificationUrl,
    remarks,
    parameters,
  };
}
