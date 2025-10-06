import { z } from 'zod';
import { movementMetricEntitySchema } from './analytics.schema';
import { userAssessmentEntitySchema } from './assessment.schema';
import { communityEntitySchema } from './community.schema';
import { contentItemEntitySchema } from './content.schema';
import { organizationEntitySchema } from './organization.schema';
import { userProfileEntitySchema } from './user.schema';

// ============================================================================
// MINISTRY PLATFORM SCHEMAS
// ============================================================================
// Schemas specific to ministry platform functionality

// Cross-entity validation schema for ministry platform operations
export const crossEntityValidationSchema = z.object({
  userId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  assessmentId: z.string().uuid().optional(),
  contentId: z.string().uuid().optional(),
  validatePermissions: z.boolean().default(true),
  validateOwnership: z.boolean().default(true),
  contentOwnership: z
    .object({
      contentId: z.string().uuid(),
      userId: z.string().uuid(),
      isOwner: z.boolean(),
      userHasAccess: z.boolean(),
      canEdit: z.boolean(),
    })
    .optional(),
  assessmentEligibility: z
    .object({
      assessmentId: z.string().uuid(),
      userId: z.string().uuid(),
      isEligible: z.boolean(),
      canTakeAssessment: z.boolean(),
      hasCompleted: z.boolean(),
    })
    .optional(),
  organizationAccess: z
    .object({
      organizationId: z.string().uuid(),
      userId: z.string().uuid(),
      hasActiveMembership: z.boolean(),
      membershipRole: z.string(),
      hasRequiredPermissions: z.boolean(),
    })
    .optional(),
});

// Ministry platform error schema
export const ministryPlatformErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
  requestId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
});

// Organization-scoped request schema
export const organizationScopedRequestSchema = z.object({
  organizationId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  permissions: z.array(z.string()).optional(),
  includeInactive: z.boolean().default(false),
});

// Role-based validation schema
export const roleBasedValidationSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  requiredRoles: z.array(z.string()),
  requiredPermissions: z.array(z.string()).optional(),
  allowInherited: z.boolean().default(true),
});

// Ministry paginated response schema
export const ministryPaginatedResponseSchema = z.object({
  data: z.array(z.unknown()),
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1).max(100),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  }),
  meta: z
    .object({
      timestamp: z.string().datetime(),
      requestId: z.string().uuid().optional(),
    })
    .optional(),
});

// Ministry platform response schema
export const ministryPlatformResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: ministryPlatformErrorSchema.optional(),
  meta: z
    .object({
      timestamp: z.string().datetime(),
      requestId: z.string().uuid().optional(),
      version: z.string().optional(),
    })
    .optional(),
});

// Type exports
export type CrossEntityValidation = z.infer<typeof crossEntityValidationSchema>;
export type MinistryPlatformError = z.infer<typeof ministryPlatformErrorSchema>;
export type OrganizationScopedRequest = z.infer<
  typeof organizationScopedRequestSchema
>;
export type RoleBasedValidation = z.infer<typeof roleBasedValidationSchema>;
export type MinistryPaginatedResponse = z.infer<
  typeof ministryPaginatedResponseSchema
>;
export type MinistryPlatformResponse = z.infer<
  typeof ministryPlatformResponseSchema
>;

// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================

// Ministry platform specific schemas
export const ministryAssessmentSchema = userAssessmentEntitySchema; // Alias for user assessments
export const ministryCommunitySchema = communityEntitySchema; // Alias for communities
export const ministryContentItemSchema = contentItemEntitySchema; // Alias for content items
export const ministryMetricsSchema = movementMetricEntitySchema; // Alias for movement metrics
export const ministryOrganizationSchema = organizationEntitySchema; // Alias for organizations
export const ministryUserProfileSchema = userProfileEntitySchema; // Alias for user profiles

