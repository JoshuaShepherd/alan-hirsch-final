// ============================================================================
// USER PROFILE API ROUTES
// ============================================================================
// Type-safe API endpoints for current user profile management with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import { AuthenticationError, NotFoundError } from '@/lib/api/error-handler';
import { createGetHandler, createPutHandler } from '@/lib/api/route-handlers';
import { toUserProfileResponseDTO } from '@/lib/mappers/user';
import { userService } from '@/lib/services';
import {
  UpdateUserProfileApiRequestSchema,
  UserProfileResponseSchema,
} from '@platform/contracts';

// ============================================================================
// GET /api/user/profile - Get current user profile
// ============================================================================

export const GET = createGetHandler({
  inputSchema: undefined, // No input needed for GET profile
  outputSchema: UserProfileResponseSchema,
  requireAuth: true,
  handler: async (_, context) => {
    if (!context.userId) {
      throw new AuthenticationError('User ID not found in context');
    }

    // Call service layer with tenant-scoped context
    const result = await userService.findById(context.userId, context);

    if (!result) {
      throw new NotFoundError('User profile');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserProfileResponseDTO(result);
  },
});

// ============================================================================
// PUT /api/user/profile - Update current user profile
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateUserProfileApiRequestSchema,
  outputSchema: UserProfileResponseSchema,
  requireAuth: true,
  handler: async (validatedData, context) => {
    if (!context.userId) {
      throw new AuthenticationError('User ID not found in context');
    }

    // Call service layer with validated input and tenant-scoped context
    const result = await userService.update(
      context.userId,
      validatedData,
      context
    );

    if (!result) {
      throw new NotFoundError('User profile');
    }

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserProfileResponseDTO(result);
  },
});
