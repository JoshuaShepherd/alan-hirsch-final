import { z } from 'zod';

// ============================================================================
// CONTENT ENUMS AND TYPES
// ============================================================================

export const contentTypeSchema = z.enum([
  'article',
  'video',
  'audio',
  'podcast',
  'book',
  'course',
  'webinar',
  'other',
]);

export const contentFormatSchema = z.enum(['text', 'html', 'markdown']);

export const contentStatusSchema = z.enum([
  'draft',
  'published',
  'archived',
  'scheduled',
  'under_review',
]);

export const visibilitySchema = z.enum([
  'public',
  'private',
  'organization',
  'invite_only',
]);

export const licenseTypeSchema = z.enum([
  'all_rights_reserved',
  'creative_commons',
  'public_domain',
  'custom',
]);

export const theologicalDisciplineSchema = z.enum([
  'systematic',
  'biblical',
  'practical',
  'historical',
  'philosophical',
  'missional',
  'pastoral',
]);

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

export const attachmentSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number().int().min(0),
});

// ============================================================================
// CONTENT ENTITY SCHEMAS - SINGLE SOURCE OF TRUTH
// ============================================================================

/**
 * Complete Content Item Entity Schema
 * This is the single source of truth for all content item data structures
 */
export const ContentItemEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  title: z.string().min(1).max(500),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(2000).optional(),
  content: z.string().min(1),

  // Content Classification
  content_type: contentTypeSchema,
  format: contentFormatSchema.default('text'),

  // Metrics
  word_count: z.number().int().min(0).optional(),
  estimated_reading_time: z.number().int().min(0).optional(), // minutes
  view_count: z.number().int().min(0).default(0),
  like_count: z.number().int().min(0).default(0),
  share_count: z.number().int().min(0).default(0),
  comment_count: z.number().int().min(0).default(0),
  bookmark_count: z.number().int().min(0).default(0),

  // Categorization
  primary_category_id: z.string().uuid().optional(),
  secondary_categories: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  theological_themes: z.array(z.string()).default([]),

  // Series Information
  series_id: z.string().uuid().optional(),
  series_order: z.number().int().min(1).optional(),

  // Visibility & Status
  visibility: visibilitySchema.default('public'),
  status: contentStatusSchema.default('draft'),

  // Network & Engagement
  network_amplification_score: z.number().min(0).max(100).default(0),
  cross_reference_count: z.number().int().min(0).default(0),

  // AI Enhancement
  ai_enhanced: z.boolean().default(false),
  ai_summary: z.string().max(1000).optional(),
  ai_key_points: z.array(z.string()).default([]),

  // Media
  featured_image_url: z.string().url().optional(),
  video_url: z.string().url().optional(),
  audio_url: z.string().url().optional(),
  attachments: z.array(attachmentSchema).default([]),

  // SEO & Metadata
  meta_title: z.string().max(255).optional(),
  meta_description: z.string().max(500).optional(),
  canonical_url: z.string().url().optional(),
  original_source: z.string().max(500).optional(),

  // Publishing
  published_at: z.string().datetime().optional(),
  scheduled_at: z.string().datetime().optional(),

  // Licensing
  license_type: licenseTypeSchema.default('all_rights_reserved'),
  attribution_required: z.boolean().default(true),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Complete Content Category Entity Schema
 * This is the single source of truth for all content category data structures
 */
export const ContentCategoryEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),

  // Hierarchy
  parent_id: z.string().uuid().optional(),
  order_index: z.number().int().min(0).default(0),

  // Theological Classification
  theological_discipline: theologicalDisciplineSchema.optional(),

  // Movement Relevance (1-10 scale)
  movement_relevance_score: z.number().int().min(1).max(10).default(5),

  // APEST Relevance Scoring
  apest_relevance: z
    .object({
      apostolic: z.number().min(1).max(10),
      prophetic: z.number().min(1).max(10),
      evangelistic: z.number().min(1).max(10),
      shepherding: z.number().min(1).max(10),
      teaching: z.number().min(1).max(10),
    })
    .default({
      apostolic: 5,
      prophetic: 5,
      evangelistic: 5,
      shepherding: 5,
      teaching: 5,
    }),

  // SEO & Discovery
  meta_description: z.string().max(500).optional(),
  keywords: z.array(z.string()).default([]),

  // Status
  is_active: z.boolean().default(true),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Complete Content Series Entity Schema
 * This is the single source of truth for all content series data structures
 */
export const ContentSeriesEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
  excerpt: z.string().max(1000).optional(),

  // Series Classification
  series_type: seriesTypeSchema,
  difficulty: difficultySchema.optional(),

  // Content Information
  total_items: z.number().int().min(0).default(0),
  estimated_duration: z.number().int().min(0).optional(), // minutes
  completion_rate: z.number().min(0).max(100).default(0),

  // Categorization
  primary_category_id: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  theological_themes: z.array(z.string()).default([]),

  // Visibility & Status
  visibility: visibilitySchema.default('public'),
  status: contentStatusSchema.default('draft'),

  // Media
  featured_image_url: z.string().url().optional(),
  thumbnail_url: z.string().url().optional(),

  // SEO & Metadata
  meta_title: z.string().max(255).optional(),
  meta_description: z.string().max(500).optional(),

  // Publishing
  published_at: z.string().datetime().optional(),
  scheduled_at: z.string().datetime().optional(),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Complete Content Cross Reference Entity Schema
 * This is the single source of truth for all content cross reference data structures
 */
