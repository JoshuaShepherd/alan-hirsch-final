import { z } from 'zod';

// ============================================================================
// STANDARDIZED API RESPONSE SCHEMAS
// ============================================================================

// Base API Response Envelope
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
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
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
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
import {
  assessmentQuestionSchema,
  // Assessments
  assessmentSchema,
  communityMembershipSchema,
  communityPostSchema,
  // Community
  communitySchema,
  // Content
  contentCategorySchema,
  contentItemSchema,
  contentSeriesSchema,
  organizationMembershipSchema,
  organizationSchema,
  // Subscriptions
  subscriptionPlanSchema,
  // Analytics
  userAnalyticsEventSchema,
  userAssessmentSchema,
  userContentInteractionSchema,
  // Auth & User
  userProfileSchema,
  userSubscriptionSchema,
} from '@/lib/contracts';

// Auth & User Responses
export const userProfileResponseSchema = apiResponseSchema(userProfileSchema);
export const userProfileListResponseSchema =
  paginatedResponseSchema(userProfileSchema);

export const organizationResponseSchema = apiResponseSchema(organizationSchema);
export const organizationListResponseSchema =
  paginatedResponseSchema(organizationSchema);

export const organizationMembershipResponseSchema = apiResponseSchema(
  organizationMembershipSchema
);
export const organizationMembershipListResponseSchema = paginatedResponseSchema(
  organizationMembershipSchema
);

// Assessment Responses
export const assessmentApiResponseSchema = apiResponseSchema(assessmentSchema);
export const assessmentListResponseSchema =
  paginatedResponseSchema(assessmentSchema);

export const assessmentQuestionResponseSchema = apiResponseSchema(
  assessmentQuestionSchema
);
export const assessmentQuestionListResponseSchema = paginatedResponseSchema(
  assessmentQuestionSchema
);

export const userAssessmentResponseSchema =
  apiResponseSchema(userAssessmentSchema);
export const userAssessmentListResponseSchema =
  paginatedResponseSchema(userAssessmentSchema);

export const assessmentResponseResponseSchema =
  apiResponseSchema(userAssessmentSchema);
export const assessmentResponseListResponseSchema =
  paginatedResponseSchema(userAssessmentSchema);

// Content Responses
export const contentCategoryResponseSchema = apiResponseSchema(
  contentCategorySchema
);
export const contentCategoryListResponseSchema = paginatedResponseSchema(
  contentCategorySchema
);

export const contentSeriesResponseSchema =
  apiResponseSchema(contentSeriesSchema);
export const contentSeriesListResponseSchema =
  paginatedResponseSchema(contentSeriesSchema);

export const contentItemResponseSchema = apiResponseSchema(contentItemSchema);
export const contentItemListResponseSchema =
  paginatedResponseSchema(contentItemSchema);

// Community Responses
export const communityResponseSchema = apiResponseSchema(communitySchema);
export const communityListResponseSchema =
  paginatedResponseSchema(communitySchema);

export const communityMembershipResponseSchema = apiResponseSchema(
  communityMembershipSchema
);
export const communityMembershipListResponseSchema = paginatedResponseSchema(
  communityMembershipSchema
);

export const communityPostResponseSchema =
  apiResponseSchema(communityPostSchema);
export const communityPostListResponseSchema =
  paginatedResponseSchema(communityPostSchema);

// Subscription Responses
export const subscriptionPlanResponseSchema = apiResponseSchema(
  subscriptionPlanSchema
);
export const subscriptionPlanListResponseSchema = paginatedResponseSchema(
  subscriptionPlanSchema
);

export const userSubscriptionResponseSchema = apiResponseSchema(
  userSubscriptionSchema
);
export const userSubscriptionListResponseSchema = paginatedResponseSchema(
  userSubscriptionSchema
);

// Analytics Responses
export const userAnalyticsEventResponseSchema = apiResponseSchema(
  userAnalyticsEventSchema
);
export const userAnalyticsEventListResponseSchema = paginatedResponseSchema(
  userAnalyticsEventSchema
);

export const userContentInteractionResponseSchema = apiResponseSchema(
  userContentInteractionSchema
);
export const userContentInteractionListResponseSchema = paginatedResponseSchema(
  userContentInteractionSchema
);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Base response types
export type ApiResponse<T> = z.infer<
  ReturnType<typeof apiResponseSchema<z.ZodType<T>>>
>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type PaginatedResponse<T> = z.infer<
  ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>
>;

// Specific response types
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
export type UserProfileListResponse = z.infer<
  typeof userProfileListResponseSchema
>;

export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationListResponse = z.infer<
  typeof organizationListResponseSchema
>;

export type OrganizationMembershipResponse = z.infer<
  typeof organizationMembershipResponseSchema
>;
export type OrganizationMembershipListResponse = z.infer<
  typeof organizationMembershipListResponseSchema
>;

export type AssessmentApiResponse = z.infer<typeof assessmentApiResponseSchema>;
export type AssessmentListResponse = z.infer<
  typeof assessmentListResponseSchema
>;

export type AssessmentQuestionResponse = z.infer<
  typeof assessmentQuestionResponseSchema
>;
export type AssessmentQuestionListResponse = z.infer<
  typeof assessmentQuestionListResponseSchema
>;

export type UserAssessmentResponse = z.infer<
  typeof userAssessmentResponseSchema
>;
export type UserAssessmentListResponse = z.infer<
  typeof userAssessmentListResponseSchema
>;

export type AssessmentResponseResponse = z.infer<
  typeof assessmentResponseResponseSchema
>;
export type AssessmentResponseListResponse = z.infer<
  typeof assessmentResponseListResponseSchema
>;

export type ContentCategoryResponse = z.infer<
  typeof contentCategoryResponseSchema
>;
export type ContentCategoryListResponse = z.infer<
  typeof contentCategoryListResponseSchema
>;

export type ContentSeriesResponse = z.infer<typeof contentSeriesResponseSchema>;
export type ContentSeriesListResponse = z.infer<
  typeof contentSeriesListResponseSchema
>;

export type ContentItemResponse = z.infer<typeof contentItemResponseSchema>;
export type ContentItemListResponse = z.infer<
  typeof contentItemListResponseSchema
>;

export type CommunityResponse = z.infer<typeof communityResponseSchema>;
export type CommunityListResponse = z.infer<typeof communityListResponseSchema>;

export type CommunityMembershipResponse = z.infer<
  typeof communityMembershipResponseSchema
>;
export type CommunityMembershipListResponse = z.infer<
  typeof communityMembershipListResponseSchema
>;

export type CommunityPostResponse = z.infer<typeof communityPostResponseSchema>;
export type CommunityPostListResponse = z.infer<
  typeof communityPostListResponseSchema
>;

export type SubscriptionPlanResponse = z.infer<
  typeof subscriptionPlanResponseSchema
>;
export type SubscriptionPlanListResponse = z.infer<
  typeof subscriptionPlanListResponseSchema
>;

export type UserSubscriptionResponse = z.infer<
  typeof userSubscriptionResponseSchema
>;
export type UserSubscriptionListResponse = z.infer<
  typeof userSubscriptionListResponseSchema
>;

export type UserAnalyticsEventResponse = z.infer<
  typeof userAnalyticsEventResponseSchema
>;
export type UserAnalyticsEventListResponse = z.infer<
  typeof userAnalyticsEventListResponseSchema
>;

export type UserContentInteractionResponse = z.infer<
  typeof userContentInteractionResponseSchema
>;
export type UserContentInteractionListResponse = z.infer<
  typeof userContentInteractionListResponseSchema
>;
