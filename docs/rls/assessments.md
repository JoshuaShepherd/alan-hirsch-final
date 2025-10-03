# Assessments RLS Playbook

This document provides a comprehensive guide to Row Level Security (RLS) policies for the assessments system, including policy definitions, access patterns, troubleshooting, and maintenance procedures.

## Overview

The assessments system implements RLS to ensure data privacy and security across all assessment-related tables. Each table has specific policies that control access based on user roles and data ownership.

## RLS Status

All assessment tables have RLS enabled:

- ✅ `assessments` - RLS enabled
- ✅ `assessment_questions` - RLS enabled  
- ✅ `user_assessments` - RLS enabled
- ✅ `assessment_responses` - RLS enabled

## Policy Definitions

### assessments Table

**Policy: "Assessments are viewable by authenticated users"**
- **Command**: SELECT
- **Roles**: `authenticated`
- **Predicate**: `true`
- **Description**: All authenticated users can view all assessments

```sql
CREATE POLICY "Assessments are viewable by authenticated users" ON "assessments"
    FOR SELECT TO authenticated
    USING (true);
```

**Access Patterns**:
- ✅ Authenticated users can read all assessments
- ❌ Anonymous users cannot access assessments
- ❌ No INSERT/UPDATE/DELETE policies (admin-only operations)

### assessment_questions Table

**Policy: "Assessment questions are viewable by authenticated users"**
- **Command**: SELECT
- **Roles**: `authenticated`
- **Predicate**: `true`
- **Description**: All authenticated users can view all assessment questions

```sql
CREATE POLICY "Assessment questions are viewable by authenticated users" ON "assessment_questions"
    FOR SELECT TO authenticated
    USING (true);
```

**Access Patterns**:
- ✅ Authenticated users can read all questions
- ❌ Anonymous users cannot access questions
- ❌ No INSERT/UPDATE/DELETE policies (admin-only operations)

### user_assessments Table

**Policy: "Users can view their own assessments"**
- **Command**: SELECT
- **Roles**: `authenticated`
- **Predicate**: `auth.uid()::text = user_id::text`
- **Description**: Users can only view their own assessment results

```sql
CREATE POLICY "Users can view their own assessments" ON "user_assessments"
    FOR SELECT TO authenticated
    USING (auth.uid()::text = user_id::text);
```

**Policy: "Users can create their own assessments"**
- **Command**: INSERT
- **Roles**: `authenticated`
- **Predicate**: `auth.uid()::text = user_id::text`
- **Description**: Users can only create assessments for themselves

```sql
CREATE POLICY "Users can create their own assessments" ON "user_assessments"
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid()::text = user_id::text);
```

**Policy: "Users can update their own assessments"**
- **Command**: UPDATE
- **Roles**: `authenticated`
- **Predicate**: `auth.uid()::text = user_id::text`
- **Description**: Users can only update their own assessment results

```sql
CREATE POLICY "Users can update their own assessments" ON "user_assessments"
    FOR UPDATE TO authenticated
    USING (auth.uid()::text = user_id::text);
```

**Access Patterns**:
- ✅ Users can read their own assessments
- ✅ Users can create assessments for themselves
- ✅ Users can update their own assessments
- ❌ Users cannot access other users' assessments
- ❌ No DELETE policy (admin-only operation)

### assessment_responses Table

**Policy: "Users can view their own assessment responses"**
- **Command**: SELECT
- **Roles**: `authenticated`
- **Predicate**: `EXISTS (SELECT 1 FROM user_assessments WHERE user_assessments.id = assessment_responses.user_assessment_id AND auth.uid()::text = user_assessments.user_id::text)`
- **Description**: Users can only view responses for their own assessments

```sql
CREATE POLICY "Users can view their own assessment responses" ON "assessment_responses"
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_assessments 
        WHERE user_assessments.id = assessment_responses.user_assessment_id 
        AND auth.uid()::text = user_assessments.user_id::text
    ));
```

**Policy: "Users can create their own assessment responses"**
- **Command**: INSERT
- **Roles**: `authenticated`
- **Predicate**: `EXISTS (SELECT 1 FROM user_assessments WHERE user_assessments.id = assessment_responses.user_assessment_id AND auth.uid()::text = user_assessments.user_id::text)`
- **Description**: Users can only create responses for their own assessments

```sql
CREATE POLICY "Users can create their own assessment responses" ON "assessment_responses"
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM user_assessments 
        WHERE user_assessments.id = assessment_responses.user_assessment_id 
        AND auth.uid()::text = user_assessments.user_id::text
    ));
```

