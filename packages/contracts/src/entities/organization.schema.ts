import { z } from 'zod';

// ============================================================================
// ORGANIZATION ENTITY SCHEMA
// ============================================================================
// Aligned with organizations table from database schema

export const organizationEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),

  // Organization Classification
  organizationType: z.enum([
    'church',
    'denomination',
    'seminary',
    'ministry_network',
    'nonprofit',
    'business',
    'other',
  ]),
  sizeCategory: z
    .enum(['startup', 'small', 'medium', 'large', 'enterprise'])
    .optional(),

  // Contact Information
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),

  // Licensing & Billing
  licenseType: z
    .enum(['individual', 'team', 'enterprise'])
    .default('individual'),
  maxUsers: z.number().int().min(1).default(1),
  billingEmail: z.string().email().optional(),

  // Ownership
  accountOwnerId: z.string().uuid().optional(),

  // Stripe Integration
  stripeCustomerId: z.string().optional(),
  stripeProductId: z.string().optional(),

  // Status
  status: z
    .enum(['trial', 'active', 'suspended', 'cancelled'])
    .default('trial'),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ORGANIZATION MEMBERSHIP ENTITY SCHEMA
// ============================================================================
// Aligned with organization_memberships table from database schema

export const organizationMembershipEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),

  // Role & Permissions
  role: z.enum(['owner', 'admin', 'member', 'viewer']),
  permissions: z.array(z.string()).default([]),

  // Status
  status: z
    .enum(['pending', 'active', 'inactive', 'cancelled'])
    .default('pending'),

  // Timestamps
  joinedAt: z.string().datetime().optional(),
  invitedAt: z.string().datetime().optional(),
  invitedBy: z.string().uuid().optional(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ORGANIZATION RESPONSE SCHEMA (with computed fields)
// ============================================================================

export const organizationResponseSchema = organizationEntitySchema.extend({
  // Computed fields for UI
  isActive: z.boolean(),
  isTrial: z.boolean(),
  hasCustomLogo: z.boolean(),
  hasWebsite: z.boolean(),
  memberCount: z.number().int().min(0),
  displayName: z.string(),
  statusDisplay: z.string(),
  licenseTypeDisplay: z.string(),

  // Related data (optional)
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
});

// ============================================================================
// ORGANIZATION MEMBERSHIP RESPONSE SCHEMA
// ============================================================================

export const organizationMembershipResponseSchema =
  organizationMembershipEntitySchema.extend({
    // Computed fields
    isActive: z.boolean(),
    isPending: z.boolean(),
    canManage: z.boolean(),
    roleDisplay: z.string(),
    statusDisplay: z.string(),

    // Related data
    user: z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      avatarUrl: z.string().url().optional(),
    }),

    organization: z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      logoUrl: z.string().url().optional(),
    }),

    invitedByUser: z
      .object({
        id: z.string().uuid(),
        firstName: z.string(),
        lastName: z.string(),
      })
      .optional(),
  });

// ============================================================================
// ORGANIZATION CREATE SCHEMA
// ============================================================================

export const createOrganizationSchema = organizationEntitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    // Required fields for creation
    name: z.string().min(1, 'Organization name is required').max(200),
    slug: z.string().min(1, 'Organization slug is required').max(100),
    organizationType: z.enum([
      'church',
      'denomination',
      'seminary',
      'ministry_network',
      'nonprofit',
      'business',
      'other',
    ]),
  });

// ============================================================================
// ORGANIZATION UPDATE SCHEMA
// ============================================================================

export const updateOrganizationSchema = createOrganizationSchema
  .partial()
  .omit({
    slug: true, // Slug cannot be changed after creation
  });

// ============================================================================
// ORGANIZATION MEMBERSHIP CREATE SCHEMA
// ============================================================================

export const createOrganizationMembershipSchema =
  organizationMembershipEntitySchema
    .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      joinedAt: true,
    })
    .extend({
      // Required fields
      userId: z.string().uuid(),
      organizationId: z.string().uuid(),
      role: z.enum(['owner', 'admin', 'member', 'viewer']),
    });

