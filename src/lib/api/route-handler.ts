// ============================================================================
// TYPE-SAFE API ROUTE HANDLERS
// ============================================================================
// Provides type-safe API route creation with automatic validation

import { createSupabaseServerClient } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { ServiceContext } from '../services/types';

// ============================================================================
// TYPES
// ============================================================================

export interface RouteHandlerConfig<TInput, TOutput> {
  inputSchema?: z.ZodSchema<TInput>;
  outputSchema?: z.ZodSchema<TOutput>;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  requireAuth?: boolean;
  requirePermissions?: string[];
  rateLimit?: {
    requests: number;
    window: number; // in seconds
  };
  handler: (
    input: TInput,
    context: ServiceContext & { request: NextRequest }
  ) => Promise<TOutput>;
}

export interface PaginatedRouteHandlerConfig<TInput, TOutput> {
  inputSchema?: z.ZodSchema<TInput>;
  outputSchema?: z.ZodSchema<TOutput>;
  method: 'GET';
  requireAuth?: boolean;
  requirePermissions?: string[];
  rateLimit?: {
    requests: number;
    window: number;
  };
  handler: (
    input: TInput,
    context: ServiceContext & { request: NextRequest }
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

// ============================================================================
// ERROR HANDLING
// ============================================================================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public errors: z.ZodError['errors']
  ) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

// ============================================================================
// ROUTE HANDLER FACTORY
// ============================================================================

export function createRouteHandler<TInput, TOutput>(
  config: RouteHandlerConfig<TInput, TOutput>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Check method
      if (request.method !== config.method) {
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 }
        );
      }

      // Get service context
      const context = await getServiceContext(request, config);

      // Parse and validate input
      const input = await parseInput(request, config.inputSchema);

      // Execute handler
      const result = await config.handler(input, { ...context, request });

      // Validate output
      const validatedResult = config.outputSchema
        ? config.outputSchema.parse(result)
        : result;

      // Return response
      return NextResponse.json(validatedResult);
    } catch (error) {
      return handleError(error);
    }
  };
}

export function createPaginatedRouteHandler<TInput, TOutput>(
  config: PaginatedRouteHandlerConfig<TInput, TOutput>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Check method
      if (request.method !== config.method) {
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 }
        );
      }

      // Get service context
      const context = await getServiceContext(request, config);

      // Parse and validate input
      const input = await parseInput(request, config.inputSchema);

      // Execute handler
      const result = await config.handler(input, { ...context, request });

      // Validate output
      const validatedResult = {
        data: config.outputSchema
          ? result.data.map(item => config.outputSchema?.parse(item))
          : result.data,
        pagination: result.pagination,
      };

      // Return response
      return NextResponse.json(validatedResult);
    } catch (error) {
      return handleError(error);
    }
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function getServiceContext(
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
      throw new AuthenticationError();
    }

    context.userId = user.id;

    // TODO: Implement permission checking
    // For now, we'll assume all authenticated users have basic permissions
  }

  // Get organization context from headers or user data
  const organizationId = request.headers.get('x-organization-id');
  if (organizationId) {
    context.tenantId = organizationId;
  }

  return context as ServiceContext;
}

async function parseInput<TInput>(
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
    // Parse request body
    try {
      const body = await request.json();
      rawInput = body;
    } catch (_error) {
      throw new ValidationError('Invalid JSON in request body', []);
    }
  }

  // Validate input
  try {
    return inputSchema.parse(rawInput);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Validation failed', error.errors);
    }
    throw error;
  }
}

function handleError(error: unknown): NextResponse {
  if (process.env['NODE_ENV'] === 'development') {
    console.error('API Error:', error);
  }

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error instanceof ValidationError && { details: error.errors }),
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  // Generic server error
  return NextResponse.json(
    {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
    { status: 500 }
  );
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export function createGetHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createRouteHandler({ ...config, method: 'GET' });
}

export function createPostHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createRouteHandler({ ...config, method: 'POST' });
}

export function createPutHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createRouteHandler({ ...config, method: 'PUT' });
}

export function createPatchHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createRouteHandler({ ...config, method: 'PATCH' });
}

export function createDeleteHandler<TInput, TOutput>(
  config: Omit<RouteHandlerConfig<TInput, TOutput>, 'method'>
) {
  return createRouteHandler({ ...config, method: 'DELETE' });
}

// ============================================================================
// EXPORTS
// ============================================================================

// Error classes are exported inline above
