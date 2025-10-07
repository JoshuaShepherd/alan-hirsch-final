// Auto-generated contracts for content
// Generated at: 2025-10-06T20:01:40.348Z

import { z } from 'zod';

// Entity validation schema for contentSeries
export const contentSeriesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  excerpt: z.string().nullable(),
  authorId: z.string().uuid(),
  collaborators: z.any(),
  seriesType: z.string().nullable(),
  difficulty: z.string().nullable(),
  totalItems: z.number().int().default(0).nullable(),
  estimatedDuration: z.number().int().nullable(),
  primaryCategoryId: z.string().uuid().nullable(),
  tags: z.array(z.string()),
  visibility: z
    .enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ])
    .nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  featuredImageUrl: z.string().nullable(),
  metaDescription: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
  publishedAt: z.string().datetime().nullable(),
});

// Create validation schema for contentSeries
export const createcontentSeriesSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  authorId: z.string().uuid(),
  collaborators: z.any().optional(),
  seriesType: z.string(),
  difficulty: z.string(),
  totalItems: z.number().int().optional().default(0),
  estimatedDuration: z.number().int(),
  primaryCategoryId: z.string().uuid(),
  tags: z.array(z.string()).optional(),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  featuredImageUrl: z.string(),
  metaDescription: z.string(),
  publishedAt: z.string().datetime(),
});

// Update validation schema for contentSeries
export const updatecontentSeriesSchema = z
  .object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    excerpt: z.string(),
    authorId: z.string().uuid(),
    collaborators: z.any().optional(),
    seriesType: z.string(),
    difficulty: z.string(),
    totalItems: z.number().int().optional().default(0),
    estimatedDuration: z.number().int(),
    primaryCategoryId: z.string().uuid(),
    tags: z.array(z.string()).optional(),
    visibility: z.enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ]),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    featuredImageUrl: z.string(),
    metaDescription: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
    publishedAt: z.string().datetime(),
  })
  .partial();

// Query validation schema for contentSeries
export const contentSeriesQuerySchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  authorId: z.string().uuid(),
  collaborators: z.any().optional(),
  seriesType: z.string(),
  difficulty: z.string(),
  totalItems: z.number().int().optional().default(0),
  estimatedDuration: z.number().int(),
  primaryCategoryId: z.string().uuid(),
  tags: z.array(z.string()).optional(),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  featuredImageUrl: z.string(),
  metaDescription: z.string(),
  publishedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for contentItems
export const contentItemsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string().nullable(),
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string()),
  contentType: z.string().nullable(),
  format: z
    .enum(['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'])
    .nullable(),
  wordCount: z.number().int().nullable(),
  estimatedReadingTime: z.number().int().nullable(),
  viewCount: z.number().int().default(0).nullable(),
  likeCount: z.number().int().default(0).nullable(),
  shareCount: z.number().int().default(0).nullable(),
  commentCount: z.number().int().default(0).nullable(),
  bookmarkCount: z.number().int().default(0).nullable(),
  primaryCategoryId: z.string().uuid().nullable(),
  secondaryCategories: z.array(z.string()),
  tags: z.array(z.string()),
  theologicalThemes: z.array(z.string()),
  seriesId: z.string().uuid().nullable(),
  seriesOrder: z.number().int().nullable(),
  visibility: z
    .enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ])
    .nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  networkAmplificationScore: z.number().nullable(),
  crossReferenceCount: z.number().int().default(0).nullable(),
  aiEnhanced: z.boolean().default(false).nullable(),
  aiSummary: z.string().nullable(),
  aiKeyPoints: z.array(z.string()),
  featuredImageUrl: z.string().nullable(),
  videoUrl: z.string().nullable(),
  audioUrl: z.string().nullable(),
  attachments: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      type: z.string(),
      size: z.number(),
    })
  ),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  canonicalUrl: z.string().nullable(),
  originalSource: z.string().nullable(),
  licenseType: z.string().nullable(),
  attributionRequired: z.boolean().default(true).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
  publishedAt: z.string().datetime().nullable(),
  scheduledAt: z.string().datetime().nullable(),
});

// Create validation schema for contentItems
export const createcontentItemsSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string()).optional(),
  contentType: z.string(),
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
  viewCount: z.number().int().optional().default(0),
  likeCount: z.number().int().optional().default(0),
  shareCount: z.number().int().optional().default(0),
  commentCount: z.number().int().optional().default(0),
  bookmarkCount: z.number().int().optional().default(0),
  primaryCategoryId: z.string().uuid(),
  secondaryCategories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  seriesId: z.string().uuid(),
  seriesOrder: z.number().int(),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  networkAmplificationScore: z.number(),
  crossReferenceCount: z.number().int().optional().default(0),
  aiEnhanced: z.boolean().optional().default(false),
  aiSummary: z.string(),
  aiKeyPoints: z.array(z.string()).optional(),
  featuredImageUrl: z.string(),
  videoUrl: z.string(),
  audioUrl: z.string(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  canonicalUrl: z.string(),
  originalSource: z.string(),
  licenseType: z.string(),
  attributionRequired: z.boolean().optional().default(true),
  publishedAt: z.string().datetime(),
  scheduledAt: z.string().datetime(),
});

