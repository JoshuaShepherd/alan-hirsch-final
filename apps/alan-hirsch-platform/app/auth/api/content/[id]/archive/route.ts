// ============================================================================
// CONTENT ARCHIVE API ROUTE
// ============================================================================
// Type-safe API endpoint for archiving content

import { createPostHandler } from '../../../../../../lib/api/route-handler';
import { contentService } from '../../../../../../lib/services';

// ============================================================================
// POST /api/content/[id]/archive - Archive content
// ============================================================================

export const POST = createPostHandler({
  outputSchema: ContentItemResponse,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (params, context) => {
    const { id } = context.request.params as { id: string };
    return await contentService.archive(id, context);
  },
});
