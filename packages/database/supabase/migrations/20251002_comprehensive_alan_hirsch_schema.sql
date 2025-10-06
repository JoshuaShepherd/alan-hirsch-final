-- Alan Hirsch Digital Platform - Complete Schema Migration
-- This migration creates the comprehensive platform schema

-- Drop existing tables if they exist (clean slate approach)
DROP TABLE IF EXISTS "activity_logs" CASCADE;
DROP TABLE IF EXISTS "invitations" CASCADE;
DROP TABLE IF EXISTS "team_members" CASCADE;
DROP TABLE IF EXISTS "teams" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles - Extended profiles beyond Supabase auth
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL UNIQUE,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"display_name" text,
	"bio" text,
	"avatar_url" text,
	"ministry_role" text NOT NULL,
	"denomination" text,
	"organization_name" text,
	"years_in_ministry" integer,
	"country_code" text,
	"timezone" text,
	"language_primary" text DEFAULT 'en',
	"cultural_context" text,
	"assessment_movement_alignment" integer,
	"assessment_audience_engagement" integer,
	"assessment_content_readiness" integer,
	"assessment_revenue_potential" integer,
	"assessment_network_effects" integer,
	"assessment_strategic_fit" integer,
	"assessment_total" integer,
	"leader_tier" text,
	"subdomain" text UNIQUE,
	"custom_domain" text UNIQUE,
	"platform_title" text,
	"subscription_tier" text DEFAULT 'free',
	"theological_focus" jsonb DEFAULT '[]'::jsonb,
	"brand_colors" jsonb DEFAULT '{"primary": "#2563eb", "secondary": "#64748b", "accent": "#059669"}'::jsonb,
	"email_notifications" jsonb DEFAULT '{"dailyDigest": true, "collaborationRequests": true, "revenueReports": true, "communityUpdates": true}'::jsonb,
	"privacy_settings" jsonb DEFAULT '{"publicProfile": true, "showAssessmentResults": false, "allowNetworking": true, "shareAnalytics": false}'::jsonb,
	"onboarding_completed" boolean DEFAULT false,
	"onboarding_step" integer DEFAULT 1,
	"account_status" text DEFAULT 'pending_verification',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_active_at" timestamp DEFAULT now() NOT NULL
);

-- Organizations
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"website" text,
	"logo_url" text,
	"organization_type" text NOT NULL,
	"size_category" text,
	"contact_email" text,
	"contact_phone" text,
	"address" jsonb,
	"license_type" text DEFAULT 'individual',
	"max_users" integer DEFAULT 1,
	"billing_email" text,
	"account_owner_id" uuid,
	"status" text DEFAULT 'trial',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Organization Memberships
CREATE TABLE "organization_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"role" text NOT NULL,
	"permissions" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'pending',
	"joined_at" timestamp DEFAULT now(),
	"invited_at" timestamp,
	"invited_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Content Categories
CREATE TABLE "content_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"parent_id" uuid,
	"order_index" integer DEFAULT 0,
	"theological_discipline" text,
	"movement_relevance_score" integer DEFAULT 5,
	"apest_relevance" jsonb DEFAULT '{"apostolic": 5, "prophetic": 5, "evangelistic": 5, "shepherding": 5, "teaching": 5}'::jsonb,
	"meta_description" text,
	"keywords" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Content Items
CREATE TABLE "content_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"excerpt" text,
	"content" text,
	"author_id" uuid NOT NULL,
	"co_authors" jsonb DEFAULT '[]'::jsonb,
	"content_type" text NOT NULL,
	"format" text DEFAULT 'text',
	"word_count" integer,
	"estimated_reading_time" integer,
	"view_count" integer DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"share_count" integer DEFAULT 0,
	"comment_count" integer DEFAULT 0,
	"bookmark_count" integer DEFAULT 0,
	"primary_category_id" uuid,
	"secondary_categories" jsonb DEFAULT '[]'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"theological_themes" jsonb DEFAULT '[]'::jsonb,
	"series_id" uuid,
	"series_order" integer,
	"visibility" text DEFAULT 'public',
	"status" text DEFAULT 'draft',
	"network_amplification_score" numeric(3, 1) DEFAULT '0.0',
	"cross_reference_count" integer DEFAULT 0,
	"ai_enhanced" boolean DEFAULT false,
	"ai_summary" text,
	"ai_key_points" jsonb DEFAULT '[]'::jsonb,
	"featured_image_url" text,
	"video_url" text,
	"audio_url" text,
	"attachments" jsonb DEFAULT '[]'::jsonb,
	"meta_title" text,
	"meta_description" text,
	"canonical_url" text,
	"original_source" text,
	"license_type" text DEFAULT 'all_rights_reserved',
	"attribution_required" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"scheduled_at" timestamp
);

