// ============================================================================
// ASSESSMENT QUESTIONS API ROUTES
// ============================================================================
// Type-safe API endpoints for assessment questions

import {
  createGetHandler,
  createPostHandler,
} from '../../../../../../lib/api/route-handler';
import { assessmentService } from '../../../../../../lib/services';

// ============================================================================
// GET /api/assessments/[id]/questions - Get assessment questions
// ============================================================================

export const GET = createGetHandler({
  outputSchema: AssessmentQuestionEntity.array(),
  requireAuth: true,
  requirePermissions: ['read'],
  handler: async (params, context) => {
    const { id } = params as { id: string };
    return await assessmentService.getQuestions(id);
  },
});

// ============================================================================
// POST /api/assessments/[id]/questions - Add question to assessment
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateAssessmentQuestion,
  outputSchema: AssessmentQuestionEntity,
  requireAuth: true,
  requirePermissions: ['admin'],
  handler: async (data, context) => {
    const { id } = context.request.params as { id: string };
    return await assessmentService.addQuestion(id, data, context);
  },
});
