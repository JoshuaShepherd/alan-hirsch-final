import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
// Validation middleware for request validation
export function withValidation(schema, handler) {
    return async (request) => {
        try {
            // Get authenticated user
            const supabase = await createClient();
            const { data: { user }, error: authError, } = await supabase.auth.getUser();
            if (authError || !user) {
                return NextResponse.json({
                    error: 'Unauthorized',
                    message: 'Authentication required',
                }, { status: 401 });
            }
            // Parse and validate input
            let validatedData;
            if (request.method === 'GET') {
                // Parse query parameters
                const url = new URL(request.url);
                const params = Object.fromEntries(url.searchParams);
                validatedData = schema.parse(params);
            }
            else {
                // Parse JSON body
                const body = await request.json();
                validatedData = schema.parse(body);
            }
            // Create context
            const context = {
                user: user,
                validatedData,
            };
            // Execute handler
            return await handler(validatedData, context, request);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code,
                }));
                return NextResponse.json({
                    error: 'Validation failed',
                    message: 'Request data is invalid',
                    validationErrors,
                }, { status: 400 });
            }
            console.error('Validation middleware error:', error);
            return NextResponse.json({
                error: 'Internal server error',
                message: 'An unexpected error occurred',
            }, { status: 500 });
        }
    };
}
// Validation middleware with output validation
export function withInputOutputValidation(inputSchema, outputSchema, handler) {
    return async (request) => {
        try {
            // Get authenticated user
            const supabase = await createClient();
            const { data: { user }, error: authError, } = await supabase.auth.getUser();
            if (authError || !user) {
                return NextResponse.json({
                    error: 'Unauthorized',
                    message: 'Authentication required',
                }, { status: 401 });
            }
            // Parse and validate input
            let validatedInput;
            if (request.method === 'GET') {
                // Parse query parameters
                const url = new URL(request.url);
                const params = Object.fromEntries(url.searchParams);
                validatedInput = inputSchema.parse(params);
            }
            else {
                // Parse JSON body
                const body = await request.json();
                validatedInput = inputSchema.parse(body);
            }
            // Create context
            const context = {
                user: user,
                validatedData: validatedInput,
            };
            // Execute handler
            const result = await handler(validatedInput, context, request);
            // Validate output
            const validatedOutput = outputSchema.parse(result);
            return NextResponse.json({
                data: validatedOutput,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code,
                }));
                return NextResponse.json({
                    error: 'Validation failed',
                    message: 'Request or response data is invalid',
                    validationErrors,
                }, { status: 400 });
            }
            console.error('Input/output validation middleware error:', error);
            return NextResponse.json({
                error: 'Internal server error',
                message: 'An unexpected error occurred',
            }, { status: 500 });
        }
    };
}
// Pagination validation middleware
export function withPaginationValidation(inputSchema, outputSchema, handler) {
    return async (request) => {
        try {
            // Get authenticated user
            const supabase = await createClient();
            const { data: { user }, error: authError, } = await supabase.auth.getUser();
            if (authError || !user) {
                return NextResponse.json({
                    error: 'Unauthorized',
                    message: 'Authentication required',
                }, { status: 401 });
            }
            // Parse and validate input
            let validatedInput;
            if (request.method === 'GET') {
                // Parse query parameters
                const url = new URL(request.url);
                const params = Object.fromEntries(url.searchParams);
                validatedInput = inputSchema.parse(params);
            }
            else {
                // Parse JSON body
                const body = await request.json();
                validatedInput = inputSchema.parse(body);
            }
            // Create context
            const context = {
                user: user,
                validatedData: validatedInput,
            };
            // Execute handler
            const result = await handler(validatedInput, context, request);
            // Validate output items
            const validatedItems = result.items.map(item => outputSchema.parse(item));
            const validatedTotal = result.total;
            // Calculate pagination info
            const page = validatedInput.page || 1;
            const limit = validatedInput.limit || 20;
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
            });
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code,
                }));
                return NextResponse.json({
                    error: 'Validation failed',
                    message: 'Request or response data is invalid',
                    validationErrors,
                }, { status: 400 });
            }
            console.error('Pagination validation middleware error:', error);
            return NextResponse.json({
                error: 'Internal server error',
                message: 'An unexpected error occurred',
            }, { status: 500 });
        }
    };
}
// Rate limiting middleware
export function withRateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000 // 15 minutes
) {
    const requests = new Map();
    return function (handler) {
        return async (request) => {
            try {
                // Get authenticated user
                const supabase = await createClient();
                const { data: { user }, error: authError, } = await supabase.auth.getUser();
                if (authError || !user) {
                    return NextResponse.json({
                        error: 'Unauthorized',
                        message: 'Authentication required',
                    }, { status: 401 });
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
                }
                else if (userRequests.count >= maxRequests) {
                    return NextResponse.json({
                        error: 'Rate limit exceeded',
                        message: `Too many requests. Limit: ${maxRequests} per ${windowMs / 1000 / 60} minutes`,
                    }, { status: 429 });
                }
                else {
                    // Increment count
                    userRequests.count++;
                }
                // Create context
                const context = {
                    user: {
                        ...user,
                        id: user.id,
                        email: user.email || '',
                    },
                };
                // Execute handler
                return await handler({}, context, request);
            }
            catch (error) {
                console.error('Rate limit middleware error:', error);
                return NextResponse.json({
                    error: 'Internal server error',
                    message: 'An unexpected error occurred',
                }, { status: 500 });
            }
        };
    };
}
// CORS middleware
export function withCORS(allowedOrigins = ['http://localhost:3000'], allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders = ['Content-Type', 'Authorization']) {
    return function (handler) {
        return async (request) => {
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
            const response = await handler({}, { user: {} }, request);
            // Add CORS headers to response
            const origin = request.headers.get('origin');
            if (origin && allowedOrigins.includes(origin)) {
                response.headers.set('Access-Control-Allow-Origin', origin);
            }
            response.headers.set('Access-Control-Allow-Methods', allowedMethods.join(', '));
            response.headers.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));
            return response;
        };
    };
}
// Error handling middleware
export function withErrorHandling(handler) {
    return async (request) => {
        try {
            return await handler({}, { user: {} }, request);
        }
        catch (error) {
            console.error('API Error:', error);
            // Handle different types of errors
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    return NextResponse.json({
                        error: 'Not found',
                        message: error.message,
                    }, { status: 404 });
                }
                if (error.message.includes('permission') ||
                    error.message.includes('access')) {
                    return NextResponse.json({
                        error: 'Forbidden',
                        message: error.message,
                    }, { status: 403 });
                }
            }
            return NextResponse.json({
                error: 'Internal server error',
                message: 'An unexpected error occurred',
            }, { status: 500 });
        }
    };
}
//# sourceMappingURL=validation-middleware.js.map