/**
 * @fileoverview BARREL-GUARD: This file is the source-of-truth for all contract exports.
 * Other files must import from here to ensure consistency.
 *
 * This file provides:
 * - Consistent entity schema exports: <Entity>CreateSchema, <Entity>UpdateSchema, <Entity>ResponseSchema, <Entity>ListResponseSchema
 * - DTO aliases for service layer compatibility: <Entity>CreateDTO, <Entity>UpdateDTO, <Entity>ResponseDTO, <Entity>ListResponseDTO
 * - Shared envelope schemas: PaginatedResponseSchema, ApiErrorSchema, OkSchema, ResultSchema
 * - All existing contract exports for backward compatibility
 */

// ============================================================================
// SHARED ENVELOPE SCHEMAS
// ============================================================================

import { z } from 'zod';

// Paginated Response Schema
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    data: z.array(itemSchema),
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
  });

// API Error Schema
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.any().optional(),
  success: z.literal(false),
});

// OK Response Schema
export const OkSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});

// Result Schema (Success/Error union)
export const ResultSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([
    z.object({
      success: z.literal(true),
      data: dataSchema,
      message: z.string().optional(),
    }),
    ApiErrorSchema,
  ]);

// ============================================================================
// ENTITY SCHEMA EXPORTS (Consistent naming)
// ============================================================================

// Assessment Schemas
export {
  AssessmentCreateSchema,
  AssessmentListResponseSchema,
  AssessmentResponseSchema,
  AssessmentUpdateSchema,
} from './assessment.contract';

// Assessment Question Schemas
export {
  AssessmentQuestionCreateSchema,
  AssessmentQuestionListResponseSchema,
  AssessmentQuestionResponseSchema,
  AssessmentQuestionUpdateSchema,
} from './assessment-question.contract';

// Assessment Response Schemas
export {
  AssessmentResponseCreateSchema,
  AssessmentResponseListResponseSchema,
  AssessmentResponseResponseSchema,
  AssessmentResponseUpdateSchema,
} from './assessment-response.contract';

// User Profile Schemas
export {
  UserProfileCreateSchema,
  UserProfileListResponseSchema,
  UserProfileResponseSchema,
  UserProfileUpdateSchema,
} from './user-profile.contract';

// Organization Schemas
export {
  OrganizationCreateSchema,
  OrganizationListResponseSchema,
  OrganizationResponseSchema,
  OrganizationUpdateSchema,
} from './organization.contract';

// Organization Membership Schemas
export {
  OrganizationMembershipCreateSchema,
  OrganizationMembershipListResponseSchema,
  OrganizationMembershipResponseSchema,
  OrganizationMembershipUpdateSchema,
} from './organization-membership.contract';

// User Assessment Schemas
export {
  UserAssessmentCreateSchema,
  UserAssessmentListResponseSchema,
  UserAssessmentResponseSchema,
  UserAssessmentUpdateSchema,
} from './user-assessment.contract';

// Content Item Schemas
export {
  ContentItemCreateSchema,
  ContentItemListResponseSchema,
  ContentItemResponseSchema,
  ContentItemUpdateSchema,
} from './content-item.contract';

// Content Series Schemas
export {
  ContentSeriesCreateSchema,
  ContentSeriesListResponseSchema,
  ContentSeriesResponseSchema,
  ContentSeriesUpdateSchema,
} from './content-series.contract';

// Content Category Schemas
export {
  ContentCategoryCreateSchema,
  ContentCategoryListResponseSchema,
  ContentCategoryResponseSchema,
  ContentCategoryUpdateSchema,
} from './content-category.contract';

// Content Cross Reference Schemas
export {
  ContentCrossReferenceCreateSchema,
  ContentCrossReferenceListResponseSchema,
  ContentCrossReferenceResponseSchema,
  ContentCrossReferenceUpdateSchema,
} from './content-cross-reference.contract';

// Series Content Item Schemas
export {
  SeriesContentItemCreateSchema,
  SeriesContentItemListResponseSchema,
  SeriesContentItemResponseSchema,
  SeriesContentItemUpdateSchema,
} from './series-content-item.contract';

// Community Schemas
export {
  CommunityCreateSchema,
  CommunityListResponseSchema,
  CommunityResponseSchema,
  CommunityUpdateSchema,
} from './community.contract';

// Community Membership Schemas
export {
  CommunityMembershipCreateSchema,
  CommunityMembershipListResponseSchema,
  CommunityMembershipResponseSchema,
  CommunityMembershipUpdateSchema,
} from './community-membership.contract';

// Community Post Schemas
export {
  CommunityPostCreateSchema,
  CommunityPostListResponseSchema,
  CommunityPostResponseSchema,
  CommunityPostUpdateSchema,
} from './community-post.contract';

// Community Post Vote Schemas
export {
  CommunityPostVoteCreateSchema,
  CommunityPostVoteListResponseSchema,
  CommunityPostVoteResponseSchema,
  CommunityPostVoteUpdateSchema,
} from './community-post-vote.contract';

// Collaboration Schemas
export {
  CollaborationCreateSchema,
  CollaborationListResponseSchema,
  CollaborationResponseSchema,
  CollaborationUpdateSchema,
} from './collaboration.contract';

// Subscription Plan Schemas
export {
  SubscriptionPlanCreateSchema,
  SubscriptionPlanListResponseSchema,
  SubscriptionPlanResponseSchema,
  SubscriptionPlanUpdateSchema,
} from './subscription-plan.contract';

