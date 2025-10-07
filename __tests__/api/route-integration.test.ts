// ============================================================================
// API ROUTE INTEGRATION TESTS
// ============================================================================
// Tests to verify API routes work correctly with services, contracts, and mappers

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the services
vi.mock('../../apps/alan-hirsch-platform/lib/services', () => ({
  userService: {
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  contentService: {
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  assessmentService: {
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock the contracts
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
  createContentItemSchema: {
    parse: vi.fn(data => data),
  },
  updateContentItemSchema: {
    parse: vi.fn(data => data),
  },
  contentItemResponseSchema: {
    parse: vi.fn(data => data),
  },
  createAssessmentSchema: {
    parse: vi.fn(data => data),
  },
  updateAssessmentSchema: {
    parse: vi.fn(data => data),
  },
  assessmentResponseSchema: {
    parse: vi.fn(data => data),
  },
}));

// Mock the mappers
vi.mock('../../apps/alan-hirsch-platform/lib/mappers/user', () => ({
  toUserProfileEntity: vi.fn(),
  toUserProfileResponseDTO: vi.fn(),
  fromCreateUserProfile: vi.fn(),
  fromUpdateUserProfile: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/content', () => ({
  toContentItemEntity: vi.fn(),
  toContentItemResponseDTO: vi.fn(),
  fromCreateContentItem: vi.fn(),
  fromUpdateContentItem: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/assessment', () => ({
  toAssessmentEntity: vi.fn(),
  toAssessmentResponseDTO: vi.fn(),
  fromCreateAssessment: vi.fn(),
  fromUpdateAssessment: vi.fn(),
}));

import {
  createUserProfileSchema,
  updateUserProfileSchema,
  userProfileResponseSchema,
} from '@platform/contracts';
import { userService } from '../../apps/alan-hirsch-platform/lib/services';

// Import route handlers
import {
  DELETE as deleteUser,
  GET as getUserById,
  PUT as updateUser,
} from '../../apps/alan-hirsch-platform/app/auth/api/users/[id]/route';
import { POST as createUser } from '../../apps/alan-hirsch-platform/app/auth/api/users/route';

describe('API Route Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User API Routes', () => {
    describe('POST /api/users', () => {
      it('should create user with full pipeline validation', async () => {
        // Arrange
        const requestData = {
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

        const mockServiceResult = {
          success: true,
          data: {
            id: 'user-123',
            ...requestData,
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-12-01T00:00:00Z',
            lastActiveAt: '2023-12-01T12:00:00Z',
            isActive: false,
            hasCompletedOnboarding: false,
            fullName: 'John Doe',
            displayNameOrFullName: 'Johnny',
            hasCustomDomain: true,
            hasSubdomain: true,
            isPublicProfile: true,
            canReceiveNotifications: true,
            assessmentCompleted: false,
          },
        };

        const mockRequest = new NextRequest('http://localhost:3000/api/users', {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Mock the pipeline
        vi.mocked(createUserProfileSchema.parse).mockReturnValue(requestData);
        vi.mocked(userService.create).mockResolvedValue(mockServiceResult);
        vi.mocked(userProfileResponseSchema.parse).mockReturnValue(
          mockServiceResult.data
        );

        // Act
        const response = await createUser(mockRequest);
        const result = await response.json();

        // Assert
        expect(response.status).toBe(201);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockServiceResult.data);

        // Verify pipeline steps
        expect(createUserProfileSchema.parse).toHaveBeenCalledWith(requestData);
        expect(userService.create).toHaveBeenCalledWith(
          requestData,
          expect.any(Object)
        );
        expect(userProfileResponseSchema.parse).toHaveBeenCalledWith(
          mockServiceResult.data
        );
      });

      it('should handle validation errors', async () => {
        // Arrange
        const invalidData = {
          email: 'invalid-email',
          firstName: '',
          lastName: '',
          ministryRole: 'invalid-role',
        };

        const mockRequest = new NextRequest('http://localhost:3000/api/users', {
          method: 'POST',
          body: JSON.stringify(invalidData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const validationError = new Error('Validation failed');
        vi.mocked(createUserProfileSchema.parse).mockImplementation(() => {
          throw validationError;
        });

        // Act
        const response = await createUser(mockRequest);
        const result = await response.json();

        // Assert
        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Validation failed');
      });

      it('should handle service errors', async () => {
        // Arrange
        const requestData = {
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          ministryRole: 'senior_pastor',
        };

        const mockRequest = new NextRequest('http://localhost:3000/api/users', {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const serviceError = new Error('Service error');
        vi.mocked(createUserProfileSchema.parse).mockReturnValue(requestData);
        vi.mocked(userService.create).mockResolvedValue({
          success: false,
          error: serviceError,
        });

        // Act
        const response = await createUser(mockRequest);
        const result = await response.json();

        // Assert
        expect(response.status).toBe(500);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Service error');
      });
    });

    describe('GET /api/users/[id]', () => {
      it('should get user by ID with full pipeline validation', async () => {
        // Arrange
        const userId = 'user-123';
        const mockServiceResult = {
          success: true,
          data: {
            id: userId,
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            ministryRole: 'senior_pastor',
            accountStatus: 'active',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-12-01T00:00:00Z',
            lastActiveAt: '2023-12-01T12:00:00Z',
            isActive: true,
            hasCompletedOnboarding: true,
            fullName: 'John Doe',
            displayNameOrFullName: 'John Doe',
            hasCustomDomain: false,
            hasSubdomain: false,
            isPublicProfile: true,
            canReceiveNotifications: true,
            assessmentCompleted: false,
          },
        };

        const mockRequest = new NextRequest(
          `http://localhost:3000/api/users/${userId}`
        );

        // Mock the pipeline
        vi.mocked(userService.findById).mockResolvedValue(mockServiceResult);
        vi.mocked(userProfileResponseSchema.parse).mockReturnValue(
          mockServiceResult.data
        );

        // Act
        const response = await getUserById(mockRequest, {
          params: { id: userId },
        });
        const result = await response.json();

        // Assert
        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockServiceResult.data);

        // Verify pipeline steps
        expect(userService.findById).toHaveBeenCalledWith(
          userId,
          expect.any(Object)
        );
        expect(userProfileResponseSchema.parse).toHaveBeenCalledWith(
          mockServiceResult.data
        );
      });

      it('should handle user not found', async () => {
        // Arrange
        const userId = 'non-existent-user';
        const mockRequest = new NextRequest(
          `http://localhost:3000/api/users/${userId}`
        );

        vi.mocked(userService.findById).mockResolvedValue({
          success: false,
          error: new Error('User not found'),
        });

        // Act
        const response = await getUserById(mockRequest, {
          params: { id: userId },
        });
        const result = await response.json();

        // Assert
        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found');
      });
    });

    describe('PUT /api/users/[id]', () => {
      it('should update user with full pipeline validation', async () => {
        // Arrange
        const userId = 'user-123';
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

        const mockServiceResult = {
          success: true,
          data: {
            id: userId,
            email: 'test@example.com',
            firstName: 'Updated',
            lastName: 'Name',
            ministryRole: 'associate_pastor',
            accountStatus: 'active',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-12-01T00:00:00Z',
            lastActiveAt: '2023-12-01T12:00:00Z',
            isActive: true,
            hasCompletedOnboarding: true,
            fullName: 'Updated Name',
            displayNameOrFullName: 'Updated Display',
            hasCustomDomain: false,
            hasSubdomain: false,
            isPublicProfile: true,
            canReceiveNotifications: true,
            assessmentCompleted: false,
          },
        };

        const mockRequest = new NextRequest(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Mock the pipeline
        vi.mocked(updateUserProfileSchema.parse).mockReturnValue(updateData);
        vi.mocked(userService.update).mockResolvedValue(mockServiceResult);
        vi.mocked(userProfileResponseSchema.parse).mockReturnValue(
          mockServiceResult.data
        );

        // Act
        const response = await updateUser(mockRequest, {
          params: { id: userId },
        });
        const result = await response.json();

        // Assert
        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockServiceResult.data);

        // Verify pipeline steps
        expect(updateUserProfileSchema.parse).toHaveBeenCalledWith(updateData);
        expect(userService.update).toHaveBeenCalledWith(
          userId,
          updateData,
          expect.any(Object)
        );
        expect(userProfileResponseSchema.parse).toHaveBeenCalledWith(
          mockServiceResult.data
        );
      });
    });

    describe('DELETE /api/users/[id]', () => {
      it('should delete user successfully', async () => {
        // Arrange
        const userId = 'user-123';
        const mockRequest = new NextRequest(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: 'DELETE',
          }
        );

        const mockServiceResult = {
          success: true,
          data: { id: userId },
        };

        // Mock the pipeline
        vi.mocked(userService.delete).mockResolvedValue(mockServiceResult);

        // Act
        const response = await deleteUser(mockRequest, {
          params: { id: userId },
        });
        const result = await response.json();

        // Assert
        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.data).toEqual({ id: userId });

        // Verify pipeline steps
        expect(userService.delete).toHaveBeenCalledWith(
          userId,
          expect.any(Object)
        );
      });
    });
  });

  describe('API Error Handling', () => {
    it('should handle malformed JSON', async () => {
      // Arrange
      const mockRequest = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: 'invalid-json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Act
      const response = await createUser(mockRequest);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid JSON');
    });

    it('should handle missing required fields', async () => {
      // Arrange
      const incompleteData = {
        email: 'test@example.com',
        // Missing firstName, lastName, ministryRole
      };

      const mockRequest = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(incompleteData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const validationError = new Error('Missing required fields');
      vi.mocked(createUserProfileSchema.parse).mockImplementation(() => {
        throw validationError;
      });

      // Act
      const response = await createUser(mockRequest);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Missing required fields');
    });

    it('should handle unauthorized access', async () => {
      // Arrange
      const userId = 'user-123';
      const mockRequest = new NextRequest(
        `http://localhost:3000/api/users/${userId}`
      );

      vi.mocked(userService.findById).mockResolvedValue({
        success: false,
        error: new Error('Unauthorized'),
      });

      // Act
      const response = await getUserById(mockRequest, {
        params: { id: userId },
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(401);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unauthorized');
    });
  });
});
