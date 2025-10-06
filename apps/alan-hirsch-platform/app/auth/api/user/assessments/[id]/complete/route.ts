// ============================================================================
// USER ASSESSMENT COMPLETE API ROUTES
// ============================================================================
// Type-safe API endpoints for completing user assessments with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  CompleteUserAssessmentApiRequestSchema,
  UserAssessmentWithDetailsResponseSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  AuthenticationError,
  NotFoundError,
} from '../../../../../../lib/api/error-handler';
import {
  createPostHandler,
  validatePathParams,
} from '../../../../../../lib/api/route-handlers';
import { toUserAssessmentResponseDTO } from '../../../../../../lib/mappers/assessment';
import { userAssessmentService } from '../../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const UserAssessmentIdPathSchema = z.object({
  id: z.string().uuid('Invalid user assessment ID format'),
});

// ============================================================================
// POST /api/user/assessments/[id]/complete - Complete assessment and calculate results
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CompleteUserAssessmentApiRequestSchema,
  outputSchema: UserAssessmentWithDetailsResponseSchema,
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

    // Call service layer with validated input and tenant-scoped context
    const result = await userAssessmentService.complete(
      pathParams.id,
      validatedData,
      context
    );

    if (!result.success || !result.data) {
      throw new NotFoundError('User assessment');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserAssessmentResponseDTO(result.data);
  },
});
