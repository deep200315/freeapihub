export type RequestType = "api" | "page" | "asset" | "next-internal" | "other";

export function classifyRequest(pathname: string): RequestType {
  if (pathname.startsWith("/api/") || pathname === "/api") {
    return "api";
  }

  if (pathname.startsWith("/_next/")) {
    return "next-internal";
  }

  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return "asset";
  }

  if (pathname === "/" || pathname.startsWith("/providers") || pathname.startsWith("/compare")) {
    return "page";
  }

  return "other";
}

export function normalizeRoutePath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return "/";
  }

  const normalizedParts = parts.map((segment, index) => {
    const isApiResourceId = index > 1 && parts[0] === "api";
    const isProviderSlug = parts[0] === "providers" && index === 1;
    const looksDynamic = /^[a-zA-Z0-9_-]{8,}$/.test(segment) || /^\d+$/.test(segment);

    if ((isApiResourceId || isProviderSlug) && looksDynamic) {
      return "[param]";
    }

    return segment;
  });

  return `/${normalizedParts.join("/")}`;
}
