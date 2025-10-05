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
  fromCreateContentItem,
  fromUpdateContentItem,
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
  formatDuration,
  fromCreateAssessment,
  fromUpdateAssessment,
  getAssessmentDisplayInfo,
  isAssessmentPublic,
  toAssessmentEntity,
  toAssessmentResponseArray,
  toAssessmentResponseDTO,
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
