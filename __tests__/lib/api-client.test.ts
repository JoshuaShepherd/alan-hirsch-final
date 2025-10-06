// ============================================================================
// API CLIENT TESTS
// ============================================================================
// Tests for the centralized HTTP client with typed request/response validation

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import {
  ApiClient,
  ApiClientError,
  NetworkError,
  TimeoutError,
  ValidationError,
  buildPaginationParams,
  createRequestValidator,
  createResponseValidator,
  normalizeApiError,
} from '../../apps/alan-hirsch-platform/lib/api-client';

// ============================================================================
// MOCK SETUP
// ============================================================================

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
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

const testPaginatedSchema = z.object({
  data: testArraySchema,
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

// ============================================================================
// TEST DATA
// ============================================================================

const testData = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
};

const testArrayData = [testData];

const testPaginatedData = {
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

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    vi.clearAllMocks();
    apiClient = new ApiClient({
      baseUrl: 'https://api.test.com',
      timeout: 5000,
      retries: 2,
    });
  });

  describe('GET requests', () => {
    it('should make successful GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const result = await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(testData);
    });

    it('should make GET request with query parameters', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      await apiClient.get('/test', { page: 1, limit: 10 });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test?page=1&limit=10',
        expect.any(Object)
      );
    });

    it('should make GET request with validation', async () => {
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

      const result = await apiClient.getWithValidation('/test', testSchema);

      expect(result).toEqual(testData);
    });

    it('should handle validation errors in GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({
          success: true,
          data: { id: '123', name: 'Test' }, // Missing email
        }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      await expect(
        apiClient.getWithValidation('/test', testSchema)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('POST requests', () => {
    it('should make successful POST request', async () => {
      const mockResponse = {
        ok: true,
        status: 201,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const result = await apiClient.post('/test', testData);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(testData),
        })
      );
      expect(result).toEqual(testData);
    });

    it('should make POST request with validation', async () => {
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

      const result = await apiClient.postWithValidation(
        '/test',
        testData,
        testSchema
      );

      expect(result).toEqual(testData);
    });
  });

  describe('PUT requests', () => {
    it('should make successful PUT request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const result = await apiClient.put('/test', testData);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(testData),
        })
      );
      expect(result).toEqual(testData);
    });
  });

  describe('PATCH requests', () => {
    it('should make successful PATCH request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const result = await apiClient.patch('/test', testData);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(testData),
        })
      );
      expect(result).toEqual(testData);
    });
  });

  describe('DELETE requests', () => {
    it('should make successful DELETE request', async () => {
      const mockResponse = {
        ok: true,
        status: 204,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({ success: true }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const result = await apiClient.delete('/test');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual({ success: true });
    });

    it('should make DELETE request with validation', async () => {
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

      const result = await apiClient.deleteWithValidation(
        '/test',
        z.object({ success: z.boolean() })
      );

      expect(result).toEqual({ success: true });
    });
  });

  describe('Paginated requests', () => {
    it('should make paginated GET request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testPaginatedData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      const result = await apiClient.getPaginated('/test', {
        page: 1,
        limit: 10,
        sortBy: 'name',
        sortOrder: 'asc',
      });

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test?page=1&limit=10&sortBy=name&sortOrder=asc',
        expect.any(Object)
      );
      expect(result).toEqual(testPaginatedData);
    });
  });

  describe('Error handling', () => {
    it('should handle HTTP errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
          },
        }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      await expect(apiClient.get('/test')).rejects.toThrow(ApiClientError);
    });

    it('should handle network errors', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

      await expect(apiClient.get('/test')).rejects.toThrow(NetworkError);
    });

    it('should handle timeout errors', async () => {
      // Mock AbortController
      const mockAbortController = {
        abort: vi.fn(),
        signal: {},
      };
      global.AbortController = vi.fn(() => mockAbortController) as any;

      vi.mocked(fetch).mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => {
            const error = new Error('Request timeout');
            error.name = 'AbortError';
            reject(error);
          }, 100);
        });
      });

      await expect(apiClient.get('/test')).rejects.toThrow(TimeoutError);
    });

    it('should retry on server errors', async () => {
      let callCount = 0;
      vi.mocked(fetch).mockImplementation(() => {
        callCount++;
        if (callCount < 3) {
          return Promise.reject(new Error('Server error'));
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          json: vi.fn().mockResolvedValue(testData),
        } as any);
      });

      const result = await apiClient.get('/test');

      expect(callCount).toBe(3);
      expect(result).toEqual(testData);
    });

    it('should not retry on client errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
          },
        }),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      await expect(apiClient.get('/test')).rejects.toThrow();

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Authentication', () => {
    it('should include auth token in headers', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('test-token');

      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });

    it('should work without auth token', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue(null);

      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockResolvedValue(testData),
      };

      vi.mocked(fetch).mockResolvedValue(mockResponse as any);

      await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String),
          }),
        })
      );
    });
  });
});

