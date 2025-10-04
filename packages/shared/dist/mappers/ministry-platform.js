// ============================================================================
// MINISTRY ORGANIZATION MAPPER
// ============================================================================
export function toMinistryOrganizationDTO(org, totalMembers, activeMembers) {
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
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
        // Ministry-specific fields (extended from base)
        ministryFocus: [],
        theologicalTradition: undefined,
        denominationalAffiliation: undefined,
        // Organization metrics
        organizationMetrics: {
            totalMembers: totalMembers || 0,
            activeMembers: activeMembers || 0,
            totalContent: 0,
            totalAssessments: 0,
            averageEngagement: 0.75,
            growthRate: 0.1,
        },
        // Ministry capacity
        ministryCapacity: {
            maxContentCreators: org.maxUsers || 1,
            maxAssessments: undefined,
            maxCommunities: undefined,
            customBranding: false,
            apiAccess: false,
        },
    };
}
// ============================================================================
// MINISTRY USER PROFILE MAPPER
// ============================================================================
export function toMinistryUserProfileDTO(profile, organizationContext, includeMetrics = false) {
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
        subscriptionTier: profile.subscriptionTier,
        theologicalFocus: profile.theologicalFocus || [],
        brandColors: profile.brandColors || {
            primary: '#2563eb',
            secondary: '#64748b',
            accent: '#059669',
        },
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        // Organization context
        organizationContext,
        // Ministry-specific metrics
        ministryMetrics: {
            apestScores: {
                apostolic: profile.assessmentMovementAlignment || 0,
                prophetic: profile.assessmentAudienceEngagement || 0,
                evangelistic: profile.assessmentContentReadiness || 0,
                shepherding: profile.assessmentRevenuePotential || 0,
                teaching: profile.assessmentStrategicFit || 0,
            },
            contentMetrics: {
                totalContentCreated: 0,
                totalViews: 0,
                totalLikes: 0,
                totalShares: 0,
                engagementRate: 0.75,
                averageContentRating: 4.2,
            },
            communityMetrics: {
                communitiesJoined: 0,
                postsCreated: 0,
                commentsMade: 0,
                collaborationsParticipated: 0,
                networkConnections: 0,
            },
            learningMetrics: {
                assessmentsCompleted: 0,
                contentItemsCompleted: 0,
                learningStreak: 0,
                totalLearningTime: 0,
                certificatesEarned: 0,
            },
        },
        // Enhanced ministry context
        ministrySpecialization: [],
        targetAudience: [],
        ministryGoals: [],
        // Network effects
        networkAmplificationScore: 75, // TODO: Calculate from network metrics
        influenceRadius: 0,
        // Platform engagement
        platformEngagement: {
            lastActiveAt: profile.updatedAt,
            totalSessions: 0,
            averageSessionDuration: 0,
            favoriteContentTypes: [],
        },
    };
}
// ============================================================================
// MINISTRY CONTENT ITEM MAPPER
// ============================================================================
export function toMinistryContentItemDTO(content, includeMetrics = false) {
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
        publishedAt: content.publishedAt || undefined,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
        // Ministry-specific content context
        ministryContext: {
            targetMinistryRoles: [],
            theologicalDepth: 'intermediate',
            practicalApplication: 'practical',
            culturalRelevance: ['global'],
        },
        // Ministry impact metrics
        ministryImpact: {
            ministryEffectivenessScore: 0,
            leadershipDevelopmentValue: 0,
            theologicalAccuracy: 0,
            practicalApplicability: 0,
        },
        // Enhanced engagement tracking
        ministryEngagement: {
            ministryRoleEngagement: {},
            culturalContextEngagement: {},
            theologicalThemeEngagement: {},
            practicalApplicationEngagement: {},
        },
    };
}
// ============================================================================
// MINISTRY ASSESSMENT MAPPER
// ============================================================================
export function toMinistryAssessmentDTO(assessment, includeMetrics = false) {
    return {
        // Base assessment fields
        id: assessment.id,
        name: assessment.name,
        slug: assessment.slug,
        description: assessment.description || '',
        assessmentType: assessment.assessmentType,
        questionsCount: assessment.questionsCount,
        estimatedDuration: assessment.estimatedDuration || undefined,
        passingScore: assessment.passingScore || undefined,
        version: assessment.version || '1.0',
        language: assessment.language || 'en',
        culturalAdaptation: assessment.culturalAdaptation || 'universal',
        researchBacked: assessment.researchBacked || false,
        validityScore: assessment.validityScore
            ? Number(assessment.validityScore)
            : undefined,
        reliabilityScore: assessment.reliabilityScore
            ? Number(assessment.reliabilityScore)
            : undefined,
        instructions: assessment.instructions || '',
        scoringMethod: assessment.scoringMethod || 'likert_5',
        status: assessment.status || 'draft',
        publishedAt: assessment.publishedAt || undefined,
        createdAt: assessment.createdAt,
        updatedAt: assessment.updatedAt,
        // Ministry-specific assessment context
        ministryRelevance: {
            targetMinistryRoles: [],
            culturalAdaptations: [
                assessment.culturalAdaptation === 'universal'
                    ? 'global'
                    : assessment.culturalAdaptation || 'global',
            ],
            theologicalAlignment: [],
            practicalApplication: [],
        },
        // Enhanced scoring for ministry context
        ministryScoring: includeMetrics
            ? {
                leadershipPotential: 85,
                ministryEffectiveness: 80,
                culturalCompetency: 75,
                theologicalDepth: 90,
            }
            : {
                leadershipPotential: 0,
                ministryEffectiveness: 0,
                culturalCompetency: 0,
                theologicalDepth: 0,
            },
        // Usage analytics
        usageAnalytics: {
            totalCompletions: 0,
            averageCompletionTime: 0,
            completionRate: 0,
            userSatisfaction: 0,
        },
    };
}
// ============================================================================
// MINISTRY COMMUNITY MAPPER
// ============================================================================
export function toMinistryCommunityDTO(community, includeMetrics = false) {
    return {
        // Base community fields
        id: community.id,
        name: community.name,
        slug: community.slug,
        description: community.description || '',
        communityType: community.communityType,
        geographicFocus: community.geographicFocus || [],
        culturalContext: community.culturalContext || 'global',
        languagePrimary: community.languagePrimary || 'en',
        languagesSupported: community.languagesSupported || ['en'],
        visibility: community.visibility || 'public',
        joinApprovalRequired: community.joinApprovalRequired || false,
        maxMembers: community.maxMembers || undefined,
        allowGuestPosts: community.allowGuestPosts || false,
        moderationLevel: community.moderationLevel || 'moderated',
        currentMemberCount: community.currentMemberCount || 0,
        totalPostsCount: community.totalPostsCount || 0,
        guidelines: community.guidelines || undefined,
        rules: community.rules
            ? typeof community.rules === 'string'
                ? JSON.parse(community.rules)
                : community.rules
            : [],
        createdBy: community.createdBy,
        createdAt: community.createdAt,
        updatedAt: community.updatedAt,
        // Ministry-specific community context
        ministryContext: {
            targetMinistryRoles: [],
            theologicalFocus: [],
            ministryStage: 'developing',
            geographicScope: 'local',
        },
        // Ministry community metrics
        ministryMetrics: {
            activeMinistryLeaders: 0,
            ministryStageDistribution: {},
            theologicalDiversity: 0,
            geographicDiversity: 0,
            collaborationSuccess: 0,
        },
    };
}
// ============================================================================
// ORGANIZATION CONTEXT MAPPER
// ============================================================================
export function toOrganizationContextDTO(membership) {
    const permissions = membership.permissions && membership.permissions.length > 0
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
export function toAuthMinistryCombinedDTO(authUser, ministryProfile, organizationContext) {
    return {
        auth: {
            id: authUser.id,
            email: authUser.email,
            isAuthenticated: true,
        },
        profile: ministryProfile,
        organizationContext,
        permissions: organizationContext?.permissions || [],
        ministryTier: ministryProfile.ministryMetrics?.apestScores
            ? 'core'
            : 'basic',
    };
}
// ============================================================================
// ORGANIZATION SCOPED MAPPER
// ============================================================================
export function toOrganizationScopedDTO(data, organizationContext, userProfile) {
    return {
        data,
        organizationContext,
        userContext: {
            id: userProfile.id,
            role: organizationContext.userRole,
            permissions: organizationContext.permissions,
            ministryTier: userProfile.ministryMetrics?.apestScores ? 'core' : 'basic',
        },
        accessLevel: organizationContext.userRole,
    };
}
// ============================================================================
// FILTERING FUNCTIONS
// ============================================================================
export function filterByPlantTerritory(items, organizationContext) {
    if (!organizationContext) {
        // Return only public items when no organization context
        return items.filter(item => !item.organizationId);
    }
    // Return items that belong to the organization or are public
    return items.filter(item => !item.organizationId ||
        item.organizationId === organizationContext.organizationId);
}
export function filterByRolePermissions(items, organizationContext, permissionField = 'requiredPermission') {
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
export function applyRoleBasedVisibility(data, userRole, fieldPermissions) {
    const result = { ...data };
    Object.keys(fieldPermissions).forEach(field => {
        const allowedRoles = fieldPermissions[field];
        if (!allowedRoles.includes(userRole)) {
            delete result[field];
        }
    });
    return result;
}
export function getMinistryFieldPermissions() {
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
export function aggregateMinistryMetrics(userProfile, contentMetrics, communityMetrics, learningMetrics) {
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
function getUserPermissions(role) {
    const permissions = {
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
//# sourceMappingURL=ministry-platform.js.map