# 🗺️ **Alan Hirsch Final Project - Workspace Map**

**Project Type**: Next.js 14+ Monorepo with TypeScript, Supabase, and Drizzle ORM
**Architecture**: Full-stack ministry platform with AI integration
**Status**: 🚧 In Development - API Infrastructure Recovery Phase

---

## 📁 **Root Directory Structure**

```
/Users/joshshepherd/Projects/alan-hirsch-final/
├── 📁 app/                          # Next.js App Router (Main Application)
├── 📁 components/                   # React Components (UI Layer)
├── 📁 hooks/                        # Custom React Hooks
├── 📁 lib/                          # Core Business Logic & Utilities
├── 📁 packages/                     # Monorepo Packages
├── 📁 src/                          # Additional Source Code
├── 📁 supabase/                     # Supabase Configuration & Migrations
├── 📁 tests/                        # E2E Tests
├── 📁 __tests__/                    # Unit & Integration Tests
├── 📁 __docs__/                     # Comprehensive Documentation
├── 📁 validations/                  # Zod Validation Schemas
├── 📁 types/                        # Global TypeScript Types
├── 📁 scripts/                      # Utility Scripts
├── 📁 _output/                      # Generated Reports & Outputs
└── 📄 Configuration Files
```

---

## 🏗️ **Monorepo Architecture Overview**

### **Package Structure**

```
packages/
├── 📦 database/                     # Database Schema & Migrations
│   ├── package.json
│   ├── tsconfig.json
│   ├── drizzle.config.js
│   └── schema.ts
├── 📦 shared/                       # Shared Utilities & Types
│   ├── package.json
│   ├── tsconfig.json
│   └── index.ts
├── 📦 ui/                           # Reusable UI Components
│   ├── package.json
│   ├── tsconfig.json
│   └── index.ts
└── 📦 eslint-config/                # Shared ESLint Configuration
    ├── package.json
    ├── eslint.config.js
    └── index.js
```

### **Workspace Configuration**

- **`pnpm-workspace.yaml`**: Defines workspace packages
- **`turbo.json`**: Turborepo configuration for build orchestration
- **`workspace.json`**: Additional workspace metadata

---

## 🎯 **Core Application Structure**

### **Next.js App Router (`/app`)**

```
app/
├── 📁 (dashboard)/                  # Protected Dashboard Routes
│   ├── page.tsx                     # Dashboard Home
│   ├── assessments/                 # Assessment Management
│   ├── content/                     # Content Management
│   ├── community/                   # Community Features
│   ├── analytics/                   # Analytics Dashboard
│   └── settings/                    # User Settings
├── 📁 (login)/                      # Authentication Routes
│   ├── sign-in/page.tsx             # Sign In
│   ├── sign-up/page.tsx             # Sign Up
│   └── page.tsx                     # Auth Landing
├── 📁 api/                          # API Routes
│   ├── user/                        # User Management APIs
│   ├── assessments/                 # Assessment APIs
│   ├── content/                     # Content APIs
│   ├── ministry/                    # Ministry Platform APIs
│   └── auth/                        # Authentication APIs
├── 📁 auth/                         # Auth Callback Routes
├── layout.tsx                       # Root Layout
├── globals.css                      # Global Styles
└── not-found.tsx                    # 404 Page
```

### **Component Architecture (`/components`)**

```
components/
├── 📁 ui/                           # shadcn/ui Components (45 files)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ... (42 more UI components)
├── 📁 forms/                        # Form Components (16 files)
│   ├── assessment-form.tsx
│   ├── content-form.tsx
│   ├── user-profile-form.tsx
│   └── ... (13 more form components)
├── 📁 display/                      # Display Components (20 files)
│   ├── assessment-results.tsx
│   ├── content-grid.tsx
│   ├── user-profile.tsx
│   └── ... (17 more display components)
├── 📁 content/                      # Content-Specific Components (3 files)
├── auth-debug.tsx                   # Auth Debug Component
└── auth-error-boundary.tsx          # Auth Error Boundary
```

