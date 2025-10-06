// ============================================================================
// ASSESSMENT QUESTIONS API ROUTES
// ============================================================================
// Type-safe API endpoints for assessment questions

import {
  assessmentQuestionResponseSchema,
  createAssessmentQuestionSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  createGetHandler,
  createPostHandler,
} from '../../../../../../lib/api/route-handlers';
import { toAssessmentQuestionResponseDTO } from '../../../../../../lib/mappers/assessment';
import { assessmentService } from '../../../../../../lib/services';

// ============================================================================
// GET /api/assessments/[id]/questions - Get assessment questions
// ============================================================================

export const GET = createGetHandler({
  inputSchema: z.object({}),
  outputSchema: assessmentQuestionResponseSchema.array(),
  requireAuth: true,
  requirePermissions: ['read:assessments'],
  handler: async (_, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.getQuestions(assessmentId, context);
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to fetch questions');
    }

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(question =>
      toAssessmentQuestionResponseDTO(question)
    );

    return transformedData;
  },
});

// ============================================================================
// POST /api/assessments/[id]/questions - Add question to assessment
// ============================================================================

export const POST = createPostHandler({
  inputSchema: createAssessmentQuestionSchema,
  outputSchema: assessmentQuestionResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:assessments'],
  handler: async (data, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.addQuestion(
      assessmentId,
      data,
      context
    );
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to add question');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toAssessmentQuestionResponseDTO(result.data);
  },
});
