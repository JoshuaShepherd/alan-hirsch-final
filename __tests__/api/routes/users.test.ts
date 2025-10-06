// ============================================================================
// USERS ROUTES TEST SUITE
// ============================================================================
// Test suite for users API routes with ingress/egress validation

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  GET,
  POST,
} from '../../apps/alan-hirsch-platform/app/auth/api/users/route';
import { toUserProfileResponseDTO } from '../../apps/alan-hirsch-platform/lib/mappers/user';
import { userService } from '../../apps/alan-hirsch-platform/lib/services';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  ministryRole: 'Pastor',
  accountStatus: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
};

const mockUsers = [
  mockUser,
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    ministryRole: 'Youth Pastor',
    accountStatus: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  },
];

const mockUserResponse = {
  ...mockUser,
  isActive: true,
  hasCompletedOnboarding: false,
  fullName: 'John Doe',
  displayNameOrFullName: 'John Doe',
  hasCustomDomain: false,
  hasSubdomain: false,
  isPublicProfile: true,
  canReceiveNotifications: true,
  assessmentCompleted: false,
};

const mockUsersResponse = mockUsers.map(user => ({
  ...user,
  isActive: true,
  hasCompletedOnboarding: false,
  fullName: `${user.firstName} ${user.lastName}`,
  displayNameOrFullName: `${user.firstName} ${user.lastName}`,
  hasCustomDomain: false,
  hasSubdomain: false,
  isPublicProfile: true,
  canReceiveNotifications: true,
  assessmentCompleted: false,
}));

const mockPagination = {
  page: 1,
  limit: 10,
  total: 2,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
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
    findMany: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/user', () => ({
  toUserProfileResponseDTO: vi.fn(),
}));

// ============================================================================
// TEST SUITE
// ============================================================================

describe('Users Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(toUserProfileResponseDTO).mockImplementation(user => ({
      ...user,
      isActive: true,
      hasCompletedOnboarding: false,
      fullName: `${user.firstName} ${user.lastName}`,
      displayNameOrFullName: `${user.firstName} ${user.lastName}`,
      hasCustomDomain: false,
      hasSubdomain: false,
      isPublicProfile: true,
      canReceiveNotifications: true,
      assessmentCompleted: false,
    }));
  });

  describe('GET /api/users', () => {
    it('should return paginated list of users successfully', async () => {
      vi.mocked(userService.findMany).mockResolvedValue({
        data: mockUsers,
        pagination: mockPagination,
      });

      const request = new NextRequest(
        'http://localhost:3000/api/users?page=1&limit=10',
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
      expect(data.data).toHaveLength(2);
      expect(data.data[0].firstName).toBe('John');
      expect(data.data[1].firstName).toBe('Jane');
      expect(data.meta.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });

      expect(userService.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          limit: 10,
        }),
        expect.objectContaining({
          userId: '123e4567-e89b-12d3-a456-426614174000',
          tenantId: expect.any(String),
        })
      );
    });

    it('should handle search query parameter', async () => {
      vi.mocked(userService.findMany).mockResolvedValue({
        data: [mockUsers[0]],
        pagination: { ...mockPagination, total: 1 },
      });

      const request = new NextRequest(
        'http://localhost:3000/api/users?search=john',
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
      expect(data.data).toHaveLength(1);

      expect(userService.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'john',
        }),
        expect.any(Object)
      );
    });

    it('should validate pagination parameters', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/users?page=0&limit=200',
        {
          method: 'GET',
          headers: {
            authorization: 'Bearer valid-token',
          },
        }
      );

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
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

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'GET',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should return 405 for invalid HTTP method', async () => {
      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'PUT',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('METHOD_NOT_ALLOWED');
    });
  });

  describe('POST /api/users', () => {
    const createData = {
      firstName: 'New',
      lastName: 'User',
      email: 'new.user@example.com',
      ministryRole: 'Pastor',
    };

    it('should create user successfully', async () => {
      const createdUser = { ...mockUser, ...createData };
      vi.mocked(userService.create).mockResolvedValue(createdUser);

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify(createData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.firstName).toBe('New');
      expect(data.data.lastName).toBe('User');
      expect(data.data.email).toBe('new.user@example.com');

      expect(userService.create).toHaveBeenCalledWith(
        createData,
        expect.objectContaining({
          userId: '123e4567-e89b-12d3-a456-426614174000',
          tenantId: expect.any(String),
        })
      );
    });

    it('should return 400 for invalid input data', async () => {
      const invalidData = {
        firstName: '', // Invalid: empty string
        email: 'invalid-email', // Invalid: not an email format
      };

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid-token',
          'content-type': 'application/json',
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('VALIDATION_ERROR');
      expect(data.error.details).toBeDefined();
    });

    it('should return 401 when user not authenticated for creation', async () => {
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

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(createData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should return 405 for invalid HTTP method', async () => {
      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          authorization: 'Bearer valid-token',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error.code).toBe('METHOD_NOT_ALLOWED');
    });
  });
});
