7. Services ← queries + mappers + contracts (full alignment)

Prompt:

Align services with standardized layers.

1. In each `src/lib/services/*.ts`:
   - Import contracts from `@/lib/contracts`
   - Import queries from `@/lib/database/db/queries/<entity>.queries`
   - Import mappers from `@/lib/mappers/<entity>`
   - Extend `BaseService<TEntityDTO>`
   - Implement abstract CRUD: `get`, `list`, `create`, `update`, `delete`
   - Ingress: parse with `<Entity>CreateSchema`/`<Entity>UpdateSchema`
   - Use queries (raw rows) → map via mappers → validate egress with `<Entity>ResponseSchema`/`ListResponseSchema`
   - Error taxonomy: for empty results return `{ ok: false, error: { code:"NOT_FOUND", message } }` (not throw)
   - Transactions: expose `executeInTransaction` for multi-step flows

2. Create `src/lib/services/index.ts` exporting all service classes.

3. Run: `pnpm type-check`. Paste any remaining `services` errors.