export const ContentCrossReferenceEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  source_content_id: z.string().uuid(),
  target_content_id: z.string().uuid(),

  // Reference Details
  reference_type: z.enum([
    'citation',
    'quotation',
    'expansion',
    'contradiction',
    'support',
  ]),
  relevance_score: z.number().min(0).max(100).default(50),
  context: z.string().max(1000).optional(),

  // AI Generated
  ai_generated: z.boolean().default(false),
  confidence_score: z.number().min(0).max(1).optional(),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ============================================================================
// DERIVED SCHEMAS - NO DUPLICATION
// ============================================================================

/**
 * Create Content Item Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateContentItemSchema = ContentItemEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update Content Item Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateContentItemSchema = CreateContentItemSchema.partial();

/**
 * Content Item Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const ContentItemQuerySchema = ContentItemEntitySchema.partial().extend({
  // Search fields
  search: z.string().optional(),

  // Filter fields
  content_type: z.array(contentTypeSchema).optional(),
  status: z.array(contentStatusSchema).optional(),
  visibility: z.array(visibilitySchema).optional(),
  primary_category_id: z.array(z.string().uuid()).optional(),
  tags: z.array(z.string()).optional(),
  theological_themes: z.array(z.string()).optional(),
  series_id: z.array(z.string().uuid()).optional(),
  ai_enhanced: z.boolean().optional(),

  // Date range filters
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
  published_after: z.string().datetime().optional(),
  published_before: z.string().datetime().optional(),

  // Engagement filters
  view_count_min: z.number().int().min(0).optional(),
  view_count_max: z.number().int().min(0).optional(),
  like_count_min: z.number().int().min(0).optional(),
  like_count_max: z.number().int().min(0).optional(),
});

/**
 * Create Content Category Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateContentCategorySchema = ContentCategoryEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update Content Category Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateContentCategorySchema =
  CreateContentCategorySchema.partial();

/**
 * Content Category Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const ContentCategoryQuerySchema =
  ContentCategoryEntitySchema.partial().extend({
    // Search fields
    search: z.string().optional(),

    // Filter fields
    parent_id: z.array(z.string().uuid()).optional(),
    theological_discipline: z.array(theologicalDisciplineSchema).optional(),
    is_active: z.boolean().optional(),

    // Date range filters
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
  });

/**
 * Create Content Series Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateContentSeriesSchema = ContentSeriesEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update Content Series Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateContentSeriesSchema = CreateContentSeriesSchema.partial();

/**
 * Content Series Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const ContentSeriesQuerySchema =
  ContentSeriesEntitySchema.partial().extend({
    // Search fields
    search: z.string().optional(),

    // Filter fields
    series_type: z.array(seriesTypeSchema).optional(),
    difficulty: z.array(difficultySchema).optional(),
    status: z.array(contentStatusSchema).optional(),
    visibility: z.array(visibilitySchema).optional(),
    primary_category_id: z.array(z.string().uuid()).optional(),

    // Date range filters
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
    published_after: z.string().datetime().optional(),
    published_before: z.string().datetime().optional(),
  });

/**
 * Create Content Cross Reference Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateContentCrossReferenceSchema =
  ContentCrossReferenceEntitySchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
  });

/**
 * Update Content Cross Reference Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateContentCrossReferenceSchema =
  CreateContentCrossReferenceSchema.partial();

/**
 * Content Cross Reference Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const ContentCrossReferenceQuerySchema =
  ContentCrossReferenceEntitySchema.partial().extend({
    // Filter fields
    source_content_id: z.array(z.string().uuid()).optional(),
    target_content_id: z.array(z.string().uuid()).optional(),
    reference_type: z
      .array(
        z.enum([
          'citation',
          'quotation',
          'expansion',
          'contradiction',
          'support',
        ])
      )
      .optional(),
    ai_generated: z.boolean().optional(),

    // Date range filters
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
  });

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ContentItemEntity = z.infer<typeof ContentItemEntitySchema>;
export type CreateContentItem = z.infer<typeof CreateContentItemSchema>;
export type UpdateContentItem = z.infer<typeof UpdateContentItemSchema>;
export type ContentItemQuery = z.infer<typeof ContentItemQuerySchema>;

export type ContentCategoryEntity = z.infer<typeof ContentCategoryEntitySchema>;
export type CreateContentCategory = z.infer<typeof CreateContentCategorySchema>;
export type UpdateContentCategory = z.infer<typeof UpdateContentCategorySchema>;
export type ContentCategoryQuery = z.infer<typeof ContentCategoryQuerySchema>;

export type ContentSeriesEntity = z.infer<typeof ContentSeriesEntitySchema>;
export type CreateContentSeries = z.infer<typeof CreateContentSeriesSchema>;
export type UpdateContentSeries = z.infer<typeof UpdateContentSeriesSchema>;
export type ContentSeriesQuery = z.infer<typeof ContentSeriesQuerySchema>;

export type ContentCrossReferenceEntity = z.infer<
  typeof ContentCrossReferenceEntitySchema
>;
export type CreateContentCrossReference = z.infer<
  typeof CreateContentCrossReferenceSchema
>;
export type UpdateContentCrossReference = z.infer<
  typeof UpdateContentCrossReferenceSchema
>;
export type ContentCrossReferenceQuery = z.infer<
  typeof ContentCrossReferenceQuerySchema
>;

// Enum type exports
export type ContentType = z.infer<typeof contentTypeSchema>;
export type ContentFormat = z.infer<typeof contentFormatSchema>;
export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type LicenseType = z.infer<typeof licenseTypeSchema>;
export type TheologicalDiscipline = z.infer<typeof theologicalDisciplineSchema>;
export type SeriesType = z.infer<typeof seriesTypeSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
