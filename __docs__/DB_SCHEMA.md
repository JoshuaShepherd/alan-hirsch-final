# Database Schema Documentation

## Overview

This document provides a comprehensive mapping between the Drizzle ORM schema definitions and the corresponding Supabase/PostgreSQL database structure for the Alan Hirsch Digital Platform.

## Schema Architecture

The database schema is organized into the following modules:

- **Auth & User Management** (`auth.ts`)
- **Assessment System** (`assessments.ts`)
- **Content Management** (`content.ts`)
- **AI System** (`ai.ts`)
- **Community & Networking** (`community.ts`)
- **Subscriptions & Financial** (`subscriptions.ts`)
- **Analytics & Tracking** (`analytics.ts`)
- **System & Administration** (`system.ts`)

## Table Mappings

### 1. Auth & User Management

#### `user_profiles` Table

**Drizzle Schema:**

```typescript
export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'), // For local auth if needed
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),

  // Ministry Context
  ministryRole: text('ministry_role', {
    enum: [
      'senior_pastor',
      'associate_pastor',
      'church_planter',
      'denominational_leader',
      'seminary_professor',
      'seminary_student',
      'ministry_staff',
      'missionary',
      'marketplace_minister',
      'nonprofit_leader',
      'consultant',
      'academic_researcher',
      'emerging_leader',
      'other',
    ],
  }).notNull(),

  // Geographic & Cultural Context
  countryCode: text('country_code'),
  timezone: text('timezone'),
  languagePrimary: text('language_primary').default('en'),
  culturalContext: text('cultural_context', {
    enum: [
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'mixed',
      'global',
    ],
  }),

  // APEST Assessment Scores (0-100 scale)
  assessmentMovementAlignment: integer('assessment_movement_alignment'),
  assessmentAudienceEngagement: integer('assessment_audience_engagement'),
  assessmentContentReadiness: integer('assessment_content_readiness'),
  assessmentRevenuePotential: integer('assessment_revenue_potential'),
  assessmentNetworkEffects: integer('assessment_network_effects'),
  assessmentStrategicFit: integer('assessment_strategic_fit'),
  assessmentTotal: integer('assessment_total'),

  // Leader Tier
  leaderTier: text('leader_tier', {
    enum: ['core', 'network', 'emerging', 'community'],
  }),

  // Platform Configuration
  subdomain: text('subdomain').unique(),
  customDomain: text('custom_domain').unique(),
  platformTitle: text('platform_title'),

  // Subscription & Access
  subscriptionTier: text('subscription_tier', {
    enum: ['free', 'individual', 'professional', 'leader', 'institutional'],
  }).default('free'),

  // Settings (JSONB)
  theologicalFocus: jsonb('theological_focus').$type<string[]>().default([]),
  brandColors: jsonb('brand_colors')
    .$type<{
      primary: string;
      secondary: string;
      accent: string;
    }>()
    .default({ primary: '#2563eb', secondary: '#64748b', accent: '#059669' }),

  emailNotifications: jsonb('email_notifications')
    .$type<{
      dailyDigest: boolean;
      collaborationRequests: boolean;
      revenueReports: boolean;
      communityUpdates: boolean;
    }>()
    .default({
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    }),

  privacySettings: jsonb('privacy_settings')
    .$type<{
      publicProfile: boolean;
      showAssessmentResults: boolean;
      allowNetworking: boolean;
      shareAnalytics: boolean;
    }>()
    .default({
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    }),

  // Onboarding & Status
  onboardingCompleted: boolean('onboarding_completed').default(false),
  onboardingStep: integer('onboarding_step').default(1),
  accountStatus: text('account_status', {
    enum: ['active', 'inactive', 'suspended', 'pending_verification'],
  }).default('pending_verification'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastActiveAt: timestamp('last_active_at').notNull().defaultNow(),
});
```

