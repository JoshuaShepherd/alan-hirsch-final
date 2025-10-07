1. Baseline & guardrails (single app)

You are in a single-app repo with this structure:

- src/app/\*\* (Next.js routes)
- src/lib/contracts/\*\*
- src/lib/database/db/{schema,queries,migrations}/\*\*
- src/lib/mappers/\*\*
- src/lib/services/\*\*
- src/lib/ui/\*\*
- src/lib/types/\*\*
- src/lib/forms/\*\*
- src/components/\*\*
- src/hooks/\*\*

Task:

1. Open root `package.json`, `tsconfig.json`, `vitest.config.*`, `next.config.*`, `tailwind.config.*`, `eslint.*`.
2. Verify:
   - tsconfig: `"baseUrl": "./src"`, alias `@/*` → `["*"]`.
   - vitest alias: `"@/": fileURLToPath(new URL("./src/", import.meta.url))`.
   - Next & Tailwind content globs point at `src/**/*`.
3. Create `scripts/doctor.ts` that checks:
   - baseUrl + alias `@` present and resolvable
   - `src/lib/contracts/index.ts` exists and exports at least 1 schema
   - `src/lib/database/db/queries` exists with ≥1 file
   - `src/lib/services/base.service.ts` exists
   - no `@platform/*` imports remain (scan repo)
   - prints FAIL list and nonzero exit if any fail
4. Run: `pnpm type-check`, `pnpm lint`, `pnpm test -u` and paste the first 30 TypeScript errors grouped by file and category.

Goal: Baseline snapshot + doctor script ready. Do not proceed to codegen yet.
