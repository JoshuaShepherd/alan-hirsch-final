# Error Resolution Plan - Next Steps

## Overview

This document provides a systematic approach to resolve the 35 critical TypeScript errors and 1,239 warnings identified in the comprehensive error analysis. The plan prioritizes build-blocking issues first, then addresses code quality improvements.

## Phase 1: Critical TypeScript Errors (Build Blockers)

### 1.1 Assessment Management Fixes

**Priority:** CRITICAL - Blocking build
**Estimated Time:** 2-3 hours

#### Files to Fix:

- `app/(dashboard)/dashboard/assessment/manage/page.tsx`
- `app/(dashboard)/dashboard/assessment/results/[id]/page.tsx`
- `app/(dashboard)/dashboard/assessment/select/page.tsx`
- `app/(dashboard)/dashboard/assessment/take/[id]/page.tsx`

#### Key Issues to Address:

1. **DataState type issues** - Add missing `mutate` method or use correct data fetching pattern
2. **Enum type mismatches** - Ensure assessmentType and culturalAdaptation use proper enum values
3. **Property access errors** - Fix `assessment` vs `assessmentId` and missing `responses` property
4. **Arithmetic operations** - Add type guards for numeric operations

#### Prompt Template:

```
Fix TypeScript errors in assessment management pages:

1. In [FILE], line [LINE]:
   - Error: [SPECIFIC ERROR MESSAGE]
   - Fix: [DESIRED SOLUTION]

2. Ensure all enum types match the schema definitions
3. Add proper type guards for numeric operations
4. Verify data fetching patterns match the DataState interface

Focus on making the build pass without changing functionality.
```

### 1.2 Content Management System Fixes

**Priority:** CRITICAL - Blocking build
**Estimated Time:** 2-3 hours

#### Files to Fix:

- `app/(dashboard)/dashboard/content/analytics/page.tsx`
- `app/(dashboard)/dashboard/content/approval/page.tsx`
- `app/(dashboard)/dashboard/content/edit/[id]/page.tsx`
- `app/(dashboard)/dashboard/content/manage/page.tsx`
- `app/(dashboard)/dashboard/content/new/page.tsx`
- `components/content/content-library.tsx`

#### Key Issues to Address:

1. **Missing `.data` property** - Fix data access patterns for content arrays
2. **Form resolver type mismatches** - Align form schemas with content types
3. **Missing properties** - Add required properties to content item types
4. **Missing imports** - Add missing `Label` component import

#### Prompt Template:

```
Fix TypeScript errors in content management system:

1. In [FILE], line [LINE]:
   - Error: Property 'data' does not exist on content array
   - Fix: Update data access pattern to match actual API response structure

2. In [FILE], line [LINE]:
   - Error: Type mismatch in form resolver
   - Fix: Align form schema with content item type definition

3. Add missing imports for UI components (Label, etc.)
4. Ensure all content item properties are properly typed

Priority: Make build pass without breaking existing functionality.
```

## Phase 2: High-Priority Code Quality Fixes

### 2.1 Nullish Coalescing Migration

**Priority:** HIGH - Code Quality
**Estimated Time:** 1-2 hours

#### Files to Update:

- All files with `||` operators that should be `??`
- Focus on: `lib/`, `app/`, `components/`

#### Prompt Template:

```
Replace logical OR operators with nullish coalescing:

1. Find all instances of `||` that should be `??`
2. Focus on cases where:
   - Left side could be 0, false, or empty string
   - Right side provides a meaningful default
3. Update patterns like:
   - `value || defaultValue` → `value ?? defaultValue`
   - `obj.prop || fallback` → `obj.prop ?? fallback`

Run ESLint fix: `npm run lint -- --fix` to auto-fix many instances.
```

### 2.2 Console Statement Cleanup

**Priority:** HIGH - Code Quality
**Estimated Time:** 30 minutes

#### Files to Update:

- `app/(login)/actions.ts`
- `lib/db/seed.ts`
- `scripts/` directory files

#### Prompt Template:

```
Remove or properly handle console statements:

1. Remove development-only console.log statements
2. Replace with proper logging in production code
3. Keep essential error logging with proper error handling
4. Use environment-based logging where appropriate

Focus on files with 10+ console statements first.
```

### 2.3 Type Safety Improvements

**Priority:** HIGH - Code Quality
**Estimated Time:** 1-2 hours

#### Files to Update:

