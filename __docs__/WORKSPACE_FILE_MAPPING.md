# Alan Hirsch Platform - Workspace File Mapping

**Created:** 2025-10-06
**Purpose:** Complete mapping of all files in the workspace organized by category
**Scope:** Monorepo packages and application files

## 📋 **EXECUTIVE SUMMARY**

This document provides a comprehensive mapping of all files in the Alan Hirsch Digital Platform workspace, organized by functional category. It identifies which files comprise each category and highlights any issues with insufficient, excessive, or misplaced files.

## 🗂️ **FILE CATEGORIES**

### 1. **SCHEMA** - Database Schema Definitions

**Location:** `packages/database/src/db/schema/`

**Files:**

- `ai.ts` ✅ - AI-related tables (conversations, messages, content jobs, etc.)
- `analytics.ts` ✅ - Analytics and metrics tables
- `assessments.ts` ✅ - Assessment-related tables
- `auth.ts` ✅ - Authentication tables
- `community.ts` ✅ - Community and membership tables
- `content.ts` ✅ - Content and series tables
- `index.ts` ✅ - Schema exports
- `indexes.ts` ✅ - Database indexes
- `subscriptions.ts` ✅ - Subscription and payment tables
- `system.ts` ✅ - System configuration tables

**Status:** ✅ **COMPLETE** - All necessary schema files present
**Issues:** None identified

---

### 2. **TYPES** - TypeScript Type Definitions

**Primary Location:** `packages/contracts/src/types/`
**Secondary Locations:** Various packages

**Files:**

**Core Type Definitions:**

- `packages/contracts/src/types/database.ts` ✅ - Database type definitions
- `packages/shared/src/types/component-props.ts` ✅ - React component prop types
- `packages/shared/src/types/index.ts` ✅ - Shared type exports
- `apps/alan-hirsch-platform/lib/types/component-props.ts` ✅ - App-specific component types
- `apps/alan-hirsch-platform/types/index.ts` ✅ - App type definitions

**Generated Types (from schemas):**

- All entity types generated from `packages/contracts/src/entities/*.schema.ts` ✅
- All API response types generated from `packages/contracts/src/api/*.contracts.ts` ✅

**Status:** ✅ **COMPLETE** - Comprehensive type system in place
**Issues:** None identified

---

### 3. **MAPPERS** - Data Transformation Functions

**Primary Location:** `packages/shared/src/mappers/`
**Secondary Location:** `apps/alan-hirsch-platform/lib/mappers/`

**Files:**

**Core Mappers (`packages/shared/src/mappers/`):**

- `database.ts` ✅ - Auto-generated database mappers (25+ functions)
- `ai.ts` ✅ - AI entity mappers
- `assessments.ts` ✅ - Assessment entity mappers
- `content.ts` ✅ - Content entity mappers
- `organizations.ts` ✅ - Organization entity mappers
- `user-profiles.ts` ✅ - User profile mappers
- `ministry-platform.ts` ✅ - Ministry platform mappers
- `index.ts` ✅ - Mapper exports
- `README.md` ✅ - Mapper documentation

**Application Mappers (`apps/alan-hirsch-platform/lib/mappers/`):**

- `ai.ts` ✅ - App-specific AI mappers
- `assessment.ts` ✅ - App-specific assessment mappers
- `content.ts` ✅ - App-specific content mappers
- `organization.ts` ✅ - App-specific organization mappers
- `user.ts` ✅ - App-specific user mappers
- `index.ts` ✅ - App mapper exports

**Status:** ✅ **COMPLETE** - Comprehensive mapper system
**Issues:**

- ⚠️ **DUPLICATION** - Some mappers exist in both shared and app packages
- ⚠️ **INCONSISTENCY** - App-specific mappers may conflict with shared mappers

---

### 4. **CONTRACTS** - Zod Schemas and API Contracts

**Location:** `packages/contracts/src/`
**Status:** ✅ **COMPLETE** - Fully generated and validated contracts system
**Last Updated:** 2025-10-06T17:00:46.173Z

**Files:**

**Entity Schemas (`packages/contracts/src/schemas/`):**

