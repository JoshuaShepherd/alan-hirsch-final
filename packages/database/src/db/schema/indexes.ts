// Performance Indexes - Alan Hirsch Digital Platform
// This file defines database indexes for optimal query performance

import { index } from 'drizzle-orm/pg-core';
import {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  communities,
  communityMemberships,
  communityPostVotes,
  communityPosts,
  contentCategories,
  contentCrossReferences,
  contentItems,
  contentSeries,
  organizationMemberships,
  organizations,
  seriesContentItems,
  subscriptionPlans,
  userAssessments,
  userProfiles,
  userSubscriptions,
} from './index';

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
  accountOwnerIdx: index('organizations_account_owner_idx').on(
    organizations.accountOwnerId
  ),
  statusIdx: index('organizations_status_idx').on(organizations.status),
  createdAtIdx: index('organizations_created_at_idx').on(
    organizations.createdAt
  ),
};

// Organization Memberships Indexes
export const organizationMembershipsIndexes = {
  userIdIdx: index('org_memberships_user_id_idx').on(
    organizationMemberships.userId
  ),
  organizationIdIdx: index('org_memberships_org_id_idx').on(
    organizationMemberships.organizationId
  ),
  roleIdx: index('org_memberships_role_idx').on(organizationMemberships.role),
  statusIdx: index('org_memberships_status_idx').on(
    organizationMemberships.status
  ),
  joinedAtIdx: index('org_memberships_joined_at_idx').on(
    organizationMemberships.joinedAt
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
  orderIndexIdx: index('assessment_questions_order_idx').on(
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
  primaryGiftIdx: index('user_assessments_primary_gift_idx').on(
    userAssessments.primaryGift
  ),
  createdAtIdx: index('user_assessments_created_at_idx').on(
    userAssessments.createdAt
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
  theologicalDisciplineIdx: index(
    'content_categories_theological_discipline_idx'
  ).on(contentCategories.theologicalDiscipline),
  isActiveIdx: index('content_categories_is_active_idx').on(
    contentCategories.isActive
  ),
};

// Content Series Indexes
export const contentSeriesIndexes = {
  slugIdx: index('content_series_slug_idx').on(contentSeries.slug),
  authorIdIdx: index('content_series_author_id_idx').on(contentSeries.authorId),
  seriesTypeIdx: index('content_series_type_idx').on(contentSeries.seriesType),
  visibilityIdx: index('content_series_visibility_idx').on(
    contentSeries.visibility
  ),
  statusIdx: index('content_series_status_idx').on(contentSeries.status),
  publishedAtIdx: index('content_series_published_at_idx').on(
    contentSeries.publishedAt
  ),
};

// Content Items Indexes
export const contentItemsIndexes = {
  slugIdx: index('content_items_slug_idx').on(contentItems.slug),
  authorIdIdx: index('content_items_author_id_idx').on(contentItems.authorId),
  contentTypeIdx: index('content_items_type_idx').on(contentItems.contentType),
  primaryCategoryIdIdx: index('content_items_primary_category_id_idx').on(
    contentItems.primaryCategoryId
  ),
  seriesIdIdx: index('content_items_series_id_idx').on(contentItems.seriesId),
  visibilityIdx: index('content_items_visibility_idx').on(
    contentItems.visibility
  ),
  statusIdx: index('content_items_status_idx').on(contentItems.status),
  publishedAtIdx: index('content_items_published_at_idx').on(
    contentItems.publishedAt
  ),
  viewCountIdx: index('content_items_view_count_idx').on(
    contentItems.viewCount
  ),
  likeCountIdx: index('content_items_like_count_idx').on(
    contentItems.likeCount
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
  orderIndexIdx: index('series_content_items_order_idx').on(
    seriesContentItems.orderIndex
  ),
};

// Content Cross References Indexes
export const contentCrossReferencesIndexes = {
  sourceContentIdIdx: index('content_cross_refs_source_id_idx').on(
    contentCrossReferences.sourceContentId
  ),
  targetContentIdIdx: index('content_cross_refs_target_id_idx').on(
    contentCrossReferences.targetContentId
  ),
  referenceTypeIdx: index('content_cross_refs_type_idx').on(
    contentCrossReferences.referenceType
  ),
  relevanceScoreIdx: index('content_cross_refs_relevance_score_idx').on(
    contentCrossReferences.relevanceScore
  ),
};

// Communities Indexes
export const communitiesIndexes = {
  slugIdx: index('communities_slug_idx').on(communities.slug),
  communityTypeIdx: index('communities_type_idx').on(communities.communityType),
  createdByIdx: index('communities_created_by_idx').on(communities.createdBy),
  visibilityIdx: index('communities_visibility_idx').on(communities.visibility),
  isActiveIdx: index('communities_is_active_idx').on(communities.isActive),
  createdAtIdx: index('communities_created_at_idx').on(communities.createdAt),
};

// Community Memberships Indexes
export const communityMembershipsIndexes = {
  userIdIdx: index('community_memberships_user_id_idx').on(
    communityMemberships.userId
  ),
  communityIdIdx: index('community_memberships_community_id_idx').on(
    communityMemberships.communityId
  ),
  roleIdx: index('community_memberships_role_idx').on(
    communityMemberships.role
  ),
  statusIdx: index('community_memberships_status_idx').on(
    communityMemberships.status
  ),
  joinedAtIdx: index('community_memberships_joined_at_idx').on(
    communityMemberships.joinedAt
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
  postTypeIdx: index('community_posts_type_idx').on(communityPosts.postType),
  parentPostIdIdx: index('community_posts_parent_id_idx').on(
    communityPosts.parentPostId
  ),
  statusIdx: index('community_posts_status_idx').on(communityPosts.status),
  createdAtIdx: index('community_posts_created_at_idx').on(
    communityPosts.createdAt
  ),
  upvotesIdx: index('community_posts_upvotes_idx').on(communityPosts.upvotes),
};

// Community Post Votes Indexes
export const communityPostVotesIndexes = {
  postIdIdx: index('community_post_votes_post_id_idx').on(
    communityPostVotes.postId
  ),
  userIdIdx: index('community_post_votes_user_id_idx').on(
    communityPostVotes.userId
  ),
  voteTypeIdx: index('community_post_votes_type_idx').on(
    communityPostVotes.voteType
  ),
};

// Collaborations Indexes
export const collaborationsIndexes = {
  leadAuthorIdIdx: index('collaborations_lead_author_id_idx').on(
    collaborations.leadAuthorId
  ),
  collaborationTypeIdx: index('collaborations_type_idx').on(
    collaborations.collaborationType
  ),
  statusIdx: index('collaborations_status_idx').on(collaborations.status),
  startDateIdx: index('collaborations_start_date_idx').on(
    collaborations.startDate
  ),
  createdAtIdx: index('collaborations_created_at_idx').on(
    collaborations.createdAt
  ),
};

// Subscription Plans Indexes
export const subscriptionPlansIndexes = {
  slugIdx: index('subscription_plans_slug_idx').on(subscriptionPlans.slug),
  planTypeIdx: index('subscription_plans_type_idx').on(
    subscriptionPlans.planType
  ),
  isActiveIdx: index('subscription_plans_is_active_idx').on(
    subscriptionPlans.isActive
  ),
  sortOrderIdx: index('subscription_plans_sort_order_idx').on(
    subscriptionPlans.sortOrder
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
  leaderProfileIdIdx: index('user_subscriptions_leader_profile_id_idx').on(
    userSubscriptions.leaderProfileId
  ),
  organizationIdIdx: index('user_subscriptions_organization_id_idx').on(
    userSubscriptions.organizationId
  ),
  statusIdx: index('user_subscriptions_status_idx').on(
    userSubscriptions.status
  ),
  currentPeriodEndIdx: index('user_subscriptions_period_end_idx').on(
    userSubscriptions.currentPeriodEnd
  ),
  stripeSubscriptionIdIdx: index('user_subscriptions_stripe_id_idx').on(
    userSubscriptions.stripeSubscriptionId
  ),
};

// Additional indexes will be added as more tables are implemented

// Export all indexes for easy access
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
  ...collaborationsIndexes,
  ...subscriptionPlansIndexes,
  ...userSubscriptionsIndexes,
};
