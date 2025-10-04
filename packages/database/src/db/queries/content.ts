// Content Query Module
// Pure functions for content operations with context-aware access control

import type {
  NewContentCategory,
  NewContentItem,
  NewContentSeries,
} from '@/lib/contracts';
import { and, asc, count, desc, eq, isNull, like, or, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  contentCategories,
  contentItems,
  contentSeries,
  userProfiles,
} from '../schema';
import { hasResults } from '../type-guards';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface QueryContext {
  organizationId?: string;
  userId?: string;
  role?: string;
}

// ============================================================================
// CONTENT ITEM QUERIES
// ============================================================================

/**
 * Get content item by ID with context-aware access control
 */
export async function getContentItemById(
  contentId: string,
  context: QueryContext
): Promise<typeof contentItems.$inferSelect | null> {
  const conditions = [eq(contentItems.id, contentId)];

  // Add context-based filtering for draft content
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      or(
        eq(contentItems.status, 'published'),
        and(
          eq(contentItems.status, 'draft'),
          eq(contentItems.authorId, context.userId)
        )
      )
    );
  } else {
    conditions.push(eq(contentItems.status, 'published'));
  }

  const result = await db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get content item by slug with context-aware access control
 */
export async function getContentItemBySlug(
  slug: string,
  context: QueryContext
): Promise<typeof contentItems.$inferSelect | null> {
  const conditions = [eq(contentItems.slug, slug)];

  // Add context-based filtering for draft content
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      or(
        eq(contentItems.status, 'published'),
        and(
          eq(contentItems.status, 'draft'),
          eq(contentItems.authorId, context.userId)
        )
      )
    );
  } else {
    conditions.push(eq(contentItems.status, 'published'));
  }

  const result = await db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get content items with author and category details
 */
export async function getContentItemsWithDetails(
  context: QueryContext,
  options: {
    authorId?: string;
    categoryId?: string;
    seriesId?: string;
    status?: 'draft' | 'published' | 'scheduled' | 'archived';
    visibility?: 'public' | 'private' | 'organization';
    contentType?: string;
    limit?: number;
    offset?: number;
    orderBy?: 'created_at' | 'published_at' | 'view_count' | 'like_count';
    orderDirection?: 'asc' | 'desc';
  } = {}
): Promise<
  Array<{
    content: typeof contentItems.$inferSelect;
    author: typeof userProfiles.$inferSelect | null;
    category: typeof contentCategories.$inferSelect | null;
  }>
> {
  const {
    authorId,
    categoryId,
    seriesId,
    status = 'published',
    visibility = 'public',
    contentType,
    limit = 20,
    offset = 0,
    orderBy = 'published_at',
    orderDirection = 'desc',
  } = options;

  const conditions = [];

  if (authorId) {
    conditions.push(eq(contentItems.authorId, authorId));
  }
  if (categoryId) {
    conditions.push(eq(contentItems.primaryCategoryId, categoryId));
  }
  if (seriesId) {
    conditions.push(eq(contentItems.seriesId, seriesId));
  }
  if (status) {
    conditions.push(eq(contentItems.status, status));
  }
  if (visibility) {
    conditions.push(eq(contentItems.visibility, visibility));
  }
  if (contentType) {
    conditions.push(eq(contentItems.contentType, contentType));
  }

  // Add context-based filtering for draft content
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      or(
        eq(contentItems.status, 'published'),
        and(
          eq(contentItems.status, 'draft'),
          eq(contentItems.authorId, context.userId)
        )
      )
    );
  }

  const orderByField = {
    created_at: contentItems.createdAt,
    published_at: contentItems.publishedAt,
    view_count: contentItems.viewCount,
    like_count: contentItems.likeCount,
  }[orderBy];

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  const results = await db
    .select({
      content: contentItems,
      author: userProfiles,
      category: contentCategories,
    })
    .from(contentItems)
    .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
    .leftJoin(
      contentCategories,
      eq(contentItems.primaryCategoryId, contentCategories.id)
    )
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(orderDirectionFn(orderByField))
    .limit(limit)
    .offset(offset);

  return results;
}

