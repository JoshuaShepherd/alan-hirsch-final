8. Component type fixes (targeted)

Prompt:

Fix component type mismatches flagged in the report.

1. Open all error locations under `src/components/**` and `src/app/**` that mention:
   - wrong render function signatures (e.g., `(value: unknown, item: …) => ReactNode`)
   - props mismatches against DTOs
2. For each, do:
   - Derive props types from DTOs: `type Props = z.infer<typeof XResponseSchema>;`
   - Align render function signatures to the expected library types (e.g., CMDK, Radix).
   - Add explicit generics to callbacks where inference fails.

3. Run: `pnpm type-check` and list remaining component errors.
