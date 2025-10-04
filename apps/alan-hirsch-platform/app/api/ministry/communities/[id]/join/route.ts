import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  joinMinistryCommunityRequestSchema,
  ministryCommunityResponseSchema,
} from '@platform/shared/contracts';
import { communityService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// MINISTRY COMMUNITY JOIN API ROUTES
// ============================================================================

// POST /api/ministry/communities/[id]/join - Join ministry community
export const POST = createRouteHandler({
  inputSchema: joinMinistryCommunityRequestSchema,
  outputSchema: ministryCommunityResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    // Add ministry context to join data
    const joinData = {
      ...data,
      ministryContext: {
        userId: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await communityService.joinMinistryCommunity(id, joinData, context);
  },
});

// DELETE /api/ministry/communities/[id]/join - Leave ministry community
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    await communityService.leaveMinistryCommunity(id, context.user.id, context);
    return { success: true, message: 'Left ministry community successfully' };
  },
});
