## 10) Contracts/mappers/queries guard Tests (gates)

**Prompt:**

```md
Add lightweight gate tests.

Create:

- `src/__tests__/gates/contracts.gate.test.ts`: imports `@/lib/contracts` and asserts existence of `*CreateSchema`, `*UpdateSchema`, `*ResponseSchema` for key entities.
- `src/__tests__/gates/queries.gate.test.ts`: for each queries file, assert exports: getById, list, create, update, remove.
- `src/__tests__/gates/mappers.gate.test.ts`: assert `toDTO`, `fromCreateDTO`, `fromUpdateDTO` exist and are functions.

Run: `pnpm test`. Fix whatever the gates catch.
```
