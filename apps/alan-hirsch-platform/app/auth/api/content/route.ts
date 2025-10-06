// ============================================================================
// CONTENT API ROUTES
// ============================================================================
// Type-safe API endpoints for content management with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  ContentItemWithAuthorApiResponseSchema,
  CreateContentItemApiRequestSchema,
  ListContentItemsApiQuerySchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { contentService } from '../../../../lib/services';

// ============================================================================
// GET /api/content - List content items with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListContentItemsApiQuerySchema,
  outputSchema: ContentItemWithAuthorApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:content'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await contentService.findMany(validatedQuery, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to fetch content items');
    }

    // Service already returns properly formatted entities
    return {
      data: result.data,
      pagination: {
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 10,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.totalPages || 0,
        hasNext: result.pagination?.hasMore || false,
        hasPrev: (result.pagination?.page || 1) > 1,
      },
    };
  },
});

// ============================================================================
// POST /api/content - Create new content item
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateContentItemApiRequestSchema,
  outputSchema: ContentItemWithAuthorApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:content'],
  handler: async (validatedData, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await contentService.create(validatedData, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to create content item');
    }

    // Service already returns properly formatted entity
    return result.data;
  },
});
