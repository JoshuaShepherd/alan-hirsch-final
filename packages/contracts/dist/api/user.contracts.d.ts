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
    denomination: z.ZodOptional<z.ZodString>;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    last_active_at: z.ZodOptional<z.ZodString>;
} & {
    email: z.ZodEffects<z.ZodString, string, string>;
    first_name: z.ZodEffects<z.ZodString, string, string>;
    last_name: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
}>;
/**
 * Create User with Organization API Request Contract
 * Derived from CreateUserWithOrganizationOperationSchema
 */
export declare const CreateUserWithOrganizationApiRequestSchema: z.ZodObject<{
    denomination: z.ZodOptional<z.ZodString>;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    last_active_at: z.ZodOptional<z.ZodString>;
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
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        role: "owner" | "admin" | "member" | "viewer";
    }, {
        name: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        role?: "owner" | "admin" | "member" | "viewer" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    organization: {
        name: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        role: "owner" | "admin" | "member" | "viewer";
    };
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    organization: {
        name: string;
        organization_type: "other" | "church" | "denomination" | "seminary" | "nonprofit" | "ministry" | "business";
        role?: "owner" | "admin" | "member" | "viewer" | undefined;
    };
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
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
    denomination: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    last_active_at: z.ZodOptional<z.ZodString>;
    terms_accepted: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
} & {
    password: z.ZodString;
    confirm_password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    confirm_password: string;
    terms_accepted: boolean;
    password: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    confirm_password: string;
    terms_accepted: boolean;
    password: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
}>, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    confirm_password: string;
    terms_accepted: boolean;
    password: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    confirm_password: string;
    terms_accepted: boolean;
    password: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
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
    denomination: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    first_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    last_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    display_name: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    avatar_url: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    ministry_role: z.ZodOptional<z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>>;
    organization_name: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    years_in_ministry: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    country_code: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    language_primary: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodString>>>;
    cultural_context: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>>>;
    platform_title: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodString>>>;
    theological_focus: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>>;
    brand_colors: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>>>;
    privacy_settings: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>>>;
}, "strip", z.ZodTypeAny, {
    denomination?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    ministry_role?: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other" | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    platform_title?: string | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
}, {
    denomination?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    ministry_role?: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other" | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    platform_title?: string | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
}>;
/**
 * Update User Settings API Request Contract
 * Derived from UpdateUserSettingsOperationSchema
 */
export declare const UpdateUserSettingsApiRequestSchema: z.ZodObject<{
    brand_colors: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>>>;
    email_notifications: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>>>;
    privacy_settings: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>>>;
}, "strip", z.ZodTypeAny, {
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
}, {
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
}>;
/**
 * Update User Assessment Scores API Request Contract
 * Derived from UpdateUserAssessmentScoresOperationSchema
 */
export declare const UpdateUserAssessmentScoresApiRequestSchema: z.ZodObject<{
    assessment_movement_alignment: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessment_audience_engagement: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessment_content_readiness: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessment_revenue_potential: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessment_network_effects: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessment_strategic_fit: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    assessment_total: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodNumber>>>;
    leader_tier: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>>>;
}, "strip", z.ZodTypeAny, {
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
}, {
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
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
    sort_by: "created_at" | "last_active_at" | "relevance";
    sort_order: "asc" | "desc";
    query: string;
    ministry_role?: ("senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other")[] | undefined;
    country_code?: string[] | undefined;
    cultural_context?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global")[] | undefined;
    leader_tier?: ("core" | "network" | "emerging" | "community")[] | undefined;
}, {
    query: string;
    ministry_role?: ("senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other")[] | undefined;
    country_code?: string[] | undefined;
    cultural_context?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global")[] | undefined;
    leader_tier?: ("core" | "network" | "emerging" | "community")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort_by?: "created_at" | "last_active_at" | "relevance" | undefined;
    sort_order?: "asc" | "desc" | undefined;
}>;
/**
 * User API Response Contract
 * Derived from UserEntitySchema for internal API responses
 */
