// Database tables re-export - All Drizzle tables
// This file provides a single import point for all database tables

// Re-export all tables from the schema
export * from './schema';

// Re-export the tables object for convenience
export { tables } from './schema/index';

// Re-export individual table categories for better organization
export {
  organizationMemberships,
  organizations,
  // Auth & User Management
  userProfiles,
} from './schema/auth';

export {
  assessmentQuestions,
  assessmentResponses,
  // Assessment System
  assessments,
  userAssessments,
} from './schema/assessments';

export {
  // Content Management
  contentCategories,
  contentCrossReferences,
  contentItems,
  contentSeries,
  seriesContentItems,
} from './schema/content';

export {
  aiContentJobs,
  // AI System
  aiConversations,
  aiCrossReferenceSuggestions,
  aiMessages,
  theologicalConcepts,
} from './schema/ai';

export {
  collaborations,
  // Community & Networking
  communities,
  communityMemberships,
  communityPostVotes,
  communityPosts,
} from './schema/community';

export {
  coupons,
  paymentMethods,
  // Subscriptions & Financial
  subscriptionPlans,
  transactions,
  userSubscriptions,
} from './schema/subscriptions';

export {
  learningOutcomes,
  movementMetrics,
  performanceReports,
  // Analytics & Tracking
  userAnalyticsEvents,
  userContentInteractions,
} from './schema/analytics';

export {
  apiKeys,
  // System & Administration
  auditLogs,
  featureFlags,
  systemNotifications,
  userConsents,
  userFeatureFlags,
  userNotificationStatus,
} from './schema/system';

