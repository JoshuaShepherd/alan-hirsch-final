import { z } from 'zod';
import { assessmentSchema } from './assessments';
import { organizationSchema, userProfileSchema } from './auth';
import { communitySchema } from './community';
import { contentItemSchema } from './content';
import {
  culturalContextSchema,
  membershipRoleSchema,
  ministryRoleSchema,
  organizationTypeSchema,
} from './shared';

// ============================================================================
// MINISTRY PLATFORM INTEGRATION SCHEMAS
// ============================================================================

// Organization-scoped data transfer objects with proper role-based access
export const organizationContextSchema = z.object({
  organizationId: z.string().uuid(),
  userRole: membershipRoleSchema,
  permissions: z.array(z.string()),
  isOwner: z.boolean(),
  isAdmin: z.boolean(),
  canManageUsers: z.boolean(),
  canManageContent: z.boolean(),
  canViewAnalytics: z.boolean(),
  canManageSubscriptions: z.boolean(),
});

// Ministry-specific computed fields
export const ministryMetricsSchema = z.object({
  // APEST Assessment Scores (0-100 scale)
  apestScores: z.object({
    apostolic: z.number().int().min(0).max(100),
    prophetic: z.number().int().min(0).max(100),
    evangelistic: z.number().int().min(0).max(100),
    shepherding: z.number().int().min(0).max(100),
    teaching: z.number().int().min(0).max(100),
  }),

  // Content Engagement Metrics
  contentMetrics: z.object({
    totalContentCreated: z.number().int().min(0),
    totalViews: z.number().int().min(0),
    totalLikes: z.number().int().min(0),
    totalShares: z.number().int().min(0),
    engagementRate: z.number().min(0).max(1), // 0-1 scale
    averageContentRating: z.number().min(0).max(5),
  }),

  // Community Activity
  communityMetrics: z.object({
    communitiesJoined: z.number().int().min(0),
    postsCreated: z.number().int().min(0),
    commentsMade: z.number().int().min(0),
    collaborationsParticipated: z.number().int().min(0),
    networkConnections: z.number().int().min(0),
  }),

  // Learning Progress
  learningMetrics: z.object({
    assessmentsCompleted: z.number().int().min(0),
    contentItemsCompleted: z.number().int().min(0),
    learningStreak: z.number().int().min(0), // days
    totalLearningTime: z.number().int().min(0), // minutes
    certificatesEarned: z.number().int().min(0),
  }),
});

// ============================================================================
// ENHANCED USER PROFILE WITH MINISTRY CONTEXT
// ============================================================================

export const ministryUserProfileSchema = userProfileSchema.extend({
  // Organization context
  organizationContext: organizationContextSchema.optional(),

  // Ministry-specific metrics
  ministryMetrics: ministryMetricsSchema,

  // Enhanced ministry context
  ministrySpecialization: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  ministryGoals: z.array(z.string()).default([]),

  // Network effects
  networkAmplificationScore: z.number().min(0).max(100).default(0),
  influenceRadius: z.number().int().min(0).default(0), // number of connections

  // Platform engagement
  platformEngagement: z.object({
    lastActiveAt: z.date(),
    totalSessions: z.number().int().min(0),
    averageSessionDuration: z.number().int().min(0), // minutes
    favoriteContentTypes: z.array(z.string()).default([]),
  }),
});

// ============================================================================
// ENHANCED ORGANIZATION WITH MINISTRY FOCUS
// ============================================================================

export const ministryOrganizationSchema = organizationSchema.extend({
  // Ministry-specific organization details
  ministryFocus: z.array(z.string()).default([]),
  theologicalTradition: z.string().optional(),
  denominationalAffiliation: z.string().optional(),

  // Organization metrics
  organizationMetrics: z.object({
    totalMembers: z.number().int().min(0),
    activeMembers: z.number().int().min(0),
    totalContent: z.number().int().min(0),
    totalAssessments: z.number().int().min(0),
    averageEngagement: z.number().min(0).max(1),
    growthRate: z.number().min(-1).max(1), // -1 to 1 scale
  }),

  // Ministry capacity
  ministryCapacity: z.object({
    maxContentCreators: z.number().int().min(0).optional(),
    maxAssessments: z.number().int().min(0).optional(),
    maxCommunities: z.number().int().min(0).optional(),
    customBranding: z.boolean().default(false),
    apiAccess: z.boolean().default(false),
  }),
});

// ============================================================================
// ENHANCED ASSESSMENT WITH MINISTRY CONTEXT
// ============================================================================

