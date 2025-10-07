/**
 * Query Modules Index
 * Centralized exports for all query modules
 */

// Shared types are now exported from the context file

// Auth queries - stub version
export {
  createUser as createAuth,
  getUserById as getAuthById,
  getUserById as getAuthUserByEmail,
  listUsers as listAuths,
  deleteUser as removeAuth,
  updateUser as updateAuth,
  getUserById as validateCredentials,
} from './auth.queries';
export type {
  UserRow as AuthRow,
  NewUserRow as NewAuthRow,
} from './auth.queries';

// User queries - stub version
export {
  createUser,
  getUserById as getUserByEmail,
  getUserById,
  getUserById as getUserBySubdomain,
  listUsers,
  deleteUser as removeUser,
  updateUser,
  updateUser as updateUserLastActive,
} from './user.queries';
export type { NewUserRow, UserRow } from './user.queries';

// Organization queries - stub version
export {
  createOrganization,
  getOrganizationById,
  getOrganizationById as getOrganizationBySlug,
  listOrganizations as listOrganizationMembers,
  listOrganizations,
  deleteOrganization as removeOrganization,
  updateOrganization,
} from './organization.queries';
export type {
  NewOrganizationRow,
  OrganizationRow,
} from './organization.queries';

// Organization Membership queries
export {
  createOrganizationMembership,
  deleteOrganizationMembership,
  getOrganizationMembershipById,
  listOrganizationMemberships,
  updateOrganizationMembership,
} from './organization-membership.queries';
export type {
  NewOrganizationMembershipRow,
  OrganizationMembershipRow,
} from './organization-membership.queries';

// Assessment queries - stub version
export {
  createAssessment,
  getAssessmentById,
  getAssessmentById as getAssessmentBySlug,
  getAssessmentById as getQuestions,
  listAssessments,
  deleteAssessment as removeAssessment,
  updateAssessment,
} from './assessment.queries';
export type { AssessmentRow, NewAssessmentRow } from './assessment.queries';

// Assessment Question queries
export {
  createAssessmentQuestion,
  deleteAssessmentQuestion,
  getAssessmentQuestionById,
  listAssessmentQuestions,
  updateAssessmentQuestion,
} from './assessment-question.queries';
export type {
  AssessmentQuestionRow,
  NewAssessmentQuestionRow,
} from './assessment-question.queries';

// User Assessment queries
export {
  createUserAssessment,
  deleteUserAssessment,
  getUserAssessmentById,
  listUserAssessments,
  updateUserAssessment,
} from './user-assessment.queries';
export type {
  NewUserAssessmentRow,
  UserAssessmentRow,
} from './user-assessment.queries';

// Assessment Response queries
export {
  createAssessmentResponse,
  deleteAssessmentResponse,
  getAssessmentResponseById,
  listAssessmentResponses,
  updateAssessmentResponse,
} from './assessment-response.queries';
export type {
  AssessmentResponseRow,
  NewAssessmentResponseRow,
} from './assessment-response.queries';

// Content queries - stub version
export {
  createContent,
  getContentById,
  getContentById as getContentBySlug,
  listContents as listContentBySeries,
  listContents,
  deleteContent as removeContent,
  updateContent,
} from './content.queries';
export type { ContentRow, NewContentRow } from './content.queries';

// Content Category queries
export {
  createContentCategory,
  deleteContentCategory,
  getContentCategoryById,
  listContentCategories,
  updateContentCategory,
} from './content-category.queries';
export type {
  ContentCategoryRow,
  NewContentCategoryRow,
} from './content-category.queries';

// Content Series queries
export {
  createContentSeries,
  deleteContentSeries,
  getContentSeriesById,
  listContentSeries,
  updateContentSeries,
} from './content-series.queries';
export type {
  ContentSeriesRow,
  NewContentSeriesRow,
} from './content-series.queries';

// Series Content Item queries
export {
  createSeriesContentItem,
  deleteSeriesContentItem,
  getSeriesContentItemById,
  listSeriesContentItems,
  updateSeriesContentItem,
} from './series-content-item.queries';
export type {
  NewSeriesContentItemRow,
  SeriesContentItemRow,
} from './series-content-item.queries';

