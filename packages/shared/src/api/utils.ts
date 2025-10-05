import { createSupabaseServerClient, db } from '@platform/database';
import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, z } from 'zod';

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// API handler context
export interface ApiContext {
  user: {
    id: string;
    email: string;
    [key: string]: any;
  };
  db: typeof db;
}

// Type-safe API handler
export type ApiHandler<TInput, TOutput> = (
  input: TInput,
  context: ApiContext
) => Promise<TOutput>;

// Create type-safe API route with input/output validation
export function createApiRoute<TInput, TOutput>(
  inputSchema: ZodSchema<TInput>,
  outputSchema: ZodSchema<TOutput>,
  handler: ApiHandler<TInput, TOutput>
) {
  return async (request: NextRequest) => {
    try {
      // Get authenticated user
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Parse and validate input
      let validatedInput: TInput;

      if (request.method === 'GET') {
        // Parse query parameters
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams);
        validatedInput = inputSchema.parse(params);
      } else {
        // Parse JSON body
        const body = await request.json();
        validatedInput = inputSchema.parse(body);
      }

      // Execute handler
      const result = await handler(validatedInput, { user: user as any, db });

      // Validate output - handler should return the full response envelope
      const validatedOutput = outputSchema.parse(result);

      return NextResponse.json(validatedOutput);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return NextResponse.json(
          {
            error: 'Validation failed',
            details: validationErrors,
          },
          { status: 400 }
        );
      }

      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Create API route with input validation only (for cases where output is complex)
export function createApiRouteInputOnly<TInput>(
  inputSchema: ZodSchema<TInput>,
  handler: ApiHandler<TInput, any>
) {
  return async (request: NextRequest) => {
    try {
      // Get authenticated user
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Parse and validate input
      let validatedInput: TInput;

      if (request.method === 'GET') {
        // Parse query parameters
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams);
        validatedInput = inputSchema.parse(params);
      } else {
        // Parse JSON body
        const body = await request.json();
        validatedInput = inputSchema.parse(body);
      }

      // Execute handler
      const result = await handler(validatedInput, { user: user as any, db });

      return NextResponse.json({
        data: result,
        success: true,
      } as ApiResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return NextResponse.json(
          {
            error: 'Validation failed',
            details: validationErrors,
          },
          { status: 400 }
        );
      }

      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Create paginated API route
export function createPaginatedApiRoute<TInput, TItemOutput, TResponseOutput>(
  inputSchema: ZodSchema<TInput>,
  outputSchema: ZodSchema<TResponseOutput>,
  handler: ApiHandler<
    TInput,
    { items: TItemOutput[]; pagination: any; success: boolean }
  >
) {
  return async (request: NextRequest) => {
    try {
      // Get authenticated user
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Parse and validate input
      let validatedInput: TInput;

      if (request.method === 'GET') {
        // Parse query parameters
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams);
        validatedInput = inputSchema.parse(params);
      } else {
        // Parse JSON body
        const body = await request.json();
        validatedInput = inputSchema.parse(body);
      }

      // Execute handler
      const result = await handler(validatedInput, { user: user as any, db });

      // Validate the full response
      const validatedResponse = outputSchema.parse(result);

      return NextResponse.json(validatedResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return NextResponse.json(
          {
            error: 'Validation failed',
            details: validationErrors,
          },
          { status: 400 }
        );
      }

      console.error('API Error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Utility for creating response schemas
export const createResponseSchema = <T>(dataSchema: ZodSchema<T>) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export const createPaginatedResponseSchema = <T>(itemSchema: ZodSchema<T>) =>
  z.object({
    items: z.object({
      data: z.array(itemSchema),
      pagination: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        totalPages: z.number(),
        hasNext: z.boolean(),
        hasPrev: z.boolean(),
      }),
    }),
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

// Common input schemas
export const paginationInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const idInputSchema = z.object({
  id: z.string().uuid(),
});

export const emptyInputSchema = z.object({});
