import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  organizationResponseSchema,
  updateOrganizationRequestSchema,
} from '@platform/shared/contracts';
import { organizationService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Organization Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/organizations/[id] - Get organization by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: organizationResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Organization ID is required');
    }

    const organization = await organizationService.findById(id, context);
    if (!organization) {
      throw new Error('Organization not found');
    }

    return organization;
  },
});

// PUT /api/organizations/[id] - Update organization
export const PUT = createRouteHandler({
  inputSchema: updateOrganizationRequestSchema,
  outputSchema: organizationResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Organization ID is required');
    }

    return await organizationService.update(id, data, context);
  },
});

// DELETE /api/organizations/[id] - Delete organization
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Organization ID is required');
    }

    await organizationService.delete(id, context);
    return { success: true };
  },
});
