import { z } from 'zod';

// ============================================================================
// CONTENT CATEGORY ENTITY SCHEMA
// ============================================================================
// Aligned with content_categories table from database schema

export const contentCategoryEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),

  // Hierarchy
  parentId: z.string().uuid().optional(),
  orderIndex: z.number().int().min(0).default(0),

  // Theological Classification
  theologicalDiscipline: z
    .enum([
      'systematic',
      'biblical',
      'practical',
      'historical',
      'philosophical',
      'missional',
      'pastoral',
    ])
    .optional(),

  // Movement Relevance (1-10 scale)
  movementRelevanceScore: z.number().int().min(1).max(10).default(5),

  // APEST Relevance Scoring
  apestRelevance: z
    .object({
      apostolic: z.number().int().min(1).max(10).default(5),
      prophetic: z.number().int().min(1).max(10).default(5),
      evangelistic: z.number().int().min(1).max(10).default(5),
      shepherding: z.number().int().min(1).max(10).default(5),
      teaching: z.number().int().min(1).max(10).default(5),
    })
    .default({
      apostolic: 5,
      prophetic: 5,
      evangelistic: 5,
      shepherding: 5,
      teaching: 5,
    }),

  // SEO & Discovery
  metaDescription: z.string().max(500).optional(),
  keywords: z.array(z.string()).default([]),

  // Status
  isActive: z.boolean().default(true),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// CONTENT ITEM ENTITY SCHEMA
// ============================================================================
// Based on content_items table from database documentation

export const contentItemEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),

  // Author Information
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string()).default([]),

  // Content Classification
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
  format: z
    .enum(['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'])
    .default('text'),

  // Content Metrics
  wordCount: z.number().int().min(0).optional(),
  estimatedReadingTime: z.number().int().min(0).optional(),

  // Engagement Metrics
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  bookmarkCount: z.number().int().min(0).default(0),

  // Categorization
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),

  // Series Information
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.number().int().min(0).optional(),

  // Visibility & Status
  visibility: z
    .enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ])
    .default('public'),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .default('draft'),

  // AI Enhancement
  networkAmplificationScore: z.number().min(0).max(10).default(0),
  crossReferenceCount: z.number().int().min(0).default(0),
  aiEnhanced: z.boolean().default(false),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).default([]),

  // Media & Attachments
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
        size: z.number().int().min(0),
      })
    )
    .default([]),

  // SEO & Metadata
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
  canonicalUrl: z.string().url().optional(),
  originalSource: z.string().max(500).optional(),

  // Publication & Scheduling
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),

  // Licensing
  licenseType: z
    .enum([
      'all_rights_reserved',
      'creative_commons',
      'public_domain',
      'fair_use',
    ])
    .default('all_rights_reserved'),
  attributionRequired: z.boolean().default(true),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// CONTENT SERIES ENTITY SCHEMA
// ============================================================================

export const contentSeriesEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),

  // Series Details
  authorId: z.string().uuid(),
  collaborators: z.array(z.string()).default([]), // User IDs
  primaryCategoryId: z.string().uuid().optional(),

  // Series Configuration
  seriesType: z.enum([
    'course',
    'learning_path',
    'book_series',
    'podcast_series',
    'video_series',
    'framework',
  ]),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced', 'expert'])
    .default('intermediate'),
  totalItems: z.number().int().min(0).default(0),
  estimatedDuration: z.number().int().min(0).optional(), // in minutes

  // Categorization
  tags: z.array(z.string()).default([]),

  // Visibility & Status
  visibility: z
    .enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ])
    .default('public'),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review'])
    .default('draft'),

  // SEO & Media
  featuredImageUrl: z.string().url().optional(),
  metaDescription: z.string().max(500).optional(),

  // Publication
  publishedAt: z.string().datetime().optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// CONTENT CROSS REFERENCE ENTITY SCHEMA
// ============================================================================

export const contentCrossReferenceEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),

  // Reference Classification
  referenceType: z.enum([
    'builds_on',
    'contradicts',
    'supports',
    'extends',
    'applies',
    'critiques',
    'synthesizes',
  ]),
  relevanceScore: z.number().int().min(0).max(10).default(5),
  qualityScore: z.number().int().min(0).max(10).default(5),
  contextDescription: z.string().max(500).optional(),
  isAuthorApproved: z.boolean().default(false),
  isAiGenerated: z.boolean().default(false),
  clickCount: z.number().int().min(0).default(0),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// CONTENT RESPONSE SCHEMAS (with computed fields)
// ============================================================================

