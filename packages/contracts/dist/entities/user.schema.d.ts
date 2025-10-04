import { z } from 'zod';
export declare const ministryRoleSchema: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
export declare const culturalContextSchema: z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>;
export declare const organizationTypeSchema: z.ZodEnum<["church", "denomination", "seminary", "nonprofit", "ministry", "business", "other"]>;
export declare const membershipRoleSchema: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
export declare const leaderTierSchema: z.ZodEnum<["core", "network", "emerging", "community"]>;
export declare const subscriptionTierSchema: z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>;
export declare const accountStatusSchema: z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>;
export declare const brandColorsSchema: z.ZodObject<{
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
}>;
export declare const emailNotificationsSchema: z.ZodObject<{
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
}>;
export declare const privacySettingsSchema: z.ZodObject<{
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
}>;
/**
 * Complete User Profile Entity Schema
 * This is the single source of truth for all user data structures
 */
export declare const UserEntitySchema: z.ZodObject<{
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
 * Create User Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateUserSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update User Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateUserSchema: z.ZodObject<{
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
}>;
/**
 * User Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const UserQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Public User Schema - For public display
 * Hides sensitive fields
 */
export declare const PublicUserSchema: z.ZodObject<Omit<{
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
 * User Form Schema - For form validation
 * Extends create schema with form-specific fields
 */
export declare const UserFormSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at"> & {
    confirm_password: z.ZodOptional<z.ZodString>;
    terms_accepted: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    language_primary: string;
    subscription_tier: "free" | "individual" | "professional" | "leader" | "institutional";
    theological_focus: string[];
    account_status: "active" | "inactive" | "suspended" | "pending_verification";
    terms_accepted: boolean;
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
    confirm_password?: string | undefined;
}, {
    email: string;
    first_name: string;
    last_name: string;
    ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
    terms_accepted: boolean;
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
    confirm_password?: string | undefined;
}>;
export type UserEntity = z.infer<typeof UserEntitySchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserQuery = z.infer<typeof UserQuerySchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;
export type UserForm = z.infer<typeof UserFormSchema>;
export type MinistryRole = z.infer<typeof ministryRoleSchema>;
export type CulturalContext = z.infer<typeof culturalContextSchema>;
export type OrganizationType = z.infer<typeof organizationTypeSchema>;
export type MembershipRole = z.infer<typeof membershipRoleSchema>;
export type LeaderTier = z.infer<typeof leaderTierSchema>;
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;
export type AccountStatus = z.infer<typeof accountStatusSchema>;
export type BrandColors = z.infer<typeof brandColorsSchema>;
export type EmailNotifications = z.infer<typeof emailNotificationsSchema>;
export type PrivacySettings = z.infer<typeof privacySettingsSchema>;
//# sourceMappingURL=user.schema.d.ts.map