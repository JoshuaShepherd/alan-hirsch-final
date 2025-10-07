// Data State Management Hooks
// Centralized hooks for consistent data fetching and state management
// Aligned with @/lib/contracts for type safety

import type { ApiResponse, PaginatedResponse } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { apiClient, normalizeApiError } from '../lib/api-client';
import { logApiError, logApiRequest, logApiResponse } from '../lib/utils/api';

// ============================================================================
// TYPES
// ============================================================================

export interface DataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

export interface PaginatedDataState<T> extends DataState<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MutationState<TData = unknown, TVariables = unknown> {
  data: TData | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  mutate: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const fetcher = async (url: string) => {
  const startTime = Date.now();
  logApiRequest('GET', url);

  try {
    const response = await apiClient.get<ApiResponse<unknown>>(url);
    const duration = Date.now() - startTime;
    logApiResponse('GET', url, response, duration);
    return response; // Return the full response instead of transforming it
  } catch (error) {
    const duration = Date.now() - startTime;
    logApiError('GET', url, error, duration);
    throw error;
  }
};

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
      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        isError: false,
      }));
      const data = await fetchFn();
      setState({
        data,
        isLoading: false,
        error: null,
        isSuccess: true,
        isError: false,
      });
    } catch (error) {
      const normalizedError = normalizeApiError(error);
      setState({
        data: null,
        isLoading: false,
        error: normalizedError.message,
        isSuccess: false,
        isError: true,
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

/**
 * Hook for managing paginated data state
 */
export function usePaginatedDataState<T>(
  fetchFn: (
    page: number,
    limit: number
  ) => Promise<{ items: T[]; pagination: any }>,
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
      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        isError: false,
      }));
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
      const normalizedError = normalizeApiError(error);
      setState({
        data: null,
        isLoading: false,
        error: normalizedError.message,
        isSuccess: false,
        isError: true,
        pagination: undefined,
      });
    }
  }, [fetchFn, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
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
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcherFn);

  return {
    data: data || null,
    isLoading,
    error: error ? normalizeApiError(error).message : null,
    isSuccess: !isLoading && !error && data !== undefined,
    isError: !!error,
    refetch: async () => {
      await mutate();
    },
  };
}

/**
 * SWR hook for API responses that wrap data in { data: T, success: boolean }
 */
export function useSWRApiResponse<T>(
  url: string | null,
  fetcherFn: (url: string) => Promise<ApiResponse<T>> = fetcher
): DataState<T> {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<T>>(
    url,
    fetcherFn
  );

  return {
    data: data?.data || null,
    isLoading,
    error: error ? normalizeApiError(error).message : null,
    isSuccess: !isLoading && !error && data?.success === true,
    isError: !!error || data?.success === false,
    refetch: async () => {
      await mutate();
    },
  };
}

/**
 * SWR hook for paginated API responses
 */
export function useSWRPaginatedResponse<T>(
  url: string | null,
  fetcherFn: (url: string) => Promise<PaginatedResponse<T>> = fetcher
): PaginatedDataState<T> {
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<T>>(
    url,
    fetcherFn
  );

  return {
    data: data?.data || null,
    isLoading,
    error: error ? normalizeApiError(error).message : null,
    isSuccess: !isLoading && !error && data !== undefined,
    isError: !!error,
    refetch: async () => {
      await mutate();
    },
    pagination: data?.meta?.pagination
      ? {
          page: data.meta.pagination.page,
          limit: data.meta.pagination.limit,
          total: data.meta.pagination.total,
          totalPages: data.meta.pagination.total_pages,
          hasNext: data.meta.pagination.has_next,
          hasPrev: data.meta.pagination.has_prev,
        }
      : undefined,
  };
}

// ============================================================================
// MUTATION HOOKS
// ============================================================================

/**
 * Generic mutation hook for API operations
 */
export function useMutation<TData, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>
): MutationState<TData, TVariables> {
  const [state, setState] = useState<MutationState<TData, TVariables>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    mutate: async () => {
      throw new Error('Mutate function not initialized');
    },
    reset: () => {},
  });

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        isError: false,
      }));

      try {
        const data = await mutationFn(variables);
        setState(prev => ({
          ...prev,
          data,
          isLoading: false,
          error: null,
          isSuccess: true,
          isError: false,
        }));
        return data;
      } catch (error) {
        const normalizedError = normalizeApiError(error);
        setState(prev => ({
          ...prev,
          data: null,
          isLoading: false,
          error: normalizedError.message,
          isSuccess: false,
          isError: true,
        }));
        throw error;
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
      isError: false,
      mutate,
      reset,
    });
  }, [mutate]);

  return {
    ...state,
    mutate,
    reset,
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
  fetcherFn?: (url: string) => Promise<ApiResponse<T>>
) {
  const dataState = useSWRApiResponse(url, fetcherFn);

  return {
    data: dataState.isSuccess
      ? { data: dataState.data, success: true }
      : undefined,
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
  fetcherFn?: (url: string) => Promise<PaginatedResponse<T>>
) {
  const dataState = useSWRPaginatedResponse(url, fetcherFn);

  return {
    items: dataState.data || [],
    pagination: dataState.pagination,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}
