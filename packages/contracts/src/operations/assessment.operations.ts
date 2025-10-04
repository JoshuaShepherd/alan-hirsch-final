import { z } from 'zod';
import {
  AssessmentQuerySchema,
  CreateAssessmentQuestionSchema,
  CreateAssessmentResponseSchema,
  CreateAssessmentSchema,
  UpdateAssessmentQuestionSchema,
  UpdateAssessmentResponseSchema,
  UpdateAssessmentSchema,
  UserAssessmentQuerySchema,
} from '../entities/assessment.schema';

// ============================================================================
// ASSESSMENT OPERATIONS - DERIVED FROM ENTITY SCHEMAS
// ============================================================================
// All operations are derived from the Assessment entity schemas to ensure
// consistency and eliminate duplication across the codebase.

// ============================================================================
// ASSESSMENT CRUD OPERATIONS
// ============================================================================

/**
 * Create Assessment Operation Schema
 * Derived from CreateAssessmentSchema with operation-specific validation
 */
export const CreateAssessmentOperationSchema = CreateAssessmentSchema.extend({
  // Additional validation for create operations
  name: z
    .string()
    .min(1)
    .max(255)
    .refine(
      name => !name.includes('  '), // No double spaces
      { message: 'Assessment name cannot contain double spaces' }
    ),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .refine(slug => !slug.startsWith('-') && !slug.endsWith('-'), {
      message: 'Slug cannot start or end with hyphens',
    }),
});

/**
 * Update Assessment Operation Schema
 * Derived from UpdateAssessmentSchema with operation-specific validation
 */
export const UpdateAssessmentOperationSchema = UpdateAssessmentSchema.extend({
  // Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

/**
 * Get Assessment by ID Operation Schema
 * Assessment retrieval with options
 */
export const GetAssessmentByIdOperationSchema = z.object({
  id: z.string().uuid(),
  include_questions: z.boolean().default(false),
  include_responses: z.boolean().default(false),
  include_statistics: z.boolean().default(false),
});

/**
 * List Assessments Operation Schema
 * Paginated assessment listing with filters
 */
export const ListAssessmentsOperationSchema = AssessmentQuerySchema.extend({
  // Pagination
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),

  // Sorting
  sort_by: z
    .enum([
      'created_at',
      'updated_at',
      'published_at',
      'name',
      'questions_count',
    ])
    .default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),

  // Include options
  include_questions: z.boolean().default(false),
  include_statistics: z.boolean().default(false),
});

/**
 * Search Assessments Operation Schema
 * Full-text search for assessments
 */
