// ============================================================================
// CONTENT PUBLISH API ROUTE
// ============================================================================
// Type-safe API endpoint for publishing content

import { createPostHandler } from '../../../../../../lib/api/route-handler';
import { contentService } from '../../../../../../lib/services';

// ============================================================================
// POST /api/content/[id]/publish - Publish content
// ============================================================================

export const POST = createPostHandler({
  outputSchema: ContentItemResponse,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (params, context) => {
    const { id } = context.request.params as { id: string };
    return await contentService.publish(id, context);
  },
});
