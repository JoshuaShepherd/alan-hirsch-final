// ============================================================================
// ASSESSMENT BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual assessment operations

import {
  AssessmentApiResponseSchema,
  UpdateAssessmentApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { NotFoundError } from '../../../../../lib/api/error-handler';
import {
  createDeleteHandler,
  createGetHandler,
  createPutHandler,
  validatePathParams,
} from '../../../../../lib/api/route-handlers';
import { toAssessmentEntity } from '../../../../../lib/mappers/assessment';
import { assessmentService } from '../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const AssessmentIdPathSchema = z.object({
  id: z.string().uuid('Invalid assessment ID format'),
});

// ============================================================================
// GET /api/assessments/[id] - Get assessment by ID
// ============================================================================

export const GET = createGetHandler({
  inputSchema: z.object({}),
  outputSchema: AssessmentApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:assessments'],
  handler: async (_, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      AssessmentIdPathSchema,
      routeParams?.params || {}
    );

    const result = await assessmentService.findById(pathParams.id, context);
    if (!result.success || !result.data) {
      throw new NotFoundError('Assessment');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toAssessmentEntity(result.data);
  },
});

// ============================================================================
// PUT /api/assessments/[id] - Update assessment
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateAssessmentApiRequestSchema,
  outputSchema: AssessmentApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:assessments'],
  handler: async (data, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      AssessmentIdPathSchema,
      routeParams?.params || {}
    );

    const result = await assessmentService.update(pathParams.id, data, context);
    if (!result.success || !result.data) {
      throw new NotFoundError('Assessment');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toAssessmentEntity(result.data);
  },
});

// ============================================================================
// DELETE /api/assessments/[id] - Delete assessment
// ============================================================================

export const DELETE = createDeleteHandler({
  inputSchema: z.object({}),
  outputSchema: z.object({
    deleted: z.boolean(),
    id: z.string().uuid(),
  }),
  requireAuth: true,
  requirePermissions: ['delete:assessments'],
  handler: async (_, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      AssessmentIdPathSchema,
      routeParams?.params || {}
    );

    const result = await assessmentService.delete(pathParams.id, context);
    if (!result.success) {
      throw new NotFoundError('Assessment');
    }

    // Return standardized deletion response
    return {
      deleted: true,
      id: pathParams.id,
    };
  },
});
