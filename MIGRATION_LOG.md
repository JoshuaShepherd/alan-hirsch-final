# Migration Log: Monorepo to Single App

## Overview

Migrated from monorepo structure to single app repository for better deployment and maintenance.

## Actions Performed

### 1. Safety Branch

- Created branch: `chore/flatten-to-single-app`
- Preserved original state for rollback if needed

### 2. Code Migration

- **packages/contracts/src/** → **src/lib/contracts/**
- **packages/database/src/** → **src/lib/database/**
- **packages/shared/src/mappers/** → **src/lib/mappers/**
- **packages/shared/src/services/** → **src/lib/services/**
- **packages/shared/src/utils/** → **src/lib/utils/**
- **packages/shared/src/{api,auth,assessments,cache,contracts,forms,middleware,payments}** → **src/lib/**
- **packages/ui/src/** → **src/lib/ui/**
- **packages/types/src/** → **src/lib/types/**
- **packages/testing/src/** → **src/lib/testing/**
- **apps/alan-hirsch-platform/src/app** → **src/app**
- **apps/alan-hirsch-platform/{components,hooks,lib,types}** → **src/**

### 3. Import Replacements (Codemod)

- `@platform/contracts` → `@/lib/contracts`
- `@platform/database` → `@/lib/database`
- `@platform/shared` → `@/lib`
- `@platform/ui` → `@/lib/ui`
- `@platform/types` → `@/lib/types`
- `@platform/testing` → `@/lib/testing`

### 4. Configuration Updates

- **package.json**: Updated to single app with simplified scripts
- **tsconfig.json**: Updated baseUrl to "./src" with proper path mappings
- **drizzle.config.ts**: Updated schema and migrations paths
- **tailwind.config.ts**: Updated content paths to src/\*\*
- **eslint.config.js**: Updated file patterns for src structure
- **vitest.config.ts**: Updated aliases and module resolution

### 5. Files Deleted

- `packages/` (entire directory)
- `apps/` (entire directory)
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `tsconfig.packages.tsbuildinfo`
- `lib/` (obsolete root lib)
- `src/lib/schemas` (empty directory)
- `tsconfig.tsbuildinfo`

### 6. Files Copied from App

- `components.json`
- `next.config.ts`
- `postcss.config.mjs`
- `tailwind.config.ts`

## Final Structure

```
src/
├── app/                    # Next.js routes
├── lib/
│   ├── contracts/         # Zod schemas & DTOs
│   ├── database/          # Drizzle schema & queries
│   │   ├── db/
│   │   │   ├── schema/
│   │   │   ├── queries/
│   │   │   └── migrations/
│   │   └── supabase/
│   ├── mappers/           # Data transformation
│   ├── services/          # Business logic
│   ├── ui/                # UI components
│   ├── types/             # TypeScript types
│   ├── testing/           # Test utilities
│   ├── utils/              # Helper functions
│   ├── api/                # API utilities
│   ├── auth/               # Authentication
│   ├── assessments/       # Assessment logic
│   ├── cache/              # Caching utilities
│   ├── contracts/          # API contracts
│   ├── forms/              # Form utilities
│   ├── middleware/         # Middleware
│   └── payments/           # Payment processing
├── components/             # React components
├── hooks/                  # Custom hooks
└── types/                  # App-specific types
```

## Verification Required

- [ ] `pnpm install`
- [ ] `pnpm type-check`
- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm start`

## Notes

- All @platform/\* imports have been replaced
- Database paths updated in drizzle config
- Test configurations updated for new structure
- ESLint rules updated for src/ structure
- Tailwind content paths updated
