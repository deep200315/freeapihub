# Observability and Request Logging

This project now emits structured JSON logs for request analytics in hosting logs (Vercel or similar).

## What Is Logged

- App-level request intake in `middleware.ts`
  - `request.received`
  - `request.forwarded`
- API-level completion/error logs in `src/lib/observability/with-api-logging.ts`
  - `api.request.completed`
  - `api.request.failed`

Each event includes:

- `timestamp`
- `level`
- `service`
- `env`
- `event`
- `requestId`
- `method`
- `path`
- `requestType`

## Request Types

- `api`: `/api/*`
- `page`: user-facing routes (`/`, `/providers/*`, `/compare`)
- `asset`: files with extension
- `next-internal`: `/_next/*`
- `other`: anything else

## Per-Second Request Type Metrics

Use platform log queries to aggregate by second and by `requestType`.

Recommended query dimensions:

- time bucket: 1 second
- group by: `event`, `requestType`, `method`, `path`
- filters:
  - include `event = request.received` for total incoming traffic
  - include `event = api.request.completed` for API status/error rates

## Privacy and Safety

- IP values are masked before logging.
- Request/response bodies are not logged.
- Sensitive headers (auth/cookies) are not logged.

## Correlation

- `x-request-id` is propagated from middleware and attached to API responses.
- Use `requestId` in log search to trace a single request lifecycle.
