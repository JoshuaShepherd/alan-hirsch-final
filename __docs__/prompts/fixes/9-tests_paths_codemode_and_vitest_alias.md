Fix test imports and Vitest config.

1. Create `scripts/codemod-tests-paths.ts`:
   - Replace:
     - `from "apps/alan-hirsch-platform/…"` → `from "@/…"`
     - `from "packages/<name>/src/…"` → appropriate `@/lib/<name-part>/…`
     - Any residual `@platform/*` → `@/lib/*`
   - Only modify under `**/__tests__/**` and `tests/**`.

2. Ensure `vitest.config.ts` has:
   ```ts
   resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } }
   ```

   3. Run: node scripts/codemod-tests-paths.ts
   4. Run: pnpm test -u then paste remaining “Cannot find module …” in tests.

---

## 10) Contracts/mappers/queries guard Tests (gates)

**Prompt:**

```md
Add lightweight gate tests.

Create:

- `src/__tests__/gates/contracts.gate.test.ts`: imports `@/lib/contracts` and asserts existence of `*CreateSchema`, `*UpdateSchema`, `*ResponseSchema` for key entities.
- `src/__tests__/gates/queries.gate.test.ts`: for each queries file, assert exports: getById, list, create, update, remove.
- `src/__tests__/gates/mappers.gate.test.ts`: assert `toDTO`, `fromCreateDTO`, `fromUpdateDTO` exist and are functions.

Run: `pnpm test`. Fix whatever the gates catch

---
```
