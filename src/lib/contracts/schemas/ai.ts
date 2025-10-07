// Auto-generated contracts for ai
// Generated at: 2025-10-06T20:01:40.349Z

import { z } from 'zod';

// Entity validation schema for aiConversations
export const aiConversationsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  conversationType: z.string().nullable(),
  title: z.string().nullable(),
  primaryTopic: z.string().nullable(),
  theologicalContext: z.any(),
  userApestProfile: z.any(),
  ministryContext: z.any(),
  culturalContext: z.string().nullable(),
  totalMessages: z.number().int().default(0).nullable(),
  conversationDurationMinutes: z.number().int().nullable(),
  userSatisfactionRating: z.number().int().nullable(),
  theologicalAccuracyVerified: z.boolean().default(false).nullable(),
  helpfulnessRating: z.number().int().nullable(),
  aiModel: z.string().default('gpt-4').nullable(),
  modelVersion: z.string().nullable(),
  totalTokensUsed: z.number().int().default(0).nullable(),
  referencedContent: z.any(),
  generatedInsights: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
  completedAt: z.string().datetime().nullable(),
});

// Create validation schema for aiConversations
export const createaiConversationsSchema = z.object({
  userId: z.string().uuid(),
  conversationType: z.string(),
  title: z.string(),
  primaryTopic: z.string(),
  theologicalContext: z.any().optional(),
  userApestProfile: z.any().optional(),
  ministryContext: z.any().optional(),
  culturalContext: z.string(),
  totalMessages: z.number().int().optional().default(0),
  conversationDurationMinutes: z.number().int(),
  userSatisfactionRating: z.number().int(),
  theologicalAccuracyVerified: z.boolean().optional().default(false),
  helpfulnessRating: z.number().int(),
  aiModel: z.string().optional().default('gpt-4'),
  modelVersion: z.string(),
  totalTokensUsed: z.number().int().optional().default(0),
  referencedContent: z.any().optional(),
  generatedInsights: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  completedAt: z.string().datetime(),
});