**PostgreSQL Columns:**

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT, -- For local auth if needed
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,

  -- Ministry Context
  ministry_role TEXT NOT NULL CHECK (ministry_role IN (
    'senior_pastor', 'associate_pastor', 'church_planter',
    'denominational_leader', 'seminary_professor', 'seminary_student',
    'ministry_staff', 'missionary', 'marketplace_minister',
    'nonprofit_leader', 'consultant', 'academic_researcher',
    'emerging_leader', 'other'
  )),

  -- Geographic & Cultural Context
  country_code TEXT,
  timezone TEXT,
  language_primary TEXT DEFAULT 'en',
  cultural_context TEXT CHECK (cultural_context IN (
    'western', 'eastern', 'african', 'latin_american',
    'middle_eastern', 'oceanic', 'mixed', 'global'
  )),

  -- APEST Assessment Scores
  assessment_movement_alignment INTEGER,
  assessment_audience_engagement INTEGER,
  assessment_content_readiness INTEGER,
  assessment_revenue_potential INTEGER,
  assessment_network_effects INTEGER,
  assessment_strategic_fit INTEGER,
  assessment_total INTEGER,

  -- Leader Tier
  leader_tier TEXT CHECK (leader_tier IN ('core', 'network', 'emerging', 'community')),

  -- Platform Configuration
  subdomain TEXT UNIQUE,
  custom_domain TEXT UNIQUE,
  platform_title TEXT,

  -- Subscription & Access
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN (
    'free', 'individual', 'professional', 'leader', 'institutional'
  )),

  -- Settings (JSONB)
  theological_focus JSONB DEFAULT '[]',
  brand_colors JSONB DEFAULT '{"primary": "#2563eb", "secondary": "#64748b", "accent": "#059669"}',
  email_notifications JSONB DEFAULT '{"dailyDigest": true, "collaborationRequests": true, "revenueReports": true, "communityUpdates": true}',
  privacy_settings JSONB DEFAULT '{"publicProfile": true, "showAssessmentResults": false, "allowNetworking": true, "shareAnalytics": false}',

  -- Onboarding & Status
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 1,
  account_status TEXT DEFAULT 'pending_verification' CHECK (account_status IN (
    'active', 'inactive', 'suspended', 'pending_verification'
  )),

  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### `organizations` Table

**Drizzle Schema:**