-- Subscription Plans
CREATE TABLE "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text,
	"plan_type" text NOT NULL,
	"price_monthly" numeric(8, 2),
	"price_annual" numeric(8, 2),
	"currency" text DEFAULT 'USD',
	"content_access_level" text NOT NULL,
	"features" jsonb NOT NULL,
	"max_users" integer DEFAULT 1,
	"storage_limit" integer,
	"bandwidth_limit" integer,
	"stripe_product_id" text UNIQUE,
	"stripe_price_id_monthly" text,
	"stripe_price_id_annual" text,
	"is_active" boolean DEFAULT true,
	"is_popular" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"trial_days" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- User Subscriptions
CREATE TABLE "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"leader_profile_id" uuid,
	"organization_id" uuid,
	"status" text NOT NULL,
	"amount" numeric(8, 2) NOT NULL,
	"currency" text DEFAULT 'USD',
	"billing_cycle" text NOT NULL,
	"ai_interactions_used" integer DEFAULT 0,
	"ai_interactions_limit" integer,
	"storage_used" integer DEFAULT 0,
	"trial_ends_at" timestamp,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"cancelled_at" timestamp,
	"cancel_at_period_end" boolean DEFAULT false,
	"stripe_subscription_id" text UNIQUE,
	"stripe_customer_id" text,
	"months_subscribed" integer DEFAULT 0,
	"total_revenue" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Communities
CREATE TABLE "communities" (
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
	"created_by" uuid NOT NULL,
	"moderators" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key constraints
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_account_owner_id_user_profiles_id_fk" 
    FOREIGN KEY ("account_owner_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL;

ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_user_id_user_profiles_id_fk" 
    FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE;

ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_organization_id_organizations_id_fk" 
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE;

ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_invited_by_user_profiles_id_fk" 
    FOREIGN KEY ("invited_by") REFERENCES "user_profiles"("id") ON DELETE SET NULL;

ALTER TABLE "content_categories" ADD CONSTRAINT "content_categories_parent_id_content_categories_id_fk" 
    FOREIGN KEY ("parent_id") REFERENCES "content_categories"("id") ON DELETE SET NULL;

ALTER TABLE "content_items" ADD CONSTRAINT "content_items_author_id_user_profiles_id_fk" 
    FOREIGN KEY ("author_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE;

ALTER TABLE "content_items" ADD CONSTRAINT "content_items_primary_category_id_content_categories_id_fk" 
    FOREIGN KEY ("primary_category_id") REFERENCES "content_categories"("id") ON DELETE SET NULL;

ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_user_profiles_id_fk" 
    FOREIGN KEY ("user_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE;

ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_subscription_plans_id_fk" 
    FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id");

ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_leader_profile_id_user_profiles_id_fk" 
    FOREIGN KEY ("leader_profile_id") REFERENCES "user_profiles"("id") ON DELETE SET NULL;

ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_organization_id_organizations_id_fk" 
    FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE SET NULL;

ALTER TABLE "communities" ADD CONSTRAINT "communities_created_by_user_profiles_id_fk" 
    FOREIGN KEY ("created_by") REFERENCES "user_profiles"("id") ON DELETE CASCADE;

-- Insert some basic data
INSERT INTO "subscription_plans" ("name", "slug", "plan_type", "price_monthly", "price_annual", "content_access_level", "features") VALUES
('Free Access', 'free', 'free', 0, 0, 'free', '{"contentLimit": 5, "communityAccess": true, "aiInteractions": 0}'),
('Individual Subscriber', 'individual', 'individual', 29, 290, 'premium', '{"contentLimit": null, "communityAccess": true, "aiInteractions": 50}'),
('Professional', 'professional', 'professional', 97, 970, 'vip', '{"contentLimit": null, "aiInteractions": 200, "collaborationTools": true, "analytics": true}');

INSERT INTO "content_categories" ("name", "slug", "theological_discipline", "movement_relevance_score") VALUES
('Incarnational Theology', 'incarnational-theology', 'systematic', 10),
('Missional Ecclesiology', 'missional-ecclesiology', 'practical', 9),
('Leadership Development', 'leadership-development', 'practical', 8),
('APEST Ministry', 'apest-ministry', 'practical', 10);

-- Create Alan Hirsch profile (example)
INSERT INTO "user_profiles" (
    "id", "email", "first_name", "last_name", "display_name", 
    "ministry_role", "leader_tier", "subdomain", "subscription_tier", "years_in_ministry"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'alan@movemental.com',
    'Alan',
    'Hirsch', 
    'Alan Hirsch',
    'seminary_professor',
    'core',
    'alan',
    'leader',
    35
);

COMMENT ON TABLE "user_profiles" IS 'Extended user profiles with ministry context and APEST integration';
COMMENT ON TABLE "content_items" IS 'Main content repository with AI enhancement and network amplification';
COMMENT ON TABLE "subscription_plans" IS 'Tiered access plans with feature matrices';
COMMENT ON TABLE "communities" IS 'Discussion groups and networking spaces with cultural context';
