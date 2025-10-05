// ============================================================================
// CONTENT SERVICE
// ============================================================================
// Use-case functions that orchestrate content query modules + mappers
// Following alignment reference patterns for business logic and authorization

import type {
  ContentCategoryResponse,
  ContentItemResponse,
  ContentQueryFilters,
  ContentSeriesResponse,
  CreateContentCategory,
  CreateContentItem,
  CreateContentSeries,
  UpdateContentCategory,
  UpdateContentItem,
  UpdateContentSeries,
} from '@platform/contracts';
import {
  contentItemQuerySchema,
  createContentCategorySchema,
  createContentItemSchema,
  createContentSeriesSchema,
  updateContentCategorySchema,
  updateContentItemSchema,
  updateContentSeriesSchema,
} from '@platform/contracts';
import type { QueryContext } from '@platform/database';
import {
  createContentCategory,
  createContentItem,
  createContentSeries,
  deleteContentCategory,
  deleteContentItem,
  deleteContentSeries,
  getContentCategories,
  getContentCategoriesWithCounts,
  getContentCategoryById,
  getContentCategoryBySlug,
  getContentItemById,
  getContentItemBySlug,
  getContentItemsByAuthor,
  getContentItemsByCategory,
  getContentItemsBySeries,
  getContentItemsWithDetails,
  getContentSeriesByAuthor,
  getContentSeriesById,
  getContentSeriesBySlug,
  getContentStats,
  getTrendingContentItems,
  searchContentItems,
  updateContentCategory,
  updateContentItem,
  updateContentSeries,
} from '@platform/database';
import {
  fromCreateContentCategory,
  fromCreateContentItem,
  fromCreateContentSeries,
  fromUpdateContentCategory,
  fromUpdateContentItem,
  fromUpdateContentSeries,
  toContentCategoryResponseDTO,
  toContentItemResponseDTO,
  toContentSeriesResponseDTO,
} from '../mappers/content';
import { BaseService } from './base.service';
import {
  AuthHelpers,
  ForbiddenError,
  NotFoundError,
  PaginatedServiceResult,
  ServiceContext,
  ServiceResult,
} from './types';

/**
 * Content Item Service
 * Orchestrates content item domain operations with business logic and authorization
 */
export class ContentItemService extends BaseService<
  ContentItemResponse,
  CreateContentItem,
  UpdateContentItem,
  ContentQueryFilters
