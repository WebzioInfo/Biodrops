# Water Report PDF Module — Transfer & Integration Guide for Biodrops

This directory (`bqms-water-report-pdf/`) is the complete, standalone, self-contained Water Quality Test Certificate / Report PDF generator extracted from the BQMS codebase.

---

## 1. Quick Integration Steps for Biodrops

### Step 1: Copy this folder
Copy the entire `bqms-water-report-pdf/` directory directly into your Biodrops project (e.g. into `src/lib/water-report-pdf/` or `lib/water-report-pdf/`).

```text
biodrops/
└── src/
    └── lib/
        └── water-report-pdf/
            ├── README.md
            ├── package-dependencies.md
            ├── index.ts
            ├── types/
            │   └── report.types.ts
            ├── core/
            │   ├── index.ts
            │   ├── PDFTheme.ts
            │   ├── ReportHeader.ts
            │   ├── ReportInfo.ts
            │   ├── SectionHeader.ts
            │   ├── ParameterTable.ts
            │   ├── StatusBadge.ts
            │   ├── SignatureSection.ts
            │   ├── RemarksSection.ts
            │   ├── Footer.ts
            │   └── Watermark.ts
            ├── assets/
            │   └── images.ts
            ├── utils/
            │   ├── generator.ts
            │   ├── formatters.ts
            │   └── staticParameters.ts
            └── examples/
                ├── sample-data.ts
                ├── client-usage-example.tsx
                └── server-route-example.ts
```

### Step 2: Install Required Dependencies
In the Biodrops project root:

```bash
npm install pdfmake@^0.3.11 date-fns@^4.4.0
npm install --save-dev @types/pdfmake@^0.3.3
```

---

## 2. Package Dependencies & Versions

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `pdfmake` | `^0.3.11` | Core client and server PDF generation engine |
| `@types/pdfmake` | `^0.3.3` | TypeScript typing definitions |
| `date-fns` | `^4.4.0` (or `^3.x`) | Date formatting utilities |

---

## 3. Fonts and Assets Architecture

* **Fonts**: `pdfmake` includes standard **Roboto** fonts (`Roboto-Regular`, `Roboto-Medium`, `Roboto-Italic`, `Roboto-MediumItalic`) pre-bundled in `pdfmake/build/vfs_fonts`. No font files need to be copied to filesystem disks.
* **Images / Logos / Banners**: All visual assets are pre-encoded in high-resolution Base64 inside `assets/images.ts`. This includes:
  - Header Banner (`PDF_IMAGES.headerBanner` — Biofix WaterLab branding, BIS / NABL badges, accreditation marks)
  - Watermark Seal (`PDF_IMAGES.biofixLogo` — 3.5% opacity centered background seal)
  - Authorized Signatories Banner (`PDF_IMAGES.signatureSectionBanner` — Lab Director, Quality Control Manager, Chief Chemist)
  - Footer Badges (`stateEmblem`, `isoLogo`, `msmeLogo`, `keralaPcb`, `lifeLogo`)
  - Signatures (`sigNisamudeen`, `sigShadiya`, `sigSulfikar`)

---

## 4. Environment Variables

* **No mandatory environment variables** are required for PDF generation.
* If you generate dynamic verification URLs pointing to your production domain, you can optionally configure:
  ```env
  NEXT_PUBLIC_APP_URL=https://biodrops.com
  ```

---

## 5. Public API & Generation Functions

Import from `index.ts`:

```ts
import {
  generateWaterReportPdfBuffer, // For Server / API Routes / Node.js
  downloadWaterReportPdf,        // For Browser / Client Components
  getWaterReportDocumentDefinition // For custom pdfmake handling
} from "@/lib/water-report-pdf";
```

### A. Client-Side Generation (Instant In-Browser Download)

In any React / Next.js Client Component (`"use client"`):

```tsx
"use client";

import React, { useState } from "react";
import { downloadWaterReportPdf } from "@/lib/water-report-pdf";

export function DownloadButton({ reportData }: { reportData: any }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadWaterReportPdf(reportData);
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Generating PDF..." : "Download Report"}
    </button>
  );
}
```

### B. Server-Side Generation (Next.js API Route / Node Endpoint)

In a Next.js App Router Route Handler (e.g. `app/api/reports/[id]/pdf/route.ts`):

```ts
import { NextRequest, NextResponse } from "next/server";
import { generateWaterReportPdfBuffer } from "@/lib/water-report-pdf";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // 1. Fetch your report data from database in Biodrops...
  const reportContract = {
    reportNumber: "BIO-2026-001",
    clientName: "Biodrops Water Co.",
    batchNumber: "B-2026-08",
    parameters: [
      { name: "pH", category: "PHYSICAL", result: "7.4", unit: "—", standard: "6.5 - 8.5", status: "PASS" },
      { name: "TDS", category: "PHYSICAL", result: "65", unit: "mg/L", standard: "≤ 500", status: "PASS" },
    ]
  };

  // 2. Generate binary Buffer
  const buffer = await generateWaterReportPdfBuffer(reportContract);

  // 3. Return streaming PDF response
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="report_${id}.pdf"`,
    },
  });
}
```

---

## 6. TypeScript Data Contract

You can supply data to the PDF in two ways:

### Option 1: High-Level Contract (`WaterReportInputContract`) — (Recommended for Biodrops)

```ts
import { WaterReportInputContract } from "@/lib/water-report-pdf";

