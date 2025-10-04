import { z } from 'zod';
import { membershipRoleSchema, organizationTypeSchema } from './user.schema';

// ============================================================================
// ORGANIZATION ENUMS AND TYPES
// ============================================================================

export const organizationStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'pending_approval',
]);

export const organizationSizeSchema = z.enum([
  'startup',
  'small',
  'medium',
  'large',
  'enterprise',
]);

// ============================================================================
// ORGANIZATION ENTITY SCHEMA - SINGLE SOURCE OF TRUTH
// ============================================================================

/**
 * Complete Organization Entity Schema
 * This is the single source of truth for all organization data structures
 */
export const OrganizationEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),

  // Organization Classification
  organization_type: organizationTypeSchema,
  organization_size: organizationSizeSchema.optional(),

  // Contact Information
  website_url: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().max(50).optional(),

  // Address Information
  address_line1: z.string().max(255).optional(),
  address_line2: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  state_province: z.string().max(100).optional(),
  postal_code: z.string().max(20).optional(),
  country_code: z.string().length(2).optional(),

  // Organization Details
  founded_year: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  employee_count: z.number().int().min(0).optional(),
  annual_budget: z.number().min(0).optional(),

  // Platform Configuration
  subdomain: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  custom_domain: z.string().optional(),
  logo_url: z.string().url().optional(),
  brand_colors: z
    .object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
    })
    .optional(),

  // Settings
  settings: z
    .object({
      allow_public_membership: z.boolean().default(false),
      require_approval_for_membership: z.boolean().default(true),
      allow_member_invites: z.boolean().default(false),
      default_member_role: membershipRoleSchema.default('member'),
      max_members: z.number().int().min(1).optional(),
    })
    .optional(),

  // Status
  status: organizationStatusSchema.default('active'),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

/**
 * Complete Organization Membership Entity Schema
 * This is the single source of truth for all organization membership data structures
 */
export const OrganizationMembershipEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),

  // Membership Details
  role: membershipRoleSchema,
  status: z
    .enum(['active', 'inactive', 'pending', 'suspended'])
    .default('active'),

  // Permissions
  permissions: z
    .object({
      can_manage_members: z.boolean().default(false),
      can_manage_content: z.boolean().default(false),
      can_manage_assessments: z.boolean().default(false),
      can_view_analytics: z.boolean().default(false),
      can_manage_billing: z.boolean().default(false),
    })
    .optional(),

  // Invitation Details
  invited_by: z.string().uuid().optional(),
  invited_at: z.string().datetime().optional(),
  joined_at: z.string().datetime().optional(),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ============================================================================
// DERIVED SCHEMAS - NO DUPLICATION
// ============================================================================

/**
 * Create Organization Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateOrganizationSchema = OrganizationEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update Organization Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

/**
 * Organization Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const OrganizationQuerySchema =
  OrganizationEntitySchema.partial().extend({
    // Search fields
    search: z.string().optional(),

    // Filter fields
    organization_type: z.array(organizationTypeSchema).optional(),
    organization_size: z.array(organizationSizeSchema).optional(),
    status: z.array(organizationStatusSchema).optional(),
    country_code: z.array(z.string().length(2)).optional(),

    // Date range filters
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
    founded_after: z.number().int().optional(),
    founded_before: z.number().int().optional(),

    // Size filters
    employee_count_min: z.number().int().min(0).optional(),
    employee_count_max: z.number().int().min(0).optional(),
    annual_budget_min: z.number().min(0).optional(),
    annual_budget_max: z.number().min(0).optional(),
  });

/**
 * Create Organization Membership Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateOrganizationMembershipSchema =
  OrganizationMembershipEntitySchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
  });

/**
 * Update Organization Membership Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateOrganizationMembershipSchema =
  CreateOrganizationMembershipSchema.partial();

/**
 * Organization Membership Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const OrganizationMembershipQuerySchema =
  OrganizationMembershipEntitySchema.partial().extend({
    // Filter fields
    organization_id: z.array(z.string().uuid()).optional(),
    user_id: z.array(z.string().uuid()).optional(),
    role: z.array(membershipRoleSchema).optional(),
    status: z
      .array(z.enum(['active', 'inactive', 'pending', 'suspended']))
      .optional(),

    // Date range filters
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
    joined_after: z.string().datetime().optional(),
    joined_before: z.string().datetime().optional(),
  });

/**
 * Organization Form Schema - For form validation
 * Extends create schema with form-specific fields
 */
export const OrganizationFormSchema = CreateOrganizationSchema.extend({
  terms_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  privacy_policy_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the privacy policy',
  }),
});

/**
 * Organization Invitation Schema - For inviting members
 * Extends membership schema with invitation-specific fields
 */
export const OrganizationInvitationSchema = z.object({
  organization_id: z.string().uuid(),
  email: z.string().email(),
  role: membershipRoleSchema,
  message: z.string().max(500).optional(),
  expires_at: z.string().datetime().optional(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type OrganizationEntity = z.infer<typeof OrganizationEntitySchema>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
export type OrganizationQuery = z.infer<typeof OrganizationQuerySchema>;
export type OrganizationForm = z.infer<typeof OrganizationFormSchema>;
export type OrganizationInvitation = z.infer<
  typeof OrganizationInvitationSchema
>;

export type OrganizationMembershipEntity = z.infer<
  typeof OrganizationMembershipEntitySchema
>;
export type CreateOrganizationMembership = z.infer<
  typeof CreateOrganizationMembershipSchema
>;
export type UpdateOrganizationMembership = z.infer<
  typeof UpdateOrganizationMembershipSchema
>;
export type OrganizationMembershipQuery = z.infer<
  typeof OrganizationMembershipQuerySchema
>;

// Enum type exports
export type OrganizationStatus = z.infer<typeof organizationStatusSchema>;
export type OrganizationSize = z.infer<typeof organizationSizeSchema>;
