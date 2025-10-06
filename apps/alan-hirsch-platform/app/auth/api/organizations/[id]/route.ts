// ============================================================================
// ORGANIZATION BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual organization operations with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  GetOrganizationByIdApiQuerySchema,
  OrganizationApiResponseSchema,
  UpdateOrganizationApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { NotFoundError } from '../../../../../lib/api/error-handler';
import {
  createDeleteHandler,
  createGetHandler,
  createPutHandler,
  validatePathParams,
} from '../../../../../lib/api/route-handlers';
import { toOrganizationEntity } from '../../../../../lib/mappers/organization';
import { organizationService } from '../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const OrganizationIdPathSchema = z.object({
  id: z.string().uuid('Invalid organization ID format'),
});

// ============================================================================
// GET /api/organizations/[id] - Get organization by ID
// ============================================================================

export const GET = createGetHandler({
  inputSchema: GetOrganizationByIdApiQuerySchema,
  outputSchema: OrganizationApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:organizations'],
  handler: async (validatedQuery, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      OrganizationIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await organizationService.findById(pathParams.id, context);

    if (!result.success || !result.data) {
      throw new NotFoundError('Organization');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toOrganizationEntity(result.data);
  },
});

// ============================================================================
// PUT /api/organizations/[id] - Update organization
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateOrganizationApiRequestSchema,
  outputSchema: OrganizationApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:organizations'],
  handler: async (validatedData, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      OrganizationIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await organizationService.update(
      pathParams.id,
      validatedData,
      context
    );

    if (!result.success || !result.data) {
      throw new NotFoundError('Organization');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toOrganizationEntity(result.data);
  },
});

// ============================================================================
// DELETE /api/organizations/[id] - Delete organization
// ============================================================================

export const DELETE = createDeleteHandler({
  inputSchema: z.object({}),
  outputSchema: z.object({
    deleted: z.boolean(),
    id: z.string().uuid(),
  }),
  requireAuth: true,
  requirePermissions: ['delete:organizations'],
  handler: async (_, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      OrganizationIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await organizationService.delete(pathParams.id, context);

    if (!result.success) {
      throw new NotFoundError('Organization');
    }

    // Return standardized deletion response
    return {
      deleted: true,
      id: pathParams.id,
    };
  },
});
