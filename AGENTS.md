## Optional Feature Guides

When users request features beyond the base template, check for available recipes in `.kilocode/recipes/`.

## Bun Usage (Required)

This project is Bun-first. Agents should use Bun for install, run, and dependency operations unless a task explicitly requires npm.

### Bun Setup

1. Install Bun (if missing):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
2. Verify installation:
   ```bash
   bun --version
   ```

### Standard Project Commands

- Install dependencies:
  ```bash
  bun install
  ```
- Run development server:
  ```bash
  bun run dev
  ```
- Production build:
  ```bash
  bun run build
  ```
- Start production server:
  ```bash
  bun run start
  ```
- Lint:
  ```bash
  bun run lint
  ```
- Type check:
  ```bash
  bun run typecheck
  ```

### Dependency Management Policy

- Add dependency:
  ```bash
  bun add <package>
  ```
- Add dev dependency:
  ```bash
  bun add -d <package>
  ```
- Remove dependency:
  ```bash
  bun remove <package>
  ```
- Prefer `bun.lock` as the lockfile source of truth.
- Do not run `npm install` or `pnpm install` unless explicitly requested by the user.

### Audit and Compatibility Notes

- Security audit scripts currently use npm commands from `package.json`:
  - `npm run audit:prod`
  - `npm run audit:full`
  - `npm run deps:outdated`
- Use those npm audit scripts only for vulnerability/outdated checks.
- Use Bun for all normal development workflows.

### Troubleshooting

- If `bun run dev` fails with `command not found`, install Bun and reopen shell.
- If server start fails with `listen EPERM` in restricted environments, run outside sandbox or use an allowed port/interface.
- If build fails fetching Google Fonts, use a network-enabled environment or switch fonts to local hosting.

### Available Recipes

| Recipe       | File                                | When to Use                                           |
| ------------ | ----------------------------------- | ----------------------------------------------------- |
| Add Database | `.kilocode/recipes/add-database.md` | When user needs data persistence (users, posts, etc.) |

### How to Use Recipes

1. Read the recipe file when the user requests the feature
2. Follow the step-by-step instructions
3. Update the memory bank after implementing the feature

## Memory Bank Maintenance

After completing the user's request, update the relevant memory bank files:

- `.kilocode/rules/memory-bank/context.md` - Current state and recent changes
- Other memory bank files as needed when architecture, tech stack, or project goals change