- `lib/mocks/` directory (high 'any' usage)
- Form handlers with implicit 'any' parameters
- Array method callbacks

#### Prompt Template:

```
Improve type safety by eliminating 'any' types:

1. Add proper type annotations to function parameters
2. Use generic types for array methods (map, filter, reduce)
3. Create proper interfaces for mock data
4. Add type guards for runtime type checking

Focus on:
- Array method callbacks: `(item: any) =>` → `(item: ContentItem) =>`
- Mock functions: `(data: any) =>` → `(data: CreateRequest) =>`
- Event handlers: Add proper event types
```

## Phase 3: React-Specific Fixes

### 3.1 Hook Dependencies

**Priority:** MEDIUM - React Best Practices
**Estimated Time:** 30 minutes

#### Files to Update:

- Components with useEffect dependency warnings
- Event handlers with promise issues

#### Prompt Template:

```
Fix React Hook dependencies and async handlers:

1. Add missing dependencies to useEffect arrays
2. Fix promise-returning functions in event handlers:
   - Add proper async/await handling
   - Use void operator for fire-and-forget operations
3. Fix unescaped entities in JSX

Focus on:
- useEffect missing dependencies
- onClick handlers with promises
- JSX entities like quotes and apostrophes
```

## Phase 4: Configuration and Cleanup

### 4.1 ESLint Configuration

**Priority:** MEDIUM - Developer Experience
**Estimated Time:** 15 minutes

#### Files to Update:

- `eslint.config.js`
- `tsconfig.test.json`

#### Prompt Template:

```
Fix ESLint configuration for test files:

1. Update tsconfig.test.json to include test files
2. Fix parser project configuration errors
3. Ensure all test files are included in TypeScript project
4. Verify ESLint rules are properly configured

This will resolve the 4 test file parsing errors.
```

### 4.2 Unused Code Cleanup

**Priority:** LOW - Maintenance
**Estimated Time:** 30 minutes

#### Files to Update:

- Files with unused imports and variables
- Dead code in seed files

#### Prompt Template:

```
Clean up unused code:

1. Remove unused imports and variables
2. Remove dead code in seed files
3. Clean up unused function parameters (prefix with _)
4. Remove commented-out code blocks

Run: `npm run lint -- --fix` to auto-fix many unused imports.
```

## Implementation Strategy

### Step-by-Step Approach:

1. **Start with Phase 1** - Fix all TypeScript errors to unblock builds
2. **Test incrementally** - Run `npm run build` after each major fix
3. **Use automated fixes** - Run `npm run lint -- --fix` for common issues
4. **Focus on high-impact files** - Prioritize files with most errors first
5. **Verify functionality** - Ensure fixes don't break existing features

### Testing Strategy:

1. **Build verification**: `npm run build` should pass without errors
2. **Type checking**: `npx tsc --noEmit` should show 0 errors
3. **Linting**: `npm run lint` should show significantly fewer warnings
4. **Functional testing**: Verify key user flows still work

### Success Metrics:

- **Phase 1 Complete**: 0 TypeScript errors, build passes
- **Phase 2 Complete**: <500 ESLint warnings
- **Phase 3 Complete**: <200 ESLint warnings
- **Phase 4 Complete**: <100 ESLint warnings

## Key Files to Share for Context

When working on specific phases, ensure these files are available:

### Type Definitions:

- `types/index.ts` - Core type definitions
- `lib/contracts/` - API contract types
- `validations/` - Zod schema definitions

### Data Layer:

- `lib/db/queries.ts` - Database query patterns
- `lib/db/schema/` - Database schema definitions
- `hooks/` - Custom React hooks

### Component Patterns:

- `components/ui/` - Reusable UI components
- `app/(dashboard)/layout.tsx` - Dashboard layout patterns

### Configuration:

- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `next.config.ts` - Next.js configuration

## Emergency Rollback Plan

If fixes introduce new issues:

1. **Git commit each phase** before starting the next
2. **Test builds frequently** during implementation
3. **Keep backup of working state** before major changes
4. **Use feature branches** for experimental fixes

## Timeline Estimate

- **Phase 1 (Critical)**: 4-6 hours
- **Phase 2 (High Priority)**: 2-3 hours
- **Phase 3 (React Fixes)**: 30 minutes
- **Phase 4 (Cleanup)**: 45 minutes
- **Total**: 7-11 hours

**Recommendation**: Tackle Phase 1 in one focused session, then address remaining phases incrementally.
