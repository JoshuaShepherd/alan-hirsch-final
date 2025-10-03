import { z } from 'zod';

// Assessment Response DTOs - Output validation for API endpoints
// These schemas ensure consistent, UI-friendly data shapes

// Assessment Response DTO
export const assessmentResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),

  // Assessment Classification
  assessmentType: z.enum([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),

  // Assessment Configuration
  questionsCount: z.number().int(),
  estimatedDuration: z.number().int().nullable(), // minutes
  passingScore: z.number().int().nullable(),

  // Versioning & Localization
  version: z.string(),
  language: z.string(),
  culturalAdaptation: z.enum([
    'western',
    'eastern',
    'african',
    'latin_american',
    'middle_eastern',
    'oceanic',
    'universal',
    'global',
  ]),

  // Research & Validity
  researchBacked: z.boolean(),
  validityScore: z.string(), // Decimal from database
  reliabilityScore: z.string(), // Decimal from database

  // Configuration
  instructions: z.string(),
  scoringMethod: z.enum([
    'likert_5',
    'likert_7',
    'binary',
    'ranking',
    'weighted',
  ]),

  // Status
  status: z.enum(['draft', 'active', 'archived', 'under_review']),

  // Computed fields for UI
  isPublished: z.boolean(),
  isActive: z.boolean(),
  estimatedDurationText: z.string(), // e.g., "15 minutes"

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

// Assessment Question Response DTO
export const assessmentQuestionResponseSchema = z.object({
  id: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: z.enum([
    'likert',
    'multiple_choice',
    'binary',
    'ranking',
    'text',
  ]),
  orderIndex: z.number().int(),
  isRequired: z.boolean(),
  category: z.string(),
  weight: z.number(),
  reverseScored: z.boolean(),
  apestDimension: z
    .enum(['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'])
    .nullable(),
  answerOptions: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
      description: z.string(),
    })
  ),

  // Computed fields for UI
  hasAnswerOptions: z.boolean(),
  isApestQuestion: z.boolean(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// User Assessment Response DTO
export const userAssessmentResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),

  // Completion Status
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  completionPercentage: z.number().int(),

  // Raw Scores
  rawScores: z.record(z.string(), z.number()),
  totalScore: z.number().int(),
  maxPossibleScore: z.number().int(),

  // APEST Specific Scores
  apostolicScore: z.number().int(),
  propheticScore: z.number().int(),
  evangelisticScore: z.number().int(),
  shepherdingScore: z.number().int(),
  teachingScore: z.number().int(),

  // Normalized Scores (0-100 scale)
  normalizedScores: z.record(z.string(), z.number()),
  primaryGift: z.string(),
  secondaryGift: z.string(),

  // Quality Metrics
  responseConsistency: z.string().nullable(), // Decimal from database
  completionTime: z.number().int(), // minutes
  confidenceLevel: z.number().int(),

  // Cultural Adjustment
  culturalAdjustmentApplied: z.boolean(),
  culturalAdjustmentFactor: z.string(), // Decimal from database

  // AI Generated Insights
  aiInsights: z.string(),
  personalizedRecommendations: z.object({
    strengths: z.array(z.string()),
    growthAreas: z.array(z.string()),
    actionItems: z.array(z.string()),
    contentRecommendations: z.array(z.string()),
  }),

  // Peer Matching
  suggestedPeers: z.array(z.string()),
  complementaryGifts: z.array(z.string()),

  // Computed fields for UI
  isCompleted: z.boolean(),
  isInProgress: z.boolean(),
  completionTimeText: z.string(), // e.g., "12 minutes"
  scorePercentage: z.number(), // calculated from totalScore/maxPossibleScore
  apestScores: z.object({
    apostolic: z.number(),
    prophetic: z.number(),
    evangelistic: z.number(),
    shepherding: z.number(),
    teaching: z.number(),
  }),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Assessment Response Response DTO
export const assessmentResponseResponseSchema = z.object({
  id: z.string().uuid(),
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().int().nullable(),
  responseText: z.string().nullable(),
  responseTime: z.number().int(), // seconds
  confidence: z.number().int(),
  skipped: z.boolean(),

  // Computed fields for UI
  hasResponse: z.boolean(),
  responseTimeText: z.string(), // e.g., "45 seconds"

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Assessment with Questions Response DTO
export const assessmentWithQuestionsResponseSchema =
  assessmentResponseSchema.extend({
    questions: z.array(assessmentQuestionResponseSchema),
  });

// User Assessment with Assessment Details Response DTO
export const userAssessmentWithDetailsResponseSchema =
  userAssessmentResponseSchema.extend({
    assessment: z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      assessmentType: z.enum([
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ]),
      questionsCount: z.number().int(),
      estimatedDuration: z.number().int().nullable(),
    }),
  });

// Paginated Assessment List Response DTO
export const paginatedAssessmentListResponseSchema = z.object({
  items: z.array(assessmentResponseSchema),
  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Paginated User Assessment List Response DTO
export const paginatedUserAssessmentListResponseSchema = z.object({
  items: z.array(userAssessmentWithDetailsResponseSchema),
  pagination: z.object({
    page: z.number().int(),
    limit: z.number().int(),
    total: z.number().int(),
    totalPages: z.number().int(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Type exports
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
export type AssessmentWithQuestionsResponse = z.infer<
  typeof assessmentWithQuestionsResponseSchema
>;
export type UserAssessmentWithDetailsResponse = z.infer<
  typeof userAssessmentWithDetailsResponseSchema
>;
export type PaginatedAssessmentListResponse = z.infer<
  typeof paginatedAssessmentListResponseSchema
>;
export type PaginatedUserAssessmentListResponse = z.infer<
  typeof paginatedUserAssessmentListResponseSchema
>;