export const SearchAssessmentsOperationSchema = z.object({
  // Search query
  query: z.string().min(1).max(255),

  // Filters
  assessment_type: z
    .array(
      z.enum([
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ])
    )
    .optional(),
  status: z
    .array(z.enum(['draft', 'active', 'archived', 'under_review']))
    .optional(),
  language: z.array(z.string()).optional(),
  research_backed: z.boolean().optional(),

  // Pagination
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),

  // Sorting
  sort_by: z
    .enum(['relevance', 'created_at', 'published_at', 'name'])
    .default('relevance'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================================================
// ASSESSMENT QUESTION OPERATIONS
// ============================================================================

/**
 * Create Assessment Question Operation Schema
 * Derived from CreateAssessmentQuestionSchema with operation-specific validation
 */
export const CreateAssessmentQuestionOperationSchema =
  CreateAssessmentQuestionSchema.extend({
    // Additional validation for create operations
    question_text: z
      .string()
      .min(1)
      .max(2000)
      .refine(text => text.trim().length > 0, {
        message: 'Question text cannot be empty or only whitespace',
      }),
    order_index: z
      .number()
      .int()
      .min(1)
      .refine(index => index > 0, {
        message: 'Order index must be greater than 0',
      }),
  });

/**
 * Update Assessment Question Operation Schema
 * Derived from UpdateAssessmentQuestionSchema with operation-specific validation
 */
export const UpdateAssessmentQuestionOperationSchema =
  UpdateAssessmentQuestionSchema.extend({
    // Ensure at least one field is provided for update
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

/**
 * Reorder Assessment Questions Operation Schema
 * Bulk reordering of questions
 */
export const ReorderAssessmentQuestionsOperationSchema = z.object({
  assessment_id: z.string().uuid(),
  question_orders: z
    .array(
      z.object({
        question_id: z.string().uuid(),
        order_index: z.number().int().min(1),
      })
    )
    .min(1),
});

// ============================================================================
// USER ASSESSMENT OPERATIONS
// ============================================================================

/**
 * Start User Assessment Operation Schema
 * Begin a new assessment for a user
 */
export const StartUserAssessmentOperationSchema = z.object({
  user_id: z.string().uuid(),
  assessment_id: z.string().uuid(),
  context: z
    .object({
      organization_id: z.string().uuid().optional(),
      session_id: z.string().optional(),
      user_agent: z.string().optional(),
      ip_address: z.string().optional(),
    })
    .optional(),
});

/**
 * Save Assessment Responses Operation Schema
 * Save partial or complete assessment responses
 */
export const SaveAssessmentResponsesOperationSchema = z.object({
  user_assessment_id: z.string().uuid(),
  responses: z
    .array(
      z.object({
        question_id: z.string().uuid(),
        response_value: z.number().int().optional(),
        response_text: z.string().max(1000).optional(),
        response_time: z.number().int().min(0).optional(),
        confidence: z.number().int().min(1).max(5).optional(),
        skipped: z.boolean().default(false),
      })
    )
    .min(1),
  is_complete: z.boolean().default(false),
});

/**
 * Complete User Assessment Operation Schema
 * Mark assessment as complete and calculate scores
 */
export const CompleteUserAssessmentOperationSchema = z.object({
  user_assessment_id: z.string().uuid(),
  final_responses: z
    .array(
      z.object({
        question_id: z.string().uuid(),
        response_value: z.number().int().optional(),
        response_text: z.string().max(1000).optional(),
        response_time: z.number().int().min(0).optional(),
        confidence: z.number().int().min(1).max(5).optional(),
        skipped: z.boolean().default(false),
      })
    )
    .min(1),
  completion_time: z.number().int().min(0), // seconds
  cultural_adjustment_applied: z.boolean().default(false),
});

/**
 * Get User Assessment Operation Schema
 * Retrieve user assessment with details
 */
export const GetUserAssessmentOperationSchema = z.object({
  user_assessment_id: z.string().uuid(),
  include_assessment: z.boolean().default(true),
  include_responses: z.boolean().default(false),
  include_insights: z.boolean().default(false),
});

/**
 * List User Assessments Operation Schema
 * Paginated user assessment listing
 */
export const ListUserAssessmentsOperationSchema =
  UserAssessmentQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),

    // Sorting
    sort_by: z
      .enum(['started_at', 'completed_at', 'created_at', 'total_score'])
      .default('started_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),

    // Include options
    include_assessment: z.boolean().default(true),
    include_user: z.boolean().default(false),
  });

// ============================================================================
// ASSESSMENT RESPONSE OPERATIONS
// ============================================================================

/**
 * Create Assessment Response Operation Schema
 * Derived from CreateAssessmentResponseSchema with operation-specific validation
 */
export const CreateAssessmentResponseOperationSchema =
  CreateAssessmentResponseSchema.extend({
    // Additional validation for create operations
    response_value: z.number().int().optional(),
    response_text: z.string().max(1000).optional(),
  }).refine(
    data =>
      data.response_value !== undefined || data.response_text !== undefined,
    { message: 'Either response_value or response_text must be provided' }
  );

/**
 * Update Assessment Response Operation Schema
 * Derived from UpdateAssessmentResponseSchema with operation-specific validation
 */
export const UpdateAssessmentResponseOperationSchema =
  UpdateAssessmentResponseSchema.extend({
    // Ensure at least one field is provided for update
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

/**
 * Bulk Update Assessment Responses Operation Schema
 * Update multiple responses at once
 */
export const BulkUpdateAssessmentResponsesOperationSchema = z.object({
  user_assessment_id: z.string().uuid(),
  responses: z
    .array(
      z.object({
        question_id: z.string().uuid(),
        response_value: z.number().int().optional(),
        response_text: z.string().max(1000).optional(),
        response_time: z.number().int().min(0).optional(),
        confidence: z.number().int().min(1).max(5).optional(),
        skipped: z.boolean().default(false),
      })
    )
    .min(1),
});

// ============================================================================
// ASSESSMENT ANALYTICS OPERATIONS
// ============================================================================

/**
 * Get Assessment Statistics Operation Schema
 * Retrieve assessment completion and scoring statistics
 */
export const GetAssessmentStatisticsOperationSchema = z.object({
  assessment_id: z.string().uuid(),
  date_range: z
    .object({
      start_date: z.string().datetime(),
      end_date: z.string().datetime(),
    })
    .optional(),
  group_by: z.enum(['day', 'week', 'month']).default('day'),
});

/**
 * Get User Assessment Insights Operation Schema
 * Retrieve AI-generated insights for user assessment
 */
export const GetUserAssessmentInsightsOperationSchema = z.object({
  user_assessment_id: z.string().uuid(),
  include_recommendations: z.boolean().default(true),
  include_comparisons: z.boolean().default(false),
  include_trends: z.boolean().default(false),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Assessment CRUD Operations
export type CreateAssessmentOperation = z.infer<
  typeof CreateAssessmentOperationSchema
>;
export type UpdateAssessmentOperation = z.infer<
  typeof UpdateAssessmentOperationSchema
>;
export type GetAssessmentByIdOperation = z.infer<
  typeof GetAssessmentByIdOperationSchema
>;
export type ListAssessmentsOperation = z.infer<
  typeof ListAssessmentsOperationSchema
>;
export type SearchAssessmentsOperation = z.infer<
  typeof SearchAssessmentsOperationSchema
>;

// Assessment Question Operations
export type CreateAssessmentQuestionOperation = z.infer<
  typeof CreateAssessmentQuestionOperationSchema
>;
export type UpdateAssessmentQuestionOperation = z.infer<
  typeof UpdateAssessmentQuestionOperationSchema
>;
export type ReorderAssessmentQuestionsOperation = z.infer<
  typeof ReorderAssessmentQuestionsOperationSchema
>;

// User Assessment Operations
export type StartUserAssessmentOperation = z.infer<
  typeof StartUserAssessmentOperationSchema
>;
export type SaveAssessmentResponsesOperation = z.infer<
  typeof SaveAssessmentResponsesOperationSchema
>;
export type CompleteUserAssessmentOperation = z.infer<
  typeof CompleteUserAssessmentOperationSchema
>;
export type GetUserAssessmentOperation = z.infer<
  typeof GetUserAssessmentOperationSchema
>;
export type ListUserAssessmentsOperation = z.infer<
  typeof ListUserAssessmentsOperationSchema
>;

// Assessment Response Operations
export type CreateAssessmentResponseOperation = z.infer<
  typeof CreateAssessmentResponseOperationSchema
>;
export type UpdateAssessmentResponseOperation = z.infer<
  typeof UpdateAssessmentResponseOperationSchema
>;
export type BulkUpdateAssessmentResponsesOperation = z.infer<
  typeof BulkUpdateAssessmentResponsesOperationSchema
>;

// Assessment Analytics Operations
export type GetAssessmentStatisticsOperation = z.infer<
  typeof GetAssessmentStatisticsOperationSchema
>;
export type GetUserAssessmentInsightsOperation = z.infer<
  typeof GetUserAssessmentInsightsOperationSchema
>;
