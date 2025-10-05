import { z } from 'zod';

// ============================================================================
// ASSESSMENT ENTITY SCHEMA
// ============================================================================
// Based on assessments table from database documentation

export const assessmentEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),

  // Assessment Configuration
  assessmentType: z.enum([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),
  questionsCount: z.number().int().min(1),
  estimatedDuration: z.number().int().min(1).optional(), // in minutes
  passingScore: z.number().int().min(0).optional(),

  // Validation & Reliability
  validityScore: z.number().min(0).max(1).optional(),
  reliabilityScore: z.number().min(0).max(1).optional(),

  // Instructions & Content
  instructions: z.string().max(2000).optional(),
  publishedAt: z.string().datetime().optional(),
  version: z.string().max(20).default('1.0'),
  language: z.string().max(10).default('en'),

  // Cultural Adaptation
  culturalAdaptation: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
      'global',
    ])
    .default('universal'),
  researchBacked: z.boolean().default(false),
  scoringMethod: z
    .enum(['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'])
    .default('likert_5'),

  // Status
  status: z
    .enum(['draft', 'active', 'archived', 'under_review'])
    .default('draft'),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ASSESSMENT QUESTION ENTITY SCHEMA
// ============================================================================
// Based on assessment_questions table

export const assessmentQuestionEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionText: z.string().min(1).max(1000),
  questionType: z.enum([
    'likert',
    'multiple_choice',
    'binary',
    'ranking',
    'text',
  ]),
  orderIndex: z.number().int().min(0),

  // Question Configuration
  category: z.string().max(100).optional(),
  apestDimension: z
    .enum(['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'])
    .optional(),
  answerOptions: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  isRequired: z.boolean().default(true),
  weight: z.number().min(0).max(10).default(1.0),
  reverseScored: z.boolean().default(false),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// USER ASSESSMENT ENTITY SCHEMA
// ============================================================================
// Based on user_assessments table

export const userAssessmentEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),

  // Assessment Progress
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  completionPercentage: z.number().int().min(0).max(100).default(0),

  // Raw Scores
  rawScores: z.record(z.number()).optional(),
  totalScore: z.number().int().min(0).optional(),
  maxPossibleScore: z.number().int().min(0).optional(),

  // APEST Scores
  apostolicScore: z.number().int().min(0).max(100).optional(),
  propheticScore: z.number().int().min(0).max(100).optional(),
  evangelisticScore: z.number().int().min(0).max(100).optional(),
  shepherdingScore: z.number().int().min(0).max(100).optional(),
  teachingScore: z.number().int().min(0).max(100).optional(),

  // Normalized Scores
  normalizedScores: z.record(z.number()).optional(),
  primaryGift: z.string().max(50).optional(),
  secondaryGift: z.string().max(50).optional(),

  // Assessment Quality
  responseConsistency: z.number().min(0).max(1).optional(),
  completionTime: z.number().int().min(0).optional(), // in minutes
  confidenceLevel: z.number().int().min(1).max(5).optional(),

  // Cultural Adjustment
  culturalAdjustmentApplied: z.boolean().default(false),
  culturalAdjustmentFactor: z.number().min(0).max(2).optional(),

  // AI Insights
  aiInsights: z.string().max(2000).optional(),
  personalizedRecommendations: z
    .object({
      strengths: z.array(z.string()).default([]),
      growthAreas: z.array(z.string()).default([]),
      actionItems: z.array(z.string()).default([]),
      contentRecommendations: z.array(z.string()).default([]),
    })
    .optional(),
  suggestedPeers: z.array(z.string()).default([]),
  complementaryGifts: z.array(z.string()).default([]),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ASSESSMENT RESPONSE ENTITY SCHEMA
// ============================================================================
// Based on assessment_responses table

export const assessmentResponseEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),

  // Response Data
  responseValue: z.number().int().optional(),
  responseText: z.string().max(1000).optional(),
  responseTime: z.number().int().min(0).optional(), // in seconds
  confidence: z.number().int().min(1).max(5).optional(),
  skipped: z.boolean().default(false),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ASSESSMENT RESPONSE SCHEMAS (with computed fields)
// ============================================================================

