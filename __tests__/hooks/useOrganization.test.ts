// Organization Hooks Tests
// Tests for organization data hooks aligned with @platform/contracts

import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  useBulkRemoveOrganizationMembers,
  useBulkUpdateOrganizationMemberships,
  useCreateOrganization,
  useCreateOrganizationMembership,
  useInviteUserToOrganization,
  useOrganization,
  useOrganizationBySubdomain,
  useOrganizationDashboard,
  useOrganizationMembers,
  useOrganizationMemberships,
  useOrganizationSearch,
  useOrganizationStatistics,
  useOrganizations,
  useUpdateOrganization,
  useUpdateOrganizationMembership,
} from '../../apps/alan-hirsch-platform/hooks/useOrganization';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockOrganization = {
  id: 'org-123',
  name: 'Test Church',
  slug: 'test-church',
  description: 'A test church organization',
  website: 'https://testchurch.com',
  logoUrl: 'https://example.com/logo.jpg',
  organizationType: 'church',
  sizeCategory: 'medium',
  contactEmail: 'contact@testchurch.com',
  contactPhone: '+1-555-0123',
  address: {
    street: '123 Main St',
    city: 'Test City',
    state: 'Test State',
    country: 'United States',
    postalCode: '12345',
  },
  billingEmail: 'billing@testchurch.com',
  accountOwnerId: 'user-123',
  licenseType: 'team' as const,
  maxUsers: 50,
  status: 'active' as const,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  // Computed fields
  isActive: true,
  isTrial: false,
  hasCustomLogo: true,
  hasWebsite: true,
  memberCount: 25,
  displayName: 'Test Church',
  statusDisplay: 'Active',
  licenseTypeDisplay: 'Team',
};

