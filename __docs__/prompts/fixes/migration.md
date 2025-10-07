Does this make sense to you?

In github I had a repo that had a good shared packages and we want to revert to that and start from there.

0. Safety net first

# from repo root

git status

# if you have uncommitted work:

git switch -c backup/current-state
git add -A && git commit -m "backup: current messy state before full revert"
git push -u origin backup/current-state

1. Identify the known-good commit
   git log --oneline --decorate --graph --all

# find the SHA where the monorepo passed type-check (shared layer green)

# say it's GOOD_SHA

(Optional) Tag it for clarity:
git tag good-shared-green GOOD_SHA

2. Hard reset the repo to GOOD_SHA

This rolls the entire repo back in one go.

# make a migration branch from the good point

git checkout -B chore/revert-to-good GOOD_SHA

If you previously committed messy state on main, protect it:

git branch backup/before-revert # marks current HEAD (if needed)

3. Install clean + verify the green state

# start fresh

rm -rf node_modules
pnpm install
pnpm type-check
pnpm lint
pnpm test -i || true # ok if no tests; you just want to see it runs

If type-check isn’t green here, stop and fix in monorepo first (this is your baseline).

⸻

4. Redo the migration (monorepo → single app) the right way

Create a fresh branch for the flatten:

git switch -c chore/flatten-to-single-app

4a) Run your flatten script (or do the manual move)
• Move app → src/app
• Move shared packages into src/lib/**
• packages/contracts/src/** → src/lib/contracts/**
• packages/database/src/** → src/lib/database/**
• packages/shared/src/** → src/lib/** (services, mappers, utils, etc.)
• packages/types/src/** → src/lib/types/**
• packages/ui/src/** → src/lib/ui/\*\* (if you had it)

4b) Fix path aliases (single app)

tsconfig.json

{
"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["src/_"],
"@/lib/_": ["src/lib/_"]
}
},
"include": ["src", "__tests__", "tests"]
}

{
"compilerOptions": {
"baseUrl": ".",
"paths": {
"@/_": ["src/_"],
"@/lib/_": ["src/lib/_"]
}
},
"include": ["src", "__tests__", "tests"]
}

Remove any @platform/\* aliases.

4c) Update Next/Tailwind/Drizzle/Vitest configs
• drizzle.config.ts → point to src/lib/database/db/schema
• tailwind.config.ts → include ./src/\*_/_.{ts,tsx}
• vitest.config.ts → add setup file

Create the test setup dir/file (correctly this time):

mkdir -p tests
printf "import '@testing-library/jest-dom';\n" > tests/setup.ts

In vitest.config.ts:

export default defineConfig({
test: {
environment: 'jsdom',
setupFiles: ['./tests/setup.ts'],
},
});

4d) Bulk update imports

Replace @platform/… → @/lib/… across the repo

# macOS BSD sed: use -i ''

grep -RIl "@platform/" -- . | xargs sed -i '' 's#@platform/#@/lib/#g'

4e) Pin versions to the good commit’s expectations

If the good commit used specific versions (esp. drizzle-orm, zod, TS, React/Next), keep them. Downgrade/upgrade as needed in package.json, then:

rm -rf node_modules pnpm-lock.yaml
pnpm install

5. Verify in small gates

# 1) types only (fast feedback)

pnpm type-check

# 2) lint

pnpm lint

# 3) unit tests (now that setup exists)

pnpm test -i

If something fails:
• Prefer compat aliases rather than changing 100s of imports:
• e.g., in src/lib/contracts/index.ts add temporary re-exports:

export { UserCreateSchema as UserCreateDTO } from './users/user.contracts';

• e.g., in src/lib/mappers/organization.ts export the exact names tests expect:

export { fromCreateOrganizationDTO as fromCreateOrganizationsDTO } from './organizations.mapper';

Keep all shims in place, file them under a comment // COMPAT: post-flatten temporary alias. You can remove them later once the app is stable.

⸻

6. Commit the migration

git add -A
git commit -m "feat: flatten monorepo to single app from known-good baseline"
git push -u origin chore/flatten-to-single-app

Open a PR; keep it only structural + config + alias fixes (no feature code). Smaller surface = easier to review/merge.

⸻

7. After merge: resume app work safely

Now fix actual app layer issues (contracts exports, mapper props, auth service envelopes) one category at a time:
• Contracts export gaps → add aliases in src/lib/contracts/index.ts
• Mapper empty returns → fill with typed shapes from Drizzle select/insert types
• Service envelopes → unify { ok, data } | { ok:false, error }
• Only then touch routes/hooks/components.
