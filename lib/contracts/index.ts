// Contracts - Centralized type definitions for Alan Hirsch Digital Platform
// This file exports all DTO types (Zod z.infer) and Drizzle row/insert types

// ============================================================================
// DTO TYPES (Zod z.infer)
// ============================================================================

// Shared schemas
export type {
  CulturalContext,
  Visibility,
  Attachment,
  MembershipRole,
  OrganizationType,
  SubscriptionStatus,
  MinistryRole,
} from '../../validations/shared';

// Auth & User Management DTOs
export type {
  UserProfile,
  NewUserProfile,
  Organization,
  NewOrganization,
  OrganizationMembership,
  NewOrganizationMembership,
} from '../../validations/auth';

// Assessment System DTOs
export type {
  Assessment,
  NewAssessment,
  AssessmentQuestion,
  NewAssessmentQuestion,
  UserAssessment,
  NewUserAssessment,
  AssessmentResponse,
  NewAssessmentResponse,
  AssessmentWithQuestions,
  StartAssessmentInput,
  SaveResponsesInput,
  CompleteAssessmentInput,
  AssessmentSearch,
  UserAssessmentFilters,
} from '../../validations/assessments';

// Assessment Request DTOs
export type {
  CreateAssessmentRequest,
  UpdateAssessmentRequest,
  CreateAssessmentQuestionRequest,
  UpdateAssessmentQuestionRequest,
  StartAssessmentRequest,
  SaveAssessmentResponsesRequest,
  CompleteAssessmentRequest,
  AssessmentSearchRequest,
  UserAssessmentFiltersRequest,
} from './assessments.request';

// Assessment Response DTOs
export type {
  AssessmentResponse as AssessmentResponseDTO,
  AssessmentQuestionResponse,
  UserAssessmentResponse,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  UserAssessmentWithDetailsResponse,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
} from './assessments.response';

// Scoring DTOs
export type { ApestScores, ApestScoreResult } from './scoring';

// Content Management DTOs
export type {
  ContentCategory,
  NewContentCategory,
  ContentSeries,
  NewContentSeries,
  ContentItem,
  NewContentItem,
  SeriesContentItem,
  NewSeriesContentItem,
  ContentCrossReference,
  NewContentCrossReference,
} from '../../validations/content';

// AI System DTOs
export type {
  AiConversation,
  NewAiConversation,
  AiMessage,
  NewAiMessage,
  AiContentJob,
  NewAiContentJob,
  AiCrossReferenceSuggestion,
  NewAiCrossReferenceSuggestion,
  TheologicalConcept,
  NewTheologicalConcept,
} from '../../validations/ai';

// Community & Networking DTOs
export type {
  Community,
  NewCommunity,
  CommunityMembership,
  NewCommunityMembership,
  CommunityPost,
  NewCommunityPost,
  CommunityPostVote,
  NewCommunityPostVote,
  Collaboration,
  NewCollaboration,
} from '../../validations/community';

// Subscriptions & Financial DTOs
export type {
  SubscriptionPlan,
  NewSubscriptionPlan,
  UserSubscription,
  NewUserSubscription,
  Transaction,
  NewTransaction,
  PaymentMethod,
  NewPaymentMethod,
  Coupon,
  NewCoupon,
} from '../../validations/subscriptions';

// Analytics & Tracking DTOs
export type {
  UserAnalyticsEvent,
  NewUserAnalyticsEvent,
  UserContentInteraction,
  NewUserContentInteraction,
  LearningOutcome,
  NewLearningOutcome,
  MovementMetric,
  NewMovementMetric,
  PerformanceReport,
  NewPerformanceReport,
} from '../../validations/analytics';

// System & Administration DTOs
export type {
  AuditLog,
  NewAuditLog,
  FeatureFlag,
  NewFeatureFlag,
  UserFeatureFlag,
  NewUserFeatureFlag,
  UserConsent,
  NewUserConsent,
  SystemNotification,
  NewSystemNotification,
  UserNotificationStatus,
  NewUserNotificationStatus,
  ApiKey,
  NewApiKey,
} from '../../validations/system';

// ============================================================================
// SCHEMA EXPORTS (Zod Schemas)
// ============================================================================

// Shared schemas
export {
  culturalContextSchema,
  visibilitySchema,
  attachmentSchema,
  membershipRoleSchema,
  organizationTypeSchema,
  subscriptionStatusSchema,
  ministryRoleSchema,
} from '../../validations/shared';

// Auth & User Management Schemas
export {
  userProfileSchema,
  newUserProfileSchema,
  organizationSchema,
  newOrganizationSchema,
  organizationMembershipSchema,
  newOrganizationMembershipSchema,
} from '../../validations/auth';