- `auth.ts` ✅ - UserProfile and Organization entity schemas (25+ fields each)
- `user.ts` ✅ - User-related entity schemas
- `organization.ts` ✅ - Organization entity schemas
- `assessment.ts` ✅ - Assessment entity schemas
- `content.ts` ✅ - Content entity schemas
- `community.ts` ✅ - Community entity schemas
- `ai.ts` ✅ - AI entity schemas
- `analytics.ts` ✅ - Analytics entity schemas
- `subscription.ts` ✅ - Subscription entity schemas
- `system.ts` ✅ - System entity schemas
- `index.ts` ✅ - Schema exports

**API Contracts (`packages/contracts/src/api/`):**

- `auth.ts` ✅ - Authentication API contracts (login, register, password reset)
- `auth.api.ts` ✅ - Additional auth API schemas
- `user.ts` ✅ - User API contracts
- `user.api.ts` ✅ - User API request/response schemas
- `organization.ts` ✅ - Organization API contracts
- `organization.api.ts` ✅ - Organization API schemas
- `assessment.api.ts` ✅ - Assessment API contracts
- `content.api.ts` ✅ - Content API contracts
- `community.api.ts` ✅ - Community API contracts
- `index.ts` ✅ - API contract exports

**Business Logic Schemas (`packages/contracts/src/business/`):**

- `aggregates.schemas.ts` ✅ - Aggregate schemas
- `computed.schemas.ts` ✅ - Computed field schemas
- `domain.schemas.ts` ✅ - Domain-specific schemas
- `workflows.schemas.ts` ✅ - Workflow schemas
- `index.ts` ✅ - Business schema exports

**Validation Schemas (`packages/contracts/src/validation/`):**

- `common.schemas.ts` ✅ - Common validation schemas
- `conditional.schemas.ts` ✅ - Conditional validation schemas
- `constraints.schemas.ts` ✅ - Constraint validation schemas
- `formats.schemas.ts` ✅ - Format validation schemas
- `index.ts` ✅ - Validation schema exports

**Operations (`packages/contracts/src/operations/`):**

- `ai.operations.ts` ✅ - AI operations
- `assessment.operations.ts` ✅ - Assessment operations
- `content.operations.ts` ✅ - Content operations
- `organization.operations.ts` ✅ - Organization operations
- `user.operations.ts` ✅ - User operations
- `index.ts` ✅ - Operations exports

**Contract Generation Status:**

- ✅ **Entity Schemas**: Fully generated with all database fields (25+ fields per entity)
- ✅ **API Contracts**: Complete request/response validation schemas
- ✅ **Type Safety**: Full TypeScript compliance with strict validation
- ✅ **Enum Validation**: All enum constraints properly enforced
- ✅ **Nullable Handling**: Correct optional/nullable field handling in create schemas
- ✅ **Default Values**: Proper default value application
- ✅ **Validation Tests**: All schemas pass comprehensive validation tests

**Generation Script Status:**

- ✅ **Script**: `scripts/generate-contracts-fixed.js` - Fully functional
- ✅ **Output**: All contracts generated successfully
- ✅ **TypeScript**: Compiles without errors
- ✅ **Validation**: Passes all runtime validation tests

**Issues:** None identified - Contracts system is production-ready

---

### 5. **SERVICES** - Business Logic Layer

**Primary Location:** `packages/shared/src/services/`
**Secondary Location:** `apps/alan-hirsch-platform/lib/services/`

**Files:**

**Core Services (`packages/shared/src/services/`):**

- `base.service.ts` ✅ - Abstract base service class
- `assessment.service.ts` ✅ - Assessment business logic
- `content.service.ts` ✅ - Content business logic
- `organization.service.ts` ✅ - Organization business logic
- `community.service.ts` ✅ - Community business logic
- `user.service.ts` ✅ - User business logic
- `analytics.service.ts` ✅ - Analytics business logic
- `upload.service.ts` ✅ - File upload service
- `index.ts` ✅ - Service exports
- `service-instances.ts` ✅ - Service factory and instances
- `service.test.ts` ✅ - Service tests
- `integration.example.ts` ✅ - Integration examples
- `README.md` ✅ - Service documentation