**Policy: "Users can update their own assessment responses"**
- **Command**: UPDATE
- **Roles**: `authenticated`
- **Predicate**: `EXISTS (SELECT 1 FROM user_assessments WHERE user_assessments.id = assessment_responses.user_assessment_id AND auth.uid()::text = user_assessments.user_id::text)`
- **Description**: Users can only update responses for their own assessments

```sql
CREATE POLICY "Users can update their own assessment responses" ON "assessment_responses"
    FOR UPDATE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_assessments 
        WHERE user_assessments.id = assessment_responses.user_assessment_id 
        AND auth.uid()::text = user_assessments.user_id::text
    ));
```

**Access Patterns**:
- ✅ Users can read their own assessment responses
- ✅ Users can create responses for their own assessments
- ✅ Users can update their own assessment responses
- ❌ Users cannot access other users' responses
- ❌ No DELETE policy (admin-only operation)

## Role-Based Access Examples

### Anonymous User (Not Authenticated)

```sql
-- All queries return no results or permission denied
SELECT * FROM assessments;                    -- ❌ Permission denied
SELECT * FROM assessment_questions;           -- ❌ Permission denied
SELECT * FROM user_assessments;               -- ❌ Permission denied
SELECT * FROM assessment_responses;           -- ❌ Permission denied
```

### Authenticated User (Regular User)

```sql
-- Can view all assessments and questions
SELECT * FROM assessments;                    -- ✅ Returns all assessments
SELECT * FROM assessment_questions;           -- ✅ Returns all questions

-- Can only access their own assessment data
SELECT * FROM user_assessments 
WHERE user_id = auth.uid();                   -- ✅ Returns their assessments

SELECT * FROM assessment_responses ar
JOIN user_assessments ua ON ar.user_assessment_id = ua.id
WHERE ua.user_id = auth.uid();                -- ✅ Returns their responses

-- Cannot access other users' data
SELECT * FROM user_assessments 
WHERE user_id != auth.uid();                  -- ❌ Returns no results

SELECT * FROM assessment_responses ar
JOIN user_assessments ua ON ar.user_assessment_id = ua.id
WHERE ua.user_id != auth.uid();               -- ❌ Returns no results
```

### Service Role (Admin/System)

```sql
-- Service role bypasses RLS and can access all data
SET LOCAL role TO service_role;

SELECT * FROM assessments;                    -- ✅ Returns all assessments
SELECT * FROM assessment_questions;           -- ✅ Returns all questions
SELECT * FROM user_assessments;               -- ✅ Returns all user assessments
SELECT * FROM assessment_responses;           -- ✅ Returns all responses

-- Can perform admin operations
INSERT INTO assessments (name, slug, assessment_type, questions_count)
VALUES ('New Assessment', 'new-assessment', 'apest', 10);

UPDATE assessments SET status = 'active' WHERE id = '...';
DELETE FROM assessments WHERE id = '...';
```

## Troubleshooting

### Common Issues

#### 1. "Permission denied" errors

**Symptoms**: Users get permission denied when trying to access assessment data

**Causes**:
- User not authenticated
- RLS policies not properly configured
- Incorrect user ID matching

**Solutions**:
```sql
-- Check if user is authenticated
SELECT auth.uid();

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('assessments', 'assessment_questions', 'user_assessments', 'assessment_responses');

-- Check policy existence
SELECT policyname, cmd, roles, qual 
FROM pg_policies 
WHERE tablename = 'user_assessments';
```

#### 2. Users can't see their own assessments

**Symptoms**: Authenticated users get empty results for their own assessments

**Causes**:
- User ID type mismatch (uuid vs text)
- Incorrect policy predicate
- Missing user_assessments record

**Solutions**:
```sql
-- Check user ID format
SELECT auth.uid(), auth.uid()::text;

-- Test policy predicate
SELECT * FROM user_assessments 
WHERE auth.uid()::text = user_id::text;

-- Verify user_assessments exist
SELECT COUNT(*) FROM user_assessments WHERE user_id = auth.uid();
```

#### 3. Assessment responses not accessible

**Symptoms**: Users can't access their assessment responses

**Causes**:
- Missing user_assessment_id relationship
- Incorrect policy predicate
- Cascade delete issues

**Solutions**:
```sql
-- Check response relationships
SELECT ar.*, ua.user_id 
FROM assessment_responses ar
JOIN user_assessments ua ON ar.user_assessment_id = ua.id
WHERE ua.user_id = auth.uid();

-- Test policy predicate
SELECT * FROM assessment_responses ar
WHERE EXISTS (
    SELECT 1 FROM user_assessments ua 
    WHERE ua.id = ar.user_assessment_id 
    AND ua.user_id = auth.uid()
);
```

### Debugging Queries

