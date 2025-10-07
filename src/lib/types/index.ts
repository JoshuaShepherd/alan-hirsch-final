// Main types barrel for Alan Hirsch Digital Platform
// This file re-exports inferred Zod types from contracts
// Generated at: 2025-01-27T00:00:00.000Z

import { z } from 'zod';

// Import Drizzle schema tables for type inference
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
} from '@/lib/database/db/schema';

// Import all contract schemas
import * as AiContentJobContract from '@/lib/contracts/ai-content-job.contract';
import * as AiConversationContract from '@/lib/contracts/ai-conversation.contract';
import * as AiCrossReferenceSuggestionContract from '@/lib/contracts/ai-cross-reference-suggestion.contract';
import * as AiMessageContract from '@/lib/contracts/ai-message.contract';
import * as ApiKeyContract from '@/lib/contracts/api-key.contract';
import * as AssessmentQuestionContract from '@/lib/contracts/assessment-question.contract';
import * as AssessmentResponseContract from '@/lib/contracts/assessment-response.contract';
import * as AssessmentContract from '@/lib/contracts/assessment.contract';
import * as AuditLogContract from '@/lib/contracts/audit-log.contract';
import * as CollaborationContract from '@/lib/contracts/collaboration.contract';
import * as CommunityMembershipContract from '@/lib/contracts/community-membership.contract';
import * as CommunityPostVoteContract from '@/lib/contracts/community-post-vote.contract';
import * as CommunityPostContract from '@/lib/contracts/community-post.contract';
import * as CommunityContract from '@/lib/contracts/community.contract';
import * as ContentCategoryContract from '@/lib/contracts/content-category.contract';
import * as ContentCrossReferenceContract from '@/lib/contracts/content-cross-reference.contract';
import * as ContentItemContract from '@/lib/contracts/content-item.contract';
import * as ContentSeriesContract from '@/lib/contracts/content-series.contract';
import * as CouponContract from '@/lib/contracts/coupon.contract';
import * as FeatureFlagContract from '@/lib/contracts/feature-flag.contract';
import * as LearningOutcomeContract from '@/lib/contracts/learning-outcome.contract';
import * as MovementMetricContract from '@/lib/contracts/movement-metric.contract';
import * as OrganizationMembershipContract from '@/lib/contracts/organization-membership.contract';
import * as OrganizationContract from '@/lib/contracts/organization.contract';
import * as PaymentMethodContract from '@/lib/contracts/payment-method.contract';
import * as PerformanceReportContract from '@/lib/contracts/performance-report.contract';
import * as SeriesContentItemContract from '@/lib/contracts/series-content-item.contract';
import * as SubscriptionPlanContract from '@/lib/contracts/subscription-plan.contract';
import * as SystemNotificationContract from '@/lib/contracts/system-notification.contract';
import * as TheologicalConceptContract from '@/lib/contracts/theological-concept.contract';
import * as TransactionContract from '@/lib/contracts/transaction.contract';
import * as UserAnalyticsEventContract from '@/lib/contracts/user-analytics-event.contract';
import * as UserAssessmentContract from '@/lib/contracts/user-assessment.contract';
import * as UserConsentContract from '@/lib/contracts/user-consent.contract';
import * as UserContentInteractionContract from '@/lib/contracts/user-content-interaction.contract';
import * as UserFeatureFlagContract from '@/lib/contracts/user-feature-flag.contract';
import * as UserNotificationStatusContract from '@/lib/contracts/user-notification-status.contract';
import * as UserProfileContract from '@/lib/contracts/user-profile.contract';
import * as UserSubscriptionContract from '@/lib/contracts/user-subscription.contract';

// ============================================================================
// DRIZZLE INFERRED TYPES (Select/Insert/Update)
// ============================================================================

// User Profile Drizzle Types
export type UserProfilesSelect = typeof userProfiles.$inferSelect;
export type UserProfilesInsert = typeof userProfiles.$inferInsert;
export type UserProfilesUpdate = Partial<UserProfilesInsert>;

// Organization Drizzle Types
export type OrganizationsSelect = typeof organizations.$inferSelect;
export type OrganizationsInsert = typeof organizations.$inferInsert;
export type OrganizationsUpdate = Partial<OrganizationsInsert>;

// Organization Membership Drizzle Types
export type OrganizationMembershipsSelect =
  typeof organizationMemberships.$inferSelect;
export type OrganizationMembershipsInsert =
  typeof organizationMemberships.$inferInsert;
export type OrganizationMembershipsUpdate =
  Partial<OrganizationMembershipsInsert>;

