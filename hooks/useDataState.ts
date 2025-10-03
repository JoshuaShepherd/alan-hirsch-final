// Data State Management Hooks
// Centralized hooks for consistent data fetching and state management

import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import type { DataState, PaginatedDataState } from '@/lib/contracts';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ============================================================================
// CORE DATA STATE HOOKS
// ============================================================================

/**
 * Generic hook for managing data state with loading, error, and success states
 */
export function useDataState<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): DataState<T> {
  const [state, setState] = useState<DataState<T>>({
    data: null,
    isLoading: true,
    error: null,
    isSuccess: false,
    isError: false,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, isError: false }));
      const data = await fetchFn();
      setState({
        data,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        isSuccess: false,
        isError: true,
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}

/**
 * Hook for managing paginated data state
 */
export function usePaginatedDataState<T>(
  fetchFn: (page: number, limit: number) => Promise<{ items: T[]; pagination: any }>,
  page: number = 1,
  limit: number = 10
): PaginatedDataState<T> {
  const [state, setState] = useState<PaginatedDataState<T>>({
    data: null,
    isLoading: true,
    error: null,
    isSuccess: false,
    isError: false,
    pagination: undefined,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, isError: false }));
      const result = await fetchFn(page, limit);
      setState({
        data: result.items,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
        pagination: result.pagination,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        isSuccess: false,
        isError: true,
        pagination: undefined,
      });
    }
  }, [fetchFn, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}

// ============================================================================
// SWR-BASED HOOKS
// ============================================================================

/**
 * SWR hook that returns DataState format
 */
export function useSWRDataState<T>(
  url: string | null,
  fetcherFn: (url: string) => Promise<T> = fetcher
): DataState<T> {
  const { data, error, isLoading } = useSWR<T>(url, fetcherFn);

  return {
    data: data || null,
    isLoading,
    error: error?.message || null,
    isSuccess: !isLoading && !error && data !== undefined,
    isError: !!error,
  };
}

/**
 * SWR hook for API responses that wrap data in { data: T, success: boolean }
 */
export function useSWRApiResponse<T>(
  url: string | null,
  fetcherFn: (url: string) => Promise<{ data: T; success: boolean }> = fetcher
): DataState<T> {
  const { data, error, isLoading } = useSWR<{ data: T; success: boolean }>(url, fetcherFn);

  return {
    data: data?.data || null,
    isLoading,
    error: error?.message || null,
    isSuccess: !isLoading && !error && data?.success === true,
    isError: !!error || (data?.success === false),
  };
}

/**
 * SWR hook for paginated API responses
 */
export function useSWRPaginatedResponse<T>(
  url: string | null,
  fetcherFn: (url: string) => Promise<{ items: T[]; pagination: any }> = fetcher
): PaginatedDataState<T> {
  const { data, error, isLoading } = useSWR<{ items: T[]; pagination: any }>(url, fetcherFn);

  return {
    data: data?.items || null,
    isLoading,
    error: error?.message || null,
    isSuccess: !isLoading && !error && data !== undefined,
    isError: !!error,
    pagination: data?.pagination,
  };
}

// ============================================================================
// ADAPTER HOOKS
// ============================================================================

/**
 * Adapter hook for components expecting the old SWR format
 * Returns { data, error, isLoading } for backward compatibility
 */
export function useSWRAdapter<T>(
  url: string | null,
  fetcherFn?: (url: string) => Promise<T>
) {
  const dataState = useSWRDataState(url, fetcherFn);
  
  return {
    data: dataState.data,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Adapter hook for API responses with { data, success } format
 * Returns the old format for backward compatibility
 */
export function useApiResponseAdapter<T>(
  url: string | null,
  fetcherFn?: (url: string) => Promise<{ data: T; success: boolean }>
) {
  const dataState = useSWRApiResponse(url, fetcherFn);
  
  return {
    data: dataState.isSuccess ? { data: dataState.data, success: true } : undefined,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Adapter hook for paginated responses
 * Returns { items, pagination } format for backward compatibility
 */
export function usePaginatedAdapter<T>(
  url: string | null,
  fetcherFn?: (url: string) => Promise<{ items: T[]; pagination: any }>
) {
  const dataState = useSWRPaginatedResponse(url, fetcherFn);
  
  return {
    items: dataState.data || [],
    pagination: dataState.pagination,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}
