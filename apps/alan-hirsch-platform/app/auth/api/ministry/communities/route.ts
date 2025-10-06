import {
  createMinistryCommunityRequestSchema,
  ministryCommunityResponseSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { communityService } from '../../../../../lib/services';

// ============================================================================
// MINISTRY COMMUNITIES API ROUTES
// ============================================================================

// Query schema for listing ministry communities
const ministryCommunityQuerySchema = createQuerySchema({
  search: z.string().optional(),
  communityType: z
    .enum([
      'general_discussion',
      'church_planting_cohort',
      'leadership_development',
      'theological_study',
      'ministry_collaboration',
      'regional_network',
    ])
    .optional(),
  status: z.enum(['active', 'inactive', 'archived', 'private']).optional(),
  ministryStage: z
    .enum(['exploring', 'developing', 'established', 'multiplying'])
    .optional(),
  geographicScope: z
    .enum(['local', 'regional', 'national', 'global'])
    .optional(),
  ministryRoles: z.array(z.string()).optional(),
  theologicalFocus: z.array(z.string()).optional(),
  organizationId: z.string().uuid().optional(),
  createdBy: z.string().uuid().optional(),
  isMember: z.coerce.boolean().optional(),
});

// GET /api/ministry/communities - List ministry communities with enhanced filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: ministryCommunityQuerySchema,
  outputSchema: ministryCommunityResponseSchema,
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

    return await communityService.searchMinistryCommunities(
      ministryQuery,
      context
    );
  },
});

// POST /api/ministry/communities - Create new ministry community
export const POST = createRouteHandler({
  inputSchema: createMinistryCommunityRequestSchema,
  outputSchema: ministryCommunityResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    // Add ministry context to creation data
    const ministryData = {
      ...data,
      ministryContext: {
        createdBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await communityService.createMinistryCommunity(
      ministryData,
      context
    );
  },
});
