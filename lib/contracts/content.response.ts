import { z } from 'zod';

// Content Response DTOs - Output validation for API endpoints
// These schemas ensure consistent, UI-friendly data shapes

// Content Item Response DTO
export const contentItemResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string().uuid()),
  contentType: z.enum([
    'article',
    'video',
    'podcast',
    'framework',
    'tool',
    'case_study',
    'interview',
    'course_lesson',
  ]),
  format: z.enum([
    'text',
    'video',
    'audio',
    'interactive',
    'pdf',
    'presentation',
  ]),
  wordCount: z.number().int(),
  estimatedReadingTime: z.number().int(),
  viewCount: z.number().int(),
  likeCount: z.number().int(),
  shareCount: z.number().int(),
  commentCount: z.number().int(),
  bookmarkCount: z.number().int(),
  primaryCategoryId: z.string().uuid(),
  secondaryCategories: z.array(z.string().uuid()),
  tags: z.array(z.string()),
  theologicalThemes: z.array(z.string()),
  seriesId: z.string().uuid(),
  seriesOrder: z.number().int(),
  visibility: z.enum(['public', 'premium', 'vip', 'private', 'organization']),
  status: z.enum([
    'draft',
    'published',
    'archived',
    'under_review',
    'scheduled',
  ]),
  networkAmplificationScore: z.string(),
  crossReferenceCount: z.number().int(),
  aiEnhanced: z.boolean(),
  aiSummary: z.string(),
  aiKeyPoints: z.array(z.string()),
  featuredImageUrl: z.string(),
  videoUrl: z.string(),
  audioUrl: z.string(),
  attachments: z.array(z.string()),
  metaTitle: z.string(),
  metaDescription: z.string(),
  canonicalUrl: z.string(),
  originalSource: z.string(),
  licenseType: z.enum([
    'all_rights_reserved',
    'creative_commons',
    'public_domain',
    'fair_use',
  ]),
  attributionRequired: z.boolean(),

  // Computed fields for UI
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  isScheduled: z.boolean(),
  hasFeaturedImage: z.boolean(),
  hasVideo: z.boolean(),
  hasAudio: z.boolean(),
  readingTimeText: z.string(),
  viewCountText: z.string(),
  isAiEnhanced: z.boolean(),

  // Related data
  author: z
    .object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string(),
      avatarUrl: z.string(),
    })
    .optional(),
  category: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
  scheduledAt: z.string().datetime().nullable(),
});

// Content Category Response DTO
export const contentCategoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  parentId: z.string().uuid(),
  orderIndex: z.number().int(),
  theologicalDiscipline: z.enum([
    'systematic',
    'biblical',
    'practical',
    'historical',
    'philosophical',
    'missional',
    'pastoral',
  ]),
  movementRelevanceScore: z.number().int(),
  apestRelevance: z.object({
    apostolic: z.number(),
    prophetic: z.number(),
    evangelistic: z.number(),
    shepherding: z.number(),
    teaching: z.number(),
  }),
  metaDescription: z.string(),
  keywords: z.array(z.string()),
  isActive: z.boolean(),

  // Computed fields for UI
  hasParent: z.boolean(),
  hasChildren: z.boolean(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Content Series Response DTO
export const contentSeriesResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  authorId: z.string().uuid(),
  collaborators: z.array(z.string().uuid()),
  seriesType: z.enum([
    'course',
    'learning_path',
    'book_series',
    'podcast_series',
    'video_series',
    'framework',
  ]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  totalItems: z.number().int(),
  estimatedDuration: z.number().int(),
  primaryCategoryId: z.string().uuid(),
  tags: z.array(z.string()),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  status: z.enum(['draft', 'published', 'archived', 'under_review']),
  featuredImageUrl: z.string(),
  metaDescription: z.string(),

  // Computed fields for UI
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  hasFeaturedImage: z.boolean(),

  // Related data
  author: z
    .object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string(),
      avatarUrl: z.string(),
    })
    .optional(),
  category: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

// Paginated Content Item List Response DTO
export const paginatedContentItemListResponseSchema = z.object({
  items: z.object({
    data: z.array(contentItemResponseSchema),
    pagination: z.object({
      page: z.number().int(),
      limit: z.number().int(),
      total: z.number().int(),
      totalPages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Paginated Content Category List Response DTO
export const paginatedContentCategoryListResponseSchema = z.object({
  items: z.object({
    data: z.array(contentCategoryResponseSchema),
    pagination: z.object({
      page: z.number().int(),
      limit: z.number().int(),
      total: z.number().int(),
      totalPages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Paginated Content Series List Response DTO
export const paginatedContentSeriesListResponseSchema = z.object({
  items: z.object({
    data: z.array(contentSeriesResponseSchema),
    pagination: z.object({
      page: z.number().int(),
      limit: z.number().int(),
      total: z.number().int(),
      totalPages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  }),
  success: z.boolean(),
  message: z.string().optional(),
});

// Type exports
export type ContentItemResponse = z.infer<typeof contentItemResponseSchema>;
export type ContentCategoryResponse = z.infer<
  typeof contentCategoryResponseSchema
>;
export type ContentSeriesResponse = z.infer<typeof contentSeriesResponseSchema>;
export type PaginatedContentItemListResponse = z.infer<
  typeof paginatedContentItemListResponseSchema
>;
export type PaginatedContentCategoryListResponse = z.infer<
  typeof paginatedContentCategoryListResponseSchema
>;
export type PaginatedContentSeriesListResponse = z.infer<
  typeof paginatedContentSeriesListResponseSchema
>;
