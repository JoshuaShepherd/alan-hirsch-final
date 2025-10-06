// ============================================================================
// USER API ROUTES TESTS
// ============================================================================
// Comprehensive tests for user API endpoints with alignment validation

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DELETE as UserDELETE,
  GET as UserGET,
  PUT as UserPUT,
} from '../apps/alan-hirsch-platform/app/auth/api/users/[id]/route';
import {
  GET as UsersGET,
  POST as UsersPOST,
} from '../apps/alan-hirsch-platform/app/auth/api/users/route';
import { userService } from '../apps/alan-hirsch-platform/lib/services';

// ============================================================================
// MOCK SETUP
// ============================================================================

vi.mock('../apps/alan-hirsch-platform/lib/services', () => ({
  userService: {
    findMany: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockUserService = vi.mocked(userService);

// ============================================================================
// TEST DATA
// ============================================================================

const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John D',
  bio: 'Test user bio',
  avatarUrl: 'https://example.com/avatar.jpg',
  ministryRole: 'senior_pastor',
  denomination: 'Baptist',
  organizationName: 'Test Church',
  yearsInMinistry: 10,
  countryCode: 'US',
  timezone: 'America/New_York',
  culturalContext: 'western',
  leaderTier: 'core',
  subdomain: 'johndoe',
  customDomain: null,
  platformTitle: 'Pastor John',
  languagePrimary: 'en',
  subscriptionTier: 'free',
  theologicalFocus: ['reformed', 'evangelical'],
  brandColors: {
    accent: '#059669',
    primary: '#2563eb',
    secondary: '#64748b',
  },
  emailNotifications: {
    dailyDigest: true,
    revenueReports: true,
    communityUpdates: true,
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
  assessmentTotal: 450,
  assessmentMovementAlignment: 85,
  assessmentAudienceEngagement: 75,
  assessmentContentReadiness: 90,
  assessmentRevenuePotential: 60,
  assessmentNetworkEffects: 80,
  assessmentStrategicFit: 70,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-02T00:00:00Z'),
  lastActiveAt: new Date('2024-01-02T12:00:00Z'),
};

const mockPaginatedResult = {
  data: [mockUser],
  pagination: {
    page: 1,
    limit: 20,
    total: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
};

// ============================================================================
// GET /api/users TESTS
// ============================================================================

describe('GET /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return paginated users with proper validation', async () => {
    // Arrange
    mockUserService.findMany.mockResolvedValue(mockPaginatedResult);

    const request = new NextRequest(
      'http://localhost:3000/api/users?page=1&limit=20',
      {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'read,write',
        },
      }
    );

    // Act
    const response = await UsersGET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(1);
    expect(data.data[0]).toMatchObject({
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      // Computed fields
      isActive: true,
      hasCompletedOnboarding: true,
      fullName: 'John Doe',
      displayNameOrFullName: 'John D',
      hasCustomDomain: false,
      hasSubdomain: true,
      isPublicProfile: true,
      canReceiveNotifications: true,
      assessmentCompleted: true,
      primaryGift: 'teaching', // Highest score
      secondaryGift: 'apostolic', // Second highest score
      ministryExperience: '10 years in ministry',
      locationDisplay: 'US (America/New_York)',
    });
    expect(data.meta.pagination).toMatchObject({
      page: 1,
      limit: 20,
      total: 1,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    });
    expect(data.meta.timestamp).toBeDefined();

    // Verify service was called with validated input
    expect(mockUserService.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 20,
      }),
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read', 'write'],
      })
    );
  });

  it('should reject invalid query parameters', async () => {
    // Arrange
    const request = new NextRequest(
      'http://localhost:3000/api/users?page=invalid&limit=999',
      {
        method: 'GET',
      }
    );

    // Act
    const response = await UsersGET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(mockUserService.findMany).not.toHaveBeenCalled();
  });

  it('should handle service errors gracefully', async () => {
    // Arrange
    mockUserService.findMany.mockRejectedValue(new Error('Database error'));

    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'x-tenant-id': 'test-tenant',
      },
    });

    // Act
    const response = await UsersGET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(500);
    expect(data.error).toContain('Internal server error');
    expect(data.code).toBe('INTERNAL_ERROR');
  });
});

// ============================================================================
// POST /api/users TESTS
// ============================================================================

describe('POST /api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create user with proper validation', async () => {
    // Arrange
    mockUserService.create.mockResolvedValue(mockUser);

    const createData = {
      email: 'newuser@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      ministryRole: 'associate_pastor',
    };

    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': 'test-tenant',
        'x-user-id': 'user-123',
        'x-user-role': 'admin',
        'x-permissions': 'read,write',
      },
      body: JSON.stringify(createData),
    });

    // Act
    const response = await UsersPOST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      ministryRole: mockUser.ministryRole,
      // Computed fields should be present
      isActive: true,
      hasCompletedOnboarding: true,
      fullName: 'John Doe',
      primaryGift: 'teaching',
      secondaryGift: 'apostolic',
    });

    // Verify service was called with validated input
    expect(mockUserService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        ministryRole: 'associate_pastor',
      }),
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read', 'write'],
      })
    );
  });

  it('should reject invalid request body', async () => {
    // Arrange
    const invalidData = {
      email: 'invalid-email',
      firstName: '',
      ministryRole: 'invalid_role',
    };

    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    });

    // Act
    const response = await UsersPOST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(data.details).toBeDefined();
    expect(mockUserService.create).not.toHaveBeenCalled();
  });

  it('should handle malformed JSON', async () => {
    // Arrange
    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    });

    // Act
    const response = await UsersPOST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(mockUserService.create).not.toHaveBeenCalled();
  });
});

