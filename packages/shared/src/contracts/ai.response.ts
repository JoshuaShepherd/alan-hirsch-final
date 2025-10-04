import { z } from 'zod';

// AI Response DTOs - Output validation for API endpoints
// These schemas ensure consistent, UI-friendly data shapes

// AI Conversation Response DTO
export const aiConversationResponseSchema = z.object({
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
  totalMessages: z.number().int(),
  conversationDurationMinutes: z.number().int().nullable(),

  // Quality & Satisfaction
  userSatisfactionRating: z.number().int().nullable(), // 1-5 scale
  theologicalAccuracyVerified: z.boolean(),
  helpfulnessRating: z.number().int().nullable(), // 1-5 scale

  // AI Model Information
  aiModel: z.string(),
  modelVersion: z.string().nullable(),
  totalTokensUsed: z.number().int(),

  // Content References
  referencedContent: z.array(z.string()),
  generatedInsights: z.string().nullable(),

  // Status
  status: z.enum(['active', 'completed', 'abandoned', 'archived']),

  // Computed fields for UI
  isActive: z.boolean(),
  isCompleted: z.boolean(),
  isAbandoned: z.boolean(),
  isArchived: z.boolean(),
  hasUserRating: z.boolean(),
  conversationDurationText: z.string().nullable(),
  tokenUsageText: z.string(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
});

// AI Message Response DTO
export const aiMessageResponseSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),

  // Message Content
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),

  // Message Metadata
  messageIndex: z.number().int(),
  tokenCount: z.number().int().nullable(),

  // Content References
  citedContent: z.array(
    z.object({
      contentId: z.string(),
      title: z.string(),
      relevanceScore: z.number(),
    })
  ),

  // Quality Indicators
  confidence: z.string().nullable(), // Decimal from database
  factualAccuracy: z.boolean().nullable(),
  theologicalSoundness: z.boolean().nullable(),

  // User Feedback
  userRating: z.number().int().nullable(), // 1-5 scale
  userFeedback: z.string().nullable(),
  flaggedForReview: z.boolean(),

  // Processing Information
  processingTime: z.number().int().nullable(), // milliseconds

  // Computed fields for UI
  isUserMessage: z.boolean(),
  isAssistantMessage: z.boolean(),
  isSystemMessage: z.boolean(),
  hasUserRating: z.boolean(),
  hasUserFeedback: z.boolean(),
  isFlagged: z.boolean(),
  processingTimeText: z.string().nullable(),
  confidenceText: z.string().nullable(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// AI Content Job Response DTO
export const aiContentJobResponseSchema = z.object({
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
  parameters: z.record(z.string(), z.any()),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),

  // Processing Status
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'cancelled']),

  // Results
  result: z.record(z.string(), z.any()).nullable(),
  confidenceScore: z.string().nullable(), // Decimal from database

  // Quality Control
  humanReviewed: z.boolean(),
  humanApproved: z.boolean().nullable(),
  reviewNotes: z.string().nullable(),

  // Processing Information
  aiModel: z.string(),
  tokensUsed: z.number().int().nullable(),
  processingCost: z.string().nullable(), // Decimal from database

  // Error Handling
  errorMessage: z.string().nullable(),
  retryCount: z.number().int(),

  // Computed fields for UI
  isPending: z.boolean(),
  isProcessing: z.boolean(),
  isCompleted: z.boolean(),
  isFailed: z.boolean(),
  isCancelled: z.boolean(),
  hasError: z.boolean(),
  needsHumanReview: z.boolean(),
  isHighPriority: z.boolean(),
  processingCostText: z.string().nullable(),
  confidenceText: z.string().nullable(),

  // Timestamps
  createdAt: z.string().datetime(),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
});