// Content Cross Reference queries
export {
  createContentCrossReference,
  deleteContentCrossReference,
  getContentCrossReferenceById,
  listContentCrossReferences,
  updateContentCrossReference,
} from './content-cross-reference.queries';
export type {
  ContentCrossReferenceRow,
  NewContentCrossReferenceRow,
} from './content-cross-reference.queries';

// AI Conversation queries
export {
  createAiConversation,
  deleteAiConversation,
  getAiConversationById,
  listAiConversations,
  updateAiConversation,
} from './ai-conversation.queries';
export type {
  AiConversationRow,
  NewAiConversationRow,
} from './ai-conversation.queries';

// AI Message queries
export {
  createAiMessage,
  deleteAiMessage,
  getAiMessageById,
  listAiMessages,
  updateAiMessage,
} from './ai-message.queries';
export type { AiMessageRow, NewAiMessageRow } from './ai-message.queries';

// AI Content Job queries
export {
  createAiContentJob,
  deleteAiContentJob,
  getAiContentJobById,
  listAiContentJobs,
  updateAiContentJob,
} from './ai-content-job.queries';
export type {
  AiContentJobRow,
  NewAiContentJobRow,
} from './ai-content-job.queries';

// AI Cross Reference Suggestion queries
export {
  createAiCrossReferenceSuggestion,
  deleteAiCrossReferenceSuggestion,
  getAiCrossReferenceSuggestionById,
  listAiCrossReferenceSuggestions,
  updateAiCrossReferenceSuggestion,
} from './ai-cross-reference-suggestion.queries';
export type {
  AiCrossReferenceSuggestionRow,
  NewAiCrossReferenceSuggestionRow,
} from './ai-cross-reference-suggestion.queries';

// Theological Concept queries
export {
  createTheologicalConcept,
  deleteTheologicalConcept,
  getTheologicalConceptById,
  listTheologicalConcepts,
  updateTheologicalConcept,
} from './theological-concept.queries';
export type {
  NewTheologicalConceptRow,
  TheologicalConceptRow,
} from './theological-concept.queries';

// Community queries - stub version
export {
  createCommunity,
  getCommunityById,
  getCommunityById as getCommunityBySlug,
  listCommunities,
  listCommunities as listPosts,
  deleteCommunity as removeCommunity,
  updateCommunity,
} from './community.queries';
export type { CommunityRow, NewCommunityRow } from './community.queries';

// Community Membership queries
export {
  createCommunityMembership,
  deleteCommunityMembership,
  getCommunityMembershipById,
  listCommunityMemberships,
  updateCommunityMembership,
} from './community-membership.queries';
export type {
  CommunityMembershipRow,
  NewCommunityMembershipRow,
} from './community-membership.queries';

// Community Post queries
export {
  createCommunityPost,
  deleteCommunityPost,
  getCommunityPostById,
  listCommunityPosts,
  updateCommunityPost,
} from './community-post.queries';
export type {
  CommunityPostRow,
  NewCommunityPostRow,
} from './community-post.queries';

// Community Post Vote queries
export {
  createCommunityPostVote,
  deleteCommunityPostVote,
  getCommunityPostVoteById,
  listCommunityPostVotes,
  updateCommunityPostVote,
} from './community-post-vote.queries';
export type {
  CommunityPostVoteRow,
  NewCommunityPostVoteRow,
} from './community-post-vote.queries';

// Collaboration queries
export {
  createCollaboration,
  deleteCollaboration,
  getCollaborationById,
  listCollaborations,
  updateCollaboration,
} from './collaboration.queries';
export type {
  CollaborationRow,
  NewCollaborationRow,
} from './collaboration.queries';

// Subscription Plan queries
export {
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  getSubscriptionPlanById,
  listSubscriptionPlans,
  updateSubscriptionPlan,
} from './subscription-plan.queries';
export type {
  NewSubscriptionPlanRow,
  SubscriptionPlanRow,
} from './subscription-plan.queries';

// User Subscription queries
export {
  createUserSubscription,
  deleteUserSubscription,
  getUserSubscriptionById,
  listUserSubscriptions,
  updateUserSubscription,
} from './user-subscription.queries';
export type {
  NewUserSubscriptionRow,
  UserSubscriptionRow,
} from './user-subscription.queries';

// Transaction queries
export {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  listTransactions,
  updateTransaction,
} from './transaction.queries';
export type { NewTransactionRow, TransactionRow } from './transaction.queries';