// ============================================================================
// GET /api/users/[id] TESTS
// ============================================================================

describe('GET /api/users/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user by ID with proper validation', async () => {
    // Arrange
    mockUserService.findById.mockResolvedValue(mockUser);

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'read',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserGET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      // Computed fields
      isActive: true,
      hasCompletedOnboarding: true,
      fullName: 'John Doe',
      displayNameOrFullName: 'John D',
      primaryGift: 'teaching',
      secondaryGift: 'apostolic',
      ministryExperience: '10 years in ministry',
      locationDisplay: 'US (America/New_York)',
    });

    // Verify service was called with validated input
    expect(mockUserService.findById).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read'],
      })
    );
  });

  it('should reject invalid UUID format', async () => {
    // Arrange
    const request = new NextRequest(
      'http://localhost:3000/api/users/invalid-id',
      {
        method: 'GET',
      }
    );

    const params = { id: 'invalid-id' };

    // Act
    const response = await UserGET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Invalid user ID format');
    expect(mockUserService.findById).not.toHaveBeenCalled();
  });

  it('should return 404 when user not found', async () => {
    // Arrange
    mockUserService.findById.mockResolvedValue(null);

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserGET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(404);
    expect(data.error).toContain('User not found');
    expect(data.code).toBe('NOT_FOUND');
  });
});

// ============================================================================
// PUT /api/users/[id] TESTS
// ============================================================================

describe('PUT /api/users/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update user with proper validation', async () => {
    // Arrange
    const updatedUser = { ...mockUser, firstName: 'Updated John' };
    mockUserService.update.mockResolvedValue(updatedUser);

    const updateData = {
      firstName: 'Updated John',
      bio: 'Updated bio',
    };

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'read,write',
        },
        body: JSON.stringify(updateData),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserPUT(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.firstName).toBe('Updated John');
    expect(data.data.bio).toBe('Updated bio');

    // Verify service was called with validated input
    expect(mockUserService.update).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        firstName: 'Updated John',
        bio: 'Updated bio',
      }),
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read', 'write'],
      })
    );
  });

  it('should reject invalid update data', async () => {
    // Arrange
    const invalidData = {
      email: 'invalid-email',
      firstName: '', // Empty string should be rejected
    };

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidData),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserPUT(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(mockUserService.update).not.toHaveBeenCalled();
  });
});

// ============================================================================
// DELETE /api/users/[id] TESTS
// ============================================================================

describe('DELETE /api/users/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete user with proper validation', async () => {
    // Arrange
    mockUserService.delete.mockResolvedValue(true);

    const deleteData = {
      confirmation: 'DELETE',
    };

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'admin',
        },
        body: JSON.stringify(deleteData),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserDELETE(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      deleted: true,
      id: '123e4567-e89b-12d3-a456-426614174000',
    });

    // Verify service was called with validated input
    expect(mockUserService.delete).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['admin'],
      })
    );
  });

  it('should reject deletion without confirmation', async () => {
    // Arrange
    const invalidData = {
      confirmation: 'NO', // Wrong confirmation
    };

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidData),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserDELETE(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(mockUserService.delete).not.toHaveBeenCalled();
  });

  it('should return 404 when user not found for deletion', async () => {
    // Arrange
    mockUserService.delete.mockResolvedValue(false);

    const request = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmation: 'DELETE' }),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await UserDELETE(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(404);
    expect(data.error).toContain('User not found');
    expect(data.code).toBe('NOT_FOUND');
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('User API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle complete user lifecycle', async () => {
    // 1. Create user
    mockUserService.create.mockResolvedValue(mockUser);

    const createRequest = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      }),
    });

    const createResponse = await UsersPOST(createRequest);
    expect(createResponse.status).toBe(201);

    // 2. Get user
    mockUserService.findById.mockResolvedValue(mockUser);

    const getRequest = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'GET',
      }
    );

    const getResponse = await UserGET(getRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(getResponse.status).toBe(200);

    // 3. Update user
    const updatedUser = { ...mockUser, bio: 'Updated bio' };
    mockUserService.update.mockResolvedValue(updatedUser);

    const updateRequest = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: 'Updated bio' }),
      }
    );

    const updateResponse = await UserPUT(updateRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(updateResponse.status).toBe(200);

    // 4. Delete user
    mockUserService.delete.mockResolvedValue(true);

    const deleteRequest = new NextRequest(
      'http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'DELETE' }),
      }
    );

    const deleteResponse = await UserDELETE(deleteRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(deleteResponse.status).toBe(200);

    // Verify all service methods were called
    expect(mockUserService.create).toHaveBeenCalledTimes(1);
    expect(mockUserService.findById).toHaveBeenCalledTimes(1);
    expect(mockUserService.update).toHaveBeenCalledTimes(1);
    expect(mockUserService.delete).toHaveBeenCalledTimes(1);
  });
});
