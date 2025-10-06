// Database Schemas for Alan Hirsch Digital Platform
// These schemas define the output types for database operations

import { z } from 'zod';

// ============================================================================
// USER PROFILE DATABASE SCHEMAS
// ============================================================================

export const databaseUserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  passwordHash: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  ministryRole: z.enum([
    'senior_pastor',
    'associate_pastor',
    'church_planter',
    'denominational_leader',
    'seminary_professor',
    'seminary_student',
    'ministry_staff',
    'missionary',
    'marketplace_minister',
    'nonprofit_leader',
    'consultant',
    'academic_researcher',
    'emerging_leader',
    'other',
  ]),
  denomination: z.string().nullable(),
  organizationName: z.string().nullable(),
  yearsInMinistry: z.number().int().nullable(),
  countryCode: z.string().nullable(),
  timezone: z.string().nullable(),
  languagePrimary: z.string(),
  culturalContext: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'mixed',
      'global',
    ])
    .nullable(),
  assessmentMovementAlignment: z.number().int().nullable(),
  assessmentAudienceEngagement: z.number().int().nullable(),
  assessmentContentReadiness: z.number().int().nullable(),
  assessmentRevenuePotential: z.number().int().nullable(),
  assessmentNetworkEffects: z.number().int().nullable(),
  assessmentStrategicFit: z.number().int().nullable(),
  assessmentTotal: z.number().int().nullable(),
  leaderTier: z.enum(['core', 'network', 'emerging', 'community']).nullable(),
  subdomain: z.string().nullable(),
  customDomain: z.string().nullable(),
  platformTitle: z.string().nullable(),
  subscriptionTier: z.enum([
    'free',
    'individual',
    'professional',
    'leader',
    'institutional',
  ]),
  theologicalFocus: z.array(z.string()),
  brandColors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
  emailNotifications: z.object({
    dailyDigest: z.boolean(),
    revenueReports: z.boolean(),
    communityUpdates: z.boolean(),
    collaborationRequests: z.boolean(),
  }),
  privacySettings: z.object({
    publicProfile: z.boolean(),
    shareAnalytics: z.boolean(),
    allowNetworking: z.boolean(),
    showAssessmentResults: z.boolean(),
  }),
  onboardingCompleted: z.boolean(),
  onboardingStep: z.number().int(),
  accountStatus: z.enum([
    'pending_verification',
    'active',
    'suspended',
    'deleted',
  ]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime(),
});

// ============================================================================
// ASSESSMENT DATABASE SCHEMAS
// ============================================================================

