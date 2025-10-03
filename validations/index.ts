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

// Re-export commonly used types to avoid conflicts
export type {
  UserProfile,
  NewUserProfile,
  Organization,
  NewOrganization,
  OrganizationMembership,
  NewOrganizationMembership,
} from './auth';

export type {
  ContentCategory,
  NewContentCategory,
  ContentSeries,
  NewContentSeries,
  ContentItem,
  NewContentItem,
} from './content';

export type {
  Assessment,
  NewAssessment,
  AssessmentQuestion,
  NewAssessmentQuestion,
  UserAssessment,
  NewUserAssessment,
} from './assessments';

export type {
  Community,
  NewCommunity,
  CommunityMembership,
  NewCommunityMembership,
  CommunityPost,
  NewCommunityPost,
} from './community';

export type {
  SubscriptionPlan,
  NewSubscriptionPlan,
  UserSubscription,
  NewUserSubscription,
} from './subscriptions';

export type {
  UserAnalyticsEvent,
  NewUserAnalyticsEvent,
  UserContentInteraction,
  NewUserContentInteraction,
} from './analytics';