export const contentCategoryResponseSchema = contentCategoryEntitySchema.extend(
  {
    // Computed fields
    isActive: z.boolean(),
    hasParent: z.boolean(),
    hasChildren: z.boolean(),
    childCount: z.number().int().min(0),
    contentCount: z.number().int().min(0),
    displayName: z.string(),
    breadcrumb: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
      })
    ),

    // Related data
    parent: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
      })
      .optional(),

    children: z
      .array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          slug: z.string(),
          contentCount: z.number().int().min(0),
        })
      )
      .optional(),
  }
);

export const contentItemResponseSchema = contentItemEntitySchema.extend({
  // Computed fields
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  isScheduled: z.boolean(),
  isArchived: z.boolean(),
  hasFeaturedImage: z.boolean(),
  hasVideo: z.boolean(),
  hasAudio: z.boolean(),
  hasAttachments: z.boolean(),
  isAiEnhanced: z.boolean(),
  readingTimeText: z.string(),
  viewCountText: z.string(),
  engagementScore: z.number().min(0).max(10),

  // Related data
  author: z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    displayName: z.string().optional(),
    avatarUrl: z.string().url().optional(),
  }),

  primaryCategory: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .optional(),

  series: z
    .object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
      totalEpisodes: z.number().int().min(0),
    })
    .optional(),

  coAuthors: z.array(
    z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string().optional(),
    })
  ),
});

export const contentSeriesResponseSchema = contentSeriesEntitySchema.extend({
  // Computed fields
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  hasFeaturedImage: z.boolean(),
  completionPercentage: z.number().min(0).max(100),
  estimatedDurationText: z.string().optional(),

  // Related data
  author: z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    displayName: z.string().optional(),
  }),

  category: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .optional(),

  episodes: z
    .array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        slug: z.string(),
        order: z.number().int().min(0),
        status: z.string(),
        publishedAt: z.string().datetime().optional(),
      })
    )
    .optional(),
});

// ============================================================================
// CONTENT CREATE SCHEMAS
// ============================================================================

export const createContentCategorySchema = contentCategoryEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    name: z.string().min(1, 'Category name is required').max(200),
    slug: z.string().min(1, 'Category slug is required').max(100),
  });

export const createContentItemSchema = contentItemEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    viewCount: true,
    likeCount: true,
    shareCount: true,
    commentCount: true,
    bookmarkCount: true,
  })
  .extend({
    title: z.string().min(1, 'Content title is required').max(300),
    slug: z.string().min(1, 'Content slug is required').max(200),
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
  });

export const createContentSeriesSchema = contentSeriesEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    totalItems: true,
  })
  .extend({
    title: z.string().min(1, 'Series title is required').max(300),
    slug: z.string().min(1, 'Series slug is required').max(200),
    seriesType: z.enum([
      'course',
      'learning_path',
      'book_series',
      'podcast_series',
      'video_series',
      'framework',
    ]),
  });

// ============================================================================
// CONTENT UPDATE SCHEMAS
// ============================================================================

export const updateContentCategorySchema = createContentCategorySchema
  .partial()
  .omit({
    slug: true, // Slug cannot be changed after creation
  });

export const updateContentItemSchema = createContentItemSchema.partial().omit({
  slug: true, // Slug cannot be changed after creation
});

export const updateContentSeriesSchema = createContentSeriesSchema
  .partial()
  .omit({
    slug: true, // Slug cannot be changed after creation
  });

// ============================================================================
// CONTENT QUERY SCHEMAS
// ============================================================================

export const contentCategoryQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Search
  search: z.string().optional(),

  // Filters
  parentId: z.string().uuid().optional(),
  theologicalDiscipline: z.string().optional(),
  isActive: z.boolean().optional(),

  // Sorting
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name', 'orderIndex', 'contentCount'])
    .default('orderIndex'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),

  // Include related data
  includeParent: z.boolean().default(false),
  includeChildren: z.boolean().default(false),
  includeContentCount: z.boolean().default(true),
});

export const contentItemQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Search
  search: z.string().optional(),

  // Filters
  authorId: z.string().uuid().optional(),
  contentType: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  seriesId: z.string().uuid().optional(),
  status: z.string().optional(),
  visibility: z.string().optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  aiEnhanced: z.boolean().optional(),

  // Date filters
  publishedAfter: z.string().datetime().optional(),
  publishedBefore: z.string().datetime().optional(),

  // Sorting
  sortBy: z
    .enum([
      'createdAt',
      'updatedAt',
      'publishedAt',
      'title',
      'viewCount',
      'likeCount',
      'wordCount',
    ])
    .default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Include related data
  includeAuthor: z.boolean().default(true),
  includeCategory: z.boolean().default(true),
  includeSeries: z.boolean().default(false),
  includeCoAuthors: z.boolean().default(false),
});