// User Subscription Schemas
export {
  UserSubscriptionCreateSchema,
  UserSubscriptionListResponseSchema,
  UserSubscriptionResponseSchema,
  UserSubscriptionUpdateSchema,
} from './user-subscription.contract';

// Transaction Schemas
export {
  TransactionCreateSchema,
  TransactionListResponseSchema,
  TransactionResponseSchema,
  TransactionUpdateSchema,
} from './transaction.contract';

// Payment Method Schemas
export {
  PaymentMethodCreateSchema,
  PaymentMethodListResponseSchema,
  PaymentMethodResponseSchema,
  PaymentMethodUpdateSchema,
} from './payment-method.contract';

// Coupon Schemas
export {
  CouponCreateSchema,
  CouponListResponseSchema,
  CouponResponseSchema,
  CouponUpdateSchema,
} from './coupon.contract';

// AI Conversation Schemas
export {
  AiConversationCreateSchema,
  AiConversationListResponseSchema,
  AiConversationResponseSchema,
  AiConversationUpdateSchema,
} from './ai-conversation.contract';

// AI Message Schemas
export {
  AiMessageCreateSchema,
  AiMessageListResponseSchema,
  AiMessageResponseSchema,
  AiMessageUpdateSchema,
} from './ai-message.contract';

// AI Content Job Schemas
export {
  AiContentJobCreateSchema,
  AiContentJobListResponseSchema,
  AiContentJobResponseSchema,
  AiContentJobUpdateSchema,
} from './ai-content-job.contract';

// AI Cross Reference Suggestion Schemas
export {
  AiCrossReferenceSuggestionCreateSchema,
  AiCrossReferenceSuggestionListResponseSchema,
  AiCrossReferenceSuggestionResponseSchema,
  AiCrossReferenceSuggestionUpdateSchema,
} from './ai-cross-reference-suggestion.contract';

// Theological Concept Schemas
export {
  TheologicalConceptCreateSchema,
  TheologicalConceptListResponseSchema,
  TheologicalConceptResponseSchema,
  TheologicalConceptUpdateSchema,
} from './theological-concept.contract';

// User Analytics Event Schemas
export {
  UserAnalyticsEventCreateSchema,
  UserAnalyticsEventListResponseSchema,
  UserAnalyticsEventResponseSchema,
  UserAnalyticsEventUpdateSchema,
} from './user-analytics-event.contract';

// User Content Interaction Schemas
export {
  UserContentInteractionCreateSchema,
  UserContentInteractionListResponseSchema,
  UserContentInteractionResponseSchema,
  UserContentInteractionUpdateSchema,
} from './user-content-interaction.contract';

// Learning Outcome Schemas
export {
  LearningOutcomeCreateSchema,
  LearningOutcomeListResponseSchema,
  LearningOutcomeResponseSchema,
  LearningOutcomeUpdateSchema,
} from './learning-outcome.contract';

// Movement Metric Schemas
export {
  MovementMetricCreateSchema,
  MovementMetricListResponseSchema,
  MovementMetricResponseSchema,
  MovementMetricUpdateSchema,
} from './movement-metric.contract';

// Performance Report Schemas
export {
  PerformanceReportCreateSchema,
  PerformanceReportListResponseSchema,
  PerformanceReportResponseSchema,
  PerformanceReportUpdateSchema,
} from './performance-report.contract';

// Audit Log Schemas
export {
  AuditLogCreateSchema,
  AuditLogListResponseSchema,
  AuditLogResponseSchema,
  AuditLogUpdateSchema,
} from './audit-log.contract';

// Feature Flag Schemas
export {
  FeatureFlagCreateSchema,
  FeatureFlagListResponseSchema,
  FeatureFlagResponseSchema,
  FeatureFlagUpdateSchema,
} from './feature-flag.contract';

// User Feature Flag Schemas
export {
  UserFeatureFlagCreateSchema,
  UserFeatureFlagListResponseSchema,
  UserFeatureFlagResponseSchema,
  UserFeatureFlagUpdateSchema,
} from './user-feature-flag.contract';

// User Consent Schemas
export {
  UserConsentCreateSchema,
  UserConsentListResponseSchema,
  UserConsentResponseSchema,
  UserConsentUpdateSchema,
} from './user-consent.contract';

// System Notification Schemas
export {
  SystemNotificationCreateSchema,
  SystemNotificationListResponseSchema,
  SystemNotificationResponseSchema,
  SystemNotificationUpdateSchema,
} from './system-notification.contract';

// User Notification Status Schemas
export {
  UserNotificationStatusCreateSchema,
  UserNotificationStatusListResponseSchema,
  UserNotificationStatusResponseSchema,
  UserNotificationStatusUpdateSchema,
} from './user-notification-status.contract';

// API Key Schemas
export {
  ApiKeyCreateSchema,
  ApiKeyListResponseSchema,
  ApiKeyResponseSchema,
  ApiKeyUpdateSchema,
} from './api-key.contract';

// ============================================================================
// DTO ALIASES (Service layer compatibility)
// ============================================================================

// Assessment DTOs
export const AssessmentCreateDTO = AssessmentCreateSchema;
export const AssessmentUpdateDTO = AssessmentUpdateSchema;
export const AssessmentResponseDTO = AssessmentResponseSchema;
export const AssessmentListResponseDTO = AssessmentListResponseSchema;

// Assessment Question DTOs
export const AssessmentQuestionCreateDTO = AssessmentQuestionCreateSchema;
export const AssessmentQuestionUpdateDTO = AssessmentQuestionUpdateSchema;
export const AssessmentQuestionResponseDTO = AssessmentQuestionResponseSchema;
export const AssessmentQuestionListResponseDTO =
  AssessmentQuestionListResponseSchema;

