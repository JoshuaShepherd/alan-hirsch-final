// Database Select Types - Auto-generated from Drizzle schemas
// This file exports all the select types that can be imported by other packages

// Common query context type is now exported from context.ts

// Import all tables
import {
  aiContentJobs,
  // AI System
  aiConversations,
  aiCrossReferenceSuggestions,
  aiMessages,
  apiKeys,
  assessmentQuestions,
  assessmentResponses,
  // Assessment System
  assessments,
  // System & Administration
  auditLogs,
  collaborations,
  // Community & Networking
  communities,
  communityMemberships,
  communityPostVotes,
  communityPosts,
  // Content Management
  contentCategories,
  contentCrossReferences,
  contentItems,
  contentSeries,
  coupons,
  featureFlags,
  learningOutcomes,
  movementMetrics,
  organizationMemberships,
  organizations,
  paymentMethods,
  performanceReports,
  seriesContentItems,
  // Subscriptions & Financial
  subscriptionPlans,
  systemNotifications,
  theologicalConcepts,
  transactions,
  // Analytics & Tracking
  userAnalyticsEvents,
  userAssessments,
  userConsents,
  userContentInteractions,
  userFeatureFlags,
  userNotificationStatus,
  // Auth & User Management
  userProfiles,
  userSubscriptions,
} from './schema';

// Auth & User Management Select Types
export type UserProfilesSelect = typeof userProfiles.$inferSelect;
export type OrganizationsSelect = typeof organizations.$inferSelect;
export type OrganizationMembershipsSelect =
  typeof organizationMemberships.$inferSelect;

// Assessment System Select Types
export type AssessmentsSelect = typeof assessments.$inferSelect;
export type AssessmentQuestionsSelect = typeof assessmentQuestions.$inferSelect;
export type UserAssessmentsSelect = typeof userAssessments.$inferSelect;
export type AssessmentResponsesSelect = typeof assessmentResponses.$inferSelect;

// Content Management Select Types
export type ContentCategoriesSelect = typeof contentCategories.$inferSelect;
export type ContentSeriesSelect = typeof contentSeries.$inferSelect;
export type ContentItemsSelect = typeof contentItems.$inferSelect;
export type SeriesContentItemsSelect = typeof seriesContentItems.$inferSelect;
export type ContentCrossReferencesSelect =
  typeof contentCrossReferences.$inferSelect;

// AI System Select Types
export type AiConversationsSelect = typeof aiConversations.$inferSelect;
export type AiMessagesSelect = typeof aiMessages.$inferSelect;
export type AiContentJobsSelect = typeof aiContentJobs.$inferSelect;
export type AiCrossReferenceSuggestionsSelect =
  typeof aiCrossReferenceSuggestions.$inferSelect;
export type TheologicalConceptsSelect = typeof theologicalConcepts.$inferSelect;

// Community & Networking Select Types
export type CommunitiesSelect = typeof communities.$inferSelect;
export type CommunityMembershipsSelect =
  typeof communityMemberships.$inferSelect;
export type CommunityPostsSelect = typeof communityPosts.$inferSelect;
export type CommunityPostVotesSelect = typeof communityPostVotes.$inferSelect;
export type CollaborationsSelect = typeof collaborations.$inferSelect;

// Subscriptions & Financial Select Types
export type SubscriptionPlansSelect = typeof subscriptionPlans.$inferSelect;
export type UserSubscriptionsSelect = typeof userSubscriptions.$inferSelect;
export type TransactionsSelect = typeof transactions.$inferSelect;
export type PaymentMethodsSelect = typeof paymentMethods.$inferSelect;
export type CouponsSelect = typeof coupons.$inferSelect;

// Analytics & Tracking Select Types
export type UserAnalyticsEventsSelect = typeof userAnalyticsEvents.$inferSelect;
export type UserContentInteractionsSelect =
  typeof userContentInteractions.$inferSelect;
export type LearningOutcomesSelect = typeof learningOutcomes.$inferSelect;
export type MovementMetricsSelect = typeof movementMetrics.$inferSelect;
export type PerformanceReportsSelect = typeof performanceReports.$inferSelect;

// System & Administration Select Types
export type AuditLogsSelect = typeof auditLogs.$inferSelect;
export type FeatureFlagsSelect = typeof featureFlags.$inferSelect;
export type UserFeatureFlagsSelect = typeof userFeatureFlags.$inferSelect;
export type UserConsentsSelect = typeof userConsents.$inferSelect;
export type SystemNotificationsSelect = typeof systemNotifications.$inferSelect;
export type UserNotificationStatusSelect =
  typeof userNotificationStatus.$inferSelect;
export type ApiKeysSelect = typeof apiKeys.$inferSelect;

// Legacy aliases for backward compatibility
export type UsersSelect = UserProfilesSelect;
export type TeamsSelect = OrganizationsSelect;
export type TeamMembersSelect = OrganizationMembershipsSelect;
