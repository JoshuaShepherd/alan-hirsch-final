import { z } from 'zod';
import { CreateOrganizationMembershipSchema, CreateOrganizationSchema, OrganizationInvitationSchema, OrganizationMembershipQuerySchema, OrganizationQuerySchema, UpdateOrganizationMembershipSchema, UpdateOrganizationSchema, } from '../entities/organization.schema';
// ============================================================================
// ORGANIZATION OPERATIONS - DERIVED FROM ENTITY SCHEMAS
// ============================================================================
// All operations are derived from the Organization entity schemas to ensure
// consistency and eliminate duplication across the codebase.
// ============================================================================
// ORGANIZATION CRUD OPERATIONS
// ============================================================================
/**
 * Create Organization Operation Schema
 * Derived from CreateOrganizationSchema with operation-specific validation
 */
export const CreateOrganizationOperationSchema = CreateOrganizationSchema.extend({
    // Additional validation for create operations
    name: z
        .string()
        .min(1)
        .max(255)
        .refine(name => !name.includes('  '), // No double spaces
    { message: 'Organization name cannot contain double spaces' }),
    slug: z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .refine(slug => !slug.startsWith('-') && !slug.endsWith('-'), {
        message: 'Slug cannot start or end with hyphens',
    }),
    subdomain: z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .refine(subdomain => !subdomain.startsWith('-') && !subdomain.endsWith('-'), { message: 'Subdomain cannot start or end with hyphens' })
        .optional(),
});
/**
 * Update Organization Operation Schema
 * Derived from UpdateOrganizationSchema with operation-specific validation
 */
export const UpdateOrganizationOperationSchema = UpdateOrganizationSchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Get Organization by ID Operation Schema
 * Organization retrieval with options
 */
export const GetOrganizationByIdOperationSchema = z.object({
    id: z.string().uuid(),
    include_members: z.boolean().default(false),
    include_settings: z.boolean().default(false),
    include_statistics: z.boolean().default(false),
});
/**
 * Get Organization by Subdomain Operation Schema
 * Organization retrieval by subdomain
 */
export const GetOrganizationBySubdomainOperationSchema = z.object({
    subdomain: z.string().regex(/^[a-z0-9-]+$/),
    include_members: z.boolean().default(false),
    include_settings: z.boolean().default(false),
});
/**
 * List Organizations Operation Schema
 * Paginated organization listing with filters
 */
export const ListOrganizationsOperationSchema = OrganizationQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum(['created_at', 'updated_at', 'name', 'employee_count'])
        .default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
    // Include options
    include_members: z.boolean().default(false),
    include_statistics: z.boolean().default(false),
});
/**
 * Search Organizations Operation Schema
 * Full-text search for organizations
 */
