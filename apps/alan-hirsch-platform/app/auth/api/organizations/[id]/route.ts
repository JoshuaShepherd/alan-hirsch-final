// ============================================================================
// ORGANIZATION BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual organization operations

import {
  createDeleteHandler,
  createGetHandler,
  createPutHandler,
} from '../../../../../lib/api/route-handler';
import { organizationService } from '../../../../../lib/services';

// ============================================================================
// GET /api/organizations/[id] - Get organization by ID
// ============================================================================

export const GET = createGetHandler({
  outputSchema: OrganizationEntity,
  requireAuth: true,
  requirePermissions: ['read'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    const organization = await organizationService.findById(id, context);

    if (!organization) {
      throw new Error('Organization not found');
    }

    return organization;
  },
});

// ============================================================================
// PUT /api/organizations/[id] - Update organization
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateOrganization,
  outputSchema: OrganizationEntity,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (data, context) => {
    const { id } = context.request.params as { id: string };
    return await organizationService.update(id, data, context);
  },
});

// ============================================================================
// DELETE /api/organizations/[id] - Delete organization
// ============================================================================

export const DELETE = createDeleteHandler({
  requireAuth: true,
  requirePermissions: ['admin'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    const success = await organizationService.delete(id, context);

    if (!success) {
      throw new Error('Organization not found');
    }

    return { success: true };
  },
});
