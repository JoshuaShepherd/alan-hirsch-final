// Main validation exports - Alan Hirsch Digital Platform
// This file aggregates all Zod validation schemas that mirror Drizzle table definitions

// Shared schemas (common across domains)
export * from './shared';

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

// Ministry Platform Integration
export * from './ministry-platform';

// Re-export commonly used types to avoid conflicts
export type {
  NewOrganization,
  NewOrganizationMembership,
  NewUserProfile,
  Organization,
  OrganizationMembership,
  UserProfile,
} from './auth';

export type {
  ContentCategory,
  ContentItem,
  ContentSeries,
  NewContentCategory,
  NewContentItem,
  NewContentSeries,
} from './content';

export type {
  Assessment,
  AssessmentQuestion,
  NewAssessment,
  NewAssessmentQuestion,
  NewUserAssessment,
  UserAssessment,
} from './assessments';

export type {
  Community,
  CommunityMembership,
  CommunityPost,
  NewCommunity,
  NewCommunityMembership,
  NewCommunityPost,
} from './community';

export type {
  NewSubscriptionPlan,
  NewUserSubscription,
  SubscriptionPlan,
  UserSubscription,
} from './subscriptions';

export type {
  NewUserAnalyticsEvent,
  NewUserContentInteraction,
  UserAnalyticsEvent,
  UserContentInteraction,
} from './analytics';

export type {
  CrossEntityValidation,
  MinistryAssessment,
  MinistryCommunity,
  MinistryContentItem,
  MinistryMetrics,
  MinistryOrganization,
  MinistryPaginatedResponse,
  MinistryPlatformError,
  MinistryPlatformResponse,
  MinistrySearch,
  MinistryUserProfile,
  OrganizationContext,
  OrganizationScopedRequest,
  RoleBasedValidation,
} from './ministry-platform';
