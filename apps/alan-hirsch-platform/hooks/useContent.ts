// Content Data Hooks
// Specialized hooks for content data management
// Aligned with @platform/contracts for type safety

import type {
  ContentCategoryResponse,
  ContentItemQuery,
  ContentItemResponse,
  ContentSeriesResponse,
  CreateContentItemApiRequest,
  PublishContentItemApiRequest,
  ScheduleContentItemApiRequest,
  UpdateContentItem,
  UpdateContentItemApiRequest,
} from '@platform/contracts';
import {
  contentCategoryResponseSchema,
  contentItemResponseSchema,
  contentSeriesResponseSchema,
  createContentItemSchema,
  updateContentItemSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { apiClient } from '../lib/api-client';
import {
  API_ENDPOINTS,
  buildQueryString,
  createApiResponseFetcher,
  createPaginatedFetcher,
} from '../lib/utils/api';
import {
  useMutation,
  useSWRApiResponse,
  useSWRPaginatedResponse,
} from './useDataState';

// ============================================================================
// CONTENT ITEM HOOKS
// ============================================================================

/**
 * Hook for fetching content items with pagination and filtering
 * Returns PaginatedDataState<ContentItemResponse> format
 */
export function useContentItems(params?: ContentItemQuery) {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_ENDPOINTS.content.list}${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(contentItemResponseSchema);
  return useSWRPaginatedResponse<ContentItemResponse>(url, fetcher);
}

/**
 * Hook for fetching a specific content item by ID
 * Returns DataState<ContentItemResponse> format
 */
export function useContentById(contentId: string) {
  const fetcher = createApiResponseFetcher(contentItemResponseSchema);
  return useSWRApiResponse<ContentItemResponse>(
    contentId ? API_ENDPOINTS.content.byId(contentId) : null,
    fetcher
  );
}

/**
 * Hook for fetching a specific content item by slug
 * Returns DataState<ContentItemResponse> format
 */
export function useContentBySlug(slug: string) {
  const fetcher = createApiResponseFetcher(contentItemResponseSchema);
  return useSWRApiResponse<ContentItemResponse>(
    slug ? API_ENDPOINTS.content.bySlug(slug) : null,
    fetcher
  );
}

// ============================================================================
// CONTENT MUTATION HOOKS
// ============================================================================

/**
 * Hook for creating a new content item
 * Returns mutation functions and state
 */
export function useCreateContentItem() {
  return useMutation<ContentItemResponse, CreateContentItemApiRequest>(
    async data => {
      // Validate request data
      const validatedData = createContentItemSchema.parse(data);

      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.content.list,
        validatedData,
        contentItemResponseSchema
      );
    }
  );
}

/**
 * Hook for updating an existing content item
 * Returns mutation functions and state
 */
export function useUpdateContentItem() {
  return useMutation<ContentItemResponse, UpdateContentItemApiRequest>(
    async data => {
      // Validate request data
      const validatedData = updateContentItemSchema.parse(data);

      // Make API call with validation
      return apiClient.patchWithValidation(
        API_ENDPOINTS.content.byId(data.id),
        validatedData,
        contentItemResponseSchema
      );
    }
  );
}

/**
 * Hook for publishing a content item
 * Returns mutation functions and state
 */
export function usePublishContentItem() {
  return useMutation<ContentItemResponse, PublishContentItemApiRequest>(
    async data => {
      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.content.publish(data.id),
        data,
        contentItemResponseSchema
      );
    }
  );
}

/**
 * Hook for scheduling a content item
 * Returns mutation functions and state
 */
export function useScheduleContentItem() {
  return useMutation<ContentItemResponse, ScheduleContentItemApiRequest>(
    async data => {
      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.content.schedule(data.id),
        data,
        contentItemResponseSchema
      );
    }
  );
}

// ============================================================================
// CONTENT CATEGORY HOOKS
// ============================================================================

/**
 * Hook for fetching content categories
 * Returns DataState<ContentCategoryResponse[]> format
 */
