import { z } from 'zod';
import { organizationEntitySchema as OrganizationEntitySchema, organizationMembershipEntitySchema as OrganizationMembershipEntitySchema, } from '../entities/organization.schema';
import { AcceptOrganizationInvitationOperationSchema, CreateOrganizationMembershipOperationSchema, CreateOrganizationOperationSchema, GetOrganizationByIdOperationSchema, GetOrganizationBySubdomainOperationSchema, GetOrganizationDashboardOperationSchema, GetOrganizationMembersOperationSchema, GetOrganizationStatisticsOperationSchema, InviteUserToOrganizationOperationSchema, ListOrganizationMembershipsOperationSchema, ListOrganizationsOperationSchema, RejectOrganizationInvitationOperationSchema, RemoveUserFromOrganizationOperationSchema, SearchOrganizationsOperationSchema, UpdateOrganizationBrandingOperationSchema, UpdateOrganizationMembershipOperationSchema, UpdateOrganizationOperationSchema, UpdateOrganizationSettingsOperationSchema, } from '../operations/organization.operations';
import { PaginatedResponseSchema } from './user.contracts';
// ============================================================================
// ORGANIZATION API CONTRACTS - DERIVED FROM OPERATIONS
// ============================================================================
// All API contracts are derived from operation schemas to ensure consistency
// and eliminate duplication across the codebase.
// ============================================================================
// ORGANIZATION API REQUEST CONTRACTS
// ============================================================================
/**
 * Create Organization API Request Contract
 * Derived from CreateOrganizationOperationSchema
 */
export const CreateOrganizationApiRequestSchema = CreateOrganizationOperationSchema;
/**
 * Update Organization API Request Contract
 * Derived from UpdateOrganizationOperationSchema
 */
export const UpdateOrganizationApiRequestSchema = UpdateOrganizationOperationSchema;
/**
 * Create Organization Membership API Request Contract
 * Derived from CreateOrganizationMembershipOperationSchema
 */
export const CreateOrganizationMembershipApiRequestSchema = CreateOrganizationMembershipOperationSchema;
/**
 * Update Organization Membership API Request Contract
 * Derived from UpdateOrganizationMembershipOperationSchema
 */
export const UpdateOrganizationMembershipApiRequestSchema = UpdateOrganizationMembershipOperationSchema;
/**
 * Invite User to Organization API Request Contract
 * Derived from InviteUserToOrganizationOperationSchema
 */
export const InviteUserToOrganizationApiRequestSchema = InviteUserToOrganizationOperationSchema;
/**
 * Accept Organization Invitation API Request Contract
 * Derived from AcceptOrganizationInvitationOperationSchema
 */
export const AcceptOrganizationInvitationApiRequestSchema = AcceptOrganizationInvitationOperationSchema;
/**
 * Reject Organization Invitation API Request Contract
 * Derived from RejectOrganizationInvitationOperationSchema
 */
export const RejectOrganizationInvitationApiRequestSchema = RejectOrganizationInvitationOperationSchema;
/**
 * Remove User from Organization API Request Contract
 * Derived from RemoveUserFromOrganizationOperationSchema
 */
export const RemoveUserFromOrganizationApiRequestSchema = RemoveUserFromOrganizationOperationSchema;
/**
 * Update Organization Settings API Request Contract
 * Derived from UpdateOrganizationSettingsOperationSchema
 */
export const UpdateOrganizationSettingsApiRequestSchema = UpdateOrganizationSettingsOperationSchema;
/**
 * Update Organization Branding API Request Contract
 * Derived from UpdateOrganizationBrandingOperationSchema
 */
export const UpdateOrganizationBrandingApiRequestSchema = UpdateOrganizationBrandingOperationSchema;
/**
 * Search Organizations API Request Contract
 * Derived from SearchOrganizationsOperationSchema
 */
