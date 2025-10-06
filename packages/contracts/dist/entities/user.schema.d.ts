import { z } from 'zod';
export declare const userProfileEntitySchema: z.ZodObject<{
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
export declare const userProfileResponseSchema: z.ZodObject<{
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
export declare const createUserProfileSchema: z.ZodObject<{
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
} & {
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
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
export declare const updateUserProfileSchema: z.ZodObject<Omit<{
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
}>;
export declare const userProfileQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
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
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "email" | "firstName" | "lastName" | "ministryRole" | "assessmentTotal" | "createdAt" | "updatedAt" | "lastActiveAt";
    sortOrder: "asc" | "desc";
    includeOrganization: boolean;
    includeSubscription: boolean;
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
}>;
export declare const userProfileFormSchema: z.ZodObject<{
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
export type UserProfileEntity = z.infer<typeof userProfileEntitySchema>;
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
export type CreateUserProfile = z.infer<typeof createUserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type UserProfileQuery = z.infer<typeof userProfileQuerySchema>;
export type UserProfileForm = z.infer<typeof userProfileFormSchema>;
export type UserEntity = UserProfileEntity;
export type PublicUser = UserProfileResponse;
export type CreateUser = CreateUserProfile;
export type UpdateUser = UpdateUserProfile;
export type UserQuery = UserProfileQuery;
export type UserForm = UserProfileForm;
export type UserProfile = UserProfileEntity;
export type NewUserProfile = CreateUserProfile;
export declare const userProfileSchema: z.ZodObject<{
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
export declare const databaseUserProfileSchema: z.ZodObject<{
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
//# sourceMappingURL=user.schema.d.ts.map