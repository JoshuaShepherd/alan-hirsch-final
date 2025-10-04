import { z } from 'zod';
export declare const ministryPlatformResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any>[k]; } : never, z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>[k_1]; } : never>;
export declare const ministryPlatformErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    code: z.ZodString;
    ministryContext: z.ZodOptional<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodString>;
        userRole: any;
        requiredPermissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        suggestedActions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        organizationId?: unknown;
        userRole?: unknown;
        requiredPermissions?: unknown;
        suggestedActions?: unknown;
    }, {
        [x: string]: any;
        organizationId?: unknown;
        userRole?: unknown;
        requiredPermissions?: unknown;
        suggestedActions?: unknown;
    }>>;
    details: z.ZodOptional<z.ZodAny>;
    success: z.ZodLiteral<false>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    error: string;
    success: false;
    timestamp: string;
    message?: string | undefined;
    details?: any;
    ministryContext?: {
        [x: string]: any;
        organizationId?: unknown;
        userRole?: unknown;
        requiredPermissions?: unknown;
        suggestedActions?: unknown;
    } | undefined;
}, {
    code: string;
    error: string;
    success: false;
    timestamp: string;
    message?: string | undefined;
    details?: any;
    ministryContext?: {
        [x: string]: any;
        organizationId?: unknown;
        userRole?: unknown;
        requiredPermissions?: unknown;
        suggestedActions?: unknown;
    } | undefined;
}>;
export declare const ministryPaginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<T, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
        ministryMetrics: z.ZodOptional<z.ZodObject<{
            totalMinistryLeaders: z.ZodOptional<z.ZodNumber>;
            averageEngagement: z.ZodOptional<z.ZodNumber>;
            culturalDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            ministryRoleDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: T["_output"][];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: T["_input"][];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: T["_output"][];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: T["_input"][];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryUserProfileResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const ministryUserProfileListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
        ministryMetrics: z.ZodOptional<z.ZodObject<{
            totalMinistryLeaders: z.ZodOptional<z.ZodNumber>;
            averageEngagement: z.ZodOptional<z.ZodNumber>;
            culturalDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            ministryRoleDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryOrganizationResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const ministryOrganizationListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
        ministryMetrics: z.ZodOptional<z.ZodObject<{
            totalMinistryLeaders: z.ZodOptional<z.ZodNumber>;
            averageEngagement: z.ZodOptional<z.ZodNumber>;
            culturalDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            ministryRoleDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryOrganizationMembershipResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        membershipId: z.ZodString;
        userId: z.ZodString;
        organizationId: z.ZodString;
        role: any;
        status: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
        joinedAt: z.ZodString;
        user: any;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        membershipId?: unknown;
        userId?: unknown;
        organizationId?: unknown;
        role?: unknown;
        status?: unknown;
        joinedAt?: unknown;
        user?: unknown;
    }, {
        [x: string]: any;
        membershipId?: unknown;
        userId?: unknown;
        organizationId?: unknown;
        role?: unknown;
        status?: unknown;
        joinedAt?: unknown;
        user?: unknown;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        [x: string]: any;
        membershipId?: unknown;
        userId?: unknown;
        organizationId?: unknown;
        role?: unknown;
        status?: unknown;
        joinedAt?: unknown;
        user?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        [x: string]: any;
        membershipId?: unknown;
        userId?: unknown;
        organizationId?: unknown;
        role?: unknown;
        status?: unknown;
        joinedAt?: unknown;
        user?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryAssessmentResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const ministryAssessmentListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
        ministryMetrics: z.ZodOptional<z.ZodObject<{
            totalMinistryLeaders: z.ZodOptional<z.ZodNumber>;
            averageEngagement: z.ZodOptional<z.ZodNumber>;
            culturalDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            ministryRoleDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryAssessmentWithQuestionsResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const ministryUserAssessmentResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        assessmentId: z.ZodString;
        status: z.ZodEnum<["started", "in_progress", "completed", "abandoned"]>;
        startedAt: z.ZodString;
        completedAt: z.ZodOptional<z.ZodString>;
        score: z.ZodOptional<z.ZodNumber>;
        results: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        assessment: any;
        user: any;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        id?: unknown;
        userId?: unknown;
        assessmentId?: unknown;
        status?: unknown;
        startedAt?: unknown;
        completedAt?: unknown;
        score?: unknown;
        results?: unknown;
        assessment?: unknown;
        user?: unknown;
    }, {
        [x: string]: any;
        id?: unknown;
        userId?: unknown;
        assessmentId?: unknown;
        status?: unknown;
        startedAt?: unknown;
        completedAt?: unknown;
        score?: unknown;
        results?: unknown;
        assessment?: unknown;
        user?: unknown;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        [x: string]: any;
        id?: unknown;
        userId?: unknown;
        assessmentId?: unknown;
        status?: unknown;
        startedAt?: unknown;
        completedAt?: unknown;
        score?: unknown;
        results?: unknown;
        assessment?: unknown;
        user?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        [x: string]: any;
        id?: unknown;
        userId?: unknown;
        assessmentId?: unknown;
        status?: unknown;
        startedAt?: unknown;
        completedAt?: unknown;
        score?: unknown;
        results?: unknown;
        assessment?: unknown;
        user?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryContentItemResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const ministryContentItemListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
        ministryMetrics: z.ZodOptional<z.ZodObject<{
            totalMinistryLeaders: z.ZodOptional<z.ZodNumber>;
            averageEngagement: z.ZodOptional<z.ZodNumber>;
            culturalDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            ministryRoleDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryCommunityResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const ministryCommunityListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<any, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
        ministryMetrics: z.ZodOptional<z.ZodObject<{
            totalMinistryLeaders: z.ZodOptional<z.ZodNumber>;
            averageEngagement: z.ZodOptional<z.ZodNumber>;
            culturalDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            ministryRoleDistribution: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }, {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        items: any[];
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryMetricsResponseSchema: z.ZodObject<{
    data: any;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}, {
    [x: string]: any;
    data?: unknown;
    success?: unknown;
    message?: unknown;
    ministryContext?: unknown;
    metadata?: unknown;
}>;
export declare const aggregatedMinistryMetricsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        overall: any;
        byMinistryRole: z.ZodRecord<z.ZodString, any>;
        byCulturalContext: z.ZodRecord<z.ZodString, any>;
        byOrganization: z.ZodRecord<z.ZodString, any>;
        trends: z.ZodObject<{
            growth: z.ZodNumber;
            engagement: z.ZodNumber;
            retention: z.ZodNumber;
            satisfaction: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            growth: number;
            engagement: number;
            retention: number;
            satisfaction: number;
        }, {
            growth: number;
            engagement: number;
            retention: number;
            satisfaction: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        overall?: unknown;
        byMinistryRole?: unknown;
        byCulturalContext?: unknown;
        byOrganization?: unknown;
        trends?: unknown;
    }, {
        [x: string]: any;
        overall?: unknown;
        byMinistryRole?: unknown;
        byCulturalContext?: unknown;
        byOrganization?: unknown;
        trends?: unknown;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        [x: string]: any;
        overall?: unknown;
        byMinistryRole?: unknown;
        byCulturalContext?: unknown;
        byOrganization?: unknown;
        trends?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        [x: string]: any;
        overall?: unknown;
        byMinistryRole?: unknown;
        byCulturalContext?: unknown;
        byOrganization?: unknown;
        trends?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryDashboardResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        userMetrics: any;
        organizationMetrics: z.ZodObject<{
            totalMembers: z.ZodNumber;
            activeMembers: z.ZodNumber;
            totalContent: z.ZodNumber;
            totalAssessments: z.ZodNumber;
            averageEngagement: z.ZodNumber;
            growthRate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            totalMembers: number;
            activeMembers: number;
            totalContent: number;
            averageEngagement: number;
            totalAssessments: number;
            growthRate: number;
        }, {
            totalMembers: number;
            activeMembers: number;
            totalContent: number;
            averageEngagement: number;
            totalAssessments: number;
            growthRate: number;
        }>;
        recentActivity: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["content_created", "assessment_completed", "community_joined", "collaboration_started"]>;
            title: z.ZodString;
            description: z.ZodString;
            timestamp: z.ZodString;
            user: any;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            id?: unknown;
            type?: unknown;
            title?: unknown;
            description?: unknown;
            timestamp?: unknown;
            user?: unknown;
        }, {
            [x: string]: any;
            id?: unknown;
            type?: unknown;
            title?: unknown;
            description?: unknown;
            timestamp?: unknown;
            user?: unknown;
        }>, "many">;
        recommendations: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["content", "assessment", "community", "collaboration"]>;
            title: z.ZodString;
            description: z.ZodString;
            reason: z.ZodString;
            priority: z.ZodEnum<["low", "medium", "high"]>;
            actionUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            type: "content" | "assessment" | "community" | "collaboration";
            title: string;
            reason: string;
            priority: "low" | "medium" | "high";
            actionUrl?: string | undefined;
        }, {
            description: string;
            type: "content" | "assessment" | "community" | "collaboration";
            title: string;
            reason: string;
            priority: "low" | "medium" | "high";
            actionUrl?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMetrics?: unknown;
        organizationMetrics?: unknown;
        recentActivity?: unknown;
        recommendations?: unknown;
    }, {
        [x: string]: any;
        userMetrics?: unknown;
        organizationMetrics?: unknown;
        recentActivity?: unknown;
        recommendations?: unknown;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        [x: string]: any;
        userMetrics?: unknown;
        organizationMetrics?: unknown;
        recentActivity?: unknown;
        recommendations?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        [x: string]: any;
        userMetrics?: unknown;
        organizationMetrics?: unknown;
        recentActivity?: unknown;
        recommendations?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministrySubscriptionPlanResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodNumber;
        billingCycle: z.ZodEnum<["monthly", "yearly"]>;
        features: z.ZodArray<z.ZodString, "many">;
        ministryCapacity: z.ZodObject<{
            maxContentCreators: z.ZodOptional<z.ZodNumber>;
            maxAssessments: z.ZodOptional<z.ZodNumber>;
            maxCommunities: z.ZodOptional<z.ZodNumber>;
            customBranding: z.ZodDefault<z.ZodBoolean>;
            apiAccess: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            customBranding: boolean;
            apiAccess: boolean;
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
        }, {
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
            customBranding?: boolean | undefined;
            apiAccess?: boolean | undefined;
        }>;
        isPopular: z.ZodDefault<z.ZodBoolean>;
        isRecommended: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        description: string;
        price: number;
        billingCycle: "monthly" | "yearly";
        features: string[];
        ministryCapacity: {
            customBranding: boolean;
            apiAccess: boolean;
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
        };
        isPopular: boolean;
        isRecommended: boolean;
    }, {
        name: string;
        id: string;
        description: string;
        price: number;
        billingCycle: "monthly" | "yearly";
        features: string[];
        ministryCapacity: {
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
            customBranding?: boolean | undefined;
            apiAccess?: boolean | undefined;
        };
        isPopular?: boolean | undefined;
        isRecommended?: boolean | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        description: string;
        price: number;
        billingCycle: "monthly" | "yearly";
        features: string[];
        ministryCapacity: {
            customBranding: boolean;
            apiAccess: boolean;
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
        };
        isPopular: boolean;
        isRecommended: boolean;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        name: string;
        id: string;
        description: string;
        price: number;
        billingCycle: "monthly" | "yearly";
        features: string[];
        ministryCapacity: {
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
            customBranding?: boolean | undefined;
            apiAccess?: boolean | undefined;
        };
        isPopular?: boolean | undefined;
        isRecommended?: boolean | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const ministryCollaborationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        collaborationType: z.ZodEnum<["project", "study_group", "mentorship", "partnership"]>;
        status: z.ZodEnum<["planning", "active", "completed", "cancelled"]>;
        participants: z.ZodArray<any, "many">;
        organizationId: z.ZodOptional<z.ZodString>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
        status: "active" | "cancelled" | "completed" | "planning";
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: any[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }, {
        id: string;
        description: string;
        status: "active" | "cancelled" | "completed" | "planning";
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: any[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        description: string;
        status: "active" | "cancelled" | "completed" | "planning";
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: any[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        id: string;
        description: string;
        status: "active" | "cancelled" | "completed" | "planning";
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: any[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const authMinistryCombinedResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        user: any;
        organization: any;
        permissions: z.ZodArray<z.ZodString, "many">;
        ministryContext: z.ZodObject<{
            userMinistryRole: any;
            organizationContext: z.ZodOptional<z.ZodObject<{
                organizationId: z.ZodString;
                userRole: any;
                permissions: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                [x: string]: any;
                organizationId?: unknown;
                userRole?: unknown;
                permissions?: unknown;
            }, {
                [x: string]: any;
                organizationId?: unknown;
                userRole?: unknown;
                permissions?: unknown;
            }>>;
            culturalContext: any;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            userMinistryRole?: unknown;
            organizationContext?: unknown;
            culturalContext?: unknown;
        }, {
            [x: string]: any;
            userMinistryRole?: unknown;
            organizationContext?: unknown;
            culturalContext?: unknown;
        }>;
        session: z.ZodObject<{
            accessToken: z.ZodString;
            refreshToken: z.ZodString;
            expiresAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            accessToken: string;
            refreshToken: string;
            expiresAt: string;
        }, {
            accessToken: string;
            refreshToken: string;
            expiresAt: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        user?: unknown;
        organization?: unknown;
        permissions?: unknown;
        ministryContext?: unknown;
        session?: unknown;
    }, {
        [x: string]: any;
        user?: unknown;
        organization?: unknown;
        permissions?: unknown;
        ministryContext?: unknown;
        session?: unknown;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        [x: string]: any;
        user?: unknown;
        organization?: unknown;
        permissions?: unknown;
        ministryContext?: unknown;
        session?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}, {
    data: {
        [x: string]: any;
        user?: unknown;
        organization?: unknown;
        permissions?: unknown;
        ministryContext?: unknown;
        session?: unknown;
    };
    success: boolean;
    metadata: {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    } | undefined;
}>;
export declare const organizationScopedResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any> extends infer T_6 ? { [k in keyof T_6]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }> extends infer T_7 ? { [k_1 in keyof T_7]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any> extends infer T_3 ? { [k_2 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any> extends infer T_4 ? { [k in keyof T_4]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }> extends infer T_5 ? { [k_1 in keyof T_5]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any>[k_2]; } : never, z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any> extends infer T_11 ? { [k in keyof T_11]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }> extends infer T_12 ? { [k_1 in keyof T_12]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}> extends infer T_8 ? { [k_3 in keyof T_8]: z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any> extends infer T_9 ? { [k in keyof T_9]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }> extends infer T_10 ? { [k_1 in keyof T_10]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
            isOwner?: unknown;
            isAdmin?: unknown;
            canManageUsers?: unknown;
            canManageContent?: unknown;
            canViewAnalytics?: unknown;
            canManageSubscriptions?: unknown;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>[k_3]; } : never>;
export declare const roleBasedVisibilityResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: z.ZodObject<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any> extends infer T_6 ? { [k in keyof T_6]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }> extends infer T_7 ? { [k_1 in keyof T_7]: z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any> extends infer T_3 ? { [k_2 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any> extends infer T_4 ? { [k in keyof T_4]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }> extends infer T_5 ? { [k_1 in keyof T_5]: z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any>[k_2]; } : never, z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any> extends infer T_11 ? { [k in keyof T_11]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }> extends infer T_12 ? { [k_1 in keyof T_12]: z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}> extends infer T_8 ? { [k_3 in keyof T_8]: z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any> extends infer T_9 ? { [k in keyof T_9]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }> extends infer T_10 ? { [k_1 in keyof T_10]: z.baseObjectInputType<{
        data: T;
        fieldPermissions: z.ZodRecord<z.ZodString, z.ZodBoolean>;
        visibleFields: z.ZodArray<z.ZodString, "many">;
        hiddenFields: z.ZodArray<z.ZodString, "many">;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>[k_3]; } : never>;
export declare const plantFilteredResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: z.ZodObject<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any> extends infer T_6 ? { [k in keyof T_6]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }> extends infer T_7 ? { [k_1 in keyof T_7]: z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any> extends infer T_3 ? { [k_2 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any> extends infer T_4 ? { [k in keyof T_4]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }> extends infer T_5 ? { [k_1 in keyof T_5]: z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>, any>[k_2]; } : never, z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any> extends infer T_11 ? { [k in keyof T_11]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }> extends infer T_12 ? { [k_1 in keyof T_12]: z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}> extends infer T_8 ? { [k_3 in keyof T_8]: z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any> extends infer T_9 ? { [k in keyof T_9]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }> extends infer T_10 ? { [k_1 in keyof T_10]: z.baseObjectInputType<{
        data: T;
        plantContext: z.ZodObject<{
            isPlant: z.ZodBoolean;
            plantStage: z.ZodOptional<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
            plantMetrics: z.ZodOptional<z.ZodObject<{
                totalPlants: z.ZodNumber;
                activePlants: z.ZodNumber;
                averageGrowth: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }, {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "developing" | "exploring" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: any;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: any;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }, {
            [x: string]: any;
            organizationId?: unknown;
            userRole?: unknown;
            permissions?: unknown;
        }>>;
        culturalContext: any;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }, {
        [x: string]: any;
        userMinistryRole?: unknown;
        organizationContext?: unknown;
        culturalContext?: unknown;
        permissions?: unknown;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        timestamp: string;
        requestId: string;
        processingTime?: number | undefined;
    }>;
}>[k_3]; } : never>;
export type MinistryPlatformResponse<T> = z.infer<ReturnType<typeof ministryPlatformResponseSchema<z.ZodType<T>>>>;
export type MinistryPaginatedResponse<T> = z.infer<ReturnType<typeof ministryPaginatedResponseSchema<z.ZodType<T>>>>;
export type MinistryUserProfileResponse = z.infer<typeof ministryUserProfileResponseSchema>;
export type MinistryUserProfileListResponse = z.infer<typeof ministryUserProfileListResponseSchema>;
export type MinistryOrganizationResponse = z.infer<typeof ministryOrganizationResponseSchema>;
export type MinistryOrganizationListResponse = z.infer<typeof ministryOrganizationListResponseSchema>;
export type MinistryOrganizationMembershipResponse = z.infer<typeof ministryOrganizationMembershipResponseSchema>;
export type MinistryAssessmentResponse = z.infer<typeof ministryAssessmentResponseSchema>;
export type MinistryAssessmentListResponse = z.infer<typeof ministryAssessmentListResponseSchema>;
export type MinistryAssessmentWithQuestionsResponse = z.infer<typeof ministryAssessmentWithQuestionsResponseSchema>;
export type MinistryUserAssessmentResponse = z.infer<typeof ministryUserAssessmentResponseSchema>;
export type MinistryContentItemResponse = z.infer<typeof ministryContentItemResponseSchema>;
export type MinistryContentItemListResponse = z.infer<typeof ministryContentItemListResponseSchema>;
export type MinistryCommunityResponse = z.infer<typeof ministryCommunityResponseSchema>;
export type MinistryCommunityListResponse = z.infer<typeof ministryCommunityListResponseSchema>;
export type MinistryMetricsResponse = z.infer<typeof ministryMetricsResponseSchema>;
export type AggregatedMinistryMetricsResponse = z.infer<typeof aggregatedMinistryMetricsResponseSchema>;
export type MinistryDashboardResponse = z.infer<typeof ministryDashboardResponseSchema>;
export type MinistrySubscriptionPlanResponse = z.infer<typeof ministrySubscriptionPlanResponseSchema>;
export type MinistryCollaborationResponse = z.infer<typeof ministryCollaborationResponseSchema>;
export type AuthMinistryCombinedResponse = z.infer<typeof authMinistryCombinedResponseSchema>;
export type OrganizationScopedResponse<T> = z.infer<ReturnType<typeof organizationScopedResponseSchema<z.ZodType<T>>>>;
export type RoleBasedVisibilityResponse<T> = z.infer<ReturnType<typeof roleBasedVisibilityResponseSchema<z.ZodType<T>>>>;
export type PlantFilteredResponse<T> = z.infer<ReturnType<typeof plantFilteredResponseSchema<z.ZodType<T>>>>;
//# sourceMappingURL=ministry-platform.response.d.ts.map