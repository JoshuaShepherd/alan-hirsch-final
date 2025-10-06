// ============================================================================
// MAPPER EXPORTS
// ============================================================================
// This file provides centralized exports for all mapper functions

// User Profile Mappers
export {
  fromCreateUserProfile,
  fromUpdateUserProfile,
  getAPESTProfile,
  getUserDisplayName,
  getUserSubscriptionStatus,
  hasUserPermission,
  isUserProfileComplete,
  toUserProfileEntity,
  toUserProfileEntityArray,
  toUserProfileResponseArray,
  toUserProfileResponseDTO,
} from './user';

// Content Mappers
export {
  buildBreadcrumb,
  calculateEngagementScore,
  formatCount,
  fromCreateContentCategory,
  fromCreateContentItem,
  fromCreateContentSeries,
  fromUpdateContentCategory,
  fromUpdateContentItem,
  fromUpdateContentSeries,
  getContentDisplayInfo,
  getReadingTimeEstimate,
  isContentPublic,
  requiresAttribution,
  toContentCategoryEntity,
  toContentCategoryResponseArray,
  toContentCategoryResponseDTO,
  toContentItemEntity,
  toContentItemResponseArray,
  toContentItemResponseDTO,
  toContentSeriesEntity,
  toContentSeriesResponseArray,
  toContentSeriesResponseDTO,
} from './content';

// Assessment Mappers
export {
  calculateCompletionPercentage,
  calculateScorePercentage,
  formatDuration,
  formatResponseTime,
  fromCreateAssessment,
  fromCreateAssessmentQuestion,
  fromCreateAssessmentResponse,
  fromCreateUserAssessment,
  fromUpdateAssessment,
  fromUpdateAssessmentQuestion,
  fromUpdateAssessmentResponse,
  fromUpdateUserAssessment,
  getAssessmentDisplayInfo,
  isAssessmentPublic,
  toAssessmentEntity,
  toAssessmentQuestionResponseDTO,
  toAssessmentResponseArray,
  toAssessmentResponseDTO,
  toAssessmentResponseResponseDTO,
  toUserAssessmentResponseDTO,
} from './assessment';

// Organization Mappers
export {
  fromCreateOrganization,
  fromUpdateOrganization,
  getOrganizationContactInfo,
  getOrganizationDisplayInfo,
  hasReachedUserLimit,
  isOrganizationPublic,
  toOrganizationEntity,
  toOrganizationResponseArray,
  toOrganizationResponseDTO,
} from './organization';

// Legacy Organization Mappers (from shared package)
export {
  fromCreateOrganizationMembership,
  fromUpdateOrganizationMembership,
  // Legacy exports for backward compatibility
  toOrganizationDTO,
  toOrganizationMembershipDTO,
  toOrganizationMembershipEntity,
  toOrganizationMembershipResponseDTO,
} from '@platform/shared/mappers';