// Assessment Response DTOs
export const AssessmentResponseCreateDTO = AssessmentResponseCreateSchema;
export const AssessmentResponseUpdateDTO = AssessmentResponseUpdateSchema;
export const AssessmentResponseResponseDTO = AssessmentResponseResponseSchema;
export const AssessmentResponseListResponseDTO =
  AssessmentResponseListResponseSchema;

// User Profile DTOs
export const UserProfileCreateDTO = UserProfileCreateSchema;
export const UserProfileUpdateDTO = UserProfileUpdateSchema;
export const UserProfileResponseDTO = UserProfileResponseSchema;
export const UserProfileListResponseDTO = UserProfileListResponseSchema;

// Organization DTOs
export const OrganizationCreateDTO = OrganizationCreateSchema;
export const OrganizationUpdateDTO = OrganizationUpdateSchema;
export const OrganizationResponseDTO = OrganizationResponseSchema;
export const OrganizationListResponseDTO = OrganizationListResponseSchema;

// Organization Membership DTOs
export const OrganizationMembershipCreateDTO =
  OrganizationMembershipCreateSchema;
export const OrganizationMembershipUpdateDTO =
  OrganizationMembershipUpdateSchema;
export const OrganizationMembershipResponseDTO =
  OrganizationMembershipResponseSchema;
export const OrganizationMembershipListResponseDTO =
  OrganizationMembershipListResponseSchema;

// User Assessment DTOs
export const UserAssessmentCreateDTO = UserAssessmentCreateSchema;
export const UserAssessmentUpdateDTO = UserAssessmentUpdateSchema;
export const UserAssessmentResponseDTO = UserAssessmentResponseSchema;
export const UserAssessmentListResponseDTO = UserAssessmentListResponseSchema;

// Content Item DTOs
export const ContentItemCreateDTO = ContentItemCreateSchema;
export const ContentItemUpdateDTO = ContentItemUpdateSchema;
export const ContentItemResponseDTO = ContentItemResponseSchema;
export const ContentItemListResponseDTO = ContentItemListResponseSchema;

// Content Series DTOs
export const ContentSeriesCreateDTO = ContentSeriesCreateSchema;
export const ContentSeriesUpdateDTO = ContentSeriesUpdateSchema;
export const ContentSeriesResponseDTO = ContentSeriesResponseSchema;
export const ContentSeriesListResponseDTO = ContentSeriesListResponseSchema;

// Content Category DTOs
export const ContentCategoryCreateDTO = ContentCategoryCreateSchema;
export const ContentCategoryUpdateDTO = ContentCategoryUpdateSchema;
export const ContentCategoryResponseDTO = ContentCategoryResponseSchema;
export const ContentCategoryListResponseDTO = ContentCategoryListResponseSchema;

// Content Cross Reference DTOs
export const ContentCrossReferenceCreateDTO = ContentCrossReferenceCreateSchema;
export const ContentCrossReferenceUpdateDTO = ContentCrossReferenceUpdateSchema;
export const ContentCrossReferenceResponseDTO =
  ContentCrossReferenceResponseSchema;
export const ContentCrossReferenceListResponseDTO =
  ContentCrossReferenceListResponseSchema;

// Series Content Item DTOs
export const SeriesContentItemCreateDTO = SeriesContentItemCreateSchema;
export const SeriesContentItemUpdateDTO = SeriesContentItemUpdateSchema;
export const SeriesContentItemResponseDTO = SeriesContentItemResponseSchema;
export const SeriesContentItemListResponseDTO =
  SeriesContentItemListResponseSchema;

// Community DTOs
export const CommunityCreateDTO = CommunityCreateSchema;
export const CommunityUpdateDTO = CommunityUpdateSchema;
export const CommunityResponseDTO = CommunityResponseSchema;
export const CommunityListResponseDTO = CommunityListResponseSchema;

// Community Membership DTOs
export const CommunityMembershipCreateDTO = CommunityMembershipCreateSchema;
export const CommunityMembershipUpdateDTO = CommunityMembershipUpdateSchema;
export const CommunityMembershipResponseDTO = CommunityMembershipResponseSchema;
export const CommunityMembershipListResponseDTO =
  CommunityMembershipListResponseSchema;

// Community Post DTOs
export const CommunityPostCreateDTO = CommunityPostCreateSchema;
export const CommunityPostUpdateDTO = CommunityPostUpdateSchema;
export const CommunityPostResponseDTO = CommunityPostResponseSchema;
export const CommunityPostListResponseDTO = CommunityPostListResponseSchema;

// Community Post Vote DTOs
export const CommunityPostVoteCreateDTO = CommunityPostVoteCreateSchema;
export const CommunityPostVoteUpdateDTO = CommunityPostVoteUpdateSchema;
export const CommunityPostVoteResponseDTO = CommunityPostVoteResponseSchema;
export const CommunityPostVoteListResponseDTO =
  CommunityPostVoteListResponseSchema;

// Collaboration DTOs
export const CollaborationCreateDTO = CollaborationCreateSchema;
export const CollaborationUpdateDTO = CollaborationUpdateSchema;
export const CollaborationResponseDTO = CollaborationResponseSchema;
export const CollaborationListResponseDTO = CollaborationListResponseSchema;

