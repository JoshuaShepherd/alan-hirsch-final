# Alan Hirsch Digital Platform - Access Control Matrix

**Generated:** January 27, 2025
**Project:** alan-hirsch (nepvfebkqvuqbxthttao)
**Status:** ✅ COMPREHENSIVE ACCESS CONTROL DOCUMENTATION

## Overview

This document provides a comprehensive access control matrix for the Alan Hirsch Digital Platform, detailing who can access what data under which conditions. The matrix covers all 12 currently deployed tables with their RLS policies.

## Access Control Patterns

### User Roles

| Role                    | Description                | Access Level                 |
| ----------------------- | -------------------------- | ---------------------------- |
| **Anonymous**           | Unauthenticated users      | Limited public access        |
| **Authenticated**       | Logged-in users            | Own data + public content    |
| **Organization Member** | Active organization member | Organization data + own data |
| **Organization Admin**  | Organization administrator | Full organization access     |
| **Organization Owner**  | Organization account owner | Full organization control    |

### Access Types

| Access Type      | Description                 | Example                                |
| ---------------- | --------------------------- | -------------------------------------- |
| **Own**          | User's own data             | User's profile, assessments            |
| **Public**       | Publicly accessible content | Published articles, public communities |
| **Organization** | Organization-scoped data    | Organization members, org content      |
| **Admin**        | Administrative access       | System management, user management     |

## Detailed Access Control Matrix

### 1. User Profiles (`user_profiles`)

| User Type            | SELECT | INSERT | UPDATE | DELETE | Conditions                                                                |
| -------------------- | ------ | ------ | ------ | ------ | ------------------------------------------------------------------------- |
| **Own Profile**      | ✅     | ✅     | ✅     | ❌     | `auth.uid() = id`                                                         |
| **Public Profiles**  | ✅     | ❌     | ❌     | ❌     | `account_status = 'active' AND privacy_settings->>'publicProfile' = true` |
| **Private Profiles** | ❌     | ❌     | ❌     | ❌     | Other users' private profiles                                             |
| **Anonymous**        | ✅     | ❌     | ❌     | ❌     | Public profiles only                                                      |

**Key Policies:**

- Users have full control over their own profile
- Public profiles are visible to all users
- Private profiles are only visible to the owner
- No deletion allowed (soft delete via account_status)

### 2. Organizations (`organizations`)

| User Type                | SELECT | INSERT | UPDATE | DELETE | Conditions                      |
| ------------------------ | ------ | ------ | ------ | ------ | ------------------------------- |
| **Organization Members** | ✅     | ❌     | ❌     | ❌     | Active membership required      |
| **Organization Owners**  | ✅     | ✅     | ✅     | ❌     | `auth.uid() = account_owner_id` |
| **Non-Members**          | ❌     | ❌     | ❌     | ❌     | No access to organization data  |
| **Anonymous**            | ❌     | ❌     | ❌     | ❌     | No access                       |

**Key Policies:**

- Organization members can view organization data
- Only account owners can create and update organizations
- No deletion allowed (soft delete via status)
- Strong data isolation between organizations

### 3. Organization Memberships (`organization_memberships`)

| User Type             | SELECT | INSERT | UPDATE | DELETE | Conditions                            |
| --------------------- | ------ | ------ | ------ | ------ | ------------------------------------- |
| **Own Memberships**   | ✅     | ✅     | ✅     | ❌     | `auth.uid() = user_id`                |
| **Other Memberships** | ❌     | ❌     | ❌     | ❌     | No access to other users' memberships |
| **Anonymous**         | ❌     | ❌     | ❌     | ❌     | No access                             |

**Key Policies:**

- Users can manage their own memberships
- Self-service organization joining
- No access to other users' membership data
- Privacy protection for membership information

### 4. Content Categories (`content_categories`)

| User Type               | SELECT | INSERT | UPDATE | DELETE | Conditions                       |
| ----------------------- | ------ | ------ | ------ | ------ | -------------------------------- |
| **All Users**           | ✅     | ❌     | ❌     | ❌     | `is_active = true`               |
| **Inactive Categories** | ❌     | ❌     | ❌     | ❌     | No access to inactive categories |
| **Anonymous**           | ✅     | ❌     | ❌     | ❌     | Active categories only           |

