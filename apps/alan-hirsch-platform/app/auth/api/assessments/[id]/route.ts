// ============================================================================
// ASSESSMENT BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual assessment operations

import {
  createDeleteHandler,
  createGetHandler,
  createPutHandler,
} from '../../../../../lib/api/route-handler';
import { assessmentService } from '../../../../../lib/services';

// ============================================================================
// GET /api/assessments/[id] - Get assessment by ID
// ============================================================================

export const GET = createGetHandler({
  outputSchema: AssessmentResponse,
  requireAuth: true,
  requirePermissions: ['read'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    const assessment = await assessmentService.findById(id, context);

    if (!assessment) {
      throw new Error('Assessment not found');
    }

    return assessment;
  },
});

// ============================================================================
// PUT /api/assessments/[id] - Update assessment
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateAssessment,
  outputSchema: AssessmentResponse,
  requireAuth: true,
  requirePermissions: ['admin'],
  handler: async (data, context) => {
    const { id } = context.request.params as { id: string };
    return await assessmentService.update(id, data, context);
  },
});

// ============================================================================
// DELETE /api/assessments/[id] - Delete assessment
// ============================================================================

export const DELETE = createDeleteHandler({
  requireAuth: true,
  requirePermissions: ['admin'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    const success = await assessmentService.delete(id, context);

    if (!success) {
      throw new Error('Assessment not found');
    }

    return { success: true };
  },
});
