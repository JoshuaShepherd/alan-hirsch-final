// Contracts - Centralized type definitions for Alan Hirsch Digital Platform
// This file exports all DTO types (Zod z.infer) and Drizzle row/insert types

// ============================================================================
// DTO TYPES (Zod z.infer)
// ============================================================================

// Shared schemas
export type {
  Attachment,
  CulturalContext,
  OrganizationType,
  MembershipRole as SharedMembershipRole,
  MinistryRole as SharedMinistryRole,
  SubscriptionStatus as SharedSubscriptionStatus,
  Visibility,
} from '../../validations/shared';

// Auth & User Management DTOs
export type {
  NewOrganization,
  NewOrganizationMembership,
  NewUserProfile,
  Organization,
  OrganizationMembership,
  UserProfile,
} from '../../validations/auth';

// Assessment System DTOs
export type {
  Assessment,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentSearch,
  AssessmentWithQuestions,
  CompleteAssessmentInput,
  NewAssessment,
  NewAssessmentQuestion,
  NewAssessmentResponse,
  NewUserAssessment,
  SaveResponsesInput,
  StartAssessmentInput,
  UserAssessment,
  UserAssessmentFilters,
} from '../../validations/assessments';

// Assessment Request DTOs
export type {
  AssessmentSearchRequest,
  CompleteAssessmentRequest,
  CreateAssessmentQuestionRequest,
  CreateAssessmentRequest,
  SaveAssessmentResponsesRequest,
  StartAssessmentRequest,
  UpdateAssessmentQuestionRequest,
  UpdateAssessmentRequest,
  UserAssessmentFiltersRequest,
} from './assessments.request';

// Assessment Response DTOs
export type {
  AssessmentQuestionResponse,
  AssessmentResponse as AssessmentResponseDTO,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
  UserAssessmentResponse,
  UserAssessmentWithDetailsResponse,
} from './assessments.response';

// Scoring DTOs
export type {
  ApestScoreResult,
  ApestScores as ScoringApestScores,
} from './scoring';

// Content Management DTOs
export type {
  ContentCategory,
  ContentCrossReference,
  ContentItem,
  ContentSeries,
  NewContentCategory,
  NewContentCrossReference,
  NewContentItem,
  NewContentSeries,
  NewSeriesContentItem,
  SeriesContentItem,
} from '../../validations/content';

// AI System DTOs
export type {
  AiContentJob,
  AiConversation,
  AiCrossReferenceSuggestion,
  AiMessage,
  NewAiContentJob,
  NewAiConversation,
  NewAiCrossReferenceSuggestion,
  NewAiMessage,
  NewTheologicalConcept,
  TheologicalConcept,
} from '../../validations/ai';

// Community & Networking DTOs
export type {
  Collaboration,
  Community,
  CommunityMembership,
  CommunityPost,
  CommunityPostVote,
  NewCollaboration,
  NewCommunity,
  NewCommunityMembership,
  NewCommunityPost,
  NewCommunityPostVote,
} from '../../validations/community';

// Subscriptions & Financial DTOs
export type {
  Coupon,
  NewCoupon,
  NewPaymentMethod,
  NewSubscriptionPlan,
  NewTransaction,
  NewUserSubscription,
  PaymentMethod,
  SubscriptionPlan,
  Transaction,
  UserSubscription,
} from '../../validations/subscriptions';

// Analytics & Tracking DTOs
export type {
  LearningOutcome,
  MovementMetric,
  NewLearningOutcome,
  NewMovementMetric,
  NewPerformanceReport,
  NewUserAnalyticsEvent,
  NewUserContentInteraction,
  PerformanceReport,
  UserAnalyticsEvent,
  UserContentInteraction,
} from '../../validations/analytics';

// System & Administration DTOs
export type {
  ApiKey,
  AuditLog,
  FeatureFlag,
  NewApiKey,
  NewAuditLog,
  NewFeatureFlag,
  NewSystemNotification,
  NewUserConsent,
  NewUserFeatureFlag,
  NewUserNotificationStatus,
  SystemNotification,
  UserConsent,
  UserFeatureFlag,
  UserNotificationStatus,
} from '../../validations/system';

