import { z } from 'zod';
/**
 * Standard API Response Schema
 * Common response wrapper for all API endpoints
 */
export declare const ApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodUnknown>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: unknown;
    }, {
        code: string;
        message: string;
        details?: unknown;
    }>>;
    meta: z.ZodOptional<z.ZodObject<{
        pagination: z.ZodOptional<z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        }>>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        } | undefined;
    }, {
        timestamp: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data?: unknown;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    } | undefined;
    meta?: {
        timestamp: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        } | undefined;
    } | undefined;
}, {
    success: boolean;
    data?: unknown;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    } | undefined;
    meta?: {
        timestamp: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
        } | undefined;
    } | undefined;
}>;
/**
 * Paginated Response Schema
 * For endpoints that return paginated data
 */
export declare const PaginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<T, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: T["_output"][];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: T["_input"][];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Create User API Request Contract
 * Derived from CreateUserOperationSchema
 */
export declare const CreateUserApiRequestSchema: z.ZodObject<{
    passwordHash: z.ZodOptional<z.ZodString>;
    displayName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
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
    firstName: z.ZodString;
    lastName: z.ZodString;
    ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
} & {
    email: z.ZodEffects<z.ZodString, string, string>;
    first_name: z.ZodEffects<z.ZodString, string, string>;
    last_name: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
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
    first_name: string;
    last_name: string;
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
    leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    customDomain?: string | undefined;
    platformTitle?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    first_name: string;
    last_name: string;
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
/**
 * Create User with Organization API Request Contract
 * Derived from CreateUserWithOrganizationOperationSchema
 */
export declare const CreateUserWithOrganizationApiRequestSchema: z.ZodObject<{
    passwordHash: z.ZodOptional<z.ZodString>;
    displayName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
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
    firstName: z.ZodString;
    lastName: z.ZodString;
    ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
} & {
    email: z.ZodEffects<z.ZodString, string, string>;
    first_name: z.ZodEffects<z.ZodString, string, string>;
    last_name: z.ZodEffects<z.ZodString, string, string>;
} & {
    organization: z.ZodObject<{
        name: z.ZodString;
        organization_type: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
        role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        organization_type: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "ministry" | "business";
        role: "owner" | "admin" | "member" | "viewer";
    }, {
        name: string;
        organization_type: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "ministry" | "business";
        role?: "owner" | "admin" | "member" | "viewer" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
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
    organization: {
        name: string;
        organization_type: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "ministry" | "business";
        role: "owner" | "admin" | "member" | "viewer";
    };
    first_name: string;
    last_name: string;
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
    leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    customDomain?: string | undefined;
    platformTitle?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    organization: {
        name: string;
        organization_type: "other" | "denomination" | "church" | "seminary" | "nonprofit" | "ministry" | "business";
        role?: "owner" | "admin" | "member" | "viewer" | undefined;
    };
    first_name: string;
    last_name: string;
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
/**
 * User Login API Request Contract
 * Derived from UserLoginOperationSchema
 */
export declare const UserLoginApiRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    remember_me: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    remember_me: boolean;
}, {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
}>;
/**
 * User Registration API Request Contract
 * Derived from UserRegistrationOperationSchema
 */
export declare const UserRegistrationApiRequestSchema: z.ZodEffects<z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    denomination: z.ZodOptional<z.ZodString>;
    organizationName: z.ZodOptional<z.ZodString>;
    yearsInMinistry: z.ZodOptional<z.ZodNumber>;
    countryCode: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
    platformTitle: z.ZodOptional<z.ZodString>;
    languagePrimary: z.ZodDefault<z.ZodString>;
    privacySettings: z.ZodObject<{
        publicProfile: z.ZodDefault<z.ZodBoolean>;
        shareAnalytics: z.ZodDefault<z.ZodBoolean>;
        allowNetworking: z.ZodDefault<z.ZodBoolean>;
        showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
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
    }>;
    emailNotifications: z.ZodObject<{
        dailyDigest: z.ZodDefault<z.ZodBoolean>;
        revenueReports: z.ZodDefault<z.ZodBoolean>;
        communityUpdates: z.ZodDefault<z.ZodBoolean>;
        collaborationRequests: z.ZodDefault<z.ZodBoolean>;
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
    }>;
} & {
    password: z.ZodString;
    confirm_password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    languagePrimary: string;
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
    password: string;
    confirm_password: string;
    displayName?: string | undefined;
    bio?: string | undefined;
    denomination?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    platformTitle?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    emailNotifications: {
        dailyDigest?: boolean | undefined;
        collaborationRequests?: boolean | undefined;
        revenueReports?: boolean | undefined;
        communityUpdates?: boolean | undefined;
    };
    privacySettings: {
        publicProfile?: boolean | undefined;
        showAssessmentResults?: boolean | undefined;
        allowNetworking?: boolean | undefined;
        shareAnalytics?: boolean | undefined;
    };
    password: string;
    confirm_password: string;
    displayName?: string | undefined;
    bio?: string | undefined;
    denomination?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    languagePrimary?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    platformTitle?: string | undefined;
}>, {
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    languagePrimary: string;
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
    password: string;
    confirm_password: string;
    displayName?: string | undefined;
    bio?: string | undefined;
    denomination?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    platformTitle?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    emailNotifications: {
        dailyDigest?: boolean | undefined;
        collaborationRequests?: boolean | undefined;
        revenueReports?: boolean | undefined;
        communityUpdates?: boolean | undefined;
    };
    privacySettings: {
        publicProfile?: boolean | undefined;
        showAssessmentResults?: boolean | undefined;
        allowNetworking?: boolean | undefined;
        shareAnalytics?: boolean | undefined;
    };
    password: string;
    confirm_password: string;
    displayName?: string | undefined;
    bio?: string | undefined;
    denomination?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    languagePrimary?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    platformTitle?: string | undefined;
}>;
/**
 * User Password Reset API Request Contract
 * Derived from UserPasswordResetOperationSchema
 */
export declare const UserPasswordResetApiRequestSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
/**
 * User Password Update API Request Contract
 * Derived from UserPasswordUpdateOperationSchema
 */
export declare const UserPasswordUpdateApiRequestSchema: z.ZodEffects<z.ZodObject<{
    current_password: z.ZodString;
    new_password: z.ZodString;
    confirm_new_password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}, {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}>, {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}, {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}>;
/**
 * Update User Profile API Request Contract
 * Derived from UpdateUserProfileOperationSchema
 */
export declare const UpdateUserProfileApiRequestSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    lastName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    displayName: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    ministryRole: z.ZodOptional<z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>>;
    denomination: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    organizationName: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    yearsInMinistry: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    countryCode: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    languagePrimary: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodString>>>;
    culturalContext: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>>>;
    platformTitle: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    theologicalFocus: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>>;
    brandColors: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>>;
    privacySettings: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>>;
}, "strip", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    avatarUrl?: string | undefined;
    ministryRole?: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other" | undefined;
    denomination?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    languagePrimary?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    platformTitle?: string | undefined;
    theologicalFocus?: string[] | undefined;
    brandColors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    privacySettings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    avatarUrl?: string | undefined;
    ministryRole?: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other" | undefined;
    denomination?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    languagePrimary?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    platformTitle?: string | undefined;
    theologicalFocus?: string[] | undefined;
    brandColors?: {
        primary?: string | undefined;
        secondary?: string | undefined;
        accent?: string | undefined;
    } | undefined;
    privacySettings?: {
        publicProfile?: boolean | undefined;
        showAssessmentResults?: boolean | undefined;
        allowNetworking?: boolean | undefined;
        shareAnalytics?: boolean | undefined;
    } | undefined;
}>;
/**
 * Update User Settings API Request Contract
 * Derived from UpdateUserSettingsOperationSchema
 */
