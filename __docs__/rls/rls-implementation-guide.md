# Alan Hirsch Digital Platform - RLS Implementation Guide

**Generated:** January 27, 2025
**Project:** alan-hirsch (nepvfebkqvuqbxthttao)
**Status:** ✅ COMPREHENSIVE IMPLEMENTATION GUIDE

## Overview

This guide provides comprehensive instructions for implementing Row-Level Security (RLS) policies for new tables in the Alan Hirsch Digital Platform. It includes patterns, best practices, and step-by-step implementation procedures.

## Current RLS Status

### ✅ Implemented Tables (12/12)

All currently deployed tables have comprehensive RLS policies:

- `user_profiles` - User profile access control
- `organizations` - Organization-based access control
- `organization_memberships` - Membership management
- `content_categories` - Public category access
- `content_items` - Content visibility and author management
- `subscription_plans` - Public plan access
- `user_subscriptions` - User-specific subscription access
- `communities` - Community visibility control
- `assessments` - Assessment access control
- `assessment_questions` - Question access control
- `user_assessments` - User assessment privacy
- `assessment_responses` - Response privacy

### ⏳ Planned Tables (Require RLS Implementation)

The following tables are planned but not yet deployed and will need RLS policies:

#### Content Management System

- `content_series` - Series organization
- `series_content_items` - Series content relationships
- `content_cross_references` - Content cross-referencing

#### Community System

- `community_memberships` - Community participation
- `community_posts` - Community discussions
- `community_post_votes` - Community voting
- `collaborations` - Multi-author collaborations

#### Financial System

- `transactions` - Payment transactions
- `payment_methods` - User payment methods
- `coupons` - Discount coupons

#### Analytics System

- `user_analytics_events` - User behavior tracking
- `user_content_interactions` - Content interaction data
- `learning_outcomes` - Learning progress tracking
- `movement_metrics` - Platform metrics
- `performance_reports` - Performance analytics

#### System Administration

- `audit_logs` - System audit trail
- `feature_flags` - Feature management
- `user_feature_flags` - User-specific features
- `user_consents` - GDPR consent management
- `system_notifications` - System notifications
- `user_notification_status` - Notification preferences
- `api_keys` - API key management

## RLS Implementation Patterns

### 1. User Ownership Pattern

**Use Case:** Tables where users own their own data (profiles, assessments, subscriptions)

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY "Users can view own data" ON table_name
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON table_name
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data" ON table_name
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

**Examples:** `user_profiles`, `user_assessments`, `user_subscriptions`

### 2. Organization-Based Access Pattern

**Use Case:** Tables where access is based on organization membership

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Organization members can view data
CREATE POLICY "Org members can view data" ON table_name
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_memberships
            WHERE organization_id = table_name.organization_id
            AND user_id = auth.uid()
            AND status = 'active'
        )
    );

-- Organization admins can manage data
CREATE POLICY "Org admins can manage data" ON table_name
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_memberships
            WHERE organization_id = table_name.organization_id
            AND user_id = auth.uid()
            AND status = 'active'
            AND role IN ('admin', 'owner')
        )
    );
```

**Examples:** `organizations`, `organization_memberships`

### 3. Public Content Pattern

**Use Case:** Tables with content that should be publicly accessible

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Public content is readable by all
CREATE POLICY "Public content is readable" ON table_name
    FOR SELECT USING (
        status = 'published'
        AND visibility = 'public'
    );

-- Authors can manage their own content
CREATE POLICY "Authors can manage own content" ON table_name
    FOR ALL USING (auth.uid() = author_id);
```

**Examples:** `content_items`, `content_categories`

### 4. Privacy-Respecting Pattern

**Use Case:** Tables where user privacy settings must be respected

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY "Users can view own data" ON table_name
    FOR SELECT USING (auth.uid() = user_id);

-- Public data is viewable if privacy allows
CREATE POLICY "Public data with privacy respect" ON table_name
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_profiles.id = table_name.user_id
            AND (privacy_settings->>'shareData')::boolean = true
        )
    );
