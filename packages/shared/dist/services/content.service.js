import { contentCategoryEntitySchema as databaseContentCategorySchema, contentItemEntitySchema as databaseContentItemSchema, } from '@platform/contracts/entities/content.schema';
import { CreateContentCategoryOperationSchema as newContentCategorySchema, CreateContentItemOperationSchema as newContentItemSchema, UpdateContentCategoryOperationSchema as updateContentCategorySchema, UpdateContentItemOperationSchema as updateContentItemSchema, } from '@platform/contracts/operations/content.operations';
import { contentCategories, contentItems, db, userProfiles, } from '@platform/database';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { BaseService } from './base.service';
// ============================================================================
// CONTENT ITEM SERVICE
// ============================================================================
// Create proper query schema that matches QueryFilters interface
const contentItemQuerySchema = z.object({
    where: z.record(z.any()).optional(),
    orderBy: z
        .array(z.object({
        field: z.string(),
        direction: z.enum(['asc', 'desc']),
    }))
        .optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    include: z.array(z.string()).optional(),
});
export class ContentItemService extends BaseService {
    table = contentItems;
    entityName = 'ContentItem';
    createSchema = newContentItemSchema;
    updateSchema = updateContentItemSchema;
    querySchema = contentItemQuerySchema;
    outputSchema = databaseContentItemSchema;
    /**
     * Find content by slug
     */
    async findBySlug(slug) {
        try {
            const [result] = await db
                .select()
                .from(contentItems)
                .where(eq(contentItems.slug, slug))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findBySlug');
        }
    }
    /**
     * Find content with author and category information
     */
    async findWithDetails(contentId) {
        try {
            const [result] = await db
                .select({
                content: contentItems,
                author: userProfiles,
                category: contentCategories,
            })
                .from(contentItems)
                .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
                .leftJoin(contentCategories, eq(contentItems.primaryCategoryId, contentCategories.id))
                .where(eq(contentItems.id, contentId))
                .limit(1);
            if (!result)
                return null;
            return {
                content: this.outputSchema.parse(result.content),
                author: result.author,
                category: result.category,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findWithDetails');
        }
    }
    /**
     * Find content by author
     */
    async findByAuthor(authorId, options = {}) {
        try {
            const { status = 'published', visibility = 'public', limit = 20, offset = 0, } = options;
            const results = await db
                .select()
                .from(contentItems)
                .where(and(eq(contentItems.authorId, authorId), status ? eq(contentItems.status, status) : undefined, visibility
                ? eq(contentItems.visibility, visibility)
                : undefined))
                .orderBy(desc(contentItems.publishedAt))
                .limit(limit)
                .offset(offset);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByAuthor');
        }
    }
    /**
     * Find content by category
     */
    async findByCategory(categoryId, options = {}) {
        try {
            const { status = 'published', visibility = 'public', limit = 20, offset = 0, } = options;
            const results = await db
                .select()
                .from(contentItems)
                .where(and(eq(contentItems.primaryCategoryId, categoryId), status ? eq(contentItems.status, status) : undefined, visibility
                ? eq(contentItems.visibility, visibility)
                : undefined))
                .orderBy(desc(contentItems.publishedAt))
                .limit(limit)
                .offset(offset);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByCategory');
        }
    }
    /**
     * Find published content
     */
    async findPublished(options = {}) {
        try {
            const { visibility = 'public', contentType, limit = 20, offset = 0, } = options;
            const whereConditions = [eq(contentItems.status, 'published')];
            if (visibility) {
                whereConditions.push(eq(contentItems.visibility, visibility));
            }
            if (contentType) {
                whereConditions.push(eq(contentItems.contentType, contentType));
            }
            const results = await db
                .select()
                .from(contentItems)
                .where(and(...whereConditions))
                .orderBy(desc(contentItems.publishedAt))
                .limit(limit)
                .offset(offset);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findPublished');
        }
    }
    /**
     * Search content by text
     */
    async searchContent(query, options = {}) {
        try {
            const { status = 'published', visibility = 'public', contentType, limit = 20, offset = 0, } = options;
            const whereConditions = [
                status ? eq(contentItems.status, status) : undefined,
                visibility ? eq(contentItems.visibility, visibility) : undefined,
                contentType
                    ? eq(contentItems.contentType, contentType)
                    : undefined,
                sql `(
          ${contentItems.title} ILIKE ${`%${query}%`} OR
          ${contentItems.excerpt} ILIKE ${`%${query}%`} OR
          ${contentItems.content} ILIKE ${`%${query}%`}
        )`,
            ].filter(Boolean);
            const results = await db
                .select()
                .from(contentItems)
                .where(and(...whereConditions))
                .orderBy(desc(contentItems.publishedAt))
                .limit(limit)
                .offset(offset);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'searchContent');
        }
    }
    /**
     * Update content view count
     */
    async incrementViewCount(contentId) {
        try {
            const [result] = await db
                .update(contentItems)
                .set({
                viewCount: sql `${contentItems.viewCount} + 1`,
                updatedAt: new Date(),
            })
                .where(eq(contentItems.id, contentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'incrementViewCount');
        }
    }
    /**
     * Update content like count
     */
    async incrementLikeCount(contentId) {
        try {
            const [result] = await db
                .update(contentItems)
                .set({
                likeCount: sql `${contentItems.likeCount} + 1`,
                updatedAt: new Date(),
            })
                .where(eq(contentItems.id, contentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'incrementLikeCount');
        }
    }
    /**
     * Update content share count
     */
    async incrementShareCount(contentId) {
        try {
            const [result] = await db
                .update(contentItems)
                .set({
                shareCount: sql `${contentItems.shareCount} + 1`,
                updatedAt: new Date(),
            })
                .where(eq(contentItems.id, contentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'incrementShareCount');
        }
    }
    /**
     * Publish content
     */
    async publish(contentId, publishedAt) {
        try {
            const [result] = await db
                .update(contentItems)
                .set({
                status: 'published',
                publishedAt: publishedAt || new Date(),
                updatedAt: new Date(),
            })
                .where(eq(contentItems.id, contentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'publish');
        }
    }
    /**
     * Unpublish content
     */
    async unpublish(contentId) {
        try {
            const [result] = await db
                .update(contentItems)
                .set({
                status: 'draft',
                updatedAt: new Date(),
            })
                .where(eq(contentItems.id, contentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'unpublish');
        }
    }
    /**
     * Archive content
     */
    async archive(contentId) {
        try {
            const [result] = await db
                .update(contentItems)
                .set({
                status: 'archived',
                updatedAt: new Date(),
            })
                .where(eq(contentItems.id, contentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'archive');
        }
    }
    /**
     * Get content statistics for an author
     */
    async getAuthorStats(authorId) {
        try {
            const [stats] = await db
                .select({
                totalContent: sql `count(*)`,
                publishedContent: sql `count(case when status = 'published' then 1 end)`,
                draftContent: sql `count(case when status = 'draft' then 1 end)`,
                archivedContent: sql `count(case when status = 'archived' then 1 end)`,
                totalViews: sql `coalesce(sum(view_count), 0)`,
                totalLikes: sql `coalesce(sum(like_count), 0)`,
                totalShares: sql `coalesce(sum(share_count), 0)`,
            })
                .from(contentItems)
                .where(eq(contentItems.authorId, authorId));
            return {
                totalContent: stats?.totalContent || 0,
                publishedContent: stats?.publishedContent || 0,
                draftContent: stats?.draftContent || 0,
                archivedContent: stats?.archivedContent || 0,
                totalViews: stats?.totalViews || 0,
                totalLikes: stats?.totalLikes || 0,
                totalShares: stats?.totalShares || 0,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getAuthorStats');
        }
    }
    /**
     * Get trending content
     */
    async getTrendingContent(options = {}) {
        try {
            const { timeframe = 'week', limit = 20, contentType } = options;
            let timeFilter;
            const now = new Date();
            switch (timeframe) {
                case 'day':
                    timeFilter = sql `${contentItems.publishedAt} >= ${new Date(now.getTime() - 24 * 60 * 60 * 1000)}`;
                    break;
                case 'week':
                    timeFilter = sql `${contentItems.publishedAt} >= ${new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)}`;
                    break;
                case 'month':
                    timeFilter = sql `${contentItems.publishedAt} >= ${new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)}`;
                    break;
                default:
                    timeFilter = sql `${contentItems.publishedAt} >= ${new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)}`;
            }
            const whereConditions = [
                eq(contentItems.status, 'published'),
                eq(contentItems.visibility, 'public'),
                timeFilter,
            ];
            if (contentType) {
                whereConditions.push(eq(contentItems.contentType, contentType));
            }
            const results = await db
                .select()
                .from(contentItems)
                .where(and(...whereConditions))
                .orderBy(desc(sql `(${contentItems.viewCount} + ${contentItems.likeCount} * 2 + ${contentItems.shareCount} * 3)`))
                .limit(limit);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getTrendingContent');
        }
    }
}
// ============================================================================
// CONTENT CATEGORY SERVICE
// ============================================================================
// Create proper query schema for content categories
const contentCategoryQuerySchema = z.object({
    where: z.record(z.any()).optional(),
    orderBy: z
        .array(z.object({
        field: z.string(),
        direction: z.enum(['asc', 'desc']),
    }))
        .optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    include: z.array(z.string()).optional(),
});
export class ContentCategoryService extends BaseService {
    table = contentCategories;
    entityName = 'ContentCategory';
    createSchema = newContentCategorySchema;
    updateSchema = updateContentCategorySchema;
    querySchema = contentCategoryQuerySchema;
    outputSchema = databaseContentCategorySchema;
    /**
     * Find category by slug
     */
    async findBySlug(slug) {
        try {
            const [result] = await db
                .select()
                .from(contentCategories)
                .where(eq(contentCategories.slug, slug))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findBySlug');
        }
    }
    /**
     * Find categories by parent
     */
    async findByParent(parentId) {
        try {
            const results = await db
                .select()
                .from(contentCategories)
                .where(and(eq(contentCategories.parentId, parentId), eq(contentCategories.isActive, true)))
                .orderBy(contentCategories.orderIndex);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByParent');
        }
    }
    /**
     * Find root categories (no parent)
     */
    async findRootCategories() {
        try {
            const results = await db
                .select()
                .from(contentCategories)
                .where(and(sql `${contentCategories.parentId} IS NULL`, eq(contentCategories.isActive, true)))
                .orderBy(contentCategories.orderIndex);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findRootCategories');
        }
    }
    /**
     * Find categories by theological discipline
     */
    async findByTheologicalDiscipline(discipline) {
        try {
            const results = await db
                .select()
                .from(contentCategories)
                .where(and(eq(contentCategories.theologicalDiscipline, discipline), eq(contentCategories.isActive, true)))
                .orderBy(contentCategories.orderIndex);
            return results.map((result) => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByTheologicalDiscipline');
        }
    }
    /**
     * Get category tree (with children)
     */
    async getCategoryTree() {
        try {
            // Get all categories
            const allCategories = await db
                .select()
                .from(contentCategories)
                .where(eq(contentCategories.isActive, true))
                .orderBy(contentCategories.orderIndex);
            const categories = allCategories.map((result) => this.outputSchema.parse(result));
            // Build tree structure
            const categoryMap = new Map(categories.map(cat => [cat.id, { ...cat, children: [] }]));
            const rootCategories = [];
            for (const category of categories) {
                const categoryWithChildren = categoryMap.get(category.id);
                if (category.parentId) {
                    const parent = categoryMap.get(category.parentId);
                    if (parent) {
                        parent.children.push(categoryWithChildren);
                    }
                }
                else {
                    rootCategories.push(categoryWithChildren);
                }
            }
            return rootCategories;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getCategoryTree');
        }
    }
    /**
     * Get category with content count
     */
    async getCategoryWithContentCount(categoryId) {
        try {
            const [categoryResult] = await db
                .select()
                .from(contentCategories)
                .where(eq(contentCategories.id, categoryId))
                .limit(1);
            if (!categoryResult)
                return null;
            const [contentStats] = await db
                .select({
                contentCount: sql `count(*)`,
                publishedContentCount: sql `count(case when status = 'published' then 1 end)`,
            })
                .from(contentItems)
                .where(eq(contentItems.primaryCategoryId, categoryId));
            return {
                category: this.outputSchema.parse(categoryResult),
                contentCount: contentStats?.contentCount || 0,
                publishedContentCount: contentStats?.publishedContentCount || 0,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getCategoryWithContentCount');
        }
    }
}
// ============================================================================
// EXPORTS
// ============================================================================
// Services are already exported as classes above
//# sourceMappingURL=content.service.js.map