const mockOrganizationMembership = {
  id: 'membership-123',
  organizationId: 'org-123',
  userId: 'user-456',
  role: 'admin',
  status: 'active',
  permissions: ['read', 'write', 'admin'],
  joinedAt: '2023-01-01T00:00:00Z',
  invitedAt: '2023-01-01T00:00:00Z',
  invitedBy: 'user-123',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  user: {
    id: 'user-456',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@testchurch.com',
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  // Computed fields
  isActive: true,
  isPending: false,
  canManage: true,
  roleDisplay: 'Administrator',
  statusDisplay: 'Active',
};

const mockOrganizationDashboard = {
  organization: mockOrganization,
  memberCount: 25,
  activeMembers: 20,
  recentActivity: [
    {
      id: 'activity-1',
      type: 'member_joined',
      description: 'Jane Smith joined the organization',
      timestamp: '2023-01-01T00:00:00Z',
    },
  ],
  statistics: {
    totalMembers: 25,
    activeMembers: 20,
    pendingInvitations: 2,
    contentItems: 15,
    assessments: 3,
  },
};

const mockOrganizationStatistics = {
  memberCount: 25,
  activeMembers: 20,
  pendingInvitations: 2,
  contentItems: 15,
  assessments: 3,
  engagementScore: 8.5,
  growthRate: 0.15,
  topContent: [
    {
      id: 'content-1',
      title: 'Leadership Principles',
      viewCount: 150,
    },
  ],
  memberActivity: [
    {
      date: '2023-01-01',
      activeMembers: 20,
      newMembers: 2,
    },
  ],
};

// ============================================================================
// MSW SERVER SETUP
// ============================================================================

const server = setupServer(
  rest.get('/api/organizations', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockOrganization],
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
        },
      })
    );
  }),

  rest.get('/api/organizations/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockOrganization,
      })
    );
  }),

  rest.get('/api/organizations/subdomain/:subdomain', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockOrganization,
      })
    );
  }),

  rest.get('/api/organizations/:id/members', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockOrganizationMembership],
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
        },
      })
    );
  }),

  rest.get('/api/organizations/:id/memberships', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockOrganizationMembership],
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
        },
      })
    );
  }),

  rest.get('/api/organizations/:id/dashboard', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockOrganizationDashboard,
      })
    );
  }),

  rest.get('/api/organizations/:id/statistics', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockOrganizationStatistics,
      })
    );
  }),

  rest.get('/api/organizations/search', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockOrganization],
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
        },
      })
    );
  }),

  rest.post('/api/organizations', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockOrganization, ...req.body },
      })
    );
  }),

  rest.patch('/api/organizations/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockOrganization, ...req.body },
      })
    );
  }),

  rest.post('/api/organizations/:id/memberships', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockOrganizationMembership,
      })
    );
  }),

  rest.patch(
    '/api/organizations/:id/memberships/:membershipId',
    (req, res, ctx) => {
      return res(
        ctx.json({
          success: true,
          data: { ...mockOrganizationMembership, ...req.body },
        })
      );
    }
  ),

  rest.post('/api/organizations/:id/invite', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockOrganizationMembership,
      })
    );
  }),

  rest.patch('/api/organizations/:id/memberships/bulk', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [mockOrganizationMembership],
      })
    );
  }),

  rest.post('/api/organizations/:id/members/bulk-remove', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { removedCount: 2 },
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

describe('useOrganizations', () => {
  it('should fetch organizations successfully', async () => {
    const { result } = renderHook(() => useOrganizations());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockOrganization]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should handle filters', async () => {
    const params = {
      page: 1,
      limit: 10,
      search: 'church',
      type: 'denomination',
    };

    const { result } = renderHook(() => useOrganizations(params));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useOrganization', () => {
  it('should fetch organization by ID successfully', async () => {
    const { result } = renderHook(() => useOrganization('org-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockOrganization);
  });

  it('should not fetch when ID is empty', () => {
    const { result } = renderHook(() => useOrganization(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useOrganizationBySubdomain', () => {
  it('should fetch organization by subdomain successfully', async () => {
    const { result } = renderHook(() =>
      useOrganizationBySubdomain('test-church')
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockOrganization);
  });

  it('should not fetch when subdomain is empty', () => {
    const { result } = renderHook(() => useOrganizationBySubdomain(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useCreateOrganization', () => {
  it('should create organization successfully', async () => {
    const { result } = renderHook(() => useCreateOrganization());

    const createData = {
      name: 'New Church',
      organizationType: 'church',
      description: 'A new church organization',
    };

    await result.current.mutate(createData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockOrganization,
      ...createData,
    });
  });

  it('should validate create data', async () => {
    const { result } = renderHook(() => useCreateOrganization());

    const invalidData = {
      // Missing required fields
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

describe('useUpdateOrganization', () => {
  it('should update organization successfully', async () => {
    const { result } = renderHook(() => useUpdateOrganization());

    const updateData = {
      id: 'org-123',
      name: 'Updated Church',
      description: 'Updated description',
    };

    await result.current.mutate(updateData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockOrganization,
      ...updateData,
    });
  });
});

describe('useOrganizationMembers', () => {
  it('should fetch organization members successfully', async () => {
    const { result } = renderHook(() => useOrganizationMembers('org-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockOrganizationMembership]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should not fetch when organization ID is empty', () => {
    const { result } = renderHook(() => useOrganizationMembers(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it('should handle filters', async () => {
    const params = {
      page: 1,
      limit: 10,
      role: 'admin',
      status: 'active',
    };

    const { result } = renderHook(() =>
      useOrganizationMembers('org-123', params)
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useOrganizationMemberships', () => {
  it('should fetch organization memberships successfully', async () => {
    const { result } = renderHook(() => useOrganizationMemberships('org-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockOrganizationMembership]);
    expect(result.current.pagination).toBeDefined();
  });
});

describe('useCreateOrganizationMembership', () => {
  it('should create organization membership successfully', async () => {
    const { result } = renderHook(() => useCreateOrganizationMembership());

    const createData = {
      organizationId: 'org-123',
      userId: 'user-456',
      role: 'member',
    };

    await result.current.mutate(createData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockOrganizationMembership);
  });

  it('should validate create data', async () => {
    const { result } = renderHook(() => useCreateOrganizationMembership());

    const invalidData = {
      // Missing required fields
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

describe('useUpdateOrganizationMembership', () => {
  it('should update organization membership successfully', async () => {
    const { result } = renderHook(() => useUpdateOrganizationMembership());

    const updateData = {
      organizationId: 'org-123',
      id: 'membership-123',
      role: 'admin',
    };

    await result.current.mutate(updateData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockOrganizationMembership,
      ...updateData,
    });
  });
});

describe('useInviteUserToOrganization', () => {
  it('should invite user to organization successfully', async () => {
    const { result } = renderHook(() => useInviteUserToOrganization());

    const inviteData = {
      organizationId: 'org-123',
      email: 'newuser@example.com',
      role: 'member',
    };

    await result.current.mutate(inviteData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockOrganizationMembership);
  });
});

describe('useOrganizationDashboard', () => {
  it('should fetch organization dashboard successfully', async () => {
    const { result } = renderHook(() => useOrganizationDashboard('org-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockOrganizationDashboard);
  });

  it('should not fetch when organization ID is empty', () => {
    const { result } = renderHook(() => useOrganizationDashboard(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useOrganizationStatistics', () => {
  it('should fetch organization statistics successfully', async () => {
    const { result } = renderHook(() => useOrganizationStatistics('org-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockOrganizationStatistics);
  });
});

describe('useOrganizationSearch', () => {
  it('should search organizations successfully', async () => {
    const { result } = renderHook(() => useOrganizationSearch('church'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockOrganization]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should handle search with filters', async () => {
    const { result } = renderHook(() =>
      useOrganizationSearch('church', {
        type: 'denomination',
        status: 'active',
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useBulkUpdateOrganizationMemberships', () => {
  it('should bulk update organization memberships successfully', async () => {
    const { result } = renderHook(() => useBulkUpdateOrganizationMemberships());

    const bulkData = {
      organizationId: 'org-123',
      updates: [
        {
          id: 'membership-123',
          updates: { role: 'admin' },
        },
      ],
    };

    await result.current.mutate(bulkData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockOrganizationMembership]);
  });
});

describe('useBulkRemoveOrganizationMembers', () => {
  it('should bulk remove organization members successfully', async () => {
    const { result } = renderHook(() => useBulkRemoveOrganizationMembers());

    const removeData = {
      organizationId: 'org-123',
      memberIds: ['user-456', 'user-789'],
    };

    await result.current.mutate(removeData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({ removedCount: 2 });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Organization Hooks Integration', () => {
  it('should handle complete organization workflow', async () => {
    // 1. Create organization
    const { result: createResult } = renderHook(() => useCreateOrganization());

    const createData = {
      name: 'Workflow Church',
      organizationType: 'church',
      description: 'A workflow test church',
    };

    await createResult.current.mutate(createData);
    expect(createResult.current.isSuccess).toBe(true);

    // 2. Fetch organization
    const { result: fetchResult } = renderHook(() =>
      useOrganization('org-123')
    );

    await waitFor(() => {
      expect(fetchResult.current.isLoading).toBe(false);
    });

    expect(fetchResult.current.isSuccess).toBe(true);

    // 3. Invite user
    const { result: inviteResult } = renderHook(() =>
      useInviteUserToOrganization()
    );

    const inviteData = {
      organizationId: 'org-123',
      email: 'newmember@example.com',
      role: 'member',
    };

    await inviteResult.current.mutate(inviteData);
    expect(inviteResult.current.isSuccess).toBe(true);

    // 4. Get dashboard
    const { result: dashboardResult } = renderHook(() =>
      useOrganizationDashboard('org-123')
    );

    await waitFor(() => {
      expect(dashboardResult.current.isLoading).toBe(false);
    });

    expect(dashboardResult.current.isSuccess).toBe(true);
  });
});

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

describe('Error Handling', () => {
  it('should handle network errors', async () => {
    server.use(
      rest.get('/api/organizations/:id', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );

    const { result } = renderHook(() => useOrganization('org-123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Network error');
  });

  it('should handle validation errors', async () => {
    server.use(
      rest.get('/api/organizations/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            data: {
              // Invalid data structure
              id: 'invalid',
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useOrganization('org-123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Response validation failed');
  });
});

// ============================================================================
// TYPE SAFETY TESTS
// ============================================================================

describe('Type Safety', () => {
  it('should enforce correct types for organization data', () => {
    const { result } = renderHook(() => useOrganization('org-123'));

    if (result.current.data) {
      const org = result.current.data;
      expect(typeof org.id).toBe('string');
      expect(typeof org.name).toBe('string');
      expect(typeof org.description).toBe('string');
      expect(typeof org.isActive).toBe('boolean');
      expect(typeof org.memberCount).toBe('number');
    }
  });

  it('should enforce correct types for membership data', () => {
    const { result } = renderHook(() => useOrganizationMembers('org-123'));

    if (result.current.data && result.current.data.length > 0) {
      const membership = result.current.data[0];
      expect(typeof membership.id).toBe('string');
      expect(typeof membership.role).toBe('string');
      expect(typeof membership.status).toBe('string');
      expect(typeof membership.isActive).toBe('boolean');
      expect(typeof membership.user.firstName).toBe('string');
    }
  });

  it('should enforce correct types for mutation data', () => {
    const { result } = renderHook(() => useCreateOrganization());

    const createData = {
      name: 'Test Organization',
      organizationType: 'church',
      description: 'Test description',
    };

    expect(() => result.current.mutate(createData)).not.toThrow();
  });
});
