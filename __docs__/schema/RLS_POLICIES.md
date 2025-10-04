# Row Level Security (RLS) Policies Documentation

**Generated:** 2025-01-27
**Source:** Direct Supabase MCP introspection
**Project:** alan-hirsch (nepvfebkqvuqbxthttao)

## Overview

All tables in the Alan Hirsch platform implement Row Level Security (RLS) with comprehensive policies that ensure data privacy, security, and proper access control. This document provides detailed information about each RLS policy.

## Policy Summary

| Table                      | RLS Enabled | Total Policies | Read Policies | Write Policies |
| -------------------------- | ----------- | -------------- | ------------- | -------------- |
| `user_profiles`            | ✅          | 4              | 2             | 2              |
| `organizations`            | ✅          | 3              | 1             | 2              |
| `organization_memberships` | ✅          | 3              | 1             | 2              |
| `content_categories`       | ✅          | 1              | 1             | 0              |
| `content_items`            | ✅          | 2              | 1             | 1              |
| `subscription_plans`       | ✅          | 1              | 1             | 0              |
| `user_subscriptions`       | ✅          | 1              | 1             | 0              |
| `communities`              | ✅          | 1              | 1             | 0              |
| `assessments`              | ✅          | 1              | 1             | 0              |
| `assessment_questions`     | ✅          | 1              | 1             | 0              |
| `user_assessments`         | ✅          | 3              | 1             | 2              |
| `assessment_responses`     | ✅          | 3              | 1             | 2              |

**Total Policies:** 25

## Detailed Policy Documentation

### User Profiles

#### `user_profiles` - 4 Policies

**1. Public profiles are viewable** (SELECT, public)

```sql
(account_status = 'active'::text) AND (((privacy_settings ->> 'public_profile'::text))::boolean = true)
```

- **Purpose:** Allows public access to user profiles that are active and have public profile enabled
- **Scope:** Public users
- **Condition:** Account must be active AND user must have enabled public profile in privacy settings

**2. Users can insert own profile** (INSERT, public)

```sql
auth.uid() = id
```

- **Purpose:** Users can create their own profile
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

**3. Users can update own profile** (UPDATE, public)

```sql
auth.uid() = id
```

- **Purpose:** Users can update their own profile
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

**4. Users can view own profile** (SELECT, public)

```sql
auth.uid() = id
```

- **Purpose:** Users can always view their own profile regardless of privacy settings
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

### Organizations

#### `organizations` - 3 Policies

**1. Organization members can view org data** (SELECT, public)

```sql
EXISTS ( SELECT 1
   FROM organization_memberships
  WHERE ((organization_memberships.organization_id = organizations.id) AND (organization_memberships.user_id = auth.uid()) AND (organization_memberships.status = 'active'::text)))
```

- **Purpose:** Organization members can view organization data
- **Scope:** Organization members
- **Condition:** User must be an active member of the organization

**2. Organization owners can update** (UPDATE, public)

```sql
auth.uid() = account_owner_id
```

- **Purpose:** Account owners can update organization details
- **Scope:** Account owners
- **Condition:** User must be the account owner

**3. Users can create organizations** (INSERT, public)

```sql
auth.uid() = account_owner_id
```

- **Purpose:** Users can create organizations where they are the account owner
- **Scope:** Authenticated users
- **Condition:** User must be set as the account owner

### Organization Memberships

#### `organization_memberships` - 3 Policies

**1. Users can create memberships** (INSERT, public)

```sql
user_id = auth.uid()
```

- **Purpose:** Users can create memberships for themselves
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

**2. Users can update own memberships** (UPDATE, public)

```sql
user_id = auth.uid()
```

- **Purpose:** Users can update their own membership details
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

**3. Users can view own memberships** (SELECT, public)

```sql
user_id = auth.uid()
```

- **Purpose:** Users can view their own membership records
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

### Content Categories

#### `content_categories` - 1 Policy

**1. Content categories are publicly readable** (SELECT, public)

```sql
is_active = true
```

- **Purpose:** Public access to active content categories
- **Scope:** Public users
- **Condition:** Category must be active

### Content Items

#### `content_items` - 2 Policies

**1. Authors can manage their own content** (ALL, public)

```sql
auth.uid() = author_id
```

- **Purpose:** Authors have full control over their content (SELECT, INSERT, UPDATE, DELETE)
- **Scope:** Content authors
- **Condition:** User must be the author of the content

**2. Published content is publicly readable** (SELECT, public)

```sql
(status = 'published'::text) AND (visibility = 'public'::text)
```

- **Purpose:** Published content with public visibility is accessible to everyone
- **Scope:** Public users
- **Condition:** Content must be published AND have public visibility

### Subscription Plans

#### `subscription_plans` - 1 Policy

**1. Subscription plans are publicly readable** (SELECT, public)

