import { contentCategoryEntitySchema, contentCategoryResponseSchema, contentItemEntitySchema, contentItemResponseSchema, contentSeriesEntitySchema, contentSeriesResponseSchema, createContentCategorySchema, createContentItemSchema, createContentSeriesSchema, updateContentCategorySchema, updateContentItemSchema, updateContentSeriesSchema, } from '@platform/contracts';
/**
 * Content Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 * - Zod schema validation for data integrity
 */
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/**
 * Helper function to format reading time
 */
function formatReadingTime(minutes) {
    if (!minutes || minutes === 0)
        return '0 min read';
    return `${minutes} min read`;
}
/**
 * Helper function to format view count
 */
function formatViewCount(count) {
    if (!count || count === 0)
        return '0 views';
    if (count < 1000)
        return `${count} views`;
    if (count < 1000000)
        return `${Math.round(count / 1000)}K views`;
    return `${Math.round(count / 1000000)}M views`;
}
/**
 * Helper function to calculate engagement score
 */
function calculateEngagementScore(viewCount, likeCount, shareCount, commentCount, bookmarkCount) {
    // Weighted algorithm: views (1x), likes (2x), shares (3x), comments (2x), bookmarks (2x)
    const totalEngagement = viewCount +
        likeCount * 2 +
        shareCount * 3 +
        commentCount * 2 +
        bookmarkCount * 2;
    // Normalize to 0-10 scale (assuming max 1000 views as baseline)
    return Math.min(10, Math.max(0, totalEngagement / 100));
}
/**
 * Helper function to calculate reading time from word count
 */
function calculateReadingTimeFromWordCount(wordCount) {
    if (!wordCount)
        return 0;
    // Average reading speed: 200 words per minute
    return Math.ceil(wordCount / 200);
}
// ============================================================================
// CONTENT ITEM MAPPERS
// ============================================================================
/**
 * Map ContentItemRow to ContentItemEntity
 */
export function toContentItemEntity(row) {
    const entity = {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt ?? undefined,
        content: row.content ?? undefined,
        authorId: row.authorId,
        coAuthors: row.coAuthors ?? [],
        contentType: row.contentType,
        format: row.format ?? 'text',
        wordCount: row.wordCount ?? undefined,
        estimatedReadingTime: row.estimatedReadingTime ?? undefined,
        viewCount: row.viewCount ?? 0,
        likeCount: row.likeCount ?? 0,
        shareCount: row.shareCount ?? 0,
        commentCount: row.commentCount ?? 0,
        bookmarkCount: row.bookmarkCount ?? 0,
        primaryCategoryId: row.primaryCategoryId ?? undefined,
        secondaryCategories: row.secondaryCategories ?? [],
        tags: row.tags ?? [],
        theologicalThemes: row.theologicalThemes ?? [],
        seriesId: row.seriesId ?? undefined,
        seriesOrder: row.seriesOrder ?? undefined,
        visibility: row.visibility ?? 'public',
        status: row.status ?? 'draft',
        networkAmplificationScore: Number(row.networkAmplificationScore) ?? 0,
        crossReferenceCount: row.crossReferenceCount ?? 0,
        aiEnhanced: row.aiEnhanced ?? false,
        aiSummary: row.aiSummary ?? undefined,
        aiKeyPoints: row.aiKeyPoints ?? [],
        featuredImageUrl: row.featuredImageUrl ?? undefined,
        videoUrl: row.videoUrl ?? undefined,
        audioUrl: row.audioUrl ?? undefined,
        attachments: row.attachments ?? [],
        metaTitle: row.metaTitle ?? undefined,
        metaDescription: row.metaDescription ?? undefined,
        canonicalUrl: row.canonicalUrl ?? undefined,
        originalSource: row.originalSource ?? undefined,
        publishedAt: row.publishedAt?.toISOString() ?? undefined,
        scheduledAt: row.scheduledAt?.toISOString() ?? undefined,
        licenseType: row.licenseType ?? 'all_rights_reserved',
        attributionRequired: row.attributionRequired ?? true,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = contentItemEntitySchema.safeParse(entity);
        if (!validation.success) {
            throw new Error(`ContentItemEntity validation failed: ${validation.error.message}`);
        }
    }
    return entity;
}
/**
 * Map ContentItemRow with relations to ContentItemResponse
 */
