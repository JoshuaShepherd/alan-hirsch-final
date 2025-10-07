// DTO aliases for service layer compatibility
// This file provides DTO naming convention for services while maintaining schema exports

import { z } from 'zod';
import {
  createOrganizationMembershipsSchema,
  createOrganizationsSchema,
  createUserProfilesSchema,
  organizationMembershipsEntitySchema,
  organizationMembershipsQuerySchema,
  organizationsEntitySchema,
  organizationsQuerySchema,
  updateOrganizationMembershipsSchema,
  updateOrganizationsSchema,
  updateUserProfilesSchema,
  // Auth/User schemas
  userProfilesEntitySchema,
  userProfilesQuerySchema,
} from './schemas/auth';

import {
  assessmentQuestionsEntitySchema,
  assessmentQuestionsQuerySchema,
  assessmentResponsesEntitySchema,
  assessmentResponsesQuerySchema,
  // Assessment schemas
  assessmentsEntitySchema,
  assessmentsQuerySchema,
  createAssessmentQuestionsSchema,
  createAssessmentResponsesSchema,
  createAssessmentsSchema,
  createUserAssessmentsSchema,
  updateAssessmentQuestionsSchema,
  updateAssessmentResponsesSchema,
  updateAssessmentsSchema,
  updateUserAssessmentsSchema,
  userAssessmentsEntitySchema,
  userAssessmentsQuerySchema,
} from './schemas/assessments';

import {
  couponsEntitySchema,
  couponsQuerySchema,
  createCouponsSchema,
  createPaymentMethodsSchema,
  createSubscriptionPlansSchema,
  createTransactionsSchema,
  createUserSubscriptionsSchema,
  paymentMethodsEntitySchema,
  paymentMethodsQuerySchema,
  // Subscription schemas
  subscriptionPlansEntitySchema,
  subscriptionPlansQuerySchema,
  transactionsEntitySchema,
  transactionsQuerySchema,
  updateCouponsSchema,
  updatePaymentMethodsSchema,
  updateSubscriptionPlansSchema,
  updateTransactionsSchema,
  updateUserSubscriptionsSchema,
  userSubscriptionsEntitySchema,
  userSubscriptionsQuerySchema,
} from './schemas/subscriptions';

// User DTOs
export const UserCreateDTO = createUserProfilesSchema;
export const UserUpdateDTO = updateUserProfilesSchema;
export const UserResponseDTO = userProfilesEntitySchema;
export const UserListResponseDTO = userProfilesQuerySchema;

// Legacy schema exports for backward compatibility
export const UserCreateSchema = createUserProfilesSchema;
export const UserUpdateSchema = updateUserProfilesSchema;
export const UserResponseSchema = userProfilesEntitySchema;
export const UserListResponseSchema = userProfilesQuerySchema;
export const UserProfileCreateSchema = createUserProfilesSchema;
export const UserProfileUpdateSchema = updateUserProfilesSchema;
export const UserProfileResponseSchema = userProfilesEntitySchema;
export const UserProfileListResponseSchema = userProfilesQuerySchema;

export const OrganizationCreateDTO = createOrganizationsSchema;
export const OrganizationUpdateDTO = updateOrganizationsSchema;
export const OrganizationResponseDTO = organizationsEntitySchema;
export const OrganizationListResponseDTO = organizationsQuerySchema;

// Legacy schema exports for backward compatibility
export const OrganizationCreateSchema = createOrganizationsSchema;
export const OrganizationUpdateSchema = updateOrganizationsSchema;
export const OrganizationResponseSchema = organizationsEntitySchema;
export const OrganizationListResponseSchema = organizationsQuerySchema;

export const OrganizationMembershipCreateDTO =
  createOrganizationMembershipsSchema;
export const OrganizationMembershipUpdateDTO =
  updateOrganizationMembershipsSchema;
export const OrganizationMembershipResponseDTO =
  organizationMembershipsEntitySchema;
export const OrganizationMembershipListResponseDTO =
  organizationMembershipsQuerySchema;

// Legacy schema exports for backward compatibility
export const OrganizationMembershipCreateSchema =
  createOrganizationMembershipsSchema;
export const OrganizationMembershipUpdateSchema =
  updateOrganizationMembershipsSchema;
export const OrganizationMembershipResponseSchema =
  organizationMembershipsEntitySchema;
export const OrganizationMembershipListResponseSchema =
  organizationMembershipsQuerySchema;

// Assessment DTOs
export const AssessmentCreateDTO = createAssessmentsSchema;
export const AssessmentUpdateDTO = updateAssessmentsSchema;
export const AssessmentResponseDTO = assessmentsEntitySchema;
export const AssessmentListResponseDTO = assessmentsQuerySchema;

// Legacy schema exports for backward compatibility
export const AssessmentCreateSchema = createAssessmentsSchema;
export const AssessmentUpdateSchema = updateAssessmentsSchema;
export const AssessmentResponseSchema = assessmentsEntitySchema;
export const AssessmentListResponseSchema = assessmentsQuerySchema;

export const AssessmentQuestionCreateDTO = createAssessmentQuestionsSchema;
export const AssessmentQuestionUpdateDTO = updateAssessmentQuestionsSchema;
export const AssessmentQuestionResponseDTO = assessmentQuestionsEntitySchema;
export const AssessmentQuestionListResponseDTO = assessmentQuestionsQuerySchema;

// Legacy schema exports for backward compatibility
export const AssessmentQuestionCreateSchema = createAssessmentQuestionsSchema;
export const AssessmentQuestionUpdateSchema = updateAssessmentQuestionsSchema;
export const AssessmentQuestionResponseSchema = assessmentQuestionsEntitySchema;
export const AssessmentQuestionListResponseSchema =
  assessmentQuestionsQuerySchema;

export const UserAssessmentCreateDTO = createUserAssessmentsSchema;
export const UserAssessmentUpdateDTO = updateUserAssessmentsSchema;
export const UserAssessmentResponseDTO = userAssessmentsEntitySchema;
export const UserAssessmentListResponseDTO = userAssessmentsQuerySchema;

// Legacy schema exports for backward compatibility
export const UserAssessmentCreateSchema = createUserAssessmentsSchema;
export const UserAssessmentUpdateSchema = updateUserAssessmentsSchema;
export const UserAssessmentResponseSchema = userAssessmentsEntitySchema;
export const UserAssessmentListResponseSchema = userAssessmentsQuerySchema;

