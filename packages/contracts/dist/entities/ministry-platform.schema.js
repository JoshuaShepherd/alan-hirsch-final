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
//# sourceMappingURL=ministry-platform.schema.js.map