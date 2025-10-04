# Phase 4: Core Infrastructure - Part 3 (Days 9-11)

## Step 4.3: Build Query Modules

**Cursor Prompt:**

```
Add Safety Training query modules (pure functions) to work with our existing Supabase setup:

1. Build query modules for each Safety Training entity type using pure functions:
   - Type-safe queries using Drizzle
   - Proper error handling
   - Transaction support
   - Caching strategies
   - **All queries accept `{ plantId, userId, role }` context**

2. Create data access utilities for:
   - Complex queries and joins
   - Search and filtering
   - Pagination and sorting
   - Data aggregation and reporting

3. Implement proper database operations with:
   - Type-safe queries using Drizzle
   - Proper error handling
   - Transaction support
   - Caching strategies

4. **Query module tenancy & index hints**:
   - **For top 10 queries, generate EXPLAIN plans, document in `docs/queries/`, and add missing indexes in migrations**

5. Ensure all database operations are type-safe and use proper validation
6. Implement proper logging and monitoring for database operations
7. Use pure functions instead of repository classes for simplicity and testability
```

**Expected Output:**

- Query modules using pure functions for each entity
- Type-safe database operations with Drizzle
- Performance optimization with EXPLAIN plans
- Proper logging and monitoring

**Definition of Done:**

- ✅ Query modules using pure functions
- ✅ All database operations are type-safe and validated
- ✅ Proper logging and monitoring implemented

---

**Next Step:** Proceed to `13-component-library.md`