describe('Error Classes', () => {
  it('should create ApiClientError with correct properties', () => {
    const error = new ApiClientError('TEST_ERROR', 'Test message', 400, {
      field: 'test',
    });

    expect(error.name).toBe('ApiClientError');
    expect(error.code).toBe('TEST_ERROR');
    expect(error.message).toBe('Test message');
    expect(error.status).toBe(400);
    expect(error.details).toEqual({ field: 'test' });
  });

  it('should create ValidationError', () => {
    const error = new ValidationError('Validation failed', { field: 'email' });

    expect(error.name).toBe('ValidationError');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.status).toBe(400);
  });

  it('should create NetworkError', () => {
    const error = new NetworkError('Network failed');

    expect(error.name).toBe('NetworkError');
    expect(error.code).toBe('NETWORK_ERROR');
  });

  it('should create TimeoutError', () => {
    const error = new TimeoutError('Request timeout');

    expect(error.name).toBe('TimeoutError');
    expect(error.code).toBe('TIMEOUT_ERROR');
  });
});

describe('Utility Functions', () => {
  describe('normalizeApiError', () => {
    it('should normalize ApiClientError', () => {
      const error = new ApiClientError('TEST_ERROR', 'Test message', 400);
      const normalized = normalizeApiError(error);

      expect(normalized).toEqual({
        code: 'TEST_ERROR',
        message: 'Test message',
        details: undefined,
      });
    });

    it('should normalize generic Error', () => {
      const error = new Error('Generic error');
      const normalized = normalizeApiError(error);

      expect(normalized).toEqual({
        code: 'UNKNOWN_ERROR',
        message: 'Generic error',
      });
    });

    it('should normalize unknown error', () => {
      const normalized = normalizeApiError('string error');

      expect(normalized).toEqual({
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
      });
    });
  });

  describe('createResponseValidator', () => {
    it('should create validator that validates data', () => {
      const validator = createResponseValidator(testSchema);

      const result = validator(testData);

      expect(result).toEqual(testData);
    });

    it('should create validator that throws on invalid data', () => {
      const validator = createResponseValidator(testSchema);

      expect(() => validator({ id: '123', name: 'Test' })).toThrow(
        ValidationError
      );
    });
  });

  describe('createRequestValidator', () => {
    it('should create validator that validates request data', () => {
      const validator = createRequestValidator(testSchema);

      const result = validator(testData);

      expect(result).toEqual(testData);
    });

    it('should create validator that throws on invalid request data', () => {
      const validator = createRequestValidator(testSchema);

      expect(() => validator({ id: '123', name: 'Test' })).toThrow(
        ValidationError
      );
    });
  });

  describe('buildPaginationParams', () => {
    it('should build pagination parameters', () => {
      const params = buildPaginationParams({
        page: 2,
        limit: 20,
        sortBy: 'name',
        sortOrder: 'desc',
      });

      expect(params).toEqual({
        page: '2',
        limit: '20',
        sortBy: 'name',
        sortOrder: 'desc',
      });
    });

    it('should handle undefined values', () => {
      const params = buildPaginationParams({
        page: 1,
        limit: 10,
      });

      expect(params).toEqual({
        page: '1',
        limit: '10',
      });
    });
  });
});
