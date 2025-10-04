# Row Level Security (RLS) Playbook

_Alan Hirsch Digital Platform - Current Security Policies & Access Control_

## Overview

Row Level Security (RLS) ensures users can only access data they're authorized to see. This playbook documents the **currently implemented** RLS policies with test queries that should succeed or fail.

## Current Implementation Status

**✅ IMPLEMENTED TABLES WITH RLS:**

- `user_profiles` - User profile access control with privacy settings
- `organizations` - Organization data access with membership verification
- `organization_memberships` - Membership management with role-based access
- `content_categories` - Public category access
- `content_items` - Content visibility and author management
- `content_series` - Series access control
- `series_content_items` - Series content access
- `assessments` - Assessment access control
- `assessment_questions` - Question access within assessments
- `user_assessments` - User assessment result privacy
- `assessment_responses` - Individual response privacy

**⏳ PLANNED TABLES (RLS policies not yet implemented):**

- AI conversation system tables (`ai_conversations`, `ai_messages`, `ai_content_jobs`)
- Community interaction tables (`communities`, `community_memberships`, `community_posts`)
- Financial system tables (`subscription_plans`, `user_subscriptions`, `transactions`)
- Analytics and tracking tables (`user_analytics_events`, `user_content_interactions`)
- System administration tables (`audit_logs`, `feature_flags`, `api_keys`)

## Security Principles

1. **Supabase Auth Integration**: All policies use `auth.uid()` for user identification ✅
2. **User Ownership**: Users own their profiles and subscriptions ✅
3. **Content Visibility**: Respects publication status and author permissions ✅
4. **Community Access**: Based on community visibility settings ✅
5. **Organization Boundaries**: Members can only see their organization's data ✅
6. **Privacy Settings**: Users control their profile visibility ✅
7. **JWT Validation**: All API routes validate Supabase JWT tokens ✅
8. **Audit Trail**: All sensitive actions are logged ⏳ **PLANNED**

---

## User Profiles & Authentication

### Policy: Users can view own profile

```sql
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);
```

### Policy: Users can update own profile

```sql
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);
```

### Policy: Public profiles are viewable

```sql
CREATE POLICY "Public profiles are viewable" ON user_profiles
    FOR SELECT USING (
        account_status = 'active'
        AND (privacy_settings->>'public_profile')::boolean = true
    );
```

### Test Queries

**✅ Should SUCCEED**: User viewing their own profile

```sql
-- As user 550e8400-e29b-41d4-a716-446655440000
SELECT * FROM user_profiles WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

**✅ Should SUCCEED**: Viewing public profile

```sql
-- Any authenticated user
SELECT display_name, bio, ministry_role FROM user_profiles
WHERE id = '550e8400-e29b-41d4-a716-446655440000'
AND account_status = 'active'
AND (privacy_settings->>'public_profile')::boolean = true;
```

**❌ Should FAIL**: Viewing private profile of another user

```sql
-- As user A trying to view user B's private profile
SELECT * FROM user_profiles
WHERE id = '660e8400-e29b-41d4-a716-446655440001'
AND (privacy_settings->>'public_profile')::boolean = false;
-- Returns 0 rows due to RLS
```

**❌ Should FAIL**: Updating another user's profile

```sql
-- As user A trying to update user B
UPDATE user_profiles
SET display_name = 'Hacked Name'
WHERE id = '660e8400-e29b-41d4-a716-446655440001';
-- Error: new row violates row-level security policy
```

---

## Assessments & Personal Data ⏳ **PLANNED**

> **Note**: The assessment system is planned but not yet deployed. RLS policies will be implemented when these tables are created.

**Planned Policies:**

- Users can only access their own assessments
- Assessment results respect privacy settings
- Authorized users can view aggregated assessment data

---

## AI Conversations & Messages ⏳ **PLANNED**

> **Note**: The AI conversation system is planned but not yet deployed. RLS policies will be implemented when these tables are created.

**Planned Policies:**

- Users can access their own conversations and messages
- AI conversations respect privacy settings
- System administrators can access conversations for quality control

---

## Content Access Control

### Policy: Published content is publicly readable

```sql
CREATE POLICY "Published content is publicly readable" ON content_items
    FOR SELECT USING (status = 'published' AND visibility = 'public');
```

### Policy: Authors can manage their own content

```sql
CREATE POLICY "Authors can manage their own content" ON content_items
    FOR ALL USING (auth.uid() = author_id);
