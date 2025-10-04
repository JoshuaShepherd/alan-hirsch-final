# Database Schema Guide

_Alan Hirsch Digital Platform - Current Database Architecture_

## Overview

This database currently supports the foundational platform with core user management, content, and subscription systems. The full three-tier ecosystem is planned but not yet implemented:

1. **Individual Platform Excellence** - Alan's flagship content platform ✅ **IMPLEMENTED**
2. **Network Amplification** - Movement Leaders Collective (curated leaders) ⏳ **PLANNED**
3. **Global Movement Multiplication** - 20,000+ practitioners worldwide ⏳ **PLANNED**

## Current Implementation Status

**✅ DEPLOYED TABLES:**

- `user_profiles` - Extended user profiles with ministry context and leader tier evaluation
- `organizations` - Churches, denominations, seminaries, networks with licensing
- `organization_memberships` - User-organization relationships with roles
- `content_categories` - Hierarchical content taxonomy with APEST relevance scoring
- `content_items` - Main content repository with AI enhancement and network amplification
- `content_series` - Structured learning paths and course organization
- `series_content_items` - Ordered content within series
- `assessments` - APEST and other ministry assessment frameworks
- `assessment_questions` - Question bank for assessments with APEST dimension mapping
- `user_assessments` - Individual assessment results with insights
- `assessment_responses` - Individual question responses with timing

**⏳ PLANNED TABLES (Not Yet Deployed):**

- `ai_conversations` - AI chat sessions with context and quality tracking
- `ai_messages` - Individual messages with content references and feedback
- `ai_content_jobs` - Background AI processing tasks
- `ai_cross_reference_suggestions` - AI-generated content connection suggestions
- `theological_concepts` - Knowledge graph for AI cross-referencing
- `content_cross_references` - Network amplification system
- `communities` - Discussion groups and networking spaces
- `community_memberships` - User participation in communities
- `community_posts` - Community discussions and content sharing
- `community_post_votes` - User voting on community posts
- `collaborations` - Multi-author content creation with revenue sharing
- `subscription_plans` - Tiered access plans with feature matrices
- `user_subscriptions` - Active subscriptions with network leader attribution
- `transactions` - Complete financial history with revenue attribution
- `payment_methods` - Stored payment methods for users
- `coupons` - Discount and promotion management
- `user_analytics_events` - Detailed user behavior tracking
- `user_content_interactions` - Track user engagement and learning progress
- `learning_outcomes` - Measure actual ministry impact and behavior change
- `movement_metrics` - Regional and global movement health indicators
- `performance_reports` - Leader dashboard data and network analytics
- `audit_logs` - Complete activity audit trail
- `feature_flags` - Gradual feature rollout and A/B testing
- `user_consents` - GDPR compliance and consent management
- `system_notifications` - Platform-wide notifications
- `api_keys` - External integrations and API access

## Core Architecture Principles

- **User-Centric Design**: Everything revolves around `user_profiles` with rich ministry context
- **Content Network Effects**: Cross-referencing and collaboration multiply impact (planned)
- **AI Enhancement**: Semantic search, personalization, and content discovery (planned)
- **Revenue Sharing**: 90% to creators, 10% to platform (planned)
- **Security First**: Row-level security on all sensitive data

---

## Authentication & User Management

### Supabase Auth Integration ✅ **IMPLEMENTED**

**Purpose**: Secure, scalable authentication with built-in features

**Key Features**:

- JWT-based authentication
- Email/password and social login support
- Built-in password reset and email verification
- Row Level Security (RLS) integration
- Session management

### `user_profiles`

**Purpose**: Extended user profiles beyond Supabase auth, rich ministry context and personalization

**Key Features**:

- APEST assessment integration
- Ministry role classification
- Leader tier evaluation (100-point rubric)
- Platform customization for leaders
- Geographic and cultural context

