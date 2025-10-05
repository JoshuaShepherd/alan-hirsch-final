import type {
  CreateUserProfile,
  UpdateUserProfile,
  UserProfileEntity,
  UserProfileResponse,
} from '@platform/contracts';
import {
  userProfileEntitySchema,
  userProfileResponseSchema,
} from '@platform/contracts';
import type { UserProfile } from '@platform/database';

// ============================================================================
// USER PROFILE MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to UserProfileEntity
 */
export function toUserProfileEntity(row: UserProfile): UserProfileEntity {
  try {
    if (!row) {
      throw new Error('UserProfile is null or undefined');
    }
    const result = {
      // Core Identity
      id: row.id,
      email: row.email,
      passwordHash: row.passwordHash ?? undefined,
      firstName: row.firstName,
      lastName: row.lastName,
      displayName: row.displayName ?? undefined,
      bio: row.bio ?? undefined,
      avatarUrl: row.avatarUrl ?? undefined,

      // Ministry Context
      ministryRole: row.ministryRole,
      denomination: row.denomination ?? undefined,
      organizationName: row.organizationName ?? undefined,
      yearsInMinistry: row.yearsInMinistry ?? undefined,

      // Location & Cultural Context
      countryCode: row.countryCode ?? undefined,
      timezone: row.timezone ?? undefined,
      culturalContext: row.culturalContext ?? undefined,

      // APEST Assessment Scores
      assessmentMovementAlignment: row.assessmentMovementAlignment ?? undefined,
      assessmentAudienceEngagement:
        row.assessmentAudienceEngagement ?? undefined,
      assessmentContentReadiness: row.assessmentContentReadiness ?? undefined,
      assessmentRevenuePotential: row.assessmentRevenuePotential ?? undefined,
      assessmentNetworkEffects: row.assessmentNetworkEffects ?? undefined,
      assessmentStrategicFit: row.assessmentStrategicFit ?? undefined,
      assessmentTotal: row.assessmentTotal ?? undefined,

      // Leadership & Platform
      leaderTier: row.leaderTier ?? undefined,
      subdomain: row.subdomain ?? undefined,
      customDomain: row.customDomain ?? undefined,
      platformTitle: row.platformTitle ?? undefined,
      languagePrimary: row.languagePrimary ?? 'en',
      subscriptionTier: row.subscriptionTier ?? 'free',

      // Complex Fields (JSONB)
      theologicalFocus: Array.isArray(row.theologicalFocus)
        ? row.theologicalFocus
        : [],
      brandColors: row.brandColors || {
        accent: '#059669',
        primary: '#2563eb',
        secondary: '#64748b',
      },
      emailNotifications: row.emailNotifications || {
        dailyDigest: true,
        revenueReports: true,
        communityUpdates: true,
        collaborationRequests: true,
      },
      privacySettings: row.privacySettings || {
        publicProfile: true,
        shareAnalytics: false,
        allowNetworking: true,
        showAssessmentResults: false,
      },

      // Onboarding & Status
      onboardingCompleted: row.onboardingCompleted ?? false,
      onboardingStep: row.onboardingStep ?? 1,
      accountStatus: row.accountStatus ?? 'pending_verification',

      // Timestamps
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      lastActiveAt: row.lastActiveAt.toISOString(),
    };

    // Validate the result against the schema
    const validation = userProfileEntitySchema.safeParse(result);
    if (!validation.success) {
      console.error('Entity validation failed:', validation.error);
      throw new Error('Invalid entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error in toUserProfileEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowEmail: row?.email,
    });
    throw new Error(
      `Failed to transform UserProfileRow to UserProfileEntity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to UserProfileResponse with computed fields
 */
export function toUserProfileResponseDTO(
  row: UserProfile & {
    organization?: {
      id: string;
      name: string;
      slug: string;
      type: string;
    };
    subscription?: {
      id: string;
      planName: string;
      status: string;
      tier: string;
    };
  }
): UserProfileResponse {
  const entity = toUserProfileEntity(row);

  // Compute derived fields
  const fullName = `${row.firstName} ${row.lastName}`;
  const displayNameOrFullName = row.displayName || fullName;
  const isActive = row.accountStatus === 'active';
  const hasCompletedOnboarding = row.onboardingCompleted || false;
  const hasCustomDomain = !!row.customDomain;
  const hasSubdomain = !!row.subdomain;
  const isPublicProfile = row.privacySettings?.publicProfile !== false;
  const canReceiveNotifications =
    (row.emailNotifications?.dailyDigest ?? true) !== false;
  const assessmentCompleted = !!row.assessmentTotal;

  // Determine primary and secondary gifts from APEST scores
  const apestScores = {
    apostolic: row.assessmentMovementAlignment || 0,
    prophetic: row.assessmentAudienceEngagement || 0,
    evangelistic: row.assessmentNetworkEffects || 0,
    shepherding: row.assessmentStrategicFit || 0,
    teaching: row.assessmentContentReadiness || 0,
  };

  const sortedGifts = Object.entries(apestScores)
    .sort(([, a], [, b]) => b - a)
    .map(([gift]) => gift);

  const primaryGift = sortedGifts[0];
  const secondaryGift = sortedGifts[1];

  // Format ministry experience
  const ministryExperience = row.yearsInMinistry
    ? `${row.yearsInMinistry} year${row.yearsInMinistry !== 1 ? 's' : ''} in ministry`
    : undefined;

  // Format location display
  const locationDisplay = row.countryCode
    ? `${row.countryCode.toUpperCase()}${row.timezone ? ` (${row.timezone})` : ''}`
    : undefined;

  const result = {
    ...entity,

    // Computed fields
    isActive,
    hasCompletedOnboarding,
    fullName,
    displayNameOrFullName,
    hasCustomDomain,
    hasSubdomain,
    isPublicProfile,
    canReceiveNotifications,
    assessmentCompleted,
    primaryGift,
    secondaryGift,
    ministryExperience,
    locationDisplay,

    // Related data
    organization: row.organization,
    subscription: row.subscription,
  };

  // Validate the result against the schema
  const validation = userProfileResponseSchema.safeParse(result);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

/**
 * Transform CreateUserProfile to database insert format
 */
export function fromCreateUserProfile(
  data: CreateUserProfile
): Partial<UserProfile> {
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
    culturalContext: data.culturalContext ?? null,
    leaderTier: data.leaderTier ?? null,
    subdomain: data.subdomain ?? null,
    customDomain: data.customDomain ?? null,
    platformTitle: data.platformTitle ?? null,
    languagePrimary: data.languagePrimary ?? 'en',
    subscriptionTier: data.subscriptionTier ?? 'free',
    theologicalFocus: data.theologicalFocus ?? [],
    brandColors: data.brandColors || {
      accent: '#059669',
      primary: '#2563eb',
      secondary: '#64748b',
    },
    emailNotifications: data.emailNotifications || {
      dailyDigest: true,
      revenueReports: true,
      communityUpdates: true,
      collaborationRequests: true,
    },
    privacySettings: data.privacySettings || {
      publicProfile: true,
      shareAnalytics: false,
      allowNetworking: true,
      showAssessmentResults: false,
    },
    onboardingCompleted: data.onboardingCompleted ?? false,
    onboardingStep: data.onboardingStep ?? 1,
    accountStatus: data.accountStatus ?? 'pending_verification',
  };
}

/**
 * Transform UpdateUserProfile to database update format
 */
export function fromUpdateUserProfile(
  data: UpdateUserProfile
): Partial<UserProfile> {
  const updateData: Partial<UserProfile> = {};

  if (data.firstName !== undefined) updateData.firstName = data.firstName;
  if (data.lastName !== undefined) updateData.lastName = data.lastName;
  if (data.displayName !== undefined)
    updateData.displayName = data.displayName ?? null;
  if (data.bio !== undefined) updateData.bio = data.bio ?? null;
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
  if (data.timezone !== undefined) updateData.timezone = data.timezone ?? null;
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
  if (data.languagePrimary !== undefined)
    updateData.languagePrimary = data.languagePrimary;
  if (data.subscriptionTier !== undefined)
    updateData.subscriptionTier = data.subscriptionTier;
  if (data.theologicalFocus !== undefined)
    updateData.theologicalFocus = data.theologicalFocus;
  if (data.brandColors !== undefined) updateData.brandColors = data.brandColors;
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

  // Always update the updated_at timestamp
  updateData.updatedAt = new Date();

  return updateData;
}

/**
 * Transform multiple database rows to UserProfileResponse array
 */
export function toUserProfileResponseArray(
  rows: (UserProfile & {
    organization?: {
      id: string;
      name: string;
      slug: string;
      type: string;
    };
    subscription?: {
      id: string;
      planName: string;
      status: string;
      tier: string;
    };
  })[]
): UserProfileResponse[] {
  return rows.map(toUserProfileResponseDTO);
}

/**
 * Transform multiple database rows to UserProfileEntity array
 */
export function toUserProfileEntityArray(
  rows: UserProfile[]
): UserProfileEntity[] {
  return rows.map(toUserProfileEntity);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user profile is complete for onboarding
 */
export function isUserProfileComplete(profile: UserProfileResponse): boolean {
  return !!(
    profile.firstName &&
    profile.lastName &&
    profile.ministryRole &&
    profile.onboardingCompleted
  );
}

/**
 * Get user's display name with fallback
 */
export function getUserDisplayName(profile: UserProfileResponse): string {
  return profile.displayNameOrFullName || profile.fullName;
}

/**
 * Get user's APEST profile summary
 */
export function getAPESTProfile(profile: UserProfileResponse): {
  primary: string;
  secondary: string;
  scores: Record<string, number>;
} | null {
  if (!profile.assessmentCompleted) return null;

  const scores = {
    apostolic: profile.assessmentMovementAlignment || 0,
    prophetic: profile.assessmentAudienceEngagement || 0,
    evangelistic: profile.assessmentNetworkEffects || 0,
    shepherding: profile.assessmentStrategicFit || 0,
    teaching: profile.assessmentContentReadiness || 0,
  };

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);

  return {
    primary: sorted[0]?.[0] || 'unknown',
    secondary: sorted[1]?.[0] || 'unknown',
    scores,
  };
}

/**
 * Check if user has specific permission
 */
export function hasUserPermission(
  profile: UserProfileResponse,
  permission: string
): boolean {
  // This would be expanded based on your permission system
  return profile.isActive && profile.accountStatus === 'active';
}

/**
 * Get user's subscription status
 */
export function getUserSubscriptionStatus(profile: UserProfileResponse): {
  tier: string;
  isActive: boolean;
  isPremium: boolean;
} {
  const tier = profile.subscriptionTier || 'free';
  const { isActive } = profile;
  const isPremium = ['premium', 'vip', 'enterprise'].includes(tier);

  return { tier, isActive, isPremium };
}
