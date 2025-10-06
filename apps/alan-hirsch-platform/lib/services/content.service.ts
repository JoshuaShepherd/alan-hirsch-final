// ============================================================================
// CONTENT SERVICE
// ============================================================================
// Use-case functions that orchestrate content query modules + mappers
// Following alignment reference patterns for business logic and authorization

import type {
  ContentCategoryResponse,
  ContentItemResponse,
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
  Record<string, unknown>
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
    query: Record<string, unknown>,
    context: ServiceContext
  ): Promise<{
    data: unknown[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
  }> {
    const queryContext = this.mapToQueryContext(context);
    const results = await getContentItemsWithDetails(queryContext, {
      authorId: query['authorId'] as string | undefined,
      categoryId: query['categoryId'] as string | undefined,
      seriesId: query['seriesId'] as string | undefined,
      status: query['status'] as any,
      visibility: query['visibility'] as any,
      contentType: query['contentType'] as string | undefined,
      limit: (query['limit'] as number) || 20,
      offset: (query['offset'] as number) || 0,
      orderBy:
        (query['sortBy'] as
          | 'created_at'
          | 'view_count'
          | 'like_count'
          | 'published_at') || 'published_at',
      orderDirection: (query['sortOrder'] as 'asc' | 'desc') || 'desc',
    });

    return {
      data: results.map(r => r.content),
      pagination: {
        page:
          Math.floor(
            ((query['offset'] as number) || 0) /
              ((query['limit'] as number) || 20)
          ) + 1,
        limit: (query['limit'] as number) || 20,
        total: results.length, // This would be improved with proper count query
        totalPages: Math.ceil(
          results.length / ((query['limit'] as number) || 20)
        ),
        hasMore: results.length === ((query['limit'] as number) || 20),
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

  /**
   * Search content with advanced filtering and pagination
   */
  async search(
    query: {
      query: string;
      categoryId?: string;
      authorId?: string;
      contentType?: string;
      status?: string;
      visibility?: string;
      tags?: string[];
      theologicalThemes?: string[];
      dateRange?: {
        startDate: string;
        endDate: string;
      };
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    },
    context: ServiceContext
  ): Promise<ServiceResult<PaginatedServiceResult<ContentItemResponse>>> {
    try {
      const queryContext = this.mapToQueryContext(context);

      // Use the existing searchContentItems function with enhanced parameters
      const results = await searchContentItems(query.query, queryContext, {
        categoryId: query.categoryId,
        authorId: query.authorId,
        contentType: query.contentType,
        limit: query.limit || 20,
        offset: ((query.page || 1) - 1) * (query.limit || 20),
      });

      const entities = results.map(result =>
        this.mapDbToEntity(result.content, context)
      );

      // Apply additional filtering
      let filteredResults = entities;

      if (query.status) {
        filteredResults = filteredResults.filter(
          item => item.status === query.status
        );
      }

      if (query.visibility) {
        filteredResults = filteredResults.filter(
          item => item.visibility === query.visibility
        );
      }

      if (query.tags && query.tags.length > 0) {
        filteredResults = filteredResults.filter(item =>
          query.tags!.some(tag => item.tags.includes(tag))
        );
      }

      if (query.theologicalThemes && query.theologicalThemes.length > 0) {
        filteredResults = filteredResults.filter(item =>
          query.theologicalThemes!.some(theme =>
            item.theologicalThemes.includes(theme)
          )
        );
      }

      const page = query.page || 1;
      const limit = query.limit || 20;
      const offset = (page - 1) * limit;
      const paginatedResults = filteredResults.slice(offset, offset + limit);

      return {
        success: true,
        data: {
          success: true,
          data: paginatedResults,
          pagination: {
            page,
            limit,
            total: filteredResults.length,
            totalPages: Math.ceil(filteredResults.length / limit),
            hasMore: offset + limit < filteredResults.length,
          },
        },
      };
    } catch (error) {
      return this.handleError(error, 'search');
    }
  }

  /**
   * Get content analytics for a specific content item
   */
  async getAnalytics(
    contentId: string,
    context: ServiceContext,
    options: {
      dateRange?: {
        startDate: string;
        endDate: string;
      };
      includeEngagement?: boolean;
      includeTraffic?: boolean;
      includeSharing?: boolean;
    } = {}
  ): Promise<
    ServiceResult<{
      contentId: string;
      engagementMetrics: {
        totalViews: number;
        uniqueViews: number;
        averageTimeOnPage: number;
        bounceRate: number;
        likeCount: number;
        shareCount: number;
        commentCount: number;
        bookmarkCount: number;
      };
      trafficMetrics?: {
        dailyViews: Array<{
          date: string;
          views: number;
          uniqueViews: number;
        }>;
        referrerSources: Array<{
          source: string;
          views: number;
          percentage: number;
        }>;
        geographicDistribution: Array<{
          country: string;
          views: number;
          percentage: number;
        }>;
      };
      sharingMetrics?: {
        socialShares: Array<{
          platform: string;
          shares: number;
          percentage: number;
        }>;
        emailShares: number;
        directShares: number;
      };
    }>
  > {
    try {
      // Business rule: Only author can see their content analytics, or admin
      const content = await this.findById(contentId, context);
      if (!content.success || !content.data) {
        throw new NotFoundError(this.entityName, contentId);
      }

      if (
        content.data.authorId !== context.userId &&
        !AuthHelpers.isOwnerOrAdmin(context)
      ) {
        throw new ForbiddenError(
          'Cannot view analytics for content you did not create'
        );
      }

      // Mock analytics data for now - in real implementation this would come from analytics service
      const analytics = {
        contentId,
        engagementMetrics: {
          totalViews: 1250,
          uniqueViews: 980,
          averageTimeOnPage: 3.5,
          bounceRate: 35,
          likeCount: 45,
          shareCount: 23,
          commentCount: 12,
          bookmarkCount: 8,
        },
        ...(options.includeTraffic && {
          trafficMetrics: {
            dailyViews: [
              { date: new Date().toISOString(), views: 125, uniqueViews: 98 },
            ],
            referrerSources: [
              { source: 'Direct', views: 500, percentage: 40 },
              { source: 'Social', views: 300, percentage: 24 },
              { source: 'Search', views: 450, percentage: 36 },
            ],
            geographicDistribution: [
              { country: 'United States', views: 750, percentage: 60 },
              { country: 'Canada', views: 250, percentage: 20 },
              { country: 'United Kingdom', views: 250, percentage: 20 },
            ],
          },
        }),
        ...(options.includeSharing && {
          sharingMetrics: {
            socialShares: [
              { platform: 'Twitter', shares: 10, percentage: 43 },
              { platform: 'Facebook', shares: 8, percentage: 35 },
              { platform: 'LinkedIn', shares: 5, percentage: 22 },
            ],
            emailShares: 3,
            directShares: 7,
          },
        }),
      };

      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      return this.handleError(error, 'getAnalytics');
    }
  }

  /**
   * Get approval queue for content
   */
  async getApprovalQueue(
    context: ServiceContext,
    options: {
      status?: 'pending' | 'under_review';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<ServiceResult<PaginatedServiceResult<ContentItemResponse>>> {
    try {
      // Business rule: Only admins can view approval queue
      if (!AuthHelpers.isOwnerOrAdmin(context)) {
        throw new ForbiddenError('Only administrators can view approval queue');
      }

      const queryContext = this.mapToQueryContext(context);

      // Get content items that are under review or pending approval
      const results = await getContentItemsWithDetails(queryContext, {
        status: 'under_review' as any,
        limit: options.limit || 50,
        offset: options.offset || 0,
        orderBy: 'created_at',
        orderDirection: 'desc',
      });

      const entities = results.map(result =>
        this.mapDbToEntity(result.content, context)
      );

      const page =
        Math.floor((options.offset || 0) / (options.limit || 50)) + 1;
      const limit = options.limit || 50;

      return {
        success: true,
        data: {
          success: true,
          data: entities,
          pagination: {
            page,
            limit,
            total: entities.length,
            totalPages: Math.ceil(entities.length / limit),
            hasMore: entities.length === limit,
          },
        },
      };
    } catch (error) {
      return this.handleError(error, 'getApprovalQueue');
    }
  }

  /**
   * Schedule content for future publication
   */
  async schedule(
    contentId: string,
    scheduledAt: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentItemResponse>> {
    try {
      // Business rule: Only author can schedule their content, or admin
      const content = await this.findById(contentId, context);
      if (!content.success || !content.data) {
        throw new NotFoundError(this.entityName, contentId);
      }

      if (
        content.data.authorId !== context.userId &&
        !AuthHelpers.isOwnerOrAdmin(context)
      ) {
        throw new ForbiddenError('Cannot schedule content you did not create');
      }

      const updateData: UpdateContentItem = {
        status: 'scheduled',
        scheduledAt,
      };

      return this.update(contentId, updateData, context);
    } catch (error) {
      return this.handleError(error, 'schedule');
    }
  }

  // ============================================================================
  // AUTHORIZATION OVERRIDES
  // ============================================================================

  override canRead(context: ServiceContext, resourceId?: string): boolean {
    // Everyone can read published content, authors can read their own drafts
    return AuthHelpers.hasRole(context, 'viewer');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    // Authors can update their own content, admins can update any
    if (resourceId) {
      // We'd need to fetch the content to check authorId, but for now allow members
      return AuthHelpers.hasRole(context, 'member');
    }
    return AuthHelpers.hasRole(context, 'member');
  }

  override canCreate(context: ServiceContext): boolean {
    // Members can create content
    return AuthHelpers.hasRole(context, 'member');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
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
  UpdateContentCategory,
  Record<string, unknown>
> {
  protected entityName = 'ContentCategory';
  protected createSchema = createContentCategorySchema;
  protected updateSchema = updateContentCategorySchema;
  protected querySchema = {} as any; // Placeholder schema

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
  ): Promise<{
    data: unknown[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
  }> {
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

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
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
  UpdateContentSeries,
  Record<string, unknown>
> {
  protected entityName = 'ContentSeries';
  protected createSchema = createContentSeriesSchema;
  protected updateSchema = updateContentSeriesSchema;
  protected querySchema = {} as any; // Placeholder schema

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
  ): Promise<{
    data: unknown[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
  }> {
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

  override canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  override canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  override canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  private mapToQueryContext(context: ServiceContext): QueryContext {
    return {
      userId: context.userId,
      organizationId: context.tenantId,
      role: context.role,
    };
  }

  // ============================================================================
  // MISSING API METHODS - Added for Phase 2 Error Resolution
  // ============================================================================

  /**
   * Publish content series
   */
  async publish(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentSeriesResponse>> {
    try {
      this.enforceUpdateAccess(id, context);

      const queryContext = this.mapToQueryContext(context);
      const result = await updateContentSeries(
        id,
        { status: 'published' },
        queryContext
      );
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'publish');
    }
  }

  /**
   * Archive content series
   */
  async archive(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentSeriesResponse>> {
    try {
      this.enforceUpdateAccess(id, context);

      const queryContext = this.mapToQueryContext(context);
      const result = await updateContentSeries(
        id,
        { status: 'archived' },
        queryContext
      );
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'archive');
    }
  }

  /**
   * Get ministry content series by ID
   */
  async getMinistryContentById(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<ContentSeriesResponse>> {
    try {
      this.enforceReadAccess(id, context);

      const queryContext = this.mapToQueryContext(context);
      const result = await getContentSeriesById(id, queryContext);
      if (!result) {
        throw new NotFoundError(this.entityName, id);
      }

      const entity = this.mapDbToEntity(result, context);
      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'getMinistryContentById');
    }
  }

  /**
   * Update ministry content series
   */
  async updateMinistryContent(
    id: string,
    data: UpdateContentSeries,
    context: ServiceContext
  ): Promise<ServiceResult<ContentSeriesResponse>> {
    try {
      return this.update(id, data, context);
    } catch (error) {
      return this.handleError(error, 'updateMinistryContent');
    }
  }

  /**
   * Delete ministry content
   */
  async deleteMinistryContent(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      return this.delete(id, context);
    } catch (error) {
      return this.handleError(error, 'deleteMinistryContent');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type CreateContentItemInput = CreateContentItem;
export type CreateContentItemOutput = ContentItemResponse;
export type UpdateContentItemInput = UpdateContentItem;
export type UpdateContentItemOutput = ContentItemResponse;
export type ContentItemQueryInput = Record<string, unknown>;
export type ContentItemListOutput = PaginatedServiceResult<ContentItemResponse>;

export type CreateContentCategoryInput = CreateContentCategory;
export type CreateContentCategoryOutput = ContentCategoryResponse;
export type UpdateContentCategoryInput = UpdateContentCategory;
export type UpdateContentCategoryOutput = ContentCategoryResponse;

export type CreateContentSeriesInput = CreateContentSeries;
export type CreateContentSeriesOutput = ContentSeriesResponse;
export type UpdateContentSeriesInput = UpdateContentSeries;
export type UpdateContentSeriesOutput = ContentSeriesResponse;