// Assessment Drizzle Types
export type AssessmentsSelect = typeof assessments.$inferSelect;
export type AssessmentsInsert = typeof assessments.$inferInsert;
export type AssessmentsUpdate = Partial<AssessmentsInsert>;

export type AssessmentQuestionsSelect = typeof assessmentQuestions.$inferSelect;
export type AssessmentQuestionsInsert = typeof assessmentQuestions.$inferInsert;
export type AssessmentQuestionsUpdate = Partial<AssessmentQuestionsInsert>;

export type AssessmentResponsesSelect = typeof assessmentResponses.$inferSelect;
export type AssessmentResponsesInsert = typeof assessmentResponses.$inferInsert;
export type AssessmentResponsesUpdate = Partial<AssessmentResponsesInsert>;

export type UserAssessmentsSelect = typeof userAssessments.$inferSelect;
export type UserAssessmentsInsert = typeof userAssessments.$inferInsert;
export type UserAssessmentsUpdate = Partial<UserAssessmentsInsert>;

// Content Drizzle Types
export type ContentCategoriesSelect = typeof contentCategories.$inferSelect;
export type ContentCategoriesInsert = typeof contentCategories.$inferInsert;
export type ContentCategoriesUpdate = Partial<ContentCategoriesInsert>;

export type ContentSeriesSelect = typeof contentSeries.$inferSelect;
export type ContentSeriesInsert = typeof contentSeries.$inferInsert;
export type ContentSeriesUpdate = Partial<ContentSeriesInsert>;

export type ContentItemsSelect = typeof contentItems.$inferSelect;
export type ContentItemsInsert = typeof contentItems.$inferInsert;
export type ContentItemsUpdate = Partial<ContentItemsInsert>;

export type SeriesContentItemsSelect = typeof seriesContentItems.$inferSelect;
export type SeriesContentItemsInsert = typeof seriesContentItems.$inferInsert;
export type SeriesContentItemsUpdate = Partial<SeriesContentItemsInsert>;

export type ContentCrossReferencesSelect =
  typeof contentCrossReferences.$inferSelect;
export type ContentCrossReferencesInsert =
  typeof contentCrossReferences.$inferInsert;
export type ContentCrossReferencesUpdate =
  Partial<ContentCrossReferencesInsert>;

// Community Drizzle Types
export type CommunitiesSelect = typeof communities.$inferSelect;
export type CommunitiesInsert = typeof communities.$inferInsert;
export type CommunitiesUpdate = Partial<CommunitiesInsert>;

export type CommunityMembershipsSelect =
  typeof communityMemberships.$inferSelect;
export type CommunityMembershipsInsert =
  typeof communityMemberships.$inferInsert;
export type CommunityMembershipsUpdate = Partial<CommunityMembershipsInsert>;

export type CommunityPostsSelect = typeof communityPosts.$inferSelect;
export type CommunityPostsInsert = typeof communityPosts.$inferInsert;
export type CommunityPostsUpdate = Partial<CommunityPostsInsert>;

export type CommunityPostVotesSelect = typeof communityPostVotes.$inferSelect;
export type CommunityPostVotesInsert = typeof communityPostVotes.$inferInsert;
export type CommunityPostVotesUpdate = Partial<CommunityPostVotesInsert>;

export type CollaborationsSelect = typeof collaborations.$inferSelect;
export type CollaborationsInsert = typeof collaborations.$inferInsert;
export type CollaborationsUpdate = Partial<CollaborationsInsert>;

// Subscription Drizzle Types
export type SubscriptionPlansSelect = typeof subscriptionPlans.$inferSelect;
export type SubscriptionPlansInsert = typeof subscriptionPlans.$inferInsert;
export type SubscriptionPlansUpdate = Partial<SubscriptionPlansInsert>;

export type UserSubscriptionsSelect = typeof userSubscriptions.$inferSelect;
export type UserSubscriptionsInsert = typeof userSubscriptions.$inferInsert;
export type UserSubscriptionsUpdate = Partial<UserSubscriptionsInsert>;

// Payment Drizzle Types
export type TransactionsSelect = typeof transactions.$inferSelect;
export type TransactionsInsert = typeof transactions.$inferInsert;
export type TransactionsUpdate = Partial<TransactionsInsert>;

export type PaymentMethodsSelect = typeof paymentMethods.$inferSelect;
export type PaymentMethodsInsert = typeof paymentMethods.$inferInsert;
export type PaymentMethodsUpdate = Partial<PaymentMethodsInsert>;

