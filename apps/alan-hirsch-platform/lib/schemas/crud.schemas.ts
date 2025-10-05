// CRUD Schemas for Alan Hirsch Digital Platform
// These schemas define the input/output types for database operations

import { z } from 'zod';

// ============================================================================
// USER PROFILE SCHEMAS
// ============================================================================

export const newUserProfileSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
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
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().positive().optional(),
  countryCode: z.string().length(2).optional(),
  timezone: z.string().optional(),
  languagePrimary: z.string().default('en'),
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
    .optional(),
  subscriptionTier: z
    .enum(['free', 'individual', 'professional', 'leader', 'institutional'])
    .default('free'),
  theologicalFocus: z.array(z.string()).default([]),
  brandColors: z
    .object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    })
    .default({ primary: '#2563eb', secondary: '#64748b', accent: '#059669' }),
  emailNotifications: z
    .object({
      dailyDigest: z.boolean().default(true),
      revenueReports: z.boolean().default(true),
      communityUpdates: z.boolean().default(true),
      collaborationRequests: z.boolean().default(true),
    })
    .default({}),
  privacySettings: z
    .object({
      publicProfile: z.boolean().default(true),
      shareAnalytics: z.boolean().default(false),
      allowNetworking: z.boolean().default(true),
      showAssessmentResults: z.boolean().default(false),
    })
    .default({}),
  onboardingCompleted: z.boolean().default(false),
  onboardingStep: z.number().int().min(1).max(10).default(1),
  accountStatus: z
    .enum(['pending_verification', 'active', 'suspended', 'deleted'])
    .default('pending_verification'),
});

export const updateUserProfileSchema = newUserProfileSchema
  .partial()
  .omit({ email: true });

export const queryUserProfileSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  ministryRole: z.string().optional(),
  countryCode: z.string().optional(),
  subscriptionTier: z.string().optional(),
  accountStatus: z.string().optional(),
  sortBy: z
    .enum([
      'email',
      'firstName',
      'lastName',
      'ministryRole',
      'assessmentTotal',
      'createdAt',
      'updatedAt',
      'lastActiveAt',
    ])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  includeOrganization: z.boolean().default(false),
  includeSubscription: z.boolean().default(false),
});

// ============================================================================
// ASSESSMENT SCHEMAS
// ============================================================================

export const newAssessmentSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
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
  version: z.string().default('1.0'),
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
  scoringMethod: z
    .enum(['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'])
    .default('likert_5'),
  status: z
    .enum(['draft', 'active', 'archived', 'under_review'])
    .default('draft'),
});

export const updateAssessmentSchema = newAssessmentSchema
  .partial()
  .omit({ slug: true });

export const queryAssessmentSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  assessmentType: z.string().optional(),
  status: z.string().optional(),
  sortBy: z
    .enum([
      'name',
      'assessmentType',
      'questionsCount',
      'createdAt',
      'updatedAt',
    ])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const newAssessmentQuestionSchema = z.object({
  assessmentId: z.string().uuid(),
  questionText: z.string().min(1),
  questionType: z.enum([
    'likert',
    'multiple_choice',
    'binary',
    'ranking',
    'text',
  ]),
  orderIndex: z.number().int().positive(),
  isRequired: z.boolean().default(true),
  category: z.string().optional(),
  weight: z.number().min(0).max(1).default(1.0),
  reverseScored: z.boolean().default(false),
  apestDimension: z
    .enum(['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'])
    .optional(),
  options: z.array(z.string()).optional(),
});

export const updateAssessmentQuestionSchema = newAssessmentQuestionSchema
  .partial()
  .omit({ assessmentId: true });

