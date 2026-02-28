# CI/CD Pipeline Guide (Next.js + Bun)

This repository uses a PR-only, multi-stage GitHub Actions pipeline aligned to:

- `feature/*` -> `dev`
- `dev` -> `staging`
- `staging` -> `main`

## Workflow Files

- `.github/workflows/ci-dev.yml`
- `.github/workflows/ci-staging.yml`
- `.github/workflows/ci-production.yml`

## Stage Behavior

### Stage 1: Feature -> Dev

Trigger: Pull request to `dev`

Checks:

- Bun setup + `bun install --frozen-lockfile`
- Lint (`bun run lint`)
- Type check (`bun run type-check`)
- Format check (`bun run format:check`)
- Unit tests + coverage (`bun run test:coverage`)
- Coverage gate >= 75%
- Next.js build validation (`bun run build`)
- Dependency review, Bun/npm audit, secret scan
- CodeQL analysis

### Stage 2: Dev -> Staging

Trigger: Pull request to `staging`

Checks:

- All stage-1 quality/security checks
- Optimized production build
- Integration tests (`bun run test:integration`)
- Docker build/scan if `Dockerfile` exists
- Smoke tests against staging URL (`STAGING_BASE_URL`)

### Stage 3: Staging -> Main

Trigger: Pull request to `main`

Checks:

- All prior checks
- Production build verification
- E2E tests (Playwright)
- Lighthouse CI performance gate (>= 0.80)
- Final security gates (dependency review, audit, secret scan)
- CodeQL

## Branch Protection Checklist

Configure in GitHub Settings -> Branches.

### `dev`

- Require pull request before merging
- Require 1 approval
- Require status checks to pass
- Require branch up to date before merge
- Restrict direct pushes

### `staging`

- Require pull request before merging
- Require 1 approval
- Require status checks to pass
- Require branch up to date
- Restrict direct pushes

### `main`

- Require pull request before merging
- Require 1 approval
- Require status checks to pass
- Require branch up to date
- Require conversation resolution
- Include administrators
- Restrict push access
- Auto-dismiss stale reviews

## GitHub Environment Setup

Create environments:

- `development`
- `staging`
- `production`

## Secret Configuration Guide

Set these in environment secrets (recommended) or repository secrets:

### development

- Variable: `NEXT_PUBLIC_DEV_API_URL` (optional in current setup)
- Secret: `DEV_DATABASE_URL` (optional; keep unset if no DB)
- Other dev-only app secrets (optional)

### staging

- Variable: `NEXT_PUBLIC_STAGING_API_URL` = `https://freeapihub-git-staging-deeptanush-kapakas-projects.vercel.app/`
- Variable: `STAGING_BASE_URL` = `https://freeapihub-git-staging-deeptanush-kapakas-projects.vercel.app/`
- Secret: `STAGING_DATABASE_URL` (optional; keep unset if no DB)
- Other staging app secrets (optional)

### production

- Variable: `NEXT_PUBLIC_PROD_API_URL` = `https://freeapihub.xyz`
- Secret: `PROD_DATABASE_URL` (optional; keep unset if no DB)
- Other production app secrets (optional)

## Current Project-Specific Environment Plan (No DB)

This app currently has no database integration. Recommended setup:

- Do not set `DEV_DATABASE_URL`, `STAGING_DATABASE_URL`, `PROD_DATABASE_URL` yet.
- Only add DB secrets when DB code is introduced.
- Keep API URL variables set to your canonical domains above for client-side configuration consistency.
- No Vercel secrets are required in GitHub Actions when using Vercel Git Integration auto-deploy.

## Notes

- Deployment is handled by Vercel Git Integration (automatic on branch updates).
- Docker checks are automatically skipped unless a `Dockerfile` is present.
