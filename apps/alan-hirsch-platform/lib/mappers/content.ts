import type {
  ContentCategoryEntity,
  ContentCategoryResponse,
  ContentItemEntity,
  ContentItemResponse,
  ContentSeriesEntity,
  ContentSeriesResponse,
  CreateContentItem,
  UpdateContentItem,
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
      authorId: row.author_id,
      coAuthors: Array.isArray(row.co_authors) ? row.co_authors : [],

      // Content Classification
      contentType: row.content_type,
      format: row.format ?? 'text',

      // Content Metrics
      wordCount: row.word_count ?? undefined,
      estimatedReadingTime: row.estimated_reading_time ?? undefined,

      // Engagement Metrics
      viewCount: row.view_count ?? 0,
      likeCount: row.like_count ?? 0,
      shareCount: row.share_count ?? 0,
      commentCount: row.comment_count ?? 0,
      bookmarkCount: row.bookmark_count ?? 0,

      // Categorization
      primaryCategoryId: row.primary_category_id ?? undefined,
      secondaryCategories: Array.isArray(row.secondary_categories)
        ? row.secondary_categories
        : [],
      tags: Array.isArray(row.tags) ? row.tags : [],
      theologicalThemes: Array.isArray(row.theological_themes)
        ? row.theological_themes
        : [],

      // Series Information
      seriesId: row.series_id ?? undefined,
      seriesOrder: row.series_order ?? undefined,

      // Visibility & Status
      visibility: row.visibility ?? 'public',
      status: row.status ?? 'draft',

      // AI Enhancement
      networkAmplificationScore: row.network_amplification_score ?? 0,
      crossReferenceCount: row.cross_reference_count ?? 0,
      aiEnhanced: row.ai_enhanced ?? false,
      aiSummary: row.ai_summary ?? undefined,
      aiKeyPoints: Array.isArray(row.ai_key_points) ? row.ai_key_points : [],

      // Media & Attachments
      featuredImageUrl: row.featured_image_url ?? undefined,
      videoUrl: row.video_url ?? undefined,
      audioUrl: row.audio_url ?? undefined,
      attachments: Array.isArray(row.attachments) ? row.attachments : [],

      // SEO & Metadata
      metaTitle: row.meta_title ?? undefined,
      metaDescription: row.meta_description ?? undefined,
      canonicalUrl: row.canonical_url ?? undefined,
      originalSource: row.original_source ?? undefined,

      // Publication & Scheduling
      publishedAt: row.published_at?.toISOString() ?? undefined,
      scheduledAt: row.scheduled_at?.toISOString() ?? undefined,

      // Licensing
      licenseType: row.license_type ?? 'all_rights_reserved',
      attributionRequired: row.attribution_required ?? true,

      // Timestamps
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
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
    row.scheduled_at &&
    new Date(row.scheduled_at) > new Date();
  const isArchived = row.status === 'archived';
  const hasFeaturedImage = !!row.featured_image_url;
  const hasVideo = !!row.video_url;
  const hasAudio = !!row.audio_url;
  const hasAttachments =
    Array.isArray(row.attachments) && row.attachments.length > 0;
  const isAiEnhanced = row.ai_enhanced ?? false;

  // Format text fields
  const readingTimeText = row.estimated_reading_time
    ? `${row.estimated_reading_time} min read`
    : row.word_count
      ? `${Math.ceil((row.word_count ?? 0) / 200)} min read`
      : 'Unknown';

  const viewCountText = formatCount(row.view_count ?? 0);

  // Calculate engagement score (0-10)
  const engagementScore = calculateEngagementScore({
    views: row.view_count ?? 0,
    likes: row.like_count ?? 0,
    shares: row.share_count ?? 0,
    comments: row.comment_count ?? 0,
    bookmarks: row.bookmark_count ?? 0,
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
      parentId: row.parent_id ?? undefined,
      orderIndex: row.order_index ?? 0,

      // Content Classification
      theologicalDiscipline: row.theological_discipline ?? undefined,
      metaDescription: row.meta_description ?? undefined,
      movementRelevanceScore: row.movement_relevance_score ?? 5,

      // APEST Integration
      apestRelevance: row.apest_relevance || {
        teaching: 5,
        apostolic: 5,
        prophetic: 5,
        shepherding: 5,
        evangelistic: 5,
      },

      // SEO & Discovery
      keywords: Array.isArray(row.keywords) ? row.keywords : [],
      isActive: row.is_active ?? true,

      // Timestamps
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
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
  const isActive = row.is_active || true;
  const hasParent = !!row.parent_id;
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
      authorId: row.author_id,
      categoryId: row.category_id ?? undefined,

      // Series Configuration
      totalEpisodes: row.total_episodes ?? 0,
      publishedEpisodes: row.published_episodes ?? 0,
      estimatedDuration: row.estimated_duration ?? undefined,

      // Visibility & Status
      visibility: row.visibility ?? 'public',
      status: row.status ?? 'draft',

      // Media
      featuredImageUrl: row.featured_image_url ?? undefined,

      // SEO
      metaTitle: row.meta_title ?? undefined,
      metaDescription: row.meta_description ?? undefined,

      // Publication
      publishedAt: row.published_at?.toISOString() ?? undefined,

      // Timestamps
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
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
  const hasFeaturedImage = !!row.featured_image_url;
  const completionPercentage =
    row.total_episodes > 0
      ? Math.round(((row.published_episodes || 0) / row.total_episodes) * 100)
      : 0;
  const estimatedDurationText = row.estimated_duration
    ? `${row.estimated_duration} min total`
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
    author_id: data.authorId,
    co_authors: data.coAuthors ?? [],
    content_type: data.contentType,
    format: data.format ?? 'text',
    word_count: data.wordCount ?? null,
    estimated_reading_time: data.estimatedReadingTime ?? null,
    primary_category_id: data.primaryCategoryId ?? null,
    secondary_categories: data.secondaryCategories ?? [],
    tags: data.tags ?? [],
    theological_themes: data.theologicalThemes ?? [],
    series_id: data.seriesId ?? null,
    series_order: data.seriesOrder ?? null,
    visibility: data.visibility ?? 'public',
    status: data.status ?? 'draft',
    featured_image_url: data.featuredImageUrl ?? null,
    video_url: data.videoUrl ?? null,
    audio_url: data.audioUrl ?? null,
    attachments: data.attachments ?? [],
    meta_title: data.metaTitle ?? null,
    meta_description: data.metaDescription ?? null,
    canonical_url: data.canonicalUrl ?? null,
    original_source: data.originalSource ?? null,
    published_at: data.publishedAt ? new Date(data.publishedAt) : null,
    scheduled_at: data.scheduledAt ? new Date(data.scheduledAt) : null,
    license_type: data.licenseType ?? 'all_rights_reserved',
    attribution_required: data.attributionRequired ?? true,
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
  if (data.contentType !== undefined)
    updateData.content_type = data.contentType;
  if (data.format !== undefined) updateData.format = data.format;
  if (data.wordCount !== undefined)
    updateData.word_count = data.wordCount ?? null;
  if (data.estimatedReadingTime !== undefined)
    updateData.estimated_reading_time = data.estimatedReadingTime ?? null;
  if (data.primaryCategoryId !== undefined)
    updateData.primary_category_id = data.primaryCategoryId ?? null;
  if (data.secondaryCategories !== undefined)
    updateData.secondary_categories = data.secondaryCategories;
  if (data.tags !== undefined) updateData.tags = data.tags;
  if (data.theologicalThemes !== undefined)
    updateData.theological_themes = data.theologicalThemes;
  if (data.seriesId !== undefined) updateData.series_id = data.seriesId ?? null;
  if (data.seriesOrder !== undefined)
    updateData.series_order = data.seriesOrder ?? null;
  if (data.visibility !== undefined) updateData.visibility = data.visibility;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.featuredImageUrl !== undefined)
    updateData.featured_image_url = data.featuredImageUrl ?? null;
  if (data.videoUrl !== undefined) updateData.video_url = data.videoUrl ?? null;
  if (data.audioUrl !== undefined) updateData.audio_url = data.audioUrl ?? null;
  if (data.attachments !== undefined) updateData.attachments = data.attachments;
  if (data.metaTitle !== undefined)
    updateData.meta_title = data.metaTitle ?? null;
  if (data.metaDescription !== undefined)
    updateData.meta_description = data.metaDescription ?? null;
  if (data.canonicalUrl !== undefined)
    updateData.canonical_url = data.canonicalUrl ?? null;
  if (data.originalSource !== undefined)
    updateData.original_source = data.originalSource ?? null;
  if (data.publishedAt !== undefined)
    updateData.published_at = data.publishedAt
      ? new Date(data.publishedAt)
      : null;
  if (data.scheduledAt !== undefined)
    updateData.scheduled_at = data.scheduledAt
      ? new Date(data.scheduledAt)
      : null;
  if (data.licenseType !== undefined)
    updateData.license_type = data.licenseType;
  if (data.attributionRequired !== undefined)
    updateData.attribution_required = data.attributionRequired;

  // Always update the updated_at timestamp
  updateData.updated_at = new Date();

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
function formatCount(count: number): string {
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
function calculateEngagementScore(metrics: {
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
function buildBreadcrumb(
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
