// Main schema exports - Alan Hirsch Digital Platform
// This file aggregates all schema definitions for the comprehensive platform

// Auth & User Management
export * from './auth';

// Assessment System
export * from './assessments';

// Content Management
export * from './content';

// AI System
export * from './ai';

// Community & Networking
export * from './community';

// Subscriptions & Financial
export * from './subscriptions';

// Analytics & Tracking
export * from './analytics';

// System & Administration
export * from './system';

// Re-export all tables for Drizzle ORM
import {
  userProfiles,
  organizations,
  organizationMemberships,
  userProfilesRelations,
  organizationsRelations,
  organizationMembershipsRelations,
} from './auth';

// Legacy exports for backward compatibility
export const users = userProfiles;
export const teams = organizations;
export const teamMembers = organizationMemberships;

import {
  assessments,
  assessmentQuestions,
  userAssessments,
  assessmentResponses,
  assessmentsRelations,
  assessmentQuestionsRelations,
  userAssessmentsRelations,
  assessmentResponsesRelations,
} from './assessments';

import {
  contentCategories,
  contentSeries,
  contentItems,
  seriesContentItems,
  contentCrossReferences,
  contentCategoriesRelations,
  contentSeriesRelations,
  contentItemsRelations,
  seriesContentItemsRelations,
  contentCrossReferencesRelations,
} from './content';

import {
  aiConversations,
  aiMessages,
  aiContentJobs,
  aiCrossReferenceSuggestions,
  theologicalConcepts,
  aiConversationsRelations,
  aiMessagesRelations,
  aiContentJobsRelations,
  aiCrossReferenceSuggestionsRelations,
} from './ai';

import {
  communities,
  communityMemberships,
  communityPosts,
  communityPostVotes,
  collaborations,
  communitiesRelations,
  communityMembershipsRelations,
  communityPostsRelations,
  communityPostVotesRelations,
  collaborationsRelations,
} from './community';

import {
  subscriptionPlans,
  userSubscriptions,
  transactions,
  paymentMethods,
  coupons,
  subscriptionPlansRelations,
  userSubscriptionsRelations,
  transactionsRelations,
  paymentMethodsRelations,
} from './subscriptions';

import {
  userAnalyticsEvents,
  userContentInteractions,
  learningOutcomes,
  movementMetrics,
  performanceReports,
  userAnalyticsEventsRelations,
  userContentInteractionsRelations,
  learningOutcomesRelations,
  performanceReportsRelations,
} from './analytics';

import {
  auditLogs,
  featureFlags,
  userFeatureFlags,
  userConsents,
  systemNotifications,
  userNotificationStatus,
  apiKeys,
  auditLogsRelations,
  featureFlagsRelations,
  userFeatureFlagsRelations,
  userConsentsRelations,
  systemNotificationsRelations,
  userNotificationStatusRelations,
  apiKeysRelations,
} from './system';

// Schema object for Drizzle ORM
export const schema = {
  // Auth & User Management
  userProfiles,
  organizations,
  organizationMemberships,
  userProfilesRelations,
  organizationsRelations,
  organizationMembershipsRelations,

  // Assessment System
  assessments,
  assessmentQuestions,
  userAssessments,
  assessmentResponses,
  assessmentsRelations,
  assessmentQuestionsRelations,
  userAssessmentsRelations,
  assessmentResponsesRelations,

  // Content Management
  contentCategories,
  contentSeries,
  contentItems,
  seriesContentItems,
  contentCrossReferences,
  contentCategoriesRelations,
  contentSeriesRelations,
  contentItemsRelations,
  seriesContentItemsRelations,
  contentCrossReferencesRelations,

  // AI System
  aiConversations,
  aiMessages,
  aiContentJobs,
  aiCrossReferenceSuggestions,
  theologicalConcepts,
  aiConversationsRelations,
  aiMessagesRelations,
  aiContentJobsRelations,
  aiCrossReferenceSuggestionsRelations,

  // Community & Networking
  communities,
  communityMemberships,
  communityPosts,
  communityPostVotes,
  collaborations,
  communitiesRelations,
  communityMembershipsRelations,
  communityPostsRelations,
  communityPostVotesRelations,
  collaborationsRelations,

  // Subscriptions & Financial
  subscriptionPlans,
  userSubscriptions,
  transactions,
  paymentMethods,
  coupons,
  subscriptionPlansRelations,
  userSubscriptionsRelations,
  transactionsRelations,
  paymentMethodsRelations,

  // Analytics & Tracking
  userAnalyticsEvents,
  userContentInteractions,
  learningOutcomes,
  movementMetrics,
  performanceReports,
  userAnalyticsEventsRelations,
  userContentInteractionsRelations,
  learningOutcomesRelations,
  performanceReportsRelations,

  // System & Administration
  auditLogs,
  featureFlags,
  userFeatureFlags,
  userConsents,
  systemNotifications,
  userNotificationStatus,
  apiKeys,
  auditLogsRelations,
  featureFlagsRelations,
  userFeatureFlagsRelations,
  userConsentsRelations,
  systemNotificationsRelations,
  userNotificationStatusRelations,
  apiKeysRelations,
};

// Table exports for direct access
export const tables = {
  // Auth & User Management
  userProfiles,
  organizations,
  organizationMemberships,

  // Assessment System
  assessments,
  assessmentQuestions,
  userAssessments,
  assessmentResponses,

  // Content Management
  contentCategories,
  contentSeries,
  contentItems,
  seriesContentItems,
  contentCrossReferences,

  // AI System
  aiConversations,
  aiMessages,
  aiContentJobs,
  aiCrossReferenceSuggestions,
  theologicalConcepts,

  // Community & Networking
  communities,
  communityMemberships,
  communityPosts,
  communityPostVotes,
  collaborations,

  // Subscriptions & Financial
  subscriptionPlans,
  userSubscriptions,
  transactions,
  paymentMethods,
  coupons,

  // Analytics & Tracking
  userAnalyticsEvents,
  userContentInteractions,
  learningOutcomes,
  movementMetrics,
  performanceReports,

  // System & Administration
  auditLogs,
  featureFlags,
  userFeatureFlags,
  userConsents,
  systemNotifications,
  userNotificationStatus,
  apiKeys,
};

// Default export
export default schema;
