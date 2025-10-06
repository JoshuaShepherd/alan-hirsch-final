// ============================================================================
// USERS API ROUTES
// ============================================================================
// Type-safe API endpoints for user management with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  CreateUserApiRequestSchema,
  ListUsersApiQuerySchema,
  PublicUserApiResponseSchema,
  userProfileResponseSchema,
} from '@platform/contracts';
import {
  createGetListHandler,
  createPostHandler,
} from '../../../../lib/api/route-handlers';
import { userService } from '../../../../lib/services';

// ============================================================================
// GET /api/users - List users with pagination and filtering
// ============================================================================

export const GET = createGetListHandler({
  inputSchema: ListUsersApiQuerySchema,
  outputSchema: userProfileResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:users'],
  handler: async (validatedQuery, context) => {
    // Provide defaults for required fields
    const queryWithDefaults = {
      page: validatedQuery.page ?? 1,
      limit: validatedQuery.limit ?? 20,
      sortBy: validatedQuery.sortBy ?? 'createdAt',
      sortOrder: validatedQuery.sortOrder ?? 'desc',
      includeOrganization: validatedQuery.includeOrganization ?? false,
      includeAssessments: validatedQuery.include_assessments ?? false,
      includeSubscription: validatedQuery.includeSubscription ?? false,
      ...validatedQuery,
    };

    // Call service layer with validated input and tenant-scoped context
    const result = await userService.findMany(queryWithDefaults, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message ?? 'Failed to fetch users');
    }

    // Service already returns mapped response DTOs
    return {
      data: result.data,
      pagination: {
        page: result.pagination?.page ?? 1,
        limit: result.pagination?.limit ?? 10,
        total: result.pagination?.total ?? 0,
        totalPages: result.pagination?.totalPages ?? 0,
        hasNext: result.pagination?.hasMore ?? false,
        hasPrev: (result.pagination?.page ?? 1) > 1,
      },
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
    // Provide defaults for required fields
    const dataWithDefaults = {
      ...validatedData,
      subscriptionTier: validatedData.subscriptionTier ?? 'free',
      languagePrimary: validatedData.languagePrimary ?? 'en',
      accountStatus: validatedData.accountStatus ?? 'pending_verification',
      onboardingCompleted: validatedData.onboardingCompleted ?? false,
      onboardingStep: validatedData.onboardingStep ?? 1,
      theologicalFocus: validatedData.theologicalFocus ?? [],
      brandColors: validatedData.brandColors
        ? {
            primary: validatedData.brandColors.primary ?? '#2563eb',
            secondary: validatedData.brandColors.secondary ?? '#64748b',
            accent: validatedData.brandColors.accent ?? '#059669',
          }
        : {
            primary: '#2563eb',
            secondary: '#64748b',
            accent: '#059669',
          },
      emailNotifications: {
        dailyDigest: validatedData.emailNotifications?.dailyDigest ?? true,
        revenueReports:
          validatedData.emailNotifications?.revenueReports ?? true,
        communityUpdates:
          validatedData.emailNotifications?.communityUpdates ?? true,
        collaborationRequests:
          validatedData.emailNotifications?.collaborationRequests ?? true,
      },
      privacySettings: {
        publicProfile: validatedData.privacySettings?.publicProfile ?? true,
        shareAnalytics: validatedData.privacySettings?.shareAnalytics ?? false,
        allowNetworking: validatedData.privacySettings?.allowNetworking ?? true,
        showAssessmentResults:
          validatedData.privacySettings?.showAssessmentResults ?? false,
      },
    };

    // Call service layer with validated input and tenant-scoped context
    const result = await userService.create(dataWithDefaults, context);

    // Check if service call was successful
    if (!result.success || !result.data) {
      throw new Error(result.error?.message ?? 'Failed to create user');
    }

    // Service already returns mapped response DTO
    return result.data;
  },
});
