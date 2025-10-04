import {
  CreateUserApiRequestSchema,
  ListUsersApiQuerySchema,
  UserApiResponseSchema,
} from '@platform/contracts/api';
import {
  createPaginatedRouteHandler,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import { userService } from '@platform/shared/services';

// ============================================================================
// User API Routes - Type-Safe Implementation
// ============================================================================

// GET /api/users - List users with pagination and filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: ListUsersApiQuerySchema,
  outputSchema: UserApiResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    return await userService.search(query, context);
  },
});

// POST /api/users - Create new user
export const POST = createRouteHandler({
  inputSchema: CreateUserApiRequestSchema,
  outputSchema: UserApiResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    return await userService.create(data, context);
  },
});
