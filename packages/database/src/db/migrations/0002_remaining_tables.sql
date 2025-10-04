-- Alan Hirsch Digital Platform - Remaining Tables Migration
-- Part 2: AI, Community, Subscriptions, Analytics, and System tables

-- AI Conversations
CREATE TABLE IF NOT EXISTS "ai_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"conversation_type" text NOT NULL,
	"title" text,
	"primary_topic" text,
	"theological_context" jsonb,
	"user_apest_profile" jsonb,
	"ministry_context" jsonb,
	"cultural_context" text,
	"total_messages" integer DEFAULT 0,
	"conversation_duration_minutes" integer,
	"user_satisfaction_rating" integer,
	"theological_accuracy_verified" boolean DEFAULT false,
	"helpfulness_rating" integer,
	"ai_model" text DEFAULT 'gpt-4',
	"model_version" text,
	"total_tokens_used" integer DEFAULT 0,
	"referenced_content" jsonb DEFAULT '[]',
	"generated_insights" text,
	"status" text DEFAULT 'active',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);

-- AI Messages
CREATE TABLE IF NOT EXISTS "ai_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"conversation_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"message_index" integer NOT NULL,
	"token_count" integer,
	"cited_content" jsonb DEFAULT '[]',
	"confidence" numeric(3, 2),
	"factual_accuracy" boolean,
	"theological_soundness" boolean,
	"user_rating" integer,
	"user_feedback" text,
	"flagged_for_review" boolean DEFAULT false,
	"processing_time" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- AI Content Jobs
CREATE TABLE IF NOT EXISTS "ai_content_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"content_id" uuid,
	"user_id" uuid,
	"job_type" text NOT NULL,
	"parameters" jsonb DEFAULT '{}',
	"priority" text DEFAULT 'normal',
	"status" text DEFAULT 'pending',
	"result" jsonb,
	"confidence_score" numeric(3, 2),
	"human_reviewed" boolean DEFAULT false,
	"human_approved" boolean,
	"review_notes" text,
	"ai_model" text DEFAULT 'gpt-4',
	"tokens_used" integer,
	"processing_cost" numeric(8, 4),
	"error_message" text,
	"retry_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- AI Cross Reference Suggestions
CREATE TABLE IF NOT EXISTS "ai_cross_reference_suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"source_content_id" uuid NOT NULL,
	"target_content_id" uuid NOT NULL,
	"suggested_reference_type" text NOT NULL,
	"confidence_score" numeric(3, 2) NOT NULL,
	"relevance_score" numeric(3, 2) NOT NULL,
	"reasoning" text,
	"key_connections" jsonb,
	"human_reviewed" boolean DEFAULT false,
	"human_approved" boolean,
	"review_notes" text,
	"status" text DEFAULT 'pending',
	"ai_model" text DEFAULT 'gpt-4',
	"model_version" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp,
	"implemented_at" timestamp
);

-- Theological Concepts
CREATE TABLE IF NOT EXISTS "theological_concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"definition" text,
	"concept_type" text NOT NULL,
	"theological_tradition" jsonb DEFAULT '[]',
	"biblical_references" jsonb DEFAULT '[]',
	"historical_period" text,
	"related_concepts" jsonb DEFAULT '[]',
	"synonyms" jsonb DEFAULT '[]',
	"apest_relevance" jsonb DEFAULT '{"apostolic": 5, "prophetic": 5, "evangelistic": 5, "shepherding": 5, "teaching": 5}',
	"content_references" integer DEFAULT 0,
	"search_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "theological_concepts_name_unique" UNIQUE("name"),
	CONSTRAINT "theological_concepts_slug_unique" UNIQUE("slug")
);

-- Communities
CREATE TABLE IF NOT EXISTS "communities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"community_type" text NOT NULL,
	"geographic_focus" jsonb DEFAULT '[]',
	"cultural_context" text DEFAULT 'global',
	"language_primary" text DEFAULT 'en',
	"languages_supported" jsonb DEFAULT '["en"]',
	"visibility" text DEFAULT 'public',
	"join_approval_required" boolean DEFAULT false,
	"max_members" integer,
	"allow_guest_posts" boolean DEFAULT false,
	"moderation_level" text DEFAULT 'moderated',
	"current_member_count" integer DEFAULT 0,
	"total_posts_count" integer DEFAULT 0,
	"guidelines" text,
	"rules" jsonb DEFAULT '[]',
	"created_by" uuid NOT NULL,
	"moderators" jsonb DEFAULT '[]',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "communities_slug_unique" UNIQUE("slug")
);

-- Community Memberships
CREATE TABLE IF NOT EXISTS "community_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
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
	"community_id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	"title" text,
	"content" text NOT NULL,
	"post_type" text DEFAULT 'discussion',
	"parent_post_id" uuid,
	"reply_count" integer DEFAULT 0,
	"upvotes" integer DEFAULT 0,
	"downvotes" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"tags" jsonb DEFAULT '[]',
	"status" text DEFAULT 'published',
	"flagged_count" integer DEFAULT 0,
	"moderation_notes" text,
	"attachments" jsonb DEFAULT '[]',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp
);

