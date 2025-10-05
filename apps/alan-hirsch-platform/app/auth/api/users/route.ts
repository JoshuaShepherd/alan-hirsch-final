// ============================================================================
// USERS API ROUTES
// ============================================================================
// Type-safe API endpoints for user management with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  CreateUserApiRequestSchema,
  ListUsersApiQuerySchema,
  PublicUserApiResponseSchema,
  UserProfileResponseSchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { toUserProfileResponseDTO } from '../../../../lib/mappers/user';
import { userService } from '../../../../lib/services';

// ============================================================================
// GET /api/users - List users with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListUsersApiQuerySchema,
  outputSchema: UserProfileResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:users'],
  handler: async (validatedQuery, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await userService.findMany(validatedQuery, context);

    // Transform DB rows to response DTOs using mappers (egress validation)
    const transformedData = result.data.map(user =>
      toUserProfileResponseDTO(user)
    );

    return {
      data: transformedData,
      pagination: result.pagination,
    };
  },
});

// ============================================================================
// POST /api/users - Create new user
// ============================================================================

export const POST = createPostHandler({
  inputSchema: CreateUserApiRequestSchema,
  outputSchema: PublicUserApiResponseSchema,
  requireAuth: true,
  requirePermissions: ['create:users'],
  handler: async (validatedData, context) => {
    // Call service layer with validated input and tenant-scoped context
    const result = await userService.create(validatedData, context);

    // Transform DB row to response DTO using mappers (egress validation)
    return toUserProfileResponseDTO(result);
  },
});
