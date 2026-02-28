# Security and Dependency Checks

## Bun Setup (Project Local)

Install Bun (if missing):

```bash
curl -fsSL https://bun.sh/install | bash
```

Verify:

```bash
bun --version
```

Install dependencies and run quality checks:

```bash
bun install
bun run typecheck
bun run lint
bun run build
```

## Vulnerability and Dependency Audit

Run production dependency audit:

```bash
npm run audit:prod
```

Run full dependency audit:

```bash
npm run audit:full
```

List outdated packages:

```bash
npm run deps:outdated
```

## Suggested CI Policy

- Run `bun run typecheck` and `bun run lint` on every PR.
- Run `npm run audit:prod` on every PR.
- Block merges on `high` and `critical` vulnerabilities.
