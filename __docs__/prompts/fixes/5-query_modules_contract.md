5. Query modules contract (CRUD names + Ctx)

Prompt:

Normalize query module surface.

Target: every file in `src/lib/database/db/queries/*.queries.ts` exports at least:

- `getById(ctx: Ctx, id: string)`
- `list(ctx: Ctx, params?: { page?: number; limit?: number; sort?: string; q?: string })`
- `create(ctx: Ctx, data: InsertType)`
- `update(ctx: Ctx, id: string, data: UpdateType)`
- `remove(ctx: Ctx, id: string)`

Steps:

1. Define and **export** `Ctx` in `src/lib/database/db/queries/_ctx.ts`:
   ```ts
   export type Ctx = {
     tenantId: string;
     userId: string;
     role: string;
     db: ReturnType<typeof getDb>;
   };
   ```

Export from src/lib/database/index.ts too. 2. For each entity queries file:
• Implement the 5 functions using Drizzle, always scoping by tenantId (even with RLS).
• Return raw row types only (no mapping). 3. Add a tiny test per entity under src/lib/database/db/queries/**tests**/\* that asserts the 5 exports exist (type-level ok), and that list returns { rows, total, page, limit } if you use a list envelope. 4. Run: pnpm type-check. Paste any remaining “does not exist on type typeof import(’…queries’)” errors.