**Example Row**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "alan@movemental.com",
  "first_name": "Alan",
  "last_name": "Hirsch",
  "display_name": "Alan Hirsch",
  "bio": "Founder of Forge Mission Training Network",
  "avatar_url": "https://example.com/alan-avatar.jpg",
  "ministry_role": "seminary_professor",
  "denomination": "Anglican",
  "organization_name": "Forge Mission Training Network",
  "years_in_ministry": 35,
  "country_code": "AU",
  "timezone": "Australia/Sydney",
  "language_primary": "en",
  "cultural_context": "western",
  "assessment_movement_alignment": 95,
  "assessment_audience_engagement": 90,
  "assessment_content_readiness": 98,
  "assessment_revenue_potential": 85,
  "assessment_network_effects": 92,
  "assessment_strategic_fit": 88,
  "assessment_total": 548,
  "leader_tier": "core",
  "subdomain": "alan",
  "custom_domain": "alanhirsch.com",
  "platform_title": "Alan Hirsch Digital Platform",
  "subscription_tier": "leader",
  "theological_focus": ["incarnational_theology", "missional_ecclesiology"],
  "brand_colors": {
    "primary": "#2563eb",
    "secondary": "#64748b",
    "accent": "#059669"
  },
  "email_notifications": {
    "daily_digest": true,
    "collaboration_requests": true,
    "revenue_reports": true,
    "community_updates": true
  },
  "privacy_settings": {
    "public_profile": true,
    "show_assessment_results": false,
    "allow_networking": true,
    "share_analytics": false
  },
  "onboarding_completed": true,
  "onboarding_step": 7,
  "account_status": "active"
}
```

### `organizations`

**Purpose**: Churches, denominations, seminaries, and ministry networks

**Key Features**:

- Multi-user licensing
- Organizational billing
- Ministry context classification

**Example Row**:

```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Forge Mission Training Network",
  "slug": "forge-network",
  "organization_type": "ministry_network",
  "size_category": "large",
  "license_type": "institutional",
  "max_users": 500,
  "account_owner_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### `organization_memberships`

**Purpose**: User-organization relationships with roles and permissions

---

## Assessment System & Personalization ✅ **IMPLEMENTED**

The assessment system is fully deployed and operational with the following tables:

### `assessments` ✅ **IMPLEMENTED**

**Purpose**: APEST and other ministry assessment frameworks

**Key Features**:

- Multiple assessment types (APEST, MDNA, cultural intelligence)
- Versioning and cultural adaptations
- Research-backed validity scoring
- Multiple scoring methods (Likert, binary, ranking, weighted)

**Example Row**:

```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "name": "APEST Assessment",
  "slug": "apest-assessment",
  "assessment_type": "apest",
  "questions_count": 25,
  "estimated_duration": 15,
  "cultural_adaptation": "universal",
  "research_backed": true,
  "validity_score": 0.87,
  "reliability_score": 0.91,
  "status": "active"
}
```

### `assessment_questions` ✅ **IMPLEMENTED**

**Purpose**: Question bank for assessments with APEST dimension mapping

**Key Features**:

- Question types (Likert, multiple choice, binary, ranking, text)
- APEST dimension mapping
- Weighted scoring and reverse scoring
- Answer options in JSONB format

### `user_assessments` ✅ **IMPLEMENTED**

**Purpose**: Individual assessment results with insights

**Key Features**:

- APEST dimension scores
- Completion tracking and quality metrics
- Cultural adjustment factors
- AI-generated insights and peer matching
- Personalized recommendations

### `assessment_responses` ✅ **IMPLEMENTED**

**Purpose**: Individual question responses

**Key Features**:

- Response values and text
- Response time tracking
- Confidence levels
- Skip tracking

---

## Content Management System

### `content_items`

**Purpose**: Main content repository - articles, videos, courses, frameworks

**Key Features**:

- Rich categorization and tagging
- AI embeddings for semantic search
- Network amplification scoring
- Attribution and permission tracking
- Multi-format support

**Example Row**:

```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "title": "The Incarnational Imperative",
  "slug": "incarnational-imperative",
  "author_id": "550e8400-e29b-41d4-a716-446655440000",
  "content_type": "article",
  "status": "published",
  "visibility": "public",
  "theological_themes": ["incarnational_theology", "cultural_engagement"],
  "word_count": 2500,
  "estimated_reading_time": 13,
  "view_count": 15420,
  "network_amplification_score": 8.5,
  "ai_enhanced": true
}
```