// Type aliases for backward compatibility
export type MinistryAssessment = z.infer<typeof userAssessmentEntitySchema>;
export type MinistryCommunity = z.infer<typeof communityEntitySchema>;
export type MinistryContentItem = z.infer<typeof contentItemEntitySchema>;
export type MinistryMetrics = z.infer<typeof movementMetricEntitySchema>;
export type MinistryOrganization = z.infer<typeof organizationEntitySchema>;
export type MinistryUserProfile = z.infer<typeof userProfileEntitySchema>;
export type OrganizationContext = z.infer<typeof organizationEntitySchema>;

// ============================================================================
// MINISTRY RESPONSE SCHEMAS
// ============================================================================
// Response schemas for ministry platform API endpoints

// Ministry user profile response schema
export const ministryUserProfileResponseSchema = z.object({
  data: ministryUserProfileSchema,
  success: z.boolean(),
  message: z.string(),
  ministryContext: z.object({
    userMinistryRole: z.string(),
    organizationContext: z.object({
      organizationId: z.string().uuid(),
      userRole: z.string(),
      permissions: z.array(z.string()),
      isOwner: z.boolean(),
      isAdmin: z.boolean(),
      canManageUsers: z.boolean(),
      canManageContent: z.boolean(),
      canViewAnalytics: z.boolean(),
      canManageSubscriptions: z.boolean(),
    }),
    culturalContext: z.string(),
    permissions: z.array(z.string()),
  }),
  metadata: z.object({
    requestId: z.string().uuid(),
    timestamp: z.string().datetime(),
    version: z.string(),
    processingTime: z.number().optional(),
  }),
});

// Ministry organization response schema
export const ministryOrganizationResponseSchema = z.object({
  data: ministryOrganizationSchema,
  success: z.boolean(),
  message: z.string(),
  metadata: z.object({
    requestId: z.string().uuid(),
    timestamp: z.string().datetime(),
    version: z.string(),
  }),
});

// Ministry assessment response schema
export const ministryAssessmentResponseSchema = z.object({
  data: ministryAssessmentSchema,
  success: z.boolean(),
  message: z.string(),
  metadata: z.object({
    requestId: z.string().uuid(),
    timestamp: z.string().datetime(),
    version: z.string(),
  }),
});

// Ministry dashboard response schema
export const ministryDashboardResponseSchema = z.object({
  data: z.object({
    userMetrics: ministryMetricsSchema,
    organizationMetrics: z.object({
      totalMembers: z.number().int().min(0),
      activeMembers: z.number().int().min(0),
      totalContent: z.number().int().min(0),
      totalAssessments: z.number().int().min(0),
      averageEngagement: z.number().min(0).max(1),
      growthRate: z.number().min(-1).max(1),
    }),
    recentActivity: z.array(
      z.object({
        id: z.string().uuid(),
        type: z.string(),
        title: z.string(),
        description: z.string(),
        timestamp: z.string().datetime(),
        user: z.object({
          id: z.string().uuid(),
          firstName: z.string(),
          lastName: z.string(),
          displayName: z.string(),
          avatarUrl: z.string().url().optional(),
        }),
      })
    ),
    recommendations: z.array(
      z.object({
        type: z.string(),
        title: z.string(),
        description: z.string(),
        reason: z.string(),
        priority: z.enum(['low', 'medium', 'high']),
        actionUrl: z.string().url(),
      })
    ),
  }),
  success: z.boolean(),
  message: z.string(),
  metadata: z.object({
    requestId: z.string().uuid(),
    timestamp: z.string().datetime(),
    version: z.string(),
  }),
});

// Type exports for response schemas
export type MinistryUserProfileResponse = z.infer<
  typeof ministryUserProfileResponseSchema
>;
export type MinistryOrganizationResponse = z.infer<
  typeof ministryOrganizationResponseSchema
>;
export type MinistryAssessmentResponse = z.infer<
  typeof ministryAssessmentResponseSchema
>;
export type MinistryDashboardResponse = z.infer<
  typeof ministryDashboardResponseSchema
>;
