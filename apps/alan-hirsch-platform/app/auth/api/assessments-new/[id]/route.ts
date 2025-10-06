import {
  assessmentResponseSchema,
  updateAssessmentSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  createDeleteHandler,
  createGetHandler,
  createPatchHandler,
  createPutHandler,
} from '../../../../../lib/api/route-handlers';
import { assessmentService } from '../../../../../lib/services';

// ============================================================================
// Assessment Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/assessments-new/[id] - Get assessment by ID
export const GET = createGetHandler({
  inputSchema: z.object({}),
  outputSchema: assessmentResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:assessments'],
  handler: async (_, context, routeParams) => {
    const id = routeParams?.params?.['id'];
    if (!id || typeof id !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.findById(id, context);
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Assessment not found');
    }

    return result.data;
  },
});

// PUT /api/assessments-new/[id] - Update assessment
export const PUT = createPutHandler({
  inputSchema: updateAssessmentSchema,
  outputSchema: assessmentResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:assessments'],
  handler: async (data, context, routeParams) => {
    const id = routeParams?.params?.['id'];
    if (!id || typeof id !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.update(id, data, context);
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to update assessment');
    }

    return result.data;
  },
});

// DELETE /api/assessments-new/[id] - Delete assessment
export const DELETE = createDeleteHandler({
  inputSchema: z.object({}),
  requireAuth: true,
  requirePermissions: ['delete:assessments'],
  handler: async (_, context, routeParams) => {
    const id = routeParams?.params?.['id'];
    if (!id || typeof id !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.delete(id, context);
    if (!result.success) {
      throw new Error(result.error?.message || 'Failed to delete assessment');
    }

    return { success: true };
  },
});

// PATCH /api/assessments-new/[id]/publish - Publish assessment
export const PATCH = createPatchHandler({
  inputSchema: z.object({
    action: z.enum(['publish', 'unpublish', 'archive']),
  }),
  outputSchema: assessmentResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:assessments'],
  handler: async (data, context, routeParams) => {
    const id = routeParams?.params?.['id'];
    if (!id || typeof id !== 'string') {
      throw new Error('Assessment ID is required');
    }

    let result;
    switch (data.action) {
      case 'publish':
        result = await assessmentService.publish(id, context);
        break;
      case 'unpublish':
        result = await assessmentService.unpublish(id, context);
        break;
      case 'archive':
        result = await assessmentService.archive(id, context);
        break;
      default:
        throw new Error('Invalid action');
    }

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || `Failed to ${data.action} assessment`
      );
    }

    return result.data;
  },
});