export const assessmentResponseSchema = assessmentResponseEntitySchema.extend({
  // Computed fields
  isSkipped: z.boolean(),
  hasResponse: z.boolean(),
  responseTimeText: z.string().optional(),
  confidenceLevel: z.string().optional(),

  // Related data
  question: z
    .object({
      id: z.string().uuid(),
      questionText: z.string(),
      questionType: z.string(),
      orderIndex: z.number().int().min(0),
      category: z.string().optional(),
      apestDimension: z.string().optional(),
      isRequired: z.boolean(),
    })
    .optional(),

  userAssessment: z
    .object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      assessmentId: z.string().uuid(),
      status: z.string(),
    })
    .optional(),
});

export const assessmentQuestionResponseSchema =
  assessmentQuestionEntitySchema.extend({
    // Computed fields
    isRequired: z.boolean(),
    hasOptions: z.boolean(),
    isReverseScored: z.boolean(),
    typeDisplay: z.string(),
    dimensionDisplay: z.string().optional(),

    // Related data
    assessment: z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      assessmentType: z.string(),
    }),
  });

export const userAssessmentResponseSchema = userAssessmentEntitySchema.extend({
  // Computed fields
  isCompleted: z.boolean(),
  isInProgress: z.boolean(),
  completionStatus: z.string(),
  durationText: z.string().optional(),
  scorePercentage: z.number().min(0).max(100).optional(),
  primaryGiftDisplay: z.string().optional(),
  secondaryGiftDisplay: z.string().optional(),

  // APEST Profile
  apestProfile: z
    .object({
      apostolic: z.number().int().min(0).max(100),
      prophetic: z.number().int().min(0).max(100),
      evangelistic: z.number().int().min(0).max(100),
      shepherding: z.number().int().min(0).max(100),
      teaching: z.number().int().min(0).max(100),
      dominant: z.string(),
      secondary: z.string(),
    })
    .optional(),

  // Related data
  user: z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    displayName: z.string().optional(),
  }),

  assessment: z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    assessmentType: z.string(),
    questionsCount: z.number().int().min(1),
  }),

  responses: z
    .array(
      z.object({
        id: z.string().uuid(),
        questionId: z.string().uuid(),
        responseValue: z.number().int().optional(),
        responseText: z.string().optional(),
        responseTime: z.number().int().min(0).optional(),
        confidence: z.number().int().min(1).max(5).optional(),
        skipped: z.boolean(),
      })
    )
    .optional(),
});

export const assessmentResponseResponseSchema =
  assessmentResponseEntitySchema.extend({
    // Computed fields
    isSkipped: z.boolean(),
    hasValue: z.boolean(),
    hasText: z.boolean(),
    responseTimeText: z.string().optional(),
    confidenceDisplay: z.string().optional(),

    // Related data
    question: z.object({
      id: z.string().uuid(),
      questionText: z.string(),
      questionType: z.string(),
      orderIndex: z.number().int().min(0),
      apestDimension: z.string().optional(),
    }),

    userAssessment: z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      assessmentId: z.string().uuid(),
      completedAt: z.string().datetime().optional(),
    }),
  });

// ============================================================================
// ASSESSMENT CREATE SCHEMAS
// ============================================================================

export const createAssessmentSchema = assessmentEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    name: z.string().min(1, 'Assessment name is required').max(200),
    slug: z.string().min(1, 'Assessment slug is required').max(100),
    assessmentType: z.enum([
      'apest',
      'mdna',
      'cultural_intelligence',
      'leadership_style',
      'spiritual_gifts',
      'other',
    ]),
    questionsCount: z
      .number()
      .int()
      .min(1, 'Questions count must be at least 1'),
  });

export const createAssessmentQuestionSchema = assessmentQuestionEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    assessmentId: z.string().uuid(),
    questionText: z.string().min(1, 'Question text is required').max(1000),
    questionType: z.enum([
      'likert',
      'multiple_choice',
      'binary',
      'ranking',
      'text',
    ]),
    orderIndex: z.number().int().min(0),
  });

export const createUserAssessmentSchema = userAssessmentEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    completedAt: true,
    completionPercentage: true,
  })
  .extend({
    userId: z.string().uuid(),
    assessmentId: z.string().uuid(),
  });

export const createAssessmentResponseSchema = assessmentResponseEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    userAssessmentId: z.string().uuid(),
    questionId: z.string().uuid(),
  });

