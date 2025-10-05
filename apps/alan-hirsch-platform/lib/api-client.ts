// ============================================================================
// CENTRALIZED HTTP CLIENT
// ============================================================================
// Typed HTTP client with request/response validation using @platform/contracts
// Provides consistent error handling, authentication, and response normalization

import type { ApiResponse, PaginatedResponse } from '@platform/contracts';
import { z } from 'zod';

// ============================================================================
// TYPES
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiClientConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// ERROR CLASSES
// ============================================================================

export class ApiClientError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export class ValidationError extends ApiClientError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends ApiClientError {
  constructor(message: string) {
    super('NETWORK_ERROR', message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends ApiClientError {
  constructor(message: string) {
    super('TIMEOUT_ERROR', message);
    this.name = 'TimeoutError';
  }
}

// ============================================================================
// API CLIENT CLASS
// ============================================================================

export class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultRetries: number;
  private defaultRetryDelay: number;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || this.getBaseUrl();
    this.defaultTimeout = config.timeout || 30000;
    this.defaultRetries = config.retries || 3;
    this.defaultRetryDelay = config.retryDelay || 1000;
  }

  // ============================================================================
  // PUBLIC METHODS
  // ============================================================================

  /**
   * Make a typed GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    config?: RequestConfig
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * Make a typed POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data,
    });
  }

  /**
   * Make a typed PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data,
    });
  }

  /**
   * Make a typed PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data,
    });
  }

  /**
   * Make a typed DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * Make a typed request with pagination
   */
  async getPaginated<T>(
    endpoint: string,
    pagination?: PaginationParams,
    params?: Record<string, unknown>,
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    const allParams = { ...params, ...pagination };
    return this.get<PaginatedResponse<T>>(endpoint, allParams, config);
  }

  /**
   * Make a typed request with response validation
   */
  async getWithValidation<T>(
    endpoint: string,
    schema: z.ZodSchema<T>,
    params?: Record<string, unknown>,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.get<ApiResponse<T>>(endpoint, params, config);
    return this.validateResponse(response, schema);
  }

  /**
   * Make a typed POST request with validation
   */
  async postWithValidation<T>(
    endpoint: string,
    data: unknown,
    schema: z.ZodSchema<T>,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.post<ApiResponse<T>>(endpoint, data, config);
    return this.validateResponse(response, schema);
  }

  /**
   * Make a typed PUT request with validation
   */
  async putWithValidation<T>(
    endpoint: string,
    data: unknown,
    schema: z.ZodSchema<T>,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.put<ApiResponse<T>>(endpoint, data, config);
    return this.validateResponse(response, schema);
  }

  /**
   * Make a typed PATCH request with validation
   */
  async patchWithValidation<T>(
    endpoint: string,
    data: unknown,
    schema: z.ZodSchema<T>,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.patch<ApiResponse<T>>(endpoint, data, config);
    return this.validateResponse(response, schema);
  }

  /**
   * Make a typed DELETE request with validation
   */
  async deleteWithValidation<T>(
    endpoint: string,
    schema: z.ZodSchema<T>,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.delete<ApiResponse<T>>(endpoint, config);
    return this.validateResponse(response, schema);
  }

  // ============================================================================
  // PRIVATE METHODS
  // ============================================================================

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint}`;
    const timeout = config.timeout || this.defaultTimeout;
    const retries = config.retries ?? this.defaultRetries;

    const requestConfig: RequestInit = {
      method: config.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...config.headers,
      },
    };

    if (config.body) {
      requestConfig.body = JSON.stringify(config.body);
    }

    return this.executeWithRetry<T>(url, requestConfig, timeout, retries);
  }

  private async executeWithRetry<T>(
    url: string,
    requestConfig: RequestInit,
    timeout: number,
    retries: number
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.executeRequest(url, requestConfig, timeout);
        return await this.handleResponse<T>(response);
      } catch (error) {
        lastError = error as Error;

        // Don't retry on validation errors or client errors (4xx)
        if (
          error instanceof ValidationError ||
          (error instanceof ApiClientError &&
            error.status &&
            error.status < 500)
        ) {
          throw error;
        }

        // Don't retry on the last attempt
        if (attempt === retries) {
          break;
        }

        // Wait before retrying
        await this.delay(this.defaultRetryDelay * Math.pow(2, attempt));
      }
    }

    throw lastError!;
  }

  private async executeRequest(
    url: string,
    requestConfig: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...requestConfig,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new TimeoutError(`Request timeout after ${timeout}ms`);
        }
        if (error.message.includes('fetch')) {
          throw new NetworkError('Network error occurred');
        }
      }

      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      let errorData: ApiError | null = null;

      if (isJson) {
        try {
          const data = await response.json();
          errorData = data.error || {
            code: 'HTTP_ERROR',
            message: data.message || `HTTP ${response.status}`,
          };
        } catch {
          // Fallback to generic error
        }
      }

      const code = errorData?.code || 'HTTP_ERROR';
      const message =
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
      const details = errorData?.details;

      throw new ApiClientError(code, message, response.status, details);
    }

    if (!isJson) {
      throw new ValidationError('Expected JSON response');
    }

    try {
      const data = await response.json();
      return data as T;
    } catch (error) {
      throw new ValidationError('Invalid JSON response');
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    if (!params || Object.keys(params).length === 0) {
      return endpoint;
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  }

  private getBaseUrl(): string {
    // In browser, use relative URLs
    if (typeof window !== 'undefined') {
      return '';
    }

    // In server, use environment variable or default
    return process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000';
  }

  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private validateResponse<T>(
    response: ApiResponse<T>,
    schema: z.ZodSchema<T>
  ): T {
    if (!response.success) {
      throw new ValidationError(
        response.error || 'API request failed',
        response.details
      );
    }

    if (!response.data) {
      throw new ValidationError('API response missing data');
    }

    const result = schema.safeParse(response.data);
    if (!result.success) {
      throw new ValidationError('Response validation failed', {
        errors: result.error.errors,
      });
    }

    return result.data;
  }
}

// ============================================================================
// DEFAULT INSTANCE
// ============================================================================

export const apiClient = new ApiClient();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a typed API response validator
 */
export function createResponseValidator<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError('Response validation failed', {
        errors: result.error.errors,
      });
    }
    return result.data;
  };
}

/**
 * Create a typed API request validator
 */
export function createRequestValidator<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError('Request validation failed', {
        errors: result.error.errors,
      });
    }
    return result.data;
  };
}

/**
 * Build pagination query parameters
 */
export function buildPaginationParams(
  params: PaginationParams
): Record<string, string> {
  const result: Record<string, string> = {};

  if (params.page !== undefined) {
    result.page = params.page.toString();
  }
  if (params.limit !== undefined) {
    result.limit = params.limit.toString();
  }
  if (params.sortBy) {
    result.sortBy = params.sortBy;
  }
  if (params.sortOrder) {
    result.sortOrder = params.sortOrder;
  }

  return result;
}

/**
 * Normalize API error to standard format
 */
export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiClientError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
  };
}
