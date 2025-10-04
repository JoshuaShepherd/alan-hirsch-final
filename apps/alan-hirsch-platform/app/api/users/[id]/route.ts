import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  userProfileResponseSchema,
  userProfileUpdateSchema,
} from '@platform/shared/contracts';
import { userService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// User Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/users/[id] - Get user by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: userProfileResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('User ID is required');
    }

    const user = await userService.findById(id, context);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
});

// PUT /api/users/[id] - Update user
export const PUT = createRouteHandler({
  inputSchema: userProfileUpdateSchema,
  outputSchema: userProfileResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('User ID is required');
    }

    return await userService.update(id, data, context);
  },
});

// DELETE /api/users/[id] - Delete user
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('User ID is required');
    }

    await userService.delete(id, context);
    return { success: true };
  },
});
