// ============================================================================
// CONTRACTS PACKAGE - UNIFIED SCHEMA SYSTEM
// ============================================================================
// This package provides the single source of truth for all data structures
// in the Alan Hirsch Digital Platform. All schemas are derived from entity
// schemas to ensure consistency and eliminate duplication.
// Entity Schemas - Single Source of Truth
export * from './entities';
// Operations - Derived from Entity Schemas
export * from './operations';
// API Contracts - Derived from Operations
export * from './api';
// Re-export user entity schemas for services
export { createUserProfileSchema, updateUserProfileSchema, userProfileEntitySchema, userProfileFormSchema, userProfileQuerySchema, userProfileResponseSchema, } from './entities/user.schema';
// Export aliases for backward compatibility
export { updateUserProfileSchema as userProfileUpdateSchema } from './entities/user.schema';
// Re-export assessment entity schemas for services
export { assessmentEntitySchema, assessmentQuerySchema, assessmentQuestionEntitySchema, assessmentQuestionQuerySchema, assessmentResponseEntitySchema, assessmentResponseQuerySchema, assessmentResponseSchema, createAssessmentQuestionSchema, createAssessmentResponseSchema, createAssessmentSchema, createUserAssessmentSchema, updateAssessmentQuestionSchema, updateAssessmentResponseSchema, updateAssessmentSchema, updateUserAssessmentSchema, userAssessmentEntitySchema, userAssessmentQuerySchema, } from './entities/assessment.schema';
// Re-export organization entity schemas for services
export { createOrganizationMembershipSchema, createOrganizationSchema, organizationEntitySchema, organizationFormSchema, organizationInvitationSchema, organizationMembershipEntitySchema, organizationMembershipQuerySchema, organizationQuerySchema, updateOrganizationMembershipSchema, updateOrganizationSchema, } from './entities/organization.schema';
// Re-export content entity schemas for services
export { contentCategoryEntitySchema, contentCategoryQuerySchema, contentCrossReferenceEntitySchema, contentItemEntitySchema, contentItemFormSchema, contentItemQuerySchema, contentSeriesEntitySchema, contentSeriesQuerySchema, createContentCategorySchema, createContentItemSchema, createContentSeriesSchema, updateContentCategorySchema, updateContentItemSchema, updateContentSeriesSchema, } from './entities/content.schema';
// Re-export AI entity schemas for services
export { aiContentJobEntitySchema, aiContentJobResponseSchema, aiConversationEntitySchema, aiConversationResponseSchema, aiCrossReferenceSuggestionEntitySchema, aiCrossReferenceSuggestionResponseSchema, aiMessageEntitySchema, aiMessageResponseSchema, createAiContentJobSchema, createAiConversationSchema, createAiCrossReferenceSuggestionSchema, createAiMessageSchema, createTheologicalConceptSchema, theologicalConceptEntitySchema, theologicalConceptResponseSchema, updateAiContentJobSchema, updateAiConversationSchema, updateAiCrossReferenceSuggestionSchema, updateAiMessageSchema, updateTheologicalConceptSchema, } from './entities/ai.schema';
// Re-export ministry platform schemas
export { crossEntityValidationSchema, ministryPaginatedResponseSchema, ministryPlatformErrorSchema, ministryPlatformResponseSchema, organizationScopedRequestSchema, roleBasedValidationSchema, } from './entities/ministry-platform.schema';
// Additional missing schema exports for backward compatibility
export { 
// AI schemas
aiContentJobEntitySchema as aiContentJobSchema, aiConversationEntitySchema as aiConversationSchema, aiCrossReferenceSuggestionEntitySchema as aiCrossReferenceSuggestionSchema, aiMessageEntitySchema as aiMessageSchema, assessmentQuestionEntitySchema as assessmentQuestionSchema, 
// Assessment schemas
assessmentEntitySchema as assessmentSchema, 
// Content schemas
contentCategoryEntitySchema as contentCategorySchema, contentCrossReferenceEntitySchema as contentCrossReferenceSchema, contentItemEntitySchema as contentItemSchema, contentSeriesEntitySchema as contentSeriesSchema, createAssessmentQuestionSchema as newAssessmentQuestionSchema, createAssessmentSchema as newAssessmentSchema, createContentCategorySchema as newContentCategorySchema, createContentItemSchema as newContentItemSchema, createContentSeriesSchema as newContentSeriesSchema, createOrganizationMembershipSchema as newOrganizationMembershipSchema, createOrganizationSchema as newOrganizationSchema, createUserAssessmentSchema as newUserAssessmentSchema, createUserProfileSchema as newUserProfileSchema, organizationMembershipEntitySchema as organizationMembershipSchema, 
// Organization schemas
organizationEntitySchema as organizationSchema, theologicalConceptEntitySchema as theologicalConceptSchema, userAssessmentEntitySchema as userAssessmentSchema, 
// User schemas
userProfileEntitySchema as userProfileSchema, } from './entities';
// ============================================================================
// MISSING API REQUEST/RESPONSE SCHEMA ALIASES
// ============================================================================
// These are commonly used aliases that are missing from the main exports
// Assessment API Request Schema Aliases
export { AssessmentResponseApiResponseSchema as AssessmentResponseEntitySchema, CreateAssessmentApiRequestSchema as CreateAssessmentRequestSchema, CreateAssessmentResponseApiRequestSchema as CreateAssessmentResponseSchema, AssessmentResponseApiResponseSchema as assessmentResponseDTOSchema, CreateAssessmentApiRequestSchema as createAssessmentRequestSchema, UpdateAssessmentApiRequestSchema as updateAssessmentRequestSchema, } from './api/assessment.contracts';
// Content API Request Schema Aliases
export { ContentItemApiResponseSchema as ContentItemResponseSchema, ContentItemApiResponseSchema as ContentRowDTO, CreateContentItemApiRequestSchema as CreateContentItemRequestSchema, UpdateContentItemApiRequestSchema as UpdateContentItemRequestSchema, CreateContentItemApiRequestSchema as createContentItemRequestSchema, UpdateContentItemApiRequestSchema as updateContentItemRequestSchema, } from './api/content.contracts';
// Ministry Analytics Schema Aliases
export { movementMetricEntitySchema as ministryAnalyticsRequestSchema, movementMetricEntitySchema as ministryMetricsResponseSchema, } from './entities/analytics.schema';
// Paginated Response Schema Aliases
export { ContentCategoryListApiResponseSchema as paginatedContentCategoryListResponseSchema, ContentSeriesListApiResponseSchema as paginatedContentSeriesListResponseSchema, } from './api/content.contracts';
// Community Schema Aliases
export { communityEntitySchema as communityResponseSchema, updateCommunitySchema as updateCommunityRequestSchema, } from './entities/community.schema';
// Re-export operation schemas for services
export { CreateUserOperationSchema, CreateUserWithOrganizationOperationSchema, DeactivateUserOperationSchema, DeleteUserOperationSchema, GetUserByEmailOperationSchema, GetUserByIdOperationSchema, ListUsersOperationSchema, SearchUsersOperationSchema, UpdateUserAssessmentScoresOperationSchema, UpdateUserOperationSchema, UpdateUserProfileOperationSchema, UpdateUserSettingsOperationSchema, UserLoginOperationSchema, UserPasswordResetOperationSchema, UserPasswordUpdateOperationSchema, UserRegistrationOperationSchema, } from './operations/user.operations';
// Re-export assessment operation schemas for services
export { BulkUpdateAssessmentResponsesOperationSchema, CompleteUserAssessmentOperationSchema, CreateAssessmentOperationSchema, CreateAssessmentQuestionOperationSchema, CreateAssessmentResponseOperationSchema, GetAssessmentByIdOperationSchema, GetAssessmentStatisticsOperationSchema, GetUserAssessmentInsightsOperationSchema, GetUserAssessmentOperationSchema, ListAssessmentsOperationSchema, ListUserAssessmentsOperationSchema, ReorderAssessmentQuestionsOperationSchema, SaveAssessmentResponsesOperationSchema, SearchAssessmentsOperationSchema, StartUserAssessmentOperationSchema, UpdateAssessmentOperationSchema, UpdateAssessmentQuestionOperationSchema, UpdateAssessmentResponseOperationSchema, } from './operations/assessment.operations';
// Re-export organization operation schemas for services
export { AcceptOrganizationInvitationOperationSchema, CreateOrganizationMembershipOperationSchema, CreateOrganizationOperationSchema, GetOrganizationByIdOperationSchema, GetOrganizationBySubdomainOperationSchema, GetOrganizationDashboardOperationSchema, GetOrganizationMembersOperationSchema, GetOrganizationStatisticsOperationSchema, InviteUserToOrganizationOperationSchema, ListOrganizationMembershipsOperationSchema, ListOrganizationsOperationSchema, RejectOrganizationInvitationOperationSchema, RemoveUserFromOrganizationOperationSchema, SearchOrganizationsOperationSchema, UpdateOrganizationBrandingOperationSchema, UpdateOrganizationMembershipOperationSchema, UpdateOrganizationOperationSchema, UpdateOrganizationSettingsOperationSchema, } from './operations/organization.operations';
// ============================================================================
// DATABASE TABLE RE-EXPORTS
// ============================================================================
// Note: Database tables should be imported directly from @platform/database
// by services that need them. This avoids circular dependencies and keeps
// the contracts package focused on schemas and types.
// ============================================================================
// PACKAGE METADATA
// ============================================================================
export const PACKAGE_VERSION = '0.1.0';
export const PACKAGE_NAME = '@platform/contracts';
/**
 * Validate data against a schema and return typed result
 */
export function validateSchema(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    }
    else {
        return {
            success: false,
            error: result.error,
        };
    }
}
/**
 * Validate data against a schema and throw on error
 */
export function validateSchemaOrThrow(schema, data) {
    return schema.parse(data);
}
/**
 * Check if data matches a schema without throwing
 */
export function isValidSchema(schema, data) {
    return schema.safeParse(data).success;
}
//# sourceMappingURL=index.js.map