export const ministryAssessmentSchema = assessmentSchema.extend({
  // Ministry-specific assessment context
  ministryRelevance: z.object({
    targetMinistryRoles: z.array(ministryRoleSchema).default([]),
    culturalAdaptations: z.array(culturalContextSchema).default(['global']),
    theologicalAlignment: z.array(z.string()).default([]),
    practicalApplication: z.array(z.string()).default([]),
  }),

  // Enhanced scoring for ministry context
  ministryScoring: z.object({
    leadershipPotential: z.number().int().min(0).max(100).optional(),
    ministryEffectiveness: z.number().int().min(0).max(100).optional(),
    culturalCompetency: z.number().int().min(0).max(100).optional(),
    theologicalDepth: z.number().int().min(0).max(100).optional(),
  }),

  // Usage analytics
  usageAnalytics: z.object({
    totalCompletions: z.number().int().min(0).default(0),
    averageCompletionTime: z.number().int().min(0).optional(),
    completionRate: z.number().min(0).max(1).default(0),
    userSatisfaction: z.number().min(0).max(5).optional(),
  }),
});

// ============================================================================
// ENHANCED CONTENT WITH MINISTRY FOCUS
// ============================================================================

export const ministryContentItemSchema = contentItemSchema.extend({
  // Ministry-specific content context
  ministryContext: z.object({
    targetMinistryRoles: z.array(ministryRoleSchema).default([]),
    theologicalDepth: z
      .enum(['introductory', 'intermediate', 'advanced', 'scholarly'])
      .default('intermediate'),
    practicalApplication: z
      .enum(['theory', 'practical', 'hands_on', 'case_study'])
      .default('practical'),
    culturalRelevance: z.array(culturalContextSchema).default(['global']),
  }),

  // Ministry impact metrics
  ministryImpact: z.object({
    ministryEffectivenessScore: z.number().int().min(0).max(100).default(0),
    leadershipDevelopmentValue: z.number().int().min(0).max(100).default(0),
    theologicalAccuracy: z.number().int().min(0).max(100).default(0),
    practicalApplicability: z.number().int().min(0).max(100).default(0),
  }),

  // Enhanced engagement tracking
  ministryEngagement: z.object({
    ministryRoleEngagement: z.record(z.string(), z.number().int().min(0)),
    culturalContextEngagement: z.record(z.string(), z.number().int().min(0)),
    theologicalThemeEngagement: z.record(z.string(), z.number().int().min(0)),
    practicalApplicationEngagement: z.record(
      z.string(),
      z.number().int().min(0)
    ),
  }),
});

// ============================================================================
// ENHANCED COMMUNITY WITH MINISTRY FOCUS
// ============================================================================

export const ministryCommunitySchema = communitySchema.extend({
  // Ministry-specific community context
  ministryContext: z.object({
    targetMinistryRoles: z.array(ministryRoleSchema).default([]),
    theologicalFocus: z.array(z.string()).default([]),
    ministryStage: z
      .enum(['exploring', 'developing', 'established', 'multiplying'])
      .default('developing'),
    geographicScope: z
      .enum(['local', 'regional', 'national', 'global'])
      .default('local'),
  }),

  // Ministry community metrics
  ministryMetrics: z.object({
    activeMinistryLeaders: z.number().int().min(0).default(0),
    ministryStageDistribution: z.record(z.string(), z.number().int().min(0)),
    theologicalDiversity: z.number().min(0).max(1).default(0),
    geographicDiversity: z.number().min(0).max(1).default(0),
    collaborationSuccess: z.number().min(0).max(100).default(0),
  }),
});

// ============================================================================
// MINISTRY PLATFORM API REQUEST SCHEMAS
// ============================================================================

// Organization-scoped requests
export const organizationScopedRequestSchema = z.object({
  organizationId: z.string().uuid(),
  includeMetrics: z.boolean().default(false),
  includeRelations: z.array(z.string()).default([]),
});

// Ministry-specific search and filter schemas
export const ministrySearchSchema = z.object({
  // Base search
  query: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),

  // Ministry-specific filters
  ministryRoles: z.array(ministryRoleSchema).optional(),
  culturalContexts: z.array(culturalContextSchema).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  organizationTypes: z.array(organizationTypeSchema).optional(),

  // Content-specific filters
  contentTypes: z
    .array(
      z.enum(['article', 'video', 'podcast', 'framework', 'tool', 'case_study'])
    )
    .optional(),
  difficultyLevels: z
    .array(z.enum(['beginner', 'intermediate', 'advanced', 'expert']))
    .optional(),

  // Assessment-specific filters
  assessmentTypes: z
    .array(
      z.enum([
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
      ])
    )
    .optional(),

  // Community-specific filters
  communityTypes: z
    .array(
      z.enum([
        'general_discussion',
        'church_planting_cohort',
        'leadership_development',
        'theological_study',
      ])
    )
    .optional(),
});

