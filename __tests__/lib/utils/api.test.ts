// ============================================================================
// API UTILITIES TESTS
// ============================================================================
// Tests for shared API utilities, error handling, and data transformation

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import {
  API_CONFIG,
  API_ENDPOINTS,
  buildQueryString,
  buildUrl,
  calculatePaginationInfo,
  createApiResponseFetcher,
  createCacheKey,
  createConditionalCacheKey,
  createDeleteMutation,
  createEntityCacheKey,
  createPaginatedFetcher,
  createPaginationParams,
  createTypedFetcher,
  createTypedMutation,
  generateCacheKey,
  getAuthToken,
  getErrorMessage,
  getErrorSeverity,
  isAuthenticated,
  isCacheExpired,
  isNetworkError,
  isTimeoutError,
  isValidationError,
  logApiError,
  logApiRequest,
  logApiResponse,
  removeAuthToken,
  setAuthToken,
  transformApiResponse,
  transformPaginatedResponse,
} from '../../apps/alan-hirsch-platform/lib/utils/api';

// ============================================================================
// MOCK SETUP
// ============================================================================

// Mock console methods
const mockConsoleGroup = vi.fn();
const mockConsoleLog = vi.fn();
const mockConsoleError = vi.fn();
const mockConsoleGroupEnd = vi.fn();

global.console = {
  ...console,
  group: mockConsoleGroup,
  log: mockConsoleLog,
  error: mockConsoleError,
  groupEnd: mockConsoleGroupEnd,
};

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
});

// Mock fetch
global.fetch = vi.fn();

// Mock process.env
const originalEnv = process.env;
beforeEach(() => {
  process.env = { ...originalEnv };
});

// ============================================================================
// TEST SCHEMAS
// ============================================================================

const testSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

const testArraySchema = z.array(testSchema);

// ============================================================================
// TEST DATA
// ============================================================================

const testData = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
};

const testArrayData = [testData];

const testApiResponse = {
  success: true,
  data: testData,
};

const testPaginatedResponse = {
  data: testArrayData,
  meta: {
    pagination: {
      page: 1,
      limit: 10,
      total: 1,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    },
  },
};

// ============================================================================
// TESTS
// ============================================================================

describe('API Configuration', () => {
  it('should have correct default configuration', () => {
    expect(API_CONFIG.baseUrl).toBe('');
    expect(API_CONFIG.timeout).toBe(30000);
    expect(API_CONFIG.retries).toBe(3);
    expect(API_CONFIG.retryDelay).toBe(1000);
  });

  it('should use environment variable for base URL in server', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';

    // Re-import to get updated config
    delete require.cache[
      require.resolve('../../apps/alan-hirsch-platform/lib/utils/api')
    ];
    const {
      API_CONFIG: newConfig,
    } = require('../../apps/alan-hirsch-platform/lib/utils/api');

    expect(newConfig.baseUrl).toBe('https://api.example.com');
  });
});

