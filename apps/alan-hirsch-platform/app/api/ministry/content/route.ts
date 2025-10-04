import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  createMinistryContentRequestSchema,
  ministryContentItemResponseSchema,
} from '@platform/shared/contracts';
import { contentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// MINISTRY CONTENT API ROUTES
// ============================================================================

// Query schema for listing ministry content
const ministryContentQuerySchema = createQuerySchema({
  search: z.string().optional(),
  contentType: z
    .enum(['article', 'video', 'podcast', 'framework', 'tool', 'case_study'])
    .optional(),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .optional(),
  language: z.string().optional(),
  difficultyLevel: z
    .enum(['beginner', 'intermediate', 'advanced', 'expert'])
    .optional(),
  theologicalDepth: z
    .enum(['introductory', 'intermediate', 'advanced', 'scholarly'])
    .optional(),
  practicalApplication: z
    .enum(['theory', 'practical', 'hands_on', 'case_study'])
    .optional(),
  ministryRoles: z.array(z.string()).optional(),
  culturalContexts: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  organizationId: z.string().uuid().optional(),
  authorId: z.string().uuid().optional(),
  seriesId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
});

// GET /api/ministry/content - List ministry content with enhanced filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: ministryContentQuerySchema,
  outputSchema: ministryContentItemResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    // Add ministry-specific filtering and context
    const ministryQuery = {
      ...query,
      ministryContext: {
        userMinistryRole: context.user.ministryRole,
        organizationId: context.user.organizationId,
        culturalContext: context.user.culturalContext,
      },
    };

    return await contentService.searchMinistryContent(ministryQuery, context);
  },
});

// POST /api/ministry/content - Create new ministry content
export const POST = createRouteHandler({
  inputSchema: createMinistryContentRequestSchema,
  outputSchema: ministryContentItemResponseSchema,
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

    return await contentService.createMinistryContent(ministryData, context);
  },
});
