import { ministryPaginatedResponseSchema, ministryPlatformResponseSchema, } from '@/lib/contracts';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { ApiError, ErrorCode, handleApiError } from './error-handler';
import { validateCrossEntityAccess, validateEgressResponse, validateIngressRequest, validateOrganizationContext, validateRoleBasedPermissions, } from './ministry-platform-validation';
// ============================================================================
// MINISTRY PLATFORM ROUTE HANDLER FACTORY
// ============================================================================
/**
 * Creates a type-safe ministry platform API route handler with automatic validation and error handling
 */
export function createMinistryRouteHandler(config) {
    return async (request, { params } = {}) => {
        try {
            // Method validation
            if (config.method && request.method !== config.method) {
                throw new ApiError(`Method ${request.method} not allowed`, ErrorCode.VALIDATION_ERROR, 405);
            }
            // Authentication check
            let user = null;
            if (config.requireAuth !== false) {
                const supabase = await createClient();
                const { data: { user: authUser }, error: authError, } = await supabase.auth.getUser();
                if (authError || !authUser) {
                    throw new ApiError('Authentication required', ErrorCode.AUTHENTICATION_ERROR, 401);
                }
                // TODO: Fetch user profile and organization context from database
                user = {
                    id: authUser.id,
                    email: authUser.email || '',
                    ministryRole: 'emerging_leader', // This should come from user profile
                    organizationId: undefined, // This should come from user profile
                    culturalContext: 'western', // This should come from user profile
                    permissions: ['read'], // This should come from user profile
                    ...authUser,
                };
            }
            // Create ministry platform context
            const ministryContext = {
                userId: user?.id || 'anonymous',
                organizationId: user?.organizationId,
                userRole: 'viewer', // This should come from organization membership
                permissions: user?.permissions || [],
                ministryRole: user?.ministryRole,
                culturalContext: user?.culturalContext,
                requestId: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
            };
            // Validate organization context if required
            if (config.organizationContext) {
                const orgValidation = validateOrganizationContext(request, ministryContext);
                if (!orgValidation.isValid) {
                    return orgValidation.error;
                }
            }
            // Validate role-based permissions if required
            if (config.requiredPermissions?.length) {
                const permissionValidation = validateRoleBasedPermissions(config.requiredPermissions, ministryContext);
                if (!permissionValidation.isValid) {
                    return permissionValidation.error;
                }
            }
            // Validate cross-entity access if required
            if (config.entityValidation) {
                const entityValidation = validateCrossEntityAccess(config.entityValidation.type, config.entityValidation.id, ministryContext);
                if (!entityValidation.isValid) {
                    return entityValidation.error;
                }
            }
            // Parse and validate input (ingress validation)
            let validatedInput;
            if (config.inputSchema) {
                const ingressValidation = validateIngressRequest(request, config.inputSchema, ministryContext);
                if (!ingressValidation.isValid) {
                    return ingressValidation.error;
                }
                validatedInput = ingressValidation.data;
            }
            else {
                validatedInput = {};
            }
            // Create context
            const context = {
                user: user,
                request,
                params,
                ministryContext,
            };
            // Execute handler
            const result = await config.handler(validatedInput, context);
            // Validate output (egress validation)
            if (config.outputSchema) {
                const egressValidation = validateEgressResponse(result, config.outputSchema, ministryContext);
                if (!egressValidation.isValid) {
                    return egressValidation.error;
                }
                const validatedOutput = egressValidation.validatedData;
                return createMinistrySuccessResponse(validatedOutput, ministryContext);
            }
            return createMinistrySuccessResponse(result, ministryContext);
        }
        catch (error) {
            return handleApiError(error, request.url);
        }
    };
}
// ============================================================================
// MINISTRY PAGINATED ROUTE HANDLER
// ============================================================================
/**
 * Creates a paginated ministry platform route handler with automatic pagination logic
 */