describe('API Endpoints', () => {
  it('should have correct user endpoints', () => {
    expect(API_ENDPOINTS.users.list).toBe('/api/users');
    expect(API_ENDPOINTS.users.byId('123')).toBe('/api/users/123');
    expect(API_ENDPOINTS.users.profile).toBe('/api/user/profile');
    expect(API_ENDPOINTS.users.updateProfile).toBe('/api/user/profile');
    expect(API_ENDPOINTS.users.assessmentScores).toBe(
      '/api/user/assessment-scores'
    );
  });

  it('should have correct assessment endpoints', () => {
    expect(API_ENDPOINTS.assessments.list).toBe('/api/assessments');
    expect(API_ENDPOINTS.assessments.byId('123')).toBe('/api/assessments/123');
    expect(API_ENDPOINTS.assessments.questions('123')).toBe(
      '/api/assessments/123/questions'
    );
    expect(API_ENDPOINTS.assessments.userAssessments).toBe(
      '/api/user/assessments'
    );
  });

  it('should have correct content endpoints', () => {
    expect(API_ENDPOINTS.content.list).toBe('/api/content');
    expect(API_ENDPOINTS.content.byId('123')).toBe('/api/content/123');
    expect(API_ENDPOINTS.content.bySlug('test-slug')).toBe(
      '/api/content/slug/test-slug'
    );
    expect(API_ENDPOINTS.content.categories).toBe('/api/content/categories');
  });

  it('should have correct organization endpoints', () => {
    expect(API_ENDPOINTS.organizations.list).toBe('/api/organizations');
    expect(API_ENDPOINTS.organizations.byId('123')).toBe(
      '/api/organizations/123'
    );
    expect(API_ENDPOINTS.organizations.bySubdomain('test')).toBe(
      '/api/organizations/subdomain/test'
    );
    expect(API_ENDPOINTS.organizations.members('123')).toBe(
      '/api/organizations/123/members'
    );
  });
});

describe('Query Builders', () => {
  describe('buildQueryString', () => {
    it('should build query string from parameters', () => {
      const params = {
        page: 1,
        limit: 10,
        search: 'test',
        sortBy: 'name',
        sortOrder: 'asc',
      };

      const result = buildQueryString(params);

      expect(result).toBe(
        'page=1&limit=10&search=test&sortBy=name&sortOrder=asc'
      );
    });

    it('should handle undefined and null values', () => {
      const params = {
        page: 1,
        limit: undefined,
        search: null,
        sortBy: 'name',
      };

      const result = buildQueryString(params);

      expect(result).toBe('page=1&sortBy=name');
    });

    it('should handle empty object', () => {
      const result = buildQueryString({});

      expect(result).toBe('');
    });
  });

  describe('buildUrl', () => {
    it('should build URL with query parameters', () => {
      const endpoint = '/api/users';
      const params = {
        page: 1,
        limit: 10,
        search: 'test',
      };

      const result = buildUrl(endpoint, params);

      expect(result).toBe('/api/users?page=1&limit=10&search=test');
    });

    it('should return endpoint without query string when no params', () => {
      const endpoint = '/api/users';

      const result = buildUrl(endpoint);

      expect(result).toBe('/api/users');
    });

    it('should handle empty params object', () => {
      const endpoint = '/api/users';
      const params = {};

      const result = buildUrl(endpoint, params);

      expect(result).toBe('/api/users');
    });
  });
});

describe('Pagination Utilities', () => {
  describe('createPaginationParams', () => {
    it('should create pagination parameters with defaults', () => {
      const result = createPaginationParams();

      expect(result).toEqual({
        page: 1,
        limit: 10,
        sortOrder: 'desc',
      });
    });

    it('should create pagination parameters with custom values', () => {
      const result = createPaginationParams(2, 20, 'name', 'asc');

      expect(result).toEqual({
        page: 2,
        limit: 20,
        sortBy: 'name',
        sortOrder: 'asc',
      });
    });

    it('should enforce minimum page value', () => {
      const result = createPaginationParams(0, 10);

      expect(result.page).toBe(1);
    });

    it('should enforce minimum and maximum limit values', () => {
      const resultMin = createPaginationParams(1, 0);
      const resultMax = createPaginationParams(1, 200);

      expect(resultMin.limit).toBe(1);
      expect(resultMax.limit).toBe(100);
    });
  });

  describe('calculatePaginationInfo', () => {
    it('should calculate pagination info correctly', () => {
      const result = calculatePaginationInfo(2, 10, 25);

      expect(result).toEqual({
        page: 2,
        limit: 10,
        total: 25,
        totalPages: 3,
        hasNext: true,
        hasPrev: true,
      });
    });

    it('should handle first page', () => {
      const result = calculatePaginationInfo(1, 10, 25);

      expect(result.hasNext).toBe(true);
      expect(result.hasPrev).toBe(false);
    });

    it('should handle last page', () => {
      const result = calculatePaginationInfo(3, 10, 25);

      expect(result.hasNext).toBe(false);
      expect(result.hasPrev).toBe(true);
    });

    it('should handle single page', () => {
      const result = calculatePaginationInfo(1, 10, 5);

      expect(result.hasNext).toBe(false);
      expect(result.hasPrev).toBe(false);
    });
  });
});

