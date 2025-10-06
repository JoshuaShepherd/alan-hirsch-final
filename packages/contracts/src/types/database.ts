// Auto-generated types from database schema
// Generated at: 2025-10-06T08:15:17.659Z

export interface OrganizationMemberships {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Organizations {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
  website?: string | null | undefined;
  logoUrl?: string | null | undefined;
}

export interface UserProfiles {
  id?: string | null | undefined;
  email: string;
  passwordHash?: string | null | undefined;
  firstName: string;
  lastName: string;
  displayName?: string | null | undefined;
  bio?: string | null | undefined;
  avatarUrl?: string | null | undefined;
}

export interface AssessmentQuestions {
  id?: string | null | undefined;
  assessmentId?: string | null | undefined;
}

export interface AssessmentResponses {
  id?: string | null | undefined;
  userAssessmentId?: string | null | undefined;
}

export interface Assessments {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface UserAssessments {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface ContentCrossReferences {
  id?: string | null | undefined;
  sourceContentId?: string | null | undefined;
}

export interface ContentItems {
  id?: string | null | undefined;
  title: string;
  slug: string;
  excerpt?: string | null | undefined;
  content?: string | null | undefined;
  authorId?: string | null | undefined;
  coAuthors?: any | null | undefined;
}

export interface ContentSeries {
  id?: string | null | undefined;
  title: string;
  slug: string;
  description?: string | null | undefined;
  excerpt?: string | null | undefined;
  authorId?: string | null | undefined;
  collaborators?: any | null | undefined;
}

export interface SeriesContentItems {
  id?: string | null | undefined;
  seriesId?: string | null | undefined;
}

export interface AiContentJobs {
  id?: string | null | undefined;
  contentId?: string | null | undefined;
}

export interface AiConversations {
  id?: string | null | undefined;
  userId: string;
}

export interface AiCrossReferenceSuggestions {
  id?: string | null | undefined;
  sourceContentId: string;
}

export interface AiMessages {
  id?: string | null | undefined;
  conversationId: string;
}

export interface TheologicalConcepts {
  id?: string | null | undefined;
  name: string;
  slug: string;
  definition?: string | null | undefined;
}

export interface Collaborations {
  id?: string | null | undefined;
  title: string;
  description?: string | null | undefined;
}

export interface Communities {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface CommunityMemberships {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface CommunityPostVotes {
  id?: string | null | undefined;
  postId?: string | null | undefined;
}

export interface Coupons {
  id?: string | null | undefined;
  code: string;
  name: string;
  description?: string | null | undefined;
}

export interface PaymentMethods {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface SubscriptionPlans {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface Transactions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  subscriptionId?: string | null | undefined;
}

export interface UserSubscriptions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface LearningOutcomes {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface MovementMetrics {
  id?: string | null | undefined;
  region: string;
  subregion?: string | null | undefined;
}

export interface PerformanceReports {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface UserAnalyticsEvents {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface UserContentInteractions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface ApiKeys {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface AuditLogs {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  action: string;
  resource: string;
  resourceId?: string | null | undefined;
}

export interface FeatureFlags {
  id?: string | null | undefined;
  name: string;
  key: string;
  description?: string | null | undefined;
}

export interface SystemNotifications {
  id?: string | null | undefined;
  title: string;
  message: string;
}

export interface UserConsents {
  id?: string | null | undefined;
  userId: string;
}

export interface UserFeatureFlags {
  id?: string | null | undefined;
  userId: string;
}

export interface UserNotificationStatus {
  id?: string | null | undefined;
  userId: string;
}

export interface UserProfiles {
  id?: string | null | undefined;
  email: string;
  passwordHash?: string | null | undefined;
  firstName: string;
  lastName: string;
  displayName?: string | null | undefined;
  bio?: string | null | undefined;
  avatarUrl?: string | null | undefined;
}

export interface Organizations {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
  website?: string | null | undefined;
  logoUrl?: string | null | undefined;
}

export interface OrganizationMemberships {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Assessments {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface AssessmentQuestions {
  id?: string | null | undefined;
  assessmentId?: string | null | undefined;
}

export interface UserAssessments {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface AssessmentResponses {
  id?: string | null | undefined;
  userAssessmentId?: string | null | undefined;
}

export interface ContentSeries {
  id?: string | null | undefined;
  title: string;
  slug: string;
  description?: string | null | undefined;
  excerpt?: string | null | undefined;
  authorId?: string | null | undefined;
  collaborators?: any | null | undefined;
}

export interface ContentItems {
  id?: string | null | undefined;
  title: string;
  slug: string;
  excerpt?: string | null | undefined;
  content?: string | null | undefined;
  authorId?: string | null | undefined;
  coAuthors?: any | null | undefined;
}

export interface SeriesContentItems {
  id?: string | null | undefined;
  seriesId?: string | null | undefined;
}

export interface ContentCrossReferences {
  id?: string | null | undefined;
  sourceContentId?: string | null | undefined;
}

export interface AiConversations {
  id?: string | null | undefined;
  userId: string;
}

export interface AiMessages {
  id?: string | null | undefined;
  conversationId: string;
}

export interface AiContentJobs {
  id?: string | null | undefined;
  contentId?: string | null | undefined;
}

export interface AiCrossReferenceSuggestions {
  id?: string | null | undefined;
  sourceContentId: string;
}

export interface TheologicalConcepts {
  id?: string | null | undefined;
  name: string;
  slug: string;
  definition?: string | null | undefined;
}

export interface Communities {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface CommunityMemberships {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface CommunityPostVotes {
  id?: string | null | undefined;
  postId?: string | null | undefined;
}

export interface Collaborations {
  id?: string | null | undefined;
  title: string;
  description?: string | null | undefined;
}

export interface SubscriptionPlans {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface UserSubscriptions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Transactions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  subscriptionId?: string | null | undefined;
}

export interface PaymentMethods {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Coupons {
  id?: string | null | undefined;
  code: string;
  name: string;
  description?: string | null | undefined;
}

export interface UserAnalyticsEvents {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface UserContentInteractions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface LearningOutcomes {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface MovementMetrics {
  id?: string | null | undefined;
  region: string;
  subregion?: string | null | undefined;
}

export interface PerformanceReports {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface AuditLogs {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  action: string;
  resource: string;
  resourceId?: string | null | undefined;
}

export interface FeatureFlags {
  id?: string | null | undefined;
  name: string;
  key: string;
  description?: string | null | undefined;
}

export interface UserFeatureFlags {
  id?: string | null | undefined;
  userId: string;
}

export interface UserConsents {
  id?: string | null | undefined;
  userId: string;
}

export interface SystemNotifications {
  id?: string | null | undefined;
  title: string;
  message: string;
}

export interface UserNotificationStatus {
  id?: string | null | undefined;
  userId: string;
}

export interface ApiKeys {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface UserProfiles {
  id?: string | null | undefined;
  email: string;
  passwordHash?: string | null | undefined;
  firstName: string;
  lastName: string;
  displayName?: string | null | undefined;
  bio?: string | null | undefined;
  avatarUrl?: string | null | undefined;
}

export interface Organizations {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
  website?: string | null | undefined;
  logoUrl?: string | null | undefined;
}

export interface OrganizationMemberships {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Assessments {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface AssessmentQuestions {
  id?: string | null | undefined;
  assessmentId?: string | null | undefined;
}

export interface UserAssessments {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface AssessmentResponses {
  id?: string | null | undefined;
  userAssessmentId?: string | null | undefined;
}

export interface ContentSeries {
  id?: string | null | undefined;
  title: string;
  slug: string;
  description?: string | null | undefined;
  excerpt?: string | null | undefined;
  authorId?: string | null | undefined;
  collaborators?: any | null | undefined;
}

export interface ContentItems {
  id?: string | null | undefined;
  title: string;
  slug: string;
  excerpt?: string | null | undefined;
  content?: string | null | undefined;
  authorId?: string | null | undefined;
  coAuthors?: any | null | undefined;
}

export interface SeriesContentItems {
  id?: string | null | undefined;
  seriesId?: string | null | undefined;
}

export interface ContentCrossReferences {
  id?: string | null | undefined;
  sourceContentId?: string | null | undefined;
}

export interface AiConversations {
  id?: string | null | undefined;
  userId: string;
}

export interface AiMessages {
  id?: string | null | undefined;
  conversationId: string;
}

export interface AiContentJobs {
  id?: string | null | undefined;
  contentId?: string | null | undefined;
}

export interface AiCrossReferenceSuggestions {
  id?: string | null | undefined;
  sourceContentId: string;
}

export interface TheologicalConcepts {
  id?: string | null | undefined;
  name: string;
  slug: string;
  definition?: string | null | undefined;
}

export interface Communities {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface CommunityMemberships {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface CommunityPostVotes {
  id?: string | null | undefined;
  postId?: string | null | undefined;
}

export interface Collaborations {
  id?: string | null | undefined;
  title: string;
  description?: string | null | undefined;
}

export interface SubscriptionPlans {
  id?: string | null | undefined;
  name: string;
  slug: string;
  description?: string | null | undefined;
}

export interface UserSubscriptions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Transactions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  subscriptionId?: string | null | undefined;
}

export interface PaymentMethods {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface Coupons {
  id?: string | null | undefined;
  code: string;
  name: string;
  description?: string | null | undefined;
}

export interface UserAnalyticsEvents {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface UserContentInteractions {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface LearningOutcomes {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface MovementMetrics {
  id?: string | null | undefined;
  region: string;
  subregion?: string | null | undefined;
}

export interface PerformanceReports {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

export interface AuditLogs {
  id?: string | null | undefined;
  userId?: string | null | undefined;
  action: string;
  resource: string;
  resourceId?: string | null | undefined;
}

export interface FeatureFlags {
  id?: string | null | undefined;
  name: string;
  key: string;
  description?: string | null | undefined;
}

export interface UserFeatureFlags {
  id?: string | null | undefined;
  userId: string;
}

export interface UserConsents {
  id?: string | null | undefined;
  userId: string;
}

export interface SystemNotifications {
  id?: string | null | undefined;
  title: string;
  message: string;
}

export interface UserNotificationStatus {
  id?: string | null | undefined;
  userId: string;
}

export interface ApiKeys {
  id?: string | null | undefined;
  userId?: string | null | undefined;
}

