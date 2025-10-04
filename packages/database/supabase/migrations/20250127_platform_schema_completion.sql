-- Alan Hirsch Digital Platform - Schema Completion Migration
-- This migration completes the comprehensive platform schema implementation

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- ASSESSMENT SYSTEM TABLES
-- ==============================================

-- Assessments - APEST and other ministry assessment frameworks
CREATE TABLE IF NOT EXISTS "assessments" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    "description" text,
    "assessment_type" text NOT NULL,
    "questions_count" integer NOT NULL,
    "estimated_duration" integer,
    "passing_score" integer,
    "version" text DEFAULT '1.0',
    "language" text DEFAULT 'en',
    "cultural_adaptation" text DEFAULT 'universal',
    "research_backed" boolean DEFAULT false,
    "validity_score" decimal(3,2),
    "reliability_score" decimal(3,2),
    "instructions" text,
    "scoring_method" text DEFAULT 'likert_5',
    "status" text DEFAULT 'draft',
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "published_at" timestamp
);

-- Assessment Questions
CREATE TABLE IF NOT EXISTS "assessment_questions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "assessment_id" uuid NOT NULL REFERENCES "assessments"("id") ON DELETE CASCADE,
    "question_text" text NOT NULL,
    "question_type" text NOT NULL,
    "order_index" integer NOT NULL,
    "is_required" boolean DEFAULT true,
    "category" text,
    "weight" decimal(3,2) DEFAULT '1.0',
    "reverse_scored" boolean DEFAULT false,
    "apest_dimension" text,
    "answer_options" jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- User Assessments
CREATE TABLE IF NOT EXISTS "user_assessments" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL REFERENCES "user_profiles"("id") ON DELETE CASCADE,
    "assessment_id" uuid NOT NULL REFERENCES "assessments"("id"),
    "started_at" timestamp DEFAULT now() NOT NULL,
    "completed_at" timestamp,
    "completion_percentage" integer DEFAULT 0,
    "raw_scores" jsonb,
    "total_score" integer,
    "max_possible_score" integer,
    "apostolic_score" integer,
    "prophetic_score" integer,
    "evangelistic_score" integer,
    "shepherding_score" integer,
    "teaching_score" integer,
    "normalized_scores" jsonb,
    "primary_gift" text,
    "secondary_gift" text,
    "response_consistency" decimal(3,2),
    "completion_time" integer,
    "confidence_level" integer,
    "cultural_adjustment_applied" boolean DEFAULT false,
    "cultural_adjustment_factor" decimal(3,2),
    "ai_insights" text,
    "personalized_recommendations" jsonb,
    "suggested_peers" jsonb,
    "complementary_gifts" jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Assessment Responses
CREATE TABLE IF NOT EXISTS "assessment_responses" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_assessment_id" uuid NOT NULL REFERENCES "user_assessments"("id") ON DELETE CASCADE,
    "question_id" uuid NOT NULL REFERENCES "assessment_questions"("id"),
    "response_value" integer,
    "response_text" text,
    "response_time" integer,
    "confidence" integer,
    "skipped" boolean DEFAULT false,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ==============================================
-- CONTENT MANAGEMENT SYSTEM TABLES
-- ==============================================

-- Content Series
CREATE TABLE IF NOT EXISTS "content_series" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    "description" text,
    "excerpt" text,
    "author_id" uuid NOT NULL REFERENCES "user_profiles"("id"),
    "collaborators" jsonb DEFAULT '[]'::jsonb,
    "series_type" text NOT NULL,
    "difficulty" text DEFAULT 'intermediate',
    "total_items" integer DEFAULT 0,
    "estimated_duration" integer,
    "primary_category_id" uuid REFERENCES "content_categories"("id"),
    "tags" jsonb DEFAULT '[]'::jsonb,
    "visibility" text DEFAULT 'public',
    "status" text DEFAULT 'draft',
    "featured_image_url" text,
    "meta_description" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "published_at" timestamp
);

-- Series Content Items
CREATE TABLE IF NOT EXISTS "series_content_items" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "series_id" uuid NOT NULL REFERENCES "content_series"("id") ON DELETE CASCADE,
    "content_id" uuid NOT NULL REFERENCES "content_items"("id") ON DELETE CASCADE,
    "order_index" integer NOT NULL,
    "prerequisites" jsonb DEFAULT '[]'::jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL
);

-- Content Cross References
CREATE TABLE IF NOT EXISTS "content_cross_references" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "source_content_id" uuid NOT NULL REFERENCES "content_items"("id") ON DELETE CASCADE,
    "target_content_id" uuid NOT NULL REFERENCES "content_items"("id") ON DELETE CASCADE,
    "reference_type" text NOT NULL,
    "relevance_score" integer DEFAULT 5,
    "quality_score" integer DEFAULT 5,
    "context_description" text,
    "is_author_approved" boolean DEFAULT false,
    "is_ai_generated" boolean DEFAULT false,
    "click_count" integer DEFAULT 0,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ==============================================