export type CouponsSelect = typeof coupons.$inferSelect;
export type CouponsInsert = typeof coupons.$inferInsert;
export type CouponsUpdate = Partial<CouponsInsert>;

// Analytics Drizzle Types
export type UserAnalyticsEventsSelect = typeof userAnalyticsEvents.$inferSelect;
export type UserAnalyticsEventsInsert = typeof userAnalyticsEvents.$inferInsert;
export type UserAnalyticsEventsUpdate = Partial<UserAnalyticsEventsInsert>;

export type UserContentInteractionsSelect =
  typeof userContentInteractions.$inferSelect;
export type UserContentInteractionsInsert =
  typeof userContentInteractions.$inferInsert;
export type UserContentInteractionsUpdate =
  Partial<UserContentInteractionsInsert>;

export type LearningOutcomesSelect = typeof learningOutcomes.$inferSelect;
export type LearningOutcomesInsert = typeof learningOutcomes.$inferInsert;
export type LearningOutcomesUpdate = Partial<LearningOutcomesInsert>;

export type MovementMetricsSelect = typeof movementMetrics.$inferSelect;
export type MovementMetricsInsert = typeof movementMetrics.$inferInsert;
export type MovementMetricsUpdate = Partial<MovementMetricsInsert>;

export type PerformanceReportsSelect = typeof performanceReports.$inferSelect;
export type PerformanceReportsInsert = typeof performanceReports.$inferInsert;
export type PerformanceReportsUpdate = Partial<PerformanceReportsInsert>;

// System Drizzle Types
export type AuditLogsSelect = typeof auditLogs.$inferSelect;
export type AuditLogsInsert = typeof auditLogs.$inferInsert;
export type AuditLogsUpdate = Partial<AuditLogsInsert>;

export type FeatureFlagsSelect = typeof featureFlags.$inferSelect;
export type FeatureFlagsInsert = typeof featureFlags.$inferInsert;
export type FeatureFlagsUpdate = Partial<FeatureFlagsInsert>;

export type UserFeatureFlagsSelect = typeof userFeatureFlags.$inferSelect;
export type UserFeatureFlagsInsert = typeof userFeatureFlags.$inferInsert;
export type UserFeatureFlagsUpdate = Partial<UserFeatureFlagsInsert>;

export type UserConsentsSelect = typeof userConsents.$inferSelect;
export type UserConsentsInsert = typeof userConsents.$inferInsert;
export type UserConsentsUpdate = Partial<UserConsentsInsert>;

export type SystemNotificationsSelect = typeof systemNotifications.$inferSelect;
export type SystemNotificationsInsert = typeof systemNotifications.$inferInsert;
export type SystemNotificationsUpdate = Partial<SystemNotificationsInsert>;

export type UserNotificationStatusSelect =
  typeof userNotificationStatus.$inferSelect;
export type UserNotificationStatusInsert =
  typeof userNotificationStatus.$inferInsert;
export type UserNotificationStatusUpdate =
  Partial<UserNotificationStatusInsert>;

export type ApiKeysSelect = typeof apiKeys.$inferSelect;
export type ApiKeysInsert = typeof apiKeys.$inferInsert;
export type ApiKeysUpdate = Partial<ApiKeysInsert>;

// AI Drizzle Types
export type AiConversationsSelect = typeof aiConversations.$inferSelect;
export type AiConversationsInsert = typeof aiConversations.$inferInsert;
export type AiConversationsUpdate = Partial<AiConversationsInsert>;

export type AiMessagesSelect = typeof aiMessages.$inferSelect;
export type AiMessagesInsert = typeof aiMessages.$inferInsert;
export type AiMessagesUpdate = Partial<AiMessagesInsert>;

export type AiContentJobsSelect = typeof aiContentJobs.$inferSelect;
export type AiContentJobsInsert = typeof aiContentJobs.$inferInsert;
export type AiContentJobsUpdate = Partial<AiContentJobsInsert>;

export type AiCrossReferenceSuggestionsSelect =
  typeof aiCrossReferenceSuggestions.$inferSelect;
export type AiCrossReferenceSuggestionsInsert =
  typeof aiCrossReferenceSuggestions.$inferInsert;
export type AiCrossReferenceSuggestionsUpdate =
  Partial<AiCrossReferenceSuggestionsInsert>;

export type TheologicalConceptsSelect = typeof theologicalConcepts.$inferSelect;
export type TheologicalConceptsInsert = typeof theologicalConcepts.$inferInsert;
export type TheologicalConceptsUpdate = Partial<TheologicalConceptsInsert>;

