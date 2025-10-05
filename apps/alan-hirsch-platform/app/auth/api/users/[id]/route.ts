// ============================================================================
// USER BY ID API ROUTES
// ============================================================================
// Type-safe API endpoints for individual user operations with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  DeleteUserApiRequestSchema,
  GetUserByIdApiQuerySchema,
  PublicUserApiResponseSchema,
  UpdateUserProfileApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import { NotFoundError } from '../../../../../lib/api/error-handler';
import {
  createDeleteHandler,
  createGetHandler,
  createPutHandler,
  validatePathParams,
} from '../../../../../lib/api/route-handlers';
import { toUserProfileResponseDTO } from '../../../../../lib/mappers/user';
import { userService } from '../../../../../lib/services';

// ============================================================================
// PATH PARAMETER VALIDATION SCHEMAS
// ============================================================================

const UserIdPathSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

// ============================================================================
// GET /api/users/[id] - Get user by ID
// ============================================================================

export const GET = createGetHandler({
  inputSchema: GetUserByIdApiQuerySchema,
  outputSchema: PublicUserApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:users'],
  handler: async (validatedQuery, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      UserIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await userService.findById(pathParams.id, context);

    if (!result) {
      throw new NotFoundError('User');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserProfileResponseDTO(result);
  },
});

// ============================================================================
// PUT /api/users/[id] - Update user
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateUserProfileApiRequestSchema,
  outputSchema: PublicUserApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['update:users'],
  handler: async (validatedData, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      UserIdPathSchema,
      routeParams?.params || {}
    );

    // Call service layer with validated input and tenant-scoped context
    const result = await userService.update(
      pathParams.id,
      validatedData,
      context
    );

    if (!result) {
      throw new NotFoundError('User');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserProfileResponseDTO(result);
  },
});

// ============================================================================
// DELETE /api/users/[id] - Delete user
// ============================================================================

export const DELETE = createDeleteHandler({
  inputSchema: DeleteUserApiRequestSchema.optional(),
  outputSchema: z.object({
    deleted: z.boolean(),
    id: z.string().uuid(),
  }),
  requireAuth: true,
  requirePermissions: ['delete:users'],
  handler: async (validatedData, context, routeParams) => {
    // Validate path parameters (ingress validation)
    const pathParams = validatePathParams(
      context.request,
      UserIdPathSchema,
      routeParams?.params || {}
    );

    // Use confirmation from body or default
    const confirmation = validatedData?.confirmation || 'DELETE';

    // Call service layer with validated input and tenant-scoped context
    const success = await userService.delete(pathParams.id, context);

    if (!success) {
      throw new NotFoundError('User');
    }

    // Return standardized deletion response
    return {
      deleted: true,
      id: pathParams.id,
    };
  },
});
