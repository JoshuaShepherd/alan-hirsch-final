-- Database Query Optimization - Indexes
-- This migration adds performance indexes for frequently queried columns
-- Based on the API Infrastructure Improvements Plan

-- User Profiles Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_email
ON user_profiles(email);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_account_status
ON user_profiles(account_status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_ministry_role
ON user_profiles(ministry_role);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_denomination
ON user_profiles(denomination);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_country_code
ON user_profiles(country_code);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_created_at
ON user_profiles(created_at);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_last_active_at
ON user_profiles(last_active_at);

-- Composite index for active users by role and country
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_active_role_country
ON user_profiles(account_status, ministry_role, country_code)
WHERE account_status = 'active';

-- Organizations Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organizations_slug
ON organizations(slug);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organizations_status
ON organizations(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organizations_account_owner_id
ON organizations(account_owner_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organizations_created_at
ON organizations(created_at);

-- Organization Memberships Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organization_memberships_user_id
ON organization_memberships(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organization_memberships_organization_id
ON organization_memberships(organization_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organization_memberships_status
ON organization_memberships(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organization_memberships_role
ON organization_memberships(role);

-- Composite index for active memberships
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_organization_memberships_active_user_org
ON organization_memberships(user_id, organization_id, status)
WHERE status = 'active';

-- Content Categories Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_categories_slug
ON content_categories(slug);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_categories_is_active
ON content_categories(is_active);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_categories_parent_id
ON content_categories(parent_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_categories_order_index
ON content_categories(order_index);

-- Content Items Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_slug
ON content_items(slug);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_status
ON content_items(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_visibility
ON content_items(visibility);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_author_id
ON content_items(author_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_category_id
ON content_items(category_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_published_at
ON content_items(published_at);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_created_at
ON content_items(created_at);

-- Composite index for published public content
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_published_public
ON content_items(status, visibility, published_at)
WHERE status = 'published' AND visibility = 'public';

-- Composite index for author's content
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_author_status
ON content_items(author_id, status, created_at);

-- Subscription Plans Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscription_plans_slug
ON subscription_plans(slug);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscription_plans_is_active
ON subscription_plans(is_active);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscription_plans_price
ON subscription_plans(price);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscription_plans_interval
ON subscription_plans(interval);

-- User Subscriptions Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_user_id
ON user_subscriptions(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_plan_id
ON user_subscriptions(plan_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_status
ON user_subscriptions(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_stripe_subscription_id
ON user_subscriptions(stripe_subscription_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_stripe_customer_id
ON user_subscriptions(stripe_customer_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_current_period_end
ON user_subscriptions(current_period_end);

-- Composite index for active subscriptions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_active_user
ON user_subscriptions(user_id, status, current_period_end)
WHERE status = 'active';

-- Communities Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communities_slug
ON communities(slug);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communities_visibility
ON communities(visibility);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communities_created_by
ON communities(created_by);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communities_is_active
ON communities(is_active);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communities_created_at
ON communities(created_at);

-- Composite index for public active communities
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communities_public_active
ON communities(visibility, is_active, created_at)
WHERE visibility = 'public' AND is_active = true;

-- Assessments Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessments_slug
ON assessments(slug);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessments_assessment_type
ON assessments(assessment_type);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessments_status
ON assessments(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessments_created_at
ON assessments(created_at);

-- Composite index for active assessments by type
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessments_active_type
ON assessments(status, assessment_type, created_at)
WHERE status = 'active';

-- Assessment Questions Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_questions_assessment_id
ON assessment_questions(assessment_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_questions_order_index
ON assessment_questions(order_index);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_questions_question_type
ON assessment_questions(question_type);

-- Composite index for questions by assessment and order
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_questions_assessment_order
ON assessment_questions(assessment_id, order_index);

-- User Assessments Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_user_id
ON user_assessments(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_assessment_id
ON user_assessments(assessment_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_status
ON user_assessments(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_completed_at
ON user_assessments(completed_at);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_created_at
ON user_assessments(created_at);

-- Composite index for user's assessments
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_user_status
ON user_assessments(user_id, status, created_at);

-- Composite index for completed assessments
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_completed
ON user_assessments(assessment_id, status, completed_at)
WHERE status = 'completed';

-- Assessment Responses Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_responses_user_assessment_id
ON assessment_responses(user_assessment_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_responses_question_id
ON assessment_responses(question_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_responses_created_at
ON assessment_responses(created_at);

-- Composite index for responses by user assessment
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assessment_responses_user_assessment
ON assessment_responses(user_assessment_id, question_id);

-- Performance Monitoring Indexes
-- These indexes help with query performance monitoring and optimization

-- Index for monitoring slow queries (if you have a query log table)
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_query_log_duration
-- ON query_log(duration, executed_at)
-- WHERE duration > 1000; -- Queries taking more than 1 second

-- Index for monitoring user activity patterns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_activity_pattern
ON user_profiles(last_active_at, account_status, ministry_role);

-- Index for monitoring content engagement
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_engagement
ON content_items(view_count, published_at, status)
WHERE status = 'published';

-- Index for monitoring assessment completion rates
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_assessments_completion_rates
ON user_assessments(assessment_id, status, completed_at, created_at);

-- Partial indexes for common filtering patterns
-- Active users only
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_active_only
ON user_profiles(ministry_role, country_code, created_at)
WHERE account_status = 'active';

-- Published content only
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_published_only
ON content_items(author_id, category_id, published_at)
WHERE status = 'published';

-- Active subscriptions only
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_subscriptions_active_only
ON user_subscriptions(user_id, plan_id, current_period_end)
WHERE status = 'active';

-- Text search indexes (if using full-text search)
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_items_search
-- ON content_items USING gin(to_tsvector('english', title || ' ' || content));

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_search
-- ON user_profiles USING gin(to_tsvector('english', first_name || ' ' || last_name || ' ' || bio));

-- Statistics update to help query planner
ANALYZE user_profiles;
ANALYZE organizations;
ANALYZE organization_memberships;
ANALYZE content_categories;
ANALYZE content_items;
ANALYZE subscription_plans;
ANALYZE user_subscriptions;
ANALYZE communities;
ANALYZE assessments;
ANALYZE assessment_questions;
ANALYZE user_assessments;
ANALYZE assessment_responses;

-- Comments for documentation
COMMENT ON INDEX idx_user_profiles_email IS 'Index for user email lookups and authentication';
COMMENT ON INDEX idx_user_profiles_account_status IS 'Index for filtering users by account status';
COMMENT ON INDEX idx_organizations_slug IS 'Index for organization slug lookups';
COMMENT ON INDEX idx_content_items_published_public IS 'Composite index for published public content queries';
COMMENT ON INDEX idx_user_subscriptions_active_user IS 'Composite index for active user subscriptions';
COMMENT ON INDEX idx_assessments_active_type IS 'Composite index for active assessments by type';
COMMENT ON INDEX idx_user_assessments_user_status IS 'Composite index for user assessment queries';
