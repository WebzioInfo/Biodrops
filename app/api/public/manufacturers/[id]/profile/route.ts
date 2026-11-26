import { NextRequest, NextResponse } from "next/server";

function getUpstreamBaseUrl(): string {
  const url =
    process.env.AQUORA_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_AQUORA_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_AQUORA_API_URL ||
    process.env.AQUORA_API_URL ||
    "https://aquora-backend.webziointernational.in";

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

    const rawText = await res.text();
    let data: unknown = null;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      return NextResponse.json(
        data ?? {
          success: false,
          code: "AQUORA_HTTP_ERROR",
          message: `Upstream Aquora Public API error: ${res.status} ${res.statusText}`,
        },
        { status: res.status }
      );
    }

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

