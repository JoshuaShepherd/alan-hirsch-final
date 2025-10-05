// ============================================================================
// CONTENT BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual content operations with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  ContentItemWithAuthorApiResponseSchema,
  GetContentItemApiQuerySchema,
  UpdateContentItemApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { NotFoundError } from '../../../../../lib/api/error-handler';
import {
  createDeleteHandler,
  createGetHandler,
  createPatchHandler,
  createPutHandler,
  validatePathParams,
} from '../../../../../lib/api/route-handlers';
import { toContentItemResponseDTO } from '../../../../../lib/mappers/content';
import { contentService } from '../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const ContentIdPathSchema = z.object({
  id: z.string().uuid('Invalid content ID format'),
});

// ============================================================================
// GET /api/content/[id] - Get content by ID
// ============================================================================

export const GET = createGetHandler({
  inputSchema: GetContentItemApiQuerySchema,
  outputSchema: ContentItemWithAuthorApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:content'],
  handler: async (validatedQuery, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      ContentIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await contentService.findById(pathParams.id, context);

    if (!result) {
      throw new NotFoundError('Content');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toContentItemResponseDTO(result);
  },
});

// ============================================================================
// PUT /api/content/[id] - Update content
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateContentItemApiRequestSchema,
  outputSchema: ContentItemWithAuthorApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:content'],
  handler: async (validatedData, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      ContentIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await contentService.update(
      pathParams.id,
      validatedData,
      context
    );

    if (!result) {
      throw new NotFoundError('Content');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toContentItemResponseDTO(result);
  },
});

// ============================================================================
// PATCH /api/content/[id] - Publish content
// ============================================================================

export const PATCH = createPatchHandler({
  inputSchema: undefined, // No input needed for publish action
  outputSchema: ContentItemWithAuthorApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['publish:content'],
  handler: async (_, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      ContentIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await contentService.publish(pathParams.id, context);

    if (!result) {
      throw new NotFoundError('Content');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toContentItemResponseDTO(result);
  },
});

// ============================================================================
// DELETE /api/content/[id] - Delete content
// ============================================================================

export const DELETE = createDeleteHandler({
  inputSchema: undefined, // No input needed for delete action
  outputSchema: z.object({
    deleted: z.boolean(),
    id: z.string().uuid(),
  }),
  requireAuth: true,
  requirePermissions: ['delete:content'],
  handler: async (_, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      ContentIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const success = await contentService.delete(pathParams.id, context);

    if (!success) {
      throw new NotFoundError('Content');
    }

    // Return standardized deletion response
    return {
      deleted: true,
      id: pathParams.id,
    };
  },
});
