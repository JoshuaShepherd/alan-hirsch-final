import { z } from "zod";

// Shared enums
export const MessageRoleEnum = z.enum([
  "user",
  "assistant",
  "system",
]);

// Ingress (Create/Update DTOs)
export const AiMessageCreateSchema = z.object({
  conversationId: z.string().uuid(),
  role: MessageRoleEnum,
  content: z.string(),
  messageIndex: z.number().int().min(0),
  tokenCount: z.number().int().min(0).optional(),
  citedContent: z.array(z.object({
    contentId: z.string(),
    title: z.string(),
    relevanceScore: z.number(),
  })).default([]),
  confidence: z.number().min(0).max(1).optional(),
  factualAccuracy: z.boolean().optional(),
  theologicalSoundness: z.boolean().optional(),
  userRating: z.number().int().min(1).max(5).optional(),
  userFeedback: z.string().optional(),
  flaggedForReview: z.boolean().default(false),
  processingTime: z.number().int().min(0).optional(),
});

export const AiMessageUpdateSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid().optional(),
  role: MessageRoleEnum.optional(),
  content: z.string().optional(),
  messageIndex: z.number().int().min(0).optional(),
  tokenCount: z.number().int().min(0).optional(),
  citedContent: z.array(z.object({
    contentId: z.string(),
    title: z.string(),
    relevanceScore: z.number(),
  })).optional(),
  confidence: z.number().min(0).max(1).optional(),
  factualAccuracy: z.boolean().optional(),
  theologicalSoundness: z.boolean().optional(),
  userRating: z.number().int().min(1).max(5).optional(),
  userFeedback: z.string().optional(),
  flaggedForReview: z.boolean().optional(),
  processingTime: z.number().int().min(0).optional(),
});

// Egress (API Response DTO)
export const AiMessageResponseSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  role: MessageRoleEnum,
  content: z.string(),
  messageIndex: z.number().int(),
  tokenCount: z.number().int().nullable(),
  citedContent: z.array(z.object({
    contentId: z.string(),
    title: z.string(),
    relevanceScore: z.number(),
  })),
  confidence: z.number().nullable(),
  factualAccuracy: z.boolean().nullable(),
  theologicalSoundness: z.boolean().nullable(),
  userRating: z.number().int().nullable(),
  userFeedback: z.string().nullable(),
  flaggedForReview: z.boolean(),
  processingTime: z.number().int().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const AiMessageListResponseSchema = z.object({
  data: z.array(AiMessageResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AiMessageCreate = z.infer<typeof AiMessageCreateSchema>;
export type AiMessageUpdate = z.infer<typeof AiMessageUpdateSchema>;
export type AiMessageResponse = z.infer<typeof AiMessageResponseSchema>;
export type AiMessageListResponse = z.infer<typeof AiMessageListResponseSchema>;

