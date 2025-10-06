// ============================================================================
// USERS LIST HOOKS TESTS
// ============================================================================
// Tests for user list and management hooks

import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  useDeactivateUser,
  useDeleteUser,
  useUsers,
} from '../../apps/alan-hirsch-platform/hooks/useUserProfile';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUsersList = {
  data: [
    {
      id: 'user-1',
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      ministryRole: 'senior_pastor',
      accountStatus: 'active',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      lastActiveAt: '2023-01-01T00:00:00Z',
      // Computed fields
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
    {
      id: 'user-2',
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      ministryRole: 'associate_pastor',
      accountStatus: 'active',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
      lastActiveAt: '2023-01-02T00:00:00Z',
      // Computed fields
      isActive: true,
      hasCompletedOnboarding: true,
      fullName: 'Jane Smith',
      displayNameOrFullName: 'Jane Smith',
      hasCustomDomain: false,
      hasSubdomain: false,
      isPublicProfile: true,
      canReceiveNotifications: true,
      assessmentCompleted: false,
    },
  ],
  meta: {
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    },
  },
};

// ============================================================================
// MSW SERVER SETUP
// ============================================================================

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const limit = req.url.searchParams.get('limit');
    const search = req.url.searchParams.get('search');
    const ministryRole = req.url.searchParams.get('ministryRole');

    // Simulate filtering
    let filteredUsers = mockUsersList.data;
    if (search) {
      filteredUsers = filteredUsers.filter(
        user =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (ministryRole) {
      filteredUsers = filteredUsers.filter(
        user => user.ministryRole === ministryRole
      );
    }

    return res(
      ctx.json({
        success: true,
        data: filteredUsers,
        meta: {
          pagination: {
            page: parseInt(page || '1'),
            limit: parseInt(limit || '10'),
            total: filteredUsers.length,
            total_pages: Math.ceil(
              filteredUsers.length / parseInt(limit || '10')
            ),
            has_next: false,
            has_prev: false,
          },
        },
      })
    );
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === 'user-1' || id === 'user-2') {
      return res(
        ctx.json({
          success: true,
          data: { success: true },
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

  rest.patch('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === 'user-1' || id === 'user-2') {
      return res(
        ctx.json({
          success: true,
          data: {
            ...mockUsersList.data.find(u => u.id === id),
            accountStatus: 'inactive',
          },
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
  })
);

// ============================================================================
// TEST SETUP
// ============================================================================

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

// ============================================================================
// TESTS
// ============================================================================

describe('useUsers', () => {
  it('should fetch users list successfully', async () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUsersList.data);
    expect(result.current.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    });
    expect(result.current.error).toBe(null);
  });

  it('should fetch users with pagination parameters', async () => {
    const { result } = renderHook(() => useUsers({ page: 2, limit: 5 }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pagination?.page).toBe(2);
    expect(result.current.pagination?.limit).toBe(5);
  });

  it('should fetch users with search filter', async () => {
    const { result } = renderHook(() => useUsers({ search: 'John' }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].firstName).toBe('John');
  });

  it('should fetch users with ministry role filter', async () => {
    const { result } = renderHook(() =>
      useUsers({ ministryRole: 'senior_pastor' })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].ministryRole).toBe('senior_pastor');
  });

  it('should handle API errors', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            success: false,
            error: 'Internal server error',
          })
        );
      })
    );

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Internal server error');
    expect(result.current.data).toBe(null);
  });

  it('should validate response data against schema', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            data: [
              {
                ...mockUsersList.data[0],
                email: 'invalid-email', // Invalid email format
              },
            ],
            meta: {
              pagination: {
                page: 1,
                limit: 10,
                total: 1,
                total_pages: 1,
                has_next: false,
                has_prev: false,
              },
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Response validation failed');
  });
});

describe('useDeleteUser', () => {
  it('should delete user successfully', async () => {
    const { result } = renderHook(() => useDeleteUser());

    expect(result.current.isLoading).toBe(false);

    await result.current.mutate('user-1');

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({ success: true });
    expect(result.current.error).toBe(null);
  });

  it('should handle delete user not found', async () => {
    const { result } = renderHook(() => useDeleteUser());

    await expect(result.current.mutate('non-existent-user')).rejects.toThrow();
  });

  it('should handle API errors', async () => {
    server.use(
      rest.delete('/api/users/:id', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            success: false,
            error: 'Internal server error',
          })
        );
      })
    );

    const { result } = renderHook(() => useDeleteUser());

    await expect(result.current.mutate('user-1')).rejects.toThrow();
  });
});

describe('useDeactivateUser', () => {
  it('should deactivate user successfully', async () => {
    const { result } = renderHook(() => useDeactivateUser());

    expect(result.current.isLoading).toBe(false);

    await result.current.mutate('user-1');

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.accountStatus).toBe('inactive');
    expect(result.current.error).toBe(null);
  });

  it('should handle deactivate user not found', async () => {
    const { result } = renderHook(() => useDeactivateUser());

    await expect(result.current.mutate('non-existent-user')).rejects.toThrow();
  });

  it('should handle API errors', async () => {
    server.use(
      rest.patch('/api/users/:id', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            success: false,
            error: 'Internal server error',
          })
        );
      })
    );

    const { result } = renderHook(() => useDeactivateUser());

    await expect(result.current.mutate('user-1')).rejects.toThrow();
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Users Management Integration', () => {
  it('should handle complete user management workflow', async () => {
    // 1. Fetch users list
    const { result: listResult } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(listResult.current.isLoading).toBe(false);
    });

    expect(listResult.current.isSuccess).toBe(true);
    expect(listResult.current.data).toHaveLength(2);

    // 2. Deactivate a user
    const { result: deactivateResult } = renderHook(() => useDeactivateUser());

    await deactivateResult.current.mutate('user-1');
    expect(deactivateResult.current.isSuccess).toBe(true);

    // 3. Delete a user
    const { result: deleteResult } = renderHook(() => useDeleteUser());

    await deleteResult.current.mutate('user-2');
    expect(deleteResult.current.isSuccess).toBe(true);
  });
});

// ============================================================================
// TYPE SAFETY TESTS
// ============================================================================

describe('Type Safety', () => {
  it('should enforce correct types for users list data', () => {
    const { result } = renderHook(() => useUsers());

    // This should compile without errors
    if (result.current.data) {
      const users = result.current.data;
      expect(Array.isArray(users)).toBe(true);

      if (users.length > 0) {
        const user = users[0];
        expect(typeof user.id).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.firstName).toBe('string');
        expect(typeof user.lastName).toBe('string');
        expect(typeof user.isActive).toBe('boolean');
        expect(typeof user.hasCompletedOnboarding).toBe('boolean');
      }
    }
  });

  it('should enforce correct types for pagination data', () => {
    const { result } = renderHook(() => useUsers());

    if (result.current.pagination) {
      const pagination = result.current.pagination;
      expect(typeof pagination.page).toBe('number');
      expect(typeof pagination.limit).toBe('number');
      expect(typeof pagination.total).toBe('number');
      expect(typeof pagination.totalPages).toBe('number');
      expect(typeof pagination.hasNext).toBe('boolean');
      expect(typeof pagination.hasPrev).toBe('boolean');
    }
  });
});
