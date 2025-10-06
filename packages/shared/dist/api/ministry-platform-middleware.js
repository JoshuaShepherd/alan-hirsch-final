import { crossEntityValidationSchema, ministryPlatformErrorSchema, organizationScopedRequestSchema, roleBasedValidationSchema, } from '@platform/contracts';
import { NextResponse } from 'next/server';
import { z } from 'zod';
// ============================================================================
// ORGANIZATION CONTEXT VALIDATION
// ============================================================================
export function validateOrganizationContext(request, context) {
    try {
        // Extract organization context from request
        const organizationContext = request.headers.get('x-organization-context');
        if (organizationContext) {
            const parsedContext = JSON.parse(organizationContext);
            const validatedContext = organizationScopedRequestSchema.parse(parsedContext);
            // Verify user has access to the organization
            if (validatedContext.organizationId !== context.organizationId) {
                return {
                    isValid: false,
                    error: NextResponse.json({
                        error: 'Organization access denied',
                        message: 'You do not have access to the specified organization',
                        code: 'ORGANIZATION_ACCESS_DENIED',
                        ministryContext: {
                            organizationId: validatedContext.organizationId,
                            userRole: context.userRole,
                            requiredPermissions: ['organization_access'],
                            suggestedActions: [
                                'Verify organization membership',
                                'Contact organization admin',
                            ],
                        },
                        success: false,
                        timestamp: new Date().toISOString(),
                    }, { status: 403 }),
                };
            }
        }
        return { isValid: true };
    }
    catch (error) {
        return {
            isValid: false,
            error: NextResponse.json({
                error: 'Invalid organization context',
                message: 'Organization context validation failed',
                code: 'INVALID_ORGANIZATION_CONTEXT',
                details: error instanceof z.ZodError ? error.errors : undefined,
                success: false,
                timestamp: new Date().toISOString(),
            }, { status: 400 }),
        };
    }
}
// ============================================================================
// ROLE-BASED PERMISSION VALIDATION
// ============================================================================
export function validateRoleBasedPermissions(requiredPermissions, context) {
    try {
        const validationData = {
            userRole: context.userRole || 'viewer',
            organizationContext: context.organizationId
                ? {
                    organizationId: context.organizationId,
                    userRole: context.userRole || 'viewer',
                    permissions: context.permissions,
                    isOwner: context.userRole === 'owner',
                    isAdmin: ['owner', 'admin'].includes(context.userRole || ''),
                    canManageUsers: ['owner', 'admin'].includes(context.userRole || ''),
                    canManageContent: ['owner', 'admin', 'member'].includes(context.userRole || ''),
                    canViewAnalytics: ['owner', 'admin'].includes(context.userRole || ''),
                    canManageSubscriptions: context.userRole === 'owner',
                }
                : undefined,
            fieldPermissions: getFieldPermissions(context.userRole || 'viewer'),
        };
        const validatedData = roleBasedValidationSchema.parse(validationData);
        // Check if user has all required permissions
        const hasAllPermissions = requiredPermissions.every(permission => context.permissions.includes(permission));
        if (!hasAllPermissions) {
            return {
                isValid: false,
                error: NextResponse.json({
                    error: 'Insufficient permissions',
                    message: `Required permissions: ${requiredPermissions.join(', ')}`,
                    code: 'INSUFFICIENT_PERMISSIONS',
                    ministryContext: {
                        organizationId: context.organizationId,
                        userRole: context.userRole,
                        requiredPermissions,
                        suggestedActions: [
                            'Contact organization admin',
                            'Request permission upgrade',
                        ],
                    },
                    success: false,
                    timestamp: new Date().toISOString(),
                }, { status: 403 }),
            };
        }
        return { isValid: true };
    }
    catch (error) {
        return {
            isValid: false,
            error: NextResponse.json({
                error: 'Permission validation failed',
                message: 'Role-based permission validation failed',
                code: 'PERMISSION_VALIDATION_ERROR',
                details: error instanceof z.ZodError ? error.errors : undefined,
                success: false,
                timestamp: new Date().toISOString(),
            }, { status: 400 }),
        };
    }
}
// ============================================================================
// CROSS-ENTITY VALIDATION
// ============================================================================
export function validateCrossEntityAccess(entityType, entityId, context) {
    try {
        // This would typically involve database queries to verify ownership/access
        // For now, we'll create a mock validation structure
        const validationData = {
            contentOwnership: entityType === 'content'
                ? {
                    contentId: entityId,
                    authorId: context.userId,
                    organizationId: context.organizationId,
                    userHasAccess: true, // TODO: Implement actual access check
                }
                : undefined,
            assessmentEligibility: entityType === 'assessment'
                ? {
                    assessmentId: entityId,
                    userId: context.userId,
                    userProfileComplete: true, // TODO: Check user profile completion
                    prerequisitesMet: true, // TODO: Check assessment prerequisites
                    canTakeAssessment: true, // TODO: Implement eligibility logic
                }
                : undefined,
            organizationAccess: entityType === 'organization'
                ? {
                    organizationId: entityId,
                    userId: context.userId,
                    hasActiveMembership: true, // TODO: Check organization membership
                    membershipRole: context.userRole,
                    hasRequiredPermissions: true, // TODO: Check specific permissions
                }
                : undefined,
        };
        const validatedData = crossEntityValidationSchema.parse(validationData);
        // Check access based on entity type
        let hasAccess = false;
        switch (entityType) {
            case 'content':
                hasAccess = validatedData.contentOwnership?.userHasAccess || false;
                break;
            case 'assessment':
                hasAccess =
                    validatedData.assessmentEligibility?.canTakeAssessment || false;
                break;
            case 'organization':
                hasAccess =
                    validatedData.organizationAccess?.hasRequiredPermissions || false;
                break;
        }
        if (!hasAccess) {
            return {
                isValid: false,
                error: NextResponse.json({
                    error: 'Entity access denied',
                    message: `You do not have access to this ${entityType}`,
                    code: 'ENTITY_ACCESS_DENIED',
                    ministryContext: {
                        organizationId: context.organizationId,
                        userRole: context.userRole,
                        requiredPermissions: [`${entityType}_access`],
                        suggestedActions: [
                            'Verify ownership',
                            'Check organization membership',
                            'Contact support',
                        ],
                    },
                    success: false,
                    timestamp: new Date().toISOString(),
                }, { status: 403 }),
            };
        }
        return { isValid: true };
    }
    catch (error) {
        return {
            isValid: false,
            error: NextResponse.json({
                error: 'Cross-entity validation failed',
                message: 'Entity access validation failed',
                code: 'CROSS_ENTITY_VALIDATION_ERROR',
                details: error instanceof z.ZodError ? error.errors : undefined,
                success: false,
                timestamp: new Date().toISOString(),
            }, { status: 400 }),
        };
    }
}
// ============================================================================
// MINISTRY PLATFORM REQUEST VALIDATION
// ============================================================================
export function validateMinistryPlatformRequest(request, context, options = {}) {
    // Validate organization context if required
    if (options.organizationContext) {
        const orgValidation = validateOrganizationContext(request, context);
        if (!orgValidation.isValid) {
            return orgValidation;
        }
    }
    // Validate role-based permissions if required
    if (options.requiredPermissions?.length) {
        const permissionValidation = validateRoleBasedPermissions(options.requiredPermissions, context);
        if (!permissionValidation.isValid) {
            return permissionValidation;
        }
    }
    // Validate cross-entity access if required
    if (options.entityValidation) {
        const entityValidation = validateCrossEntityAccess(options.entityValidation.type, options.entityValidation.id, context);
        if (!entityValidation.isValid) {
            return entityValidation;
        }
    }
    return { isValid: true };
}
// ============================================================================
// MINISTRY PLATFORM ERROR HANDLER
// ============================================================================
export function createMinistryPlatformError(error, message, code, context, details) {
    const errorResponse = {
        error,
        message,
        code,
        ministryContext: context
            ? {
                organizationId: context.organizationId,
                userRole: context.userRole,
                requiredPermissions: [],
                suggestedActions: [],
            }
            : undefined,
        details,
        success: false,
        timestamp: new Date().toISOString(),
    };
    // Validate error response with ministry platform error schema
    try {
        const validatedError = ministryPlatformErrorSchema.parse(errorResponse);
        return NextResponse.json(validatedError, { status: 400 });
    }
    catch (validationError) {
        // Fallback to basic error response if validation fails
        return NextResponse.json({
            error: 'Validation error',
            message: 'Error response validation failed',
            success: false,
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function getFieldPermissions(role) {
    const fieldPermissions = {
        owner: {
            'organization.name': true,
            'organization.settings': true,
            'organization.billing': true,
            'user.role': true,
            'user.permissions': true,
            'content.visibility': true,
            'content.status': true,
            'analytics.all': true,
        },
        admin: {
            'organization.name': true,
            'organization.settings': false,
            'organization.billing': false,
            'user.role': true,
            'user.permissions': false,
            'content.visibility': true,
            'content.status': true,
            'analytics.all': true,
        },
        member: {
            'organization.name': true,
            'organization.settings': false,
            'organization.billing': false,
            'user.role': false,
            'user.permissions': false,
            'content.visibility': true,
            'content.status': true,
            'analytics.all': false,
        },
        viewer: {
            'organization.name': true,
            'organization.settings': false,
            'organization.billing': false,
            'user.role': false,
            'user.permissions': false,
            'content.visibility': false,
            'content.status': false,
            'analytics.all': false,
        },
    };
    return fieldPermissions[role] || fieldPermissions['viewer'];
}
// ============================================================================
// MIDDLEWARE COMPOSITION
// ============================================================================
export function withMinistryPlatformValidation(handler, options = {}) {
    return async (request) => {
        try {
            // TODO: Extract context from authentication middleware
            const context = {
                userId: 'temp-user-id', // This should come from auth
                organizationId: undefined,
                userRole: 'viewer',
                permissions: [],
                ministryRole: undefined,
                culturalContext: undefined,
            };
            // Validate ministry platform request
            const validation = validateMinistryPlatformRequest(request, context, options);
            if (!validation.isValid) {
                return validation.error;
            }
            // Call the original handler
            return await handler(request, context);
        }
        catch (error) {
            console.error('Ministry platform validation middleware error:', error);
            return createMinistryPlatformError('Middleware error', 'Ministry platform validation middleware failed', 'MIDDLEWARE_ERROR', undefined, error instanceof Error ? error.message : 'Unknown error');
        }
    };
}
//# sourceMappingURL=ministry-platform-middleware.js.map