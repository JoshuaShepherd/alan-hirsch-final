import {
  contentCategoryQuerySchema,
  contentItemQuerySchema,
  contentCategoryEntitySchema as databaseContentCategorySchema,
  contentItemEntitySchema as databaseContentItemSchema,
  createContentCategorySchema as newContentCategorySchema,
  createContentItemSchema as newContentItemSchema,
  updateContentCategorySchema,
  updateContentItemSchema,
} from '@platform/contracts';
import {
  contentCategories,
  contentItems,
  db,
  userProfiles,
} from '@platform/database';
import { and, desc, eq, sql, type SQL } from 'drizzle-orm';
import { z } from 'zod';
import { BaseService } from './base.service';

// ============================================================================
// CONTENT ITEM SERVICE
// ============================================================================

export class ContentItemService extends BaseService<
  z.infer<typeof databaseContentItemSchema>,
  z.infer<typeof newContentItemSchema>,
  z.infer<typeof updateContentItemSchema>,
  z.infer<typeof contentItemQuerySchema>,
  typeof contentItems
> {
  protected table = contentItems;
  protected entityName = 'ContentItem';
  protected createSchema = newContentItemSchema;
  protected updateSchema = updateContentItemSchema;
  protected querySchema = contentItemQuerySchema;
  protected outputSchema = databaseContentItemSchema;

  /**
   * Alias for findAll for backward compatibility
   */
  async findMany(
    filters?: any
  ): Promise<z.infer<typeof databaseContentItemSchema>[]> {
    return this.findAll(filters);
  }

  /**
   * Find content by slug
   */
  async findBySlug(
    slug: string
  ): Promise<z.infer<typeof databaseContentItemSchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(contentItems)
        .where(eq(contentItems.slug, slug))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findBySlug');
    }
  }

  /**
   * Find content with author and category information
   */
  async findWithDetails(contentId: string): Promise<{
    content: z.infer<typeof databaseContentItemSchema>;
    author: any;
    category: any;
  } | null> {
    try {
      const [result] = await db
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
        .where(eq(contentItems.id, contentId))
        .limit(1);

      if (!result) return null;

      return {
        content: this.outputSchema.parse(result.content),
        author: result.author,
        category: result.category,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'findWithDetails');
    }
  }

  /**
   * Find content by author
   */
  async findByAuthor(
    authorId: string,
    options: {
      status?: string;
      visibility?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<z.infer<typeof databaseContentItemSchema>[]> {
    try {
      const {
        status = 'published',
        visibility = 'public',
        limit = 20,
        offset = 0,
      } = options;

      const results = await db
        .select()
        .from(contentItems)
        .where(
          and(
            eq(contentItems.authorId, authorId),
            status ? eq(contentItems.status, status as any) : undefined,
            visibility
              ? eq(contentItems.visibility, visibility as any)
              : undefined
          )
        )
        .orderBy(desc(contentItems.publishedAt))
        .limit(limit)
        .offset(offset);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByAuthor');
    }
  }

  /**
   * Find content by category
   */
  async findByCategory(
    categoryId: string,
    options: {
      status?: string;
      visibility?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<z.infer<typeof databaseContentItemSchema>[]> {
    try {
      const {
        status = 'published',
        visibility = 'public',
        limit = 20,
        offset = 0,
      } = options;

      const results = await db
        .select()
        .from(contentItems)
        .where(
          and(
            eq(contentItems.primaryCategoryId, categoryId),
            status ? eq(contentItems.status, status as any) : undefined,
            visibility
              ? eq(contentItems.visibility, visibility as any)
              : undefined
          )
        )
        .orderBy(desc(contentItems.publishedAt))
        .limit(limit)
        .offset(offset);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByCategory');
    }
  }

  /**
   * Find published content
   */
  async findPublished(
    options: {
      visibility?: string;
      contentType?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<z.infer<typeof databaseContentItemSchema>[]> {
    try {
      const {
        visibility = 'public',
        contentType,
        limit = 20,
        offset = 0,
      } = options;

      const whereConditions = [eq(contentItems.status, 'published')];

      if (visibility) {
        whereConditions.push(eq(contentItems.visibility, visibility as any));
      }

      if (contentType) {
        whereConditions.push(eq(contentItems.contentType, contentType as any));
      }

      const results = await db
        .select()
        .from(contentItems)
        .where(and(...whereConditions))
        .orderBy(desc(contentItems.publishedAt))
        .limit(limit)
        .offset(offset);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findPublished');
    }
  }

  /**
   * Search content by text
   */
  async searchContent(
    query: string,
    options: {
      status?: string;
      visibility?: string;
      contentType?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<z.infer<typeof databaseContentItemSchema>[]> {
    try {
      const {
        status = 'published',
        visibility = 'public',
        contentType,
        limit = 20,
        offset = 0,
      } = options;

      const whereConditions = [
        status ? eq(contentItems.status, status as any) : undefined,
        visibility ? eq(contentItems.visibility, visibility as any) : undefined,
        contentType
          ? eq(contentItems.contentType, contentType as any)
          : undefined,
        sql`(
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

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'searchContent');
    }
  }

  /**
   * Update content view count
   */
  async incrementViewCount(
    contentId: string
  ): Promise<z.infer<typeof databaseContentItemSchema>> {
    try {
      const [result] = await db
        .update(contentItems)
        .set({
          viewCount: sql`${contentItems.viewCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(contentItems.id, contentId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'incrementViewCount');
    }
  }

  /**
   * Update content like count
   */
  async incrementLikeCount(
    contentId: string
  ): Promise<z.infer<typeof databaseContentItemSchema>> {
    try {
      const [result] = await db
        .update(contentItems)
        .set({
          likeCount: sql`${contentItems.likeCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(contentItems.id, contentId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'incrementLikeCount');
    }
  }

  /**
   * Update content share count
   */
  async incrementShareCount(
    contentId: string
  ): Promise<z.infer<typeof databaseContentItemSchema>> {
    try {
      const [result] = await db
        .update(contentItems)
        .set({
          shareCount: sql`${contentItems.shareCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(contentItems.id, contentId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'incrementShareCount');
    }
  }

  /**
   * Publish content
   */
  async publish(
    contentId: string,
    publishedAt?: Date
  ): Promise<z.infer<typeof databaseContentItemSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'publish');
    }
  }

  /**
   * Unpublish content
   */
  async unpublish(
    contentId: string
  ): Promise<z.infer<typeof databaseContentItemSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'unpublish');
    }
  }

  /**
   * Archive content
   */
  async archive(
    contentId: string
  ): Promise<z.infer<typeof databaseContentItemSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'archive');
    }
  }

  /**
   * Get content statistics for an author
   */
  async getAuthorStats(authorId: string): Promise<{
    totalContent: number;
    publishedContent: number;
    draftContent: number;
    archivedContent: number;
    totalViews: number;
    totalLikes: number;
    totalShares: number;
  }> {
    try {
      const [stats] = await db
        .select({
          totalContent: sql<number>`count(*)`,
          publishedContent: sql<number>`count(case when status = 'published' then 1 end)`,
          draftContent: sql<number>`count(case when status = 'draft' then 1 end)`,
          archivedContent: sql<number>`count(case when status = 'archived' then 1 end)`,
          totalViews: sql<number>`coalesce(sum(view_count), 0)`,
          totalLikes: sql<number>`coalesce(sum(like_count), 0)`,
          totalShares: sql<number>`coalesce(sum(share_count), 0)`,
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'getAuthorStats');
    }
  }

  /**
   * Get trending content
   */
  async getTrendingContent(
    options: {
      timeframe?: 'day' | 'week' | 'month';
      limit?: number;
      contentType?: string;
    } = {}
  ): Promise<z.infer<typeof databaseContentItemSchema>[]> {
    try {
      const { timeframe = 'week', limit = 20, contentType } = options;

      let timeFilter: SQL;
      const now = new Date();

      switch (timeframe) {
        case 'day':
          timeFilter = sql`${contentItems.publishedAt} >= ${new Date(now.getTime() - 24 * 60 * 60 * 1000)}`;
          break;
        case 'week':
          timeFilter = sql`${contentItems.publishedAt} >= ${new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)}`;
          break;
        case 'month':
          timeFilter = sql`${contentItems.publishedAt} >= ${new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)}`;
          break;
        default:
          timeFilter = sql`${contentItems.publishedAt} >= ${new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)}`;
      }

      const whereConditions = [
        eq(contentItems.status, 'published'),
        eq(contentItems.visibility, 'public'),
        timeFilter,
      ];

      if (contentType) {
        whereConditions.push(eq(contentItems.contentType, contentType as any));
      }

      const results = await db
        .select()
        .from(contentItems)
        .where(and(...whereConditions))
        .orderBy(
          desc(
            sql`(${contentItems.viewCount} + ${contentItems.likeCount} * 2 + ${contentItems.shareCount} * 3)`
          )
        )
        .limit(limit);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'getTrendingContent');
    }
  }
}

// ============================================================================
// CONTENT CATEGORY SERVICE
// ============================================================================

export class ContentCategoryService extends BaseService<
  z.infer<typeof databaseContentCategorySchema>,
  z.infer<typeof newContentCategorySchema>,
  z.infer<typeof updateContentCategorySchema>,
  z.infer<typeof contentCategoryQuerySchema>,
  typeof contentCategories
> {
  protected table = contentCategories;
  protected entityName = 'ContentCategory';
  protected createSchema = newContentCategorySchema;
  protected updateSchema = updateContentCategorySchema;
  protected querySchema = contentCategoryQuerySchema;
  protected outputSchema = databaseContentCategorySchema;

  /**
   * Find category by slug
   */
  async findBySlug(
    slug: string
  ): Promise<z.infer<typeof databaseContentCategorySchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(contentCategories)
        .where(eq(contentCategories.slug, slug))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findBySlug');
    }
  }

  /**
   * Find categories by parent
   */
  async findByParent(
    parentId: string
  ): Promise<z.infer<typeof databaseContentCategorySchema>[]> {
    try {
      const results = await db
        .select()
        .from(contentCategories)
        .where(
          and(
            eq(contentCategories.parentId, parentId),
            eq(contentCategories.isActive, true)
          )
        )
        .orderBy(contentCategories.orderIndex);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByParent');
    }
  }

  /**
   * Find root categories (no parent)
   */
  async findRootCategories(): Promise<
    z.infer<typeof databaseContentCategorySchema>[]
  > {
    try {
      const results = await db
        .select()
        .from(contentCategories)
        .where(
          and(
            sql`${contentCategories.parentId} IS NULL`,
            eq(contentCategories.isActive, true)
          )
        )
        .orderBy(contentCategories.orderIndex);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findRootCategories');
    }
  }

  /**
   * Find categories by theological discipline
   */
  async findByTheologicalDiscipline(
    discipline: string
  ): Promise<z.infer<typeof databaseContentCategorySchema>[]> {
    try {
      const results = await db
        .select()
        .from(contentCategories)
        .where(
          and(
            eq(contentCategories.theologicalDiscipline, discipline),
            eq(contentCategories.isActive, true)
          )
        )
        .orderBy(contentCategories.orderIndex);

      return results.map((result: any) => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByTheologicalDiscipline');
    }
  }

  /**
   * Get category tree (with children)
   */
  async getCategoryTree(): Promise<
    Array<z.infer<typeof databaseContentCategorySchema> & { children: any[] }>
  > {
    try {
      // Get all categories
      const allCategories = await db
        .select()
        .from(contentCategories)
        .where(eq(contentCategories.isActive, true))
        .orderBy(contentCategories.orderIndex);

      const categories = allCategories.map((result: any) =>
        this.outputSchema.parse(result)
      );

      // Build tree structure
      const categoryMap = new Map(
        categories.map(cat => [cat.id, { ...cat, children: [] as any[] }])
      );
      const rootCategories: any[] = [];

      for (const category of categories) {
        const categoryWithChildren = categoryMap.get(category.id)!;

        if (category.parentId) {
          const parent = categoryMap.get(category.parentId);
          if (parent) {
            parent.children.push(categoryWithChildren);
          }
        } else {
          rootCategories.push(categoryWithChildren);
        }
      }

      return rootCategories;
    } catch (error) {
      throw this.handleDatabaseError(error, 'getCategoryTree');
    }
  }

  /**
   * Get category with content count
   */
  async getCategoryWithContentCount(categoryId: string): Promise<{
    category: z.infer<typeof databaseContentCategorySchema>;
    contentCount: number;
    publishedContentCount: number;
  } | null> {
    try {
      const [categoryResult] = await db
        .select()
        .from(contentCategories)
        .where(eq(contentCategories.id, categoryId))
        .limit(1);

      if (!categoryResult) return null;

      const [contentStats] = await db
        .select({
          contentCount: sql<number>`count(*)`,
          publishedContentCount: sql<number>`count(case when status = 'published' then 1 end)`,
        })
        .from(contentItems)
        .where(eq(contentItems.primaryCategoryId, categoryId));

      return {
        category: this.outputSchema.parse(categoryResult),
        contentCount: contentStats?.contentCount || 0,
        publishedContentCount: contentStats?.publishedContentCount || 0,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'getCategoryWithContentCount');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Services are already exported as classes above
