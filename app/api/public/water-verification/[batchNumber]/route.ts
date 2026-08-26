import { NextRequest, NextResponse } from "next/server";

const AQUORA_PUBLIC_API_URL =
  process.env.AQUORA_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_AQUORA_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ batchNumber: string }> }
) {
  try {
    const { batchNumber } = await params;
    if (!batchNumber) {
      return NextResponse.json(
        { success: false, verified: false, message: "Batch number parameter is required" },
        { status: 400 }
      );
    }

    const upstreamUrl = `${AQUORA_PUBLIC_API_URL}/api/public/water/batches/${encodeURIComponent(batchNumber)}`;

    const res = await fetch(upstreamUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    console.error("Error verifying batch from upstream Aquora Public API:", error);
    return NextResponse.json(
      { success: false, verified: false, message: "Internal server error verifying batch" },
      { status: 500 }
    );
  }
}