export declare const UpdateUserSettingsApiRequestSchema: z.ZodObject<{
    brandColors: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>>;
    emailNotifications: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>>;
    privacySettings: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>>;
}, "strip", z.ZodTypeAny, {
    brandColors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    emailNotifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacySettings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
}, {
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
}>;
/**
 * Update User Assessment Scores API Request Contract
 * Derived from UpdateUserAssessmentScoresOperationSchema
 */
export declare const UpdateUserAssessmentScoresApiRequestSchema: z.ZodObject<{
    assessmentMovementAlignment: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessmentAudienceEngagement: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessmentContentReadiness: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessmentRevenuePotential: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessmentNetworkEffects: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessmentStrategicFit: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    leaderTier: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>>>;
}, "strip", z.ZodTypeAny, {
    assessmentMovementAlignment?: number | undefined;
    assessmentAudienceEngagement?: number | undefined;
    assessmentContentReadiness?: number | undefined;
    assessmentRevenuePotential?: number | undefined;
    assessmentNetworkEffects?: number | undefined;
    assessmentStrategicFit?: number | undefined;
    leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
}, {
    assessmentMovementAlignment?: number | undefined;
    assessmentAudienceEngagement?: number | undefined;
    assessmentContentReadiness?: number | undefined;
    assessmentRevenuePotential?: number | undefined;
    assessmentNetworkEffects?: number | undefined;
    assessmentStrategicFit?: number | undefined;
    leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
}>;
/**
 * Delete User API Request Contract
 * Derived from DeleteUserOperationSchema
 */
