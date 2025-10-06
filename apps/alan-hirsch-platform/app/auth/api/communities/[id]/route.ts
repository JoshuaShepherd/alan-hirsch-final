import {
  createDeleteHandler,
  createGetHandler,
  createPutHandler,
} from '@/lib/api/route-handlers';
import { communityService } from '@/lib/services';
import {
  communityResponseSchema,
  updateCommunityRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';

// ============================================================================
// Community Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/communities/[id] - Get community by ID
export const GET = createGetHandler({
  inputSchema: z.object({}),
  outputSchema: communityResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:communities'],
  handler: async (_, context, routeParams) => {
    const id = routeParams?.params?.['id'];
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
export const PUT = createPutHandler({
  inputSchema: updateCommunityRequestSchema,
  outputSchema: communityResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:communities'],
  handler: async (data, context, routeParams) => {
    const id = routeParams?.params?.['id'];
    if (!id) {
      throw new Error('Community ID is required');
    }

    return await communityService.update(id, data, context);
  },
});

// DELETE /api/communities/[id] - Delete community
export const DELETE = createDeleteHandler({
  inputSchema: z.object({}),
  requireAuth: true,
  requirePermissions: ['delete:communities'],
  handler: async (_, context, routeParams) => {
    const id = routeParams?.params?.['id'];
    if (!id) {
      throw new Error('Community ID is required');
    }

    await communityService.delete(id, context);
    return { success: true };
  },
});