export const queryAssessmentQuestionSchema = z.object({
  assessmentId: z.string().uuid().optional(),
  category: z.string().optional(),
  questionType: z.string().optional(),
  apestDimension: z.string().optional(),
  sortBy: z
    .enum(['orderIndex', 'questionText', 'category'])
    .default('orderIndex'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const newAssessmentResponseSchema = z.object({
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  questionId: z.string().uuid(),
  responseValue: z.union([z.string(), z.number(), z.boolean()]),
  responseText: z.string().optional(),
  timeSpent: z.number().int().positive().optional(),
});

export const updateAssessmentResponseSchema = newAssessmentResponseSchema
  .partial()
  .omit({ userId: true, assessmentId: true, questionId: true });

export const queryAssessmentResponseSchema = z.object({
  userId: z.string().uuid().optional(),
  assessmentId: z.string().uuid().optional(),
  questionId: z.string().uuid().optional(),
  sortBy: z.enum(['createdAt', 'responseValue']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const newUserAssessmentSchema = z.object({
  userId: z.string().uuid(),
  assessmentId: z.string().uuid(),
  status: z
    .enum(['not_started', 'in_progress', 'completed', 'abandoned'])
    .default('not_started'),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  completionPercentage: z.number().min(0).max(100).default(0),
  rawScores: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().int().min(0).optional(),
  maxPossibleScore: z.number().int().min(0).optional(),
  apostolicScore: z.number().int().min(0).max(100).optional(),
  propheticScore: z.number().int().min(0).max(100).optional(),
  evangelisticScore: z.number().int().min(0).max(100).optional(),
  shepherdingScore: z.number().int().min(0).max(100).optional(),
  teachingScore: z.number().int().min(0).max(100).optional(),
  responseConsistency: z.string().optional(),
  confidenceLevel: z.number().min(0).max(1).optional(),
  personalizedRecommendations: z.array(z.string()).optional(),
  complementaryGifts: z.array(z.string()).optional(),
});

export const updateUserAssessmentSchema = newUserAssessmentSchema
  .partial()
  .omit({ userId: true, assessmentId: true });

export const queryUserAssessmentSchema = z.object({
  userId: z.string().uuid().optional(),
  assessmentId: z.string().uuid().optional(),
  status: z.string().optional(),
  sortBy: z
    .enum(['startedAt', 'completedAt', 'completionPercentage', 'totalScore'])
    .default('startedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================================================
// ORGANIZATION SCHEMAS
// ============================================================================

export const newOrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
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
    .optional(),
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
  licenseType: z
    .enum(['individual', 'team', 'enterprise'])
    .default('individual'),
  maxUsers: z.number().int().positive().default(1),
  status: z
    .enum(['trial', 'active', 'suspended', 'cancelled'])
    .default('trial'),
});

export const updateOrganizationSchema = newOrganizationSchema
  .partial()
  .omit({ slug: true });

export const queryOrganizationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  organizationType: z.string().optional(),
  sizeCategory: z.string().optional(),
  status: z.string().optional(),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name', 'organizationType', 'memberCount'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  includeOwner: z.boolean().default(false),
  includeMembers: z.boolean().default(false),
  includeMemberCount: z.boolean().default(false),
  licenseType: z.string().optional(),
});

// ============================================================================
// CONTENT SCHEMAS
// ============================================================================

export const newContentItemSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().uuid(),
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
  contentType: z.enum([
    'article',
    'video',
    'audio',
    'podcast',
    'course',
    'book',
  ]),
  format: z
    .enum(['text', 'markdown', 'html', 'video', 'audio'])
    .default('text'),
  wordCount: z.number().int().positive().optional(),
  estimatedReadingTime: z.number().int().positive().optional(),
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  bookmarkCount: z.number().int().min(0).default(0),
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.number().int().positive().optional(),
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  status: z
    .enum(['draft', 'published', 'scheduled', 'archived'])
    .default('draft'),
  networkAmplificationScore: z.number().min(0).max(10).default(0),
  crossReferenceCount: z.number().int().min(0).default(0),
  aiEnhanced: z.boolean().default(false),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).default([]),
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
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  originalSource: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),
  licenseType: z
    .enum(['all_rights_reserved', 'creative_commons', 'public_domain'])
    .default('all_rights_reserved'),
  attributionRequired: z.boolean().default(true),
});

export const updateContentItemSchema = newContentItemSchema
  .partial()
  .omit({ slug: true });

export const queryContentItemSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  contentType: z.string().optional(),
  status: z.string().optional(),
  visibility: z.string().optional(),
  authorId: z.string().uuid().optional(),
  primaryCategoryId: z.string().uuid().optional(),
  seriesId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  sortBy: z
    .enum([
      'createdAt',
      'updatedAt',
      'title',
      'viewCount',
      'likeCount',
      'publishedAt',
    ])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  includeAuthor: z.boolean().default(false),
  includeCategory: z.boolean().default(false),
  includeSeries: z.boolean().default(false),
});

// Export types
export type NewUserProfile = z.infer<typeof newUserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type QueryUserProfile = z.infer<typeof queryUserProfileSchema>;

export type NewAssessment = z.infer<typeof newAssessmentSchema>;
export type UpdateAssessment = z.infer<typeof updateAssessmentSchema>;
export type QueryAssessment = z.infer<typeof queryAssessmentSchema>;

export type NewAssessmentQuestion = z.infer<typeof newAssessmentQuestionSchema>;
export type UpdateAssessmentQuestion = z.infer<
  typeof updateAssessmentQuestionSchema
>;
export type QueryAssessmentQuestion = z.infer<
  typeof queryAssessmentQuestionSchema
>;

export type NewAssessmentResponse = z.infer<typeof newAssessmentResponseSchema>;
export type UpdateAssessmentResponse = z.infer<
  typeof updateAssessmentResponseSchema
>;
export type QueryAssessmentResponse = z.infer<
  typeof queryAssessmentResponseSchema
>;

export type NewUserAssessment = z.infer<typeof newUserAssessmentSchema>;
export type UpdateUserAssessment = z.infer<typeof updateUserAssessmentSchema>;
export type QueryUserAssessment = z.infer<typeof queryUserAssessmentSchema>;

export type NewOrganization = z.infer<typeof newOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>;
export type QueryOrganization = z.infer<typeof queryOrganizationSchema>;

export type NewContentItem = z.infer<typeof newContentItemSchema>;
export type UpdateContentItem = z.infer<typeof updateContentItemSchema>;
export type QueryContentItem = z.infer<typeof queryContentItemSchema>;

// ============================================================================
// COMMUNITY SCHEMAS
// ============================================================================

export const newCommunitySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
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
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  isActive: z.boolean().default(true),
});

export const updateCommunitySchema = newCommunitySchema
  .partial()
  .omit({ slug: true });

export const queryCommunitySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  communityType: z.string().optional(),
  visibility: z.string().optional(),
  isActive: z.boolean().optional(),
  sortBy: z
    .enum(['name', 'communityType', 'memberCount', 'createdAt', 'updatedAt'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type NewCommunity = z.infer<typeof newCommunitySchema>;
export type UpdateCommunity = z.infer<typeof updateCommunitySchema>;
export type QueryCommunity = z.infer<typeof queryCommunitySchema>;
