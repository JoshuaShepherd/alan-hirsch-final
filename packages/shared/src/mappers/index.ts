// Mappers - Centralized data transformation utilities
// This file exports all mapper functions for converting between database rows and DTOs

// ============================================================================
// USER PROFILE MAPPERS
// ============================================================================

export { toUserProfileDTO, toUserProfileListDTO } from './user-profiles';

// ============================================================================
// ORGANIZATION MAPPERS
// ============================================================================

export {
  toOrganizationDTO,
  toOrganizationMembershipDTO,
} from './organizations';

// ============================================================================
// ASSESSMENT MAPPERS
// ============================================================================

export {
  toAssessmentQuestionResponseDTO,
  toAssessmentResponseDTO,
  toAssessmentResponseResponseDTO,
  toAssessmentWithQuestionsResponseDTO,
  toPaginatedAssessmentListResponseDTO,
  toPaginatedUserAssessmentListResponseDTO,
  toUserAssessmentResponseDTO,
  toUserAssessmentWithDetailsResponseDTO,
} from './assessments';

// ============================================================================
// CONTENT MAPPERS
// ============================================================================

export {
  toContentCategoryResponseDTO,
  toContentItemResponseDTO,
  toContentItemWithDetailsDTO,
  toContentSeriesWithDetailsDTO,
} from './content';

// ============================================================================
// AI MAPPERS
// ============================================================================

export {
  toAiContentJobResponseDTO,
  toAiConversationResponseDTO,
  toAiCrossReferenceSuggestionResponseDTO,
  toAiMessageResponseDTO,
  toPaginatedAiContentJobListResponseDTO,
  toPaginatedAiConversationListResponseDTO,
  toPaginatedAiCrossReferenceSuggestionListResponseDTO,
  toPaginatedAiMessageListResponseDTO,
  toPaginatedTheologicalConceptListResponseDTO,
  toTheologicalConceptResponseDTO,
} from './ai';

// ============================================================================
// MINISTRY PLATFORM MAPPERS
// ============================================================================

export {
  // Ministry Metrics Aggregation Mappers
  aggregateMinistryMetrics,

  // Role-based Field Visibility Mappers
  applyRoleBasedVisibility,
  // Plant/Territory-based Filtering Mappers
  filterByPlantTerritory,
  filterByRolePermissions,
  getMinistryFieldPermissions,
  // Combined Auth + Ministry Mappers
  toAuthMinistryCombinedDTO,
  // Ministry Assessment Mappers
  toMinistryAssessmentDTO,
  // Ministry Community Mappers
  toMinistryCommunityDTO,
  // Ministry Content Mappers
  toMinistryContentItemDTO,
  // Ministry Organization Mappers
  toMinistryOrganizationDTO,
  // Ministry User Profile Mappers
  toMinistryUserProfileDTO,
  // Organization Context Mappers
  toOrganizationContextDTO,
  toOrganizationScopedDTO,
} from './ministry-platform';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generic mapper utility for handling null/undefined values
 */
export function safeMap<T, R>(
  value: T | null | undefined,
  mapper: (value: T) => R,
  defaultValue: R
): R {
  return value !== null && value !== undefined ? mapper(value) : defaultValue;
}

/**
 * Generic mapper utility for arrays with null/undefined handling
 */
export function safeMapArray<T, R>(
  values: (T | null | undefined)[],
  mapper: (value: T) => R,
  defaultValue: R
): R[] {
  return values.map(value => safeMap(value, mapper, defaultValue));
}

/**
 * Generic mapper utility for optional fields
 */
export function mapOptional<T, R>(
  value: T | null | undefined,
  mapper: (value: T) => R
): R | undefined {
  return value !== null && value !== undefined ? mapper(value) : undefined;
}

/**
 * Generic mapper utility for required fields with fallback
 */
export function mapRequired<T, R>(
  value: T | null | undefined,
  mapper: (value: T) => R,
  fallback: R
): R {
  return value !== null && value !== undefined ? mapper(value) : fallback;
}

/**
 * Generic mapper utility for date formatting
 */
export function mapDate(date: Date | string | null | undefined): string | null {
  if (!date) return null;

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Generic mapper utility for boolean fields with default
 */
export function mapBoolean(
  value: boolean | null | undefined,
  defaultValue: boolean = false
): boolean {
  return value !== null && value !== undefined ? value : defaultValue;
}

/**
 * Generic mapper utility for number fields with default
 */
export function mapNumber(
  value: number | null | undefined,
  defaultValue: number = 0
): number {
  return value !== null && value !== undefined ? value : defaultValue;
}

/**
 * Generic mapper utility for string fields with default
 */
export function mapString(
  value: string | null | undefined,
  defaultValue: string = ''
): string {
  return value !== null && value !== undefined ? value : defaultValue;
}

/**
 * Generic mapper utility for JSON fields
 */
export function mapJson<T>(value: any, defaultValue: T): T {
  if (value === null || value === undefined) return defaultValue;

  try {
    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch {
    return defaultValue;
  }
}

/**
 * Generic mapper utility for array fields
 */
export function mapArray<T>(
  value: T[] | null | undefined,
  defaultValue: T[] = []
): T[] {
  return Array.isArray(value) ? value : defaultValue;
}

/**
 * Generic mapper utility for record/object fields
 */
export function mapRecord<T>(
  value: Record<string, T> | null | undefined,
  defaultValue: Record<string, T> = {}
): Record<string, T> {
  return value && typeof value === 'object' ? value : defaultValue;
}
