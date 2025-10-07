import { z } from "zod";

// Shared enums
export const JobTypeEnum = z.enum([
  "summarize",
  "extract_key_points",
  "generate_cross_references",
  "enhance_seo",
  "translate",
  "generate_questions",
  "create_outline",
  "fact_check",
]);

export const JobPriorityEnum = z.enum([
  "low",
  "normal",
  "high",
  "urgent",
]);

export const JobStatusEnum = z.enum([
  "pending",
  "processing",
  "completed",
  "failed",
  "cancelled",
]);

// Ingress (Create/Update DTOs)
export const AiContentJobCreateSchema = z.object({
  contentId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  jobType: JobTypeEnum,
  parameters: z.record(z.unknown()).default({}),
  priority: JobPriorityEnum.default("normal"),
  status: JobStatusEnum.default("pending"),
  result: z.record(z.unknown()).optional(),
  confidenceScore: z.number().min(0).max(1).optional(),
  humanReviewed: z.boolean().default(false),
  humanApproved: z.boolean().optional(),
  reviewNotes: z.string().optional(),
  aiModel: z.string().default("gpt-4"),
  tokensUsed: z.number().int().min(0).optional(),
  processingCost: z.number().min(0).optional(),
  errorMessage: z.string().optional(),
  retryCount: z.number().int().min(0).default(0),
});

export const AiContentJobUpdateSchema = z.object({
  id: z.string().uuid(),
  contentId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  jobType: JobTypeEnum.optional(),
  parameters: z.record(z.unknown()).optional(),
  priority: JobPriorityEnum.optional(),
  status: JobStatusEnum.optional(),
  result: z.record(z.unknown()).optional(),
  confidenceScore: z.number().min(0).max(1).optional(),
  humanReviewed: z.boolean().optional(),
  humanApproved: z.boolean().optional(),
  reviewNotes: z.string().optional(),
  aiModel: z.string().optional(),
  tokensUsed: z.number().int().min(0).optional(),
  processingCost: z.number().min(0).optional(),
  errorMessage: z.string().optional(),
  retryCount: z.number().int().min(0).optional(),
});

// Egress (API Response DTO)
export const AiContentJobResponseSchema = z.object({
  id: z.string().uuid(),
  contentId: z.string().uuid().nullable(),
  userId: z.string().uuid().nullable(),
  jobType: JobTypeEnum,
  parameters: z.record(z.unknown()),
  priority: JobPriorityEnum,
  status: JobStatusEnum,
  result: z.record(z.unknown()).nullable(),
  confidenceScore: z.number().nullable(),
  humanReviewed: z.boolean(),
  humanApproved: z.boolean().nullable(),
  reviewNotes: z.string().nullable(),
  aiModel: z.string(),
  tokensUsed: z.number().int().nullable(),
  processingCost: z.number().nullable(),
  errorMessage: z.string().nullable(),
  retryCount: z.number().int(),
  createdAt: z.string().datetime(),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const AiContentJobListResponseSchema = z.object({
  data: z.array(AiContentJobResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AiContentJobCreate = z.infer<typeof AiContentJobCreateSchema>;
export type AiContentJobUpdate = z.infer<typeof AiContentJobUpdateSchema>;
export type AiContentJobResponse = z.infer<typeof AiContentJobResponseSchema>;
export type AiContentJobListResponse = z.infer<typeof AiContentJobListResponseSchema>;