---

## 🧠 **Business Logic Layer (`/lib`)**

### **Database Layer (`/lib/db`)**

```
lib/db/
├── 📁 schema/                       # Database Schema Definitions
├── 📁 queries/                      # Database Query Functions
├── 📁 migrations/                   # Database Migrations
├── drizzle.ts                       # Drizzle ORM Configuration
├── queries.ts                       # Main Query Functions
├── setup.ts                         # Database Setup
├── seed.ts                          # Database Seeding
├── type-guards.ts                   # Type Guard Functions
└── schema.ts                        # Schema Index
```

### **API Layer (`/lib/api`)**

```
lib/api/
├── route-handler.ts                 # Generic Route Handler
├── ministry-route-handler.ts        # Ministry-Specific Handler
├── error-handler.ts                 # Error Handling
├── response-formatter.ts            # Response Formatting
├── validation-middleware.ts         # Request Validation
└── ... (6 more API utilities)
```

### **Service Layer (`/lib/services`)**

```
lib/services/
├── base.service.ts                  # Base Service Class
├── user.service.ts                  # User Management Service
├── organization.service.ts          # Organization Service
├── assessment.service.ts            # Assessment Service
├── content.service.ts               # Content Service
├── community.service.ts             # Community Service
├── subscription.service.ts          # Subscription Service
├── analytics.service.ts             # Analytics Service
├── ai.service.ts                    # AI Integration Service
└── index.ts                         # Service Exports
```

### **Contract & Mapper Layer**

```
lib/
├── 📁 contracts/                    # API Contract Definitions (10 files)
│   ├── index.ts                     # Main Contract Exports
│   ├── assessments.request.ts       # Assessment Request Contracts
│   ├── assessments.response.ts      # Assessment Response Contracts
│   ├── content.request.ts           # Content Request Contracts
│   ├── content.response.ts          # Content Response Contracts
│   ├── ministry-platform.request.ts # Ministry Platform Requests
│   ├── ministry-platform.response.ts# Ministry Platform Responses
│   ├── ai.response.ts               # AI Response Contracts
│   ├── api-responses.ts             # Generic API Responses
│   └── scoring.ts                   # Scoring Contracts
└── 📁 mappers/                      # Data Transformation Layer (7 files)
    ├── index.ts                     # Mapper Exports
    ├── assessments.ts               # Assessment Data Mappers
    ├── content.ts                   # Content Data Mappers
    ├── user-profiles.ts             # User Profile Mappers
    ├── organizations.ts             # Organization Mappers
    ├── ministry-platform.ts         # Ministry Platform Mappers
    └── ai.ts                        # AI Response Mappers
```

---

## 🔐 **Authentication & Authorization**

### **Supabase Integration (`/lib/supabase`)**

```
lib/supabase/
├── client.ts                        # Supabase Client (Browser)
├── server.ts                        # Supabase Client (Server)
└── middleware.ts                    # Auth Middleware
```

### **Authentication Flow**

1. **Client-Side**: `lib/supabase/client.ts` - Browser authentication
2. **Server-Side**: `lib/supabase/server.ts` - Server-side auth context
3. **Middleware**: `lib/supabase/middleware.ts` - Route protection
4. **Auth Components**: `components/auth-*.tsx` - Auth UI components

---

## 🧪 **Testing Architecture**

### **Test Structure**

