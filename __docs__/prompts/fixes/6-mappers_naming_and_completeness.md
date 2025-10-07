## 6) Mappers naming + completeness (no placeholders)

**Prompt:**

```md
Enforce mapper naming and completeness.

1. For each entity mapper in `src/lib/mappers/*.ts` ensure these exports exist:
   - `to<Entity>DTO(row: RowType): EntityDTO`
   - `fromCreate<Entity>DTO(dto: EntityCreateDTO): InsertType`
   - `fromUpdate<Entity>DTO(dto: EntityUpdateDTO): UpdateType`
   - Add array helpers: `to<Entity>DTOs(rows: RowType[])`

2. Remove any placeholder `{}` returns; fill all required fields.
   - Normalize dates to ISO in DTOs.
   - Normalize nullables per contracts.

3. Add `scripts/validate-mappers.ts`:
   - Scans `src/lib/mappers/*.ts` and verifies required exports exist per entity (using simple AST or regex).
   - Fails if missing.

4. Run: `pnpm type-check` and `node scripts/validate-mappers.ts`. Paste missing mapper function list (if any).
```
