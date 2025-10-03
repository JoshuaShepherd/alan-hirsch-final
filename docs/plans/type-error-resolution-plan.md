# Type Error Resolution Plan

## Overview
Current status: 134 TypeScript errors across 92 files. This plan provides a systematic approach to resolve all type errors efficiently, prioritizing critical fixes first.

## Phase 1: Database Schema Foundation (Priority: Critical)

### Prompt 1: Database Schema Type Alignment
**Goal**: Align database schema types with TypeScript expectations  
**Files**: `lib/db/schema/`, `lib/db/queries/`, `lib/db/seed.ts`

**Instructions**:
1. Fix decimal/string mismatches:
   - `validityScore`: number → string (decimal)
   - `weight`: number → string (decimal) 
   - `responseConsistency`: number → string (decimal)
2. Add missing enum values:
   - Add `"invite_only"` to visibility enums
   - Add `"global"` to cultural context enums
3. Update queries to handle string decimals:
   - Convert numbers to strings for decimal fields
   - Add type conversions in query results
4. Fix seed data types to match schema

**Expected Outcome**: ~40 errors resolved

---

## Phase 2: API Contract Standardization (Priority: High)

### Prompt 2: API Response Structure Standardization
**Goal**: Standardize API response formats across all routes  
**Files**: `app/api/`, `lib/contracts/`

**Instructions**:
1. Standardize response wrapper:
   ```typescript
   // Current: { data: { items: [], pagination: {} } }
   // Target: { items: { data: { items: [], pagination: {} } } }
   ```
2. Fix API handler return types:
   - Update `createApiRoute` calls to match expected return types
   - Ensure all handlers return consistent response shapes
3. Resolve contract conflicts:
   - Fix duplicate `assessmentResponseSchema` declarations
   - Export missing types: `CulturalContext`, `Visibility`, `Attachment`
4. Update response mappers to match new structure

**Expected Outcome**: ~25 errors resolved

---

## Phase 3: Null Safety & Type Guards (Priority: High)

### Prompt 3: Null Safety Implementation
**Goal**: Add null checks and optional chaining  
**Files**: `app/api/`, `lib/db/queries/`, `lib/mappers/`

**Instructions**:
1. Fix "Object is possibly 'undefined'" errors:
   - Add null checks before property access
   - Use optional chaining (`?.`) where appropriate
   - Add type guards for database query results
2. Fix mapper type mismatches:
   - Handle null/undefined values in mappers
   - Convert string dates to Date objects
   - Handle empty strings vs undefined
3. Update API routes to handle undefined results:
   - Add proper error handling for missing data
   - Return appropriate HTTP status codes

**Expected Outcome**: ~30 errors resolved

---

## Phase 4: Assessment System Type Fixes (Priority: Medium)

### Prompt 4: Assessment API Type Consistency
**Goal**: Fix assessment-related type issues  
**Files**: `app/api/user/assessments/`, `lib/assessments/`

**Instructions**:
1. Fix assessment completion types:
   - Handle `responseConsistency` string conversion
   - Fix index signature access for APEST scores
   - Ensure proper date handling
2. Standardize assessment response types:
   - Fix string vs Date mismatches
   - Handle optional fields consistently
   - Update assessment mappers
3. Fix assessment query types:
   - Handle undefined assessment objects
   - Fix pagination parameter types
   - Resolve assessment property access issues

**Expected Outcome**: ~20 errors resolved

---

## Phase 5: Component & Utility Fixes (Priority: Low)

### Prompt 5: Component and Utility Type Fixes
**Goal**: Resolve remaining component and utility type issues  
**Files**: `components/`, `lib/api/`, `types/`

**Instructions**:
1. Fix component type issues:
   - Resolve sonner theme type mismatch
   - Fix union type conflicts
2. Fix utility type issues:
   - Resolve security middleware types
   - Fix validation middleware user types
3. Fix global type declarations:
   - Resolve duplicate `code` property declarations
   - Add missing `override` modifiers

**Expected Outcome**: ~10 errors resolved

---

## Phase 6: Test & Validation Fixes (Priority: Low)

### Prompt 6: Test and Validation Type Fixes
**Goal**: Fix test and validation type issues  
**Files**: `__tests__/`, `lib/api/validation-middleware.ts`

**Instructions**:
1. Fix test type issues:
   - Update test function calls to match new signatures
   - Fix argument count mismatches
2. Fix validation types:
   - Update validation middleware types
   - Fix user type assignments

**Expected Outcome**: ~5 errors resolved

---

## Phase 7: Enable Stricter Type Checking (Priority: Final)

### Prompt 7: Enable Strict Type Checking
**Goal**: Enable stricter TypeScript options and fix resulting issues  
**Files**: `tsconfig.json`, remaining type issues

**Instructions**:
1. Update `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "exactOptionalPropertyTypes": true,
       "noUncheckedIndexedAccess": true
     }
   }
   ```
2. Fix resulting type drift:
   - Address new strict checking errors
   - Add proper type assertions where needed
   - Ensure all optional properties are handled correctly
3. Add verification script:
   ```json
   {
     "scripts": {
       "verify": "pnpm type-check && pnpm lint"
     }
   }
   ```

**Expected Outcome**: 0 TypeScript errors, stricter type safety

---

## Execution Order
1. **Phase 1** (Database Schema) - Foundation
2. **Phase 2** (API Contracts) - Core functionality
3. **Phase 3** (Null Safety) - Runtime safety
4. **Phase 4** (Assessment System) - Feature-specific
5. **Phase 5** (Components/Utils) - UI and utilities
6. **Phase 6** (Tests/Validation) - Quality assurance
7. **Phase 7** (Strict Checking) - Final hardening

## Success Metrics
- **Phase 1-6**: Reduce errors from 134 to <10
- **Phase 7**: Achieve 0 errors with strict checking enabled
- **Final**: All code passes `pnpm verify` (type-check + lint)

## Estimated Timeline
- **Phases 1-3**: 2-3 hours (critical fixes)
- **Phases 4-6**: 1-2 hours (remaining fixes)
- **Phase 7**: 30-60 minutes (strict checking)
- **Total**: 3.5-5.5 hours

## Error Breakdown by Category

### Critical Issues (40+ errors)
- Database schema type mismatches
- API response structure inconsistencies
- Null safety violations

### High Priority (30+ errors)
- Assessment system type issues
- Mapper type mismatches
- Contract conflicts

### Medium Priority (20+ errors)
- Component type issues
- Utility type problems
- Test type mismatches

### Low Priority (10+ errors)
- Global type declarations
- Validation middleware types
- Minor component issues

## Notes
- Execute phases sequentially; each builds on the previous
- Test after each phase to ensure no regressions
- Focus on critical fixes first to unblock development
- Enable stricter checking only after core issues are resolved
