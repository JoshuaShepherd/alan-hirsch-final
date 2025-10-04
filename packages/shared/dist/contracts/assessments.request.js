import { z } from 'zod';
// Assessment Request DTOs - Input validation for API endpoints
// Create Assessment Request
export const createAssessmentRequestSchema = z.object({
    name: z.string().min(1, 'Assessment name is required').max(255),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    description: z.string().optional(),
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
    questionsCount: z.number().int().min(1, 'Must have at least 1 question'),
    estimatedDuration: z.number().int().min(1).optional(), // minutes
    passingScore: z.number().int().min(0).optional(),
    // Versioning & Localization
    version: z.string().default('1.0'),
    language: z.string().default('en'),
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
    // Research & Validity
    researchBacked: z.boolean().default(false),
    validityScore: z.string().optional(), // Decimal from database
    reliabilityScore: z.string().optional(), // Decimal from database
    // Configuration
    instructions: z.string().optional(),
    scoringMethod: z
        .enum(['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'])
        .default('likert_5'),
    // Status
    status: z
        .enum(['draft', 'active', 'archived', 'under_review'])
        .default('draft'),
});
// Update Assessment Request
export const updateAssessmentRequestSchema = createAssessmentRequestSchema
    .partial()
    .extend({
    id: z.string().uuid('Invalid assessment ID'),
});
// Create Assessment Question Request
export const createAssessmentQuestionRequestSchema = z.object({
    assessmentId: z.string().uuid('Invalid assessment ID'),
    questionText: z.string().min(1, 'Question text is required'),
    questionType: z.enum([
        'likert',
        'multiple_choice',
        'binary',
        'ranking',
        'text',
    ]),
    orderIndex: z.number().int().min(0),
    isRequired: z.boolean().default(true),
    category: z.string().optional(),
    weight: z.number().min(0).default(1.0),
    reverseScored: z.boolean().default(false),
    apestDimension: z
        .enum(['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'])
        .optional(),
    answerOptions: z
        .array(z.object({
        value: z.number(),
        label: z.string(),
        description: z.string().optional(),
    }))
        .optional(),
});
// Update Assessment Question Request
export const updateAssessmentQuestionRequestSchema = createAssessmentQuestionRequestSchema.partial().extend({
    id: z.string().uuid('Invalid question ID'),
});
// Start Assessment Request
export const startAssessmentRequestSchema = z.object({
    assessmentId: z.string().uuid('Invalid assessment ID'),
});
// Save Assessment Responses Request
export const saveAssessmentResponsesRequestSchema = z.object({
    userAssessmentId: z.string().uuid('Invalid user assessment ID'),
    responses: z
        .array(z.object({
        questionId: z.string().uuid('Invalid question ID'),
        responseValue: z.number().int().optional(),
        responseText: z.string().optional(),
        responseTime: z.number().int().min(0).optional(), // seconds
        confidence: z.number().int().min(1).max(5).optional(),
        skipped: z.boolean().optional(),
    }))
        .min(1, 'At least one response is required'),
});
// Complete Assessment Request
export const completeAssessmentRequestSchema = z.object({
    userAssessmentId: z.string().uuid('Invalid user assessment ID'),
    totalScore: z.number().int().min(0),
    maxPossibleScore: z.number().int().min(0),
    rawScores: z.record(z.string(), z.number()),
    normalizedScores: z.record(z.string(), z.number()),
    primaryGift: z.string().optional(),
    secondaryGift: z.string().optional(),
    completionTime: z.number().int().min(0), // minutes
    responseConsistency: z.string().optional(), // Decimal from database
    aiInsights: z.string().optional(),
    personalizedRecommendations: z
        .object({
        strengths: z.array(z.string()),
        growthAreas: z.array(z.string()),
        actionItems: z.array(z.string()),
        contentRecommendations: z.array(z.string()),
    })
        .optional(),
});
// Assessment Search Request
export const assessmentSearchRequestSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
    assessmentType: z
        .enum([
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
    ])
        .optional(),
    status: z
        .enum(['draft', 'active', 'archived', 'under_review'])
        .default('draft'),
    language: z.string().optional(),
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
        .optional(),
    researchBacked: z.boolean().optional(),
});
// User Assessment Filters Request
export const userAssessmentFiltersRequestSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    assessmentType: z.string().optional(),
    completed: z.boolean().optional(),
});
//# sourceMappingURL=assessments.request.js.map