// ============================================================================
// SCHEMA EXPORTS (Zod Schemas)
// ============================================================================

// Shared schemas
export {
  attachmentSchema,
  culturalContextSchema,
  membershipRoleSchema,
  ministryRoleSchema,
  organizationTypeSchema,
  subscriptionStatusSchema,
  visibilitySchema,
} from '../../validations/shared';

// Auth & User Management Schemas
export {
  newOrganizationMembershipSchema,
  newOrganizationSchema,
  newUserProfileSchema,
  organizationMembershipSchema,
  organizationSchema,
  userProfileSchema,
} from '../../validations/auth';

// Assessment System Schemas
export {
  assessmentQuestionSchema,
  assessmentSchema,
  assessmentSearchSchema,
  assessmentWithQuestionsSchema,
  completeAssessmentInputSchema,
  newAssessmentQuestionSchema,
  newAssessmentResponseSchema,
  newAssessmentSchema,
  newUserAssessmentSchema,
  saveResponsesInputSchema,
  startAssessmentInputSchema,
  userAssessmentFiltersSchema,
  userAssessmentSchema,
} from '../../validations/assessments';

// Assessment Request Schemas
export {
  assessmentSearchRequestSchema,
  completeAssessmentRequestSchema,
  createAssessmentQuestionRequestSchema,
  createAssessmentRequestSchema,
  saveAssessmentResponsesRequestSchema,
  startAssessmentRequestSchema,
  updateAssessmentQuestionRequestSchema,
  updateAssessmentRequestSchema,
  userAssessmentFiltersRequestSchema,
} from './assessments.request';

// Assessment Response Schemas
export {
  assessmentQuestionResponseSchema,
  assessmentResponseSchema as assessmentResponseDTOSchema,
  assessmentResponseResponseSchema,
  assessmentWithQuestionsResponseSchema,
  paginatedAssessmentListResponseSchema,
  paginatedUserAssessmentListResponseSchema,
  userAssessmentResponseSchema,
  userAssessmentWithDetailsResponseSchema,
} from './assessments.response';

// Content Management Schemas
export {
  contentCategorySchema,
  contentCrossReferenceSchema,
  contentItemSchema,
  contentSeriesSchema,
  newContentCategorySchema,
  newContentCrossReferenceSchema,
  newContentItemSchema,
  newContentSeriesSchema,
  newSeriesContentItemSchema,
  seriesContentItemSchema,
} from '../../validations/content';

// Content Request Schemas
export {
  contentSearchRequestSchema,
  createContentCategoryRequestSchema,
  createContentItemRequestSchema,
  createContentSeriesRequestSchema,
  updateContentCategoryRequestSchema,
  updateContentItemRequestSchema,
  updateContentSeriesRequestSchema,
} from './content.request';

// Content Response Schemas
export {
  contentCategoryResponseSchema,
  contentItemResponseSchema,
  contentSeriesResponseSchema,
  paginatedContentCategoryListResponseSchema,
  paginatedContentItemListResponseSchema,
  paginatedContentSeriesListResponseSchema,
} from './content.response';

// Content Response Types
export type {
  ContentCategoryResponse,
  ContentItemResponse,
  ContentSeriesResponse,
  PaginatedContentCategoryListResponse,
  PaginatedContentItemListResponse,
  PaginatedContentSeriesListResponse,
} from './content.response';

// AI System Schemas
export {
  aiContentJobSchema,
  aiConversationSchema,
  aiCrossReferenceSuggestionSchema,
  aiMessageSchema,
  newAiContentJobSchema,
  newAiConversationSchema,
  newAiCrossReferenceSuggestionSchema,
  newAiMessageSchema,
  newTheologicalConceptSchema,
  theologicalConceptSchema,
} from '../../validations/ai';

