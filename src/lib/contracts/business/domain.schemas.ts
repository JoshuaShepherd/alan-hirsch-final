// Auto-generated contracts for business
// Generated at: 2025-10-06T14:05:02.271Z

import { z } from 'zod';

// Ministry role validation schema
export const ministryRoleSchema = z.enum([
  'senior_pastor',
  'associate_pastor',
  'church_planter',
  'denominational_leader',
  'seminary_professor',
  'ministry_leader',
  'lay_leader',
  'missionary',
  'other',
]);

// Organization type validation schema
export const organizationTypeSchema = z.enum([
  'church',
  'denomination',
  'seminary',
  'ministry_network',
  'nonprofit',
  'business',
  'other',
]);

// Assessment type validation schema
export const assessmentTypeSchema = z.enum([
  'apest',
  'mdna',
  'cultural_intelligence',
  'leadership_style',
  'spiritual_gifts',
  'other',
]);

// Membership role validation schema
export const membershipRoleSchema = z.enum([
  'owner',
  'admin',
  'member',
  'viewer',
]);

// Cultural context validation schema
export const culturalContextSchema = z.enum([
  'western',
  'eastern',
  'african',
  'latin_american',
  'middle_eastern',
  'oceanic',
  'mixed',
  'global',
]);

// Ministry assessment validation schema
export const ministryAssessmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  assessmentType: assessmentTypeSchema,
  status: z.enum(['draft', 'active', 'archived', 'under_review']),
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
      'global',
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Ministry metrics validation schema
export const ministryMetricsSchema = z.object({
  apestScores: z.object({
    apostolic: z.number().int().min(0).max(100),
    prophetic: z.number().int().min(0).max(100),
    evangelistic: z.number().int().min(0).max(100),
    shepherding: z.number().int().min(0).max(100),
    teaching: z.number().int().min(0).max(100),
  }),
  contentMetrics: z.object({
    totalContentCreated: z.number().int().min(0),
    totalViews: z.number().int().min(0),
    totalLikes: z.number().int().min(0),
    totalShares: z.number().int().min(0),
    averageRating: z.number().min(1).max(5).nullable(),
  }),
  communityMetrics: z.object({
    totalCommunitiesJoined: z.number().int().min(0),
    totalPosts: z.number().int().min(0),
    totalComments: z.number().int().min(0),
    totalCollaborations: z.number().int().min(0),
  }),
  assessmentMetrics: z.object({
    totalAssessmentsCompleted: z.number().int().min(0),
    averageCompletionTime: z.number().min(0).nullable(),
    totalScores: z.number().int().min(0),
    averageScore: z.number().min(0).max(100).nullable(),
  }),
  engagementScore: z.number().min(0).max(1),
  lastActiveAt: z.string().datetime().nullable(),
});

// Ministry organization validation schema
export const ministryOrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  organizationType: organizationTypeSchema,
  status: z.enum(['active', 'inactive', 'pending', 'suspended']),
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Ministry user profile validation schema
export const ministryUserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  ministryRole: ministryRoleSchema,
  organizationId: z.string().uuid().nullable(),
  culturalContext: culturalContextSchema,
  ministrySpecialization: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  ministryGoals: z.array(z.string()).default([]),
  website: z.string().url().nullable(),
  socialMedia: z.record(z.string(), z.string()).default({}),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime().nullable(),
});

// Ministry community validation schema
export const ministryCommunitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  communityType: z.enum([
    'general_discussion',
    'church_planting_cohort',
    'leadership_development',
    'theological_study',
    'ministry_collaboration',
    'regional_network',
  ]),
  status: z.enum(['active', 'inactive', 'archived', 'private']),
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
  organizationId: z.string().uuid().nullable(),
  isPrivate: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Ministry content item validation schema
export const ministryContentItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  contentType: z.enum([
    'article',
    'video',
    'podcast',
    'framework',
    'tool',
    'case_study',
  ]),
  status: z.enum([
    'draft',
    'published',
    'archived',
    'under_review',
    'scheduled',
  ]),
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
  categoryId: z.string().uuid().nullable(),
  seriesId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  publishedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
