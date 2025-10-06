import {
  AssessmentApiResponseSchema,
  UpdateAssessmentApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { createRouteHandler } from '../../../../../../lib/api/route-handlers';
import { assessmentService } from '../../../../../../lib/services';

// ============================================================================
// MINISTRY ASSESSMENT BY ID API ROUTES
// ============================================================================

// GET /api/ministry/assessments/[id] - Get ministry assessment by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: AssessmentApiResponseSchema,
  method: 'GET',
  handler: async (_, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.getMinistryAssessmentById(
      assessmentId,
      context
    );

    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Ministry assessment not found');
    }

    return result.data;
  },
});

// PUT /api/ministry/assessments/[id] - Update ministry assessment
export const PUT = createRouteHandler({
  inputSchema: UpdateAssessmentApiRequestSchema,
  outputSchema: AssessmentApiResponseSchema,
  method: 'PUT',
  handler: async (data, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.updateMinistryAssessment(
      assessmentId,
      data,
      context
    );

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to update ministry assessment'
      );
    }

    return result.data;
  },
});

// DELETE /api/ministry/assessments/[id] - Delete ministry assessment
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
  method: 'DELETE',
  handler: async (_, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.deleteMinistryAssessment(
      assessmentId,
      context
    );

    if (!result.success) {
      throw new Error(
        result.error?.message || 'Failed to delete ministry assessment'
      );
    }

    return {
      success: true,
      message: 'Ministry assessment deleted successfully',
    };
  },
});
