import { z } from "zod";

// Shared enums
export const SuggestedReferenceTypeEnum = z.enum([
  "builds_on",
  "contradicts",
  "supports",
  "extends",
  "applies",
  "critiques",
  "synthesizes",
]);

export const SuggestionStatusEnum = z.enum([
  "pending",
  "approved",
  "rejected",
  "implemented",
]);

// Ingress (Create/Update DTOs)
export const AiCrossReferenceSuggestionCreateSchema = z.object({
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  suggestedReferenceType: SuggestedReferenceTypeEnum,
  confidenceScore: z.number().min(0).max(1),
  relevanceScore: z.number().min(0).max(1),
  reasoning: z.string().optional(),
  keyConnections: z.object({
    themes: z.array(z.string()),
    concepts: z.array(z.string()),
    scriptures: z.array(z.string()),
  }).optional(),
  humanReviewed: z.boolean().default(false),
  humanApproved: z.boolean().optional(),
  reviewNotes: z.string().optional(),
  status: SuggestionStatusEnum.default("pending"),
  aiModel: z.string().default("gpt-4"),
  modelVersion: z.string().optional(),
});

export const AiCrossReferenceSuggestionUpdateSchema = z.object({
  id: z.string().uuid(),
  sourceContentId: z.string().uuid().optional(),
  targetContentId: z.string().uuid().optional(),
  suggestedReferenceType: SuggestedReferenceTypeEnum.optional(),
  confidenceScore: z.number().min(0).max(1).optional(),
  relevanceScore: z.number().min(0).max(1).optional(),
  reasoning: z.string().optional(),
  keyConnections: z.object({
    themes: z.array(z.string()),
    concepts: z.array(z.string()),
    scriptures: z.array(z.string()),
  }).optional(),
  humanReviewed: z.boolean().optional(),
  humanApproved: z.boolean().optional(),
  reviewNotes: z.string().optional(),
  status: SuggestionStatusEnum.optional(),
  aiModel: z.string().optional(),
  modelVersion: z.string().optional(),
});

// Egress (API Response DTO)
export const AiCrossReferenceSuggestionResponseSchema = z.object({
  id: z.string().uuid(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  suggestedReferenceType: SuggestedReferenceTypeEnum,
  confidenceScore: z.number(),
  relevanceScore: z.number(),
  reasoning: z.string().nullable(),
  keyConnections: z.object({
    themes: z.array(z.string()),
    concepts: z.array(z.string()),
    scriptures: z.array(z.string()),
  }).nullable(),
  humanReviewed: z.boolean(),
  humanApproved: z.boolean().nullable(),
  reviewNotes: z.string().nullable(),
  status: SuggestionStatusEnum,
  aiModel: z.string(),
  modelVersion: z.string().nullable(),
  createdAt: z.string().datetime(),
  reviewedAt: z.string().datetime().nullable(),
  implementedAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const AiCrossReferenceSuggestionListResponseSchema = z.object({
  data: z.array(AiCrossReferenceSuggestionResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AiCrossReferenceSuggestionCreate = z.infer<typeof AiCrossReferenceSuggestionCreateSchema>;
export type AiCrossReferenceSuggestionUpdate = z.infer<typeof AiCrossReferenceSuggestionUpdateSchema>;
export type AiCrossReferenceSuggestionResponse = z.infer<typeof AiCrossReferenceSuggestionResponseSchema>;
export type AiCrossReferenceSuggestionListResponse = z.infer<typeof AiCrossReferenceSuggestionListResponseSchema>;

