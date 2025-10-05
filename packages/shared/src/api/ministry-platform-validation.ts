import {
  crossEntityValidationSchema,
  ministryPlatformErrorSchema,
  organizationScopedRequestSchema,
  roleBasedValidationSchema,
} from '@platform/contracts';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ============================================================================
// ENHANCED MINISTRY PLATFORM VALIDATION MIDDLEWARE
// ============================================================================

export interface MinistryPlatformContext {
  userId: string;
  organizationId?: string;
  userRole?: string;
  permissions: string[];
  ministryRole?: string;
  culturalContext?: string;
  requestId: string;
  timestamp: string;
}

// ============================================================================
// INGRESS VALIDATION (Request Validation)
// ============================================================================

/**
 * Validates incoming request data with Zod schemas
 */
export function validateIngressRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
  context: MinistryPlatformContext
): { isValid: boolean; data?: T; error?: NextResponse } {
  try {
    let requestData: unknown;

    if (request.method === 'GET') {
      // Parse query parameters
      const url = new URL(request.url);
      const queryParams = Object.fromEntries(url.searchParams.entries());
      requestData = queryParams;
    } else {
      // Parse JSON body
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        // For JSON requests, we'll need to clone the request to read the body
        // This is a simplified version - in practice, you'd handle this in the route handler
        requestData = {};
      } else {
        requestData = {};
      }
    }

    const validatedData = schema.parse(requestData);
    return { isValid: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: createMinistryPlatformError(
          'Validation failed',
          'Request data validation failed',
          'VALIDATION_ERROR',
          context,
          {
            errors: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          }
        ),
      };
    }

    return {
      isValid: false,
      error: createMinistryPlatformError(
        'Request parsing failed',
        'Failed to parse request data',
        'REQUEST_PARSING_ERROR',
        context,
        error instanceof Error ? error.message : 'Unknown error'
      ),
    };
  }
}

// ============================================================================
// EGRESS VALIDATION (Response Validation)
// ============================================================================

/**
 * Validates outgoing response data with Zod schemas
 */
export function validateEgressResponse<T>(
  data: T,
  schema: z.ZodSchema<T>,
  context: MinistryPlatformContext
): { isValid: boolean; validatedData?: T; error?: NextResponse } {
  try {
    const validatedData = schema.parse(data);
    return { isValid: true, validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: createMinistryPlatformError(
          'Response validation failed',
          'Response data validation failed',
          'RESPONSE_VALIDATION_ERROR',
          context,
          {
            errors: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message,
              code: err.code,
            })),
          }
        ),
      };
    }

    return {
      isValid: false,
      error: createMinistryPlatformError(
        'Response processing failed',
        'Failed to process response data',
        'RESPONSE_PROCESSING_ERROR',
        context,
        error instanceof Error ? error.message : 'Unknown error'
      ),
    };
  }
}

// ============================================================================
// ORGANIZATION CONTEXT VALIDATION
// ============================================================================

export function validateOrganizationContext(
  request: NextRequest,
  context: MinistryPlatformContext
): { isValid: boolean; error?: NextResponse } {
  try {
    // Extract organization context from request headers
    const organizationContext = request.headers.get('x-organization-context');

    if (organizationContext) {
      const parsedContext = JSON.parse(organizationContext);
      const validatedContext =
        organizationScopedRequestSchema.parse(parsedContext);

      // Verify user has access to the organization
      if (validatedContext.organizationId !== context.organizationId) {
        return {
          isValid: false,
          error: createMinistryPlatformError(
            'Organization access denied',
            'You do not have access to the specified organization',
            'ORGANIZATION_ACCESS_DENIED',
            context,
            {
              organizationId: validatedContext.organizationId,
              userRole: context.userRole,
              requiredPermissions: ['organization_access'],
              suggestedActions: [
                'Verify organization membership',
                'Contact organization admin',
              ],
            }
          ),
        };
      }
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: createMinistryPlatformError(
        'Invalid organization context',
        'Organization context validation failed',
        'INVALID_ORGANIZATION_CONTEXT',
        context,
        error instanceof z.ZodError ? error.errors : undefined
      ),
    };
  }
}

// ============================================================================
// ROLE-BASED PERMISSION VALIDATION
// ============================================================================

export function validateRoleBasedPermissions(
  requiredPermissions: string[],
  context: MinistryPlatformContext
): { isValid: boolean; error?: NextResponse } {
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
            canManageContent: ['owner', 'admin', 'member'].includes(
              context.userRole || ''
            ),
            canViewAnalytics: ['owner', 'admin'].includes(
              context.userRole || ''
            ),
            canManageSubscriptions: context.userRole === 'owner',
          }
        : undefined,
      fieldPermissions: getFieldPermissions(context.userRole || 'viewer'),
    };

    const validatedData = roleBasedValidationSchema.parse(validationData);

    // Check if user has all required permissions
    const hasAllPermissions = requiredPermissions.every(permission =>
      context.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      return {
        isValid: false,
        error: createMinistryPlatformError(
          'Insufficient permissions',
          `Required permissions: ${requiredPermissions.join(', ')}`,
          'INSUFFICIENT_PERMISSIONS',
          context,
          {
            organizationId: context.organizationId,
            userRole: context.userRole,
            requiredPermissions,
            suggestedActions: [
              'Contact organization admin',
              'Request permission upgrade',
            ],
          }
        ),
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: createMinistryPlatformError(
        'Permission validation failed',
        'Role-based permission validation failed',
        'PERMISSION_VALIDATION_ERROR',
        context,
        error instanceof z.ZodError ? error.errors : undefined
      ),
    };
  }
}

