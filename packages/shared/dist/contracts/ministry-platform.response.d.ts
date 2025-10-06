import { z } from 'zod';
export declare const ministryPlatformResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}>, any>[k]; } : never, z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}>[k_1]; } : never>;
export declare const ministryPlatformErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    code: z.ZodString;
    ministryContext: z.ZodOptional<z.ZodObject<{
        organizationId: z.ZodOptional<z.ZodString>;
        userRole: z.ZodOptional<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
        requiredPermissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        suggestedActions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        organizationId?: string | undefined;
        userRole?: "owner" | "admin" | "member" | "viewer" | undefined;
        requiredPermissions?: string[] | undefined;
        suggestedActions?: string[] | undefined;
    }, {
        organizationId?: string | undefined;
        userRole?: "owner" | "admin" | "member" | "viewer" | undefined;
        requiredPermissions?: string[] | undefined;
        suggestedActions?: string[] | undefined;
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
    ministryContext?: {
        organizationId?: string | undefined;
        userRole?: "owner" | "admin" | "member" | "viewer" | undefined;
        requiredPermissions?: string[] | undefined;
        suggestedActions?: string[] | undefined;
    } | undefined;
    details?: any;
}, {
    code: string;
    error: string;
    success: false;
    timestamp: string;
    message?: string | undefined;
    ministryContext?: {
        organizationId?: string | undefined;
        userRole?: "owner" | "admin" | "member" | "viewer" | undefined;
        requiredPermissions?: string[] | undefined;
        suggestedActions?: string[] | undefined;
    } | undefined;
    details?: any;
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
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
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
        items: T["_output"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        items: T["_input"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: T["_output"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        items: T["_input"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryUserProfileResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        passwordHash: z.ZodOptional<z.ZodString>;
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        avatarUrl: z.ZodOptional<z.ZodString>;
        ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
        denomination: z.ZodOptional<z.ZodString>;
        organizationName: z.ZodOptional<z.ZodString>;
        yearsInMinistry: z.ZodOptional<z.ZodNumber>;
        countryCode: z.ZodOptional<z.ZodString>;
        timezone: z.ZodOptional<z.ZodString>;
        languagePrimary: z.ZodDefault<z.ZodString>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
        assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
        assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
        assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
        assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
        assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
        assessmentTotal: z.ZodOptional<z.ZodNumber>;
        leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
        subdomain: z.ZodOptional<z.ZodString>;
        customDomain: z.ZodOptional<z.ZodString>;
        platformTitle: z.ZodOptional<z.ZodString>;
        subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
        theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandColors: z.ZodDefault<z.ZodObject<{
            primary: z.ZodDefault<z.ZodString>;
            secondary: z.ZodDefault<z.ZodString>;
            accent: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primary: string;
            secondary: string;
            accent: string;
        }, {
            primary?: string | undefined;
            secondary?: string | undefined;
            accent?: string | undefined;
        }>>;
        emailNotifications: z.ZodDefault<z.ZodObject<{
            dailyDigest: z.ZodDefault<z.ZodBoolean>;
            collaborationRequests: z.ZodDefault<z.ZodBoolean>;
            revenueReports: z.ZodDefault<z.ZodBoolean>;
            communityUpdates: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        }, {
            dailyDigest?: boolean | undefined;
            collaborationRequests?: boolean | undefined;
            revenueReports?: boolean | undefined;
            communityUpdates?: boolean | undefined;
        }>>;
        privacySettings: z.ZodDefault<z.ZodObject<{
            publicProfile: z.ZodDefault<z.ZodBoolean>;
            showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
            allowNetworking: z.ZodDefault<z.ZodBoolean>;
            shareAnalytics: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        }, {
            publicProfile?: boolean | undefined;
            showAssessmentResults?: boolean | undefined;
            allowNetworking?: boolean | undefined;
            shareAnalytics?: boolean | undefined;
        }>>;
        onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
        onboardingStep: z.ZodDefault<z.ZodNumber>;
        accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        lastActiveAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        languagePrimary: string;
        subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
        theologicalFocus: string[];
        brandColors: {
            primary: string;
            secondary: string;
            accent: string;
        };
        emailNotifications: {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        };
        privacySettings: {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        };
        onboardingCompleted: boolean;
        onboardingStep: number;
        accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
        lastActiveAt: string;
        denomination?: string | undefined;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        lastActiveAt: string;
        denomination?: string | undefined;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        languagePrimary?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
        subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
        theologicalFocus?: string[] | undefined;
        brandColors?: {
            primary?: string | undefined;
            secondary?: string | undefined;
            accent?: string | undefined;
        } | undefined;
        emailNotifications?: {
            dailyDigest?: boolean | undefined;
            collaborationRequests?: boolean | undefined;
            revenueReports?: boolean | undefined;
            communityUpdates?: boolean | undefined;
        } | undefined;
        privacySettings?: {
            publicProfile?: boolean | undefined;
            showAssessmentResults?: boolean | undefined;
            allowNetworking?: boolean | undefined;
            shareAnalytics?: boolean | undefined;
        } | undefined;
        onboardingCompleted?: boolean | undefined;
        onboardingStep?: number | undefined;
        accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        languagePrimary: string;
        subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
        theologicalFocus: string[];
        brandColors: {
            primary: string;
            secondary: string;
            accent: string;
        };
        emailNotifications: {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        };
        privacySettings: {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        };
        onboardingCompleted: boolean;
        onboardingStep: number;
        accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
        lastActiveAt: string;
        denomination?: string | undefined;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        lastActiveAt: string;
        denomination?: string | undefined;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        languagePrimary?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
        subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
        theologicalFocus?: string[] | undefined;
        brandColors?: {
            primary?: string | undefined;
            secondary?: string | undefined;
            accent?: string | undefined;
        } | undefined;
        emailNotifications?: {
            dailyDigest?: boolean | undefined;
            collaborationRequests?: boolean | undefined;
            revenueReports?: boolean | undefined;
            communityUpdates?: boolean | undefined;
        } | undefined;
        privacySettings?: {
            publicProfile?: boolean | undefined;
            showAssessmentResults?: boolean | undefined;
            allowNetworking?: boolean | undefined;
            shareAnalytics?: boolean | undefined;
        } | undefined;
        onboardingCompleted?: boolean | undefined;
        onboardingStep?: number | undefined;
        accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryUserProfileListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            email: z.ZodString;
            passwordHash: z.ZodOptional<z.ZodString>;
            firstName: z.ZodString;
            lastName: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organizationName: z.ZodOptional<z.ZodString>;
            yearsInMinistry: z.ZodOptional<z.ZodNumber>;
            countryCode: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            languagePrimary: z.ZodDefault<z.ZodString>;
            culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
            assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
            assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
            assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
            assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
            assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
            assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
            assessmentTotal: z.ZodOptional<z.ZodNumber>;
            leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            customDomain: z.ZodOptional<z.ZodString>;
            platformTitle: z.ZodOptional<z.ZodString>;
            subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandColors: z.ZodDefault<z.ZodObject<{
                primary: z.ZodDefault<z.ZodString>;
                secondary: z.ZodDefault<z.ZodString>;
                accent: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            }>>;
            emailNotifications: z.ZodDefault<z.ZodObject<{
                dailyDigest: z.ZodDefault<z.ZodBoolean>;
                collaborationRequests: z.ZodDefault<z.ZodBoolean>;
                revenueReports: z.ZodDefault<z.ZodBoolean>;
                communityUpdates: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            }>>;
            privacySettings: z.ZodDefault<z.ZodObject<{
                publicProfile: z.ZodDefault<z.ZodBoolean>;
                showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
                allowNetworking: z.ZodDefault<z.ZodBoolean>;
                shareAnalytics: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            }>>;
            onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
            onboardingStep: z.ZodDefault<z.ZodNumber>;
            accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            lastActiveAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            languagePrimary: string;
            subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
            theologicalFocus: string[];
            brandColors: {
                primary: string;
                secondary: string;
                accent: string;
            };
            emailNotifications: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            };
            privacySettings: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            };
            onboardingCompleted: boolean;
            onboardingStep: number;
            accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            languagePrimary?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
            subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
            theologicalFocus?: string[] | undefined;
            brandColors?: {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            } | undefined;
            emailNotifications?: {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            } | undefined;
            privacySettings?: {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            } | undefined;
            onboardingCompleted?: boolean | undefined;
            onboardingStep?: number | undefined;
            accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        }>, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
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
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            languagePrimary: string;
            subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
            theologicalFocus: string[];
            brandColors: {
                primary: string;
                secondary: string;
                accent: string;
            };
            emailNotifications: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            };
            privacySettings: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            };
            onboardingCompleted: boolean;
            onboardingStep: number;
            accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            languagePrimary?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
            subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
            theologicalFocus?: string[] | undefined;
            brandColors?: {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            } | undefined;
            emailNotifications?: {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            } | undefined;
            privacySettings?: {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            } | undefined;
            onboardingCompleted?: boolean | undefined;
            onboardingStep?: number | undefined;
            accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            languagePrimary: string;
            subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
            theologicalFocus: string[];
            brandColors: {
                primary: string;
                secondary: string;
                accent: string;
            };
            emailNotifications: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            };
            privacySettings: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            };
            onboardingCompleted: boolean;
            onboardingStep: number;
            accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            languagePrimary?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
            subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
            theologicalFocus?: string[] | undefined;
            brandColors?: {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            } | undefined;
            emailNotifications?: {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            } | undefined;
            privacySettings?: {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            } | undefined;
            onboardingCompleted?: boolean | undefined;
            onboardingStep?: number | undefined;
            accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryOrganizationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodString>;
        organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
        sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
        contactEmail: z.ZodOptional<z.ZodString>;
        contactPhone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }, {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        }>>;
        licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
        maxUsers: z.ZodDefault<z.ZodNumber>;
        billingEmail: z.ZodOptional<z.ZodString>;
        accountOwnerId: z.ZodOptional<z.ZodString>;
        stripeCustomerId: z.ZodOptional<z.ZodString>;
        stripeProductId: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "trial" | "suspended" | "cancelled";
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "enterprise" | "individual" | "team";
        organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
        maxUsers: number;
        description?: string | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
        status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "enterprise" | "individual" | "team" | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        maxUsers?: number | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "active" | "trial" | "suspended" | "cancelled";
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "enterprise" | "individual" | "team";
        organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
        maxUsers: number;
        description?: string | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
        status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "enterprise" | "individual" | "team" | undefined;
        website?: string | undefined;
        logoUrl?: string | undefined;
        sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
        contactEmail?: string | undefined;
        contactPhone?: string | undefined;
        address?: {
            street?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            postalCode?: string | undefined;
        } | undefined;
        maxUsers?: number | undefined;
        billingEmail?: string | undefined;
        accountOwnerId?: string | undefined;
        stripeCustomerId?: string | undefined;
        stripeProductId?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryOrganizationListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            logoUrl: z.ZodOptional<z.ZodString>;
            organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
            sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            contactEmail: z.ZodOptional<z.ZodString>;
            contactPhone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                street: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
            licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            billingEmail: z.ZodOptional<z.ZodString>;
            accountOwnerId: z.ZodOptional<z.ZodString>;
            stripeCustomerId: z.ZodOptional<z.ZodString>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "trial" | "suspended" | "cancelled";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "enterprise" | "individual" | "team";
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "enterprise" | "individual" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }>, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
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
        items: {
            status: "active" | "trial" | "suspended" | "cancelled";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "enterprise" | "individual" | "team";
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "enterprise" | "individual" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            status: "active" | "trial" | "suspended" | "cancelled";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "enterprise" | "individual" | "team";
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "enterprise" | "individual" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryOrganizationMembershipResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        membershipId: z.ZodString;
        userId: z.ZodString;
        organizationId: z.ZodString;
        role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
        status: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
        joinedAt: z.ZodString;
        user: z.ZodObject<Pick<{
            id: z.ZodString;
            email: z.ZodString;
            passwordHash: z.ZodOptional<z.ZodString>;
            firstName: z.ZodString;
            lastName: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organizationName: z.ZodOptional<z.ZodString>;
            yearsInMinistry: z.ZodOptional<z.ZodNumber>;
            countryCode: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            languagePrimary: z.ZodDefault<z.ZodString>;
            culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
            assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
            assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
            assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
            assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
            assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
            assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
            assessmentTotal: z.ZodOptional<z.ZodNumber>;
            leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            customDomain: z.ZodOptional<z.ZodString>;
            platformTitle: z.ZodOptional<z.ZodString>;
            subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandColors: z.ZodDefault<z.ZodObject<{
                primary: z.ZodDefault<z.ZodString>;
                secondary: z.ZodDefault<z.ZodString>;
                accent: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            }>>;
            emailNotifications: z.ZodDefault<z.ZodObject<{
                dailyDigest: z.ZodDefault<z.ZodBoolean>;
                collaborationRequests: z.ZodDefault<z.ZodBoolean>;
                revenueReports: z.ZodDefault<z.ZodBoolean>;
                communityUpdates: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            }>>;
            privacySettings: z.ZodDefault<z.ZodObject<{
                publicProfile: z.ZodDefault<z.ZodBoolean>;
                showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
                allowNetworking: z.ZodDefault<z.ZodBoolean>;
                shareAnalytics: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            }>>;
            onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
            onboardingStep: z.ZodDefault<z.ZodNumber>;
            accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            lastActiveAt: z.ZodString;
        }, "ministryRole" | "id" | "displayName" | "avatarUrl" | "firstName" | "lastName">, "strip", z.ZodTypeAny, {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }, {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        organizationId: string;
        status: "active" | "suspended" | "pending" | "inactive";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        };
        userId: string;
        role: "owner" | "admin" | "member" | "viewer";
        joinedAt: string;
        membershipId: string;
    }, {
        organizationId: string;
        status: "active" | "suspended" | "pending" | "inactive";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        };
        userId: string;
        role: "owner" | "admin" | "member" | "viewer";
        joinedAt: string;
        membershipId: string;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        organizationId: string;
        status: "active" | "suspended" | "pending" | "inactive";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        };
        userId: string;
        role: "owner" | "admin" | "member" | "viewer";
        joinedAt: string;
        membershipId: string;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        organizationId: string;
        status: "active" | "suspended" | "pending" | "inactive";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        };
        userId: string;
        role: "owner" | "admin" | "member" | "viewer";
        joinedAt: string;
        membershipId: string;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryAssessmentResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        assessmentId: z.ZodString;
        startedAt: z.ZodString;
        completedAt: z.ZodOptional<z.ZodString>;
        completionPercentage: z.ZodDefault<z.ZodNumber>;
        rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        totalScore: z.ZodOptional<z.ZodNumber>;
        maxPossibleScore: z.ZodOptional<z.ZodNumber>;
        apostolicScore: z.ZodOptional<z.ZodNumber>;
        propheticScore: z.ZodOptional<z.ZodNumber>;
        evangelisticScore: z.ZodOptional<z.ZodNumber>;
        shepherdingScore: z.ZodOptional<z.ZodNumber>;
        teachingScore: z.ZodOptional<z.ZodNumber>;
        normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        primaryGift: z.ZodOptional<z.ZodString>;
        secondaryGift: z.ZodOptional<z.ZodString>;
        responseConsistency: z.ZodOptional<z.ZodNumber>;
        completionTime: z.ZodOptional<z.ZodNumber>;
        confidenceLevel: z.ZodOptional<z.ZodNumber>;
        culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
        culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
        aiInsights: z.ZodOptional<z.ZodString>;
        personalizedRecommendations: z.ZodOptional<z.ZodObject<{
            strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        }, {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        }>>;
        suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        assessmentId: string;
        id: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        createdAt: string;
        updatedAt: string;
        completedAt?: string | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        } | undefined;
    }, {
        userId: string;
        assessmentId: string;
        id: string;
        startedAt: string;
        createdAt: string;
        updatedAt: string;
        completedAt?: string | undefined;
        completionPercentage?: number | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentApplied?: boolean | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        } | undefined;
        suggestedPeers?: string[] | undefined;
        complementaryGifts?: string[] | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        userId: string;
        assessmentId: string;
        id: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        createdAt: string;
        updatedAt: string;
        completedAt?: string | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        userId: string;
        assessmentId: string;
        id: string;
        startedAt: string;
        createdAt: string;
        updatedAt: string;
        completedAt?: string | undefined;
        completionPercentage?: number | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentApplied?: boolean | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        } | undefined;
        suggestedPeers?: string[] | undefined;
        complementaryGifts?: string[] | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryAssessmentListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            assessmentId: z.ZodString;
            startedAt: z.ZodString;
            completedAt: z.ZodOptional<z.ZodString>;
            completionPercentage: z.ZodDefault<z.ZodNumber>;
            rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            totalScore: z.ZodOptional<z.ZodNumber>;
            maxPossibleScore: z.ZodOptional<z.ZodNumber>;
            apostolicScore: z.ZodOptional<z.ZodNumber>;
            propheticScore: z.ZodOptional<z.ZodNumber>;
            evangelisticScore: z.ZodOptional<z.ZodNumber>;
            shepherdingScore: z.ZodOptional<z.ZodNumber>;
            teachingScore: z.ZodOptional<z.ZodNumber>;
            normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            primaryGift: z.ZodOptional<z.ZodString>;
            secondaryGift: z.ZodOptional<z.ZodString>;
            responseConsistency: z.ZodOptional<z.ZodNumber>;
            completionTime: z.ZodOptional<z.ZodNumber>;
            confidenceLevel: z.ZodOptional<z.ZodNumber>;
            culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
            culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
            aiInsights: z.ZodOptional<z.ZodString>;
            personalizedRecommendations: z.ZodOptional<z.ZodObject<{
                strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                strengths: string[];
                growthAreas: string[];
                actionItems: string[];
                contentRecommendations: string[];
            }, {
                strengths?: string[] | undefined;
                growthAreas?: string[] | undefined;
                actionItems?: string[] | undefined;
                contentRecommendations?: string[] | undefined;
            }>>;
            suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            assessmentId: string;
            id: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
            createdAt: string;
            updatedAt: string;
            completedAt?: string | undefined;
            rawScores?: Record<string, number> | undefined;
            totalScore?: number | undefined;
            maxPossibleScore?: number | undefined;
            apostolicScore?: number | undefined;
            propheticScore?: number | undefined;
            evangelisticScore?: number | undefined;
            shepherdingScore?: number | undefined;
            teachingScore?: number | undefined;
            normalizedScores?: Record<string, number> | undefined;
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            responseConsistency?: number | undefined;
            completionTime?: number | undefined;
            confidenceLevel?: number | undefined;
            culturalAdjustmentFactor?: number | undefined;
            aiInsights?: string | undefined;
            personalizedRecommendations?: {
                strengths: string[];
                growthAreas: string[];
                actionItems: string[];
                contentRecommendations: string[];
            } | undefined;
        }, {
            userId: string;
            assessmentId: string;
            id: string;
            startedAt: string;
            createdAt: string;
            updatedAt: string;
            completedAt?: string | undefined;
            completionPercentage?: number | undefined;
            rawScores?: Record<string, number> | undefined;
            totalScore?: number | undefined;
            maxPossibleScore?: number | undefined;
            apostolicScore?: number | undefined;
            propheticScore?: number | undefined;
            evangelisticScore?: number | undefined;
            shepherdingScore?: number | undefined;
            teachingScore?: number | undefined;
            normalizedScores?: Record<string, number> | undefined;
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            responseConsistency?: number | undefined;
            completionTime?: number | undefined;
            confidenceLevel?: number | undefined;
            culturalAdjustmentApplied?: boolean | undefined;
            culturalAdjustmentFactor?: number | undefined;
            aiInsights?: string | undefined;
            personalizedRecommendations?: {
                strengths?: string[] | undefined;
                growthAreas?: string[] | undefined;
                actionItems?: string[] | undefined;
                contentRecommendations?: string[] | undefined;
            } | undefined;
            suggestedPeers?: string[] | undefined;
            complementaryGifts?: string[] | undefined;
        }>, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
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
        items: {
            userId: string;
            assessmentId: string;
            id: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
            createdAt: string;
            updatedAt: string;
            completedAt?: string | undefined;
            rawScores?: Record<string, number> | undefined;
            totalScore?: number | undefined;
            maxPossibleScore?: number | undefined;
            apostolicScore?: number | undefined;
            propheticScore?: number | undefined;
            evangelisticScore?: number | undefined;
            shepherdingScore?: number | undefined;
            teachingScore?: number | undefined;
            normalizedScores?: Record<string, number> | undefined;
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            responseConsistency?: number | undefined;
            completionTime?: number | undefined;
            confidenceLevel?: number | undefined;
            culturalAdjustmentFactor?: number | undefined;
            aiInsights?: string | undefined;
            personalizedRecommendations?: {
                strengths: string[];
                growthAreas: string[];
                actionItems: string[];
                contentRecommendations: string[];
            } | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        items: {
            userId: string;
            assessmentId: string;
            id: string;
            startedAt: string;
            createdAt: string;
            updatedAt: string;
            completedAt?: string | undefined;
            completionPercentage?: number | undefined;
            rawScores?: Record<string, number> | undefined;
            totalScore?: number | undefined;
            maxPossibleScore?: number | undefined;
            apostolicScore?: number | undefined;
            propheticScore?: number | undefined;
            evangelisticScore?: number | undefined;
            shepherdingScore?: number | undefined;
            teachingScore?: number | undefined;
            normalizedScores?: Record<string, number> | undefined;
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            responseConsistency?: number | undefined;
            completionTime?: number | undefined;
            confidenceLevel?: number | undefined;
            culturalAdjustmentApplied?: boolean | undefined;
            culturalAdjustmentFactor?: number | undefined;
            aiInsights?: string | undefined;
            personalizedRecommendations?: {
                strengths?: string[] | undefined;
                growthAreas?: string[] | undefined;
                actionItems?: string[] | undefined;
                contentRecommendations?: string[] | undefined;
            } | undefined;
            suggestedPeers?: string[] | undefined;
            complementaryGifts?: string[] | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            userId: string;
            assessmentId: string;
            id: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
            createdAt: string;
            updatedAt: string;
            completedAt?: string | undefined;
            rawScores?: Record<string, number> | undefined;
            totalScore?: number | undefined;
            maxPossibleScore?: number | undefined;
            apostolicScore?: number | undefined;
            propheticScore?: number | undefined;
            evangelisticScore?: number | undefined;
            shepherdingScore?: number | undefined;
            teachingScore?: number | undefined;
            normalizedScores?: Record<string, number> | undefined;
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            responseConsistency?: number | undefined;
            completionTime?: number | undefined;
            confidenceLevel?: number | undefined;
            culturalAdjustmentFactor?: number | undefined;
            aiInsights?: string | undefined;
            personalizedRecommendations?: {
                strengths: string[];
                growthAreas: string[];
                actionItems: string[];
                contentRecommendations: string[];
            } | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        items: {
            userId: string;
            assessmentId: string;
            id: string;
            startedAt: string;
            createdAt: string;
            updatedAt: string;
            completedAt?: string | undefined;
            completionPercentage?: number | undefined;
            rawScores?: Record<string, number> | undefined;
            totalScore?: number | undefined;
            maxPossibleScore?: number | undefined;
            apostolicScore?: number | undefined;
            propheticScore?: number | undefined;
            evangelisticScore?: number | undefined;
            shepherdingScore?: number | undefined;
            teachingScore?: number | undefined;
            normalizedScores?: Record<string, number> | undefined;
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            responseConsistency?: number | undefined;
            completionTime?: number | undefined;
            confidenceLevel?: number | undefined;
            culturalAdjustmentApplied?: boolean | undefined;
            culturalAdjustmentFactor?: number | undefined;
            aiInsights?: string | undefined;
            personalizedRecommendations?: {
                strengths?: string[] | undefined;
                growthAreas?: string[] | undefined;
                actionItems?: string[] | undefined;
                contentRecommendations?: string[] | undefined;
            } | undefined;
            suggestedPeers?: string[] | undefined;
            complementaryGifts?: string[] | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryAssessmentWithQuestionsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        assessmentId: z.ZodString;
        startedAt: z.ZodString;
        completedAt: z.ZodOptional<z.ZodString>;
        completionPercentage: z.ZodDefault<z.ZodNumber>;
        rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        totalScore: z.ZodOptional<z.ZodNumber>;
        maxPossibleScore: z.ZodOptional<z.ZodNumber>;
        apostolicScore: z.ZodOptional<z.ZodNumber>;
        propheticScore: z.ZodOptional<z.ZodNumber>;
        evangelisticScore: z.ZodOptional<z.ZodNumber>;
        shepherdingScore: z.ZodOptional<z.ZodNumber>;
        teachingScore: z.ZodOptional<z.ZodNumber>;
        normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        primaryGift: z.ZodOptional<z.ZodString>;
        secondaryGift: z.ZodOptional<z.ZodString>;
        responseConsistency: z.ZodOptional<z.ZodNumber>;
        completionTime: z.ZodOptional<z.ZodNumber>;
        confidenceLevel: z.ZodOptional<z.ZodNumber>;
        culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
        culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
        aiInsights: z.ZodOptional<z.ZodString>;
        personalizedRecommendations: z.ZodOptional<z.ZodObject<{
            strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        }, {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        }>>;
        suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
        questions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            questionText: z.ZodString;
            questionType: z.ZodEnum<["multiple_choice", "text", "rating", "boolean"]>;
            options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            required: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            order: number;
            id: string;
            questionText: string;
            questionType: "boolean" | "text" | "multiple_choice" | "rating";
            required: boolean;
            options?: string[] | undefined;
        }, {
            order: number;
            id: string;
            questionText: string;
            questionType: "boolean" | "text" | "multiple_choice" | "rating";
            options?: string[] | undefined;
            required?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        assessmentId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        questions: {
            order: number;
            id: string;
            questionText: string;
            questionType: "boolean" | "text" | "multiple_choice" | "rating";
            required: boolean;
            options?: string[] | undefined;
        }[];
        completedAt?: string | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        } | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        assessmentId: string;
        startedAt: string;
        questions: {
            order: number;
            id: string;
            questionText: string;
            questionType: "boolean" | "text" | "multiple_choice" | "rating";
            options?: string[] | undefined;
            required?: boolean | undefined;
        }[];
        completedAt?: string | undefined;
        completionPercentage?: number | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentApplied?: boolean | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        } | undefined;
        suggestedPeers?: string[] | undefined;
        complementaryGifts?: string[] | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        assessmentId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        questions: {
            order: number;
            id: string;
            questionText: string;
            questionType: "boolean" | "text" | "multiple_choice" | "rating";
            required: boolean;
            options?: string[] | undefined;
        }[];
        completedAt?: string | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        assessmentId: string;
        startedAt: string;
        questions: {
            order: number;
            id: string;
            questionText: string;
            questionType: "boolean" | "text" | "multiple_choice" | "rating";
            options?: string[] | undefined;
            required?: boolean | undefined;
        }[];
        completedAt?: string | undefined;
        completionPercentage?: number | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentApplied?: boolean | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        } | undefined;
        suggestedPeers?: string[] | undefined;
        complementaryGifts?: string[] | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
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
        assessment: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            assessmentType: z.ZodString;
            ministryRelevance: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            assessmentType: string;
            description?: string | undefined;
            ministryRelevance?: string | undefined;
        }, {
            id: string;
            name: string;
            assessmentType: string;
            description?: string | undefined;
            ministryRelevance?: string | undefined;
        }>;
        user: z.ZodObject<Pick<{
            id: z.ZodString;
            email: z.ZodString;
            passwordHash: z.ZodOptional<z.ZodString>;
            firstName: z.ZodString;
            lastName: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organizationName: z.ZodOptional<z.ZodString>;
            yearsInMinistry: z.ZodOptional<z.ZodNumber>;
            countryCode: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            languagePrimary: z.ZodDefault<z.ZodString>;
            culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
            assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
            assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
            assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
            assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
            assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
            assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
            assessmentTotal: z.ZodOptional<z.ZodNumber>;
            leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            customDomain: z.ZodOptional<z.ZodString>;
            platformTitle: z.ZodOptional<z.ZodString>;
            subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandColors: z.ZodDefault<z.ZodObject<{
                primary: z.ZodDefault<z.ZodString>;
                secondary: z.ZodDefault<z.ZodString>;
                accent: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            }>>;
            emailNotifications: z.ZodDefault<z.ZodObject<{
                dailyDigest: z.ZodDefault<z.ZodBoolean>;
                collaborationRequests: z.ZodDefault<z.ZodBoolean>;
                revenueReports: z.ZodDefault<z.ZodBoolean>;
                communityUpdates: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            }>>;
            privacySettings: z.ZodDefault<z.ZodObject<{
                publicProfile: z.ZodDefault<z.ZodBoolean>;
                showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
                allowNetworking: z.ZodDefault<z.ZodBoolean>;
                shareAnalytics: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            }>>;
            onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
            onboardingStep: z.ZodDefault<z.ZodNumber>;
            accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            lastActiveAt: z.ZodString;
        }, "ministryRole" | "id" | "displayName" | "firstName" | "lastName">, "strip", z.ZodTypeAny, {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        }, {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "completed" | "abandoned" | "in_progress" | "started";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        id: string;
        userId: string;
        assessment: {
            id: string;
            name: string;
            assessmentType: string;
            description?: string | undefined;
            ministryRelevance?: string | undefined;
        };
        assessmentId: string;
        startedAt: string;
        completedAt?: string | undefined;
        results?: Record<string, any> | undefined;
        score?: number | undefined;
    }, {
        status: "completed" | "abandoned" | "in_progress" | "started";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        id: string;
        userId: string;
        assessment: {
            id: string;
            name: string;
            assessmentType: string;
            description?: string | undefined;
            ministryRelevance?: string | undefined;
        };
        assessmentId: string;
        startedAt: string;
        completedAt?: string | undefined;
        results?: Record<string, any> | undefined;
        score?: number | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "completed" | "abandoned" | "in_progress" | "started";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        id: string;
        userId: string;
        assessment: {
            id: string;
            name: string;
            assessmentType: string;
            description?: string | undefined;
            ministryRelevance?: string | undefined;
        };
        assessmentId: string;
        startedAt: string;
        completedAt?: string | undefined;
        results?: Record<string, any> | undefined;
        score?: number | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        status: "completed" | "abandoned" | "in_progress" | "started";
        user: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        id: string;
        userId: string;
        assessment: {
            id: string;
            name: string;
            assessmentType: string;
            description?: string | undefined;
            ministryRelevance?: string | undefined;
        };
        assessmentId: string;
        startedAt: string;
        completedAt?: string | undefined;
        results?: Record<string, any> | undefined;
        score?: number | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryContentItemResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        excerpt: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        authorId: z.ZodString;
        coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
        format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
        wordCount: z.ZodOptional<z.ZodNumber>;
        estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
        viewCount: z.ZodDefault<z.ZodNumber>;
        likeCount: z.ZodDefault<z.ZodNumber>;
        shareCount: z.ZodDefault<z.ZodNumber>;
        commentCount: z.ZodDefault<z.ZodNumber>;
        bookmarkCount: z.ZodDefault<z.ZodNumber>;
        primaryCategoryId: z.ZodOptional<z.ZodString>;
        secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        seriesId: z.ZodOptional<z.ZodString>;
        seriesOrder: z.ZodOptional<z.ZodNumber>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
        networkAmplificationScore: z.ZodDefault<z.ZodNumber>;
        crossReferenceCount: z.ZodDefault<z.ZodNumber>;
        aiEnhanced: z.ZodDefault<z.ZodBoolean>;
        aiSummary: z.ZodOptional<z.ZodString>;
        aiKeyPoints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        featuredImageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        audioUrl: z.ZodOptional<z.ZodString>;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            type: z.ZodString;
            size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: string;
            name: string;
            url: string;
            size: number;
        }, {
            type: string;
            name: string;
            url: string;
            size: number;
        }>, "many">>;
        metaTitle: z.ZodOptional<z.ZodString>;
        metaDescription: z.ZodOptional<z.ZodString>;
        canonicalUrl: z.ZodOptional<z.ZodString>;
        originalSource: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        scheduledAt: z.ZodOptional<z.ZodString>;
        licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
        attributionRequired: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "archived" | "draft" | "published" | "under_review" | "scheduled";
        id: string;
        createdAt: string;
        updatedAt: string;
        slug: string;
        title: string;
        authorId: string;
        coAuthors: string[];
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
        viewCount: number;
        likeCount: number;
        shareCount: number;
        commentCount: number;
        bookmarkCount: number;
        secondaryCategories: string[];
        tags: string[];
        theologicalThemes: string[];
        visibility: "public" | "private" | "invite_only" | "premium" | "vip" | "organization";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            type: string;
            name: string;
            url: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        excerpt?: string | undefined;
        content?: string | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        aiSummary?: string | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        metaTitle?: string | undefined;
        metaDescription?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        slug: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "archived" | "draft" | "published" | "under_review" | "scheduled" | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        coAuthors?: string[] | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        shareCount?: number | undefined;
        commentCount?: number | undefined;
        bookmarkCount?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "invite_only" | "premium" | "vip" | "organization" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            type: string;
            name: string;
            url: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        metaDescription?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "archived" | "draft" | "published" | "under_review" | "scheduled";
        id: string;
        createdAt: string;
        updatedAt: string;
        slug: string;
        title: string;
        authorId: string;
        coAuthors: string[];
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
        viewCount: number;
        likeCount: number;
        shareCount: number;
        commentCount: number;
        bookmarkCount: number;
        secondaryCategories: string[];
        tags: string[];
        theologicalThemes: string[];
        visibility: "public" | "private" | "invite_only" | "premium" | "vip" | "organization";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            type: string;
            name: string;
            url: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        excerpt?: string | undefined;
        content?: string | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        aiSummary?: string | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        metaTitle?: string | undefined;
        metaDescription?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        slug: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "archived" | "draft" | "published" | "under_review" | "scheduled" | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        coAuthors?: string[] | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        shareCount?: number | undefined;
        commentCount?: number | undefined;
        bookmarkCount?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "invite_only" | "premium" | "vip" | "organization" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            type: string;
            name: string;
            url: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        metaDescription?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryContentItemListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            slug: z.ZodString;
            excerpt: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            authorId: z.ZodString;
            coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
            format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
            wordCount: z.ZodOptional<z.ZodNumber>;
            estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
            viewCount: z.ZodDefault<z.ZodNumber>;
            likeCount: z.ZodDefault<z.ZodNumber>;
            shareCount: z.ZodDefault<z.ZodNumber>;
            commentCount: z.ZodDefault<z.ZodNumber>;
            bookmarkCount: z.ZodDefault<z.ZodNumber>;
            primaryCategoryId: z.ZodOptional<z.ZodString>;
            secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            seriesId: z.ZodOptional<z.ZodString>;
            seriesOrder: z.ZodOptional<z.ZodNumber>;
            visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
            status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
            networkAmplificationScore: z.ZodDefault<z.ZodNumber>;
            crossReferenceCount: z.ZodDefault<z.ZodNumber>;
            aiEnhanced: z.ZodDefault<z.ZodBoolean>;
            aiSummary: z.ZodOptional<z.ZodString>;
            aiKeyPoints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            featuredImageUrl: z.ZodOptional<z.ZodString>;
            videoUrl: z.ZodOptional<z.ZodString>;
            audioUrl: z.ZodOptional<z.ZodString>;
            attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                url: z.ZodString;
                type: z.ZodString;
                size: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: string;
                name: string;
                url: string;
                size: number;
            }, {
                type: string;
                name: string;
                url: string;
                size: number;
            }>, "many">>;
            metaTitle: z.ZodOptional<z.ZodString>;
            metaDescription: z.ZodOptional<z.ZodString>;
            canonicalUrl: z.ZodOptional<z.ZodString>;
            originalSource: z.ZodOptional<z.ZodString>;
            publishedAt: z.ZodOptional<z.ZodString>;
            scheduledAt: z.ZodOptional<z.ZodString>;
            licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
            attributionRequired: z.ZodDefault<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "archived" | "draft" | "published" | "under_review" | "scheduled";
            id: string;
            createdAt: string;
            updatedAt: string;
            slug: string;
            title: string;
            authorId: string;
            coAuthors: string[];
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
            viewCount: number;
            likeCount: number;
            shareCount: number;
            commentCount: number;
            bookmarkCount: number;
            secondaryCategories: string[];
            tags: string[];
            theologicalThemes: string[];
            visibility: "public" | "private" | "invite_only" | "premium" | "vip" | "organization";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                type: string;
                name: string;
                url: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            excerpt?: string | undefined;
            content?: string | undefined;
            wordCount?: number | undefined;
            estimatedReadingTime?: number | undefined;
            primaryCategoryId?: string | undefined;
            seriesId?: string | undefined;
            seriesOrder?: number | undefined;
            aiSummary?: string | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            metaTitle?: string | undefined;
            metaDescription?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            slug: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            status?: "archived" | "draft" | "published" | "under_review" | "scheduled" | undefined;
            excerpt?: string | undefined;
            content?: string | undefined;
            coAuthors?: string[] | undefined;
            format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
            wordCount?: number | undefined;
            estimatedReadingTime?: number | undefined;
            viewCount?: number | undefined;
            likeCount?: number | undefined;
            shareCount?: number | undefined;
            commentCount?: number | undefined;
            bookmarkCount?: number | undefined;
            primaryCategoryId?: string | undefined;
            secondaryCategories?: string[] | undefined;
            tags?: string[] | undefined;
            theologicalThemes?: string[] | undefined;
            seriesId?: string | undefined;
            seriesOrder?: number | undefined;
            visibility?: "public" | "private" | "invite_only" | "premium" | "vip" | "organization" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                type: string;
                name: string;
                url: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
            metaDescription?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
            licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
            attributionRequired?: boolean | undefined;
        }>, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
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
        items: {
            status: "archived" | "draft" | "published" | "under_review" | "scheduled";
            id: string;
            createdAt: string;
            updatedAt: string;
            slug: string;
            title: string;
            authorId: string;
            coAuthors: string[];
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
            viewCount: number;
            likeCount: number;
            shareCount: number;
            commentCount: number;
            bookmarkCount: number;
            secondaryCategories: string[];
            tags: string[];
            theologicalThemes: string[];
            visibility: "public" | "private" | "invite_only" | "premium" | "vip" | "organization";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                type: string;
                name: string;
                url: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            excerpt?: string | undefined;
            content?: string | undefined;
            wordCount?: number | undefined;
            estimatedReadingTime?: number | undefined;
            primaryCategoryId?: string | undefined;
            seriesId?: string | undefined;
            seriesOrder?: number | undefined;
            aiSummary?: string | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            metaTitle?: string | undefined;
            metaDescription?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            slug: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            status?: "archived" | "draft" | "published" | "under_review" | "scheduled" | undefined;
            excerpt?: string | undefined;
            content?: string | undefined;
            coAuthors?: string[] | undefined;
            format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
            wordCount?: number | undefined;
            estimatedReadingTime?: number | undefined;
            viewCount?: number | undefined;
            likeCount?: number | undefined;
            shareCount?: number | undefined;
            commentCount?: number | undefined;
            bookmarkCount?: number | undefined;
            primaryCategoryId?: string | undefined;
            secondaryCategories?: string[] | undefined;
            tags?: string[] | undefined;
            theologicalThemes?: string[] | undefined;
            seriesId?: string | undefined;
            seriesOrder?: number | undefined;
            visibility?: "public" | "private" | "invite_only" | "premium" | "vip" | "organization" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                type: string;
                name: string;
                url: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
            metaDescription?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
            licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
            attributionRequired?: boolean | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            status: "archived" | "draft" | "published" | "under_review" | "scheduled";
            id: string;
            createdAt: string;
            updatedAt: string;
            slug: string;
            title: string;
            authorId: string;
            coAuthors: string[];
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
            viewCount: number;
            likeCount: number;
            shareCount: number;
            commentCount: number;
            bookmarkCount: number;
            secondaryCategories: string[];
            tags: string[];
            theologicalThemes: string[];
            visibility: "public" | "private" | "invite_only" | "premium" | "vip" | "organization";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                type: string;
                name: string;
                url: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            excerpt?: string | undefined;
            content?: string | undefined;
            wordCount?: number | undefined;
            estimatedReadingTime?: number | undefined;
            primaryCategoryId?: string | undefined;
            seriesId?: string | undefined;
            seriesOrder?: number | undefined;
            aiSummary?: string | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            metaTitle?: string | undefined;
            metaDescription?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            slug: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            status?: "archived" | "draft" | "published" | "under_review" | "scheduled" | undefined;
            excerpt?: string | undefined;
            content?: string | undefined;
            coAuthors?: string[] | undefined;
            format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
            wordCount?: number | undefined;
            estimatedReadingTime?: number | undefined;
            viewCount?: number | undefined;
            likeCount?: number | undefined;
            shareCount?: number | undefined;
            commentCount?: number | undefined;
            bookmarkCount?: number | undefined;
            primaryCategoryId?: string | undefined;
            secondaryCategories?: string[] | undefined;
            tags?: string[] | undefined;
            theologicalThemes?: string[] | undefined;
            seriesId?: string | undefined;
            seriesOrder?: number | undefined;
            visibility?: "public" | "private" | "invite_only" | "premium" | "vip" | "organization" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                type: string;
                name: string;
                url: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
            metaDescription?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
            licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
            attributionRequired?: boolean | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryCommunityResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
        memberCount: z.ZodDefault<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "public" | "private" | "invite_only";
        status: "active" | "inactive" | "archived";
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        memberCount: number;
        description?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        type?: "public" | "private" | "invite_only" | undefined;
        status?: "active" | "inactive" | "archived" | undefined;
        description?: string | undefined;
        memberCount?: number | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "public" | "private" | "invite_only";
        status: "active" | "inactive" | "archived";
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        memberCount: number;
        description?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        type?: "public" | "private" | "invite_only" | undefined;
        status?: "active" | "inactive" | "archived" | undefined;
        description?: string | undefined;
        memberCount?: number | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryCommunityListResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
            status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
            memberCount: z.ZodDefault<z.ZodNumber>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "public" | "private" | "invite_only";
            status: "active" | "inactive" | "archived";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            memberCount: number;
            description?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            type?: "public" | "private" | "invite_only" | undefined;
            status?: "active" | "inactive" | "archived" | undefined;
            description?: string | undefined;
            memberCount?: number | undefined;
        }>, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
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
        items: {
            type: "public" | "private" | "invite_only";
            status: "active" | "inactive" | "archived";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            memberCount: number;
            description?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        ministryMetrics?: {
            totalMinistryLeaders?: number | undefined;
            averageEngagement?: number | undefined;
            culturalDistribution?: Record<string, number> | undefined;
            ministryRoleDistribution?: Record<string, number> | undefined;
        } | undefined;
    }, {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            type?: "public" | "private" | "invite_only" | undefined;
            status?: "active" | "inactive" | "archived" | undefined;
            description?: string | undefined;
            memberCount?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            type: "public" | "private" | "invite_only";
            status: "active" | "inactive" | "archived";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            memberCount: number;
            description?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        items: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            type?: "public" | "private" | "invite_only" | undefined;
            status?: "active" | "inactive" | "archived" | undefined;
            description?: string | undefined;
            memberCount?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryMetricsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        organizationId: z.ZodOptional<z.ZodString>;
        metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
        metricName: z.ZodString;
        value: z.ZodNumber;
        unit: z.ZodOptional<z.ZodString>;
        period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
        periodStart: z.ZodString;
        periodEnd: z.ZodString;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: number;
        id: string;
        createdAt: string;
        updatedAt: string;
        metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
        metricName: string;
        period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
        periodStart: string;
        periodEnd: string;
        organizationId?: string | undefined;
        unit?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    }, {
        value: number;
        id: string;
        createdAt: string;
        updatedAt: string;
        metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
        metricName: string;
        period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
        periodStart: string;
        periodEnd: string;
        organizationId?: string | undefined;
        unit?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        value: number;
        id: string;
        createdAt: string;
        updatedAt: string;
        metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
        metricName: string;
        period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
        periodStart: string;
        periodEnd: string;
        organizationId?: string | undefined;
        unit?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        value: number;
        id: string;
        createdAt: string;
        updatedAt: string;
        metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
        metricName: string;
        period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
        periodStart: string;
        periodEnd: string;
        organizationId?: string | undefined;
        unit?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const aggregatedMinistryMetricsResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        overall: z.ZodObject<{
            id: z.ZodString;
            organizationId: z.ZodOptional<z.ZodString>;
            metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
            metricName: z.ZodString;
            value: z.ZodNumber;
            unit: z.ZodOptional<z.ZodString>;
            period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
            periodStart: z.ZodString;
            periodEnd: z.ZodString;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byMinistryRole: z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.ZodString;
            organizationId: z.ZodOptional<z.ZodString>;
            metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
            metricName: z.ZodString;
            value: z.ZodNumber;
            unit: z.ZodOptional<z.ZodString>;
            period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
            periodStart: z.ZodString;
            periodEnd: z.ZodString;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>>;
        byCulturalContext: z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.ZodString;
            organizationId: z.ZodOptional<z.ZodString>;
            metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
            metricName: z.ZodString;
            value: z.ZodNumber;
            unit: z.ZodOptional<z.ZodString>;
            period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
            periodStart: z.ZodString;
            periodEnd: z.ZodString;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>>;
        byOrganization: z.ZodRecord<z.ZodString, z.ZodObject<{
            id: z.ZodString;
            organizationId: z.ZodOptional<z.ZodString>;
            metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
            metricName: z.ZodString;
            value: z.ZodNumber;
            unit: z.ZodOptional<z.ZodString>;
            period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
            periodStart: z.ZodString;
            periodEnd: z.ZodString;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>>;
        trends: z.ZodObject<{
            growth: z.ZodNumber;
            engagement: z.ZodNumber;
            retention: z.ZodNumber;
            satisfaction: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            engagement: number;
            growth: number;
            retention: number;
            satisfaction: number;
        }, {
            engagement: number;
            growth: number;
            retention: number;
            satisfaction: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        overall: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        byMinistryRole: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byCulturalContext: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byOrganization: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        trends: {
            engagement: number;
            growth: number;
            retention: number;
            satisfaction: number;
        };
    }, {
        overall: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        byMinistryRole: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byCulturalContext: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byOrganization: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        trends: {
            engagement: number;
            growth: number;
            retention: number;
            satisfaction: number;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        overall: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        byMinistryRole: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byCulturalContext: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byOrganization: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        trends: {
            engagement: number;
            growth: number;
            retention: number;
            satisfaction: number;
        };
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        overall: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        byMinistryRole: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byCulturalContext: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        byOrganization: Record<string, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
        trends: {
            engagement: number;
            growth: number;
            retention: number;
            satisfaction: number;
        };
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryDashboardResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        userMetrics: z.ZodObject<{
            id: z.ZodString;
            organizationId: z.ZodOptional<z.ZodString>;
            metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
            metricName: z.ZodString;
            value: z.ZodNumber;
            unit: z.ZodOptional<z.ZodString>;
            period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
            periodStart: z.ZodString;
            periodEnd: z.ZodString;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }, {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        }>;
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
            user: z.ZodObject<Pick<{
                id: z.ZodString;
                email: z.ZodString;
                passwordHash: z.ZodOptional<z.ZodString>;
                firstName: z.ZodString;
                lastName: z.ZodString;
                displayName: z.ZodOptional<z.ZodString>;
                bio: z.ZodOptional<z.ZodString>;
                avatarUrl: z.ZodOptional<z.ZodString>;
                ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
                denomination: z.ZodOptional<z.ZodString>;
                organizationName: z.ZodOptional<z.ZodString>;
                yearsInMinistry: z.ZodOptional<z.ZodNumber>;
                countryCode: z.ZodOptional<z.ZodString>;
                timezone: z.ZodOptional<z.ZodString>;
                languagePrimary: z.ZodDefault<z.ZodString>;
                culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
                assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
                assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
                assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
                assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
                assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
                assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
                assessmentTotal: z.ZodOptional<z.ZodNumber>;
                leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
                subdomain: z.ZodOptional<z.ZodString>;
                customDomain: z.ZodOptional<z.ZodString>;
                platformTitle: z.ZodOptional<z.ZodString>;
                subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
                theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandColors: z.ZodDefault<z.ZodObject<{
                    primary: z.ZodDefault<z.ZodString>;
                    secondary: z.ZodDefault<z.ZodString>;
                    accent: z.ZodDefault<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    primary: string;
                    secondary: string;
                    accent: string;
                }, {
                    primary?: string | undefined;
                    secondary?: string | undefined;
                    accent?: string | undefined;
                }>>;
                emailNotifications: z.ZodDefault<z.ZodObject<{
                    dailyDigest: z.ZodDefault<z.ZodBoolean>;
                    collaborationRequests: z.ZodDefault<z.ZodBoolean>;
                    revenueReports: z.ZodDefault<z.ZodBoolean>;
                    communityUpdates: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    dailyDigest: boolean;
                    collaborationRequests: boolean;
                    revenueReports: boolean;
                    communityUpdates: boolean;
                }, {
                    dailyDigest?: boolean | undefined;
                    collaborationRequests?: boolean | undefined;
                    revenueReports?: boolean | undefined;
                    communityUpdates?: boolean | undefined;
                }>>;
                privacySettings: z.ZodDefault<z.ZodObject<{
                    publicProfile: z.ZodDefault<z.ZodBoolean>;
                    showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
                    allowNetworking: z.ZodDefault<z.ZodBoolean>;
                    shareAnalytics: z.ZodDefault<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    publicProfile: boolean;
                    showAssessmentResults: boolean;
                    allowNetworking: boolean;
                    shareAnalytics: boolean;
                }, {
                    publicProfile?: boolean | undefined;
                    showAssessmentResults?: boolean | undefined;
                    allowNetworking?: boolean | undefined;
                    shareAnalytics?: boolean | undefined;
                }>>;
                onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
                onboardingStep: z.ZodDefault<z.ZodNumber>;
                accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
                lastActiveAt: z.ZodString;
            }, "id" | "displayName" | "avatarUrl" | "firstName" | "lastName">, "strip", z.ZodTypeAny, {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            }, {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "content_created" | "assessment_completed" | "community_joined" | "collaboration_started";
            user: {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            };
            id: string;
            description: string;
            title: string;
            timestamp: string;
        }, {
            type: "content_created" | "assessment_completed" | "community_joined" | "collaboration_started";
            user: {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            };
            id: string;
            description: string;
            title: string;
            timestamp: string;
        }>, "many">;
        recommendations: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["content", "assessment", "community", "collaboration"]>;
            title: z.ZodString;
            description: z.ZodString;
            reason: z.ZodString;
            priority: z.ZodEnum<["low", "medium", "high"]>;
            actionUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "content" | "assessment" | "community" | "collaboration";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            reason: string;
            actionUrl?: string | undefined;
        }, {
            type: "content" | "assessment" | "community" | "collaboration";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            reason: string;
            actionUrl?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        recommendations: {
            type: "content" | "assessment" | "community" | "collaboration";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            reason: string;
            actionUrl?: string | undefined;
        }[];
        userMetrics: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        organizationMetrics: {
            totalMembers: number;
            activeMembers: number;
            totalContent: number;
            averageEngagement: number;
            totalAssessments: number;
            growthRate: number;
        };
        recentActivity: {
            type: "content_created" | "assessment_completed" | "community_joined" | "collaboration_started";
            user: {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            };
            id: string;
            description: string;
            title: string;
            timestamp: string;
        }[];
    }, {
        recommendations: {
            type: "content" | "assessment" | "community" | "collaboration";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            reason: string;
            actionUrl?: string | undefined;
        }[];
        userMetrics: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        organizationMetrics: {
            totalMembers: number;
            activeMembers: number;
            totalContent: number;
            averageEngagement: number;
            totalAssessments: number;
            growthRate: number;
        };
        recentActivity: {
            type: "content_created" | "assessment_completed" | "community_joined" | "collaboration_started";
            user: {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            };
            id: string;
            description: string;
            title: string;
            timestamp: string;
        }[];
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        recommendations: {
            type: "content" | "assessment" | "community" | "collaboration";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            reason: string;
            actionUrl?: string | undefined;
        }[];
        userMetrics: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        organizationMetrics: {
            totalMembers: number;
            activeMembers: number;
            totalContent: number;
            averageEngagement: number;
            totalAssessments: number;
            growthRate: number;
        };
        recentActivity: {
            type: "content_created" | "assessment_completed" | "community_joined" | "collaboration_started";
            user: {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            };
            id: string;
            description: string;
            title: string;
            timestamp: string;
        }[];
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        recommendations: {
            type: "content" | "assessment" | "community" | "collaboration";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            reason: string;
            actionUrl?: string | undefined;
        }[];
        userMetrics: {
            value: number;
            id: string;
            createdAt: string;
            updatedAt: string;
            metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
            metricName: string;
            period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
            periodStart: string;
            periodEnd: string;
            organizationId?: string | undefined;
            unit?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
        };
        organizationMetrics: {
            totalMembers: number;
            activeMembers: number;
            totalContent: number;
            averageEngagement: number;
            totalAssessments: number;
            growthRate: number;
        };
        recentActivity: {
            type: "content_created" | "assessment_completed" | "community_joined" | "collaboration_started";
            user: {
                id: string;
                firstName: string;
                lastName: string;
                displayName?: string | undefined;
                avatarUrl?: string | undefined;
            };
            id: string;
            description: string;
            title: string;
            timestamp: string;
        }[];
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
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
        id: string;
        name: string;
        description: string;
        features: string[];
        isPopular: boolean;
        billingCycle: "monthly" | "yearly";
        price: number;
        ministryCapacity: {
            customBranding: boolean;
            apiAccess: boolean;
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
        };
        isRecommended: boolean;
    }, {
        id: string;
        name: string;
        description: string;
        features: string[];
        billingCycle: "monthly" | "yearly";
        price: number;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        name: string;
        description: string;
        features: string[];
        isPopular: boolean;
        billingCycle: "monthly" | "yearly";
        price: number;
        ministryCapacity: {
            customBranding: boolean;
            apiAccess: boolean;
            maxContentCreators?: number | undefined;
            maxAssessments?: number | undefined;
            maxCommunities?: number | undefined;
        };
        isRecommended: boolean;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        id: string;
        name: string;
        description: string;
        features: string[];
        billingCycle: "monthly" | "yearly";
        price: number;
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
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const ministryCollaborationResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        collaborationType: z.ZodEnum<["project", "study_group", "mentorship", "partnership"]>;
        status: z.ZodEnum<["planning", "active", "completed", "cancelled"]>;
        participants: z.ZodArray<z.ZodObject<Pick<{
            id: z.ZodString;
            email: z.ZodString;
            passwordHash: z.ZodOptional<z.ZodString>;
            firstName: z.ZodString;
            lastName: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organizationName: z.ZodOptional<z.ZodString>;
            yearsInMinistry: z.ZodOptional<z.ZodNumber>;
            countryCode: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            languagePrimary: z.ZodDefault<z.ZodString>;
            culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
            assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
            assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
            assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
            assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
            assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
            assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
            assessmentTotal: z.ZodOptional<z.ZodNumber>;
            leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            customDomain: z.ZodOptional<z.ZodString>;
            platformTitle: z.ZodOptional<z.ZodString>;
            subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandColors: z.ZodDefault<z.ZodObject<{
                primary: z.ZodDefault<z.ZodString>;
                secondary: z.ZodDefault<z.ZodString>;
                accent: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            }>>;
            emailNotifications: z.ZodDefault<z.ZodObject<{
                dailyDigest: z.ZodDefault<z.ZodBoolean>;
                collaborationRequests: z.ZodDefault<z.ZodBoolean>;
                revenueReports: z.ZodDefault<z.ZodBoolean>;
                communityUpdates: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            }>>;
            privacySettings: z.ZodDefault<z.ZodObject<{
                publicProfile: z.ZodDefault<z.ZodBoolean>;
                showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
                allowNetworking: z.ZodDefault<z.ZodBoolean>;
                shareAnalytics: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            }>>;
            onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
            onboardingStep: z.ZodDefault<z.ZodNumber>;
            accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            lastActiveAt: z.ZodString;
        }, "ministryRole" | "id" | "displayName" | "avatarUrl" | "firstName" | "lastName">, "strip", z.ZodTypeAny, {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }, {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }>, "many">;
        organizationId: z.ZodOptional<z.ZodString>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "cancelled" | "completed" | "planning";
        id: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }, {
        status: "active" | "cancelled" | "completed" | "planning";
        id: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "active" | "cancelled" | "completed" | "planning";
        id: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        status: "active" | "cancelled" | "completed" | "planning";
        id: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        collaborationType: "project" | "study_group" | "mentorship" | "partnership";
        participants: {
            ministryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
            avatarUrl?: string | undefined;
        }[];
        organizationId?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const authMinistryCombinedResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodString;
            email: z.ZodString;
            passwordHash: z.ZodOptional<z.ZodString>;
            firstName: z.ZodString;
            lastName: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatarUrl: z.ZodOptional<z.ZodString>;
            ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organizationName: z.ZodOptional<z.ZodString>;
            yearsInMinistry: z.ZodOptional<z.ZodNumber>;
            countryCode: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            languagePrimary: z.ZodDefault<z.ZodString>;
            culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
            assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
            assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
            assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
            assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
            assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
            assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
            assessmentTotal: z.ZodOptional<z.ZodNumber>;
            leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            customDomain: z.ZodOptional<z.ZodString>;
            platformTitle: z.ZodOptional<z.ZodString>;
            subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandColors: z.ZodDefault<z.ZodObject<{
                primary: z.ZodDefault<z.ZodString>;
                secondary: z.ZodDefault<z.ZodString>;
                accent: z.ZodDefault<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            }>>;
            emailNotifications: z.ZodDefault<z.ZodObject<{
                dailyDigest: z.ZodDefault<z.ZodBoolean>;
                collaborationRequests: z.ZodDefault<z.ZodBoolean>;
                revenueReports: z.ZodDefault<z.ZodBoolean>;
                communityUpdates: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            }>>;
            privacySettings: z.ZodDefault<z.ZodObject<{
                publicProfile: z.ZodDefault<z.ZodBoolean>;
                showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
                allowNetworking: z.ZodDefault<z.ZodBoolean>;
                shareAnalytics: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            }>>;
            onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
            onboardingStep: z.ZodDefault<z.ZodNumber>;
            accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            lastActiveAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            languagePrimary: string;
            subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
            theologicalFocus: string[];
            brandColors: {
                primary: string;
                secondary: string;
                accent: string;
            };
            emailNotifications: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            };
            privacySettings: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            };
            onboardingCompleted: boolean;
            onboardingStep: number;
            accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            languagePrimary?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
            subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
            theologicalFocus?: string[] | undefined;
            brandColors?: {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            } | undefined;
            emailNotifications?: {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            } | undefined;
            privacySettings?: {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            } | undefined;
            onboardingCompleted?: boolean | undefined;
            onboardingStep?: number | undefined;
            accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        }>;
        organization: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            logoUrl: z.ZodOptional<z.ZodString>;
            organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
            sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
            contactEmail: z.ZodOptional<z.ZodString>;
            contactPhone: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                street: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }, {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            }>>;
            licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
            maxUsers: z.ZodDefault<z.ZodNumber>;
            billingEmail: z.ZodOptional<z.ZodString>;
            accountOwnerId: z.ZodOptional<z.ZodString>;
            stripeCustomerId: z.ZodOptional<z.ZodString>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "trial" | "suspended" | "cancelled";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "enterprise" | "individual" | "team";
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "enterprise" | "individual" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        }>>;
        permissions: z.ZodArray<z.ZodString, "many">;
        ministryContext: z.ZodObject<{
            userMinistryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            organizationContext: z.ZodOptional<z.ZodObject<{
                organizationId: z.ZodString;
                userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
                permissions: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            }, {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            }>>;
            culturalContext: z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>;
        }, "strip", z.ZodTypeAny, {
            culturalContext: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global";
            userMinistryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            organizationContext?: {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            } | undefined;
        }, {
            culturalContext: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global";
            userMinistryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            organizationContext?: {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            } | undefined;
        }>;
        session: z.ZodObject<{
            accessToken: z.ZodString;
            refreshToken: z.ZodString;
            expiresAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            expiresAt: string;
            accessToken: string;
            refreshToken: string;
        }, {
            expiresAt: string;
            accessToken: string;
            refreshToken: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            languagePrimary: string;
            subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
            theologicalFocus: string[];
            brandColors: {
                primary: string;
                secondary: string;
                accent: string;
            };
            emailNotifications: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            };
            privacySettings: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            };
            onboardingCompleted: boolean;
            onboardingStep: number;
            accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
        };
        permissions: string[];
        ministryContext: {
            culturalContext: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global";
            userMinistryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            organizationContext?: {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            } | undefined;
        };
        session: {
            expiresAt: string;
            accessToken: string;
            refreshToken: string;
        };
        organization?: {
            status: "active" | "trial" | "suspended" | "cancelled";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "enterprise" | "individual" | "team";
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        } | undefined;
    }, {
        user: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            languagePrimary?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
            subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
            theologicalFocus?: string[] | undefined;
            brandColors?: {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            } | undefined;
            emailNotifications?: {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            } | undefined;
            privacySettings?: {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            } | undefined;
            onboardingCompleted?: boolean | undefined;
            onboardingStep?: number | undefined;
            accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        };
        permissions: string[];
        ministryContext: {
            culturalContext: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global";
            userMinistryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            organizationContext?: {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            } | undefined;
        };
        session: {
            expiresAt: string;
            accessToken: string;
            refreshToken: string;
        };
        organization?: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "enterprise" | "individual" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        } | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        user: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            languagePrimary: string;
            subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
            theologicalFocus: string[];
            brandColors: {
                primary: string;
                secondary: string;
                accent: string;
            };
            emailNotifications: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            };
            privacySettings: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            };
            onboardingCompleted: boolean;
            onboardingStep: number;
            accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
        };
        permissions: string[];
        ministryContext: {
            culturalContext: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global";
            userMinistryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            organizationContext?: {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            } | undefined;
        };
        session: {
            expiresAt: string;
            accessToken: string;
            refreshToken: string;
        };
        organization?: {
            status: "active" | "trial" | "suspended" | "cancelled";
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "enterprise" | "individual" | "team";
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            maxUsers: number;
            description?: string | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}, {
    data: {
        user: {
            id: string;
            createdAt: string;
            updatedAt: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            lastActiveAt: string;
            denomination?: string | undefined;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            organizationName?: string | undefined;
            yearsInMinistry?: number | undefined;
            countryCode?: string | undefined;
            timezone?: string | undefined;
            languagePrimary?: string | undefined;
            culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
            assessmentMovementAlignment?: number | undefined;
            assessmentAudienceEngagement?: number | undefined;
            assessmentContentReadiness?: number | undefined;
            assessmentRevenuePotential?: number | undefined;
            assessmentNetworkEffects?: number | undefined;
            assessmentStrategicFit?: number | undefined;
            assessmentTotal?: number | undefined;
            leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            customDomain?: string | undefined;
            platformTitle?: string | undefined;
            subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
            theologicalFocus?: string[] | undefined;
            brandColors?: {
                primary?: string | undefined;
                secondary?: string | undefined;
                accent?: string | undefined;
            } | undefined;
            emailNotifications?: {
                dailyDigest?: boolean | undefined;
                collaborationRequests?: boolean | undefined;
                revenueReports?: boolean | undefined;
                communityUpdates?: boolean | undefined;
            } | undefined;
            privacySettings?: {
                publicProfile?: boolean | undefined;
                showAssessmentResults?: boolean | undefined;
                allowNetworking?: boolean | undefined;
                shareAnalytics?: boolean | undefined;
            } | undefined;
            onboardingCompleted?: boolean | undefined;
            onboardingStep?: number | undefined;
            accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        };
        permissions: string[];
        ministryContext: {
            culturalContext: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global";
            userMinistryRole: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher";
            organizationContext?: {
                organizationId: string;
                permissions: string[];
                userRole: "owner" | "admin" | "member" | "viewer";
            } | undefined;
        };
        session: {
            expiresAt: string;
            accessToken: string;
            refreshToken: string;
        };
        organization?: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
            status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "enterprise" | "individual" | "team" | undefined;
            website?: string | undefined;
            logoUrl?: string | undefined;
            sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
            contactEmail?: string | undefined;
            contactPhone?: string | undefined;
            address?: {
                street?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
                postalCode?: string | undefined;
            } | undefined;
            maxUsers?: number | undefined;
            billingEmail?: string | undefined;
            accountOwnerId?: string | undefined;
            stripeCustomerId?: string | undefined;
            stripeProductId?: string | undefined;
        } | undefined;
    };
    success: boolean;
    metadata: {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    };
    message?: string | undefined;
    ministryContext?: {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    } | undefined;
}>;
export declare const organizationScopedResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any> extends infer T_6 ? { [k in keyof T_6]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }> extends infer T_7 ? { [k_1 in keyof T_7]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}>, any> extends infer T_3 ? { [k_2 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any> extends infer T_4 ? { [k in keyof T_4]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }> extends infer T_5 ? { [k_1 in keyof T_5]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}>, any>[k_2]; } : never, z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any> extends infer T_11 ? { [k in keyof T_11]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }> extends infer T_12 ? { [k_1 in keyof T_12]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }>;
}> extends infer T_8 ? { [k_3 in keyof T_8]: z.baseObjectInputType<{
    data: z.ZodObject<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any> extends infer T_9 ? { [k in keyof T_9]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }> extends infer T_10 ? { [k_1 in keyof T_10]: z.baseObjectInputType<{
        data: T;
        organizationContext: z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
            isOwner: z.ZodBoolean;
            isAdmin: z.ZodBoolean;
            canManageUsers: z.ZodBoolean;
            canManageContent: z.ZodBoolean;
            canViewAnalytics: z.ZodBoolean;
            canManageSubscriptions: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
            isOwner: boolean;
            isAdmin: boolean;
            canManageUsers: boolean;
            canManageContent: boolean;
            canViewAnalytics: boolean;
            canManageSubscriptions: boolean;
        }>;
    }>[k_1]; } : never>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
            plantMetrics?: {
                totalPlants: number;
                activePlants: number;
                averageGrowth: number;
            } | undefined;
        }, {
            isPlant: boolean;
            plantStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
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
        userMinistryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
        organizationContext: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodString;
            userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }, {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        }>>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }, {
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        permissions?: string[] | undefined;
        userMinistryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
        organizationContext?: {
            organizationId: string;
            permissions: string[];
            userRole: "owner" | "admin" | "member" | "viewer";
        } | undefined;
    }>>;
    metadata: z.ZodObject<{
        requestId: z.ZodString;
        timestamp: z.ZodString;
        version: z.ZodString;
        processingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        version: string;
        requestId: string;
        timestamp: string;
        processingTime?: number | undefined;
    }, {
        version: string;
        requestId: string;
        timestamp: string;
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