export function toContentItemResponseDTO(row) {
    const entity = toContentItemEntity(row);
    // Calculate computed fields
    const readingTime = row.estimatedReadingTime ??
        calculateReadingTimeFromWordCount(row.wordCount);
    const engagementScore = calculateEngagementScore(row.viewCount ?? 0, row.likeCount ?? 0, row.shareCount ?? 0, row.commentCount ?? 0, row.bookmarkCount ?? 0);
    const response = {
        ...entity,
        // Computed fields
        isPublished: row.status === 'published',
        isDraft: row.status === 'draft',
        isScheduled: row.status === 'scheduled' &&
            !!row.scheduledAt &&
            new Date(row.scheduledAt) > new Date(),
        isArchived: row.status === 'archived',
        hasFeaturedImage: !!row.featuredImageUrl,
        hasVideo: !!row.videoUrl,
        hasAudio: !!row.audioUrl,
        hasAttachments: Array.isArray(row.attachments) && row.attachments.length > 0,
        isAiEnhanced: row.aiEnhanced === true,
        readingTimeText: readingTime > 0 ? formatReadingTime(readingTime) : 'Unknown',
        viewCountText: formatViewCount(row.viewCount),
        engagementScore,
        // Related data
        author: row.author
            ? {
                id: row.author.id,
                firstName: row.author.firstName,
                lastName: row.author.lastName,
                displayName: row.author.displayName,
                avatarUrl: row.author.avatarUrl,
            }
            : {
                id: row.authorId,
                firstName: 'Unknown',
                lastName: 'Author',
            },
        primaryCategory: row.primaryCategory,
        series: row.series,
        coAuthors: row.coAuthors ?? [],
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = contentItemResponseSchema.safeParse(response);
        if (!validation.success) {
            throw new Error(`ContentItemResponse validation failed: ${validation.error.message}`);
        }
    }
    return response;
}
// ============================================================================
// CONTENT CATEGORY MAPPERS
// ============================================================================
/**
 * Map ContentCategoryRow to ContentCategoryEntity
 */
export function toContentCategoryEntity(row) {
    const entity = {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description ?? undefined,
        parentId: row.parentId ?? undefined,
        orderIndex: row.orderIndex ?? 0,
        theologicalDiscipline: row.theologicalDiscipline ?? undefined,
        movementRelevanceScore: row.movementRelevanceScore ?? 5,
        apestRelevance: row.apestRelevance ?? {
            apostolic: 5,
            prophetic: 5,
            evangelistic: 5,
            shepherding: 5,
            teaching: 5,
        },
        metaDescription: row.metaDescription ?? undefined,
        keywords: row.keywords ?? [],
        isActive: row.isActive ?? true,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = contentCategoryEntitySchema.safeParse(entity);
        if (!validation.success) {
            throw new Error(`ContentCategoryEntity validation failed: ${validation.error.message}`);
        }
    }
    return entity;
}
/**
 * Map ContentCategoryRow with relations to ContentCategoryResponse
 */
export function toContentCategoryResponseDTO(row) {
    const entity = toContentCategoryEntity(row);
    const response = {
        ...entity,
        // Computed fields
        isActive: row.isActive ?? true,
        hasParent: !!row.parentId,
        hasChildren: (row.childCount ?? 0) > 0,
        childCount: row.childCount ?? 0,
        contentCount: row.contentCount ?? 0,
        displayName: row.name,
        breadcrumb: [], // Would need to be populated separately
        // Related data
        parent: row.parent,
        children: row.children,
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = contentCategoryResponseSchema.safeParse(response);
        if (!validation.success) {
            throw new Error(`ContentCategoryResponse validation failed: ${validation.error.message}`);
        }
    }
    return response;
}
// ============================================================================
// CONTENT SERIES MAPPERS
// ============================================================================
/**
 * Map ContentSeriesRow to ContentSeriesEntity
 */
export function toContentSeriesEntity(row) {
    const entity = {
        id: row.id,
        title: row.title,
        slug: row.slug,
        description: row.description ?? undefined,
        authorId: row.authorId,
        collaborators: row.collaborators ?? [],
        seriesType: row.seriesType,
        difficulty: row.difficulty ?? 'intermediate',
        totalItems: row.totalItems ?? 0,
        estimatedDuration: row.estimatedDuration ?? undefined,
        primaryCategoryId: row.primaryCategoryId ?? undefined,
        tags: row.tags ?? [],
        visibility: row.visibility ?? 'public',
        status: row.status ?? 'draft',
        featuredImageUrl: row.featuredImageUrl ?? undefined,
        metaDescription: row.metaDescription ?? undefined,
        publishedAt: row.publishedAt?.toISOString() ?? undefined,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = contentSeriesEntitySchema.safeParse(entity);
        if (!validation.success) {
            throw new Error(`ContentSeriesEntity validation failed: ${validation.error.message}`);
        }
    }
    return entity;
}
/**
 * Map ContentSeriesRow with relations to ContentSeriesResponse
 */
