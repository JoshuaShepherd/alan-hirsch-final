// Auto-generated API contracts for ai
// Generated at: 2025-10-06T20:01:40.349Z

import {
  aiContentJobsEntitySchema,
  aiContentJobsQuerySchema,
  aiConversationsEntitySchema,
  aiConversationsQuerySchema,
  aiCrossReferenceSuggestionsEntitySchema,
  aiCrossReferenceSuggestionsQuerySchema,
  aiMessagesEntitySchema,
  aiMessagesQuerySchema,
  createaiContentJobsSchema,
  createaiConversationsSchema,
  createaiCrossReferenceSuggestionsSchema,
  createaiMessagesSchema,
  createtheologicalConceptsSchema,
  theologicalConceptsEntitySchema,
  theologicalConceptsQuerySchema,
  updateaiContentJobsSchema,
  updateaiConversationsSchema,
  updateaiCrossReferenceSuggestionsSchema,
  updateaiMessagesSchema,
  updatetheologicalConceptsSchema,
} from '../schemas/ai';

// API schemas for ai
// API request/response schemas for aiConversations
export const aiConversationsApiRequestSchema = createaiConversationsSchema;
export const aiConversationsApiResponseSchema = aiConversationsEntitySchema;
export const aiConversationsApiUpdateSchema = updateaiConversationsSchema;
export const aiConversationsApiQuerySchema = aiConversationsQuerySchema;

// API request/response schemas for aiMessages
export const aiMessagesApiRequestSchema = createaiMessagesSchema;
export const aiMessagesApiResponseSchema = aiMessagesEntitySchema;
export const aiMessagesApiUpdateSchema = updateaiMessagesSchema;
export const aiMessagesApiQuerySchema = aiMessagesQuerySchema;

// API request/response schemas for aiContentJobs
export const aiContentJobsApiRequestSchema = createaiContentJobsSchema;
export const aiContentJobsApiResponseSchema = aiContentJobsEntitySchema;
export const aiContentJobsApiUpdateSchema = updateaiContentJobsSchema;
export const aiContentJobsApiQuerySchema = aiContentJobsQuerySchema;

// API request/response schemas for aiCrossReferenceSuggestions
export const aiCrossReferenceSuggestionsApiRequestSchema =
  createaiCrossReferenceSuggestionsSchema;
export const aiCrossReferenceSuggestionsApiResponseSchema =
  aiCrossReferenceSuggestionsEntitySchema;
export const aiCrossReferenceSuggestionsApiUpdateSchema =
  updateaiCrossReferenceSuggestionsSchema;
export const aiCrossReferenceSuggestionsApiQuerySchema =
  aiCrossReferenceSuggestionsQuerySchema;

// API request/response schemas for theologicalConcepts
export const theologicalConceptsApiRequestSchema =
  createtheologicalConceptsSchema;
export const theologicalConceptsApiResponseSchema =
  theologicalConceptsEntitySchema;
export const theologicalConceptsApiUpdateSchema =
  updatetheologicalConceptsSchema;
export const theologicalConceptsApiQuerySchema = theologicalConceptsQuerySchema;

