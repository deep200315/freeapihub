import { NextRequest, NextResponse } from "next/server";
import { logError, logInfo } from "@/lib/observability/logger";
import { classifyRequest, normalizeRoutePath } from "@/lib/observability/request-classifier";

type AppRouteContext = {
  params?: Promise<Record<string, string | string[] | undefined>>;
};

type RouteHandler<TContext = AppRouteContext | undefined> = (
  request: NextRequest,
  context: TContext
) => Promise<Response>;

export function withApiLogging<TContext = AppRouteContext | undefined>(
  route: string,
  handler: RouteHandler<TContext>
): RouteHandler<TContext> {
  return async (request: NextRequest, context: TContext) => {
    const startedAt = Date.now();
    const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

    try {
      const response = await handler(request, context);
      const durationMs = Date.now() - startedAt;
      const pathname = request.nextUrl.pathname;
      const requestType = classifyRequest(pathname);

      response.headers.set("x-request-id", requestId);

      logInfo("api.request.completed", {
        requestId,
        route,
        method: request.method,
        path: normalizeRoutePath(pathname),
        requestType,
        status: response.status,
        durationMs,
        cacheControl: response.headers.get("cache-control"),
      });

      return response;
    } catch (error) {
      const durationMs = Date.now() - startedAt;
      const pathname = request.nextUrl.pathname;

      logError("api.request.failed", {
        requestId,
        route,
        method: request.method,
        path: normalizeRoutePath(pathname),
        requestType: classifyRequest(pathname),
        durationMs,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      return NextResponse.json(
        {
          error: "Internal server error",
          requestId,
        },
        { status: 500, headers: { "x-request-id": requestId } }
      );
    }
  };
}