// ============================================================================
// USER PROFILE TYPES
// ============================================================================
export type UserProfile = z.infer<
  typeof UserProfileContract.UserProfileResponseSchema
>;
export type NewUserProfile = z.infer<
  typeof UserProfileContract.UserProfileCreateSchema
>;
export type UpdateUserProfile = z.infer<
  typeof UserProfileContract.UserProfileUpdateSchema
>;
export type UserProfileListResponse = z.infer<
  typeof UserProfileContract.UserProfileListResponseSchema
>;

// ============================================================================
// ORGANIZATION TYPES
// ============================================================================
export type Organization = z.infer<
  typeof OrganizationContract.OrganizationResponseSchema
>;
export type NewOrganization = z.infer<
  typeof OrganizationContract.OrganizationCreateSchema
>;
export type UpdateOrganization = z.infer<
  typeof OrganizationContract.OrganizationUpdateSchema
>;
export type OrganizationListResponse = z.infer<
  typeof OrganizationContract.OrganizationListResponseSchema
>;

export type OrganizationMembership = z.infer<
  typeof OrganizationMembershipContract.OrganizationMembershipResponseSchema
>;
export type NewOrganizationMembership = z.infer<
  typeof OrganizationMembershipContract.OrganizationMembershipCreateSchema
>;
export type UpdateOrganizationMembership = z.infer<
  typeof OrganizationMembershipContract.OrganizationMembershipUpdateSchema
>;
export type OrganizationMembershipListResponse = z.infer<
  typeof OrganizationMembershipContract.OrganizationMembershipListResponseSchema
>;

// ============================================================================
// ASSESSMENT TYPES
// ============================================================================
export type Assessment = z.infer<
  typeof AssessmentContract.AssessmentResponseSchema
>;
export type NewAssessment = z.infer<
  typeof AssessmentContract.AssessmentCreateSchema
>;
export type UpdateAssessment = z.infer<
  typeof AssessmentContract.AssessmentUpdateSchema
>;
export type AssessmentListResponse = z.infer<
  typeof AssessmentContract.AssessmentListResponseSchema
>;

export type AssessmentQuestion = z.infer<
  typeof AssessmentQuestionContract.AssessmentQuestionResponseSchema
>;
export type NewAssessmentQuestion = z.infer<
  typeof AssessmentQuestionContract.AssessmentQuestionCreateSchema
>;
export type UpdateAssessmentQuestion = z.infer<
  typeof AssessmentQuestionContract.AssessmentQuestionUpdateSchema
>;
export type AssessmentQuestionListResponse = z.infer<
  typeof AssessmentQuestionContract.AssessmentQuestionListResponseSchema
>;

export type UserAssessment = z.infer<
  typeof UserAssessmentContract.UserAssessmentResponseSchema
>;
export type NewUserAssessment = z.infer<
  typeof UserAssessmentContract.UserAssessmentCreateSchema
>;
export type UpdateUserAssessment = z.infer<
  typeof UserAssessmentContract.UserAssessmentUpdateSchema
>;
export type UserAssessmentListResponse = z.infer<
  typeof UserAssessmentContract.UserAssessmentListResponseSchema
>;

export type AssessmentResponse = z.infer<
  typeof AssessmentResponseContract.AssessmentResponseResponseSchema
>;
export type NewAssessmentResponse = z.infer<
  typeof AssessmentResponseContract.AssessmentResponseCreateSchema
>;
export type UpdateAssessmentResponse = z.infer<
  typeof AssessmentResponseContract.AssessmentResponseUpdateSchema
>;
export type AssessmentResponseListResponse = z.infer<
  typeof AssessmentResponseContract.AssessmentResponseListResponseSchema
>;

// ============================================================================
// CONTENT TYPES
// ============================================================================
export type ContentCategory = z.infer<
  typeof ContentCategoryContract.ContentCategoryResponseSchema
>;
export type NewContentCategory = z.infer<
  typeof ContentCategoryContract.ContentCategoryCreateSchema
>;
export type UpdateContentCategory = z.infer<
  typeof ContentCategoryContract.ContentCategoryUpdateSchema
>;
export type ContentCategoryListResponse = z.infer<
  typeof ContentCategoryContract.ContentCategoryListResponseSchema
>;

export type ContentSeries = z.infer<
  typeof ContentSeriesContract.ContentSeriesResponseSchema
>;
export type NewContentSeries = z.infer<
  typeof ContentSeriesContract.ContentSeriesCreateSchema