#### Check RLS Status
```sql
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    hasrls
FROM pg_tables 
WHERE tablename IN ('assessments', 'assessment_questions', 'user_assessments', 'assessment_responses');
```

#### List All Policies
```sql
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('assessments', 'assessment_questions', 'user_assessments', 'assessment_responses')
ORDER BY tablename, cmd;
```

#### Test Policy Predicates
```sql
-- Test assessments policy
SELECT 'assessments' as table_name, count(*) as accessible_rows
FROM assessments
UNION ALL
-- Test user_assessments policy
SELECT 'user_assessments' as table_name, count(*) as accessible_rows
FROM user_assessments
UNION ALL
-- Test assessment_responses policy
SELECT 'assessment_responses' as table_name, count(*) as accessible_rows
FROM assessment_responses;
```

#### Check User Context
```sql
SELECT 
    auth.uid() as user_id,
    auth.role() as current_role,
    current_user as database_user;
```

## Policy Management

### Adding New Policies

When adding new policies, follow these patterns:

```sql
-- Template for SELECT policy
CREATE POLICY "policy_name" ON "table_name"
    FOR SELECT TO authenticated
    USING (predicate_condition);

-- Template for INSERT policy
CREATE POLICY "policy_name" ON "table_name"
    FOR INSERT TO authenticated
    WITH CHECK (predicate_condition);

-- Template for UPDATE policy
CREATE POLICY "policy_name" ON "table_name"
    FOR UPDATE TO authenticated
    USING (predicate_condition);
```

### Modifying Existing Policies

```sql
-- Drop existing policy
DROP POLICY "policy_name" ON "table_name";

-- Create new policy
CREATE POLICY "new_policy_name" ON "table_name"
    FOR SELECT TO authenticated
    USING (new_predicate_condition);
```

### Disabling RLS (Emergency Only)

```sql
-- ⚠️ WARNING: Only for emergency situations
-- This disables RLS for the table
ALTER TABLE "table_name" DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE "table_name" ENABLE ROW LEVEL SECURITY;
```

## Testing RLS Policies

### Automated Testing

Create test cases to verify RLS policies:

```sql
-- Test 1: Anonymous user access
SET LOCAL role TO anon;
SELECT count(*) FROM assessments; -- Should return 0

-- Test 2: Authenticated user access
SET LOCAL role TO authenticated;
SELECT count(*) FROM assessments; -- Should return all assessments

-- Test 3: User can only see their own assessments
SET LOCAL role TO authenticated;
SELECT count(*) FROM user_assessments WHERE user_id = auth.uid(); -- Should return user's assessments
SELECT count(*) FROM user_assessments WHERE user_id != auth.uid(); -- Should return 0
```

### Manual Testing

1. **Test as anonymous user**:
   - Try to access assessment endpoints
   - Verify all requests are denied

2. **Test as authenticated user**:
   - Access assessment endpoints
   - Verify can see all assessments
   - Verify can only see own assessment results

3. **Test data isolation**:
   - Create assessment as User A
   - Verify User B cannot see User A's results
   - Verify User B cannot modify User A's data

## Security Considerations

### Data Privacy

- **Assessment definitions**: Public to authenticated users
- **User assessment results**: Private to the user
- **Assessment responses**: Private to the user
- **No cross-user data access**: Users cannot see other users' results

### Performance Impact

- RLS policies add overhead to queries
- Complex predicates can impact performance
- Consider indexing columns used in policy predicates
- Monitor query performance with RLS enabled

### Audit Trail

- Consider adding audit triggers for sensitive operations
- Log policy violations and access attempts
- Monitor for unusual access patterns

## Maintenance Procedures

### Regular Maintenance

1. **Review policies monthly**:
   - Verify policies are still appropriate
   - Check for any security gaps
   - Update policies as needed

2. **Monitor access patterns**:
   - Review logs for policy violations
   - Check for performance issues
   - Identify any security concerns

3. **Test policies after changes**:
   - Verify policies work as expected
   - Test all user roles and scenarios
   - Ensure no data leakage

### Emergency Procedures

1. **Disable RLS temporarily** (if absolutely necessary):
   ```sql
   ALTER TABLE "table_name" DISABLE ROW LEVEL SECURITY;
   ```

2. **Re-enable RLS**:
   ```sql
   ALTER TABLE "table_name" ENABLE ROW LEVEL SECURITY;
   ```

3. **Verify policies are active**:
   ```sql
   SELECT policyname FROM pg_policies WHERE tablename = 'table_name';
   ```

## Related Documentation

- [Schema Guide for Assessments](../schema/assessments.md)
- [API Documentation](../MASTER/API_DOCUMENTATION.md)
- [Database Design Guide](../database-design/comprehensive-brief.md)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