-- COMMUNITY & NETWORKING TABLES
-- ==============================================

-- Communities
CREATE TABLE IF NOT EXISTS "communities" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    "description" text,
    "community_type" text NOT NULL,
    "geographic_focus" jsonb DEFAULT '[]'::jsonb,
    "cultural_context" text DEFAULT 'global',
    "language_primary" text DEFAULT 'en',
    "languages_supported" jsonb DEFAULT '["en"]'::jsonb,
    "visibility" text DEFAULT 'public',
    "join_approval_required" boolean DEFAULT false,
    "max_members" integer,
    "allow_guest_posts" boolean DEFAULT false,
    "moderation_level" text DEFAULT 'moderated',
    "current_member_count" integer DEFAULT 0,
    "total_posts_count" integer DEFAULT 0,
    "guidelines" text,
    "rules" jsonb DEFAULT '[]'::jsonb,
    "created_by" uuid NOT NULL REFERENCES "user_profiles"("id"),
    "moderators" jsonb DEFAULT '[]'::jsonb,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Community Memberships
CREATE TABLE IF NOT EXISTS "community_memberships" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL REFERENCES "user_profiles"("id") ON DELETE CASCADE,
    "community_id" uuid NOT NULL REFERENCES "communities"("id") ON DELETE CASCADE,
    "role" text DEFAULT 'member',
    "status" text DEFAULT 'pending',
    "posts_count" integer DEFAULT 0,
    "comments_count" integer DEFAULT 0,
    "last_active_at" timestamp,
    "email_notifications" boolean DEFAULT true,
    "push_notifications" boolean DEFAULT true,
    "joined_at" timestamp DEFAULT now(),
    "approved_at" timestamp,
    "left_at" timestamp,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Community Posts
CREATE TABLE IF NOT EXISTS "community_posts" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "community_id" uuid NOT NULL REFERENCES "communities"("id") ON DELETE CASCADE,
    "author_id" uuid NOT NULL REFERENCES "user_profiles"("id") ON DELETE CASCADE,
    "title" text,
    "content" text NOT NULL,
    "post_type" text DEFAULT 'discussion',
    "parent_post_id" uuid REFERENCES "community_posts"("id"),
    "reply_count" integer DEFAULT 0,
    "upvotes" integer DEFAULT 0,
    "downvotes" integer DEFAULT 0,
    "view_count" integer DEFAULT 0,
    "tags" jsonb DEFAULT '[]'::jsonb,
    "status" text DEFAULT 'published',
    "flagged_count" integer DEFAULT 0,
    "moderation_notes" text,
    "attachments" jsonb DEFAULT '[]'::jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "published_at" timestamp
);

-- Community Post Votes
CREATE TABLE IF NOT EXISTS "community_post_votes" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "post_id" uuid NOT NULL REFERENCES "community_posts"("id") ON DELETE CASCADE,
    "user_id" uuid NOT NULL REFERENCES "user_profiles"("id") ON DELETE CASCADE,
    "vote_type" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Collaborations
CREATE TABLE IF NOT EXISTS "collaborations" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "description" text,
    "collaboration_type" text NOT NULL,
    "lead_author_id" uuid NOT NULL REFERENCES "user_profiles"("id"),
    "collaborators" jsonb DEFAULT '[]'::jsonb,
    "revenue_share_model" text DEFAULT 'equal',
    "total_revenue_share" integer DEFAULT 100,
    "status" text DEFAULT 'planning',
    "start_date" timestamp,
    "target_completion_date" timestamp,
    "actual_completion_date" timestamp,
    "expected_deliverables" jsonb DEFAULT '[]'::jsonb,
    "network_amplification_goal" integer,
    "actual_network_impact" integer,
    "communication_channels" jsonb DEFAULT '[]'::jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- ==============================================
-- PERFORMANCE INDEXES
-- ==============================================

-- User Profiles Indexes
CREATE INDEX IF NOT EXISTS "user_profiles_email_idx" ON "user_profiles"("email");
CREATE INDEX IF NOT EXISTS "user_profiles_ministry_role_idx" ON "user_profiles"("ministry_role");
CREATE INDEX IF NOT EXISTS "user_profiles_country_code_idx" ON "user_profiles"("country_code");
CREATE INDEX IF NOT EXISTS "user_profiles_subscription_tier_idx" ON "user_profiles"("subscription_tier");
CREATE INDEX IF NOT EXISTS "user_profiles_account_status_idx" ON "user_profiles"("account_status");

-- Organizations Indexes
CREATE INDEX IF NOT EXISTS "organizations_slug_idx" ON "organizations"("slug");
CREATE INDEX IF NOT EXISTS "organizations_type_idx" ON "organizations"("organization_type");
CREATE INDEX IF NOT EXISTS "organizations_account_owner_idx" ON "organizations"("account_owner_id");
CREATE INDEX IF NOT EXISTS "organizations_status_idx" ON "organizations"("status");

