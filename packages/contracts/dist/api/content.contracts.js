import { z } from 'zod';
import { contentCategoryEntitySchema as ContentCategoryEntitySchema, contentCrossReferenceEntitySchema as ContentCrossReferenceEntitySchema, contentItemEntitySchema as ContentItemEntitySchema, contentSeriesEntitySchema as ContentSeriesEntitySchema, } from '../entities/content.schema';
import { AddContentToSeriesOperationSchema, CreateContentCategoryOperationSchema, CreateContentCrossReferenceOperationSchema, CreateContentItemOperationSchema, CreateContentSeriesOperationSchema, GetContentAnalyticsOperationSchema, GetContentCategoryOperationSchema, GetContentCrossReferencesOperationSchema, GetContentItemOperationSchema, GetContentPerformanceOperationSchema, GetContentSeriesOperationSchema, ListContentCategoriesOperationSchema, ListContentCrossReferencesOperationSchema, ListContentItemsOperationSchema, ListContentSeriesOperationSchema, PublishContentItemOperationSchema, RemoveContentFromSeriesOperationSchema, ReorderContentCategoriesOperationSchema, ReorderSeriesContentOperationSchema, ScheduleContentItemOperationSchema, SearchContentItemsOperationSchema, UpdateContentCategoryOperationSchema, UpdateContentCrossReferenceOperationSchema, UpdateContentItemOperationSchema, UpdateContentSeriesOperationSchema, } from '../operations/content.operations';
import { PaginatedResponseSchema } from './user.contracts';
// ============================================================================
// CONTENT API CONTRACTS - DERIVED FROM OPERATIONS
// ============================================================================
// All API contracts are derived from operation schemas to ensure consistency
// and eliminate duplication across the codebase.
// ============================================================================
// CONTENT ITEM API REQUEST CONTRACTS
// ============================================================================
/**
 * Create Content Item API Request Contract
 * Derived from CreateContentItemOperationSchema
 */
export const CreateContentItemApiRequestSchema = CreateContentItemOperationSchema;
/**
 * Update Content Item API Request Contract
 * Derived from UpdateContentItemOperationSchema
 */
export const UpdateContentItemApiRequestSchema = UpdateContentItemOperationSchema;
/**
 * Publish Content Item API Request Contract
 * Derived from PublishContentItemOperationSchema
 */
export const PublishContentItemApiRequestSchema = PublishContentItemOperationSchema;
/**
 * Schedule Content Item API Request Contract
 * Derived from ScheduleContentItemOperationSchema
 */
export const ScheduleContentItemApiRequestSchema = ScheduleContentItemOperationSchema;
/**
 * Search Content Items API Request Contract
 * Derived from SearchContentItemsOperationSchema
 */
export const SearchContentItemsApiRequestSchema = SearchContentItemsOperationSchema;
// ============================================================================
// CONTENT CATEGORY API REQUEST CONTRACTS
// ============================================================================
/**
 * Create Content Category API Request Contract
 * Derived from CreateContentCategoryOperationSchema
 */
export const CreateContentCategoryApiRequestSchema = CreateContentCategoryOperationSchema;
/**
 * Update Content Category API Request Contract
 * Derived from UpdateContentCategoryOperationSchema
 */
export const UpdateContentCategoryApiRequestSchema = UpdateContentCategoryOperationSchema;
/**
 * Reorder Content Categories API Request Contract
 * Derived from ReorderContentCategoriesOperationSchema
 */
export const ReorderContentCategoriesApiRequestSchema = ReorderContentCategoriesOperationSchema;
// ============================================================================
// CONTENT SERIES API REQUEST CONTRACTS
// ============================================================================
/**
 * Create Content Series API Request Contract
 * Derived from CreateContentSeriesOperationSchema
 */
export const CreateContentSeriesApiRequestSchema = CreateContentSeriesOperationSchema;
/**
 * Update Content Series API Request Contract
 * Derived from UpdateContentSeriesOperationSchema
 */
export const UpdateContentSeriesApiRequestSchema = UpdateContentSeriesOperationSchema;
/**
 * Add Content to Series API Request Contract
 * Derived from AddContentToSeriesOperationSchema
 */
export const AddContentToSeriesApiRequestSchema = AddContentToSeriesOperationSchema;
/**
 * Remove Content from Series API Request Contract
 * Derived from RemoveContentFromSeriesOperationSchema
 */
