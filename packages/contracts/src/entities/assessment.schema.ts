import { z } from 'zod';

// ============================================================================
// ASSESSMENT ENUMS AND TYPES
// ============================================================================

export const assessmentTypeSchema = z.enum([
  'apest',
  'mdna',
  'cultural_intelligence',
  'leadership_style',
  'spiritual_gifts',
  'other',
]);

export const culturalAdaptationSchema = z.enum([
  'western',
  'eastern',
  'african',
  'latin_american',
  'middle_eastern',
  'oceanic',
  'universal',
  'global',
]);

export const scoringMethodSchema = z.enum([
  'likert_5',
  'likert_7',
  'binary',
  'ranking',
  'weighted',
]);

export const assessmentStatusSchema = z.enum([
  'draft',
  'active',
  'archived',
  'under_review',
]);

export const questionTypeSchema = z.enum([
  'likert',
  'multiple_choice',
  'binary',
  'ranking',
  'text',
]);

export const apestDimensionSchema = z.enum([
  'apostolic',
  'prophetic',
  'evangelistic',
  'shepherding',
  'teaching',
]);

// ============================================================================
// ASSESSMENT ENTITY SCHEMA - SINGLE SOURCE OF TRUTH
// ============================================================================

/**
 * Complete Assessment Entity Schema
 * This is the single source of truth for all assessment data structures
 */
export const AssessmentEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),

  // Assessment Classification
  assessment_type: assessmentTypeSchema,

  // Assessment Configuration
  questions_count: z.number().int().min(1),
  estimated_duration: z.number().int().min(1).optional(), // minutes
  passing_score: z.number().int().min(0).optional(),

  // Versioning & Localization
  version: z.string().default('1.0'),
  language: z.string().default('en'),
  cultural_adaptation: culturalAdaptationSchema.default('universal'),

  // Research & Validity
  research_backed: z.boolean().default(false),
  validity_score: z.number().min(0).max(1).optional(),
  reliability_score: z.number().min(0).max(1).optional(),

  // Configuration
  instructions: z.string().max(5000).optional(),
  scoring_method: scoringMethodSchema.default('likert_5'),

  // Status
  status: assessmentStatusSchema.default('draft'),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  published_at: z.string().datetime().optional(),
});

/**
 * Complete Assessment Question Entity Schema
 * This is the single source of truth for all assessment question data structures
 */
export const AssessmentQuestionEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  assessment_id: z.string().uuid(),
  question_text: z.string().min(1).max(2000),
  question_type: questionTypeSchema,
  order_index: z.number().int().min(1),

  // Classification
  category: z.string().max(100).optional(),
  apest_dimension: apestDimensionSchema.optional(),

  // Configuration
  answer_options: z.record(z.unknown()).optional(),
  is_required: z.boolean().default(true),
  weight: z.number().min(0).default(1),
  reverse_scored: z.boolean().default(false),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Complete User Assessment Entity Schema
 * This is the single source of truth for all user assessment data structures
 */
export const UserAssessmentEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  assessment_id: z.string().uuid(),

  // Progress Tracking
  started_at: z.string().datetime(),
  completed_at: z.string().datetime().optional(),
  completion_percentage: z.number().min(0).max(100).default(0),

  // Scoring
  total_score: z.number().int().min(0).optional(),
  max_possible_score: z.number().int().min(0).optional(),

  // APEST Scores (if applicable)
  apostolic_score: z.number().int().min(0).max(100).optional(),
  prophetic_score: z.number().int().min(0).max(100).optional(),
  evangelistic_score: z.number().int().min(0).max(100).optional(),
  shepherding_score: z.number().int().min(0).max(100).optional(),
  teaching_score: z.number().int().min(0).max(100).optional(),

  // Normalized Scores
  normalized_scores: z.record(z.number()).optional(),

  // Results
  primary_gift: apestDimensionSchema.optional(),
  secondary_gift: apestDimensionSchema.optional(),

  // Metadata
  completion_time: z.number().int().min(0).optional(), // seconds
  confidence_level: z.number().int().min(1).max(5).optional(),
  cultural_adjustment_applied: z.boolean().default(false),

  // AI Insights
  ai_insights: z.string().max(5000).optional(),
  personalized_recommendations: z.array(z.string()).default([]),
  complementary_gifts: z.array(apestDimensionSchema).default([]),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Complete Assessment Response Entity Schema
 * This is the single source of truth for all assessment response data structures
 */
export const AssessmentResponseEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  user_assessment_id: z.string().uuid(),
  question_id: z.string().uuid(),

  // Response Data
  response_value: z.number().int().optional(),
  response_text: z.string().max(1000).optional(),
  response_time: z.number().int().min(0).optional(), // milliseconds
  confidence: z.number().int().min(1).max(5).optional(),
  skipped: z.boolean().default(false),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ============================================================================
