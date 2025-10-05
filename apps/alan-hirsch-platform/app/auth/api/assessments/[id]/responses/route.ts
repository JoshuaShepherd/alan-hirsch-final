// ============================================================================
// ASSESSMENT RESPONSES API ROUTES
// ============================================================================
// Type-safe API endpoints for assessment responses

import {
  createPaginatedRouteHandler,
  createPostHandler,
} from '../../../../../../lib/api/route-handler';
import { assessmentService } from '../../../../../../lib/services';

// ============================================================================
// GET /api/assessments/[id]/responses - Get assessment responses
// ============================================================================

export const GET = createPaginatedRouteHandler({
  outputSchema: AssessmentResponseEntity,
  requireAuth: true,
  requirePermissions: ['read'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    return await assessmentService.getAssessmentResponses(id, {});
  },
});

// ============================================================================
// POST /api/assessments/[id]/responses - Submit assessment response
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateAssessmentResponse,
  outputSchema: AssessmentResponseEntity,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (data, context) => {
    const { id } = context.request.params as { id: string };
    return await assessmentService.submitResponse(id, data, context);
  },
});
