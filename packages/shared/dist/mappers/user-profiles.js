/**
 * User Profile Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 */
/**
 * Map UserProfileRow to UserProfile
 */
export function toUserProfileDTO(row) {
    return {
        id: row.id,
        email: row.email,
        firstName: row.firstName ?? '',
        lastName: row.lastName ?? '',
        displayName: row.displayName ?? '',
        avatarUrl: row.avatarUrl ?? '',
        bio: row.bio ?? '',
        countryCode: row.countryCode ?? '',
        timezone: row.timezone ?? '',
        languagePrimary: row.languagePrimary ?? 'en',
        ministryRole: row.ministryRole,
        leaderTier: row.leaderTier ?? undefined,
        subscriptionTier: row.subscriptionTier ?? 'free',
        accountStatus: row.accountStatus ?? 'pending_verification',
        // Note: emailVerified, phoneVerified, twoFactorEnabled are not in the database schema
        // These would need to be added to the schema or removed from the DTO
        lastActiveAt: row.lastActiveAt,
        // Required properties for UserProfile type
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
        // Timestamps
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
/**
 * Map array of UserProfileRow to array of UserProfile
 */
export function toUserProfileListDTO(rows) {
    return rows.map(toUserProfileDTO);
}
//# sourceMappingURL=user-profiles.js.map