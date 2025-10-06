import {
  inviteOrganizationMemberRequestSchema,
  ministryUserProfileResponseSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { organizationService } from '../../../../../../../../lib/services';

// ============================================================================
// MINISTRY ORGANIZATION MEMBERS API ROUTES
// ============================================================================

// Query schema for listing organization members
const organizationMembersQuerySchema = createQuerySchema({
  search: z.string().optional(),
  role: z.enum(['owner', 'admin', 'member', 'viewer']).optional(),
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
    .optional(),
  status: z.enum(['active', 'inactive', 'pending', 'suspended']).optional(),
  joinedAfter: z.string().datetime().optional(),
  joinedBefore: z.string().datetime().optional(),
});

// GET /api/ministry/organizations/[id]/members - List organization members
export const GET = createPaginatedRouteHandler({
  inputSchema: organizationMembersQuerySchema,
  outputSchema: ministryUserProfileResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    const organizationId = context.params?.id;
    if (!organizationId) {
      throw new Error('Organization ID is required');
    }

    // Add ministry context to query
    const ministryQuery = {
      ...query,
      organizationId,
      ministryContext: {
        userMinistryRole: context.user.ministryRole,
        organizationId: context.user.organizationId,
        culturalContext: context.user.culturalContext,
        requestingUserId: context.user.id,
      },
    };

    return await organizationService.getOrganizationMembers(
      ministryQuery,
      context
    );
  },
});

// POST /api/ministry/organizations/[id]/members - Invite member to organization
export const POST = createRouteHandler({
  inputSchema: inviteOrganizationMemberRequestSchema,
  outputSchema: ministryUserProfileResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    const organizationId = context.params?.id;
    if (!organizationId) {
      throw new Error('Organization ID is required');
    }

    // Add ministry context to invitation data
    const invitationData = {
      ...data,
      organizationId,
      ministryContext: {
        invitedBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await organizationService.inviteOrganizationMember(
      invitationData,
      context
    );
  },
});
