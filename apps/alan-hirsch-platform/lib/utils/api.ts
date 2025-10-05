// ============================================================================
// API UTILITIES
// ============================================================================
// Shared utilities for API operations, error handling, and data transformation
// Aligned with @platform/contracts for type safety

import type { PaginatedResponse } from '@platform/contracts';
import { z } from 'zod';
import type { PaginationParams } from '../api-client';
import { normalizeApiError } from '../api-client';

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  baseUrl:
    typeof window !== 'undefined'
      ? ''
      : process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
} as const;

// ============================================================================
// ENDPOINT BUILDERS
// ============================================================================

export const API_ENDPOINTS = {
  // User endpoints
  users: {
    list: '/api/users',
    byId: (id: string) => `/api/users/${id}`,
    profile: '/api/user/profile',
    updateProfile: '/api/user/profile',
    assessmentScores: '/api/user/assessment-scores',
  },

  // Assessment endpoints
  assessments: {
    list: '/api/assessments',
    byId: (id: string) => `/api/assessments/${id}`,
    questions: (id: string) => `/api/assessments/${id}/questions`,
    statistics: (id: string) => `/api/assessments/${id}/statistics`,
    userAssessments: '/api/user/assessments',
    userAssessmentById: (id: string) => `/api/user/assessments/${id}`,
    userAssessmentResponses: (id: string) =>
      `/api/user/assessments/${id}/responses`,
    userAssessmentComplete: (id: string) =>
      `/api/user/assessments/${id}/complete`,
    userAssessmentInsights: (id: string) =>
      `/api/user/assessments/${id}/insights`,
  },

  // Content endpoints
  content: {
    list: '/api/content',
    byId: (id: string) => `/api/content/${id}`,
    bySlug: (slug: string) => `/api/content/slug/${slug}`,
    categories: '/api/content/categories',
    series: '/api/content/series',
    analytics: (id: string) => `/api/content/${id}/analytics`,
    performance: (id: string) => `/api/content/${id}/performance`,
    publish: (id: string) => `/api/content/${id}/publish`,
    schedule: (id: string) => `/api/content/${id}/schedule`,
  },

  // Organization endpoints
  organizations: {
    list: '/api/organizations',
    byId: (id: string) => `/api/organizations/${id}`,
    bySubdomain: (subdomain: string) =>
      `/api/organizations/subdomain/${subdomain}`,
    members: (id: string) => `/api/organizations/${id}/members`,
    memberships: (id: string) => `/api/organizations/${id}/memberships`,
    invite: (id: string) => `/api/organizations/${id}/invite`,
    dashboard: (id: string) => `/api/organizations/${id}/dashboard`,
    statistics: (id: string) => `/api/organizations/${id}/statistics`,
  },
} as const;

// ============================================================================
// QUERY BUILDERS
// ============================================================================

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  [key: string]: unknown;
}

/**
 * Build query string from parameters
 */
export function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Build URL with query parameters
 */
export function buildUrl(endpoint: string, params?: QueryParams): string {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }

  const queryString = buildQueryString(params);
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

// ============================================================================
// PAGINATION UTILITIES
// ============================================================================

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Create pagination parameters
 */
export function createPaginationParams(
  page: number = 1,
  limit: number = 10,
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): PaginationParams {
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    sortBy,
    sortOrder,
  };
}

/**
 * Calculate pagination info from response
 */
export function calculatePaginationInfo(
  page: number,
  limit: number,
  total: number
): PaginationInfo {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('NetworkError'))
  );
}

/**
 * Check if error is a timeout error
 */
export function isTimeoutError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('timeout') ||
      error.message.includes('TimeoutError') ||
      error.name === 'AbortError')
  );
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('validation') ||
      error.message.includes('ValidationError') ||
      error.name === 'ValidationError')
  );
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  const normalizedError = normalizeApiError(error);

  // Map common error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    VALIDATION_ERROR: 'Please check your input and try again',
    NETWORK_ERROR:
      'Network connection failed. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    FORBIDDEN: 'Access denied',
    NOT_FOUND: 'The requested resource was not found',
    CONFLICT: 'This action conflicts with existing data',
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
  };

  return errorMessages[normalizedError.code] || normalizedError.message;
}

