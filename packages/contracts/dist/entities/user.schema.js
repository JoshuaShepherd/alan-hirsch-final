import { z } from 'zod';
// ============================================================================
// USER PROFILE ENTITY SCHEMA
// ============================================================================
// Aligned with user_profiles table from database schema
export const userProfileEntitySchema = z.object({
    // Core Identity
    id: z.string().uuid(),
    email: z.string().email(),
    passwordHash: z.string().optional(), // For internal use only
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    displayName: z.string().max(100).optional(),
    bio: z.string().max(1000).optional(),
    avatarUrl: z.string().url().optional(),
    // Ministry Context
    ministryRole: z.enum([
        'senior_pastor',
        'associate_pastor',
        'church_planter',
        'denominational_leader',
        'seminary_professor',
        'seminary_student',
        'ministry_staff',
        'missionary',
        'marketplace_minister',
        'nonprofit_leader',
        'consultant',
        'academic_researcher',
        'emerging_leader',
        'other',
    ]),
    denomination: z.string().max(100).optional(),
    organizationName: z.string().max(200).optional(),
    yearsInMinistry: z.number().int().min(0).max(100).optional(),
    // Geographic & Cultural Context
    countryCode: z.string().length(2).optional(),
    timezone: z.string().max(50).optional(),
    languagePrimary: z.string().max(10).default('en'),
    culturalContext: z
        .enum([
        'western',
        'eastern',
        'african',
        'latin_american',
        'middle_eastern',
        'oceanic',
        'mixed',
        'global',
    ])
        .optional(),
    // APEST Assessment Scores (0-100 scale)
    assessmentMovementAlignment: z.number().int().min(0).max(100).optional(),
    assessmentAudienceEngagement: z.number().int().min(0).max(100).optional(),
    assessmentContentReadiness: z.number().int().min(0).max(100).optional(),
    assessmentRevenuePotential: z.number().int().min(0).max(100).optional(),
    assessmentNetworkEffects: z.number().int().min(0).max(100).optional(),
    assessmentStrategicFit: z.number().int().min(0).max(100).optional(),
    assessmentTotal: z.number().int().min(0).max(600).optional(), // Sum of above scores
    // Leader Tier (based on 100-point rubric)
    leaderTier: z.enum(['core', 'network', 'emerging', 'community']).optional(),
    // Platform Configuration (for leaders)
    subdomain: z.string().max(100).optional(),
    customDomain: z.string().max(200).optional(),
    platformTitle: z.string().max(200).optional(),
    // Subscription & Access
    subscriptionTier: z
        .enum(['free', 'individual', 'professional', 'leader', 'institutional'])
        .default('free'),
    // Theological Focus Areas
    theologicalFocus: z.array(z.string()).default([]),
    // Settings (JSONB for flexibility)
    brandColors: z
        .object({
        primary: z.string().default('#2563eb'),
        secondary: z.string().default('#64748b'),
        accent: z.string().default('#059669'),
    })
        .default({
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
    }),
    emailNotifications: z
        .object({
        dailyDigest: z.boolean().default(true),
        collaborationRequests: z.boolean().default(true),
        revenueReports: z.boolean().default(true),
        communityUpdates: z.boolean().default(true),
    })
        .default({
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: true,
    }),
    privacySettings: z
        .object({
        publicProfile: z.boolean().default(true),
        showAssessmentResults: z.boolean().default(false),
        allowNetworking: z.boolean().default(true),
        shareAnalytics: z.boolean().default(false),
    })
        .default({
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
    }),
    // Onboarding & Status
    onboardingCompleted: z.boolean().default(false),
    onboardingStep: z.number().int().min(1).max(10).default(1),
    accountStatus: z
        .enum(['active', 'inactive', 'suspended', 'pending_verification'])
        .default('pending_verification'),
    // Timestamps
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    lastActiveAt: z.string().datetime(),
});
// ============================================================================
// USER PROFILE RESPONSE SCHEMA (with computed fields)
// ============================================================================
export const userProfileResponseSchema = userProfileEntitySchema.extend({
    // Computed fields for UI
    isActive: z.boolean(),
    hasCompletedOnboarding: z.boolean(),
    fullName: z.string(),
    displayNameOrFullName: z.string(),
    hasCustomDomain: z.boolean(),
    hasSubdomain: z.boolean(),
    isPublicProfile: z.boolean(),
    canReceiveNotifications: z.boolean(),
    assessmentCompleted: z.boolean(),
    primaryGift: z.string().optional(),
    secondaryGift: z.string().optional(),
    ministryExperience: z.string().optional(),
    locationDisplay: z.string().optional(),
    // Related data (optional)
    organization: z
        .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
        type: z.string(),
    })
        .optional(),
    subscription: z
        .object({
        id: z.string().uuid(),
        planName: z.string(),
        status: z.string(),
        tier: z.string(),
    })
        .optional(),
});
// ============================================================================
// USER PROFILE CREATE SCHEMA
// ============================================================================
export const createUserProfileSchema = userProfileEntitySchema
    .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    lastActiveAt: true,
    assessmentTotal: true,
})
    .extend({
    // Required fields for creation
    email: z.string().email(),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    ministryRole: z.enum([
        'senior_pastor',
        'associate_pastor',
        'church_planter',
        'denominational_leader',
        'seminary_professor',
        'seminary_student',
        'ministry_staff',
        'missionary',
        'marketplace_minister',
        'nonprofit_leader',
        'consultant',
        'academic_researcher',
        'emerging_leader',
        'other',
    ]),
});
// ============================================================================
// USER PROFILE UPDATE SCHEMA
// ============================================================================
export const updateUserProfileSchema = createUserProfileSchema.partial().omit({
    email: true, // Email cannot be changed
});
// ============================================================================
// USER PROFILE QUERY SCHEMA
// ============================================================================
export const userProfileQuerySchema = z.object({
    // Pagination
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    // Search
    search: z.string().optional(),
    // Filters
    ministryRole: z.string().optional(),
    denomination: z.string().optional(),
    countryCode: z.string().optional(),
    culturalContext: z.string().optional(),
    accountStatus: z.string().optional(),
    subscriptionTier: z.string().optional(),
    leaderTier: z.string().optional(),
    // Sorting
    sortBy: z
        .enum([
        'createdAt',
        'updatedAt',
        'lastActiveAt',
        'firstName',
        'lastName',
        'email',
        'ministryRole',
        'assessmentTotal',
    ])
        .default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    // Organization filtering
    organizationId: z.string().uuid().optional(),
    // Include related data
    includeOrganization: z.boolean().default(false),
    includeSubscription: z.boolean().default(false),
});
// ============================================================================
// USER PROFILE FORM SCHEMA (for UI forms)
// ============================================================================
export const userProfileFormSchema = z.object({
    // Basic Info
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    displayName: z.string().max(100).optional(),
    bio: z.string().max(1000).optional(),
    // Ministry Info
    ministryRole: z.enum([
        'senior_pastor',
        'associate_pastor',
        'church_planter',
        'denominational_leader',
        'seminary_professor',
        'seminary_student',
        'ministry_staff',
        'missionary',
        'marketplace_minister',
        'nonprofit_leader',
        'consultant',
        'academic_researcher',
        'emerging_leader',
        'other',
    ]),
    denomination: z.string().max(100).optional(),
    organizationName: z.string().max(200).optional(),
    yearsInMinistry: z.coerce.number().int().min(0).max(100).optional(),
    // Location
    countryCode: z.string().length(2).optional(),
    timezone: z.string().max(50).optional(),
    culturalContext: z
        .enum([
        'western',
        'eastern',
        'african',
        'latin_american',
        'middle_eastern',
        'oceanic',
        'mixed',
        'global',
    ])
        .optional(),
    // Platform
    platformTitle: z.string().max(200).optional(),
    languagePrimary: z.string().max(10).default('en'),
    // Privacy Settings
    privacySettings: z.object({
        publicProfile: z.boolean().default(true),
        shareAnalytics: z.boolean().default(false),
        allowNetworking: z.boolean().default(true),
        showAssessmentResults: z.boolean().default(false),
    }),
    // Email Notifications
    emailNotifications: z.object({
        dailyDigest: z.boolean().default(true),
        revenueReports: z.boolean().default(true),
        communityUpdates: z.boolean().default(true),
        collaborationRequests: z.boolean().default(true),
    }),
});
// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================
export const userProfileSchema = userProfileEntitySchema;
export const databaseUserProfileSchema = userProfileEntitySchema;
//# sourceMappingURL=user.schema.js.map