// AI Response Schemas
export {
  aiContentJobResponseSchema,
  aiConversationResponseSchema,
  aiCrossReferenceSuggestionResponseSchema,
  aiMessageResponseSchema,
  paginatedAiContentJobListResponseSchema,
  paginatedAiConversationListResponseSchema,
  paginatedAiCrossReferenceSuggestionListResponseSchema,
  paginatedAiMessageListResponseSchema,
  paginatedTheologicalConceptListResponseSchema,
  theologicalConceptResponseSchema,
} from './ai.response';

// AI Response Types
export type {
  AiContentJobResponse,
  AiConversationResponse,
  AiCrossReferenceSuggestionResponse,
  AiMessageResponse,
  PaginatedAiContentJobListResponse,
  PaginatedAiConversationListResponse,
  PaginatedAiCrossReferenceSuggestionListResponse,
  PaginatedAiMessageListResponse,
  PaginatedTheologicalConceptListResponse,
  TheologicalConceptResponse,
} from './ai.response';

// Community System Schemas
export {
  collaborationSchema,
  communityMembershipSchema,
  communityPostSchema,
  communityPostVoteSchema,
  communitySchema,
  newCollaborationSchema,
  newCommunityMembershipSchema,
  newCommunityPostSchema,
  newCommunityPostVoteSchema,
  newCommunitySchema,
} from '../../validations/community';

// Subscription & Payment Schemas
export {
  newPaymentMethodSchema,
  newSubscriptionPlanSchema,
  newTransactionSchema,
  newUserSubscriptionSchema,
  paymentMethodSchema,
  subscriptionPlanSchema,
  transactionSchema,
  userSubscriptionSchema,
} from '../../validations/subscriptions';

// Analytics Schemas
export {
  newUserAnalyticsEventSchema,
  newUserContentInteractionSchema,
  userAnalyticsEventSchema,
  userContentInteractionSchema,
} from '../../validations/analytics';

// System & Administration Schemas
export {
  apiKeySchema,
  auditLogSchema,
  featureFlagSchema,
  newApiKeySchema,
  newAuditLogSchema,
  newFeatureFlagSchema,
  newSystemNotificationSchema,
  newUserConsentSchema,
  newUserFeatureFlagSchema,
  newUserNotificationStatusSchema,
  systemNotificationSchema,
  userConsentSchema,
  userFeatureFlagSchema,
  userNotificationStatusSchema,
} from '../../validations/system';

// ============================================================================
// DRIZZLE ROW/INSERT TYPES
// ============================================================================

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  aiContentJobs,
  aiConversations,
  aiCrossReferenceSuggestions,
  aiMessages,
  apiKeys,
  assessmentQuestions,
  assessmentResponses,
  assessments,
  auditLogs,
  collaborations,
  communities,
  communityMemberships,
  communityPostVotes,
  communityPosts,
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
  subscriptionPlans,
  systemNotifications,
  theologicalConcepts,
  transactions,
  userAnalyticsEvents,
  userAssessments,
  userConsents,
  userContentInteractions,
  userFeatureFlags,
  userNotificationStatus,
  userProfiles,
  userSubscriptions,
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
// API RESPONSE SCHEMAS
// ============================================================================

// Re-export API response schemas and types
export * from './api-responses';

// Ministry Platform DTOs
export type {
  MinistryAssessment,
  MinistryCommunity,
  MinistryContentItem,
  MinistryMetrics,
  MinistryOrganization,
  MinistryUserProfile,
  OrganizationContext,
} from '../../validations/ministry-platform';

// Ministry Platform Request DTOs
export type {
  CompleteMinistryAssessmentRequest,
  CreateMinistryCollaborationRequest,
  CreateMinistryCommunityRequest,
  CreateMinistryContentRequest,
  CreateMinistryOrganizationRequest,
  CreateMinistrySubscriptionRequest,
  InviteOrganizationMemberRequest,
  JoinMinistryCommunityRequest,
  MinistryAnalyticsRequest,
  MinistryPlatformSearchRequest,
  StartMinistryAssessmentRequest,
  UpdateMinistryCollaborationRequest,
  UpdateMinistryCommunityRequest,
  UpdateMinistryContentRequest,
  UpdateMinistryOrganizationRequest,
  UpdateMinistrySubscriptionRequest,
  UpdateMinistryUserProfileRequest,
} from './ministry-platform.request';

