import { z } from 'zod';
import {
  ContentStatusEnum,
  ContentVisibilityEnum,
} from './content-item.contract';

// Shared enums
export const SeriesTypeEnum = z.enum([
  'course',
  'learning_path',
  'book_series',
  'podcast_series',
  'video_series',
  'framework',
]);

export const DifficultyEnum = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);

// Ingress (Create/Update DTOs)
export const ContentSeriesCreateSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  authorId: z.string().uuid(),
  collaborators: z.array(z.string()).default([]),
  seriesType: SeriesTypeEnum,
  difficulty: DifficultyEnum.default('intermediate'),
  totalItems: z.number().int().min(0).default(0),
  estimatedDuration: z.number().int().min(0).optional(),
  primaryCategoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  visibility: ContentVisibilityEnum.default('public'),
  status: ContentStatusEnum.default('draft'),
  featuredImageUrl: z.string().url().optional(),
  metaDescription: z.string().optional(),
});

export const ContentSeriesUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  authorId: z.string().uuid().optional(),
  collaborators: z.array(z.string()).optional(),
  seriesType: SeriesTypeEnum.optional(),
  difficulty: DifficultyEnum.optional(),
  totalItems: z.number().int().min(0).optional(),
  estimatedDuration: z.number().int().min(0).optional(),
  primaryCategoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  visibility: ContentVisibilityEnum.optional(),
  status: ContentStatusEnum.optional(),
  featuredImageUrl: z.string().url().optional(),
  metaDescription: z.string().optional(),
});

// Egress (API Response DTO)
export const ContentSeriesResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  excerpt: z.string().nullable(),
  authorId: z.string().uuid(),
  collaborators: z.array(z.string()),
  seriesType: SeriesTypeEnum,
  difficulty: DifficultyEnum,
  totalItems: z.number().int(),
  estimatedDuration: z.number().int().nullable(),
  primaryCategoryId: z.string().uuid().nullable(),
  tags: z.array(z.string()),
  visibility: ContentVisibilityEnum,
  status: ContentStatusEnum,
  featuredImageUrl: z.string().nullable(),
  metaDescription: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const ContentSeriesListResponseSchema = z.object({
  data: z.array(ContentSeriesResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type ContentSeriesCreate = z.infer<typeof ContentSeriesCreateSchema>;
export type ContentSeriesUpdate = z.infer<typeof ContentSeriesUpdateSchema>;
export type ContentSeriesResponse = z.infer<typeof ContentSeriesResponseSchema>;
export type ContentSeriesListResponse = z.infer<
  typeof ContentSeriesListResponseSchema
>;
