# Phase 2: Database and Schema Setup - Part 3 (Day 5)

## Step 2.3: Create RLS Policies for Safety Business Tables

**Cursor Prompt:**

```
Create comprehensive Row-Level Security (RLS) policies for our new Safety business tables:

1. **Preserve existing auth and training RLS policies:**
   - Document existing Supabase auth policies (don't modify them)
   - Preserve existing safety training table policies (profiles, plants, courses, etc.)
   - Ensure existing auth and training functionality continues working
   - Keep auth.users, auth.sessions, and training table policies intact

2. **Create Safety business-specific RLS policies:**
   - Territory-based access control for all new Safety business tables
   - User role-based permissions (safety_admin, safety_manager, safety_coordinator, safety_instructor, safety_rep, plant_manager, hr_admin, employee)
   - Data isolation between different territories
   - Owner-based access (users can only see their own data + territory data)

3. **Implement policy patterns for Safety business tables:**
   - **SELECT policies:** Users can read data from their territory + owned records
   - **INSERT policies:** Users can create records in their territory based on role
   - **UPDATE policies:** Users can update owned records + territory records based on role
   - **DELETE policies:** Safety admin/manager roles only, with territory restrictions

4. **Create policy testing framework:**
   - Smoke tests for each Safety business table with different user roles
   - Test scenarios: anon, authenticated user, cross-territory access
   - Verify policies work correctly with Drizzle queries
   - Test that policies don't break legitimate Safety operations

5. **Document policy architecture:**
   - Clear documentation of who can access what Safety business data
   - Safety role hierarchy and territory access patterns
   - Integration points with existing auth and training systems

**Key Principle:** Secure Safety business data without touching existing auth or training policies.

**Safety Business Tables to Secure:**
- territories, user_profiles, accounts, branches, contacts
- activity_logs, opportunities, sales_facts, products, projects
```

**Expected Output:**

- RLS policy audit report for Safety business tables
- **RLS policy implementation**: Complete SQL files with territory and role-based policies for Safety business tables
- **RLS testing suite**: `tests/rls/*.spec.ts` for all Safety business tables with comprehensive user scenarios
- **Policy documentation**: Clear access control matrix and security guidelines for Safety operations
- **Integration verification**: Confirmed compatibility with Drizzle ORM queries for Safety business tables

**Definition of Done:**

- ✅ RLS policies created for all Safety business tables
- ✅ Existing auth and training policies preserved and documented
- ✅ Policy test suite implemented and passing for Safety business tables
- ✅ Territory and role-based access control working for Safety operations
- ✅ Security audit confirms proper data isolation for Safety business data
- ✅ Integration with Drizzle queries verified for Safety business tables

---

**Next Step:** Proceed to `07-dto-zod-schemas.md`