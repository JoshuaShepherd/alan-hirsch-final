// ============================================================================
// SERVICE INTEGRATION TESTS - DISABLED FOR REBUILD
// ============================================================================
// Tests to verify services work correctly with contracts and mappers
// DISABLED: Services deleted for rebuild - will be restored in Phase 1.3

import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { ServiceContextBuilder } from '../../apps/alan-hirsch-platform/lib/services/types'; // REMOVED: Services deleted for rebuild

// Mock the database and mappers
vi.mock('@platform/database/queries/users', () => ({
  createUserProfile: vi.fn(),
  getUserProfileById: vi.fn(),
  updateUserProfile: vi.fn(),
  deleteUserProfile: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/user', () => ({
  toUserProfileEntity: vi.fn(),
  toUserProfileResponseDTO: vi.fn(),
  fromCreateUserProfile: vi.fn(),
  fromUpdateUserProfile: vi.fn(),
}));

vi.mock('@platform/contracts', () => ({
  createUserProfileSchema: {
    parse: vi.fn(data => data),
  },
  updateUserProfileSchema: {
    parse: vi.fn(data => data),
  },
  userProfileResponseSchema: {
    parse: vi.fn(data => data),
  },
}));

import {
  createUserProfileSchema,
  updateUserProfileSchema,
  userProfileResponseSchema,
} from '@platform/contracts';
import {
  createUserProfile,
  updateUserProfile,
} from '@platform/database/queries/users';
import {
  fromCreateUserProfile,
  fromUpdateUserProfile,
  toUserProfileEntity,
  toUserProfileResponseDTO,
} from '../../apps/alan-hirsch-platform/lib/mappers/user';
// import { UserService } from '../../apps/alan-hirsch-platform/lib/services/user.service'; // REMOVED: Services deleted for rebuild

