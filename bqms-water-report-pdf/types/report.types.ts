/**
 * BQMS / Biodrops Water Report PDF Types & Data Contract
 */

export type ParameterCategory = 'PHYSICAL' | 'CHEMICAL' | 'MICROBIOLOGY';

export type QualityStatus = 
  | 'PASS' 
  | 'FAIL' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'WITHIN LIMIT' 
  | 'WITHIN LIMITS' 
  | 'ABOVE LIMIT' 
  | 'ABOVE LIMITS' 
  | 'ABOVE MAXIMUM' 
  | 'BELOW LIMIT' 
  | 'BELOW LIMITS' 
  | 'BELOW MINIMUM' 
  | 'WARNING' 
  | 'NOT TESTED' 
  | 'NOT ENTERED'
  | string;

/**
 * Standard parameter definition used for validation and standard limit ranges.
 */
export interface ParameterDef {
  id: string;
  name: string;
  category: ParameterCategory;
  unit: string;
  minAcceptable: number | null;
  maxAcceptable: number | null;
  defaultMethod?: string;
}

/**
 * Single parameter result item
 */
export interface ResultValue {
  parameterId?: string;
  parameterName?: string;
  category?: ParameterCategory;
  unit?: string;
  value?: number | string | null;
  stringValue?: string | null;
  isPass?: boolean;
  qualityStatus?: QualityStatus;
  standard?: string;
  remarks?: string;
}

/**
 * Standard dictionary of metadata fields displayed in the header information box.
 */
export interface WaterReportMetadata {
  /** Report number or ID (e.g. "RPT-2026-001" or "84A12B90") */
  "Report Number"?: string;
  /** Sample identifier / batch number (e.g. "B-9842" or "WQ-401") */
  "Sample Code"?: string;
  /** Client or organization name */
  "Customer / Client"?: string;
  /** Legacy alias for Customer / Client */
  "Company"?: string;
  /** Customer / Client address if available */
  "Customer Address"?: string;
  /** Legacy alias for Customer Address */
  "Address"?: string;
  /** Date and time when the sample was collected */
  "Collected On"?: string;
  /** Legacy alias for Collected On */
  "Sample Time"?: string;
  /** Source of water sample (e.g. "Raw Water Borewell", "RO Permeate", "Final Product") */
  "Sample Source"?: string;
  /** Facility or plant location */
  "Location"?: string;
  /** Production / Manufacturing Date (e.g. "24 Aug 2026") */
  "Production Date"?: string;
  /** Legacy alias for Production Date */
  "Manufacturing Date"?: string;
  /** Expiration or Best Before duration (e.g. "24 Sep 2026 (30 Days)") */
  "Best Before"?: string;
  /** Batch Number for verification QR code and footer matching */
  "Batch Number"?: string;
  /** Person or team who collected the sample (e.g. "QC Team") */
  "Collected By"?: string;
  /** Person or analyst who performed testing (e.g. "QC Specialist") */
  "Tested By"?: string;
  /** Person who authorized or verified report (e.g. "Lab In-Charge") */
  "Verified By"?: string;
  /** Date when the report was issued (defaults to current date if omitted) */
  "Report Generated"?: string;
  /** Frequency / Type of report (e.g. "Daily", "Four Hourly pH", "Weekly", "Monthly") */
  "Report Type"?: string;
  /** Overall compliance status (e.g. "APPROVED", "PASS", "FAIL", "REJECTED") */
  "Overall Status"?: QualityStatus;
  /** Legacy alias for Overall Status */
  "Report Status"?: QualityStatus;
  /** Custom QR Code verification URL. If not provided, falls back to standard verify URL */
  "Verification URL"?: string;
  /** Observations, non-conformance notes, or consultant recommendations */
  "Remarks"?: string;
  /** Catch-all for additional key-value metadata */
  [key: string]: string | undefined;
}

/**
 * Raw internal table data format consumed directly by pdfmake document definition.
 * Each row corresponds to: [ParameterName, Category, ResultDisplay, Unit, StandardRange, Status]
 */
export interface WaterReportData {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  metadata?: Record<string, string>;
}

/**
 * High-Level, Strongly-Typed Data Contract for Biodrops Integration.
 * Pass this object to `generateWaterReportPdfBuffer` or `downloadWaterReportPdf`.
 */
export interface WaterReportInputContract {
  reportNumber: string;
  sampleCode?: string;
  batchNumber?: string;
  clientName: string;
  clientAddress?: string;
  collectedOn?: string;
  sampleSource?: string;
  location?: string;
  productionDate?: string;
  bestBefore?: string;
  collectedBy?: string;
  testedBy?: string;
  verifiedBy?: string;
  reportGeneratedDate?: string;
  reportType?: string;
  overallStatus?: QualityStatus;
  verificationUrl?: string;
  remarks?: string;

  /**
   * Array of parameter results. If omitted, will be constructed from static defaults.
   */
  parameters: {
    name: string;
    category: ParameterCategory;
    result: string | number;
    unit?: string;
    standard?: string;
    status?: QualityStatus;
  }[];
}