// Assessment System Schemas
export {
  assessmentSchema,
  newAssessmentSchema,
  assessmentQuestionSchema,
  newAssessmentQuestionSchema,
  userAssessmentSchema,
  newUserAssessmentSchema,
  newAssessmentResponseSchema,
  assessmentWithQuestionsSchema,
  startAssessmentInputSchema,
  saveResponsesInputSchema,
  completeAssessmentInputSchema,
  assessmentSearchSchema,
  userAssessmentFiltersSchema,
} from '../../validations/assessments';

// Assessment Request Schemas
export {
  createAssessmentRequestSchema,
  updateAssessmentRequestSchema,
  createAssessmentQuestionRequestSchema,
  updateAssessmentQuestionRequestSchema,
  startAssessmentRequestSchema,
  saveAssessmentResponsesRequestSchema,
  completeAssessmentRequestSchema,
  assessmentSearchRequestSchema,
  userAssessmentFiltersRequestSchema,
} from './assessments.request';

// Assessment Response Schemas
export {
  assessmentResponseSchema as assessmentResponseDTOSchema,
  assessmentQuestionResponseSchema,
  userAssessmentResponseSchema,
  assessmentResponseResponseSchema,
  assessmentWithQuestionsResponseSchema,
  userAssessmentWithDetailsResponseSchema,
  paginatedAssessmentListResponseSchema,
  paginatedUserAssessmentListResponseSchema,
} from './assessments.response';

// Content Management Schemas
export {
  contentCategorySchema,
  newContentCategorySchema,
  contentSeriesSchema,
  newContentSeriesSchema,
  contentItemSchema,
  newContentItemSchema,
  seriesContentItemSchema,
  newSeriesContentItemSchema,
  contentCrossReferenceSchema,
  newContentCrossReferenceSchema,
} from '../../validations/content';

// AI System Schemas
export {
  aiConversationSchema,
  newAiConversationSchema,
  aiMessageSchema,
  newAiMessageSchema,
  aiContentJobSchema,
  newAiContentJobSchema,
  aiCrossReferenceSuggestionSchema,
  newAiCrossReferenceSuggestionSchema,
  theologicalConceptSchema,
  newTheologicalConceptSchema,
} from '../../validations/ai';

// Community System Schemas
export {
  communitySchema,
  newCommunitySchema,
  communityMembershipSchema,
  newCommunityMembershipSchema,
  communityPostSchema,
  newCommunityPostSchema,
  communityPostVoteSchema,
  newCommunityPostVoteSchema,
  collaborationSchema,
  newCollaborationSchema,
} from '../../validations/community';

// Subscription & Payment Schemas
export {
  subscriptionPlanSchema,
  newSubscriptionPlanSchema,
  userSubscriptionSchema,
  newUserSubscriptionSchema,
  transactionSchema,
  newTransactionSchema,
  paymentMethodSchema,
  newPaymentMethodSchema,
} from '../../validations/subscriptions';

// Analytics Schemas
export {
  userAnalyticsEventSchema,
  newUserAnalyticsEventSchema,
  userContentInteractionSchema,
  newUserContentInteractionSchema,
} from '../../validations/analytics';

// System & Administration Schemas
export {
  auditLogSchema,
  newAuditLogSchema,
  featureFlagSchema,
  newFeatureFlagSchema,
  userFeatureFlagSchema,
  newUserFeatureFlagSchema,
  userConsentSchema,
  newUserConsentSchema,
  systemNotificationSchema,
  newSystemNotificationSchema,
  userNotificationStatusSchema,
  newUserNotificationStatusSchema,
  apiKeySchema,
  newApiKeySchema,
} from '../../validations/system';

// ============================================================================
// DRIZZLE ROW/INSERT TYPES
// ============================================================================

import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import {
  userProfiles,
  organizations,
  organizationMemberships,
  assessments,
  assessmentQuestions,
  userAssessments,
  assessmentResponses,
  contentCategories,
  contentSeries,
  contentItems,
  seriesContentItems,
  contentCrossReferences,
  aiConversations,
  aiMessages,
  aiContentJobs,
  aiCrossReferenceSuggestions,
  theologicalConcepts,
  communities,
  communityMemberships,
  communityPosts,
  communityPostVotes,
  collaborations,
  subscriptionPlans,
  userSubscriptions,
  transactions,
  paymentMethods,
  coupons,
  userAnalyticsEvents,
  userContentInteractions,
  learningOutcomes,
  movementMetrics,
  performanceReports,
  auditLogs,
  featureFlags,
  userFeatureFlags,
  userConsents,
  systemNotifications,
  userNotificationStatus,
  apiKeys,
} from '../db/schema';

