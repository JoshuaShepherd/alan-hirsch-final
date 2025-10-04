import { z } from 'zod';
import { AssessmentEntitySchema, AssessmentQuestionEntitySchema, AssessmentResponseEntitySchema, UserAssessmentEntitySchema, } from '../entities/assessment.schema';
import { BulkUpdateAssessmentResponsesOperationSchema, CompleteUserAssessmentOperationSchema, CreateAssessmentOperationSchema, CreateAssessmentQuestionOperationSchema, CreateAssessmentResponseOperationSchema, GetAssessmentByIdOperationSchema, GetAssessmentStatisticsOperationSchema, GetUserAssessmentInsightsOperationSchema, GetUserAssessmentOperationSchema, ListAssessmentsOperationSchema, ListUserAssessmentsOperationSchema, ReorderAssessmentQuestionsOperationSchema, SaveAssessmentResponsesOperationSchema, SearchAssessmentsOperationSchema, StartUserAssessmentOperationSchema, UpdateAssessmentOperationSchema, UpdateAssessmentQuestionOperationSchema, UpdateAssessmentResponseOperationSchema, } from '../operations/assessment.operations';
import { PaginatedResponseSchema } from './user.contracts';
// ============================================================================
// ASSESSMENT API CONTRACTS - DERIVED FROM OPERATIONS
// ============================================================================
// All API contracts are derived from operation schemas to ensure consistency
// and eliminate duplication across the codebase.
// ============================================================================
// ASSESSMENT API REQUEST CONTRACTS
// ============================================================================
/**
 * Create Assessment API Request Contract
 * Derived from CreateAssessmentOperationSchema
 */
export const CreateAssessmentApiRequestSchema = CreateAssessmentOperationSchema;
/**
 * Update Assessment API Request Contract
 * Derived from UpdateAssessmentOperationSchema
 */
export const UpdateAssessmentApiRequestSchema = UpdateAssessmentOperationSchema;
/**
 * Create Assessment Question API Request Contract
 * Derived from CreateAssessmentQuestionOperationSchema
 */
export const CreateAssessmentQuestionApiRequestSchema = CreateAssessmentQuestionOperationSchema;
/**
 * Update Assessment Question API Request Contract
 * Derived from UpdateAssessmentQuestionOperationSchema
 */
export const UpdateAssessmentQuestionApiRequestSchema = UpdateAssessmentQuestionOperationSchema;
/**
 * Reorder Assessment Questions API Request Contract
 * Derived from ReorderAssessmentQuestionsOperationSchema
 */
export const ReorderAssessmentQuestionsApiRequestSchema = ReorderAssessmentQuestionsOperationSchema;
/**
 * Start User Assessment API Request Contract
 * Derived from StartUserAssessmentOperationSchema
 */
export const StartUserAssessmentApiRequestSchema = StartUserAssessmentOperationSchema;
/**
 * Save Assessment Responses API Request Contract
 * Derived from SaveAssessmentResponsesOperationSchema
 */
export const SaveAssessmentResponsesApiRequestSchema = SaveAssessmentResponsesOperationSchema;
/**
 * Complete User Assessment API Request Contract
 * Derived from CompleteUserAssessmentOperationSchema
 */
export const CompleteUserAssessmentApiRequestSchema = CompleteUserAssessmentOperationSchema;
/**
 * Create Assessment Response API Request Contract
 * Derived from CreateAssessmentResponseOperationSchema
 */
export const CreateAssessmentResponseApiRequestSchema = CreateAssessmentResponseOperationSchema;
/**
 * Update Assessment Response API Request Contract
 * Derived from UpdateAssessmentResponseOperationSchema
 */
export const UpdateAssessmentResponseApiRequestSchema = UpdateAssessmentResponseOperationSchema;
/**
 * Bulk Update Assessment Responses API Request Contract
 * Derived from BulkUpdateAssessmentResponsesOperationSchema
 */
export const BulkUpdateAssessmentResponsesApiRequestSchema = BulkUpdateAssessmentResponsesOperationSchema;
/**
 * Search Assessments API Request Contract
 * Derived from SearchAssessmentsOperationSchema
 */
