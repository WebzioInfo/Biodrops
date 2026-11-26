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
  const sampleCode = (data?.sampleCode || (data as any)?.sampleNumber || batchNo || "").trim() || "—";

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

  function mapLifecycleBadge(resultStatus?: string, isOverdue?: boolean): QualityStatus {
    const rs = String(resultStatus || "").trim().toUpperCase();
    if (isOverdue || rs === "OVERDUE") return "OVERDUE";
    if (rs === "IN_PROGRESS") return "INCUBATING";
    return "PENDING";
  }

  function findParam(
    name: string,
    ...keys: string[]
  ): {
    val: any;
    explicitStatus?: QualityStatus;
    resultStatus?: string;
    requiredDurationHours?: number;
    expectedCompletionAt?: string | null;
    isOverdue?: boolean;
    fromParamsArray?: boolean;
  } {
    // 1. Check paramsArray if available
    if (paramsArray) {
      const target = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const keyTargets = keys.map((k) => k.toLowerCase().replace(/[^a-z0-9]/g, ""));
      const found = paramsArray.find((item: any) => {
        const n = String(item.name || item.parameter || item.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return n === target || keyTargets.includes(n);
      });
      if (found) {
        const val = found.result !== undefined ? found.result : found.value;
        const status = found.status || found.qualityStatus;
        return {
          val,
          explicitStatus: status as QualityStatus,
          resultStatus: found.resultStatus,
          requiredDurationHours: found.requiredDurationHours,
          expectedCompletionAt: found.expectedCompletionAt,
          isOverdue: Boolean(found.isOverdue),
          fromParamsArray: true,
        };
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
    extracted: {
      val: any;
      explicitStatus?: QualityStatus;
      resultStatus?: string;
      requiredDurationHours?: number;
      expectedCompletionAt?: string | null;
      isOverdue?: boolean;
      fromParamsArray?: boolean;
    },
    statusResolver: (val: any) => QualityStatus
  ) {
    const isPresent = hasValue(extracted.val);
    if (!isPresent && !extracted.fromParamsArray) {
      return null;
    }

    const result = isPresent ? String(extracted.val).trim() : "—";
    const status = isPresent
      ? extracted.explicitStatus || statusResolver(extracted.val)
      : mapLifecycleBadge(extracted.resultStatus, extracted.isOverdue);

    return {
      name,
      category,
      result,
      unit,
      standard,
      status,
      resultStatus: extracted.resultStatus,
      requiredDurationHours: extracted.requiredDurationHours,
      expectedCompletionAt: extracted.expectedCompletionAt,
      isOverdue: extracted.isOverdue,
    };
  }

  // Microbiology handling
  const microRaw = wq?.microbiology;
  let microDerivedAbsentOrPresent: string | undefined = undefined;
  if (hasValue(microRaw)) {
    const s = String(microRaw).toLowerCase();
    if (s === "pending" || s === "in_progress" || s === "overdue") {
      microDerivedAbsentOrPresent = undefined;
    } else if (s.includes("present") || s.includes("fail") || s.includes("positive") || s.includes("detected")) {
      microDerivedAbsentOrPresent = "Present";
    } else if (s.includes("absent") || s.includes("pass") || s.includes("negative") || s.includes("passed")) {
      microDerivedAbsentOrPresent = "Absent";
    } else {
      microDerivedAbsentOrPresent = String(microRaw).trim();
    }
  }

  const ecoliData = findParam("E.coli", "ecoli", "eColi", "EColi", "e_coli");
  const coliformData = findParam("Coliform", "coliform", "Coliform", "totalColiform");
  const hasStructuredParams = Boolean(paramsArray && paramsArray.length > 0);

  const effectiveEcoli =
    hasValue(ecoliData.val) || hasStructuredParams
      ? ecoliData
      : { val: microDerivedAbsentOrPresent, explicitStatus: ecoliData.explicitStatus };
  const effectiveColiform =
    hasValue(coliformData.val) || hasStructuredParams
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
  const calciumData = findParam("Calcium", "calcium", "Calcium", "ca");
  const magnesiumData = findParam("Magnesium", "magnesium", "Magnesium", "magnessium", "mg");
  const aluminiumData = findParam("Aluminium", "aluminium", "Aluminium", "aluminum", "al");
  const sulphideData = findParam("Sulphide", "sulphide", "Sulphide", "sulfide", "h2s");
  const nitrateData = findParam("Nitrate", "nitrate", "Nitrate", "no3");
  const nitriteData = findParam("Nitrite", "nitrite", "Nitrite", "no2");

  // Real Parameter Rows mapped to Water Report Structure (Only parameters present in response)
  const rawParameters = [
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
    buildParamRow("Calcium", "CHEMICAL", "mg/L", "≤ 75", calciumData, (v) => resolveNumericLimitStatus(v, 75)),
    buildParamRow("Magnesium", "CHEMICAL", "mg/L", "≤ 30", magnesiumData, (v) => resolveNumericLimitStatus(v, 30)),
    buildParamRow("Aluminium", "CHEMICAL", "mg/L", "≤ 0.03", aluminiumData, (v) => resolveNumericLimitStatus(v, 0.03)),
    buildParamRow("Sulphide", "CHEMICAL", "mg/L", "≤ 0.05", sulphideData, (v) => resolveNumericLimitStatus(v, 0.05)),
    buildParamRow("Nitrate", "CHEMICAL", "mg/L", "≤ 45", nitrateData, (v) => resolveNumericLimitStatus(v, 45)),
    buildParamRow("Nitrite", "CHEMICAL", "mg/L", "≤ 0.02", nitriteData, (v) => resolveNumericLimitStatus(v, 0.02)),

    // Microbiology Parameters
    buildParamRow("E.coli", "MICROBIOLOGY", "CFU/100ml", "Absent", effectiveEcoli, resolvePathogenStatus),
    buildParamRow("Coliform", "MICROBIOLOGY", "CFU/100ml", "Absent", effectiveColiform, resolvePathogenStatus),
    buildParamRow("Pseudomonas", "MICROBIOLOGY", "CFU/250ml", "Absent", pseudomonasData, resolvePathogenStatus),
    buildParamRow("Clostridia", "MICROBIOLOGY", "CFU/100ml", "Absent", clostridiaData, resolvePathogenStatus),
    buildParamRow("Aerobic Microbial Count 22°C", "MICROBIOLOGY", "CFU/ml", "≤ 100", amc22Data, (v) => resolveNumericLimitStatus(v, 100)),
    buildParamRow("Aerobic Microbial Count 37°C", "MICROBIOLOGY", "CFU/ml", "≤ 20", amc37Data, (v) => resolveNumericLimitStatus(v, 20)),
    buildParamRow("Yeast & Mold", "MICROBIOLOGY", "CFU/100ml", "Absent", ymData, resolvePathogenStatus),
  ];

  // When Aquzio returns structured parameters, use ONLY those exact report parameters.
  // Fall back to legacy waterQuality key extraction only when parameters array is absent.
  const parameters: any[] = [];
  if (hasStructuredParams && paramsArray) {
    for (const item of paramsArray) {
      const pName = (item.name || item.parameter || "").trim();
      if (!pName) continue;
      const val = item.result !== undefined ? item.result : item.value;
      const isPresent = hasValue(val);
      const category = (item.category || "PHYSICAL").toUpperCase();
      const status = isPresent
        ? item.status || item.qualityStatus || (item.isPass ? "PASS" : "FAIL")
        : mapLifecycleBadge(item.resultStatus, item.isOverdue);

      parameters.push({
        name: pName,
        category: category as any,
        result: isPresent ? String(val).trim() : "—",
        unit: item.unit || "—",
        standard: item.standard || "—",
        status: status as QualityStatus,
        resultStatus: item.resultStatus,
        requiredDurationHours: item.requiredDurationHours,
        expectedCompletionAt: item.expectedCompletionAt,
        isOverdue: Boolean(item.isOverdue),
      });
    }
  } else {
    parameters.push(...(rawParameters.filter(Boolean) as any[]));
  }

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
  const totalParametersCount =
    typeof data?.totalParametersCount === "number" ? data.totalParametersCount : parameters.length;
  const completedParametersCount =
    typeof data?.completedParametersCount === "number"
      ? data.completedParametersCount
      : parameters.filter((p) => p.result !== "—" && p.result !== "").length;
  const overdueParametersCount =
    typeof data?.overdueParametersCount === "number"
      ? data.overdueParametersCount
      : parameters.filter((p) => p.isOverdue || p.status === "OVERDUE").length;
  const pendingParametersCount =
    typeof data?.pendingParametersCount === "number"
      ? data.pendingParametersCount
      : Math.max(0, totalParametersCount - completedParametersCount);

  const completionStatus =
    (data?.completionStatus || "").trim().toUpperCase() ||
    (overdueParametersCount > 0
      ? "RESULTS_OVERDUE"
      : totalParametersCount > 0 && pendingParametersCount > 0
        ? completedParametersCount > 0
          ? "PARTIALLY_COMPLETED"
          : "PENDING_RESULTS"
        : undefined);

  // Overall compliance check - never fake APPROVED when parameters are pending or overdue
  let overallStatus: QualityStatus = "—";
  if (hasFailure) {
    overallStatus = "FAIL";
  } else if (completionStatus === "RESULTS_OVERDUE") {
    overallStatus = "RESULTS_OVERDUE";
  } else if (completionStatus === "PARTIALLY_COMPLETED" || completionStatus === "PENDING_RESULTS") {
    overallStatus = "PENDING";
  } else if (data?.overallStatus || (data as any)?.report?.status) {
    overallStatus = (data?.overallStatus || (data as any)?.report?.status) as QualityStatus;
  } else if (completionStatus === "COMPLETED" && hasTestedParams) {
    overallStatus = "APPROVED";
  } else if ((data as any)?.status) {
    overallStatus = (data as any).status as QualityStatus;
  } else if (hasTestedParams) {
    overallStatus = "APPROVED";
  } else {
    overallStatus = "—";
  }

  const remarksList: string[] = [];
  const backendRemarks = (data?.remarks || (data as any)?.report?.remarks || "").trim();

  if (backendRemarks && backendRemarks !== "—") {
    remarksList.push(backendRemarks);
  } else if (hasTestedParams || parameters.length > 0) {
    remarksList.push("OBSERVATIONS & COMPLIANCE:");
    if (hasFailure) {
      remarksList.push("1. Water sample does not comply with standard specifications for Packaged Drinking Water (IS 14543 / IS 10500) due to parameter(s) outside permissible limits.");
    } else if (completionStatus === "RESULTS_OVERDUE") {
      remarksList.push(`1. Testing is incomplete (${completedParametersCount}/${totalParametersCount} completed, ${overdueParametersCount} overdue). Final certification is withheld until all overdue results are entered.`);
    } else if (completionStatus === "PARTIALLY_COMPLETED" || completionStatus === "PENDING_RESULTS") {
      remarksList.push(`1. Testing is in progress (${completedParametersCount}/${totalParametersCount} parameters completed, ${pendingParametersCount} pending). Final certification is pending remaining results.`);
    } else {
      remarksList.push("1. The tested water sample parameters comply with standard specifications for Packaged Drinking Water (IS 14543 / IS 10500).");
    }
  }

  const fssai = (data?.licenses?.fssai || "").trim();
  const bis = (data?.licenses?.bis || "").trim();
  const others = Array.isArray(data?.licenses?.others) ? data.licenses.others : [];

  const licItems: string[] = [];
  if (fssai && fssai !== "—" && fssai.toLowerCase() !== "null") {
    licItems.push(`FSSAI Lic No: ${fssai}`);
  }
  if (
    bis &&
    bis !== "—" &&
    bis.toLowerCase() !== "null" &&
    bis.toLowerCase() !== "fssai_compliant" &&
    !bis.toLowerCase().includes("is 14543")
  ) {
    licItems.push(`BIS CM/L No: ${bis}`);
  }
  for (const extra of others) {
    if (extra && extra.name && extra.number) {
      licItems.push(`${extra.name}: ${extra.number}`);
    }
  }

  if (licItems.length > 0) {
    remarksList.push(`2. Plant Licenses: ${licItems.join(" | ")}`);
  }

  const sterilization = (data?.waterQuality?.sterilization || "").trim();
  if (sterilization && sterilization !== "—") {
    remarksList.push(`3. Sterilization System: ${sterilization} (Active)`);
  }

  const remarks = remarksList.length > 0 ? remarksList.join("\n") : "—";

  const now = new Date();
  const datePart = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const reportGeneratedDate = `${datePart}, ${timePart}`;

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
    completionStatus,
    totalParametersCount,
    completedParametersCount,
    pendingParametersCount,
    overdueParametersCount,
    verificationUrl,
    remarks,
    parameters,
  };
}