// ============================================================================
// ASSESSMENT UPDATE SCHEMAS
// ============================================================================

export const updateAssessmentSchema = createAssessmentSchema.partial().omit({
  slug: true, // Slug cannot be changed after creation
});

export const updateAssessmentQuestionSchema =
  createAssessmentQuestionSchema.partial();

export const updateUserAssessmentSchema = createUserAssessmentSchema
  .partial()
  .omit({
    userId: true,
    assessmentId: true,
  });

export const updateAssessmentResponseSchema = createAssessmentResponseSchema
  .partial()
  .omit({
    userAssessmentId: true,
    questionId: true,
  });

// ============================================================================
// ASSESSMENT QUERY SCHEMAS
// ============================================================================

export const assessmentQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Search
  search: z.string().optional(),

  // Filters
  assessmentType: z.string().optional(),
  status: z.string().optional(),
  language: z.string().optional(),
  culturalAdaptation: z.string().optional(),
  researchBacked: z.boolean().optional(),

  // Sorting
  sortBy: z
    .enum([
      'createdAt',
      'updatedAt',
      'publishedAt',
      'name',
      'questionsCount',
      'estimatedDuration',
    ])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Include related data
  includeQuestions: z.boolean().default(false),
  includeStatistics: z.boolean().default(false),
});

export const assessmentQuestionQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Filters
  assessmentId: z.string().uuid().optional(),
  questionType: z.string().optional(),
  category: z.string().optional(),
  apestDimension: z.string().optional(),
  isRequired: z.boolean().optional(),

  // Sorting
  sortBy: z
    .enum(['orderIndex', 'createdAt', 'updatedAt'])
    .default('orderIndex'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),

  // Include related data
  includeAssessment: z.boolean().default(false),
});

export const userAssessmentQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Filters
  userId: z.string().uuid().optional(),
  assessmentId: z.string().uuid().optional(),
  isCompleted: z.boolean().optional(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),

  // Date filters
  startedAfter: z.string().datetime().optional(),
  startedBefore: z.string().datetime().optional(),
  completedAfter: z.string().datetime().optional(),
  completedBefore: z.string().datetime().optional(),

  // Sorting
  sortBy: z
    .enum([
      'createdAt',
      'updatedAt',
      'startedAt',
      'completedAt',
      'totalScore',
      'completionPercentage',
    ])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Include related data
  includeUser: z.boolean().default(true),
  includeAssessment: z.boolean().default(true),
  includeResponses: z.boolean().default(false),
});

export const assessmentResponseQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Filters
  userAssessmentId: z.string().uuid().optional(),
  questionId: z.string().uuid().optional(),
  skipped: z.boolean().optional(),

  // Sorting
  sortBy: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),

  // Include related data
  includeQuestion: z.boolean().default(true),
  includeUserAssessment: z.boolean().default(false),
});

// ============================================================================
// ASSESSMENT FORM SCHEMAS (for UI forms)
// ============================================================================

export const startAssessmentInputSchema = z.object({
  assessmentId: z.string().uuid(),
  userId: z.string().uuid(),
});

export const completeAssessmentInputSchema = z.object({
  userAssessmentId: z.string().uuid(),
  responses: z.array(
    z.object({
      questionId: z.string().uuid(),
      responseValue: z.number().int().optional(),
      responseText: z.string().optional(),
      responseTime: z.number().int().min(0).optional(),
      confidence: z.number().int().min(1).max(5).optional(),
      skipped: z.boolean().default(false),
    })
  ),
});

export const saveResponsesInputSchema = z.object({
  userAssessmentId: z.string().uuid(),
  responses: z.array(
    z.object({
      questionId: z.string().uuid(),
      responseValue: z.number().int().optional(),
      responseText: z.string().optional(),
      responseTime: z.number().int().min(0).optional(),
      confidence: z.number().int().min(1).max(5).optional(),
      skipped: z.boolean().default(false),
    })
  ),
});

// ============================================================================
// ASSESSMENT FILTER SCHEMAS
// ============================================================================