// Update validation schema for contentItems
export const updatecontentItemsSchema = z
  .object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    content: z.string(),
    authorId: z.string().uuid(),
    coAuthors: z.array(z.string()).optional(),
    contentType: z.string(),
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
    viewCount: z.number().int().optional().default(0),
    likeCount: z.number().int().optional().default(0),
    shareCount: z.number().int().optional().default(0),
    commentCount: z.number().int().optional().default(0),
    bookmarkCount: z.number().int().optional().default(0),
    primaryCategoryId: z.string().uuid(),
    secondaryCategories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    theologicalThemes: z.array(z.string()).optional(),
    seriesId: z.string().uuid(),
    seriesOrder: z.number().int(),
    visibility: z.enum([
      'public',
      'premium',
      'vip',
      'private',
      'organization',
      'invite_only',
    ]),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    networkAmplificationScore: z.number(),
    crossReferenceCount: z.number().int().optional().default(0),
    aiEnhanced: z.boolean().optional().default(false),
    aiSummary: z.string(),
    aiKeyPoints: z.array(z.string()).optional(),
    featuredImageUrl: z.string(),
    videoUrl: z.string(),
    audioUrl: z.string(),
    attachments: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
          type: z.string(),
          size: z.number(),
        })
      )
      .optional(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    canonicalUrl: z.string(),
    originalSource: z.string(),
    licenseType: z.string(),
    attributionRequired: z.boolean().optional().default(true),
    updatedAt: z.string().datetime().optional().default('NOW()'),
    publishedAt: z.string().datetime(),
    scheduledAt: z.string().datetime(),
  })
  .partial();

// Query validation schema for contentItems
export const contentItemsQuerySchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string()).optional(),
  contentType: z.string(),
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
  viewCount: z.number().int().optional().default(0),
  likeCount: z.number().int().optional().default(0),
  shareCount: z.number().int().optional().default(0),
  commentCount: z.number().int().optional().default(0),
  bookmarkCount: z.number().int().optional().default(0),
  primaryCategoryId: z.string().uuid(),
  secondaryCategories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  seriesId: z.string().uuid(),
  seriesOrder: z.number().int(),
  visibility: z.enum([
    'public',
    'premium',
    'vip',
    'private',
    'organization',
    'invite_only',
  ]),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  networkAmplificationScore: z.number(),
  crossReferenceCount: z.number().int().optional().default(0),
  aiEnhanced: z.boolean().optional().default(false),
  aiSummary: z.string(),
  aiKeyPoints: z.array(z.string()).optional(),
  featuredImageUrl: z.string(),
  videoUrl: z.string(),
  audioUrl: z.string(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  canonicalUrl: z.string(),
  originalSource: z.string(),
  licenseType: z.string(),
  attributionRequired: z.boolean().optional().default(true),
  publishedAt: z.string().datetime(),
  scheduledAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for seriesContentItems
export const seriesContentItemsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  seriesId: z.string().uuid(),
  contentId: z.string().uuid(),
  orderIndex: z.number().int(),
  prerequisites: z.any(),
  createdAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for seriesContentItems
export const createseriesContentItemsSchema = z.object({
  seriesId: z.string().uuid(),
  contentId: z.string().uuid(),
  orderIndex: z.number().int(),
  prerequisites: z.any().optional(),
});

// Update validation schema for seriesContentItems
export const updateseriesContentItemsSchema = z
  .object({
    seriesId: z.string().uuid(),
    contentId: z.string().uuid(),
    orderIndex: z.number().int(),
    prerequisites: z.any().optional(),
  })
  .partial();

// Query validation schema for seriesContentItems
export const seriesContentItemsQuerySchema = z.object({
  seriesId: z.string().uuid(),
  contentId: z.string().uuid(),
  orderIndex: z.number().int(),
  prerequisites: z.any().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for contentCrossReferences
export const contentCrossReferencesEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  referenceType: z.string().nullable(),
  relevanceScore: z.number().int().default(5).nullable(),
  qualityScore: z.number().int().default(5).nullable(),
  contextDescription: z.string().nullable(),
  isAuthorApproved: z.boolean().default(false).nullable(),
  isAiGenerated: z.boolean().default(false).nullable(),
  clickCount: z.number().int().default(0).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for contentCrossReferences
export const createcontentCrossReferencesSchema = z.object({
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  referenceType: z.string(),
  relevanceScore: z.number().int().optional().default(5),
  qualityScore: z.number().int().optional().default(5),
  contextDescription: z.string(),
  isAuthorApproved: z.boolean().optional().default(false),
  isAiGenerated: z.boolean().optional().default(false),
  clickCount: z.number().int().optional().default(0),
});

// Update validation schema for contentCrossReferences
export const updatecontentCrossReferencesSchema = z
  .object({
    sourceContentId: z.string().uuid(),
    targetContentId: z.string().uuid(),
    referenceType: z.string(),
    relevanceScore: z.number().int().optional().default(5),
    qualityScore: z.number().int().optional().default(5),
    contextDescription: z.string(),
    isAuthorApproved: z.boolean().optional().default(false),
    isAiGenerated: z.boolean().optional().default(false),
    clickCount: z.number().int().optional().default(0),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for contentCrossReferences
export const contentCrossReferencesQuerySchema = z.object({
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),
  referenceType: z.string(),
  relevanceScore: z.number().int().optional().default(5),
  qualityScore: z.number().int().optional().default(5),
  contextDescription: z.string(),
  isAuthorApproved: z.boolean().optional().default(false),
  isAiGenerated: z.boolean().optional().default(false),
  clickCount: z.number().int().optional().default(0),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