export const SearchOrganizationsApiRequestSchema = SearchOrganizationsOperationSchema;
// ============================================================================
// ORGANIZATION API RESPONSE CONTRACTS
// ============================================================================
/**
 * Organization API Response Contract
 * Derived from OrganizationEntitySchema
 */
export const OrganizationApiResponseSchema = OrganizationEntitySchema;
/**
 * Organization with Members API Response Contract
 * Extends organization with member information
 */
export const OrganizationWithMembersApiResponseSchema = OrganizationEntitySchema.extend({
    members: z
        .array(z.object({
        id: z.string().uuid(),
        user_id: z.string().uuid(),
        user: z.object({
            id: z.string().uuid(),
            first_name: z.string(),
            last_name: z.string(),
            display_name: z.string().optional(),
            avatar_url: z.string().url().optional(),
            email: z.string().email(),
        }),
        role: z.enum(['owner', 'admin', 'member', 'viewer']),
        status: z.enum(['active', 'inactive', 'pending', 'suspended']),
        joined_at: z.string().datetime().optional(),
        permissions: z
            .object({
            can_manage_members: z.boolean(),
            can_manage_content: z.boolean(),
            can_manage_assessments: z.boolean(),
            can_view_analytics: z.boolean(),
            can_manage_billing: z.boolean(),
        })
            .optional(),
    }))
        .default([]),
});
/**
 * Organization Membership API Response Contract
 * Derived from OrganizationMembershipEntitySchema
 */
export const OrganizationMembershipApiResponseSchema = OrganizationMembershipEntitySchema;
/**
 * Organization Membership with Details API Response Contract
 * Extends membership with organization and user details
 */
export const OrganizationMembershipWithDetailsApiResponseSchema = OrganizationMembershipEntitySchema.extend({
    organization: OrganizationEntitySchema,
    user: z.object({
        id: z.string().uuid(),
        first_name: z.string(),
        last_name: z.string(),
        display_name: z.string().optional(),
        avatar_url: z.string().url().optional(),
        email: z.string().email(),
    }),
});
/**
 * Organization List API Response Contract
 * Paginated list of organizations
 */
export const OrganizationListApiResponseSchema = PaginatedResponseSchema(OrganizationApiResponseSchema);
/**
 * Organization Search API Response Contract
 * Search results for organizations
 */
export const OrganizationSearchApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        organizations: z.array(OrganizationApiResponseSchema),
        total: z.number().int().min(0),
        query: z.string(),
        took: z.number().min(0), // milliseconds
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Organization Statistics API Response Contract
 * Organization metrics and statistics
 */
export const OrganizationStatisticsApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        organization_id: z.string().uuid(),
        member_count: z.number().int().min(0),
        active_members: z.number().int().min(0),
        pending_invitations: z.number().int().min(0),
        content_count: z.number().int().min(0),
        assessment_completions: z.number().int().min(0),
        engagement_metrics: z.object({
            daily_active_users: z.number().int().min(0),
            weekly_active_users: z.number().int().min(0),
            monthly_active_users: z.number().int().min(0),
            average_session_duration: z.number().min(0), // minutes
        }),
        growth_metrics: z.object({
            new_members_this_month: z.number().int().min(0),
            new_members_this_week: z.number().int().min(0),
            member_retention_rate: z.number().min(0).max(100),
        }),
        trends: z
            .array(z.object({
            date: z.string().datetime(),
            active_members: z.number().int().min(0),
            content_created: z.number().int().min(0),
            assessments_completed: z.number().int().min(0),
        }))
            .optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Organization Dashboard API Response Contract
 * Organization dashboard data
 */