export const AssessmentResponseCreateDTO = createAssessmentResponsesSchema;
export const AssessmentResponseUpdateDTO = updateAssessmentResponsesSchema;
export const AssessmentResponseResponseDTO = assessmentResponsesEntitySchema;
export const AssessmentResponseListResponseDTO = assessmentResponsesQuerySchema;

// Legacy schema exports for backward compatibility
export const AssessmentResponseCreateSchema = createAssessmentResponsesSchema;
export const AssessmentResponseUpdateSchema = updateAssessmentResponsesSchema;
export const AssessmentResponseResponseSchema = assessmentResponsesEntitySchema;
export const AssessmentResponseListResponseSchema =
  assessmentResponsesQuerySchema;

// Subscription DTOs
export const SubscriptionPlanCreateDTO = createSubscriptionPlansSchema;
export const SubscriptionPlanUpdateDTO = updateSubscriptionPlansSchema;
export const SubscriptionPlanResponseDTO = subscriptionPlansEntitySchema;
export const SubscriptionPlanListResponseDTO = subscriptionPlansQuerySchema;

// Legacy schema exports for backward compatibility
export const SubscriptionPlanCreateSchema = createSubscriptionPlansSchema;
export const SubscriptionPlanUpdateSchema = updateSubscriptionPlansSchema;
export const SubscriptionPlanResponseSchema = subscriptionPlansEntitySchema;
export const SubscriptionPlanListResponseSchema = subscriptionPlansQuerySchema;

export const UserSubscriptionCreateDTO = createUserSubscriptionsSchema;
export const UserSubscriptionUpdateDTO = updateUserSubscriptionsSchema;
export const UserSubscriptionResponseDTO = userSubscriptionsEntitySchema;
export const UserSubscriptionListResponseDTO = userSubscriptionsQuerySchema;

// Legacy schema exports for backward compatibility
export const UserSubscriptionCreateSchema = createUserSubscriptionsSchema;
export const UserSubscriptionUpdateSchema = updateUserSubscriptionsSchema;
export const UserSubscriptionResponseSchema = userSubscriptionsEntitySchema;
export const UserSubscriptionListResponseSchema = userSubscriptionsQuerySchema;

export const TransactionCreateDTO = createTransactionsSchema;
export const TransactionUpdateDTO = updateTransactionsSchema;
export const TransactionResponseDTO = transactionsEntitySchema;
export const TransactionListResponseDTO = transactionsQuerySchema;

// Legacy schema exports for backward compatibility
export const TransactionCreateSchema = createTransactionsSchema;
export const TransactionUpdateSchema = updateTransactionsSchema;
export const TransactionResponseSchema = transactionsEntitySchema;
export const TransactionListResponseSchema = transactionsQuerySchema;

export const PaymentMethodCreateDTO = createPaymentMethodsSchema;
export const PaymentMethodUpdateDTO = updatePaymentMethodsSchema;
export const PaymentMethodResponseDTO = paymentMethodsEntitySchema;
export const PaymentMethodListResponseDTO = paymentMethodsQuerySchema;

// Legacy schema exports for backward compatibility
export const PaymentMethodCreateSchema = createPaymentMethodsSchema;
export const PaymentMethodUpdateSchema = updatePaymentMethodsSchema;
export const PaymentMethodResponseSchema = paymentMethodsEntitySchema;
export const PaymentMethodListResponseSchema = paymentMethodsQuerySchema;

export const CouponCreateDTO = createCouponsSchema;
export const CouponUpdateDTO = updateCouponsSchema;
export const CouponResponseDTO = couponsEntitySchema;
export const CouponListResponseDTO = couponsQuerySchema;

// Legacy schema exports for backward compatibility
export const CouponCreateSchema = createCouponsSchema;
export const CouponUpdateSchema = updateCouponsSchema;
export const CouponResponseSchema = couponsEntitySchema;
export const CouponListResponseSchema = couponsQuerySchema;

// Content DTOs
import {
  contentCrossReferencesEntitySchema,
  contentCrossReferencesQuerySchema,
  contentItemsEntitySchema,
  contentItemsQuerySchema,
  contentSeriesEntitySchema,
  contentSeriesQuerySchema,
  createcontentCrossReferencesSchema,
  createcontentItemsSchema,
  createcontentSeriesSchema,
  createseriesContentItemsSchema,
  seriesContentItemsEntitySchema,
  seriesContentItemsQuerySchema,
  updatecontentCrossReferencesSchema,
  updatecontentItemsSchema,
  updatecontentSeriesSchema,
  updateseriesContentItemsSchema,
} from './schemas/content';

export const ContentSeriesCreateDTO = createcontentSeriesSchema;
export const ContentSeriesUpdateDTO = updatecontentSeriesSchema;
export const ContentSeriesResponseDTO = contentSeriesEntitySchema;
export const ContentSeriesListResponseDTO = contentSeriesQuerySchema;

// Legacy schema exports for backward compatibility
export const ContentSeriesCreateSchema = createcontentSeriesSchema;
export const ContentSeriesUpdateSchema = updatecontentSeriesSchema;
export const ContentSeriesResponseSchema = contentSeriesEntitySchema;
export const ContentSeriesListResponseSchema = contentSeriesQuerySchema;

export const ContentItemCreateDTO = createcontentItemsSchema;
export const ContentItemUpdateDTO = updatecontentItemsSchema;
export const ContentItemResponseDTO = contentItemsEntitySchema;
export const ContentItemListResponseDTO = contentItemsQuerySchema;

// Legacy schema exports for backward compatibility
export const ContentItemCreateSchema = createcontentItemsSchema;
export const ContentItemUpdateSchema = updatecontentItemsSchema;
export const ContentItemResponseSchema = contentItemsEntitySchema;
export const ContentItemListResponseSchema = contentItemsQuerySchema;

export const SeriesContentItemCreateDTO = createseriesContentItemsSchema;
export const SeriesContentItemUpdateDTO = updateseriesContentItemsSchema;
export const SeriesContentItemResponseDTO = seriesContentItemsEntitySchema;
export const SeriesContentItemListResponseDTO = seriesContentItemsQuerySchema;