**Key Policies:**

- All active categories are publicly readable
- No user-specific access control
- Categories are designed for public consumption
- Inactive categories are hidden

### 5. Content Items (`content_items`)

| User Type                      | SELECT | INSERT | UPDATE | DELETE | Conditions                                       |
| ------------------------------ | ------ | ------ | ------ | ------ | ------------------------------------------------ |
| **Published Public Content**   | ✅     | ❌     | ❌     | ❌     | `status = 'published' AND visibility = 'public'` |
| **Content Authors**            | ✅     | ✅     | ✅     | ✅     | `auth.uid() = author_id`                         |
| **Draft Content (Non-Author)** | ❌     | ❌     | ❌     | ❌     | Only authors can access drafts                   |
| **Anonymous**                  | ✅     | ❌     | ❌     | ❌     | Published public content only                    |

**Key Policies:**

- Published public content is accessible to all
- Authors have full control over their content
- Draft content is private to authors
- Content ownership is strictly enforced

### 6. Subscription Plans (`subscription_plans`)

| User Type          | SELECT | INSERT | UPDATE | DELETE | Conditions                  |
| ------------------ | ------ | ------ | ------ | ------ | --------------------------- |
| **All Users**      | ✅     | ❌     | ❌     | ❌     | `is_active = true`          |
| **Inactive Plans** | ❌     | ❌     | ❌     | ❌     | No access to inactive plans |
| **Anonymous**      | ✅     | ❌     | ❌     | ❌     | Active plans only           |

**Key Policies:**

- All active subscription plans are publicly readable
- Plans are designed for marketing and selection
- Inactive plans are hidden from users
- No user-specific access control

### 7. User Subscriptions (`user_subscriptions`)

| User Type                      | SELECT | INSERT | UPDATE | DELETE | Conditions                              |
| ------------------------------ | ------ | ------ | ------ | ------ | --------------------------------------- |
| **Own Subscriptions**          | ✅     | ✅     | ✅     | ❌     | `auth.uid() = user_id`                  |
| **Other Users' Subscriptions** | ❌     | ❌     | ❌     | ❌     | No access to other users' subscriptions |
| **Anonymous**                  | ❌     | ❌     | ❌     | ❌     | No access                               |

**Key Policies:**

- Users can only access their own subscription data
- Subscription information is private
- Users can manage their own subscriptions
- Strong privacy protection for billing data

### 8. Communities (`communities`)

| User Type                            | SELECT | INSERT | UPDATE | DELETE | Conditions                       |
| ------------------------------------ | ------ | ------ | ------ | ------ | -------------------------------- |
| **Public Communities**               | ✅     | ❌     | ❌     | ❌     | `visibility = 'public'`          |
| **Private Communities (Non-Member)** | ❌     | ❌     | ❌     | ❌     | No access to private communities |
| **Community Creators**               | ✅     | ✅     | ✅     | ✅     | `auth.uid() = created_by`        |
| **Anonymous**                        | ✅     | ❌     | ❌     | ❌     | Public communities only          |

**Key Policies:**

- Public communities are discoverable by all
- Private communities require membership
- Community creators have full control
- Community visibility is strictly enforced

### 9. Assessments (`assessments`)

| User Type               | SELECT | INSERT | UPDATE | DELETE | Conditions                       |
| ----------------------- | ------ | ------ | ------ | ------ | -------------------------------- |
| **Authenticated Users** | ✅     | ❌     | ❌     | ❌     | Authentication required          |
| **Anonymous**           | ❌     | ❌     | ❌     | ❌     | No access without authentication |

**Key Policies:**

- All assessments are visible to authenticated users
- No user-specific access control
- Assessments are designed for user participation
- Authentication required for access

### 10. Assessment Questions (`assessment_questions`)

| User Type               | SELECT | INSERT | UPDATE | DELETE | Conditions                       |
| ----------------------- | ------ | ------ | ------ | ------ | -------------------------------- |
| **Authenticated Users** | ✅     | ❌     | ❌     | ❌     | Authentication required          |
| **Anonymous**           | ❌     | ❌     | ❌     | ❌     | No access without authentication |

**Key Policies:**

