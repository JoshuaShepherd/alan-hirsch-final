// API Schemas for Alan Hirsch Digital Platform
// These schemas define public-facing data structures for API responses

import { z } from 'zod';

// ============================================================================
// PUBLIC USER PROFILE API SCHEMAS
// ============================================================================

export const publicUserProfileApiSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),

  // Ministry context (public info only)
  ministryRole: z.string(),
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().positive().optional(),

  // Location & cultural context
  countryCode: z.string().length(2).optional(),
  timezone: z.string().optional(),
  culturalContext: z.string().optional(),

  // APEST assessment scores (public if user allows)
  assessmentMovementAlignment: z.number().int().min(0).max(100).optional(),
  assessmentAudienceEngagement: z.number().int().min(0).max(100).optional(),
  assessmentContentReadiness: z.number().int().min(0).max(100).optional(),
  assessmentRevenuePotential: z.number().int().min(0).max(100).optional(),
  assessmentNetworkEffects: z.number().int().min(0).max(100).optional(),
  assessmentStrategicFit: z.number().int().min(0).max(100).optional(),
  assessmentTotal: z.number().int().min(0).max(500).optional(),

  // Leadership & platform (public info)
  leaderTier: z.string().optional(),
  platformTitle: z.string().optional(),
  languagePrimary: z.string(),
  subscriptionTier: z.string(),

  // Public preferences
  theologicalFocus: z.array(z.string()),

  // Computed fields for API
  isActive: z.boolean(),
  hasCompletedOnboarding: z.boolean(),
  fullName: z.string(),
  displayNameOrFullName: z.string(),
  hasCustomDomain: z.boolean(),
  hasSubdomain: z.boolean(),
  isPublicProfile: z.boolean(),
  assessmentCompleted: z.boolean(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  ministryExperience: z.string().optional(),
  locationDisplay: z.string().optional(),

  // Related data
  organization: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      type: z.string(),
    })
    .optional(),
  subscription: z
    .object({
      id: z.string().uuid(),
      planName: z.string(),
      status: z.string(),
      tier: z.string(),
    })
    .optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime(),
});

// ============================================================================
// PUBLIC CONTENT ITEM API SCHEMAS
// ============================================================================

