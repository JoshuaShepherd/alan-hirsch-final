// ============================================================================
// CENTRALIZED ERROR HANDLING
// ============================================================================
// Provides consistent error handling across all API routes

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import {
  ApiError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from './route-handler';

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface ApiErrorResponse {
  error: string;
  code?: string;
  details?: any;
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
  error: any,
  request?: Request
): NextResponse<ApiErrorResponse> {
  console.error('API Error:', {
    message: error.message,
    stack: error.stack,
    url: request?.url,
    method: request?.method,
  });

  // Handle known API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString(),
        path: request?.url,
        ...(error instanceof ValidationError && { details: error.errors }),
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
        code: validationError.code,
        details: formatValidationErrors(error.errors),
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
      { status: 400 }
    );
  }

  // Handle database errors
  if (error.code) {
    switch (error.code) {
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
  if (error.message?.includes('JWT') || error.message?.includes('token')) {
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
    error.message?.includes('permission') ||
    error.message?.includes('unauthorized')
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
    error.message?.includes('not found') ||
    error.message?.includes('does not exist')
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
    error.message?.includes('rate limit') ||
    error.message?.includes('too many requests')
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
    error.message?.includes('timeout') ||
    error.message?.includes('timed out')
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
    error.message?.includes('network') ||
    error.message?.includes('connection')
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

export function withErrorHandling<T extends any[], R>(
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
// CUSTOM ERROR CLASSES
// ============================================================================

export class DatabaseError extends ApiError {
  constructor(
    message: string,
    public query?: string
  ) {
    super(message, 500, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
  }
}

export class BusinessLogicError extends ApiError {
  constructor(
    message: string,
    public context?: any
  ) {
    super(message, 400, 'BUSINESS_LOGIC_ERROR');
    this.name = 'BusinessLogicError';
  }
}

export class ExternalServiceError extends ApiError {
  constructor(
    message: string,
    public service?: string
  ) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}

export class RateLimitError extends ApiError {
  constructor(
    message: string = 'Rate limit exceeded',
    public retryAfter?: number
  ) {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

// ============================================================================
// ERROR LOGGING
// ============================================================================

export function logError(error: any, context?: any): void {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    code: error.code,
    statusCode: error.statusCode,
    context,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', errorInfo);
  }

  // In production, you might want to send to an error tracking service
  // like Sentry, LogRocket, or DataDog
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: context });
    console.error('Production Error:', errorInfo);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ApiError,
  AuthenticationError,
  AuthorizationError,
  BusinessLogicError,
  DatabaseError,
  ExternalServiceError,
  NotFoundError,
  RateLimitError,
  ValidationError,
};
