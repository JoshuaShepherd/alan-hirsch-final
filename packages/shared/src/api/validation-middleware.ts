import { createSupabaseServerClient } from '@platform/database';
import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, z } from 'zod';

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// API response type
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  validationErrors?: ValidationError[];
  success?: boolean;
}

// Middleware context
export interface MiddlewareContext {
  user: {
    id: string;
    email: string;
    [key: string]: any;
  };
  validatedData?: any;
}

// Validation middleware for request validation
export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (
    data: T,
    context: MiddlewareContext,
    request: NextRequest
  ) => Promise<Response>
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
        return NextResponse.json(
          {
            error: 'Unauthorized',
            message: 'Authentication required',
          } as ApiResponse,
          { status: 401 }
        );
      }

      // Parse and validate input
      let validatedData: T;

      if (request.method === 'GET') {
        // Parse query parameters
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams);
        validatedData = schema.parse(params);
      } else {
        // Parse JSON body
        const body = await request.json();
        validatedData = schema.parse(body);
      }

      // Create context
      const context: MiddlewareContext = {
        user: user as any,
        validatedData,
      };

      // Execute handler
      return await handler(validatedData, context, request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        return NextResponse.json(
          {
            error: 'Validation failed',
            message: 'Request data is invalid',
            validationErrors,
          } as ApiResponse,
          { status: 400 }
        );
      }

      console.error('Validation middleware error:', error);
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred',
        } as ApiResponse,
        { status: 500 }
      );
    }
  };
}

// Validation middleware with output validation
export function withInputOutputValidation<TInput, TOutput>(
  inputSchema: ZodSchema<TInput>,
  outputSchema: ZodSchema<TOutput>,
  handler: (
    data: TInput,
    context: MiddlewareContext,
    request: NextRequest
  ) => Promise<TOutput>
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
        return NextResponse.json(
          {
            error: 'Unauthorized',
            message: 'Authentication required',
          } as ApiResponse,
          { status: 401 }
        );
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

      // Create context
      const context: MiddlewareContext = {
        user: user as any,
        validatedData: validatedInput,
      };

      // Execute handler
      const result = await handler(validatedInput, context, request);

      // Validate output
      const validatedOutput = outputSchema.parse(result);

      return NextResponse.json({
        data: validatedOutput,
        success: true,
      } as ApiResponse<TOutput>);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        return NextResponse.json(
          {
            error: 'Validation failed',
            message: 'Request or response data is invalid',
            validationErrors,
          } as ApiResponse,
          { status: 400 }
        );
      }

      console.error('Input/output validation middleware error:', error);
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred',
        } as ApiResponse,
        { status: 500 }
      );
    }
  };
}

// Pagination validation middleware
export function withPaginationValidation<TInput, TOutput>(
  inputSchema: ZodSchema<TInput>,
  outputSchema: ZodSchema<TOutput>,
  handler: (
    data: TInput,
    context: MiddlewareContext,
    request: NextRequest
  ) => Promise<{ items: TOutput[]; total: number }>
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
        return NextResponse.json(
          {
            error: 'Unauthorized',
            message: 'Authentication required',
          } as ApiResponse,
          { status: 401 }
        );
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

      // Create context
      const context: MiddlewareContext = {
        user: user as any,
        validatedData: validatedInput,
      };

      // Execute handler
      const result = await handler(validatedInput, context, request);

      // Validate output items
      const validatedItems = result.items.map(item => outputSchema.parse(item));
      const validatedTotal = result.total;

      // Calculate pagination info
      const page = (validatedInput as any).page || 1;
      const limit = (validatedInput as any).limit || 20;
      const hasMore = page * limit < validatedTotal;

      return NextResponse.json({
        data: validatedItems,
        pagination: {
          page,
          limit,
          total: validatedTotal,
          hasMore,
        },
        success: true,
      } as ApiResponse<TOutput[]>);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        return NextResponse.json(
          {
            error: 'Validation failed',
            message: 'Request or response data is invalid',
            validationErrors,
          } as ApiResponse,
          { status: 400 }
        );
      }

      console.error('Pagination validation middleware error:', error);
      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred',
        } as ApiResponse,
        { status: 500 }
      );
    }
  };
}

// Rate limiting middleware
export function withRateLimit(
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return function <T>(
    handler: (
      data: T,
      context: MiddlewareContext,
      request: NextRequest
    ) => Promise<Response>
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
          return NextResponse.json(
            {
              error: 'Unauthorized',
              message: 'Authentication required',
            } as ApiResponse,
            { status: 401 }
          );
        }

        // Rate limiting logic
        const now = Date.now();
        const userKey = user.id;
        const userRequests = requests.get(userKey);

        if (!userRequests || now > userRequests.resetTime) {
          // Reset or initialize
          requests.set(userKey, {
            count: 1,
            resetTime: now + windowMs,
          });
        } else if (userRequests.count >= maxRequests) {
          return NextResponse.json(
            {
              error: 'Rate limit exceeded',
              message: `Too many requests. Limit: ${maxRequests} per ${windowMs / 1000 / 60} minutes`,
            } as ApiResponse,
            { status: 429 }
          );
        } else {
          // Increment count
          userRequests.count++;
        }

        // Create context
        const context: MiddlewareContext = {
          user: {
            ...user,
            id: user.id,
            email: user.email || '',
          },
        };

        // Execute handler
        return await handler({} as T, context, request);
      } catch (error) {
        console.error('Rate limit middleware error:', error);
        return NextResponse.json(
          {
            error: 'Internal server error',
            message: 'An unexpected error occurred',
          } as ApiResponse,
          { status: 500 }
        );
      }
    };
  };
}

// CORS middleware
export function withCORS(
  allowedOrigins: string[] = ['http://localhost:3000'],
  allowedMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: string[] = ['Content-Type', 'Authorization']
) {
  return function <T>(
    handler: (
      data: T,
      context: MiddlewareContext,
      request: NextRequest
    ) => Promise<Response>
  ) {
    return async (request: NextRequest) => {
      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': allowedMethods.join(', '),
            'Access-Control-Allow-Headers': allowedHeaders.join(', '),
            'Access-Control-Max-Age': '86400',
          },
        });
      }

      // Execute handler
      const response = await handler({} as T, { user: {} as any }, request);

      // Add CORS headers to response
      const origin = request.headers.get('origin');
      if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }
      response.headers.set(
        'Access-Control-Allow-Methods',
        allowedMethods.join(', ')
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        allowedHeaders.join(', ')
      );

      return response;
    };
  };
}

// Error handling middleware
export function withErrorHandling<T>(
  handler: (
    data: T,
    context: MiddlewareContext,
    request: NextRequest
  ) => Promise<Response>
) {
  return async (request: NextRequest) => {
    try {
      return await handler({} as T, { user: {} as any }, request);
    } catch (error) {
      console.error('API Error:', error);

      // Handle different types of errors
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return NextResponse.json(
            {
              error: 'Not found',
              message: error.message,
            } as ApiResponse,
            { status: 404 }
          );
        }

        if (
          error.message.includes('permission') ||
          error.message.includes('access')
        ) {
          return NextResponse.json(
            {
              error: 'Forbidden',
              message: error.message,
            } as ApiResponse,
            { status: 403 }
          );
        }
      }

      return NextResponse.json(
        {
          error: 'Internal server error',
          message: 'An unexpected error occurred',
        } as ApiResponse,
        { status: 500 }
      );
    }
  };
}
