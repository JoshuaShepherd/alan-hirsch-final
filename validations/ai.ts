import { z } from 'zod';

// AI Conversation Validation Schemas - ⏳ PLANNED
export const conversationTypeSchema = z.enum([
  'general_inquiry',
  'content_creation',
  'theological_discussion',
  'ministry_coaching',
  'apest_guidance',
  'leadership_development'
]);

export const conversationStatusSchema = z.enum([
  'active',
  'completed',
  'archived',
  'flagged'
]);

export const aiConversationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  
  // Conversation Metadata
  title: z.string().optional(),
  conversationType: conversationTypeSchema.default('general_inquiry'),
  
  // Context & Personalization
  userContext: z.record(z.string(), z.any()).default({}),
  apestProfile: z.record(z.string(), z.number()).optional(),
  ministryContext: z.record(z.string(), z.any()).optional(),
  
  // Conversation Flow
  messageCount: z.number().int().min(0).default(0),
  totalTokensUsed: z.number().int().min(0).default(0),
  
  // Quality & Feedback
  userRating: z.number().int().min(1).max(5).optional(),
  userFeedback: z.string().optional(),
  
  // Status & Management
  status: conversationStatusSchema.default('active'),
  isArchived: z.boolean().default(false),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  lastMessageAt: z.date()
});

export const newAiConversationSchema = aiConversationSchema.omit({
  createdAt: true,
  updatedAt: true,
  lastMessageAt: true
}).partial({
  id: true
});

// AI Message Validation Schemas
export const messageRoleSchema = z.enum([
  'user',
  'assistant',
  'system'
]);

export const messageTypeSchema = z.enum([
  'text',
  'content_suggestion',
  'assessment_insight',
  'ministry_guidance',
  'theological_response'
]);

export const aiMessageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  
  // Message Content
  role: messageRoleSchema,
  content: z.string(),
  messageType: messageTypeSchema.default('text'),
  
  // AI Model Information
  modelUsed: z.string().optional(),
  tokensUsed: z.number().int().min(0).default(0),
  responseTime: z.number().min(0).optional(), // milliseconds
  
  // Context & References
  contextUsed: z.array(z.string()).default([]), // Content IDs referenced
  citedSources: z.array(z.string()).default([]),
  
  // Quality Metrics
  confidenceScore: z.number().min(0).max(1).optional(),
  relevanceScore: z.number().min(0).max(1).optional(),
  
  // User Interaction
  userRating: z.number().int().min(1).max(5).optional(),
  isHelpful: z.boolean().optional(),
  
  // Timestamps
  createdAt: z.date()
});

export const newAiMessageSchema = aiMessageSchema.omit({
  createdAt: true
}).partial({
  id: true
});

// AI Content Job Validation Schemas
export const jobTypeSchema = z.enum([
  'content_generation',
  'content_enhancement',
  'cross_reference_generation',
  'assessment_analysis',
  'personalization'
]);

export const jobStatusSchema = z.enum([
  'pending',
  'processing',
  'completed',
  'failed',
  'cancelled'
]);

export const jobPrioritySchema = z.enum([
  'low',
  'normal',
  'high',
  'urgent'
]);

export const aiContentJobSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  
  // Job Configuration
  jobType: jobTypeSchema,
  priority: jobPrioritySchema.default('normal'),
  
  // Input Parameters
  inputData: z.record(z.string(), z.any()),
  prompt: z.string().optional(),
  
  // Processing Details
  modelUsed: z.string().optional(),
  tokensUsed: z.number().int().min(0).default(0),
  processingTime: z.number().min(0).optional(), // milliseconds
  
  // Results
  outputData: z.record(z.string(), z.any()).optional(),
  resultSummary: z.string().optional(),
  
  // Quality & Validation
  qualityScore: z.number().min(0).max(1).optional(),
  humanReviewRequired: z.boolean().default(false),
  humanReviewCompleted: z.boolean().default(false),
  
  // Status & Error Handling
  status: jobStatusSchema.default('pending'),
  errorMessage: z.string().optional(),
  retryCount: z.number().int().min(0).default(0),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional()
});

export const newAiContentJobSchema = aiContentJobSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  startedAt: true,
  completedAt: true
});

// AI Cross Reference Suggestion Validation Schemas
export const suggestionStatusSchema = z.enum([
  'pending',
  'approved',
  'rejected',
  'implemented'
]);

export const aiCrossReferenceSuggestionSchema = z.object({
  id: z.string().uuid(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  
  // AI Analysis
  relevanceScore: z.number().min(0).max(1),
  confidenceScore: z.number().min(0).max(1),
  reasoningExplanation: z.string(),
  
  // Suggested Reference Details
  suggestedReferenceType: z.enum([
    'builds_on',
    'contradicts',
    'supports',
    'extends',
    'applies',
    'critiques',
    'synthesizes'
  ]),
  contextDescription: z.string().optional(),
  
  // Review & Approval
  status: suggestionStatusSchema.default('pending'),
  reviewedBy: z.string().uuid().optional(),
  reviewNotes: z.string().optional(),
  
  // Implementation
  implementedCrossReferenceId: z.string().uuid().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  reviewedAt: z.date().optional(),
  implementedAt: z.date().optional()
});

export const newAiCrossReferenceSuggestionSchema = aiCrossReferenceSuggestionSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  reviewedAt: true,
  implementedAt: true
});

// Theological Concept Validation Schemas
export const conceptTypeSchema = z.enum([
  'doctrine',
  'practice',
  'principle',
  'framework',
  'methodology'
]);

export const theologicalConceptSchema = z.object({
  id: z.string().uuid(),
  
  // Concept Definition
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  definition: z.string(),
  description: z.string().optional(),
  
  // Classification
  conceptType: conceptTypeSchema,
  theologicalTradition: z.string().optional(),
  denominationalPerspective: z.string().optional(),
  
  // Relationships
  relatedConcepts: z.array(z.string().uuid()).default([]),
  synonyms: z.array(z.string()).default([]),
  
  // Content Associations
  contentReferences: z.array(z.string().uuid()).default([]), // Content IDs
  
  // APEST Relevance
  apestRelevance: z.object({
    apostolic: z.number().min(1).max(10),
    prophetic: z.number().min(1).max(10),
    evangelistic: z.number().min(1).max(10),
    shepherding: z.number().min(1).max(10),
    teaching: z.number().min(1).max(10)
  }).optional(),
  
  // AI Enhancement
  aiGenerated: z.boolean().default(false),
  aiConfidenceScore: z.number().min(0).max(1).optional(),
  humanVerified: z.boolean().default(false),
  
  // Usage Statistics
  usageCount: z.number().int().min(0).default(0),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newTheologicalConceptSchema = theologicalConceptSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true
});

// Type exports
export type AiConversation = z.infer<typeof aiConversationSchema>;
export type NewAiConversation = z.infer<typeof newAiConversationSchema>;
export type AiMessage = z.infer<typeof aiMessageSchema>;
export type NewAiMessage = z.infer<typeof newAiMessageSchema>;
export type AiContentJob = z.infer<typeof aiContentJobSchema>;
export type NewAiContentJob = z.infer<typeof newAiContentJobSchema>;
export type AiCrossReferenceSuggestion = z.infer<typeof aiCrossReferenceSuggestionSchema>;
export type NewAiCrossReferenceSuggestion = z.infer<typeof newAiCrossReferenceSuggestionSchema>;
export type TheologicalConcept = z.infer<typeof theologicalConceptSchema>;
export type NewTheologicalConcept = z.infer<typeof newTheologicalConceptSchema>;
