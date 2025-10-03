# User Profiles Table

```{admonition} Core Entity
:class: tip
The `user_profiles` table is the central user management entity, storing extended profile information with ministry context and APEST integration.
```

## 📋 Table Overview

**Table Name:** `user_profiles`  
**Schema:** `public`  
**RLS:** Enabled  
**Approximate Rows:** 4  
**Primary Key:** `id` (uuid)

## 🏗️ Schema Definition

```sql
CREATE TABLE user_profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    display_name text,
    bio text,
    avatar_url text,
    ministry_role text NOT NULL,
    denomination text,
    organization_name text,
    years_in_ministry integer,
    country_code text,
    timezone text,
    cultural_context text,
    -- APEST Assessment Scores
    assessment_movement_alignment integer,
    assessment_audience_engagement integer,
    assessment_content_readiness integer,
    assessment_revenue_potential integer,
    assessment_network_effects integer,
    assessment_strategic_fit integer,
    assessment_total integer,
    leader_tier text,
    -- Platform Configuration
    subdomain text UNIQUE,
    custom_domain text UNIQUE,
    platform_title text,
    language_primary text DEFAULT 'en',
    subscription_tier text DEFAULT 'free',
    -- JSON Configuration Fields
    theological_focus jsonb DEFAULT '[]',
    brand_colors jsonb DEFAULT '{"accent": "#059669", "primary": "#2563eb", "secondary": "#64748b"}',
    email_notifications jsonb DEFAULT '{"dailyDigest": true, "revenueReports": true, "communityUpdates": true, "collaborationRequests": true}',
    privacy_settings jsonb DEFAULT '{"publicProfile": true, "shareAnalytics": false, "allowNetworking": true, "showAssessmentResults": false}',
    -- Onboarding and Status
    onboarding_completed boolean DEFAULT false,
    onboarding_step integer DEFAULT 1,
    account_status text DEFAULT 'pending_verification',
    -- Timestamps
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    last_active_at timestamp DEFAULT now()
);
```

## 🔑 Key Columns

### Identity & Contact

- **`id`** - Primary key, UUID
- **`email`** - Unique email address
- **`first_name`** - User's first name
- **`last_name`** - User's last name
- **`display_name`** - Optional display name

### Ministry Context

- **`ministry_role`** - Current ministry position
- **`denomination`** - Religious denomination
- **`organization_name`** - Associated organization
- **`years_in_ministry`** - Experience level
- **`country_code`** - Geographic location
- **`cultural_context`** - Cultural background

### APEST Assessment Integration

- **`assessment_movement_alignment`** - Movement alignment score
- **`assessment_audience_engagement`** - Audience engagement score
- **`assessment_content_readiness`** - Content readiness score
- **`assessment_revenue_potential`** - Revenue potential score
- **`assessment_network_effects`** - Network effects score
- **`assessment_strategic_fit`** - Strategic fit score
- **`assessment_total`** - Total assessment score
- **`leader_tier`** - Calculated leadership tier

### Platform Configuration

- **`subdomain`** - Unique subdomain for user's platform
- **`custom_domain`** - Custom domain (if applicable)
- **`platform_title`** - User's platform title
- **`language_primary`** - Primary language (default: 'en')
- **`subscription_tier`** - Current subscription level

### JSON Configuration Fields

#### `theological_focus`

```json
["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]
```

#### `brand_colors`

```json
{
  "accent": "#059669",
  "primary": "#2563eb",
  "secondary": "#64748b"
}
```

#### `email_notifications`

```json
{
  "dailyDigest": true,
  "revenueReports": true,
  "communityUpdates": true,
  "collaborationRequests": true
}
```

#### `privacy_settings`

```json
{
  "publicProfile": true,
  "shareAnalytics": false,
  "allowNetworking": true,
  "showAssessmentResults": false
}
```

## 🔗 Relationships

### Foreign Key References

```{list-table} Foreign Key Relationships
:header-rows: 1
:name: user-profiles-fks

* - Referenced By
  - Column
  - Relationship
* - organizations
  - account_owner_id
  - One-to-Many (User owns organizations)
* - organization_memberships
  - user_id
  - One-to-Many (User has memberships)
* - organization_memberships
  - invited_by
  - One-to-Many (User invites others)
* - user_assessments
  - user_id
  - One-to-Many (User takes assessments)
* - communities
  - created_by
  - One-to-Many (User creates communities)
* - user_subscriptions
  - user_id
  - One-to-Many (User has subscriptions)
* - user_subscriptions
  - leader_profile_id
  - One-to-Many (User is leader for subscriptions)
* - content_items
  - author_id
  - One-to-Many (User authors content)
```