export const SearchOrganizationsOperationSchema = z.object({
    // Search query
    query: z.string().min(1).max(255),
    // Filters
    organization_type: z
        .array(z.enum([
        'church',
        'denomination',
        'seminary',
        'nonprofit',
        'ministry',
        'business',
        'other',
    ]))
        .optional(),
    organization_size: z
        .array(z.enum(['startup', 'small', 'medium', 'large', 'enterprise']))
        .optional(),
    status: z
        .array(z.enum(['active', 'inactive', 'suspended', 'pending_approval']))
        .optional(),
    country_code: z.array(z.string().length(2)).optional(),
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(50).default(20),
    // Sorting
    sort_by: z
        .enum(['relevance', 'created_at', 'name', 'employee_count'])
        .default('relevance'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
});
// ============================================================================
// ORGANIZATION MEMBERSHIP OPERATIONS
// ============================================================================
/**
 * Create Organization Membership Operation Schema
 * Derived from CreateOrganizationMembershipSchema with operation-specific validation
 */
export const CreateOrganizationMembershipOperationSchema = CreateOrganizationMembershipSchema.extend({
    // Additional validation for create operations
    user_id: z.string().uuid(),
    organization_id: z.string().uuid(),
    role: z.enum(['owner', 'admin', 'member', 'viewer']).default('member'),
});
/**
 * Update Organization Membership Operation Schema
 * Derived from UpdateOrganizationMembershipSchema with operation-specific validation
 */
export const UpdateOrganizationMembershipOperationSchema = UpdateOrganizationMembershipSchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Invite User to Organization Operation Schema
 * Send invitation to join organization
 */
export const InviteUserToOrganizationOperationSchema = OrganizationInvitationSchema.extend({
    // Additional validation for invitations
    message: z.string().max(500).optional(),
    expires_at: z.string().datetime().optional(),
    role: z.enum(['owner', 'admin', 'member', 'viewer']).default('member'),
});
/**
 * Accept Organization Invitation Operation Schema
 * Accept pending organization invitation
 */
export const AcceptOrganizationInvitationOperationSchema = z.object({
    invitation_id: z.string().uuid(),
    user_id: z.string().uuid(),
    accepted_at: z.string().datetime().optional(),
});
/**
 * Reject Organization Invitation Operation Schema
 * Reject pending organization invitation
 */
export const RejectOrganizationInvitationOperationSchema = z.object({
    invitation_id: z.string().uuid(),
    user_id: z.string().uuid(),
    reason: z.string().max(500).optional(),
    rejected_at: z.string().datetime().optional(),
});
/**
 * Remove User from Organization Operation Schema
 * Remove user from organization
 */
export const RemoveUserFromOrganizationOperationSchema = z.object({
    organization_id: z.string().uuid(),
    user_id: z.string().uuid(),
    reason: z.string().max(500).optional(),
    transfer_ownership: z
        .object({
        new_owner_id: z.string().uuid(),
    })
        .optional(),
});
/**
 * Get Organization Members Operation Schema
 * Retrieve organization members with details
 */
export const GetOrganizationMembersOperationSchema = z.object({
    organization_id: z.string().uuid(),
    include_user_details: z.boolean().default(true),
    include_permissions: z.boolean().default(false),
    include_activity: z.boolean().default(false),
});
/**
 * List Organization Memberships Operation Schema
 * Paginated organization membership listing
 */
export const ListOrganizationMembershipsOperationSchema = OrganizationMembershipQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum(['created_at', 'joined_at', 'role', 'status'])
        .default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
    // Include options
    include_user_details: z.boolean().default(true),
    include_organization_details: z.boolean().default(false),
});
// ============================================================================
// ORGANIZATION SETTINGS OPERATIONS
// ============================================================================
/**
 * Update Organization Settings Operation Schema
 * Update organization-specific settings
 */
export const UpdateOrganizationSettingsOperationSchema = z.object({
    organization_id: z.string().uuid(),
    settings: z
        .object({
        allow_public_membership: z.boolean().optional(),
        require_approval_for_membership: z.boolean().optional(),
        allow_member_invites: z.boolean().optional(),
        default_member_role: z
            .enum(['owner', 'admin', 'member', 'viewer'])
            .optional(),
        max_members: z.number().int().min(1).optional(),
    })
        .partial(),
});
/**
 * Update Organization Branding Operation Schema
 * Update organization visual branding
 */
export const UpdateOrganizationBrandingOperationSchema = z.object({
    organization_id: z.string().uuid(),
    branding: z
        .object({
        logo_url: z.string().url().optional(),
        brand_colors: z
            .object({
            primary: z.string(),
            secondary: z.string(),
            accent: z.string(),
        })
            .optional(),
        custom_domain: z.string().optional(),
    })
        .partial(),
});
// ============================================================================
// ORGANIZATION ANALYTICS OPERATIONS
// ============================================================================
/**
 * Get Organization Statistics Operation Schema
 * Retrieve organization metrics and statistics
 */
export const GetOrganizationStatisticsOperationSchema = z.object({
    organization_id: z.string().uuid(),
    date_range: z
        .object({
        start_date: z.string().datetime(),
        end_date: z.string().datetime(),
    })
        .optional(),
    include_member_activity: z.boolean().default(true),
    include_content_metrics: z.boolean().default(false),
    include_assessment_metrics: z.boolean().default(false),
});
/**
 * Get Organization Dashboard Operation Schema
 * Retrieve organization dashboard data
 */
export const GetOrganizationDashboardOperationSchema = z.object({
    organization_id: z.string().uuid(),
    include_recent_activity: z.boolean().default(true),
    include_member_summary: z.boolean().default(true),
    include_content_summary: z.boolean().default(false),
    include_assessment_summary: z.boolean().default(false),
});
//# sourceMappingURL=organization.operations.js.map