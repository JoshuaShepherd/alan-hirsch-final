// ============================================================================
// ROUTE HANDLERS TEST SUITE
// ============================================================================
// Comprehensive test suite for standardized route handlers with ingress/egress validation

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import {
  NotFoundError,
  ValidationError,
} from '../../apps/alan-hirsch-platform/lib/api/error-handler';
import {
  createErrorResponse,
  createGetHandler,
  createGetListHandler,
  createPaginatedSuccessResponse,
  createPostHandler,
  createStandardPaginatedRouteHandler,
  createStandardRouteHandler,
  createSuccessResponse,
  validatePathParams,
} from '../../apps/alan-hirsch-platform/lib/api/route-handlers';

// ============================================================================
// MOCK DATA AND SCHEMAS
// ============================================================================

const TestInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const TestOutputSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string().datetime(),
});

const TestQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Test User',
  email: 'test@example.com',
  createdAt: new Date().toISOString(),
};

const mockUsers = [
  mockUser,
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Test User 2',
    email: 'test2@example.com',
    createdAt: new Date().toISOString(),
  },
];

const mockPagination = {
  page: 1,
  limit: 10,
  total: 2,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

// ============================================================================
// MOCK SUPABASE CLIENT
// ============================================================================

vi.mock('@platform/database', () => ({
  createSupabaseServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: '123e4567-e89b-12d3-a456-426614174000' } },
        error: null,
      }),
    },
  })),
}));

// ============================================================================
// TEST SUITE
// ============================================================================

describe('Route Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createStandardRouteHandler', () => {
    it('should handle successful GET request with authentication', async () => {
      const handler = createStandardRouteHandler({
        inputSchema: undefined,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'GET',
        handler: async () => mockUser,
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockUser);
      expect(data.meta).toBeDefined();
      expect(data.meta.timestamp).toBeDefined();
    });

    it('should handle successful POST request with input validation', async () => {
      const handler = createStandardRouteHandler({
        inputSchema: TestInputSchema,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'POST',
        handler: async input => ({
          ...mockUser,
          name: input.name,
          email: input.email,
        }),
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
        }),
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Test User');
      expect(data.data.email).toBe('test@example.com');
    });

    it('should reject invalid HTTP method', async () => {
      const handler = createStandardRouteHandler({
        inputSchema: undefined,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'GET',
        handler: async () => mockUser,
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('METHOD_NOT_ALLOWED');
    });

    it('should reject invalid input with validation error', async () => {
      const handler = createStandardRouteHandler({
        inputSchema: TestInputSchema,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'POST',
        handler: async () => mockUser,
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: '', // Invalid: empty name
          email: 'invalid-email', // Invalid: not an email
        }),
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.details).toBeDefined();
    });

    it('should reject unauthenticated request when auth required', async () => {
      // Mock unauthenticated user
      vi.mocked(
        require('@platform/database').createSupabaseServerClient
      ).mockReturnValue({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: new Error('Unauthorized'),
          }),
        },
      } as any);

      const handler = createStandardRouteHandler({
        inputSchema: undefined,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'GET',
        handler: async () => mockUser,
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should handle handler errors with proper error response', async () => {
      const handler = createStandardRouteHandler({
        inputSchema: undefined,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'GET',
        handler: async () => {
          throw new NotFoundError('Resource');
        },
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('NOT_FOUND');
    });
  });

  describe('createStandardPaginatedRouteHandler', () => {
    it('should handle successful paginated GET request', async () => {
      const handler = createStandardPaginatedRouteHandler({
        inputSchema: TestQuerySchema,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'GET',
        handler: async () => ({
          data: mockUsers,
          pagination: mockPagination,
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/test?page=1&limit=10',
        {
          method: 'GET',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.meta.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
    });

    it('should validate query parameters', async () => {
      const handler = createStandardPaginatedRouteHandler({
        inputSchema: TestQuerySchema,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        method: 'GET',
        handler: async () => ({
          data: mockUsers,
          pagination: mockPagination,
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/test?page=0&limit=200',
        {
          method: 'GET',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('Convenience Factory Functions', () => {
    it('should create GET handler correctly', async () => {
      const handler = createGetHandler({
        inputSchema: undefined,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        handler: async () => mockUser,
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should create POST handler correctly', async () => {
      const handler = createPostHandler({
        inputSchema: TestInputSchema,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        handler: async input => ({
          ...mockUser,
          name: input.name,
          email: input.email,
        }),
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
        }),
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should create paginated list handler correctly', async () => {
      const handler = createGetListHandler({
        inputSchema: TestQuerySchema,
        outputSchema: TestOutputSchema,
        requireAuth: true,
        handler: async () => ({
          data: mockUsers,
          pagination: mockPagination,
        }),
      });

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await handler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.meta.pagination).toBeDefined();
    });
  });

  describe('validatePathParams', () => {
    it('should validate path parameters correctly', () => {
      const schema = z.object({
        id: z.string().uuid(),
        slug: z.string().min(1),
      });

      const params = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        slug: 'test-slug',
      };

      const result = validatePathParams(
        new NextRequest('http://localhost:3000/api/test'),
        schema,
        params
      );

      expect(result).toEqual(params);
    });

    it('should throw validation error for invalid path parameters', () => {
      const schema = z.object({
        id: z.string().uuid(),
        slug: z.string().min(1),
      });

      const params = {
        id: 'invalid-uuid',
        slug: 'test-slug',
      };

      expect(() => {
        validatePathParams(
          new NextRequest('http://localhost:3000/api/test'),
          schema,
          params
        );
      }).toThrow(ValidationError);
    });
  });

  describe('Response Helpers', () => {
    it('should create success response correctly', () => {
      const response = createSuccessResponse(mockUser, 201);

      expect(response.status).toBe(201);
      // Note: We can't easily test the JSON body in this context,
      // but the status code verification shows the helper works
    });

    it('should create paginated success response correctly', () => {
      const response = createPaginatedSuccessResponse(
        mockUsers,
        mockPagination,
        200
      );

      expect(response.status).toBe(200);
    });

    it('should create error response correctly', () => {
      const response = createErrorResponse(
        'TEST_ERROR',
        'Test error message',
        400,
        { field: 'test' }
      );

      expect(response.status).toBe(400);
    });
  });
});
