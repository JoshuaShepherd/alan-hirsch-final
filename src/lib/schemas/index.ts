// Main schema exports - Production Database Truth → Zod Schemas
// This file aggregates all Zod validation schemas based on live database structure

// Database entity schemas (exact database structure)
export * from './database.schemas';

// CRUD operation schemas (Create, Update, Query variants)
export * from './crud.schemas';

// API request/response schemas (loose validation for external interfaces)
export * from './api.schemas';

// Form validation schemas (user input validation)
export * from './form.schemas';

// Shared schema components (reusable across domains)
export * from './shared.schemas';

// Validation helper functions
export * from './validation.helpers';

// Re-export commonly used types to avoid conflicts
export type {
  DatabaseOrganization,
  DatabaseOrganizationMembership,
  // User Management
  DatabaseUserProfile,
  NewOrganization,
  NewOrganizationMembership,
  NewUserProfile,
  QueryOrganization,
  QueryOrganizationMembership,
  QueryUserProfile,
  UpdateOrganization,
  UpdateOrganizationMembership,
  UpdateUserProfile,
} from './database.schemas';

export type {
  // Content System
  DatabaseContentCategory,
  DatabaseContentItem,
  NewContentCategory,
  NewContentItem,
  QueryContentCategory,
  QueryContentItem,
  UpdateContentCategory,
  UpdateContentItem,
} from './database.schemas';

export type {
  // Assessment System
  DatabaseAssessment,
  DatabaseAssessmentQuestion,
  DatabaseAssessmentResponse,
  DatabaseUserAssessment,
  NewAssessment,
  NewAssessmentQuestion,
  NewAssessmentResponse,
  NewUserAssessment,
  QueryAssessment,
  QueryAssessmentQuestion,
  QueryAssessmentResponse,
  QueryUserAssessment,
  UpdateAssessment,
  UpdateAssessmentQuestion,
  UpdateAssessmentResponse,
  UpdateUserAssessment,
} from './database.schemas';

export type {
  // Subscription & Billing
  DatabaseSubscriptionPlan,
  DatabaseUserSubscription,
  NewSubscriptionPlan,
  NewUserSubscription,
  QuerySubscriptionPlan,
  QueryUserSubscription,
  UpdateSubscriptionPlan,
  UpdateUserSubscription,
} from './database.schemas';

export type {
  // Community System
  DatabaseCommunity,
  NewCommunity,
  QueryCommunity,
  UpdateCommunity,
} from './database.schemas';
