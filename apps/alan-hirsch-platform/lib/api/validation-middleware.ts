// ============================================================================
// VALIDATION MIDDLEWARE
// ============================================================================
// Provides request/response validation middleware for API routes

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleApiError } from './error-handler';

// ============================================================================
// TYPES
// ============================================================================

export interface ValidationConfig<TInput, TOutput> {
  inputSchema?: z.ZodSchema<TInput>;
  outputSchema?: z.ZodSchema<TOutput>;
  requireAuth?: boolean;
  requirePermissions?: string[];
}

// ============================================================================
// VALIDATION MIDDLEWARE
// ============================================================================

export function withValidation<TInput, TOutput>(
  config: ValidationConfig<TInput, TOutput>
) {
  return function <T extends any[], R>(
    handler: (input: TInput, context: any) => Promise<R>
  ) {
    return async (
      request: NextRequest,
      ...args: T[]
    ): Promise<NextResponse> => {
      try {
        // Parse and validate input
        let input: TInput = {} as TInput;

        if (config.inputSchema) {
          if (request.method === 'GET') {
            // Parse query parameters
            const url = new URL(request.url);
            const queryParams = Object.fromEntries(url.searchParams.entries());
            input = config.inputSchema.parse(queryParams);
          } else {
            // Parse request body
            try {
              const body = await request.json();
              input = config.inputSchema.parse(body);
            } catch (error) {
              if (error instanceof SyntaxError) {
                throw new Error('Invalid JSON in request body');
              }
              throw error;
            }
          }
        }

        // Create context (you can extend this with auth, permissions, etc.)
        const context = {
          request,
          userId: request.headers.get('x-user-id'),
          organizationId: request.headers.get('x-organization-id'),
          permissions: request.headers.get('x-permissions')?.split(','),
        };

        // Execute handler
        const result = await handler(input, context);

        // Validate output
        const validatedResult = config.outputSchema
          ? config.outputSchema.parse(result)
          : result;

        // Return response
        return NextResponse.json(validatedResult);
      } catch (error) {
        return handleApiError(error, request);
      }
    };
  };
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export function withInputValidation<TInput>(inputSchema: z.ZodSchema<TInput>) {
  return withValidation({ inputSchema });
}

export function withOutputValidation<TOutput>(
  outputSchema: z.ZodSchema<TOutput>
) {
  return withValidation({ outputSchema });
}

export function withFullValidation<TInput, TOutput>(
  inputSchema: z.ZodSchema<TInput>,
  outputSchema: z.ZodSchema<TOutput>
) {
  return withValidation({ inputSchema, outputSchema });
}

// ============================================================================
// REQUEST VALIDATION UTILITIES
// ============================================================================

export function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): T {
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    return schema.parse(queryParams);
  } else {
    // For non-GET requests, we need to parse the body
    // This is a simplified version - in practice, you'd handle this in the middleware
    throw new Error('Request body validation must be handled in middleware');
  }
}

export function validateResponse<T>(data: unknown, schema: z.ZodSchema<T>): T {
  return schema.parse(data);
}

// ============================================================================
// CUSTOM VALIDATORS
// ============================================================================

export const commonValidators = {
  // UUID validation
  uuid: z.string().uuid('Invalid UUID format'),

  // Email validation
  email: z.string().email('Invalid email format'),

  // Password validation
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),

  // Slug validation
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug must be less than 100 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),

  // Pagination validation
  pagination: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),

  // Search validation
  search: z.object({
    query: z.string().min(1).max(100).optional(),
    filters: z.record(z.any()).optional(),
  }),

  // Date range validation
  dateRange: z
    .object({
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
    })
    .refine(
      data => {
        if (data.startDate && data.endDate) {
          return new Date(data.startDate) <= new Date(data.endDate);
        }
        return true;
      },
      {
        message: 'Start date must be before end date',
        path: ['endDate'],
      }
    ),
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  withFullValidation,
  withInputValidation,
  withOutputValidation,
  withValidation,
};
