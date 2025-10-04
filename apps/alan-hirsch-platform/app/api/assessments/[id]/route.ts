import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  assessmentResponseDTOSchema,
  updateAssessmentRequestSchema,
} from '@platform/shared/contracts';
import { assessmentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Assessment Detail API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/assessments/[id] - Get assessment by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: assessmentResponseDTOSchema,
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

// PUT /api/assessments/[id] - Update assessment
export const PUT = createRouteHandler({
  inputSchema: updateAssessmentRequestSchema,
  outputSchema: assessmentResponseDTOSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    return await assessmentService.update(id, data, context);
  },
});

// DELETE /api/assessments/[id] - Delete assessment
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