>;
export type UpdateContentSeries = z.infer<
  typeof ContentSeriesContract.ContentSeriesUpdateSchema
>;
export type ContentSeriesListResponse = z.infer<
  typeof ContentSeriesContract.ContentSeriesListResponseSchema
>;

export type ContentItem = z.infer<
  typeof ContentItemContract.ContentItemResponseSchema
>;
export type NewContentItem = z.infer<
  typeof ContentItemContract.ContentItemCreateSchema
>;
export type UpdateContentItem = z.infer<
  typeof ContentItemContract.ContentItemUpdateSchema
>;
export type ContentItemListResponse = z.infer<
  typeof ContentItemContract.ContentItemListResponseSchema
>;

export type SeriesContentItem = z.infer<
  typeof SeriesContentItemContract.SeriesContentItemResponseSchema
>;
export type NewSeriesContentItem = z.infer<
  typeof SeriesContentItemContract.SeriesContentItemCreateSchema
>;
export type UpdateSeriesContentItem = z.infer<
  typeof SeriesContentItemContract.SeriesContentItemUpdateSchema
>;
export type SeriesContentItemListResponse = z.infer<
  typeof SeriesContentItemContract.SeriesContentItemListResponseSchema
>;

export type ContentCrossReference = z.infer<
  typeof ContentCrossReferenceContract.ContentCrossReferenceResponseSchema
>;
export type NewContentCrossReference = z.infer<
  typeof ContentCrossReferenceContract.ContentCrossReferenceCreateSchema
>;
export type UpdateContentCrossReference = z.infer<
  typeof ContentCrossReferenceContract.ContentCrossReferenceUpdateSchema
>;
export type ContentCrossReferenceListResponse = z.infer<
  typeof ContentCrossReferenceContract.ContentCrossReferenceListResponseSchema
>;

// ============================================================================
// COMMUNITY TYPES
// ============================================================================
export type Community = z.infer<
  typeof CommunityContract.CommunityResponseSchema
>;
export type NewCommunity = z.infer<
  typeof CommunityContract.CommunityCreateSchema
>;
export type UpdateCommunity = z.infer<
  typeof CommunityContract.CommunityUpdateSchema
>;
export type CommunityListResponse = z.infer<
  typeof CommunityContract.CommunityListResponseSchema
>;

export type CommunityMembership = z.infer<
  typeof CommunityMembershipContract.CommunityMembershipResponseSchema
>;
export type NewCommunityMembership = z.infer<
  typeof CommunityMembershipContract.CommunityMembershipCreateSchema
>;
export type UpdateCommunityMembership = z.infer<
  typeof CommunityMembershipContract.CommunityMembershipUpdateSchema
>;
export type CommunityMembershipListResponse = z.infer<
  typeof CommunityMembershipContract.CommunityMembershipListResponseSchema
>;

export type CommunityPost = z.infer<
  typeof CommunityPostContract.CommunityPostResponseSchema
>;
export type NewCommunityPost = z.infer<
  typeof CommunityPostContract.CommunityPostCreateSchema
>;
export type UpdateCommunityPost = z.infer<
  typeof CommunityPostContract.CommunityPostUpdateSchema
>;
export type CommunityPostListResponse = z.infer<
  typeof CommunityPostContract.CommunityPostListResponseSchema
>;

export type CommunityPostVote = z.infer<
  typeof CommunityPostVoteContract.CommunityPostVoteResponseSchema
>;
export type NewCommunityPostVote = z.infer<
  typeof CommunityPostVoteContract.CommunityPostVoteCreateSchema
>;
export type UpdateCommunityPostVote = z.infer<
  typeof CommunityPostVoteContract.CommunityPostVoteUpdateSchema
>;
export type CommunityPostVoteListResponse = z.infer<
  typeof CommunityPostVoteContract.CommunityPostVoteListResponseSchema
>;

export type Collaboration = z.infer<
  typeof CollaborationContract.CollaborationResponseSchema
>;
export type NewCollaboration = z.infer<
  typeof CollaborationContract.CollaborationCreateSchema
>;
export type UpdateCollaboration = z.infer<
  typeof CollaborationContract.CollaborationUpdateSchema
>;
export type CollaborationListResponse = z.infer<
  typeof CollaborationContract.CollaborationListResponseSchema
>;

// ============================================================================
// SUBSCRIPTION TYPES
// ============================================================================
export type SubscriptionPlan = z.infer<
  typeof SubscriptionPlanContract.SubscriptionPlanResponseSchema
