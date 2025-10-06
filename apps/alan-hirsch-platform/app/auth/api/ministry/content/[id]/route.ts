import {
  ministryContentItemResponseSchema,
  updateMinistryContentRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { contentService } from '../../../../../../lib/services';

// ============================================================================
// MINISTRY CONTENT BY ID API ROUTES
// ============================================================================

// GET /api/ministry/content/[id] - Get ministry content by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: ministryContentItemResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Content ID is required');
    }

    const content = await contentService.getMinistryContentById(id, context);
    if (!content) {
      throw new Error('Ministry content not found');
    }

    return content;
  },
});

// PUT /api/ministry/content/[id] - Update ministry content
export const PUT = createRouteHandler({
  inputSchema: updateMinistryContentRequestSchema,
  outputSchema: ministryContentItemResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Content ID is required');
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

    return await contentService.updateMinistryContent(
      id,
      ministryData,
      context
    );
  },
});

// DELETE /api/ministry/content/[id] - Delete ministry content
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Content ID is required');
    }

    await contentService.deleteMinistryContent(id, context);
    return { success: true, message: 'Ministry content deleted successfully' };
  },
});