export declare const DeleteUserApiRequestSchema: z.ZodObject<{
    id: z.ZodString;
    confirmation: z.ZodEffects<z.ZodString, "DELETE", string>;
    transfer_ownership: z.ZodOptional<z.ZodObject<{
        organization_id: z.ZodString;
        new_owner_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        organization_id: string;
        new_owner_id: string;
    }, {
        organization_id: string;
        new_owner_id: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    confirmation: "DELETE";
    transfer_ownership?: {
        organization_id: string;
        new_owner_id: string;
    } | undefined;
}, {
    id: string;
    confirmation: string;
    transfer_ownership?: {
        organization_id: string;
        new_owner_id: string;
    } | undefined;
}>;
/**
 * Deactivate User API Request Contract
 * Derived from DeactivateUserOperationSchema
 */
export declare const DeactivateUserApiRequestSchema: z.ZodObject<{
    id: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    reason?: string | undefined;
}, {
    id: string;
    reason?: string | undefined;
}>;
/**
 * Search Users API Request Contract
 * Derived from SearchUsersOperationSchema
 */
export declare const SearchUsersApiRequestSchema: z.ZodObject<{
    query: z.ZodString;
    ministry_role: z.ZodOptional<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
    country_code: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cultural_context: z.ZodOptional<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>, "many">>;
    leader_tier: z.ZodOptional<z.ZodArray<z.ZodEnum<["core", "network", "emerging", "community"]>, "many">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["relevance", "created_at", "last_active_at"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    query: string;
    sort_by: "relevance" | "created_at" | "last_active_at";
    sort_order: "asc" | "desc";
    ministry_role?: ("senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other")[] | undefined;
    country_code?: string[] | undefined;
    cultural_context?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal")[] | undefined;
    leader_tier?: ("core" | "network" | "emerging" | "community")[] | undefined;
}, {
    query: string;
    page?: number | undefined;
    limit?: number | undefined;
    ministry_role?: ("senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other")[] | undefined;
    country_code?: string[] | undefined;
    cultural_context?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal")[] | undefined;
    leader_tier?: ("core" | "network" | "emerging" | "community")[] | undefined;
    sort_by?: "relevance" | "created_at" | "last_active_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
}>;
/**
 * User API Response Contract
 * Derived from UserEntitySchema for internal API responses
 */
export declare const UserApiResponseSchema: z.ZodObject<{
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
/**
 * Public User API Response Contract
 * Derived from PublicUserSchema for public API responses
 */
export declare const PublicUserApiResponseSchema: z.ZodObject<{
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
} & {
    isActive: z.ZodBoolean;
    hasCompletedOnboarding: z.ZodBoolean;
    fullName: z.ZodString;
    displayNameOrFullName: z.ZodString;
    hasCustomDomain: z.ZodBoolean;
    hasSubdomain: z.ZodBoolean;
    isPublicProfile: z.ZodBoolean;
    canReceiveNotifications: z.ZodBoolean;
    assessmentCompleted: z.ZodBoolean;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    ministryExperience: z.ZodOptional<z.ZodString>;
    locationDisplay: z.ZodOptional<z.ZodString>;
    organization: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: string;
        name: string;
        slug: string;
    }, {
        id: string;
        type: string;
        name: string;
        slug: string;
    }>>;
    subscription: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        planName: z.ZodString;
        status: z.ZodString;
        tier: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;
        planName: string;
        tier: string;
    }, {
        id: string;
        status: string;
        planName: string;
        tier: string;
    }>>;
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
    isActive: boolean;
    hasCompletedOnboarding: boolean;
    fullName: string;
    displayNameOrFullName: string;
    hasCustomDomain: boolean;
    hasSubdomain: boolean;
    isPublicProfile: boolean;
    canReceiveNotifications: boolean;
    assessmentCompleted: boolean;
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
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    ministryExperience?: string | undefined;
    locationDisplay?: string | undefined;
    organization?: {
        id: string;
        type: string;
        name: string;
        slug: string;
    } | undefined;
    subscription?: {
        id: string;
        status: string;
        planName: string;
        tier: string;
    } | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    createdAt: string;
    updatedAt: string;
    lastActiveAt: string;
    isActive: boolean;
    hasCompletedOnboarding: boolean;
    fullName: string;
    displayNameOrFullName: string;
    hasCustomDomain: boolean;
    hasSubdomain: boolean;
    isPublicProfile: boolean;
    canReceiveNotifications: boolean;
    assessmentCompleted: boolean;
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
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    ministryExperience?: string | undefined;
    locationDisplay?: string | undefined;
    organization?: {
        id: string;
        type: string;
        name: string;
        slug: string;
    } | undefined;
    subscription?: {
        id: string;
        status: string;
        planName: string;
        tier: string;
    } | undefined;
}>;
/**
 * User with Organizations API Response Contract
 * Extends user with organization information
 */
export declare const UserWithOrganizationsApiResponseSchema: z.ZodObject<{
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
} & {
    organizations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
        status: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
        joined_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }, {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }>, "many">>;
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
    organizations: {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }[];
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
    organizations?: {
        id: string;
        status: "active" | "inactive" | "suspended" | "pending";
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }[] | undefined;
}>;
/**
 * User with Assessments API Response Contract
 * Extends user with assessment information
 */