describe('Error Handling Utilities', () => {
  describe('isNetworkError', () => {
    it('should identify network errors', () => {
      expect(isNetworkError(new Error('fetch failed'))).toBe(true);
      expect(isNetworkError(new Error('network error'))).toBe(true);
      expect(isNetworkError(new Error('NetworkError occurred'))).toBe(true);
    });

    it('should not identify non-network errors', () => {
      expect(isNetworkError(new Error('validation failed'))).toBe(false);
      expect(isNetworkError(new Error('timeout'))).toBe(false);
      expect(isNetworkError('string error')).toBe(false);
    });
  });

  describe('isTimeoutError', () => {
    it('should identify timeout errors', () => {
      const timeoutError = new Error('timeout');
      timeoutError.name = 'AbortError';

      expect(isTimeoutError(new Error('request timeout'))).toBe(true);
      expect(isTimeoutError(new Error('TimeoutError occurred'))).toBe(true);
      expect(isTimeoutError(timeoutError)).toBe(true);
    });

    it('should not identify non-timeout errors', () => {
      expect(isTimeoutError(new Error('network error'))).toBe(false);
      expect(isTimeoutError(new Error('validation failed'))).toBe(false);
    });
  });

  describe('isValidationError', () => {
    it('should identify validation errors', () => {
      const validationError = new Error('validation failed');
      validationError.name = 'ValidationError';

      expect(isValidationError(new Error('validation error'))).toBe(true);
      expect(isValidationError(new Error('ValidationError occurred'))).toBe(
        true
      );
      expect(isValidationError(validationError)).toBe(true);
    });

    it('should not identify non-validation errors', () => {
      expect(isValidationError(new Error('network error'))).toBe(false);
      expect(isValidationError(new Error('timeout'))).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should return user-friendly error messages', () => {
      expect(getErrorMessage({ code: 'VALIDATION_ERROR' })).toBe(
        'Please check your input and try again'
      );
      expect(getErrorMessage({ code: 'NETWORK_ERROR' })).toBe(
        'Network connection failed. Please check your internet connection.'
      );
      expect(getErrorMessage({ code: 'TIMEOUT_ERROR' })).toBe(
        'Request timed out. Please try again.'
      );
      expect(getErrorMessage({ code: 'UNAUTHORIZED' })).toBe(
        'You are not authorized to perform this action'
      );
      expect(getErrorMessage({ code: 'NOT_FOUND' })).toBe(
        'The requested resource was not found'
      );
    });

    it('should return original message for unknown errors', () => {
      expect(
        getErrorMessage({ code: 'UNKNOWN_ERROR', message: 'Custom error' })
      ).toBe('Custom error');
    });
  });

  describe('getErrorSeverity', () => {
    it('should return high severity for critical errors', () => {
      expect(getErrorSeverity({ code: 'SERVER_ERROR' })).toBe('high');
      expect(getErrorSeverity({ code: 'NETWORK_ERROR' })).toBe('high');
      expect(getErrorSeverity({ code: 'TIMEOUT_ERROR' })).toBe('high');
    });

    it('should return medium severity for recoverable errors', () => {
      expect(getErrorSeverity({ code: 'VALIDATION_ERROR' })).toBe('medium');
      expect(getErrorSeverity({ code: 'CONFLICT' })).toBe('medium');
      expect(getErrorSeverity({ code: 'RATE_LIMITED' })).toBe('medium');
    });

    it('should return low severity for other errors', () => {
      expect(getErrorSeverity({ code: 'NOT_FOUND' })).toBe('low');
      expect(getErrorSeverity({ code: 'UNAUTHORIZED' })).toBe('low');
    });
  });
});

