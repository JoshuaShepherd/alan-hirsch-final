// Content Data Hooks
// Specialized hooks for content data management

import { useSWRPaginatedResponse, useSWRDataState } from './useDataState';
import type { ContentItem } from '@platform/shared/contracts';

// ============================================================================
// CONTENT HOOKS
// ============================================================================

/**
 * Hook for fetching content items with pagination
 * Returns PaginatedDataState<ContentItem> format
 */
export function useContentItems(params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.status) searchParams.set('status', params.status);
  if (params?.category) searchParams.set('category', params.category);
  
  const url = `/api/content${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  return useSWRPaginatedResponse<ContentItem>(url);
}

/**
 * Hook for fetching a specific content item by slug
 * Returns DataState<ContentItem> format
 */
export function useContentBySlug(slug: string) {
  return useSWRDataState<ContentItem>(
    slug ? `/api/content?slug=${slug}` : null
  );
}

/**
 * Hook for fetching a specific content item by ID
 * Returns DataState<ContentItem> format
 */
export function useContentById(contentId: string) {
  return useSWRDataState<ContentItem>(
    contentId ? `/api/content/${contentId}` : null
  );
}

/**
 * Adapter hook for components expecting the old format
 * Returns { items: ContentItem[], pagination, error, isLoading }
 */
export function useContentItemsAdapter(params?: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
}) {
  const dataState = useContentItems(params);
  
  return {
    items: dataState.data || [],
    pagination: dataState.pagination,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Adapter hook for content by slug expecting the old format
 * Returns { content: ContentItem | null, error, isLoading }
 */
export function useContentBySlugAdapter(slug: string) {
  const dataState = useContentBySlug(slug);
  
  return {
    content: dataState.data,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Hook for content categories
 * Returns DataState<ContentCategory[]> format
 */
export function useContentCategories() {
  return useSWRDataState<any[]>('/api/content/categories');
}

/**
 * Hook for content series
 * Returns DataState<ContentSeries[]> format
 */
export function useContentSeries() {
  return useSWRDataState<any[]>('/api/content/series');
}
