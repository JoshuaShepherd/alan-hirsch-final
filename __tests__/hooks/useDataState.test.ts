// ============================================================================
// DATA STATE HOOKS TESTS
// ============================================================================
// Tests for core data state management hooks

import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  useDataState,
  useMutation,
  usePaginatedDataState,
  useSWRDataState,
} from '../../apps/alan-hirsch-platform/hooks/useDataState';
import { normalizeApiError } from '../../apps/alan-hirsch-platform/lib/api-client';

// Mock SWR
vi.mock('swr', () => ({
  default: vi.fn(),
}));

// Mock API client
vi.mock('../../apps/alan-hirsch-platform/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  normalizeApiError: vi.fn(),
}));

describe('useDataState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    const fetchFn = vi.fn().mockResolvedValue({ id: '1', name: 'Test' });

    const { result } = renderHook(() => useDataState(fetchFn));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return success state after successful fetch', async () => {
    const mockData = { id: '1', name: 'Test' };
    const fetchFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useDataState(fetchFn));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('should return error state after failed fetch', async () => {
    const mockError = new Error('Test error');
    const fetchFn = vi.fn().mockRejectedValue(mockError);
    vi.mocked(normalizeApiError).mockReturnValue({
      code: 'TEST_ERROR',
      message: 'Test error',
    });

    const { result } = renderHook(() => useDataState(fetchFn));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Test error');
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});

describe('usePaginatedDataState', () => {
  it('should return paginated data state', async () => {
    const mockData = {
      items: [{ id: '1', name: 'Test' }],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    };
    const fetchFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => usePaginatedDataState(fetchFn, 1, 10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData.items);
    expect(result.current.pagination).toEqual(mockData.pagination);
    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useSWRDataState', () => {
  it('should return data state from SWR', () => {
    const mockData = { id: '1', name: 'Test' };
    const mockSWR = vi.fn().mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    vi.mocked(require('swr').default).mockImplementation(mockSWR);

    const { result } = renderHook(() => useSWRDataState('/api/test'));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('should handle SWR error', () => {
    const mockError = new Error('SWR error');
    const mockSWR = vi.fn().mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    vi.mocked(require('swr').default).mockImplementation(mockSWR);
    vi.mocked(normalizeApiError).mockReturnValue({
      code: 'SWR_ERROR',
      message: 'SWR error',
    });

    const { result } = renderHook(() => useSWRDataState('/api/test'));

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('SWR error');
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});

describe('useMutation', () => {
  it('should return initial mutation state', () => {
    const mutationFn = vi.fn();

    const { result } = renderHook(() => useMutation(mutationFn));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should execute mutation successfully', async () => {
    const mockData = { id: '1', name: 'Test' };
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useMutation(mutationFn));

    const mutatePromise = result.current.mutate({ name: 'Test' });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await mutatePromise;

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('should handle mutation error', async () => {
    const mockError = new Error('Mutation error');
    const mutationFn = vi.fn().mockRejectedValue(mockError);
    vi.mocked(normalizeApiError).mockReturnValue({
      code: 'MUTATION_ERROR',
      message: 'Mutation error',
    });

    const { result } = renderHook(() => useMutation(mutationFn));

    try {
      await result.current.mutate({ name: 'Test' });
    } catch (error) {
      // Expected to throw
    }

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Mutation error');
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(true);
  });

  it('should reset mutation state', () => {
    const mutationFn = vi.fn();

    const { result } = renderHook(() => useMutation(mutationFn));

    // Simulate a successful mutation
    result.current.data = { id: '1', name: 'Test' };
    result.current.isSuccess = true;

    result.current.reset();

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
