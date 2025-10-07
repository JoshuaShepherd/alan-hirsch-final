// Performance Indexes - Alan Hirsch Digital Platform
// This file defines database indexes for optimal query performance

import { index } from 'drizzle-orm/pg-core';
import {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  userAssessments,
} from './assessments';
import { organizationMemberships, organizations, userProfiles } from './auth';
import {
  communities,
  communityMemberships,
  communityPostVotes,
  communityPosts,
} from './community';
import {
  contentCategories,
  contentCrossReferences,
  contentItems,
  contentSeries,
  seriesContentItems,
} from './content';
import { subscriptionPlans, userSubscriptions } from './subscriptions';

// User Profiles Indexes
export const userProfilesIndexes = {
  emailIdx: index('user_profiles_email_idx').on(userProfiles.email),
  ministryRoleIdx: index('user_profiles_ministry_role_idx').on(
    userProfiles.ministryRole
  ),
  countryCodeIdx: index('user_profiles_country_code_idx').on(
    userProfiles.countryCode
  ),
  subscriptionTierIdx: index('user_profiles_subscription_tier_idx').on(
    userProfiles.subscriptionTier
  ),
  accountStatusIdx: index('user_profiles_account_status_idx').on(
    userProfiles.accountStatus
  ),
  createdAtIdx: index('user_profiles_created_at_idx').on(
    userProfiles.createdAt
  ),
};

// Organizations Indexes
export const organizationsIndexes = {
  slugIdx: index('organizations_slug_idx').on(organizations.slug),
  organizationTypeIdx: index('organizations_type_idx').on(
    organizations.organizationType
  ),
  statusIdx: index('organizations_status_idx').on(organizations.status),
  createdAtIdx: index('organizations_created_at_idx').on(
    organizations.createdAt
  ),
};

// Organization Memberships Indexes
export const organizationMembershipsIndexes = {
  userIdIdx: index('organization_memberships_user_id_idx').on(
    organizationMemberships.userId
  ),
  organizationIdIdx: index('organization_memberships_organization_id_idx').on(
    organizationMemberships.organizationId
  ),
  roleIdx: index('organization_memberships_role_idx').on(
    organizationMemberships.role
  ),
  statusIdx: index('organization_memberships_status_idx').on(
    organizationMemberships.status
  ),
  // Composite index for common queries
  userOrgStatusIdx: index('organization_memberships_user_org_status_idx').on(
    organizationMemberships.userId,
    organizationMemberships.organizationId,
    organizationMemberships.status
  ),
};

// Assessments Indexes
export const assessmentsIndexes = {
  slugIdx: index('assessments_slug_idx').on(assessments.slug),
  assessmentTypeIdx: index('assessments_type_idx').on(
    assessments.assessmentType
  ),
  statusIdx: index('assessments_status_idx').on(assessments.status),
  createdAtIdx: index('assessments_created_at_idx').on(assessments.createdAt),
};

// Assessment Questions Indexes
export const assessmentQuestionsIndexes = {
  assessmentIdIdx: index('assessment_questions_assessment_id_idx').on(
    assessmentQuestions.assessmentId
  ),
  orderIndexIdx: index('assessment_questions_order_index_idx').on(
    assessmentQuestions.orderIndex
  ),
  apestDimensionIdx: index('assessment_questions_apest_dimension_idx').on(
    assessmentQuestions.apestDimension
  ),
};

// User Assessments Indexes
export const userAssessmentsIndexes = {
  userIdIdx: index('user_assessments_user_id_idx').on(userAssessments.userId),
  assessmentIdIdx: index('user_assessments_assessment_id_idx').on(
    userAssessments.assessmentId
  ),
  completedAtIdx: index('user_assessments_completed_at_idx').on(
    userAssessments.completedAt
  ),
  // Composite index for user assessment queries
  userAssessmentIdx: index('user_assessments_user_assessment_idx').on(
    userAssessments.userId,
    userAssessments.assessmentId
  ),
};

// Assessment Responses Indexes
export const assessmentResponsesIndexes = {
  userAssessmentIdIdx: index('assessment_responses_user_assessment_id_idx').on(
    assessmentResponses.userAssessmentId
  ),
  questionIdIdx: index('assessment_responses_question_id_idx').on(
    assessmentResponses.questionId
  ),
  createdAtIdx: index('assessment_responses_created_at_idx').on(
    assessmentResponses.createdAt
  ),
};

// Content Categories Indexes
export const contentCategoriesIndexes = {
  slugIdx: index('content_categories_slug_idx').on(contentCategories.slug),
  parentIdIdx: index('content_categories_parent_id_idx').on(
    contentCategories.parentId
  ),
  isActiveIdx: index('content_categories_is_active_idx').on(
    contentCategories.isActive
  ),
};

// Content Series Indexes
export const contentSeriesIndexes = {
  slugIdx: index('content_series_slug_idx').on(contentSeries.slug),
  authorIdIdx: index('content_series_author_id_idx').on(contentSeries.authorId),
  seriesTypeIdx: index('content_series_type_idx').on(contentSeries.seriesType),
  statusIdx: index('content_series_status_idx').on(contentSeries.status),
  createdAtIdx: index('content_series_created_at_idx').on(
    contentSeries.createdAt
  ),
};

