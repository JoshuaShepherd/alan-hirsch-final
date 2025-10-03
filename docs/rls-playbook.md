# Row Level Security (RLS) Playbook

This document outlines the Row Level Security policies and best practices for the Alan Hirsch Digital Platform.

## Overview

Row Level Security (RLS) is implemented using Supabase's built-in RLS system to ensure data isolation and security at the database level.

## Core Principles

1. **Default Deny**: All tables have RLS enabled by default
2. **Principle of Least Privilege**: Users only access data they need
3. **Organization Isolation**: Users can only access data from their organization
4. **Role-Based Access**: Different access levels based on user roles

## Table Policies

### User Profiles (`user_profiles`)

```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid()::text = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = id);

-- System can insert new profiles
CREATE POLICY "System can insert profiles" ON user_profiles
  FOR INSERT WITH CHECK (true);
```

### Organizations (`organizations`)

```sql
-- Organization members can view their organization
CREATE POLICY "Members can view organization" ON organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id 
      FROM organization_memberships 
      WHERE user_id = auth.uid()::text
    )
  );

-- Organization owners can update their organization
CREATE POLICY "Owners can update organization" ON organizations
  FOR UPDATE USING (
    id IN (
      SELECT organization_id 
      FROM organization_memberships 
      WHERE user_id = auth.uid()::text 
      AND role = 'owner'
    )
  );
```

### Content Items (`content_items`)

```sql
-- Published content is visible to all authenticated users
CREATE POLICY "Published content is public" ON content_items
  FOR SELECT USING (status = 'published');

-- Authors can view their own content
CREATE POLICY "Authors can view own content" ON content_items
  FOR SELECT USING (author_id = auth.uid()::text);

-- Authors can update their own content
CREATE POLICY "Authors can update own content" ON content_items
  FOR UPDATE USING (author_id = auth.uid()::text);

-- Authors can insert new content
CREATE POLICY "Authors can insert content" ON content_items
  FOR INSERT WITH CHECK (author_id = auth.uid()::text);
```

### Organization Memberships (`organization_memberships`)

```sql
-- Users can view memberships for their organization
CREATE POLICY "Users can view org memberships" ON organization_memberships
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id 
      FROM organization_memberships 
      WHERE user_id = auth.uid()::text
    )
  );

-- Organization owners can manage memberships
CREATE POLICY "Owners can manage memberships" ON organization_memberships
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id 
      FROM organization_memberships 
      WHERE user_id = auth.uid()::text 
      AND role = 'owner'
    )
  );
```

## Best Practices

### 1. Policy Naming

Use descriptive names that clearly indicate the policy's purpose:
- `"Users can view own profile"`
- `"Organization members can view content"`
- `"Authors can update own content"`

### 2. Policy Organization

Group related policies together and use consistent naming patterns:
- `"Users can [action] [resource]"`
- `"Organization [role] can [action] [resource]"`

### 3. Performance Considerations

- Use indexes on columns used in policy conditions
- Avoid complex subqueries in policies
- Test policy performance with realistic data volumes

### 4. Testing Policies

```sql
-- Test policy with different user contexts
SET LOCAL "request.jwt.claims" TO '{"sub": "user-id"}';
SELECT * FROM user_profiles; -- Should only return user's own profile
```

### 5. Policy Maintenance

- Review policies regularly for security gaps
- Update policies when adding new features
- Document policy changes in version control
- Test policies after schema changes

## Common Patterns

### Organization-Based Access

```sql
-- Pattern for organization-scoped access
CREATE POLICY "Org members can access resource" ON table_name
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id 
      FROM organization_memberships 
      WHERE user_id = auth.uid()::text
    )
  );
```

### Owner-Only Access

```sql
-- Pattern for owner-only access
CREATE POLICY "Owners can manage resource" ON table_name
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id 
      FROM organization_memberships 
      WHERE user_id = auth.uid()::text 
      AND role = 'owner'
    )
  );
```

### Public Content Access

```sql
-- Pattern for public content
CREATE POLICY "Public content is accessible" ON content_items
  FOR SELECT USING (status = 'published');
```

## Security Considerations

1. **Never disable RLS** on production tables
2. **Test policies thoroughly** with different user contexts
3. **Monitor access patterns** for unusual behavior
4. **Regular security audits** of policy effectiveness
5. **Document policy rationale** for future maintenance

## Troubleshooting

### Common Issues

1. **Policy not working**: Check if RLS is enabled on the table
2. **Performance issues**: Review policy conditions and indexes
3. **Access denied**: Verify user context and policy conditions
4. **Data leakage**: Audit policies for security gaps

### Debugging Tools

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'your_table';

-- List all policies on a table
SELECT * FROM pg_policies 
WHERE tablename = 'your_table';

-- Test policy with specific user context
SET LOCAL "request.jwt.claims" TO '{"sub": "user-id"}';
EXPLAIN SELECT * FROM your_table;
```