**Application Services (`apps/alan-hirsch-platform/lib/services/`):**

- `base.service.ts` ✅ - App-specific base service
- `user.service.ts` ✅ - App-specific user service
- `organization.service.ts` ✅ - App-specific organization service
- `content.service.ts` ✅ - App-specific content service
- `assessment.service.ts` ✅ - App-specific assessment service
- `analytics.service.ts` ✅ - App-specific analytics service
- `ai.service.ts` ✅ - App-specific AI service
- `index.ts` ✅ - App service exports
- `types.ts` ✅ - Service type definitions

**Status:** ✅ **COMPLETE** - Comprehensive service layer
**Issues:**

- ⚠️ **DUPLICATION** - Services exist in both shared and app packages
- ⚠️ **INCONSISTENCY** - App-specific services may conflict with shared services

---

### 6. **ROUTES** - API Route Handlers

**Location:** `apps/alan-hirsch-platform/app/auth/api/`

**Files:**

**Assessment Routes:**

- `assessments/route.ts` ✅ - Main assessments endpoint
- `assessments/[id]/route.ts` ✅ - Individual assessment operations
- `assessments/[id]/questions/route.ts` ✅ - Assessment questions
- `assessments/[id]/responses/route.ts` ✅ - Assessment responses
- `assessments/bulk/route.ts` ✅ - Bulk assessment operations
- `assessments-new/route.ts` ✅ - New assessment endpoint
- `assessments-new/[id]/route.ts` ✅ - New assessment by ID

**Organization Routes:**

- `organizations/route.ts` ✅ - Main organizations endpoint
- `organizations/[id]/route.ts` ✅ - Individual organization operations
- `organizations/[id]/members/route.ts` ✅ - Organization membership management
- `organizations/[id]/invite/route.ts` ✅ - Organization invitations

**Content Routes:**

- `content/route.ts` ✅ - Main content endpoint
- `content/[id]/route.ts` ✅ - Individual content operations
- `content/[id]/archive/route.ts` ✅ - Content archiving
- `content/[id]/publish/route.ts` ✅ - Content publishing
- `content/bulk/route.ts` ✅ - Bulk content operations
- `content/categories/route.ts` ✅ - Content categories
- `content/series/route.ts` ✅ - Content series

**Community Routes:**

- `communities/route.ts` ✅ - Main communities endpoint
- `communities/[id]/route.ts` ✅ - Individual community operations

**User Routes:**

- `users/route.ts` ✅ - Main users endpoint
- `users/[id]/route.ts` ✅ - Individual user operations
- `users/bulk/route.ts` ✅ - Bulk user operations
- `user/profile/route.ts` ✅ - User profile management
- `user/profiles/route.ts` ✅ - User profiles listing
- `user/assessments/route.ts` ✅ - User assessments
- `user/assessments/[id]/route.ts` ✅ - Individual user assessment
- `user/assessments/[id]/complete/route.ts` ✅ - Assessment completion
- `user/assessments/[id]/responses/route.ts` ✅ - User assessment responses
- `userProfiles/route.ts` ✅ - User profiles endpoint
- `userProfiles/[id]/route.ts` ✅ - User profile by ID

**Ministry Routes:**

- `ministry/route.ts` ✅ - Main ministry endpoint
- `ministry/analytics/route.ts` ✅ - Ministry analytics
- `ministry/assessments/route.ts` ✅ - Ministry assessments
- `ministry/assessments/[id]/route.ts` ✅ - Ministry assessment by ID
- `ministry/communities/route.ts` ✅ - Ministry communities
- `ministry/communities/[id]/route.ts` ✅ - Ministry community by ID
- `ministry/communities/[id]/join/route.ts` ✅ - Community join endpoint
- `ministry/content/route.ts` ✅ - Ministry content
- `ministry/content/[id]/route.ts` ✅ - Ministry content by ID
- `ministry/organizations/route.ts` ✅ - Ministry organizations
- `ministry/organizations/[id]/route.ts` ✅ - Ministry organization by ID
- `ministry/organizations/[id]/members/route.ts` ✅ - Ministry organization members
- `ministry/upload/route.ts` ✅ - Ministry file uploads

