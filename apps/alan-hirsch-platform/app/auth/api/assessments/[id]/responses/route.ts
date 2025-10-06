// ============================================================================
// ASSESSMENT RESPONSES API ROUTES
// ============================================================================
// Type-safe API endpoints for assessment responses

import {
  AssessmentResponseApiResponseSchema,
  CreateAssessmentResponseApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../../../lib/api/route-handlers';
import { toAssessmentResponseResponseDTO } from '../../../../../../lib/mappers/assessment';
import { assessmentService } from '../../../../../../lib/services';

// ============================================================================
// GET /api/assessments/[id]/responses - Get assessment responses
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: z.object({}),
  outputSchema: AssessmentResponseApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:assessments'],
  handler: async (_, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.getAssessmentResponses(
      assessmentId,
      context
    );
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch assessment responses'
      );
    }

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(response =>
      toAssessmentResponseResponseDTO(response)
    );

    return {
      data: transformedData,
      pagination: {
        page: 1,
        limit: transformedData.length,
        total: transformedData.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  },
});

// ============================================================================
// POST /api/assessments/[id]/responses - Submit assessment response
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateAssessmentResponseApiRequestSchema,
  outputSchema: AssessmentResponseApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['write'],
  handler: async (data, context, routeParams) => {
    const assessmentId = routeParams?.params?.['id'];
    if (!assessmentId || typeof assessmentId !== 'string') {
      throw new Error('Assessment ID is required');
    }

    const result = await assessmentService.submitResponse(
      assessmentId,
      data,
      context
    );
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to submit assessment response'
      );
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toAssessmentResponseResponseDTO(result.data);
  },
});
