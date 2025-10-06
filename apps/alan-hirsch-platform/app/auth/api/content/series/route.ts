// ============================================================================
// CONTENT SERIES API ROUTES
// ============================================================================
// Type-safe API endpoints for content series management with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  ContentSeriesApiResponseSchema,
  CreateContentSeriesApiRequestSchema,
  ListContentSeriesApiQuerySchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../../lib/api/route-handlers';
import { ContentSeriesService } from '../../../../../lib/services';

// Create service instance
const contentSeriesService = new ContentSeriesService();

// ============================================================================
// GET /api/content/series - List content series with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListContentSeriesApiQuerySchema,
  outputSchema: ContentSeriesApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:content'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await contentSeriesService.findMany(validatedQuery, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch content series'
      );
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
// POST /api/content/series - Create new content series
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateContentSeriesApiRequestSchema,
  outputSchema: ContentSeriesApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:content'],
  handler: async (validatedData, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await contentSeriesService.create(validatedData, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to create content series'
      );
    }

    // Service already returns properly formatted entity
    return result.data;
  },
});