```

### Policy: Premium content requires subscription ⏳ **PLANNED**

> **Note**: Premium content access control is planned but not yet implemented. Currently, all published content is publicly readable.

### Test Queries

**✅ Should SUCCEED**: Anyone reading public content

```sql
-- Public content accessible to all
SELECT title, excerpt FROM content_items
WHERE status = 'published' AND visibility = 'public';
```

**✅ Should SUCCEED**: Author accessing their draft content

```sql
-- Author viewing their unpublished content
SELECT * FROM content_items
WHERE author_id = auth.uid() AND status = 'draft';
```

**⏳ PLANNED**: Premium subscriber accessing premium content

```sql
-- Premium subscriber accessing restricted content (when implemented)
SELECT * FROM content_items
WHERE visibility = 'premium'
AND EXISTS (
    SELECT 1 FROM user_subscriptions us
    JOIN subscription_plans sp ON us.plan_id = sp.id
    WHERE us.user_id = auth.uid()
    AND us.status = 'active'
    AND sp.content_access_level IN ('premium', 'vip')
);
```

**⏳ PLANNED**: Free user accessing premium content

```sql
-- Free user trying to access premium content (when implemented)
-- (assuming user has no active premium subscription)
SELECT * FROM content_items
WHERE visibility = 'premium';
-- Will return 0 rows due to RLS when implemented
```

**❌ Should FAIL**: User accessing another's draft content

```sql
-- Trying to view someone else's draft
SELECT * FROM content_items
WHERE author_id = '660e8400-e29b-41d4-a716-446655440001'
AND status = 'draft';
-- Returns 0 rows due to RLS
```

---

## Community Access Control

### Policy: Public communities are viewable ✅ **IMPLEMENTED**

```sql
CREATE POLICY "Public communities are viewable" ON communities
    FOR SELECT USING (visibility = 'public');
```

### Test Queries

**✅ Should SUCCEED**: Anyone viewing public communities

```sql
-- Public communities visible to all
SELECT * FROM communities WHERE visibility = 'public';
```

**⏳ PLANNED**: Community members can view posts

```sql
-- Community member viewing posts (when community_posts table is implemented)
SELECT * FROM community_posts
WHERE community_id = 'dd0e8400-e29b-41d4-a716-446655440008'
AND EXISTS (
    SELECT 1 FROM community_memberships
    WHERE user_id = auth.uid()
    AND community_id = 'dd0e8400-e29b-41d4-a716-446655440008'
    AND status = 'active'
);
```

**⏳ PLANNED**: Non-member accessing private community posts

```sql
-- Non-member trying to view private community posts (when implemented)
SELECT * FROM community_posts
WHERE community_id = 'private-community-id';
-- Will return 0 rows due to RLS when implemented
```

---

## Organization Access Control

### Policy: Organization members can view org data

```sql
CREATE POLICY "Organization members can view org data" ON organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_memberships
            WHERE organization_id = organizations.id
            AND user_id = auth.uid()
            AND status = 'active'
        )
    );
```

### Test Queries

**✅ Should SUCCEED**: Organization member viewing org details

```sql
-- Active member viewing organization info
SELECT * FROM organizations o
WHERE EXISTS (
    SELECT 1 FROM organization_memberships om
    WHERE om.organization_id = o.id
    AND om.user_id = auth.uid()
    AND om.status = 'active'
);
```

**❌ Should FAIL**: Non-member accessing organization data

```sql
-- User trying to view organization they don't belong to
SELECT * FROM organizations
WHERE id = 'some-other-org-id';
-- Returns 0 rows due to RLS
```

---

## Subscription & Financial Data

### Policy: Users can view own subscriptions ✅ **IMPLEMENTED**

```sql
CREATE POLICY "Users can view own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);
```

### Policy: Subscription plans are publicly readable ✅ **IMPLEMENTED**

```sql
CREATE POLICY "Subscription plans are publicly readable" ON subscription_plans
    FOR SELECT USING (is_active = true);
