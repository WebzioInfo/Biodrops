import { NextRequest, NextResponse } from "next/server";

const BQMS_API_URL = process.env.BQMS_API_URL || process.env.NEXT_PUBLIC_BQMS_API_URL || "https://bqms.vercel.app";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${BQMS_API_URL}/api/public/organizations`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: `Upstream BQMS API error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    console.error("Error fetching organizations from upstream BQMS API:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error fetching organizations" },
      { status: 500 }
    );
  }
}
