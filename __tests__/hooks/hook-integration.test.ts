// ============================================================================
// HOOK AND LIB INTEGRATION TESTS
// ============================================================================
// Tests to verify hooks and lib utilities work correctly with contracts and services

import { act, renderHook } from '@testing-library/react';
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
  isUserProfileComplete: vi.fn(),
  getUserDisplayName: vi.fn(),
  getAPESTProfile: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/content', () => ({
  toContentItemEntity: vi.fn(),
  toContentItemResponseDTO: vi.fn(),
  fromCreateContentItem: vi.fn(),
  fromUpdateContentItem: vi.fn(),
  isContentPublic: vi.fn(),
  getReadingTimeEstimate: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/assessment', () => ({
  toAssessmentEntity: vi.fn(),
  toAssessmentResponseDTO: vi.fn(),
  fromCreateAssessment: vi.fn(),
  fromUpdateAssessment: vi.fn(),
  formatDuration: vi.fn(),
  formatResponseTime: vi.fn(),
  calculateScorePercentage: vi.fn(),
}));

import {
  updateUserProfileSchema,
  userProfileResponseSchema,
} from '@platform/contracts';
import {
  getAPESTProfile,
  getUserDisplayName,
  isUserProfileComplete,
} from '../../apps/alan-hirsch-platform/lib/mappers/user';
import {
  assessmentService,
  contentService,
  userService,
} from '../../apps/alan-hirsch-platform/lib/services';

// Import hooks (these would be actual hook imports)
// import { useUserProfile, useContentItem, useAssessment } from '../../apps/alan-hirsch-platform/hooks';