export declare const UserWithAssessmentsApiResponseSchema: z.ZodObject<{
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
} & {
    assessments: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        assessment_id: z.ZodString;
        assessment_name: z.ZodString;
        started_at: z.ZodString;
        completed_at: z.ZodOptional<z.ZodString>;
        completion_percentage: z.ZodNumber;
        total_score: z.ZodOptional<z.ZodNumber>;
        primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        assessment_id: string;
        assessment_name: string;
        started_at: string;
        completion_percentage: number;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }, {
        id: string;
        assessment_id: string;
        assessment_name: string;
        started_at: string;
        completion_percentage: number;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }>, "many">>;
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
    assessments: {
        id: string;
        assessment_id: string;
        assessment_name: string;
        started_at: string;
        completion_percentage: number;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }[];
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
    assessments?: {
        id: string;
        assessment_id: string;
        assessment_name: string;
        started_at: string;
        completion_percentage: number;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }[] | undefined;
}>;
/**
 * User List API Response Contract
 * Paginated list of users
 */
export declare const UserListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
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
    } & {
        isActive: z.ZodBoolean;
        hasCompletedOnboarding: z.ZodBoolean;
        fullName: z.ZodString;
        displayNameOrFullName: z.ZodString;
        hasCustomDomain: z.ZodBoolean;
        hasSubdomain: z.ZodBoolean;
        isPublicProfile: z.ZodBoolean;
        canReceiveNotifications: z.ZodBoolean;
        assessmentCompleted: z.ZodBoolean;
        primaryGift: z.ZodOptional<z.ZodString>;
        secondaryGift: z.ZodOptional<z.ZodString>;
        ministryExperience: z.ZodOptional<z.ZodString>;
        locationDisplay: z.ZodOptional<z.ZodString>;
        organization: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: string;
            name: string;
            slug: string;
        }, {
            id: string;
            type: string;
            name: string;
            slug: string;
        }>>;
        subscription: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            planName: z.ZodString;
            status: z.ZodString;
            tier: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: string;
            planName: string;
            tier: string;
        }, {
            id: string;
            status: string;
            planName: string;
            tier: string;
        }>>;
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
        isActive: boolean;
        hasCompletedOnboarding: boolean;
        fullName: string;
        displayNameOrFullName: string;
        hasCustomDomain: boolean;
        hasSubdomain: boolean;
        isPublicProfile: boolean;
        canReceiveNotifications: boolean;
        assessmentCompleted: boolean;
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
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        ministryExperience?: string | undefined;
        locationDisplay?: string | undefined;
        organization?: {
            id: string;
            type: string;
            name: string;
            slug: string;
        } | undefined;
        subscription?: {
            id: string;
            status: string;
            planName: string;
            tier: string;
        } | undefined;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        isActive: boolean;
        hasCompletedOnboarding: boolean;
        fullName: string;
        displayNameOrFullName: string;
        hasCustomDomain: boolean;
        hasSubdomain: boolean;
        isPublicProfile: boolean;
        canReceiveNotifications: boolean;
        assessmentCompleted: boolean;
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
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        ministryExperience?: string | undefined;
        locationDisplay?: string | undefined;
        organization?: {
            id: string;
            type: string;
            name: string;
            slug: string;
        } | undefined;
        subscription?: {
            id: string;
            status: string;
            planName: string;
            tier: string;
        } | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
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
        isActive: boolean;
        hasCompletedOnboarding: boolean;
        fullName: string;
        displayNameOrFullName: string;
        hasCustomDomain: boolean;
        hasSubdomain: boolean;
        isPublicProfile: boolean;
        canReceiveNotifications: boolean;
        assessmentCompleted: boolean;
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
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        ministryExperience?: string | undefined;
        locationDisplay?: string | undefined;
        organization?: {
            id: string;
            type: string;
            name: string;
            slug: string;
        } | undefined;
        subscription?: {
            id: string;
            status: string;
            planName: string;
            tier: string;
        } | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        isActive: boolean;
        hasCompletedOnboarding: boolean;
        fullName: string;
        displayNameOrFullName: string;
        hasCustomDomain: boolean;
        hasSubdomain: boolean;
        isPublicProfile: boolean;
        canReceiveNotifications: boolean;
        assessmentCompleted: boolean;
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
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        ministryExperience?: string | undefined;
        locationDisplay?: string | undefined;
        organization?: {
            id: string;
            type: string;
            name: string;
            slug: string;
        } | undefined;
        subscription?: {
            id: string;
            status: string;
            planName: string;
            tier: string;
        } | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * User Search API Response Contract
 * Search results for users
 */