export const OrganizationDashboardApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        organization: OrganizationApiResponseSchema,
        recent_activity: z
            .array(z.object({
            id: z.string().uuid(),
            type: z.enum([
                'member_joined',
                'member_left',
                'content_created',
                'assessment_completed',
                'invitation_sent',
            ]),
            user: z.object({
                id: z.string().uuid(),
                first_name: z.string(),
                last_name: z.string(),
                display_name: z.string().optional(),
                avatar_url: z.string().url().optional(),
            }),
            description: z.string(),
            created_at: z.string().datetime(),
        }))
            .default([]),
        member_summary: z.object({
            total_members: z.number().int().min(0),
            active_members: z.number().int().min(0),
            pending_invitations: z.number().int().min(0),
            new_members_this_week: z.number().int().min(0),
        }),
        content_summary: z
            .object({
            total_content: z.number().int().min(0),
            published_content: z.number().int().min(0),
            draft_content: z.number().int().min(0),
            total_views: z.number().int().min(0),
        })
            .optional(),
        assessment_summary: z
            .object({
            total_assessments: z.number().int().min(0),
            completed_assessments: z.number().int().min(0),
            average_completion_rate: z.number().min(0).max(100),
            most_common_gift: z
                .enum([
                'apostolic',
                'prophetic',
                'evangelistic',
                'shepherding',
                'teaching',
            ])
                .optional(),
        })
            .optional(),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Organization Invitation API Response Contract
 * Response for organization invitations
 */
export const OrganizationInvitationApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        invitation: z.object({
            id: z.string().uuid(),
            organization_id: z.string().uuid(),
            organization_name: z.string(),
            email: z.string().email(),
            role: z.enum(['owner', 'admin', 'member', 'viewer']),
            status: z.enum(['pending', 'accepted', 'rejected', 'expired']),
            invited_by: z.object({
                id: z.string().uuid(),
                first_name: z.string(),
                last_name: z.string(),
                display_name: z.string().optional(),
            }),
            message: z.string().optional(),
            expires_at: z.string().datetime().optional(),
            created_at: z.string().datetime(),
        }),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Organization Settings Update API Response Contract
 * Response for organization settings updates
 */
export const OrganizationSettingsUpdateApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        organization: OrganizationApiResponseSchema,
        updated_settings: z.array(z.string()),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
/**
 * Organization Branding Update API Response Contract
 * Response for organization branding updates
 */
export const OrganizationBrandingUpdateApiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        organization: OrganizationApiResponseSchema,
        updated_branding: z.array(z.string()),
    }),
    meta: z.object({
        timestamp: z.string().datetime(),
    }),
});
// ============================================================================
// ORGANIZATION API QUERY CONTRACTS
// ============================================================================
/**
 * Get Organization by ID API Query Contract
 * Derived from GetOrganizationByIdOperationSchema
 */
export const GetOrganizationByIdApiQuerySchema = GetOrganizationByIdOperationSchema;
/**
 * Get Organization by Subdomain API Query Contract
 * Derived from GetOrganizationBySubdomainOperationSchema
 */
export const GetOrganizationBySubdomainApiQuerySchema = GetOrganizationBySubdomainOperationSchema;
/**
 * List Organizations API Query Contract
 * Derived from ListOrganizationsOperationSchema
 */
export const ListOrganizationsApiQuerySchema = ListOrganizationsOperationSchema;
/**
 * Get Organization Members API Query Contract
 * Derived from GetOrganizationMembersOperationSchema
 */
export const GetOrganizationMembersApiQuerySchema = GetOrganizationMembersOperationSchema;
/**
 * List Organization Memberships API Query Contract
 * Derived from ListOrganizationMembershipsOperationSchema
 */
export const ListOrganizationMembershipsApiQuerySchema = ListOrganizationMembershipsOperationSchema;
/**
 * Get Organization Statistics API Query Contract
 * Derived from GetOrganizationStatisticsOperationSchema
 */
export const GetOrganizationStatisticsApiQuerySchema = GetOrganizationStatisticsOperationSchema;
/**
 * Get Organization Dashboard API Query Contract
 * Derived from GetOrganizationDashboardOperationSchema
 */
export const GetOrganizationDashboardApiQuerySchema = GetOrganizationDashboardOperationSchema;
//# sourceMappingURL=organization.contracts.js.map