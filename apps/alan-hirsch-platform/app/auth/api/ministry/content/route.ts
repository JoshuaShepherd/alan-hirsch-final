import {
  ContentItemWithAuthorApiResponseSchema,
  CreateContentItemApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  createQuerySchema,
  createRouteHandler,
} from '../../../../../lib/api/route-handlers';
import { contentService } from '../../../../../lib/services';

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
export const GET = createRouteHandler({
  inputSchema: ministryContentQuerySchema,
  outputSchema: ContentItemWithAuthorApiResponseSchema.array(),
  method: 'GET',
  handler: async (query, context) => {
    const result = await contentService.findMany(query, context);

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch ministry content'
      );
    }

    return result.data;
  },
});

// POST /api/ministry/content - Create new ministry content
export const POST = createRouteHandler({
  inputSchema: CreateContentItemApiRequestSchema,
  outputSchema: ContentItemWithAuthorApiResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    const result = await contentService.create(data, context);

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to create ministry content'
      );
    }

    return result.data;
  },
});
