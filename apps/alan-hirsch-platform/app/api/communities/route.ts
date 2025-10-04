import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  communityResponseSchema,
  createCommunityRequestSchema,
} from '@platform/shared/contracts';
import { communityService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Community API Routes - Type-Safe Implementation
// ============================================================================

// Query schema for listing communities
const communityQuerySchema = createQuerySchema({
  search: z.string().optional(),
  communityType: z
    .enum([
      'local',
      'regional',
      'national',
      'international',
      'virtual',
      'hybrid',
    ])
    .optional(),
  focus: z
    .enum([
      'church_planting',
      'leadership_development',
      'theological_education',
      'mission_work',
      'social_justice',
      'worship_arts',
      'youth_ministry',
      'other',
    ])
    .optional(),
  status: z.enum(['active', 'inactive', 'pending', 'archived']).optional(),
  visibility: z.enum(['public', 'private', 'invite_only']).optional(),
});

// GET /api/communities - List communities with pagination and filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: communityQuerySchema,
  outputSchema: communityResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    return await communityService.search(query, context);
  },
});

// POST /api/communities - Create new community
export const POST = createRouteHandler({
  inputSchema: createCommunityRequestSchema,
  outputSchema: communityResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    return await communityService.create(data, context);
  },
});
