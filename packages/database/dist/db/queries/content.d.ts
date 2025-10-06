import { contentCategories, contentItems, contentSeries, userProfiles } from '../schema';
import type { NewContentCategory, NewContentItem, NewContentSeries } from '../schema/content';
export interface QueryContext {
    organizationId?: string;
    userId?: string;
    role?: string;
}
/**
 * Get content item by ID with context-aware access control
 */
export declare function getContentItemById(contentId: string, context: QueryContext): Promise<typeof contentItems.$inferSelect | null>;
/**
 * Get content item by slug with context-aware access control
 */
export declare function getContentItemBySlug(slug: string, context: QueryContext): Promise<typeof contentItems.$inferSelect | null>;
/**
 * Get content items with author and category details
 */
export declare function getContentItemsWithDetails(context: QueryContext, options?: {
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
}): Promise<Array<{
    content: typeof contentItems.$inferSelect;
    author: typeof userProfiles.$inferSelect | null;
    category: typeof contentCategories.$inferSelect | null;
}>>;
/**
 * Search content items with full-text search
 */
export declare function searchContentItems(searchTerm: string, context: QueryContext, options?: {
    categoryId?: string;
    authorId?: string;
    contentType?: string;
    limit?: number;
    offset?: number;
}): Promise<Array<{
    content: typeof contentItems.$inferSelect;
    author: typeof userProfiles.$inferSelect | null;
    category: typeof contentCategories.$inferSelect | null;
}>>;
/**
 * Get content items by author
 */
export declare function getContentItemsByAuthor(authorId: string, context: QueryContext, options?: {
    status?: 'draft' | 'published' | 'scheduled' | 'archived';
    limit?: number;
    offset?: number;
}): Promise<(typeof contentItems.$inferSelect)[]>;
/**
 * Get content items by category
 */
export declare function getContentItemsByCategory(categoryId: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
}): Promise<(typeof contentItems.$inferSelect)[]>;
/**
 * Get content items by series
 */
export declare function getContentItemsBySeries(seriesId: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
}): Promise<(typeof contentItems.$inferSelect)[]>;
/**
 * Get trending content items
 */
export declare function getTrendingContentItems(context: QueryContext, options?: {
    timeframe?: 'day' | 'week' | 'month' | 'year';
    limit?: number;
}): Promise<(typeof contentItems.$inferSelect)[]>;
/**
 * Get content statistics for author
 */
export declare function getContentStats(authorId: string, context: QueryContext): Promise<{
    totalContent: number;
    publishedContent: number;
    draftContent: number;
    scheduledContent: number;
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    totalComments: number;
    averageReadingTime: number;
} | null>;
/**
 * Create content item
 */
export declare function createContentItem(contentData: NewContentItem, context: QueryContext): Promise<typeof contentItems.$inferSelect>;
/**
 * Update content item with context-aware validation
 */
export declare function updateContentItem(contentId: string, updates: Partial<NewContentItem>, context: QueryContext): Promise<typeof contentItems.$inferSelect | null>;
/**
 * Delete content item with context-aware validation
 */
export declare function deleteContentItem(contentId: string, context: QueryContext): Promise<boolean>;
/**
 * Get content category by ID
 */
export declare function getContentCategoryById(categoryId: string, context: QueryContext): Promise<typeof contentCategories.$inferSelect | null>;
/**
 * Get content category by slug
 */
export declare function getContentCategoryBySlug(slug: string, context: QueryContext): Promise<typeof contentCategories.$inferSelect | null>;
/**
 * Get all active content categories
 */
export declare function getContentCategories(context: QueryContext, options?: {
    parentId?: string;
    theologicalDiscipline?: string;
    limit?: number;
    offset?: number;
}): Promise<(typeof contentCategories.$inferSelect)[]>;
/**
 * Get content categories with content counts
 */
export declare function getContentCategoriesWithCounts(context: QueryContext): Promise<Array<typeof contentCategories.$inferSelect & {
    contentCount: number;
}>>;
/**
 * Create content category
 */
export declare function createContentCategory(categoryData: NewContentCategory, context: QueryContext): Promise<typeof contentCategories.$inferSelect>;
/**
 * Update content category
 */
export declare function updateContentCategory(categoryId: string, updates: Partial<NewContentCategory>, context: QueryContext): Promise<typeof contentCategories.$inferSelect | null>;
/**
 * Delete content category
 */
export declare function deleteContentCategory(categoryId: string, context: QueryContext): Promise<boolean>;
/**
 * Get content series by ID
 */
export declare function getContentSeriesById(seriesId: string, context: QueryContext): Promise<typeof contentSeries.$inferSelect | null>;
/**
 * Get content series by slug
 */
export declare function getContentSeriesBySlug(slug: string, context: QueryContext): Promise<typeof contentSeries.$inferSelect | null>;
/**
 * Get content series by author
 */
export declare function getContentSeriesByAuthor(authorId: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
}): Promise<(typeof contentSeries.$inferSelect)[]>;
/**
 * Create content series
 */
export declare function createContentSeries(seriesData: NewContentSeries, context: QueryContext): Promise<typeof contentSeries.$inferSelect>;
/**
 * Update content series
 */
export declare function updateContentSeries(seriesId: string, updates: Partial<NewContentSeries>, context: QueryContext): Promise<typeof contentSeries.$inferSelect | null>;
/**
 * Delete content series
 */
export declare function deleteContentSeries(seriesId: string, context: QueryContext): Promise<boolean>;
//# sourceMappingURL=content.d.ts.map