// Subscription Plan DTOs
export const SubscriptionPlanCreateDTO = SubscriptionPlanCreateSchema;
export const SubscriptionPlanUpdateDTO = SubscriptionPlanUpdateSchema;
export const SubscriptionPlanResponseDTO = SubscriptionPlanResponseSchema;
export const SubscriptionPlanListResponseDTO =
  SubscriptionPlanListResponseSchema;

// User Subscription DTOs
export const UserSubscriptionCreateDTO = UserSubscriptionCreateSchema;
export const UserSubscriptionUpdateDTO = UserSubscriptionUpdateSchema;
export const UserSubscriptionResponseDTO = UserSubscriptionResponseSchema;
export const UserSubscriptionListResponseDTO =
  UserSubscriptionListResponseSchema;

// Transaction DTOs
export const TransactionCreateDTO = TransactionCreateSchema;
export const TransactionUpdateDTO = TransactionUpdateSchema;
export const TransactionResponseDTO = TransactionResponseSchema;
export const TransactionListResponseDTO = TransactionListResponseSchema;

// Payment Method DTOs
export const PaymentMethodCreateDTO = PaymentMethodCreateSchema;
export const PaymentMethodUpdateDTO = PaymentMethodUpdateSchema;
export const PaymentMethodResponseDTO = PaymentMethodResponseSchema;
export const PaymentMethodListResponseDTO = PaymentMethodListResponseSchema;

// Coupon DTOs
export const CouponCreateDTO = CouponCreateSchema;
export const CouponUpdateDTO = CouponUpdateSchema;
export const CouponResponseDTO = CouponResponseSchema;
export const CouponListResponseDTO = CouponListResponseSchema;

// AI Conversation DTOs
export const AiConversationCreateDTO = AiConversationCreateSchema;
export const AiConversationUpdateDTO = AiConversationUpdateSchema;
export const AiConversationResponseDTO = AiConversationResponseSchema;
export const AiConversationListResponseDTO = AiConversationListResponseSchema;

// AI Message DTOs
export const AiMessageCreateDTO = AiMessageCreateSchema;
export const AiMessageUpdateDTO = AiMessageUpdateSchema;
export const AiMessageResponseDTO = AiMessageResponseSchema;
export const AiMessageListResponseDTO = AiMessageListResponseSchema;

// AI Content Job DTOs
export const AiContentJobCreateDTO = AiContentJobCreateSchema;
export const AiContentJobUpdateDTO = AiContentJobUpdateSchema;
export const AiContentJobResponseDTO = AiContentJobResponseSchema;
export const AiContentJobListResponseDTO = AiContentJobListResponseSchema;

// AI Cross Reference Suggestion DTOs
export const AiCrossReferenceSuggestionCreateDTO =
  AiCrossReferenceSuggestionCreateSchema;
export const AiCrossReferenceSuggestionUpdateDTO =
  AiCrossReferenceSuggestionUpdateSchema;
export const AiCrossReferenceSuggestionResponseDTO =
  AiCrossReferenceSuggestionResponseSchema;
export const AiCrossReferenceSuggestionListResponseDTO =
  AiCrossReferenceSuggestionListResponseSchema;

// Theological Concept DTOs
export const TheologicalConceptCreateDTO = TheologicalConceptCreateSchema;
export const TheologicalConceptUpdateDTO = TheologicalConceptUpdateSchema;
export const TheologicalConceptResponseDTO = TheologicalConceptResponseSchema;
export const TheologicalConceptListResponseDTO =
  TheologicalConceptListResponseSchema;

// User Analytics Event DTOs
export const UserAnalyticsEventCreateDTO = UserAnalyticsEventCreateSchema;
export const UserAnalyticsEventUpdateDTO = UserAnalyticsEventUpdateSchema;
export const UserAnalyticsEventResponseDTO = UserAnalyticsEventResponseSchema;
export const UserAnalyticsEventListResponseDTO =
  UserAnalyticsEventListResponseSchema;

// User Content Interaction DTOs
export const UserContentInteractionCreateDTO =
  UserContentInteractionCreateSchema;
export const UserContentInteractionUpdateDTO =
  UserContentInteractionUpdateSchema;
export const UserContentInteractionResponseDTO =
  UserContentInteractionResponseSchema;
export const UserContentInteractionListResponseDTO =
  UserContentInteractionListResponseSchema;

// Learning Outcome DTOs
export const LearningOutcomeCreateDTO = LearningOutcomeCreateSchema;
export const LearningOutcomeUpdateDTO = LearningOutcomeUpdateSchema;
export const LearningOutcomeResponseDTO = LearningOutcomeResponseSchema;
export const LearningOutcomeListResponseDTO = LearningOutcomeListResponseSchema;

// Movement Metric DTOs
export const MovementMetricCreateDTO = MovementMetricCreateSchema;
export const MovementMetricUpdateDTO = MovementMetricUpdateSchema;
export const MovementMetricResponseDTO = MovementMetricResponseSchema;
export const MovementMetricListResponseDTO = MovementMetricListResponseSchema;

// Performance Report DTOs
export const PerformanceReportCreateDTO = PerformanceReportCreateSchema;
export const PerformanceReportUpdateDTO = PerformanceReportUpdateSchema;
export const PerformanceReportResponseDTO = PerformanceReportResponseSchema;
export const PerformanceReportListResponseDTO =
  PerformanceReportListResponseSchema;

// Audit Log DTOs
export const AuditLogCreateDTO = AuditLogCreateSchema;
export const AuditLogUpdateDTO = AuditLogUpdateSchema;
export const AuditLogResponseDTO = AuditLogResponseSchema;
export const AuditLogListResponseDTO = AuditLogListResponseSchema;