// Legacy schema exports for backward compatibility
export const SeriesContentItemCreateSchema = createseriesContentItemsSchema;
export const SeriesContentItemUpdateSchema = updateseriesContentItemsSchema;
export const SeriesContentItemResponseSchema = seriesContentItemsEntitySchema;
export const SeriesContentItemListResponseSchema =
  seriesContentItemsQuerySchema;

export const ContentCrossReferenceCreateDTO =
  createcontentCrossReferencesSchema;
export const ContentCrossReferenceUpdateDTO =
  updatecontentCrossReferencesSchema;
export const ContentCrossReferenceResponseDTO =
  contentCrossReferencesEntitySchema;
export const ContentCrossReferenceListResponseDTO =
  contentCrossReferencesQuerySchema;

// Legacy schema exports for backward compatibility
export const ContentCrossReferenceCreateSchema =
  createcontentCrossReferencesSchema;
export const ContentCrossReferenceUpdateSchema =
  updatecontentCrossReferencesSchema;
export const ContentCrossReferenceResponseSchema =
  contentCrossReferencesEntitySchema;
export const ContentCrossReferenceListResponseSchema =
  contentCrossReferencesQuerySchema;

// Community DTOs
import {
  collaborationsEntitySchema,
  collaborationsQuerySchema,
  communitiesEntitySchema,
  communitiesQuerySchema,
  communityMembershipsEntitySchema,
  communityMembershipsQuerySchema,
  communityPostVotesEntitySchema,
  communityPostVotesQuerySchema,
  createcollaborationsSchema,
  createcommunitiesSchema,
  createcommunityMembershipsSchema,
  createcommunityPostVotesSchema,
  updatecollaborationsSchema,
  updatecommunitiesSchema,
  updatecommunityMembershipsSchema,
  updatecommunityPostVotesSchema,
} from './schemas/community';

export const CommunityCreateDTO = createcommunitiesSchema;
export const CommunityUpdateDTO = updatecommunitiesSchema;
export const CommunityResponseDTO = communitiesEntitySchema;
export const CommunityListResponseDTO = communitiesQuerySchema;

// Legacy schema exports for backward compatibility
export const CommunityCreateSchema = createcommunitiesSchema;
export const CommunityUpdateSchema = updatecommunitiesSchema;
export const CommunityResponseSchema = communitiesEntitySchema;
export const CommunityListResponseSchema = communitiesQuerySchema;

export const CommunityMembershipCreateDTO = createcommunityMembershipsSchema;
export const CommunityMembershipUpdateDTO = updatecommunityMembershipsSchema;
export const CommunityMembershipResponseDTO = communityMembershipsEntitySchema;
export const CommunityMembershipListResponseDTO =
  communityMembershipsQuerySchema;

// Legacy schema exports for backward compatibility
export const CommunityMembershipCreateSchema = createcommunityMembershipsSchema;
export const CommunityMembershipUpdateSchema = updatecommunityMembershipsSchema;
export const CommunityMembershipResponseSchema =
  communityMembershipsEntitySchema;
export const CommunityMembershipListResponseSchema =
  communityMembershipsQuerySchema;

export const CommunityPostVoteCreateDTO = createcommunityPostVotesSchema;
export const CommunityPostVoteUpdateDTO = updatecommunityPostVotesSchema;
export const CommunityPostVoteResponseDTO = communityPostVotesEntitySchema;
export const CommunityPostVoteListResponseDTO = communityPostVotesQuerySchema;

// Legacy schema exports for backward compatibility
export const CommunityPostVoteCreateSchema = createcommunityPostVotesSchema;
export const CommunityPostVoteUpdateSchema = updatecommunityPostVotesSchema;
export const CommunityPostVoteResponseSchema = communityPostVotesEntitySchema;
export const CommunityPostVoteListResponseSchema =
  communityPostVotesQuerySchema;

export const CollaborationCreateDTO = createcollaborationsSchema;
export const CollaborationUpdateDTO = updatecollaborationsSchema;
export const CollaborationResponseDTO = collaborationsEntitySchema;
export const CollaborationListResponseDTO = collaborationsQuerySchema;

// Legacy schema exports for backward compatibility
export const CollaborationCreateSchema = createcollaborationsSchema;
export const CollaborationUpdateSchema = updatecollaborationsSchema;
export const CollaborationResponseSchema = collaborationsEntitySchema;
export const CollaborationListResponseSchema = collaborationsQuerySchema;

// AI DTOs
import {
  aiContentJobsEntitySchema,
  aiContentJobsQuerySchema,
  aiConversationsEntitySchema,
  aiConversationsQuerySchema,
  aiCrossReferenceSuggestionsEntitySchema,
  aiCrossReferenceSuggestionsQuerySchema,
  aiMessagesEntitySchema,
  aiMessagesQuerySchema,
  createaiContentJobsSchema,
  createaiConversationsSchema,
  createaiCrossReferenceSuggestionsSchema,
  createaiMessagesSchema,
  createtheologicalConceptsSchema,
  theologicalConceptsEntitySchema,
  theologicalConceptsQuerySchema,
  updateaiContentJobsSchema,
  updateaiConversationsSchema,
  updateaiCrossReferenceSuggestionsSchema,
  updateaiMessagesSchema,
  updatetheologicalConceptsSchema,
} from './schemas/ai';

export const AiConversationCreateDTO = createaiConversationsSchema;
export const AiConversationUpdateDTO = updateaiConversationsSchema;
export const AiConversationResponseDTO = aiConversationsEntitySchema;
export const AiConversationListResponseDTO = aiConversationsQuerySchema;

// Legacy schema exports for backward compatibility
export const AiConversationCreateSchema = createaiConversationsSchema;
export const AiConversationUpdateSchema = updateaiConversationsSchema;
export const AiConversationResponseSchema = aiConversationsEntitySchema;
export const AiConversationListResponseSchema = aiConversationsQuerySchema;

export const AiMessageCreateDTO = createaiMessagesSchema;
export const AiMessageUpdateDTO = updateaiMessagesSchema;
export const AiMessageResponseDTO = aiMessagesEntitySchema;
export const AiMessageListResponseDTO = aiMessagesQuerySchema;

