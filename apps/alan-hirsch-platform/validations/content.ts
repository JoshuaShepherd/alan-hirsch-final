import { z } from 'zod';
import { visibilitySchema, attachmentSchema } from './shared';

// Content Category Validation Schemas
export const theologicalDisciplineSchema = z.enum([
  'systematic',
  'biblical',
  'practical',
  'historical',
  'philosophical',
  'missional',
  'pastoral',
]);

export const apestRelevanceSchema = z.object({
  apostolic: z.number().min(1).max(10),
  prophetic: z.number().min(1).max(10),
  evangelistic: z.number().min(1).max(10),
  shepherding: z.number().min(1).max(10),
  teaching: z.number().min(1).max(10),
});

export const contentCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),

  // Hierarchy
  parentId: z.string().uuid().optional(),
  orderIndex: z.number().int().min(0).default(0),

  // Theological Classification
  theologicalDiscipline: theologicalDisciplineSchema.optional(),

  // Movement Relevance (1-10 scale)
  movementRelevanceScore: z.number().int().min(1).max(10).default(5),

  // APEST Relevance Scoring
  apestRelevance: apestRelevanceSchema.default({
    apostolic: 5,
    prophetic: 5,
    evangelistic: 5,
    shepherding: 5,
    teaching: 5,
  }),

  // SEO & Discovery
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).default([]),

  // Status
  isActive: z.boolean().default(true),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newContentCategorySchema = contentCategorySchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// Content Series Validation Schemas - ⏳ PLANNED
export const seriesTypeSchema = z.enum([
  'course',
  'learning_path',
  'book_series',
  'podcast_series',
  'video_series',
  'framework',
]);

export const difficultySchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);

export const contentStatusSchema = z.enum([
  'draft',
  'published',
  'archived',
  'under_review',
]);

export const contentSeriesSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  excerpt: z.string().optional(),

  // Author & Attribution
  authorId: z.string().uuid(),
  collaborators: z.array(z.string().uuid()).default([]),

  // Series Configuration
  seriesType: seriesTypeSchema,
  difficulty: difficultySchema.default('intermediate'),

  // Content Organization
  totalItems: z.number().int().min(0).default(0),
  estimatedDuration: z.number().int().min(0).optional(), // minutes

  // Categorization
  primaryCategoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),

  // Visibility & Access
  visibility: visibilitySchema.default('public'),
  status: contentStatusSchema.default('draft'),

  // SEO & Media
  featuredImageUrl: z.string().url().optional(),
  metaDescription: z.string().optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
});

export const newContentSeriesSchema = contentSeriesSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    publishedAt: true,
  });

// Content Item Validation Schemas
export const contentTypeSchema = z.enum([
  'article',
  'video',
  'podcast',
  'framework',
  'tool',
  'case_study',
  'interview',
  'course_lesson',
]);

export const formatSchema = z.enum([
  'text',
  'video',
  'audio',
  'interactive',
  'pdf',
  'presentation',
]);

export const contentItemStatusSchema = z.enum([
  'draft',
  'published',
  'archived',
  'under_review',
  'scheduled',
]);

export const licenseTypeSchema = z.enum([
  'all_rights_reserved',
  'creative_commons',
  'public_domain',
  'fair_use',
]);

export const contentItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().optional(),
  content: z.string().optional(),

  // Author & Attribution
  authorId: z.string().uuid(),
  coAuthors: z.array(z.string().uuid()).default([]),

  // Content Classification
  contentType: contentTypeSchema,
  format: formatSchema.default('text'),

  // Content Metrics
  wordCount: z.number().int().min(0).optional(),
  estimatedReadingTime: z.number().int().min(0).optional(), // minutes
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  bookmarkCount: z.number().int().min(0).default(0),

  // Categorization & Tagging
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),

  // Series Association
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.number().int().min(0).optional(),

  // Visibility & Access Control
  visibility: visibilitySchema.default('public'),
  status: contentItemStatusSchema.default('draft'),

  // Network Amplification - ⏳ PLANNED
  networkAmplificationScore: z.number().min(0).default(0),
  crossReferenceCount: z.number().int().min(0).default(0),

  // AI Enhancement
  aiEnhanced: z.boolean().default(false),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).default([]),

  // Media & Assets
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  attachments: z.array(attachmentSchema).default([]),

  // SEO & Discovery
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),

  // Attribution & Permissions
  originalSource: z.string().optional(),
  licenseType: licenseTypeSchema.default('all_rights_reserved'),
  attributionRequired: z.boolean().default(true),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  scheduledAt: z.date().optional(),
});

export const newContentItemSchema = contentItemSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    publishedAt: true,
    scheduledAt: true,
  });

// Series Content Item Validation Schemas - ⏳ PLANNED
export const seriesContentItemSchema = z.object({
  id: z.string().uuid(),
  seriesId: z.string().uuid(),
  contentId: z.string().uuid(),

  // Ordering
  orderIndex: z.number().int().min(0),

  // Prerequisites
  prerequisites: z.array(z.string().uuid()).default([]),

  // Timestamps
  createdAt: z.date(),
});

export const newSeriesContentItemSchema = seriesContentItemSchema
  .omit({
    createdAt: true,
  })
  .partial({
    id: true,
  });

// Content Cross Reference Validation Schemas - ⏳ PLANNED
export const referenceTypeSchema = z.enum([
  'builds_on',
  'contradicts',
  'supports',
  'extends',
  'applies',
  'critiques',
  'synthesizes',
]);

export const contentCrossReferenceSchema = z.object({
  id: z.string().uuid(),
  sourceContentId: z.string().uuid(),
  targetContentId: z.string().uuid(),

  // Reference Classification
  referenceType: referenceTypeSchema,

  // Quality & Relevance
  relevanceScore: z.number().int().min(1).max(10).default(5),
  qualityScore: z.number().int().min(1).max(10).default(5),

  // Context
  contextDescription: z.string().optional(),

  // Approval Workflow
  isAuthorApproved: z.boolean().default(false),
  isAiGenerated: z.boolean().default(false),

  // Analytics
  clickCount: z.number().int().min(0).default(0),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newContentCrossReferenceSchema = contentCrossReferenceSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// Type exports
export type ContentCategory = z.infer<typeof contentCategorySchema>;
export type NewContentCategory = z.infer<typeof newContentCategorySchema>;
export type ContentSeries = z.infer<typeof contentSeriesSchema>;
export type NewContentSeries = z.infer<typeof newContentSeriesSchema>;
export type ContentItem = z.infer<typeof contentItemSchema>;
export type NewContentItem = z.infer<typeof newContentItemSchema>;
export type SeriesContentItem = z.infer<typeof seriesContentItemSchema>;
export type NewSeriesContentItem = z.infer<typeof newSeriesContentItemSchema>;
export type ContentCrossReference = z.infer<typeof contentCrossReferenceSchema>;
export type NewContentCrossReference = z.infer<
  typeof newContentCrossReferenceSchema
>;
