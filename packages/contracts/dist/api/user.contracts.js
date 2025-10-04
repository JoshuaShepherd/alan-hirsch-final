import { z } from 'zod';
import { PublicUserSchema, UserEntitySchema } from '../entities/user.schema';
import { CreateUserOperationSchema, CreateUserWithOrganizationOperationSchema, DeactivateUserOperationSchema, DeleteUserOperationSchema, GetUserByEmailOperationSchema, GetUserByIdOperationSchema, ListUsersOperationSchema, SearchUsersOperationSchema, UpdateUserAssessmentScoresOperationSchema, UpdateUserProfileOperationSchema, UpdateUserSettingsOperationSchema, UserLoginOperationSchema, UserPasswordResetOperationSchema, UserPasswordUpdateOperationSchema, UserRegistrationOperationSchema, } from '../operations/user.operations';
// ============================================================================
// USER API CONTRACTS - DERIVED FROM OPERATIONS
// ============================================================================
// All API contracts are derived from operation schemas to ensure consistency
// and eliminate duplication across the codebase.
// ============================================================================
// COMMON API RESPONSE SCHEMAS
// ============================================================================
/**
 * Standard API Response Schema
 * Common response wrapper for all API endpoints
 */
export const ApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.unknown().optional(),
    error: z
        .object({
        code: z.string(),
        message: z.string(),
        details: z.unknown().optional(),
    })
        .optional(),
    meta: z
        .object({
        pagination: z
            .object({
            page: z.number().int().min(1),
            limit: z.number().int().min(1),
            total: z.number().int().min(0),
            total_pages: z.number().int().min(0),
        })
            .optional(),
        timestamp: z.string().datetime(),
    })
        .optional(),
});
/**
 * Paginated Response Schema
 * For endpoints that return paginated data
 */
export const PaginatedResponseSchema = (itemSchema) => z.object({
    success: z.boolean(),
    data: z.array(itemSchema),
    meta: z.object({
        pagination: z.object({
            page: z.number().int().min(1),
            limit: z.number().int().min(1),
            total: z.number().int().min(0),
            total_pages: z.number().int().min(0),
            has_next: z.boolean(),
            has_prev: z.boolean(),
        }),
        timestamp: z.string().datetime(),
    }),
});
// ============================================================================
// USER API REQUEST CONTRACTS
// ============================================================================
/**
 * Create User API Request Contract
 * Derived from CreateUserOperationSchema
 */
export const CreateUserApiRequestSchema = CreateUserOperationSchema;
/**
 * Create User with Organization API Request Contract
 * Derived from CreateUserWithOrganizationOperationSchema
 */
export const CreateUserWithOrganizationApiRequestSchema = CreateUserWithOrganizationOperationSchema;
/**
 * User Login API Request Contract
 * Derived from UserLoginOperationSchema
 */
export const UserLoginApiRequestSchema = UserLoginOperationSchema;
/**
 * User Registration API Request Contract
 * Derived from UserRegistrationOperationSchema
 */
export const UserRegistrationApiRequestSchema = UserRegistrationOperationSchema;
/**
 * User Password Reset API Request Contract
 * Derived from UserPasswordResetOperationSchema
 */
export const UserPasswordResetApiRequestSchema = UserPasswordResetOperationSchema;
/**
 * User Password Update API Request Contract
 * Derived from UserPasswordUpdateOperationSchema
 */
export const UserPasswordUpdateApiRequestSchema = UserPasswordUpdateOperationSchema;
/**
 * Update User Profile API Request Contract
 * Derived from UpdateUserProfileOperationSchema
 */
export const UpdateUserProfileApiRequestSchema = UpdateUserProfileOperationSchema;
/**
 * Update User Settings API Request Contract
 * Derived from UpdateUserSettingsOperationSchema
 */
export const UpdateUserSettingsApiRequestSchema = UpdateUserSettingsOperationSchema;
/**
 * Update User Assessment Scores API Request Contract
 * Derived from UpdateUserAssessmentScoresOperationSchema
 */
