# Phase 4: Core Infrastructure - Part 2 (Days 9-11)

## Step 4.2: Create API Route Structure

**Cursor Prompt:**

```
Add Safety Training API routes to our existing Next.js app with proper type safety:

1. Create Safety Training API route handlers for all CRUD operations (alongside existing auth routes)
2. Implement proper middleware for:
   - Authentication validation
   - Request/response validation
   - Error handling
   - Logging and monitoring

3. Create Safety Training routes under `/api/safety-training/` namespace:
   - Plants, Courses, Enrollments, Progress
   - Activity Events, Question Events, Admin Roles
   - File uploads for course materials
   - Reporting and analytics
   - (Keep existing auth routes at `/api/auth/` unchanged)

4. Implement Ingress/Egress Validation Rule:
   - Every route must parse request with Zod (ingress)
   - Map DB rows → DTO using mappers
   - Parse response with Zod (egress)
   - Ensure all data transformations are validated

5. **API response envelope & pagination standard**:
   - All list routes return `{ data: T[], page, limit, total }`
   - **Routes must use the shared error taxonomy from `docs/api/error-codes.md` for all error responses**

6. Ensure all routes use proper TypeScript types and Zod validation
7. Implement consistent error handling and response formats
```

**Expected Output:**

- Complete API route structure with CRUD operations
- Middleware for authentication, validation, and error handling
- Ingress/egress validation for all routes
- Consistent response formats and error handling

**Definition of Done:**

- ✅ API routes with ingress/egress validation
- ✅ All routes use proper TypeScript types and Zod validation
- ✅ Consistent error handling and response formats

---

**Next Step:** Proceed to `12-query-modules.md`