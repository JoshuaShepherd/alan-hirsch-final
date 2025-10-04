import { z } from 'zod';
import { ministryAssessmentSchema, ministryCommunitySchema, ministryContentItemSchema, ministryMetricsSchema, ministryOrganizationSchema, ministryUserProfileSchema, } from '../../validations/ministry-platform';
import { culturalContextSchema, membershipRoleSchema, ministryRoleSchema, } from '../../validations/shared';
// ============================================================================
// MINISTRY PLATFORM RESPONSE SCHEMAS
// ============================================================================
// Base ministry platform response schema
export const ministryPlatformResponseSchema = (dataSchema) => z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),
    ministryContext: z
        .object({
        userMinistryRole: ministryRoleSchema.optional(),
        organizationContext: z
            .object({
            organizationId: z.string().uuid(),
            userRole: membershipRoleSchema,
            permissions: z.array(z.string()),
        })
            .optional(),
        culturalContext: culturalContextSchema.optional(),
        permissions: z.array(z.string()).default([]),
    })
        .optional(),
    metadata: z.object({
        requestId: z.string().uuid(),
        timestamp: z.string().datetime(),
        version: z.string(),
        processingTime: z.number().min(0).optional(),
    }),
});
// Ministry platform error response schema
export const ministryPlatformErrorResponseSchema = z.object({
    error: z.string(),
    message: z.string().optional(),
    code: z.string(),
    ministryContext: z
        .object({
        organizationId: z.string().uuid().optional(),
        userRole: membershipRoleSchema.optional(),
        requiredPermissions: z.array(z.string()).optional(),
        suggestedActions: z.array(z.string()).optional(),
    })
        .optional(),
    details: z.any().optional(),
    success: z.literal(false),
    timestamp: z.string().datetime(),
});
// Ministry platform paginated response schema
export const ministryPaginatedResponseSchema = (itemSchema) => ministryPlatformResponseSchema(z.object({
    items: z.array(itemSchema),
    pagination: z.object({
        page: z.number().int(),
        limit: z.number().int(),
        total: z.number().int(),
        totalPages: z.number().int(),
        hasNext: z.boolean(),
        hasPrev: z.boolean(),
    }),
    ministryMetrics: z
        .object({
        totalMinistryLeaders: z.number().int().optional(),
        averageEngagement: z.number().min(0).max(1).optional(),
        culturalDistribution: z
            .record(z.string(), z.number().int())
            .optional(),
        ministryRoleDistribution: z
            .record(z.string(), z.number().int())
            .optional(),
    })
        .optional(),
}));
// ============================================================================
// MINISTRY USER PROFILE RESPONSE SCHEMAS
// ============================================================================
export const ministryUserProfileResponseSchema = ministryPlatformResponseSchema(ministryUserProfileSchema);
export const ministryUserProfileListResponseSchema = ministryPaginatedResponseSchema(ministryUserProfileSchema);
// ============================================================================
// MINISTRY ORGANIZATION RESPONSE SCHEMAS
// ============================================================================
export const ministryOrganizationResponseSchema = ministryPlatformResponseSchema(ministryOrganizationSchema);
export const ministryOrganizationListResponseSchema = ministryPaginatedResponseSchema(ministryOrganizationSchema);
export const ministryOrganizationMembershipResponseSchema = ministryPlatformResponseSchema(z.object({
    membershipId: z.string().uuid(),
    userId: z.string().uuid(),
    organizationId: z.string().uuid(),
    role: membershipRoleSchema,
    status: z.enum(['active', 'inactive', 'pending', 'suspended']),
    joinedAt: z.string().datetime(),
    user: ministryUserProfileSchema.pick({
        id: true,
        firstName: true,
        lastName: true,
        displayName: true,
        ministryRole: true,
        avatarUrl: true,
    }),
}));
// ============================================================================
// MINISTRY ASSESSMENT RESPONSE SCHEMAS
// ============================================================================
export const ministryAssessmentResponseSchema = ministryPlatformResponseSchema(ministryAssessmentSchema);
export const ministryAssessmentListResponseSchema = ministryPaginatedResponseSchema(ministryAssessmentSchema);
export const ministryAssessmentWithQuestionsResponseSchema = ministryPlatformResponseSchema(ministryAssessmentSchema.extend({
    questions: z.array(z.object({
        id: z.string().uuid(),
        questionText: z.string(),
        questionType: z.enum([
            'multiple_choice',
            'text',
            'rating',
            'boolean',
        ]),
        options: z.array(z.string()).optional(),
        required: z.boolean().default(true),
        order: z.number().int(),
    })),
}));
export const ministryUserAssessmentResponseSchema = ministryPlatformResponseSchema(z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    assessmentId: z.string().uuid(),
    status: z.enum(['started', 'in_progress', 'completed', 'abandoned']),
    startedAt: z.string().datetime(),
    completedAt: z.string().datetime().optional(),
    score: z.number().optional(),
    results: z.record(z.string(), z.any()).optional(),
    assessment: ministryAssessmentSchema.pick({
        id: true,
        name: true,
        description: true,
        assessmentType: true,
        ministryRelevance: true,
    }),
    user: ministryUserProfileSchema.pick({
        id: true,
        firstName: true,
        lastName: true,
        displayName: true,
        ministryRole: true,
    }),
}));
// ============================================================================
// MINISTRY CONTENT RESPONSE SCHEMAS
// ============================================================================
export const ministryContentItemResponseSchema = ministryPlatformResponseSchema(ministryContentItemSchema);
export const ministryContentItemListResponseSchema = ministryPaginatedResponseSchema(ministryContentItemSchema);
// ============================================================================
// MINISTRY COMMUNITY RESPONSE SCHEMAS
// ============================================================================
export const ministryCommunityResponseSchema = ministryPlatformResponseSchema(ministryCommunitySchema);
export const ministryCommunityListResponseSchema = ministryPaginatedResponseSchema(ministryCommunitySchema);
// ============================================================================
// MINISTRY METRICS RESPONSE SCHEMAS
// ============================================================================
export const ministryMetricsResponseSchema = ministryPlatformResponseSchema(ministryMetricsSchema);
export const aggregatedMinistryMetricsResponseSchema = ministryPlatformResponseSchema(z.object({
    overall: ministryMetricsSchema,
    byMinistryRole: z.record(z.string(), ministryMetricsSchema),
    byCulturalContext: z.record(z.string(), ministryMetricsSchema),
    byOrganization: z.record(z.string(), ministryMetricsSchema),
    trends: z.object({
        growth: z.number(),
        engagement: z.number(),
        retention: z.number(),
        satisfaction: z.number(),
    }),
}));
// ============================================================================
// MINISTRY DASHBOARD RESPONSE SCHEMAS
// ============================================================================
export const ministryDashboardResponseSchema = ministryPlatformResponseSchema(z.object({
    userMetrics: ministryMetricsSchema,
    organizationMetrics: z.object({
        totalMembers: z.number().int(),
        activeMembers: z.number().int(),
        totalContent: z.number().int(),
        totalAssessments: z.number().int(),
        averageEngagement: z.number().min(0).max(1),
        growthRate: z.number().min(-1).max(1),
    }),
    recentActivity: z.array(z.object({
        id: z.string().uuid(),
        type: z.enum([
            'content_created',
            'assessment_completed',
            'community_joined',
            'collaboration_started',
        ]),
        title: z.string(),
        description: z.string(),
        timestamp: z.string().datetime(),
        user: ministryUserProfileSchema.pick({
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatarUrl: true,
        }),
    })),
    recommendations: z.array(z.object({
        type: z.enum(['content', 'assessment', 'community', 'collaboration']),
        title: z.string(),
        description: z.string(),
        reason: z.string(),
        priority: z.enum(['low', 'medium', 'high']),
        actionUrl: z.string().url().optional(),
    })),
}));
// ============================================================================
// MINISTRY SUBSCRIPTION RESPONSE SCHEMAS
// ============================================================================
export const ministrySubscriptionPlanResponseSchema = ministryPlatformResponseSchema(z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    billingCycle: z.enum(['monthly', 'yearly']),
    features: z.array(z.string()),
    ministryCapacity: z.object({
        maxContentCreators: z.number().int().min(0).optional(),
        maxAssessments: z.number().int().min(0).optional(),
        maxCommunities: z.number().int().min(0).optional(),
        customBranding: z.boolean().default(false),
        apiAccess: z.boolean().default(false),
    }),
    isPopular: z.boolean().default(false),
    isRecommended: z.boolean().default(false),
}));
// ============================================================================
// MINISTRY COLLABORATION RESPONSE SCHEMAS
// ============================================================================
export const ministryCollaborationResponseSchema = ministryPlatformResponseSchema(z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    collaborationType: z.enum([
        'project',
        'study_group',
        'mentorship',
        'partnership',
    ]),
    status: z.enum(['planning', 'active', 'completed', 'cancelled']),
    participants: z.array(ministryUserProfileSchema.pick({
        id: true,
        firstName: true,
        lastName: true,
        displayName: true,
        ministryRole: true,
        avatarUrl: true,
    })),
    organizationId: z.string().uuid().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
}));
// ============================================================================
// MINISTRY AUTH COMBINED RESPONSE SCHEMAS
// ============================================================================
export const authMinistryCombinedResponseSchema = ministryPlatformResponseSchema(z.object({
    user: ministryUserProfileSchema,
    organization: ministryOrganizationSchema.optional(),
    permissions: z.array(z.string()),
    ministryContext: z.object({
        userMinistryRole: ministryRoleSchema,
        organizationContext: z
            .object({
            organizationId: z.string().uuid(),
            userRole: membershipRoleSchema,
            permissions: z.array(z.string()),
        })
            .optional(),
        culturalContext: culturalContextSchema,
    }),
    session: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
        expiresAt: z.string().datetime(),
    }),
}));
// ============================================================================
// MINISTRY ORGANIZATION SCOPED RESPONSE SCHEMAS
// ============================================================================
export const organizationScopedResponseSchema = (dataSchema) => ministryPlatformResponseSchema(z.object({
    data: dataSchema,
    organizationContext: z.object({
        organizationId: z.string().uuid(),
        userRole: membershipRoleSchema,
        permissions: z.array(z.string()),
        isOwner: z.boolean(),
        isAdmin: z.boolean(),
        canManageUsers: z.boolean(),
        canManageContent: z.boolean(),
        canViewAnalytics: z.boolean(),
        canManageSubscriptions: z.boolean(),
    }),
}));
// ============================================================================
// MINISTRY ROLE-BASED VISIBILITY RESPONSE SCHEMAS
// ============================================================================
export const roleBasedVisibilityResponseSchema = (dataSchema) => ministryPlatformResponseSchema(z.object({
    data: dataSchema,
    fieldPermissions: z.record(z.string(), z.boolean()),
    visibleFields: z.array(z.string()),
    hiddenFields: z.array(z.string()),
}));
// ============================================================================
// MINISTRY PLANT FILTERED RESPONSE SCHEMAS
// ============================================================================
export const plantFilteredResponseSchema = (dataSchema) => ministryPlatformResponseSchema(z.object({
    data: dataSchema,
    plantContext: z.object({
        isPlant: z.boolean(),
        plantStage: z
            .enum(['exploring', 'developing', 'established', 'multiplying'])
            .optional(),
        plantMetrics: z
            .object({
            totalPlants: z.number().int(),
            activePlants: z.number().int(),
            averageGrowth: z.number().min(0).max(1),
        })
            .optional(),
    }),
}));
//# sourceMappingURL=ministry-platform.response.js.map