>;
export type NewSubscriptionPlan = z.infer<
  typeof SubscriptionPlanContract.SubscriptionPlanCreateSchema
>;
export type UpdateSubscriptionPlan = z.infer<
  typeof SubscriptionPlanContract.SubscriptionPlanUpdateSchema
>;
export type SubscriptionPlanListResponse = z.infer<
  typeof SubscriptionPlanContract.SubscriptionPlanListResponseSchema
>;

export type UserSubscription = z.infer<
  typeof UserSubscriptionContract.UserSubscriptionResponseSchema
>;
export type NewUserSubscription = z.infer<
  typeof UserSubscriptionContract.UserSubscriptionCreateSchema
>;
export type UpdateUserSubscription = z.infer<
  typeof UserSubscriptionContract.UserSubscriptionUpdateSchema
>;
export type UserSubscriptionListResponse = z.infer<
  typeof UserSubscriptionContract.UserSubscriptionListResponseSchema
>;

// ============================================================================
// PAYMENT TYPES
// ============================================================================
export type Transaction = z.infer<
  typeof TransactionContract.TransactionResponseSchema
>;
export type NewTransaction = z.infer<
  typeof TransactionContract.TransactionCreateSchema
>;
export type UpdateTransaction = z.infer<
  typeof TransactionContract.TransactionUpdateSchema
>;
export type TransactionListResponse = z.infer<
  typeof TransactionContract.TransactionListResponseSchema
>;

export type PaymentMethod = z.infer<
  typeof PaymentMethodContract.PaymentMethodResponseSchema
>;
export type NewPaymentMethod = z.infer<
  typeof PaymentMethodContract.PaymentMethodCreateSchema
>;
export type UpdatePaymentMethod = z.infer<
  typeof PaymentMethodContract.PaymentMethodUpdateSchema
>;
export type PaymentMethodListResponse = z.infer<
  typeof PaymentMethodContract.PaymentMethodListResponseSchema
>;

export type Coupon = z.infer<typeof CouponContract.CouponResponseSchema>;
export type NewCoupon = z.infer<typeof CouponContract.CouponCreateSchema>;
export type UpdateCoupon = z.infer<typeof CouponContract.CouponUpdateSchema>;
export type CouponListResponse = z.infer<
  typeof CouponContract.CouponListResponseSchema
>;

// ============================================================================
// ANALYTICS TYPES
// ============================================================================
export type UserAnalyticsEvent = z.infer<
  typeof UserAnalyticsEventContract.UserAnalyticsEventResponseSchema
>;
export type NewUserAnalyticsEvent = z.infer<
  typeof UserAnalyticsEventContract.UserAnalyticsEventCreateSchema
>;
export type UpdateUserAnalyticsEvent = z.infer<
  typeof UserAnalyticsEventContract.UserAnalyticsEventUpdateSchema
>;
export type UserAnalyticsEventListResponse = z.infer<
  typeof UserAnalyticsEventContract.UserAnalyticsEventListResponseSchema
>;

export type UserContentInteraction = z.infer<
  typeof UserContentInteractionContract.UserContentInteractionResponseSchema
>;
export type NewUserContentInteraction = z.infer<
  typeof UserContentInteractionContract.UserContentInteractionCreateSchema
>;
export type UpdateUserContentInteraction = z.infer<
  typeof UserContentInteractionContract.UserContentInteractionUpdateSchema
>;
export type UserContentInteractionListResponse = z.infer<
  typeof UserContentInteractionContract.UserContentInteractionListResponseSchema
>;

export type LearningOutcome = z.infer<
  typeof LearningOutcomeContract.LearningOutcomeResponseSchema
>;
export type NewLearningOutcome = z.infer<
  typeof LearningOutcomeContract.LearningOutcomeCreateSchema
>;
export type UpdateLearningOutcome = z.infer<
  typeof LearningOutcomeContract.LearningOutcomeUpdateSchema
>;
export type LearningOutcomeListResponse = z.infer<
  typeof LearningOutcomeContract.LearningOutcomeListResponseSchema
>;

export type MovementMetric = z.infer<
  typeof MovementMetricContract.MovementMetricResponseSchema
>;
export type NewMovementMetric = z.infer<
  typeof MovementMetricContract.MovementMetricCreateSchema
>;
export type UpdateMovementMetric = z.infer<
  typeof MovementMetricContract.MovementMetricUpdateSchema
>;
export type MovementMetricListResponse = z.infer<
  typeof MovementMetricContract.MovementMetricListResponseSchema
>;

