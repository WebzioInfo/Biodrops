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

export async function GET(request: NextRequest) {
  const upstreamBase = getUpstreamBaseUrl();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  const upstreamParams = new URLSearchParams();
  if (search) upstreamParams.set("search", search);
  if (page) upstreamParams.set("page", page);
  if (pageSize) upstreamParams.set("pageSize", pageSize);

  const queryString = upstreamParams.toString() ? `?${upstreamParams.toString()}` : "";
  const upstreamUrl = `${upstreamBase}/api/public/manufacturers${queryString}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(upstreamUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`[Aquora Upstream Error] URL: ${upstreamUrl}, Status: ${res.status}, StatusText: ${res.statusText}`);
      return NextResponse.json(
        {
          success: false,
          code: "AQUORA_HTTP_ERROR",
          message: `Upstream Aquora Public API error: ${res.statusText}`,
          statusCode: res.status,
        },
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
    const isTimeout = error.name === "AbortError";
    const errorCode = isTimeout ? "AQUORA_TIMEOUT" : "AQUORA_CONNECTION_FAILED";
    console.error(`[Aquora Proxy Failure] Code: ${errorCode}, Upstream: ${upstreamUrl}, Message: ${error.message}`);

    return NextResponse.json(
      {
        success: false,
        code: errorCode,
        message: isTimeout
          ? "Aquora upstream API request timed out."
          : "Internal server error connecting to Aquora upstream API.",
      },
      { status: isTimeout ? 504 : 502 }
    );
  }
}
