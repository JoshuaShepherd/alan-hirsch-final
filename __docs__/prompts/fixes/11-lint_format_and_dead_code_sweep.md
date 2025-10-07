11. Lint/format + dead code sweep

Prompt:

Clean the tree.

1. Run: `pnpm lint` and fix autofixable issues.
2. Run: `pnpm format`.
3. Add `scripts/find-dead-exports.ts`:
   - Scan `src/**` for exported symbols never imported elsewhere.
   - Print candidates to remove (exclude `app/route` exports and Next special files).

Remove obvious dead exports, then `pnpm type-check` again.