// Feature Flag DTOs
export const FeatureFlagCreateDTO = FeatureFlagCreateSchema;
export const FeatureFlagUpdateDTO = FeatureFlagUpdateSchema;
export const FeatureFlagResponseDTO = FeatureFlagResponseSchema;
export const FeatureFlagListResponseDTO = FeatureFlagListResponseSchema;

// User Feature Flag DTOs
export const UserFeatureFlagCreateDTO = UserFeatureFlagCreateSchema;
export const UserFeatureFlagUpdateDTO = UserFeatureFlagUpdateSchema;
export const UserFeatureFlagResponseDTO = UserFeatureFlagResponseSchema;
export const UserFeatureFlagListResponseDTO = UserFeatureFlagListResponseSchema;

// User Consent DTOs
export const UserConsentCreateDTO = UserConsentCreateSchema;
export const UserConsentUpdateDTO = UserConsentUpdateSchema;
export const UserConsentResponseDTO = UserConsentResponseSchema;
export const UserConsentListResponseDTO = UserConsentListResponseSchema;

// System Notification DTOs
export const SystemNotificationCreateDTO = SystemNotificationCreateSchema;
export const SystemNotificationUpdateDTO = SystemNotificationUpdateSchema;
export const SystemNotificationResponseDTO = SystemNotificationResponseSchema;
export const SystemNotificationListResponseDTO =
  SystemNotificationListResponseSchema;

// User Notification Status DTOs
export const UserNotificationStatusCreateDTO =
  UserNotificationStatusCreateSchema;
export const UserNotificationStatusUpdateDTO =
  UserNotificationStatusUpdateSchema;
export const UserNotificationStatusResponseDTO =
  UserNotificationStatusResponseSchema;
export const UserNotificationStatusListResponseDTO =
  UserNotificationStatusListResponseSchema;

// API Key DTOs
export const ApiKeyCreateDTO = ApiKeyCreateSchema;
export const ApiKeyUpdateDTO = ApiKeyUpdateSchema;
export const ApiKeyResponseDTO = ApiKeyResponseSchema;
export const ApiKeyListResponseDTO = ApiKeyListResponseSchema;

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// Re-export all contract schemas and types
export * from './ai-content-job.contract';
export * from './ai-conversation.contract';
export * from './ai-cross-reference-suggestion.contract';
export * from './ai-message.contract';
export * from './api-key.contract';
export * from './assessment-question.contract';
export * from './assessment-response.contract';
export * from './assessment.contract';
export * from './audit-log.contract';
export * from './collaboration.contract';
export * from './community-membership.contract';
export * from './community-post-vote.contract';
export * from './community-post.contract';
export * from './community.contract';
export * from './content-category.contract';
export * from './content-cross-reference.contract';
export * from './content-item.contract';
export * from './content-series.contract';
export * from './coupon.contract';
export * from './feature-flag.contract';
export * from './learning-outcome.contract';
export * from './movement-metric.contract';
export * from './organization-membership.contract';
export * from './organization.contract';
export * from './payment-method.contract';
export * from './performance-report.contract';
export * from './series-content-item.contract';
export * from './subscription-plan.contract';
export * from './system-notification.contract';
export * from './theological-concept.contract';
export * from './transaction.contract';
export * from './user-analytics-event.contract';
export * from './user-assessment.contract';
export * from './user-consent.contract';
export * from './user-content-interaction.contract';
export * from './user-feature-flag.contract';
export * from './user-notification-status.contract';
export * from './user-profile.contract';
export * from './user-subscription.contract';

// Re-export API contracts
export * from './api';

// Re-export assessment request schemas
export * from './assessments.request';

// Re-export auth API schemas specifically
export {
  loginRequestSchema,
  loginResponseSchema,
  registerRequestSchema,
  registerResponseSchema,
} from './api/auth';

// Re-export business schemas
export * from './business';

// Re-export ministry platform schemas
export * from './ministry-platform.request';
export * from './ministry-platform.response';

// Re-export validation schemas
export * from './validation';

// Re-export schemas
export * from './schemas';

// Re-export DTO aliases
export * from './dto-aliases';

// Re-export compatibility utilities
export * from './compat';

// Re-export shared schemas
export * from './api-responses';
export * from './scoring';

// ============================================================================
// LEGACY TYPE ALIASES (for backward compatibility)
// ============================================================================

// Assessment Types
export type AssessmentEntity = z.infer<typeof AssessmentResponseSchema>;
export type CreateAssessment = z.infer<typeof AssessmentCreateSchema>;
export type UpdateAssessment = z.infer<typeof AssessmentUpdateSchema>;
export type AssessmentQuestionEntity = z.infer<
  typeof AssessmentQuestionResponseSchema
>;
export type CreateAssessmentQuestion = z.infer<
  typeof AssessmentQuestionCreateSchema
>;
export type CreateAssessmentResponse = z.infer<
  typeof AssessmentResponseCreateSchema
>;
export type UpdateAssessmentQuestion = z.infer<
  typeof AssessmentQuestionUpdateSchema
>;
export type UpdateAssessmentResponse = z.infer<
  typeof AssessmentResponseUpdateSchema
>;

// User Profile Types
export type UserProfileEntity = z.infer<typeof UserProfileResponseSchema>;
export type CreateUserProfile = z.infer<typeof UserProfileCreateSchema>;
export type UpdateUserProfile = z.infer<typeof UserProfileUpdateSchema>;
export type UserEntity = z.infer<typeof UserProfileResponseSchema>;
export type UserForm = z.infer<typeof UserProfileCreateSchema>;

