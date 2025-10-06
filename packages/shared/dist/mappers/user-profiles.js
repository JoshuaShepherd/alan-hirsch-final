import { createUserProfileSchema, updateUserProfileSchema, userProfileEntitySchema, userProfileResponseSchema, } from '@platform/contracts';
/**
 * User Profile Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 * - Zod schema validation for data integrity
 */
/**
 * Map UserProfileRow to UserProfileEntity
 * Validates the transformation against the Zod schema
 */
export function toUserProfileEntity(row) {
    const entity = {
        id: row.id,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
        displayName: row.displayName ?? undefined,
        bio: row.bio ?? undefined,
        avatarUrl: row.avatarUrl ?? undefined,
        ministryRole: row.ministryRole,
        denomination: row.denomination ?? undefined,
        organizationName: row.organizationName ?? undefined,
        yearsInMinistry: row.yearsInMinistry ?? undefined,
        countryCode: row.countryCode ?? undefined,
        timezone: row.timezone ?? undefined,
        languagePrimary: row.languagePrimary ?? 'en',
        culturalContext: row.culturalContext ?? undefined,
        assessmentMovementAlignment: row.assessmentMovementAlignment ?? undefined,
        assessmentAudienceEngagement: row.assessmentAudienceEngagement ?? undefined,
        assessmentContentReadiness: row.assessmentContentReadiness ?? undefined,
        assessmentRevenuePotential: row.assessmentRevenuePotential ?? undefined,
        assessmentNetworkEffects: row.assessmentNetworkEffects ?? undefined,
        assessmentStrategicFit: row.assessmentStrategicFit ?? undefined,
        assessmentTotal: row.assessmentTotal ?? undefined,
        leaderTier: row.leaderTier ?? undefined,
        subdomain: row.subdomain ?? undefined,
        customDomain: row.customDomain ?? undefined,
        platformTitle: row.platformTitle ?? undefined,
        subscriptionTier: row.subscriptionTier ?? 'free',
        theologicalFocus: row.theologicalFocus ?? [],
        brandColors: row.brandColors ?? {
            primary: '#2563eb',
            secondary: '#64748b',
            accent: '#059669',
        },
        emailNotifications: row.emailNotifications ?? {
            dailyDigest: true,
            collaborationRequests: true,
            revenueReports: true,
            communityUpdates: true,
        },
        privacySettings: row.privacySettings ?? {
            publicProfile: true,
            showAssessmentResults: false,
            allowNetworking: true,
            shareAnalytics: false,
        },
        onboardingCompleted: row.onboardingCompleted ?? false,
        onboardingStep: row.onboardingStep ?? 1,
        accountStatus: row.accountStatus ?? 'pending_verification',
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        lastActiveAt: row.lastActiveAt.toISOString(),
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = userProfileEntitySchema.safeParse(entity);
        if (!validation.success) {
            throw new Error(`UserProfileEntity validation failed: ${validation.error.message}`);
        }
    }
    return entity;
}
/**
 * Map UserProfileRow with relations to UserProfileResponse (with computed fields)
 */
