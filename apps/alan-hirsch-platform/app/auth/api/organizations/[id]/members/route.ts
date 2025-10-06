// ============================================================================
// ORGANIZATION MEMBERS API ROUTES
// ============================================================================
// Type-safe API endpoints for organization membership management

import { createPostHandler } from '../../../../../../lib/api/route-handlers';
import { organizationService } from '../../../../../../lib/services';

// ============================================================================
// GET /api/organizations/[id]/members - Get organization members
// ============================================================================

export const GET = createPaginatedRouteHandler({
  outputSchema: OrganizationMembershipEntity,
  requireAuth: true,
  requirePermissions: ['read'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    return await organizationService.getMembers(id, {});
  },
});

// ============================================================================
// POST /api/organizations/[id]/members - Add member to organization
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateOrganizationMembership,
  outputSchema: OrganizationMembershipEntity,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (data, context) => {
    const { id } = context.request.params as { id: string };
    return await organizationService.addMember(id, data, context);
  },
});