// Legacy schema exports for backward compatibility
export const AiMessageCreateSchema = createaiMessagesSchema;
export const AiMessageUpdateSchema = updateaiMessagesSchema;
export const AiMessageResponseSchema = aiMessagesEntitySchema;
export const AiMessageListResponseSchema = aiMessagesQuerySchema;

export const AiContentJobCreateDTO = createaiContentJobsSchema;
export const AiContentJobUpdateDTO = updateaiContentJobsSchema;
export const AiContentJobResponseDTO = aiContentJobsEntitySchema;
export const AiContentJobListResponseDTO = aiContentJobsQuerySchema;

// Legacy schema exports for backward compatibility
export const AiContentJobCreateSchema = createaiContentJobsSchema;
export const AiContentJobUpdateSchema = updateaiContentJobsSchema;
export const AiContentJobResponseSchema = aiContentJobsEntitySchema;
export const AiContentJobListResponseSchema = aiContentJobsQuerySchema;

export const AiCrossReferenceSuggestionCreateDTO =
  createaiCrossReferenceSuggestionsSchema;
export const AiCrossReferenceSuggestionUpdateDTO =
  updateaiCrossReferenceSuggestionsSchema;
export const AiCrossReferenceSuggestionResponseDTO =
  aiCrossReferenceSuggestionsEntitySchema;
export const AiCrossReferenceSuggestionListResponseDTO =
  aiCrossReferenceSuggestionsQuerySchema;

// Legacy schema exports for backward compatibility
export const AiCrossReferenceSuggestionCreateSchema =
  createaiCrossReferenceSuggestionsSchema;
export const AiCrossReferenceSuggestionUpdateSchema =
  updateaiCrossReferenceSuggestionsSchema;
export const AiCrossReferenceSuggestionResponseSchema =
  aiCrossReferenceSuggestionsEntitySchema;
export const AiCrossReferenceSuggestionListResponseSchema =
  aiCrossReferenceSuggestionsQuerySchema;

export const TheologicalConceptCreateDTO = createtheologicalConceptsSchema;
export const TheologicalConceptUpdateDTO = updatetheologicalConceptsSchema;
export const TheologicalConceptResponseDTO = theologicalConceptsEntitySchema;
export const TheologicalConceptListResponseDTO = theologicalConceptsQuerySchema;

// Legacy schema exports for backward compatibility
export const TheologicalConceptCreateSchema = createtheologicalConceptsSchema;
export const TheologicalConceptUpdateSchema = updatetheologicalConceptsSchema;
export const TheologicalConceptResponseSchema = theologicalConceptsEntitySchema;
export const TheologicalConceptListResponseSchema =
  theologicalConceptsQuerySchema;

// Analytics DTOs
import {
  createlearningOutcomesSchema,
  createmovementMetricsSchema,
  createperformanceReportsSchema,
  createuserAnalyticsEventsSchema,
  createuserContentInteractionsSchema,
  learningOutcomesEntitySchema,
  learningOutcomesQuerySchema,
  movementMetricsEntitySchema,
  movementMetricsQuerySchema,
  performanceReportsEntitySchema,
  performanceReportsQuerySchema,
  updatelearningOutcomesSchema,
  updatemovementMetricsSchema,
  updateperformanceReportsSchema,
  updateuserAnalyticsEventsSchema,
  updateuserContentInteractionsSchema,
  userAnalyticsEventsEntitySchema,
  userAnalyticsEventsQuerySchema,
  userContentInteractionsEntitySchema,
  userContentInteractionsQuerySchema,
} from './schemas/analytics';

export const UserAnalyticsEventCreateDTO = createuserAnalyticsEventsSchema;
export const UserAnalyticsEventUpdateDTO = updateuserAnalyticsEventsSchema;
export const UserAnalyticsEventResponseDTO = userAnalyticsEventsEntitySchema;
export const UserAnalyticsEventListResponseDTO = userAnalyticsEventsQuerySchema;

// Legacy schema exports for backward compatibility
export const UserAnalyticsEventCreateSchema = createuserAnalyticsEventsSchema;
export const UserAnalyticsEventUpdateSchema = updateuserAnalyticsEventsSchema;
export const UserAnalyticsEventResponseSchema = userAnalyticsEventsEntitySchema;
export const UserAnalyticsEventListResponseSchema =
  userAnalyticsEventsQuerySchema;

export const UserContentInteractionCreateDTO =
  createuserContentInteractionsSchema;
export const UserContentInteractionUpdateDTO =
  updateuserContentInteractionsSchema;
export const UserContentInteractionResponseDTO =
  userContentInteractionsEntitySchema;
export const UserContentInteractionListResponseDTO =
  userContentInteractionsQuerySchema;

// Legacy schema exports for backward compatibility
export const UserContentInteractionCreateSchema =
  createuserContentInteractionsSchema;
export const UserContentInteractionUpdateSchema =
  updateuserContentInteractionsSchema;
export const UserContentInteractionResponseSchema =
  userContentInteractionsEntitySchema;
export const UserContentInteractionListResponseSchema =
  userContentInteractionsQuerySchema;

export const LearningOutcomeCreateDTO = createlearningOutcomesSchema;
export const LearningOutcomeUpdateDTO = updatelearningOutcomesSchema;
export const LearningOutcomeResponseDTO = learningOutcomesEntitySchema;
export const LearningOutcomeListResponseDTO = learningOutcomesQuerySchema;

// Legacy schema exports for backward compatibility
export const LearningOutcomeCreateSchema = createlearningOutcomesSchema;
export const LearningOutcomeUpdateSchema = updatelearningOutcomesSchema;
export const LearningOutcomeResponseSchema = learningOutcomesEntitySchema;
export const LearningOutcomeListResponseSchema = learningOutcomesQuerySchema;

export const MovementMetricCreateDTO = createmovementMetricsSchema;
export const MovementMetricUpdateDTO = updatemovementMetricsSchema;
export const MovementMetricResponseDTO = movementMetricsEntitySchema;
export const MovementMetricListResponseDTO = movementMetricsQuerySchema;

// Legacy schema exports for backward compatibility
export const MovementMetricCreateSchema = createmovementMetricsSchema;
export const MovementMetricUpdateSchema = updatemovementMetricsSchema;
export const MovementMetricResponseSchema = movementMetricsEntitySchema;
export const MovementMetricListResponseSchema = movementMetricsQuerySchema;