export function toUserProfileResponseDTO(row) {
    const entity = toUserProfileEntity(row);
    // Calculate APEST gifts from scores
    const apestScores = {
        apostolic: row.assessmentMovementAlignment ?? 0,
        prophetic: row.assessmentAudienceEngagement ?? 0,
        evangelistic: row.assessmentNetworkEffects ?? 0,
        shepherding: row.assessmentStrategicFit ?? 0,
        teaching: row.assessmentContentReadiness ?? 0,
    };
    const sortedScores = Object.entries(apestScores).sort(([, a], [, b]) => b - a);
    const primaryGift = sortedScores[0]?.[0];
    const secondaryGift = sortedScores[1]?.[0];
    // Format ministry experience
    const ministryExperience = row.yearsInMinistry
        ? `${row.yearsInMinistry} year${row.yearsInMinistry !== 1 ? 's' : ''} in ministry`
        : undefined;
    // Format location display
    const locationDisplay = row.countryCode && row.timezone
        ? `${row.countryCode} (${row.timezone})`
        : row.countryCode || row.timezone || undefined;
    const response = {
        ...entity,
        // Computed fields
        isActive: row.accountStatus === 'active',
        hasCompletedOnboarding: row.onboardingCompleted === true,
        fullName: `${row.firstName} ${row.lastName}`,
        displayNameOrFullName: row.displayName || `${row.firstName} ${row.lastName}`,
        hasCustomDomain: !!row.customDomain,
        hasSubdomain: !!row.subdomain,
        isPublicProfile: row.privacySettings?.publicProfile !== false,
        canReceiveNotifications: (row.emailNotifications?.dailyDigest ?? true) !== false,
        assessmentCompleted: !!row.assessmentTotal,
        primaryGift,
        secondaryGift,
        ministryExperience,
        locationDisplay,
        // Related data
        organization: row.organization,
        subscription: row.subscription,
    };
    // Validate against Zod schema in development
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = userProfileResponseSchema.safeParse(response);
        if (!validation.success) {
            throw new Error(`UserProfileResponse validation failed: ${validation.error.message}`);
        }
    }
    return response;
}
/**
 * Map CreateUserProfile to database insert format
 */
export function fromCreateUserProfile(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = createUserProfileSchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`CreateUserProfile validation failed: ${validation.error.message}`);
        }
    }
    return {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName ?? null,
        bio: data.bio ?? null,
        avatarUrl: data.avatarUrl ?? null,
        ministryRole: data.ministryRole,
        denomination: data.denomination ?? null,
        organizationName: data.organizationName ?? null,
        yearsInMinistry: data.yearsInMinistry ?? null,
        countryCode: data.countryCode ?? null,
        timezone: data.timezone ?? null,
        languagePrimary: data.languagePrimary ?? 'en',
        culturalContext: data.culturalContext ?? null,
        leaderTier: data.leaderTier ?? null,
        subdomain: data.subdomain ?? null,
        customDomain: data.customDomain ?? null,
        platformTitle: data.platformTitle ?? null,
        subscriptionTier: data.subscriptionTier ?? 'free',
        theologicalFocus: data.theologicalFocus ?? [],
        brandColors: data.brandColors ?? {
            primary: '#2563eb',
            secondary: '#64748b',
            accent: '#059669',
        },
        emailNotifications: data.emailNotifications ?? {
            dailyDigest: true,
            collaborationRequests: true,
            revenueReports: true,
            communityUpdates: true,
        },
        privacySettings: data.privacySettings ?? {
            publicProfile: true,
            showAssessmentResults: false,
            allowNetworking: true,
            shareAnalytics: false,
        },
        onboardingCompleted: data.onboardingCompleted ?? false,
        onboardingStep: data.onboardingStep ?? 1,
        accountStatus: data.accountStatus ?? 'pending_verification',
    };
}
/**
 * Map UpdateUserProfile to database update format
 */
