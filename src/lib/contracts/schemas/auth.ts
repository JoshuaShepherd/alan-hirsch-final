// Auto-generated contracts for auth
// Generated at: 2025-10-06T20:01:40.346Z

import { z } from 'zod';

// Entity validation schema for userProfiles
export const userProfilesEntitySchema = z.object({
  id: z.string().uuid().nullable(),
  email: z.string(),
  passwordHash: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  ministryRole: z
    .enum([
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
    ])
    .nullable(),
  denomination: z.string().nullable(),
  organizationName: z.string().nullable(),
  yearsInMinistry: z.number().int().nullable(),
  countryCode: z.string().nullable(),
  timezone: z.string().nullable(),
  languagePrimary: z.string().default('en').nullable(),
  culturalContext: z.string().nullable(),
  assessmentMovementAlignment: z.number().int().nullable(),
  assessmentAudienceEngagement: z.number().int().nullable(),
  assessmentContentReadiness: z.number().int().nullable(),
  assessmentRevenuePotential: z.number().int().nullable(),
  assessmentNetworkEffects: z.number().int().nullable(),
  assessmentStrategicFit: z.number().int().nullable(),
  assessmentTotal: z.number().int().nullable(),
  leaderTier: z.string().nullable(),
  subdomain: z.string().nullable(),
  customDomain: z.string().nullable(),
  platformTitle: z.string().nullable(),
  subscriptionTier: z.string().nullable(),
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
  onboardingCompleted: z.boolean().default(false).nullable(),
  onboardingStep: z.number().int().default(1).nullable(),
  accountStatus: z
    .enum(['pending_verification', 'active', 'inactive', 'suspended'])
    .nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
  lastActiveAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userProfiles
export const createUserProfilesSchema = z.object({
  email: z.string(),
  passwordHash: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string(),
  bio: z.string(),
  avatarUrl: z.string(),
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
  denomination: z.string(),
  organizationName: z.string(),
  yearsInMinistry: z.number().int(),
  countryCode: z.string(),
  timezone: z.string(),
  languagePrimary: z.string().optional().default('en'),
  culturalContext: z.string(),
  assessmentMovementAlignment: z.number().int(),
  assessmentAudienceEngagement: z.number().int(),
  assessmentContentReadiness: z.number().int(),
  assessmentRevenuePotential: z.number().int(),
  assessmentNetworkEffects: z.number().int(),
  assessmentStrategicFit: z.number().int(),
  assessmentTotal: z.number().int(),
  leaderTier: z.string(),
  subdomain: z.string(),
  customDomain: z.string(),
  platformTitle: z.string(),
  subscriptionTier: z.string(),
  theologicalFocus: z.array(z.string()).optional(),
  brandColors: z
    .object({ primary: z.string(), secondary: z.string(), accent: z.string() })
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
  onboardingCompleted: z.boolean().optional().default(false),
  onboardingStep: z.number().int().optional().default(1),
  accountStatus: z.enum([
    'pending_verification',
    'active',
    'inactive',
    'suspended',
  ]),
});

// Update validation schema for userProfiles
export const updateUserProfilesSchema = z
  .object({
    email: z.string(),
    passwordHash: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    displayName: z.string(),
    bio: z.string(),
    avatarUrl: z.string(),
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
    denomination: z.string(),
    organizationName: z.string(),
    yearsInMinistry: z.number().int(),
    countryCode: z.string(),
    timezone: z.string(),
    languagePrimary: z.string().optional().default('en'),
    culturalContext: z.string(),
    assessmentMovementAlignment: z.number().int(),
    assessmentAudienceEngagement: z.number().int(),
    assessmentContentReadiness: z.number().int(),
    assessmentRevenuePotential: z.number().int(),
    assessmentNetworkEffects: z.number().int(),
    assessmentStrategicFit: z.number().int(),
    assessmentTotal: z.number().int(),
    leaderTier: z.string(),
    subdomain: z.string(),
    customDomain: z.string(),
    platformTitle: z.string(),
    subscriptionTier: z.string(),
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
    onboardingCompleted: z.boolean().optional().default(false),
    onboardingStep: z.number().int().optional().default(1),
    accountStatus: z.enum([
      'pending_verification',
      'active',
      'inactive',
      'suspended',
    ]),
    updatedAt: z.string().datetime().optional().default('NOW()'),
    lastActiveAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userProfiles
export const userProfilesQuerySchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string(),
  bio: z.string(),
  avatarUrl: z.string(),
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
  denomination: z.string(),
  organizationName: z.string(),
  yearsInMinistry: z.number().int(),
  countryCode: z.string(),
  timezone: z.string(),
  languagePrimary: z.string().optional().default('en'),
  culturalContext: z.string(),
  assessmentMovementAlignment: z.number().int(),
  assessmentAudienceEngagement: z.number().int(),
  assessmentContentReadiness: z.number().int(),
  assessmentRevenuePotential: z.number().int(),
  assessmentNetworkEffects: z.number().int(),
  assessmentStrategicFit: z.number().int(),
  assessmentTotal: z.number().int(),
  leaderTier: z.string(),
  subdomain: z.string(),
  customDomain: z.string(),
  platformTitle: z.string(),
  subscriptionTier: z.string(),
  theologicalFocus: z.array(z.string()).optional(),
  brandColors: z
    .object({ primary: z.string(), secondary: z.string(), accent: z.string() })
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
  onboardingCompleted: z.boolean().optional().default(false),
  onboardingStep: z.number().int().optional().default(1),
  accountStatus: z.enum([
    'pending_verification',
    'active',
    'inactive',
    'suspended',
  ]),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for organizations
export const organizationsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  website: z.string().nullable(),
  logoUrl: z.string().nullable(),
  organizationType: z
    .enum([
      'other',
      'denomination',
      'church',
      'seminary',
      'nonprofit',
      'business',
      'ministry_network',
    ])
    .nullable(),
  sizeCategory: z.string().nullable(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string(),
  }),
  licenseType: z.string().nullable(),
  maxUsers: z.number().int().default(1).nullable(),
  billingEmail: z.string().nullable(),
  accountOwnerId: z.string().uuid().nullable(),
  stripeCustomerId: z.string().nullable(),
  stripeProductId: z.string().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for organizations
export const createOrganizationsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  website: z.string(),
  logoUrl: z.string(),
  organizationType: z.enum([
    'other',
    'denomination',
    'church',
    'seminary',
    'nonprofit',
    'business',
    'ministry_network',
  ]),
  sizeCategory: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  licenseType: z.string(),
  maxUsers: z.number().int().optional().default(1),
  billingEmail: z.string(),
  accountOwnerId: z.string().uuid(),
  stripeCustomerId: z.string(),
  stripeProductId: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
});

// Update validation schema for organizations
export const updateOrganizationsSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    website: z.string(),
    logoUrl: z.string(),
    organizationType: z.enum([
      'other',
      'denomination',
      'church',
      'seminary',
      'nonprofit',
      'business',
      'ministry_network',
    ]),
    sizeCategory: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    address: z
      .object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postalCode: z.string(),
      })
      .optional(),
    licenseType: z.string(),
    maxUsers: z.number().int().optional().default(1),
    billingEmail: z.string(),
    accountOwnerId: z.string().uuid(),
    stripeCustomerId: z.string(),
    stripeProductId: z.string(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for organizations
export const organizationsQuerySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  website: z.string(),
  logoUrl: z.string(),
  organizationType: z.enum([
    'other',
    'denomination',
    'church',
    'seminary',
    'nonprofit',
    'business',
    'ministry_network',
  ]),
  sizeCategory: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  licenseType: z.string(),
  maxUsers: z.number().int().optional().default(1),
  billingEmail: z.string(),
  accountOwnerId: z.string().uuid(),
  stripeCustomerId: z.string(),
  stripeProductId: z.string(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for organizationMemberships
export const organizationMembershipsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  role: z.string().nullable(),
  permissions: z.array(z.string()),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  joinedAt: z.string().datetime().default('NOW()').nullable(),
  invitedAt: z.string().datetime().nullable(),
  invitedBy: z.string().uuid().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for organizationMemberships
export const createOrganizationMembershipsSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  role: z.string(),
  permissions: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  joinedAt: z.string().datetime().optional().default('NOW()'),
  invitedAt: z.string().datetime(),
  invitedBy: z.string().uuid(),
});

// Update validation schema for organizationMemberships
export const updateOrganizationMembershipsSchema = z
  .object({
    userId: z.string().uuid(),
    organizationId: z.string().uuid(),
    role: z.string(),
    permissions: z.array(z.string()).optional(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    joinedAt: z.string().datetime().optional().default('NOW()'),
    invitedAt: z.string().datetime(),
    invitedBy: z.string().uuid(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for organizationMemberships
export const organizationMembershipsQuerySchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  role: z.string(),
  permissions: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  joinedAt: z.string().datetime().optional().default('NOW()'),
  invitedAt: z.string().datetime(),
  invitedBy: z.string().uuid(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
