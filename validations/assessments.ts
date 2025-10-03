import { z } from 'zod';

// Assessment Validation Schemas - ⏳ PLANNED
export const assessmentTypeSchema = z.enum([
  'apest',
  'mdna',
  'cultural_intelligence',
  'leadership_style',
  'spiritual_gifts',
  'other'
]);

export const culturalAdaptationSchema = z.enum([
  'western',
  'eastern',
  'african',
  'latin_american',
  'middle_eastern',
  'oceanic',
  'universal'
]);

export const scoringMethodSchema = z.enum([
  'likert_5',
  'likert_7',
  'binary',
  'ranking',
  'weighted'
]);

export const assessmentStatusSchema = z.enum([
  'draft',
  'active',
  'archived',
  'under_review'
]);

export const assessmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  
  // Assessment Classification
  assessmentType: assessmentTypeSchema,
  
  // Assessment Configuration
  questionsCount: z.number().int().min(1),
  estimatedDuration: z.number().int().min(1).optional(), // minutes
  passingScore: z.number().int().min(0).optional(),
  
  // Versioning & Localization
  version: z.string().default('1.0'),
  language: z.string().default('en'),
  culturalAdaptation: culturalAdaptationSchema.default('universal'),
  
  // Research & Validity
  researchBacked: z.boolean().default(false),
  validityScore: z.number().min(0).max(1).optional(),
  reliabilityScore: z.number().min(0).max(1).optional(),
  
  // Configuration
  instructions: z.string().optional(),
  scoringMethod: scoringMethodSchema.default('likert_5'),
  
  // Status
  status: assessmentStatusSchema.default('draft'),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional()
});

export const newAssessmentSchema = assessmentSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  publishedAt: true
});

// Assessment Question Validation Schemas
export const questionTypeSchema = z.enum([
  'likert',
  'multiple_choice',
  'binary',
  'ranking',
  'text'
]);

export const apestDimensionSchema = z.enum([
  'apostolic',
  'prophetic',
  'evangelistic',
  'shepherding',
  'teaching'
]);

export const answerOptionSchema = z.object({
  value: z.number(),
  label: z.string(),
  description: z.string().optional()
});

export const assessmentQuestionSchema = z.object({
  id: z.string().uuid(),
  assessmentId: z.string().uuid(),
  
  // Question Content
  questionText: z.string().min(1),
  questionType: questionTypeSchema,
  
  // Question Configuration
  orderIndex: z.number().int().min(0),
  isRequired: z.boolean().default(true),
  category: z.string().optional(),
  
  // Scoring
  weight: z.number().min(0).default(1.0),
  reverseScored: z.boolean().default(false),
  
  // APEST Mapping
  apestDimension: apestDimensionSchema.optional(),
  
  // Answer Options
  answerOptions: z.array(answerOptionSchema).optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newAssessmentQuestionSchema = assessmentQuestionSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true
});

// User Assessment Validation Schemas
export const personalizedRecommendationsSchema = z.object({
  strengths: z.array(z.string()),
  growthAreas: z.array(z.string()),
  actionItems: z.array(z.string()),
  contentRecommendations: z.array(z.string())
});

export const userAssessmentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  
  // Completion Status
  startedAt: z.date(),
  completedAt: z.date().optional(),
  completionPercentage: z.number().int().min(0).max(100).default(0),
  
  // Raw Scores
  rawScores: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().int().min(0).optional(),
  maxPossibleScore: z.number().int().min(0).optional(),
  
  // APEST Specific Scores
  apostolicScore: z.number().int().min(0).optional(),
  propheticScore: z.number().int().min(0).optional(),
  evangelisticScore: z.number().int().min(0).optional(),
  shepherdingScore: z.number().int().min(0).optional(),
  teachingScore: z.number().int().min(0).optional(),
  
  // Normalized Scores (0-100 scale)
  normalizedScores: z.record(z.string(), z.number()).optional(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  
  // Quality Metrics
  responseConsistency: z.number().min(0).max(1).optional(),
  completionTime: z.number().int().min(0).optional(), // minutes
  confidenceLevel: z.number().int().min(1).max(5).optional(),
  
  // Cultural Adjustment
  culturalAdjustmentApplied: z.boolean().default(false),
  culturalAdjustmentFactor: z.number().min(0).optional(),
  
  // AI Generated Insights
  aiInsights: z.string().optional(),
  personalizedRecommendations: personalizedRecommendationsSchema.optional(),
  
  // Peer Matching
  suggestedPeers: z.array(z.string().uuid()).default([]),
  complementaryGifts: z.array(z.string()).default([]),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newUserAssessmentSchema = userAssessmentSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  completedAt: true
});

