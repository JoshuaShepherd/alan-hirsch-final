// ============================================================================
// USER SERVICE TESTS - DISABLED FOR REBUILD
// ============================================================================
// Comprehensive unit tests for UserService following alignment reference patterns
// DISABLED: Services deleted for rebuild - will be restored in Phase 1.3

import { beforeEach, describe, expect, it, vi } from 'vitest';
// import {
//   ForbiddenError,
//   NotFoundError,
//   ServiceContext,
//   ServiceContextBuilder,
// } from '../../apps/alan-hirsch-platform/lib/services/types'; // REMOVED: Services deleted for rebuild
// import { UserService } from '../../apps/alan-hirsch-platform/lib/services/user.service'; // REMOVED: Services deleted for rebuild

// Mock the query modules and mappers
vi.mock('@platform/database/queries/users', () => ({
  createUserProfile: vi.fn(),
  getUserProfileById: vi.fn(),
  getUserProfileByEmail: vi.fn(),
  getUserProfileBySubdomain: vi.fn(),
  searchUserProfiles: vi.fn(),
  updateUserProfile: vi.fn(),
  deleteUserProfile: vi.fn(),
  getUserStats: vi.fn(),
  getUserApestScores: vi.fn(),
  getUserMinistryContext: vi.fn(),
  getUserPlatformSettings: vi.fn(),
  getUserOnboardingStatus: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/user', () => ({
  toUserProfileEntity: vi.fn(),
  toUserProfileResponseDTO: vi.fn(),
  fromCreateUserProfile: vi.fn(),
  fromUpdateUserProfile: vi.fn(),
}));