export function useContentCategories() {
  const fetcher = createApiResponseFetcher(
    z.array(contentCategoryResponseSchema)
  );
  return useSWRApiResponse<ContentCategoryResponse[]>(
    API_ENDPOINTS.content.categories,
    fetcher
  );
}

// ============================================================================
// CONTENT SERIES HOOKS
// ============================================================================

/**
 * Hook for fetching content series
 * Returns DataState<ContentSeriesResponse[]> format
 */
export function useContentSeries() {
  const fetcher = createApiResponseFetcher(
    z.array(contentSeriesResponseSchema)
  );
  return useSWRApiResponse<ContentSeriesResponse[]>(
    API_ENDPOINTS.content.series,
    fetcher
  );
}

// ============================================================================
// ADAPTER HOOKS (for backward compatibility)
// ============================================================================

/**
 * Adapter hook for components expecting the old format
 * Returns { items: ContentItemResponse[], pagination, error, isLoading }
 */
export function useContentItemsAdapter(params?: ContentItemQuery) {
  const dataState = useContentItems(params);

  return {
    items: dataState.data || [],
    pagination: dataState.pagination,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Adapter hook for content by slug with old format
 * Returns { content: ContentItemResponse | null, error, isLoading }
 */
export function useContentBySlugAdapter(slug: string) {
  const dataState = useContentBySlug(slug);

  return {
    content: dataState.data,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

// ============================================================================
// CONTENT ANALYTICS HOOKS
// ============================================================================

/**
 * Hook for fetching content analytics
 * Returns DataState<ContentAnalyticsResponse> format
 */
export function useContentAnalytics(contentId: string) {
  const fetcher = createApiResponseFetcher(
    z.object({
      viewCount: z.number(),
      likeCount: z.number(),
      shareCount: z.number(),
      commentCount: z.number(),
      engagementScore: z.number(),
      lastViewedAt: z.string().datetime().optional(),
    })
  );

  return useSWRApiResponse(
    contentId ? API_ENDPOINTS.content.analytics(contentId) : null,
    fetcher
  );
}

/**
 * Hook for fetching content performance metrics
 * Returns DataState<ContentPerformanceResponse> format
 */
export function useContentPerformance(contentId: string) {
  const fetcher = createApiResponseFetcher(
    z.object({
      totalViews: z.number(),
      uniqueViews: z.number(),
      averageTimeOnPage: z.number(),
      bounceRate: z.number(),
      conversionRate: z.number(),
      topReferrers: z.array(
        z.object({
          source: z.string(),
          count: z.number(),
        })
      ),
    })
  );

  return useSWRApiResponse(
    contentId ? API_ENDPOINTS.content.performance(contentId) : null,
    fetcher
  );
}

// ============================================================================
// CONTENT SEARCH HOOKS
// ============================================================================

/**
 * Hook for searching content items
 * Returns PaginatedDataState<ContentItemResponse> format
 */
export function useContentSearch(
  query: string,
  filters?: Partial<ContentItemQuery>
) {
  const params = {
    search: query,
    ...filters,
  };

  const queryString = buildQueryString(params);
  const url = `${API_ENDPOINTS.content.list}/search${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(contentItemResponseSchema);
  return useSWRPaginatedResponse<ContentItemResponse>(url, fetcher);
}

// ============================================================================
// CONTENT BULK OPERATIONS
// ============================================================================

/**
 * Hook for bulk updating content items
 * Returns mutation functions and state
 */
export function useBulkUpdateContentItems() {
  return useMutation<
    ContentItemResponse[],
    { ids: string[]; updates: Partial<UpdateContentItem> }
  >(async data => {
    // Make API call with validation
    return apiClient.patchWithValidation(
      API_ENDPOINTS.content.list + '/bulk',
      data,
      z.array(contentItemResponseSchema)
    );
  });
}

/**
 * Hook for bulk deleting content items
 * Returns mutation functions and state
 */
export function useBulkDeleteContentItems() {
  return useMutation<{ deletedCount: number }, { ids: string[] }>(
    async data => {
      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.content.list + '/bulk-delete',
        data,
        z.object({
          deletedCount: z.number(),
        })
      );
    }
  );
}
