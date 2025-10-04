import { NextRequest, NextResponse } from 'next/server';
export interface MinistryPlatformContext {
    userId: string;
    organizationId?: string;
    userRole?: string;
    permissions: string[];
    ministryRole?: string;
    culturalContext?: string;
}
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
export declare function validateMinistryPlatformRequest(request: NextRequest, context: MinistryPlatformContext, options?: {
    requiredPermissions?: string[];
    organizationContext?: boolean;
    entityValidation?: {
        type: 'content' | 'assessment' | 'organization';
        id: string;
    };
}): {
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
}): (request: NextRequest) => Promise<NextResponse>;
//# sourceMappingURL=ministry-platform-middleware.d.ts.map