describe.skip('UserService - DISABLED FOR REBUILD', () => {
  let userService: UserService;
  let context: ServiceContext;

  beforeEach(() => {
    userService = new UserService();
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'pastor',
      };

      const mockDbResult = { id: 'user-123', ...createData };
      const mockResponse = { id: 'user-123', ...createData, isActive: true };

      vi.mocked(userService['executeCreate']).mockResolvedValue(mockDbResult);
      vi.mocked(userService['mapDbToEntity']).mockReturnValue(mockResponse);

      const result = await userService.create(createData, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should enforce create business rules', async () => {
      const createData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'pastor',
      };

      // Test with guest role (should fail)
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      const result = await userService.create(createData, guestContext);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('findById', () => {
    it('should find user by ID successfully', async () => {
      const mockDbResult = { id: 'user-123', email: 'test@example.com' };
      const mockResponse = {
        id: 'user-123',
        email: 'test@example.com',
        isActive: true,
      };

      vi.mocked(userService['executeFindById']).mockResolvedValue(mockDbResult);
      vi.mocked(userService['mapDbToEntity']).mockReturnValue(mockResponse);

      const result = await userService.findById('user-123', context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should return not found for non-existent user', async () => {
      vi.mocked(userService['executeFindById']).mockResolvedValue(null);

      const result = await userService.findById('non-existent', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('findByEmail', () => {
    it('should find user by email successfully', async () => {
      const email = 'test@example.com';
      const mockDbResult = { id: 'user-123', email };
      const mockResponse = { id: 'user-123', email, isActive: true };

      // Mock the query module directly
      const { getUserProfileByEmail } = await import(
        '@platform/database/queries/users'
      );
      vi.mocked(getUserProfileByEmail).mockResolvedValue(mockDbResult);
      vi.mocked(userService['mapDbToEntity']).mockReturnValue(mockResponse);

      const result = await userService.findByEmail(email, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(getUserProfileByEmail).toHaveBeenCalledWith(email, {
        userId: 'user-123',
        organizationId: 'org-456',
        role: 'member',
      });
    });

    it('should return not found for non-existent email', async () => {
      const { getUserProfileByEmail } = await import(
        '@platform/database/queries/users'
      );
      vi.mocked(getUserProfileByEmail).mockResolvedValue(null);

      const result = await userService.findByEmail(
        'nonexistent@example.com',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('findBySubdomain', () => {
    it('should find user by subdomain successfully', async () => {
      const subdomain = 'johndoe';
      const mockDbResult = { id: 'user-123', subdomain };
      const mockResponse = { id: 'user-123', subdomain, isActive: true };

      const { getUserProfileBySubdomain } = await import(
        '@platform/database/queries/users'
      );
      vi.mocked(getUserProfileBySubdomain).mockResolvedValue(mockDbResult);
      vi.mocked(userService['mapDbToEntity']).mockReturnValue(mockResponse);

      const result = await userService.findBySubdomain(subdomain, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(getUserProfileBySubdomain).toHaveBeenCalledWith(subdomain);
    });
  });

  describe('updateAssessmentScores', () => {
    it('should update assessment scores for own user', async () => {
      const scores = {
        movementAlignment: 85,
        audienceEngagement: 90,
        contentReadiness: 75,
      };

      const mockResponse = {
        id: 'user-123',
        assessmentMovementAlignment: 85,
        assessmentAudienceEngagement: 90,
        assessmentContentReadiness: 75,
        isActive: true,
      };

      // Mock the update method
      vi.mocked(userService.update).mockResolvedValue({
        success: true,
        data: mockResponse,
      });

      const result = await userService.updateAssessmentScores(
        'user-123',
        scores,
        context
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(userService.update).toHaveBeenCalledWith(
        'user-123',
        {
          assessmentMovementAlignment: 85,
          assessmentAudienceEngagement: 90,
          assessmentContentReadiness: 75,
        },
        context
      );
    });

    it('should allow admin to update assessment scores for any user', async () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      const scores = { movementAlignment: 85 };
      const mockResponse = {
        id: 'user-123',
        assessmentMovementAlignment: 85,
        isActive: true,
      };

      vi.mocked(userService.update).mockResolvedValue({
        success: true,
        data: mockResponse,
      });

      const result = await userService.updateAssessmentScores(
        'user-123',
        scores,
        adminContext
      );

      expect(result.success).toBe(true);
    });

    it("should forbid non-admin from updating another user's scores", async () => {
      const scores = { movementAlignment: 85 };

      const result = await userService.updateAssessmentScores(
        'other-user-456',
        scores,
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('completeOnboarding', () => {
    it('should complete onboarding for own user', async () => {
      const mockResponse = {
        id: 'user-123',
        onboardingCompleted: true,
        onboardingStep: 10,
        isActive: true,
      };

      vi.mocked(userService.update).mockResolvedValue({
        success: true,
        data: mockResponse,
      });

      const result = await userService.completeOnboarding('user-123', context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(userService.update).toHaveBeenCalledWith(
        'user-123',
        {
          onboardingCompleted: true,
          onboardingStep: 10,
        },
        context
      );
    });

    it('should forbid completing onboarding for another user', async () => {
      const result = await userService.completeOnboarding(
        'other-user-456',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('getUserStats', () => {
    it('should get user stats for own user', async () => {
      const mockStats = {
        totalContent: 10,
        publishedContent: 8,
        totalViews: 1500,
        totalSubscribers: 25,
        activeSubscribers: 20,
        communitiesJoined: 3,
        assessmentsCompleted: 2,
      };

      const { getUserStats } = await import('@platform/database/queries/users');
      vi.mocked(getUserStats).mockResolvedValue(mockStats);

      const result = await userService.getUserStats('user-123', context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
    });

    it('should allow admin to get stats for any user', async () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      const mockStats = {
        totalContent: 5,
        publishedContent: 3,
        totalViews: 500,
      };
      const { getUserStats } = await import('@platform/database/queries/users');
      vi.mocked(getUserStats).mockResolvedValue(mockStats);

      const result = await userService.getUserStats('user-123', adminContext);

      expect(result.success).toBe(true);
    });

    it('should forbid non-admin from getting stats for another user', async () => {
      const result = await userService.getUserStats('other-user-456', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('authorization', () => {
    it('should allow users to read their own profile', () => {
      expect(userService.canRead(context, 'user-123')).toBe(true);
    });

    it('should allow admins to read any profile', () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(userService.canRead(adminContext, 'user-123')).toBe(true);
    });

    it('should forbid guests from reading profiles', () => {
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      expect(userService.canRead(guestContext, 'user-123')).toBe(false);
    });

    it('should allow users to update their own profile', () => {
      expect(userService.canUpdate(context, 'user-123')).toBe(true);
    });

    it('should allow admins to update any profile', () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(userService.canUpdate(adminContext, 'user-123')).toBe(true);
    });

    it('should only allow admins to create users', () => {
      expect(userService.canCreate(context)).toBe(false); // member role

      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(userService.canCreate(adminContext)).toBe(true);
    });

    it('should only allow owners to delete users', () => {
      expect(userService.canDelete(context, 'user-123')).toBe(false); // member role

      const ownerContext = ServiceContextBuilder.create()
        .withUserId('owner-123')
        .withRole('owner')
        .build();

      expect(userService.canDelete(ownerContext, 'user-123')).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      vi.mocked(userService['executeFindById']).mockRejectedValue(
        new Error('Database connection failed')
      );

      const result = await userService.findById('user-123', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Database connection failed');
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        email: 'invalid-email',
        firstName: '',
        lastName: '',
        ministryRole: 'pastor',
      };

      // Mock validation error
      vi.mocked(userService['validateCreateInput']).mockImplementation(() => {
        throw new Error('Invalid email format');
      });

      const result = await userService.create(invalidData, context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