const inputData: WaterReportInputContract = {
  reportNumber: "RPT-2026-8801",
  sampleCode: "SMP-001",
  batchNumber: "BATCH-441",
  clientName: "Biodrops Industries",
  clientAddress: "Industrial Zone, Kochi, Kerala",
  collectedOn: "24 Aug 2026, 10:00 AM",
  sampleSource: "Packaged Drinking Water",
  location: "Plant #1",
  productionDate: "24 Aug 2026",
  bestBefore: "24 Sep 2026 (30 Days)",
  collectedBy: "QC Inspector",
  testedBy: "QC Chemist",
  verifiedBy: "Lab Manager",
  reportGeneratedDate: "24 Aug 2026",
  reportType: "Daily",
  overallStatus: "APPROVED", // "APPROVED" | "PASS" | "FAIL" | "REJECTED"
  verificationUrl: "https://biodrops.com/verify?batch=BATCH-441",
  remarks: "OBSERVATIONS:\nAll parameters tested conform to standard specifications.",
  parameters: [
    { name: "pH", category: "PHYSICAL", result: "7.1", unit: "—", standard: "6.5 - 8.5", status: "PASS" },
    { name: "TDS", category: "PHYSICAL", result: "82", unit: "mg/L", standard: "≤ 500", status: "PASS" },
    { name: "Turbidity", category: "PHYSICAL", result: "0.2", unit: "NTU", standard: "≤ 1", status: "PASS" },
    { name: "Sulphate", category: "CHEMICAL", result: "15", unit: "mg/L", standard: "≤ 200", status: "PASS" },
    { name: "Residual Free Chlorine", category: "CHEMICAL", result: "0", unit: "mg/L", standard: "≤ 0.2", status: "PASS" },
    { name: "E.coli", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS" },
    { name: "Coliform", category: "MICROBIOLOGY", result: "Absent", unit: "CFU/100ml", standard: "Absent", status: "PASS" },
  ]
};
```

### Option 2: Raw Table Contract (`WaterReportData`) — (Direct BQMS Format)

```ts
import { WaterReportData } from "@/lib/water-report-pdf";

const rawData: WaterReportData = {
  title: "WATER QUALITY CONTROL TEST CERTIFICATE",
  metadata: {
    "Report Number": "RPT-2026-8801",
    "Customer / Client": "Biodrops Industries",
    "Batch Number": "BATCH-441",
    "Production Date": "24 Aug 2026",
    "Sample Time": "24 Aug 2026, 10:00 AM",
    "Report Type": "Daily",
    "Overall Status": "APPROVED",
    "Remarks": "Sample complies with standard specifications."
  },
  headers: ["Parameter", "Category", "Result", "Unit", "Standard", "Status"],
  rows: [
    ["pH", "PHYSICAL", "7.1", "—", "6.5 - 8.5", "PASS"],
    ["TDS", "PHYSICAL", "82", "mg/L", "≤ 500", "PASS"],
    ["E.coli", "MICROBIOLOGY", "Absent", "CFU/100ml", "Absent", "PASS"]
  ]
};
```

---

## 7. How QR Code Verification Works

1. The QR code is rendered natively in vector format inside the PDF via `pdfmake`'s built-in `{ qr: text, fit: 56 }` element.
2. By default, it generates a QR code pointing to:
   `https://bqms.vercel.app/KNOWYOURWATER?batch=<BatchNumber>`
3. To customize the verification destination in Biodrops, pass `verificationUrl` in the data contract:
   `verificationUrl: "https://biodrops.com/verify?batch=BATCH-123"`

---

## 8. Original BQMS Source Files Reference

The following files in the BQMS repository were audited and transferred into this package:

| Original BQMS Source File | Destination in Transfer Package | Function / Role |
| :--- | :--- | :--- |
| `src/lib/pdf/index.ts` | `core/index.ts` | Master document definition assembler |
| `src/lib/pdf/PDFTheme.ts` | `core/PDFTheme.ts` | Colors, styles, and font definitions |
| `src/lib/pdf/ReportHeader.ts` | `core/ReportHeader.ts` | Top banner with Biofix WaterLab branding |
| `src/lib/pdf/ReportInfo.ts` | `core/ReportInfo.ts` | Metadata grid + QR Code verification card |
| `src/lib/pdf/SectionHeader.ts` | `core/SectionHeader.ts` | Category section header bar & title |
| `src/lib/pdf/ParameterTable.ts` | `core/ParameterTable.ts` | Physical, Chemical & Microbiology tables & BIS methods |
| `src/lib/pdf/StatusBadge.ts` | `core/StatusBadge.ts` | PASS / FAIL / WITHIN LIMIT status badges |
| `src/lib/pdf/SignatureSection.ts` | `core/SignatureSection.ts` | Authorized signatories banner |
| `src/lib/pdf/RemarksSection.ts` | `core/RemarksSection.ts` | Multi-section remarks & consultant signature |
| `src/lib/pdf/Footer.ts` | `core/Footer.ts` | Multi-page footer with certification badges & address |
| `src/lib/pdf/Watermark.ts` | `core/Watermark.ts` | Centered 3.5% opacity background watermark |
| `src/lib/pdf/images.ts` | `assets/images.ts` | Base64 encoded assets, logos, and banners |
| `src/lib/reports.ts` | `utils/generator.ts` | Server-side Buffer generation logic |
| `src/app/(dashboard)/test-reports/[id]/client.tsx` | `utils/generator.ts` | Client-side in-browser download logic |
| `src/app/(dashboard)/test-reports/components/types.ts` | `types/report.types.ts` & `utils/staticParameters.ts` | Parameter list and type definitions |
| `src/app/api/public/verify/[batchNumber]/download/route.ts` | `examples/server-route-example.ts` | Public API Route Handler |
| `src/app/api/test-reports/[id]/export/route.ts` | `examples/server-route-example.ts` | Authenticated export API Route Handler |
