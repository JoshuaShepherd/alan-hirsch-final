// Auto-generated contracts for assessments
// Generated at: 2025-10-06T20:01:40.348Z

import { z } from 'zod';

// Entity validation schema for assessments
export const assessmentsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  assessmentType: z.string().nullable(),
  questionsCount: z.number().int(),
  estimatedDuration: z.number().int().nullable(),
  passingScore: z.number().int().nullable(),
  version: z.string().default('1.0').nullable(),
  language: z.string().default('en').nullable(),
  culturalAdaptation: z.string().nullable(),
  researchBacked: z.boolean().default(false).nullable(),
  validityScore: z.number().nullable(),
  reliabilityScore: z.number().nullable(),
  instructions: z.string().nullable(),
  scoringMethod: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
  publishedAt: z.string().datetime().nullable(),
});

// Create validation schema for assessments
export const createAssessmentsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  assessmentType: z.string(),
  questionsCount: z.number().int(),
  estimatedDuration: z.number().int(),
  passingScore: z.number().int(),
  version: z.string().optional().default('1.0'),
  language: z.string().optional().default('en'),
  culturalAdaptation: z.string(),
  researchBacked: z.boolean().optional().default(false),
  validityScore: z.number(),
  reliabilityScore: z.number(),
  instructions: z.string(),
  scoringMethod: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  publishedAt: z.string().datetime(),
});

// Update validation schema for assessments
export const updateAssessmentsSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    assessmentType: z.string(),
    questionsCount: z.number().int(),
    estimatedDuration: z.number().int(),
    passingScore: z.number().int(),
    version: z.string().optional().default('1.0'),
    language: z.string().optional().default('en'),
    culturalAdaptation: z.string(),
    researchBacked: z.boolean().optional().default(false),
    validityScore: z.number(),
    reliabilityScore: z.number(),
    instructions: z.string(),
    scoringMethod: z.string(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    updatedAt: z.string().datetime().optional().default('NOW()'),
    publishedAt: z.string().datetime(),
  })
  .partial();

// Query validation schema for assessments
export const assessmentsQuerySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  assessmentType: z.string(),
  questionsCount: z.number().int(),
  estimatedDuration: z.number().int(),
  passingScore: z.number().int(),
  version: z.string().optional().default('1.0'),
  language: z.string().optional().default('en'),
  culturalAdaptation: z.string(),
  researchBacked: z.boolean().optional().default(false),
  validityScore: z.number(),
  reliabilityScore: z.number(),
  instructions: z.string(),
  scoringMethod: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  publishedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for assessmentQuestions
export const assessmentQuestionsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: z.string().nullable(),
  orderIndex: z.number().int(),
  isRequired: z.boolean().default(true).nullable(),
  category: z.string().nullable(),
  weight: z.number().default(1.0).nullable(),
  reverseScored: z.boolean().default(false).nullable(),
  apestDimension: z.string().nullable(),
  answerOptions: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
      description: z.string().optional(),
    })
  ),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for assessmentQuestions
