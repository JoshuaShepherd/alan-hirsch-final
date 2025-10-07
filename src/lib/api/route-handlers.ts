// ============================================================================
// STANDARDIZED ROUTE HANDLERS
// ============================================================================
// Provides type-safe, standardized API route handlers with ingress/egress validation,
// proper error handling, and consistent response envelopes per alignment reference.

import { createSupabaseServerClient } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { ServiceContext } from '../services/types';
import {
  ApiError,
  AuthenticationError,
  ValidationError,
} from './route-handler';

// ============================================================================
// QUERY SCHEMA UTILITIES
// ============================================================================

/**
 * Creates a standardized query schema for common query parameters
 */
export function createQuerySchema<T extends Record<string, z.ZodTypeAny>>(
  schema: T
): z.ZodObject<T> {
  return z.object(schema);
}

// ============================================================================
// TYPES
// ============================================================================

export interface RouteHandlerConfig<TInput, TOutput> {
  inputSchema?: z.ZodSchema<TInput>;
  outputSchema?: z.ZodSchema<TOutput>;
  requireAuth?: boolean;
  requirePermissions?: string[];
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  handler: (
    input: TInput,
    context: ServiceContext & { request: NextRequest },
    routeParams?: { params: Record<string, string | string[]> }
  ) => Promise<TOutput>;
}

export interface PaginatedRouteHandlerConfig<TInput, TOutput> {
  inputSchema?: z.ZodSchema<TInput>;
  outputSchema?: z.ZodSchema<TOutput>;
  requireAuth?: boolean;
  requirePermissions?: string[];
  method: 'GET';
  handler: (
    input: TInput,
    context: ServiceContext & { request: NextRequest },
    routeParams?: { params: Record<string, string | string[]> }
  ) => Promise<{
    data: TOutput[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }>;
}

export interface StandardApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    timestamp: string;
  };
}

// ============================================================================
// STANDARDIZED ROUTE HANDLER FACTORY
// ============================================================================

/**
 * Creates a standardized route handler with ingress/egress validation
 * Follows alignment reference patterns for consistent API responses
 */
export function createStandardRouteHandler<TInput, TOutput>(
  config: RouteHandlerConfig<TInput, TOutput>
) {
  return async (
    request: NextRequest,
    routeParams?: { params: Record<string, string | string[]> }
  ): Promise<NextResponse<StandardApiResponse<TOutput>>> => {
    try {
      // Validate HTTP method
      if (request.method !== config.method) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'METHOD_NOT_ALLOWED',
              message: `${config.method} method required`,
            },
            meta: {
              timestamp: new Date().toISOString(),
            },
          },
          { status: 405 }
        );
      }

      // Get authenticated context if required
      const context = await getAuthenticatedContext(request, config);

      // Parse and validate input (ingress validation)
      const input = await parseAndValidateInput(request, config.inputSchema);

      // Execute handler with validated input
      const result = await config.handler(
        input,
        { ...context, request },
        routeParams
      );

      // Validate output (egress validation)
      const validatedResult = config.outputSchema
        ? config.outputSchema.parse(result)
        : result;

      // Return standardized response envelope
      return NextResponse.json({
        success: true,
        data: validatedResult,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      return handleRouteError(error, request) as NextResponse<
        StandardApiResponse<TOutput>
      >;
    }
  };
}

/**
 * Creates a standardized paginated route handler with ingress/egress validation
 */
export function createStandardPaginatedRouteHandler<TInput, TOutput>(
  config: PaginatedRouteHandlerConfig<TInput, TOutput>
) {
  return async (
    request: NextRequest,
    routeParams?: { params: Record<string, string | string[]> }
  ): Promise<NextResponse<StandardApiResponse<TOutput[]>>> => {
    try {
      // Validate HTTP method
      if (request.method !== config.method) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'METHOD_NOT_ALLOWED',
              message: `${config.method} method required`,
            },
            meta: {
              timestamp: new Date().toISOString(),
            },
          },
          { status: 405 }
        );
      }

      // Get authenticated context if required
      const context = await getAuthenticatedContext(request, config);

      // Parse and validate input (ingress validation)
      const input = await parseAndValidateInput(request, config.inputSchema);

      // Execute handler with validated input
      const result = await config.handler(
        input,
        { ...context, request },
        routeParams
      );

      // Validate output items (egress validation)
      const validatedData = config.outputSchema
        ? result.data
            .map(item => config.outputSchema?.parse(item))
            .filter((item): item is TOutput => item !== undefined)
        : result.data;

      // Return standardized paginated response envelope
      return NextResponse.json({
        success: true,
        data: validatedData,
        meta: {
          pagination: {
            page: result.pagination.page,
            limit: result.pagination.limit,
            total: result.pagination.total,
            totalPages: result.pagination.totalPages,
            hasNext: result.pagination.hasNext,
            hasPrev: result.pagination.hasPrev,
          },
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      return handleRouteError(error, request) as NextResponse<
        StandardApiResponse<TOutput[]>
      >;
    }
  };
}

// ============================================================================
// CONVENIENCE FACTORY FUNCTIONS
// ============================================================================

export function createGetHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createStandardRouteHandler({ ...config, method: 'GET' });
}