// ============================================================================
// ORGANIZATION MEMBERSHIP UPDATE SCHEMA
// ============================================================================

export const updateOrganizationMembershipSchema =
  createOrganizationMembershipSchema.partial().omit({
    userId: true,
    organizationId: true,
  });

// ============================================================================
// ORGANIZATION QUERY SCHEMA
// ============================================================================

export const organizationQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Search
  search: z.string().optional(),

  // Filters
  organizationType: z.string().optional(),
  sizeCategory: z.string().optional(),
  status: z.string().optional(),
  licenseType: z.string().optional(),

  // Sorting
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name', 'organizationType', 'memberCount'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Include related data
  includeOwner: z.boolean().default(false),
  includeMembers: z.boolean().default(false),
  includeMemberCount: z.boolean().default(true),
});

// ============================================================================
// ORGANIZATION MEMBERSHIP QUERY SCHEMA
// ============================================================================

export const organizationMembershipQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  // Filters
  organizationId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  role: z.string().optional(),
  status: z.string().optional(),

  // Sorting
  sortBy: z
    .enum(['createdAt', 'joinedAt', 'role', 'status'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  // Include related data
  includeUser: z.boolean().default(true),
  includeOrganization: z.boolean().default(true),
});

// ============================================================================
// ORGANIZATION FORM SCHEMA (for UI forms)
// ============================================================================

export const organizationFormSchema = z.object({
  // Basic Info
  name: z.string().min(1, 'Organization name is required').max(200),
  description: z.string().max(1000).optional(),
  website: z.string().url().optional(),

  // Organization Details
  organizationType: z.enum([
    'church',
    'denomination',
    'seminary',
    'ministry_network',
    'nonprofit',
    'business',
    'other',
  ]),
  sizeCategory: z
    .enum(['startup', 'small', 'medium', 'large', 'enterprise'])
    .optional(),

  // Contact Information
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(20).optional(),
  billingEmail: z.string().email().optional(),

  // Address
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),

  // Settings
  licenseType: z
    .enum(['individual', 'team', 'enterprise'])
    .default('individual'),
  maxUsers: z.coerce.number().int().min(1).default(1),
});

// ============================================================================
// ORGANIZATION INVITATION SCHEMA
// ============================================================================

export const organizationInvitationSchema = z.object({
  email: z.string().email('Valid email is required'),
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
  message: z.string().max(500).optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type OrganizationEntity = z.infer<typeof organizationEntitySchema>;
export type OrganizationMembershipEntity = z.infer<
  typeof organizationMembershipEntitySchema
>;
export type OrganizationResponse = z.infer<typeof organizationResponseSchema>;
export type OrganizationMembershipResponse = z.infer<
  typeof organizationMembershipResponseSchema
>;
export type CreateOrganization = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>;
export type CreateOrganizationMembership = z.infer<
  typeof createOrganizationMembershipSchema
>;
export type UpdateOrganizationMembership = z.infer<
  typeof updateOrganizationMembershipSchema
>;
export type OrganizationQuery = z.infer<typeof organizationQuerySchema>;
export type OrganizationMembershipQuery = z.infer<
  typeof organizationMembershipQuerySchema
>;
export type OrganizationForm = z.infer<typeof organizationFormSchema>;
export type OrganizationInvitation = z.infer<
  typeof organizationInvitationSchema
>;

// Legacy aliases for backward compatibility
export type Organization = OrganizationEntity;
export type NewOrganization = CreateOrganization;
export type OrganizationMembership = OrganizationMembershipEntity;
export type NewOrganizationMembership = CreateOrganizationMembership;

// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================

export const organizationSchema = organizationEntitySchema;
export const organizationMembershipSchema = organizationMembershipEntitySchema;
export const databaseOrganizationSchema = organizationEntitySchema;
