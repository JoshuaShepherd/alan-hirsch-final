import {
  culturalContextSchema,
  membershipRoleSchema,
  ministryRoleSchema,
  organizationTypeSchema,
} from '@/lib/contracts';
import { z } from 'zod';

// ============================================================================
// MINISTRY PLATFORM REQUEST SCHEMAS
// ============================================================================

// Ministry Platform Search Request
export const ministryPlatformSearchRequestSchema = z.object({
  // Base search parameters
  query: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

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
        'other',
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
        'ministry_collaboration',
        'regional_network',
      ])
    )
    .optional(),

  // Date filters
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),

  // Engagement filters
  minEngagement: z.coerce.number().min(0).max(1).optional(),
  hasComments: z.coerce.boolean().optional(),
  hasCollaborations: z.coerce.boolean().optional(),

  // Organization context
  organizationContext: z
    .object({
      organizationId: z.string().uuid(),
      userRole: membershipRoleSchema,
      permissions: z.array(z.string()),
    })
    .optional(),
});

// ============================================================================
// MINISTRY ASSESSMENT REQUEST SCHEMAS
// ============================================================================

export const createMinistryAssessmentRequestSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  assessmentType: z.enum([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),
  status: z
    .enum(['draft', 'active', 'archived', 'under_review'])
    .default('draft'),
  language: z.string().default('en'),
  culturalAdaptation: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
    ])
    .default('universal'),
  researchBacked: z.boolean().default(false),
  ministryContext: z.object({
    targetMinistryRoles: z.array(ministryRoleSchema).default([]),
    culturalAdaptations: z.array(culturalContextSchema).default(['global']),
    theologicalAlignment: z.array(z.string()).default([]),
    practicalApplication: z.array(z.string()).default([]),
  }),
  organizationId: z.string().uuid().optional(),
});

export const updateMinistryAssessmentRequestSchema =
  createMinistryAssessmentRequestSchema.partial();

export const startMinistryAssessmentRequestSchema = z.object({
  assessmentId: z.string().uuid(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid().optional(),
});

export const completeMinistryAssessmentRequestSchema = z.object({
  assessmentId: z.string().uuid(),
  userId: z.string().uuid(),
  responses: z.array(
    z.object({
      questionId: z.string().uuid(),
      answer: z.union([z.string(), z.number(), z.array(z.string())]),
      timeSpent: z.number().int().min(0).optional(),
    })
  ),
  completedAt: z.string().datetime(),
  organizationId: z.string().uuid().optional(),
});

// ============================================================================
// MINISTRY CONTENT REQUEST SCHEMAS
// ============================================================================

export const createMinistryContentRequestSchema = z.object({
  title: z.string().min(1).max(255),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  contentType: z.enum([
    'article',
    'video',
    'podcast',
    'framework',
    'tool',
    'case_study',
  ]),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .default('draft'),
  language: z.string().default('en'),
  difficultyLevel: z
    .enum(['beginner', 'intermediate', 'advanced', 'expert'])
    .default('intermediate'),
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
  categoryId: z.string().uuid().optional(),
  seriesId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
});

export const updateMinistryContentRequestSchema =
  createMinistryContentRequestSchema.partial();

// ============================================================================
// MINISTRY COMMUNITY REQUEST SCHEMAS
// ============================================================================

export const createMinistryCommunityRequestSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  communityType: z.enum([
    'general_discussion',
    'church_planting_cohort',
    'leadership_development',
    'theological_study',
    'ministry_collaboration',
    'regional_network',
  ]),
  status: z
    .enum(['active', 'inactive', 'archived', 'private'])
    .default('active'),
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
  organizationId: z.string().uuid().optional(),
  isPrivate: z.boolean().default(false),
});

export const updateMinistryCommunityRequestSchema =
  createMinistryCommunityRequestSchema.partial();

export const joinMinistryCommunityRequestSchema = z.object({
  communityId: z.string().uuid(),
  userId: z.string().uuid(),
  role: membershipRoleSchema.default('member'),
  organizationId: z.string().uuid().optional(),
});

// ============================================================================
// MINISTRY ORGANIZATION REQUEST SCHEMAS
// ============================================================================

export const createMinistryOrganizationRequestSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  organizationType: organizationTypeSchema,
  status: z
    .enum(['active', 'inactive', 'pending', 'suspended'])
    .default('active'),
  ministryFocus: z.array(z.string()).default([]),
  theologicalTradition: z.string().optional(),
  denominationalAffiliation: z.string().optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export const updateMinistryOrganizationRequestSchema =
  createMinistryOrganizationRequestSchema.partial();

export const inviteOrganizationMemberRequestSchema = z.object({
  email: z.string().email(),
  role: membershipRoleSchema.default('member'),
  ministryRole: ministryRoleSchema.optional(),
  message: z.string().max(500).optional(),
});