```sql
is_active = true
```

- **Purpose:** Public access to active subscription plans
- **Scope:** Public users
- **Condition:** Plan must be active

### User Subscriptions

#### `user_subscriptions` - 1 Policy

**1. Users can view own subscriptions** (SELECT, public)

```sql
user_id = auth.uid()
```

- **Purpose:** Users can view their own subscription records
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

### Communities

#### `communities` - 1 Policy

**1. Public communities are viewable** (SELECT, public)

```sql
visibility = 'public'::text
```

- **Purpose:** Public access to communities with public visibility
- **Scope:** Public users
- **Condition:** Community must have public visibility

### Assessments

#### `assessments` - 1 Policy

**1. Assessments are viewable by authenticated users** (SELECT, authenticated)

```sql
true
```

- **Purpose:** All authenticated users can view assessments
- **Scope:** Authenticated users
- **Condition:** User must be authenticated (no additional conditions)

### Assessment Questions

#### `assessment_questions` - 1 Policy

**1. Assessment questions are viewable by authenticated users** (SELECT, authenticated)

```sql
true
```

- **Purpose:** All authenticated users can view assessment questions
- **Scope:** Authenticated users
- **Condition:** User must be authenticated (no additional conditions)

### User Assessments

#### `user_assessments` - 3 Policies

**1. Users can create their own assessments** (INSERT, authenticated)

```sql
((auth.uid())::text = (user_id)::text)
```

- **Purpose:** Users can create assessment attempts for themselves
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

**2. Users can update their own assessments** (UPDATE, authenticated)

```sql
((auth.uid())::text = (user_id)::text)
```

- **Purpose:** Users can update their own assessment attempts
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

**3. Users can view their own assessments** (SELECT, authenticated)

```sql
((auth.uid())::text = (user_id)::text)
```

- **Purpose:** Users can view their own assessment results
- **Scope:** Authenticated users
- **Condition:** User ID must match the authenticated user's ID

### Assessment Responses

#### `assessment_responses` - 3 Policies

**1. Users can create their own assessment responses** (INSERT, authenticated)

```sql
(EXISTS ( SELECT 1
   FROM user_assessments
  WHERE ((user_assessments.id = assessment_responses.user_assessment_id) AND ((auth.uid())::text = (user_assessments.user_id)::text))))
```

- **Purpose:** Users can create responses for their own assessments
- **Scope:** Authenticated users
- **Condition:** Response must belong to a user assessment owned by the authenticated user

**2. Users can update their own assessment responses** (UPDATE, authenticated)

```sql
(EXISTS ( SELECT 1
   FROM user_assessments
  WHERE ((user_assessments.id = assessment_responses.user_assessment_id) AND ((auth.uid())::text = (user_assessments.user_id)::text))))
```

- **Purpose:** Users can update responses for their own assessments
- **Scope:** Authenticated users
- **Condition:** Response must belong to a user assessment owned by the authenticated user

**3. Users can view their own assessment responses** (SELECT, authenticated)

```sql
(EXISTS ( SELECT 1
   FROM user_assessments
  WHERE ((user_assessments.id = assessment_responses.user_assessment_id) AND ((auth.uid())::text = (user_assessments.user_id)::text))))
```

- **Purpose:** Users can view responses for their own assessments
- **Scope:** Authenticated users
- **Condition:** Response must belong to a user assessment owned by the authenticated user

## Security Principles

### 1. Data Isolation

- Users can only access their own data
- Assessment results are private to individual users
- Organization data is restricted to members

### 2. Public Content Filtering

- Only published content with public visibility is accessible
- Active categories and plans are publicly readable
- Public communities are accessible to all

### 3. Role-Based Access

- Account owners have full control over their organizations
- Organization members can view organization data
- Content authors have full control over their content

### 4. Assessment Privacy

- Assessment questions and definitions are viewable by authenticated users
- Individual assessment results are private to users
- Responses are tied to user ownership through assessment relationships

### 5. Authentication Requirements

- Most user-specific operations require authentication
- Public content is accessible without authentication
- Assessment system requires authentication for participation

## Policy Testing

To test RLS policies, you can use the following approaches:

1. **Direct SQL Testing:**

   ```sql
   -- Test as authenticated user
   SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid-here"}';
   SELECT * FROM user_profiles;

   -- Test as anonymous user
   SET LOCAL "request.jwt.claims" TO NULL;
   SELECT * FROM content_items WHERE status = 'published';
   ```

2. **Application Testing:**
   - Test with different user roles
   - Verify public vs. private content access
   - Test organization membership scenarios

3. **Policy Validation:**
   - Ensure policies work as expected
   - Test edge cases and boundary conditions
   - Verify no data leakage occurs

---

**This documentation reflects the current RLS policy implementation as of 2025-01-27. Policies may be updated as the application evolves.**