export function toContentSeriesResponseDTO(row) {
    const entity = toContentSeriesEntity(row);
    const response = {
        ...entity,
        // Computed fields
        isPublished: row.status === 'published',
        isDraft: row.status === 'draft',
        hasFeaturedImage: !!row.featuredImageUrl,
        completionPercentage: (row.totalItems ?? 0) > 0
            ? Math.min(100, ((row.totalItems ?? 0) / 10) * 100)
            : 0, // Simplified calculation
        estimatedDurationText: row.estimatedDuration
            ? formatReadingTime(row.estimatedDuration)
            : undefined,
        // Related data
        author: row.author
            ? {
                id: row.author.id,
                firstName: row.author.firstName,
                lastName: row.author.lastName,
                displayName: row.author.displayName,
            }
            : {
                id: row.authorId,
                firstName: 'Unknown',
                lastName: 'Author',
            },
        category: row.category,
        episodes: row.episodes,
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = contentSeriesResponseSchema.safeParse(response);
        if (!validation.success) {
            throw new Error(`ContentSeriesResponse validation failed: ${validation.error.message}`);
        }
    }
    return response;
}
// ============================================================================
// BIDIRECTIONAL MAPPERS (DTO to Database)
// ============================================================================
/**
 * Map CreateContentItem to database insert format
 */
export function fromCreateContentItem(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = createContentItemSchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`CreateContentItem validation failed: ${validation.error.message}`);
        }
    }
    return {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? null,
        content: data.content ?? null,
        authorId: data.authorId,
        coAuthors: data.coAuthors ?? [],
        contentType: data.contentType,
        format: data.format ?? 'text',
        wordCount: data.wordCount ?? null,
        estimatedReadingTime: data.estimatedReadingTime ?? null,
        primaryCategoryId: data.primaryCategoryId ?? null,
        secondaryCategories: data.secondaryCategories ?? [],
        tags: data.tags ?? [],
        theologicalThemes: data.theologicalThemes ?? [],
        seriesId: data.seriesId ?? null,
        seriesOrder: data.seriesOrder ?? null,
        visibility: data.visibility ?? 'public',
        status: data.status ?? 'draft',
        featuredImageUrl: data.featuredImageUrl ?? null,
        videoUrl: data.videoUrl ?? null,
        audioUrl: data.audioUrl ?? null,
        attachments: data.attachments ?? [],
        metaTitle: data.metaTitle ?? null,
        metaDescription: data.metaDescription ?? null,
        canonicalUrl: data.canonicalUrl ?? null,
        originalSource: data.originalSource ?? null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        licenseType: data.licenseType ?? 'all_rights_reserved',
        attributionRequired: data.attributionRequired ?? true,
    };
}
/**
 * Map UpdateContentItem to database update format
 */
