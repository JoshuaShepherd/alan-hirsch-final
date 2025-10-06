import { z } from 'zod';
export declare const apiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}>, any>[k]; } : never, z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
    data: T;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}>[k_1]; } : never>;
export declare const apiErrorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodAny>;
    success: z.ZodLiteral<false>;
}, "strip", z.ZodTypeAny, {
    error: string;
    success: false;
    message?: string | undefined;
    details?: any;
}, {
    error: string;
    success: false;
    message?: string | undefined;
    details?: any;
}>;
export declare const paginationSchema: z.ZodObject<{
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
export declare const paginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<T, "many">;
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
    }, "strip", z.ZodTypeAny, {
        data: T["_output"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: T["_input"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: T["_output"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: T["_input"][];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userProfileResponseSchema: z.ZodObject<{
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
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        languagePrimary: string;
        subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
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
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
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
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
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
        subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
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
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        languagePrimary: string;
        subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
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
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
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
    message?: string | undefined;
}, {
    data: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
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
        subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
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
    message?: string | undefined;
}>;
export declare const userProfileListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
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
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            languagePrimary: string;
            subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
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
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            denomination?: string | undefined;
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
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            denomination?: string | undefined;
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
            subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            languagePrimary: string;
            subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
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
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            denomination?: string | undefined;
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
    }, {
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            denomination?: string | undefined;
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
            subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
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
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            languagePrimary: string;
            subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
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
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            denomination?: string | undefined;
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
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            passwordHash?: string | undefined;
            displayName?: string | undefined;
            bio?: string | undefined;
            avatarUrl?: string | undefined;
            denomination?: string | undefined;
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
            subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
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
    };
    message?: string | undefined;
}>;
export declare const organizationResponseSchema: z.ZodObject<{
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
        id: string;
        status: "active" | "suspended" | "trial" | "cancelled";
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "individual" | "enterprise" | "team";
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
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
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "individual" | "enterprise" | "team" | undefined;
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
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        status: "active" | "suspended" | "trial" | "cancelled";
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        licenseType: "individual" | "enterprise" | "team";
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
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
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        slug: string;
        organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
        status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
        description?: string | undefined;
        licenseType?: "individual" | "enterprise" | "team" | undefined;
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
    message?: string | undefined;
}>;
export declare const organizationListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
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
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
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
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
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
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
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
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            status: "active" | "suspended" | "trial" | "cancelled";
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            licenseType: "individual" | "enterprise" | "team";
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
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
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            name: string;
            slug: string;
            organizationType: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "business" | "ministry_network";
            status?: "active" | "suspended" | "trial" | "cancelled" | undefined;
            description?: string | undefined;
            licenseType?: "individual" | "enterprise" | "team" | undefined;
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
    };
    message?: string | undefined;
}>;
export declare const organizationMembershipResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        organizationId: z.ZodString;
        role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>;
        joinedAt: z.ZodOptional<z.ZodString>;
        invitedAt: z.ZodOptional<z.ZodString>;
        invitedBy: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "active" | "inactive" | "pending" | "cancelled";
        createdAt: string;
        updatedAt: string;
        organizationId: string;
        role: "owner" | "admin" | "member" | "viewer";
        userId: string;
        permissions: string[];
        joinedAt?: string | undefined;
        invitedAt?: string | undefined;
        invitedBy?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        organizationId: string;
        role: "owner" | "admin" | "member" | "viewer";
        userId: string;
        status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
        permissions?: string[] | undefined;
        joinedAt?: string | undefined;
        invitedAt?: string | undefined;
        invitedBy?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        status: "active" | "inactive" | "pending" | "cancelled";
        createdAt: string;
        updatedAt: string;
        organizationId: string;
        role: "owner" | "admin" | "member" | "viewer";
        userId: string;
        permissions: string[];
        joinedAt?: string | undefined;
        invitedAt?: string | undefined;
        invitedBy?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        organizationId: string;
        role: "owner" | "admin" | "member" | "viewer";
        userId: string;
        status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
        permissions?: string[] | undefined;
        joinedAt?: string | undefined;
        invitedAt?: string | undefined;
        invitedBy?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const organizationMembershipListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            organizationId: z.ZodString;
            role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
            permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            status: z.ZodDefault<z.ZodEnum<["pending", "active", "inactive", "cancelled"]>>;
            joinedAt: z.ZodOptional<z.ZodString>;
            invitedAt: z.ZodOptional<z.ZodString>;
            invitedBy: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: "active" | "inactive" | "pending" | "cancelled";
            createdAt: string;
            updatedAt: string;
            organizationId: string;
            role: "owner" | "admin" | "member" | "viewer";
            userId: string;
            permissions: string[];
            joinedAt?: string | undefined;
            invitedAt?: string | undefined;
            invitedBy?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            organizationId: string;
            role: "owner" | "admin" | "member" | "viewer";
            userId: string;
            status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
            permissions?: string[] | undefined;
            joinedAt?: string | undefined;
            invitedAt?: string | undefined;
            invitedBy?: string | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            status: "active" | "inactive" | "pending" | "cancelled";
            createdAt: string;
            updatedAt: string;
            organizationId: string;
            role: "owner" | "admin" | "member" | "viewer";
            userId: string;
            permissions: string[];
            joinedAt?: string | undefined;
            invitedAt?: string | undefined;
            invitedBy?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            organizationId: string;
            role: "owner" | "admin" | "member" | "viewer";
            userId: string;
            status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
            permissions?: string[] | undefined;
            joinedAt?: string | undefined;
            invitedAt?: string | undefined;
            invitedBy?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            status: "active" | "inactive" | "pending" | "cancelled";
            createdAt: string;
            updatedAt: string;
            organizationId: string;
            role: "owner" | "admin" | "member" | "viewer";
            userId: string;
            permissions: string[];
            joinedAt?: string | undefined;
            invitedAt?: string | undefined;
            invitedBy?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            organizationId: string;
            role: "owner" | "admin" | "member" | "viewer";
            userId: string;
            status?: "active" | "inactive" | "pending" | "cancelled" | undefined;
            permissions?: string[] | undefined;
            joinedAt?: string | undefined;
            invitedAt?: string | undefined;
            invitedBy?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const assessmentApiResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
        questionsCount: z.ZodNumber;
        estimatedDuration: z.ZodOptional<z.ZodNumber>;
        passingScore: z.ZodOptional<z.ZodNumber>;
        validityScore: z.ZodOptional<z.ZodNumber>;
        reliabilityScore: z.ZodOptional<z.ZodNumber>;
        instructions: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
        researchBacked: z.ZodDefault<z.ZodBoolean>;
        scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        status: "draft" | "active" | "archived" | "under_review";
        questionsCount: number;
        version: string;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
    }, {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        questionsCount: number;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        status?: "draft" | "active" | "archived" | "under_review" | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
        version?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        status: "draft" | "active" | "archived" | "under_review";
        questionsCount: number;
        version: string;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        questionsCount: number;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        status?: "draft" | "active" | "archived" | "under_review" | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
        version?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const assessmentListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
            questionsCount: z.ZodNumber;
            estimatedDuration: z.ZodOptional<z.ZodNumber>;
            passingScore: z.ZodOptional<z.ZodNumber>;
            validityScore: z.ZodOptional<z.ZodNumber>;
            reliabilityScore: z.ZodOptional<z.ZodNumber>;
            instructions: z.ZodOptional<z.ZodString>;
            publishedAt: z.ZodOptional<z.ZodString>;
            version: z.ZodDefault<z.ZodString>;
            language: z.ZodDefault<z.ZodString>;
            culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            researchBacked: z.ZodDefault<z.ZodBoolean>;
            scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
            status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
            assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
            status: "draft" | "active" | "archived" | "under_review";
            questionsCount: number;
            version: string;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            publishedAt?: string | undefined;
        }, {
            id: string;
            name: string;
            slug: string;
            assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            status?: "draft" | "active" | "archived" | "under_review" | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            publishedAt?: string | undefined;
            version?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            name: string;
            slug: string;
            assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
            status: "draft" | "active" | "archived" | "under_review";
            questionsCount: number;
            version: string;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            publishedAt?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            name: string;
            slug: string;
            assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            status?: "draft" | "active" | "archived" | "under_review" | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            publishedAt?: string | undefined;
            version?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            name: string;
            slug: string;
            assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
            status: "draft" | "active" | "archived" | "under_review";
            questionsCount: number;
            version: string;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            publishedAt?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            name: string;
            slug: string;
            assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
            questionsCount: number;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            status?: "draft" | "active" | "archived" | "under_review" | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            publishedAt?: string | undefined;
            version?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const assessmentQuestionResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        assessmentId: z.ZodString;
        questionText: z.ZodString;
        questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
        orderIndex: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        apestDimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
        answerOptions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            value: z.ZodNumber;
            label: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            value: number;
            label: string;
            description?: string | undefined;
        }, {
            value: number;
            label: string;
            description?: string | undefined;
        }>, "many">>;
        isRequired: z.ZodDefault<z.ZodBoolean>;
        weight: z.ZodDefault<z.ZodNumber>;
        reverseScored: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
        isRequired: boolean;
        weight: number;
        reverseScored: boolean;
        category?: string | undefined;
        apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answerOptions?: {
            value: number;
            label: string;
            description?: string | undefined;
        }[] | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
        category?: string | undefined;
        apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answerOptions?: {
            value: number;
            label: string;
            description?: string | undefined;
        }[] | undefined;
        isRequired?: boolean | undefined;
        weight?: number | undefined;
        reverseScored?: boolean | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
        isRequired: boolean;
        weight: number;
        reverseScored: boolean;
        category?: string | undefined;
        apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answerOptions?: {
            value: number;
            label: string;
            description?: string | undefined;
        }[] | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
        category?: string | undefined;
        apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answerOptions?: {
            value: number;
            label: string;
            description?: string | undefined;
        }[] | undefined;
        isRequired?: boolean | undefined;
        weight?: number | undefined;
        reverseScored?: boolean | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const assessmentQuestionListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            assessmentId: z.ZodString;
            questionText: z.ZodString;
            questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
            orderIndex: z.ZodNumber;
            category: z.ZodOptional<z.ZodString>;
            apestDimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            answerOptions: z.ZodOptional<z.ZodArray<z.ZodObject<{
                value: z.ZodNumber;
                label: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                value: number;
                label: string;
                description?: string | undefined;
            }, {
                value: number;
                label: string;
                description?: string | undefined;
            }>, "many">>;
            isRequired: z.ZodDefault<z.ZodBoolean>;
            weight: z.ZodDefault<z.ZodNumber>;
            reverseScored: z.ZodDefault<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            questionText: string;
            questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
            orderIndex: number;
            isRequired: boolean;
            weight: number;
            reverseScored: boolean;
            category?: string | undefined;
            apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            answerOptions?: {
                value: number;
                label: string;
                description?: string | undefined;
            }[] | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            questionText: string;
            questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
            orderIndex: number;
            category?: string | undefined;
            apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            answerOptions?: {
                value: number;
                label: string;
                description?: string | undefined;
            }[] | undefined;
            isRequired?: boolean | undefined;
            weight?: number | undefined;
            reverseScored?: boolean | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            questionText: string;
            questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
            orderIndex: number;
            isRequired: boolean;
            weight: number;
            reverseScored: boolean;
            category?: string | undefined;
            apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            answerOptions?: {
                value: number;
                label: string;
                description?: string | undefined;
            }[] | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            questionText: string;
            questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
            orderIndex: number;
            category?: string | undefined;
            apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            answerOptions?: {
                value: number;
                label: string;
                description?: string | undefined;
            }[] | undefined;
            isRequired?: boolean | undefined;
            weight?: number | undefined;
            reverseScored?: boolean | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            questionText: string;
            questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
            orderIndex: number;
            isRequired: boolean;
            weight: number;
            reverseScored: boolean;
            category?: string | undefined;
            apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            answerOptions?: {
                value: number;
                label: string;
                description?: string | undefined;
            }[] | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            questionText: string;
            questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
            orderIndex: number;
            category?: string | undefined;
            apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            answerOptions?: {
                value: number;
                label: string;
                description?: string | undefined;
            }[] | undefined;
            isRequired?: boolean | undefined;
            weight?: number | undefined;
            reverseScored?: boolean | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userAssessmentResponseSchema: z.ZodObject<{
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
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
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
        assessmentId: string;
        userId: string;
        startedAt: string;
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
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
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
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
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
    message?: string | undefined;
}>;
export declare const userAssessmentListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
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
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
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
            assessmentId: string;
            userId: string;
            startedAt: string;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
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
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
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
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
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
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
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
    };
    message?: string | undefined;
}>;
export declare const assessmentResponseResponseSchema: z.ZodObject<{
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
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
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
        assessmentId: string;
        userId: string;
        startedAt: string;
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
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
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
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
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
    message?: string | undefined;
}>;
export declare const assessmentResponseListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
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
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
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
            assessmentId: string;
            userId: string;
            startedAt: string;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
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
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
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
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
            completionPercentage: number;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
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
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            assessmentId: string;
            userId: string;
            startedAt: string;
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
    };
    message?: string | undefined;
}>;
export declare const contentCategoryResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        parentId: z.ZodOptional<z.ZodString>;
        orderIndex: z.ZodDefault<z.ZodNumber>;
        theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
        movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
        apestRelevance: z.ZodDefault<z.ZodObject<{
            apostolic: z.ZodDefault<z.ZodNumber>;
            prophetic: z.ZodDefault<z.ZodNumber>;
            evangelistic: z.ZodDefault<z.ZodNumber>;
            shepherding: z.ZodDefault<z.ZodNumber>;
            teaching: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        }, {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        }>>;
        metaDescription: z.ZodOptional<z.ZodString>;
        keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
        orderIndex: number;
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        keywords: string[];
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        metaDescription?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        slug: string;
        orderIndex: number;
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        keywords: string[];
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        metaDescription?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const contentCategoryListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            parentId: z.ZodOptional<z.ZodString>;
            orderIndex: z.ZodDefault<z.ZodNumber>;
            theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
            movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
            apestRelevance: z.ZodDefault<z.ZodObject<{
                apostolic: z.ZodDefault<z.ZodNumber>;
                prophetic: z.ZodDefault<z.ZodNumber>;
                evangelistic: z.ZodDefault<z.ZodNumber>;
                shepherding: z.ZodDefault<z.ZodNumber>;
                teaching: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            }, {
                apostolic?: number | undefined;
                prophetic?: number | undefined;
                evangelistic?: number | undefined;
                shepherding?: number | undefined;
                teaching?: number | undefined;
            }>>;
            metaDescription: z.ZodOptional<z.ZodString>;
            keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            isActive: z.ZodDefault<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            slug: string;
            orderIndex: number;
            movementRelevanceScore: number;
            apestRelevance: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            keywords: string[];
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            parentId?: string | undefined;
            theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
            metaDescription?: string | undefined;
        }, {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            parentId?: string | undefined;
            orderIndex?: number | undefined;
            theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
            movementRelevanceScore?: number | undefined;
            apestRelevance?: {
                apostolic?: number | undefined;
                prophetic?: number | undefined;
                evangelistic?: number | undefined;
                shepherding?: number | undefined;
                teaching?: number | undefined;
            } | undefined;
            metaDescription?: string | undefined;
            keywords?: string[] | undefined;
            isActive?: boolean | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            id: string;
            slug: string;
            orderIndex: number;
            movementRelevanceScore: number;
            apestRelevance: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            keywords: string[];
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            parentId?: string | undefined;
            theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
            metaDescription?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            parentId?: string | undefined;
            orderIndex?: number | undefined;
            theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
            movementRelevanceScore?: number | undefined;
            apestRelevance?: {
                apostolic?: number | undefined;
                prophetic?: number | undefined;
                evangelistic?: number | undefined;
                shepherding?: number | undefined;
                teaching?: number | undefined;
            } | undefined;
            metaDescription?: string | undefined;
            keywords?: string[] | undefined;
            isActive?: boolean | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            name: string;
            id: string;
            slug: string;
            orderIndex: number;
            movementRelevanceScore: number;
            apestRelevance: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            keywords: string[];
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            parentId?: string | undefined;
            theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
            metaDescription?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            description?: string | undefined;
            parentId?: string | undefined;
            orderIndex?: number | undefined;
            theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
            movementRelevanceScore?: number | undefined;
            apestRelevance?: {
                apostolic?: number | undefined;
                prophetic?: number | undefined;
                evangelistic?: number | undefined;
                shepherding?: number | undefined;
                teaching?: number | undefined;
            } | undefined;
            metaDescription?: string | undefined;
            keywords?: string[] | undefined;
            isActive?: boolean | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const contentSeriesResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        authorId: z.ZodString;
        collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        primaryCategoryId: z.ZodOptional<z.ZodString>;
        seriesType: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
        difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
        totalItems: z.ZodDefault<z.ZodNumber>;
        estimatedDuration: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>;
        featuredImageUrl: z.ZodOptional<z.ZodString>;
        metaDescription: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        tags: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        collaborators: string[];
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        difficulty: "beginner" | "intermediate" | "advanced" | "expert";
        totalItems: number;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
    }, {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        status?: "draft" | "published" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        tags?: string[] | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        collaborators?: string[] | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
        totalItems?: number | undefined;
        estimatedDuration?: number | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "draft" | "published" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        tags: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        collaborators: string[];
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        difficulty: "beginner" | "intermediate" | "advanced" | "expert";
        totalItems: number;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        status?: "draft" | "published" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        tags?: string[] | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        collaborators?: string[] | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
        totalItems?: number | undefined;
        estimatedDuration?: number | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const contentSeriesListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            authorId: z.ZodString;
            collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            primaryCategoryId: z.ZodOptional<z.ZodString>;
            seriesType: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
            difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
            totalItems: z.ZodDefault<z.ZodNumber>;
            estimatedDuration: z.ZodOptional<z.ZodNumber>;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
            status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>;
            featuredImageUrl: z.ZodOptional<z.ZodString>;
            metaDescription: z.ZodOptional<z.ZodString>;
            publishedAt: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "draft" | "published" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            tags: string[];
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            collaborators: string[];
            seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
            difficulty: "beginner" | "intermediate" | "advanced" | "expert";
            totalItems: number;
            description?: string | undefined;
            metaDescription?: string | undefined;
            primaryCategoryId?: string | undefined;
            featuredImageUrl?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
        }, {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
            status?: "draft" | "published" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            metaDescription?: string | undefined;
            primaryCategoryId?: string | undefined;
            tags?: string[] | undefined;
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            featuredImageUrl?: string | undefined;
            publishedAt?: string | undefined;
            collaborators?: string[] | undefined;
            difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
            totalItems?: number | undefined;
            estimatedDuration?: number | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            status: "draft" | "published" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            tags: string[];
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            collaborators: string[];
            seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
            difficulty: "beginner" | "intermediate" | "advanced" | "expert";
            totalItems: number;
            description?: string | undefined;
            metaDescription?: string | undefined;
            primaryCategoryId?: string | undefined;
            featuredImageUrl?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
            status?: "draft" | "published" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            metaDescription?: string | undefined;
            primaryCategoryId?: string | undefined;
            tags?: string[] | undefined;
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            featuredImageUrl?: string | undefined;
            publishedAt?: string | undefined;
            collaborators?: string[] | undefined;
            difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
            totalItems?: number | undefined;
            estimatedDuration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            status: "draft" | "published" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            tags: string[];
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            collaborators: string[];
            seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
            difficulty: "beginner" | "intermediate" | "advanced" | "expert";
            totalItems: number;
            description?: string | undefined;
            metaDescription?: string | undefined;
            primaryCategoryId?: string | undefined;
            featuredImageUrl?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
            status?: "draft" | "published" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            metaDescription?: string | undefined;
            primaryCategoryId?: string | undefined;
            tags?: string[] | undefined;
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            featuredImageUrl?: string | undefined;
            publishedAt?: string | undefined;
            collaborators?: string[] | undefined;
            difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
            totalItems?: number | undefined;
            estimatedDuration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const contentItemResponseSchema: z.ZodObject<{
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
            name: string;
            url: string;
            type: string;
            size: number;
        }, {
            name: string;
            url: string;
            type: string;
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
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
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
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        metaDescription?: string | undefined;
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
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }, {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
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
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
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
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        metaDescription?: string | undefined;
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
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
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
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const contentItemListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
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
                name: string;
                url: string;
                type: string;
                size: number;
            }, {
                name: string;
                url: string;
                type: string;
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
            status: "draft" | "published" | "archived" | "under_review" | "scheduled";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            metaDescription?: string | undefined;
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
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }, {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
            metaDescription?: string | undefined;
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
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            status: "draft" | "published" | "archived" | "under_review" | "scheduled";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            metaDescription?: string | undefined;
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
    }, {
        data: {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
            metaDescription?: string | undefined;
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
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
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
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            status: "draft" | "published" | "archived" | "under_review" | "scheduled";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            metaDescription?: string | undefined;
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
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
            metaDescription?: string | undefined;
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
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
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
    };
    message?: string | undefined;
}>;
export declare const communityResponseSchema: z.ZodObject<{
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
        name: string;
        type: "public" | "private" | "invite_only";
        status: "active" | "archived" | "inactive";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        memberCount: number;
        description?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        type?: "public" | "private" | "invite_only" | undefined;
        status?: "active" | "archived" | "inactive" | undefined;
        description?: string | undefined;
        memberCount?: number | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        type: "public" | "private" | "invite_only";
        status: "active" | "archived" | "inactive";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        memberCount: number;
        description?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        type?: "public" | "private" | "invite_only" | undefined;
        status?: "active" | "archived" | "inactive" | undefined;
        description?: string | undefined;
        memberCount?: number | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const communityListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
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
            name: string;
            type: "public" | "private" | "invite_only";
            status: "active" | "archived" | "inactive";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            memberCount: number;
            description?: string | undefined;
        }, {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            type?: "public" | "private" | "invite_only" | undefined;
            status?: "active" | "archived" | "inactive" | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            type: "public" | "private" | "invite_only";
            status: "active" | "archived" | "inactive";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
    }, {
        data: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            type?: "public" | "private" | "invite_only" | undefined;
            status?: "active" | "archived" | "inactive" | undefined;
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
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            name: string;
            type: "public" | "private" | "invite_only";
            status: "active" | "archived" | "inactive";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            type?: "public" | "private" | "invite_only" | undefined;
            status?: "active" | "archived" | "inactive" | undefined;
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
    };
    message?: string | undefined;
}>;
export declare const communityMembershipResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        communityId: z.ZodString;
        userId: z.ZodString;
        role: z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>;
        status: z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>;
        joinedAt: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "inactive" | "banned";
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        communityId: string;
        role: "owner" | "admin" | "member" | "moderator";
        joinedAt: string;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        communityId: string;
        joinedAt: string;
        status?: "active" | "inactive" | "banned" | undefined;
        role?: "owner" | "admin" | "member" | "moderator" | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "active" | "inactive" | "banned";
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        communityId: string;
        role: "owner" | "admin" | "member" | "moderator";
        joinedAt: string;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        communityId: string;
        joinedAt: string;
        status?: "active" | "inactive" | "banned" | undefined;
        role?: "owner" | "admin" | "member" | "moderator" | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const communityMembershipListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            communityId: z.ZodString;
            userId: z.ZodString;
            role: z.ZodDefault<z.ZodEnum<["owner", "admin", "moderator", "member"]>>;
            status: z.ZodDefault<z.ZodEnum<["active", "inactive", "banned"]>>;
            joinedAt: z.ZodString;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "inactive" | "banned";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            communityId: string;
            role: "owner" | "admin" | "member" | "moderator";
            joinedAt: string;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            communityId: string;
            joinedAt: string;
            status?: "active" | "inactive" | "banned" | undefined;
            role?: "owner" | "admin" | "member" | "moderator" | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            status: "active" | "inactive" | "banned";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            communityId: string;
            role: "owner" | "admin" | "member" | "moderator";
            joinedAt: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            communityId: string;
            joinedAt: string;
            status?: "active" | "inactive" | "banned" | undefined;
            role?: "owner" | "admin" | "member" | "moderator" | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            status: "active" | "inactive" | "banned";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            communityId: string;
            role: "owner" | "admin" | "member" | "moderator";
            joinedAt: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            communityId: string;
            joinedAt: string;
            status?: "active" | "inactive" | "banned" | undefined;
            role?: "owner" | "admin" | "member" | "moderator" | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const communityPostResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        communityId: z.ZodString;
        authorId: z.ZodString;
        title: z.ZodString;
        content: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>;
        status: z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>;
        viewCount: z.ZodDefault<z.ZodNumber>;
        likeCount: z.ZodDefault<z.ZodNumber>;
        commentCount: z.ZodDefault<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "discussion" | "announcement" | "question" | "resource";
        status: "draft" | "published" | "archived";
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        content: string;
        authorId: string;
        viewCount: number;
        likeCount: number;
        commentCount: number;
        communityId: string;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        content: string;
        authorId: string;
        communityId: string;
        type?: "discussion" | "announcement" | "question" | "resource" | undefined;
        status?: "draft" | "published" | "archived" | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        commentCount?: number | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "discussion" | "announcement" | "question" | "resource";
        status: "draft" | "published" | "archived";
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        content: string;
        authorId: string;
        viewCount: number;
        likeCount: number;
        commentCount: number;
        communityId: string;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        content: string;
        authorId: string;
        communityId: string;
        type?: "discussion" | "announcement" | "question" | "resource" | undefined;
        status?: "draft" | "published" | "archived" | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        commentCount?: number | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const communityPostListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            communityId: z.ZodString;
            authorId: z.ZodString;
            title: z.ZodString;
            content: z.ZodString;
            type: z.ZodDefault<z.ZodEnum<["discussion", "announcement", "question", "resource"]>>;
            status: z.ZodDefault<z.ZodEnum<["published", "draft", "archived"]>>;
            viewCount: z.ZodDefault<z.ZodNumber>;
            likeCount: z.ZodDefault<z.ZodNumber>;
            commentCount: z.ZodDefault<z.ZodNumber>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "discussion" | "announcement" | "question" | "resource";
            status: "draft" | "published" | "archived";
            id: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            content: string;
            authorId: string;
            viewCount: number;
            likeCount: number;
            commentCount: number;
            communityId: string;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            content: string;
            authorId: string;
            communityId: string;
            type?: "discussion" | "announcement" | "question" | "resource" | undefined;
            status?: "draft" | "published" | "archived" | undefined;
            viewCount?: number | undefined;
            likeCount?: number | undefined;
            commentCount?: number | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            type: "discussion" | "announcement" | "question" | "resource";
            status: "draft" | "published" | "archived";
            id: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            content: string;
            authorId: string;
            viewCount: number;
            likeCount: number;
            commentCount: number;
            communityId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            content: string;
            authorId: string;
            communityId: string;
            type?: "discussion" | "announcement" | "question" | "resource" | undefined;
            status?: "draft" | "published" | "archived" | undefined;
            viewCount?: number | undefined;
            likeCount?: number | undefined;
            commentCount?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            type: "discussion" | "announcement" | "question" | "resource";
            status: "draft" | "published" | "archived";
            id: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            content: string;
            authorId: string;
            viewCount: number;
            likeCount: number;
            commentCount: number;
            communityId: string;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            content: string;
            authorId: string;
            communityId: string;
            type?: "discussion" | "announcement" | "question" | "resource" | undefined;
            status?: "draft" | "published" | "archived" | undefined;
            viewCount?: number | undefined;
            likeCount?: number | undefined;
            commentCount?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const subscriptionPlanResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
        interval: z.ZodEnum<["monthly", "yearly", "lifetime"]>;
        features: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        maxUsers: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        stripeProductId: z.ZodOptional<z.ZodString>;
        stripePriceId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        price: number;
        currency: string;
        interval: "monthly" | "yearly" | "lifetime";
        features: string[];
        description?: string | undefined;
        maxUsers?: number | undefined;
        stripeProductId?: string | undefined;
        stripePriceId?: string | undefined;
    }, {
        name: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        price: number;
        interval: "monthly" | "yearly" | "lifetime";
        description?: string | undefined;
        isActive?: boolean | undefined;
        maxUsers?: number | undefined;
        stripeProductId?: string | undefined;
        currency?: string | undefined;
        features?: string[] | undefined;
        stripePriceId?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        name: string;
        id: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        price: number;
        currency: string;
        interval: "monthly" | "yearly" | "lifetime";
        features: string[];
        description?: string | undefined;
        maxUsers?: number | undefined;
        stripeProductId?: string | undefined;
        stripePriceId?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        name: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        price: number;
        interval: "monthly" | "yearly" | "lifetime";
        description?: string | undefined;
        isActive?: boolean | undefined;
        maxUsers?: number | undefined;
        stripeProductId?: string | undefined;
        currency?: string | undefined;
        features?: string[] | undefined;
        stripePriceId?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const subscriptionPlanListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            price: z.ZodNumber;
            currency: z.ZodDefault<z.ZodString>;
            interval: z.ZodEnum<["monthly", "yearly", "lifetime"]>;
            features: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            maxUsers: z.ZodOptional<z.ZodNumber>;
            isActive: z.ZodDefault<z.ZodBoolean>;
            stripeProductId: z.ZodOptional<z.ZodString>;
            stripePriceId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            price: number;
            currency: string;
            interval: "monthly" | "yearly" | "lifetime";
            features: string[];
            description?: string | undefined;
            maxUsers?: number | undefined;
            stripeProductId?: string | undefined;
            stripePriceId?: string | undefined;
        }, {
            name: string;
            id: string;
            createdAt: string;
            updatedAt: string;
            price: number;
            interval: "monthly" | "yearly" | "lifetime";
            description?: string | undefined;
            isActive?: boolean | undefined;
            maxUsers?: number | undefined;
            stripeProductId?: string | undefined;
            currency?: string | undefined;
            features?: string[] | undefined;
            stripePriceId?: string | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            price: number;
            currency: string;
            interval: "monthly" | "yearly" | "lifetime";
            features: string[];
            description?: string | undefined;
            maxUsers?: number | undefined;
            stripeProductId?: string | undefined;
            stripePriceId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            name: string;
            id: string;
            createdAt: string;
            updatedAt: string;
            price: number;
            interval: "monthly" | "yearly" | "lifetime";
            description?: string | undefined;
            isActive?: boolean | undefined;
            maxUsers?: number | undefined;
            stripeProductId?: string | undefined;
            currency?: string | undefined;
            features?: string[] | undefined;
            stripePriceId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            name: string;
            id: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            price: number;
            currency: string;
            interval: "monthly" | "yearly" | "lifetime";
            features: string[];
            description?: string | undefined;
            maxUsers?: number | undefined;
            stripeProductId?: string | undefined;
            stripePriceId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            name: string;
            id: string;
            createdAt: string;
            updatedAt: string;
            price: number;
            interval: "monthly" | "yearly" | "lifetime";
            description?: string | undefined;
            isActive?: boolean | undefined;
            maxUsers?: number | undefined;
            stripeProductId?: string | undefined;
            currency?: string | undefined;
            features?: string[] | undefined;
            stripePriceId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userSubscriptionResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        planId: z.ZodString;
        status: z.ZodEnum<["active", "cancelled", "past_due", "unpaid", "trialing", "paused"]>;
        currentPeriodStart: z.ZodString;
        currentPeriodEnd: z.ZodString;
        cancelAtPeriodEnd: z.ZodDefault<z.ZodBoolean>;
        cancelledAt: z.ZodOptional<z.ZodString>;
        stripeSubscriptionId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        planId: string;
        currentPeriodStart: string;
        currentPeriodEnd: string;
        cancelAtPeriodEnd: boolean;
        cancelledAt?: string | undefined;
        stripeSubscriptionId?: string | undefined;
    }, {
        status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        planId: string;
        currentPeriodStart: string;
        currentPeriodEnd: string;
        cancelAtPeriodEnd?: boolean | undefined;
        cancelledAt?: string | undefined;
        stripeSubscriptionId?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        planId: string;
        currentPeriodStart: string;
        currentPeriodEnd: string;
        cancelAtPeriodEnd: boolean;
        cancelledAt?: string | undefined;
        stripeSubscriptionId?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        planId: string;
        currentPeriodStart: string;
        currentPeriodEnd: string;
        cancelAtPeriodEnd?: boolean | undefined;
        cancelledAt?: string | undefined;
        stripeSubscriptionId?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const userSubscriptionListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            planId: z.ZodString;
            status: z.ZodEnum<["active", "cancelled", "past_due", "unpaid", "trialing", "paused"]>;
            currentPeriodStart: z.ZodString;
            currentPeriodEnd: z.ZodString;
            cancelAtPeriodEnd: z.ZodDefault<z.ZodBoolean>;
            cancelledAt: z.ZodOptional<z.ZodString>;
            stripeSubscriptionId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            planId: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            cancelAtPeriodEnd: boolean;
            cancelledAt?: string | undefined;
            stripeSubscriptionId?: string | undefined;
        }, {
            status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            planId: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            cancelAtPeriodEnd?: boolean | undefined;
            cancelledAt?: string | undefined;
            stripeSubscriptionId?: string | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            planId: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            cancelAtPeriodEnd: boolean;
            cancelledAt?: string | undefined;
            stripeSubscriptionId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            planId: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            cancelAtPeriodEnd?: boolean | undefined;
            cancelledAt?: string | undefined;
            stripeSubscriptionId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            planId: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            cancelAtPeriodEnd: boolean;
            cancelledAt?: string | undefined;
            stripeSubscriptionId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused";
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            planId: string;
            currentPeriodStart: string;
            currentPeriodEnd: string;
            cancelAtPeriodEnd?: boolean | undefined;
            cancelledAt?: string | undefined;
            stripeSubscriptionId?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userAnalyticsEventResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        eventType: z.ZodString;
        eventName: z.ZodString;
        properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        sessionId: z.ZodOptional<z.ZodString>;
        pageUrl: z.ZodOptional<z.ZodString>;
        referrer: z.ZodOptional<z.ZodString>;
        userAgent: z.ZodOptional<z.ZodString>;
        ipAddress: z.ZodOptional<z.ZodString>;
        timestamp: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        eventType: string;
        eventName: string;
        properties?: Record<string, unknown> | undefined;
        sessionId?: string | undefined;
        pageUrl?: string | undefined;
        referrer?: string | undefined;
        userAgent?: string | undefined;
        ipAddress?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        eventType: string;
        eventName: string;
        properties?: Record<string, unknown> | undefined;
        sessionId?: string | undefined;
        pageUrl?: string | undefined;
        referrer?: string | undefined;
        userAgent?: string | undefined;
        ipAddress?: string | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        eventType: string;
        eventName: string;
        properties?: Record<string, unknown> | undefined;
        sessionId?: string | undefined;
        pageUrl?: string | undefined;
        referrer?: string | undefined;
        userAgent?: string | undefined;
        ipAddress?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        eventType: string;
        eventName: string;
        properties?: Record<string, unknown> | undefined;
        sessionId?: string | undefined;
        pageUrl?: string | undefined;
        referrer?: string | undefined;
        userAgent?: string | undefined;
        ipAddress?: string | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const userAnalyticsEventListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            eventType: z.ZodString;
            eventName: z.ZodString;
            properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            sessionId: z.ZodOptional<z.ZodString>;
            pageUrl: z.ZodOptional<z.ZodString>;
            referrer: z.ZodOptional<z.ZodString>;
            userAgent: z.ZodOptional<z.ZodString>;
            ipAddress: z.ZodOptional<z.ZodString>;
            timestamp: z.ZodString;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            eventType: string;
            eventName: string;
            properties?: Record<string, unknown> | undefined;
            sessionId?: string | undefined;
            pageUrl?: string | undefined;
            referrer?: string | undefined;
            userAgent?: string | undefined;
            ipAddress?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            eventType: string;
            eventName: string;
            properties?: Record<string, unknown> | undefined;
            sessionId?: string | undefined;
            pageUrl?: string | undefined;
            referrer?: string | undefined;
            userAgent?: string | undefined;
            ipAddress?: string | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            eventType: string;
            eventName: string;
            properties?: Record<string, unknown> | undefined;
            sessionId?: string | undefined;
            pageUrl?: string | undefined;
            referrer?: string | undefined;
            userAgent?: string | undefined;
            ipAddress?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            eventType: string;
            eventName: string;
            properties?: Record<string, unknown> | undefined;
            sessionId?: string | undefined;
            pageUrl?: string | undefined;
            referrer?: string | undefined;
            userAgent?: string | undefined;
            ipAddress?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            eventType: string;
            eventName: string;
            properties?: Record<string, unknown> | undefined;
            sessionId?: string | undefined;
            pageUrl?: string | undefined;
            referrer?: string | undefined;
            userAgent?: string | undefined;
            ipAddress?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            eventType: string;
            eventName: string;
            properties?: Record<string, unknown> | undefined;
            sessionId?: string | undefined;
            pageUrl?: string | undefined;
            referrer?: string | undefined;
            userAgent?: string | undefined;
            ipAddress?: string | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export declare const userContentInteractionResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        contentId: z.ZodString;
        interactionType: z.ZodEnum<["view", "like", "share", "bookmark", "comment", "download"]>;
        duration: z.ZodOptional<z.ZodNumber>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        timestamp: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        contentId: string;
        interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
        metadata?: Record<string, unknown> | undefined;
        duration?: number | undefined;
    }, {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        contentId: string;
        interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
        metadata?: Record<string, unknown> | undefined;
        duration?: number | undefined;
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        contentId: string;
        interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
        metadata?: Record<string, unknown> | undefined;
        duration?: number | undefined;
    };
    success: boolean;
    message?: string | undefined;
}, {
    data: {
        id: string;
        createdAt: string;
        timestamp: string;
        userId: string;
        contentId: string;
        interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
        metadata?: Record<string, unknown> | undefined;
        duration?: number | undefined;
    };
    success: boolean;
    message?: string | undefined;
}>;
export declare const userContentInteractionListResponseSchema: z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            contentId: z.ZodString;
            interactionType: z.ZodEnum<["view", "like", "share", "bookmark", "comment", "download"]>;
            duration: z.ZodOptional<z.ZodNumber>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            timestamp: z.ZodString;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            contentId: string;
            interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
            metadata?: Record<string, unknown> | undefined;
            duration?: number | undefined;
        }, {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            contentId: string;
            interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
            metadata?: Record<string, unknown> | undefined;
            duration?: number | undefined;
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
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            contentId: string;
            interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
            metadata?: Record<string, unknown> | undefined;
            duration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            contentId: string;
            interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
            metadata?: Record<string, unknown> | undefined;
            duration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            contentId: string;
            interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
            metadata?: Record<string, unknown> | undefined;
            duration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}, {
    success: boolean;
    items: {
        data: {
            id: string;
            createdAt: string;
            timestamp: string;
            userId: string;
            contentId: string;
            interactionType: "view" | "like" | "share" | "bookmark" | "comment" | "download";
            metadata?: Record<string, unknown> | undefined;
            duration?: number | undefined;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
}>;
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<z.ZodType<T>>>>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>>;
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
export type UserProfileListResponse = z.infer<typeof userProfileListResponseSchema>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationListResponse = z.infer<typeof organizationListResponseSchema>;
export type OrganizationMembershipResponse = z.infer<typeof organizationMembershipResponseSchema>;
export type OrganizationMembershipListResponse = z.infer<typeof organizationMembershipListResponseSchema>;
export type AssessmentApiResponse = z.infer<typeof assessmentApiResponseSchema>;
export type AssessmentListResponse = z.infer<typeof assessmentListResponseSchema>;
export type AssessmentQuestionResponse = z.infer<typeof assessmentQuestionResponseSchema>;
export type AssessmentQuestionListResponse = z.infer<typeof assessmentQuestionListResponseSchema>;
export type UserAssessmentResponse = z.infer<typeof userAssessmentResponseSchema>;
export type UserAssessmentListResponse = z.infer<typeof userAssessmentListResponseSchema>;
export type AssessmentResponseResponse = z.infer<typeof assessmentResponseResponseSchema>;
export type AssessmentResponseListResponse = z.infer<typeof assessmentResponseListResponseSchema>;
export type ContentCategoryResponse = z.infer<typeof contentCategoryResponseSchema>;
export type ContentCategoryListResponse = z.infer<typeof contentCategoryListResponseSchema>;
export type ContentSeriesResponse = z.infer<typeof contentSeriesResponseSchema>;
export type ContentSeriesListResponse = z.infer<typeof contentSeriesListResponseSchema>;
export type ContentItemResponse = z.infer<typeof contentItemResponseSchema>;
export type ContentItemListResponse = z.infer<typeof contentItemListResponseSchema>;
export type CommunityResponse = z.infer<typeof communityResponseSchema>;
export type CommunityListResponse = z.infer<typeof communityListResponseSchema>;
export type CommunityMembershipResponse = z.infer<typeof communityMembershipResponseSchema>;
export type CommunityMembershipListResponse = z.infer<typeof communityMembershipListResponseSchema>;
export type CommunityPostResponse = z.infer<typeof communityPostResponseSchema>;
export type CommunityPostListResponse = z.infer<typeof communityPostListResponseSchema>;
export type SubscriptionPlanResponse = z.infer<typeof subscriptionPlanResponseSchema>;
export type SubscriptionPlanListResponse = z.infer<typeof subscriptionPlanListResponseSchema>;
export type UserSubscriptionResponse = z.infer<typeof userSubscriptionResponseSchema>;
export type UserSubscriptionListResponse = z.infer<typeof userSubscriptionListResponseSchema>;
export type UserAnalyticsEventResponse = z.infer<typeof userAnalyticsEventResponseSchema>;
export type UserAnalyticsEventListResponse = z.infer<typeof userAnalyticsEventListResponseSchema>;
export type UserContentInteractionResponse = z.infer<typeof userContentInteractionResponseSchema>;
export type UserContentInteractionListResponse = z.infer<typeof userContentInteractionListResponseSchema>;
//# sourceMappingURL=api-responses.d.ts.map