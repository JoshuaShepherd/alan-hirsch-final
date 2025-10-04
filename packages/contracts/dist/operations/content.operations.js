import { z } from 'zod';
import { ContentCategoryQuerySchema, ContentCrossReferenceQuerySchema, ContentItemQuerySchema, ContentSeriesQuerySchema, CreateContentCategorySchema, CreateContentCrossReferenceSchema, CreateContentItemSchema, CreateContentSeriesSchema, UpdateContentCategorySchema, UpdateContentCrossReferenceSchema, UpdateContentItemSchema, UpdateContentSeriesSchema, } from '../entities/content.schema';
// ============================================================================
// CONTENT OPERATIONS - DERIVED FROM ENTITY SCHEMAS
// ============================================================================
// All operations are derived from the Content entity schemas to ensure
// consistency and eliminate duplication across the codebase.
// ============================================================================
// CONTENT ITEM OPERATIONS
// ============================================================================
/**
 * Create Content Item Operation Schema
 * Derived from CreateContentItemSchema with operation-specific validation
 */
export const CreateContentItemOperationSchema = CreateContentItemSchema.extend({
    // Additional validation for create operations
    title: z
        .string()
        .min(1)
        .max(500)
        .refine(title => !title.includes('  '), // No double spaces
    { message: 'Content title cannot contain double spaces' }),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .refine(slug => !slug.startsWith('-') && !slug.endsWith('-'), {
        message: 'Slug cannot start or end with hyphens',
    })
        .optional(),
    content: z
        .string()
        .min(1)
        .refine(content => content.trim().length > 0, {
        message: 'Content cannot be empty or only whitespace',
    }),
});
/**
 * Update Content Item Operation Schema
 * Derived from UpdateContentItemSchema with operation-specific validation
 */
export const UpdateContentItemOperationSchema = UpdateContentItemSchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Publish Content Item Operation Schema
 * Publish content with validation
 */
export const PublishContentItemOperationSchema = z.object({
    content_id: z.string().uuid(),
    published_at: z.string().datetime().optional(),
    meta_title: z.string().max(255).optional(),
    meta_description: z.string().max(500).optional(),
    canonical_url: z.string().url().optional(),
});
/**
 * Schedule Content Item Operation Schema
 * Schedule content for future publication
 */
export const ScheduleContentItemOperationSchema = z.object({
    content_id: z.string().uuid(),
    scheduled_at: z.string().datetime(),
    published_at: z.string().datetime().optional(),
});
/**
 * Get Content Item Operation Schema
 * Content item retrieval with options
 */
export const GetContentItemOperationSchema = z
    .object({
    id: z.string().uuid().optional(),
    slug: z.string().optional(),
    include_author: z.boolean().default(true),
    include_category: z.boolean().default(true),
    include_series: z.boolean().default(false),
    include_cross_references: z.boolean().default(false),
    include_analytics: z.boolean().default(false),
})
    .refine(data => data.id !== undefined || data.slug !== undefined, {
    message: 'Either id or slug must be provided',
});
/**
 * List Content Items Operation Schema
 * Paginated content item listing with filters
 */
export const ListContentItemsOperationSchema = ContentItemQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum([
        'created_at',
        'updated_at',
        'published_at',
        'title',
        'view_count',
        'like_count',
    ])
        .default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
    // Include options
    include_author: z.boolean().default(true),
    include_category: z.boolean().default(true),
    include_series: z.boolean().default(false),
});
/**
 * Search Content Items Operation Schema
 * Full-text search for content items
 */