export function fromUpdateUserProfile(data) {
    // Validate input data
    if (process.env['NODE_ENV'] === 'development' ||
        process.env['NODE_ENV'] === 'test') {
        const validation = updateUserProfileSchema.safeParse(data);
        if (!validation.success) {
            throw new Error(`UpdateUserProfile validation failed: ${validation.error.message}`);
        }
    }
    const updateData = {
        updatedAt: new Date(),
    };
    // Only include defined fields
    if (data.firstName !== undefined)
        updateData.firstName = data.firstName;
    if (data.lastName !== undefined)
        updateData.lastName = data.lastName;
    if (data.displayName !== undefined)
        updateData.displayName = data.displayName ?? null;
    if (data.bio !== undefined)
        updateData.bio = data.bio ?? null;
    if (data.avatarUrl !== undefined)
        updateData.avatarUrl = data.avatarUrl ?? null;
    if (data.ministryRole !== undefined)
        updateData.ministryRole = data.ministryRole;
    if (data.denomination !== undefined)
        updateData.denomination = data.denomination ?? null;
    if (data.organizationName !== undefined)
        updateData.organizationName = data.organizationName ?? null;
    if (data.yearsInMinistry !== undefined)
        updateData.yearsInMinistry = data.yearsInMinistry ?? null;
    if (data.countryCode !== undefined)
        updateData.countryCode = data.countryCode ?? null;
    if (data.timezone !== undefined)
        updateData.timezone = data.timezone ?? null;
    if (data.languagePrimary !== undefined)
        updateData.languagePrimary = data.languagePrimary;
    if (data.culturalContext !== undefined)
        updateData.culturalContext = data.culturalContext ?? null;
    if (data.leaderTier !== undefined)
        updateData.leaderTier = data.leaderTier ?? null;
    if (data.subdomain !== undefined)
        updateData.subdomain = data.subdomain ?? null;
    if (data.customDomain !== undefined)
        updateData.customDomain = data.customDomain ?? null;
    if (data.platformTitle !== undefined)
        updateData.platformTitle = data.platformTitle ?? null;
    if (data.subscriptionTier !== undefined)
        updateData.subscriptionTier = data.subscriptionTier;
    if (data.theologicalFocus !== undefined)
        updateData.theologicalFocus = data.theologicalFocus;
    if (data.brandColors !== undefined)
        updateData.brandColors = data.brandColors;
    if (data.emailNotifications !== undefined)
        updateData.emailNotifications = data.emailNotifications;
    if (data.privacySettings !== undefined)
        updateData.privacySettings = data.privacySettings;
    if (data.onboardingCompleted !== undefined)
        updateData.onboardingCompleted = data.onboardingCompleted;
    if (data.onboardingStep !== undefined)
        updateData.onboardingStep = data.onboardingStep;
    if (data.accountStatus !== undefined)
        updateData.accountStatus = data.accountStatus;
    return updateData;
}
/**
 * Map array of UserProfileRow to array of UserProfileEntity
 */
export function toUserProfileEntityArray(rows) {
    return rows.map(toUserProfileEntity);
}
/**
 * Map array of UserProfileRow to array of UserProfileResponse
 */
export function toUserProfileResponseArray(rows) {
    return rows.map(toUserProfileResponseDTO);
}
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Check if user profile is complete for onboarding
 */
export function isUserProfileComplete(profile) {
    return (profile.hasCompletedOnboarding === true &&
        !!profile.firstName &&
        !!profile.lastName &&
        !!profile.ministryRole &&
        profile.onboardingStep >= 5);
}
/**
 * Get user's display name with fallback
 */
export function getUserDisplayName(profile) {
    return profile.displayNameOrFullName;
}
/**
 * Get user's APEST profile summary
 */
export function getAPESTProfile(profile) {
    if (!profile.assessmentCompleted ||
        !profile.primaryGift ||
        !profile.secondaryGift) {
        return null;
    }
    return {
        primary: profile.primaryGift,
        secondary: profile.secondaryGift,
        scores: {
            apostolic: profile.assessmentMovementAlignment ?? 0,
            prophetic: profile.assessmentAudienceEngagement ?? 0,
            evangelistic: profile.assessmentNetworkEffects ?? 0,
            shepherding: profile.assessmentStrategicFit ?? 0,
            teaching: profile.assessmentContentReadiness ?? 0,
        },
    };
}
// ============================================================================
// MAPPER OBJECT
// ============================================================================
export const userProfileMapper = {
    toEntity: toUserProfileEntity,
    toResponse: toUserProfileResponseDTO,
    fromCreate: fromCreateUserProfile,
    fromUpdate: fromUpdateUserProfile,
    toEntityArray: toUserProfileEntityArray,
    toResponseArray: toUserProfileResponseArray,
    isComplete: isUserProfileComplete,
    getDisplayName: getUserDisplayName,
    getAPESTProfile,
};
// Legacy exports for backward compatibility
export const toUserProfileDTO = toUserProfileEntity;
export const toUserProfileListDTO = toUserProfileEntityArray;
//# sourceMappingURL=user-profiles.js.map