/**
 * Get error severity level
 */
export function getErrorSeverity(error: unknown): 'low' | 'medium' | 'high' {
  const normalizedError = normalizeApiError(error);

  const highSeverityCodes = ['SERVER_ERROR', 'NETWORK_ERROR', 'TIMEOUT_ERROR'];
  const mediumSeverityCodes = ['VALIDATION_ERROR', 'CONFLICT', 'RATE_LIMITED'];

  if (highSeverityCodes.includes(normalizedError.code)) {
    return 'high';
  }

  if (mediumSeverityCodes.includes(normalizedError.code)) {
    return 'medium';
  }

  return 'low';
}

// ============================================================================
// RESPONSE TRANSFORMERS
// ============================================================================

/**
 * Transform API response to standard format
 */
export function transformApiResponse<T>(response: unknown): T {
  // Handle different response formats
  if (response && typeof response === 'object') {
    const responseObj = response as Record<string, unknown>;

    // If response has a 'data' field, extract it
    if ('data' in responseObj) {
      return responseObj.data as T;
    }

    // If response has a 'success' field and is successful, extract data
    if (
      'success' in responseObj &&
      responseObj.success === true &&
      'data' in responseObj
    ) {
      return responseObj.data as T;
    }
  }

  return response as T;
}

/**
 * Transform paginated response to standard format
 */
export function transformPaginatedResponse<T>(response: unknown): {
  items: T[];
  pagination: PaginationInfo;
} {
  const transformed = transformApiResponse<{
    data: T[];
    meta: {
      pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
      };
    };
  }>(response);

  return {
    items: transformed.data || [],
    pagination: {
      page: transformed.meta.pagination.page,
      limit: transformed.meta.pagination.limit,
      total: transformed.meta.pagination.total,
      totalPages: transformed.meta.pagination.total_pages,
      hasNext: transformed.meta.pagination.has_next,
      hasPrev: transformed.meta.pagination.has_prev,
    },
  };
}

// ============================================================================
// CACHE UTILITIES
// ============================================================================

/**
 * Generate cache key for API requests
 */
export function generateCacheKey(
  endpoint: string,
  params?: QueryParams
): string {
  const baseKey = endpoint.replace(/[^a-zA-Z0-9]/g, '_');

  if (!params || Object.keys(params).length === 0) {
    return baseKey;
  }

  const paramString = buildQueryString(params);
  return `${baseKey}_${paramString}`;
}

/**
 * Check if cache entry is expired
 */
export function isCacheExpired(
  timestamp: number,
  ttl: number = 300000
): boolean {
  return Date.now() - timestamp > ttl;
}

// ============================================================================
// AUTHENTICATION UTILITIES
// ============================================================================

/**
 * Get authentication token from storage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('auth_token');
}

/**
 * Set authentication token in storage
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('auth_token', token);
}

/**
 * Remove authentication token from storage
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem('auth_token');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// ============================================================================
// DEBUG UTILITIES
// ============================================================================

/**
 * Log API request for debugging
 */
export function logApiRequest(
  method: string,
  endpoint: string,
  params?: QueryParams,
  data?: unknown
): void {
  if (process.env['NODE_ENV'] === 'development') {
    console.group(`🌐 API Request: ${method} ${endpoint}`);
    if (params) console.log('Params:', params);
    if (data) console.log('Data:', data);
    console.groupEnd();
  }
}

/**
 * Log API response for debugging
 */
export function logApiResponse(
  method: string,
  endpoint: string,
  response: unknown,
  duration: number
): void {
  if (process.env['NODE_ENV'] === 'development') {
    console.group(`✅ API Response: ${method} ${endpoint} (${duration}ms)`);
    console.log('Response:', response);
    console.groupEnd();
  }
}

/**
 * Log API error for debugging
 */
