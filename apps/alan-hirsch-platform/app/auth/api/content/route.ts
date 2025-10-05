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
import { toContentItemResponseDTO } from '../../../../lib/mappers/content';
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

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(content =>
      toContentItemResponseDTO(content)
    );

    return {
      data: transformedData,
      pagination: result.pagination,
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

    // Transform DB row to response DTO using mappers (egress validation)
    return toContentItemResponseDTO(result);
  },
});