export type PerformanceReport = z.infer<
  typeof PerformanceReportContract.PerformanceReportResponseSchema
>;
export type NewPerformanceReport = z.infer<
  typeof PerformanceReportContract.PerformanceReportCreateSchema
>;
export type UpdatePerformanceReport = z.infer<
  typeof PerformanceReportContract.PerformanceReportUpdateSchema
>;
export type PerformanceReportListResponse = z.infer<
  typeof PerformanceReportContract.PerformanceReportListResponseSchema
>;

// ============================================================================
// SYSTEM TYPES
// ============================================================================
export type AuditLog = z.infer<typeof AuditLogContract.AuditLogResponseSchema>;
export type NewAuditLog = z.infer<typeof AuditLogContract.AuditLogCreateSchema>;
export type UpdateAuditLog = z.infer<
  typeof AuditLogContract.AuditLogUpdateSchema
>;
export type AuditLogListResponse = z.infer<
  typeof AuditLogContract.AuditLogListResponseSchema
>;

export type FeatureFlag = z.infer<
  typeof FeatureFlagContract.FeatureFlagResponseSchema
>;
export type NewFeatureFlag = z.infer<
  typeof FeatureFlagContract.FeatureFlagCreateSchema
>;
export type UpdateFeatureFlag = z.infer<
  typeof FeatureFlagContract.FeatureFlagUpdateSchema
>;
export type FeatureFlagListResponse = z.infer<
  typeof FeatureFlagContract.FeatureFlagListResponseSchema
>;

export type UserFeatureFlag = z.infer<
  typeof UserFeatureFlagContract.UserFeatureFlagResponseSchema
>;
export type NewUserFeatureFlag = z.infer<
  typeof UserFeatureFlagContract.UserFeatureFlagCreateSchema
>;
export type UpdateUserFeatureFlag = z.infer<
  typeof UserFeatureFlagContract.UserFeatureFlagUpdateSchema
>;
export type UserFeatureFlagListResponse = z.infer<
  typeof UserFeatureFlagContract.UserFeatureFlagListResponseSchema
>;

export type UserConsent = z.infer<
  typeof UserConsentContract.UserConsentResponseSchema
>;
export type NewUserConsent = z.infer<
  typeof UserConsentContract.UserConsentCreateSchema
>;
export type UpdateUserConsent = z.infer<
  typeof UserConsentContract.UserConsentUpdateSchema
>;
export type UserConsentListResponse = z.infer<
  typeof UserConsentContract.UserConsentListResponseSchema
>;

export type SystemNotification = z.infer<
  typeof SystemNotificationContract.SystemNotificationResponseSchema
>;
export type NewSystemNotification = z.infer<
  typeof SystemNotificationContract.SystemNotificationCreateSchema
>;
export type UpdateSystemNotification = z.infer<
  typeof SystemNotificationContract.SystemNotificationUpdateSchema
>;
export type SystemNotificationListResponse = z.infer<
  typeof SystemNotificationContract.SystemNotificationListResponseSchema
>;

export type UserNotificationStatus = z.infer<
  typeof UserNotificationStatusContract.UserNotificationStatusResponseSchema
>;
export type NewUserNotificationStatus = z.infer<
  typeof UserNotificationStatusContract.UserNotificationStatusCreateSchema
>;
export type UpdateUserNotificationStatus = z.infer<
  typeof UserNotificationStatusContract.UserNotificationStatusUpdateSchema
>;
export type UserNotificationStatusListResponse = z.infer<
  typeof UserNotificationStatusContract.UserNotificationStatusListResponseSchema
>;

export type ApiKey = z.infer<typeof ApiKeyContract.ApiKeyResponseSchema>;
export type NewApiKey = z.infer<typeof ApiKeyContract.ApiKeyCreateSchema>;
export type UpdateApiKey = z.infer<typeof ApiKeyContract.ApiKeyUpdateSchema>;
export type ApiKeyListResponse = z.infer<
  typeof ApiKeyContract.ApiKeyListResponseSchema
>;

// ============================================================================
// AI TYPES
// ============================================================================
export type AiConversation = z.infer<
  typeof AiConversationContract.AiConversationResponseSchema
>;
export type NewAiConversation = z.infer<
  typeof AiConversationContract.AiConversationCreateSchema
>;
export type UpdateAiConversation = z.infer<
  typeof AiConversationContract.AiConversationUpdateSchema
>;
export type AiConversationListResponse = z.infer<
  typeof AiConversationContract.AiConversationListResponseSchema
>;