export declare const UserSearchApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        users: z.ZodArray<z.ZodObject<{
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
        } & {
            isActive: z.ZodBoolean;
            hasCompletedOnboarding: z.ZodBoolean;
            fullName: z.ZodString;
            displayNameOrFullName: z.ZodString;
            hasCustomDomain: z.ZodBoolean;
            hasSubdomain: z.ZodBoolean;
            isPublicProfile: z.ZodBoolean;
            canReceiveNotifications: z.ZodBoolean;
            assessmentCompleted: z.ZodBoolean;
            primaryGift: z.ZodOptional<z.ZodString>;
            secondaryGift: z.ZodOptional<z.ZodString>;
            ministryExperience: z.ZodOptional<z.ZodString>;
            locationDisplay: z.ZodOptional<z.ZodString>;
            organization: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                type: string;
                name: string;
                slug: string;
            }, {
                id: string;
                type: string;
                name: string;
                slug: string;
            }>>;
            subscription: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                planName: z.ZodString;
                status: z.ZodString;
                tier: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                status: string;
                planName: string;
                tier: string;
            }, {
                id: string;
                status: string;
                planName: string;
                tier: string;
            }>>;
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
            isActive: boolean;
            hasCompletedOnboarding: boolean;
            fullName: string;
            displayNameOrFullName: string;
            hasCustomDomain: boolean;
            hasSubdomain: boolean;
            isPublicProfile: boolean;
            canReceiveNotifications: boolean;
            assessmentCompleted: boolean;
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
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            ministryExperience?: string | undefined;
            locationDisplay?: string | undefined;
            organization?: {
                id: string;
                type: string;
                name: string;
                slug: string;
            } | undefined;
            subscription?: {
                id: string;
                status: string;
                planName: string;
                tier: string;
            } | undefined;
        }, {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            isActive: boolean;
            hasCompletedOnboarding: boolean;
            fullName: string;
            displayNameOrFullName: string;
            hasCustomDomain: boolean;
            hasSubdomain: boolean;
            isPublicProfile: boolean;
            canReceiveNotifications: boolean;
            assessmentCompleted: boolean;
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
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            ministryExperience?: string | undefined;
            locationDisplay?: string | undefined;
            organization?: {
                id: string;
                type: string;
                name: string;
                slug: string;
            } | undefined;
            subscription?: {
                id: string;
                status: string;
                planName: string;
                tier: string;
            } | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: number;
        query: string;
        users: {
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
            isActive: boolean;
            hasCompletedOnboarding: boolean;
            fullName: string;
            displayNameOrFullName: string;
            hasCustomDomain: boolean;
            hasSubdomain: boolean;
            isPublicProfile: boolean;
            canReceiveNotifications: boolean;
            assessmentCompleted: boolean;
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
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            ministryExperience?: string | undefined;
            locationDisplay?: string | undefined;
            organization?: {
                id: string;
                type: string;
                name: string;
                slug: string;
            } | undefined;
            subscription?: {
                id: string;
                status: string;
                planName: string;
                tier: string;
            } | undefined;
        }[];
        took: number;
    }, {
        total: number;
        query: string;
        users: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            isActive: boolean;
            hasCompletedOnboarding: boolean;
            fullName: string;
            displayNameOrFullName: string;
            hasCustomDomain: boolean;
            hasSubdomain: boolean;
            isPublicProfile: boolean;
            canReceiveNotifications: boolean;
            assessmentCompleted: boolean;
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
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            ministryExperience?: string | undefined;
            locationDisplay?: string | undefined;
            organization?: {
                id: string;
                type: string;
                name: string;
                slug: string;
            } | undefined;
            subscription?: {
                id: string;
                status: string;
                planName: string;
                tier: string;
            } | undefined;
        }[];
        took: number;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        total: number;
        query: string;
        users: {
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
            isActive: boolean;
            hasCompletedOnboarding: boolean;
            fullName: string;
            displayNameOrFullName: string;
            hasCustomDomain: boolean;
            hasSubdomain: boolean;
            isPublicProfile: boolean;
            canReceiveNotifications: boolean;
            assessmentCompleted: boolean;
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
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            ministryExperience?: string | undefined;
            locationDisplay?: string | undefined;
            organization?: {
                id: string;
                type: string;
                name: string;
                slug: string;
            } | undefined;
            subscription?: {
                id: string;
                status: string;
                planName: string;
                tier: string;
            } | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        total: number;
        query: string;
        users: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            createdAt: string;
            updatedAt: string;
            lastActiveAt: string;
            isActive: boolean;
            hasCompletedOnboarding: boolean;
            fullName: string;
            displayNameOrFullName: string;
            hasCustomDomain: boolean;
            hasSubdomain: boolean;
            isPublicProfile: boolean;
            canReceiveNotifications: boolean;
            assessmentCompleted: boolean;
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
            primaryGift?: string | undefined;
            secondaryGift?: string | undefined;
            ministryExperience?: string | undefined;
            locationDisplay?: string | undefined;
            organization?: {
                id: string;
                type: string;
                name: string;
                slug: string;
            } | undefined;
            subscription?: {
                id: string;
                status: string;
                planName: string;
                tier: string;
            } | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * User Authentication API Response Contract
 * Response for authentication endpoints
 */
export declare const UserAuthApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
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
        token: z.ZodString;
        expires_at: z.ZodString;
        refresh_token: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        user: {
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
        token: string;
        expires_at: string;
        refresh_token?: string | undefined;
    }, {
        user: {
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
        token: string;
        expires_at: string;
        refresh_token?: string | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        user: {
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
        token: string;
        expires_at: string;
        refresh_token?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        user: {
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
        token: string;
        expires_at: string;
        refresh_token?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * User Profile Update API Response Contract
 * Response for profile update endpoints
 */
export declare const UserProfileUpdateApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
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
        updated_fields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        user: {
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
        updated_fields: string[];
    }, {
        user: {
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
        updated_fields: string[];
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        user: {
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
        updated_fields: string[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        user: {
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
        updated_fields: string[];
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * User Settings Update API Response Contract
 * Response for settings update endpoints
 */
export declare const UserSettingsUpdateApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
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
        updated_settings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        user: {
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
        updated_settings: string[];
    }, {
        user: {
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
        updated_settings: string[];
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        user: {
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
        updated_settings: string[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        user: {
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
        updated_settings: string[];
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * User Assessment Scores Update API Response Contract
 * Response for assessment scores update endpoints
 */
export declare const UserAssessmentScoresUpdateApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
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
        updated_scores: z.ZodArray<z.ZodString, "many">;
        leader_tier_updated: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        user: {
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
        updated_scores: string[];
        leader_tier_updated: boolean;
    }, {
        user: {
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
        updated_scores: string[];
        leader_tier_updated: boolean;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        user: {
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
        updated_scores: string[];
        leader_tier_updated: boolean;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        user: {
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
        updated_scores: string[];
        leader_tier_updated: boolean;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Get User by ID API Query Contract
 * Derived from GetUserByIdOperationSchema
 */
export declare const GetUserByIdApiQuerySchema: z.ZodObject<{
    id: z.ZodString;
    include_organizations: z.ZodDefault<z.ZodBoolean>;
    include_assessments: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    include_organizations: boolean;
    include_assessments: boolean;
}, {
    id: string;
    include_organizations?: boolean | undefined;
    include_assessments?: boolean | undefined;
}>;
/**
 * Get User by Email API Query Contract
 * Derived from GetUserByEmailOperationSchema
 */
export declare const GetUserByEmailApiQuerySchema: z.ZodObject<{
    email: z.ZodString;
    include_organizations: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    include_organizations: boolean;
}, {
    email: string;
    include_organizations?: boolean | undefined;
}>;
/**
 * List Users API Query Contract
 * Derived from ListUsersOperationSchema
 */
export declare const ListUsersApiQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    ministryRole: z.ZodOptional<z.ZodString>;
    denomination: z.ZodOptional<z.ZodString>;
    countryCode: z.ZodOptional<z.ZodString>;
    culturalContext: z.ZodOptional<z.ZodString>;
    accountStatus: z.ZodOptional<z.ZodString>;
    subscriptionTier: z.ZodOptional<z.ZodString>;
    leaderTier: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "lastActiveAt", "firstName", "lastName", "email", "ministryRole", "assessmentTotal"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    organizationId: z.ZodOptional<z.ZodString>;
    includeOrganization: z.ZodDefault<z.ZodBoolean>;
    includeSubscription: z.ZodDefault<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "last_active_at", "first_name", "last_name"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_organizations: z.ZodDefault<z.ZodBoolean>;
    include_assessments: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "email" | "firstName" | "lastName" | "ministryRole" | "assessmentTotal" | "createdAt" | "updatedAt" | "lastActiveAt";
    sortOrder: "asc" | "desc";
    includeOrganization: boolean;
    includeSubscription: boolean;
    sort_by: "first_name" | "last_name" | "created_at" | "last_active_at" | "updated_at";
    sort_order: "asc" | "desc";
    include_organizations: boolean;
    include_assessments: boolean;
    offset: number;
    ministryRole?: string | undefined;
    denomination?: string | undefined;
    countryCode?: string | undefined;
    culturalContext?: string | undefined;
    leaderTier?: string | undefined;
    subscriptionTier?: string | undefined;
    accountStatus?: string | undefined;
    search?: string | undefined;
    organizationId?: string | undefined;
}, {
    ministryRole?: string | undefined;
    denomination?: string | undefined;
    countryCode?: string | undefined;
    culturalContext?: string | undefined;
    leaderTier?: string | undefined;
    subscriptionTier?: string | undefined;
    accountStatus?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "email" | "firstName" | "lastName" | "ministryRole" | "assessmentTotal" | "createdAt" | "updatedAt" | "lastActiveAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    organizationId?: string | undefined;
    includeOrganization?: boolean | undefined;
    includeSubscription?: boolean | undefined;
    sort_by?: "first_name" | "last_name" | "created_at" | "last_active_at" | "updated_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_organizations?: boolean | undefined;
    include_assessments?: boolean | undefined;
    offset?: number | undefined;
}>;
export type ApiResponse<T = unknown> = z.infer<typeof ApiResponseSchema> & {
    data?: T;
};
export type PaginatedResponse<T> = {
    success: boolean;
    data: T[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
};
export type CreateUserApiRequest = z.infer<typeof CreateUserApiRequestSchema>;
export type CreateUserWithOrganizationApiRequest = z.infer<typeof CreateUserWithOrganizationApiRequestSchema>;
export type UserLoginApiRequest = z.infer<typeof UserLoginApiRequestSchema>;
export type UserRegistrationApiRequest = z.infer<typeof UserRegistrationApiRequestSchema>;
export type UserPasswordResetApiRequest = z.infer<typeof UserPasswordResetApiRequestSchema>;
export type UserPasswordUpdateApiRequest = z.infer<typeof UserPasswordUpdateApiRequestSchema>;
export type UpdateUserProfileApiRequest = z.infer<typeof UpdateUserProfileApiRequestSchema>;
export type UpdateUserSettingsApiRequest = z.infer<typeof UpdateUserSettingsApiRequestSchema>;
export type UpdateUserAssessmentScoresApiRequest = z.infer<typeof UpdateUserAssessmentScoresApiRequestSchema>;
export type DeleteUserApiRequest = z.infer<typeof DeleteUserApiRequestSchema>;
export type DeactivateUserApiRequest = z.infer<typeof DeactivateUserApiRequestSchema>;
export type SearchUsersApiRequest = z.infer<typeof SearchUsersApiRequestSchema>;
export type UserApiResponse = z.infer<typeof UserApiResponseSchema>;
export type PublicUserApiResponse = z.infer<typeof PublicUserApiResponseSchema>;
export type UserWithOrganizationsApiResponse = z.infer<typeof UserWithOrganizationsApiResponseSchema>;
export type UserWithAssessmentsApiResponse = z.infer<typeof UserWithAssessmentsApiResponseSchema>;
export type UserListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof PublicUserApiResponseSchema>>>;
export type UserSearchApiResponse = z.infer<typeof UserSearchApiResponseSchema>;
export type UserAuthApiResponse = z.infer<typeof UserAuthApiResponseSchema>;
export type UserProfileUpdateApiResponse = z.infer<typeof UserProfileUpdateApiResponseSchema>;
export type UserSettingsUpdateApiResponse = z.infer<typeof UserSettingsUpdateApiResponseSchema>;
export type UserAssessmentScoresUpdateApiResponse = z.infer<typeof UserAssessmentScoresUpdateApiResponseSchema>;
export type GetUserByIdApiQuery = z.infer<typeof GetUserByIdApiQuerySchema>;
export type GetUserByEmailApiQuery = z.infer<typeof GetUserByEmailApiQuerySchema>;
export type ListUsersApiQuery = z.infer<typeof ListUsersApiQuerySchema>;
//# sourceMappingURL=user.contracts.d.ts.map