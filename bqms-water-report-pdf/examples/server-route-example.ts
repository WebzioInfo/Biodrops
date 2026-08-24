import { NextRequest, NextResponse } from "next/server";
import { generateWaterReportPdfBuffer } from "../utils/generator";
import { SAMPLE_WATER_REPORT } from "./sample-data";

/**
 * Next.js App Router Route Handler (e.g. app/api/reports/[id]/download/route.ts)
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Fetch your dynamic report data from database in Biodrops...
    // const report = await db.waterReport.findUnique(...);
    const reportContract = SAMPLE_WATER_REPORT;

    // 2. Generate PDF binary buffer
    const buffer = await generateWaterReportPdfBuffer(reportContract);

    // 3. Return streaming PDF response
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="water_report_${reportContract.batchNumber || reportContract.reportNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