**System Routes:**

- `health/route.ts` ✅ - Health check endpoint
- `ready/route.ts` ✅ - Readiness check endpoint
- `metrics/route.ts` ✅ - Metrics endpoint
- `team/route.ts` ✅ - Team management
- `upload/route.ts` ✅ - File uploads

**Payment Routes:**

- `stripe/checkout/route.ts` ✅ - Stripe checkout
- `stripe/webhook/route.ts` ✅ - Stripe webhooks

**Auth Routes:**

- `auth/callback/route.ts` ✅ - Auth callback

**Status:** ✅ **COMPLETE** - Comprehensive API route coverage
**Issues:**

- ⚠️ **DUPLICATION** - `assessments` and `assessments-new` routes may overlap
- ⚠️ **INCONSISTENCY** - `user` vs `users` vs `userProfiles` naming inconsistency

---

### 7. **HOOKS** - React Hooks for Data Management

**Location:** `apps/alan-hirsch-platform/hooks/`

**Files:**

- `useAssessment.ts` ✅ - Assessment data hooks
- `useContent.ts` ✅ - Content data hooks
- `useDataState.ts` ✅ - Generic data state management
- `useOrganization.ts` ✅ - Organization data hooks
- `useUserProfile.ts` ✅ - User profile data hooks
- `index.ts` ✅ - Hook exports
- `README.md` ✅ - Hook documentation

**Status:** ✅ **COMPLETE** - Core data management hooks present
**Issues:**

- ⚠️ **LIMITED SCOPE** - Only 5 hook files for a complex application
- ⚠️ **MISSING HOOKS** - No hooks for communities, analytics, payments, etc.

---

### 8. **LIB** - Utility Libraries and Shared Code

**Location:** `apps/alan-hirsch-platform/lib/`

**Files:**

**API Layer (`lib/api/`):**

- `error-handler.ts` ✅ - API error handling
- `route-handler.ts` ✅ - Route handler utilities
- `route-handlers.ts` ✅ - Standardized route handlers
- `validation-middleware.ts` ✅ - Request validation middleware

**Contracts (`lib/contracts/`):**

- `index.ts` ✅ - Contract exports

**Environment (`lib/`):**

- `env.ts` ✅ - Environment configuration
- `env.examples.ts` ✅ - Environment examples
- `env.types.ts` ✅ - Environment type definitions

**Hooks (`lib/hooks/`):**

- `index.ts` ✅ - Hook utilities

**Mappers (`lib/mappers/`):**

- `ai.ts` ✅ - AI mappers
- `assessment.ts` ✅ - Assessment mappers
- `content.ts` ✅ - Content mappers
- `organization.ts` ✅ - Organization mappers
- `user.ts` ✅ - User mappers
- `index.ts` ✅ - Mapper exports

**Mocks (`lib/mocks/`):**

- `contract-validators.ts` ✅ - Contract validation mocks
- `database.ts` ✅ - Database mocks
- `enhanced-database-mocking.ts` ✅ - Enhanced database mocks
- `enhanced-test-data-factories.ts` ✅ - Test data factories
- `index.ts` ✅ - Mock exports
- `ministry-platform.ts` ✅ - Ministry platform mocks
- `stripe.ts` ✅ - Stripe mocks
- `supabase.ts` ✅ - Supabase mocks

**Schemas (`lib/schemas/`):**

- `api.schemas.ts` ✅ - API schemas
- `crud.schemas.ts` ✅ - CRUD operation schemas
- `database.schemas.ts` ✅ - Database schemas

**Services (`lib/services/`):**

- `ai.service.ts` ✅ - AI service
- `analytics.service.ts` ✅ - Analytics service
- `assessment.service.ts` ✅ - Assessment service
- `base.service.ts` ✅ - Base service
- `content.service.ts` ✅ - Content service
- `index.ts` ✅ - Service exports
- `organization.service.ts` ✅ - Organization service
- `types.ts` ✅ - Service types
- `user.service.ts` ✅ - User service