```

**Examples:** `user_analytics_events`, `user_content_interactions`

### 5. Community-Based Access Pattern

**Use Case:** Tables where access is based on community membership

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Community members can view data
CREATE POLICY "Community members can view data" ON table_name
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM community_memberships
            WHERE community_id = table_name.community_id
            AND user_id = auth.uid()
            AND status = 'active'
        )
    );

-- Community moderators can manage data
CREATE POLICY "Community moderators can manage data" ON table_name
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM communities
            WHERE communities.id = table_name.community_id
            AND (
                communities.created_by = auth.uid()
                OR auth.uid() = ANY(
                    SELECT jsonb_array_elements_text(communities.moderators)::uuid
                )
            )
        )
    );
```

**Examples:** `community_posts`, `community_post_votes`

## Helper Functions

### Organization Helper Functions

```sql
-- Check if user is organization member
CREATE OR REPLACE FUNCTION is_organization_member(org_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_memberships
    WHERE organization_id = org_id
    AND user_id = is_organization_member.user_id
    AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is organization admin
CREATE OR REPLACE FUNCTION is_organization_admin(org_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_memberships
    WHERE organization_id = org_id
    AND user_id = is_organization_admin.user_id
    AND status = 'active'
    AND role IN ('admin', 'owner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Subscription Helper Functions

```sql
-- Check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions
    WHERE user_id = has_active_subscription.user_id
    AND status = 'active'
    AND current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user has premium subscription