### `content_categories`

**Purpose**: Hierarchical taxonomy with APEST relevance scoring

**Example Row**:

```json
{
  "id": "990e8400-e29b-41d4-a716-446655440004",
  "name": "Incarnational Theology",
  "slug": "incarnational-theology",
  "theological_discipline": "systematic",
  "movement_relevance_score": 10,
  "apest_relevance": {
    "apostolic": 9,
    "prophetic": 8,
    "evangelistic": 9,
    "shepherding": 6,
    "teaching": 8
  }
}
```

### `content_series` ✅ **IMPLEMENTED**

**Purpose**: Structured learning paths and course organization

**Key Features**:

- Series types (course, learning_path, book_series, etc.)
- Difficulty levels and estimated duration
- Author collaboration support
- SEO and media management

**Example Row**:

```json
{
  "id": "aa0e8400-e29b-41d4-a716-446655440005",
  "title": "The Incarnational Leadership Series",
  "slug": "incarnational-leadership-series",
  "author_id": "550e8400-e29b-41d4-a716-446655440000",
  "series_type": "course",
  "difficulty": "intermediate",
  "total_items": 12,
  "estimated_duration": 480,
  "visibility": "premium",
  "status": "published"
}
```

### `series_content_items` ✅ **IMPLEMENTED**

**Purpose**: Ordered content within series

**Key Features**:

- Content ordering and prerequisites
- Series-content relationship management
- Learning path progression tracking

---

## Network Amplification System ✅ **IMPLEMENTED**

### `content_cross_references` ✅ **IMPLEMENTED**

**Purpose**: Core network feature connecting content pieces

**Key Features**:

- Relationship types (builds_on, contradicts, supports, extends, applies, critiques, synthesizes)
- Quality scoring and relevance metrics
- Author approval workflow
- AI-generated suggestions
- Click tracking and analytics

**Example Row**:

```json
{
  "id": "bb0e8400-e29b-41d4-a716-446655440006",
  "source_content_id": "880e8400-e29b-41d4-a716-446655440003",
  "target_content_id": "cc0e8400-e29b-41d4-a716-446655440007",
  "reference_type": "builds_on",
  "relevance_score": 8,
  "quality_score": 9,
  "is_author_approved": true,
  "is_ai_generated": false,
  "click_count": 45
}
```

### `collaborations` ✅ **IMPLEMENTED**

**Purpose**: Multi-author content creation with revenue sharing

**Key Features**:

- Collaboration types (content_creation, research_project, course_development, etc.)
- Revenue sharing models (equal, weighted, lead_majority, custom)
- Project management and timeline tracking
- Deliverable management
- Network impact measurement

**Example Row**:

```json
{
  "id": "dd0e8400-e29b-41d4-a716-446655440008",
  "title": "Missional Church Planting Course",
  "collaboration_type": "course_development",
  "lead_author_id": "550e8400-e29b-41d4-a716-446655440000",
  "revenue_share_model": "weighted",
  "status": "active",
  "network_amplification_goal": 85,
  "actual_network_impact": 78
}
```

### `theological_concepts` ⏳ **PLANNED**

**Purpose**: Knowledge graph for AI cross-referencing

---

## AI Conversation System ⏳ **PLANNED**

> **Note**: The AI conversation system is planned but not yet deployed. The following tables will be implemented in future migrations:
>
> - `ai_conversations` - AI chat sessions with context and quality tracking
> - `ai_messages` - Individual messages with content references and feedback
> - `ai_content_jobs` - Background AI processing tasks
> - `ai_cross_reference_suggestions` - AI-generated content connection suggestions

**Planned Features**:

- Conversation type classification
- Personalization context (APEST, ministry, cultural)
- Quality metrics and satisfaction ratings
- Content references and feedback
- Background AI processing tasks

---

## Learning Progress & Community

### `communities` ✅ **IMPLEMENTED**

**Purpose**: Discussion groups and networking spaces

**Key Features**:

- Geographic and ministry focus
- Cultural context support
- Activity level tracking

**Example Row**:

```json
{
  "id": "dd0e8400-e29b-41d4-a716-446655440008",
  "name": "Church Planting Cohort - Asia Pacific",
  "slug": "church-planting-apac",
  "community_type": "church_planting_cohort",
  "geographic_focus": ["AU", "NZ", "SG", "MY"],
  "language_primary": "en",
  "current_member_count": 127
}
```

### `community_memberships` ✅ **IMPLEMENTED**

**Purpose**: User participation in communities

**Key Features**:

- Role-based access (member, moderator, admin, owner)
- Status tracking (active, inactive, pending, banned, left)
- Engagement metrics (posts, comments, last active)
- Notification preferences

**Example Row**:

```json
{
  "id": "ee0e8400-e29b-41d4-a716-446655440009",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "community_id": "dd0e8400-e29b-41d4-a716-446655440008",
  "role": "member",
  "status": "active",
  "posts_count": 12,
  "comments_count": 45,
  "email_notifications": true
}
```

### `community_posts` ✅ **IMPLEMENTED**

**Purpose**: Community discussions and content sharing

**Key Features**:

- Post types (discussion, question, announcement, resource_share, prayer_request, testimony)
- Threading and reply management
- Voting system (upvotes, downvotes)
- Moderation and flagging
- Media attachments

**Example Row**:

```json
{
  "id": "ff0e8400-e29b-41d4-a716-446655440010",
  "community_id": "dd0e8400-e29b-41d4-a716-446655440008",
  "author_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Best Practices for Church Planting",
  "content": "What are the key principles...",
  "post_type": "discussion",
  "upvotes": 15,
  "downvotes": 2,
  "view_count": 127,
  "status": "published"
}
```

### `community_post_votes` ✅ **IMPLEMENTED**

**Purpose**: User voting on community posts

**Key Features**:

- Upvote/downvote tracking
- User-post relationship management
- Vote history and analytics

### `user_content_interactions` ⏳ **PLANNED**

**Purpose**: Track user engagement and learning progress

**Planned Features**:

- Progress tracking (view, bookmark, complete)
- Implementation status
- Time spent and notes

---

## Subscription & Financial Management

### `subscription_plans`

**Purpose**: Tiered access plans with feature matrices

**Example Row**:

```json
{
  "id": "ee0e8400-e29b-41d4-a716-446655440009",
  "name": "Professional",
  "slug": "professional",
  "plan_type": "individual",
  "price_monthly": 97.0,
  "price_annual": 970.0,
  "content_access_level": "vip",
  "features": {
    "content_limit": null,
    "ai_interactions": 200,
    "collaboration_tools": true,
    "analytics": true
  }
}
```

### `user_subscriptions`

**Purpose**: Active subscriptions with network leader attribution

**Key Features**:

- Leader-specific subscriptions (network tier)
- Usage tracking (AI interactions)
- Stripe integration

### `transactions` ✅ **IMPLEMENTED**

**Purpose**: Complete financial history with revenue attribution

**Key Features**:

- Revenue sharing calculations (90/10 split)
- Network effect attribution
- Multi-currency support
- Stripe integration
- Payment status tracking

**Example Row**:

```json
{
  "id": "gg0e8400-e29b-41d4-a716-446655440011",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "subscription_id": "hh0e8400-e29b-41d4-a716-446655440012",
  "transaction_type": "subscription",
  "gross_amount": 97.0,
  "platform_fee": 9.7,
  "leader_amount": 87.3,
  "currency": "USD",
  "payment_status": "succeeded",
  "attributed_to_network_effect": true,
  "network_amplification_factor": 1.2
}
```

### `payment_methods` ✅ **IMPLEMENTED**

**Purpose**: Stored payment methods for users

**Key Features**:

- Card, bank account, and PayPal support
- Masked card details for security
- Default payment method management
- Stripe payment method integration

**Example Row**:

```json
{
  "id": "ii0e8400-e29b-41d4-a716-446655440013",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "card",
  "last4": "4242",
  "brand": "visa",
  "expiry_month": 12,
  "expiry_year": 2025,
  "is_default": true,
  "is_active": true
}
```