**Types (`lib/types/`):**

- `component-props.ts` ✅ - Component prop types

**Utils (`lib/utils/`):**

- `api.ts` ✅ - API utilities
- `utils.ts` ✅ - General utilities

**Core Files:**

- `api-client.ts` ✅ - API client
- `test-utils.ts` ✅ - Test utilities

**Status:** ✅ **COMPREHENSIVE** - Extensive utility library
**Issues:**

- ⚠️ **DUPLICATION** - Many files duplicate functionality from shared packages
- ⚠️ **INCONSISTENCY** - App-specific implementations may conflict with shared implementations

---

## 📊 **SUMMARY ANALYSIS**

### ✅ **STRENGTHS**

1. **Comprehensive Schema System** - Complete database schema coverage
2. **Robust Type System** - Extensive TypeScript type definitions
3. **Complete Contract System** - Full Zod schema and API contract coverage
4. **Extensive Service Layer** - Comprehensive business logic implementation
5. **Complete API Coverage** - All major entities have API endpoints
6. **Good Documentation** - README files and inline documentation present

### ⚠️ **ISSUES IDENTIFIED**

#### **1. DUPLICATION PROBLEMS**

**Mappers:**

- Shared: `packages/shared/src/mappers/`
- App: `apps/alan-hirsch-platform/lib/mappers/`
- **Issue:** Duplicate mapper implementations

**Services:**

- Shared: `packages/shared/src/services/`
- App: `apps/alan-hirsch-platform/lib/services/`
- **Issue:** Duplicate service implementations

**Types:**

- Multiple locations for similar type definitions
- **Issue:** Potential type conflicts

#### **2. NAMING INCONSISTENCIES**

**API Routes:**

- `user/` vs `users/` vs `userProfiles/`
- `assessments/` vs `assessments-new/`
- **Issue:** Confusing API structure

#### **3. LIMITED HOOK COVERAGE**

**Missing Hooks:**

- Community management hooks
- Analytics hooks
- Payment hooks
- File upload hooks
- **Issue:** Incomplete frontend data management

#### **4. ARCHITECTURAL CONFUSION**

**Mixed Responsibilities:**

- App-specific implementations in shared packages
- Shared implementations in app packages
- **Issue:** Unclear separation of concerns

---

## 🎯 **RECOMMENDATIONS**

### **1. IMMEDIATE ACTIONS**

1. **Consolidate Duplicate Files**
   - Choose either shared or app-specific implementations
   - Remove duplicates to prevent conflicts

2. **Standardize Naming**
   - Use consistent naming for API routes
   - Align file naming conventions

3. **Expand Hook Coverage**
   - Create missing hooks for all major entities
   - Ensure consistent hook patterns

### **2. ARCHITECTURAL IMPROVEMENTS**

1. **Clear Separation of Concerns**
   - Shared packages: Core business logic, types, contracts
   - App packages: UI-specific implementations, hooks, components

2. **Consistent Import Patterns**
   - Use shared packages for core functionality
   - Use app packages only for app-specific needs

3. **Documentation Updates**
   - Update README files to reflect current architecture
   - Create migration guides for any changes

---

## 📁 **FILE COUNT SUMMARY**

| Category      | Files | Status           | Issues               |
| ------------- | ----- | ---------------- | -------------------- |
| **Schema**    | 10    | ✅ Complete      | None                 |
| **Types**     | 5+    | ✅ Complete      | None                 |
| **Mappers**   | 15+   | ✅ Complete      | Duplication          |
| **Contracts** | 35+   | ✅ Complete      | None                 |
| **Services**  | 20+   | ✅ Complete      | Duplication          |
| **Routes**    | 50+   | ✅ Complete      | Naming inconsistency |
| **Hooks**     | 6     | ⚠️ Limited       | Missing coverage     |
| **Lib**       | 40+   | ✅ Comprehensive | Duplication          |

**Total Files Analyzed:** 180+ files across all categories

---

**This document provides a complete mapping of the Alan Hirsch Digital Platform workspace. Use this as a reference for understanding the current file structure and identifying areas for improvement.**

_Last updated: 2025-10-06_
