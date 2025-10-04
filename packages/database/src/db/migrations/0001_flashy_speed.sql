CREATE TABLE "organization_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
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
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
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
	"subdomain" text,
	"custom_domain" text,
	"platform_title" text,
	"subscription_tier" text DEFAULT 'free',
	"theological_focus" jsonb DEFAULT '[]'::jsonb,
	"brand_colors" jsonb DEFAULT '{"primary":"#2563eb","secondary":"#64748b","accent":"#059669"}'::jsonb,
	"email_notifications" jsonb DEFAULT '{"dailyDigest":true,"collaborationRequests":true,"revenueReports":true,"communityUpdates":true}'::jsonb,
	"privacy_settings" jsonb DEFAULT '{"publicProfile":true,"showAssessmentResults":false,"allowNetworking":true,"shareAnalytics":false}'::jsonb,
	"onboarding_completed" boolean DEFAULT false,
	"onboarding_step" integer DEFAULT 1,
	"account_status" text DEFAULT 'pending_verification',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_active_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "user_profiles_subdomain_unique" UNIQUE("subdomain"),
	CONSTRAINT "user_profiles_custom_domain_unique" UNIQUE("custom_domain")
);
--> statement-breakpoint
CREATE TABLE "assessment_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assessment_id" uuid NOT NULL,
	"question_text" text NOT NULL,
	"question_type" text NOT NULL,
	"order_index" integer NOT NULL,
	"is_required" boolean DEFAULT true,
	"category" text,
	"weight" numeric(3, 2) DEFAULT '1.0',
	"reverse_scored" boolean DEFAULT false,
	"apest_dimension" text,
	"answer_options" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessment_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_assessment_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"response_value" integer,
	"response_text" text,
	"response_time" integer,
	"confidence" integer,
	"skipped" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"assessment_type" text NOT NULL,
	"questions_count" integer NOT NULL,
	"estimated_duration" integer,
	"passing_score" integer,
	"version" text DEFAULT '1.0',
	"language" text DEFAULT 'en',
	"cultural_adaptation" text DEFAULT 'universal',
	"research_backed" boolean DEFAULT false,
	"validity_score" numeric(3, 2),
	"reliability_score" numeric(3, 2),
	"instructions" text,
	"scoring_method" text DEFAULT 'likert_5',
	"status" text DEFAULT 'draft',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	CONSTRAINT "assessments_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"assessment_id" uuid NOT NULL,
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
	"response_consistency" numeric(3, 2),
	"completion_time" integer,
	"confidence_level" integer,
	"cultural_adjustment_applied" boolean DEFAULT false,
	"cultural_adjustment_factor" numeric(3, 2),
	"ai_insights" text,
	"personalized_recommendations" jsonb,
	"suggested_peers" jsonb,
	"complementary_gifts" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"parent_id" uuid,
	"order_index" integer DEFAULT 0,
	"theological_discipline" text,
	"movement_relevance_score" integer DEFAULT 5,
	"apest_relevance" jsonb DEFAULT '{"apostolic":5,"prophetic":5,"evangelistic":5,"shepherding":5,"teaching":5}'::jsonb,
	"meta_description" text,
	"keywords" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "content_cross_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_content_id" uuid NOT NULL,
	"target_content_id" uuid NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "content_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
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
	"semantic_embedding" vector(1536),
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
	"scheduled_at" timestamp,
	CONSTRAINT "content_items_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "content_series" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"excerpt" text,
	"author_id" uuid NOT NULL,
	"collaborators" jsonb DEFAULT '[]'::jsonb,
	"series_type" text NOT NULL,
	"difficulty" text DEFAULT 'intermediate',
	"total_items" integer DEFAULT 0,
	"estimated_duration" integer,
	"primary_category_id" uuid,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"visibility" text DEFAULT 'public',
	"status" text DEFAULT 'draft',
	"featured_image_url" text,
	"meta_description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	CONSTRAINT "content_series_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "series_content_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"series_id" uuid NOT NULL,
	"content_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"prerequisites" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_content_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_id" uuid,
	"user_id" uuid,
	"job_type" text NOT NULL,
	"parameters" jsonb DEFAULT '{}'::jsonb,
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
--> statement-breakpoint
CREATE TABLE "ai_conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"referenced_content" jsonb DEFAULT '[]'::jsonb,
	"generated_insights" text,
	"status" text DEFAULT 'active',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ai_cross_reference_suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "ai_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"message_index" integer NOT NULL,
	"token_count" integer,
	"cited_content" jsonb DEFAULT '[]'::jsonb,
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
--> statement-breakpoint
CREATE TABLE "theological_concepts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"definition" text,
	"concept_type" text NOT NULL,
	"theological_tradition" jsonb DEFAULT '[]'::jsonb,
	"biblical_references" jsonb DEFAULT '[]'::jsonb,
	"historical_period" text,
	"related_concepts" jsonb DEFAULT '[]'::jsonb,
	"synonyms" jsonb DEFAULT '[]'::jsonb,
	"apest_relevance" jsonb DEFAULT '{"apostolic":5,"prophetic":5,"evangelistic":5,"shepherding":5,"teaching":5}'::jsonb,
	"content_references" integer DEFAULT 0,
	"search_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "theological_concepts_name_unique" UNIQUE("name"),
	CONSTRAINT "theological_concepts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "collaborations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"collaboration_type" text NOT NULL,
	"lead_author_id" uuid NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "communities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
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
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "communities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "community_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "community_post_votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"vote_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"tags" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'published',
	"flagged_count" integer DEFAULT 0,
	"moderation_notes" text,
	"attachments" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"discount_type" text NOT NULL,
	"discount_value" numeric(8, 2) NOT NULL,
	"currency" text DEFAULT 'USD',
	"max_uses" integer,
	"used_count" integer DEFAULT 0,
	"max_uses_per_user" integer DEFAULT 1,
	"valid_from" timestamp NOT NULL,
	"valid_until" timestamp,
	"minimum_amount" numeric(8, 2),
	"applicable_plans" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"stripe_coupon_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coupons_code_unique" UNIQUE("code"),
	CONSTRAINT "coupons_stripe_coupon_id_unique" UNIQUE("stripe_coupon_id")
);
--> statement-breakpoint
CREATE TABLE "payment_methods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"last4" text,
	"brand" text,
	"expiry_month" integer,
	"expiry_year" integer,
	"is_default" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"stripe_payment_method_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payment_methods_stripe_payment_method_id_unique" UNIQUE("stripe_payment_method_id")
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"processed_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "learning_outcomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content_id" uuid,
	"outcome_type" text NOT NULL,
	"outcome_description" text NOT NULL,
	"measurement_method" text NOT NULL,
	"baseline_score" integer,
	"current_score" integer,
	"improvement_percentage" numeric(5, 2),
	"verified_by" text DEFAULT 'self',
	"verification_notes" text,
	"ministry_context" jsonb,
	"measured_at" timestamp NOT NULL,
	"follow_up_scheduled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movement_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"region" text NOT NULL,
	"subregion" text,
	"metric_type" text NOT NULL,
	"period_type" text NOT NULL,
	"period_start" timestamp NOT NULL,
	"period_end" timestamp NOT NULL,
	"value" numeric(12, 2) NOT NULL,
	"previous_value" numeric(12, 2),
	"change_percentage" numeric(5, 2),
	"breakdown" jsonb DEFAULT '{}'::jsonb,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "performance_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"report_type" text NOT NULL,
	"period_start" timestamp NOT NULL,
	"period_end" timestamp NOT NULL,
	"data" jsonb NOT NULL,
	"key_metrics" jsonb,
	"insights" jsonb DEFAULT '[]'::jsonb,
	"recommendations" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'generating',
	"generated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"properties" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_content_interactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content_id" uuid NOT NULL,
	"interaction_type" text NOT NULL,
	"progress_percentage" integer DEFAULT 0,
	"time_spent_minutes" integer DEFAULT 0,
	"status" text DEFAULT 'not_started',
	"implementation_status" text,
	"implementation_notes" text,
	"rating" integer,
	"feedback" text,
	"would_recommend" boolean,
	"first_accessed_at" timestamp DEFAULT now() NOT NULL,
	"last_accessed_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"key_hash" text NOT NULL,
	"key_prefix" text NOT NULL,
	"scopes" jsonb DEFAULT '[]'::jsonb,
	"permissions" jsonb DEFAULT '[]'::jsonb,
	"rate_limit" integer DEFAULT 1000,
	"usage_count" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"expires_at" timestamp,
	"last_used_at" timestamp,
	"last_used_ip" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "api_keys_key_hash_unique" UNIQUE("key_hash")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"authentication_method" text,
	"permissions" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feature_flags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"description" text,
	"flag_type" text DEFAULT 'boolean',
	"default_value" jsonb DEFAULT 'false'::jsonb,
	"targeting_rules" jsonb DEFAULT '[]'::jsonb,
	"rollout_percentage" integer DEFAULT 0,
	"rollout_strategy" text DEFAULT 'percentage',
	"environment" text DEFAULT 'development',
	"is_active" boolean DEFAULT false,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"owner" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"archived_at" timestamp,
	CONSTRAINT "feature_flags_name_unique" UNIQUE("name"),
	CONSTRAINT "feature_flags_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "system_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"notification_type" text NOT NULL,
	"priority" text DEFAULT 'normal',
	"target_audience" text DEFAULT 'all_users',
	"target_user_ids" jsonb DEFAULT '[]'::jsonb,
	"display_method" text DEFAULT 'banner',
	"is_dismissible" boolean DEFAULT true,
	"scheduled_at" timestamp,
	"expires_at" timestamp,
	"is_active" boolean DEFAULT true,
	"action_url" text,
	"action_text" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_consents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"consent_type" text NOT NULL,
	"consent_given" boolean NOT NULL,
	"consent_version" text NOT NULL,
	"legal_basis" text DEFAULT 'consent',
	"ip_address" text,
	"user_agent" text,
	"consent_method" text DEFAULT 'explicit_opt_in',
	"withdrawn_at" timestamp,
	"withdrawal_reason" text,
	"given_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_feature_flags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"flag_id" uuid NOT NULL,
	"value" jsonb NOT NULL,
	"reason" text,
	"set_by" uuid,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_notification_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"notification_id" uuid NOT NULL,
	"status" text NOT NULL,
	"sent_at" timestamp,
	"read_at" timestamp,
	"dismissed_at" timestamp,
	"clicked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "activity_logs" CASCADE;--> statement-breakpoint