-- Community Post Votes
CREATE TABLE IF NOT EXISTS "community_post_votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"post_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
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
	"lead_author_id" uuid NOT NULL,
	"collaborators" jsonb DEFAULT '[]',
	"revenue_share_model" text DEFAULT 'equal',
	"total_revenue_share" integer DEFAULT 100,
	"status" text DEFAULT 'planning',
	"start_date" timestamp,
	"target_completion_date" timestamp,
	"actual_completion_date" timestamp,
	"expected_deliverables" jsonb DEFAULT '[]',
	"network_amplification_goal" integer,
	"actual_network_impact" integer,
	"communication_channels" jsonb DEFAULT '[]',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Subscription Plans
CREATE TABLE IF NOT EXISTS "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL,
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
	"stripe_product_id" text,
	"stripe_price_id_monthly" text,
	"stripe_price_id_annual" text,
	"is_active" boolean DEFAULT true,
	"is_popular" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"trial_days" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_plans_slug_unique" UNIQUE("slug"),
	CONSTRAINT "subscription_plans_stripe_product_id_unique" UNIQUE("stripe_product_id")
);

-- User Subscriptions
CREATE TABLE IF NOT EXISTS "user_subscriptions" (
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
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"months_subscribed" integer DEFAULT 0,
	"total_revenue" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);

-- Transactions
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"subscription_id" uuid,
	"transaction_type" text NOT NULL,
	"gross_amount" numeric(10, 2) NOT NULL,
	"platform_fee" numeric(10, 2) NOT NULL,
	"leader_amount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD',
	"leader_profile_id" uuid,
	"organization_id" uuid,
	"attributed_to_network_effect" boolean DEFAULT false,
	"network_amplification_factor" numeric(3, 2) DEFAULT '1.0',
	"payment_status" text NOT NULL,
	"payment_method" text,
	"stripe_payment_intent_id" text,
	"stripe_charge_id" text,
	"description" text,
	"metadata" jsonb DEFAULT '{}',
	"processed_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Add remaining tables for analytics and system...
-- (Continuing with key tables)

-- User Analytics Events
CREATE TABLE IF NOT EXISTS "user_analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid,
	"event_type" text NOT NULL,
	"event_category" text,
	"event_action" text NOT NULL,
	"event_label" text,
	"page_url" text,
	"referrer" text,
	"user_agent" text,
	"ip_address" text,
	"content_id" uuid,
	"content_type" text,
	"leader_profile_id" uuid,
	"session_id" text,
	"session_duration" integer,
	"time_on_page" integer,
	"scroll_depth" integer,
	"click_count" integer DEFAULT 0,
	"apest_profile" jsonb,
	"ministry_context" jsonb,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_term" text,
	"utm_content" text,
	"device_type" text,
	"browser_name" text,
	"operating_system" text,
	"screen_resolution" text,
	"country" text,
	"region" text,
	"city" text,
	"timezone" text,
	"properties" jsonb DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid,
	"action" text NOT NULL,
	"resource" text NOT NULL,
	"resource_id" text,
	"risk_level" text DEFAULT 'low',
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" text,
	"user_agent" text,
	"session_id" text,
	"request_id" text,
	"endpoint" text,
	"http_method" text,
	"metadata" jsonb DEFAULT '{}',
	"authentication_method" text,
	"permissions" jsonb DEFAULT '[]',
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Add foreign key constraints for the new tables
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_conversation_id_ai_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."ai_conversations"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_content_jobs" ADD CONSTRAINT "ai_content_jobs_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_content_jobs" ADD CONSTRAINT "ai_content_jobs_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "ai_cross_reference_suggestions" ADD CONSTRAINT "ai_cross_reference_suggestions_source_content_id_content_items_id_fk" FOREIGN KEY ("source_content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "ai_cross_reference_suggestions" ADD CONSTRAINT "ai_cross_reference_suggestions_target_content_id_content_items_id_fk" FOREIGN KEY ("target_content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "communities" ADD CONSTRAINT "communities_created_by_user_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_author_id_user_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_parent_post_id_community_posts_id_fk" FOREIGN KEY ("parent_post_id") REFERENCES "public"."community_posts"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "community_post_votes" ADD CONSTRAINT "community_post_votes_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "community_post_votes" ADD CONSTRAINT "community_post_votes_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_lead_author_id_user_profiles_id_fk" FOREIGN KEY ("lead_author_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_subscription_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_leader_profile_id_user_profiles_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subscription_id_user_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."user_subscriptions"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_leader_profile_id_user_profiles_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "user_analytics_events" ADD CONSTRAINT "user_analytics_events_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "user_analytics_events" ADD CONSTRAINT "user_analytics_events_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "user_analytics_events" ADD CONSTRAINT "user_analytics_events_leader_profile_id_user_profiles_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