export const RemoveContentFromSeriesApiRequestSchema = RemoveContentFromSeriesOperationSchema;
/**
 * Reorder Series Content API Request Contract
 * Derived from ReorderSeriesContentOperationSchema
 */
export const ReorderSeriesContentApiRequestSchema = ReorderSeriesContentOperationSchema;
// ============================================================================
// CONTENT CROSS REFERENCE API REQUEST CONTRACTS
// ============================================================================
/**
 * Create Content Cross Reference API Request Contract
 * Derived from CreateContentCrossReferenceOperationSchema
 */
export const CreateContentCrossReferenceApiRequestSchema = CreateContentCrossReferenceOperationSchema;
/**
 * Update Content Cross Reference API Request Contract
 * Derived from UpdateContentCrossReferenceOperationSchema
 */
export const UpdateContentCrossReferenceApiRequestSchema = UpdateContentCrossReferenceOperationSchema;
// ============================================================================
// CONTENT ITEM API RESPONSE CONTRACTS
// ============================================================================
/**
 * Content Item API Response Contract
 * Derived from ContentItemEntitySchema
 */
export const ContentItemApiResponseSchema = ContentItemEntitySchema;
/**
 * Content Item with Author API Response Contract
 * Extends content item with author information
 */
export const ContentItemWithAuthorApiResponseSchema = ContentItemEntitySchema.extend({
    author: z.object({
        id: z.string().uuid(),
        first_name: z.string(),
        last_name: z.string(),
        display_name: z.string().optional(),
        avatar_url: z.string().url().optional(),
        ministry_role: z.enum([
            'senior_pastor',
            'associate_pastor',
            'church_planter',
            'denominational_leader',
            'seminary_professor',
            'seminary_student',
            'ministry_staff',
            'missionary',
            'marketplace_minister',
            'nonprofit_leader',
            'consultant',
            'academic_researcher',
            'emerging_leader',
            'other',
        ]),
        organization_name: z.string().optional(),
    }),
});
/**
 * Content Item with Category API Response Contract
 * Extends content item with category information
 */
export const ContentItemWithCategoryApiResponseSchema = ContentItemEntitySchema.extend({
    category: z
        .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
    })
        .optional(),
});
/**
 * Content Item with Series API Response Contract
 * Extends content item with series information
 */
export const ContentItemWithSeriesApiResponseSchema = ContentItemEntitySchema.extend({
    series: z
        .object({
        id: z.string().uuid(),
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        series_type: z.enum([
            'course',
            'learning_path',
            'book_series',
            'podcast_series',
            'video_series',
            'framework',
        ]),
    })
        .optional(),
});
/**
 * Content Item with Full Details API Response Contract
 * Extends content item with all related information
 */
export const ContentItemWithFullDetailsApiResponseSchema = ContentItemEntitySchema.extend({
    author: z.object({
        id: z.string().uuid(),
        first_name: z.string(),
        last_name: z.string(),
        display_name: z.string().optional(),
        avatar_url: z.string().url().optional(),
        ministry_role: z.enum([
            'senior_pastor',
            'associate_pastor',
            'church_planter',
            'denominational_leader',
            'seminary_professor',
            'seminary_student',
            'ministry_staff',
            'missionary',
            'marketplace_minister',
            'nonprofit_leader',
            'consultant',
            'academic_researcher',
            'emerging_leader',
            'other',
        ]),
        organization_name: z.string().optional(),
    }),
    category: z
        .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
    })
        .optional(),
    series: z
        .object({
        id: z.string().uuid(),
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        series_type: z.enum([
            'course',
            'learning_path',
            'book_series',
            'podcast_series',
            'video_series',
            'framework',
        ]),
    })
        .optional(),
    cross_references: z
        .array(z.object({
        id: z.string().uuid(),
        target_content_id: z.string().uuid(),
        target_content_title: z.string(),
        reference_type: z.enum([
            'citation',
            'quotation',
            'expansion',
            'contradiction',
            'support',
        ]),
        relevance_score: z.number().min(0).max(100),
    }))
        .default([]),
});
/**
 * Content Item List API Response Contract
 * Paginated list of content items
 */
export const ContentItemListApiResponseSchema = PaginatedResponseSchema(ContentItemWithAuthorApiResponseSchema);
/**
 * Content Item Search API Response Contract
 * Search results for content items
 */