// Payment Method queries
export {
  createPaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
  listPaymentMethods,
  updatePaymentMethod,
} from './payment-method.queries';
export type {
  NewPaymentMethodRow,
  PaymentMethodRow,
} from './payment-method.queries';

// Coupon queries
export {
  createCoupon,
  deleteCoupon,
  getCouponById,
  listCoupons,
  updateCoupon,
} from './coupon.queries';
export type { CouponRow, NewCouponRow } from './coupon.queries';

// User Analytics Event queries
export {
  createUserAnalyticsEvent,
  deleteUserAnalyticsEvent,
  getUserAnalyticsEventById,
  listUserAnalyticsEvents,
  updateUserAnalyticsEvent,
} from './user-analytics-event.queries';
export type {
  NewUserAnalyticsEventRow,
  UserAnalyticsEventRow,
} from './user-analytics-event.queries';

// User Content Interaction queries
export {
  createUserContentInteraction,
  deleteUserContentInteraction,
  getUserContentInteractionById,
  listUserContentInteractions,
  updateUserContentInteraction,
} from './user-content-interaction.queries';
export type {
  NewUserContentInteractionRow,
  UserContentInteractionRow,
} from './user-content-interaction.queries';

// Learning Outcome queries
export {
  createLearningOutcome,
  deleteLearningOutcome,
  getLearningOutcomeById,
  listLearningOutcomes,
  updateLearningOutcome,
} from './learning-outcome.queries';
export type {
  LearningOutcomeRow,
  NewLearningOutcomeRow,
} from './learning-outcome.queries';

// Movement Metric queries
export {
  createMovementMetric,
  deleteMovementMetric,
  getMovementMetricById,
  listMovementMetrics,
  updateMovementMetric,
} from './movement-metric.queries';
export type {
  MovementMetricRow,
  NewMovementMetricRow,
} from './movement-metric.queries';

// Performance Report queries
export {
  createPerformanceReport,
  deletePerformanceReport,
  getPerformanceReportById,
  listPerformanceReports,
  updatePerformanceReport,
} from './performance-report.queries';
export type {
  NewPerformanceReportRow,
  PerformanceReportRow,
} from './performance-report.queries';

// Audit Log queries
export {
  createAuditLog,
  deleteAuditLog,
  getAuditLogById,
  listAuditLogs,
  updateAuditLog,
} from './audit-log.queries';
export type { AuditLogRow, NewAuditLogRow } from './audit-log.queries';

// Feature Flag queries
export {
  createFeatureFlag,
  deleteFeatureFlag,
  getFeatureFlagById,
  listFeatureFlags,
  updateFeatureFlag,
} from './feature-flag.queries';
export type { FeatureFlagRow, NewFeatureFlagRow } from './feature-flag.queries';

// User Feature Flag queries
export {
  createUserFeatureFlag,
  deleteUserFeatureFlag,
  getUserFeatureFlagById,
  listUserFeatureFlags,
  updateUserFeatureFlag,
} from './user-feature-flag.queries';
export type {
  NewUserFeatureFlagRow,
  UserFeatureFlagRow,
} from './user-feature-flag.queries';

// User Consent queries
export {
  createUserConsent,
  deleteUserConsent,
  getUserConsentById,
  listUserConsents,
  updateUserConsent,
} from './user-consent.queries';
export type { NewUserConsentRow, UserConsentRow } from './user-consent.queries';

// System Notification queries
export {
  createSystemNotification,
  deleteSystemNotification,
  getSystemNotificationById,
  listSystemNotifications,
  updateSystemNotification,
} from './system-notification.queries';
export type {
  NewSystemNotificationRow,
  SystemNotificationRow,
} from './system-notification.queries';

// User Notification Status queries
export {
  createUserNotificationStatus,
  deleteUserNotificationStatus,
  getUserNotificationStatusById,
  listUserNotificationStatuses,
  updateUserNotificationStatus,
} from './user-notification-status.queries';
export type {
  NewUserNotificationStatusRow,
  UserNotificationStatusRow,
} from './user-notification-status.queries';

// API Key queries
export {
  createApiKey,
  deleteApiKey,
  getApiKeyById,
  listApiKeys,
  updateApiKey,
} from './api-key.queries';
export type { ApiKeyRow, NewApiKeyRow } from './api-key.queries';