describe.skip('Service Integration Tests - DISABLED FOR REBUILD', () => {
  let userService: UserService;
  let context: any;

  beforeEach(() => {
    userService = new UserService();
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('User Service Integration', () => {
    it('should create user with full pipeline validation', async () => {
      // Arrange
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        displayName: 'Johnny',
        bio: 'Test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        culturalContext: 'western',
        leaderTier: 'core',
        subdomain: 'john-doe',
        customDomain: 'johndoe.com',
        platformTitle: 'John Doe Ministry',
        languagePrimary: 'en',
        subscriptionTier: 'professional',
        theologicalFocus: ['missional', 'apostolic'],
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: false,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },
        onboardingCompleted: false,
        onboardingStep: 1,
        accountStatus: 'pending_verification',
      };

      const mockDbResult = {
        id: 'user-123',
        ...createData,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      const mockEntity = {
        id: 'user-123',
        ...createData,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
      };

      const mockResponse = {
        ...mockEntity,
        isActive: false,
        hasCompletedOnboarding: false,
        fullName: 'John Doe',
        displayNameOrFullName: 'Johnny',
        hasCustomDomain: true,
        hasSubdomain: true,
        isPublicProfile: true,
        canReceiveNotifications: true,
        assessmentCompleted: false,
      };

      // Mock the pipeline
      vi.mocked(createUserProfileSchema.parse).mockReturnValue(createData);
      vi.mocked(fromCreateUserProfile).mockReturnValue(createData);
      vi.mocked(createUserProfile).mockResolvedValue(mockDbResult);
      vi.mocked(toUserProfileEntity).mockReturnValue(mockEntity);
      vi.mocked(toUserProfileResponseDTO).mockReturnValue(mockResponse);
      vi.mocked(userProfileResponseSchema.parse).mockReturnValue(mockResponse);

      // Act
      const result = await userService.create(createData, context);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);

      // Verify pipeline steps
      expect(createUserProfileSchema.parse).toHaveBeenCalledWith(createData);
      expect(fromCreateUserProfile).toHaveBeenCalledWith(createData);
      expect(createUserProfile).toHaveBeenCalledWith(createData);
      expect(toUserProfileEntity).toHaveBeenCalledWith(mockDbResult);
      expect(toUserProfileResponseDTO).toHaveBeenCalledWith(mockDbResult);
      expect(userProfileResponseSchema.parse).toHaveBeenCalledWith(
        mockResponse
      );
    });

    it('should update user with full pipeline validation', async () => {
      // Arrange
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
        displayName: 'Updated Display',
        bio: 'Updated bio',
        ministryRole: 'associate_pastor',
        yearsInMinistry: 15,
        subscriptionTier: 'leader',
        accountStatus: 'active',
      };

      const mockDbResult = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'Updated',
        lastName: 'Name',
        ministryRole: 'associate_pastor',
        accountStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      const mockEntity = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'Updated',
        lastName: 'Name',
        ministryRole: 'associate_pastor',
        accountStatus: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
      };

      const mockResponse = {
        ...mockEntity,
        isActive: true,
        hasCompletedOnboarding: true,
        fullName: 'Updated Name',
        displayNameOrFullName: 'Updated Display',
        hasCustomDomain: false,
        hasSubdomain: false,
        isPublicProfile: true,
        canReceiveNotifications: true,
        assessmentCompleted: false,
      };

      // Mock the pipeline
      vi.mocked(updateUserProfileSchema.parse).mockReturnValue(updateData);
      vi.mocked(fromUpdateUserProfile).mockReturnValue(updateData);
      vi.mocked(updateUserProfile).mockResolvedValue(mockDbResult);
      vi.mocked(toUserProfileEntity).mockReturnValue(mockEntity);
      vi.mocked(toUserProfileResponseDTO).mockReturnValue(mockResponse);
      vi.mocked(userProfileResponseSchema.parse).mockReturnValue(mockResponse);

      // Act
      const result = await userService.update('user-123', updateData, context);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);

      // Verify pipeline steps
      expect(updateUserProfileSchema.parse).toHaveBeenCalledWith(updateData);
      expect(fromUpdateUserProfile).toHaveBeenCalledWith(updateData);
      expect(updateUserProfile).toHaveBeenCalledWith('user-123', updateData);
      expect(toUserProfileEntity).toHaveBeenCalledWith(mockDbResult);
      expect(toUserProfileResponseDTO).toHaveBeenCalledWith(mockDbResult);
      expect(userProfileResponseSchema.parse).toHaveBeenCalledWith(
        mockResponse
      );
    });

    it('should handle validation errors in pipeline', async () => {
      // Arrange
      const invalidData = {
        email: 'invalid-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid-role',
      };

      const validationError = new Error('Validation failed');
      vi.mocked(createUserProfileSchema.parse).mockImplementation(() => {
        throw validationError;
      });

      // Act
      const result = await userService.create(invalidData, context);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe(validationError);
    });

    it('should handle database errors in pipeline', async () => {
      // Arrange
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const dbError = new Error('Database connection failed');
      vi.mocked(createUserProfileSchema.parse).mockReturnValue(createData);
      vi.mocked(fromCreateUserProfile).mockReturnValue(createData);
      vi.mocked(createUserProfile).mockRejectedValue(dbError);

      // Act
      const result = await userService.create(createData, context);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe(dbError);
    });

    it('should handle mapper errors in pipeline', async () => {
      // Arrange
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const mockDbResult = {
        id: 'user-123',
        ...createData,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      const mapperError = new Error('Mapper transformation failed');
      vi.mocked(createUserProfileSchema.parse).mockReturnValue(createData);
      vi.mocked(fromCreateUserProfile).mockReturnValue(createData);
      vi.mocked(createUserProfile).mockResolvedValue(mockDbResult);
      vi.mocked(toUserProfileEntity).mockImplementation(() => {
        throw mapperError;
      });

      // Act
      const result = await userService.create(createData, context);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe(mapperError);
    });
  });

  describe('Service Context Integration', () => {
    it('should enforce permissions correctly', async () => {
      // Arrange
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      // Act
      const result = await userService.create(createData, guestContext);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(Error);
    });

    it('should handle tenant isolation correctly', async () => {
      // Arrange
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const tenantContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withTenantId('org-456')
        .withRole('member')
        .build();

      const mockDbResult = {
        id: 'user-123',
        ...createData,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      const mockEntity = {
        id: 'user-123',
        ...createData,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
      };

      const mockResponse = {
        ...mockEntity,
        isActive: false,
        hasCompletedOnboarding: false,
        fullName: 'John Doe',
        displayNameOrFullName: 'John Doe',
        hasCustomDomain: false,
        hasSubdomain: false,
        isPublicProfile: true,
        canReceiveNotifications: true,
        assessmentCompleted: false,
      };

      // Mock the pipeline
      vi.mocked(createUserProfileSchema.parse).mockReturnValue(createData);
      vi.mocked(fromCreateUserProfile).mockReturnValue(createData);
      vi.mocked(createUserProfile).mockResolvedValue(mockDbResult);
      vi.mocked(toUserProfileEntity).mockReturnValue(mockEntity);
      vi.mocked(toUserProfileResponseDTO).mockReturnValue(mockResponse);
      vi.mocked(userProfileResponseSchema.parse).mockReturnValue(mockResponse);

      // Act
      const result = await userService.create(createData, tenantContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });
  });
});
