# Phase 3: Type Contracts & Validation - Part 1 (Days 6-8)

## Step 3.1: Design Safety Business DTO-First Zod Schemas

**Cursor Prompt:**

```
Create comprehensive Zod validation schemas for Safety business entities that integrate with the existing auth and training systems:

1. **Design Safety Business DTOs based on business requirements:**
   - Safety business entity DTOs (accounts, contacts, opportunities, activities, territories, products, projects)
   - API request/response types optimized for Safety business operations
   - Form validation schemas for Safety business data entry
   - Integration schemas for auth user + Safety business entity relationships
   - Territory-scoped data transfer objects

2. **Apply integration-first DTO design:**
   - Reference existing auth.users without duplicating user data
   - Territory and role context included in Safety business DTOs
   - Dates normalized to ISO strings for API consistency  
   - Safety business-specific computed fields (opportunity progress, territory summaries)
   - Permission-based field visibility (role-dependent data access)

3. **Implement Safety business-specific validation:**
   - Territory access validation for all Safety business operations
   - Role-based field requirements (safety_admin vs safety_rep fields)
   - Safety business rule validation (opportunity stages, contact relationships)
   - Cross-entity validation (opportunity must belong to account)
   - Data integrity rules specific to Safety business workflows

4. **Preserve auth and training system compatibility:**
   - Don't modify existing auth or training DTOs or validation
   - Create separate Safety business validation namespaces
   - Ensure Safety business schemas work with existing auth middleware
   - Test that auth and training endpoints remain unaffected

5. **Export integrated TypeScript types:**
   - Pure Safety business entity types
   - Combined auth+Safety business response types
   - Territory and role-scoped utility types
   - Validation error types specific to Safety business operations
6. **Design for monorepo reusability:**
   - Create shared Safety business schema package for future apps
   - Ensure schemas work across multiple Safety business applications
   - Design territory and role patterns for reuse
```

**Expected Output:**

- Safety business-specific Zod schemas integrated with existing auth and training systems
- TypeScript types for Safety business entities and auth+Safety business combinations
- Territory and role-based validation utilities
- Comprehensive error handling for Safety business validation failures
- Schemas optimized for API consumption and business logic

**Definition of Done:**

- ✅ Safety business DTO-first Zod schemas created for all Safety business entities
- ✅ Auth and training system integration validated and preserved
- ✅ Territory and role-based validation implemented
- ✅ **Each Safety business Response schema has fixtures in `@platform/testing` with `safeParse` tests**
- ✅ **CI validates Safety business schema changes don't break auth or training compatibility**

---

**Next Step:** Proceed to `08-data-mappers.md`