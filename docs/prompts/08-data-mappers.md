# Phase 3: Type Contracts & Validation - Part 2 (Days 6-8)

## Step 3.2: Create Safety Training Data Mappers

**Cursor Prompt:**

```
Create data mapper functions that handle transformation between Safety Training entities and API responses, integrating with existing auth system:

1. **Safety training-specific data transformations:**
   - Safety training database entities (Drizzle) ↔ Safety training API responses
   - Safety training API requests ↔ Safety training database operations
   - Safety training form data ↔ Safety training database entities
   - External Safety training imports ↔ Internal Safety training data models

2. **Auth + Safety training integration mappers:**
   - auth.users + Safety training entities → Combined API responses
   - Plant-filtered database queries → Plant-scoped API responses
   - Role-based database access → Permission-filtered API data
   - Safety training entities with user context → Fully hydrated responses

3. **Mapper implementation requirements:**
   - Preserve existing auth data transformation patterns
   - Add Safety training-specific null/undefined handling
   - Handle Safety training date fields and plant codes
   - Implement plant-based data filtering
   - Add role-based field visibility logic
   - Ensure type safety for auth+Safety training combined types

4. **Integration safeguards:**
   - Don't modify existing auth mappers
   - Create separate Safety training mapper namespace
   - Test that auth endpoints remain unaffected
   - Validate combined auth+Safety training responses are properly typed

5. **Monorepo optimization:**
   - Design Safety mappers for reuse across multiple applications
   - Create shared territory and role transformation utilities
   - Ensure mappers work with both single-app and multi-app deployments

Create a centralized Safety mapper system that integrates seamlessly with existing auth mappers.
```

**Expected Output:**

- Safety data mappers integrated with existing auth system
- Auth+Safety combined response transformation utilities
- Territory and role-based data filtering mappers
- Centralized Safety mapper system for monorepo consistency
- Type-safe transformations with business logic

**Definition of Done:**

- ✅ Safety data mappers integrate seamlessly with existing auth mappers
- ✅ Territory and role-based transformation utilities implemented
- ✅ Auth+Safety combined response mappers working correctly
- ✅ All Safety transformations are type-safe and validated
- ✅ Existing auth endpoints unaffected by Safety mapper additions

---

**Next Step:** Proceed to `09-api-contracts.md`