export const SearchAssessmentsApiRequestSchema = SearchAssessmentsOperationSchema;
// ============================================================================
// ASSESSMENT API RESPONSE CONTRACTS
// ============================================================================
/**
 * Assessment API Response Contract
 * Derived from AssessmentEntitySchema
 */
export const AssessmentApiResponseSchema = AssessmentEntitySchema;
/**
 * Assessment with Questions API Response Contract
 * Extends assessment with questions
 */
export const AssessmentWithQuestionsApiResponseSchema = AssessmentEntitySchema.extend({
    questions: z.array(AssessmentQuestionEntitySchema).default([]),
});
/**
 * Assessment Question API Response Contract
 * Derived from AssessmentQuestionEntitySchema
 */
export const AssessmentQuestionApiResponseSchema = AssessmentQuestionEntitySchema;
/**
 * User Assessment API Response Contract
 * Derived from UserAssessmentEntitySchema
 */
export const UserAssessmentApiResponseSchema = UserAssessmentEntitySchema;
/**
 * User Assessment with Details API Response Contract
 * Extends user assessment with assessment and user details
 */
export const UserAssessmentWithDetailsApiResponseSchema = UserAssessmentEntitySchema.extend({
    assessment: AssessmentEntitySchema,
    user: z.object({
        id: z.string().uuid(),
        first_name: z.string(),
        last_name: z.string(),
        display_name: z.string().optional(),
        avatar_url: z.string().url().optional(),
    }),
});
/**
 * Assessment Response API Response Contract
 * Derived from AssessmentResponseEntitySchema
 */
export const AssessmentResponseApiResponseSchema = AssessmentResponseEntitySchema;
/**
 * Assessment List API Response Contract
 * Paginated list of assessments
 */
export const AssessmentListApiResponseSchema = PaginatedResponseSchema(AssessmentApiResponseSchema);
/**
 * Assessment Search API Response Contract
 * Search results for assessments
 */
export const AssessmentSearchApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        assessments: z.array(AssessmentApiResponseSchema),
        total: z.number().int().min(0),
        query: z.string(),
        took: z.number().min(0), // milliseconds
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * User Assessment List API Response Contract
 * Paginated list of user assessments
 */
export const UserAssessmentListApiResponseSchema = PaginatedResponseSchema(UserAssessmentWithDetailsApiResponseSchema);
/**
 * Assessment Statistics API Response Contract
 * Assessment completion and scoring statistics
 */
export const AssessmentStatisticsApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        assessment_id: z.string().uuid(),
        total_completions: z.number().int().min(0),
        average_completion_time: z.number().min(0), // minutes
        average_score: z.number().min(0).max(100),
        completion_rate: z.number().min(0).max(100),
        score_distribution: z.array(z.object({
            score_range: z.string(),
            count: z.number().int().min(0),
            percentage: z.number().min(0).max(100),
        })),
        apest_distribution: z
            .object({
            apostolic: z.number().min(0).max(100),
            prophetic: z.number().min(0).max(100),
            evangelistic: z.number().min(0).max(100),
            shepherding: z.number().min(0).max(100),
            teaching: z.number().min(0).max(100),
        })
            .optional(),
        trends: z
            .array(z.object({
            date: z.string().datetime(),
            completions: z.number().int().min(0),
            average_score: z.number().min(0).max(100),
        }))
            .optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * User Assessment Insights API Response Contract
 * AI-generated insights for user assessment
 */