export const ContentItemSearchApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        content_items: z.array(ContentItemWithAuthorApiResponseSchema),
        total: z.number().int().min(0),
        query: z.string(),
        took: z.number().min(0), // milliseconds
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
// ============================================================================
// CONTENT CATEGORY API RESPONSE CONTRACTS
// ============================================================================
/**
 * Content Category API Response Contract
 * Derived from ContentCategoryEntitySchema
 */
export const ContentCategoryApiResponseSchema = ContentCategoryEntitySchema;
/**
 * Content Category with Parent API Response Contract
 * Extends category with parent information
 */
export const ContentCategoryWithParentApiResponseSchema = ContentCategoryEntitySchema.extend({
    parent: z
        .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
    })
        .optional(),
});
/**
 * Content Category with Children API Response Contract
 * Extends category with children information
 */
export const ContentCategoryWithChildrenApiResponseSchema = ContentCategoryEntitySchema.extend({
    children: z
        .array(z.object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        order_index: z.number().int().min(0),
    }))
        .default([]),
});
/**
 * Content Category List API Response Contract
 * Paginated list of content categories
 */
export const ContentCategoryListApiResponseSchema = PaginatedResponseSchema(ContentCategoryWithParentApiResponseSchema);
// ============================================================================
// CONTENT SERIES API RESPONSE CONTRACTS
// ============================================================================
/**
 * Content Series API Response Contract
 * Derived from ContentSeriesEntitySchema
 */
export const ContentSeriesApiResponseSchema = ContentSeriesEntitySchema;
/**
 * Content Series with Content API Response Contract
 * Extends series with content items
 */
export const ContentSeriesWithContentApiResponseSchema = ContentSeriesEntitySchema.extend({
    content_items: z
        .array(z.object({
        id: z.string().uuid(),
        title: z.string(),
        slug: z.string(),
        excerpt: z.string().optional(),
        content_type: z.enum([
            'article',
            'video',
            'audio',
            'podcast',
            'book',
            'course',
            'webinar',
            'other',
        ]),
        status: z.enum([
            'draft',
            'published',
            'archived',
            'scheduled',
            'under_review',
        ]),
        published_at: z.string().datetime().optional(),
        series_order: z.number().int().min(1),
    }))
        .default([]),
});
/**
 * Content Series List API Response Contract
 * Paginated list of content series
 */
export const ContentSeriesListApiResponseSchema = PaginatedResponseSchema(ContentSeriesApiResponseSchema);
// ============================================================================
// CONTENT CROSS REFERENCE API RESPONSE CONTRACTS
// ============================================================================
/**
 * Content Cross Reference API Response Contract
 * Derived from ContentCrossReferenceEntitySchema
 */
export const ContentCrossReferenceApiResponseSchema = ContentCrossReferenceEntitySchema;
/**
 * Content Cross Reference with Details API Response Contract
 * Extends cross reference with content details
 */
export const ContentCrossReferenceWithDetailsApiResponseSchema = ContentCrossReferenceEntitySchema.extend({
    source_content: z.object({
        id: z.string().uuid(),
        title: z.string(),
        slug: z.string(),
        content_type: z.enum([
            'article',
            'video',
            'audio',
            'podcast',
            'book',
            'course',
            'webinar',
            'other',
        ]),
    }),
    target_content: z.object({
        id: z.string().uuid(),
        title: z.string(),
        slug: z.string(),
        content_type: z.enum([
            'article',
            'video',
            'audio',
            'podcast',
            'book',
            'course',
            'webinar',
            'other',
        ]),
    }),
});
/**
 * Content Cross Reference List API Response Contract
 * Paginated list of content cross references
 */
export const ContentCrossReferenceListApiResponseSchema = PaginatedResponseSchema(ContentCrossReferenceWithDetailsApiResponseSchema);
// ============================================================================
// CONTENT ANALYTICS API RESPONSE CONTRACTS
// ============================================================================
/**
 * Content Analytics API Response Contract
 * Content performance metrics
 */