// Organization Types
export type OrganizationEntity = z.infer<typeof OrganizationResponseSchema>;
export type CreateOrganization = z.infer<typeof OrganizationCreateSchema>;
export type UpdateOrganization = z.infer<typeof OrganizationUpdateSchema>;
export type OrganizationForm = z.infer<typeof OrganizationCreateSchema>;
export type OrganizationMembershipEntity = z.infer<
  typeof OrganizationMembershipResponseSchema
>;
export type CreateOrganizationMembership = z.infer<
  typeof OrganizationMembershipCreateSchema
>;
export type UpdateOrganizationMembership = z.infer<
  typeof OrganizationMembershipUpdateSchema
>;

// Content Types
export type ContentItemEntity = z.infer<typeof ContentItemResponseSchema>;
export type CreateContentItem = z.infer<typeof ContentItemCreateSchema>;
export type UpdateContentItem = z.infer<typeof ContentItemUpdateSchema>;
export type ContentItemForm = z.infer<typeof ContentItemCreateSchema>;
export type ContentSeriesEntity = z.infer<typeof ContentSeriesResponseSchema>;
export type CreateContentSeries = z.infer<typeof ContentSeriesCreateSchema>;
export type UpdateContentSeries = z.infer<typeof ContentSeriesUpdateSchema>;
export type ContentCategoryEntity = z.infer<
  typeof ContentCategoryResponseSchema
>;
export type CreateContentCategory = z.infer<typeof ContentCategoryCreateSchema>;
export type UpdateContentCategory = z.infer<typeof ContentCategoryUpdateSchema>;
export type ContentCrossReferenceEntity = z.infer<
  typeof ContentCrossReferenceResponseSchema
>;
export type CreateContentCrossReference = z.infer<
  typeof ContentCrossReferenceCreateSchema
>;
export type UpdateContentCrossReference = z.infer<
  typeof ContentCrossReferenceUpdateSchema
>;

// User Assessment Types
export type UserAssessmentEntity = z.infer<typeof UserAssessmentResponseSchema>;
export type CreateUserAssessment = z.infer<typeof UserAssessmentCreateSchema>;
export type UpdateUserAssessment = z.infer<typeof UserAssessmentUpdateSchema>;

// AI Types
export type AiContentJobEntity = z.infer<typeof AiContentJobResponseSchema>;
export type CreateAiContentJob = z.infer<typeof AiContentJobCreateSchema>;
export type UpdateAiContentJob = z.infer<typeof AiContentJobUpdateSchema>;
export type AiConversationEntity = z.infer<typeof AiConversationResponseSchema>;
export type CreateAiConversation = z.infer<typeof AiConversationCreateSchema>;
export type UpdateAiConversation = z.infer<typeof AiConversationUpdateSchema>;
export type AiCrossReferenceSuggestionEntity = z.infer<
  typeof AiCrossReferenceSuggestionResponseSchema
>;
export type CreateAiCrossReferenceSuggestion = z.infer<
  typeof AiCrossReferenceSuggestionCreateSchema
>;
export type UpdateAiCrossReferenceSuggestion = z.infer<
  typeof AiCrossReferenceSuggestionUpdateSchema
>;
export type AiMessageEntity = z.infer<typeof AiMessageResponseSchema>;
export type CreateAiMessage = z.infer<typeof AiMessageCreateSchema>;
export type UpdateAiMessage = z.infer<typeof AiMessageUpdateSchema>;

// Theological Concept Types
export type TheologicalConceptEntity = z.infer<
  typeof TheologicalConceptResponseSchema
>;
export type CreateTheologicalConcept = z.infer<
  typeof TheologicalConceptCreateSchema
>;
export type UpdateTheologicalConcept = z.infer<
  typeof TheologicalConceptUpdateSchema
>;

// Subscription Types
export type SubscriptionPlanEntity = z.infer<
  typeof SubscriptionPlanResponseSchema
>;
export type CreateSubscriptionPlan = z.infer<
  typeof SubscriptionPlanCreateSchema
>;
export type UpdateSubscriptionPlan = z.infer<
  typeof SubscriptionPlanUpdateSchema
>;
export type UserSubscriptionEntity = z.infer<
  typeof UserSubscriptionResponseSchema
>;
export type CreateUserSubscription = z.infer<
  typeof UserSubscriptionCreateSchema
>;
export type UpdateUserSubscription = z.infer<
  typeof UserSubscriptionUpdateSchema
>;

// Transaction Types
export type TransactionEntity = z.infer<typeof TransactionResponseSchema>;
export type CreateTransaction = z.infer<typeof TransactionCreateSchema>;
export type UpdateTransaction = z.infer<typeof TransactionUpdateSchema>;

// Payment Method Types
export type PaymentMethodEntity = z.infer<typeof PaymentMethodResponseSchema>;
export type CreatePaymentMethod = z.infer<typeof PaymentMethodCreateSchema>;
export type UpdatePaymentMethod = z.infer<typeof PaymentMethodUpdateSchema>;

// Coupon Types
export type CouponEntity = z.infer<typeof CouponResponseSchema>;
export type CreateCoupon = z.infer<typeof CouponCreateSchema>;
export type UpdateCoupon = z.infer<typeof CouponUpdateSchema>;

// Feature Flag Types
export type FeatureFlagEntity = z.infer<typeof FeatureFlagResponseSchema>;
export type CreateFeatureFlag = z.infer<typeof FeatureFlagCreateSchema>;
export type UpdateFeatureFlag = z.infer<typeof FeatureFlagUpdateSchema>;
export type UserFeatureFlagEntity = z.infer<
  typeof UserFeatureFlagResponseSchema
