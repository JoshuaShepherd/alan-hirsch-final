// ============================================================================
// ASSESSMENTS API ROUTES
// ============================================================================
// Type-safe API endpoints for assessment management with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  AssessmentApiResponseSchema,
  CreateAssessmentApiRequestSchema,
  ListAssessmentsApiQuerySchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { toAssessmentResponseDTO } from '../../../../lib/mappers/assessment';
import { assessmentService } from '../../../../lib/services';

// ============================================================================
// GET /api/assessments - List assessments with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListAssessmentsApiQuerySchema,
  outputSchema: AssessmentApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:assessments'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await assessmentService.findMany(validatedQuery, context);

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(assessment =>
      toAssessmentResponseDTO(assessment)
    );

    return {
      data: transformedData,
      pagination: result.pagination,
    };
  },
});

// ============================================================================
// POST /api/assessments - Create new assessment
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateAssessmentApiRequestSchema,
  outputSchema: AssessmentApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:assessments'],
  handler: async (validatedData, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await assessmentService.create(validatedData, context);

    // Transform DB row to response DTO using mappers (egress validation)
    return toAssessmentResponseDTO(result);
  },
});
