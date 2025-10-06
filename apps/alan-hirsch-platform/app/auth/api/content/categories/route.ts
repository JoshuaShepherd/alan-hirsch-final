// ============================================================================
// CONTENT CATEGORIES API ROUTES
// ============================================================================
// Type-safe API endpoints for content category management with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  ContentCategoryApiResponseSchema,
  CreateContentCategoryApiRequestSchema,
  ListContentCategoriesApiQuerySchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { toContentCategoryEntity } from '../../../../lib/mappers/content';
import { contentCategoryService } from '../../../../lib/services';

// ============================================================================
// GET /api/content/categories - List content categories with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListContentCategoriesApiQuerySchema,
  outputSchema: ContentCategoryApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:content'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await contentCategoryService.findMany(
      validatedQuery,
      context
    );

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch content categories'
      );
    }

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(category =>
      toContentCategoryEntity(category)
    );

    return {
      data: transformedData,
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
// POST /api/content/categories - Create new content category
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateContentCategoryApiRequestSchema,
  outputSchema: ContentCategoryApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:content'],
  handler: async (validatedData, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await contentCategoryService.create(validatedData, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to create content category'
      );
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toContentCategoryEntity(result.data);
  },
});
