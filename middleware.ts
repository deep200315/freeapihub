import { NextRequest, NextResponse } from "next/server";
import { logInfo } from "@/lib/observability/logger";
import { classifyRequest, normalizeRoutePath } from "@/lib/observability/request-classifier";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function maskIp(ip: string) {
  if (ip === "unknown") {
    return ip;
  }

  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.x.x`;
    }
  }

  if (ip.includes(":")) {
    const parts = ip.split(":");
    return `${parts.slice(0, 2).join(":")}::`;
  }

  return "masked";
}

export function middleware(request: NextRequest) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const pathname = request.nextUrl.pathname;
  const path = normalizeRoutePath(pathname);
  const requestType = classifyRequest(pathname);

  logInfo("request.received", {
    requestId,
    method: request.method,
    path,
    requestType,
    queryCount: request.nextUrl.searchParams.size,
    userAgent: request.headers.get("user-agent") ?? "unknown",
    ip: maskIp(getClientIp(request)),
  });

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const durationMs = Date.now() - startedAt;
  response.headers.set("x-request-id", requestId);

  logInfo("request.forwarded", {
    requestId,
    method: request.method,
    path,
    requestType,
    durationMs,
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
