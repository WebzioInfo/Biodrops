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
  request: NextRequest,
  { params }: { params: Promise<{ batchNumber: string }> }
) {
  const { batchNumber } = await params;
  if (!batchNumber) {
    return NextResponse.json(
      { success: false, verified: false, code: "INVALID_BATCH_NUMBER", message: "Batch number parameter is required" },
      { status: 400 }
    );
  }

  const upstreamBase = getUpstreamBaseUrl();
  const upstreamUrl = `${upstreamBase}/api/public/water/batches/${encodeURIComponent(batchNumber)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(upstreamUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    const isTimeout = error.name === "AbortError";
    const errorCode = isTimeout ? "AQUORA_TIMEOUT" : "AQUORA_CONNECTION_FAILED";
    console.error(`[Aquora Batch Verification Proxy Failure] Code: ${errorCode}, Upstream: ${upstreamUrl}, Message: ${error.message}`);

    return NextResponse.json(
      {
        success: false,
        verified: false,
        code: errorCode,
        message: isTimeout
          ? "Aquora batch verification request timed out."
          : "Internal server error verifying batch with Aquora.",
      },
      { status: isTimeout ? 504 : 502 }
    );
  }
}
