import type {
  CommunityRow,
  ContentItemRow,
  MinistryAssessment,
  MinistryCommunity,
  MinistryContentItem,
  MinistryOrganization,
  MinistryUserProfile,
  OrganizationMembershipRow,
  OrganizationRow,
  UserAssessmentRow,
  UserProfileRow,
} from '../contracts';

// ============================================================================
// MINISTRY ORGANIZATION MAPPER
// ============================================================================

export function toMinistryOrganizationDTO(
  org: OrganizationRow,
  totalMembers?: number,
  activeMembers?: number
): MinistryOrganization {
  return {
    // Base organization fields
    id: org.id,
    name: org.name,
    slug: org.slug,
    description: org.description || undefined,
    website: org.website || undefined,
    logoUrl: org.logoUrl || undefined,
    organizationType: org.organizationType,
    sizeCategory: org.sizeCategory || undefined,
    status: org.status || 'trial',
    contactEmail: org.contactEmail || undefined,
    contactPhone: org.contactPhone || undefined,
    address: org.address
      ? typeof org.address === 'string'
        ? JSON.parse(org.address)
        : org.address
      : undefined,
    accountOwnerId: org.accountOwnerId || undefined,
    licenseType: org.licenseType || 'individual',
    maxUsers: org.maxUsers || 1,
    billingEmail: org.billingEmail || undefined,
    createdAt: org.createdAt.toISOString(),
    updatedAt: org.updatedAt.toISOString(),

    // Note: Ministry-specific fields removed as they're not part of base organization schema

    // Note: organizationMetrics removed as it's not part of base organization schema

    // Note: ministryCapacity removed as it's not part of base organization schema
  };
}

// ============================================================================
// MINISTRY USER PROFILE MAPPER
// ============================================================================