export const UserAssessmentInsightsApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user_assessment_id: z.string().uuid(),
        insights: z.object({
            primary_gift_analysis: z.string(),
            secondary_gift_analysis: z.string(),
            complementary_gifts: z.array(z.enum([
                'apostolic',
                'prophetic',
                'evangelistic',
                'shepherding',
                'teaching',
            ])),
            strengths: z.array(z.string()),
            growth_areas: z.array(z.string()),
            ministry_recommendations: z.array(z.string()),
            leadership_style: z.string().optional(),
            cultural_considerations: z.string().optional(),
        }),
        recommendations: z.array(z.object({
            type: z.enum(['content', 'community', 'assessment', 'development']),
            title: z.string(),
            description: z.string(),
            priority: z.enum(['low', 'medium', 'high']),
            action_url: z.string().url().optional(),
        })),
        comparisons: z
            .object({
            peer_average: z.object({
                apostolic: z.number().min(0).max(100),
                prophetic: z.number().min(0).max(100),
                evangelistic: z.number().min(0).max(100),
                shepherding: z.number().min(0).max(100),
                teaching: z.number().min(0).max(100),
            }),
            cultural_adjustment: z.object({
                applied: z.boolean(),
                adjustment_factor: z.number().min(0).max(2),
                notes: z.string().optional(),
            }),
        })
            .optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Start User Assessment API Response Contract
 * Response for starting a new assessment
 */
export const StartUserAssessmentApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user_assessment: UserAssessmentApiResponseSchema,
        assessment: AssessmentWithQuestionsApiResponseSchema,
        estimated_duration: z.number().int().min(0), // minutes
        instructions: z.string().optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Save Assessment Responses API Response Contract
 * Response for saving assessment responses
 */
export const SaveAssessmentResponsesApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user_assessment: UserAssessmentApiResponseSchema,
        saved_responses: z.array(AssessmentResponseApiResponseSchema),
        completion_percentage: z.number().min(0).max(100),
        is_complete: z.boolean(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Complete User Assessment API Response Contract
 * Response for completing an assessment
 */
export const CompleteUserAssessmentApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user_assessment: UserAssessmentWithDetailsApiResponseSchema,
        scores: z.object({
            total_score: z.number().int().min(0),
            max_possible_score: z.number().int().min(0),
            apostolic_score: z.number().int().min(0).max(100).optional(),
            prophetic_score: z.number().int().min(0).max(100).optional(),
            evangelistic_score: z.number().int().min(0).max(100).optional(),
            shepherding_score: z.number().int().min(0).max(100).optional(),
            teaching_score: z.number().int().min(0).max(100).optional(),
        }),
        results: z.object({
            primary_gift: z
                .enum([
                'apostolic',
                'prophetic',
                'evangelistic',
                'shepherding',
                'teaching',
            ])
                .optional(),
            secondary_gift: z
                .enum([
                'apostolic',
                'prophetic',
                'evangelistic',
                'shepherding',
                'teaching',
            ])
                .optional(),
            complementary_gifts: z.array(z.enum([
                'apostolic',
                'prophetic',
                'evangelistic',
                'shepherding',
                'teaching',
            ])),
        }),
        insights: z.string().optional(),
        recommendations: z.array(z.string()).default([]),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
// ============================================================================
// ASSESSMENT API QUERY CONTRACTS
// ============================================================================
/**
 * Get Assessment by ID API Query Contract
 * Derived from GetAssessmentByIdOperationSchema
 */
export const GetAssessmentByIdApiQuerySchema = GetAssessmentByIdOperationSchema;
/**
 * List Assessments API Query Contract
 * Derived from ListAssessmentsOperationSchema
 */
export const ListAssessmentsApiQuerySchema = ListAssessmentsOperationSchema;
/**
 * Get User Assessment API Query Contract
 * Derived from GetUserAssessmentOperationSchema
 */
export const GetUserAssessmentApiQuerySchema = GetUserAssessmentOperationSchema;
/**
 * List User Assessments API Query Contract
 * Derived from ListUserAssessmentsOperationSchema
 */
export const ListUserAssessmentsApiQuerySchema = ListUserAssessmentsOperationSchema;
/**
 * Get Assessment Statistics API Query Contract
 * Derived from GetAssessmentStatisticsOperationSchema
 */
export const GetAssessmentStatisticsApiQuerySchema = GetAssessmentStatisticsOperationSchema;
/**
 * Get User Assessment Insights API Query Contract
 * Derived from GetUserAssessmentInsightsOperationSchema
 */
export const GetUserAssessmentInsightsApiQuerySchema = GetUserAssessmentInsightsOperationSchema;
//# sourceMappingURL=assessment.contracts.js.map