// ============================================================================
// USER ASSESSMENT RESPONSES API ROUTES
// ============================================================================
// Type-safe API endpoints for user assessment responses with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  AssessmentResponseResponseSchema,
  GetAssessmentResponsesApiQuerySchema,
  SaveAssessmentResponsesApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  AuthenticationError,
  NotFoundError,
} from '../../../../../../lib/api/error-handler';
import {
  createGetHandler,
  createPostHandler,
  validatePathParams,
} from '../../../../../../lib/api/route-handlers';
import { toAssessmentResponseResponseDTO } from '../../../../../../lib/mappers/assessment';
import {
  assessmentResponseService,
  userAssessmentService,
} from '../../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const UserAssessmentIdPathSchema = z.object({
  id: z.string().uuid('Invalid user assessment ID format'),
});

// ============================================================================
// GET /api/user/assessments/[id]/responses - Get assessment responses
// ============================================================================

export const GET = createGetHandler({
  inputSchema: GetAssessmentResponsesApiQuerySchema,
  outputSchema: z.array(AssessmentResponseResponseSchema),
  requireAuth: true,
  handler: async (validatedQuery, context, routeParams) => {
    if (!context.userId) {
      throw new AuthenticationError('User ID not found in context');
    }

    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      UserAssessmentIdPathSchema,
      routeParams?.params || {}
    );

    // Verify user owns this assessment
    const userAssessmentResult = await userAssessmentService.findById(
      pathParams.id,
      context
    );
    if (!userAssessmentResult.success || !userAssessmentResult.data) {
      throw new NotFoundError('User assessment');
    }

    if (userAssessmentResult.data.userId !== context.userId) {
      throw new AuthenticationError('Access denied');
    }

    // Call service layer with validated input and tenant-scoped context
    const result = await assessmentResponseService.findMany(
      { userAssessmentId: pathParams.id, ...validatedQuery },
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

    return transformedData;
  },
});

// ============================================================================
// POST /api/user/assessments/[id]/responses - Save assessment responses
// ============================================================================

export const POST = createPostHandler({
  inputSchema: SaveAssessmentResponsesApiRequestSchema,
  outputSchema: z.array(AssessmentResponseResponseSchema),
  requireAuth: true,
  handler: async (validatedData, context, routeParams) => {
    if (!context.userId) {
      throw new AuthenticationError('User ID not found in context');
    }

    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      UserAssessmentIdPathSchema,
      routeParams?.params || {}
    );

    // Verify user owns this assessment
    const userAssessmentResult = await userAssessmentService.findById(
      pathParams.id,
      context
    );
    if (!userAssessmentResult.success || !userAssessmentResult.data) {
      throw new NotFoundError('User assessment');
    }

    if (userAssessmentResult.data.userId !== context.userId) {
      throw new AuthenticationError('Access denied');
    }

    // Check if assessment is already completed
    if (userAssessmentResult.data.completedAt) {
      throw new Error('Cannot modify responses for completed assessment');
    }

    // Call service layer with validated input and tenant-scoped context
    const result = await assessmentResponseService.createMany(
      validatedData.responses.map(response => ({
        ...response,
        userAssessmentId: pathParams.id,
      })),
      context
    );

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to save assessment responses'
      );
    }

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(response =>
      toAssessmentResponseResponseDTO(response)
    );

    return transformedData;
  },
});
