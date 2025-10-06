import { createSupabaseServerClient, db } from '@platform/database';
import { NextResponse } from 'next/server';
import { z } from 'zod';
// Create type-safe API route with input/output validation
export function createApiRoute(inputSchema, outputSchema, handler) {
    return async (request) => {
        try {
            // Get authenticated user
            const supabase = await createSupabaseServerClient();
            const { data: { user }, error: authError, } = await supabase.auth.getUser();
            if (authError || !user) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
            // Execute handler
            const result = await handler(validatedInput, { user: user, db });
            // Validate output - handler should return the full response envelope
            const validatedOutput = outputSchema.parse(result);
            return NextResponse.json(validatedOutput);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return NextResponse.json({
                    error: 'Validation failed',
                    details: validationErrors,
                }, { status: 400 });
            }
            console.error('API Error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    };
}
// Create API route with input validation only (for cases where output is complex)
export function createApiRouteInputOnly(inputSchema, handler) {
    return async (request) => {
        try {
            // Get authenticated user
            const supabase = await createSupabaseServerClient();
            const { data: { user }, error: authError, } = await supabase.auth.getUser();
            if (authError || !user) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
            // Execute handler
            const result = await handler(validatedInput, { user: user, db });
            return NextResponse.json({
                data: result,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return NextResponse.json({
                    error: 'Validation failed',
                    details: validationErrors,
                }, { status: 400 });
            }
            console.error('API Error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    };
}
// Create paginated API route
export function createPaginatedApiRoute(inputSchema, outputSchema, handler) {
    return async (request) => {
        try {
            // Get authenticated user
            const supabase = await createSupabaseServerClient();
            const { data: { user }, error: authError, } = await supabase.auth.getUser();
            if (authError || !user) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
            // Execute handler
            const result = await handler(validatedInput, { user: user, db });
            // Validate the full response
            const validatedResponse = outputSchema.parse(result);
            return NextResponse.json(validatedResponse);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return NextResponse.json({
                    error: 'Validation failed',
                    details: validationErrors,
                }, { status: 400 });
            }
            console.error('API Error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    };
}
// Utility for creating response schemas
export const createResponseSchema = (dataSchema) => z.object({
    data: dataSchema,
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
});
export const createPaginatedResponseSchema = (itemSchema) => z.object({
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
//# sourceMappingURL=utils.js.map