// Auth & User Management Row/Insert Types
export type UserProfileRow = InferSelectModel<typeof userProfiles>;
export type UserProfileInsert = InferInsertModel<typeof userProfiles>;
export type OrganizationRow = InferSelectModel<typeof organizations>;
export type OrganizationInsert = InferInsertModel<typeof organizations>;
export type OrganizationMembershipRow = InferSelectModel<
  typeof organizationMemberships
>;
export type OrganizationMembershipInsert = InferInsertModel<
  typeof organizationMemberships
>;

// Assessment System Row/Insert Types
export type AssessmentRow = InferSelectModel<typeof assessments>;
export type AssessmentInsert = InferInsertModel<typeof assessments>;
export type AssessmentQuestionRow = InferSelectModel<
  typeof assessmentQuestions
>;
export type AssessmentQuestionInsert = InferInsertModel<
  typeof assessmentQuestions
>;
export type UserAssessmentRow = InferSelectModel<typeof userAssessments>;
export type UserAssessmentInsert = InferInsertModel<typeof userAssessments>;
export type AssessmentResponseRow = InferSelectModel<
  typeof assessmentResponses
>;
export type AssessmentResponseInsert = InferInsertModel<
  typeof assessmentResponses
>;

// Content Management Row/Insert Types
export type ContentCategoryRow = InferSelectModel<typeof contentCategories>;
export type ContentCategoryInsert = InferInsertModel<typeof contentCategories>;
export type ContentSeriesRow = InferSelectModel<typeof contentSeries>;
export type ContentSeriesInsert = InferInsertModel<typeof contentSeries>;
export type ContentItemRow = InferSelectModel<typeof contentItems>;
export type ContentItemInsert = InferInsertModel<typeof contentItems>;
export type SeriesContentItemRow = InferSelectModel<typeof seriesContentItems>;
export type SeriesContentItemInsert = InferInsertModel<
  typeof seriesContentItems
>;
export type ContentCrossReferenceRow = InferSelectModel<
  typeof contentCrossReferences
>;
export type ContentCrossReferenceInsert = InferInsertModel<
  typeof contentCrossReferences
>;

// AI System Row/Insert Types
export type AiConversationRow = InferSelectModel<typeof aiConversations>;
export type AiConversationInsert = InferInsertModel<typeof aiConversations>;
export type AiMessageRow = InferSelectModel<typeof aiMessages>;
export type AiMessageInsert = InferInsertModel<typeof aiMessages>;
export type AiContentJobRow = InferSelectModel<typeof aiContentJobs>;
export type AiContentJobInsert = InferInsertModel<typeof aiContentJobs>;
export type AiCrossReferenceSuggestionRow = InferSelectModel<
  typeof aiCrossReferenceSuggestions
>;
export type AiCrossReferenceSuggestionInsert = InferInsertModel<
  typeof aiCrossReferenceSuggestions
>;
export type TheologicalConceptRow = InferSelectModel<
  typeof theologicalConcepts
>;
export type TheologicalConceptInsert = InferInsertModel<
  typeof theologicalConcepts
>;

// Community & Networking Row/Insert Types
export type CommunityRow = InferSelectModel<typeof communities>;
export type CommunityInsert = InferInsertModel<typeof communities>;
export type CommunityMembershipRow = InferSelectModel<
  typeof communityMemberships
>;
export type CommunityMembershipInsert = InferInsertModel<
  typeof communityMemberships
>;
export type CommunityPostRow = InferSelectModel<typeof communityPosts>;
export type CommunityPostInsert = InferInsertModel<typeof communityPosts>;
export type CommunityPostVoteRow = InferSelectModel<typeof communityPostVotes>;
export type CommunityPostVoteInsert = InferInsertModel<
  typeof communityPostVotes
>;
export type CollaborationRow = InferSelectModel<typeof collaborations>;
export type CollaborationInsert = InferInsertModel<typeof collaborations>;

// Subscriptions & Financial Row/Insert Types
export type SubscriptionPlanRow = InferSelectModel<typeof subscriptionPlans>;
export type SubscriptionPlanInsert = InferInsertModel<typeof subscriptionPlans>;
export type UserSubscriptionRow = InferSelectModel<typeof userSubscriptions>;
export type UserSubscriptionInsert = InferInsertModel<typeof userSubscriptions>;
export type TransactionRow = InferSelectModel<typeof transactions>;
export type TransactionInsert = InferInsertModel<typeof transactions>;
export type PaymentMethodRow = InferSelectModel<typeof paymentMethods>;
export type PaymentMethodInsert = InferInsertModel<typeof paymentMethods>;
export type CouponRow = InferSelectModel<typeof coupons>;
export type CouponInsert = InferInsertModel<typeof coupons>;