export declare const UserApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    denomination: z.ZodOptional<z.ZodString>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    last_active_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    created_at: string;
    updated_at: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    created_at: string;
    updated_at: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
}>;
/**
 * Public User API Response Contract
 * Derived from PublicUserSchema for public API responses
 */
export declare const PublicUserApiResponseSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    email: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    denomination: z.ZodOptional<z.ZodString>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    last_active_at: z.ZodOptional<z.ZodString>;
}, "email" | "assessment_movement_alignment" | "assessment_audience_engagement" | "assessment_content_readiness" | "assessment_revenue_potential" | "assessment_network_effects" | "assessment_strategic_fit" | "assessment_total" | "email_notifications" | "privacy_settings">, "strip", z.ZodTypeAny, {
    id: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    created_at: string;
    updated_at: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    id: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    created_at: string;
    updated_at: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
}>;
/**
 * User with Organizations API Response Contract
 * Extends user with organization information
 */
export declare const UserWithOrganizationsApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    denomination: z.ZodOptional<z.ZodString>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    last_active_at: z.ZodOptional<z.ZodString>;
} & {
    organizations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        role: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
        status: z.ZodEnum<["active", "inactive", "pending", "suspended"]>;
        joined_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }, {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    created_at: string;
    updated_at: string;
    organizations: {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
        name: string;
        slug: string;
        role: "owner" | "admin" | "member" | "viewer";
        joined_at: string;
    }[];
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    created_at: string;
    updated_at: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
    organizations?: {
        status: "active" | "inactive" | "suspended" | "pending";
        id: string;
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
    first_name: z.ZodString;
    last_name: z.ZodString;
    display_name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    denomination: z.ZodOptional<z.ZodString>;
    organization_name: z.ZodOptional<z.ZodString>;
    years_in_ministry: z.ZodOptional<z.ZodNumber>;
    country_code: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    language_primary: z.ZodDefault<z.ZodString>;
    cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
    assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
    assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
    assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
    assessment_network_effects: z.ZodOptional<z.ZodNumber>;
    assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
    assessment_total: z.ZodOptional<z.ZodNumber>;
    leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    custom_domain: z.ZodOptional<z.ZodString>;
    platform_title: z.ZodOptional<z.ZodString>;
    subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brand_colors: z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>;
    email_notifications: z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>;
    privacy_settings: z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>;
    account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    last_active_at: z.ZodOptional<z.ZodString>;
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
        started_at: string;
        completion_percentage: number;
        assessment_name: string;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }, {
        id: string;
        assessment_id: string;
        started_at: string;
        completion_percentage: number;
        assessment_name: string;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    created_at: string;
    updated_at: string;
    assessments: {
        id: string;
        assessment_id: string;
        started_at: string;
        completion_percentage: number;
        assessment_name: string;
        completed_at?: string | undefined;
        total_score?: number | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    }[];
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    last_active_at?: string | undefined;
}, {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    created_at: string;
    updated_at: string;
    denomination?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    last_active_at?: string | undefined;
    assessments?: {
        id: string;
        assessment_id: string;
        started_at: string;
        completion_percentage: number;
        assessment_name: string;
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
    data: z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodString;
        email: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        display_name: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        avatar_url: z.ZodOptional<z.ZodString>;
        ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
        denomination: z.ZodOptional<z.ZodString>;
        organization_name: z.ZodOptional<z.ZodString>;
        years_in_ministry: z.ZodOptional<z.ZodNumber>;
        country_code: z.ZodOptional<z.ZodString>;
        timezone: z.ZodOptional<z.ZodString>;
        language_primary: z.ZodDefault<z.ZodString>;
        cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
        assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
        assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
        assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
        assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
        assessment_network_effects: z.ZodOptional<z.ZodNumber>;
        assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
        assessment_total: z.ZodOptional<z.ZodNumber>;
        leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
        subdomain: z.ZodOptional<z.ZodString>;
        custom_domain: z.ZodOptional<z.ZodString>;
        platform_title: z.ZodOptional<z.ZodString>;
        subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
        theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brand_colors: z.ZodOptional<z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            accent: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            primary: string;
            secondary: string;
            accent: string;
        }, {
            primary: string;
            secondary: string;
            accent: string;
        }>>;
        email_notifications: z.ZodOptional<z.ZodObject<{
            dailyDigest: z.ZodBoolean;
            collaborationRequests: z.ZodBoolean;
            revenueReports: z.ZodBoolean;
            communityUpdates: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        }, {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        }>>;
        privacy_settings: z.ZodOptional<z.ZodObject<{
            publicProfile: z.ZodBoolean;
            showAssessmentResults: z.ZodBoolean;
            allowNetworking: z.ZodBoolean;
            shareAnalytics: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        }, {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        }>>;
        account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        last_active_at: z.ZodOptional<z.ZodString>;
    }, "email" | "assessment_movement_alignment" | "assessment_audience_engagement" | "assessment_content_readiness" | "assessment_revenue_potential" | "assessment_network_effects" | "assessment_strategic_fit" | "assessment_total" | "email_notifications" | "privacy_settings">, "strip", z.ZodTypeAny, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        language_primary: string;
        subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
        theological_focus: string[];
        account_status: "active" | "inactive" | "suspended" | "pending_verification";
        created_at: string;
        updated_at: string;
        denomination?: string | undefined;
        display_name?: string | undefined;
        bio?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
        years_in_ministry?: number | undefined;
        country_code?: string | undefined;
        timezone?: string | undefined;
        cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        platform_title?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        last_active_at?: string | undefined;
    }, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        created_at: string;
        updated_at: string;
        denomination?: string | undefined;
        display_name?: string | undefined;
        bio?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
        years_in_ministry?: number | undefined;
        country_code?: string | undefined;
        timezone?: string | undefined;
        language_primary?: string | undefined;
        cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        platform_title?: string | undefined;
        subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
        theological_focus?: string[] | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        last_active_at?: string | undefined;
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
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        language_primary: string;
        subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
        theological_focus: string[];
        account_status: "active" | "inactive" | "suspended" | "pending_verification";
        created_at: string;
        updated_at: string;
        denomination?: string | undefined;
        display_name?: string | undefined;
        bio?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
        years_in_ministry?: number | undefined;
        country_code?: string | undefined;
        timezone?: string | undefined;
        cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        platform_title?: string | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        last_active_at?: string | undefined;
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
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        created_at: string;
        updated_at: string;
        denomination?: string | undefined;
        display_name?: string | undefined;
        bio?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
        years_in_ministry?: number | undefined;
        country_code?: string | undefined;
        timezone?: string | undefined;
        language_primary?: string | undefined;
        cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        custom_domain?: string | undefined;
        platform_title?: string | undefined;
        subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
        theological_focus?: string[] | undefined;
        brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
        } | undefined;
        account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
        last_active_at?: string | undefined;
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
        users: z.ZodArray<z.ZodObject<Omit<{
            id: z.ZodString;
            email: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organization_name: z.ZodOptional<z.ZodString>;
            years_in_ministry: z.ZodOptional<z.ZodNumber>;
            country_code: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            language_primary: z.ZodDefault<z.ZodString>;
            cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
            assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
            assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
            assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
            assessment_network_effects: z.ZodOptional<z.ZodNumber>;
            assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
            assessment_total: z.ZodOptional<z.ZodNumber>;
            leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            platform_title: z.ZodOptional<z.ZodString>;
            subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brand_colors: z.ZodOptional<z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                accent: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary: string;
                secondary: string;
                accent: string;
            }>>;
            email_notifications: z.ZodOptional<z.ZodObject<{
                dailyDigest: z.ZodBoolean;
                collaborationRequests: z.ZodBoolean;
                revenueReports: z.ZodBoolean;
                communityUpdates: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }>>;
            privacy_settings: z.ZodOptional<z.ZodObject<{
                publicProfile: z.ZodBoolean;
                showAssessmentResults: z.ZodBoolean;
                allowNetworking: z.ZodBoolean;
                shareAnalytics: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }>>;
            account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            last_active_at: z.ZodOptional<z.ZodString>;
        }, "email" | "assessment_movement_alignment" | "assessment_audience_engagement" | "assessment_content_readiness" | "assessment_revenue_potential" | "assessment_network_effects" | "assessment_strategic_fit" | "assessment_total" | "email_notifications" | "privacy_settings">, "strip", z.ZodTypeAny, {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            last_active_at?: string | undefined;
        }, {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        query: string;
        total: number;
        users: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            last_active_at?: string | undefined;
        }[];
        took: number;
    }, {
        query: string;
        total: number;
        users: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
        query: string;
        total: number;
        users: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            last_active_at?: string | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        query: string;
        total: number;
        users: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organization_name: z.ZodOptional<z.ZodString>;
            years_in_ministry: z.ZodOptional<z.ZodNumber>;
            country_code: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            language_primary: z.ZodDefault<z.ZodString>;
            cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
            assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
            assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
            assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
            assessment_network_effects: z.ZodOptional<z.ZodNumber>;
            assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
            assessment_total: z.ZodOptional<z.ZodNumber>;
            leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            platform_title: z.ZodOptional<z.ZodString>;
            subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brand_colors: z.ZodOptional<z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                accent: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary: string;
                secondary: string;
                accent: string;
            }>>;
            email_notifications: z.ZodOptional<z.ZodObject<{
                dailyDigest: z.ZodBoolean;
                collaborationRequests: z.ZodBoolean;
                revenueReports: z.ZodBoolean;
                communityUpdates: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }>>;
            privacy_settings: z.ZodOptional<z.ZodObject<{
                publicProfile: z.ZodBoolean;
                showAssessmentResults: z.ZodBoolean;
                allowNetworking: z.ZodBoolean;
                shareAnalytics: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }>>;
            account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            last_active_at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        }, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        }>;
        token: z.ZodString;
        expires_at: z.ZodString;
        refresh_token: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        expires_at: string;
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        };
        token: string;
        refresh_token?: string | undefined;
    }, {
        expires_at: string;
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        };
        token: string;
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
        expires_at: string;
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        };
        token: string;
        refresh_token?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        expires_at: string;
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        };
        token: string;
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
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organization_name: z.ZodOptional<z.ZodString>;
            years_in_ministry: z.ZodOptional<z.ZodNumber>;
            country_code: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            language_primary: z.ZodDefault<z.ZodString>;
            cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
            assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
            assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
            assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
            assessment_network_effects: z.ZodOptional<z.ZodNumber>;
            assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
            assessment_total: z.ZodOptional<z.ZodNumber>;
            leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            platform_title: z.ZodOptional<z.ZodString>;
            subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brand_colors: z.ZodOptional<z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                accent: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary: string;
                secondary: string;
                accent: string;
            }>>;
            email_notifications: z.ZodOptional<z.ZodObject<{
                dailyDigest: z.ZodBoolean;
                collaborationRequests: z.ZodBoolean;
                revenueReports: z.ZodBoolean;
                communityUpdates: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }>>;
            privacy_settings: z.ZodOptional<z.ZodObject<{
                publicProfile: z.ZodBoolean;
                showAssessmentResults: z.ZodBoolean;
                allowNetworking: z.ZodBoolean;
                shareAnalytics: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }>>;
            account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            last_active_at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        }, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        }>;
        updated_fields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        };
        updated_fields: string[];
    }, {
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
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
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organization_name: z.ZodOptional<z.ZodString>;
            years_in_ministry: z.ZodOptional<z.ZodNumber>;
            country_code: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            language_primary: z.ZodDefault<z.ZodString>;
            cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
            assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
            assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
            assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
            assessment_network_effects: z.ZodOptional<z.ZodNumber>;
            assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
            assessment_total: z.ZodOptional<z.ZodNumber>;
            leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            platform_title: z.ZodOptional<z.ZodString>;
            subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brand_colors: z.ZodOptional<z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                accent: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary: string;
                secondary: string;
                accent: string;
            }>>;
            email_notifications: z.ZodOptional<z.ZodObject<{
                dailyDigest: z.ZodBoolean;
                collaborationRequests: z.ZodBoolean;
                revenueReports: z.ZodBoolean;
                communityUpdates: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }>>;
            privacy_settings: z.ZodOptional<z.ZodObject<{
                publicProfile: z.ZodBoolean;
                showAssessmentResults: z.ZodBoolean;
                allowNetworking: z.ZodBoolean;
                shareAnalytics: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }>>;
            account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            last_active_at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        }, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        }>;
        updated_settings: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        };
        updated_settings: string[];
    }, {
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
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
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            bio: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            denomination: z.ZodOptional<z.ZodString>;
            organization_name: z.ZodOptional<z.ZodString>;
            years_in_ministry: z.ZodOptional<z.ZodNumber>;
            country_code: z.ZodOptional<z.ZodString>;
            timezone: z.ZodOptional<z.ZodString>;
            language_primary: z.ZodDefault<z.ZodString>;
            cultural_context: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            assessment_movement_alignment: z.ZodOptional<z.ZodNumber>;
            assessment_audience_engagement: z.ZodOptional<z.ZodNumber>;
            assessment_content_readiness: z.ZodOptional<z.ZodNumber>;
            assessment_revenue_potential: z.ZodOptional<z.ZodNumber>;
            assessment_network_effects: z.ZodOptional<z.ZodNumber>;
            assessment_strategic_fit: z.ZodOptional<z.ZodNumber>;
            assessment_total: z.ZodOptional<z.ZodNumber>;
            leader_tier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
            subdomain: z.ZodOptional<z.ZodString>;
            custom_domain: z.ZodOptional<z.ZodString>;
            platform_title: z.ZodOptional<z.ZodString>;
            subscription_tier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
            theological_focus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brand_colors: z.ZodOptional<z.ZodObject<{
                primary: z.ZodString;
                secondary: z.ZodString;
                accent: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                primary: string;
                secondary: string;
                accent: string;
            }, {
                primary: string;
                secondary: string;
                accent: string;
            }>>;
            email_notifications: z.ZodOptional<z.ZodObject<{
                dailyDigest: z.ZodBoolean;
                collaborationRequests: z.ZodBoolean;
                revenueReports: z.ZodBoolean;
                communityUpdates: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }, {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            }>>;
            privacy_settings: z.ZodOptional<z.ZodObject<{
                publicProfile: z.ZodBoolean;
                showAssessmentResults: z.ZodBoolean;
                allowNetworking: z.ZodBoolean;
                shareAnalytics: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }, {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            }>>;
            account_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            last_active_at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        }, {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
        }>;
        updated_scores: z.ZodArray<z.ZodString, "many">;
        leader_tier_updated: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
        };
        updated_scores: string[];
        leader_tier_updated: boolean;
    }, {
        user: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            language_primary: string;
            subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
            theological_focus: string[];
            account_status: "active" | "inactive" | "suspended" | "pending_verification";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            last_active_at?: string | undefined;
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
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            created_at: string;
            updated_at: string;
            denomination?: string | undefined;
            display_name?: string | undefined;
            bio?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
            years_in_ministry?: number | undefined;
            country_code?: string | undefined;
            timezone?: string | undefined;
            language_primary?: string | undefined;
            cultural_context?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            assessment_movement_alignment?: number | undefined;
            assessment_audience_engagement?: number | undefined;
            assessment_content_readiness?: number | undefined;
            assessment_revenue_potential?: number | undefined;
            assessment_network_effects?: number | undefined;
            assessment_strategic_fit?: number | undefined;
            assessment_total?: number | undefined;
            leader_tier?: "core" | "network" | "emerging" | "community" | undefined;
            subdomain?: string | undefined;
            custom_domain?: string | undefined;
            platform_title?: string | undefined;
            subscription_tier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
            theological_focus?: string[] | undefined;
            brand_colors?: {
                primary: string;
                secondary: string;
                accent: string;
            } | undefined;
            email_notifications?: {
                dailyDigest: boolean;
                collaborationRequests: boolean;
                revenueReports: boolean;
                communityUpdates: boolean;
            } | undefined;
            privacy_settings?: {
                publicProfile: boolean;
                showAssessmentResults: boolean;
                allowNetworking: boolean;
                shareAnalytics: boolean;
            } | undefined;
            account_status?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
            last_active_at?: string | undefined;
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
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    display_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatar_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    denomination: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    organization_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    years_in_ministry: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    language_primary: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_audience_engagement: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_content_readiness: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_revenue_potential: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_network_effects: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_strategic_fit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_total: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    subdomain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    custom_domain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    platform_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    theological_focus: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    brand_colors: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary: string;
        secondary: string;
        accent: string;
    }>>>;
    email_notifications: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        dailyDigest: z.ZodBoolean;
        collaborationRequests: z.ZodBoolean;
        revenueReports: z.ZodBoolean;
        communityUpdates: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }>>>;
    privacy_settings: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        publicProfile: z.ZodBoolean;
        showAssessmentResults: z.ZodBoolean;
        allowNetworking: z.ZodBoolean;
        shareAnalytics: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }>>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
    last_active_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    ministry_role: z.ZodOptional<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
    country_code: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cultural_context: z.ZodOptional<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>, "many">>;
    leader_tier: z.ZodOptional<z.ZodArray<z.ZodEnum<["core", "network", "emerging", "community"]>, "many">>;
    subscription_tier: z.ZodOptional<z.ZodArray<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>, "many">>;
    account_status: z.ZodOptional<z.ZodArray<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>, "many">>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    last_active_after: z.ZodOptional<z.ZodString>;
    last_active_before: z.ZodOptional<z.ZodString>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "last_active_at", "first_name", "last_name"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_organizations: z.ZodDefault<z.ZodBoolean>;
    include_assessments: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    include_organizations: boolean;
    include_assessments: boolean;
    page: number;
    limit: number;
    offset: number;
    sort_by: "first_name" | "last_name" | "created_at" | "updated_at" | "last_active_at";
    sort_order: "asc" | "desc";
    denomination?: string | undefined;
    id?: string | undefined;
    email?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    ministry_role?: ("senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other")[] | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string[] | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global")[] | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: ("core" | "network" | "emerging" | "community")[] | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: ("free" | "individual" | "professional" | "leader" | "institutional")[] | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: ("active" | "inactive" | "suspended" | "pending_verification")[] | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    last_active_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    last_active_after?: string | undefined;
    last_active_before?: string | undefined;
}, {
    denomination?: string | undefined;
    id?: string | undefined;
    email?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    display_name?: string | undefined;
    bio?: string | undefined;
    avatar_url?: string | undefined;
    ministry_role?: ("senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other")[] | undefined;
    organization_name?: string | undefined;
    years_in_ministry?: number | undefined;
    country_code?: string[] | undefined;
    timezone?: string | undefined;
    language_primary?: string | undefined;
    cultural_context?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global")[] | undefined;
    assessment_movement_alignment?: number | undefined;
    assessment_audience_engagement?: number | undefined;
    assessment_content_readiness?: number | undefined;
    assessment_revenue_potential?: number | undefined;
    assessment_network_effects?: number | undefined;
    assessment_strategic_fit?: number | undefined;
    assessment_total?: number | undefined;
    leader_tier?: ("core" | "network" | "emerging" | "community")[] | undefined;
    subdomain?: string | undefined;
    custom_domain?: string | undefined;
    platform_title?: string | undefined;
    subscription_tier?: ("free" | "individual" | "professional" | "leader" | "institutional")[] | undefined;
    theological_focus?: string[] | undefined;
    brand_colors?: {
        primary: string;
        secondary: string;
        accent: string;
    } | undefined;
    email_notifications?: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    } | undefined;
    privacy_settings?: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    } | undefined;
    account_status?: ("active" | "inactive" | "suspended" | "pending_verification")[] | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    last_active_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    last_active_after?: string | undefined;
    last_active_before?: string | undefined;
    include_organizations?: boolean | undefined;
    include_assessments?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "first_name" | "last_name" | "created_at" | "updated_at" | "last_active_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
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