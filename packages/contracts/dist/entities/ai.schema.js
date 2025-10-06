import { z } from 'zod';
// ============================================================================
// AI ENTITY SCHEMAS
// ============================================================================
// Aligned with AI tables from database schema
// AI Conversation Entity Schema
export const aiConversationEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    // Conversation Classification
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
    // Context & Topic
    title: z.string().nullable(),
    primaryTopic: z.string().nullable(),
    theologicalContext: z
        .object({
        themes: z.array(z.string()),
        scriptures: z.array(z.string()),
        traditions: z.array(z.string()),
    })
        .nullable(),
    // Personalization Context
    userApestProfile: z
        .object({
        primary: z.string(),
        secondary: z.string(),
        scores: z.record(z.string(), z.number()),
    })
        .nullable(),
    ministryContext: z
        .object({
        role: z.string(),
        experience: z.number(),
        focus_areas: z.array(z.string()),
    })
        .nullable(),
    culturalContext: z.string().nullable(),
    // Conversation Metrics
    totalMessages: z.number().int().default(0),
    conversationDurationMinutes: z.number().int().nullable(),
    // Quality & Satisfaction
    userSatisfactionRating: z.number().int().nullable(), // 1-5 scale
    theologicalAccuracyVerified: z.boolean().default(false),
    helpfulnessRating: z.number().int().nullable(), // 1-5 scale
    // AI Model Information
    aiModel: z.string().default('gpt-4'),
    modelVersion: z.string().nullable(),
    totalTokensUsed: z.number().int().default(0),
    // Content References
    referencedContent: z.array(z.string()).default([]),
    generatedInsights: z.string().nullable(),
    // Status
    status: z
        .enum(['active', 'completed', 'abandoned', 'archived'])
        .default('active'),
    // Timestamps
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    completedAt: z.string().datetime().nullable(),
});
// AI Message Entity Schema
export const aiMessageEntitySchema = z.object({
    id: z.string().uuid(),
    conversationId: z.string().uuid(),
    // Message Content
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
    // Message Metadata
    messageIndex: z.number().int(),
    tokenCount: z.number().int().nullable(),
    // Content References
    citedContent: z
        .array(z.object({
        contentId: z.string(),
        title: z.string(),
        relevanceScore: z.number(),
    }))
        .default([]),
    // Quality Indicators
    confidence: z.string().nullable(), // Decimal from database
    factualAccuracy: z.boolean().nullable(),
    theologicalSoundness: z.boolean().nullable(),
    // User Feedback
    userRating: z.number().int().nullable(), // 1-5 scale
    userFeedback: z.string().nullable(),
    flaggedForReview: z.boolean().default(false),
    // Processing Information
    processingTime: z.number().int().nullable(), // milliseconds
    // Timestamps
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// AI Content Job Entity Schema
export const aiContentJobEntitySchema = z.object({
    id: z.string().uuid(),
    contentId: z.string().uuid().nullable(),
    userId: z.string().uuid().nullable(),
    // Job Classification
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
    // Job Configuration
    parameters: z.record(z.string(), z.any()).default({}),
    priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
    // Processing Status
    status: z
        .enum(['pending', 'processing', 'completed', 'failed', 'cancelled'])
        .default('pending'),
    // Results
    result: z.record(z.string(), z.any()).nullable(),
    confidenceScore: z.string().nullable(), // Decimal from database
    // Quality Control
    humanReviewed: z.boolean().default(false),
    humanApproved: z.boolean().nullable(),
    reviewNotes: z.string().nullable(),
    // Processing Information
    aiModel: z.string().default('gpt-4'),
    tokensUsed: z.number().int().nullable(),
    processingCost: z.string().nullable(), // Decimal from database
    // Error Handling
    errorMessage: z.string().nullable(),
    retryCount: z.number().int().default(0),
    // Timestamps
    createdAt: z.string().datetime(),
    startedAt: z.string().datetime().nullable(),
    completedAt: z.string().datetime().nullable(),
    updatedAt: z.string().datetime(),
});
// AI Cross Reference Suggestion Entity Schema
export const aiCrossReferenceSuggestionEntitySchema = z.object({
    id: z.string().uuid(),
    sourceContentId: z.string().uuid(),
    targetContentId: z.string().uuid(),
    // AI Analysis
    suggestedReferenceType: z.enum([
        'builds_on',
        'contradicts',
        'supports',
        'extends',
        'applies',
        'critiques',
        'synthesizes',
    ]),
    // Confidence & Quality
    confidenceScore: z.string(), // Decimal from database
    relevanceScore: z.string(), // Decimal from database
    // AI Reasoning
    reasoning: z.string().nullable(),
    keyConnections: z
        .object({
        themes: z.array(z.string()),
        concepts: z.array(z.string()),
        scriptures: z.array(z.string()),
    })
        .nullable(),
    // Human Review
    humanReviewed: z.boolean().default(false),
    humanApproved: z.boolean().nullable(),
    reviewNotes: z.string().nullable(),
    // Implementation Status
    status: z
        .enum(['pending', 'approved', 'rejected', 'implemented'])
        .default('pending'),
    // AI Model Information
    aiModel: z.string().default('gpt-4'),
    modelVersion: z.string().nullable(),
    // Timestamps
    createdAt: z.string().datetime(),
    reviewedAt: z.string().datetime().nullable(),
    implementedAt: z.string().datetime().nullable(),
});
// Theological Concept Entity Schema
export const theologicalConceptEntitySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    definition: z.string().nullable(),
    // Classification
    conceptType: z.enum([
        'doctrine',
        'practice',
        'tradition',
        'movement',
        'person',
        'event',
        'text',
    ]),
    // Theological Context
    theologicalTradition: z.array(z.string()).default([]),
    biblicalReferences: z.array(z.string()).default([]),
    historicalPeriod: z.string().nullable(),
    // Relationships
    relatedConcepts: z.array(z.string()).default([]), // Concept IDs
    synonyms: z.array(z.string()).default([]),
    // APEST Relevance
    apestRelevance: z
        .object({
        apostolic: z.number(),
        prophetic: z.number(),
        evangelistic: z.number(),
        shepherding: z.number(),
        teaching: z.number(),
    })
        .default({
        apostolic: 5,
        prophetic: 5,
        evangelistic: 5,
        shepherding: 5,
        teaching: 5,
    }),
    // Usage Statistics
    contentReferences: z.number().int().default(0),
    searchCount: z.number().int().default(0),
    // Timestamps
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// ============================================================================
// AI CREATE SCHEMAS
// ============================================================================
export const createAiConversationSchema = aiConversationEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    totalMessages: true,
    totalTokensUsed: true,
});
export const createAiMessageSchema = aiMessageEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    tokenCount: true,
    processingTime: true,
});
export const createAiContentJobSchema = aiContentJobEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    tokensUsed: true,
    processingCost: true,
});
export const createAiCrossReferenceSuggestionSchema = aiCrossReferenceSuggestionEntitySchema.omit({
    id: true,
    createdAt: true,
    reviewedAt: true,
    implementedAt: true,
});
export const createTheologicalConceptSchema = theologicalConceptEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    contentReferences: true,
    searchCount: true,
});
// ============================================================================
// AI UPDATE SCHEMAS
// ============================================================================
export const updateAiConversationSchema = createAiConversationSchema.partial();
export const updateAiMessageSchema = createAiMessageSchema.partial();
export const updateAiContentJobSchema = createAiContentJobSchema.partial();
export const updateAiCrossReferenceSuggestionSchema = createAiCrossReferenceSuggestionSchema.partial();
export const updateTheologicalConceptSchema = createTheologicalConceptSchema.partial();
// ============================================================================
// AI RESPONSE SCHEMAS
// ============================================================================
// Response schemas with computed fields for API responses
export const aiConversationResponseSchema = aiConversationEntitySchema.extend({
    // Computed fields
    isActive: z.boolean(),
    isCompleted: z.boolean(),
    isAbandoned: z.boolean(),
    isArchived: z.boolean(),
    hasUserRating: z.boolean(),
    conversationDurationText: z.string().optional(),
    tokenUsageText: z.string().optional(),
});
export const aiMessageResponseSchema = aiMessageEntitySchema.extend({
    // Computed fields
    isUserMessage: z.boolean(),
    isAssistantMessage: z.boolean(),
    isSystemMessage: z.boolean(),
    hasUserRating: z.boolean(),
    hasUserFeedback: z.boolean(),
    isFlagged: z.boolean(),
    processingTimeText: z.string().optional(),
    confidenceText: z.string().optional(),
});
export const aiContentJobResponseSchema = aiContentJobEntitySchema.extend({
    // Computed fields
    isPending: z.boolean(),
    isProcessing: z.boolean(),
    isCompleted: z.boolean(),
    isFailed: z.boolean(),
    isCancelled: z.boolean(),
    hasError: z.boolean(),
    needsHumanReview: z.boolean(),
    isHighPriority: z.boolean(),
    processingCostText: z.string().optional(),
    confidenceText: z.string().optional(),
});
export const aiCrossReferenceSuggestionResponseSchema = aiCrossReferenceSuggestionEntitySchema.extend({
    // Computed fields
    isPending: z.boolean(),
    isApproved: z.boolean(),
    isRejected: z.boolean(),
    isImplemented: z.boolean(),
    needsReview: z.boolean(),
    hasHighConfidence: z.boolean(),
    hasHighRelevance: z.boolean(),
});
export const theologicalConceptResponseSchema = theologicalConceptEntitySchema.extend({
    // Computed fields
    isActive: z.boolean(),
    hasDefinition: z.boolean(),
    hasRelatedConcepts: z.boolean(),
    apestScoreText: z.string().optional(),
});
// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================
export const aiConversationSchema = aiConversationEntitySchema;
export const aiMessageSchema = aiMessageEntitySchema;
export const aiContentJobSchema = aiContentJobEntitySchema;
export const aiCrossReferenceSuggestionSchema = aiCrossReferenceSuggestionEntitySchema;
export const theologicalConceptSchema = theologicalConceptEntitySchema;
export const newAiContentJobSchema = createAiContentJobSchema;
export const newAiConversationSchema = createAiConversationSchema;
export const newAiCrossReferenceSuggestionSchema = createAiCrossReferenceSuggestionSchema;
export const newAiMessageSchema = createAiMessageSchema;
export const newTheologicalConceptSchema = createTheologicalConceptSchema;
//# sourceMappingURL=ai.schema.js.map