# Phase 2: Database and Schema Setup - Part 2 (Days 4-5)

## Step 2.2: Create Safety schema Definitions

**Cursor Prompt:**

```
Create comprehensive Drizzle schema definitions for our new Safety tables:

1. **Create Safety core tables (new tables only):**
   NEED TABLES

2. **Design proper relationships:**
   - user_profiles.auth_user_id → auth.users.id (foreign key to existing auth)
   - All other tables link to user_profiles for ownership
   - Territory-based relationships for data isolation
   - Account → Contacts → Opportunities → Activities relationship chain

3. **Include enterprise-grade features:**
   - Primary keys and foreign key relationships
   - Proper data types and constraints
   - Indexes for performance (especially on territory_id, user_id)
   - Timestamps and audit fields (created_at, updated_at, created_by)
   - Territory-based access control fields for RLS

4. **Set up TypeScript integration:**
   - Export proper TypeScript types for each table
   - Set up Drizzle relations for type-safe joins
   - Create the foundation for our upcoming DTO schemas

**Key Integration:** Link Safety tables to existing Supabase auth without modifying auth schema.
```

**Expected Output:**

- Complete Safety schema definitions using Drizzle
- Proper integration with existing Supabase auth system
- TypeScript types for all Safety tables
- Migration files ready for Safety table creation
- **Existing auth functionality unchanged**

**Definition of Done:**

- ✅ All 10 Safety tables defined with proper relationships
- ✅ Integration with existing auth.users established
- ✅ TypeScript types generated for all Safety entities
- ✅ Territory-based data structure ready for RLS policies
- ✅ Migration files ready to create Safety tables in existing database

---

**Next Step:** Proceed to `06-rls-policies-creation.md`