export const SearchContentItemsOperationSchema = z.object({
    // Search query
    query: z.string().min(1).max(255),
    // Filters
    content_type: z
        .array(z.enum([
        'article',
        'video',
        'audio',
        'podcast',
        'book',
        'course',
        'webinar',
        'other',
    ]))
        .optional(),
    status: z
        .array(z.enum(['draft', 'published', 'archived', 'scheduled', 'under_review']))
        .optional(),
    visibility: z
        .array(z.enum(['public', 'private', 'organization', 'invite_only']))
        .optional(),
    primary_category_id: z.array(z.string().uuid()).optional(),
    tags: z.array(z.string()).optional(),
    theological_themes: z.array(z.string()).optional(),
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(50).default(20),
    // Sorting
    sort_by: z
        .enum([
        'relevance',
        'created_at',
        'published_at',
        'view_count',
        'like_count',
    ])
        .default('relevance'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
});
// ============================================================================
// CONTENT CATEGORY OPERATIONS
// ============================================================================
/**
 * Create Content Category Operation Schema
 * Derived from CreateContentCategorySchema with operation-specific validation
 */
export const CreateContentCategoryOperationSchema = CreateContentCategorySchema.extend({
    // Additional validation for create operations
    name: z
        .string()
        .min(1)
        .max(255)
        .refine(name => !name.includes('  '), // No double spaces
    { message: 'Category name cannot contain double spaces' }),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .refine(slug => !slug.startsWith('-') && !slug.endsWith('-'), {
        message: 'Slug cannot start or end with hyphens',
    }),
});
/**
 * Update Content Category Operation Schema
 * Derived from UpdateContentCategorySchema with operation-specific validation
 */
export const UpdateContentCategoryOperationSchema = UpdateContentCategorySchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Reorder Content Categories Operation Schema
 * Bulk reordering of categories
 */
export const ReorderContentCategoriesOperationSchema = z.object({
    category_orders: z
        .array(z.object({
        category_id: z.string().uuid(),
        order_index: z.number().int().min(0),
    }))
        .min(1),
});
/**
 * Get Content Category Operation Schema
 * Category retrieval with options
 */
export const GetContentCategoryOperationSchema = z
    .object({
    id: z.string().uuid().optional(),
    slug: z.string().optional(),
    include_parent: z.boolean().default(true),
    include_children: z.boolean().default(false),
    include_content_count: z.boolean().default(false),
})
    .refine(data => data.id !== undefined || data.slug !== undefined, {
    message: 'Either id or slug must be provided',
});
/**
 * List Content Categories Operation Schema
 * Paginated category listing with filters
 */
export const ListContentCategoriesOperationSchema = ContentCategoryQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum(['created_at', 'updated_at', 'name', 'order_index'])
        .default('order_index'),
    sort_order: z.enum(['asc', 'desc']).default('asc'),
    // Include options
    include_parent: z.boolean().default(true),
    include_children: z.boolean().default(false),
    include_content_count: z.boolean().default(false),
});
// ============================================================================
// CONTENT SERIES OPERATIONS
// ============================================================================
/**
 * Create Content Series Operation Schema
 * Derived from CreateContentSeriesSchema with operation-specific validation
 */
export const CreateContentSeriesOperationSchema = CreateContentSeriesSchema.extend({
    // Additional validation for create operations
    title: z
        .string()
        .min(1)
        .max(255)
        .refine(title => !title.includes('  '), // No double spaces
    { message: 'Series title cannot contain double spaces' }),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .refine(slug => !slug.startsWith('-') && !slug.endsWith('-'), {
        message: 'Slug cannot start or end with hyphens',
    }),
});
/**
 * Update Content Series Operation Schema
 * Derived from UpdateContentSeriesSchema with operation-specific validation
 */
export const UpdateContentSeriesOperationSchema = UpdateContentSeriesSchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Add Content to Series Operation Schema
 * Add content item to series
 */
export const AddContentToSeriesOperationSchema = z.object({
    series_id: z.string().uuid(),
    content_id: z.string().uuid(),
    order_index: z.number().int().min(1).optional(),
});
/**
 * Remove Content from Series Operation Schema
 * Remove content item from series
 */
