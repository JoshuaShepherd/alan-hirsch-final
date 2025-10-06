// ============================================================================
// USER ASSESSMENTS API ROUTES
// ============================================================================
// Type-safe API endpoints for user assessment management with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  ListUserAssessmentsApiQuerySchema,
  StartUserAssessmentApiRequestSchema,
  UserAssessmentResponseSchema,
} from '@platform/contracts';
import { AuthenticationError } from '../../../../lib/api/error-handler';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { toUserAssessmentEntity } from '../../../../lib/mappers/assessment';
import { userAssessmentService } from '../../../../lib/services';

// ============================================================================
// GET /api/user/assessments - List user's assessments with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListUserAssessmentsApiQuerySchema,
  outputSchema: UserAssessmentResponseSchema,
  requireAuth: true,
  handler: async (validatedQuery, context) => {
    if (!context.userId) {
      throw new AuthenticationError('User ID not found in context');
    }

    // Call service layer with validated input and tenant-scoped context
    const result = await userAssessmentService.findMany(
      validatedQuery,
      context
    );

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch user assessments'
      );
    }

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(userAssessment =>
      toUserAssessmentEntity(userAssessment)
    );

    return {
      data: transformedData,
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
// POST /api/user/assessments - Start a new assessment
// ============================================================================

export const POST = createPostHandler({
  inputSchema: StartUserAssessmentApiRequestSchema,
  outputSchema: UserAssessmentResponseSchema,
  requireAuth: true,
  handler: async (validatedData, context) => {
    if (!context.userId) {
      throw new AuthenticationError('User ID not found in context');
    }

    // Call service layer with validated input and tenant-scoped context
    const result = await userAssessmentService.create(validatedData, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message || 'Failed to start assessment');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserAssessmentEntity(result.data);
  },
});
