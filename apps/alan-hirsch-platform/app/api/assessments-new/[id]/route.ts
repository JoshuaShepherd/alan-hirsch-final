import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  assessmentResponseSchema,
  assessmentUpdateSchema,
} from '@platform/shared/contracts';
import { assessmentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Assessment Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/assessments-new/[id] - Get assessment by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: assessmentResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    const assessment = await assessmentService.findById(id, context);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    return assessment;
  },
});

// PUT /api/assessments-new/[id] - Update assessment
export const PUT = createRouteHandler({
  inputSchema: assessmentUpdateSchema,
  outputSchema: assessmentResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    return await assessmentService.update(id, data, context);
  },
});

// DELETE /api/assessments-new/[id] - Delete assessment
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    await assessmentService.delete(id, context);
    return { success: true };
  },
});

// PATCH /api/assessments-new/[id]/publish - Publish assessment
export const PATCH = createRouteHandler({
  inputSchema: z.object({
    action: z.enum(['publish', 'unpublish', 'archive']),
  }),
  outputSchema: assessmentResponseSchema,
  method: 'PATCH',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    switch (data.action) {
      case 'publish':
        return await assessmentService.publish(id, context);
      case 'unpublish':
        return await assessmentService.unpublish(id, context);
      case 'archive':
        return await assessmentService.archive(id, context);
      default:
        throw new Error('Invalid action');
    }
  },
});