-- Assessment System Indexes
CREATE INDEX IF NOT EXISTS "assessments_slug_idx" ON "assessments"("slug");
CREATE INDEX IF NOT EXISTS "assessments_type_idx" ON "assessments"("assessment_type");
CREATE INDEX IF NOT EXISTS "assessment_questions_assessment_id_idx" ON "assessment_questions"("assessment_id");
CREATE INDEX IF NOT EXISTS "user_assessments_user_id_idx" ON "user_assessments"("user_id");
CREATE INDEX IF NOT EXISTS "user_assessments_assessment_id_idx" ON "user_assessments"("assessment_id");
CREATE INDEX IF NOT EXISTS "user_assessments_completed_at_idx" ON "user_assessments"("completed_at");

-- Content System Indexes
CREATE INDEX IF NOT EXISTS "content_series_slug_idx" ON "content_series"("slug");
CREATE INDEX IF NOT EXISTS "content_series_author_id_idx" ON "content_series"("author_id");
CREATE INDEX IF NOT EXISTS "content_items_author_id_idx" ON "content_items"("author_id");
CREATE INDEX IF NOT EXISTS "content_items_primary_category_id_idx" ON "content_items"("primary_category_id");
CREATE INDEX IF NOT EXISTS "content_items_published_at_idx" ON "content_items"("published_at");
CREATE INDEX IF NOT EXISTS "content_items_view_count_idx" ON "content_items"("view_count");

-- Community System Indexes
CREATE INDEX IF NOT EXISTS "communities_slug_idx" ON "communities"("slug");
CREATE INDEX IF NOT EXISTS "communities_type_idx" ON "communities"("community_type");
CREATE INDEX IF NOT EXISTS "community_memberships_user_id_idx" ON "community_memberships"("user_id");
CREATE INDEX IF NOT EXISTS "community_memberships_community_id_idx" ON "community_memberships"("community_id");
CREATE INDEX IF NOT EXISTS "community_posts_community_id_idx" ON "community_posts"("community_id");
CREATE INDEX IF NOT EXISTS "community_posts_author_id_idx" ON "community_posts"("author_id");
CREATE INDEX IF NOT EXISTS "community_posts_created_at_idx" ON "community_posts"("created_at");

-- ==============================================
-- FOREIGN KEY CONSTRAINTS
-- ==============================================

-- Add foreign key constraints for organizations
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_account_owner_fkey"
    FOREIGN KEY ("account_owner_id") REFERENCES "user_profiles"("id");

-- Add foreign key constraints for organization memberships
ALTER TABLE "organization_memberships" ADD CONSTRAINT "org_memberships_user_fkey"
    FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE;
ALTER TABLE "organization_memberships" ADD CONSTRAINT "org_memberships_org_fkey"
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE;
ALTER TABLE "organization_memberships" ADD CONSTRAINT "org_memberships_invited_by_fkey"
    FOREIGN KEY ("invited_by") REFERENCES "user_profiles"("id");

-- Add foreign key constraints for content categories
ALTER TABLE "content_categories" ADD CONSTRAINT "content_categories_parent_fkey"
    FOREIGN KEY ("parent_id") REFERENCES "content_categories"("id");

-- Add foreign key constraints for content items
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_author_fkey"
    FOREIGN KEY ("author_id") REFERENCES "user_profiles"("id");
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_primary_category_fkey"
    FOREIGN KEY ("primary_category_id") REFERENCES "content_categories"("id");
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_series_fkey"
    FOREIGN KEY ("series_id") REFERENCES "content_series"("id");

-- ==============================================
-- COMMENTS
-- ==============================================

COMMENT ON TABLE "assessments" IS 'APEST and other ministry assessment frameworks';
COMMENT ON TABLE "assessment_questions" IS 'Question bank for assessments with APEST mapping';
COMMENT ON TABLE "user_assessments" IS 'Individual assessment results with APEST scores';
COMMENT ON TABLE "assessment_responses" IS 'Individual question responses';
COMMENT ON TABLE "content_series" IS 'Structured learning paths and course organization';
COMMENT ON TABLE "series_content_items" IS 'Ordered content within series';
COMMENT ON TABLE "content_cross_references" IS 'Network amplification system for content connections';
COMMENT ON TABLE "communities" IS 'Discussion groups and networking spaces';
COMMENT ON TABLE "community_memberships" IS 'User participation in communities';
COMMENT ON TABLE "community_posts" IS 'Discussions and content sharing';
COMMENT ON TABLE "community_post_votes" IS 'User voting on posts';
COMMENT ON TABLE "collaborations" IS 'Multi-author content creation with revenue sharing';