export function logApiError(
  method: string,
  endpoint: string,
  error: unknown,
  duration: number
): void {
  if (process.env['NODE_ENV'] === 'development') {
    console.group(`❌ API Error: ${method} ${endpoint} (${duration}ms)`);
    console.error('Error:', error);
    console.groupEnd();
  }
}

// ============================================================================
// CONTRACT-ALIGNED UTILITIES
// ============================================================================

/**
 * Create a typed fetcher function for SWR using apiClient
 */
export function createTypedFetcher<T>(
  schema: z.ZodSchema<T>
): (url: string) => Promise<T> {
  return async (url: string): Promise<T> => {
    const { apiClient } = await import('../api-client');
    return apiClient.getWithValidation(url, schema);
  };
}

/**
 * Create a typed fetcher for API responses using apiClient
 */
export function createApiResponseFetcher<T>(
  schema: z.ZodSchema<T>
): (url: string) => Promise<T> {
  return async (url: string): Promise<T> => {
    const { apiClient } = await import('../api-client');
    return apiClient.getWithValidation(url, schema);
  };
}

/**
 * Create a typed fetcher for paginated responses using apiClient
 */
export function createPaginatedFetcher<T>(
  itemSchema: z.ZodSchema<T>
): (url: string) => Promise<PaginatedResponse<T>> {
  const paginatedSchema = z.object({
    data: z.array(itemSchema),
    meta: z.object({
      pagination: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        total_pages: z.number(),
        has_next: z.boolean(),
        has_prev: z.boolean(),
      }),
    }),
  });

  return async (url: string): Promise<PaginatedResponse<T>> => {
    const { apiClient } = await import('../api-client');
    return apiClient.getWithValidation(url, paginatedSchema);
  };
}

/**
 * Create a mutation function with validation using apiClient
 */
export function createTypedMutation<TData, TVariables>(
  endpoint: string,
  requestSchema: z.ZodSchema<TVariables>,
  responseSchema: z.ZodSchema<TData>,
  method: 'POST' | 'PUT' | 'PATCH' = 'POST'
): (variables: TVariables) => Promise<TData> {
  return async (variables: TVariables): Promise<TData> => {
    const { apiClient } = await import('../api-client');

    // Validate request data
    const validatedData = requestSchema.parse(variables);

    switch (method) {
      case 'POST':
        return apiClient.postWithValidation(
          endpoint,
          validatedData,
          responseSchema
        );
      case 'PUT':
        return apiClient.putWithValidation(
          endpoint,
          validatedData,
          responseSchema
        );
      case 'PATCH':
        return apiClient.patchWithValidation(
          endpoint,
          validatedData,
          responseSchema
        );
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };
}

/**
 * Create a delete mutation function using apiClient
 */
export function createDeleteMutation<TData>(
  endpointBuilder: (id: string) => string,
  responseSchema: z.ZodSchema<TData>
): (id: string) => Promise<TData> {
  return async (id: string): Promise<TData> => {
    const { apiClient } = await import('../api-client');
    return apiClient.deleteWithValidation(endpointBuilder(id), responseSchema);
  };
}

// ============================================================================
// HOOK UTILITIES
// ============================================================================

/**
 * Create a cache key for API requests
 */
export function createCacheKey(
  endpoint: string,
  params?: Record<string, unknown>
): string {
  const baseKey = endpoint.replace(/[^a-zA-Z0-9]/g, '_');

  if (!params || Object.keys(params).length === 0) {
    return baseKey;
  }

  const paramString = buildQueryString(params);
  return `${baseKey}_${paramString}`;
}

/**
 * Create a conditional cache key (returns null if condition is false)
 */
export function createConditionalCacheKey(
  condition: boolean,
  endpoint: string,
  params?: Record<string, unknown>
): string | null {
  return condition ? createCacheKey(endpoint, params) : null;
}

/**
 * Create a cache key with ID
 */
export function createEntityCacheKey(
  endpoint: string,
  id: string,
  params?: Record<string, unknown>
): string | null {
  return id ? createCacheKey(endpoint.replace(':id', id), params) : null;
}
