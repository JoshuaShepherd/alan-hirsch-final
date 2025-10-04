import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  ministryOrganizationResponseSchema,
  updateMinistryOrganizationRequestSchema,
} from '@platform/shared/contracts';
import { organizationService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// MINISTRY ORGANIZATION BY ID API ROUTES
// ============================================================================

// GET /api/ministry/organizations/[id] - Get ministry organization by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: ministryOrganizationResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Organization ID is required');
    }

    const organization = await organizationService.getMinistryOrganizationById(
      id,
      context
    );
    if (!organization) {
      throw new Error('Ministry organization not found');
    }

    return organization;
  },
});

// PUT /api/ministry/organizations/[id] - Update ministry organization
export const PUT = createRouteHandler({
  inputSchema: updateMinistryOrganizationRequestSchema,
  outputSchema: ministryOrganizationResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Organization ID is required');
    }

    // Add ministry context to update data
    const ministryData = {
      ...data,
      ministryContext: {
        updatedBy: context.user.id,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await organizationService.updateMinistryOrganization(
      id,
      ministryData,
      context
    );
  },
});

// DELETE /api/ministry/organizations/[id] - Delete ministry organization
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Organization ID is required');
    }

    await organizationService.deleteMinistryOrganization(id, context);
    return {
      success: true,
      message: 'Ministry organization deleted successfully',
    };
  },
});