export const publicContentItemApiSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),

  // Author information
  authorId: z.string().uuid(),
  author: z
    .object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string().optional(),
      avatarUrl: z.string().url().optional(),
    })
    .optional(),
  coAuthors: z
    .array(
      z.object({
        id: z.string().uuid(),
        firstName: z.string(),
        lastName: z.string(),
        displayName: z.string().optional(),
      })
    )
    .default([]),

  // Content classification
  contentType: z.enum([
    'article',
    'video',
    'audio',
    'podcast',
    'course',
    'book',
  ]),
  format: z.enum(['text', 'markdown', 'html', 'video', 'audio']),

  // Content metrics
  wordCount: z.number().int().positive().optional(),
  estimatedReadingTime: z.number().int().positive().optional(),

  // Engagement metrics
  viewCount: z.number().int().min(0),
  likeCount: z.number().int().min(0),
  shareCount: z.number().int().min(0),
  commentCount: z.number().int().min(0),
  bookmarkCount: z.number().int().min(0),

  // Categorization
  primaryCategoryId: z.string().uuid().optional(),
  primaryCategory: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .optional(),
  secondaryCategories: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),

  // Series information
  seriesId: z.string().uuid().optional(),
  series: z
    .object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
      totalEpisodes: z.number().int(),
    })
    .optional(),
  seriesOrder: z.number().int().positive().optional(),

  // Visibility & status
  visibility: z.enum(['public', 'private', 'unlisted']),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']),

  // AI enhancement
  networkAmplificationScore: z.number().min(0).max(10),
  crossReferenceCount: z.number().int().min(0),
  aiEnhanced: z.boolean(),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).default([]),

  // Media & attachments
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
        size: z.number().int().positive(),
      })
    )
    .default([]),

  // SEO & metadata
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  originalSource: z.string().optional(),

  // Publication & scheduling
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),

  // Licensing
  licenseType: z.enum([
    'all_rights_reserved',
    'creative_commons',
    'public_domain',
  ]),
  attributionRequired: z.boolean(),

  // Computed fields for API
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  isScheduled: z.boolean(),
  hasFeaturedImage: z.boolean(),
  viewCountText: z.string(),
  engagementScore: z.number().min(0).max(10),
  readingTimeText: z.string(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// PUBLIC ASSESSMENT API SCHEMAS
// ============================================================================

export const publicAssessmentApiSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  assessmentType: z.enum([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),
  questionsCount: z.number().int().positive(),
  estimatedDuration: z.number().int().positive().optional(),
  passingScore: z.number().int().min(0).optional(),
  validityScore: z.number().min(0).max(1).optional(),
  reliabilityScore: z.number().min(0).max(1).optional(),
  instructions: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  version: z.string(),
  language: z.string(),
  culturalAdaptation: z.enum([
    'western',
    'eastern',
    'african',
    'latin_american',
    'middle_eastern',
    'oceanic',
    'universal',
  ]),
  researchBacked: z.boolean(),
  scoringMethod: z.enum([
    'likert_5',
    'likert_7',
    'binary',
    'ranking',
    'weighted',
  ]),
  status: z.enum(['draft', 'active', 'archived', 'under_review']),

  // Computed fields for API
  isActive: z.boolean(),
  isPublished: z.boolean(),
  durationText: z.string().optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// PUBLIC ORGANIZATION API SCHEMAS
// ============================================================================

export const publicOrganizationApiSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  organizationType: z.string(),
  sizeCategory: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
  billingEmail: z.string().email().optional(),
  accountOwnerId: z.string().uuid().optional(),
  licenseType: z.enum(['individual', 'team', 'enterprise']),
  maxUsers: z.number().int().positive(),
  status: z.enum(['trial', 'active', 'suspended', 'cancelled']),

  // Computed fields for API
  isActive: z.boolean(),
  isTrial: z.boolean(),
  hasCustomLogo: z.boolean(),
  hasWebsite: z.boolean(),
  memberCount: z.number().int().optional(),
  displayName: z.string(),
  statusDisplay: z.string(),
  licenseTypeDisplay: z.string(),

  // Related data
  owner: z
    .object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
    })
    .optional(),
  members: z
    .array(
      z.object({
        id: z.string().uuid(),
        userId: z.string().uuid(),
        role: z.string(),
        status: z.string(),
        joinedAt: z.string().datetime(),
        user: z.object({
          id: z.string().uuid(),
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
        }),
      })
    )
    .optional(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// PUBLIC COMMUNITY API SCHEMAS
// ============================================================================

export const publicCommunityApiSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  communityType: z.enum([
    'general_discussion',
    'church_planting_cohort',
    'leadership_development',
    'theological_study',
    'regional_network',
    'ministry_focus',
    'apest_group',
  ]),
  visibility: z.enum(['public', 'private', 'unlisted']),
  memberCount: z.number().int(),
  isActive: z.boolean(),

  // Computed fields for API
  isPublic: z.boolean(),
  isPrivate: z.boolean(),
  memberCountText: z.string(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// API RESPONSE WRAPPER SCHEMAS
// ============================================================================

export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const paginatedApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.unknown()),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
  }),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
});

// ============================================================================
// SEARCH API SCHEMAS
// ============================================================================

export const searchQueryApiSchema = z.object({
  query: z.string().min(1).max(255),
  types: z
    .array(z.enum(['users', 'content', 'communities', 'assessments']))
    .default(['users', 'content', 'communities']),
  contentType: z
    .array(
      z.enum([
        'article',
        'video',
        'audio',
        'podcast',
        'book',
        'course',
        'webinar',
        'other',
      ])
    )
    .optional(),
  communityType: z.array(z.string()).optional(),
  assessmentType: z
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
  countryCode: z.string().length(2).optional(),
  culturalContext: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const searchResultApiSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['user', 'content', 'community', 'assessment']),
  title: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  relevanceScore: z.number().min(0).max(1),
  metadata: z.record(z.unknown()).optional(),
});

// Export types
export type PublicUserProfileApi = z.infer<typeof publicUserProfileApiSchema>;
export type PublicContentItemApi = z.infer<typeof publicContentItemApiSchema>;
export type PublicAssessmentApi = z.infer<typeof publicAssessmentApiSchema>;
export type PublicOrganizationApi = z.infer<typeof publicOrganizationApiSchema>;
export type PublicCommunityApi = z.infer<typeof publicCommunityApiSchema>;
export type ApiResponse<T = unknown> = z.infer<typeof apiResponseSchema> & {
  data?: T;
};
export type PaginatedApiResponse<T = unknown> = z.infer<
  typeof paginatedApiResponseSchema
> & {
  data: T[];
};
export type ApiError = z.infer<typeof apiErrorSchema>;
export type SearchQueryApi = z.infer<typeof searchQueryApiSchema>;
export type SearchResultApi = z.infer<typeof searchResultApiSchema>;