// ============================================================================
// CROSS-ENTITY VALIDATION
// ============================================================================

export function validateCrossEntityAccess(
  entityType: 'content' | 'assessment' | 'organization',
  entityId: string,
  context: MinistryPlatformContext
): { isValid: boolean; error?: NextResponse } {
  try {
    // This would typically involve database queries to verify ownership/access
    // For now, we'll create a mock validation structure

    const validationData = {
      contentOwnership:
        entityType === 'content'
          ? {
              contentId: entityId,
              authorId: context.userId,
              organizationId: context.organizationId,
              userHasAccess: true, // TODO: Implement actual access check
            }
          : undefined,
      assessmentEligibility:
        entityType === 'assessment'
          ? {
              assessmentId: entityId,
              userId: context.userId,
              userProfileComplete: true, // TODO: Check user profile completion
              prerequisitesMet: true, // TODO: Check assessment prerequisites
              canTakeAssessment: true, // TODO: Implement eligibility logic
            }
          : undefined,
      organizationAccess:
        entityType === 'organization'
          ? {
              organizationId: entityId,
              userId: context.userId,
              hasActiveMembership: true, // TODO: Check organization membership
              membershipRole: context.userRole as any,
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
        error: createMinistryPlatformError(
          'Entity access denied',
          `You do not have access to this ${entityType}`,
          'ENTITY_ACCESS_DENIED',
          context,
          {
            organizationId: context.organizationId,
            userRole: context.userRole,
            requiredPermissions: [`${entityType}_access`],
            suggestedActions: [
              'Verify ownership',
              'Check organization membership',
              'Contact support',
            ],
          }
        ),
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: createMinistryPlatformError(
        'Cross-entity validation failed',
        'Entity access validation failed',
        'CROSS_ENTITY_VALIDATION_ERROR',
        context,
        error instanceof z.ZodError ? error.errors : undefined
      ),
    };
  }
}

// ============================================================================
// MINISTRY PLATFORM ERROR HANDLER
// ============================================================================

export function createMinistryPlatformError(
  error: string,
  message: string,
  code: string,
  context?: MinistryPlatformContext,
  details?: any
): NextResponse {
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
  } catch (validationError) {
    // Fallback to basic error response if validation fails
    return NextResponse.json(
      {
        error: 'Validation error',
        message: 'Error response validation failed',
        success: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getFieldPermissions(role: string): Record<string, boolean> {
  const fieldPermissions: Record<string, Record<string, boolean>> = {
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

export function withMinistryPlatformValidation(
  handler: (
    request: NextRequest,
    context: MinistryPlatformContext
  ) => Promise<NextResponse>,
  options: {
    requiredPermissions?: string[];
    organizationContext?: boolean;
    entityValidation?: {
      type: 'content' | 'assessment' | 'organization';
      id: string;
    };
    inputSchema?: z.ZodSchema<any>;
    outputSchema?: z.ZodSchema<any>;
  } = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Create ministry platform context
      const context: MinistryPlatformContext = {
        userId: 'temp-user-id', // This should come from auth middleware
        organizationId: undefined,
        userRole: 'viewer',
        permissions: [],
        ministryRole: undefined,
        culturalContext: undefined,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };

      // Validate organization context if required
      if (options.organizationContext) {
        const orgValidation = validateOrganizationContext(request, context);
        if (!orgValidation.isValid) {
          return orgValidation.error!;
        }
      }

      // Validate role-based permissions if required
      if (options.requiredPermissions?.length) {
        const permissionValidation = validateRoleBasedPermissions(
          options.requiredPermissions,
          context
        );
        if (!permissionValidation.isValid) {
          return permissionValidation.error!;
        }
      }

      // Validate cross-entity access if required
      if (options.entityValidation) {
        const entityValidation = validateCrossEntityAccess(
          options.entityValidation.type,
          options.entityValidation.id,
          context
        );
        if (!entityValidation.isValid) {
          return entityValidation.error!;
        }
      }

      // Call the original handler
      const response = await handler(request, context);

      // TODO: Add egress validation here if outputSchema is provided
      // This would require parsing the response body and validating it

      return response;
    } catch (error) {
      console.error('Ministry platform validation middleware error:', error);

      return createMinistryPlatformError(
        'Middleware error',
        'Ministry platform validation middleware failed',
        'MIDDLEWARE_ERROR',
        undefined,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };
}