export const userAssessmentFiltersSchema = z.object({
  assessmentType: z.string().optional(),
  isCompleted: z.boolean().optional(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  dateRange: z
    .object({
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
    })
    .optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AssessmentEntity = z.infer<typeof assessmentEntitySchema>;
export type AssessmentQuestionEntity = z.infer<
  typeof assessmentQuestionEntitySchema
>;

// Alias for backward compatibility
export type AssessmentQuestion = AssessmentQuestionEntity;
export type UserAssessmentEntity = z.infer<typeof userAssessmentEntitySchema>;
export type AssessmentResponseEntity = z.infer<
  typeof assessmentResponseEntitySchema
>;

export type AssessmentResponse = z.infer<typeof assessmentResponseSchema>;
export type AssessmentQuestionResponse = z.infer<
  typeof assessmentQuestionResponseSchema
>;
export type UserAssessmentResponse = z.infer<
  typeof userAssessmentResponseSchema
>;
export type AssessmentResponseResponse = z.infer<
  typeof assessmentResponseResponseSchema
>;

export type CreateAssessment = z.infer<typeof createAssessmentSchema>;
export type CreateAssessmentQuestion = z.infer<
  typeof createAssessmentQuestionSchema
>;
export type CreateUserAssessment = z.infer<typeof createUserAssessmentSchema>;
export type CreateAssessmentResponse = z.infer<
  typeof createAssessmentResponseSchema
>;

export type UpdateAssessment = z.infer<typeof updateAssessmentSchema>;
export type UpdateAssessmentQuestion = z.infer<
  typeof updateAssessmentQuestionSchema
>;
export type UpdateUserAssessment = z.infer<typeof updateUserAssessmentSchema>;
export type UpdateAssessmentResponse = z.infer<
  typeof updateAssessmentResponseSchema
>;

export type AssessmentQuery = z.infer<typeof assessmentQuerySchema>;
export type AssessmentQuestionQuery = z.infer<
  typeof assessmentQuestionQuerySchema
>;
export type UserAssessmentQuery = z.infer<typeof userAssessmentQuerySchema>;
export type AssessmentResponseQuery = z.infer<
  typeof assessmentResponseQuerySchema
>;

export type StartAssessmentInput = z.infer<typeof startAssessmentInputSchema>;
export type CompleteAssessmentInput = z.infer<
  typeof completeAssessmentInputSchema
>;
export type SaveResponsesInput = z.infer<typeof saveResponsesInputSchema>;
export type UserAssessmentFilters = z.infer<typeof userAssessmentFiltersSchema>;

// Legacy type exports for backward compatibility
export type AssessmentWithQuestions = AssessmentResponse;
export type AssessmentWithQuestionsResponse = AssessmentResponse;

// Legacy aliases for backward compatibility
export type Assessment = AssessmentEntity;
export type NewAssessment = CreateAssessment;
export type NewAssessmentQuestion = CreateAssessmentQuestion;
export type NewAssessmentResponse = CreateAssessmentResponse;
export type NewUserAssessment = CreateUserAssessment;
export type UserAssessment = UserAssessmentEntity;
export type AssessmentSearch = AssessmentQuery;
export const paginatedAssessmentListResponseSchema = z.object({
  data: z.array(assessmentResponseSchema),
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    hasMore: z.boolean(),
  }),
});

export const paginatedUserAssessmentListResponseSchema = z.object({
  data: z.array(userAssessmentResponseSchema),
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    hasMore: z.boolean(),
  }),
});

export type PaginatedAssessmentListResponse = z.infer<
  typeof paginatedAssessmentListResponseSchema
>;
export type PaginatedUserAssessmentListResponse = z.infer<
  typeof paginatedUserAssessmentListResponseSchema
>;
export type UserAssessmentWithDetailsResponse = UserAssessmentResponse;

// ============================================================================
// ADDITIONAL SCHEMAS FOR SHARED PACKAGE COMPATIBILITY
// ============================================================================

// Assessment Search Schema (alias for AssessmentQuery)
export const assessmentSearchSchema = assessmentQuerySchema;

// Assessment With Questions Schema
export const assessmentWithQuestionsSchema = z.object({
  assessment: assessmentEntitySchema,
  questions: z.array(assessmentQuestionEntitySchema),
});

// Schema aliases for backward compatibility
export const assessmentSchema = assessmentEntitySchema;
export const assessmentQuestionSchema = assessmentQuestionEntitySchema;
export const userAssessmentSchema = userAssessmentEntitySchema;
export const newAssessmentResponseSchema = createAssessmentResponseSchema;
