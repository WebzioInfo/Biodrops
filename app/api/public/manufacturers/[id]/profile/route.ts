import { NextRequest, NextResponse } from "next/server";

function getUpstreamBaseUrl(): string {
  const url =
    process.env.AQUORA_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_AQUORA_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_AQUORA_API_URL ||
    process.env.AQUORA_API_URL ||
    "https://aquzio.onrender.com";

  return url.trim().replace(/\/+$/, "");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { success: false, code: "INVALID_ID", message: "Manufacturer ID is required." },
      { status: 400 }
    );
  }

  const upstreamBase = getUpstreamBaseUrl();
  const upstreamUrl = `${upstreamBase}/api/public/manufacturers/${encodeURIComponent(id)}/profile`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(upstreamUrl, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        success: false,
        code: isTimeout ? "AQUORA_TIMEOUT" : "AQUORA_CONNECTION_FAILED",
        message: isTimeout
          ? "Aquora upstream API request timed out."
          : "Internal server error connecting to Aquora upstream API.",
      },
      { status: isTimeout ? 504 : 502 }
    );
  }
}