>;
export type CreateUserFeatureFlag = z.infer<typeof UserFeatureFlagCreateSchema>;
export type UpdateUserFeatureFlag = z.infer<typeof UserFeatureFlagUpdateSchema>;

// Audit Log Types
export type AuditLogEntity = z.infer<typeof AuditLogResponseSchema>;
export type CreateAuditLog = z.infer<typeof AuditLogCreateSchema>;
export type UpdateAuditLog = z.infer<typeof AuditLogUpdateSchema>;

// System Notification Types
export type SystemNotificationEntity = z.infer<
  typeof SystemNotificationResponseSchema
>;
export type CreateSystemNotification = z.infer<
  typeof SystemNotificationCreateSchema
>;
export type UpdateSystemNotification = z.infer<
  typeof SystemNotificationUpdateSchema
>;

// User Consent Types
export type UserConsentEntity = z.infer<typeof UserConsentResponseSchema>;
export type CreateUserConsent = z.infer<typeof UserConsentCreateSchema>;
export type UpdateUserConsent = z.infer<typeof UserConsentUpdateSchema>;

// User Notification Status Types
export type UserNotificationStatusEntity = z.infer<
  typeof UserNotificationStatusResponseSchema
>;
export type CreateUserNotificationStatus = z.infer<
  typeof UserNotificationStatusCreateSchema
>;
export type UpdateUserNotificationStatus = z.infer<
  typeof UserNotificationStatusUpdateSchema
>;

// API Key Types
export type ApiKeyEntity = z.infer<typeof ApiKeyResponseSchema>;
export type CreateApiKey = z.infer<typeof ApiKeyCreateSchema>;
export type UpdateApiKey = z.infer<typeof ApiKeyUpdateSchema>;

// Community Types
export type CommunityEntity = z.infer<typeof CommunityResponseSchema>;
export type CreateCommunity = z.infer<typeof CommunityCreateSchema>;
export type UpdateCommunity = z.infer<typeof CommunityUpdateSchema>;
export type CommunityMembershipEntity = z.infer<
  typeof CommunityMembershipResponseSchema
>;
export type CreateCommunityMembership = z.infer<
  typeof CommunityMembershipCreateSchema
>;
export type UpdateCommunityMembership = z.infer<
  typeof CommunityMembershipUpdateSchema
>;
export type CommunityPostEntity = z.infer<typeof CommunityPostResponseSchema>;
export type CreateCommunityPost = z.infer<typeof CommunityPostCreateSchema>;
export type UpdateCommunityPost = z.infer<typeof CommunityPostUpdateSchema>;
export type CommunityPostVoteEntity = z.infer<
  typeof CommunityPostVoteResponseSchema
>;
export type CreateCommunityPostVote = z.infer<
  typeof CommunityPostVoteCreateSchema
>;
export type UpdateCommunityPostVote = z.infer<
  typeof CommunityPostVoteUpdateSchema
>;

// Collaboration Types
export type CollaborationEntity = z.infer<typeof CollaborationResponseSchema>;
export type CreateCollaboration = z.infer<typeof CollaborationCreateSchema>;
export type UpdateCollaboration = z.infer<typeof CollaborationUpdateSchema>;

// Series Content Item Types
export type SeriesContentItemEntity = z.infer<
  typeof SeriesContentItemResponseSchema
>;
export type CreateSeriesContentItem = z.infer<
  typeof SeriesContentItemCreateSchema
>;
export type UpdateSeriesContentItem = z.infer<
  typeof SeriesContentItemUpdateSchema
>;

// Analytics Types
export type UserAnalyticsEventEntity = z.infer<
  typeof UserAnalyticsEventResponseSchema
>;
export type CreateUserAnalyticsEvent = z.infer<
  typeof UserAnalyticsEventCreateSchema
>;
export type UpdateUserAnalyticsEvent = z.infer<
  typeof UserAnalyticsEventUpdateSchema
>;
export type UserContentInteractionEntity = z.infer<
  typeof UserContentInteractionResponseSchema
>;
export type CreateUserContentInteraction = z.infer<
  typeof UserContentInteractionCreateSchema
>;
export type UpdateUserContentInteraction = z.infer<
  typeof UserContentInteractionUpdateSchema
>;
export type LearningOutcomeEntity = z.infer<
  typeof LearningOutcomeResponseSchema
>;
export type CreateLearningOutcome = z.infer<typeof LearningOutcomeCreateSchema>;
export type UpdateLearningOutcome = z.infer<typeof LearningOutcomeUpdateSchema>;
export type MovementMetricEntity = z.infer<typeof MovementMetricResponseSchema>;
export type CreateMovementMetric = z.infer<typeof MovementMetricCreateSchema>;
export type UpdateMovementMetric = z.infer<typeof MovementMetricUpdateSchema>;
export type PerformanceReportEntity = z.infer<
  typeof PerformanceReportResponseSchema
>;
export type CreatePerformanceReport = z.infer<
  typeof PerformanceReportCreateSchema
>;
export type UpdatePerformanceReport = z.infer<
  typeof PerformanceReportUpdateSchema
>;

// ============================================================================
// ADDITIONAL LEGACY EXPORTS (for compatibility)
// ============================================================================

// Form types (aliases for Create types)
export type UserProfileForm = UserProfileCreate;
export type OrganizationForm = OrganizationCreate;
export type ContentItemForm = ContentItemCreate;

