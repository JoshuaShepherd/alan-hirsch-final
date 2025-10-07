import { z } from 'zod';

// Shared enums
export const MinistryRoleEnum = z.enum([
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
]);

export const CulturalContextEnum = z.enum([
  'western',
  'eastern',
  'african',
  'latin_american',
  'middle_eastern',
  'oceanic',
  'mixed',
  'global',
]);

export const LeaderTierEnum = z.enum([
  'core',
  'network',
  'emerging',
  'community',
]);

export const SubscriptionTierEnum = z.enum([
  'free',
  'individual',
  'professional',
  'leader',
  'institutional',
]);

export const AccountStatusEnum = z.enum([
  'active',
  'inactive',
  'suspended',
  'pending_verification',
]);

// Ingress (Create/Update DTOs)
export const UserProfileCreateSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  ministryRole: MinistryRoleEnum,
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().min(0).optional(),
  countryCode: z.string().optional(),
  timezone: z.string().optional(),
  languagePrimary: z.string().default('en'),
  culturalContext: CulturalContextEnum.optional(),
  assessmentMovementAlignment: z.number().int().min(0).max(100).optional(),
  assessmentAudienceEngagement: z.number().int().min(0).max(100).optional(),
  assessmentContentReadiness: z.number().int().min(0).max(100).optional(),
  assessmentRevenuePotential: z.number().int().min(0).max(100).optional(),
  assessmentNetworkEffects: z.number().int().min(0).max(100).optional(),
  assessmentStrategicFit: z.number().int().min(0).max(100).optional(),
  assessmentTotal: z.number().int().min(0).max(600).optional(),
  leaderTier: LeaderTierEnum.optional(),
  subdomain: z.string().optional(),
  customDomain: z.string().optional(),
  platformTitle: z.string().optional(),
  subscriptionTier: SubscriptionTierEnum.default('free'),
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
      dailyDigest: z.boolean(),
      collaborationRequests: z.boolean(),
      revenueReports: z.boolean(),
      communityUpdates: z.boolean(),
    })
    .default({
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    }),
  privacySettings: z
    .object({
      publicProfile: z.boolean(),
      showAssessmentResults: z.boolean(),
      allowNetworking: z.boolean(),
      shareAnalytics: z.boolean(),
    })
    .default({
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    }),
  onboardingCompleted: z.boolean().default(false),
  onboardingStep: z.number().int().min(1).default(1),
  accountStatus: AccountStatusEnum.default('pending_verification'),
});

export const UserProfileUpdateSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  passwordHash: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  ministryRole: MinistryRoleEnum.optional(),
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().min(0).optional(),
  countryCode: z.string().optional(),
  timezone: z.string().optional(),
  languagePrimary: z.string().optional(),
  culturalContext: CulturalContextEnum.optional(),
  assessmentMovementAlignment: z.number().int().min(0).max(100).optional(),
  assessmentAudienceEngagement: z.number().int().min(0).max(100).optional(),
  assessmentContentReadiness: z.number().int().min(0).max(100).optional(),
  assessmentRevenuePotential: z.number().int().min(0).max(100).optional(),
  assessmentNetworkEffects: z.number().int().min(0).max(100).optional(),
  assessmentStrategicFit: z.number().int().min(0).max(100).optional(),
  assessmentTotal: z.number().int().min(0).max(600).optional(),
  leaderTier: LeaderTierEnum.optional(),
  subdomain: z.string().optional(),
  customDomain: z.string().optional(),
  platformTitle: z.string().optional(),
  subscriptionTier: SubscriptionTierEnum.optional(),
  theologicalFocus: z.array(z.string()).optional(),
  brandColors: z
    .object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    })
    .optional(),
  emailNotifications: z
    .object({
      dailyDigest: z.boolean(),
      collaborationRequests: z.boolean(),
      revenueReports: z.boolean(),
      communityUpdates: z.boolean(),
    })
    .optional(),
  privacySettings: z
    .object({
      publicProfile: z.boolean(),
      showAssessmentResults: z.boolean(),
      allowNetworking: z.boolean(),
      shareAnalytics: z.boolean(),
    })
    .optional(),
  onboardingCompleted: z.boolean().optional(),
  onboardingStep: z.number().int().min(1).optional(),
  accountStatus: AccountStatusEnum.optional(),
});

// Egress (API Response DTO)
export const UserProfileResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  passwordHash: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  ministryRole: MinistryRoleEnum,
  denomination: z.string().nullable(),
  organizationName: z.string().nullable(),
  yearsInMinistry: z.number().int().nullable(),
  countryCode: z.string().nullable(),
  timezone: z.string().nullable(),
  languagePrimary: z.string(),
  culturalContext: CulturalContextEnum.nullable(),
  assessmentMovementAlignment: z.number().int().nullable(),
  assessmentAudienceEngagement: z.number().int().nullable(),
  assessmentContentReadiness: z.number().int().nullable(),
  assessmentRevenuePotential: z.number().int().nullable(),
  assessmentNetworkEffects: z.number().int().nullable(),
  assessmentStrategicFit: z.number().int().nullable(),
  assessmentTotal: z.number().int().nullable(),
  leaderTier: LeaderTierEnum.nullable(),
  subdomain: z.string().nullable(),
  customDomain: z.string().nullable(),
  platformTitle: z.string().nullable(),
  subscriptionTier: SubscriptionTierEnum,
  theologicalFocus: z.array(z.string()),
  brandColors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
  emailNotifications: z.object({
    dailyDigest: z.boolean(),
    collaborationRequests: z.boolean(),
    revenueReports: z.boolean(),
    communityUpdates: z.boolean(),
  }),
  privacySettings: z.object({
    publicProfile: z.boolean(),
    showAssessmentResults: z.boolean(),
    allowNetworking: z.boolean(),
    shareAnalytics: z.boolean(),
  }),
  onboardingCompleted: z.boolean(),
  onboardingStep: z.number().int(),
  accountStatus: AccountStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserProfileListResponseSchema = z.object({
  data: z.array(UserProfileResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserProfileCreate = z.infer<typeof UserProfileCreateSchema>;
export type UserProfileUpdate = z.infer<typeof UserProfileUpdateSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type UserProfileListResponse = z.infer<
  typeof UserProfileListResponseSchema
>;
