import { z } from "zod";

// Shared enums
export const ConversationTypeEnum = z.enum([
  "theological_discussion",
  "content_creation",
  "assessment_guidance",
  "ministry_advice",
  "leadership_coaching",
  "content_discovery",
  "research_assistance",
  "general",
]);

export const ConversationStatusEnum = z.enum([
  "active",
  "completed",
  "abandoned",
  "archived",
]);

// Ingress (Create/Update DTOs)
export const AiConversationCreateSchema = z.object({
  userId: z.string().uuid(),
  conversationType: ConversationTypeEnum,
  title: z.string().optional(),
  primaryTopic: z.string().optional(),
  theologicalContext: z.object({
    themes: z.array(z.string()),
    scriptures: z.array(z.string()),
    traditions: z.array(z.string()),
  }).optional(),
  userApestProfile: z.object({
    primary: z.string(),
    secondary: z.string(),
    scores: z.record(z.string(), z.number()),
  }).optional(),
  ministryContext: z.object({
    role: z.string(),
    experience: z.number(),
    focus_areas: z.array(z.string()),
  }).optional(),
  culturalContext: z.string().optional(),
  totalMessages: z.number().int().min(0).default(0),
  conversationDurationMinutes: z.number().int().min(0).optional(),
  userSatisfactionRating: z.number().int().min(1).max(5).optional(),
  theologicalAccuracyVerified: z.boolean().default(false),
  helpfulnessRating: z.number().int().min(1).max(5).optional(),
  aiModel: z.string().default("gpt-4"),
  modelVersion: z.string().optional(),
  totalTokensUsed: z.number().int().min(0).default(0),
  referencedContent: z.array(z.string()).default([]),
  generatedInsights: z.string().optional(),
  status: ConversationStatusEnum.default("active"),
});

export const AiConversationUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  conversationType: ConversationTypeEnum.optional(),
  title: z.string().optional(),
  primaryTopic: z.string().optional(),
  theologicalContext: z.object({
    themes: z.array(z.string()),
    scriptures: z.array(z.string()),
    traditions: z.array(z.string()),
  }).optional(),
  userApestProfile: z.object({
    primary: z.string(),
    secondary: z.string(),
    scores: z.record(z.string(), z.number()),
  }).optional(),
  ministryContext: z.object({
    role: z.string(),
    experience: z.number(),
    focus_areas: z.array(z.string()),
  }).optional(),
  culturalContext: z.string().optional(),
  totalMessages: z.number().int().min(0).optional(),
  conversationDurationMinutes: z.number().int().min(0).optional(),
  userSatisfactionRating: z.number().int().min(1).max(5).optional(),
  theologicalAccuracyVerified: z.boolean().optional(),
  helpfulnessRating: z.number().int().min(1).max(5).optional(),
  aiModel: z.string().optional(),
  modelVersion: z.string().optional(),
  totalTokensUsed: z.number().int().min(0).optional(),
  referencedContent: z.array(z.string()).optional(),
  generatedInsights: z.string().optional(),
  status: ConversationStatusEnum.optional(),
});

// Egress (API Response DTO)
export const AiConversationResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  conversationType: ConversationTypeEnum,
  title: z.string().nullable(),
  primaryTopic: z.string().nullable(),
  theologicalContext: z.object({
    themes: z.array(z.string()),
    scriptures: z.array(z.string()),
    traditions: z.array(z.string()),
  }).nullable(),
  userApestProfile: z.object({
    primary: z.string(),
    secondary: z.string(),
    scores: z.record(z.string(), z.number()),
  }).nullable(),
  ministryContext: z.object({
    role: z.string(),
    experience: z.number(),
    focus_areas: z.array(z.string()),
  }).nullable(),
  culturalContext: z.string().nullable(),
  totalMessages: z.number().int(),
  conversationDurationMinutes: z.number().int().nullable(),
  userSatisfactionRating: z.number().int().nullable(),
  theologicalAccuracyVerified: z.boolean(),
  helpfulnessRating: z.number().int().nullable(),
  aiModel: z.string(),
  modelVersion: z.string().nullable(),
  totalTokensUsed: z.number().int(),
  referencedContent: z.array(z.string()),
  generatedInsights: z.string().nullable(),
  status: ConversationStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const AiConversationListResponseSchema = z.object({
  data: z.array(AiConversationResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AiConversationCreate = z.infer<typeof AiConversationCreateSchema>;
export type AiConversationUpdate = z.infer<typeof AiConversationUpdateSchema>;
export type AiConversationResponse = z.infer<typeof AiConversationResponseSchema>;
export type AiConversationListResponse = z.infer<typeof AiConversationListResponseSchema>;