export function createPostHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createStandardRouteHandler({ ...config, method: 'POST' });
}

export function createPutHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createStandardRouteHandler({ ...config, method: 'PUT' });
}

export function createPatchHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createStandardRouteHandler({ ...config, method: 'PATCH' });
}

export function createDeleteHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createStandardRouteHandler({ ...config, method: 'DELETE' });
}

export function createGetListHandler<TInput, TOutput>(
  config: Omit<PaginatedRouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createStandardPaginatedRouteHandler({ ...config, method: 'GET' });
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get authenticated context with tenant scoping
 * Implements proper auth middleware per alignment reference
 */
async function getAuthenticatedContext(
  request: NextRequest,
  config: { requireAuth?: boolean; requirePermissions?: string[] }
): Promise<ServiceContext> {
  const context: Partial<ServiceContext> = {};

  // Get authentication if required
  if (config.requireAuth) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new AuthenticationError('Authentication required');
    }

    context.userId = user.id;
    context.tenantId = user.user_metadata?.['tenant_id'] ?? 'default';

    // Get user permissions if required
    if (config.requirePermissions?.length) {
      // TODO: Implement proper permission checking from user metadata or separate table
      // For now, assume all authenticated users have basic permissions
      context.role = 'member';
    }
  } else {
    // For non-authenticated routes, use default tenant
    context.tenantId = request.headers.get('x-tenant-id') ?? 'default';
  }

  // Get organization context from headers or user data
  const organizationId = request.headers.get('x-organization-id');
  if (organizationId) {
    context.tenantId = organizationId;
  }

  // Get additional context from headers
  const role = request.headers.get('x-user-role');
  if (role) {
    context.role = role as ServiceContext['role'];
  }

  return context as ServiceContext;
}

/**
 * Parse and validate input based on HTTP method and schema
 * Implements ingress validation per alignment reference
 */
async function parseAndValidateInput<TInput>(
  request: NextRequest,
  inputSchema?: z.ZodSchema<TInput>
): Promise<TInput> {
  if (!inputSchema) {
    return {} as TInput;
  }

  let rawInput: unknown = {};

  // Parse input based on method
  if (request.method === 'GET') {
    // Parse query parameters
    const url = new URL(request.url);
    rawInput = Object.fromEntries(url.searchParams.entries());
  } else {
    // Parse request body for POST/PUT/PATCH/DELETE
    try {
      const body = await request.json();
      rawInput = body;
    } catch (_error) {
      throw new ValidationError('Invalid JSON in request body', []);
    }
  }

  // Validate input with Zod schema
  try {
    return inputSchema.parse(rawInput);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Validation failed', error.errors);
    }
    throw error;
  }
}

// ============================================================================
// PATH PARAMETER VALIDATION
// ============================================================================

/**
 * Validates and extracts path parameters from route
 */
export function validatePathParams<T>(
  request: NextRequest,
  paramsSchema: z.ZodSchema<T>,
  params: Record<string, string | string[]>
): T {
  try {
    return paramsSchema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid path parameters', error.errors);
    }
    throw error;
  }
}

// ============================================================================
// RESPONSE HELPERS
// ============================================================================

/**
 * Creates a standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  statusCode: number = 200
): NextResponse<StandardApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode }
  );
}

/**
 * Creates a standardized paginated success response
 */
export function createPaginatedSuccessResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  },
  statusCode: number = 200
): NextResponse<StandardApiResponse<T[]>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: pagination.total,
          totalPages: pagination.totalPages,
          hasNext: pagination.hasNext,
          hasPrev: pagination.hasPrev,
        },
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode }
  );
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  statusCode: number,
  details?: unknown
): NextResponse<StandardApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode }
  );
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Handle route errors with consistent error responses
 */
function handleRouteError(error: unknown, request?: NextRequest): NextResponse {
  if (process.env['NODE_ENV'] === 'development') {
    console.error('Route Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: request?.url,
      method: request?.method,
    });
  }

  // Handle known API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code ?? 'UNKNOWN_ERROR',
          message: error.message,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: error.statusCode }
    );
  }

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    const validationError = new ValidationError(
      'Validation failed',
      error.errors
    );
    return NextResponse.json(
      {
        success: false,
        error: {
          code: validationError.code ?? 'VALIDATION_ERROR',
          message: validationError.message,
          details: error.errors,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 400 }
    );
  }

  // Handle authentication errors
  if (
    error instanceof Error &&
    (error.message.includes('JWT') || error.message.includes('token'))
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Authentication failed',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 401 }
    );
  }

  // Handle permission errors
  if (
    error instanceof Error &&
    (error.message.includes('permission') ||
      error.message.includes('unauthorized'))
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTHORIZATION_ERROR',
          message: 'Insufficient permissions',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 403 }
    );
  }

  // Handle not found errors
  if (
    error instanceof Error &&
    (error.message.includes('not found') ||
      error.message.includes('does not exist'))
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Resource not found',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 404 }
    );
  }

  // Generic server error
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    },
    { status: 500 }
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

// Aliases for common usage patterns
export const createRouteHandler = createStandardRouteHandler;
export const createPaginatedRouteHandler = createStandardPaginatedRouteHandler;
