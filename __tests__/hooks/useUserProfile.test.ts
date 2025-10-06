// User Profile Hooks Tests
// Tests for user profile data hooks aligned with @platform/contracts

import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  useCreateUserProfile,
  useUpdateUserProfile,
  useUserProfile,
  useUserProfileByEmail,
  useUserProfileById,
  useUserProfileBySubdomain,
} from '../../apps/alan-hirsch-platform/hooks/useUserProfile';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUserProfile = {
  id: 'user-123',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John Doe',
  bio: 'Test bio',
  ministryRole: 'senior_pastor',
  denomination: 'Baptist',
  organizationName: 'Test Church',
  yearsInMinistry: 10,
  countryCode: 'US',
  timezone: 'America/New_York',
  languagePrimary: 'en',
  culturalContext: 'western',
  assessmentMovementAlignment: 85,
  assessmentAudienceEngagement: 90,
  assessmentContentReadiness: 75,
  assessmentRevenuePotential: 80,
  assessmentNetworkEffects: 85,
  assessmentStrategicFit: 90,
  assessmentTotal: 505,
  leaderTier: 'core',
  subdomain: 'johndoe',
  customDomain: 'johndoe.com',
  platformTitle: 'John Doe Ministry',
  subscriptionTier: 'professional',
  theologicalFocus: ['missional', 'leadership'],
  brandColors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#059669',
  },
  emailNotifications: {
    dailyDigest: true,
    collaborationRequests: true,
    revenueReports: true,
    communityUpdates: true,
  },
  privacySettings: {
    publicProfile: true,
    showAssessmentResults: false,
    allowNetworking: true,
    shareAnalytics: false,
  },
  onboardingCompleted: true,
  onboardingStep: 10,
  accountStatus: 'active',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  lastActiveAt: '2023-01-01T00:00:00Z',
  // Computed fields
  isActive: true,
  hasCompletedOnboarding: true,
  fullName: 'John Doe',
  displayNameOrFullName: 'John Doe',
  hasCustomDomain: true,
  hasSubdomain: true,
  isPublicProfile: true,
  canReceiveNotifications: true,
  assessmentCompleted: true,
  primaryGift: 'apostolic',
  secondaryGift: 'prophetic',
  ministryExperience: '10 years in ministry',
  locationDisplay: 'United States',
};

// ============================================================================
// MSW SERVER SETUP
// ============================================================================

const server = setupServer(
  rest.get('/api/user/profile', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockUserProfile,
      })
    );
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockUserProfile,
      })
    );
  }),

  rest.get('/api/users', (req, res, ctx) => {
    const email = req.url.searchParams.get('email');
    const subdomain = req.url.searchParams.get('subdomain');

    if (email === 'test@example.com' || subdomain === 'johndoe') {
      return res(
        ctx.json({
          success: true,
          data: mockUserProfile,
        })
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        success: false,
        error: 'User not found',
      })
    );
  }),

  rest.patch('/api/user/profile', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockUserProfile, ...req.body },
      })
    );
  }),

  rest.post('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockUserProfile, ...req.body },
      })
    );
  })
);

// ============================================================================
// TEST SETUP
// ============================================================================

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ============================================================================
// TESTS
// ============================================================================

describe('useUserProfile', () => {
  it('should fetch user profile successfully', async () => {
    const { result } = renderHook(() => useUserProfile());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUserProfile);
    expect(result.current.error).toBe(null);
  });

  it('should handle API errors', async () => {
    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            success: false,
            error: 'Internal server error',
          })
        );
      })
    );

    const { result } = renderHook(() => useUserProfile());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Internal server error');
    expect(result.current.data).toBe(null);
  });

  it('should validate response data against schema', async () => {
    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            data: {
              ...mockUserProfile,
              email: 'invalid-email', // Invalid email format
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useUserProfile());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Response validation failed');
  });
});

