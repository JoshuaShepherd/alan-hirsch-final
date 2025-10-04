import { contentCategories, contentItems } from '@/lib/db/schema';
import { newContentCategorySchema, newContentItemSchema, queryContentCategorySchema, queryContentItemSchema, updateContentCategorySchema, updateContentItemSchema } from '@/src/lib/schemas/crud.schemas';
import { databaseContentCategorySchema, databaseContentItemSchema } from '@/src/lib/schemas/database.schemas';
import { z } from 'zod';
import { BaseService } from './base.service';
export declare class ContentItemService extends BaseService<z.infer<typeof databaseContentItemSchema>, z.infer<typeof newContentItemSchema>, z.infer<typeof updateContentItemSchema>, z.infer<typeof queryContentItemSchema>, typeof contentItems> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find content by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseContentItemSchema> | null>;
    /**
     * Find content with author and category information
     */
    findWithDetails(contentId: string): Promise<{
        content: z.infer<typeof databaseContentItemSchema>;
        author: any;
        category: any;
    } | null>;
    /**
     * Find content by author
     */
    findByAuthor(authorId: string, options?: {
        status?: string;
        visibility?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Find content by category
     */
    findByCategory(categoryId: string, options?: {
        status?: string;
        visibility?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Find published content
     */
    findPublished(options?: {
        visibility?: string;
        contentType?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Search content by text
     */
    searchContent(query: string, options?: {
        status?: string;
        visibility?: string;
        contentType?: string;
        limit?: number;
        offset?: number;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
    /**
     * Update content view count
     */
    incrementViewCount(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Update content like count
     */
    incrementLikeCount(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Update content share count
     */
    incrementShareCount(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Publish content
     */
    publish(contentId: string, publishedAt?: Date): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Unpublish content
     */
    unpublish(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Archive content
     */
    archive(contentId: string): Promise<z.infer<typeof databaseContentItemSchema>>;
    /**
     * Get content statistics for an author
     */
    getAuthorStats(authorId: string): Promise<{
        totalContent: number;
        publishedContent: number;
        draftContent: number;
        archivedContent: number;
        totalViews: number;
        totalLikes: number;
        totalShares: number;
    }>;
    /**
     * Get trending content
     */
    getTrendingContent(options?: {
        timeframe?: 'day' | 'week' | 'month';
        limit?: number;
        contentType?: string;
    }): Promise<z.infer<typeof databaseContentItemSchema>[]>;
}
export declare class ContentCategoryService extends BaseService<z.infer<typeof databaseContentCategorySchema>, z.infer<typeof newContentCategorySchema>, z.infer<typeof updateContentCategorySchema>, z.infer<typeof queryContentCategorySchema>, typeof contentCategories> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find category by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseContentCategorySchema> | null>;
    /**
     * Find categories by parent
     */
    findByParent(parentId: string): Promise<z.infer<typeof databaseContentCategorySchema>[]>;
    /**
     * Find root categories (no parent)
     */
    findRootCategories(): Promise<z.infer<typeof databaseContentCategorySchema>[]>;
    /**
     * Find categories by theological discipline
     */
    findByTheologicalDiscipline(discipline: string): Promise<z.infer<typeof databaseContentCategorySchema>[]>;
    /**
     * Get category tree (with children)
     */
    getCategoryTree(): Promise<Array<z.infer<typeof databaseContentCategorySchema> & {
        children: any[];
    }>>;
    /**
     * Get category with content count
     */
    getCategoryWithContentCount(categoryId: string): Promise<{
        category: z.infer<typeof databaseContentCategorySchema>;
        contentCount: number;
        publishedContentCount: number;
    } | null>;
}
//# sourceMappingURL=content.service.d.ts.map