export type AiMessage = z.infer<
  typeof AiMessageContract.AiMessageResponseSchema
>;
export type NewAiMessage = z.infer<
  typeof AiMessageContract.AiMessageCreateSchema
>;
export type UpdateAiMessage = z.infer<
  typeof AiMessageContract.AiMessageUpdateSchema
>;
export type AiMessageListResponse = z.infer<
  typeof AiMessageContract.AiMessageListResponseSchema
>;

export type AiContentJob = z.infer<
  typeof AiContentJobContract.AiContentJobResponseSchema
>;
export type NewAiContentJob = z.infer<
  typeof AiContentJobContract.AiContentJobCreateSchema
>;
export type UpdateAiContentJob = z.infer<
  typeof AiContentJobContract.AiContentJobUpdateSchema
>;
export type AiContentJobListResponse = z.infer<
  typeof AiContentJobContract.AiContentJobListResponseSchema
>;

export type AiCrossReferenceSuggestion = z.infer<
  typeof AiCrossReferenceSuggestionContract.AiCrossReferenceSuggestionResponseSchema
>;
export type NewAiCrossReferenceSuggestion = z.infer<
  typeof AiCrossReferenceSuggestionContract.AiCrossReferenceSuggestionCreateSchema
>;
export type UpdateAiCrossReferenceSuggestion = z.infer<
  typeof AiCrossReferenceSuggestionContract.AiCrossReferenceSuggestionUpdateSchema
>;
export type AiCrossReferenceSuggestionListResponse = z.infer<
  typeof AiCrossReferenceSuggestionContract.AiCrossReferenceSuggestionListResponseSchema
>;

// ============================================================================
// THEOLOGICAL TYPES
// ============================================================================
export type TheologicalConcept = z.infer<
  typeof TheologicalConceptContract.TheologicalConceptResponseSchema
>;
export type NewTheologicalConcept = z.infer<
  typeof TheologicalConceptContract.TheologicalConceptCreateSchema
>;
export type UpdateTheologicalConcept = z.infer<
  typeof TheologicalConceptContract.TheologicalConceptUpdateSchema
>;
export type TheologicalConceptListResponse = z.infer<
  typeof TheologicalConceptContract.TheologicalConceptListResponseSchema
>;

// ============================================================================
// API RESPONSE TYPES
// ============================================================================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
}

// ============================================================================
export type ID = string;
export type Timestamp = Date;
export type JSON = any;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ============================================================================
// RE-EXPORT SCHEMAS FOR VALIDATION
// ============================================================================
// Re-export schemas for runtime validation when needed
export const Schemas = {
  UserProfile: UserProfileContract,
  Organization: OrganizationContract,
  OrganizationMembership: OrganizationMembershipContract,
  Assessment: AssessmentContract,
  AssessmentQuestion: AssessmentQuestionContract,
  UserAssessment: UserAssessmentContract,
  AssessmentResponse: AssessmentResponseContract,
  ContentCategory: ContentCategoryContract,
  ContentSeries: ContentSeriesContract,
  ContentItem: ContentItemContract,
  SeriesContentItem: SeriesContentItemContract,
  ContentCrossReference: ContentCrossReferenceContract,
  Community: CommunityContract,
  CommunityMembership: CommunityMembershipContract,
  CommunityPost: CommunityPostContract,
  CommunityPostVote: CommunityPostVoteContract,
  Collaboration: CollaborationContract,
  SubscriptionPlan: SubscriptionPlanContract,
  UserSubscription: UserSubscriptionContract,
  Transaction: TransactionContract,
  PaymentMethod: PaymentMethodContract,
  Coupon: CouponContract,
  UserAnalyticsEvent: UserAnalyticsEventContract,
  UserContentInteraction: UserContentInteractionContract,
  LearningOutcome: LearningOutcomeContract,
  MovementMetric: MovementMetricContract,
  PerformanceReport: PerformanceReportContract,
  AuditLog: AuditLogContract,
  FeatureFlag: FeatureFlagContract,
  UserFeatureFlag: UserFeatureFlagContract,
  UserConsent: UserConsentContract,
  SystemNotification: SystemNotificationContract,
  UserNotificationStatus: UserNotificationStatusContract,
  ApiKey: ApiKeyContract,
  AiConversation: AiConversationContract,
  AiMessage: AiMessageContract,
  AiContentJob: AiContentJobContract,
  AiCrossReferenceSuggestion: AiCrossReferenceSuggestionContract,
  TheologicalConcept: TheologicalConceptContract,
} as const;