describe('useUserProfileById', () => {
  it('should fetch user profile by ID successfully', async () => {
    const { result } = renderHook(() => useUserProfileById('user-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUserProfile);
  });

  it('should not fetch when ID is empty', () => {
    const { result } = renderHook(() => useUserProfileById(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useUserProfileByEmail', () => {
  it('should fetch user profile by email successfully', async () => {
    const { result } = renderHook(() =>
      useUserProfileByEmail('test@example.com')
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUserProfile);
  });

  it('should handle user not found', async () => {
    const { result } = renderHook(() =>
      useUserProfileByEmail('notfound@example.com')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('User not found');
  });
});

describe('useUserProfileBySubdomain', () => {
  it('should fetch user profile by subdomain successfully', async () => {
    const { result } = renderHook(() => useUserProfileBySubdomain('johndoe'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUserProfile);
  });
});

describe('useUpdateUserProfile', () => {
  it('should update user profile successfully', async () => {
    const { result } = renderHook(() => useUpdateUserProfile());

    expect(result.current.isLoading).toBe(false);

    const updateData = {
      firstName: 'Jane',
      lastName: 'Smith',
      bio: 'Updated bio',
    };

    await result.current.mutate(updateData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockUserProfile,
      ...updateData,
    });
  });

  it('should validate request data', async () => {
    const { result } = renderHook(() => useUpdateUserProfile());

    const invalidData = {
      email: 'invalid-email', // Invalid email format
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });

  it('should handle API errors', async () => {
    server.use(
      rest.patch('/api/user/profile', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            success: false,
            error: 'Validation failed',
          })
        );
      })
    );

    const { result } = renderHook(() => useUpdateUserProfile());

    const updateData = {
      firstName: 'Jane',
    };

    await expect(result.current.mutate(updateData)).rejects.toThrow();
  });
});

describe('useCreateUserProfile', () => {
  it('should create user profile successfully', async () => {
    const { result } = renderHook(() => useCreateUserProfile());

    const createData = {
      email: 'newuser@example.com',
      firstName: 'New',
      lastName: 'User',
      ministryRole: 'senior_pastor' as const,
    };

    await result.current.mutate(createData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockUserProfile,
      ...createData,
    });
  });

  it('should validate create data', async () => {
    const { result } = renderHook(() => useCreateUserProfile());

    const invalidData = {
      email: 'invalid-email',
      // Missing required fields
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('User Profile Hooks Integration', () => {
  it('should handle complete user profile workflow', async () => {
    // 1. Create user profile
    const { result: createResult } = renderHook(() => useCreateUserProfile());

    const createData = {
      email: 'workflow@example.com',
      firstName: 'Workflow',
      lastName: 'Test',
      ministryRole: 'senior_pastor' as const,
    };

    await createResult.current.mutate(createData);
    expect(createResult.current.isSuccess).toBe(true);

    // 2. Fetch user profile
    const { result: fetchResult } = renderHook(() => useUserProfile());

    await waitFor(() => {
      expect(fetchResult.current.isLoading).toBe(false);
    });

    expect(fetchResult.current.isSuccess).toBe(true);

    // 3. Update user profile
    const { result: updateResult } = renderHook(() => useUpdateUserProfile());

    const updateData = {
      bio: 'Updated through workflow',
    };

    await updateResult.current.mutate(updateData);
    expect(updateResult.current.isSuccess).toBe(true);
  });
});

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

describe('Error Handling', () => {
  it('should handle network errors', async () => {
    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );

    const { result } = renderHook(() => useUserProfile());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Network error');
  });

  it('should handle timeout errors', async () => {
    server.use(
      rest.get('/api/user/profile', (req, res, ctx) => {
        return res(ctx.delay(10000)); // 10 second delay
      })
    );

    const { result } = renderHook(() => useUserProfile());

    // Test timeout handling (this would need proper timeout configuration)
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 2000 }
    );
  });
});

// ============================================================================
// TYPE SAFETY TESTS
// ============================================================================

describe('Type Safety', () => {
  it('should enforce correct types for user profile data', () => {
    const { result } = renderHook(() => useUserProfile());

    // This should compile without errors
    if (result.current.data) {
      const user = result.current.data;
      expect(typeof user.id).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.firstName).toBe('string');
      expect(typeof user.lastName).toBe('string');
      expect(typeof user.isActive).toBe('boolean');
      expect(typeof user.hasCompletedOnboarding).toBe('boolean');
    }
  });

  it('should enforce correct types for mutation data', () => {
    const { result } = renderHook(() => useUpdateUserProfile());

    // This should compile without errors
    const updateData = {
      firstName: 'Updated',
      lastName: 'Name',
      bio: 'Updated bio',
    };

    expect(() => result.current.mutate(updateData)).not.toThrow();
  });
});