### `coupons` ✅ **IMPLEMENTED**

**Purpose**: Discount and promotion management

**Key Features**:

- Percentage and fixed amount discounts
- Usage limits and restrictions
- Validity periods
- Plan-specific applicability
- Stripe coupon integration

**Example Row**:

```json
{
  "id": "jj0e8400-e29b-41d4-a716-446655440014",
  "code": "LAUNCH2024",
  "name": "Launch Special",
  "discount_type": "percentage",
  "discount_value": 20.0,
  "max_uses": 1000,
  "used_count": 45,
  "valid_from": "2024-01-01T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z",
  "is_active": true
}
```

---

## Analytics & Business Intelligence ⏳ **PLANNED**

> **Note**: The analytics system is planned but not yet deployed. The following tables will be implemented in future migrations:
>
> - `user_analytics_events` - Detailed user behavior tracking
> - `user_content_interactions` - Track user engagement and learning progress
> - `learning_outcomes` - Measure actual ministry impact and behavior change
> - `movement_metrics` - Regional and global movement health indicators
> - `performance_reports` - Leader dashboard data and network analytics

**Planned Features**:

- Event categorization and network attribution
- Personalization data and UTM tracking
- Ministry impact measurement
- Regional and global movement health indicators
- Leader dashboard data and network analytics

---

## Security & Audit Trail ⏳ **PLANNED**

> **Note**: The security and audit system is planned but not yet deployed. The following tables will be implemented in future migrations:
>
> - `audit_logs` - Complete activity audit trail
> - `feature_flags` - Gradual feature rollout and A/B testing
> - `user_consents` - GDPR compliance and consent management
> - `system_notifications` - Platform-wide notifications
> - `api_keys` - External integrations and API access

**Planned Features**:

- Risk level classification and change tracking
- Security context and audit trails
- Gradual feature rollout and A/B testing
- GDPR compliance and consent management
- Platform-wide notifications and API access control

---

## Key Relationships

### ✅ **IMPLEMENTED RELATIONSHIPS:**

1. **User → Content**: One-to-many (authors create content)
2. **Content → Categories**: Many-to-many (rich categorization)
3. **User → Subscriptions**: One-to-many (including leader attribution)
4. **User → Organizations**: Many-to-many (organization memberships)
5. **User → Communities**: One-to-many (community creation)
6. **Content → Cross-References**: Many-to-many (network effects)
7. **User → Communities**: Many-to-many (community memberships and posts)
8. **Content → Series**: Many-to-many (series content items)
9. **User → Collaborations**: One-to-many (collaboration leadership)
10. **User → Transactions**: One-to-many (financial history)
11. **User → Payment Methods**: One-to-many (stored payment methods)
12. **Community → Posts**: One-to-many (community discussions)
13. **Posts → Votes**: One-to-many (post voting system)
14. **User → Assessments**: Many-to-many (multiple assessment types)
15. **Assessment → Questions**: One-to-many (assessment questions)
16. **User → Assessment Responses**: One-to-many (individual responses)

### ⏳ **PLANNED RELATIONSHIPS:**

17. **User → AI Conversations**: One-to-many (personalized interactions)
18. **User → Analytics**: One-to-many (behavior tracking and learning progress)

## Performance Considerations

### ✅ **IMPLEMENTED:**

- **Full-Text Search**: Content discovery
- **Composite Indexes**: Common query patterns
- **Row Level Security**: Fine-grained access control

### ⏳ **PLANNED:**

- **Vector Indexes**: AI embeddings for semantic search
- **Partitioning Ready**: Analytics tables can be partitioned by date
- **Caching Strategy**: Views for common dashboard queries

## Data Integrity

### ✅ **IMPLEMENTED:**

- **Foreign Key Constraints**: Referential integrity
- **Row Level Security**: Fine-grained access control

### ⏳ **PLANNED:**

- **Check Constraints**: Data validation
- **Triggers**: Automatic calculations (word count, amplification scores)
- **Generated Columns**: Assessment totals, computed metrics