DROP TABLE "invitations" CASCADE;--> statement-breakpoint
DROP TABLE "team_members" CASCADE;--> statement-breakpoint
DROP TABLE "teams" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_invited_by_user_profiles_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_account_owner_id_user_profiles_id_fk" FOREIGN KEY ("account_owner_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_questions" ADD CONSTRAINT "assessment_questions_assessment_id_assessments_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_responses" ADD CONSTRAINT "assessment_responses_user_assessment_id_user_assessments_id_fk" FOREIGN KEY ("user_assessment_id") REFERENCES "public"."user_assessments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_responses" ADD CONSTRAINT "assessment_responses_question_id_assessment_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."assessment_questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_assessments" ADD CONSTRAINT "user_assessments_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_assessments" ADD CONSTRAINT "user_assessments_assessment_id_assessments_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_categories" ADD CONSTRAINT "content_categories_parent_id_content_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_cross_references" ADD CONSTRAINT "content_cross_references_source_content_id_content_items_id_fk" FOREIGN KEY ("source_content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_cross_references" ADD CONSTRAINT "content_cross_references_target_content_id_content_items_id_fk" FOREIGN KEY ("target_content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_author_id_user_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_primary_category_id_content_categories_id_fk" FOREIGN KEY ("primary_category_id") REFERENCES "public"."content_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_items" ADD CONSTRAINT "content_items_series_id_content_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."content_series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_series" ADD CONSTRAINT "content_series_author_id_user_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_series" ADD CONSTRAINT "content_series_primary_category_id_content_categories_id_fk" FOREIGN KEY ("primary_category_id") REFERENCES "public"."content_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "series_content_items" ADD CONSTRAINT "series_content_items_series_id_content_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."content_series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "series_content_items" ADD CONSTRAINT "series_content_items_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_content_jobs" ADD CONSTRAINT "ai_content_jobs_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_content_jobs" ADD CONSTRAINT "ai_content_jobs_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_cross_reference_suggestions" ADD CONSTRAINT "ai_cross_reference_suggestions_source_content_id_content_items_id_fk" FOREIGN KEY ("source_content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_cross_reference_suggestions" ADD CONSTRAINT "ai_cross_reference_suggestions_target_content_id_content_items_id_fk" FOREIGN KEY ("target_content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_conversation_id_ai_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."ai_conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_lead_author_id_user_profiles_id_fk" FOREIGN KEY ("lead_author_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "communities" ADD CONSTRAINT "communities_created_by_user_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_memberships" ADD CONSTRAINT "community_memberships_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_post_votes" ADD CONSTRAINT "community_post_votes_post_id_community_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."community_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_post_votes" ADD CONSTRAINT "community_post_votes_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_author_id_user_profiles_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_parent_post_id_community_posts_id_fk" FOREIGN KEY ("parent_post_id") REFERENCES "public"."community_posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_subscription_id_user_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."user_subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_leader_profile_id_user_profiles_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_subscription_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_leader_profile_id_user_profiles_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_outcomes" ADD CONSTRAINT "learning_outcomes_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_outcomes" ADD CONSTRAINT "learning_outcomes_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "performance_reports" ADD CONSTRAINT "performance_reports_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_analytics_events" ADD CONSTRAINT "user_analytics_events_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_analytics_events" ADD CONSTRAINT "user_analytics_events_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_analytics_events" ADD CONSTRAINT "user_analytics_events_leader_profile_id_user_profiles_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_content_interactions" ADD CONSTRAINT "user_content_interactions_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_content_interactions" ADD CONSTRAINT "user_content_interactions_content_id_content_items_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_feature_flags" ADD CONSTRAINT "user_feature_flags_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_feature_flags" ADD CONSTRAINT "user_feature_flags_flag_id_feature_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."feature_flags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_feature_flags" ADD CONSTRAINT "user_feature_flags_set_by_user_profiles_id_fk" FOREIGN KEY ("set_by") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notification_status" ADD CONSTRAINT "user_notification_status_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notification_status" ADD CONSTRAINT "user_notification_status_notification_id_system_notifications_id_fk" FOREIGN KEY ("notification_id") REFERENCES "public"."system_notifications"("id") ON DELETE cascade ON UPDATE no action;