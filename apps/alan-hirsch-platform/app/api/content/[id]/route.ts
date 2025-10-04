import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  contentItemResponseSchema,
  updateContentItemRequestSchema,
} from '@platform/shared/contracts';
import { contentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Content Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/content/[id] - Get content item by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: contentItemResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Content ID is required');
    }

    const content = await contentService.findById(id, context);
    if (!content) {
      throw new Error('Content not found');
    }

    return content;
  },
});

// PUT /api/content/[id] - Update content item
export const PUT = createRouteHandler({
  inputSchema: updateContentItemRequestSchema,
  outputSchema: contentItemResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Content ID is required');
    }

    return await contentService.update(id, data, context);
  },
});

// DELETE /api/content/[id] - Delete content item
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Content ID is required');
    }

    await contentService.delete(id, context);
    return { success: true };
  },
});