export function toMinistryUserProfileDTO(
  profile: UserProfileRow,
  organizationContext?: any,
  includeMetrics: boolean = false
): MinistryUserProfile {
  return {
    // Base user profile fields
    id: profile.id,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    displayName: profile.displayName || '',
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl || '',
    ministryRole: profile.ministryRole,
    denomination: profile.denomination || undefined,
    organizationName: profile.organizationName || undefined,
    yearsInMinistry: profile.yearsInMinistry || undefined,
    countryCode: profile.countryCode || '',
    timezone: profile.timezone || '',
    languagePrimary: profile.languagePrimary || 'en',
    culturalContext: profile.culturalContext || undefined,
    leaderTier: profile.leaderTier || undefined,
    subscriptionTier: profile.subscriptionTier || 'free',
    theologicalFocus: profile.theologicalFocus || [],
    brandColors: profile.brandColors || {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#059669',
    },
    emailNotifications: profile.emailNotifications || {
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    },
    privacySettings: profile.privacySettings || {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
    onboardingCompleted: profile.onboardingCompleted || false,
    onboardingStep: profile.onboardingStep || 1,
    accountStatus: profile.accountStatus || 'pending_verification',
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
    lastActiveAt: profile.lastActiveAt.toISOString(),

    // Note: organizationContext removed as it's not part of user profile schema

    // Note: ministryMetrics removed as it's not part of base user profile schema

    // Note: Enhanced ministry context removed as it's not part of base user profile schema
  };
}

// ============================================================================
// MINISTRY CONTENT ITEM MAPPER
// ============================================================================

export function toMinistryContentItemDTO(
  content: ContentItemRow,
  includeMetrics: boolean = false
): MinistryContentItem {
  return {
    // Base content item fields
    id: content.id,
    title: content.title,
    slug: content.slug,
    excerpt: content.excerpt || '',
    content: content.content || '',
    contentType: content.contentType,
    format: content.format || 'text',
    status: content.status || 'draft',
    visibility: content.visibility || 'public',
    featuredImageUrl: content.featuredImageUrl || undefined,
    videoUrl: content.videoUrl || undefined,
    audioUrl: content.audioUrl || undefined,
    metaTitle: content.metaTitle || undefined,
    metaDescription: content.metaDescription || undefined,
    originalSource: content.originalSource || undefined,
    licenseType: content.licenseType || 'all_rights_reserved',
    primaryCategoryId: content.primaryCategoryId || undefined,
    secondaryCategories: content.secondaryCategories || [],
    tags: content.tags || [],
    theologicalThemes: content.theologicalThemes || [],
    authorId: content.authorId,
    coAuthors: content.coAuthors || [],
    wordCount: content.wordCount || undefined,
    estimatedReadingTime: content.estimatedReadingTime || undefined,
    viewCount: content.viewCount || 0,
    likeCount: content.likeCount || 0,
    shareCount: content.shareCount || 0,
    commentCount: content.commentCount || 0,
    bookmarkCount: content.bookmarkCount || 0,
    seriesId: content.seriesId || undefined,
    seriesOrder: content.seriesOrder ? Number(content.seriesOrder) : undefined,
    networkAmplificationScore: content.networkAmplificationScore
      ? Number(content.networkAmplificationScore)
      : 0,
    crossReferenceCount: content.crossReferenceCount
      ? Number(content.crossReferenceCount)
      : 0,
    aiEnhanced: content.aiEnhanced || false,
    aiSummary: content.aiSummary || undefined,
    aiKeyPoints: content.aiKeyPoints || [],
    attachments: content.attachments || [],
    canonicalUrl: content.canonicalUrl || undefined,
    scheduledAt: content.scheduledAt?.toISOString() || undefined,
    attributionRequired: content.attributionRequired || true,
    publishedAt: content.publishedAt?.toISOString() || undefined,
    createdAt: content.createdAt.toISOString(),
    updatedAt: content.updatedAt.toISOString(),

    // Note: ministryContext removed as it's not part of content schema

    // Ministry impact metrics
    // Note: ministryImpact removed as it's not part of base content schema

    // Note: ministryEngagement removed as it's not part of base content schema
  };
}

// ============================================================================
// MINISTRY ASSESSMENT MAPPER
// ============================================================================

export function toMinistryAssessmentDTO(
  userAssessment: UserAssessmentRow,
  includeMetrics: boolean = false
): MinistryAssessment {
  return {
    // Base user assessment fields
    id: userAssessment.id,
    userId: userAssessment.userId,
    assessmentId: userAssessment.assessmentId,
    startedAt: userAssessment.startedAt.toISOString(),
    completedAt: userAssessment.completedAt?.toISOString() || undefined,
    completionPercentage: userAssessment.completionPercentage || 0,
    rawScores: userAssessment.rawScores || undefined,
    totalScore: userAssessment.totalScore || undefined,
    maxPossibleScore: userAssessment.maxPossibleScore || undefined,
    apostolicScore: userAssessment.apostolicScore || undefined,
    propheticScore: userAssessment.propheticScore || undefined,
    evangelisticScore: userAssessment.evangelisticScore || undefined,
    shepherdingScore: userAssessment.shepherdingScore || undefined,
    teachingScore: userAssessment.teachingScore || undefined,
    normalizedScores: userAssessment.normalizedScores || undefined,
    primaryGift: userAssessment.primaryGift || undefined,
    secondaryGift: userAssessment.secondaryGift || undefined,
    responseConsistency: userAssessment.responseConsistency
      ? Number(userAssessment.responseConsistency)
      : undefined,
    completionTime: userAssessment.completionTime || undefined,
    confidenceLevel: userAssessment.confidenceLevel || undefined,
    culturalAdjustmentApplied:
      userAssessment.culturalAdjustmentApplied || false,
    culturalAdjustmentFactor: userAssessment.culturalAdjustmentFactor
      ? Number(userAssessment.culturalAdjustmentFactor)
      : undefined,
    aiInsights: userAssessment.aiInsights || undefined,
    personalizedRecommendations:
      userAssessment.personalizedRecommendations || undefined,
    suggestedPeers: userAssessment.suggestedPeers || [],
    complementaryGifts: userAssessment.complementaryGifts || [],
    createdAt: userAssessment.createdAt.toISOString(),
    updatedAt: userAssessment.updatedAt.toISOString(),

    // Note: Ministry-specific assessment context removed as it's not part of base user assessment schema
  };
}

// ============================================================================
// MINISTRY COMMUNITY MAPPER
// ============================================================================

export function toMinistryCommunityDTO(
  community: CommunityRow,
  includeMetrics: boolean = false
): MinistryCommunity {
  return {
    // Base community fields
    id: community.id,
    name: community.name,
    slug: community.slug,
    description: community.description || '',
    type: 'public' as const,
    status: community.status || 'active',
    memberCount: community.memberCount || 0,
    createdAt: community.createdAt.toISOString(),
    updatedAt: community.updatedAt.toISOString(),

    // Note: Ministry-specific community context removed as it's not part of base community schema
  };
}

// ============================================================================
// ORGANIZATION CONTEXT MAPPER
// ============================================================================

export function toOrganizationContextDTO(
  membership: OrganizationMembershipRow
) {
  const permissions =
    membership.permissions && membership.permissions.length > 0
      ? membership.permissions
      : getUserPermissions(membership.role);

  return {
    organizationId: membership.organizationId,
    userRole: membership.role,
    permissions,
    isOwner: membership.role === 'owner',
    isAdmin: ['owner', 'admin'].includes(membership.role),
    canManageUsers: permissions.includes('manage_users'),
    canManageContent: permissions.includes('manage_content'),
    canViewAnalytics: permissions.includes('view_analytics'),
    canManageSubscriptions: permissions.includes('manage_subscriptions'),
  };
}

// ============================================================================
// AUTH MINISTRY COMBINED MAPPER
// ============================================================================

export function toAuthMinistryCombinedDTO(
  authUser: { id: string; email: string },
  ministryProfile: MinistryUserProfile,
  organizationContext?: any
) {
  return {
    auth: {
      id: authUser.id,
      email: authUser.email,
      isAuthenticated: true,
    },
    profile: ministryProfile,
    organizationContext,
    permissions: organizationContext?.permissions || [],
    ministryTier: ministryProfile.assessmentMovementAlignment
      ? 'core'
      : 'basic',
  };
}

// ============================================================================
// ORGANIZATION SCOPED MAPPER
// ============================================================================

export function toOrganizationScopedDTO<T>(
  data: T,
  organizationContext: any,
  userProfile: MinistryUserProfile
) {
  return {
    data,
    organizationContext,
    userContext: {
      id: userProfile.id,
      role: organizationContext.userRole,
      permissions: organizationContext.permissions,
      ministryTier: userProfile.assessmentMovementAlignment ? 'core' : 'basic',
    },
    accessLevel: organizationContext.userRole,
  };
}

// ============================================================================
// FILTERING FUNCTIONS
// ============================================================================

export function filterByPlantTerritory<T extends { organizationId?: string }>(
  items: T[],
  organizationContext?: any
): T[] {
  if (!organizationContext) {
    // Return only public items when no organization context
    return items.filter(item => !item.organizationId);
  }

  // Return items that belong to the organization or are public
  return items.filter(
    item =>
      !item.organizationId ||
      item.organizationId === organizationContext.organizationId
  );
}

export function filterByRolePermissions<T extends Record<string, any>>(
  items: T[],
  organizationContext?: any,
  permissionField: string = 'requiredPermission'
): T[] {
  if (!organizationContext) {
    // Return all items when no organization context
    return items;
  }

  return items.filter(item => {
    const requiredPermission = item[permissionField];
    if (!requiredPermission) {
      return true; // No permission required
    }
    return organizationContext.permissions?.includes(requiredPermission);
  });
}

// ============================================================================
// ROLE-BASED VISIBILITY
// ============================================================================

export function applyRoleBasedVisibility<T extends Record<string, any>>(
  data: T,
  userRole: string,
  fieldPermissions: Record<string, string[]>
): T {
  const result = { ...data };

  Object.keys(fieldPermissions).forEach(field => {
    const allowedRoles = fieldPermissions[field];
    if (!allowedRoles.includes(userRole)) {
      delete result[field];
    }
  });

  return result;
}

export function getMinistryFieldPermissions(): Record<string, string[]> {
  return {
    email: ['owner', 'admin'],
    subscriptionTier: ['owner', 'admin'],
    ministryMetrics: ['owner', 'admin', 'member'],
    organizationContext: ['owner', 'admin', 'member'],
  };
}

// ============================================================================
// METRICS AGGREGATION
// ============================================================================

export function aggregateMinistryMetrics(
  userProfile: UserProfileRow,
  contentMetrics?: any,
  communityMetrics?: any,
  learningMetrics?: any
) {
  return {
    apestScores: {
      apostolic: userProfile.assessmentMovementAlignment || 0,
      prophetic: userProfile.assessmentAudienceEngagement || 0,
      evangelistic: userProfile.assessmentContentReadiness || 0,
      shepherding: userProfile.assessmentRevenuePotential || 0,
      teaching: userProfile.assessmentStrategicFit || 0,
    },
    contentMetrics: contentMetrics || {
      totalContentCreated: 0,
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      engagementRate: 0,
      averageContentRating: 0,
    },
    communityMetrics: communityMetrics || {
      communitiesJoined: 0,
      postsCreated: 0,
      commentsMade: 0,
      collaborationsParticipated: 0,
      networkConnections: 0,
    },
    learningMetrics: learningMetrics || {
      assessmentsCompleted: 0,
      contentItemsCompleted: 0,
      learningStreak: 0,
      totalLearningTime: 0,
      certificatesEarned: 0,
    },
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getUserPermissions(role: string): string[] {
  const permissions: Record<string, string[]> = {
    owner: [
      'manage_organization',
      'manage_users',
      'manage_content',
      'view_analytics',
      'manage_subscriptions',
      'delete_organization',
    ],
    admin: ['manage_users', 'manage_content', 'view_analytics'],
    member: ['manage_content'],
    viewer: [],
  };

  return permissions[role] || [];
}
