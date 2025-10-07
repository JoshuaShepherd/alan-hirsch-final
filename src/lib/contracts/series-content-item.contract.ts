import { z } from "zod";

// Ingress (Create/Update DTOs)
export const SeriesContentItemCreateSchema = z.object({
  seriesId: z.string().uuid(),
  contentId: z.string().uuid(),
  orderIndex: z.number().int().min(0),
  prerequisites: z.array(z.string()).default([]),
});

export const SeriesContentItemUpdateSchema = z.object({
  id: z.string().uuid(),
  seriesId: z.string().uuid().optional(),
  contentId: z.string().uuid().optional(),
  orderIndex: z.number().int().min(0).optional(),
  prerequisites: z.array(z.string()).optional(),
});

// Egress (API Response DTO)
export const SeriesContentItemResponseSchema = z.object({
  id: z.string().uuid(),
  seriesId: z.string().uuid(),
  contentId: z.string().uuid(),
  orderIndex: z.number().int(),
  prerequisites: z.array(z.string()),
  createdAt: z.string().datetime(),
});

// List envelope (standardized)
export const SeriesContentItemListResponseSchema = z.object({
  data: z.array(SeriesContentItemResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type SeriesContentItemCreate = z.infer<typeof SeriesContentItemCreateSchema>;
export type SeriesContentItemUpdate = z.infer<typeof SeriesContentItemUpdateSchema>;
export type SeriesContentItemResponse = z.infer<typeof SeriesContentItemResponseSchema>;
export type SeriesContentItemListResponse = z.infer<typeof SeriesContentItemListResponseSchema>;

