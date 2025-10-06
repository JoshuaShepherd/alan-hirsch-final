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
 * Create User with Organization Operation Schema
 * Extends create user with organization context
 */
export declare const CreateUserWithOrganizationOperationSchema: z.ZodObject<{
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
 * Update User Operation Schema
 * Derived from UpdateUserSchema with operation-specific validation
 */
export declare const UpdateUserOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
    passwordHash: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    displayName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatarUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    denomination: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    organizationName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    yearsInMinistry: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    countryCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    languagePrimary: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    culturalContext: z.ZodOptional<z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>>;
    assessmentMovementAlignment: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessmentAudienceEngagement: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessmentContentReadiness: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessmentRevenuePotential: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessmentNetworkEffects: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    assessmentStrategicFit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    leaderTier: z.ZodOptional<z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>>;
    subdomain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    customDomain: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    platformTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    subscriptionTier: z.ZodOptional<z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>>;
    theologicalFocus: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    brandColors: z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>;
    emailNotifications: z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>;
    privacySettings: z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
    }>>>;
    onboardingCompleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    onboardingStep: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    accountStatus: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    ministryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
}, "email">, "strip", z.ZodTypeAny, {
    passwordHash?: string | undefined;
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
    onboardingCompleted?: boolean | undefined;
    onboardingStep?: number | undefined;
    accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
}, {
    passwordHash?: string | undefined;
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
}>, {
    passwordHash?: string | undefined;
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
    onboardingCompleted?: boolean | undefined;
    onboardingStep?: number | undefined;
    accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
}, {
    passwordHash?: string | undefined;
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
 * Update User Profile Operation Schema
 * Specific to profile updates with additional validation
 */
export declare const UpdateUserProfileOperationSchema: z.ZodObject<{
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
 * Update User Settings Operation Schema
 * Specific to settings updates
 */
export declare const UpdateUserSettingsOperationSchema: z.ZodObject<{
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
 * Update User Assessment Scores Operation Schema
 * Specific to assessment score updates
 */
export declare const UpdateUserAssessmentScoresOperationSchema: z.ZodObject<{
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