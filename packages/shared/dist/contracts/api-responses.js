import { z } from 'zod';
// ============================================================================
// STANDARDIZED API RESPONSE SCHEMAS
// ============================================================================
// Base API Response Envelope
export const apiResponseSchema = (dataSchema) => z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),
});
// Error Response Schema
export const apiErrorResponseSchema = z.object({
    error: z.string(),
    message: z.string().optional(),
    details: z.any().optional(),
    success: z.literal(false),
});
// Pagination Metadata Schema
export const paginationSchema = z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
});
// Paginated Response Schema - Standardized structure
export const paginatedResponseSchema = (itemSchema) => z.object({
    items: z.object({
        data: z.array(itemSchema),
        pagination: paginationSchema,
    }),
    success: z.boolean(),
    message: z.string().optional(),
});
// ============================================================================
// SPECIFIC RESPONSE SCHEMAS
// ============================================================================
// Import DTO schemas
import { assessmentQuestionSchema, 
// Assessments
assessmentSchema, communityMembershipSchema, communityPostSchema, 
// Community
communitySchema, 
// Content
contentCategorySchema, contentItemSchema, contentSeriesSchema, organizationMembershipSchema, organizationSchema, 
// Subscriptions
subscriptionPlanSchema, 
// Analytics
userAnalyticsEventSchema, userAssessmentSchema, userContentInteractionSchema, 
// Auth & User
userProfileSchema, userSubscriptionSchema, } from '@platform/contracts';
// Auth & User Responses
export const userProfileResponseSchema = apiResponseSchema(userProfileSchema);
export const userProfileListResponseSchema = paginatedResponseSchema(userProfileSchema);
export const organizationResponseSchema = apiResponseSchema(organizationSchema);
export const organizationListResponseSchema = paginatedResponseSchema(organizationSchema);
export const organizationMembershipResponseSchema = apiResponseSchema(organizationMembershipSchema);
export const organizationMembershipListResponseSchema = paginatedResponseSchema(organizationMembershipSchema);
// Assessment Responses
export const assessmentApiResponseSchema = apiResponseSchema(assessmentSchema);
export const assessmentListResponseSchema = paginatedResponseSchema(assessmentSchema);
export const assessmentQuestionResponseSchema = apiResponseSchema(assessmentQuestionSchema);
export const assessmentQuestionListResponseSchema = paginatedResponseSchema(assessmentQuestionSchema);
export const userAssessmentResponseSchema = apiResponseSchema(userAssessmentSchema);
export const userAssessmentListResponseSchema = paginatedResponseSchema(userAssessmentSchema);
export const assessmentResponseResponseSchema = apiResponseSchema(userAssessmentSchema);
export const assessmentResponseListResponseSchema = paginatedResponseSchema(userAssessmentSchema);
// Content Responses
export const contentCategoryResponseSchema = apiResponseSchema(contentCategorySchema);
export const contentCategoryListResponseSchema = paginatedResponseSchema(contentCategorySchema);
export const contentSeriesResponseSchema = apiResponseSchema(contentSeriesSchema);
export const contentSeriesListResponseSchema = paginatedResponseSchema(contentSeriesSchema);
export const contentItemResponseSchema = apiResponseSchema(contentItemSchema);
export const contentItemListResponseSchema = paginatedResponseSchema(contentItemSchema);
// Community Responses
export const communityResponseSchema = apiResponseSchema(communitySchema);
export const communityListResponseSchema = paginatedResponseSchema(communitySchema);
export const communityMembershipResponseSchema = apiResponseSchema(communityMembershipSchema);
export const communityMembershipListResponseSchema = paginatedResponseSchema(communityMembershipSchema);
export const communityPostResponseSchema = apiResponseSchema(communityPostSchema);
export const communityPostListResponseSchema = paginatedResponseSchema(communityPostSchema);
// Subscription Responses
export const subscriptionPlanResponseSchema = apiResponseSchema(subscriptionPlanSchema);
export const subscriptionPlanListResponseSchema = paginatedResponseSchema(subscriptionPlanSchema);
export const userSubscriptionResponseSchema = apiResponseSchema(userSubscriptionSchema);
export const userSubscriptionListResponseSchema = paginatedResponseSchema(userSubscriptionSchema);
// Analytics Responses
export const userAnalyticsEventResponseSchema = apiResponseSchema(userAnalyticsEventSchema);
export const userAnalyticsEventListResponseSchema = paginatedResponseSchema(userAnalyticsEventSchema);
export const userContentInteractionResponseSchema = apiResponseSchema(userContentInteractionSchema);
export const userContentInteractionListResponseSchema = paginatedResponseSchema(userContentInteractionSchema);
//# sourceMappingURL=api-responses.js.map