/**
 * Search content items with full-text search
 */
export async function searchContentItems(
  searchTerm: string,
  context: QueryContext,
  options: {
    categoryId?: string;
    authorId?: string;
    contentType?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<{
    content: typeof contentItems.$inferSelect;
    author: typeof userProfiles.$inferSelect | null;
    category: typeof contentCategories.$inferSelect | null;
  }>
> {
  const { categoryId, authorId, contentType, limit = 20, offset = 0 } = options;

  const conditions = [
    or(
      like(contentItems.title, `%${searchTerm}%`),
      like(contentItems.excerpt, `%${searchTerm}%`),
      like(contentItems.content, `%${searchTerm}%`),
      like(contentItems.aiSummary, `%${searchTerm}%`)
    ),
    eq(contentItems.status, 'published'),
    eq(contentItems.visibility, 'public'),
  ];

  if (categoryId) {
    conditions.push(eq(contentItems.primaryCategoryId, categoryId));
  }
  if (authorId) {
    conditions.push(eq(contentItems.authorId, authorId));
  }
  if (contentType) {
    conditions.push(eq(contentItems.contentType, contentType));
  }

  const results = await db
    .select({
      content: contentItems,
      author: userProfiles,
      category: contentCategories,
    })
    .from(contentItems)
    .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
    .leftJoin(
      contentCategories,
      eq(contentItems.primaryCategoryId, contentCategories.id)
    )
    .where(and(...conditions))
    .orderBy(desc(contentItems.publishedAt))
    .limit(limit)
    .offset(offset);

  return results;
}

/**
 * Get content items by author
 */
export async function getContentItemsByAuthor(
  authorId: string,
  context: QueryContext,
  options: {
    status?: 'draft' | 'published' | 'scheduled' | 'archived';
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof contentItems.$inferSelect)[]> {
  const { status, limit = 20, offset = 0 } = options;

  const conditions = [eq(contentItems.authorId, authorId)];

  if (status) {
    conditions.push(eq(contentItems.status, status));
  }

  // Add context-based filtering for draft content
  if (context.userId !== authorId && context.role !== 'admin') {
    conditions.push(eq(contentItems.status, 'published'));
  }

  return db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(desc(contentItems.createdAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Get content items by category
 */
export async function getContentItemsByCategory(
  categoryId: string,
  context: QueryContext,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof contentItems.$inferSelect)[]> {
  const { limit = 20, offset = 0 } = options;

  const conditions = [
    eq(contentItems.primaryCategoryId, categoryId),
    eq(contentItems.status, 'published'),
    eq(contentItems.visibility, 'public'),
  ];

  return db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(desc(contentItems.publishedAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Get content items by series
 */
export async function getContentItemsBySeries(
  seriesId: string,
  context: QueryContext,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof contentItems.$inferSelect)[]> {
  const { limit = 20, offset = 0 } = options;

  const conditions = [
    eq(contentItems.seriesId, seriesId),
    eq(contentItems.status, 'published'),
    eq(contentItems.visibility, 'public'),
  ];

  return db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(asc(contentItems.seriesOrder))
    .limit(limit)
    .offset(offset);
}

/**
 * Get trending content items
 */
export async function getTrendingContentItems(
  context: QueryContext,
  options: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
    limit?: number;
  } = {}
): Promise<(typeof contentItems.$inferSelect)[]> {
  const { timeframe = 'week', limit = 10 } = options;

  const timeCondition = {
    day: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${contentItems.publishedAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const conditions = [
    eq(contentItems.status, 'published'),
    eq(contentItems.visibility, 'public'),
    timeCondition,
  ];

  return db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(
      desc(
        sql`(${contentItems.viewCount} + ${contentItems.likeCount} + ${contentItems.shareCount})`
      )
    )
    .limit(limit);
}

/**
 * Get content statistics for author
 */
export async function getContentStats(
  authorId: string,
  context: QueryContext
): Promise<{
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  scheduledContent: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  averageReadingTime: number;
} | null> {
  const stats = await db
    .select({
      totalContent: count(contentItems.id),
      publishedContent: count(
        sql`CASE WHEN ${contentItems.status} = 'published' THEN 1 END`
      ),
      draftContent: count(
        sql`CASE WHEN ${contentItems.status} = 'draft' THEN 1 END`
      ),
      scheduledContent: count(
        sql`CASE WHEN ${contentItems.status} = 'scheduled' THEN 1 END`
      ),
      totalViews: sql<number>`COALESCE(SUM(${contentItems.viewCount}), 0)`,
      totalLikes: sql<number>`COALESCE(SUM(${contentItems.likeCount}), 0)`,
      totalShares: sql<number>`COALESCE(SUM(${contentItems.shareCount}), 0)`,
      totalComments: sql<number>`COALESCE(SUM(${contentItems.commentCount}), 0)`,
      averageReadingTime: sql<number>`COALESCE(AVG(${contentItems.estimatedReadingTime}), 0)`,
    })
    .from(contentItems)
    .where(eq(contentItems.authorId, authorId));

  return (
    stats[0] || {
      totalContent: 0,
      publishedContent: 0,
      draftContent: 0,
      scheduledContent: 0,
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      totalComments: 0,
      averageReadingTime: 0,
    }
  );
}

/**
 * Create content item
 */
export async function createContentItem(
  contentData: NewContentItem,
  context: QueryContext
): Promise<typeof contentItems.$inferSelect> {
  const result = await db
    .insert(contentItems)
    .values({
      ...contentData,
      authorId: context.userId!,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create content item');
  }

  return result[0];
}

/**
 * Update content item with context-aware validation
 */
export async function updateContentItem(
  contentId: string,
  updates: Partial<NewContentItem>,
  context: QueryContext
): Promise<typeof contentItems.$inferSelect | null> {
  // Verify user has access to update this content
  const existingContent = await getContentItemById(contentId, context);
  if (!existingContent) {
    throw new Error('Content not found or access denied');
  }

  if (existingContent.authorId !== context.userId && context.role !== 'admin') {
    throw new Error('Insufficient permissions to update content');
  }

  const result = await db
    .update(contentItems)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(contentItems.id, contentId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete content item with context-aware validation
 */
export async function deleteContentItem(
  contentId: string,
  context: QueryContext
): Promise<boolean> {
  // Verify user has access to delete this content
  const existingContent = await getContentItemById(contentId, context);
  if (!existingContent) {
    throw new Error('Content not found or access denied');
  }

  if (existingContent.authorId !== context.userId && context.role !== 'admin') {
    throw new Error('Insufficient permissions to delete content');
  }

  const result = await db
    .delete(contentItems)
    .where(eq(contentItems.id, contentId));

  return result.length > 0;
}

// ============================================================================
// CONTENT CATEGORY QUERIES
// ============================================================================

/**
 * Get content category by ID
 */
export async function getContentCategoryById(
  categoryId: string,
  context: QueryContext
): Promise<typeof contentCategories.$inferSelect | null> {
  const result = await db
    .select()
    .from(contentCategories)
    .where(
      and(
        eq(contentCategories.id, categoryId),
        eq(contentCategories.isActive, true)
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get content category by slug
 */
export async function getContentCategoryBySlug(
  slug: string,
  context: QueryContext
): Promise<typeof contentCategories.$inferSelect | null> {
  const result = await db
    .select()
    .from(contentCategories)
    .where(
      and(
        eq(contentCategories.slug, slug),
        eq(contentCategories.isActive, true)
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get all active content categories
 */
export async function getContentCategories(
  context: QueryContext,
  options: {
    parentId?: string;
    theologicalDiscipline?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof contentCategories.$inferSelect)[]> {
  const { parentId, theologicalDiscipline, limit = 50, offset = 0 } = options;

  const conditions = [eq(contentCategories.isActive, true)];

  if (parentId) {
    conditions.push(eq(contentCategories.parentId, parentId));
  } else {
    conditions.push(isNull(contentCategories.parentId));
  }

  if (theologicalDiscipline) {
    conditions.push(
      eq(contentCategories.theologicalDiscipline, theologicalDiscipline)
    );
  }

  return db
    .select()
    .from(contentCategories)
    .where(and(...conditions))
    .orderBy(asc(contentCategories.orderIndex))
    .limit(limit)
    .offset(offset);
}

/**
 * Get content categories with content counts
 */
export async function getContentCategoriesWithCounts(
  context: QueryContext
): Promise<
  Array<typeof contentCategories.$inferSelect & { contentCount: number }>
> {
  const results = await db
    .select({
      ...contentCategories,
      contentCount: count(contentItems.id),
    })
    .from(contentCategories)
    .leftJoin(
      contentItems,
      and(
        eq(contentCategories.id, contentItems.primaryCategoryId),
        eq(contentItems.status, 'published')
      )
    )
    .where(eq(contentCategories.isActive, true))
    .groupBy(contentCategories.id)
    .orderBy(asc(contentCategories.orderIndex));

  return results;
}

/**
 * Create content category
 */
export async function createContentCategory(
  categoryData: NewContentCategory,
  context: QueryContext
): Promise<typeof contentCategories.$inferSelect> {
  const result = await db
    .insert(contentCategories)
    .values({
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create content category');
  }

  return result[0];
}

/**
 * Update content category
 */
export async function updateContentCategory(
  categoryId: string,
  updates: Partial<NewContentCategory>,
  context: QueryContext
): Promise<typeof contentCategories.$inferSelect | null> {
  const result = await db
    .update(contentCategories)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(contentCategories.id, categoryId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete content category
 */
export async function deleteContentCategory(
  categoryId: string,
  context: QueryContext
): Promise<boolean> {
  const result = await db
    .delete(contentCategories)
    .where(eq(contentCategories.id, categoryId));

  return result.length > 0;
}

// ============================================================================
// CONTENT SERIES QUERIES
// ============================================================================

/**
 * Get content series by ID
 */
export async function getContentSeriesById(
  seriesId: string,
  context: QueryContext
): Promise<typeof contentSeries.$inferSelect | null> {
  const result = await db
    .select()
    .from(contentSeries)
    .where(eq(contentSeries.id, seriesId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get content series by slug
 */
export async function getContentSeriesBySlug(
  slug: string,
  context: QueryContext
): Promise<typeof contentSeries.$inferSelect | null> {
  const result = await db
    .select()
    .from(contentSeries)
    .where(eq(contentSeries.slug, slug))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get content series by author
 */
export async function getContentSeriesByAuthor(
  authorId: string,
  context: QueryContext,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof contentSeries.$inferSelect)[]> {
  const { limit = 20, offset = 0 } = options;

  return db
    .select()
    .from(contentSeries)
    .where(eq(contentSeries.authorId, authorId))
    .orderBy(desc(contentSeries.createdAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Create content series
 */
export async function createContentSeries(
  seriesData: NewContentSeries,
  context: QueryContext
): Promise<typeof contentSeries.$inferSelect> {
  const result = await db
    .insert(contentSeries)
    .values({
      ...seriesData,
      authorId: context.userId!,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create content series');
  }

  return result[0];
}

/**
 * Update content series
 */
export async function updateContentSeries(
  seriesId: string,
  updates: Partial<NewContentSeries>,
  context: QueryContext
): Promise<typeof contentSeries.$inferSelect | null> {
  const result = await db
    .update(contentSeries)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(contentSeries.id, seriesId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete content series
 */
export async function deleteContentSeries(
  seriesId: string,
  context: QueryContext
): Promise<boolean> {
  const result = await db
    .delete(contentSeries)
    .where(eq(contentSeries.id, seriesId));

  return result.length > 0;
}
