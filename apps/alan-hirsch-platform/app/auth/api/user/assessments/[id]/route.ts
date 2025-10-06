// ============================================================================
// USER ASSESSMENT BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual user assessment operations with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  CompleteUserAssessmentApiRequestSchema,
  GetUserAssessmentApiQuerySchema,
  UpdateUserAssessmentApiRequestSchema,
  UserAssessmentResponseSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  AuthenticationError,
  NotFoundError,
} from '../../../../../lib/api/error-handler';
import {
  createDeleteHandler,
  createGetHandler,
  createPostHandler,
  createPutHandler,
  validatePathParams,
} from '../../../../../lib/api/route-handlers';
import { toUserAssessmentEntity } from '../../../../../lib/mappers/assessment';
import { userAssessmentService } from '../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const UserAssessmentIdPathSchema = z.object({
  id: z.string().uuid('Invalid user assessment ID format'),
});

// ============================================================================
// GET /api/user/assessments/[id] - Get specific user assessment
// ============================================================================

export const GET = createGetHandler({
  inputSchema: GetUserAssessmentApiQuerySchema,
  outputSchema: UserAssessmentResponseSchema,
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

    // Call service layer with validated input and tenant-scoped context
    const result = await userAssessmentService.findById(pathParams.id, context);

    if (!result.success || !result.data) {
      throw new NotFoundError('User assessment');
    }

    // Ensure user can only access their own assessments
    if (result.data.userId !== context.userId) {
      throw new AuthenticationError('Access denied');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserAssessmentEntity(result.data);
  },
});

// ============================================================================
// PUT /api/user/assessments/[id] - Update user assessment
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateUserAssessmentApiRequestSchema,
  outputSchema: UserAssessmentResponseSchema,
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
    const result = await userAssessmentService.update(
      pathParams.id,
      validatedData,
      context
    );

    if (!result.success || !result.data) {
      throw new NotFoundError('User assessment');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserAssessmentEntity(result.data);
  },
});

// ============================================================================
// POST /api/user/assessments/[id]/complete - Complete user assessment
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CompleteUserAssessmentApiRequestSchema,
  outputSchema: UserAssessmentResponseSchema,
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
    return toUserAssessmentEntity(result.data);
  },
});

// ============================================================================
// DELETE /api/user/assessments/[id] - Delete user assessment
// ============================================================================

export const DELETE = createDeleteHandler({
  inputSchema: z.object({}),
  outputSchema: z.object({
    deleted: z.boolean(),
    id: z.string().uuid(),
  }),
  requireAuth: true,
  handler: async (_, context, routeParams) => {
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
    const result = await userAssessmentService.delete(pathParams.id, context);

    if (!result.success) {
      throw new NotFoundError('User assessment');
    }

    // Return standardized deletion response
    return {
      deleted: true,
      id: pathParams.id,
    };
  },
});