export const PerformanceReportCreateDTO = createperformanceReportsSchema;
export const PerformanceReportUpdateDTO = updateperformanceReportsSchema;
export const PerformanceReportResponseDTO = performanceReportsEntitySchema;
export const PerformanceReportListResponseDTO = performanceReportsQuerySchema;

// Legacy schema exports for backward compatibility
export const PerformanceReportCreateSchema = createperformanceReportsSchema;
export const PerformanceReportUpdateSchema = updateperformanceReportsSchema;
export const PerformanceReportResponseSchema = performanceReportsEntitySchema;
export const PerformanceReportListResponseSchema =
  performanceReportsQuerySchema;

// System DTOs
import {
  apiKeysEntitySchema,
  apiKeysQuerySchema,
  auditLogsEntitySchema,
  auditLogsQuerySchema,
  createapiKeysSchema,
  createauditLogsSchema,
  createfeatureFlagsSchema,
  createsystemNotificationsSchema,
  createuserConsentsSchema,
  createuserFeatureFlagsSchema,
  createuserNotificationStatusSchema,
  featureFlagsEntitySchema,
  featureFlagsQuerySchema,
  systemNotificationsEntitySchema,
  systemNotificationsQuerySchema,
  updateapiKeysSchema,
  updateauditLogsSchema,
  updatefeatureFlagsSchema,
  updatesystemNotificationsSchema,
  updateuserConsentsSchema,
  updateuserFeatureFlagsSchema,
  updateuserNotificationStatusSchema,
  userConsentsEntitySchema,
  userConsentsQuerySchema,
  userFeatureFlagsEntitySchema,
  userFeatureFlagsQuerySchema,
  userNotificationStatusEntitySchema,
  userNotificationStatusQuerySchema,
} from './schemas/system';

export const AuditLogCreateDTO = createauditLogsSchema;
export const AuditLogUpdateDTO = updateauditLogsSchema;
export const AuditLogResponseDTO = auditLogsEntitySchema;
export const AuditLogListResponseDTO = auditLogsQuerySchema;

// Legacy schema exports for backward compatibility
export const AuditLogCreateSchema = createauditLogsSchema;
export const AuditLogUpdateSchema = updateauditLogsSchema;
export const AuditLogResponseSchema = auditLogsEntitySchema;
export const AuditLogListResponseSchema = auditLogsQuerySchema;

export const FeatureFlagCreateDTO = createfeatureFlagsSchema;
export const FeatureFlagUpdateDTO = updatefeatureFlagsSchema;
export const FeatureFlagResponseDTO = featureFlagsEntitySchema;
export const FeatureFlagListResponseDTO = featureFlagsQuerySchema;

// Legacy schema exports for backward compatibility
export const FeatureFlagCreateSchema = createfeatureFlagsSchema;
export const FeatureFlagUpdateSchema = updatefeatureFlagsSchema;
export const FeatureFlagResponseSchema = featureFlagsEntitySchema;
export const FeatureFlagListResponseSchema = featureFlagsQuerySchema;

export const UserFeatureFlagCreateDTO = createuserFeatureFlagsSchema;
export const UserFeatureFlagUpdateDTO = updateuserFeatureFlagsSchema;
export const UserFeatureFlagResponseDTO = userFeatureFlagsEntitySchema;
export const UserFeatureFlagListResponseDTO = userFeatureFlagsQuerySchema;

// Legacy schema exports for backward compatibility
export const UserFeatureFlagCreateSchema = createuserFeatureFlagsSchema;
export const UserFeatureFlagUpdateSchema = updateuserFeatureFlagsSchema;
export const UserFeatureFlagResponseSchema = userFeatureFlagsEntitySchema;
export const UserFeatureFlagListResponseSchema = userFeatureFlagsQuerySchema;

export const UserConsentCreateDTO = createuserConsentsSchema;
export const UserConsentUpdateDTO = updateuserConsentsSchema;
export const UserConsentResponseDTO = userConsentsEntitySchema;
export const UserConsentListResponseDTO = userConsentsQuerySchema;

// Legacy schema exports for backward compatibility
export const UserConsentCreateSchema = createuserConsentsSchema;
export const UserConsentUpdateSchema = updateuserConsentsSchema;
export const UserConsentResponseSchema = userConsentsEntitySchema;
export const UserConsentListResponseSchema = userConsentsQuerySchema;

export const SystemNotificationCreateDTO = createsystemNotificationsSchema;
export const SystemNotificationUpdateDTO = updatesystemNotificationsSchema;
export const SystemNotificationResponseDTO = systemNotificationsEntitySchema;
export const SystemNotificationListResponseDTO = systemNotificationsQuerySchema;

// Legacy schema exports for backward compatibility
export const SystemNotificationCreateSchema = createsystemNotificationsSchema;
export const SystemNotificationUpdateSchema = updatesystemNotificationsSchema;
export const SystemNotificationResponseSchema = systemNotificationsEntitySchema;
export const SystemNotificationListResponseSchema =
  systemNotificationsQuerySchema;

export const UserNotificationStatusCreateDTO =
  createuserNotificationStatusSchema;
export const UserNotificationStatusUpdateDTO =
  updateuserNotificationStatusSchema;
export const UserNotificationStatusResponseDTO =
  userNotificationStatusEntitySchema;
export const UserNotificationStatusListResponseDTO =
  userNotificationStatusQuerySchema;

// Legacy schema exports for backward compatibility
export const UserNotificationStatusCreateSchema =
  createuserNotificationStatusSchema;
export const UserNotificationStatusUpdateSchema =
  updateuserNotificationStatusSchema;
export const UserNotificationStatusResponseSchema =
  userNotificationStatusEntitySchema;
export const UserNotificationStatusListResponseSchema =
  userNotificationStatusQuerySchema;

export const ApiKeyCreateDTO = createapiKeysSchema;
export const ApiKeyUpdateDTO = updateapiKeysSchema;
export const ApiKeyResponseDTO = apiKeysEntitySchema;
export const ApiKeyListResponseDTO = apiKeysQuerySchema;

// Legacy schema exports for backward compatibility
export const ApiKeyCreateSchema = createapiKeysSchema;
export const ApiKeyUpdateSchema = updateapiKeysSchema;
export const ApiKeyResponseSchema = apiKeysEntitySchema;
export const ApiKeyListResponseSchema = apiKeysQuerySchema;

