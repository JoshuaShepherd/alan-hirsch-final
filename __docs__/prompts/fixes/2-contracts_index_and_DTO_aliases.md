2. Contracts index & DTO aliases (fix missing exports)

Prompt:

Fix contracts exports.

1. Create/normalize `src/lib/contracts/index.ts`:
   - Re-export all Zod schemas per entity with consistent names:
     - `<Entity>CreateSchema`, `<Entity>UpdateSchema`, `<Entity>ResponseSchema`, `<Entity>ListResponseSchema`
   - For ergonomics, add DTO aliases (no runtime change):
     - `export const <Entity>CreateDTO = <Entity>CreateSchema`
     - `export const <Entity>UpdateDTO = <Entity>UpdateSchema`
     - `export const <Entity>ResponseDTO = <Entity>ResponseSchema`
     - `export const <Entity>ListResponseDTO = <Entity>ListResponseSchema`
   - Export shared envelopes:
     - `PaginatedResponseSchema`, `ApiErrorSchema`, `OkSchema`, `ResultSchema`
   - Add a `BARREL-GUARD` JSDoc that this file is source-of-truth; other files must import from here.

2. Add a quick validator: `scripts/validate-contract-exports.ts`
   - Scans `src/lib/contracts/**.ts`
   - Ensures every `*.contract.ts` exports the 3+ canonical names
   - Fails CI if mismatched, logs missing names with file paths.

3. Run: `pnpm type-check` and paste any remaining “has no exported member …Schema/DTO” errors (file→symbol).
