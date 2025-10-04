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

// Performance Indexes - temporarily disabled
// export * from './indexes';

// Re-export all tables for Drizzle ORM
import {
  organizationMemberships,
  organizationMembershipsRelations,
  organizations,
  organizationsRelations,
  userProfiles,
  userProfilesRelations,
} from './auth';

// Legacy exports for backward compatibility
export const users = userProfiles;
export const teams = organizations;
export const teamMembers = organizationMemberships;

import {
  assessmentQuestions,
  assessmentQuestionsRelations,
  assessmentResponses,
  assessmentResponsesRelations,
  assessments,
  assessmentsRelations,
  userAssessments,
  userAssessmentsRelations,
} from './assessments';

import {
  contentCategories,
  contentCategoriesRelations,
  contentCrossReferences,
  contentCrossReferencesRelations,
  contentItems,
  contentItemsRelations,
  contentSeries,
  contentSeriesRelations,
  seriesContentItems,
  seriesContentItemsRelations,
} from './content';

import {
  aiContentJobs,
  aiContentJobsRelations,
  aiConversations,
  aiConversationsRelations,
  aiCrossReferenceSuggestions,
  aiCrossReferenceSuggestionsRelations,
  aiMessages,
  aiMessagesRelations,
  theologicalConcepts,
} from './ai';

import {
  collaborations,
  collaborationsRelations,
  communities,
  communitiesRelations,
  communityMemberships,
  communityMembershipsRelations,
  communityPostVotes,
  communityPostVotesRelations,
  communityPosts,
  communityPostsRelations,
} from './community';

import {
  coupons,
  paymentMethods,
  paymentMethodsRelations,
  subscriptionPlans,
  subscriptionPlansRelations,
  transactions,
  transactionsRelations,
  userSubscriptions,
  userSubscriptionsRelations,
} from './subscriptions';

import {
  learningOutcomes,
  learningOutcomesRelations,
  movementMetrics,
  performanceReports,
  performanceReportsRelations,
  userAnalyticsEvents,
  userAnalyticsEventsRelations,
  userContentInteractions,
  userContentInteractionsRelations,
} from './analytics';

import {
  apiKeys,
  apiKeysRelations,
  auditLogs,
  auditLogsRelations,
  featureFlags,
  featureFlagsRelations,
  systemNotifications,
  systemNotificationsRelations,
  userConsents,
  userConsentsRelations,
  userFeatureFlags,
  userFeatureFlagsRelations,
  userNotificationStatus,
  userNotificationStatusRelations,
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
