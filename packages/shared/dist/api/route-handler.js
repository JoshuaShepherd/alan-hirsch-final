import { createSupabaseServerClient } from '@platform/database';
import { z } from 'zod';
import { ApiError, ErrorCode, createPaginatedResponse, createSuccessResponse, handleApiError, } from './error-handler';
// ============================================================================
// Core Route Handler Factory
// ============================================================================
/**
 * Creates a type-safe API route handler with automatic validation and error handling
 */
export function createRouteHandler(config) {
    return async (request, { params } = {}) => {
        try {
            // Method validation
            if (config.method && request.method !== config.method) {
                throw new ApiError(`Method ${request.method} not allowed`, ErrorCode.VALIDATION_ERROR, 405);
            }
            // Authentication check
            let user = null;
            if (config.requireAuth !== false) {
                const supabase = await createSupabaseServerClient();
                const { data: { user: authUser }, error: authError, } = await supabase.auth.getUser();
                if (authError || !authUser) {
                    throw new ApiError('Authentication required', ErrorCode.AUTHENTICATION_ERROR, 401);
                }
                user = {
                    ...authUser,
                    id: authUser.id,
                    email: authUser.email || '',
                };
            }
            // Parse and validate input
            let validatedInput;
            if (config.inputSchema) {
                if (request.method === 'GET') {
                    // Parse query parameters
                    const url = new URL(request.url);
                    const queryParams = Object.fromEntries(url.searchParams.entries());
                    validatedInput = config.inputSchema.parse(queryParams);
                }
                else {
                    // Parse JSON body
                    const body = await request.json();
                    validatedInput = config.inputSchema.parse(body);
                }
            }
            else {
                validatedInput = {};
            }
            // Create context
            const context = {
                user: user,
                request,
                params,
            };
            // Execute handler
            const result = await config.handler(validatedInput, context);
            // Validate output if schema provided
            if (config.outputSchema) {
                const validatedOutput = config.outputSchema.parse(result);
                return createSuccessResponse(validatedOutput);
            }
            return createSuccessResponse(result);
        }
        catch (error) {
            return handleApiError(error, request.url);
        }
    };
}
// ============================================================================
// Specialized Route Handlers
// ============================================================================
/**
 * Creates a paginated route handler with automatic pagination logic
 */
export function createPaginatedRouteHandler(config) {
    return async (request, { params } = {}) => {
        try {
            // Method validation
            if (config.method && request.method !== config.method) {
                throw new ApiError(`Method ${request.method} not allowed`, ErrorCode.VALIDATION_ERROR, 405);
            }
            // Authentication check
            let user = null;
            if (config.requireAuth !== false) {
                const supabase = await createSupabaseServerClient();
                const { data: { user: authUser }, error: authError, } = await supabase.auth.getUser();
                if (authError || !authUser) {
                    throw new ApiError('Authentication required', ErrorCode.AUTHENTICATION_ERROR, 401);
                }
                user = {
                    ...authUser,
                    id: authUser.id,
                    email: authUser.email || '',
                };
            }
            // Parse and validate input
            let validatedInput;
            if (config.inputSchema) {
                if (request.method === 'GET') {
                    // Parse query parameters
                    const url = new URL(request.url);
                    const queryParams = Object.fromEntries(url.searchParams.entries());
                    validatedInput = config.inputSchema.parse(queryParams);
                }
                else {
                    // Parse JSON body
                    const body = await request.json();
                    validatedInput = config.inputSchema.parse(body);
                }
            }
            else {
                validatedInput = {};
            }
            // Create context
            const context = {
                user: user,
                request,
                params,
            };
            // Execute handler
            const result = await config.handler(validatedInput, context);
            // Validate output items if schema provided
            let validatedItems = result.items;
            if (config.outputSchema) {
                validatedItems = result.items.map(item => config.outputSchema.parse(item));
            }
            // Calculate pagination info
            const page = validatedInput.page || 1;
            const limit = validatedInput.limit || 20;
            const hasMore = page * limit < result.total;
            return createPaginatedResponse(validatedItems, {
                page,
                limit,
                total: result.total,
                hasMore,
            });
        }
        catch (error) {
            return handleApiError(error, request.url);
        }
    };
}
// ============================================================================
// CRUD Route Handlers
// ============================================================================
/**
 * Creates a complete CRUD route handler for a resource
 */
export function createCrudRoutes(config) {
    // GET /api/[entity] - List entities
    const listHandler = createPaginatedRouteHandler({
        inputSchema: config.querySchema,
        outputSchema: config.responseSchema,
        method: 'GET',
        handler: async (query, context) => {
            return await config.service.findMany(query, context);
        },
    });
    // POST /api/[entity] - Create entity
    const createHandler = createRouteHandler({
        inputSchema: config.createSchema,
        outputSchema: config.responseSchema,
        method: 'POST',
        handler: async (data, context) => {
            return await config.service.create(data, context);
        },
    });
    // GET /api/[entity]/[id] - Get entity by ID
    const getByIdHandler = createRouteHandler({
        inputSchema: z.object({}),
        outputSchema: config.responseSchema,
        method: 'GET',
        handler: async (_, context) => {
            const id = context.params?.['id'];
            if (!id) {
                throw new ApiError(`${config.entityName} ID is required`, ErrorCode.VALIDATION_ERROR, 400);
            }
            const entity = await config.service.findById(id, context);
            if (!entity) {
                throw new ApiError(`${config.entityName} not found`, ErrorCode.NOT_FOUND, 404);
            }
            return entity;
        },
    });
    // PUT /api/[entity]/[id] - Update entity
    const updateHandler = createRouteHandler({
        inputSchema: config.updateSchema,
        outputSchema: config.responseSchema,
        method: 'PUT',
        handler: async (data, context) => {
            const id = context.params?.['id'];
            if (!id) {
                throw new ApiError(`${config.entityName} ID is required`, ErrorCode.VALIDATION_ERROR, 400);
            }
            return await config.service.update(id, data, context);
        },
    });
    // DELETE /api/[entity]/[id] - Delete entity
    const deleteHandler = createRouteHandler({
        inputSchema: z.object({}),
        method: 'DELETE',
        handler: async (_, context) => {
            const id = context.params?.['id'];
            if (!id) {
                throw new ApiError(`${config.entityName} ID is required`, ErrorCode.VALIDATION_ERROR, 400);
            }
            await config.service.delete(id, context);
            return { success: true };
        },
    });
    return {
        list: listHandler,
        create: createHandler,
        getById: getByIdHandler,
        update: updateHandler,
        delete: deleteHandler,
    };
}
// ============================================================================
// Utility Functions
// ============================================================================
/**
 * Extracts and validates route parameters
 */
export function extractRouteParams(params, schema) {
    if (!params) {
        throw new ApiError('Route parameters are required', ErrorCode.VALIDATION_ERROR, 400);
    }
    return schema.parse(params);
}
/**
 * Creates a query parameter schema with common pagination fields
 */
export function createQuerySchema(baseSchema) {
    return z.object({
        ...baseSchema,
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
        sort: z.string().optional(),
        order: z.enum(['asc', 'desc']).default('desc'),
    });
}
/**
 * Creates an ID parameter schema
 */
export const idParamSchema = z.object({
    id: z.string().uuid(),
});
/**
 * Creates a bulk operation schema
 */
export function createBulkSchema(itemSchema) {
    return z.object({
        items: z.array(itemSchema).min(1).max(100),
    });
}
// ============================================================================
// Export Types
// ============================================================================
// Note: Types are already exported as interfaces above
// No need for separate type exports to avoid conflicts
//# sourceMappingURL=route-handler.js.map