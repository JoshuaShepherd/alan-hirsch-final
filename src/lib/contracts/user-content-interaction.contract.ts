import { z } from "zod";

// Shared enums
export const InteractionTypeEnum = z.enum([
  "view",
  "like",
  "bookmark",
  "share",
  "comment",
  "download",
  "complete",
]);

export const LearningStatusEnum = z.enum([
  "not_started",
  "in_progress",
  "completed",
  "bookmarked",
  "skipped",
]);

export const ImplementationStatusEnum = z.enum([
  "not_applicable",
  "planning",
  "implementing",
  "implemented",
  "abandoned",
]);

// Ingress (Create/Update DTOs)
export const UserContentInteractionCreateSchema = z.object({
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  communityId: z.string().uuid().optional(),
  interactionType: InteractionTypeEnum,
  progressPercentage: z.number().int().min(0).max(100).default(0),
  timeSpentMinutes: z.number().int().min(0).default(0),
  status: LearningStatusEnum.default("not_started"),
  implementationStatus: ImplementationStatusEnum.optional(),
  implementationNotes: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  feedback: z.string().optional(),
  wouldRecommend: z.boolean().optional(),
});

export const UserContentInteractionUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  contentId: z.string().uuid().optional(),
  communityId: z.string().uuid().optional(),
  interactionType: InteractionTypeEnum.optional(),
  progressPercentage: z.number().int().min(0).max(100).optional(),
  timeSpentMinutes: z.number().int().min(0).optional(),
  status: LearningStatusEnum.optional(),
  implementationStatus: ImplementationStatusEnum.optional(),
  implementationNotes: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  feedback: z.string().optional(),
  wouldRecommend: z.boolean().optional(),
});

// Egress (API Response DTO)
export const UserContentInteractionResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  contentId: z.string().uuid(),
  communityId: z.string().uuid().nullable(),
  interactionType: InteractionTypeEnum,
  progressPercentage: z.number().int(),
  timeSpentMinutes: z.number().int(),
  status: LearningStatusEnum,
  implementationStatus: ImplementationStatusEnum.nullable(),
  implementationNotes: z.string().nullable(),
  rating: z.number().int().nullable(),
  feedback: z.string().nullable(),
  wouldRecommend: z.boolean().nullable(),
  firstAccessedAt: z.string().datetime(),
  lastAccessedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserContentInteractionListResponseSchema = z.object({
  data: z.array(UserContentInteractionResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserContentInteractionCreate = z.infer<typeof UserContentInteractionCreateSchema>;
export type UserContentInteractionUpdate = z.infer<typeof UserContentInteractionUpdateSchema>;
export type UserContentInteractionResponse = z.infer<typeof UserContentInteractionResponseSchema>;
export type UserContentInteractionListResponse = z.infer<typeof UserContentInteractionListResponseSchema>;