export const databaseAssessmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  assessmentType: z.enum([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),
  questionsCount: z.number().int(),
  estimatedDuration: z.number().int().nullable(),
  passingScore: z.number().int().nullable(),
  validityScore: z.string().nullable(), // decimal as string from database
  reliabilityScore: z.string().nullable(), // decimal as string from database
  instructions: z.string().nullable(),
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

export const databaseAssessmentQuestionSchema = z.object({
  id: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionText: z.string(),
  questionType: z.enum([
    'likert',
    'multiple_choice',
    'binary',
    'ranking',
    'text',
  ]),
  orderIndex: z.number().int(),
  isRequired: z.boolean(),
  category: z.string().nullable(),
  weight: z.string(), // decimal as string from database
  reverseScored: z.boolean(),
  apestDimension: z
    .enum(['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'])
    .nullable(),
  options: z.array(z.string()).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const databaseAssessmentResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.union([z.string(), z.number(), z.boolean()]),
  responseText: z.string().nullable(),
  timeSpent: z.number().int().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const databaseUserAssessmentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  status: z.enum(['not_started', 'in_progress', 'completed', 'abandoned']),
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  completionPercentage: z.number(),
  rawScores: z.record(z.string(), z.number()).nullable(),
  totalScore: z.number().int().nullable(),
  maxPossibleScore: z.number().int().nullable(),
  apostolicScore: z.number().int().nullable(),
  propheticScore: z.number().int().nullable(),
  evangelisticScore: z.number().int().nullable(),
  shepherdingScore: z.number().int().nullable(),
  teachingScore: z.number().int().nullable(),
  responseConsistency: z.string().nullable(), // decimal as string from database
  confidenceLevel: z.string().nullable(), // decimal as string from database
  personalizedRecommendations: z.array(z.string()).nullable(),
  complementaryGifts: z.array(z.string()).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ORGANIZATION DATABASE SCHEMAS
// ============================================================================

export const databaseOrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  website: z.string().nullable(),
  logoUrl: z.string().nullable(),
  organizationType: z.enum([
    'other',
    'denomination',
    'church',
    'seminary',
    'ministry_network',
    'nonprofit',
    'business',
  ]),
  sizeCategory: z
    .enum(['small', 'startup', 'medium', 'large', 'enterprise'])
    .nullable(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
  address: z
    .object({
      street: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      country: z.string().nullable(),
      postalCode: z.string().nullable(),
    })
    .nullable(),
  billingEmail: z.string().nullable(),
  accountOwnerId: z.string().uuid().nullable(),
  licenseType: z.enum(['individual', 'team', 'enterprise']),
  maxUsers: z.number().int(),
  status: z.enum(['trial', 'active', 'suspended', 'cancelled']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const databaseOrganizationMembershipSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['owner', 'admin', 'member', 'viewer']),
  permissions: z.array(z.string()),
  status: z.enum(['active', 'inactive', 'cancelled', 'pending']),
  joinedAt: z.string().datetime().nullable(),
  invitedAt: z.string().datetime().nullable(),
  invitedBy: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// CONTENT DATABASE SCHEMAS
// ============================================================================

export const databaseContentItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string().nullable(),
  authorId: z.string().uuid(),
  coAuthors: z.array(
    z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string().nullable(),
    })
  ),
  contentType: z.enum([
    'article',
    'video',
    'audio',
    'podcast',
    'course',
    'book',
  ]),
  format: z.enum(['text', 'markdown', 'html', 'video', 'audio']),
  wordCount: z.number().int().nullable(),
  estimatedReadingTime: z.number().int().nullable(),
  viewCount: z.number().int(),
  likeCount: z.number().int(),
  shareCount: z.number().int(),
  commentCount: z.number().int(),
  bookmarkCount: z.number().int(),
  primaryCategoryId: z.string().uuid().nullable(),
  secondaryCategories: z.array(z.string().uuid()),
  tags: z.array(z.string()),
  theologicalThemes: z.array(z.string()),
  seriesId: z.string().uuid().nullable(),
  seriesOrder: z.number().int().nullable(),
  visibility: z.enum(['public', 'private', 'unlisted']),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']),
  networkAmplificationScore: z.number(),
  crossReferenceCount: z.number().int(),
  aiEnhanced: z.boolean(),
  aiSummary: z.string().nullable(),
  aiKeyPoints: z.array(z.string()),
  featuredImageUrl: z.string().nullable(),
  videoUrl: z.string().nullable(),
  audioUrl: z.string().nullable(),
  attachments: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      type: z.string(),
      size: z.number().int(),
    })
  ),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  canonicalUrl: z.string().nullable(),
  originalSource: z.string().nullable(),
  publishedAt: z.string().datetime().nullable(),
  scheduledAt: z.string().datetime().nullable(),
  licenseType: z.enum([
    'all_rights_reserved',
    'creative_commons',
    'public_domain',
  ]),
  attributionRequired: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const databaseContentCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentCategoryId: z.string().uuid().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const databaseContentSeriesSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  authorId: z.string().uuid(),
  totalEpisodes: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// COMMUNITY DATABASE SCHEMAS
// ============================================================================

export const databaseCommunitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Export types
export type DatabaseUserProfile = z.infer<typeof databaseUserProfileSchema>;
export type DatabaseAssessment = z.infer<typeof databaseAssessmentSchema>;
export type DatabaseAssessmentQuestion = z.infer<
  typeof databaseAssessmentQuestionSchema
>;
export type DatabaseAssessmentResponse = z.infer<
  typeof databaseAssessmentResponseSchema
>;
export type DatabaseUserAssessment = z.infer<
  typeof databaseUserAssessmentSchema
>;
export type DatabaseOrganization = z.infer<typeof databaseOrganizationSchema>;
export type DatabaseOrganizationMembership = z.infer<
  typeof databaseOrganizationMembershipSchema
>;
export type DatabaseContentItem = z.infer<typeof databaseContentItemSchema>;
export type DatabaseContentCategory = z.infer<
  typeof databaseContentCategorySchema
>;
export type DatabaseContentSeries = z.infer<typeof databaseContentSeriesSchema>;
export type DatabaseCommunity = z.infer<typeof databaseCommunitySchema>;
