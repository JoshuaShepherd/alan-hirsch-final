import { z } from 'zod';
/**
 * User CRUD Operations
 * These schemas define the operations that can be performed on user entities
 */
/**
 * Create User Operation Schema
 * Derived from CreateUserSchema with operation-specific validation
 */
export declare const CreateUserOperationSchema: z.ZodObject<{
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
 * Create User with Organization Operation Schema
 * Extends create user with organization context
 */
export declare const CreateUserWithOrganizationOperationSchema: z.ZodObject<{
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
 * Get User by ID Operation Schema
 * Simple ID-based retrieval
 */
export declare const GetUserByIdOperationSchema: z.ZodObject<{
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
 * Get User by Email Operation Schema
 * Email-based retrieval for authentication
 */
export declare const GetUserByEmailOperationSchema: z.ZodObject<{
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
 * List Users Operation Schema
 * Paginated user listing with filters
 */
export declare const ListUsersOperationSchema: z.ZodObject<{
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
/**
 * Search Users Operation Schema
 * Full-text search with advanced filters
 */
export declare const SearchUsersOperationSchema: z.ZodObject<{
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
 * Update User Operation Schema
 * Derived from UpdateUserSchema with operation-specific validation
 */
export declare const UpdateUserOperationSchema: z.ZodEffects<z.ZodObject<{
    denomination: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodString>;
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    display_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatar_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    ministry_role: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
    organization_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    years_in_ministry: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    country_code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    language_primary: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    cultural_context: z.ZodOptional<z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>>;
    assessment_movement_alignment: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_audience_engagement: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_content_readiness: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_revenue_potential: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_network_effects: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_strategic_fit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessment_total: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    leader_tier: z.ZodOptional<z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>>;
    subdomain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    custom_domain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    platform_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    subscription_tier: z.ZodOptional<z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>>;
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
    account_status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>>;
    last_active_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    denomination?: string | undefined;
    email?: string | undefined;
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
}, {
    denomination?: string | undefined;
    email?: string | undefined;
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
    denomination?: string | undefined;
    email?: string | undefined;
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
}, {
    denomination?: string | undefined;
    email?: string | undefined;
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
 * Update User Profile Operation Schema
 * Specific to profile updates with additional validation
 */
export declare const UpdateUserProfileOperationSchema: z.ZodObject<{
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
 * Update User Settings Operation Schema
 * Specific to settings updates
 */
export declare const UpdateUserSettingsOperationSchema: z.ZodObject<{
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
 * Update User Assessment Scores Operation Schema
 * Specific to assessment score updates
 */
export declare const UpdateUserAssessmentScoresOperationSchema: z.ZodObject<{
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
 * Delete User Operation Schema
 * User deletion with confirmation
 */
export declare const DeleteUserOperationSchema: z.ZodObject<{
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
 * Deactivate User Operation Schema
 * Soft delete user account
 */
export declare const DeactivateUserOperationSchema: z.ZodObject<{
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
 * User Login Operation Schema
 * Authentication with email/password
 */
export declare const UserLoginOperationSchema: z.ZodObject<{
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
 * User Registration Operation Schema
 * New user registration with validation
 */
export declare const UserRegistrationOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * User Password Reset Operation Schema
 * Password reset request
 */
export declare const UserPasswordResetOperationSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
/**
 * User Password Update Operation Schema
 * Password update with current password verification
 */
export declare const UserPasswordUpdateOperationSchema: z.ZodEffects<z.ZodObject<{
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
export type CreateUserOperation = z.infer<typeof CreateUserOperationSchema>;
export type CreateUserWithOrganizationOperation = z.infer<typeof CreateUserWithOrganizationOperationSchema>;
export type GetUserByIdOperation = z.infer<typeof GetUserByIdOperationSchema>;
export type GetUserByEmailOperation = z.infer<typeof GetUserByEmailOperationSchema>;
export type ListUsersOperation = z.infer<typeof ListUsersOperationSchema>;
export type SearchUsersOperation = z.infer<typeof SearchUsersOperationSchema>;
export type UpdateUserOperation = z.infer<typeof UpdateUserOperationSchema>;
export type UpdateUserProfileOperation = z.infer<typeof UpdateUserProfileOperationSchema>;
export type UpdateUserSettingsOperation = z.infer<typeof UpdateUserSettingsOperationSchema>;
export type UpdateUserAssessmentScoresOperation = z.infer<typeof UpdateUserAssessmentScoresOperationSchema>;
export type DeleteUserOperation = z.infer<typeof DeleteUserOperationSchema>;
export type DeactivateUserOperation = z.infer<typeof DeactivateUserOperationSchema>;
export type UserLoginOperation = z.infer<typeof UserLoginOperationSchema>;
export type UserRegistrationOperation = z.infer<typeof UserRegistrationOperationSchema>;
export type UserPasswordResetOperation = z.infer<typeof UserPasswordResetOperationSchema>;
export type UserPasswordUpdateOperation = z.infer<typeof UserPasswordUpdateOperationSchema>;
//# sourceMappingURL=user.operations.d.ts.map