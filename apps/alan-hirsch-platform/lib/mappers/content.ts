import type {
  ContentCategoryEntity,
  ContentCategoryResponse,
  ContentItemEntity,
  ContentItemResponse,
  ContentSeriesEntity,
  ContentSeriesResponse,
  CreateContentCategory,
  CreateContentItem,
  CreateContentSeries,
  UpdateContentCategory,
  UpdateContentItem,
  UpdateContentSeries,
} from '@platform/contracts';
import {
  contentCategoryEntitySchema,
  contentCategoryResponseSchema,
  contentItemEntitySchema,
  contentItemResponseSchema,
  contentSeriesEntitySchema,
  contentSeriesResponseSchema,
} from '@platform/contracts';
import type {
  ContentCategory,
  ContentItem,
  ContentSeries,
} from '@platform/database';

// ============================================================================
// CONTENT ITEM MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to ContentItemEntity
 */
export function toContentItemEntity(row: ContentItem): ContentItemEntity {
  try {
    if (!row) {
      throw new Error('ContentItem is null or undefined');
    }

    const result = {
      // Core Identity
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt ?? undefined,
      content: row.content ?? undefined,

      // Author Information
      authorId: row.authorId,
      coAuthors: Array.isArray(row.coAuthors) ? row.coAuthors : [],

      // Content Classification
      contentType: row.contentType,
      format: row.format ?? 'text',

      // Content Metrics
      wordCount: row.wordCount ?? undefined,
      estimatedReadingTime: row.estimatedReadingTime ?? undefined,

      // Engagement Metrics
      viewCount: row.viewCount ?? 0,
      likeCount: row.likeCount ?? 0,
      shareCount: row.shareCount ?? 0,
      commentCount: row.commentCount ?? 0,
      bookmarkCount: row.bookmarkCount ?? 0,

      // Categorization
      primaryCategoryId: row.primaryCategoryId ?? undefined,
      secondaryCategories: Array.isArray(row.secondaryCategories)
        ? row.secondaryCategories
        : [],
      tags: Array.isArray(row.tags) ? row.tags : [],
      theologicalThemes: Array.isArray(row.theologicalThemes)
        ? row.theologicalThemes
        : [],

      // Series Information
      seriesId: row.seriesId ?? undefined,
      seriesOrder: row.seriesOrder ?? undefined,

      // Visibility & Status
      visibility: row.visibility ?? 'public',
      status: row.status ?? 'draft',

      // AI Enhancement
      networkAmplificationScore: row.networkAmplificationScore
        ? Number(row.networkAmplificationScore)
        : 0,
      crossReferenceCount: row.crossReferenceCount ?? 0,
      aiEnhanced: row.aiEnhanced === true,
      aiSummary: row.aiSummary ?? undefined,
      aiKeyPoints: Array.isArray(row.aiKeyPoints) ? row.aiKeyPoints : [],

      // Media & Attachments
      featuredImageUrl: row.featuredImageUrl ?? undefined,
      videoUrl: row.videoUrl ?? undefined,
      audioUrl: row.audioUrl ?? undefined,
      attachments: Array.isArray(row.attachments) ? row.attachments : [],

      // SEO & Metadata
      metaTitle: row.metaTitle ?? undefined,
      metaDescription: row.metaDescription ?? undefined,
      canonicalUrl: row.canonicalUrl ?? undefined,
      originalSource: row.originalSource ?? undefined,

      // Publication & Scheduling
      publishedAt: row.publishedAt?.toISOString() ?? undefined,
      scheduledAt: row.scheduledAt?.toISOString() ?? undefined,

      // Licensing
      licenseType: row.licenseType ?? 'all_rights_reserved',
      attributionRequired: row.attributionRequired !== false,

      // Timestamps
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    // Validate the result against the schema
    const validation = contentItemEntitySchema.safeParse(result);
    if (!validation.success) {
      console.error('Entity validation failed:', validation.error);
      throw new Error('Invalid entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error in toContentItemEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowTitle: row?.title,
    });
    throw new Error(
      `Failed to transform ContentItem to ContentItemEntity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to ContentItemResponse with computed fields
 */
export function toContentItemResponseDTO(
  row: ContentItem & {
    author?: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
    primaryCategory?: {
      id: string;
      name: string;
      slug: string;
    };
    series?: {
      id: string;
      title: string;
      slug: string;
      totalEpisodes: number;
    };
    coAuthors?: Array<{
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
    }>;
  }
): ContentItemResponse {
  const entity = toContentItemEntity(row);

  // Compute derived fields
  const isPublished = row.status === 'published';
  const isDraft = row.status === 'draft';
  const isScheduled =
    row.status === 'scheduled' &&
    !!row.scheduledAt &&
    new Date(row.scheduledAt) > new Date();
  const isArchived = row.status === 'archived';
  const hasFeaturedImage = !!row.featuredImageUrl;
  const hasVideo = !!row.videoUrl;
  const hasAudio = !!row.audioUrl;
  const hasAttachments =
    Array.isArray(row.attachments) && row.attachments.length > 0;
  const isAiEnhanced = row.aiEnhanced === true;

  // Format text fields
  const readingTimeText = row.estimatedReadingTime
    ? `${row.estimatedReadingTime} min read`
    : row.wordCount
      ? `${Math.ceil((row.wordCount ?? 0) / 200)} min read`
      : 'Unknown';

  const viewCountText = formatCount(row.viewCount ?? 0);

  // Calculate engagement score (0-10)
  const engagementScore = calculateEngagementScore({
    views: row.viewCount ?? 0,
    likes: row.likeCount ?? 0,
    shares: row.shareCount ?? 0,
    comments: row.commentCount ?? 0,
    bookmarks: row.bookmarkCount ?? 0,
  });

  const result = {
    ...entity,

    // Computed fields
    isPublished,
    isDraft,
    isScheduled,
    isArchived,
    hasFeaturedImage,
    hasVideo,
    hasAudio,
    hasAttachments,
    isAiEnhanced,
    readingTimeText,
    viewCountText,
    engagementScore,

    // Related data
    author: row.author,
    primaryCategory: row.primaryCategory,
    series: row.series,
    coAuthors: row.coAuthors ?? [],
  };

  // Validate the result against the schema
  const validation = contentItemResponseSchema.safeParse(result);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

// ============================================================================
// CONTENT CATEGORY MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to ContentCategoryEntity
 */
export function toContentCategoryEntity(
  row: ContentCategory
): ContentCategoryEntity {
  try {
    if (!row) {
      throw new Error('ContentCategory is null or undefined');
    }

    const result = {
      // Core Identity
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? undefined,

      // Hierarchy
      parentId: row.parentId ?? undefined,
      orderIndex: row.orderIndex ?? 0,

      // Content Classification
      theologicalDiscipline: row.theologicalDiscipline ?? undefined,
      metaDescription: row.metaDescription ?? undefined,
      movementRelevanceScore: row.movementRelevanceScore ?? 5,

      // APEST Integration
      apestRelevance: row.apestRelevance || {
        teaching: 5,
        apostolic: 5,
        prophetic: 5,
        shepherding: 5,
        evangelistic: 5,
      },

      // SEO & Discovery
      keywords: Array.isArray(row.keywords) ? row.keywords : [],
      isActive: row.isActive ?? true,

      // Timestamps
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    // Validate the result against the schema
    const validation = contentCategoryEntitySchema.safeParse(result);
    if (!validation.success) {
      console.error('Entity validation failed:', validation.error);
      throw new Error('Invalid entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error in toContentCategoryEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowName: row?.name,
    });
    throw new Error(
      `Failed to transform ContentCategory to ContentCategoryEntity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to ContentCategoryResponse with computed fields
 */
export function toContentCategoryResponseDTO(
  row: ContentCategory & {
    parent?: {
      id: string;
      name: string;
      slug: string;
    };
    children?: Array<{
      id: string;
      name: string;
      slug: string;
      contentCount: number;
    }>;
    contentCount?: number;
  }
): ContentCategoryResponse {
  const entity = toContentCategoryEntity(row);

  // Compute derived fields
  const isActive = row.isActive || true;
  const hasParent = !!row.parentId;
  const hasChildren = Array.isArray(row.children) && row.children.length > 0;
  const childCount = row.children?.length || 0;
  const contentCount = row.contentCount || 0;
  const displayName = row.name;

  // Build breadcrumb
  const breadcrumb = buildBreadcrumb(row, row.parent);

  const result = {
    ...entity,

    // Computed fields
    isActive,
    hasParent,
    hasChildren,
    childCount,
    contentCount,
    displayName,
    breadcrumb,

    // Related data
    parent: row.parent,
    children: row.children,
  };

  // Validate the result against the schema
  const validation = contentCategoryResponseSchema.safeParse(result);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

// ============================================================================
// CONTENT SERIES MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to ContentSeriesEntity
 */
export function toContentSeriesEntity(row: ContentSeries): ContentSeriesEntity {
  try {
    if (!row) {
      throw new Error('ContentSeries is null or undefined');
    }

    const result = {
      // Core Identity
      id: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description ?? undefined,

      // Series Details
      authorId: row.authorId,
      primaryCategoryId: row.primaryCategoryId ?? undefined,

      // Series Configuration
      totalItems: row.totalItems ?? 0,
      estimatedDuration: row.estimatedDuration ?? undefined,

      // Visibility & Status
      visibility: row.visibility ?? 'public',
      status: row.status ?? 'draft',

      // Media
      featuredImageUrl: row.featuredImageUrl ?? undefined,

      // SEO
      metaDescription: row.metaDescription ?? undefined,

      // Publication
      publishedAt: row.publishedAt?.toISOString() ?? undefined,

      // Timestamps
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    // Validate the result against the schema
    const validation = contentSeriesEntitySchema.safeParse(result);
    if (!validation.success) {
      console.error('Entity validation failed:', validation.error);
      throw new Error('Invalid entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error in toContentSeriesEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowTitle: row?.title,
    });
    throw new Error(
      `Failed to transform ContentSeries to ContentSeriesEntity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to ContentSeriesResponse with computed fields
 */
export function toContentSeriesResponseDTO(
  row: ContentSeries & {
    author?: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
    };
    category?: {
      id: string;
      name: string;
      slug: string;
    };
    episodes?: Array<{
      id: string;
      title: string;
      slug: string;
      order: number;
      status: string;
      publishedAt?: string;
    }>;
  }
): ContentSeriesResponse {
  const entity = toContentSeriesEntity(row);

  // Compute derived fields
  const isPublished = row.status === 'published';
  const isDraft = row.status === 'draft';
  const hasFeaturedImage = !!row.featuredImageUrl;
  const completionPercentage = 0; // TODO: Calculate based on actual completed items vs totalItems
  const estimatedDurationText = row.estimatedDuration
    ? `${row.estimatedDuration} min total`
    : undefined;

  const result = {
    ...entity,

    // Computed fields
    isPublished,
    isDraft,
    hasFeaturedImage,
    completionPercentage,
    estimatedDurationText,

    // Related data
    author: row.author,
    category: row.category,
    episodes: row.episodes,
  };

  // Validate the result against the schema
  const validation = contentSeriesResponseSchema.safeParse(result);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

// ============================================================================
// CREATE/UPDATE MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform CreateContentItem to database insert format
 */
export function fromCreateContentItem(
  data: CreateContentItem
): Partial<ContentItem> {
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
 * Transform UpdateContentItem to database update format
 */
export function fromUpdateContentItem(
  data: UpdateContentItem
): Partial<ContentItem> {
  const updateData: Partial<ContentItem> = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.excerpt !== undefined) updateData.excerpt = data.excerpt ?? null;
  if (data.content !== undefined) updateData.content = data.content ?? null;
  if (data.contentType !== undefined) updateData.contentType = data.contentType;
  if (data.format !== undefined) updateData.format = data.format;
  if (data.wordCount !== undefined)
    updateData.wordCount = data.wordCount ?? null;
  if (data.estimatedReadingTime !== undefined)
    updateData.estimatedReadingTime = data.estimatedReadingTime ?? null;
  if (data.primaryCategoryId !== undefined)
    updateData.primaryCategoryId = data.primaryCategoryId ?? null;
  if (data.secondaryCategories !== undefined)
    updateData.secondaryCategories = data.secondaryCategories;
  if (data.tags !== undefined) updateData.tags = data.tags;
  if (data.theologicalThemes !== undefined)
    updateData.theologicalThemes = data.theologicalThemes;
  if (data.seriesId !== undefined) updateData.seriesId = data.seriesId ?? null;
  if (data.seriesOrder !== undefined)
    updateData.seriesOrder = data.seriesOrder ?? null;
  if (data.visibility !== undefined) updateData.visibility = data.visibility;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.featuredImageUrl !== undefined)
    updateData.featuredImageUrl = data.featuredImageUrl ?? null;
  if (data.videoUrl !== undefined) updateData.videoUrl = data.videoUrl ?? null;
  if (data.audioUrl !== undefined) updateData.audioUrl = data.audioUrl ?? null;
  if (data.attachments !== undefined) updateData.attachments = data.attachments;
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
  if (data.licenseType !== undefined) updateData.licenseType = data.licenseType;
  if (data.attributionRequired !== undefined)
    updateData.attributionRequired = data.attributionRequired;

  // Always update the updatedAt timestamp
  updateData['updatedAt'] = new Date();

  return updateData;
}

// ============================================================================
// ARRAY MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform multiple database rows to ContentItemResponse array
 */
export function toContentItemResponseArray(
  rows: (ContentItem & {
    author?: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
    primaryCategory?: {
      id: string;
      name: string;
      slug: string;
    };
    series?: {
      id: string;
      title: string;
      slug: string;
      totalEpisodes: number;
    };
    coAuthors?: Array<{
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
    }>;
  })[]
): ContentItemResponse[] {
  return rows.map(toContentItemResponseDTO);
}

/**
 * Transform multiple database rows to ContentCategoryResponse array
 */
export function toContentCategoryResponseArray(
  rows: (ContentCategory & {
    parent?: {
      id: string;
      name: string;
      slug: string;
    };
    children?: Array<{
      id: string;
      name: string;
      slug: string;
      contentCount: number;
    }>;
    contentCount?: number;
  })[]
): ContentCategoryResponse[] {
  return rows.map(toContentCategoryResponseDTO);
}

/**
 * Transform multiple database rows to ContentSeriesResponse array
 */
export function toContentSeriesResponseArray(
  rows: (ContentSeries & {
    author?: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
    };
    category?: {
      id: string;
      name: string;
      slug: string;
    };
    episodes?: Array<{
      id: string;
      title: string;
      slug: string;
      order: number;
      status: string;
      publishedAt?: string;
    }>;
  })[]
): ContentSeriesResponse[] {
  return rows.map(toContentSeriesResponseDTO);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format count numbers for display
 */
export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Calculate engagement score (0-10)
 */
export function calculateEngagementScore(metrics: {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  bookmarks: number;
}): number {
  const { views, likes, shares, comments, bookmarks } = metrics;

  if (views === 0) return 0;

  // Weighted engagement calculation
  const engagement = likes * 1 + shares * 2 + comments * 3 + bookmarks * 2;
  const engagementRate = engagement / views;

  // Convert to 0-10 scale
  return Math.min(10, Math.round(engagementRate * 100));
}

/**
 * Build breadcrumb for category hierarchy
 */
export function buildBreadcrumb(
  category: ContentCategory,
  parent?: { id: string; name: string; slug: string }
): Array<{ id: string; name: string; slug: string }> {
  const breadcrumb = [];

  if (parent) {
    breadcrumb.push(parent);
  }

  breadcrumb.push({
    id: category.id,
    name: category.name,
    slug: category.slug,
  });

  return breadcrumb;
}

/**
 * Check if content is publicly accessible
 */
export function isContentPublic(content: ContentItemResponse): boolean {
  return content.isPublished && content.visibility === 'public';
}

/**
 * Get content display information
 */
export function getContentDisplayInfo(content: ContentItemResponse): {
  title: string;
  author: string;
  category: string;
  status: string;
  engagement: string;
} {
  return {
    title: content.title,
    author: content.author
      ? `${content.author.firstName} ${content.author.lastName}`
      : 'Unknown',
    category: content.primaryCategory?.name || 'Uncategorized',
    status: content.isPublished
      ? 'Published'
      : content.isDraft
        ? 'Draft'
        : 'Scheduled',
    engagement: `${content.viewCountText} views, ${content.engagementScore}/10 engagement`,
  };
}

/**
 * Check if content needs attribution
 */
export function requiresAttribution(content: ContentItemResponse): boolean {
  return (
    content.attributionRequired && content.licenseType !== 'all_rights_reserved'
  );
}

/**
 * Get content reading time estimate
 */
export function getReadingTimeEstimate(content: ContentItemResponse): string {
  if (content.estimatedReadingTime) {
    return `${content.estimatedReadingTime} min read`;
  }

  if (content.wordCount) {
    const minutes = Math.ceil(content.wordCount / 200);
    return `${minutes} min read`;
  }

  return 'Unknown';
}

// ============================================================================
// MISSING MAPPER FUNCTIONS FOR SERVICE IMPORTS
// ============================================================================

/**
 * Transform CreateContentCategory to database insert format
 */
export function fromCreateContentCategory(
  data: CreateContentCategory
): Partial<ContentCategory> {
  try {
    const result = {
      name: data.name,
      slug: data.slug,
      description: data.description ?? null,
      parentId: data.parentId ?? null,
      orderIndex: data.orderIndex ?? 0,
      theologicalDiscipline: data.theologicalDiscipline ?? null,
      metaDescription: data.metaDescription ?? null,
      movementRelevanceScore: data.movementRelevanceScore ?? 5,
      apestRelevance: data.apestRelevance || {
        teaching: 5,
        apostolic: 5,
        prophetic: 5,
        shepherding: 5,
        evangelistic: 5,
      },
      keywords: data.keywords ?? [],
      isActive: data.isActive ?? true,
    };

    return result;
  } catch (error) {
    console.error('Error in fromCreateContentCategory:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataName: data?.name,
    });
    throw new Error(
      `Failed to transform CreateContentCategory to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform CreateContentSeries to database insert format
 */
export function fromCreateContentSeries(
  data: CreateContentSeries
): Partial<ContentSeries> {
  try {
    const result = {
      title: data.title,
      slug: data.slug,
      description: data.description ?? null,
      authorId: data.authorId,
      primaryCategoryId: data.primaryCategoryId ?? null,
      seriesType: data.seriesType,
      difficulty: data.difficulty ?? 'intermediate',
      estimatedDuration: data.estimatedDuration ?? null,
      tags: data.tags ?? [],
      visibility: data.visibility ?? 'public',
      status: data.status ?? 'draft',
      featuredImageUrl: data.featuredImageUrl ?? null,
      metaDescription: data.metaDescription ?? null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    };

    return result;
  } catch (error) {
    console.error('Error in fromCreateContentSeries:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataTitle: data?.title,
    });
    throw new Error(
      `Failed to transform CreateContentSeries to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform UpdateContentCategory to database update format
 */
export function fromUpdateContentCategory(
  data: UpdateContentCategory
): Partial<ContentCategory> {
  try {
    const updateData: Partial<ContentCategory> = {};

    if (data.name !== undefined) updateData['name'] = data.name;
    if (data.description !== undefined)
      updateData['description'] = data.description ?? null;
    if (data.parentId !== undefined)
      updateData['parentId'] = data.parentId ?? null;
    if (data.orderIndex !== undefined)
      updateData['orderIndex'] = data.orderIndex;
    if (data.theologicalDiscipline !== undefined)
      updateData['theologicalDiscipline'] = data.theologicalDiscipline ?? null;
    if (data.metaDescription !== undefined)
      updateData['metaDescription'] = data.metaDescription ?? null;
    if (data.movementRelevanceScore !== undefined)
      updateData['movementRelevanceScore'] = data.movementRelevanceScore;
    if (data.apestRelevance !== undefined)
      updateData['apestRelevance'] = data.apestRelevance;
    if (data.keywords !== undefined) updateData['keywords'] = data.keywords;
    if (data.isActive !== undefined) updateData['isActive'] = data.isActive;

    // Always update the updatedAt timestamp
    updateData['updatedAt'] = new Date();

    return updateData;
  } catch (error) {
    console.error('Error in fromUpdateContentCategory:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataName: data?.name,
    });
    throw new Error(
      `Failed to transform UpdateContentCategory to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform UpdateContentSeries to database update format
 */
export function fromUpdateContentSeries(
  data: UpdateContentSeries
): Partial<ContentSeries> {
  try {
    const updateData: Partial<ContentSeries> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description ?? null;
    if (data.authorId !== undefined) updateData.authorId = data.authorId;
    if (data.primaryCategoryId !== undefined)
      updateData.primaryCategoryId = data.primaryCategoryId ?? null;
    if (data.seriesType !== undefined) updateData.seriesType = data.seriesType;
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
    if (data.estimatedDuration !== undefined)
      updateData.estimatedDuration = data.estimatedDuration ?? null;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.visibility !== undefined) updateData.visibility = data.visibility;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.featuredImageUrl !== undefined)
      updateData.featuredImageUrl = data.featuredImageUrl ?? null;
    if (data.metaDescription !== undefined)
      updateData.metaDescription = data.metaDescription ?? null;
    if (data.publishedAt !== undefined)
      updateData.publishedAt = data.publishedAt
        ? new Date(data.publishedAt)
        : null;

    // Always update the updatedAt timestamp
    updateData['updatedAt'] = new Date();

    return updateData;
  } catch (error) {
    console.error('Error in fromUpdateContentSeries:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      dataTitle: data?.title,
    });
    throw new Error(
      `Failed to transform UpdateContentSeries to database format: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
