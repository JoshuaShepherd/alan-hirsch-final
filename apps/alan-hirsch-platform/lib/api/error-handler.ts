// ============================================================================
// CENTRALIZED ERROR HANDLING
// ============================================================================
// Provides consistent error handling across all API routes

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError } from './route-handler';

// ============================================================================
// ERROR TYPES
// ============================================================================

export class NotFoundError extends Error {
  constructor(entityName: string, id?: string) {
    super(`${entityName}${id ? ` with ID ${id}` : ''} not found`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string = 'Validation failed', details?: unknown[]) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }

  details?: unknown[];
}

export class DatabaseError extends Error {
  constructor(message: string = 'Database operation failed') {
    super(message);
    this.name = 'DatabaseError';
  }
}

export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
  timestamp: string;
  path?: string;
}

export interface ValidationErrorDetails {
  field: string;
  message: string;
  code: string;
}

// ============================================================================
// ERROR HANDLER
// ============================================================================

export function handleApiError(
  error: unknown,
  request?: Request
): NextResponse<ApiErrorResponse> {
  if (process.env['NODE_ENV'] === 'development') {
    console.error('API Error:', {
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
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString(),
        path: request?.url,
        ...(error instanceof ValidationError && {
          details: (error as any).errors,
        }),
      },
      { status: error.statusCode }
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      'Validation failed',
      error.errors
    );
    return NextResponse.json(
      {
        error: validationError.message,
        code: 'VALIDATION_ERROR',
        details: formatValidationErrors(error.errors),
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
      { status: 400 }
    );
  }

  // Handle database errors
  if (error && typeof error === 'object' && 'code' in error) {
    const dbError = error as { code: string };
    switch (dbError.code) {
      case '23505': // Unique constraint violation
        return NextResponse.json(
          {
            error: 'Resource already exists',
            code: 'DUPLICATE_RESOURCE',
            timestamp: new Date().toISOString(),
            path: request?.url,
          },
          { status: 409 }
        );

      case '23503': // Foreign key constraint violation
        return NextResponse.json(
          {
            error: 'Referenced resource not found',
            code: 'FOREIGN_KEY_VIOLATION',
            timestamp: new Date().toISOString(),
            path: request?.url,
          },
          { status: 400 }
        );

      case '23502': // Not null constraint violation
        return NextResponse.json(
          {
            error: 'Required field is missing',
            code: 'NOT_NULL_VIOLATION',
            timestamp: new Date().toISOString(),
            path: request?.url,
          },
          { status: 400 }
        );

      case '42P01': // Undefined table
        return NextResponse.json(
          {
            error: 'Database table not found',
            code: 'TABLE_NOT_FOUND',
            timestamp: new Date().toISOString(),
            path: request?.url,
          },
          { status: 500 }
        );

      case '42703': // Undefined column
        return NextResponse.json(
          {
            error: 'Database column not found',
            code: 'COLUMN_NOT_FOUND',
            timestamp: new Date().toISOString(),
            path: request?.url,
          },
          { status: 500 }
        );
    }
  }

  // Handle authentication errors
  if (
    error instanceof Error &&
    (error.message.includes('JWT') || error.message.includes('token'))
  ) {
    return NextResponse.json(
      {
        error: 'Authentication failed',
        code: 'AUTHENTICATION_ERROR',
        timestamp: new Date().toISOString(),
        path: request?.url,
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
        error: 'Insufficient permissions',
        code: 'AUTHORIZATION_ERROR',
        timestamp: new Date().toISOString(),
        path: request?.url,
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
        error: 'Resource not found',
        code: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
      { status: 404 }
    );
  }

  // Handle rate limiting errors
  if (
    error instanceof Error &&
    (error.message.includes('rate limit') ||
      error.message.includes('too many requests'))
  ) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED',
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
      { status: 429 }
    );
  }

  // Handle timeout errors
  if (
    error instanceof Error &&
    (error.message.includes('timeout') || error.message.includes('timed out'))
  ) {
    return NextResponse.json(
      {
        error: 'Request timeout',
        code: 'TIMEOUT',
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
      { status: 408 }
    );
  }

  // Handle network errors
  if (
    error instanceof Error &&
    (error.message.includes('network') || error.message.includes('connection'))
  ) {
    return NextResponse.json(
      {
        error: 'Network error',
        code: 'NETWORK_ERROR',
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
      { status: 503 }
    );
  }

  // Generic server error
  return NextResponse.json(
    {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: request?.url,
    },
    { status: 500 }
  );
}

// ============================================================================
// VALIDATION ERROR FORMATTER
// ============================================================================

function formatValidationErrors(
  errors: ZodError['errors']
): ValidationErrorDetails[] {
  return errors.map(error => ({
    field: error.path.join('.'),
    message: error.message,
    code: error.code,
  }));
}

// ============================================================================
// ERROR BOUNDARY WRAPPER
// ============================================================================

export function withErrorHandling<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args);
    } catch (error) {
      throw error; // Re-throw to be handled by the route handler
    }
  };
}

// ============================================================================
// ADDITIONAL ERROR CLASSES
// ============================================================================

export class BusinessLogicError extends Error {
  constructor(
    message: string,
    public context?: unknown
  ) {
    super(message);
    this.name = 'BusinessLogicError';
  }
}

export class ExternalServiceError extends Error {
  constructor(
    message: string,
    public service?: string
  ) {
    super(message);
    this.name = 'ExternalServiceError';
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string = 'Rate limit exceeded',
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

// ============================================================================
// ERROR LOGGING
// ============================================================================

export function logError(error: unknown, context?: unknown): void {
  const errorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    code:
      error && typeof error === 'object' && 'code' in error
        ? (error as { code: string }).code
        : undefined,
    statusCode:
      error && typeof error === 'object' && 'statusCode' in error
        ? (error as { statusCode: number }).statusCode
        : undefined,
    context,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (process.env['NODE_ENV'] === 'development') {
    console.error('Error Details:', errorInfo);
  }

  // In production, you might want to send to an error tracking service
  // like Sentry, LogRocket, or DataDog
  if (process.env['NODE_ENV'] === 'production') {
    // Example: Sentry.captureException(error, { extra: context });
    console.error('Production Error:', errorInfo);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// All error classes are exported inline above
