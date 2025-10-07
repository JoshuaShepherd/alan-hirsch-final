import { z } from "zod";

// Shared enums
export const TheologicalDisciplineEnum = z.enum([
  "systematic",
  "biblical",
  "practical",
  "historical",
  "philosophical",
  "missional",
  "pastoral",
]);

// Ingress (Create/Update DTOs)
export const ContentCategoryCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
  orderIndex: z.number().int().min(0).default(0),
  theologicalDiscipline: TheologicalDisciplineEnum.optional(),
  movementRelevanceScore: z.number().int().min(1).max(10).default(5),
  apestRelevance: z.object({
    apostolic: z.number().min(1).max(10),
    prophetic: z.number().min(1).max(10),
    evangelistic: z.number().min(1).max(10),
    shepherding: z.number().min(1).max(10),
    teaching: z.number().min(1).max(10),
  }).default({
    apostolic: 5,
    prophetic: 5,
    evangelistic: 5,
    shepherding: 5,
    teaching: 5,
  }),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export const ContentCategoryUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().optional(),
  orderIndex: z.number().int().min(0).optional(),
  theologicalDiscipline: TheologicalDisciplineEnum.optional(),
  movementRelevanceScore: z.number().int().min(1).max(10).optional(),
  apestRelevance: z.object({
    apostolic: z.number().min(1).max(10),
    prophetic: z.number().min(1).max(10),
    evangelistic: z.number().min(1).max(10),
    shepherding: z.number().min(1).max(10),
    teaching: z.number().min(1).max(10),
  }).optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

// Egress (API Response DTO)
export const ContentCategoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.string().uuid().nullable(),
  orderIndex: z.number().int(),
  theologicalDiscipline: TheologicalDisciplineEnum.nullable(),
  movementRelevanceScore: z.number().int(),
  apestRelevance: z.object({
    apostolic: z.number(),
    prophetic: z.number(),
    evangelistic: z.number(),
    shepherding: z.number(),
    teaching: z.number(),
  }),
  metaDescription: z.string().nullable(),
  keywords: z.array(z.string()),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const ContentCategoryListResponseSchema = z.object({
  data: z.array(ContentCategoryResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type ContentCategoryCreate = z.infer<typeof ContentCategoryCreateSchema>;
export type ContentCategoryUpdate = z.infer<typeof ContentCategoryUpdateSchema>;
export type ContentCategoryResponse = z.infer<typeof ContentCategoryResponseSchema>;
export type ContentCategoryListResponse = z.infer<typeof ContentCategoryListResponseSchema>;

