import { z } from "zod";

// Shared enums
export const ReferenceTypeEnum = z.enum([
  "builds_on",
  "contradicts",
  "supports",
  "extends",
  "applies",
  "critiques",
  "synthesizes",
]);

// Ingress (Create/Update DTOs)
export const ContentCrossReferenceCreateSchema = z.object({
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  referenceType: ReferenceTypeEnum,
  relevanceScore: z.number().int().min(1).max(10).default(5),
  qualityScore: z.number().int().min(1).max(10).default(5),
  contextDescription: z.string().optional(),
  isAuthorApproved: z.boolean().default(false),
  isAiGenerated: z.boolean().default(false),
});

export const ContentCrossReferenceUpdateSchema = z.object({
  id: z.string().uuid(),
  sourceContentId: z.string().uuid().optional(),
  targetContentId: z.string().uuid().optional(),
  referenceType: ReferenceTypeEnum.optional(),
  relevanceScore: z.number().int().min(1).max(10).optional(),
  qualityScore: z.number().int().min(1).max(10).optional(),
  contextDescription: z.string().optional(),
  isAuthorApproved: z.boolean().optional(),
  isAiGenerated: z.boolean().optional(),
});

// Egress (API Response DTO)
export const ContentCrossReferenceResponseSchema = z.object({
  id: z.string().uuid(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  referenceType: ReferenceTypeEnum,
  relevanceScore: z.number().int(),
  qualityScore: z.number().int(),
  contextDescription: z.string().nullable(),
  isAuthorApproved: z.boolean(),
  isAiGenerated: z.boolean(),
  clickCount: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const ContentCrossReferenceListResponseSchema = z.object({
  data: z.array(ContentCrossReferenceResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type ContentCrossReferenceCreate = z.infer<typeof ContentCrossReferenceCreateSchema>;
export type ContentCrossReferenceUpdate = z.infer<typeof ContentCrossReferenceUpdateSchema>;
export type ContentCrossReferenceResponse = z.infer<typeof ContentCrossReferenceResponseSchema>;
export type ContentCrossReferenceListResponse = z.infer<typeof ContentCrossReferenceListResponseSchema>;

