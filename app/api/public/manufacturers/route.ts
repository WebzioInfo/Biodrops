import { NextRequest, NextResponse } from "next/server";

const AQUORA_PUBLIC_API_URL =
  process.env.AQUORA_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_AQUORA_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    const upstreamParams = new URLSearchParams();
    if (search) upstreamParams.set("search", search);
    if (page) upstreamParams.set("page", page);
    if (pageSize) upstreamParams.set("pageSize", pageSize);

    const queryString = upstreamParams.toString() ? `?${upstreamParams.toString()}` : "";
    const upstreamUrl = `${AQUORA_PUBLIC_API_URL}/api/public/manufacturers${queryString}`;

    const res = await fetch(upstreamUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: `Upstream Aquora Public API error: ${res.statusText}` },
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
    console.error("Error fetching manufacturers from upstream Aquora Public API:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error fetching manufacturers" },
      { status: 500 }
    );
  }
}
