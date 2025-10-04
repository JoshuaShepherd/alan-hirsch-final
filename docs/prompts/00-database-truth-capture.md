# Phase 0: Foundation Analysis (Day 1)

## Step 0.1: Analyze Downloaded Next.js + Supabase Starter

**Cursor Prompt:**

```
Analyze our downloaded Next.js + Supabase starter app to understand the current foundation:

1. **Examine the existing app structure:**
   - Review the file structure and organization
   - Document existing components, pages, and utilities
   - Identify the current authentication setup
   - Check existing Supabase integration and configuration

2. **Assess the current Supabase database:**
   - Connect to the Supabase project and extract any existing schema
   - Document current tables (likely just auth-related tables)
   - Review existing RLS policies
   - Check if we need to create Safety Training tables from scratch

3. **Create foundation documentation:**
   - `docs/foundation/STARTER_ANALYSIS.md` - Current app structure and capabilities
   - `docs/foundation/SUPABASE_STATUS.md` - Database state and requirements
   - `docs/foundation/TRANSFORMATION_PLAN.md` - Steps to convert to monorepo

4. **Identify transformation requirements:**
   - List missing tools needed (shadcn/ui, Drizzle, Zod, etc.)
   - Plan monorepo structure that builds around this foundation
   - Document Safety schema requirements for our 10 core tables

5. **⚠️ Redact all secrets/keys. Do not include anon/service role tokens.**

This analysis will guide our transformation from starter app to production Safety.
```

**Expected Output:**

- Complete analysis of starter app structure and capabilities
- Documentation of existing Supabase setup and database state
- Clear transformation plan from single app to monorepo
- Requirements list for Safety schema and missing tools
- **Architecture diagram showing current state → target monorepo structure**

**Definition of Done:**

- ✅ Starter app structure analyzed and documented
- ✅ Supabase database state assessed
- ✅ Transformation plan created
- ✅ Safety requirements identified
- ✅ Missing tools and dependencies catalogued

---

**Next Step:** Proceed to `01-monorepo-transformation.md`