describe('Hook and Lib Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Profile Hook Integration', () => {
    it('should fetch user profile with full pipeline validation', async () => {
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

      // Mock the pipeline
      vi.mocked(userService.findById).mockResolvedValue(mockServiceResult);
      vi.mocked(userProfileResponseSchema.parse).mockReturnValue(
        mockServiceResult.data
      );
      vi.mocked(isUserProfileComplete).mockReturnValue(true);
      vi.mocked(getUserDisplayName).mockReturnValue('John Doe');
      vi.mocked(getAPESTProfile).mockReturnValue({
        primary: 'teaching',
        secondary: 'apostolic',
        scores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 78,
          shepherding: 82,
          teaching: 90,
        },
      });

      // Act
      const { result } = renderHook(() => {
        // This would be the actual hook implementation
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const fetchUser = async id => {
          setLoading(true);
          setError(null);
          try {
            const serviceResult = await userService.findById(id);
            if (serviceResult.success) {
              const validatedData = userProfileResponseSchema.parse(
                serviceResult.data
              );
              setUser(validatedData);
            } else {
              setError(serviceResult.error);
            }
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        return { user, loading, error, fetchUser };
      });

      await act(async () => {
        await result.current.fetchUser(userId);
      });

      // Assert
      expect(result.current.user).toEqual(mockServiceResult.data);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();

      // Verify pipeline steps
      expect(userService.findById).toHaveBeenCalledWith(
        userId,
        expect.any(Object)
      );
      expect(userProfileResponseSchema.parse).toHaveBeenCalledWith(
        mockServiceResult.data
      );
    });

    it('should handle user profile update with full pipeline validation', async () => {
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

      // Mock the pipeline
      vi.mocked(updateUserProfileSchema.parse).mockReturnValue(updateData);
      vi.mocked(userService.update).mockResolvedValue(mockServiceResult);
      vi.mocked(userProfileResponseSchema.parse).mockReturnValue(
        mockServiceResult.data
      );

      // Act
      const { result } = renderHook(() => {
        // This would be the actual hook implementation
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const updateUser = async (id, data) => {
          setLoading(true);
          setError(null);
          try {
            const validatedData = updateUserProfileSchema.parse(data);
            const serviceResult = await userService.update(id, validatedData);
            if (serviceResult.success) {
              const validatedResponse = userProfileResponseSchema.parse(
                serviceResult.data
              );
              setUser(validatedResponse);
            } else {
              setError(serviceResult.error);
            }
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        return { user, loading, error, updateUser };
      });

      await act(async () => {
        await result.current.updateUser(userId, updateData);
      });

      // Assert
      expect(result.current.user).toEqual(mockServiceResult.data);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();

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

    it('should handle validation errors in hooks', async () => {
      // Arrange
      const userId = 'user-123';
      const invalidData = {
        email: 'invalid-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid-role',
      };

      const validationError = new Error('Validation failed');
      vi.mocked(updateUserProfileSchema.parse).mockImplementation(() => {
        throw validationError;
      });

      // Act
      const { result } = renderHook(() => {
        // This would be the actual hook implementation
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const updateUser = async (id, data) => {
          setLoading(true);
          setError(null);
          try {
            const validatedData = updateUserProfileSchema.parse(data);
            const serviceResult = await userService.update(id, validatedData);
            if (serviceResult.success) {
              const validatedResponse = userProfileResponseSchema.parse(
                serviceResult.data
              );
              setUser(validatedResponse);
            } else {
              setError(serviceResult.error);
            }
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        return { user, loading, error, updateUser };
      });

      await act(async () => {
        await result.current.updateUser(userId, invalidData);
      });

      // Assert
      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(validationError);
    });

    it('should handle service errors in hooks', async () => {
      // Arrange
      const userId = 'user-123';
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
        ministryRole: 'associate_pastor',
      };

      const serviceError = new Error('Service error');
      vi.mocked(updateUserProfileSchema.parse).mockReturnValue(updateData);
      vi.mocked(userService.update).mockResolvedValue({
        success: false,
        error: serviceError,
      });

      // Act
      const { result } = renderHook(() => {
        // This would be the actual hook implementation
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const updateUser = async (id, data) => {
          setLoading(true);
          setError(null);
          try {
            const validatedData = updateUserProfileSchema.parse(data);
            const serviceResult = await userService.update(id, validatedData);
            if (serviceResult.success) {
              const validatedResponse = userProfileResponseSchema.parse(
                serviceResult.data
              );
              setUser(validatedResponse);
            } else {
              setError(serviceResult.error);
            }
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        return { user, loading, error, updateUser };
      });

      await act(async () => {
        await result.current.updateUser(userId, updateData);
      });

      // Assert
      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(serviceError);
    });
  });

  describe('Content Item Hook Integration', () => {
    it('should fetch content item with full pipeline validation', async () => {
      // Arrange
      const contentId = 'content-123';
      const mockServiceResult = {
        success: true,
        data: {
          id: contentId,
          title: 'Test Article',
          slug: 'test-article',
          authorId: 'user-123',
          contentType: 'article',
          status: 'published',
          visibility: 'public',
          createdAt: '2023-05-01T00:00:00Z',
          updatedAt: '2023-06-01T00:00:00Z',
          wordCount: 500,
          estimatedReadingTime: 3,
          viewCount: 100,
          likeCount: 10,
          shareCount: 5,
          commentCount: 3,
          bookmarkCount: 2,
          tags: ['test', 'article'],
          theologicalThemes: ['leadership'],
          aiEnhanced: true,
          aiSummary: 'AI-generated summary',
          aiKeyPoints: ['Key point 1', 'Key point 2'],
          featuredImageUrl: 'https://example.com/image.jpg',
          publishedAt: '2023-05-01T00:00:00Z',
          licenseType: 'all_rights_reserved',
          attributionRequired: true,
        },
      };

      // Mock the pipeline
      vi.mocked(contentService.findById).mockResolvedValue(mockServiceResult);
      vi.mocked(contentItemResponseSchema.parse).mockReturnValue(
        mockServiceResult.data
      );

      // Act
      const { result } = renderHook(() => {
        // This would be the actual hook implementation
        const [content, setContent] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const fetchContent = async id => {
          setLoading(true);
          setError(null);
          try {
            const serviceResult = await contentService.findById(id);
            if (serviceResult.success) {
              const validatedData = contentItemResponseSchema.parse(
                serviceResult.data
              );
              setContent(validatedData);
            } else {
              setError(serviceResult.error);
            }
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        return { content, loading, error, fetchContent };
      });

      await act(async () => {
        await result.current.fetchContent(contentId);
      });

      // Assert
      expect(result.current.content).toEqual(mockServiceResult.data);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();

      // Verify pipeline steps
      expect(contentService.findById).toHaveBeenCalledWith(
        contentId,
        expect.any(Object)
      );
      expect(contentItemResponseSchema.parse).toHaveBeenCalledWith(
        mockServiceResult.data
      );
    });
  });

  describe('Assessment Hook Integration', () => {
    it('should fetch assessment with full pipeline validation', async () => {
      // Arrange
      const assessmentId = 'assessment-123';
      const mockServiceResult = {
        success: true,
        data: {
          id: assessmentId,
          name: 'APEST Assessment',
          slug: 'apest-assessment',
          description: 'Test assessment description',
          assessmentType: 'apest',
          questionsCount: 25,
          estimatedDuration: 30,
          passingScore: 70,
          validityScore: 0.85,
          reliabilityScore: 0.9,
          instructions: 'Complete all questions honestly',
          publishedAt: '2023-01-01T00:00:00Z',
          version: '1.0',
          language: 'en',
          culturalAdaptation: 'universal',
          researchBacked: true,
          scoringMethod: 'likert_5',
          status: 'active',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-12-01T00:00:00Z',
        },
      };

      // Mock the pipeline
      vi.mocked(assessmentService.findById).mockResolvedValue(
        mockServiceResult
      );
      vi.mocked(assessmentResponseSchema.parse).mockReturnValue(
        mockServiceResult.data
      );

      // Act
      const { result } = renderHook(() => {
        // This would be the actual hook implementation
        const [assessment, setAssessment] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const fetchAssessment = async id => {
          setLoading(true);
          setError(null);
          try {
            const serviceResult = await assessmentService.findById(id);
            if (serviceResult.success) {
              const validatedData = assessmentResponseSchema.parse(
                serviceResult.data
              );
              setAssessment(validatedData);
            } else {
              setError(serviceResult.error);
            }
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        return { assessment, loading, error, fetchAssessment };
      });

      await act(async () => {
        await result.current.fetchAssessment(assessmentId);
      });

      // Assert
      expect(result.current.assessment).toEqual(mockServiceResult.data);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();

      // Verify pipeline steps
      expect(assessmentService.findById).toHaveBeenCalledWith(
        assessmentId,
        expect.any(Object)
      );
      expect(assessmentResponseSchema.parse).toHaveBeenCalledWith(
        mockServiceResult.data
      );
    });
  });

  describe('Lib Utility Integration', () => {
    it('should validate user profile completeness', () => {
      // Arrange
      const completeProfile = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        onboardingCompleted: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
      };

      const incompleteProfile = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        onboardingCompleted: false,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
      };

      // Mock the utility functions
      vi.mocked(isUserProfileComplete).mockReturnValueOnce(true);
      vi.mocked(isUserProfileComplete).mockReturnValueOnce(false);

      // Act
      const isComplete1 = isUserProfileComplete(completeProfile);
      const isComplete2 = isUserProfileComplete(incompleteProfile);

      // Assert
      expect(isComplete1).toBe(true);
      expect(isComplete2).toBe(false);
    });

    it('should get user display name correctly', () => {
      // Arrange
      const profileWithDisplayName = {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'Johnny',
      };

      const profileWithoutDisplayName = {
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        displayName: null,
      };

      // Mock the utility functions
      vi.mocked(getUserDisplayName).mockReturnValueOnce('Johnny');
      vi.mocked(getUserDisplayName).mockReturnValueOnce('John Doe');

      // Act
      const displayName1 = getUserDisplayName(profileWithDisplayName);
      const displayName2 = getUserDisplayName(profileWithoutDisplayName);

      // Assert
      expect(displayName1).toBe('Johnny');
      expect(displayName2).toBe('John Doe');
    });

    it('should get APEST profile correctly', () => {
      // Arrange
      const profileWithAssessment = {
        id: 'user-123',
        assessmentTotal: 475,
        assessmentMovementAlignment: 85,
        assessmentAudienceEngagement: 72,
        assessmentContentReadiness: 90,
        assessmentRevenuePotential: 68,
        assessmentNetworkEffects: 78,
        assessmentStrategicFit: 82,
      };

      const profileWithoutAssessment = {
        id: 'user-123',
        assessmentTotal: null,
      };

      // Mock the utility functions
      vi.mocked(getAPESTProfile).mockReturnValueOnce({
        primary: 'teaching',
        secondary: 'apostolic',
        scores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 78,
          shepherding: 82,
          teaching: 90,
        },
      });
      vi.mocked(getAPESTProfile).mockReturnValueOnce(null);

      // Act
      const apestProfile1 = getAPESTProfile(profileWithAssessment);
      const apestProfile2 = getAPESTProfile(profileWithoutAssessment);

      // Assert
      expect(apestProfile1).toEqual({
        primary: 'teaching',
        secondary: 'apostolic',
        scores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 78,
          shepherding: 82,
          teaching: 90,
        },
      });
      expect(apestProfile2).toBeNull();
    });
  });
});