// AI Cross Reference Suggestion Response DTO
export const aiCrossReferenceSuggestionResponseSchema = z.object({
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
  humanReviewed: z.boolean(),
  humanApproved: z.boolean().nullable(),
  reviewNotes: z.string().nullable(),

  // Implementation Status
  status: z.enum(['pending', 'approved', 'rejected', 'implemented']),

  // AI Model Information
  aiModel: z.string(),
  modelVersion: z.string().nullable(),

  // Computed fields for UI
  isPending: z.boolean(),
  isApproved: z.boolean(),
  isRejected: z.boolean(),
  isImplemented: z.boolean(),
  needsReview: z.boolean(),
  hasHighConfidence: z.boolean(),
  hasHighRelevance: z.boolean(),
  confidenceText: z.string(),
  relevanceText: z.string(),

  // Related content (populated by mappers)
  sourceContent: z
    .object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
    })
    .optional(),
  targetContent: z
    .object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
    })
    .optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  reviewedAt: z.string().datetime().nullable(),
  implementedAt: z.string().datetime().nullable(),
});

// Theological Concept Response DTO
export const theologicalConceptResponseSchema = z.object({
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
  theologicalTradition: z.array(z.string()),
  biblicalReferences: z.array(z.string()),
  historicalPeriod: z.string().nullable(),

  // Relationships
  relatedConcepts: z.array(z.string()), // Concept IDs
  synonyms: z.array(z.string()),

  // APEST Relevance
  apestRelevance: z.object({
    apostolic: z.number(),
    prophetic: z.number(),
    evangelistic: z.number(),
    shepherding: z.number(),
    teaching: z.number(),
  }),

  // Usage Statistics
  contentReferences: z.number().int(),
  searchCount: z.number().int(),

  // Computed fields for UI
  hasDefinition: z.boolean(),
  hasRelatedConcepts: z.boolean(),
  hasSynonyms: z.boolean(),
  hasBiblicalReferences: z.boolean(),
  isFrequentlyUsed: z.boolean(),
  primaryApestDimension: z.string(),
  apestRelevanceText: z.string(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Paginated AI Conversation List Response DTO
export const paginatedAiConversationListResponseSchema = z.object({
  items: z.array(aiConversationResponseSchema),
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

// Paginated AI Message List Response DTO
export const paginatedAiMessageListResponseSchema = z.object({
  items: z.array(aiMessageResponseSchema),
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

// Paginated AI Content Job List Response DTO
export const paginatedAiContentJobListResponseSchema = z.object({
  items: z.array(aiContentJobResponseSchema),
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

// Paginated AI Cross Reference Suggestion List Response DTO
export const paginatedAiCrossReferenceSuggestionListResponseSchema = z.object({
  items: z.array(aiCrossReferenceSuggestionResponseSchema),
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

// Paginated Theological Concept List Response DTO
export const paginatedTheologicalConceptListResponseSchema = z.object({
  items: z.array(theologicalConceptResponseSchema),
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
export type AiConversationResponse = z.infer<
  typeof aiConversationResponseSchema
>;
export type AiMessageResponse = z.infer<typeof aiMessageResponseSchema>;
export type AiContentJobResponse = z.infer<typeof aiContentJobResponseSchema>;
export type AiCrossReferenceSuggestionResponse = z.infer<
  typeof aiCrossReferenceSuggestionResponseSchema
>;
export type TheologicalConceptResponse = z.infer<
  typeof theologicalConceptResponseSchema
>;
export type PaginatedAiConversationListResponse = z.infer<
  typeof paginatedAiConversationListResponseSchema
>;
export type PaginatedAiMessageListResponse = z.infer<
  typeof paginatedAiMessageListResponseSchema
>;
export type PaginatedAiContentJobListResponse = z.infer<
  typeof paginatedAiContentJobListResponseSchema
>;
export type PaginatedAiCrossReferenceSuggestionListResponse = z.infer<
  typeof paginatedAiCrossReferenceSuggestionListResponseSchema
>;
export type PaginatedTheologicalConceptListResponse = z.infer<
  typeof paginatedTheologicalConceptListResponseSchema
>;