export const createAssessmentQuestionsSchema = z.object({
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: z.string(),
  orderIndex: z.number().int(),
  isRequired: z.boolean().optional().default(true),
  category: z.string(),
  weight: z.number().optional().default(1.0),
  reverseScored: z.boolean().optional().default(false),
  apestDimension: z.string(),
  answerOptions: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

// Update validation schema for assessmentQuestions
export const updateAssessmentQuestionsSchema = z
  .object({
    assessmentId: z.string().uuid(),
    questionText: z.string(),
    questionType: z.string(),
    orderIndex: z.number().int(),
    isRequired: z.boolean().optional().default(true),
    category: z.string(),
    weight: z.number().optional().default(1.0),
    reverseScored: z.boolean().optional().default(false),
    apestDimension: z.string(),
    answerOptions: z
      .array(
        z.object({
          value: z.number(),
          label: z.string(),
          description: z.string().optional(),
        })
      )
      .optional(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for assessmentQuestions
export const assessmentQuestionsQuerySchema = z.object({
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: z.string(),
  orderIndex: z.number().int(),
  isRequired: z.boolean().optional().default(true),
  category: z.string(),
  weight: z.number().optional().default(1.0),
  reverseScored: z.boolean().optional().default(false),
  apestDimension: z.string(),
  answerOptions: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for userAssessments
export const userAssessmentsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  startedAt: z.string().datetime().default('NOW()'),
  completedAt: z.string().datetime().nullable(),
  completionPercentage: z.number().int().default(0).nullable(),
  rawScores: z.record(z.string(), z.number()),
  totalScore: z.number().int().nullable(),
  maxPossibleScore: z.number().int().nullable(),
  apostolicScore: z.number().int().nullable(),
  propheticScore: z.number().int().nullable(),
  evangelisticScore: z.number().int().nullable(),
  shepherdingScore: z.number().int().nullable(),
  teachingScore: z.number().int().nullable(),
  normalizedScores: z.record(z.string(), z.number()),
  primaryGift: z.string().nullable(),
  secondaryGift: z.string().nullable(),
  responseConsistency: z.number().nullable(),
  completionTime: z.number().int().nullable(),
  confidenceLevel: z.number().int().nullable(),
  culturalAdjustmentApplied: z.boolean().default(false).nullable(),
  culturalAdjustmentFactor: z.number().nullable(),
  aiInsights: z.string().nullable(),
  personalizedRecommendations: z.object({
    strengths: z.array(z.string()),
    growthAreas: z.array(z.string()),
    actionItems: z.array(z.string()),
    contentRecommendations: z.array(z.string()),
  }),
  suggestedPeers: z.array(z.string()),
  complementaryGifts: z.array(z.string()),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userAssessments
export const createUserAssessmentsSchema = z.object({
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  startedAt: z.string().datetime().default('NOW()'),
  completedAt: z.string().datetime(),
  completionPercentage: z.number().int().optional().default(0),
  rawScores: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().int(),
  maxPossibleScore: z.number().int(),
  apostolicScore: z.number().int(),
  propheticScore: z.number().int(),
  evangelisticScore: z.number().int(),
  shepherdingScore: z.number().int(),
  teachingScore: z.number().int(),
  normalizedScores: z.record(z.string(), z.number()).optional(),
  primaryGift: z.string(),
  secondaryGift: z.string(),
  responseConsistency: z.number(),
  completionTime: z.number().int(),
  confidenceLevel: z.number().int(),
  culturalAdjustmentApplied: z.boolean().optional().default(false),
  culturalAdjustmentFactor: z.number(),
  aiInsights: z.string(),
  personalizedRecommendations: z
    .object({
      strengths: z.array(z.string()),
      growthAreas: z.array(z.string()),
      actionItems: z.array(z.string()),
      contentRecommendations: z.array(z.string()),
    })
    .optional(),
  suggestedPeers: z.array(z.string()).optional(),
  complementaryGifts: z.array(z.string()).optional(),
});

// Update validation schema for userAssessments
export const updateUserAssessmentsSchema = z
  .object({
    userId: z.string().uuid(),
    assessmentId: z.string().uuid(),
    startedAt: z.string().datetime().optional().default('NOW()'),
    completedAt: z.string().datetime(),
    completionPercentage: z.number().int().optional().default(0),
    rawScores: z.record(z.string(), z.number()).optional(),
    totalScore: z.number().int(),
    maxPossibleScore: z.number().int(),
    apostolicScore: z.number().int(),
    propheticScore: z.number().int(),
    evangelisticScore: z.number().int(),
    shepherdingScore: z.number().int(),
    teachingScore: z.number().int(),
    normalizedScores: z.record(z.string(), z.number()).optional(),
    primaryGift: z.string(),
    secondaryGift: z.string(),
    responseConsistency: z.number(),
    completionTime: z.number().int(),
    confidenceLevel: z.number().int(),
    culturalAdjustmentApplied: z.boolean().optional().default(false),
    culturalAdjustmentFactor: z.number(),
    aiInsights: z.string(),
    personalizedRecommendations: z
      .object({
        strengths: z.array(z.string()),
        growthAreas: z.array(z.string()),
        actionItems: z.array(z.string()),
        contentRecommendations: z.array(z.string()),
      })
      .optional(),
    suggestedPeers: z.array(z.string()).optional(),
    complementaryGifts: z.array(z.string()).optional(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userAssessments
export const userAssessmentsQuerySchema = z.object({
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  startedAt: z.string().datetime().optional().default('NOW()'),
  completedAt: z.string().datetime(),
  completionPercentage: z.number().int().optional().default(0),
  rawScores: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().int(),
  maxPossibleScore: z.number().int(),
  apostolicScore: z.number().int(),
  propheticScore: z.number().int(),
  evangelisticScore: z.number().int(),
  shepherdingScore: z.number().int(),
  teachingScore: z.number().int(),
  normalizedScores: z.record(z.string(), z.number()).optional(),
  primaryGift: z.string(),
  secondaryGift: z.string(),
  responseConsistency: z.number(),
  completionTime: z.number().int(),
  confidenceLevel: z.number().int(),
  culturalAdjustmentApplied: z.boolean().optional().default(false),
  culturalAdjustmentFactor: z.number(),
  aiInsights: z.string(),
  personalizedRecommendations: z
    .object({
      strengths: z.array(z.string()),
      growthAreas: z.array(z.string()),
      actionItems: z.array(z.string()),
      contentRecommendations: z.array(z.string()),
    })
    .optional(),
  suggestedPeers: z.array(z.string()).optional(),
  complementaryGifts: z.array(z.string()).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for assessmentResponses
export const assessmentResponsesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().int().nullable(),
  responseText: z.string().nullable(),
  responseTime: z.number().int().nullable(),
  confidence: z.number().int().nullable(),
  skipped: z.boolean().default(false).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for assessmentResponses
export const createAssessmentResponsesSchema = z.object({
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().int(),
  responseText: z.string(),
  responseTime: z.number().int(),
  confidence: z.number().int(),
  skipped: z.boolean().optional().default(false),
});

// Update validation schema for assessmentResponses
export const updateAssessmentResponsesSchema = z
  .object({
    userAssessmentId: z.string().uuid(),
    questionId: z.string().uuid(),
    responseValue: z.number().int(),
    responseText: z.string(),
    responseTime: z.number().int(),
    confidence: z.number().int(),
    skipped: z.boolean().optional().default(false),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for assessmentResponses
export const assessmentResponsesQuerySchema = z.object({
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.number().int(),
  responseText: z.string(),
  responseTime: z.number().int(),
  confidence: z.number().int(),
  skipped: z.boolean().optional().default(false),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