```
__tests__/                           # Unit & Integration Tests
├── 📁 api/                          # API Route Tests
│   ├── assessments/                 # Assessment API Tests
│   ├── content/                     # Content API Tests
│   ├── organizations/               # Organization API Tests
│   ├── user/                        # User API Tests
│   ├── type-safe-routes.test.ts     # Route Type Safety Tests
│   └── error-scenarios.test.ts      # Error Handling Tests
├── 📁 ui/                           # UI Component Tests (6 files)
├── 📁 forms/                        # Form Component Tests
├── 📁 mappers/                      # Mapper Function Tests
├── 📁 mocks/                        # Mock Data & Utilities (4 files)
├── 📁 templates/                    # Test Templates
└── 📁 validations/                  # Validation Schema Tests

tests/                               # E2E Tests
├── 📁 e2e/                          # End-to-End Tests (6 files)
├── 📁 rls/                          # Row Level Security Tests
│   ├── rls-policies.test.ts         # RLS Policy Tests
│   └── test-helpers.ts              # RLS Test Utilities
└── setup.ts                         # E2E Test Setup
```

---

## 📊 **Data Layer Architecture**

### **Schema System**

```
validations/                         # Zod Validation Schemas
├── index.ts                         # Schema Exports
├── assessments.ts                   # Assessment Validation
├── content.ts                       # Content Validation
├── auth.ts                          # Authentication Validation
├── community.ts                     # Community Validation
├── ministry-platform.ts             # Ministry Platform Validation
├── analytics.ts                     # Analytics Validation
├── subscriptions.ts                 # Subscription Validation
├── ai.ts                            # AI Validation
├── shared.ts                        # Shared Validation Schemas
├── system.ts                        # System Validation
└── README.md                        # Validation Documentation

src/lib/schemas/                     # Advanced Schema System
├── index.ts                         # Schema Aggregation
├── database.schemas.ts              # Database Entity Schemas
├── crud.schemas.ts                  # CRUD Operation Schemas
├── api.schemas.ts                   # API Request/Response Schemas
├── form.schemas.ts                  # Form Validation Schemas
├── shared.schemas.ts                # Shared Schema Components
├── validation.helpers.ts            # Validation Helper Functions
└── schema.validation.test.ts        # Schema Validation Tests
```

### **Type System**

```
types/
└── index.ts                         # Global TypeScript Types

lib/types/
└── index.ts                         # Business Logic Types
```

---

## 🗄️ **Database Architecture**

### **Supabase Setup**

```
supabase/
├── config.toml                      # Supabase Configuration
├── 📁 migrations/                   # Database Migrations (3 files)
└── seed.sql                         # Database Seed Data
```

### **Database Schema**

- **User Management**: `user_profiles`, `organizations`, `organization_memberships`
- **Content System**: `content_categories`, `content_items`
- **Assessment System**: `assessments`, `assessment_questions`, `user_assessments`, `assessment_responses`
- **Subscription & Billing**: `subscription_plans`, `user_subscriptions`
- **Community**: `communities`

---

## 📚 **Documentation System (`/__docs__`)**

### **Documentation Structure**

```
__docs__/
├── 📁 MASTER/                       # Master Documentation (10 files)
│   ├── PLATFORM_OVERVIEW.md         # Platform Overview
│   ├── API_DOCUMENTATION.md         # API Documentation
│   ├── DATABASE_CONNECTION_REQUIREMENTS.md
│   ├── DB_SCHEMA_GUIDE.md           # Database Schema Guide
│   ├── DEPLOYMENT_GUIDE.md          # Deployment Instructions
│   ├── ENVIRONMENT_SETUP.md         # Environment Setup
│   ├── MAPPER_GUIDELINES.md         # Mapper Guidelines
│   ├── QUERY_COOKBOOK.md            # Database Query Examples
│   ├── RLS_PLAYBOOK.md              # Row Level Security Guide
│   └── TYPE_SYSTEM_GUIDE.md         # Type System Documentation
├── 📁 rls/                          # RLS Documentation (6 files)
├── 📁 schema/                       # Schema Documentation
├── 📁 prompts/                      # AI Prompts (25 files)
├── 📁 plans/                        # Implementation Plans
├── 📁 queries/                      # Query Documentation
├── 📁 adrs/                         # Architecture Decision Records
└── Various Implementation Summaries
```

---

## 🛠️ **Development Tools & Scripts**

### **Configuration Files**