// Generic Content DTOs (aliases for ContentItem)
export const ContentCreateDTO = ContentItemCreateDTO;
export const ContentUpdateDTO = ContentItemUpdateDTO;
export const ContentResponseDTO = ContentItemResponseDTO;
export const ContentListResponseDTO = ContentItemListResponseDTO;

// Legacy schema exports for backward compatibility
export const ContentCreateSchema = ContentItemCreateSchema;
export const ContentUpdateSchema = ContentItemUpdateSchema;
export const ContentResponseSchema = ContentItemResponseSchema;
export const ContentListResponseSchema = ContentItemListResponseSchema;

// Generic Auth DTOs (aliases for User)
export const AuthCreateDTO = UserCreateDTO;
export const AuthUpdateDTO = UserUpdateDTO;
export const AuthResponseDTO = UserResponseDTO;
export const AuthListResponseDTO = UserListResponseDTO;

// Legacy schema exports for backward compatibility
export const AuthCreateSchema = UserCreateSchema;
export const AuthUpdateSchema = UserUpdateSchema;
export const AuthResponseSchema = UserResponseSchema;
export const AuthListResponseSchema = UserListResponseSchema;

// Type exports for mappers (infer types from schemas)
export type UserProfile = z.infer<typeof userProfilesEntitySchema>;
export type NewUserProfile = z.infer<typeof createUserProfilesSchema>;
export type UserProfileCreate = z.infer<typeof createUserProfilesSchema>;
export type UserProfileUpdate = z.infer<typeof updateUserProfilesSchema>;
export type UserProfileResponse = z.infer<typeof userProfilesEntitySchema>;

export type Organization = z.infer<typeof organizationsEntitySchema>;
export type NewOrganization = z.infer<typeof createOrganizationsSchema>;
export type OrganizationCreate = z.infer<typeof createOrganizationsSchema>;
export type OrganizationUpdate = z.infer<typeof updateOrganizationsSchema>;
export type OrganizationResponse = z.infer<typeof organizationsEntitySchema>;

export type OrganizationMembership = z.infer<
  typeof organizationMembershipsEntitySchema
>;
export type NewOrganizationMembership = z.infer<
  typeof createOrganizationMembershipsSchema
>;
export type OrganizationMembershipCreate = z.infer<
  typeof createOrganizationMembershipsSchema
>;
export type OrganizationMembershipUpdate = z.infer<
  typeof updateOrganizationMembershipsSchema
>;
export type OrganizationMembershipResponse = z.infer<
  typeof organizationMembershipsEntitySchema
>;

export type Assessment = z.infer<typeof assessmentsEntitySchema>;
export type NewAssessment = z.infer<typeof createAssessmentsSchema>;
export type AssessmentCreate = z.infer<typeof createAssessmentsSchema>;
export type AssessmentUpdate = z.infer<typeof updateAssessmentsSchema>;
export type AssessmentResponse = z.infer<typeof assessmentsEntitySchema>;

export type AssessmentQuestion = z.infer<
  typeof assessmentQuestionsEntitySchema
>;
export type NewAssessmentQuestion = z.infer<
  typeof createAssessmentQuestionsSchema
>;
export type AssessmentQuestionCreate = z.infer<
  typeof createAssessmentQuestionsSchema
>;
export type AssessmentQuestionUpdate = z.infer<
  typeof updateAssessmentQuestionsSchema
>;
export type AssessmentQuestionResponse = z.infer<
  typeof assessmentQuestionsEntitySchema
>;

export type UserAssessment = z.infer<typeof userAssessmentsEntitySchema>;
export type NewUserAssessment = z.infer<typeof createUserAssessmentsSchema>;
export type UserAssessmentCreate = z.infer<typeof createUserAssessmentsSchema>;
export type UserAssessmentUpdate = z.infer<typeof updateUserAssessmentsSchema>;
export type UserAssessmentResponse = z.infer<
  typeof userAssessmentsEntitySchema
>;

export type AssessmentResponseEntity = z.infer<
  typeof assessmentResponsesEntitySchema
>;
export type NewAssessmentResponse = z.infer<
  typeof createAssessmentResponsesSchema
>;
export type AssessmentResponseCreate = z.infer<
  typeof createAssessmentResponsesSchema
>;
export type AssessmentResponseUpdate = z.infer<
  typeof updateAssessmentResponsesSchema
>;
export type AssessmentResponseResponse = z.infer<
  typeof assessmentResponsesEntitySchema
>;

export type SubscriptionPlan = z.infer<typeof subscriptionPlansEntitySchema>;
export type NewSubscriptionPlan = z.infer<typeof createSubscriptionPlansSchema>;
export type SubscriptionPlanCreate = z.infer<
  typeof createSubscriptionPlansSchema
>;
export type SubscriptionPlanUpdate = z.infer<
  typeof updateSubscriptionPlansSchema
>;
export type SubscriptionPlanResponse = z.infer<
  typeof subscriptionPlansEntitySchema
>;

export type UserSubscription = z.infer<typeof userSubscriptionsEntitySchema>;
export type NewUserSubscription = z.infer<typeof createUserSubscriptionsSchema>;
export type UserSubscriptionCreate = z.infer<
  typeof createUserSubscriptionsSchema
>;
export type UserSubscriptionUpdate = z.infer<
  typeof updateUserSubscriptionsSchema
>;
export type UserSubscriptionResponse = z.infer<
  typeof userSubscriptionsEntitySchema
>;

export type Transaction = z.infer<typeof transactionsEntitySchema>;
export type NewTransaction = z.infer<typeof createTransactionsSchema>;
export type TransactionCreate = z.infer<typeof createTransactionsSchema>;
export type TransactionUpdate = z.infer<typeof updateTransactionsSchema>;
export type TransactionResponse = z.infer<typeof transactionsEntitySchema>;

export type PaymentMethod = z.infer<typeof paymentMethodsEntitySchema>;
export type NewPaymentMethod = z.infer<typeof createPaymentMethodsSchema>;
export type PaymentMethodCreate = z.infer<typeof createPaymentMethodsSchema>;
export type PaymentMethodUpdate = z.infer<typeof updatePaymentMethodsSchema>;
export type PaymentMethodResponse = z.infer<typeof paymentMethodsEntitySchema>;