export const ContentAnalyticsApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        content_id: z.string().uuid(),
        engagement_metrics: z.object({
            total_views: z.number().int().min(0),
            unique_views: z.number().int().min(0),
            average_time_on_page: z.number().min(0), // minutes
            bounce_rate: z.number().min(0).max(100),
            like_count: z.number().int().min(0),
            share_count: z.number().int().min(0),
            comment_count: z.number().int().min(0),
            bookmark_count: z.number().int().min(0),
        }),
        traffic_metrics: z.object({
            daily_views: z.array(z.object({
                date: z.string().datetime(),
                views: z.number().int().min(0),
                unique_views: z.number().int().min(0),
            })),
            referrer_sources: z.array(z.object({
                source: z.string(),
                views: z.number().int().min(0),
                percentage: z.number().min(0).max(100),
            })),
            geographic_distribution: z.array(z.object({
                country: z.string(),
                views: z.number().int().min(0),
                percentage: z.number().min(0).max(100),
            })),
        }),
        sharing_metrics: z
            .object({
            social_shares: z.array(z.object({
                platform: z.string(),
                shares: z.number().int().min(0),
                percentage: z.number().min(0).max(100),
            })),
            email_shares: z.number().int().min(0),
            direct_shares: z.number().int().min(0),
        })
            .optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Content Performance API Response Contract
 * Content performance summary
 */
export const ContentPerformanceApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        content_id: z.string().uuid(),
        performance_score: z.number().min(0).max(100),
        engagement_score: z.number().min(0).max(100),
        reach_score: z.number().min(0).max(100),
        impact_score: z.number().min(0).max(100),
        comparisons: z
            .object({
            category_average: z.number().min(0).max(100),
            author_average: z.number().min(0).max(100),
            platform_average: z.number().min(0).max(100),
        })
            .optional(),
        trends: z.object({
            views_trend: z.enum(['increasing', 'decreasing', 'stable']),
            engagement_trend: z.enum(['increasing', 'decreasing', 'stable']),
            sharing_trend: z.enum(['increasing', 'decreasing', 'stable']),
        }),
        audience_insights: z
            .object({
            top_demographics: z.array(z.object({
                demographic: z.string(),
                percentage: z.number().min(0).max(100),
            })),
            peak_viewing_times: z.array(z.string()),
            device_breakdown: z.object({
                desktop: z.number().min(0).max(100),
                mobile: z.number().min(0).max(100),
                tablet: z.number().min(0).max(100),
            }),
        })
            .optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
// ============================================================================
// CONTENT API QUERY CONTRACTS
// ============================================================================
/**
 * Get Content Item API Query Contract
 * Derived from GetContentItemOperationSchema
 */
export const GetContentItemApiQuerySchema = GetContentItemOperationSchema;
/**
 * List Content Items API Query Contract
 * Derived from ListContentItemsOperationSchema
 */
export const ListContentItemsApiQuerySchema = ListContentItemsOperationSchema;
/**
 * Get Content Category API Query Contract
 * Derived from GetContentCategoryOperationSchema
 */
export const GetContentCategoryApiQuerySchema = GetContentCategoryOperationSchema;
/**
 * List Content Categories API Query Contract
 * Derived from ListContentCategoriesOperationSchema
 */
export const ListContentCategoriesApiQuerySchema = ListContentCategoriesOperationSchema;
/**
 * Get Content Series API Query Contract
 * Derived from GetContentSeriesOperationSchema
 */
export const GetContentSeriesApiQuerySchema = GetContentSeriesOperationSchema;
/**
 * List Content Series API Query Contract
 * Derived from ListContentSeriesOperationSchema
 */
export const ListContentSeriesApiQuerySchema = ListContentSeriesOperationSchema;
/**
 * Get Content Cross References API Query Contract
 * Derived from GetContentCrossReferencesOperationSchema
 */
export const GetContentCrossReferencesApiQuerySchema = GetContentCrossReferencesOperationSchema;
/**
 * List Content Cross References API Query Contract
 * Derived from ListContentCrossReferencesOperationSchema
 */
export const ListContentCrossReferencesApiQuerySchema = ListContentCrossReferencesOperationSchema;
/**
 * Get Content Analytics API Query Contract
 * Derived from GetContentAnalyticsOperationSchema
 */
export const GetContentAnalyticsApiQuerySchema = GetContentAnalyticsOperationSchema;
/**
 * Get Content Performance API Query Contract
 * Derived from GetContentPerformanceOperationSchema
 */
export const GetContentPerformanceApiQuerySchema = GetContentPerformanceOperationSchema;
//# sourceMappingURL=content.contracts.js.map