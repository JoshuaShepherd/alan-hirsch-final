// ============================================================================
// ORGANIZATIONS API ROUTES
// ============================================================================
// Type-safe API endpoints for organization management with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  CreateOrganizationApiRequestSchema,
  ListOrganizationsApiQuerySchema,
  OrganizationApiResponseSchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { toOrganizationEntity } from '../../../../lib/mappers/organization';
import { organizationService } from '../../../../lib/services';

// ============================================================================
// GET /api/organizations - List organizations with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListOrganizationsApiQuerySchema,
  outputSchema: OrganizationApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:organizations'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await organizationService.findMany(validatedQuery, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to fetch organizations');
    }

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(organization =>
      toOrganizationEntity(organization)
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
// POST /api/organizations - Create new organization
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateOrganizationApiRequestSchema,
  outputSchema: OrganizationApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:organizations'],
  handler: async (validatedData, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await organizationService.create(validatedData, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to create organization');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toOrganizationEntity(result.data);
  },
});