export type Coupon = z.infer<typeof couponsEntitySchema>;
export type NewCoupon = z.infer<typeof createCouponsSchema>;
export type CouponCreate = z.infer<typeof createCouponsSchema>;
export type CouponUpdate = z.infer<typeof updateCouponsSchema>;
export type CouponResponse = z.infer<typeof couponsEntitySchema>;

export type ContentSeries = z.infer<typeof contentSeriesEntitySchema>;
export type NewContentSeries = z.infer<typeof createcontentSeriesSchema>;
export type ContentSeriesCreate = z.infer<typeof createcontentSeriesSchema>;
export type ContentSeriesUpdate = z.infer<typeof updatecontentSeriesSchema>;
export type ContentSeriesResponse = z.infer<typeof contentSeriesEntitySchema>;

export type ContentItem = z.infer<typeof contentItemsEntitySchema>;
export type NewContentItem = z.infer<typeof createcontentItemsSchema>;
export type ContentItemCreate = z.infer<typeof createcontentItemsSchema>;
export type ContentItemUpdate = z.infer<typeof updatecontentItemsSchema>;
export type ContentItemResponse = z.infer<typeof contentItemsEntitySchema>;

export type SeriesContentItem = z.infer<typeof seriesContentItemsEntitySchema>;
export type NewSeriesContentItem = z.infer<
  typeof createseriesContentItemsSchema
>;
export type SeriesContentItemCreate = z.infer<
  typeof createseriesContentItemsSchema
>;
export type SeriesContentItemUpdate = z.infer<
  typeof updateseriesContentItemsSchema
>;
export type SeriesContentItemResponse = z.infer<
  typeof seriesContentItemsEntitySchema
>;

export type ContentCrossReference = z.infer<
  typeof contentCrossReferencesEntitySchema
>;
export type NewContentCrossReference = z.infer<
  typeof createcontentCrossReferencesSchema
>;
export type ContentCrossReferenceCreate = z.infer<
  typeof createcontentCrossReferencesSchema
>;
export type ContentCrossReferenceUpdate = z.infer<
  typeof updatecontentCrossReferencesSchema
>;
export type ContentCrossReferenceResponse = z.infer<
  typeof contentCrossReferencesEntitySchema
>;

export type Community = z.infer<typeof communitiesEntitySchema>;
export type NewCommunity = z.infer<typeof createcommunitiesSchema>;
export type CommunityCreate = z.infer<typeof createcommunitiesSchema>;
export type CommunityUpdate = z.infer<typeof updatecommunitiesSchema>;
export type CommunityResponse = z.infer<typeof communitiesEntitySchema>;

export type CommunityMembership = z.infer<
  typeof communityMembershipsEntitySchema
>;
export type NewCommunityMembership = z.infer<
  typeof createcommunityMembershipsSchema
>;
export type CommunityMembershipCreate = z.infer<
  typeof createcommunityMembershipsSchema
>;
export type CommunityMembershipUpdate = z.infer<
  typeof updatecommunityMembershipsSchema
>;
export type CommunityMembershipResponse = z.infer<
  typeof communityMembershipsEntitySchema
>;

export type CommunityPostVote = z.infer<typeof communityPostVotesEntitySchema>;
export type NewCommunityPostVote = z.infer<
  typeof createcommunityPostVotesSchema
>;
export type CommunityPostVoteCreate = z.infer<
  typeof createcommunityPostVotesSchema
>;
export type CommunityPostVoteUpdate = z.infer<
  typeof updatecommunityPostVotesSchema
>;
export type CommunityPostVoteResponse = z.infer<
  typeof communityPostVotesEntitySchema
>;

export type Collaboration = z.infer<typeof collaborationsEntitySchema>;
export type NewCollaboration = z.infer<typeof createcollaborationsSchema>;
export type CollaborationCreate = z.infer<typeof createcollaborationsSchema>;
export type CollaborationUpdate = z.infer<typeof updatecollaborationsSchema>;
export type CollaborationResponse = z.infer<typeof collaborationsEntitySchema>;

export type AiConversation = z.infer<typeof aiConversationsEntitySchema>;
export type NewAiConversation = z.infer<typeof createaiConversationsSchema>;
export type AiConversationCreate = z.infer<typeof createaiConversationsSchema>;
export type AiConversationUpdate = z.infer<typeof updateaiConversationsSchema>;
export type AiConversationResponse = z.infer<
  typeof aiConversationsEntitySchema
>;

export type AiMessage = z.infer<typeof aiMessagesEntitySchema>;
export type NewAiMessage = z.infer<typeof createaiMessagesSchema>;
export type AiMessageCreate = z.infer<typeof createaiMessagesSchema>;
export type AiMessageUpdate = z.infer<typeof updateaiMessagesSchema>;
export type AiMessageResponse = z.infer<typeof aiMessagesEntitySchema>;

export type AiContentJob = z.infer<typeof aiContentJobsEntitySchema>;
export type NewAiContentJob = z.infer<typeof createaiContentJobsSchema>;
export type AiContentJobCreate = z.infer<typeof createaiContentJobsSchema>;
export type AiContentJobUpdate = z.infer<typeof updateaiContentJobsSchema>;
export type AiContentJobResponse = z.infer<typeof aiContentJobsEntitySchema>;

export type AiCrossReferenceSuggestion = z.infer<
  typeof aiCrossReferenceSuggestionsEntitySchema
>;
export type NewAiCrossReferenceSuggestion = z.infer<
  typeof createaiCrossReferenceSuggestionsSchema
>;
export type AiCrossReferenceSuggestionCreate = z.infer<
  typeof createaiCrossReferenceSuggestionsSchema
>;
export type AiCrossReferenceSuggestionUpdate = z.infer<
  typeof updateaiCrossReferenceSuggestionsSchema
>;
export type AiCrossReferenceSuggestionResponse = z.infer<
  typeof aiCrossReferenceSuggestionsEntitySchema
>;

export type TheologicalConcept = z.infer<
  typeof theologicalConceptsEntitySchema
>;
export type NewTheologicalConcept = z.infer<
  typeof createtheologicalConceptsSchema
>;
export type TheologicalConceptCreate = z.infer<
  typeof createtheologicalConceptsSchema
>;
export type TheologicalConceptUpdate = z.infer<
  typeof updatetheologicalConceptsSchema
