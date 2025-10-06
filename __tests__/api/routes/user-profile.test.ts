// ============================================================================
// USER PROFILE ROUTES TEST SUITE
// ============================================================================
// Test suite for user profile API routes with ingress/egress validation

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  GET,
  PUT,
} from '../../apps/alan-hirsch-platform/app/auth/api/user/profile/route';
import { toUserProfileResponseDTO } from '../../apps/alan-hirsch-platform/lib/mappers/user';
import { userService } from '../../apps/alan-hirsch-platform/lib/services';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUserProfile = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  displayName: 'Johnny',
  bio: 'Test user bio',
  avatarUrl: 'https://example.com/avatar.jpg',
  ministryRole: 'Pastor',
  denomination: 'Baptist',
  organizationName: 'Test Church',
  yearsInMinistry: 10,
  countryCode: 'US',
  timezone: 'America/New_York',
  culturalContext: 'Western',
  assessmentMovementAlignment: 85,
  assessmentAudienceEngagement: 90,
  assessmentContentReadiness: 75,
  assessmentRevenuePotential: 80,
  assessmentNetworkEffects: 88,
  assessmentStrategicFit: 82,
  assessmentTotal: 400,
  leaderTier: 'gold',
  subdomain: 'johndoe',
  customDomain: 'johndoe.com',
  platformTitle: "Pastor John's Platform",
  languagePrimary: 'en',
  subscriptionTier: 'premium',
  theologicalFocus: ['evangelical', 'missional'],
  brandColors: {
    accent: '#059669',
    primary: '#2563eb',
    secondary: '#64748b',
  },
  emailNotifications: {
    dailyDigest: true,
    revenueReports: true,
    communityUpdates: false,
    collaborationRequests: true,
  },
  privacySettings: {
    publicProfile: true,
    shareAnalytics: false,
    allowNetworking: true,
    showAssessmentResults: false,
  },
  onboardingCompleted: true,
  onboardingStep: 10,
  accountStatus: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
};

const mockUserProfileResponse = {
  ...mockUserProfile,
  isActive: true,
  hasCompletedOnboarding: true,
  fullName: 'John Doe',
  displayNameOrFullName: 'Johnny',
  hasCustomDomain: true,
  hasSubdomain: true,
  isPublicProfile: true,
  canReceiveNotifications: true,
  assessmentCompleted: true,
  primaryGift: 'Evangelist',
  secondaryGift: 'Pastor',
  ministryExperience: '10 years in ministry',
  locationDisplay: 'United States',
};

// ============================================================================
// MOCKS
// ============================================================================

vi.mock('@platform/database', () => ({
  createSupabaseServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: '123e4567-e89b-12d3-a456-426614174000' } },
        error: null,
      }),
    },
  })),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/services', () => ({
  userService: {
    findById: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/user', () => ({
  toUserProfileResponseDTO: vi.fn(),
}));

// ============================================================================
// TEST SUITE
// ============================================================================

describe('User Profile Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(toUserProfileResponseDTO).mockReturnValue(
      mockUserProfileResponse
    );
  });

  describe('GET /api/user/profile', () => {
    it('should return user profile successfully', async () => {
      vi.mocked(userService.findById).mockResolvedValue(mockUserProfile);

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'GET',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockUserProfileResponse);
      expect(data.meta.timestamp).toBeDefined();

      expect(userService.findById).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        expect.objectContaining({
          userId: '123e4567-e89b-12d3-a456-426614174000',
          tenantId: expect.any(String),
        })
      );
      expect(toUserProfileResponseDTO).toHaveBeenCalledWith(mockUserProfile);
    });

    it('should return 404 when user profile not found', async () => {
      vi.mocked(userService.findById).mockResolvedValue(null);

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'GET',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('NOT_FOUND');
    });

    it('should return 401 when user not authenticated', async () => {
      // Mock unauthenticated user
      vi.mocked(
        require('@platform/database').createSupabaseServerClient
      ).mockReturnValue({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: new Error('Unauthorized'),
          }),
        },
      } as any);

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'GET',
        }
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should return 405 for invalid HTTP method', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('METHOD_NOT_ALLOWED');
    });
  });

  describe('PUT /api/user/profile', () => {
    const updateData = {
      firstName: 'Jane',
      lastName: 'Smith',
      bio: 'Updated bio',
      ministryRole: 'Youth Pastor',
    };

    it('should update user profile successfully', async () => {
      const updatedProfile = { ...mockUserProfile, ...updateData };
      vi.mocked(userService.update).mockResolvedValue(updatedProfile);
      vi.mocked(toUserProfileResponseDTO).mockReturnValue({
        ...mockUserProfileResponse,
        ...updateData,
      });

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'PUT',
          headers: {
            authorization: 'Bearer valid-token',
            'content-type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.firstName).toBe('Jane');
      expect(data.data.lastName).toBe('Smith');
      expect(data.data.bio).toBe('Updated bio');
      expect(data.data.ministryRole).toBe('Youth Pastor');

      expect(userService.update).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
        updateData,
        expect.objectContaining({
          userId: '123e4567-e89b-12d3-a456-426614174000',
          tenantId: expect.any(String),
        })
      );
    });

    it('should return 404 when user profile not found for update', async () => {
      vi.mocked(userService.update).mockResolvedValue(null);

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'PUT',
          headers: {
            authorization: 'Bearer valid-token',
            'content-type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('NOT_FOUND');
    });

    it('should return 400 for invalid input data', async () => {
      const invalidData = {
        firstName: '', // Invalid: empty string
        email: 'invalid-email', // Invalid: not an email format
      };

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'PUT',
          headers: {
            authorization: 'Bearer valid-token',
            'content-type': 'application/json',
          },
          body: JSON.stringify(invalidData),
        }
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.details).toBeDefined();
    });

    it('should return 401 when user not authenticated for update', async () => {
      // Mock unauthenticated user
      vi.mocked(
        require('@platform/database').createSupabaseServerClient
      ).mockReturnValue({
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: { user: null },
            error: new Error('Unauthorized'),
          }),
        },
      } as any);

      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should return 405 for invalid HTTP method', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/user/profile',
        {
          method: 'GET',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('METHOD_NOT_ALLOWED');
    });
  });
});