// Content Items Indexes
export const contentItemsIndexes = {
  slugIdx: index('content_items_slug_idx').on(contentItems.slug),
  authorIdIdx: index('content_items_author_id_idx').on(contentItems.authorId),
  contentTypeIdx: index('content_items_content_type_idx').on(
    contentItems.contentType
  ),
  statusIdx: index('content_items_status_idx').on(contentItems.status),
  visibilityIdx: index('content_items_visibility_idx').on(
    contentItems.visibility
  ),
  publishedAtIdx: index('content_items_published_at_idx').on(
    contentItems.publishedAt
  ),
  createdAtIdx: index('content_items_created_at_idx').on(
    contentItems.createdAt
  ),
  // Composite indexes for common queries
  authorStatusIdx: index('content_items_author_status_idx').on(
    contentItems.authorId,
    contentItems.status
  ),
  statusVisibilityIdx: index('content_items_status_visibility_idx').on(
    contentItems.status,
    contentItems.visibility
  ),
};

// Series Content Items Indexes
export const seriesContentItemsIndexes = {
  seriesIdIdx: index('series_content_items_series_id_idx').on(
    seriesContentItems.seriesId
  ),
  contentIdIdx: index('series_content_items_content_id_idx').on(
    seriesContentItems.contentId
  ),
  orderIndexIdx: index('series_content_items_order_index_idx').on(
    seriesContentItems.orderIndex
  ),
};

// Content Cross References Indexes
export const contentCrossReferencesIndexes = {
  sourceContentIdIdx: index(
    'content_cross_references_source_content_id_idx'
  ).on(contentCrossReferences.sourceContentId),
  targetContentIdIdx: index(
    'content_cross_references_target_content_id_idx'
  ).on(contentCrossReferences.targetContentId),
  referenceTypeIdx: index('content_cross_references_reference_type_idx').on(
    contentCrossReferences.referenceType
  ),
};

// Communities Indexes
export const communitiesIndexes = {
  slugIdx: index('communities_slug_idx').on(communities.slug),
  communityTypeIdx: index('communities_type_idx').on(communities.communityType),
  visibilityIdx: index('communities_visibility_idx').on(communities.visibility),
  isActiveIdx: index('communities_is_active_idx').on(communities.isActive),
  createdAtIdx: index('communities_created_at_idx').on(communities.createdAt),
};

// Community Memberships Indexes
export const communityMembershipsIndexes = {
  communityIdIdx: index('community_memberships_community_id_idx').on(
    communityMemberships.communityId
  ),
  userIdIdx: index('community_memberships_user_id_idx').on(
    communityMemberships.userId
  ),
  roleIdx: index('community_memberships_role_idx').on(
    communityMemberships.role
  ),
  statusIdx: index('community_memberships_status_idx').on(
    communityMemberships.status
  ),
  // Composite index for common queries
  communityUserIdx: index('community_memberships_community_user_idx').on(
    communityMemberships.communityId,
    communityMemberships.userId
  ),
};

// Community Posts Indexes
export const communityPostsIndexes = {
  communityIdIdx: index('community_posts_community_id_idx').on(
    communityPosts.communityId
  ),
  authorIdIdx: index('community_posts_author_id_idx').on(
    communityPosts.authorId
  ),
  postTypeIdx: index('community_posts_post_type_idx').on(
    communityPosts.postType
  ),
  isPinnedIdx: index('community_posts_is_pinned_idx').on(
    communityPosts.isPinned
  ),
  createdAtIdx: index('community_posts_created_at_idx').on(
    communityPosts.createdAt
  ),
};

// Community Post Votes Indexes
export const communityPostVotesIndexes = {
  postIdIdx: index('community_post_votes_post_id_idx').on(
    communityPostVotes.postId
  ),
  userIdIdx: index('community_post_votes_user_id_idx').on(
    communityPostVotes.userId
  ),
  // Composite index to prevent duplicate votes
  postUserIdx: index('community_post_votes_post_user_idx').on(
    communityPostVotes.postId,
    communityPostVotes.userId
  ),
};

// Subscription Plans Indexes
export const subscriptionPlansIndexes = {
  isActiveIdx: index('subscription_plans_is_active_idx').on(
    subscriptionPlans.isActive
  ),
};

// User Subscriptions Indexes
export const userSubscriptionsIndexes = {
  userIdIdx: index('user_subscriptions_user_id_idx').on(
    userSubscriptions.userId
  ),
  planIdIdx: index('user_subscriptions_plan_id_idx').on(
    userSubscriptions.planId
  ),
  statusIdx: index('user_subscriptions_status_idx').on(
    userSubscriptions.status
  ),
  organizationIdIdx: index('user_subscriptions_organization_id_idx').on(
    userSubscriptions.organizationId
  ),
  // Composite index for common queries
  userStatusIdx: index('user_subscriptions_user_status_idx').on(
    userSubscriptions.userId,
    userSubscriptions.status
  ),
};

// Export all indexes
export const allIndexes = {
  ...userProfilesIndexes,
  ...organizationsIndexes,
  ...organizationMembershipsIndexes,
  ...assessmentsIndexes,
  ...assessmentQuestionsIndexes,
  ...userAssessmentsIndexes,
  ...assessmentResponsesIndexes,
  ...contentCategoriesIndexes,
  ...contentSeriesIndexes,
  ...contentItemsIndexes,
  ...seriesContentItemsIndexes,
  ...contentCrossReferencesIndexes,
  ...communitiesIndexes,
  ...communityMembershipsIndexes,
  ...communityPostsIndexes,
  ...communityPostVotesIndexes,
  ...subscriptionPlansIndexes,
  ...userSubscriptionsIndexes,
};
