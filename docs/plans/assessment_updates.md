# Prompt: Align “assessments” Across Drizzle, Zod, Routes, Hooks, Forms, and Docs

**Goal**  
After adding the `assessments` table (via MCP/Supabase), align our codebase and docs so the new entity is fully wired:
- Drizzle schema & migration
- Zod contracts (request/response DTOs)
- DB→DTO mappers
- API routes (input/output validation)
- Hooks (standard return shape)
- Mock form (zodResolver)
- Docs (Schema Guide, RLS Playbook, ADR)
- Minimal tests (RLS smoke + route contract)

**Ground rules**  
- **DTOs only** cross API boundaries; never return raw Drizzle rows.
- **Zod validates** both incoming requests and outgoing responses.
- **Mapper** is the single place for null-coalescing/renames/redactions.
- Hooks return `{ data, loading, error }` (our standard).

---

## Step 1 — Discover & Confirm Table (MCP introspection)
1) Use Supabase MCP to read the **current table definition** for `public.assessments`:
   - Columns (name, type, nullability, defaults)
   - PK/FKs
   - Indexes
   - RLS status/policies
2) Output a short summary of the actual DB shape (as found by MCP).

> If the Drizzle model already exists, diff it; if not, scaffold it to match DB truth.

---

## Step 2 — Drizzle: Schema + Migration
1) Update or create `src/lib/db/schema.ts` (or `src/lib/db/schema.app.ts` per repo) with a `pgTable('assessments', ...)` that **matches MCP findings** exactly (types, nullability, enums).
2) Generate a migration and apply it to **dev DB**:
   - `pnpm db:generate` (drizzle-kit generate)
   - `pnpm db:migrate`
3) If RLS not enabled, create an **SQL migration** to enable RLS and add policies (idempotent).

**Deliverable:** updated schema file + migration SQL in `drizzle/migrations/**`.

---

## Step 3 — Zod Contracts (DTOs)
1) Create **Request/Response** Zod schemas for assessments in `contracts/` (or `validations/` if that’s where DTOs live):
   - `contracts/assessments.request.ts` (Create/Update payloads)
   - `contracts/assessments.response.ts` (public DTO)
   - Export types via `z.infer`
2) Update `contracts/index.ts` barrel to export:
   - `AssessmentDTO`
   - `CreateAssessmentRequest`, `UpdateAssessmentRequest`
   - (Server-only) Drizzle `AssessmentRow`/`NewAssessmentRow` if needed

> Response schema must reflect **UI-friendly shape** (coalesced dates/strings; derived booleans if needed).

---

## Step 4 — DB→DTO Mapper
1) In `src/lib/mappers/assessments.ts`, create `toAssessmentDTO(row: AssessmentRow): AssessmentDTO`.
   - Handle nullable → safe values (e.g., `title ?? "(untitled)"`).
   - Derive any computed fields (e.g., `isPublished` from status).
2) Add unit-safe helpers if enums/dates need normalization.

---

## Step 5 — API Routes (validate ingress & egress)
Create or update:
- `app/api/assessments/route.ts` (GET list, POST create)
- `app/api/assessments/[id]/route.ts` (GET one, PATCH, DELETE)

For each handler:
1) **Input**: parse with `CreateAssessmentRequest.parse(...)` or `UpdateAssessmentRequest.parse(...)`.
2) **Query**: Drizzle query that **scopes to tenant** (and assumes RLS).
3) **Map**: `toAssessmentDTO(...)`.
4) **Output**: `AssessmentResponse.parse(dto)` before returning.

**No raw Drizzle rows** should be returned.

---

## Step 6 — Hooks (standard return shape)
Create:
- `src/hooks/useAssessments.ts` → `DataState<AssessmentDTO[]>`
- `src/hooks/useAssessment.ts` → `DataState<AssessmentDTO>`
- `src/hooks/useCreateAssessment.ts` → `MutationState<CreateAssessmentRequest, AssessmentDTO>`
  - Use `zodResolver` on client forms where appropriate.

If legacy components want `{ assessments, loading }`, provide **adapter hooks** that remap keys (don’t rewrite components).

---

## Step 7 — Mock Form (zodResolver)
Update or create the previously mocked assessments form:
- `app/(dashboard)/assessments/new/page.tsx` (or location used in repo)
- Bind to `CreateAssessmentRequest` via `react-hook-form` + `@hookform/resolvers/zod`
- Submit to `POST /api/assessments` and render server errors cleanly

**Form type** = `z.infer<typeof CreateAssessmentRequest>`.

---

## Step 8 — Docs
Create/Update:

1) **Schema Guide** → `docs/schema/assessments.md`
   - Columns, nullability, defaults, relations, indexes
   - Example Drizzle queries + typical joins
   - Gotchas (e.g., date/timezones, enum meanings)

2) **RLS Playbook** → `docs/rls/assessments.md`
   - Policies (names, predicates)
   - Allowed/denied examples by role (anon/auth/manager/admin/service)
   - Troubleshooting steps & quick SQL to toggle policies in staging

3) **ADR** → `docs/adrs/2025-10-xx-assessments-entity.md`
   - Context, options, decision, consequences
   - Contract choices (what we expose vs DB shape)

Link these in any existing index docs if applicable.

---

## Step 9 — Minimal Tests
1) **RLS Smoke Tests** (`tests/db/assessments.rls.spec.ts`):
   - As `anon`: SELECT denied
   - As authenticated with tenant A: reads own rows; no rows from tenant B
   - As service role: unrestricted (by design)

2) **Route Contract Tests** (`tests/api/assessments.route.spec.ts`):
   - POST invalid body → 400 (Zod)
   - POST valid body → 200 and response matches `AssessmentResponse`
   - GET list returns only tenant rows; validates via Response schema

---

## Step 10 — Report & Diffs
- Output a **Markdown report** to `docs/plans/assessments-alignment-report.md`:
  - MCP table summary (columns, RLS, indexes)
  - Files created/updated
  - Any assumptions (❓) and follow-ups (⚠️)
  - Test results snapshot (pass/fail)
- Show diffs for all created/modified files; avoid unrelated edits.

---

## Acceptance Criteria
- Drizzle schema and migration exist and match Supabase table.
- RLS enabled with named, idempotent policies.
- `contracts/index.ts` exports Assessment DTO + requests.
- Routes validate **input & output** with Zod; return DTOs only.
- Hooks return standard shapes; mock form uses `zodResolver`.
- RLS & contract tests pass locally (`pnpm test`).
- Docs created (Schema Guide, RLS Playbook, ADR).