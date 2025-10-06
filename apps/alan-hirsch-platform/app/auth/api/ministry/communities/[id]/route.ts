import {
  ministryCommunityResponseSchema,
  updateMinistryCommunityRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { communityService } from '../../../../../../lib/services';

// ============================================================================
// MINISTRY COMMUNITY BY ID API ROUTES
// ============================================================================

// GET /api/ministry/communities/[id] - Get ministry community by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: ministryCommunityResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    const community = await communityService.getMinistryCommunityById(
      id,
      context
    );
    if (!community) {
      throw new Error('Ministry community not found');
    }

    return community;
  },
});

// PUT /api/ministry/communities/[id] - Update ministry community
export const PUT = createRouteHandler({
  inputSchema: updateMinistryCommunityRequestSchema,
  outputSchema: ministryCommunityResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    // Add ministry context to update data
    const ministryData = {
      ...data,
      ministryContext: {
        updatedBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await communityService.updateMinistryCommunity(
      id,
      ministryData,
      context
    );
  },
});

// DELETE /api/ministry/communities/[id] - Delete ministry community
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    await communityService.deleteMinistryCommunity(id, context);
    return {
      success: true,
      message: 'Ministry community deleted successfully',
    };
  },
});