// Assessment Response Validation Schemas
export const assessmentResponseSchema = z.object({
  id: z.string().uuid(),
  userAssessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  
  // Response Data
  responseValue: z.number().int().optional(),
  responseText: z.string().optional(),
  responseTime: z.number().int().min(0).optional(), // seconds
  
  // Quality Indicators
  confidence: z.number().int().min(1).max(5).optional(),
  skipped: z.boolean().default(false),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newAssessmentResponseSchema = assessmentResponseSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true
});

// Additional validation schemas for API endpoints
export const assessmentWithQuestionsSchema = assessmentSchema.extend({
  questions: z.array(assessmentQuestionSchema)
});

export const startAssessmentInputSchema = z.object({
  assessmentId: z.string().uuid()
});

export const saveResponsesInputSchema = z.object({
  responses: z.array(z.object({
    questionId: z.string().uuid(),
    responseValue: z.number().int().optional(),
    responseText: z.string().optional(),
    responseTime: z.number().int().min(0).optional(),
    confidence: z.number().int().min(1).max(5).optional(),
    skipped: z.boolean().default(false),
  }))
});

export const completeAssessmentInputSchema = z.object({
  totalScore: z.number().int().min(0),
  maxPossibleScore: z.number().int().min(0),
  rawScores: z.record(z.string(), z.number()),
  normalizedScores: z.record(z.string(), z.number()),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  completionTime: z.number().int().min(0),
  responseConsistency: z.number().min(0).max(1).optional(),
  aiInsights: z.string().optional(),
  personalizedRecommendations: personalizedRecommendationsSchema.optional(),
});

// Assessment search/filter schemas
export const assessmentSearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  assessmentType: assessmentTypeSchema.optional(),
  status: assessmentStatusSchema.optional(),
  language: z.string().optional(),
  culturalAdaptation: culturalAdaptationSchema.optional(),
  researchBacked: z.boolean().optional(),
});

export const userAssessmentFiltersSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  assessmentType: z.string().optional(),
  completed: z.boolean().optional(),
});

// Type exports
export type Assessment = z.infer<typeof assessmentSchema>;
export type NewAssessment = z.infer<typeof newAssessmentSchema>;
export type AssessmentQuestion = z.infer<typeof assessmentQuestionSchema>;
export type NewAssessmentQuestion = z.infer<typeof newAssessmentQuestionSchema>;
export type UserAssessment = z.infer<typeof userAssessmentSchema>;
export type NewUserAssessment = z.infer<typeof newUserAssessmentSchema>;
export type AssessmentResponse = z.infer<typeof assessmentResponseSchema>;
export type NewAssessmentResponse = z.infer<typeof newAssessmentResponseSchema>;

// Additional type exports
export type AssessmentWithQuestions = z.infer<typeof assessmentWithQuestionsSchema>;
export type StartAssessmentInput = z.infer<typeof startAssessmentInputSchema>;
export type SaveResponsesInput = z.infer<typeof saveResponsesInputSchema>;
export type CompleteAssessmentInput = z.infer<typeof completeAssessmentInputSchema>;
export type AssessmentSearch = z.infer<typeof assessmentSearchSchema>;
export type UserAssessmentFilters = z.infer<typeof userAssessmentFiltersSchema>;