describe('Response Transformers', () => {
  describe('transformApiResponse', () => {
    it('should extract data from API response', () => {
      const result = transformApiResponse(testApiResponse);

      expect(result).toEqual(testData);
    });

    it('should handle response with success field', () => {
      const response = {
        success: true,
        data: testData,
      };

      const result = transformApiResponse(response);

      expect(result).toEqual(testData);
    });

    it('should return original response if no data field', () => {
      const response = { message: 'Success' };

      const result = transformApiResponse(response);

      expect(result).toEqual(response);
    });
  });

  describe('transformPaginatedResponse', () => {
    it('should transform paginated response correctly', () => {
      const result = transformPaginatedResponse(testPaginatedResponse);

      expect(result).toEqual({
        items: testArrayData,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      });
    });
  });
});

describe('Cache Utilities', () => {
  describe('generateCacheKey', () => {
    it('should generate cache key from endpoint', () => {
      const result = generateCacheKey('/api/users');

      expect(result).toBe('_api_users');
    });

    it('should generate cache key with parameters', () => {
      const result = generateCacheKey('/api/users', { page: 1, limit: 10 });

      expect(result).toBe('_api_users_page=1&limit=10');
    });
  });

  describe('isCacheExpired', () => {
    it('should return false for recent timestamp', () => {
      const recentTimestamp = Date.now() - 1000; // 1 second ago

      expect(isCacheExpired(recentTimestamp)).toBe(false);
    });

    it('should return true for old timestamp', () => {
      const oldTimestamp = Date.now() - 400000; // 400 seconds ago (default TTL is 300)

      expect(isCacheExpired(oldTimestamp)).toBe(true);
    });

    it('should use custom TTL', () => {
      const timestamp = Date.now() - 2000; // 2 seconds ago
      const customTTL = 1000; // 1 second TTL

      expect(isCacheExpired(timestamp, customTTL)).toBe(true);
    });
  });
});

describe('Authentication Utilities', () => {
  describe('getAuthToken', () => {
    it('should return token from localStorage', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('test-token');

      const result = getAuthToken();

      expect(result).toBe('test-token');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('auth_token');
    });

    it('should return null when no token', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const result = getAuthToken();

      expect(result).toBe(null);
    });
  });

  describe('setAuthToken', () => {
    it('should set token in localStorage', () => {
      setAuthToken('new-token');

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'auth_token',
        'new-token'
      );
    });
  });

  describe('removeAuthToken', () => {
    it('should remove token from localStorage', () => {
      removeAuthToken();

      expect(window.localStorage.removeItem).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('test-token');

      const result = isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false when no token', () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const result = isAuthenticated();

      expect(result).toBe(false);
    });
  });
});

describe('Debug Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('logApiRequest', () => {
    it('should log API request in development', () => {
      process.env.NODE_ENV = 'development';

      logApiRequest('GET', '/api/users', { page: 1 }, { name: 'test' });

      expect(mockConsoleGroup).toHaveBeenCalledWith(
        '🌐 API Request: GET /api/users'
      );
      expect(mockConsoleLog).toHaveBeenCalledWith('Params:', { page: 1 });
      expect(mockConsoleLog).toHaveBeenCalledWith('Data:', { name: 'test' });
      expect(mockConsoleGroupEnd).toHaveBeenCalled();
    });

    it('should not log in production', () => {
      process.env.NODE_ENV = 'production';

      logApiRequest('GET', '/api/users');

      expect(mockConsoleGroup).not.toHaveBeenCalled();
    });
  });

  describe('logApiResponse', () => {
    it('should log API response in development', () => {
      process.env.NODE_ENV = 'development';

      logApiResponse('GET', '/api/users', testData, 150);

      expect(mockConsoleGroup).toHaveBeenCalledWith(
        '✅ API Response: GET /api/users (150ms)'
      );
      expect(mockConsoleLog).toHaveBeenCalledWith('Response:', testData);
      expect(mockConsoleGroupEnd).toHaveBeenCalled();
    });
  });

  describe('logApiError', () => {
    it('should log API error in development', () => {
      process.env.NODE_ENV = 'development';
      const error = new Error('Test error');

      logApiError('GET', '/api/users', error, 200);

      expect(mockConsoleGroup).toHaveBeenCalledWith(
        '❌ API Error: GET /api/users (200ms)'
      );
      expect(mockConsoleError).toHaveBeenCalledWith('Error:', error);
      expect(mockConsoleGroupEnd).toHaveBeenCalled();
    });
  });
});