>;
export type TheologicalConceptResponse = z.infer<
  typeof theologicalConceptsEntitySchema
>;

export type UserAnalyticsEvent = z.infer<
  typeof userAnalyticsEventsEntitySchema
>;
export type NewUserAnalyticsEvent = z.infer<
  typeof createuserAnalyticsEventsSchema
>;
export type UserAnalyticsEventCreate = z.infer<
  typeof createuserAnalyticsEventsSchema
>;
export type UserAnalyticsEventUpdate = z.infer<
  typeof updateuserAnalyticsEventsSchema
>;
export type UserAnalyticsEventResponse = z.infer<
  typeof userAnalyticsEventsEntitySchema
>;

export type UserContentInteraction = z.infer<
  typeof userContentInteractionsEntitySchema
>;
export type NewUserContentInteraction = z.infer<
  typeof createuserContentInteractionsSchema
>;
export type UserContentInteractionCreate = z.infer<
  typeof createuserContentInteractionsSchema
>;
export type UserContentInteractionUpdate = z.infer<
  typeof updateuserContentInteractionsSchema
>;
export type UserContentInteractionResponse = z.infer<
  typeof userContentInteractionsEntitySchema
>;

export type LearningOutcome = z.infer<typeof learningOutcomesEntitySchema>;
export type NewLearningOutcome = z.infer<typeof createlearningOutcomesSchema>;
export type LearningOutcomeCreate = z.infer<
  typeof createlearningOutcomesSchema
>;
export type LearningOutcomeUpdate = z.infer<
  typeof updatelearningOutcomesSchema
>;
export type LearningOutcomeResponse = z.infer<
  typeof learningOutcomesEntitySchema
>;

export type MovementMetric = z.infer<typeof movementMetricsEntitySchema>;
export type NewMovementMetric = z.infer<typeof createmovementMetricsSchema>;
export type MovementMetricCreate = z.infer<typeof createmovementMetricsSchema>;
export type MovementMetricUpdate = z.infer<typeof updatemovementMetricsSchema>;
export type MovementMetricResponse = z.infer<
  typeof movementMetricsEntitySchema
>;

export type PerformanceReport = z.infer<typeof performanceReportsEntitySchema>;
export type NewPerformanceReport = z.infer<
  typeof createperformanceReportsSchema
>;
export type PerformanceReportCreate = z.infer<
  typeof createperformanceReportsSchema
>;
export type PerformanceReportUpdate = z.infer<
  typeof updateperformanceReportsSchema
>;
export type PerformanceReportResponse = z.infer<
  typeof performanceReportsEntitySchema
>;

export type AuditLog = z.infer<typeof auditLogsEntitySchema>;
export type NewAuditLog = z.infer<typeof createauditLogsSchema>;
export type AuditLogCreate = z.infer<typeof createauditLogsSchema>;
export type AuditLogUpdate = z.infer<typeof updateauditLogsSchema>;
export type AuditLogResponse = z.infer<typeof auditLogsEntitySchema>;

export type FeatureFlag = z.infer<typeof featureFlagsEntitySchema>;
export type NewFeatureFlag = z.infer<typeof createfeatureFlagsSchema>;
export type FeatureFlagCreate = z.infer<typeof createfeatureFlagsSchema>;
export type FeatureFlagUpdate = z.infer<typeof updatefeatureFlagsSchema>;
export type FeatureFlagResponse = z.infer<typeof featureFlagsEntitySchema>;

export type UserFeatureFlag = z.infer<typeof userFeatureFlagsEntitySchema>;
export type NewUserFeatureFlag = z.infer<typeof createuserFeatureFlagsSchema>;
export type UserFeatureFlagCreate = z.infer<
  typeof createuserFeatureFlagsSchema
>;
export type UserFeatureFlagUpdate = z.infer<
  typeof updateuserFeatureFlagsSchema
>;
export type UserFeatureFlagResponse = z.infer<
  typeof userFeatureFlagsEntitySchema
>;

export type UserConsent = z.infer<typeof userConsentsEntitySchema>;
export type NewUserConsent = z.infer<typeof createuserConsentsSchema>;
export type UserConsentCreate = z.infer<typeof createuserConsentsSchema>;
export type UserConsentUpdate = z.infer<typeof updateuserConsentsSchema>;
export type UserConsentResponse = z.infer<typeof userConsentsEntitySchema>;

export type SystemNotification = z.infer<
  typeof systemNotificationsEntitySchema
>;
export type NewSystemNotification = z.infer<
  typeof createsystemNotificationsSchema
>;
export type SystemNotificationCreate = z.infer<
  typeof createsystemNotificationsSchema
>;
export type SystemNotificationUpdate = z.infer<
  typeof updatesystemNotificationsSchema
>;
export type SystemNotificationResponse = z.infer<
  typeof systemNotificationsEntitySchema
>;

export type UserNotificationStatus = z.infer<
  typeof userNotificationStatusEntitySchema
>;
export type NewUserNotificationStatus = z.infer<
  typeof createuserNotificationStatusSchema
>;
export type UserNotificationStatusCreate = z.infer<
  typeof createuserNotificationStatusSchema
>;
export type UserNotificationStatusUpdate = z.infer<
  typeof updateuserNotificationStatusSchema
>;
export type UserNotificationStatusResponse = z.infer<
  typeof userNotificationStatusEntitySchema
>;

export type ApiKey = z.infer<typeof apiKeysEntitySchema>;
export type NewApiKey = z.infer<typeof createapiKeysSchema>;
export type ApiKeyCreate = z.infer<typeof createapiKeysSchema>;
export type ApiKeyUpdate = z.infer<typeof updateapiKeysSchema>;
export type ApiKeyResponse = z.infer<typeof apiKeysEntitySchema>;

// Generic Content DTOs (aliases for ContentItem)
export type Content = ContentItem;
export type NewContent = NewContentItem;
export type ContentCreate = ContentItemCreate;
export type ContentUpdate = ContentItemUpdate;
export type ContentResponse = ContentItemResponse;

// Generic Auth DTOs (aliases for User)
export type Auth = UserProfile;
export type NewAuth = NewUserProfile;
export type AuthCreate = UserProfileCreate;
export type AuthUpdate = UserProfileUpdate;
export type AuthResponse = UserProfileResponse;
