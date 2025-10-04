import { createBulkOperationHandler } from '@platform/shared/api/bulk-operations';
import {
  newUserProfileSchema,
  userProfileResponseSchema,
  userProfileUpdateSchema,
} from '@platform/shared/contracts';
import { userService } from '@platform/shared/services';

// ============================================================================
// User Bulk Operations API Route - Type-Safe Implementation
// ============================================================================

// POST /api/users/bulk - Bulk operations on users
export const POST = createBulkOperationHandler({
  itemSchema: userProfileResponseSchema,
  createSchema: newUserProfileSchema,
  updateSchema: userProfileUpdateSchema,
  service: {
    create: userService.create,
    update: userService.update,
    delete: userService.delete,
  },
});
