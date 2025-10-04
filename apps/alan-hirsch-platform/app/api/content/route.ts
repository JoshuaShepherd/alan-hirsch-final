import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  contentItemResponseSchema,
  createContentItemRequestSchema,
} from '@platform/shared/contracts';
import { contentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Content API Routes - Type-Safe Implementation
// ============================================================================

// Query schema for listing content items
const contentQuerySchema = createQuerySchema({
  search: z.string().optional(),
  contentType: z
    .enum([
      'article',
      'video',
      'podcast',
      'framework',
      'tool',
      'case_study',
      'interview',
      'course_lesson',
    ])
    .optional(),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .default('published'),
  visibility: z
    .enum(['public', 'premium', 'vip', 'private', 'organization'])
    .optional(),
  categoryId: z.string().uuid().optional(),
  authorId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  seriesId: z.string().uuid().optional(),
});

// GET /api/content - List content items with pagination and filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: contentQuerySchema,
  outputSchema: contentItemResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    return await contentService.search(query, context);
  },
});

// POST /api/content - Create new content item
export const POST = createRouteHandler({
  inputSchema: createContentItemRequestSchema,
  outputSchema: contentItemResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    return await contentService.create(data, context);
  },
});
