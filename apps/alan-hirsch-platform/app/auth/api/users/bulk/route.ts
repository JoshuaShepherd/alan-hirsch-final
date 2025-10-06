import {
  newUserProfileSchema,
  userProfileResponseSchema,
  userProfileUpdateSchema,
} from '@platform/contracts';
import { createBulkOperationHandler } from '@platform/shared/api/bulk-operations';
import { ServiceUtils, userService } from '../../../../../lib/services';

// ============================================================================
// User Bulk Operations API Route - Type-Safe Implementation
// ============================================================================

// POST /api/users/bulk - Bulk operations on users
export const POST = createBulkOperationHandler({
  itemSchema: userProfileResponseSchema,
  createSchema: newUserProfileSchema,
  updateSchema: userProfileUpdateSchema,
  service: {
    create: async (data, context) => {
      // Ensure required fields have defaults
      const createData = {
        ...data,
        languagePrimary: data.languagePrimary ?? 'en',
        subscriptionTier: data.subscriptionTier ?? 'free',
        theologicalFocus: data.theologicalFocus ?? [],
        brandColors: data.brandColors
          ? {
              primary: data.brandColors.primary ?? '#2563eb',
              secondary: data.brandColors.secondary ?? '#64748b',
              accent: data.brandColors.accent ?? '#059669',
            }
          : {
              primary: '#2563eb',
              secondary: '#64748b',
              accent: '#059669',
            },
        emailNotifications: data.emailNotifications
          ? {
              dailyDigest: data.emailNotifications.dailyDigest ?? true,
              collaborationRequests:
                data.emailNotifications.collaborationRequests ?? true,
              revenueReports: data.emailNotifications.revenueReports ?? true,
              communityUpdates:
                data.emailNotifications.communityUpdates ?? true,
            }
          : {
              dailyDigest: true,
              collaborationRequests: true,
              revenueReports: true,
              communityUpdates: true,
            },
        privacySettings: data.privacySettings
          ? {
              publicProfile: data.privacySettings.publicProfile ?? true,
              showAssessmentResults:
                data.privacySettings.showAssessmentResults ?? false,
              allowNetworking: data.privacySettings.allowNetworking ?? true,
              shareAnalytics: data.privacySettings.shareAnalytics ?? false,
            }
          : {
              publicProfile: true,
              showAssessmentResults: false,
              allowNetworking: true,
              shareAnalytics: false,
            },
        onboardingCompleted: data.onboardingCompleted ?? false,
        onboardingStep: data.onboardingStep ?? 1,
        accountStatus: data.accountStatus ?? 'pending_verification',
      };
      const result = await userService.create(createData, context);
      return ServiceUtils.validateServiceResult(result);
    },
    update: async (id, data, context) => {
      // Ensure complex objects have proper structure if provided
      const updateData = {
        ...data,
        brandColors: data.brandColors
          ? {
              primary: data.brandColors.primary ?? '#2563eb',
              secondary: data.brandColors.secondary ?? '#64748b',
              accent: data.brandColors.accent ?? '#059669',
            }
          : undefined,
        emailNotifications: data.emailNotifications
          ? {
              dailyDigest: data.emailNotifications.dailyDigest ?? true,
              collaborationRequests:
                data.emailNotifications.collaborationRequests ?? true,
              revenueReports: data.emailNotifications.revenueReports ?? true,
              communityUpdates:
                data.emailNotifications.communityUpdates ?? true,
            }
          : undefined,
        privacySettings: data.privacySettings
          ? {
              publicProfile: data.privacySettings.publicProfile ?? true,
              showAssessmentResults:
                data.privacySettings.showAssessmentResults ?? false,
              allowNetworking: data.privacySettings.allowNetworking ?? true,
              shareAnalytics: data.privacySettings.shareAnalytics ?? false,
            }
          : undefined,
      };
      const result = await userService.update(id, updateData, context);
      return ServiceUtils.validateServiceResult(result);
    },
    delete: async (id, context) => {
      const result = await userService.delete(id, context);
      if (!result.success) {
        throw new Error(result.error?.message ?? 'Delete operation failed');
      }
    },
  },
});
