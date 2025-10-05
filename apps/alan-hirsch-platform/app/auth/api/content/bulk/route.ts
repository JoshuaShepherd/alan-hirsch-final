import { createBulkOperationHandler } from '@platform/shared/api/bulk-operations';
import {
  contentItemResponseSchema,
  createContentItemRequestSchema,
  updateContentItemRequestSchema,
} from '@platform/shared/contracts';
import { contentService } from '@platform/shared/services';

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
