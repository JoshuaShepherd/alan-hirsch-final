import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema, UserFormSchema, UserQuerySchema, } from '../entities/user.schema';
// ============================================================================
// USER OPERATIONS - DERIVED FROM ENTITY SCHEMAS
// ============================================================================
// All operations are derived from the UserEntitySchema to ensure consistency
// and eliminate duplication across the codebase.
/**
 * User CRUD Operations
 * These schemas define the operations that can be performed on user entities
 */
// ============================================================================
// CREATE OPERATIONS
// ============================================================================
/**
 * Create User Operation Schema
 * Derived from CreateUserSchema with operation-specific validation
 */
export const CreateUserOperationSchema = CreateUserSchema.extend({
    // Additional validation for create operations
    email: z
        .string()
        .email()
        .refine(email => !email.includes('+'), {
        message: 'Email aliases not allowed',
    }),
    first_name: z
        .string()
        .min(1)
        .max(255)
        .refine(name => /^[a-zA-Z\s'-]+$/.test(name), {
        message: 'First name contains invalid characters',
    }),
    last_name: z
        .string()
        .min(1)
        .max(255)
        .refine(name => /^[a-zA-Z\s'-]+$/.test(name), {
        message: 'Last name contains invalid characters',
    }),
});
/**
 * Create User with Organization Operation Schema
 * Extends create user with organization context
 */
export const CreateUserWithOrganizationOperationSchema = CreateUserOperationSchema.extend({
    organization: z.object({
        name: z.string().min(1).max(255),
        organization_type: z.enum([
            'church',
            'denomination',
            'seminary',
            'nonprofit',
            'ministry',
            'business',
            'other',
        ]),
        role: z.enum(['owner', 'admin', 'member', 'viewer']).default('member'),
    }),
});
// ============================================================================
// READ OPERATIONS
// ============================================================================
/**
 * Get User by ID Operation Schema
 * Simple ID-based retrieval
 */
export const GetUserByIdOperationSchema = z.object({
    id: z.string().uuid(),
    include_organizations: z.boolean().default(false),
    include_assessments: z.boolean().default(false),
});
/**
 * Get User by Email Operation Schema
 * Email-based retrieval for authentication
 */
export const GetUserByEmailOperationSchema = z.object({
    email: z.string().email(),
    include_organizations: z.boolean().default(false),
});
/**
 * List Users Operation Schema
 * Paginated user listing with filters
 */
export const ListUsersOperationSchema = UserQuerySchema.extend({
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    offset: z.number().int().min(0).default(0),
    // Sorting
    sort_by: z
        .enum([
        'created_at',
        'updated_at',
        'last_active_at',
        'first_name',
        'last_name',
    ])
        .default('created_at'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
    // Include options
    include_organizations: z.boolean().default(false),
    include_assessments: z.boolean().default(false),
});
/**
 * Search Users Operation Schema
 * Full-text search with advanced filters
 */
export const SearchUsersOperationSchema = z.object({
    // Search query
    query: z.string().min(1).max(255),
    // Filters
    ministry_role: z
        .array(z.enum([
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
    ]))
        .optional(),
    country_code: z.array(z.string().length(2)).optional(),
    cultural_context: z
        .array(z.enum([
        'western',
        'eastern',
        'african',
        'latin_american',
        'middle_eastern',
        'oceanic',
        'universal',
        'global',
    ]))
        .optional(),
    leader_tier: z
        .array(z.enum(['core', 'network', 'emerging', 'community']))
        .optional(),
    // Pagination
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(50).default(20),
    // Sorting
    sort_by: z
        .enum(['relevance', 'created_at', 'last_active_at'])
        .default('relevance'),
    sort_order: z.enum(['asc', 'desc']).default('desc'),
});
// ============================================================================
// UPDATE OPERATIONS
// ============================================================================
/**
 * Update User Operation Schema
 * Derived from UpdateUserSchema with operation-specific validation
 */
export const UpdateUserOperationSchema = UpdateUserSchema.extend({
// Ensure at least one field is provided for update
}).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
/**
 * Update User Profile Operation Schema
 * Specific to profile updates with additional validation
 */
export const UpdateUserProfileOperationSchema = UpdateUserSchema.pick({
    first_name: true,
    last_name: true,
    display_name: true,
    bio: true,
    avatar_url: true,
    ministry_role: true,
    denomination: true,
    organization_name: true,
    years_in_ministry: true,
    country_code: true,
    timezone: true,
    language_primary: true,
    cultural_context: true,
    platform_title: true,
    theological_focus: true,
    brand_colors: true,
    privacy_settings: true,
}).partial();
/**
 * Update User Settings Operation Schema
 * Specific to settings updates
 */
export const UpdateUserSettingsOperationSchema = UpdateUserSchema.pick({
    email_notifications: true,
    privacy_settings: true,
    brand_colors: true,
}).partial();
/**
 * Update User Assessment Scores Operation Schema
 * Specific to assessment score updates
 */
export const UpdateUserAssessmentScoresOperationSchema = UpdateUserSchema.pick({
    assessment_movement_alignment: true,
    assessment_audience_engagement: true,
    assessment_content_readiness: true,
    assessment_revenue_potential: true,
    assessment_network_effects: true,
    assessment_strategic_fit: true,
    assessment_total: true,
    leader_tier: true,
}).partial();
// ============================================================================
// DELETE OPERATIONS
// ============================================================================
/**
 * Delete User Operation Schema
 * User deletion with confirmation
 */
export const DeleteUserOperationSchema = z.object({
    id: z.string().uuid(),
    confirmation: z
        .string()
        .refine(val => val === 'DELETE', {
        message: "Confirmation must be 'DELETE'",
    }),
    transfer_ownership: z
        .object({
        organization_id: z.string().uuid(),
        new_owner_id: z.string().uuid(),
    })
        .optional(),
});
/**
 * Deactivate User Operation Schema
 * Soft delete user account
 */
export const DeactivateUserOperationSchema = z.object({
    id: z.string().uuid(),
    reason: z.string().max(500).optional(),
});
// ============================================================================
// AUTHENTICATION OPERATIONS
// ============================================================================
/**
 * User Login Operation Schema
 * Authentication with email/password
 */
export const UserLoginOperationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    remember_me: z.boolean().default(false),
});
/**
 * User Registration Operation Schema
 * New user registration with validation
 */
export const UserRegistrationOperationSchema = UserFormSchema.extend({
    password: z.string().min(8).max(128),
    confirm_password: z.string().min(8).max(128),
}).refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
});
/**
 * User Password Reset Operation Schema
 * Password reset request
 */
export const UserPasswordResetOperationSchema = z.object({
    email: z.string().email(),
});
/**
 * User Password Update Operation Schema
 * Password update with current password verification
 */
export const UserPasswordUpdateOperationSchema = z
    .object({
    current_password: z.string().min(8),
    new_password: z.string().min(8).max(128),
    confirm_new_password: z.string().min(8).max(128),
})
    .refine(data => data.new_password === data.confirm_new_password, {
    message: 'New passwords do not match',
    path: ['confirm_new_password'],
});
//# sourceMappingURL=user.operations.js.map