```
├── next.config.ts                   # Next.js Configuration
├── tailwind.config.ts               # Tailwind CSS Configuration
├── tsconfig.json                    # TypeScript Configuration
├── tsconfig.base.json               # Base TypeScript Config
├── tsconfig.packages.json           # Package TypeScript Config
├── tsconfig.test.json               # Test TypeScript Config
├── vitest.config.ts                 # Vitest Configuration
├── playwright.config.ts             # Playwright E2E Configuration
├── drizzle.config.ts                # Drizzle ORM Configuration
├── eslint.config.js                 # ESLint Configuration
├── postcss.config.mjs               # PostCSS Configuration
├── components.json                  # shadcn/ui Configuration
├── lint-staged.config.js            # Lint-staged Configuration
└── vercel.json                      # Vercel Deployment Configuration
```

### **Scripts (`/scripts`)**

```
scripts/
├── health-check.ts                  # System Health Check
├── phase5-ui-test-runner.ts         # UI Test Runner
├── phase6-e2e-test-runner.ts        # E2E Test Runner
├── phase9-deployment-test-runner.ts # Deployment Test Runner
├── type-safety-validation.ts        # Type Safety Validation
├── verify-test-setup.ts             # Test Setup Verification
└── weekly-audit.ts                  # Weekly System Audit
```

---

## 🎨 **UI & Styling**

### **Styling Architecture**

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library (45 components)
- **CSS Modules**: Component-scoped styles
- **PostCSS**: CSS processing

### **Component System**

- **Atomic Design**: Components organized by complexity
- **Design System**: Consistent UI patterns
- **Accessibility**: WCAG compliant components
- **Responsive**: Mobile-first design approach

---

## 🔄 **Data Flow Architecture**

### **Request Flow**

1. **Frontend** → API Routes (`/app/api`)
2. **API Routes** → Service Layer (`/lib/services`)
3. **Service Layer** → Database Layer (`/lib/db`)
4. **Database Layer** → Supabase/PostgreSQL

### **Response Flow**

1. **Database** → Mappers (`/lib/mappers`)
2. **Mappers** → Contracts (`/lib/contracts`)
3. **Contracts** → API Routes
4. **API Routes** → Frontend Components

---

## 🚀 **Deployment & Infrastructure**

### **Deployment Target**

- **Platform**: Vercel
- **Database**: Supabase (PostgreSQL)
- **CDN**: Vercel Edge Network
- **Environment**: Production, Staging, Development

### **Environment Management**

- **Development**: Local with Supabase local instance
- **Staging**: Vercel preview deployments
- **Production**: Vercel production deployment

---

## 📈 **Current Status & Metrics**

### **Test Coverage**

- **Total Tests**: 397 tests
- **Current Pass Rate**: 82% (up from 19%)
- **Schema Validation**: ✅ 33/33 tests passing
- **API Tests**: 🚧 In recovery phase
- **UI Tests**: 🚧 In recovery phase
- **E2E Tests**: 🚧 In recovery phase

### **Code Quality**

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with custom rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality gates

---

## 🔧 **Troubleshooting Quick Reference**

### **Common Issues**

1. **Schema Validation Failures**: Check `src/lib/schemas/` and `validations/`
2. **API Route Errors**: Check `app/api/` and `lib/services/`
3. **Database Connection**: Check `lib/supabase/` and `supabase/config.toml`
4. **Type Errors**: Check `types/` and `lib/contracts/`
5. **Test Failures**: Check `__tests__/` and `tests/`

### **Key Files for Debugging**

- `lib/db/queries.ts` - Database operations
- `lib/contracts/index.ts` - API contracts
- `lib/mappers/index.ts` - Data transformation
- `src/lib/schemas/validation.helpers.ts` - Schema validation
- `__docs__/MASTER/` - Comprehensive documentation

---

_Last Updated: January 27, 2025_
_Project Status: API Infrastructure Recovery - Phase 1 Complete_
_Next Phase: Authentication & RLS Policy Testing_
