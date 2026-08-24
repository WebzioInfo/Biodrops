import { WaterReportInputContract } from '../types/report.types';

export const SAMPLE_WATER_REPORT: WaterReportInputContract = {
  reportNumber: "BQMS-2026-0842",
  sampleCode: "WQ-SAMPLE-401",
  batchNumber: "BATCH-2026-08-A",
  clientName: "Biodrops Beverage & Water Labs Ltd",
  clientAddress: "Plot 12, Industrial Estate, Kochi, Kerala - 682030",
  collectedOn: "24 Aug 2026, 09:30 AM",
  sampleSource: "Packaged Drinking Water Line 2",
  location: "Main Bottling Plant",
  productionDate: "24 Aug 2026",
  bestBefore: "24 Sep 2026 (30 Days)",
  collectedBy: "Anas (QC Analyst)",
  testedBy: "Dr. Shadiya (Microbiologist)",
  verifiedBy: "Nisamudeen (Lab Director)",
  reportGeneratedDate: "24 Aug 2026",
  reportType: "Daily",
  overallStatus: "APPROVED",
  verificationUrl: "https://biodrops.com/verify?batch=BATCH-2026-08-A",
  remarks: `OBSERVATIONS:
All physical, chemical, and microbiological parameters tested conform to the standard limits of IS 14543:2018 for Packaged Drinking Water.

CONSULTANT RECOMMENDATIONS:
Continue routine 4-hourly monitoring of pH and ozone residual levels prior to bottling.

SUMMARY:
The water sample is safe, compliant, and fit for commercial distribution.`,
  parameters: [
    // Physical
    { name: "pH", category: "PHYSICAL", result: "7.2", unit: "—", standard: "6.5 - 8.5", status: "PASS" },
    { name: "TDS", category: "PHYSICAL", result: "78", unit: "mg/L", standard: "≤ 500", status: "PASS" },
    { name: "Turbidity", category: "PHYSICAL", result: "0.15", unit: "NTU", standard: "≤ 1", status: "PASS" },
    { name: "Colour", category: "PHYSICAL", result: "Agreeable", unit: "Descriptor", standard: "Agreeable", status: "PASS" },
    { name: "Odour", category: "PHYSICAL", result: "Agreeable", unit: "Descriptor", standard: "Agreeable", status: "PASS" },
    { name: "Taste", category: "PHYSICAL", result: "Agreeable", unit: "Descriptor", standard: "Agreeable", status: "PASS" },

    // Chemical
    { name: "Sulphate", category: "CHEMICAL", result: "12.4", unit: "mg/L", standard: "≤ 200", status: "PASS" },
    { name: "Residual Free Chlorine", category: "CHEMICAL", result: "0", unit: "mg/L", standard: "≤ 0.2", status: "PASS" },
    { name: "Alkalinity", category: "CHEMICAL", result: "34", unit: "mg/L", standard: "≤ 200", status: "PASS" },
    { name: "Chloride", category: "CHEMICAL", result: "18.5", unit: "mg/L", standard: "≤ 250", status: "PASS" },

    // Microbiology
    { name: "E.coli", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS" },
    { name: "Coliform", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS" },
    { name: "Pseudomonas", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/250ml", standard: "Absent", status: "PASS" },
    { name: "Clostridia", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS" },
    { name: "Aerobic Microbial Count 22°C", category: "MICROBIOLOGY", result: "2", unit: "CFU/ml", standard: "≤ 100", status: "PASS" },
    { name: "Aerobic Microbial Count 37°C", category: "MICROBIOLOGY", result: "0", unit: "CFU/ml", standard: "≤ 20", status: "PASS" },
    { name: "Yeast & Mold", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS" },
  ]
};