// DERIVED SCHEMAS - NO DUPLICATION
// ============================================================================

/**
 * Create Assessment Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateAssessmentSchema = AssessmentEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update Assessment Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateAssessmentSchema = CreateAssessmentSchema.partial();

/**
 * Assessment Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const AssessmentQuerySchema = AssessmentEntitySchema.partial().extend({
  // Search fields
  search: z.string().optional(),

  // Filter fields
  assessment_type: z.array(assessmentTypeSchema).optional(),
  status: z.array(assessmentStatusSchema).optional(),
  language: z.array(z.string()).optional(),
  cultural_adaptation: z.array(culturalAdaptationSchema).optional(),
  research_backed: z.boolean().optional(),

  // Date range filters
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
  published_after: z.string().datetime().optional(),
  published_before: z.string().datetime().optional(),
});

/**
 * Create Assessment Question Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateAssessmentQuestionSchema =
  AssessmentQuestionEntitySchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
  });

/**
 * Update Assessment Question Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateAssessmentQuestionSchema =
  CreateAssessmentQuestionSchema.partial();

/**
 * Create User Assessment Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateUserAssessmentSchema = UserAssessmentEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update User Assessment Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateUserAssessmentSchema = CreateUserAssessmentSchema.partial();

/**
 * User Assessment Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const UserAssessmentQuerySchema =
  UserAssessmentEntitySchema.partial().extend({
    // Search fields
    search: z.string().optional(),

    // Filter fields
    user_id: z.array(z.string().uuid()).optional(),
    assessment_id: z.array(z.string().uuid()).optional(),
    primary_gift: z.array(apestDimensionSchema).optional(),
    secondary_gift: z.array(apestDimensionSchema).optional(),

    // Completion filters
    is_completed: z.boolean().optional(),
    completion_percentage_min: z.number().min(0).max(100).optional(),
    completion_percentage_max: z.number().min(0).max(100).optional(),

    // Date range filters
    started_after: z.string().datetime().optional(),
    started_before: z.string().datetime().optional(),
    completed_after: z.string().datetime().optional(),
    completed_before: z.string().datetime().optional(),
  });

/**
 * Create Assessment Response Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateAssessmentResponseSchema =
  AssessmentResponseEntitySchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
  });

/**
 * Update Assessment Response Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateAssessmentResponseSchema =
  CreateAssessmentResponseSchema.partial();

/**
 * Assessment Response Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const AssessmentResponseQuerySchema =
  AssessmentResponseEntitySchema.partial().extend({
    // Filter fields
    user_assessment_id: z.array(z.string().uuid()).optional(),
    question_id: z.array(z.string().uuid()).optional(),
    skipped: z.boolean().optional(),

    // Date range filters
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
  });

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AssessmentEntity = z.infer<typeof AssessmentEntitySchema>;
export type CreateAssessment = z.infer<typeof CreateAssessmentSchema>;
export type UpdateAssessment = z.infer<typeof UpdateAssessmentSchema>;
export type AssessmentQuery = z.infer<typeof AssessmentQuerySchema>;

export type AssessmentQuestionEntity = z.infer<
  typeof AssessmentQuestionEntitySchema
>;
export type CreateAssessmentQuestion = z.infer<
  typeof CreateAssessmentQuestionSchema
>;
export type UpdateAssessmentQuestion = z.infer<
  typeof UpdateAssessmentQuestionSchema
>;

export type UserAssessmentEntity = z.infer<typeof UserAssessmentEntitySchema>;
export type CreateUserAssessment = z.infer<typeof CreateUserAssessmentSchema>;
export type UpdateUserAssessment = z.infer<typeof UpdateUserAssessmentSchema>;
export type UserAssessmentQuery = z.infer<typeof UserAssessmentQuerySchema>;

export type AssessmentResponseEntity = z.infer<
  typeof AssessmentResponseEntitySchema
>;
export type CreateAssessmentResponse = z.infer<
  typeof CreateAssessmentResponseSchema
>;
export type UpdateAssessmentResponse = z.infer<
  typeof UpdateAssessmentResponseSchema
>;
export type AssessmentResponseQuery = z.infer<
  typeof AssessmentResponseQuerySchema
>;

// Enum type exports
export type AssessmentType = z.infer<typeof assessmentTypeSchema>;
export type CulturalAdaptation = z.infer<typeof culturalAdaptationSchema>;
export type ScoringMethod = z.infer<typeof scoringMethodSchema>;
export type AssessmentStatus = z.infer<typeof assessmentStatusSchema>;
export type QuestionType = z.infer<typeof questionTypeSchema>;
export type ApestDimension = z.infer<typeof apestDimensionSchema>;