export function fromUpdateContentItem(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = updateContentItemSchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`UpdateContentItem validation failed: ${validation.error.message}`);
        }
    }
    const updateData = {
        updatedAt: new Date(),
    };
    // Only include defined fields
    if (data.title !== undefined)
        updateData.title = data.title;
    if (data.excerpt !== undefined)
        updateData.excerpt = data.excerpt ?? null;
    if (data.content !== undefined)
        updateData.content = data.content ?? null;
    if (data.contentType !== undefined)
        updateData.contentType = data.contentType;
    if (data.format !== undefined)
        updateData.format = data.format;
    if (data.wordCount !== undefined)
        updateData.wordCount = data.wordCount ?? null;
    if (data.estimatedReadingTime !== undefined)
        updateData.estimatedReadingTime = data.estimatedReadingTime ?? null;
    if (data.primaryCategoryId !== undefined)
        updateData.primaryCategoryId = data.primaryCategoryId ?? null;
    if (data.secondaryCategories !== undefined)
        updateData.secondaryCategories = data.secondaryCategories;
    if (data.tags !== undefined)
        updateData.tags = data.tags;
    if (data.theologicalThemes !== undefined)
        updateData.theologicalThemes = data.theologicalThemes;
    if (data.seriesId !== undefined)
        updateData.seriesId = data.seriesId ?? null;
    if (data.seriesOrder !== undefined)
        updateData.seriesOrder = data.seriesOrder ?? null;
    if (data.visibility !== undefined)
        updateData.visibility = data.visibility;
    if (data.status !== undefined)
        updateData.status = data.status;
    if (data.featuredImageUrl !== undefined)
        updateData.featuredImageUrl = data.featuredImageUrl ?? null;
    if (data.videoUrl !== undefined)
        updateData.videoUrl = data.videoUrl ?? null;
    if (data.audioUrl !== undefined)
        updateData.audioUrl = data.audioUrl ?? null;
    if (data.attachments !== undefined)
        updateData.attachments = data.attachments;
    if (data.metaTitle !== undefined)
        updateData.metaTitle = data.metaTitle ?? null;
    if (data.metaDescription !== undefined)
        updateData.metaDescription = data.metaDescription ?? null;
    if (data.canonicalUrl !== undefined)
        updateData.canonicalUrl = data.canonicalUrl ?? null;
    if (data.originalSource !== undefined)
        updateData.originalSource = data.originalSource ?? null;
    if (data.publishedAt !== undefined)
        updateData.publishedAt = data.publishedAt
            ? new Date(data.publishedAt)
            : null;
    if (data.scheduledAt !== undefined)
        updateData.scheduledAt = data.scheduledAt
            ? new Date(data.scheduledAt)
            : null;
    if (data.licenseType !== undefined)
        updateData.licenseType = data.licenseType;
    if (data.attributionRequired !== undefined)
        updateData.attributionRequired = data.attributionRequired;
    return updateData;
}
/**
 * Map CreateContentCategory to database insert format
 */
export function fromCreateContentCategory(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = createContentCategorySchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`CreateContentCategory validation failed: ${validation.error.message}`);
        }
    }
    return {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        parentId: data.parentId ?? null,
        orderIndex: data.orderIndex ?? 0,
        theologicalDiscipline: data.theologicalDiscipline ?? null,
        movementRelevanceScore: data.movementRelevanceScore ?? 5,
        apestRelevance: data.apestRelevance ?? {
            apostolic: 5,
            prophetic: 5,
            evangelistic: 5,
            shepherding: 5,
            teaching: 5,
        },
        metaDescription: data.metaDescription ?? null,
        keywords: data.keywords ?? [],
        isActive: data.isActive ?? true,
    };
}
/**
 * Map UpdateContentCategory to database update format
 */
export function fromUpdateContentCategory(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = updateContentCategorySchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`UpdateContentCategory validation failed: ${validation.error.message}`);
        }
    }
    const updateData = {
        updatedAt: new Date(),
    };
    // Only include defined fields
    if (data['name'] !== undefined)
        updateData['name'] = data['name'];
    if (data['description'] !== undefined)
        updateData['description'] = data['description'] ?? null;
    if (data['parentId'] !== undefined)
        updateData['parentId'] = data['parentId'] ?? null;
    if (data['orderIndex'] !== undefined)
        updateData['orderIndex'] = data['orderIndex'];
    if (data['theologicalDiscipline'] !== undefined)
        updateData['theologicalDiscipline'] = data['theologicalDiscipline'] ?? null;
    if (data['movementRelevanceScore'] !== undefined)
        updateData['movementRelevanceScore'] = data['movementRelevanceScore'];
    if (data['apestRelevance'] !== undefined)
        updateData['apestRelevance'] = data['apestRelevance'];
    if (data['metaDescription'] !== undefined)
        updateData['metaDescription'] = data['metaDescription'] ?? null;
    if (data['keywords'] !== undefined)
        updateData['keywords'] = data['keywords'];
    if (data['isActive'] !== undefined)
        updateData['isActive'] = data['isActive'];
    return updateData;
}
/**
 * Map CreateContentSeries to database insert format
 */
export function fromCreateContentSeries(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = createContentSeriesSchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`CreateContentSeries validation failed: ${validation.error.message}`);
        }
    }
    return {
        title: data.title,
        slug: data.slug,
        description: data.description ?? null,
        authorId: data.authorId,
        collaborators: data.collaborators ?? [],
        seriesType: data.seriesType,
        difficulty: data.difficulty ?? 'intermediate',
        estimatedDuration: data.estimatedDuration ?? null,
        primaryCategoryId: data.primaryCategoryId ?? null,
        tags: data.tags ?? [],
        visibility: data.visibility ?? 'public',
        status: data.status ?? 'draft',
        featuredImageUrl: data.featuredImageUrl ?? null,
        metaDescription: data.metaDescription ?? null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    };
}
/**
 * Map UpdateContentSeries to database update format
 */
