import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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
/**
 * Validates incoming request data with Zod schemas
 */
export declare function validateIngressRequest<T>(request: NextRequest, schema: z.ZodSchema<T>, context: MinistryPlatformContext): {
    isValid: boolean;
    data?: T;
    error?: NextResponse;
};
/**
 * Validates outgoing response data with Zod schemas
 */
export declare function validateEgressResponse<T>(data: T, schema: z.ZodSchema<T>, context: MinistryPlatformContext): {
    isValid: boolean;
    validatedData?: T;
    error?: NextResponse;
};
export declare function validateOrganizationContext(request: NextRequest, context: MinistryPlatformContext): {
    isValid: boolean;
    error?: NextResponse;
};
export declare function validateRoleBasedPermissions(requiredPermissions: string[], context: MinistryPlatformContext): {
    isValid: boolean;
    error?: NextResponse;
};
export declare function validateCrossEntityAccess(entityType: 'content' | 'assessment' | 'organization', entityId: string, context: MinistryPlatformContext): {
    isValid: boolean;
    error?: NextResponse;
};
export declare function createMinistryPlatformError(error: string, message: string, code: string, context?: MinistryPlatformContext, details?: any): NextResponse;
export declare function withMinistryPlatformValidation(handler: (request: NextRequest, context: MinistryPlatformContext) => Promise<NextResponse>, options?: {
    requiredPermissions?: string[];
    organizationContext?: boolean;
    entityValidation?: {
        type: 'content' | 'assessment' | 'organization';
        id: string;
    };
    inputSchema?: z.ZodSchema<any>;
    outputSchema?: z.ZodSchema<any>;
}): (request: NextRequest) => Promise<NextResponse>;
//# sourceMappingURL=ministry-platform-validation.d.ts.map