// ============================================================================
// MINISTRY PLATFORM VALIDATION UTILITIES
// ============================================================================

// Role-based field visibility validation
export const roleBasedValidationSchema = z.object({
  userRole: membershipRoleSchema,
  organizationContext: organizationContextSchema.optional(),
  fieldPermissions: z.record(z.string(), z.boolean()),
});

// Cross-entity validation schemas
export const crossEntityValidationSchema = z.object({
  // Content must belong to user/organization
  contentOwnership: z.object({
    contentId: z.string().uuid(),
    authorId: z.string().uuid(),
    organizationId: z.string().uuid().optional(),
    userHasAccess: z.boolean(),
  }),

  // Assessments require user profiles
  assessmentEligibility: z.object({
    assessmentId: z.string().uuid(),
    userId: z.string().uuid(),
    userProfileComplete: z.boolean(),
    prerequisitesMet: z.boolean(),
    canTakeAssessment: z.boolean(),
  }),

  // Organization membership validation
  organizationAccess: z.object({
    organizationId: z.string().uuid(),
    userId: z.string().uuid(),
    hasActiveMembership: z.boolean(),
    membershipRole: membershipRoleSchema.optional(),
    hasRequiredPermissions: z.boolean(),
  }),
});

// ============================================================================
// MINISTRY PLATFORM RESPONSE SCHEMAS
// ============================================================================

// Enhanced response with ministry context
export const ministryPlatformResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),

    // Ministry-specific metadata
    ministryContext: z
      .object({
        userMinistryRole: ministryRoleSchema.optional(),
        organizationContext: organizationContextSchema.optional(),
        culturalContext: culturalContextSchema.optional(),
        permissions: z.array(z.string()).default([]),
      })
      .optional(),

    // Enhanced metadata
    metadata: z.object({
      requestId: z.string().uuid(),
      timestamp: z.string().datetime(),
      version: z.string(),
      processingTime: z.number().min(0).optional(),
    }),
  });

// Ministry-specific paginated response
export const ministryPaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  ministryPlatformResponseSchema(
    z.object({
      items: z.array(itemSchema),
      pagination: z.object({
        page: z.number().int(),
        limit: z.number().int(),
        total: z.number().int(),
        totalPages: z.number().int(),
        hasNext: z.boolean(),
        hasPrev: z.boolean(),
      }),

      // Ministry-specific pagination metadata
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
    })
  );

// ============================================================================
// MINISTRY PLATFORM ERROR SCHEMAS
// ============================================================================

export const ministryPlatformErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  code: z.string(),

  // Ministry-specific error context
  ministryContext: z
    .object({
      organizationId: z.string().uuid().optional(),
      userRole: membershipRoleSchema.optional(),
      requiredPermissions: z.array(z.string()).optional(),
      suggestedActions: z.array(z.string()).optional(),
    })
    .optional(),

  // Standard error fields
  details: z.any().optional(),
  success: z.literal(false),
  timestamp: z.string().datetime(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type OrganizationContext = z.infer<typeof organizationContextSchema>;
export type MinistryMetrics = z.infer<typeof ministryMetricsSchema>;
export type MinistryUserProfile = z.infer<typeof ministryUserProfileSchema>;
export type MinistryOrganization = z.infer<typeof ministryOrganizationSchema>;
export type MinistryAssessment = z.infer<typeof ministryAssessmentSchema>;
export type MinistryContentItem = z.infer<typeof ministryContentItemSchema>;
export type MinistryCommunity = z.infer<typeof ministryCommunitySchema>;
export type OrganizationScopedRequest = z.infer<
  typeof organizationScopedRequestSchema
>;
export type MinistrySearch = z.infer<typeof ministrySearchSchema>;
export type RoleBasedValidation = z.infer<typeof roleBasedValidationSchema>;
export type CrossEntityValidation = z.infer<typeof crossEntityValidationSchema>;
export type MinistryPlatformError = z.infer<typeof ministryPlatformErrorSchema>;

// Generic response types
export type MinistryPlatformResponse<T> = z.infer<
  ReturnType<typeof ministryPlatformResponseSchema<z.ZodType<T>>>
>;
export type MinistryPaginatedResponse<T> = z.infer<
  ReturnType<typeof ministryPaginatedResponseSchema<z.ZodType<T>>>
>;
