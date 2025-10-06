// ============================================================================
// ASSESSMENTS-NEW API ROUTES
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
import { assessmentService } from '../../../../lib/services';

// ============================================================================
// GET /api/assessments-new - List assessments with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListAssessmentsApiQuerySchema,
  outputSchema: AssessmentApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:assessments'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await assessmentService.findMany(validatedQuery, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to fetch assessments');
    }

    // Service already returns properly formatted entities
    return {
      data: result.data,
      pagination: {
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 10,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.totalPages || 0,
        hasNext: result.pagination?.hasMore || false,
        hasPrev: (result.pagination?.page || 1) > 1,
      },
    };
  },
});

// ============================================================================
// POST /api/assessments-new - Create new assessment
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateAssessmentApiRequestSchema,
  outputSchema: AssessmentApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:assessments'],
  handler: async (validatedData, context) => {
    // Ensure required fields have default values
    const dataWithDefaults = {
      ...validatedData,
      status: validatedData.status || 'draft',
      language: validatedData.language || 'en',
      culturalAdaptation: validatedData.culturalAdaptation || 'universal',
      researchBacked: validatedData.researchBacked || false,
      version: validatedData.version || '1.0',
      scoringMethod: validatedData.scoringMethod || 'likert_5',
    };

    // Call service layer with validated input and tenant-scoped context
    const result = await assessmentService.create(dataWithDefaults, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to create assessment');
    }

    // Service already returns properly formatted entity
    return result.data;
  },
});