// Ministry Platform Response DTOs
export type {
  AggregatedMinistryMetricsResponse,
  AuthMinistryCombinedResponse,
  MinistryAssessmentListResponse,
  MinistryAssessmentResponse,
  MinistryCommunityListResponse,
  MinistryCommunityResponse,
  MinistryContentItemListResponse,
  MinistryContentItemResponse,
  MinistryDashboardResponse,
  MinistryMetricsResponse,
  MinistryOrganizationListResponse,
  MinistryOrganizationMembershipResponse,
  MinistryOrganizationResponse,
  MinistryPaginatedResponse,
  MinistryPlatformResponse,
  MinistrySubscriptionPlanResponse,
  MinistryUserAssessmentResponse,
  MinistryUserProfileListResponse,
  MinistryUserProfileResponse,
  OrganizationScopedResponse,
  PlantFilteredResponse,
  RoleBasedVisibilityResponse,
} from './ministry-platform.response';

// Ministry Platform Request Schemas
export {
  completeMinistryAssessmentRequestSchema,
  createMinistryCollaborationRequestSchema,
  createMinistryCommunityRequestSchema,
  createMinistryContentRequestSchema,
  createMinistryOrganizationRequestSchema,
  createMinistrySubscriptionRequestSchema,
  inviteOrganizationMemberRequestSchema,
  joinMinistryCommunityRequestSchema,
  ministryAnalyticsRequestSchema,
  ministryPlatformSearchRequestSchema,
  startMinistryAssessmentRequestSchema,
  updateMinistryCollaborationRequestSchema,
  updateMinistryCommunityRequestSchema,
  updateMinistryContentRequestSchema,
  updateMinistryOrganizationRequestSchema,
  updateMinistrySubscriptionRequestSchema,
  updateMinistryUserProfileRequestSchema,
} from './ministry-platform.request';

// Ministry Platform Response Schemas
export {
  aggregatedMinistryMetricsResponseSchema,
  authMinistryCombinedResponseSchema,
  ministryAssessmentResponseSchema,
  ministryAssessmentWithQuestionsResponseSchema,
  ministryCommunityResponseSchema,
  ministryContentItemResponseSchema,
  ministryDashboardResponseSchema,
  ministryMetricsResponseSchema,
  ministryOrganizationListResponseSchema,
  ministryOrganizationMembershipResponseSchema,
  ministryOrganizationResponseSchema,
  ministryPaginatedResponseSchema,
  ministryPlatformErrorResponseSchema,
  ministryPlatformResponseSchema,
  ministrySubscriptionPlanResponseSchema,
  ministryUserAssessmentResponseSchema,
  ministryUserProfileListResponseSchema,
  ministryUserProfileResponseSchema,
  organizationScopedResponseSchema,
  plantFilteredResponseSchema,
  roleBasedVisibilityResponseSchema,
} from './ministry-platform.response';

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

// ============================================================================
// TABLE/GRID ROW DTOs
// ============================================================================

// Content table/grid row DTO
export type ContentRowDTO = import('../../validations/content').ContentItem & {
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
export type UserProfileRowDTO = import('../../validations/auth').UserProfile;

// Assessment table/grid row DTO
export type AssessmentRowDTO =
  import('../../validations/assessments').Assessment;

// User assessment table/grid row DTO
export type UserAssessmentRowDTO =
  import('../../validations/assessments').UserAssessment & {
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
export type OrganizationRowDTO = import('../../validations/auth').Organization;

// Community table/grid row DTO
export type CommunityRowDTO = import('../../validations/community').Community;