```

### Test Queries

**✅ Should SUCCEED**: User viewing own subscription

```sql
-- User checking their subscription status
SELECT * FROM user_subscriptions WHERE user_id = auth.uid();
```

**✅ Should SUCCEED**: Anyone viewing active subscription plans

```sql
-- Public subscription plans visible to all
SELECT * FROM subscription_plans WHERE is_active = true;
```

**⏳ PLANNED**: User viewing own transaction history

```sql
-- User viewing their payment history (when transactions table is implemented)
SELECT * FROM transactions WHERE user_id = auth.uid();
```

**⏳ PLANNED**: User accessing another's financial data

```sql
-- Trying to view someone else's transactions (when implemented)
SELECT * FROM transactions
WHERE user_id = '660e8400-e29b-41d4-a716-446655440001';
-- Will return 0 rows due to RLS when implemented
```

---

## Content Interactions & Learning Progress ⏳ **PLANNED**

> **Note**: Content interaction tracking is planned but not yet deployed. RLS policies will be implemented when these tables are created.

**Planned Policies:**

- Users can manage their own content interactions
- Learning progress is private to the user
- Analytics data respects privacy settings

---

## Consent Management (GDPR) ⏳ **PLANNED**

> **Note**: GDPR consent management is planned but not yet deployed. RLS policies will be implemented when these tables are created.

**Planned Policies:**

- Users can manage their own consent preferences
- Consent history is private to the user
- System administrators can access consent data for compliance

---

## Admin & Audit Access

### Note on Admin Access

Admin users need special handling. Consider using:

1. **Service Role**: Bypass RLS for admin operations
2. **Admin Policies**: Separate policies for admin users
3. **Audit Context**: All admin actions logged in `audit_logs`

### Example Admin Query (using service role)

```sql
-- Admin viewing all user profiles (service role context)
SELECT
    id, email, display_name, ministry_role,
    created_at, last_active_at
FROM user_profiles
WHERE account_status = 'active'
ORDER BY last_active_at DESC;
```

---

## Testing RLS Policies

### Test Script Template

```sql
-- Set up test user context
SELECT auth.uid(); -- Should return your test user ID

-- Test 1: Own data access (should succeed)
SELECT COUNT(*) FROM user_profiles WHERE id = auth.uid();

-- Test 2: Other user's private data (should fail)
SELECT COUNT(*) FROM user_profiles
WHERE id != auth.uid()
AND (privacy_settings->>'public_profile')::boolean = false;

-- Test 3: Public content access (should succeed)
SELECT COUNT(*) FROM content_items
WHERE status = 'published' AND visibility = 'public';

-- Test 4: Premium content without subscription (should fail if no subscription)
SELECT COUNT(*) FROM content_items WHERE visibility = 'premium';
```

### Automated Testing Approach

```sql
-- Create test function to verify RLS
CREATE OR REPLACE FUNCTION test_rls_policy(
    test_user_id UUID,
    test_name TEXT,
    expected_result BOOLEAN
) RETURNS BOOLEAN AS $$
DECLARE
    actual_result BOOLEAN;
BEGIN
    -- Set user context
    PERFORM set_config('request.jwt.claims',
        json_build_object('sub', test_user_id)::text, true);

    -- Run test query and check result
    -- Implementation depends on specific test

    RETURN actual_result = expected_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Security Monitoring

### Key Metrics to Monitor

1. **Failed RLS Violations**: Queries returning 0 rows due to RLS
2. **Privilege Escalation Attempts**: Users trying to access admin functions
3. **Data Export Patterns**: Large data downloads by single users
4. **Cross-User Access Attempts**: Patterns of trying to access other users' data

### Audit Query Examples

```sql
-- Recent high-risk audit events
SELECT * FROM audit_logs
WHERE risk_level IN ('high', 'critical')
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Users with unusual data access patterns
SELECT user_id, COUNT(*) as event_count
FROM user_analytics_events
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY user_id
HAVING COUNT(*) > 100
ORDER BY event_count DESC;
```

---

## Troubleshooting RLS Issues

### Common Problems

1. **Policy Not Applied**: Check if RLS is enabled on table

```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'your_table_name';
```

2. **Policy Conflicts**: Multiple policies can be combined with OR logic

```sql
-- View all policies on a table
SELECT * FROM pg_policies WHERE tablename = 'your_table_name';
```

3. **Performance Issues**: RLS policies can impact query performance

```sql
-- Analyze query plan with RLS
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM content_items WHERE visibility = 'public';
```

### Debugging Tips

- Use `EXPLAIN` to see how RLS policies affect query plans
- Test policies with different user contexts
- Monitor `audit_logs` for unexpected access patterns
- Use service role for admin operations that need to bypass RLS

---

## Best Practices

1. **Principle of Least Privilege**: Users get minimum necessary access
2. **Defense in Depth**: Multiple layers of security (RLS + application logic)
3. **Regular Auditing**: Monitor and review access patterns
4. **Test Coverage**: Automated tests for all RLS policies
5. **Documentation**: Keep this playbook updated with schema changes
6. **Performance Monitoring**: Watch for RLS-related query slowdowns