```typescript
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  website: text('website'),
  logoUrl: text('logo_url'),

  // Organization Classification
  organizationType: text('organization_type', {
    enum: [
      'church',
      'denomination',
      'seminary',
      'ministry_network',
      'nonprofit',
      'business',
      'other',
    ],
  }).notNull(),

  sizeCategory: text('size_category', {
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
  }),

  // Contact Information
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  address: jsonb('address').$type<{
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }>(),

  // Licensing & Billing
  licenseType: text('license_type', {
    enum: ['individual', 'team', 'enterprise'],
  }).default('individual'),
  maxUsers: integer('max_users').default(1),
  billingEmail: text('billing_email'),

  // Ownership
  accountOwnerId: uuid('account_owner_id').references(() => userProfiles.id),

  // Stripe Integration
  stripeCustomerId: text('stripe_customer_id'),
  stripeProductId: text('stripe_product_id'),

  // Status
  status: text('status', {
    enum: ['trial', 'active', 'suspended', 'cancelled'],
  }).default('trial'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

**PostgreSQL Columns:**

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  website TEXT,
  logo_url TEXT,

  -- Organization Classification
  organization_type TEXT NOT NULL CHECK (organization_type IN (
    'church', 'denomination', 'seminary', 'ministry_network',
    'nonprofit', 'business', 'other'
  )),

  size_category TEXT CHECK (size_category IN (
    'startup', 'small', 'medium', 'large', 'enterprise'
  )),

  -- Contact Information
  contact_email TEXT,
  contact_phone TEXT,
  address JSONB,

  -- Licensing & Billing
  license_type TEXT DEFAULT 'individual' CHECK (license_type IN (
    'individual', 'team', 'enterprise'
  )),
  max_users INTEGER DEFAULT 1,
  billing_email TEXT,

  -- Ownership
  account_owner_id UUID REFERENCES user_profiles(id),

  -- Stripe Integration
  stripe_customer_id TEXT,
  stripe_product_id TEXT,

  -- Status
  status TEXT DEFAULT 'trial' CHECK (status IN (
    'trial', 'active', 'suspended', 'cancelled'
  )),

  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

#### `organization_memberships` Table

**Drizzle Schema:**

```typescript
export const organizationMemberships = pgTable('organization_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),

  // Role & Permissions
  role: text('role', {
    enum: ['owner', 'admin', 'member', 'viewer'],
  }).notNull(),
  permissions: jsonb('permissions').$type<string[]>().default([]),

  // Status
  status: text('status', {
    enum: ['pending', 'active', 'inactive', 'cancelled'],
  }).default('pending'),

  // Timestamps
  joinedAt: timestamp('joined_at').defaultNow(),
  invitedAt: timestamp('invited_at'),
  invitedBy: uuid('invited_by').references(() => userProfiles.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

### 2. Assessment System

#### `assessments` Table

**Drizzle Schema:**

```typescript
export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),

  // Assessment Classification
  assessmentType: text('assessment_type', {
    enum: [
      'apest',
      'mdna',
      'cultural_intelligence',
      'leadership_style',
      'spiritual_gifts',
      'other',
    ],
  }).notNull(),

  // Assessment Configuration
  questionsCount: integer('questions_count').notNull(),
  estimatedDuration: integer('estimated_duration'), // minutes
  passingScore: integer('passing_score'),

  // Versioning & Localization
  version: text('version').default('1.0'),
  language: text('language').default('en'),
  culturalAdaptation: text('cultural_adaptation', {
    enum: [
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
      'global',
    ],
  }).default('universal'),

  // Research & Validity
  researchBacked: boolean('research_backed').default(false),
  validityScore: decimal('validity_score', { precision: 3, scale: 2 }),
  reliabilityScore: decimal('reliability_score', { precision: 3, scale: 2 }),

  // Configuration
  instructions: text('instructions'),
  scoringMethod: text('scoring_method', {
    enum: ['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'],
  }).default('likert_5'),

  // Status
  status: text('status', {
    enum: ['draft', 'active', 'archived', 'under_review'],
  }).default('draft'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  publishedAt: timestamp('published_at'),
});
```

#### `assessment_questions` Table

**Drizzle Schema:**

```typescript
export const assessmentQuestions = pgTable('assessment_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  assessmentId: uuid('assessment_id')
    .notNull()
    .references(() => assessments.id, { onDelete: 'cascade' }),

  // Question Content
  questionText: text('question_text').notNull(),
  questionType: text('question_type', {
    enum: ['likert', 'multiple_choice', 'binary', 'ranking', 'text'],
  }).notNull(),

  // Question Configuration
  orderIndex: integer('order_index').notNull(),
  isRequired: boolean('is_required').default(true),
  category: text('category'), // For grouping questions

  // Scoring
  weight: decimal('weight', { precision: 3, scale: 2 }).default('1.0'),
  reverseScored: boolean('reverse_scored').default(false),

  // APEST Mapping (for APEST assessments)
  apestDimension: text('apest_dimension', {
    enum: ['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'],
  }),

  // Answer Options (for multiple choice, likert, etc.)
  answerOptions: jsonb('answer_options').$type<
    {
      value: number;
      label: string;
      description?: string;
    }[]
  >(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

#### `user_assessments` Table

**Drizzle Schema:**

```typescript
export const userAssessments = pgTable('user_assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  assessmentId: uuid('assessment_id')
    .notNull()
    .references(() => assessments.id),

  // Completion Status
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  completionPercentage: integer('completion_percentage').default(0),

  // Raw Scores
  rawScores: jsonb('raw_scores').$type<Record<string, number>>(),
  totalScore: integer('total_score'),
  maxPossibleScore: integer('max_possible_score'),

  // APEST Specific Scores (for APEST assessments)
  apostolicScore: integer('apostolic_score'),
  propheticScore: integer('prophetic_score'),
  evangelisticScore: integer('evangelistic_score'),
  shepherdingScore: integer('shepherding_score'),
  teachingScore: integer('teaching_score'),

  // Normalized Scores (0-100 scale)
  normalizedScores: jsonb('normalized_scores').$type<Record<string, number>>(),
  primaryGift: text('primary_gift'),
  secondaryGift: text('secondary_gift'),

  // Quality Metrics
  responseConsistency: decimal('response_consistency', {
    precision: 3,
    scale: 2,
  }),
  completionTime: integer('completion_time'), // minutes
  confidenceLevel: integer('confidence_level'), // 1-5 scale

  // Cultural Adjustment
  culturalAdjustmentApplied: boolean('cultural_adjustment_applied').default(
    false
  ),
  culturalAdjustmentFactor: decimal('cultural_adjustment_factor', {
    precision: 3,
    scale: 2,
  }),

  // AI Generated Insights
  aiInsights: text('ai_insights'),
  personalizedRecommendations: jsonb('personalized_recommendations').$type<{
    strengths: string[];
    growthAreas: string[];
    actionItems: string[];
    contentRecommendations: string[];
  }>(),

  // Peer Matching
  suggestedPeers: jsonb('suggested_peers').$type<string[]>(), // User IDs
  complementaryGifts: jsonb('complementary_gifts').$type<string[]>(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

#### `assessment_responses` Table

**Drizzle Schema:**

```typescript
export const assessmentResponses = pgTable('assessment_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userAssessmentId: uuid('user_assessment_id')
    .notNull()
    .references(() => userAssessments.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id')
    .notNull()
    .references(() => assessmentQuestions.id),

  // Response Data
  responseValue: integer('response_value'),
  responseText: text('response_text'),
  responseTime: integer('response_time'), // seconds to answer

  // Quality Indicators
  confidence: integer('confidence'), // 1-5 scale
  skipped: boolean('skipped').default(false),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

### 3. Content Management

#### `content_categories` Table

**Drizzle Schema:**

```typescript
export const contentCategories = pgTable('content_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),

  // Hierarchy
  parentId: uuid('parent_id').references(() => contentCategories.id, {
    onDelete: 'set null',
  }),
  orderIndex: integer('order_index').default(0),

  // Theological Classification
  theologicalDiscipline: text('theological_discipline', {
    enum: [
      'systematic',
      'biblical',
      'practical',
      'historical',
      'philosophical',
      'missional',
      'pastoral',
    ],
  }),

  // Movement Relevance (1-10 scale)
  movementRelevanceScore: integer('movement_relevance_score').default(5),

  // APEST Relevance Scoring
  apestRelevance: jsonb('apest_relevance')
    .$type<{
      apostolic: number;
      prophetic: number;
      evangelistic: number;
      shepherding: number;
      teaching: number;
    }>()
    .default({
      apostolic: 5,
      prophetic: 5,
      evangelistic: 5,
      shepherding: 5,
      teaching: 5,
    }),

  // SEO & Discovery
  metaDescription: text('meta_description'),
  keywords: jsonb('keywords').$type<string[]>().default([]),

  // Status
  isActive: boolean('is_active').default(true),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

#### `content_items` Table

**Drizzle Schema:**

```typescript
export const contentItems = pgTable('content_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'), // Main content body

  // Author & Attribution
  authorId: uuid('author_id')
    .notNull()
    .references(() => userProfiles.id),
  coAuthors: jsonb('co_authors').$type<string[]>().default([]), // User IDs

  // Content Classification
  contentType: text('content_type', {
    enum: [
      'article',
      'video',
      'podcast',
      'framework',
      'tool',
      'case_study',
      'interview',
      'course_lesson',
    ],
  }).notNull(),

  format: text('format', {
    enum: ['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'],
  }).default('text'),

  // Content Metrics
  wordCount: integer('word_count'),
  estimatedReadingTime: integer('estimated_reading_time'), // minutes
  viewCount: integer('view_count').default(0),
  likeCount: integer('like_count').default(0),
  shareCount: integer('share_count').default(0),
  commentCount: integer('comment_count').default(0),
  bookmarkCount: integer('bookmark_count').default(0),

  // Categorization & Tagging
  primaryCategoryId: uuid('primary_category_id').references(
    () => contentCategories.id
  ),
  secondaryCategories: jsonb('secondary_categories')
    .$type<string[]>()
    .default([]), // Category IDs
  tags: jsonb('tags').$type<string[]>().default([]),
  theologicalThemes: jsonb('theological_themes').$type<string[]>().default([]),

  // Series Association
  seriesId: uuid('series_id').references(() => contentSeries.id),
  seriesOrder: integer('series_order'),

  // Visibility & Access Control
  visibility: text('visibility', {
    enum: [
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ],
  }).default('public'),

  status: text('status', {
    enum: ['draft', 'published', 'archived', 'under_review', 'scheduled'],
  }).default('draft'),

  // Network Amplification
  networkAmplificationScore: decimal('network_amplification_score', {
    precision: 3,
    scale: 1,
  }).default('0.0'),
  crossReferenceCount: integer('cross_reference_count').default(0),

  // AI Enhancement
  aiEnhanced: boolean('ai_enhanced').default(false),
  aiSummary: text('ai_summary'),
  aiKeyPoints: jsonb('ai_key_points').$type<string[]>().default([]),

  // Media & Assets
  featuredImageUrl: text('featured_image_url'),
  videoUrl: text('video_url'),
  audioUrl: text('audio_url'),
  attachments: jsonb('attachments')
    .$type<
      {
        name: string;
        url: string;
        type: string;
        size: number;
      }[]
    >()
    .default([]),

  // SEO & Discovery
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  canonicalUrl: text('canonical_url'),

  // Attribution & Permissions
  originalSource: text('original_source'),
  licenseType: text('license_type', {
    enum: [
      'all_rights_reserved',
      'creative_commons',
      'public_domain',
      'fair_use',
    ],
  }).default('all_rights_reserved'),
  attributionRequired: boolean('attribution_required').default(true),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  publishedAt: timestamp('published_at'),
  scheduledAt: timestamp('scheduled_at'),
});
```

### 4. Community & Networking

#### `communities` Table

**Drizzle Schema:**

```typescript
export const communities = pgTable('communities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  excerpt: text('excerpt'),

  // Community Classification
  communityType: text('community_type', {
    enum: [
      'general',
      'ministry_focus',
      'geographic',
      'denominational',
      'theological',
      'professional',
      'interest_based',
    ],
  }).notNull(),

  // Community Configuration
  visibility: text('visibility', {
    enum: ['public', 'private', 'invite_only', 'organization'],
  }).default('public'),

  moderationLevel: text('moderation_level', {
    enum: ['open', 'moderated', 'strict'],
  }).default('moderated'),

  // Membership Settings
  memberCount: integer('member_count').default(0),
  maxMembers: integer('max_members'),
  joinApprovalRequired: boolean('join_approval_required').default(false),
  allowGuestPosts: boolean('allow_guest_posts').default(false),

  // Cultural Context
  culturalContext: text('cultural_context').default('global'),
  languagePrimary: text('language_primary').default('en'),
  languagesSupported: jsonb('languages_supported')
    .$type<string[]>()
    .default(['en']),

  // Community Rules & Guidelines
  rules: jsonb('rules').$type<string[]>().default([]),
  guidelines: text('guidelines'),

  // Status
  status: text('status', {
    enum: ['active', 'inactive', 'archived'],
  }).default('active'),

  // Ownership
  createdBy: uuid('created_by')
    .notNull()
    .references(() => userProfiles.id),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

### 5. Subscriptions & Financial

#### `subscription_plans` Table

**Drizzle Schema:**

```typescript
export const subscriptionPlans = pgTable('subscription_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),

  // Plan Classification
  planType: text('plan_type', {
    enum: ['free', 'individual', 'professional', 'leader', 'institutional'],
  }).notNull(),

  // Pricing
  priceMonthly: integer('price_monthly'), // cents
  priceAnnual: integer('price_annual'), // cents
  currency: text('currency').default('usd'),

  // Access Control
  contentAccessLevel: text('content_access_level', {
    enum: ['free', 'premium', 'vip', 'leader', 'all'],
  }).default('free'),

  // Features (JSONB)
  features: jsonb('features').$type<{
    contentLimit: number | null;
    communityAccess: boolean;
    aiInteractions: number;
    collaborationTools: boolean;
    analytics: boolean;
    customBranding: boolean;
    apiAccess: boolean;
    prioritySupport: boolean;
    downloadContent: boolean;
    offlineAccess: boolean;
  }>(),

  // Stripe Integration
  stripeProductId: text('stripe_product_id'),
  stripePriceIdMonthly: text('stripe_price_id_monthly'),
  stripePriceIdAnnual: text('stripe_price_id_annual'),

  // Status
  isActive: boolean('is_active').default(true),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

#### `user_subscriptions` Table

**Drizzle Schema:**

```typescript
export const userSubscriptions = pgTable('user_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  planId: uuid('plan_id')
    .notNull()
    .references(() => subscriptionPlans.id),

  // Subscription Status
  status: text('status', {
    enum: ['active', 'cancelled', 'past_due', 'unpaid', 'trialing', 'paused'],
  }).default('trialing'),

  // Billing Cycle
  billingCycle: text('billing_cycle', {
    enum: ['monthly', 'annual'],
  }).default('monthly'),

  // Stripe Integration
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripeCustomerId: text('stripe_customer_id'),
  stripePriceId: text('stripe_price_id'),

  // Billing Dates
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  cancelledAt: timestamp('cancelled_at'),
  cancellationReason: text('cancellation_reason'),

  // Trial Information
  trialStart: timestamp('trial_start'),
  trialEnd: timestamp('trial_end'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

## Key Relationships

### Foreign Key Relationships

1. **User Profiles → Organizations**
   - `organizations.account_owner_id` → `user_profiles.id`

2. **User Profiles → Organization Memberships**
   - `organization_memberships.user_id` → `user_profiles.id`
   - `organization_memberships.organization_id` → `organizations.id`

3. **User Profiles → Assessments**
   - `user_assessments.user_id` → `user_profiles.id`
   - `assessment_responses.user_assessment_id` → `user_assessments.id`

4. **Content Relationships**
   - `content_items.author_id` → `user_profiles.id`
   - `content_items.primary_category_id` → `content_categories.id`
   - `content_items.series_id` → `content_series.id`

5. **Community Relationships**
   - `communities.created_by` → `user_profiles.id`
   - `community_memberships.user_id` → `user_profiles.id`
   - `community_memberships.community_id` → `communities.id`

6. **Subscription Relationships**
   - `user_subscriptions.user_id` → `user_profiles.id`
   - `user_subscriptions.plan_id` → `subscription_plans.id`

## Indexes

The database includes comprehensive indexing for performance optimization:

### User Profiles Indexes

- `idx_user_profiles_email` - Email lookups
- `idx_user_profiles_account_status` - Status filtering
- `idx_user_profiles_ministry_role` - Role-based queries
- `idx_user_profiles_country_code` - Geographic queries
- `idx_user_profiles_active_role_country` - Composite index for active users

### Content Indexes

- `idx_content_items_published_public` - Published content queries
- `idx_content_items_author_status` - Author content queries
- `idx_content_items_slug` - Slug lookups

### Assessment Indexes

- `idx_assessments_active_type` - Active assessments by type
- `idx_user_assessments_user_status` - User assessment queries
- `idx_assessment_questions_assessment_order` - Question ordering

### Subscription Indexes

- `idx_user_subscriptions_active_user` - Active subscriptions
- `idx_subscription_plans_slug` - Plan lookups

## Data Types

### JSONB Fields

The schema uses JSONB for flexible data storage:

- **User Settings**: `brand_colors`, `email_notifications`, `privacy_settings`
- **Assessment Data**: `raw_scores`, `normalized_scores`, `personalized_recommendations`
- **Content Metadata**: `tags`, `theological_themes`, `attachments`
- **Organization Data**: `address`, `permissions`

### Enum Values

All enum values are consistently defined across Drizzle schemas and PostgreSQL constraints:

- **Ministry Roles**: 14 predefined roles from 'senior_pastor' to 'other'
- **Account Status**: 'active', 'inactive', 'suspended', 'pending_verification'
- **Content Visibility**: 'public', 'premium', 'vip', 'private', 'organization', 'invite_only'
- **Assessment Types**: 'apest', 'mdna', 'cultural_intelligence', 'leadership_style', 'spiritual_gifts', 'other'

## Migration History

The schema has evolved through several migrations:

1. **0001_comprehensive_alan_hirsch_schema.sql** - Initial comprehensive schema
2. **001_fix_schema_alignment.sql** - Schema alignment fixes
3. **optimize-indexes.sql** - Performance optimization indexes

## Validation Rules

### Database Constraints

- All enum fields have CHECK constraints matching Drizzle enum definitions
- Foreign key relationships enforce referential integrity
- Unique constraints on slugs, emails, and subdomains
- Default values for status fields and timestamps

### Zod Schema Validation

- Input validation schemas match database constraints
- API response schemas provide public-facing data structures
- Database schemas represent exact database structure

## Best Practices

1. **Consistent Naming**: camelCase in Drizzle maps to snake_case in PostgreSQL
2. **Enum Management**: All enums defined in Drizzle schemas with matching CHECK constraints
3. **JSONB Usage**: Flexible data storage for settings, metadata, and complex objects
4. **Indexing Strategy**: Comprehensive indexing for common query patterns
5. **Migration Safety**: All migrations include proper rollback capabilities

This schema provides a robust foundation for the Alan Hirsch Digital Platform, supporting user management, content creation, assessment systems, community features, and subscription management with proper data integrity and performance optimization.