// ============================================================================
// MINISTRY ANALYTICS REQUEST SCHEMAS
// ============================================================================

export const ministryAnalyticsRequestSchema = z.object({
  organizationId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  metricTypes: z.array(z.string()).optional(),
  groupBy: z.enum(['day', 'week', 'month', 'quarter', 'year']).optional(),
  includeComparisons: z.boolean().default(false),
  includePredictions: z.boolean().default(false),
  filters: z.record(z.string(), z.any()).optional(),
});

// ============================================================================
// MINISTRY COLLABORATION REQUEST SCHEMAS
// ============================================================================

export const createMinistryCollaborationRequestSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  collaborationType: z.enum([
    'project',
    'study_group',
    'mentorship',
    'partnership',
  ]),
  status: z
    .enum(['planning', 'active', 'completed', 'cancelled'])
    .default('planning'),
  participants: z.array(z.string().uuid()).min(1),
  organizationId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const updateMinistryCollaborationRequestSchema =
  createMinistryCollaborationRequestSchema.partial();

// ============================================================================
// MINISTRY SUBSCRIPTION REQUEST SCHEMAS
// ============================================================================

export const createMinistrySubscriptionRequestSchema = z.object({
  planId: z.string().uuid(),
  organizationId: z.string().uuid(),
  billingCycle: z.enum(['monthly', 'yearly']).default('monthly'),
  paymentMethodId: z.string().optional(),
  couponCode: z.string().optional(),
});

export const updateMinistrySubscriptionRequestSchema = z.object({
  planId: z.string().uuid().optional(),
  billingCycle: z.enum(['monthly', 'yearly']).optional(),
  status: z
    .enum(['active', 'cancelled', 'past_due', 'unpaid', 'trialing', 'paused'])
    .optional(),
});

// ============================================================================
// MINISTRY USER PROFILE REQUEST SCHEMAS
// ============================================================================

export const updateMinistryUserProfileRequestSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  displayName: z.string().min(1).max(100).optional(),
  bio: z.string().max(1000).optional(),
  ministryRole: ministryRoleSchema.optional(),
  organizationId: z.string().uuid().optional(),
  culturalContext: culturalContextSchema.optional(),
  ministrySpecialization: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  ministryGoals: z.array(z.string()).optional(),
  website: z.string().url().optional(),
  socialMedia: z.record(z.string(), z.string()).optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type MinistryPlatformSearchRequest = z.infer<
  typeof ministryPlatformSearchRequestSchema
>;
export type CreateMinistryAssessmentRequest = z.infer<
  typeof createMinistryAssessmentRequestSchema
>;
export type UpdateMinistryAssessmentRequest = z.infer<
  typeof updateMinistryAssessmentRequestSchema
>;
export type StartMinistryAssessmentRequest = z.infer<
  typeof startMinistryAssessmentRequestSchema
>;
export type CompleteMinistryAssessmentRequest = z.infer<
  typeof completeMinistryAssessmentRequestSchema
>;
export type CreateMinistryContentRequest = z.infer<
  typeof createMinistryContentRequestSchema
>;
export type UpdateMinistryContentRequest = z.infer<
  typeof updateMinistryContentRequestSchema
>;
export type CreateMinistryCommunityRequest = z.infer<
  typeof createMinistryCommunityRequestSchema
>;
export type UpdateMinistryCommunityRequest = z.infer<
  typeof updateMinistryCommunityRequestSchema
>;
export type JoinMinistryCommunityRequest = z.infer<
  typeof joinMinistryCommunityRequestSchema
>;
export type CreateMinistryOrganizationRequest = z.infer<
  typeof createMinistryOrganizationRequestSchema
>;
export type UpdateMinistryOrganizationRequest = z.infer<
  typeof updateMinistryOrganizationRequestSchema
>;
export type InviteOrganizationMemberRequest = z.infer<
  typeof inviteOrganizationMemberRequestSchema
>;
export type MinistryAnalyticsRequest = z.infer<
  typeof ministryAnalyticsRequestSchema
>;
export type CreateMinistryCollaborationRequest = z.infer<
  typeof createMinistryCollaborationRequestSchema
>;
export type UpdateMinistryCollaborationRequest = z.infer<
  typeof updateMinistryCollaborationRequestSchema
>;
export type CreateMinistrySubscriptionRequest = z.infer<
  typeof createMinistrySubscriptionRequestSchema
>;
export type UpdateMinistrySubscriptionRequest = z.infer<
  typeof updateMinistrySubscriptionRequestSchema
>;
export type UpdateMinistryUserProfileRequest = z.infer<
  typeof updateMinistryUserProfileRequestSchema
>;