// Analytics & Tracking Row/Insert Types
export type UserAnalyticsEventRow = InferSelectModel<
  typeof userAnalyticsEvents
>;
export type UserAnalyticsEventInsert = InferInsertModel<
  typeof userAnalyticsEvents
>;
export type UserContentInteractionRow = InferSelectModel<
  typeof userContentInteractions
>;
export type UserContentInteractionInsert = InferInsertModel<
  typeof userContentInteractions
>;
export type LearningOutcomeRow = InferSelectModel<typeof learningOutcomes>;
export type LearningOutcomeInsert = InferInsertModel<typeof learningOutcomes>;
export type MovementMetricRow = InferSelectModel<typeof movementMetrics>;
export type MovementMetricInsert = InferInsertModel<typeof movementMetrics>;
export type PerformanceReportRow = InferSelectModel<typeof performanceReports>;
export type PerformanceReportInsert = InferInsertModel<
  typeof performanceReports
>;

// System & Administration Row/Insert Types
export type AuditLogRow = InferSelectModel<typeof auditLogs>;
export type AuditLogInsert = InferInsertModel<typeof auditLogs>;
export type FeatureFlagRow = InferSelectModel<typeof featureFlags>;
export type FeatureFlagInsert = InferInsertModel<typeof featureFlags>;
export type UserFeatureFlagRow = InferSelectModel<typeof userFeatureFlags>;
export type UserFeatureFlagInsert = InferInsertModel<typeof userFeatureFlags>;
export type UserConsentRow = InferSelectModel<typeof userConsents>;
export type UserConsentInsert = InferInsertModel<typeof userConsents>;
export type SystemNotificationRow = InferSelectModel<
  typeof systemNotifications
>;
export type SystemNotificationInsert = InferInsertModel<
  typeof systemNotifications
>;
export type UserNotificationStatusRow = InferSelectModel<
  typeof userNotificationStatus
>;
export type UserNotificationStatusInsert = InferInsertModel<
  typeof userNotificationStatus
>;
export type ApiKeyRow = InferSelectModel<typeof apiKeys>;
export type ApiKeyInsert = InferInsertModel<typeof apiKeys>;

// ============================================================================
// TABLE/GRID ROW DTOs
// ============================================================================

// Content table/grid row DTO
export type ContentRowDTO = ContentItem & {
  author: {
    id: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    avatarUrl?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
};

// User profile table/grid row DTO
export type UserProfileRowDTO = UserProfile;

// Assessment table/grid row DTO
export type AssessmentRowDTO = Assessment;

// User assessment table/grid row DTO
export type UserAssessmentRowDTO = UserAssessment & {
  assessment: {
    id: string;
    name: string;
    slug: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    displayName?: string;
  };
};

// Organization table/grid row DTO
export type OrganizationRowDTO = Organization;

// Community table/grid row DTO
export type CommunityRowDTO = Community;

// ============================================================================
// API RESPONSE SCHEMAS
// ============================================================================

// Re-export API response schemas and types
export * from './api-responses';

// ============================================================================
// COMMON TYPE ALIASES
// ============================================================================

// Common ID types
export type UserId = string;
export type OrganizationId = string;
export type ContentId = string;
export type AssessmentId = string;
export type CommunityId = string;
export type SubscriptionId = string;

// Common status types
export type AccountStatus =
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'pending_verification';
export type SubscriptionStatus =
  | 'active'
  | 'cancelled'
  | 'past_due'
  | 'unpaid'
  | 'trialing'
  | 'paused';
export type ContentStatus =
  | 'draft'
  | 'published'
  | 'archived'
  | 'under_review'
  | 'scheduled';

// Common role types
export type MembershipRole = 'owner' | 'admin' | 'member' | 'viewer';
export type MinistryRole =
  | 'senior_pastor'
  | 'associate_pastor'
  | 'church_planter'
  | 'denominational_leader'
  | 'seminary_professor'
  | 'seminary_student'
  | 'ministry_staff'
  | 'missionary'
  | 'marketplace_minister'
  | 'nonprofit_leader'
  | 'consultant'
  | 'academic_researcher'
  | 'emerging_leader'
  | 'other';

// APEST types
export type ApestDimension =
  | 'apostolic'
  | 'prophetic'
  | 'evangelistic'
  | 'shepherding'
  | 'teaching';
export type ApestScores = {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Generic CRUD types
export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInput<T> = Partial<CreateInput<T>>;
export type EntityWithId<T> = T & { id: string };

// Data State Management
export interface DataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
}

export interface PaginatedDataState<T> extends DataState<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Pagination types
export type PaginationParams = {
  page?: number;
  limit?: number;
  offset?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, any>;
};