export const UpdateUserAssessmentScoresApiRequestSchema = UpdateUserAssessmentScoresOperationSchema;
/**
 * Delete User API Request Contract
 * Derived from DeleteUserOperationSchema
 */
export const DeleteUserApiRequestSchema = DeleteUserOperationSchema;
/**
 * Deactivate User API Request Contract
 * Derived from DeactivateUserOperationSchema
 */
export const DeactivateUserApiRequestSchema = DeactivateUserOperationSchema;
/**
 * Search Users API Request Contract
 * Derived from SearchUsersOperationSchema
 */
export const SearchUsersApiRequestSchema = SearchUsersOperationSchema;
// ============================================================================
// USER API RESPONSE CONTRACTS
// ============================================================================
/**
 * User API Response Contract
 * Derived from UserEntitySchema for internal API responses
 */
export const UserApiResponseSchema = UserEntitySchema;
/**
 * Public User API Response Contract
 * Derived from PublicUserSchema for public API responses
 */
export const PublicUserApiResponseSchema = PublicUserSchema;
/**
 * User with Organizations API Response Contract
 * Extends user with organization information
 */
export const UserWithOrganizationsApiResponseSchema = UserEntitySchema.extend({
    organizations: z
        .array(z.object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
        role: z.enum(['owner', 'admin', 'member', 'viewer']),
        status: z.enum(['active', 'inactive', 'pending', 'suspended']),
        joined_at: z.string().datetime(),
    }))
        .default([]),
});
/**
 * User with Assessments API Response Contract
 * Extends user with assessment information
 */
export const UserWithAssessmentsApiResponseSchema = UserEntitySchema.extend({
    assessments: z
        .array(z.object({
        id: z.string().uuid(),
        assessment_id: z.string().uuid(),
        assessment_name: z.string(),
        started_at: z.string().datetime(),
        completed_at: z.string().datetime().optional(),
        completion_percentage: z.number().min(0).max(100),
        total_score: z.number().int().min(0).optional(),
        primary_gift: z
            .enum([
            'apostolic',
            'prophetic',
            'evangelistic',
            'shepherding',
            'teaching',
        ])
            .optional(),
    }))
        .default([]),
});
/**
 * User List API Response Contract
 * Paginated list of users
 */
export const UserListApiResponseSchema = PaginatedResponseSchema(PublicUserApiResponseSchema);
/**
 * User Search API Response Contract
 * Search results for users
 */
export const UserSearchApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        users: z.array(PublicUserApiResponseSchema),
        total: z.number().int().min(0),
        query: z.string(),
        took: z.number().min(0), // milliseconds
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * User Authentication API Response Contract
 * Response for authentication endpoints
 */
export const UserAuthApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: UserApiResponseSchema,
        token: z.string(),
        expires_at: z.string().datetime(),
        refresh_token: z.string().optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * User Profile Update API Response Contract
 * Response for profile update endpoints
 */
export const UserProfileUpdateApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: UserApiResponseSchema,
        updated_fields: z.array(z.string()),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * User Settings Update API Response Contract
 * Response for settings update endpoints
 */
export const UserSettingsUpdateApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: UserApiResponseSchema,
        updated_settings: z.array(z.string()),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * User Assessment Scores Update API Response Contract
 * Response for assessment scores update endpoints
 */
export const UserAssessmentScoresUpdateApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: UserApiResponseSchema,
        updated_scores: z.array(z.string()),
        leader_tier_updated: z.boolean(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
// ============================================================================
// USER API QUERY CONTRACTS
// ============================================================================
/**
 * Get User by ID API Query Contract
 * Derived from GetUserByIdOperationSchema
 */
export const GetUserByIdApiQuerySchema = GetUserByIdOperationSchema;
/**
 * Get User by Email API Query Contract
 * Derived from GetUserByEmailOperationSchema
 */
export const GetUserByEmailApiQuerySchema = GetUserByEmailOperationSchema;
/**
 * List Users API Query Contract
 * Derived from ListUsersOperationSchema
 */
export const ListUsersApiQuerySchema = ListUsersOperationSchema;
//# sourceMappingURL=user.contracts.js.map