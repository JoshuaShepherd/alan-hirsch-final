# Detailed Table Documentation

**Generated:** 2025-01-27
**Source:** Direct Supabase MCP introspection
**Project:** alan-hirsch (nepvfebkqvuqbxthttao)

## Table of Contents

1. [User Management Tables](#user-management-tables)
2. [Content System Tables](#content-system-tables)
3. [Assessment System Tables](#assessment-system-tables)
4. [Subscription & Billing Tables](#subscription--billing-tables)
5. [Community Tables](#community-tables)

## User Management Tables

### user_profiles

**Purpose:** Extended user profiles with ministry context and APEST integration
**RLS:** Enabled
**Approximate Rows:** 3
**Primary Key:** `id` (uuid)

#### Columns

| Column                           | Type      | Nullable | Default                                                                                                     | Description                      |
| -------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `id`                             | uuid      | NO       | -                                                                                                           | Primary key, user identifier     |
| `email`                          | text      | NO       | -                                                                                                           | User email address (unique)      |
| `password_hash`                  | text      | YES      | -                                                                                                           | Password hash for local auth     |
| `first_name`                     | text      | NO       | -                                                                                                           | User's first name                |
| `last_name`                      | text      | NO       | -                                                                                                           | User's last name                 |
| `display_name`                   | text      | YES      | -                                                                                                           | Public display name              |
| `bio`                            | text      | YES      | -                                                                                                           | User biography                   |
| `avatar_url`                     | text      | YES      | -                                                                                                           | Profile picture URL              |
| `ministry_role`                  | text      | NO       | -                                                                                                           | Primary ministry role            |
| `denomination`                   | text      | YES      | -                                                                                                           | Religious denomination           |
| `organization_name`              | text      | YES      | -                                                                                                           | Associated organization          |
| `years_in_ministry`              | integer   | YES      | -                                                                                                           | Years of ministry experience     |
| `country_code`                   | text      | YES      | -                                                                                                           | ISO country code                 |
| `timezone`                       | text      | YES      | -                                                                                                           | User's timezone                  |
| `cultural_context`               | text      | YES      | -                                                                                                           | Cultural background context      |
| `assessment_movement_alignment`  | integer   | YES      | -                                                                                                           | APEST: Movement alignment score  |
| `assessment_audience_engagement` | integer   | YES      | -                                                                                                           | APEST: Audience engagement score |
| `assessment_content_readiness`   | integer   | YES      | -                                                                                                           | APEST: Content readiness score   |
| `assessment_revenue_potential`   | integer   | YES      | -                                                                                                           | APEST: Revenue potential score   |
| `assessment_network_effects`     | integer   | YES      | -                                                                                                           | APEST: Network effects score     |
| `assessment_strategic_fit`       | integer   | YES      | -                                                                                                           | APEST: Strategic fit score       |
| `assessment_total`               | integer   | YES      | -                                                                                                           | APEST: Total assessment score    |
| `leader_tier`                    | text      | YES      | -                                                                                                           | Leadership tier classification   |
| `subdomain`                      | text      | YES      | -                                                                                                           | Custom subdomain (unique)        |
| `custom_domain`                  | text      | YES      | -                                                                                                           | Custom domain (unique)           |
| `platform_title`                 | text      | YES      | -                                                                                                           | Platform title                   |
| `language_primary`               | text      | YES      | 'en'                                                                                                        | Primary language                 |
| `subscription_tier`              | text      | YES      | 'free'                                                                                                      | Current subscription tier        |
| `theological_focus`              | jsonb     | YES      | '[]'                                                                                                        | Array of theological focus areas |
| `brand_colors`                   | jsonb     | YES      | '{"accent": "#059669", "primary": "#2563eb", "secondary": "#64748b"}'                                       | Custom brand colors              |
| `email_notifications`            | jsonb     | YES      | '{"dailyDigest": true, "revenueReports": true, "communityUpdates": true, "collaborationRequests": true}'    | Email notification preferences   |
| `privacy_settings`               | jsonb     | YES      | '{"publicProfile": true, "shareAnalytics": false, "allowNetworking": true, "showAssessmentResults": false}' | Privacy configuration            |
| `onboarding_completed`           | boolean   | YES      | false                                                                                                       | Onboarding completion status     |
| `onboarding_step`                | integer   | YES      | 1                                                                                                           | Current onboarding step          |
| `account_status`                 | text      | YES      | 'pending_verification'                                                                                      | Account status                   |
| `created_at`                     | timestamp | NO       | now()                                                                                                       | Record creation timestamp        |
| `updated_at`                     | timestamp | NO       | now()                                                                                                       | Record update timestamp          |
| `last_active_at`                 | timestamp | NO       | now()                                                                                                       | Last activity timestamp          |

#### Indexes

- `user_profiles_pkey` (PRIMARY KEY on `id`)
- `user_profiles_email_key` (UNIQUE on `email`)
- `user_profiles_subdomain_key` (UNIQUE on `subdomain`)
- `user_profiles_custom_domain_key` (UNIQUE on `custom_domain`)

#### Foreign Key Relationships

**Outgoing:**

- `organizations.account_owner_id → user_profiles.id`
- `organization_memberships.invited_by → user_profiles.id`
- `organization_memberships.user_id → user_profiles.id`
- `user_assessments.user_id → user_profiles.id`
- `communities.created_by → user_profiles.id`
- `user_subscriptions.leader_profile_id → user_profiles.id`
- `user_subscriptions.user_id → user_profiles.id`
- `content_items.author_id → user_profiles.id`

### organizations

**Purpose:** Multi-tenant organization structure
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column              | Type      | Nullable | Default           | Description                         |
| ------------------- | --------- | -------- | ----------------- | ----------------------------------- |
| `id`                | uuid      | NO       | gen_random_uuid() | Primary key                         |
| `name`              | text      | NO       | -                 | Organization name                   |
| `slug`              | text      | NO       | -                 | URL-friendly identifier (unique)    |
| `description`       | text      | YES      | -                 | Organization description            |
| `website`           | text      | YES      | -                 | Organization website URL            |
| `logo_url`          | text      | YES      | -                 | Organization logo URL               |
| `organization_type` | text      | NO       | -                 | Type of organization                |
| `size_category`     | text      | YES      | -                 | Organization size category          |
| `contact_email`     | text      | YES      | -                 | Primary contact email               |
| `contact_phone`     | text      | YES      | -                 | Primary contact phone               |
| `address`           | jsonb     | YES      | -                 | Organization address                |
| `billing_email`     | text      | YES      | -                 | Billing contact email               |
| `account_owner_id`  | uuid      | YES      | -                 | Owner user ID (FK to user_profiles) |
| `license_type`      | text      | YES      | 'individual'      | License type                        |
| `max_users`         | integer   | YES      | 1                 | Maximum allowed users               |
| `status`            | text      | YES      | 'trial'           | Organization status                 |
| `created_at`        | timestamp | NO       | now()             | Record creation timestamp           |
| `updated_at`        | timestamp | NO       | now()             | Record update timestamp             |

#### Indexes

- `organizations_pkey` (PRIMARY KEY on `id`)
- `organizations_slug_key` (UNIQUE on `slug`)

### organization_memberships

**Purpose:** User-organization relationships with role-based access
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column            | Type      | Nullable | Default           | Description                           |
| ----------------- | --------- | -------- | ----------------- | ------------------------------------- |
| `id`              | uuid      | NO       | gen_random_uuid() | Primary key                           |
| `user_id`         | uuid      | NO       | -                 | User ID (FK to user_profiles)         |
| `organization_id` | uuid      | NO       | -                 | Organization ID (FK to organizations) |
| `role`            | text      | NO       | -                 | User role in organization             |
| `permissions`     | jsonb     | YES      | '[]'              | Role permissions                      |
| `status`          | text      | YES      | 'pending'         | Membership status                     |
| `joined_at`       | timestamp | YES      | now()             | Join timestamp                        |
| `invited_at`      | timestamp | YES      | -                 | Invitation timestamp                  |
| `invited_by`      | uuid      | YES      | -                 | Inviter user ID (FK to user_profiles) |
| `created_at`      | timestamp | NO       | now()             | Record creation timestamp             |
| `updated_at`      | timestamp | NO       | now()             | Record update timestamp               |

#### Indexes

- `organization_memberships_pkey` (PRIMARY KEY on `id`)

## Content System Tables

### content_categories

**Purpose:** Hierarchical content categorization with APEST integration
**RLS:** Enabled
**Approximate Rows:** 4
**Primary Key:** `id` (uuid)

#### Columns

| Column                     | Type      | Nullable | Default                                                                                | Description                         |
| -------------------------- | --------- | -------- | -------------------------------------------------------------------------------------- | ----------------------------------- |
| `id`                       | uuid      | NO       | gen_random_uuid()                                                                      | Primary key                         |
| `name`                     | text      | NO       | -                                                                                      | Category name                       |
| `slug`                     | text      | NO       | -                                                                                      | URL-friendly identifier (unique)    |
| `description`              | text      | YES      | -                                                                                      | Category description                |
| `parent_id`                | uuid      | YES      | -                                                                                      | Parent category ID (self-reference) |
| `order_index`              | integer   | YES      | 0                                                                                      | Display order                       |
| `theological_discipline`   | text      | YES      | -                                                                                      | Theological discipline              |
| `meta_description`         | text      | YES      | -                                                                                      | SEO meta description                |
| `movement_relevance_score` | integer   | YES      | 5                                                                                      | Movement relevance score            |
| `apest_relevance`          | jsonb     | YES      | '{"teaching": 5, "apostolic": 5, "prophetic": 5, "shepherding": 5, "evangelistic": 5}' | APEST relevance scores              |
| `keywords`                 | jsonb     | YES      | '[]'                                                                                   | SEO keywords                        |
| `is_active`                | boolean   | YES      | true                                                                                   | Active status                       |
| `created_at`               | timestamp | NO       | now()                                                                                  | Record creation timestamp           |
| `updated_at`               | timestamp | NO       | now()                                                                                  | Record update timestamp             |

#### Indexes

- `content_categories_pkey` (PRIMARY KEY on `id`)
- `content_categories_slug_key` (UNIQUE on `slug`)

### content_items

**Purpose:** Main content repository with AI enhancement and network amplification
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column                        | Type      | Nullable | Default               | Description                                    |
| ----------------------------- | --------- | -------- | --------------------- | ---------------------------------------------- |
| `id`                          | uuid      | NO       | gen_random_uuid()     | Primary key                                    |
| `title`                       | text      | NO       | -                     | Content title                                  |
| `slug`                        | text      | NO       | -                     | URL-friendly identifier (unique)               |
| `excerpt`                     | text      | YES      | -                     | Content excerpt                                |
| `content`                     | text      | YES      | -                     | Main content body                              |
| `author_id`                   | uuid      | NO       | -                     | Author user ID (FK to user_profiles)           |
| `co_authors`                  | jsonb     | YES      | '[]'                  | Co-author information                          |
| `content_type`                | text      | NO       | -                     | Type of content                                |
| `format`                      | text      | YES      | 'text'                | Content format                                 |
| `word_count`                  | integer   | YES      | -                     | Word count                                     |
| `estimated_reading_time`      | integer   | YES      | -                     | Estimated reading time (minutes)               |
| `view_count`                  | integer   | YES      | 0                     | View count                                     |
| `like_count`                  | integer   | YES      | 0                     | Like count                                     |
| `share_count`                 | integer   | YES      | 0                     | Share count                                    |
| `comment_count`               | integer   | YES      | 0                     | Comment count                                  |
| `bookmark_count`              | integer   | YES      | 0                     | Bookmark count                                 |
| `primary_category_id`         | uuid      | YES      | -                     | Primary category ID (FK to content_categories) |
| `secondary_categories`        | jsonb     | YES      | '[]'                  | Secondary category IDs                         |
| `tags`                        | jsonb     | YES      | '[]'                  | Content tags                                   |
| `theological_themes`          | jsonb     | YES      | '[]'                  | Theological themes                             |
| `series_id`                   | uuid      | YES      | -                     | Series ID                                      |
| `series_order`                | integer   | YES      | -                     | Order within series                            |
| `visibility`                  | text      | YES      | 'public'              | Content visibility                             |
| `status`                      | text      | YES      | 'draft'               | Content status                                 |
| `network_amplification_score` | numeric   | YES      | 0.0                   | Network amplification score                    |
| `cross_reference_count`       | integer   | YES      | 0                     | Cross-reference count                          |
| `ai_enhanced`                 | boolean   | YES      | false                 | AI enhancement flag                            |
| `ai_summary`                  | text      | YES      | -                     | AI-generated summary                           |
| `ai_key_points`               | jsonb     | YES      | '[]'                  | AI-generated key points                        |
| `featured_image_url`          | text      | YES      | -                     | Featured image URL                             |
| `video_url`                   | text      | YES      | -                     | Video URL                                      |
| `audio_url`                   | text      | YES      | -                     | Audio URL                                      |
| `attachments`                 | jsonb     | YES      | '[]'                  | File attachments                               |
| `meta_title`                  | text      | YES      | -                     | SEO meta title                                 |
| `meta_description`            | text      | YES      | -                     | SEO meta description                           |
| `canonical_url`               | text      | YES      | -                     | Canonical URL                                  |
| `original_source`             | text      | YES      | -                     | Original source                                |
| `published_at`                | timestamp | YES      | -                     | Publication timestamp                          |
| `scheduled_at`                | timestamp | YES      | -                     | Scheduled publication timestamp                |
| `license_type`                | text      | YES      | 'all_rights_reserved' | License type                                   |
| `attribution_required`        | boolean   | YES      | true                  | Attribution requirement                        |
| `created_at`                  | timestamp | NO       | now()                 | Record creation timestamp                      |
| `updated_at`                  | timestamp | NO       | now()                 | Record update timestamp                        |

#### Indexes

- `content_items_pkey` (PRIMARY KEY on `id`)
- `content_items_slug_key` (UNIQUE on `slug`)

## Assessment System Tables

### assessments

**Purpose:** Assessment definitions and metadata with cultural adaptation
**RLS:** Enabled
**Approximate Rows:** 1
**Primary Key:** `id` (uuid)

#### Columns

| Column                | Type      | Nullable | Default           | Description                            |
| --------------------- | --------- | -------- | ----------------- | -------------------------------------- |
| `id`                  | uuid      | NO       | gen_random_uuid() | Primary key                            |
| `name`                | text      | NO       | -                 | Assessment name                        |
| `slug`                | text      | NO       | -                 | URL-friendly identifier (unique)       |
| `description`         | text      | YES      | -                 | Assessment description                 |
| `assessment_type`     | text      | NO       | -                 | Type of assessment (CHECK constraint)  |
| `questions_count`     | integer   | NO       | -                 | Number of questions                    |
| `estimated_duration`  | integer   | YES      | -                 | Estimated duration (minutes)           |
| `passing_score`       | integer   | YES      | -                 | Passing score threshold                |
| `validity_score`      | numeric   | YES      | -                 | Validity score                         |
| `reliability_score`   | numeric   | YES      | -                 | Reliability score                      |
| `instructions`        | text      | YES      | -                 | Assessment instructions                |
| `published_at`        | timestamp | YES      | -                 | Publication timestamp                  |
| `version`             | text      | YES      | '1.0'             | Assessment version                     |
| `language`            | text      | YES      | 'en'              | Assessment language                    |
| `cultural_adaptation` | text      | YES      | 'universal'       | Cultural adaptation (CHECK constraint) |
| `research_backed`     | boolean   | YES      | false             | Research-backed flag                   |
| `scoring_method`      | text      | YES      | 'likert_5'        | Scoring method (CHECK constraint)      |
| `status`              | text      | YES      | 'draft'           | Assessment status (CHECK constraint)   |
| `created_at`          | timestamp | NO       | now()             | Record creation timestamp              |
| `updated_at`          | timestamp | NO       | now()             | Record update timestamp                |

#### Check Constraints

- `assessment_type` IN ('apest', 'mdna', 'cultural_intelligence', 'leadership_style', 'spiritual_gifts', 'other')
- `cultural_adaptation` IN ('western', 'eastern', 'african', 'latin_american', 'middle_eastern', 'oceanic', 'universal')
- `scoring_method` IN ('likert_5', 'likert_7', 'binary', 'ranking', 'weighted')
- `status` IN ('draft', 'active', 'archived', 'under_review')

#### Indexes

- `assessments_pkey` (PRIMARY KEY on `id`)
- `assessments_slug_key` (UNIQUE on `slug`)

### assessment_questions

**Purpose:** Individual questions within assessments
**RLS:** Enabled
**Approximate Rows:** 25
**Primary Key:** `id` (uuid)

#### Columns

| Column            | Type      | Nullable | Default           | Description                        |
| ----------------- | --------- | -------- | ----------------- | ---------------------------------- |
| `id`              | uuid      | NO       | gen_random_uuid() | Primary key                        |
| `assessment_id`   | uuid      | NO       | -                 | Assessment ID (FK to assessments)  |
| `question_text`   | text      | NO       | -                 | Question text                      |
| `question_type`   | text      | NO       | -                 | Question type (CHECK constraint)   |
| `order_index`     | integer   | NO       | -                 | Question order                     |
| `category`        | text      | YES      | -                 | Question category                  |
| `apest_dimension` | text      | YES      | -                 | APEST dimension (CHECK constraint) |
| `answer_options`  | jsonb     | YES      | -                 | Answer options                     |
| `is_required`     | boolean   | YES      | true              | Required question flag             |
| `weight`          | numeric   | YES      | 1.0               | Question weight                    |
| `reverse_scored`  | boolean   | YES      | false             | Reverse scoring flag               |
| `created_at`      | timestamp | NO       | now()             | Record creation timestamp          |
| `updated_at`      | timestamp | NO       | now()             | Record update timestamp            |

#### Check Constraints

- `question_type` IN ('likert', 'multiple_choice', 'binary', 'ranking', 'text')
- `apest_dimension` IN ('apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching')

#### Indexes

- `assessment_questions_pkey` (PRIMARY KEY on `id`)

### user_assessments

**Purpose:** User assessment attempts and results with AI insights
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column                         | Type      | Nullable | Default           | Description                       |
| ------------------------------ | --------- | -------- | ----------------- | --------------------------------- |
| `id`                           | uuid      | NO       | gen_random_uuid() | Primary key                       |
| `user_id`                      | uuid      | NO       | -                 | User ID (FK to user_profiles)     |
| `assessment_id`                | uuid      | NO       | -                 | Assessment ID (FK to assessments) |
| `started_at`                   | timestamp | NO       | now()             | Start timestamp                   |
| `completed_at`                 | timestamp | YES      | -                 | Completion timestamp              |
| `completion_percentage`        | integer   | YES      | 0                 | Completion percentage             |
| `raw_scores`                   | jsonb     | YES      | -                 | Raw assessment scores             |
| `total_score`                  | integer   | YES      | -                 | Total score                       |
| `max_possible_score`           | integer   | YES      | -                 | Maximum possible score            |
| `apostolic_score`              | integer   | YES      | -                 | APEST: Apostolic score            |
| `prophetic_score`              | integer   | YES      | -                 | APEST: Prophetic score            |
| `evangelistic_score`           | integer   | YES      | -                 | APEST: Evangelistic score         |
| `shepherding_score`            | integer   | YES      | -                 | APEST: Shepherding score          |
| `teaching_score`               | integer   | YES      | -                 | APEST: Teaching score             |
| `normalized_scores`            | jsonb     | YES      | -                 | Normalized scores                 |
| `primary_gift`                 | text      | YES      | -                 | Primary spiritual gift            |
| `secondary_gift`               | text      | YES      | -                 | Secondary spiritual gift          |
| `response_consistency`         | numeric   | YES      | -                 | Response consistency score        |
| `completion_time`              | integer   | YES      | -                 | Completion time (seconds)         |
| `confidence_level`             | integer   | YES      | -                 | Confidence level                  |
| `cultural_adjustment_applied`  | boolean   | YES      | false             | Cultural adjustment applied flag  |
| `cultural_adjustment_factor`   | numeric   | YES      | -                 | Cultural adjustment factor        |
| `ai_insights`                  | text      | YES      | -                 | AI-generated insights             |
| `personalized_recommendations` | jsonb     | YES      | -                 | Personalized recommendations      |
| `suggested_peers`              | jsonb     | YES      | '[]'              | Suggested peer connections        |
| `complementary_gifts`          | jsonb     | YES      | '[]'              | Complementary gifts               |
| `created_at`                   | timestamp | NO       | now()             | Record creation timestamp         |
| `updated_at`                   | timestamp | NO       | now()             | Record update timestamp           |

#### Indexes

- `user_assessments_pkey` (PRIMARY KEY on `id`)

### assessment_responses

**Purpose:** Individual question responses with timing and confidence
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column               | Type      | Nullable | Default           | Description                                 |
| -------------------- | --------- | -------- | ----------------- | ------------------------------------------- |
| `id`                 | uuid      | NO       | gen_random_uuid() | Primary key                                 |
| `user_assessment_id` | uuid      | NO       | -                 | User assessment ID (FK to user_assessments) |
| `question_id`        | uuid      | NO       | -                 | Question ID (FK to assessment_questions)    |
| `response_value`     | integer   | YES      | -                 | Numeric response value                      |
| `response_text`      | text      | YES      | -                 | Text response                               |
| `response_time`      | integer   | YES      | -                 | Response time (seconds)                     |
| `confidence`         | integer   | YES      | -                 | Confidence level                            |
| `skipped`            | boolean   | YES      | false             | Skipped question flag                       |
| `created_at`         | timestamp | NO       | now()             | Record creation timestamp                   |
| `updated_at`         | timestamp | NO       | now()             | Record update timestamp                     |

#### Indexes

- `assessment_responses_pkey` (PRIMARY KEY on `id`)

## Subscription & Billing Tables

### subscription_plans

**Purpose:** Tiered access plans with feature matrices
**RLS:** Enabled
**Approximate Rows:** 4
**Primary Key:** `id` (uuid)

#### Columns

| Column                    | Type      | Nullable | Default           | Description                      |
| ------------------------- | --------- | -------- | ----------------- | -------------------------------- |
| `id`                      | uuid      | NO       | gen_random_uuid() | Primary key                      |
| `name`                    | text      | NO       | -                 | Plan name                        |
| `slug`                    | text      | NO       | -                 | URL-friendly identifier (unique) |
| `description`             | text      | YES      | -                 | Plan description                 |
| `plan_type`               | text      | NO       | -                 | Plan type                        |
| `price_monthly`           | numeric   | YES      | -                 | Monthly price                    |
| `price_annual`            | numeric   | YES      | -                 | Annual price                     |
| `currency`                | text      | YES      | 'USD'             | Currency code                    |
| `content_access_level`    | text      | NO       | -                 | Content access level             |
| `features`                | jsonb     | NO       | -                 | Feature matrix                   |
| `max_users`               | integer   | YES      | 1                 | Maximum users                    |
| `storage_limit`           | integer   | YES      | -                 | Storage limit                    |
| `bandwidth_limit`         | integer   | YES      | -                 | Bandwidth limit                  |
| `stripe_product_id`       | text      | YES      | -                 | Stripe product ID (unique)       |
| `stripe_price_id_monthly` | text      | YES      | -                 | Stripe monthly price ID          |
| `stripe_price_id_annual`  | text      | YES      | -                 | Stripe annual price ID           |
| `is_active`               | boolean   | YES      | true              | Active status                    |
| `is_popular`              | boolean   | YES      | false             | Popular plan flag                |
| `sort_order`              | integer   | YES      | 0                 | Display sort order               |
| `trial_days`              | integer   | YES      | 0                 | Trial period (days)              |
| `created_at`              | timestamp | NO       | now()             | Record creation timestamp        |
| `updated_at`              | timestamp | NO       | now()             | Record update timestamp          |

#### Indexes

- `subscription_plans_pkey` (PRIMARY KEY on `id`)
- `subscription_plans_slug_key` (UNIQUE on `slug`)
- `subscription_plans_stripe_product_id_key` (UNIQUE on `stripe_product_id`)

### user_subscriptions

**Purpose:** User subscription records and billing with usage tracking
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column                   | Type      | Nullable | Default           | Description                             |
| ------------------------ | --------- | -------- | ----------------- | --------------------------------------- |
| `id`                     | uuid      | NO       | gen_random_uuid() | Primary key                             |
| `user_id`                | uuid      | NO       | -                 | User ID (FK to user_profiles)           |
| `plan_id`                | uuid      | NO       | -                 | Plan ID (FK to subscription_plans)      |
| `leader_profile_id`      | uuid      | YES      | -                 | Leader profile ID (FK to user_profiles) |
| `organization_id`        | uuid      | YES      | -                 | Organization ID (FK to organizations)   |
| `status`                 | text      | NO       | -                 | Subscription status                     |
| `amount`                 | numeric   | NO       | -                 | Subscription amount                     |
| `currency`               | text      | YES      | 'USD'             | Currency code                           |
| `billing_cycle`          | text      | NO       | -                 | Billing cycle                           |
| `ai_interactions_used`   | integer   | YES      | 0                 | AI interactions used                    |
| `ai_interactions_limit`  | integer   | YES      | -                 | AI interactions limit                   |
| `storage_used`           | integer   | YES      | 0                 | Storage used                            |
| `trial_ends_at`          | timestamp | YES      | -                 | Trial end timestamp                     |
| `current_period_start`   | timestamp | NO       | -                 | Current period start                    |
| `current_period_end`     | timestamp | NO       | -                 | Current period end                      |
| `cancelled_at`           | timestamp | YES      | -                 | Cancellation timestamp                  |
| `cancel_at_period_end`   | boolean   | YES      | false             | Cancel at period end flag               |
| `stripe_subscription_id` | text      | YES      | -                 | Stripe subscription ID (unique)         |
| `stripe_customer_id`     | text      | YES      | -                 | Stripe customer ID                      |
| `months_subscribed`      | integer   | YES      | 0                 | Months subscribed                       |
| `total_revenue`          | numeric   | YES      | 0.00              | Total revenue                           |
| `created_at`             | timestamp | NO       | now()             | Record creation timestamp               |
| `updated_at`             | timestamp | NO       | now()             | Record update timestamp                 |

#### Indexes

- `user_subscriptions_pkey` (PRIMARY KEY on `id`)
- `user_subscriptions_stripe_subscription_id_key` (UNIQUE on `stripe_subscription_id`)

## Community Tables

### communities

**Purpose:** Discussion groups and networking spaces with cultural context
**RLS:** Enabled
**Approximate Rows:** 0
**Primary Key:** `id` (uuid)

#### Columns

| Column                   | Type      | Nullable | Default           | Description                                 |
| ------------------------ | --------- | -------- | ----------------- | ------------------------------------------- |
| `id`                     | uuid      | NO       | gen_random_uuid() | Primary key                                 |
| `name`                   | text      | NO       | -                 | Community name                              |
| `slug`                   | text      | NO       | -                 | URL-friendly identifier (unique)            |
| `description`            | text      | YES      | -                 | Community description                       |
| `community_type`         | text      | NO       | -                 | Type of community                           |
| `max_members`            | integer   | YES      | -                 | Maximum members                             |
| `guidelines`             | text      | YES      | -                 | Community guidelines                        |
| `created_by`             | uuid      | NO       | -                 | Creator user ID (FK to user_profiles)       |
| `geographic_focus`       | jsonb     | YES      | '[]'              | Geographic focus areas                      |
| `cultural_context`       | text      | YES      | 'global'          | Cultural context                            |
| `language_primary`       | text      | YES      | 'en'              | Primary language                            |
| `languages_supported`    | jsonb     | YES      | '["en"]'          | Supported languages                         |
| `visibility`             | text      | YES      | 'public'          | Community visibility                        |
| `join_approval_required` | boolean   | YES      | false             | Join approval required flag                 |
| `allow_guest_posts`      | boolean   | YES      | false             | Allow guest posts flag                      |
| `moderation_level`       | text      | YES      | 'moderated'       | Moderation level                            |
| `current_member_count`   | integer   | YES      | 0                 | Current member count                        |
| `total_posts_count`      | integer   | YES      | 0                 | Total posts count                           |
| `rules`                  | jsonb     | YES      | '[]'              | Community rules                             |
| `moderators`             | jsonb     | YES      | '[]'              | Moderator information                       |
| `is_active`              | boolean   | YES      | true              | Active status                               |
| `status`                 | text      | YES      | 'active'          | Community status (active/inactive/archived) |
| `focus`                  | text      | YES      | -                 | Community focus area                        |
| `created_at`             | timestamp | NO       | now()             | Record creation timestamp                   |
| `updated_at`             | timestamp | NO       | now()             | Record update timestamp                     |

#### Indexes

- `communities_pkey` (PRIMARY KEY on `id`)
- `communities_slug_key` (UNIQUE on `slug`)

---

**This documentation reflects the current table structure as of 2025-01-27. Table schemas may be updated as the application evolves.**