## 📊 Indexes

```{list-table} Indexes
:header-rows: 1
:name: user-profiles-indexes

* - Index Name
  - Type
  - Columns
  - Purpose
* - user_profiles_pkey
  - PRIMARY KEY
  - id
  - Primary key constraint
* - user_profiles_email_key
  - UNIQUE
  - email
  - Ensure unique email addresses
* - user_profiles_subdomain_key
  - UNIQUE
  - subdomain
  - Ensure unique subdomains
* - user_profiles_custom_domain_key
  - UNIQUE
  - custom_domain
  - Ensure unique custom domains
```

## 🔐 Security Policies

### Row Level Security (RLS)

```sql
-- Public profiles are viewable (with privacy controls)
CREATE POLICY "Public profiles are viewable" ON user_profiles
    FOR SELECT TO public
    USING (
        (account_status = 'active') AND
        ((privacy_settings->>'public_profile')::boolean = true)
    );

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT TO public
    WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE TO public
    USING (auth.uid() = id);

-- Users can always view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT TO public
    USING (auth.uid() = id);
```

### Access Patterns

1. **Public Access**: Users with `publicProfile: true` and `account_status: 'active'`
2. **Self Access**: Users can always access their own profile
3. **No Delete**: No delete policy (soft delete via `account_status`)

## 📈 Usage Patterns

### Common Queries

```sql
-- Get user profile by ID
SELECT * FROM user_profiles WHERE id = $1;

-- Get public profiles
SELECT id, display_name, bio, avatar_url, ministry_role
FROM user_profiles
WHERE account_status = 'active'
  AND (privacy_settings->>'public_profile')::boolean = true;

-- Get user's APEST scores
SELECT
    assessment_movement_alignment,
    assessment_audience_engagement,
    assessment_content_readiness,
    assessment_revenue_potential,
    assessment_network_effects,
    assessment_strategic_fit,
    assessment_total,
    leader_tier
FROM user_profiles
WHERE id = $1;

-- Update user's last active timestamp
UPDATE user_profiles
SET last_active_at = now()
WHERE id = $1;
```

### Performance Considerations

- **Email Lookups**: Use the unique index on `email`
- **Subdomain Lookups**: Use the unique index on `subdomain`
- **Public Profile Queries**: Consider adding a composite index on `(account_status, privacy_settings)`
- **JSON Queries**: Use GIN indexes for JSONB columns if needed

## 🎯 Business Logic

### APEST Integration

The table includes dedicated columns for APEST (Apostolic, Prophetic, Evangelistic, Shepherding, Teaching) assessment scores:

- **Movement Alignment**: How well the user aligns with movement principles
- **Audience Engagement**: Ability to engage and connect with audiences
- **Content Readiness**: Preparedness to create and share content
- **Revenue Potential**: Potential for generating revenue
- **Network Effects**: Ability to build and leverage networks
- **Strategic Fit**: Overall strategic alignment

### Platform Customization

Users can customize their platform through:

- **Branding**: Custom colors and platform title
- **Domain**: Subdomain or custom domain
- **Language**: Primary language preference
- **Privacy**: Granular privacy controls
- **Notifications**: Email notification preferences

### Onboarding Flow

The table tracks user onboarding progress:

- **`onboarding_completed`**: Boolean flag for completion
- **`onboarding_step`**: Current step in onboarding process
- **`account_status`**: Overall account status

## 🔧 Maintenance

### Data Validation

```sql
-- Validate email format
ALTER TABLE user_profiles
ADD CONSTRAINT valid_email
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Validate subdomain format
ALTER TABLE user_profiles
ADD CONSTRAINT valid_subdomain
CHECK (subdomain ~* '^[a-z0-9-]+$' AND length(subdomain) >= 3);

-- Validate assessment scores (0-100)
ALTER TABLE user_profiles
ADD CONSTRAINT valid_assessment_scores
CHECK (
    assessment_movement_alignment BETWEEN 0 AND 100 AND
    assessment_audience_engagement BETWEEN 0 AND 100 AND
    assessment_content_readiness BETWEEN 0 AND 100 AND
    assessment_revenue_potential BETWEEN 0 AND 100 AND
    assessment_network_effects BETWEEN 0 AND 100 AND
    assessment_strategic_fit BETWEEN 0 AND 100
);
```

### Triggers

```sql
-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_user_profiles_updated_at();
```

---

```{admonition} Related Documentation
:class: info
- [Organizations Table](organizations.md) - Organization management
- [User Assessments Table](user_assessments.md) - Assessment results
- [RLS Policies](../security/rls_policies.md) - Security implementation
- [API Endpoints](../../api/endpoints.md) - API documentation
```
