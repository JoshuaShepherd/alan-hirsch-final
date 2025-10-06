import { contentItemResponseSchema } from '@platform/contracts';
import { createBulkOperationHandler } from '@platform/shared/api/bulk-operations';
import { contentService } from '../../../../../lib/services';

// ============================================================================
// Content Bulk Operations API Route - Type-Safe Implementation
// ============================================================================

// POST /api/content/bulk - Bulk operations on content items
export const POST = createBulkOperationHandler({
  itemSchema: contentItemResponseSchema,
  createSchema: createContentItemRequestSchema,
  updateSchema: updateContentItemRequestSchema,
  service: {
    create: contentService.create,
    update: contentService.update,
    delete: contentService.delete,
  },
});
