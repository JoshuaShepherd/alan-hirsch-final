# Row Level Security (RLS) Policies

```{admonition} Security Overview
:class: warning
All tables in the Alan Hirsch Platform database have Row Level Security (RLS) enabled. This ensures that users can only access data they are authorized to see.
```

## 🔐 RLS Implementation

Row Level Security is implemented at the database level using PostgreSQL's built-in RLS features. Each table has specific policies that control:

- **SELECT** - What data users can read
- **INSERT** - What data users can create
- **UPDATE** - What data users can modify
- **DELETE** - What data users can remove

## 📋 Policy Summary

### User Profiles (`user_profiles`)

```sql
-- Public profiles are viewable
CREATE POLICY "Public profiles are viewable" ON user_profiles
    FOR SELECT TO public
    USING ((account_status = 'active') AND ((privacy_settings->>'public_profile')::boolean = true));

-- Users can insert own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT TO public
    WITH CHECK (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE TO public
    USING (auth.uid() = id);

-- Users can view own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT TO public
    USING (auth.uid() = id);
```

### Organizations (`organizations`)

```sql
-- Organization members can view org data
CREATE POLICY "Organization members can view org data" ON organizations
    FOR SELECT TO public
    USING (EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE organization_memberships.organization_id = organizations.id
        AND organization_memberships.user_id = auth.uid()
        AND organization_memberships.status = 'active'
    ));

-- Organization owners can update
CREATE POLICY "Organization owners can update" ON organizations
    FOR UPDATE TO public
    USING (auth.uid() = account_owner_id)
    WITH CHECK (auth.uid() = account_owner_id);

-- Users can create organizations
CREATE POLICY "Users can create organizations" ON organizations
    FOR INSERT TO public
    WITH CHECK (auth.uid() = account_owner_id);
```

### Content Items (`content_items`)

```sql
-- Authors can manage their own content
CREATE POLICY "Authors can manage their own content" ON content_items
    FOR ALL TO public
    USING (auth.uid() = author_id);

-- Published content is publicly readable
CREATE POLICY "Published content is publicly readable" ON content_items
    FOR SELECT TO public
    USING ((status = 'published') AND (visibility = 'public'));
```

### Assessments (`assessments`)

```sql
-- Assessments are viewable by authenticated users
CREATE POLICY "Assessments are viewable by authenticated users" ON assessments
    FOR SELECT TO authenticated
    USING (true);
```

### User Assessments (`user_assessments`)

```sql
-- Users can create their own assessments
CREATE POLICY "Users can create their own assessments" ON user_assessments
    FOR INSERT TO authenticated
    WITH CHECK ((auth.uid())::text = (user_id)::text);

-- Users can update their own assessments
CREATE POLICY "Users can update their own assessments" ON user_assessments
    FOR UPDATE TO authenticated
    USING ((auth.uid())::text = (user_id)::text);

-- Users can view their own assessments
CREATE POLICY "Users can view their own assessments" ON user_assessments
    FOR SELECT TO authenticated
    USING ((auth.uid())::text = (user_id)::text);
```

## 🎯 Security Principles

### 1. **Principle of Least Privilege**

- Users can only access data they need
- No global read access to sensitive data
- Role-based permissions where appropriate

### 2. **Data Ownership**

- Users own their personal data
- Organizations own their organizational data
- Content creators own their content

### 3. **Public vs Private Data**

- Public content is accessible to all
- Private data requires authentication
- Sensitive data requires specific permissions

### 4. **Multi-tenant Isolation**

- Organization data is isolated by membership
- Users can only access organizations they belong to
- Cross-organization data access is prevented

## 🔍 Policy Testing

### Testing RLS Policies

```sql
-- Test user profile access
SELECT * FROM user_profiles WHERE id = auth.uid();

-- Test organization access
SELECT * FROM organizations
WHERE id IN (
    SELECT organization_id FROM organization_memberships
    WHERE user_id = auth.uid() AND status = 'active'
);

-- Test content access
SELECT * FROM content_items
WHERE (status = 'published' AND visibility = 'public')
   OR author_id = auth.uid();
```

### Common RLS Patterns

```sql
-- User owns data
USING (auth.uid() = user_id)

-- User is member of organization
USING (EXISTS (
    SELECT 1 FROM organization_memberships
    WHERE organization_id = organizations.id
    AND user_id = auth.uid()
    AND status = 'active'
))

-- Public data with conditions
USING (is_public = true AND status = 'active')

-- Authenticated users only
USING (auth.role() = 'authenticated')
```

## 🚨 Security Considerations

### 1. **Policy Performance**

- RLS policies can impact query performance
- Use indexes on columns referenced in policies
- Test policies with realistic data volumes

### 2. **Policy Maintenance**

- Review policies when schema changes
- Test policies after updates
- Document policy changes

### 3. **Audit Trail**

- Log policy violations
- Monitor access patterns
- Regular security reviews

## 📊 Policy Statistics

```{list-table} RLS Policy Count
:header-rows: 1
:name: rls-stats

* - Table
  - Policies
  - SELECT
  - INSERT
  - UPDATE
  - DELETE
* - user_profiles
  - 4
  - 2
  - 1
  - 1
  - 0
* - organizations
  - 3
  - 1
  - 1
  - 1
  - 0
* - content_items
  - 2
  - 1
  - 0
  - 1
  - 1
* - assessments
  - 1
  - 1
  - 0
  - 0
  - 0
* - user_assessments
  - 3
  - 1
  - 1
  - 1
  - 0
* - assessment_responses
  - 3
  - 1
  - 1
  - 1
  - 0
```

## 🔧 Troubleshooting

### Common Issues

1. **Policy Not Working**
   - Check if RLS is enabled on the table
   - Verify policy syntax
   - Test with different user roles

2. **Performance Issues**
   - Add indexes on policy columns
   - Simplify complex policy expressions
   - Use EXPLAIN to analyze query plans

3. **Access Denied**
   - Check user authentication status
   - Verify policy conditions
   - Review user permissions

### Debugging Queries

```sql
-- Check current user
SELECT auth.uid(), auth.role();

-- Check RLS status
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- List all policies
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

---

```{admonition} Security Best Practices
:class: tip
- Always test RLS policies with different user roles
- Use the principle of least privilege
- Regularly audit and review policies
- Document policy changes and rationale
```