- All assessment questions are visible to authenticated users
- Questions are part of the assessment system
- No user-specific access control
- Authentication required for access

### 11. User Assessments (`user_assessments`)

| User Type                    | SELECT | INSERT | UPDATE | DELETE | Conditions                            |
| ---------------------------- | ------ | ------ | ------ | ------ | ------------------------------------- |
| **Own Assessments**          | ✅     | ✅     | ✅     | ❌     | `auth.uid() = user_id`                |
| **Other Users' Assessments** | ❌     | ❌     | ❌     | ❌     | No access to other users' assessments |
| **Anonymous**                | ❌     | ❌     | ❌     | ❌     | No access                             |

**Key Policies:**

- Users can only access their own assessment results
- Assessment results are private to users
- Users can take and manage their own assessments
- Strong privacy protection for assessment data

### 12. Assessment Responses (`assessment_responses`)

| User Type                  | SELECT | INSERT | UPDATE | DELETE | Conditions                          |
| -------------------------- | ------ | ------ | ------ | ------ | ----------------------------------- |
| **Own Responses**          | ✅     | ✅     | ✅     | ❌     | Through own user assessments        |
| **Other Users' Responses** | ❌     | ❌     | ❌     | ❌     | No access to other users' responses |
| **Anonymous**              | ❌     | ❌     | ❌     | ❌     | No access                           |

**Key Policies:**

- Users can only access their own assessment responses
- Individual responses are private to users
- Responses are linked to user assessments
- Strong privacy protection for response data

## Security Principles

### 1. Data Ownership

- Users have full control over their own data
- No cross-user data access without explicit permission
- Privacy settings are respected throughout the system

### 2. Organization Isolation

- Organization data is isolated between organizations
- Members can only access their organization's data
- Strong boundaries prevent data leakage

### 3. Public Content Strategy

- Appropriate content is publicly accessible
- Published content follows visibility rules
- Categories and plans are designed for public consumption

### 4. Authentication Requirements

- Sensitive operations require authentication
- Anonymous users have limited access
- User-specific data requires proper authentication

### 5. Privacy by Design

- Privacy settings are enforced at the database level
- User preferences are respected
- Sensitive data is protected by default

## Access Control Testing

### Test Scenarios

1. **User Ownership Tests**
   - Users can access their own data
   - Users cannot access other users' data
   - Privacy settings are enforced

2. **Organization Access Tests**
   - Members can access organization data
   - Non-members cannot access organization data
   - Organization boundaries are maintained

3. **Public Content Tests**
   - Public content is accessible to all
   - Private content is protected
   - Visibility rules are enforced

4. **Authentication Tests**
   - Anonymous users have limited access
   - Authenticated users have appropriate access
   - Authentication requirements are enforced

### Test Coverage

- ✅ User profile access control
- ✅ Organization membership access control
- ✅ Content visibility access control
- ✅ Assessment privacy access control
- ✅ Subscription privacy access control
- ✅ Community access control

## Compliance and Security

### GDPR Compliance

- User data is protected by RLS policies
- Privacy settings are enforced
- Data access is logged and auditable
- Users control their own data

### Security Best Practices

- Principle of least privilege implemented
- Defense in depth with multiple security layers
- Regular security audits and testing
- Comprehensive access control documentation

### Monitoring and Auditing

- All access attempts are logged
- Failed access attempts are monitored
- Security violations are tracked
- Regular security reviews conducted

## Future Considerations

### Planned Tables

When deploying additional tables, ensure:

- RLS is enabled on all new tables
- Appropriate policies are implemented
- Access control patterns are followed
- Security principles are maintained

### Policy Updates

- Regular review of access control policies
- Updates based on security requirements
- Testing of policy changes
- Documentation updates

---

**Conclusion**

The Alan Hirsch Digital Platform implements comprehensive access control through Row-Level Security policies. The system ensures:

- ✅ Data privacy and security
- ✅ User control over personal data
- ✅ Organization data isolation
- ✅ Appropriate public content access
- ✅ Strong authentication requirements
- ✅ Compliance with security best practices

The access control matrix provides clear guidelines for who can access what data under which conditions, ensuring the platform maintains high security standards while providing appropriate functionality to users.

