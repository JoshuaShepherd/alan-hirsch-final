import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  createMinistryOrganizationRequestSchema,
  ministryOrganizationResponseSchema,
} from '@platform/shared/contracts';
import { organizationService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// MINISTRY ORGANIZATIONS API ROUTES
// ============================================================================

// Query schema for listing ministry organizations
const ministryOrganizationQuerySchema = createQuerySchema({
  search: z.string().optional(),
  organizationType: z
    .enum([
      'church',
      'denomination',
      'seminary',
      'nonprofit',
      'ministry_organization',
      'church_planting_network',
      'mission_agency',
      'other',
    ])
    .optional(),
  status: z.enum(['active', 'inactive', 'pending', 'suspended']).optional(),
  theologicalTradition: z.string().optional(),
  denominationalAffiliation: z.string().optional(),
  ministryFocus: z.array(z.string()).optional(),
  geographicRegion: z.string().optional(),
  size: z.enum(['small', 'medium', 'large', 'mega']).optional(),
  isMember: z.coerce.boolean().optional(),
  hasActiveSubscription: z.coerce.boolean().optional(),
});

// GET /api/ministry/organizations - List ministry organizations with enhanced filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: ministryOrganizationQuerySchema,
  outputSchema: ministryOrganizationResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    // Add ministry-specific filtering and context
    const ministryQuery = {
      ...query,
      ministryContext: {
        userMinistryRole: context.user.ministryRole,
        organizationId: context.user.organizationId,
        culturalContext: context.user.culturalContext,
        userId: context.user.id,
      },
    };

    return await organizationService.searchMinistryOrganizations(
      ministryQuery,
      context
    );
  },
});

// POST /api/ministry/organizations - Create new ministry organization
export const POST = createRouteHandler({
  inputSchema: createMinistryOrganizationRequestSchema,
  outputSchema: ministryOrganizationResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    // Add ministry context to creation data
    const ministryData = {
      ...data,
      ministryContext: {
        createdBy: context.user.id,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await organizationService.createMinistryOrganization(
      ministryData,
      context
    );
  },
});
