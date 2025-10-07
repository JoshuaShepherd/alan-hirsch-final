Single-App Status Report (Facts Only)

You are working in the single-app repo (flattened from the monorepo).

Scope & Paths
• Drizzle schema: src/lib/database/db/schema/**
• Query modules: src/lib/database/db/queries/**
• Contracts (Zod/DTOs): src/lib/contracts/**
• Mappers: src/lib/mappers/**
• Services: src/lib/services/**
• Routes (Next API): src/app/api/**
• Hooks: src/hooks/**
• Components: src/components/**
• Types: src/lib/types/**
• Forms/utilities as applicable: src/lib/forms/**, src/lib/utils/\*\*

What to Do (Facts, No Fixes) 1. Run these commands and capture summaries (do not alter code):
• pnpm type-check
• pnpm lint
• pnpm test --reporter=basic
• (optional) pnpm build if type-check passes 2. Analyze each layer independently for: missing exports, bad import paths, type errors, schema/DTO name mismatches, and signature drift. 3. Produce a concise, human-readable report plus a machine-readable JSON block.

Output Format (exactly)

1. Layer Status Table

For each layer, provide a one-line status and the top 3 blocking facts.
• Schema (Drizzle) — OK/ISSUES
• e.g., files with errors, enum/column drift, migration compile errors
• Types — OK/ISSUES
• missing/duplicate types, any at boundaries, enum mismatches
• Contracts (Zod/DTOs) — OK/ISSUES
• missing exports, naming mismatches (e.g., CreateSchema vs CreateDTO), parse failures
• Mappers — OK/ISSUES
• missing toDTO/fromCreate/fromUpdate, shape mismatches, null/undefined handling gaps
• Query Modules — OK/ISSUES
• missing CRUD, Ctx type/export missing, tenant guards absent, pagination/count shape drift
• Services — OK/ISSUES
• wrong imports, ingress/egress validation missing, return envelope drift
• Routes (API) — OK/ISSUES
• ingress/egress validation missing, error envelope drift, status codes inconsistent
• Hooks — OK/ISSUES
• incorrect IO types, cache keys/invalidation missing, MSW/tests failing
• Components — OK/ISSUES
• prop/type mismatches, form resolver wiring

2. Command Summaries
   • Type-check: total errors, top 10 by file with first error message (file:line:message).
   • Lint: error counts (not warnings), top 10 rules failing with example file.
   • Tests: passed/failed/skipped; list first 10 failing test names with file path.
   • Build (if run): pass/fail; first blocking error.

3. Cross-Cutting Mismatch Map

Bullet the exact symbol names causing breakage (no guesses), grouped by source/target:
• Missing Exports (module → symbol)
• @/lib/contracts/index: createAssessmentSchema, contentItemFormSchema
• Name Drift (expected → actual)
• UserCreateDTO → UserCreateSchema
• Signature Drift (function → expected vs actual)
• getUserById(ctx, id: string) → actual getUserById(id: string) (ctx missing)

4. Minimal Repro Snippets (max 5)

For the worst mismatches, show a 10-15 line code excerpt that triggers the error (no edits, facts only).

5. Machine-Readable Summary (JSON)

Return a single fenced code block with this shape:

{
"timestamp": "YYYY-MM-DDTHH:mm:ssZ",
"commands": {
"typeCheck": { "errors": 0, "sample": [] },
"lint": { "errors": 0, "rules": [] },
"test": { "passed": 0, "failed": 0, "skipped": 0, "failedTests": [] },
"build": { "ran": false, "ok": false, "error": "" }
},
"layers": {
"schema": { "ok": false, "errors": 0, "files": [], "notes": [] },
"types": { "ok": false, "errors": 0, "files": [], "notes": [] },
"contracts": { "ok": false, "errors": 0, "files": [], "missingExports": [], "nameDrift": [] },
"mappers": { "ok": false, "errors": 0, "files": [], "missingFns": [], "shapeMismatches": [] },
"queries": { "ok": false, "errors": 0, "files": [], "missingFns": [], "ctxIssues": [] },
"services": { "ok": false, "errors": 0, "files": [], "ingressEgressIssues": [] },
"routes": { "ok": false, "errors": 0, "files": [], "envelopeIssues": [] },
"hooks": { "ok": false, "errors": 0, "files": [] },
"components": { "ok": false, "errors": 0, "files": [] }
},
"crossCutting": {
"missingExports": [{ "module": "", "symbol": "" }],
"nameDrift": [{ "expected": "", "actual": "", "where": "" }],
"signatureDrift": [{ "fn": "", "expected": "", "actual": "", "where": "" }]
}
}

6. Diff vs Last Report (if previous exists)
   • Count deltas by layer (errors added/removed)
   • New missing exports / resolved ones
   • New or resolved signature/name drift

Important: Do not propose fixes or steps. Provide facts only in the formats above.