// Update validation schema for aiConversations
export const updateaiConversationsSchema = z
  .object({
    userId: z.string().uuid(),
    conversationType: z.string(),
    title: z.string(),
    primaryTopic: z.string(),
    theologicalContext: z.any().optional(),
    userApestProfile: z.any().optional(),
    ministryContext: z.any().optional(),
    culturalContext: z.string(),
    totalMessages: z.number().int().optional().default(0),
    conversationDurationMinutes: z.number().int(),
    userSatisfactionRating: z.number().int(),
    theologicalAccuracyVerified: z.boolean().optional().default(false),
    helpfulnessRating: z.number().int(),
    aiModel: z.string().optional().default('gpt-4'),
    modelVersion: z.string(),
    totalTokensUsed: z.number().int().optional().default(0),
    referencedContent: z.any().optional(),
    generatedInsights: z.string(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    updatedAt: z.string().datetime().optional().default('NOW()'),
    completedAt: z.string().datetime(),
  })
  .partial();

// Query validation schema for aiConversations
export const aiConversationsQuerySchema = z.object({
  userId: z.string().uuid(),
  conversationType: z.string(),
  title: z.string(),
  primaryTopic: z.string(),
  theologicalContext: z.any().optional(),
  userApestProfile: z.any().optional(),
  ministryContext: z.any().optional(),
  culturalContext: z.string(),
  totalMessages: z.number().int().optional().default(0),
  conversationDurationMinutes: z.number().int(),
  userSatisfactionRating: z.number().int(),
  theologicalAccuracyVerified: z.boolean().optional().default(false),
  helpfulnessRating: z.number().int(),
  aiModel: z.string().optional().default('gpt-4'),
  modelVersion: z.string(),
  totalTokensUsed: z.number().int().optional().default(0),
  referencedContent: z.any().optional(),
  generatedInsights: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  completedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for aiMessages
export const aiMessagesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  conversationId: z.string().uuid(),
  role: z.string().nullable(),
  content: z.string(),
  messageIndex: z.number().int(),
  tokenCount: z.number().int().nullable(),
  citedContent: z.any(),
  confidence: z.number().nullable(),
  factualAccuracy: z.boolean().nullable(),
  theologicalSoundness: z.boolean().nullable(),
  userRating: z.number().int().nullable(),
  userFeedback: z.string().nullable(),
  flaggedForReview: z.boolean().default(false).nullable(),
  processingTime: z.number().int().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for aiMessages
export const createaiMessagesSchema = z.object({
  conversationId: z.string().uuid(),
  role: z.string(),
  content: z.string(),
  messageIndex: z.number().int(),
  tokenCount: z.number().int(),
  citedContent: z.any().optional(),
  confidence: z.number(),
  factualAccuracy: z.boolean(),
  theologicalSoundness: z.boolean(),
  userRating: z.number().int(),
  userFeedback: z.string(),
  flaggedForReview: z.boolean().optional().default(false),
  processingTime: z.number().int(),
});

// Update validation schema for aiMessages
export const updateaiMessagesSchema = z
  .object({
    conversationId: z.string().uuid(),
    role: z.string(),
    content: z.string(),
    messageIndex: z.number().int(),
    tokenCount: z.number().int(),
    citedContent: z.any().optional(),
    confidence: z.number(),
    factualAccuracy: z.boolean(),
    theologicalSoundness: z.boolean(),
    userRating: z.number().int(),
    userFeedback: z.string(),
    flaggedForReview: z.boolean().optional().default(false),
    processingTime: z.number().int(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for aiMessages
export const aiMessagesQuerySchema = z.object({
  conversationId: z.string().uuid(),
  role: z.string(),
  content: z.string(),
  messageIndex: z.number().int(),
  tokenCount: z.number().int(),
  citedContent: z.any().optional(),
  confidence: z.number(),
  factualAccuracy: z.boolean(),
  theologicalSoundness: z.boolean(),
  userRating: z.number().int(),
  userFeedback: z.string(),
  flaggedForReview: z.boolean().optional().default(false),
  processingTime: z.number().int(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for aiContentJobs
export const aiContentJobsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  contentId: z.string().uuid().nullable(),
  userId: z.string().uuid().nullable(),
  jobType: z.string().nullable(),
  parameters: z.any(),
  priority: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  result: z.any(),
  confidenceScore: z.number().nullable(),
  humanReviewed: z.boolean().default(false).nullable(),
  humanApproved: z.boolean().nullable(),
  reviewNotes: z.string().nullable(),
  aiModel: z.string().default('gpt-4').nullable(),
  tokensUsed: z.number().int().nullable(),
  processingCost: z.number().nullable(),
  errorMessage: z.string().nullable(),
  retryCount: z.number().int().default(0).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for aiContentJobs
export const createaiContentJobsSchema = z.object({
  contentId: z.string().uuid(),
  userId: z.string().uuid(),
  jobType: z.string(),
  parameters: z.any().optional(),
  priority: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  result: z.any().optional(),
  confidenceScore: z.number(),
  humanReviewed: z.boolean().optional().default(false),
  humanApproved: z.boolean(),
  reviewNotes: z.string(),
  aiModel: z.string().optional().default('gpt-4'),
  tokensUsed: z.number().int(),
  processingCost: z.number(),
  errorMessage: z.string(),
  retryCount: z.number().int().optional().default(0),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime(),
});

// Update validation schema for aiContentJobs
export const updateaiContentJobsSchema = z
  .object({
    contentId: z.string().uuid(),
    userId: z.string().uuid(),
    jobType: z.string(),
    parameters: z.any().optional(),
    priority: z.string(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    result: z.any().optional(),
    confidenceScore: z.number(),
    humanReviewed: z.boolean().optional().default(false),
    humanApproved: z.boolean(),
    reviewNotes: z.string(),
    aiModel: z.string().optional().default('gpt-4'),
    tokensUsed: z.number().int(),
    processingCost: z.number(),
    errorMessage: z.string(),
    retryCount: z.number().int().optional().default(0),
    startedAt: z.string().datetime(),
    completedAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for aiContentJobs
export const aiContentJobsQuerySchema = z.object({
  contentId: z.string().uuid(),
  userId: z.string().uuid(),
  jobType: z.string(),
  parameters: z.any().optional(),
  priority: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  result: z.any().optional(),
  confidenceScore: z.number(),
  humanReviewed: z.boolean().optional().default(false),
  humanApproved: z.boolean(),
  reviewNotes: z.string(),
  aiModel: z.string().optional().default('gpt-4'),
  tokensUsed: z.number().int(),
  processingCost: z.number(),
  errorMessage: z.string(),
  retryCount: z.number().int().optional().default(0),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for aiCrossReferenceSuggestions
export const aiCrossReferenceSuggestionsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  suggestedReferenceType: z.string().nullable(),
  confidenceScore: z.number(),
  relevanceScore: z.number(),
  reasoning: z.string().nullable(),
  keyConnections: z.any(),
  humanReviewed: z.boolean().default(false).nullable(),
  humanApproved: z.boolean().nullable(),
  reviewNotes: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  aiModel: z.string().default('gpt-4').nullable(),
  modelVersion: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  reviewedAt: z.string().datetime().nullable(),
  implementedAt: z.string().datetime().nullable(),
});

// Create validation schema for aiCrossReferenceSuggestions
export const createaiCrossReferenceSuggestionsSchema = z.object({
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  suggestedReferenceType: z.string(),
  confidenceScore: z.number(),
  relevanceScore: z.number(),
  reasoning: z.string(),
  keyConnections: z.any().optional(),
  humanReviewed: z.boolean().optional().default(false),
  humanApproved: z.boolean(),
  reviewNotes: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  aiModel: z.string().optional().default('gpt-4'),
  modelVersion: z.string(),
  reviewedAt: z.string().datetime(),
  implementedAt: z.string().datetime(),
});

// Update validation schema for aiCrossReferenceSuggestions
export const updateaiCrossReferenceSuggestionsSchema = z
  .object({
    sourceContentId: z.string().uuid(),
    targetContentId: z.string().uuid(),
    suggestedReferenceType: z.string(),
    confidenceScore: z.number(),
    relevanceScore: z.number(),
    reasoning: z.string(),
    keyConnections: z.any().optional(),
    humanReviewed: z.boolean().optional().default(false),
    humanApproved: z.boolean(),
    reviewNotes: z.string(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    aiModel: z.string().optional().default('gpt-4'),
    modelVersion: z.string(),
    reviewedAt: z.string().datetime(),
    implementedAt: z.string().datetime(),
  })
  .partial();

// Query validation schema for aiCrossReferenceSuggestions
export const aiCrossReferenceSuggestionsQuerySchema = z.object({
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  suggestedReferenceType: z.string(),
  confidenceScore: z.number(),
  relevanceScore: z.number(),
  reasoning: z.string(),
  keyConnections: z.any().optional(),
  humanReviewed: z.boolean().optional().default(false),
  humanApproved: z.boolean(),
  reviewNotes: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  aiModel: z.string().optional().default('gpt-4'),
  modelVersion: z.string(),
  reviewedAt: z.string().datetime(),
  implementedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for theologicalConcepts
export const theologicalConceptsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  name: z.string(),
  slug: z.string(),
  definition: z.string().nullable(),
  conceptType: z.string().nullable(),
  theologicalTradition: z.any(),
  biblicalReferences: z.any(),
  historicalPeriod: z.string().nullable(),
  relatedConcepts: z.any(),
  synonyms: z.any(),
  apestRelevance: z.any(),
  contentReferences: z.number().int().default(0).nullable(),
  searchCount: z.number().int().default(0).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for theologicalConcepts
export const createtheologicalConceptsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  definition: z.string(),
  conceptType: z.string(),
  theologicalTradition: z.any().optional(),
  biblicalReferences: z.any().optional(),
  historicalPeriod: z.string(),
  relatedConcepts: z.any().optional(),
  synonyms: z.any().optional(),
  apestRelevance: z.any().optional(),
  contentReferences: z.number().int().optional().default(0),
  searchCount: z.number().int().optional().default(0),
});

// Update validation schema for theologicalConcepts
export const updatetheologicalConceptsSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    definition: z.string(),
    conceptType: z.string(),
    theologicalTradition: z.any().optional(),
    biblicalReferences: z.any().optional(),
    historicalPeriod: z.string(),
    relatedConcepts: z.any().optional(),
    synonyms: z.any().optional(),
    apestRelevance: z.any().optional(),
    contentReferences: z.number().int().optional().default(0),
    searchCount: z.number().int().optional().default(0),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for theologicalConcepts
export const theologicalConceptsQuerySchema = z.object({
  name: z.string(),
  slug: z.string(),
  definition: z.string(),
  conceptType: z.string(),
  theologicalTradition: z.any().optional(),
  biblicalReferences: z.any().optional(),
  historicalPeriod: z.string(),
  relatedConcepts: z.any().optional(),
  synonyms: z.any().optional(),
  apestRelevance: z.any().optional(),
  contentReferences: z.number().int().optional().default(0),
  searchCount: z.number().int().optional().default(0),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