// Query types (aliases for List types)
export type AssessmentQuery = AssessmentListResponse;
export type AssessmentQuestionQuery = AssessmentQuestionListResponse;
export type AssessmentResponseQuery = AssessmentResponseListResponse;
export type OrganizationQuery = OrganizationListResponse;
export type OrganizationMembershipQuery = OrganizationMembershipListResponse;
export type UserProfileQuery = UserProfileListResponse;
export type UserAssessmentQuery = UserAssessmentListResponse;
export type ContentItemQuery = ContentItemListResponse;
export type ContentSeriesQuery = ContentSeriesListResponse;
export type ContentCategoryQuery = ContentCategoryListResponse;

// Additional legacy types that may be expected
export type AssessmentWithQuestionsResponse = AssessmentResponse;
export type UserAssessmentWithDetailsResponse = UserAssessmentResponse;
export type CompleteAssessmentInput = AssessmentCreate;
export type StartAssessmentInput = AssessmentCreate;
export type SaveResponsesInput = AssessmentResponseCreate;

// Validation utilities (if they exist)
export const isValidSchema = (schema: any, data: any) => {
  try {
    schema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const validateSchema = (schema: any, data: any) => {
  return schema.safeParse(data);
};

export const validateSchemaOrThrow = (schema: any, data: any) => {
  return schema.parse(data);
};

// Additional missing exports that files expect
export const createAssessmentSchema = AssessmentCreateSchema;
export const createAssessmentsSchema = AssessmentCreateSchema;
export const createAssessmentQuestionSchema = AssessmentQuestionCreateSchema;
export const createAssessmentResponseSchema = AssessmentResponseCreateSchema;
export const createUserProfileSchema = UserProfileCreateSchema;
export const createUserProfilesSchema = UserProfileCreateSchema;
export const createOrganizationSchema = OrganizationCreateSchema;
export const createOrganizationsSchema = OrganizationCreateSchema;
export const createContentItemSchema = ContentItemCreateSchema;
export const createContentItemsSchema = ContentItemCreateSchema;
export const createContentSeriesSchema = ContentSeriesCreateSchema;
export const createContentCategorySchema = ContentCategoryCreateSchema;
export const createUserAssessmentSchema = UserAssessmentCreateSchema;
export const createUserAssessmentsSchema = UserAssessmentCreateSchema;

// Additional missing types
export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  ministryRole: string;
  denomination: string | null;
  organizationName: string | null;
  countryCode: string | null;
  timezone: string | null;
  languagePrimary: string;
  culturalContext: string | null;
  leaderTier: string | null;
  subscriptionTier: string;
  publicProfile: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
};

export type OrganizationInvitation = {
  id: string;
  email: string;
  organizationId: string;
  role: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  acceptedAt: string | null;
  declinedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NewContentCategory = z.infer<typeof ContentCategoryCreateSchema>;
export type NewOrganization = z.infer<typeof OrganizationCreateSchema>;
export type NewUserProfile = z.infer<typeof UserProfileCreateSchema>;
export type NewAssessment = z.infer<typeof AssessmentCreateSchema>;
export type NewContentItem = z.infer<typeof ContentItemCreateSchema>;
export type NewUserAssessment = z.infer<typeof UserAssessmentCreateSchema>;

// Additional schema aliases
export const contentItemFormSchema = ContentItemCreateSchema;
export const organizationFormSchema = OrganizationCreateSchema;
export const saveResponsesInputSchema = AssessmentResponseCreateSchema;
export const newUserProfileSchema = UserProfileCreateSchema;

// Additional missing exports for compatibility
export type ContentCategory = ContentCategoryEntity;
export type UserAssessmentFilters = UserAssessmentFiltersRequest;
export type UserQuery = UserProfileListResponse;

// Additional missing schema aliases
export const userProfileFormSchema = UserProfileCreateSchema;
export const assessmentEntitySchema = AssessmentResponseSchema;
export const updateAssessmentSchema = AssessmentUpdateSchema;
export const userAssessmentEntitySchema = UserAssessmentResponseSchema;
export const updateContentItemSchema = ContentItemUpdateSchema;
export const createOrganizationMembershipSchema =
  OrganizationMembershipCreateSchema;
export const updateOrganizationMembershipSchema =
  OrganizationMembershipUpdateSchema;
export const updateOrganizationSchema = OrganizationUpdateSchema;

// Additional missing API request type aliases
export type CreateContentItemApiRequest = ContentItemCreate;
export type PublishContentItemApiRequest = ContentItemUpdate;
export type ScheduleContentItemApiRequest = ContentItemUpdate;
export type UpdateContentItemApiRequest = ContentItemUpdate;
export type CreateOrganizationApiRequest = OrganizationCreate;
export type CreateOrganizationMembershipApiRequest =
  OrganizationMembershipCreate;
export type InviteUserToOrganizationApiRequest = OrganizationMembershipCreate;
export type UpdateOrganizationApiRequest = OrganizationUpdate;
export type UpdateOrganizationMembershipApiRequest =
  OrganizationMembershipUpdate;

// Additional missing API request types
export type UpdateUserAssessmentScoresApiRequest = UserAssessmentUpdate;
export type UpdateUserProfileApiRequest = UserProfileUpdate;

// Additional type aliases
export type ContentItemResponse = ContentItemEntity;
export type CreateAssessmentRequest = AssessmentCreate;
export type UserProfile = UserProfileEntity;

// Form props types (these would typically be in a separate types file)
export type UserFormProps = {
  user?: UserProfile;
  onSubmit: (data: UserProfileCreate) => void;
  isLoading?: boolean;
};
