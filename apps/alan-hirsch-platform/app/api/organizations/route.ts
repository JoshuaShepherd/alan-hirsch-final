import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  createOrganizationRequestSchema,
  organizationResponseSchema,
} from '@platform/shared/contracts';
import { organizationService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Organization API Routes - Type-Safe Implementation
// ============================================================================

// Query schema for listing organizations
const organizationQuerySchema = createQuerySchema({
  search: z.string().optional(),
  organizationType: z
    .enum([
      'church',
      'denomination',
      'seminary',
      'ministry',
      'nonprofit',
      'business',
      'other',
    ])
    .optional(),
  sizeCategory: z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
  status: z.enum(['active', 'inactive', 'trial', 'suspended']).optional(),
  licenseType: z.enum(['individual', 'institutional', 'enterprise']).optional(),
});

// GET /api/organizations - List organizations with pagination and filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: organizationQuerySchema,
  outputSchema: organizationResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    return await organizationService.search(query, context);
  },
});

// POST /api/organizations - Create new organization
export const POST = createRouteHandler({
  inputSchema: createOrganizationRequestSchema,
  outputSchema: organizationResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    return await organizationService.create(data, context);
  },
});