CREATE OR REPLACE FUNCTION has_premium_subscription(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions us
    JOIN subscription_plans sp ON us.plan_id = sp.id
    WHERE us.user_id = has_premium_subscription.user_id
    AND us.status = 'active'
    AND us.current_period_end > NOW()
    AND sp.content_access_level IN ('premium', 'vip')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Community Helper Functions

```sql
-- Check if user is community member
CREATE OR REPLACE FUNCTION is_community_member(community_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM community_memberships
    WHERE community_id = is_community_member.community_id
    AND user_id = is_community_member.user_id
    AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is community moderator
CREATE OR REPLACE FUNCTION is_community_moderator(community_id UUID, user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM communities
    WHERE id = community_id
    AND (
      created_by = user_id
      OR user_id = ANY(
        SELECT jsonb_array_elements_text(moderators)::uuid
      )
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Step-by-Step Implementation Guide

### Step 1: Enable RLS on Table

```sql
ALTER TABLE your_table_name ENABLE ROW LEVEL SECURITY;
```

### Step 2: Identify Access Patterns

Determine which access patterns apply to your table:

1. **User Ownership** - Users own their own data
2. **Organization-Based** - Access based on organization membership
3. **Public Content** - Content should be publicly accessible
4. **Privacy-Respecting** - User privacy settings must be respected
5. **Community-Based** - Access based on community membership

### Step 3: Create Helper Functions (if needed)

If your table requires complex access control, create helper functions:

```sql
-- Example helper function
CREATE OR REPLACE FUNCTION your_helper_function(param1 TYPE, param2 TYPE DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  -- Implementation
  RETURN condition;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Step 4: Implement Policies

Create policies based on the identified patterns:

```sql
-- Example policies
CREATE POLICY "Policy name" ON your_table_name
    FOR SELECT USING (condition);

CREATE POLICY "Policy name" ON your_table_name
    FOR INSERT WITH CHECK (condition);

CREATE POLICY "Policy name" ON your_table_name
    FOR UPDATE USING (condition);

CREATE POLICY "Policy name" ON your_table_name
    FOR DELETE USING (condition);
```

### Step 5: Test Policies

Create comprehensive tests to verify policies work correctly:

```typescript
// Example test
it('should allow users to view their own data', async () => {
  const { data, error } = await supabaseAnon
    .from('your_table_name')
    .select('*')
    .eq('user_id', TEST_USER_ID)
    .single();

  expect(error).toBeNull();
  expect(data).toBeDefined();
});
```

### Step 6: Document Policies

Update documentation with:

- Access control matrix
- Policy descriptions
- Test scenarios
- Security considerations

## Policy Naming Conventions

### Standard Naming Pattern

```
[Action] [Subject] [Condition]
```

**Examples:**

- `Users can view own profile`
- `Organization members can view org data`
- `Public content is readable`
- `Authors can manage own content`

### Action Types

- `view` - SELECT operations
- `create` - INSERT operations
- `update` - UPDATE operations
- `delete` - DELETE operations
- `manage` - ALL operations

### Subject Types

- `Users` - Individual users
- `Organization members` - Organization members
- `Authors` - Content authors
- `Public` - Public access
- `Community members` - Community members

### Condition Types

- `own [data]` - User's own data
- `org data` - Organization data
- `public [content]` - Public content
- `with [subscription]` - Subscription required

## Security Best Practices

### 1. Principle of Least Privilege

- Users should only have access to data they need
- Default to denying access
- Grant access explicitly

### 2. Defense in Depth

- Multiple layers of security
- RLS + application logic
- Authentication + authorization

### 3. Privacy by Design

- Respect user privacy settings
- Default to private
- Explicit consent for sharing

### 4. Regular Auditing

- Monitor access patterns
- Review policy effectiveness
- Update policies as needed

### 5. Testing

- Comprehensive test coverage
- Test all access scenarios
- Verify policy enforcement

## Common Pitfalls

### 1. Missing RLS Enablement

```sql
-- Always enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### 2. Incomplete Policy Coverage

```sql
-- Cover all operations
CREATE POLICY "SELECT policy" ON table_name FOR SELECT USING (...);
CREATE POLICY "INSERT policy" ON table_name FOR INSERT WITH CHECK (...);
CREATE POLICY "UPDATE policy" ON table_name FOR UPDATE USING (...);
CREATE POLICY "DELETE policy" ON table_name FOR DELETE USING (...);
```

### 3. Incorrect Policy Logic

```sql
-- Use correct conditions
-- Wrong: auth.uid() = user_id (string comparison)
-- Right: auth.uid() = user_id (UUID comparison)
```

### 4. Missing Helper Functions

```sql
-- Use helper functions for complex logic
CREATE POLICY "Complex policy" ON table_name
    FOR SELECT USING (is_organization_member(organization_id));
```

### 5. Insufficient Testing

```typescript
// Test all scenarios
// - Own data access
// - Other users' data access
// - Public data access
// - Private data access
```

## Migration Template

### New Table RLS Migration

```sql
-- Migration: Add RLS policies for new_table
-- Date: YYYY-MM-DD
-- Description: Implement RLS policies for new_table

-- Enable RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

-- Create helper functions (if needed)
CREATE OR REPLACE FUNCTION helper_function_name(param TYPE)
RETURNS BOOLEAN AS $$
BEGIN
  -- Implementation
  RETURN condition;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Implement policies
CREATE POLICY "Users can view own data" ON new_table
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own data" ON new_table
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON new_table
    FOR UPDATE USING (auth.uid() = user_id);

-- Add comments
COMMENT ON FUNCTION helper_function_name(TYPE) IS 'Description of helper function';
```

## Testing Template

### RLS Policy Test Template

```typescript
describe('RLS Policies - New Table', () => {
  let testRecordId: string;

  beforeAll(async () => {
    // Create test data
    const { data } = await supabaseService
      .from('new_table')
      .insert({
        // Test data
      })
      .select()
      .single();

    testRecordId = data.id;
  });

  it('should allow users to view their own data', async () => {
    const { data, error } = await supabaseAnon
      .from('new_table')
      .select('*')
      .eq('id', testRecordId)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
  });

  it('should prevent users from viewing other users data', async () => {
    // Create data for another user
    const { data: otherUserData } = await supabaseService
      .from('new_table')
      .insert({
        // Other user data
      })
      .select()
      .single();

    const { data, error } = await supabaseAnon
      .from('new_table')
      .select('*')
      .eq('id', otherUserData.id);

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });

  afterAll(async () => {
    // Clean up test data
    await supabaseService.from('new_table').delete().eq('id', testRecordId);
  });
});
```

## Conclusion

This guide provides comprehensive instructions for implementing RLS policies in the Alan Hirsch Digital Platform. By following these patterns and best practices, you can ensure:

- ✅ Consistent security across all tables
- ✅ Proper access control implementation
- ✅ Privacy protection for user data
- ✅ Organization data isolation
- ✅ Public content accessibility
- ✅ Comprehensive testing coverage

When implementing RLS for new tables, always:

1. Follow established patterns
2. Create appropriate helper functions
3. Implement comprehensive policies
4. Test thoroughly
5. Document completely

---

**Next Steps:**

1. Use this guide when implementing RLS for planned tables
2. Follow the established patterns and conventions
3. Create comprehensive tests for all new policies
4. Update documentation with new access control information
5. Monitor and audit policy effectiveness

