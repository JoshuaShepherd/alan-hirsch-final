import { z } from 'zod';
import {
  ministryRoleSchema,
  culturalContextSchema,
  organizationTypeSchema,
  membershipRoleSchema,
} from './shared';

// User Profile Validation Schemas

export const leaderTierSchema = z.enum([
  'core',
  'network',
  'emerging',
  'community',
]);

export const subscriptionTierSchema = z.enum([
  'free',
  'individual',
  'professional',
  'leader',
  'institutional',
]);

export const accountStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'pending_verification',
]);

export const brandColorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});

export const emailNotificationsSchema = z.object({
  dailyDigest: z.boolean(),
  collaborationRequests: z.boolean(),
  revenueReports: z.boolean(),
  communityUpdates: z.boolean(),
});

export const privacySettingsSchema = z.object({
  publicProfile: z.boolean(),
  showAssessmentResults: z.boolean(),
  allowNetworking: z.boolean(),
  shareAnalytics: z.boolean(),
});

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),

  // Ministry Context
  ministryRole: ministryRoleSchema,
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().min(0).optional(),

  // Geographic & Cultural Context
  countryCode: z.string().length(2).optional(),
  timezone: z.string().optional(),
  languagePrimary: z.string().default('en'),
  culturalContext: culturalContextSchema.optional(),

  // APEST Assessment Scores (0-100 scale) - ⏳ PLANNED
  assessmentMovementAlignment: z.number().int().min(0).max(100).optional(),
  assessmentAudienceEngagement: z.number().int().min(0).max(100).optional(),
  assessmentContentReadiness: z.number().int().min(0).max(100).optional(),
  assessmentRevenuePotential: z.number().int().min(0).max(100).optional(),
  assessmentNetworkEffects: z.number().int().min(0).max(100).optional(),
  assessmentStrategicFit: z.number().int().min(0).max(100).optional(),
  assessmentTotal: z.number().int().min(0).max(600).optional(),

  // Leader Tier
  leaderTier: leaderTierSchema.optional(),

  // Platform Configuration
  subdomain: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  customDomain: z.string().optional(),
  platformTitle: z.string().optional(),

  // Subscription & Access
  subscriptionTier: subscriptionTierSchema.default('free'),

  // Theological Focus Areas
  theologicalFocus: z.array(z.string()).default([]),

  // Settings
  brandColors: brandColorsSchema.default({
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#059669',
  }),
  emailNotifications: emailNotificationsSchema.default({
    dailyDigest: true,
    collaborationRequests: true,
    revenueReports: true,
    communityUpdates: true,
  }),
  privacySettings: privacySettingsSchema.default({
    publicProfile: true,
    showAssessmentResults: false,
    allowNetworking: true,
    shareAnalytics: false,
  }),

  // Onboarding & Status
  onboardingCompleted: z.boolean().default(false),
  onboardingStep: z.number().int().min(1).default(1),
  accountStatus: accountStatusSchema.default('pending_verification'),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  lastActiveAt: z.date(),
});

export const newUserProfileSchema = userProfileSchema
  .omit({
    createdAt: true,
    updatedAt: true,
    lastActiveAt: true,
  })
  .partial({
    id: true,
  });

// Organization Validation Schemas

export const sizeCategorySchema = z.enum([
  'small',
  'medium',
  'large',
  'enterprise',
]);

export const userLicenseTypeSchema = z.enum([
  'individual',
  'institutional',
  'enterprise',
]);

export const organizationStatusSchema = z.enum([
  'active',
  'inactive',
  'trial',
  'suspended',
]);

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),

  // Organization Classification
  organizationType: organizationTypeSchema,
  sizeCategory: sizeCategorySchema.optional(),

  // Contact Information
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: addressSchema.optional(),

  // Licensing & Billing
  licenseType: userLicenseTypeSchema.default('individual'),
  maxUsers: z.number().int().min(1).default(1),
  billingEmail: z.string().email().optional(),

  // Ownership
  accountOwnerId: z.string().uuid().optional(),

  // Status
  status: organizationStatusSchema.default('trial'),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newOrganizationSchema = organizationSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// Organization Membership Validation Schemas
export const organizationMembershipRoleSchema = membershipRoleSchema;

export const organizationMembershipStatusSchema = z.enum([
  'active',
  'inactive',
  'pending',
  'invited',
]);

export const organizationMembershipSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),

  // Role & Permissions
  role: organizationMembershipRoleSchema,
  permissions: z.array(z.string()).default([]),

  // Status
  status: organizationMembershipStatusSchema.default('pending'),

  // Timestamps
  joinedAt: z.date().optional(),
  invitedAt: z.date().optional(),
  invitedBy: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newOrganizationMembershipSchema = organizationMembershipSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    joinedAt: true,
    invitedAt: true,
  });

// Type exports
export type UserProfile = z.infer<typeof userProfileSchema>;
export type NewUserProfile = z.infer<typeof newUserProfileSchema>;
export type Organization = z.infer<typeof organizationSchema>;
export type NewOrganization = z.infer<typeof newOrganizationSchema>;
export type OrganizationMembership = z.infer<
  typeof organizationMembershipSchema
>;
export type NewOrganizationMembership = z.infer<
  typeof newOrganizationMembershipSchema
>;
