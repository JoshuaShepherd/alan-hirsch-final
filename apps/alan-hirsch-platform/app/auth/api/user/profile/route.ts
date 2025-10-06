// ============================================================================
// USER PROFILE API ROUTES
// ============================================================================
// Type-safe API endpoints for current user profile management with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import { NotFoundError } from '@/lib/api/error-handler';
import { createGetHandler, createPutHandler } from '@/lib/api/route-handlers';
import { userService } from '@/lib/services';
import {
  UpdateUserProfileApiRequestSchema,
  userProfileResponseSchema,
} from '@platform/contracts';

// ============================================================================
// GET /api/user/profile - Get current user profile
// ============================================================================

export const GET = createGetHandler({
  inputSchema: undefined, // No input needed for GET profile
  outputSchema: userProfileResponseSchema,
  requireAuth: true,
  handler: async (_, context) => {
    if (!context.userId) {
      throw new Error('User ID not found in context');
    }

    // Call service layer with tenant-scoped context
    const result = await userService.findById(context.userId, context);

    if (!result.success || !result.data) {
      throw new NotFoundError('User profile');
    }

    // Service already returns mapped response DTO
    return result.data;
  },
});

// ============================================================================
// PUT /api/user/profile - Update current user profile
// ============================================================================

export const PUT = createPutHandler({
  inputSchema: UpdateUserProfileApiRequestSchema,
  outputSchema: userProfileResponseSchema,
  requireAuth: true,
  handler: async (validatedData, context) => {
    if (!context.userId) {
      throw new Error('User ID not found in context');
    }

    // Ensure brandColors has all required properties if provided
    const processedData = { ...validatedData };
    if (processedData.brandColors) {
      processedData.brandColors = {
        primary: processedData.brandColors.primary ?? '#2563eb',
        secondary: processedData.brandColors.secondary ?? '#64748b',
        accent: processedData.brandColors.accent ?? '#059669',
      };
    }

    // Call service layer with validated input and tenant-scoped context
    const result = await userService.update(
      context.userId,
      processedData as any, // Type assertion to handle brandColors transformation
      context
    );

    if (!result.success || !result.data) {
      throw new NotFoundError('User profile');
    }

    // Service already returns mapped response DTO
    return result.data;
  },
});
