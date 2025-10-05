import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  communityResponseSchema,
  updateCommunityRequestSchema,
} from '@platform/shared/contracts';
import { communityService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Community Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/communities/[id] - Get community by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: communityResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    const community = await communityService.findById(id, context);
    if (!community) {
      throw new Error('Community not found');
    }

    return community;
  },
});

// PUT /api/communities/[id] - Update community
export const PUT = createRouteHandler({
  inputSchema: updateCommunityRequestSchema,
  outputSchema: communityResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    return await communityService.update(id, data, context);
  },
});

// DELETE /api/communities/[id] - Delete community
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Community ID is required');
    }

    await communityService.delete(id, context);
    return { success: true };
  },
});