export function createMinistryPaginatedRouteHandler(config) {
    return async (request, { params } = {}) => {
        try {
            // Method validation
            if (config.method && request.method !== config.method) {
                throw new ApiError(`Method ${request.method} not allowed`, ErrorCode.VALIDATION_ERROR, 405);
            }
            // Authentication check
            let user = null;
            if (config.requireAuth !== false) {
                const supabase = await createClient();
                const { data: { user: authUser }, error: authError, } = await supabase.auth.getUser();
                if (authError || !authUser) {
                    throw new ApiError('Authentication required', ErrorCode.AUTHENTICATION_ERROR, 401);
                }
                // TODO: Fetch user profile and organization context from database
                user = {
                    id: authUser.id,
                    email: authUser.email || '',
                    ministryRole: 'emerging_leader',
                    organizationId: undefined,
                    culturalContext: 'western',
                    permissions: ['read'],
                    ...authUser,
                };
            }
            // Create ministry platform context
            const ministryContext = {
                userId: user?.id || 'anonymous',
                organizationId: user?.organizationId,
                userRole: 'viewer',
                permissions: user?.permissions || [],
                ministryRole: user?.ministryRole,
                culturalContext: user?.culturalContext,
                requestId: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
            };
            // Validate organization context if required
            if (config.organizationContext) {
                const orgValidation = validateOrganizationContext(request, ministryContext);
                if (!orgValidation.isValid) {
                    return orgValidation.error;
                }
            }
            // Validate role-based permissions if required
            if (config.requiredPermissions?.length) {
                const permissionValidation = validateRoleBasedPermissions(config.requiredPermissions, ministryContext);
                if (!permissionValidation.isValid) {
                    return permissionValidation.error;
                }
            }
            // Validate cross-entity access if required
            if (config.entityValidation) {
                const entityValidation = validateCrossEntityAccess(config.entityValidation.type, config.entityValidation.id, ministryContext);
                if (!entityValidation.isValid) {
                    return entityValidation.error;
                }
            }
            // Parse and validate input (ingress validation)
            let validatedInput;
            if (config.inputSchema) {
                const ingressValidation = validateIngressRequest(request, config.inputSchema, ministryContext);
                if (!ingressValidation.isValid) {
                    return ingressValidation.error;
                }
                validatedInput = ingressValidation.data;
            }
            else {
                validatedInput = {};
            }
            // Create context
            const context = {
                user: user,
                request,
                params,
                ministryContext,
            };
            // Execute handler
            const result = await config.handler(validatedInput, context);
            // Validate output items if schema provided
            let validatedItems = result.items;
            if (config.outputSchema) {
                validatedItems = result.items.map(item => {
                    const egressValidation = validateEgressResponse(item, config.outputSchema, ministryContext);
                    if (!egressValidation.isValid) {
                        throw new Error(`Response validation failed: ${egressValidation.error}`);
                    }
                    return egressValidation.validatedData;
                });
            }
            // Calculate pagination info
            const page = validatedInput.page || 1;
            const limit = validatedInput.limit || 20;
            const hasMore = page * limit < result.total;
            return createMinistryPaginatedResponse(validatedItems, {
                page,
                limit,
                total: result.total,
                hasMore,
            }, ministryContext);
        }
        catch (error) {
            return handleApiError(error, request.url);
        }
    };
}
// ============================================================================
// MINISTRY PLATFORM RESPONSE HELPERS
// ============================================================================
/**
 * Creates a ministry platform success response with enhanced metadata
 */
export function createMinistrySuccessResponse(data, context, message) {
    const response = {
        data,
        success: true,
        message,
        ministryContext: {
            userMinistryRole: context.ministryRole,
            organizationContext: context.organizationId
                ? {
                    organizationId: context.organizationId,
                    userRole: context.userRole,
                    permissions: context.permissions,
                }
                : undefined,
            culturalContext: context.culturalContext,
            permissions: context.permissions,
        },
        metadata: {
            requestId: context.requestId,
            timestamp: context.timestamp,
            version: '1.0.0',
        },
    };
    // Validate response with ministry platform schema
    try {
        const validatedResponse = ministryPlatformResponseSchema(z.any()).parse(response);
        return new Response(JSON.stringify(validatedResponse), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        console.error('Ministry platform response validation failed:', error);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
/**
 * Creates a ministry platform paginated response with enhanced metadata
 */
export function createMinistryPaginatedResponse(items, pagination, context, message) {
    const response = {
        data: {
            items,
            pagination: {
                ...pagination,
                totalPages: Math.ceil(pagination.total / pagination.limit),
                hasNext: pagination.hasMore,
                hasPrev: pagination.page > 1,
            },
            ministryMetrics: {
                totalMinistryLeaders: undefined, // TODO: Calculate from data
                averageEngagement: undefined, // TODO: Calculate from data
                culturalDistribution: undefined, // TODO: Calculate from data
                ministryRoleDistribution: undefined, // TODO: Calculate from data
            },
        },
        success: true,
        message,
        ministryContext: {
            userMinistryRole: context.ministryRole,
            organizationContext: context.organizationId
                ? {
                    organizationId: context.organizationId,
                    userRole: context.userRole,
                    permissions: context.permissions,
                }
                : undefined,
            culturalContext: context.culturalContext,
            permissions: context.permissions,
        },
        metadata: {
            requestId: context.requestId,
            timestamp: context.timestamp,
            version: '1.0.0',
        },
    };
    // Validate response with ministry platform paginated schema
    try {
        const validatedResponse = ministryPaginatedResponseSchema(z.any()).parse(response);
        return new Response(JSON.stringify(validatedResponse), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        console.error('Ministry platform paginated response validation failed:', error);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Creates a query parameter schema with ministry-specific fields
 */
export function createMinistryQuerySchema(baseSchema) {
    return z.object({
        ...baseSchema,
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
        sort: z.string().optional(),
        order: z.enum(['asc', 'desc']).default('desc'),
        organizationId: z.string().uuid().optional(),
        ministryRole: z.string().optional(),
        culturalContext: z.string().optional(),
    });
}
//# sourceMappingURL=ministry-route-handler.js.map