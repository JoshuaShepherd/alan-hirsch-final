// ============================================================================
// ORGANIZATION INVITE API ROUTE
// ============================================================================
// Type-safe API endpoint for inviting users to organizations

import { z } from 'zod';
import { createPostHandler } from '../../../../../../lib/api/route-handler';
import { organizationService } from '../../../../../../lib/services';

// ============================================================================
// POST /api/organizations/[id]/invite - Invite user to organization
// ============================================================================

const InviteUserSchema = z.object({
  email: z.string().email(),
  role: z.string().default('member'),
});

export const POST = createPostHandler({
  inputSchema: InviteUserSchema,
  outputSchema: OrganizationMembershipEntity,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (data, context) => {
    const { id } = context.request.params as { id: string };
    return await organizationService.inviteUser(
      id,
      data.email,
      data.role,
      context
    );
  },
});
