import { NextRequest, NextResponse } from "next/server";

const BQMS_API_URL = process.env.BQMS_API_URL || process.env.NEXT_PUBLIC_BQMS_API_URL || "https://bqms.vercel.app";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ batchNumber: string }> }
) {
  try {
    const { batchNumber } = await params;
    if (!batchNumber) {
      return NextResponse.json(
        { success: false, message: "Batch number parameter is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${BQMS_API_URL}/api/public/verify/${encodeURIComponent(batchNumber)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("Error verifying batch from upstream BQMS API:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error verifying batch" },
      { status: 500 }
    );
  }
}