export function fromUpdateContentSeries(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = updateContentSeriesSchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`UpdateContentSeries validation failed: ${validation.error.message}`);
        }
    }
    const updateData = {
        updatedAt: new Date(),
    };
    // Only include defined fields
    if (data.title !== undefined)
        updateData.title = data.title;
    if (data.description !== undefined)
        updateData.description = data.description ?? null;
    if (data.collaborators !== undefined)
        updateData.collaborators = data.collaborators;
    if (data.seriesType !== undefined)
        updateData.seriesType = data.seriesType;
    if (data.difficulty !== undefined)
        updateData.difficulty = data.difficulty;
    if (data.estimatedDuration !== undefined)
        updateData.estimatedDuration = data.estimatedDuration ?? null;
    if (data.primaryCategoryId !== undefined)
        updateData.primaryCategoryId = data.primaryCategoryId ?? null;
    if (data.tags !== undefined)
        updateData.tags = data.tags;
    if (data.visibility !== undefined)
        updateData.visibility = data.visibility;
    if (data.status !== undefined)
        updateData.status = data.status;
    if (data.featuredImageUrl !== undefined)
        updateData.featuredImageUrl = data.featuredImageUrl ?? null;
    if (data.metaDescription !== undefined)
        updateData.metaDescription = data.metaDescription ?? null;
    if (data.publishedAt !== undefined)
        updateData.publishedAt = data.publishedAt
            ? new Date(data.publishedAt)
            : null;
    return updateData;
}
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Check if content is publicly accessible
 */
export function isContentPublic(content) {
    return content.isPublished && content.visibility === 'public';
}
/**
 * Get content reading time estimate
 */
export function getReadingTimeEstimate(content) {
    return content.readingTimeText;
}
/**
 * Map array of ContentItemRow to array of ContentItemEntity
 */
export function toContentItemEntityArray(rows) {
    return rows.map(toContentItemEntity);
}
/**
 * Map array of ContentItemRow to array of ContentItemResponse
 */
export function toContentItemResponseArray(rows) {
    return rows.map(toContentItemResponseDTO);
}
/**
 * Map array of ContentCategoryRow to array of ContentCategoryEntity
 */
export function toContentCategoryEntityArray(rows) {
    return rows.map(toContentCategoryEntity);
}
/**
 * Map array of ContentCategoryRow to array of ContentCategoryResponse
 */
export function toContentCategoryResponseArray(rows) {
    return rows.map(toContentCategoryResponseDTO);
}
/**
 * Map array of ContentSeriesRow to array of ContentSeriesEntity
 */
export function toContentSeriesEntityArray(rows) {
    return rows.map(toContentSeriesEntity);
}
/**
 * Map array of ContentSeriesRow to array of ContentSeriesResponse
 */
export function toContentSeriesResponseArray(rows) {
    return rows.map(toContentSeriesResponseDTO);
}
// ============================================================================
// MAPPER OBJECTS
// ============================================================================
export const contentItemMapper = {
    toEntity: toContentItemEntity,
    toResponse: toContentItemResponseDTO,
    fromCreate: fromCreateContentItem,
    fromUpdate: fromUpdateContentItem,
    toEntityArray: toContentItemEntityArray,
    toResponseArray: toContentItemResponseArray,
    isPublic: isContentPublic,
    getReadingTime: getReadingTimeEstimate,
};
export const contentCategoryMapper = {
    toEntity: toContentCategoryEntity,
    toResponse: toContentCategoryResponseDTO,
    fromCreate: fromCreateContentCategory,
    fromUpdate: fromUpdateContentCategory,
    toEntityArray: toContentCategoryEntityArray,
    toResponseArray: toContentCategoryResponseArray,
};
export const contentSeriesMapper = {
    toEntity: toContentSeriesEntity,
    toResponse: toContentSeriesResponseDTO,
    fromCreate: fromCreateContentSeries,
    fromUpdate: fromUpdateContentSeries,
    toEntityArray: toContentSeriesEntityArray,
    toResponseArray: toContentSeriesResponseArray,
};
// Legacy exports for backward compatibility
export const toContentItemWithDetailsDTO = toContentItemResponseDTO;
export const toContentSeriesWithDetailsDTO = toContentSeriesResponseDTO;
//# sourceMappingURL=content.js.map