export const RemoveContentFromSeriesOperationSchema = z.object({
    series_id: z.string().uuid(),
    content_id: z.string().uuid(),
});
/**
 * Reorder Series Content Operation Schema
 * Reorder content items within series
 */
export const ReorderSeriesContentOperationSchema = z.object({
    series_id: z.string().uuid(),
    content_orders: z
        .array(z.object({
        content_id: z.string().uuid(),
        order_index: z.number().int().min(1),
    }))
        .min(1),
});
/**
 * Get Content Series Operation Schema
 * Series retrieval with options
 */
export const GetContentSeriesOperationSchema = z
    .object({
    id: z.string().uuid().optional(),
    slug: z.string().optional(),
    include_content: z.boolean().default(true),
    include_category: z.boolean().default(true),
    include_analytics: z.boolean().default(false),
})
    .refine(data => data.id !== undefined || data.slug !== undefined, {
    message: 'Either id or slug must be provided',
});
/**
 * List Content Series Operation Schema
 * Paginated series listing with filters
 */
export const ListContentSeriesOperationSchema = ContentSeriesQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum([
        'created_at',
        'updated_at',
        'published_at',
        'title',
        'total_items',
    ])
        .default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
    // Include options
    include_content: z.boolean().default(false),
    include_category: z.boolean().default(true),
});
// ============================================================================
// CONTENT CROSS REFERENCE OPERATIONS
// ============================================================================
/**
 * Create Content Cross Reference Operation Schema
 * Derived from CreateContentCrossReferenceSchema with operation-specific validation
 */
export const CreateContentCrossReferenceOperationSchema = CreateContentCrossReferenceSchema.extend({
    // Additional validation for create operations
    source_content_id: z.string().uuid(),
    target_content_id: z.string().uuid(),
    reference_type: z.enum([
        'citation',
        'quotation',
        'expansion',
        'contradiction',
        'support',
    ]),
}).refine(data => data.source_content_id !== data.target_content_id, {
    message: 'Source and target content cannot be the same',
});
/**
 * Update Content Cross Reference Operation Schema
 * Derived from UpdateContentCrossReferenceSchema with operation-specific validation
 */
export const UpdateContentCrossReferenceOperationSchema = UpdateContentCrossReferenceSchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Get Content Cross References Operation Schema
 * Retrieve cross references for content
 */
export const GetContentCrossReferencesOperationSchema = z.object({
    content_id: z.string().uuid(),
    reference_type: z
        .array(z.enum(['citation', 'quotation', 'expansion', 'contradiction', 'support']))
        .optional(),
    include_target_content: z.boolean().default(true),
    include_source_content: z.boolean().default(false),
});
/**
 * List Content Cross References Operation Schema
 * Paginated cross reference listing
 */
export const ListContentCrossReferencesOperationSchema = ContentCrossReferenceQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum(['created_at', 'relevance_score', 'reference_type'])
        .default('relevance_score'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
    // Include options
    include_target_content: z.boolean().default(true),
    include_source_content: z.boolean().default(false),
});
// ============================================================================
// CONTENT ANALYTICS OPERATIONS
// ============================================================================
/**
 * Get Content Analytics Operation Schema
 * Retrieve content performance metrics
 */
export const GetContentAnalyticsOperationSchema = z.object({
    content_id: z.string().uuid(),
    date_range: z
        .object({
        start_date: z.string().datetime(),
        end_date: z.string().datetime(),
    })
        .optional(),
    include_engagement: z.boolean().default(true),
    include_traffic: z.boolean().default(true),
    include_sharing: z.boolean().default(false),
});
/**
 * Get Content Performance Operation Schema
 * Retrieve content performance summary
 */
export const GetContentPerformanceOperationSchema = z.object({
    content_id: z.string().uuid(),
    include_comparisons: z.boolean().default(false),
    include_trends: z.boolean().default(false),
    include_audience: z.boolean().default(false),
});
//# sourceMappingURL=content.operations.js.map