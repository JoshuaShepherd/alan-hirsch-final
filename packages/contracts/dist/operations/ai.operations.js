import { z } from 'zod';
// ============================================================================
// AI OPERATIONS - DERIVED FROM ENTITY SCHEMAS
// ============================================================================
// Import entity schemas
import { aiContentJobEntitySchema, aiConversationEntitySchema, aiCrossReferenceSuggestionEntitySchema, aiMessageEntitySchema, theologicalConceptEntitySchema, } from '../entities/ai.schema';
// ============================================================================
// CREATE OPERATIONS
// ============================================================================
// Create AI Conversation
export const createAiConversationSchema = aiConversationEntitySchema
    .omit({
    id: true,
    totalMessages: true,
    totalTokensUsed: true,
    createdAt: true,
    updatedAt: true,
    completedAt: true,
})
    .extend({
    userId: z.string().uuid(),
    conversationType: z.enum([
        'theological_discussion',
        'content_creation',
        'assessment_guidance',
        'ministry_advice',
        'leadership_coaching',
        'content_discovery',
        'research_assistance',
        'general',
    ]),
});
// Create AI Message
export const createAiMessageSchema = aiMessageEntitySchema
    .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})
    .extend({
    conversationId: z.string().uuid(),
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1),
    messageIndex: z.number().int().min(0),
});
// Create AI Content Job
export const createAiContentJobSchema = aiContentJobEntitySchema
    .omit({
    id: true,
    retryCount: true,
    createdAt: true,
    startedAt: true,
    completedAt: true,
    updatedAt: true,
})
    .extend({
    jobType: z.enum([
        'summarize',
        'extract_key_points',
        'generate_cross_references',
        'enhance_seo',
        'translate',
        'generate_questions',
        'create_outline',
        'fact_check',
    ]),
    contentId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
});
// Create AI Cross Reference Suggestion
export const createAiCrossReferenceSuggestionSchema = aiCrossReferenceSuggestionEntitySchema
    .omit({
    id: true,
    createdAt: true,
    reviewedAt: true,
    implementedAt: true,
})
    .extend({
    sourceContentId: z.string().uuid(),
    targetContentId: z.string().uuid(),
    suggestedReferenceType: z.enum([
        'builds_on',
        'contradicts',
        'supports',
        'extends',
        'applies',
        'critiques',
        'synthesizes',
    ]),
    confidenceScore: z.string(),
    relevanceScore: z.string(),
});
// Create Theological Concept
export const createTheologicalConceptSchema = theologicalConceptEntitySchema
    .omit({
    id: true,
    contentReferences: true,
    searchCount: true,
    createdAt: true,
    updatedAt: true,
})
    .extend({
    name: z.string().min(1).max(200),
    slug: z.string().min(1).max(200),
    conceptType: z.enum([
        'doctrine',
        'practice',
        'tradition',
        'movement',
        'person',
        'event',
        'text',
    ]),
});
// ============================================================================
// UPDATE OPERATIONS
// ============================================================================
// Update AI Conversation
export const updateAiConversationSchema = createAiConversationSchema
    .partial()
    .extend({
    status: z.enum(['active', 'completed', 'abandoned', 'archived']).optional(),
    userSatisfactionRating: z.number().int().min(1).max(5).optional(),
    helpfulnessRating: z.number().int().min(1).max(5).optional(),
    theologicalAccuracyVerified: z.boolean().optional(),
});
// Update AI Message
export const updateAiMessageSchema = createAiMessageSchema.partial().extend({
    userRating: z.number().int().min(1).max(5).optional(),
    userFeedback: z.string().max(1000).optional(),
    flaggedForReview: z.boolean().optional(),
});
// Update AI Content Job
export const updateAiContentJobSchema = createAiContentJobSchema
    .partial()
    .extend({
    status: z
        .enum(['pending', 'processing', 'completed', 'failed', 'cancelled'])
        .optional(),
    result: z.record(z.string(), z.any()).optional(),
    confidenceScore: z.string().optional(),
    humanReviewed: z.boolean().optional(),
    humanApproved: z.boolean().optional(),
    reviewNotes: z.string().max(1000).optional(),
    errorMessage: z.string().max(1000).optional(),
});
// Update AI Cross Reference Suggestion
export const updateAiCrossReferenceSuggestionSchema = createAiCrossReferenceSuggestionSchema.partial().extend({
    status: z
        .enum(['pending', 'approved', 'rejected', 'implemented'])
        .optional(),
    humanReviewed: z.boolean().optional(),
    humanApproved: z.boolean().optional(),
    reviewNotes: z.string().max(1000).optional(),
});
// Update Theological Concept
export const updateTheologicalConceptSchema = createTheologicalConceptSchema
    .partial()
    .extend({
    definition: z.string().max(2000).optional(),
    historicalPeriod: z.string().max(100).optional(),
});
// ============================================================================
// QUERY OPERATIONS
// ============================================================================
// AI Conversation Query
export const aiConversationQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sortBy: z
        .enum(['createdAt', 'updatedAt', 'totalMessages', 'userSatisfactionRating'])
        .default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    // Filters
    userId: z.string().uuid().optional(),
    conversationType: z
        .enum([
        'theological_discussion',
        'content_creation',
        'assessment_guidance',
        'ministry_advice',
        'leadership_coaching',
        'content_discovery',
        'research_assistance',
        'general',
    ])
        .optional(),
    status: z.enum(['active', 'completed', 'abandoned', 'archived']).optional(),
    aiModel: z.string().optional(),
    hasRating: z.boolean().optional(),
});
// AI Message Query
export const aiMessageQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sortBy: z
        .enum(['createdAt', 'messageIndex', 'userRating'])
        .default('messageIndex'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    search: z.string().optional(),
    // Filters
    conversationId: z.string().uuid().optional(),
    role: z.enum(['user', 'assistant', 'system']).optional(),
    hasRating: z.boolean().optional(),
    flaggedForReview: z.boolean().optional(),
});
// AI Content Job Query
export const aiContentJobQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sortBy: z
        .enum(['createdAt', 'startedAt', 'completedAt', 'priority'])
        .default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    // Filters
    contentId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    jobType: z
        .enum([
        'summarize',
        'extract_key_points',
        'generate_cross_references',
        'enhance_seo',
        'translate',
        'generate_questions',
        'create_outline',
        'fact_check',
    ])
        .optional(),
    status: z
        .enum(['pending', 'processing', 'completed', 'failed', 'cancelled'])
        .optional(),
    priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
    humanReviewed: z.boolean().optional(),
});
// AI Cross Reference Suggestion Query
export const aiCrossReferenceSuggestionQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sortBy: z
        .enum(['createdAt', 'confidenceScore', 'relevanceScore'])
        .default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    // Filters
    sourceContentId: z.string().uuid().optional(),
    targetContentId: z.string().uuid().optional(),
    suggestedReferenceType: z
        .enum([
        'builds_on',
        'contradicts',
        'supports',
        'extends',
        'applies',
        'critiques',
        'synthesizes',
    ])
        .optional(),
    status: z.enum(['pending', 'approved', 'rejected', 'implemented']).optional(),
    humanReviewed: z.boolean().optional(),
    highConfidence: z.boolean().optional(),
    highRelevance: z.boolean().optional(),
});
// Theological Concept Query
export const theologicalConceptQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    sortBy: z
        .enum(['name', 'createdAt', 'contentReferences', 'searchCount'])
        .default('name'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
    search: z.string().optional(),
    // Filters
    conceptType: z
        .enum([
        'doctrine',
        'practice',
        'tradition',
        'movement',
        'person',
        'event',
        'text',
    ])
        .optional(),
    theologicalTradition: z.string().optional(),
    historicalPeriod: z.string().optional(),
    hasDefinition: z.boolean().optional(),
    frequentlyUsed: z.boolean().optional(),
});
//# sourceMappingURL=ai.operations.js.map