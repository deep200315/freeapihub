type LogLevel = "info" | "warn" | "error";

export type LogFields = {
  requestId?: string;
  requestType?: string;
  method?: string;
  path?: string;
  route?: string;
  status?: number;
  durationMs?: number;
  userAgent?: string;
  queryCount?: number;
  cacheControl?: string | null;
  error?: string;
  [key: string]: unknown;
};

const SERVICE_NAME = "freeapihub-web";

function baseEvent(level: LogLevel, event: string, fields?: LogFields) {
  return {
    timestamp: new Date().toISOString(),
    level,
    service: SERVICE_NAME,
    env: process.env.NODE_ENV ?? "development",
    event,
    ...fields,
  };
}

function write(level: LogLevel, event: string, fields?: LogFields) {
  const payload = baseEvent(level, event, fields);
  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.log(line);
}

export function logInfo(event: string, fields?: LogFields) {
  write("info", event, fields);
}

export function logWarn(event: string, fields?: LogFields) {
  write("warn", event, fields);
}

export function logError(event: string, fields?: LogFields) {
  write("error", event, fields);
}
