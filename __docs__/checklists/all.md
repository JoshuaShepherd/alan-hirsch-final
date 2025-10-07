✅ Stage 1 — MVP Production-Ready Checklists

Goal: A working full-stack app whose schema, types, contracts, mappers, services, and routes are fully aligned; all layers compile, validate, and pass smoke tests.
Scope: correctness > completeness — performance, observability, and heavy security scanning are deferred to Stage 2.

⸻

🧱 1. Schema (DB truth + Drizzle mirror + validation)

✅ Checks
• DB truth (Supabase)
• Tables, columns, and enums match the domain model.
• Primary/foreign keys and indexes exist and match usage.
• RLS enabled on all tenant-scoped tables.
• Policies: anon = deny, own-tenant = allow, service_role = allow.
• Drizzle mirror
• Each table mirrored in packages/database/src/db/schema/\*\*.
• $inferSelect and $inferInsert compile without any.
• Relations defined for used joins.
• Validation
• pnpm run validate:schema passes (no DB⇄Drizzle drift).
• Migrations apply on fresh DB.
• DB_SCHEMA.md snapshot up to date.

🧪 Tests
pnpm run validate:schema # schema diff + RLS smoke
pnpm run test:rls # anon/tenant/service_role access checks

Success: No DB⇄Drizzle drift, RLS validated

🧩 2. Types (compile-time truth)

✅ Checks
• Generated or inferred types exist for every table ($inferSelect, $inferInsert).
• No any or unknown in public exports.
• DTO (data-transfer) types distinct from DB row types.
• Enum & JSONB fields typed explicitly.

🧪 Tests / Gates
pnpm type-check
pnpm lint # eslint rule: "no-explicit-any" in /types|/contracts|/services

Success: pnpm type-check passes with zero any

📜 3. Contracts (Zod validation schemas)

**Status:** ✅ **COMPLETE** - Fully implemented and validated (2025-10-06T17:00:46.173Z)

✅ Checks
• ✅ Every API endpoint has matching request and response Zod schema.
• ✅ Required vs optional vs nullable clearly encoded.
• ✅ All entity schemas generated with complete field coverage (25+ fields per entity)
• ✅ Enum validation properly enforced (ministry roles, organization types, etc.)
• ✅ TypeScript compilation passes without errors
• ✅ Runtime validation tests pass comprehensively
• ✅ Default values applied correctly
• ✅ Nullable field handling works in create schemas
• Standard envelopes:
• Success → { data, page?, limit?, total? }
• Error → { error: { code, message } }
• z.infer types exported and used by routes & hooks.

🧪 Tests

✅ **VALIDATED** - Comprehensive validation tests completed:
• ✅ Entity schema validation (UserProfile, Organization)
• ✅ Create schema validation with optional fields
• ✅ Update schema validation with partial data
• ✅ API request/response validation (login, register, etc.)
• ✅ Enum validation (ministry roles, organization types)
• ✅ Type coercion and default values
• ✅ Required field validation
• ✅ Optional/nullable field handling

**Test Results:**

- All valid inputs parse successfully
- All invalid inputs correctly rejected
- Enum validation working correctly
- TypeScript compilation succeeds without errors
- Runtime validation passes all test cases

Success: ✅ All validation tests pass - Contracts system is production-ready

⸻

🔁 4. Mappers (DB ↔ DTO)

✅ Checks
• Pure functions only — no I/O.
• Deterministic: same input → same output.
• Normalizes dates, enums, and nullables.
• Bidirectional mapping exists: toEntity and fromEntity.
• Uses Zod safeParse inside mapper for runtime safety.

🧪 Tests

tests/gates/mappers.spec.ts
expect(dto).toEqual(fromEntity(toEntity(dto)));

CI gate: pnpm test:gates

Success: Round-trip and validation tests pass

⸻

🔍 5. Query Modules (DB I/O)

✅ Checks
• One file per entity in packages/database/src/db/queries/.
• Functions: (ctx, params) => Promise<Row|Row[]|{rows,total,page,limit}>
• Tenant guard in every query (WHERE tenant_id = ctx.tenantId).
• Explicit column selects, paginated lists include total.
• No business logic — return raw rows.

🧪 Tests
• Test DB seeded with 2 tenants.
• Expect own-tenant → rows; cross-tenant → none.
• EXPLAIN captured for top queries (optional doc artifact).
CI gate: pnpm test:gates

Success: Tenant isolation and pagination verified

⸻

⚙️ 6. Services (business logic)

✅ Checks
• Services import only queries + mappers + contracts (no raw DB).
• Accept context { tenantId, userId, role }.
• Validate ingress DTO → run query → map → validate egress.
• Throw domain errors from shared error taxonomy.
• Multi-step ops wrapped in transaction helper (withTx).

🧪 Tests

Unit tests with mocked queries:
• happy path
• not found
• forbidden
• validation fail
Gate: pnpm test:services

Success: Unit tests pass, no unhandled exceptions

⸻

🌐 7. Routes (HTTP API)

✅ Checks
• Use only services; no DB/mappers.
• Parse request via Zod schemas.
• Return standardized envelope and correct status codes.
• Map errors → { error: { code, message } }.

🧪 Tests

Integration tests with mocked queries:
pnpm test:e2e

Check: ingress/egress validation, pagination fields, error mapping.

⸻

⚛️ 8. Hooks (client data access)

✅ Checks
• One hook per use-case (e.g., useListAssessments).
• Input/output typed from contracts.
• Stable return shape { data, isLoading, error, mutate }.
• Deterministic cache keys & invalidation paths.
• No business logic inside.

🧪 Tests

vitest + msw route mocks: loading/error/invalidation states behave, types inferred.

⸻

🎨 9. Components (UI layer)

✅ Checks
• Props typed from hook/DTO outputs.
• Forms use react-hook-form + Zod resolver.
• Render loading/empty/error states.
• Accessible: labels, roles, keyboard.
• Pure presentation; no business logic.

🧪 Tests

React Testing Library:
• renders valid DTO
• shows loading/error UI
• form blocks on invalid submit, submits valid

Success: Integration & UI smoke tests pass

⸻

🧩 10. CI Pipeline (Gates)
pnpm validate:schema # schema ↔ drizzle alignment
pnpm type-check # TS safety
pnpm lint # style + no any
pnpm test:gates # contracts, mappers, queries
pnpm test:services # business logic
pnpm test:e2e # routes/hook integration

Success: All gates green on PR