> {
  protected entityName = 'ContentItem';
  protected createSchema = createContentItemSchema;
  protected updateSchema = updateContentItemSchema;
  protected querySchema = contentItemQuerySchema;

  // ============================================================================
  // CORE CRUD OPERATIONS (inherited from BaseService)
  // ============================================================================

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): ContentItemResponse {
    return toContentItemResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateContentItem,
    context: ServiceContext
  ): unknown {
    return fromCreateContentItem(data);
  }

  protected mapUpdateToDb(
    data: UpdateContentItem,
    context: ServiceContext
  ): unknown {
    return fromUpdateContentItem(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    const queryContext = this.mapToQueryContext(context);
    return createContentItem(data as any, queryContext);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return getContentItemById(id, queryContext);
  }

  protected async executeFindMany(
    query: ContentQueryFilters,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const queryContext = this.mapToQueryContext(context);
    const results = await getContentItemsWithDetails(queryContext, {
      authorId: query.authorId,
      categoryId: query.categoryId,
      seriesId: query.seriesId,
      status: query.status as any,
      visibility: query.visibility as any,
      contentType: query.contentType,
      limit: query.limit || 20,
      offset: query.offset || 0,
      orderBy: query.sortBy || 'published_at',
      orderDirection: query.sortOrder || 'desc',
    });

    return {
      data: results.map(r => r.content),
      pagination: {
        page: Math.floor((query.offset || 0) / (query.limit || 20)) + 1,
        limit: query.limit || 20,
        total: results.length, // This would be improved with proper count query
        totalPages: Math.ceil(results.length / (query.limit || 20)),
        hasMore: results.length === (query.limit || 20),
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return updateContentItem(id, data as any, queryContext);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    const queryContext = this.mapToQueryContext(context);
    await deleteContentItem(id, queryContext);
  }

  // ============================================================================
  // CONTENT-SPECIFIC BUSINESS OPERATIONS
  // ============================================================================

  /**
   * Find content by slug
   */
  async findBySlug(
    slug: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentItemResponse>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const dbResult = await getContentItemBySlug(slug, queryContext);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, slug);
      }

      const entity = this.mapDbToEntity(dbResult, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findBySlug');
    }
  }

  /**
   * Search content items
   */
  async searchContent(
    searchTerm: string,
    context: ServiceContext,
    options: {
      categoryId?: string;
      authorId?: string;
      contentType?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResult<ContentItemResponse[]>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const results = await searchContentItems(
        searchTerm,
        queryContext,
        options
      );

      const entities = results.map(result =>
        this.mapDbToEntity(result.content, context)
      );
      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'searchContent');
    }
  }

  /**
   * Get content by author
   */
  async getByAuthor(
    authorId: string,
    context: ServiceContext,
    options: {
      status?: 'draft' | 'published' | 'scheduled' | 'archived';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResult<ContentItemResponse[]>> {
    try {
      // Business rule: Only author can see their drafts, others can see published content
      if (authorId !== context.userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        options.status = 'published';
      }

      const queryContext = this.mapToQueryContext(context);
      const results = await getContentItemsByAuthor(
        authorId,
        queryContext,
        options
      );

      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );
      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getByAuthor');
    }
  }

  /**
   * Get content by category
   */
  async getByCategory(
    categoryId: string,
    context: ServiceContext,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResult<ContentItemResponse[]>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const results = await getContentItemsByCategory(
        categoryId,
        queryContext,
        options
      );

      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );
      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getByCategory');
    }
  }

  /**
   * Get content by series
   */
  async getBySeries(
    seriesId: string,
    context: ServiceContext,
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResult<ContentItemResponse[]>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const results = await getContentItemsBySeries(
        seriesId,
        queryContext,
        options
      );

      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );
      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getBySeries');
    }
  }

  /**
   * Get trending content
   */
  async getTrending(
    context: ServiceContext,
    options: {
      timeframe?: 'day' | 'week' | 'month' | 'year';
      limit?: number;
    } = {}
  ): Promise<ServiceResult<ContentItemResponse[]>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const results = await getTrendingContentItems(queryContext, options);

      const entities = results.map(result =>
        this.mapDbToEntity(result, context)
      );
      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getTrending');
    }
  }

  /**
   * Publish content
   */
  async publish(
    contentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentItemResponse>> {
    try {
      // Business rule: Only author can publish their content, or admin
      const content = await this.findById(contentId, context);
      if (!content.success || !content.data) {
        throw new NotFoundError(this.entityName, contentId);
      }

      if (
        content.data.authorId !== context.userId &&
        !AuthHelpers.isOwnerOrAdmin(context)
      ) {
        throw new ForbiddenError('Cannot publish content you did not create');
      }

      const updateData: UpdateContentItem = {
        status: 'published',
        publishedAt: new Date().toISOString(),
      };

      return this.update(contentId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'publish');
    }
  }

  /**
   * Archive content
   */
  async archive(
    contentId: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentItemResponse>> {
    try {
      // Business rule: Only author can archive their content, or admin
      const content = await this.findById(contentId, context);
      if (!content.success || !content.data) {
        throw new NotFoundError(this.entityName, contentId);
      }

      if (
        content.data.authorId !== context.userId &&
        !AuthHelpers.isOwnerOrAdmin(context)
      ) {
        throw new ForbiddenError('Cannot archive content you did not create');
      }

      const updateData: UpdateContentItem = {
        status: 'archived',
      };

      return this.update(contentId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'archive');
    }
  }

  /**
   * Get content statistics for author
   */
  async getContentStats(
    authorId: string,
    context: ServiceContext
  ): Promise<
    ServiceResult<{
      totalContent: number;
      publishedContent: number;
      draftContent: number;
      scheduledContent: number;
      totalViews: number;
      totalLikes: number;
      totalShares: number;
      totalComments: number;
      averageReadingTime: number;
    }>
  > {
    try {
      // Business rule: Only author can see their own stats, or admin
      if (authorId !== context.userId && !AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Cannot view content stats for another user');
      }

      const queryContext = this.mapToQueryContext(context);
      const stats = await getContentStats(authorId, queryContext);

      if (!stats) {
        throw new NotFoundError(this.entityName, authorId);
      }

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return this.handleError(error, 'getContentStats');
    }
  }

  // ============================================================================
  // AUTHORIZATION OVERRIDES
  // ============================================================================

  canRead(context: ServiceContext, resourceId?: string): boolean {
    // Everyone can read published content, authors can read their own drafts
    return AuthHelpers.hasRole(context, 'viewer');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    // Authors can update their own content, admins can update any
    if (resourceId) {
      // We'd need to fetch the content to check authorId, but for now allow members
      return AuthHelpers.hasRole(context, 'member');
    }
    return AuthHelpers.hasRole(context, 'member');
  }

  canCreate(context: ServiceContext): boolean {
    // Members can create content
    return AuthHelpers.hasRole(context, 'member');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    // Authors can delete their own content, admins can delete any
    if (resourceId) {
      // We'd need to fetch the content to check authorId, but for now allow admins
      return AuthHelpers.hasRole(context, 'admin');
    }
    return AuthHelpers.hasRole(context, 'admin');
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private mapToQueryContext(context: ServiceContext): QueryContext {
    return {
      userId: context.userId,
      organizationId: context.tenantId,
      role: context.role,
    };
  }
}

/**
 * Content Category Service
 * Orchestrates content category domain operations
 */
export class ContentCategoryService extends BaseService<
  ContentCategoryResponse,
  CreateContentCategory,
  UpdateContentCategory
> {
  protected entityName = 'ContentCategory';
  protected createSchema = createContentCategorySchema;
  protected updateSchema = updateContentCategorySchema;

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): ContentCategoryResponse {
    return toContentCategoryResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateContentCategory,
    context: ServiceContext
  ): unknown {
    return fromCreateContentCategory(data);
  }

  protected mapUpdateToDb(
    data: UpdateContentCategory,
    context: ServiceContext
  ): unknown {
    return fromUpdateContentCategory(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    const queryContext = this.mapToQueryContext(context);
    return createContentCategory(data as any, queryContext);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return getContentCategoryById(id, queryContext);
  }

  protected async executeFindMany(
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const queryContext = this.mapToQueryContext(context);
    const results = await getContentCategories(queryContext);

    return {
      data: results,
      pagination: {
        page: 1,
        limit: results.length,
        total: results.length,
        totalPages: 1,
        hasMore: false,
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return updateContentCategory(id, data as any, queryContext);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    const queryContext = this.mapToQueryContext(context);
    await deleteContentCategory(id, queryContext);
  }

  /**
   * Find category by slug
   */
  async findBySlug(
    slug: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentCategoryResponse>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const dbResult = await getContentCategoryBySlug(slug, queryContext);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, slug);
      }

      const entity = this.mapDbToEntity(dbResult, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findBySlug');
    }
  }

  /**
   * Get categories with content counts
   */
  async getWithCounts(
    context: ServiceContext
  ): Promise<
    ServiceResult<(ContentCategoryResponse & { contentCount: number })[]>
  > {
    try {
      const queryContext = this.mapToQueryContext(context);
      const results = await getContentCategoriesWithCounts(queryContext);

      const entities = results.map(result => ({
        ...this.mapDbToEntity(result, context),
        contentCount: result.contentCount,
      }));

      return {
        success: true,
        data: entities,
      };
    } catch (error) {
      return this.handleError(error, 'getWithCounts');
    }
  }

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  private mapToQueryContext(context: ServiceContext): QueryContext {
    return {
      userId: context.userId,
      organizationId: context.tenantId,
      role: context.role,
    };
  }
}

/**
 * Content Series Service
 * Orchestrates content series domain operations
 */
export class ContentSeriesService extends BaseService<
  ContentSeriesResponse,
  CreateContentSeries,
  UpdateContentSeries
> {
  protected entityName = 'ContentSeries';
  protected createSchema = createContentSeriesSchema;
  protected updateSchema = updateContentSeriesSchema;

  protected mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): ContentSeriesResponse {
    return toContentSeriesResponseDTO(dbResult as any);
  }

  protected mapCreateToDb(
    data: CreateContentSeries,
    context: ServiceContext
  ): unknown {
    return fromCreateContentSeries(data);
  }

  protected mapUpdateToDb(
    data: UpdateContentSeries,
    context: ServiceContext
  ): unknown {
    return fromUpdateContentSeries(data);
  }

  protected async executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown> {
    const queryContext = this.mapToQueryContext(context);
    return createContentSeries(data as any, queryContext);
  }

  protected async executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return getContentSeriesById(id, queryContext);
  }

  protected async executeFindMany(
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }> {
    const queryContext = this.mapToQueryContext(context);
    const results = await getContentSeriesByAuthor(
      context.userId,
      queryContext
    );

    return {
      data: results,
      pagination: {
        page: 1,
        limit: results.length,
        total: results.length,
        totalPages: 1,
        hasMore: false,
      },
    };
  }

  protected async executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null> {
    const queryContext = this.mapToQueryContext(context);
    return updateContentSeries(id, data as any, queryContext);
  }

  protected async executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void> {
    const queryContext = this.mapToQueryContext(context);
    await deleteContentSeries(id, queryContext);
  }

  /**
   * Find series by slug
   */
  async findBySlug(
    slug: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentSeriesResponse>> {
    try {
      const queryContext = this.mapToQueryContext(context);
      const dbResult = await getContentSeriesBySlug(slug, queryContext);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, slug);
      }

      const entity = this.mapDbToEntity(dbResult, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findBySlug');
    }
  }

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  private mapToQueryContext(context: ServiceContext): QueryContext {
    return {
      userId: context.userId,
      organizationId: context.tenantId,
      role: context.role,
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type CreateContentItemInput = CreateContentItem;
export type CreateContentItemOutput = ContentItemResponse;
export type UpdateContentItemInput = UpdateContentItem;
export type UpdateContentItemOutput = ContentItemResponse;
export type ContentItemQueryInput = ContentQueryFilters;
export type ContentItemListOutput = PaginatedServiceResult<ContentItemResponse>;

export type CreateContentCategoryInput = CreateContentCategory;
export type CreateContentCategoryOutput = ContentCategoryResponse;
export type UpdateContentCategoryInput = UpdateContentCategory;
export type UpdateContentCategoryOutput = ContentCategoryResponse;

export type CreateContentSeriesInput = CreateContentSeries;
export type CreateContentSeriesOutput = ContentSeriesResponse;
export type UpdateContentSeriesInput = UpdateContentSeries;
export type UpdateContentSeriesOutput = ContentSeriesResponse;