export const contentSeriesQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Search
  search: z.string().optional(),

  // Filters
  authorId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  status: z.string().optional(),
  visibility: z.string().optional(),

  // Sorting
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'publishedAt', 'title', 'totalEpisodes'])
    .default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Include related data
  includeAuthor: z.boolean().default(true),
  includeCategory: z.boolean().default(true),
  includeEpisodes: z.boolean().default(false),
});

// ============================================================================
// CONTENT FORM SCHEMAS (for UI forms)
// ============================================================================

export const contentItemFormSchema = z.object({
  // Basic Info
  title: z.string().min(1, 'Title is required').max(300),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),

  // Classification
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
  format: z
    .enum(['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'])
    .default('text'),

  // Categorization
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),

  // Series
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.coerce.number().int().min(0).optional(),

  // Visibility & Status
  visibility: z
    .enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ])
    .default('public'),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .default('draft'),

  // Media
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),

  // SEO
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),

  // Publication
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),

  // Licensing
  licenseType: z
    .enum([
      'all_rights_reserved',
      'creative_commons',
      'public_domain',
      'fair_use',
    ])
    .default('all_rights_reserved'),
  attributionRequired: z.boolean().default(true),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ContentCategoryEntity = z.infer<typeof contentCategoryEntitySchema>;
export type ContentItemEntity = z.infer<typeof contentItemEntitySchema>;
export type ContentSeriesEntity = z.infer<typeof contentSeriesEntitySchema>;
export type ContentCrossReferenceEntity = z.infer<
  typeof contentCrossReferenceEntitySchema
>;

export type ContentCategoryResponse = z.infer<
  typeof contentCategoryResponseSchema
>;
export type ContentItemResponse = z.infer<typeof contentItemResponseSchema>;
export type ContentSeriesResponse = z.infer<typeof contentSeriesResponseSchema>;

export type CreateContentCategory = z.infer<typeof createContentCategorySchema>;
export type CreateContentItem = z.infer<typeof createContentItemSchema>;
export type CreateContentSeries = z.infer<typeof createContentSeriesSchema>;

export type UpdateContentCategory = z.infer<typeof updateContentCategorySchema>;
export type UpdateContentItem = z.infer<typeof updateContentItemSchema>;
export type UpdateContentSeries = z.infer<typeof updateContentSeriesSchema>;

export type ContentCategoryQuery = z.infer<typeof contentCategoryQuerySchema>;
export type ContentItemQuery = z.infer<typeof contentItemQuerySchema>;
export type ContentSeriesQuery = z.infer<typeof contentSeriesQuerySchema>;

export type ContentItemForm = z.infer<typeof contentItemFormSchema>;

// Legacy aliases for backward compatibility
export type ContentCategory = ContentCategoryEntity;
export type ContentItem = ContentItemEntity;
export type ContentSeries = ContentSeriesEntity;
export type ContentCrossReference = ContentCrossReferenceEntity;
export type NewContentCategory = CreateContentCategory;
export type NewContentItem = CreateContentItem;
export type NewContentSeries = CreateContentSeries;
export type NewContentCrossReference = ContentCrossReferenceEntity; // Note: No create schema exists
export type NewSeriesContentItem = CreateContentItem; // Alias for series content
export type SeriesContentItem = ContentItemEntity; // Alias for series content

// ============================================================================
// ADDITIONAL SCHEMAS FOR SHARED PACKAGE COMPATIBILITY
// ============================================================================

// Content Cross Reference Create Schema
export const createContentCrossReferenceSchema =
  contentCrossReferenceEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  } as const);

// Content Cross Reference Update Schema
export const updateContentCrossReferenceSchema =
  createContentCrossReferenceSchema.partial();

// Series Content Item Create Schema (alias)
export const createSeriesContentItemSchema = createContentItemSchema;

// Series Content Item Update Schema (alias)
export const updateSeriesContentItemSchema = updateContentItemSchema;

// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================

export const contentCategorySchema = contentCategoryEntitySchema;
export const contentItemSchema = contentItemEntitySchema;
export const contentSeriesSchema = contentSeriesEntitySchema;
export const contentCrossReferenceSchema = contentCrossReferenceEntitySchema;
export const seriesContentItemSchema = contentItemEntitySchema; // Alias for series content items
export const newContentCrossReferenceSchema = createContentCrossReferenceSchema;
export const newSeriesContentItemSchema = createSeriesContentItemSchema;
