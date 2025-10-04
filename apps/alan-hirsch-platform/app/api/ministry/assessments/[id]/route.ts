import { createRouteHandler } from '@platform/shared/api/route-handler';
import {
  ministryAssessmentResponseSchema,
  updateMinistryAssessmentRequestSchema,
} from '@platform/shared/contracts';
import { assessmentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// MINISTRY ASSESSMENT BY ID API ROUTES
// ============================================================================

// GET /api/ministry/assessments/[id] - Get ministry assessment by ID
export const GET = createRouteHandler({
  inputSchema: z.object({}),
  outputSchema: ministryAssessmentResponseSchema,
  method: 'GET',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    const assessment = await assessmentService.getMinistryAssessmentById(
      id,
      context
    );
    if (!assessment) {
      throw new Error('Ministry assessment not found');
    }

    return assessment;
  },
});

// PUT /api/ministry/assessments/[id] - Update ministry assessment
export const PUT = createRouteHandler({
  inputSchema: updateMinistryAssessmentRequestSchema,
  outputSchema: ministryAssessmentResponseSchema,
  method: 'PUT',
  handler: async (data, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    // Add ministry context to update data
    const ministryData = {
      ...data,
      ministryContext: {
        updatedBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await assessmentService.updateMinistryAssessment(
      id,
      ministryData,
      context
    );
  },
});

// DELETE /api/ministry/assessments/[id] - Delete ministry assessment
export const DELETE = createRouteHandler({
  inputSchema: z.object({}),
  method: 'DELETE',
  handler: async (_, context) => {
    const id = context.params?.id;
    if (!id) {
      throw new Error('Assessment ID is required');
    }

    await assessmentService.deleteMinistryAssessment(id, context);
    return {
      success: true,
      message: 'Ministry assessment deleted successfully',
    };
  },
});
