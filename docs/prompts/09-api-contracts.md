# Phase 3: Type Contracts & Validation - Part 3 (Days 6-8)

## Step 3.3: Define Safety Training API Contracts

**Cursor Prompt:**

```
Create comprehensive Safety Training API contracts that integrate with existing auth endpoints:

1. **Design Safety Training REST API endpoints:**
   - Safety training entity CRUD operations (plants, courses, enrollments, progress, activity_events, question_events, admin_roles)
   - Plant-scoped data access endpoints
   - Role-based permission endpoints
   - Safety training search and filtering with plant restrictions
   - Integration endpoints that combine auth users + Safety training data

2. **Preserve existing auth API contracts:**
   - Don't modify existing auth endpoint specifications
   - Ensure Safety training endpoints don't conflict with auth routes
   - Create separate API namespace for Safety training operations (/api/safety-training/*)
   - Maintain compatibility with existing auth middleware

3. **Create Safety training-specific OpenAPI specifications:**
   - All Safety training CRUD operations with plant context
   - Combined auth+Safety training response schemas
   - Plant and role-based access documentation
   - Safety training bulk operations with permission validation
   - Safety training file upload endpoints for course materials

4. **Integration requirements:**
   - Generate TypeScript client types for Safety training endpoints
   - Create Safety training API contract validation middleware
   - Build contract testing for auth+Safety training integration scenarios
   - Document Safety training endpoints with auth context examples

5. **Monorepo optimization:**
   - Design Safety training contracts for reuse across multiple apps
   - Create shared plant and role contract patterns
   - Ensure contracts work with single-app and multi-app deployments

The Safety training contracts should integrate seamlessly with existing auth contracts while maintaining clear separation.
```

**Expected Output:**

- Type-safe API contracts for all endpoints
- Proper error response types and pagination
- Utility functions for contract validation
- Reusable contracts across monorepo apps

**Definition of Done:**

- ✅ API contracts defined with proper validation
- ✅ TypeScript types generated from all schemas
- ✅ Validation utilities and error handling implemented
- ✅ All contracts designed for monorepo reusability

---

**Next Step:** Proceed to `10-authentication-system.md`