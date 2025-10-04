// Mappers - Centralized data transformation utilities
// This file exports all mapper functions for converting between database rows and DTOs
// ============================================================================
// USER PROFILE MAPPERS
// ============================================================================
export { toUserProfileDTO, toUserProfileListDTO } from './user-profiles';
// ============================================================================
// ORGANIZATION MAPPERS
// ============================================================================
export { toOrganizationDTO, toOrganizationMembershipDTO, } from './organizations';
// ============================================================================
// ASSESSMENT MAPPERS
// ============================================================================
export { toAssessmentQuestionResponseDTO, toAssessmentResponseDTO, toAssessmentResponseResponseDTO, toAssessmentWithQuestionsResponseDTO, toPaginatedAssessmentListResponseDTO, toPaginatedUserAssessmentListResponseDTO, toUserAssessmentResponseDTO, toUserAssessmentWithDetailsResponseDTO, } from './assessments';
// ============================================================================
// CONTENT MAPPERS
// ============================================================================
export { toContentCategoryResponseDTO, toContentItemResponseDTO, toContentItemWithDetailsDTO, toContentSeriesWithDetailsDTO, } from './content';
// ============================================================================
// AI MAPPERS
// ============================================================================
export { toAiContentJobResponseDTO, toAiConversationResponseDTO, toAiCrossReferenceSuggestionResponseDTO, toAiMessageResponseDTO, toPaginatedAiContentJobListResponseDTO, toPaginatedAiConversationListResponseDTO, toPaginatedAiCrossReferenceSuggestionListResponseDTO, toPaginatedAiMessageListResponseDTO, toPaginatedTheologicalConceptListResponseDTO, toTheologicalConceptResponseDTO, } from './ai';
// ============================================================================
// MINISTRY PLATFORM MAPPERS
// ============================================================================
export { 
// Ministry Metrics Aggregation Mappers
aggregateMinistryMetrics, 
// Role-based Field Visibility Mappers
applyRoleBasedVisibility, 
// Plant/Territory-based Filtering Mappers
filterByPlantTerritory, filterByRolePermissions, getMinistryFieldPermissions, 
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
toOrganizationContextDTO, toOrganizationScopedDTO, } from './ministry-platform';
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Generic mapper utility for handling null/undefined values
 */
export function safeMap(value, mapper, defaultValue) {
    return value !== null && value !== undefined ? mapper(value) : defaultValue;
}
/**
 * Generic mapper utility for arrays with null/undefined handling
 */
export function safeMapArray(values, mapper, defaultValue) {
    return values.map(value => safeMap(value, mapper, defaultValue));
}
/**
 * Generic mapper utility for optional fields
 */
export function mapOptional(value, mapper) {
    return value !== null && value !== undefined ? mapper(value) : undefined;
}
/**
 * Generic mapper utility for required fields with fallback
 */
export function mapRequired(value, mapper, fallback) {
    return value !== null && value !== undefined ? mapper(value) : fallback;
}
/**
 * Generic mapper utility for date formatting
 */
export function mapDate(date) {
    if (!date)
        return null;
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString();
}
/**
 * Generic mapper utility for boolean fields with default
 */
export function mapBoolean(value, defaultValue = false) {
    return value !== null && value !== undefined ? value : defaultValue;
}
/**
 * Generic mapper utility for number fields with default
 */
export function mapNumber(value, defaultValue = 0) {
    return value !== null && value !== undefined ? value : defaultValue;
}
/**
 * Generic mapper utility for string fields with default
 */
export function mapString(value, defaultValue = '') {
    return value !== null && value !== undefined ? value : defaultValue;
}
/**
 * Generic mapper utility for JSON fields
 */
export function mapJson(value, defaultValue) {
    if (value === null || value === undefined)
        return defaultValue;
    try {
        return typeof value === 'string' ? JSON.parse(value) : value;
    }
    catch {
        return defaultValue;
    }
}
/**
 * Generic mapper utility for array fields
 */
export function mapArray(value, defaultValue = []) {
    return Array.isArray(value) ? value : defaultValue;
}
/**
 * Generic mapper utility for record/object fields
 */
export function mapRecord(value, defaultValue = {}) {
    return value && typeof value === 'object' ? value : defaultValue;
}
//# sourceMappingURL=index.js.map