describe('Contract-Aligned Utilities', () => {
  describe('createTypedFetcher', () => {
    it('should create fetcher that validates response', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const fetcher = createTypedFetcher(testSchema);
      const result = await fetcher('/api/test');

      expect(result).toEqual(testData);
    });

    it('should throw on validation error', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({ id: '123', name: 'Test' }), // Missing email
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const fetcher = createTypedFetcher(testSchema);

      await expect(fetcher('/api/test')).rejects.toThrow();
    });
  });

  describe('createApiResponseFetcher', () => {
    it('should create fetcher for API responses', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({
          success: true,
          data: testData,
        }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const fetcher = createApiResponseFetcher(testSchema);
      const result = await fetcher('/api/test');

      expect(result).toEqual(testData);
    });
  });

  describe('createPaginatedFetcher', () => {
    it('should create fetcher for paginated responses', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testPaginatedResponse),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const fetcher = createPaginatedFetcher(testSchema);
      const result = await fetcher('/api/test');

      expect(result).toEqual(testPaginatedResponse);
    });
  });

  describe('createTypedMutation', () => {
    it('should create mutation function with validation', async () => {
      const mockResponse = {
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({
          success: true,
          data: testData,
        }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const mutation = createTypedMutation(
        '/api/test',
        testSchema,
        testSchema,
        'POST'
      );

      const result = await mutation(testData);

      expect(result).toEqual(testData);
      expect(fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(testData),
        })
      );
    });
  });

  describe('createDeleteMutation', () => {
    it('should create delete mutation function', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({
          success: true,
          data: { success: true },
        }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const deleteMutation = createDeleteMutation(
        (id: string) => `/api/test/${id}`,
        z.object({ success: z.boolean() })
      );

      const result = await deleteMutation('123');

      expect(result).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledWith(
        '/api/test/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });
});

describe('Hook Utilities', () => {
  describe('createCacheKey', () => {
    it('should create cache key from endpoint and params', () => {
      const result = createCacheKey('/api/users', { page: 1, limit: 10 });

      expect(result).toBe('_api_users_page=1&limit=10');
    });

    it('should create cache key without params', () => {
      const result = createCacheKey('/api/users');

      expect(result).toBe('_api_users');
    });
  });

  describe('createConditionalCacheKey', () => {
    it('should return cache key when condition is true', () => {
      const result = createConditionalCacheKey(true, '/api/users', { page: 1 });

      expect(result).toBe('_api_users_page=1');
    });

    it('should return null when condition is false', () => {
      const result = createConditionalCacheKey(false, '/api/users', {
        page: 1,
      });

      expect(result).toBe(null);
    });
  });

  describe('createEntityCacheKey', () => {
    it('should create cache key with ID', () => {
      const result = createEntityCacheKey('/api/users/:id', '123', {
        include: 'profile',
      });

      expect(result).toBe('_api_users_123_include=profile');
    });

    it('should return null when ID is empty', () => {
      const result = createEntityCacheKey('/api/users/:id', '', {
        include: 'profile',
      });

      expect(result).toBe(null);
    });
  });
});
