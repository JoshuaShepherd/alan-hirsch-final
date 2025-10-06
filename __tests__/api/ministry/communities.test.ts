/**
 * Ministry Communities API Tests
 *
 * Tests for the ministry communities endpoint that provides
 * organization-level community management.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createMockDatabase,
  testDataFactories,
} from '../../utils/test-imports';

// Mock the database module
vi.mock('@platform/database/drizzle', () => ({
  db: createMockDatabase(),
}));

// Import the mocked database
import { db } from '@platform/database/drizzle';

// Mock the route handlers
import { NextRequest } from 'next/server';
import { POST as joinCommunity } from '../../../apps/alan-hirsch-platform/app/api/ministry/communities/[id]/join/route';
import { GET as getCommunityById } from '../../../apps/alan-hirsch-platform/app/api/ministry/communities/[id]/route';
import { GET as getCommunities } from '../../../apps/alan-hirsch-platform/app/api/ministry/communities/route';

describe('/api/ministry/communities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/ministry/communities', () => {
    it('should return organization communities with member statistics', async () => {
      const mockCommunities = [
        {
          ...testDataFactories.community({
            id: 'community-1',
            name: 'Leadership Development',
            visibility: 'public',
          }),
          memberStats: {
            totalMembers: 45,
            activeMembers: 38,
            newMembersThisMonth: 5,
            engagementRate: 0.72,
          },
        },
        {
          ...testDataFactories.community({
            id: 'community-2',
            name: 'Youth Ministry',
            visibility: 'private',
          }),
          memberStats: {
            totalMembers: 28,
            activeMembers: 22,
            newMembersThisMonth: 3,
            engagementRate: 0.68,
          },
        },
      ];

      const mockCount = [{ count: 2 }];

      // Mock the database chain for communities query
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(mockCommunities),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue(mockCount),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/communities?page=1&limit=10'
      );
      const response = await getCommunities(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.items.data)).toBe(true);
      expect(data.items.data[0]).toHaveProperty('memberStats');
      expect(data.items.data[0].memberStats).toHaveProperty('totalMembers');
      expect(data.items.data[0].memberStats).toHaveProperty('activeMembers');
      expect(data.items.data[0].memberStats).toHaveProperty('engagementRate');
    });

    it('should filter communities by visibility', async () => {
      const mockCommunities = [
        testDataFactories.community({
          id: 'community-1',
          visibility: 'public',
        }),
      ];

      const mockCount = [{ count: 1 }];

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(mockCommunities),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue(mockCount),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/communities?visibility=public'
      );
      const response = await getCommunities(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.items.data[0].visibility).toBe('public');
    });

    it('should return communities with activity metrics', async () => {
      const mockCommunities = [
        {
          ...testDataFactories.community({
            id: 'community-1',
            name: 'Leadership Development',
          }),
          activityMetrics: {
            postsThisWeek: 12,
            commentsThisWeek: 45,
            activeDiscussions: 8,
            averageResponseTime: 2.5, // hours
            topContributors: [
              {
                userId: 'user-1',
                name: 'John Doe',
                contributions: 15,
              },
              {
                userId: 'user-2',
                name: 'Jane Smith',
                contributions: 12,
              },
            ],
          },
        },
      ];

      const mockCount = [{ count: 1 }];

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(mockCommunities),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue(mockCount),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/communities?includeActivity=true'
      );
      const response = await getCommunities(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.items.data[0]).toHaveProperty('activityMetrics');
      expect(data.items.data[0].activityMetrics).toHaveProperty(
        'postsThisWeek'
      );
      expect(data.items.data[0].activityMetrics).toHaveProperty(
        'topContributors'
      );
    });
  });

  describe('GET /api/ministry/communities/[id]', () => {
    it('should return detailed community with member list', async () => {
      const communityId = 'community-123';
      const mockCommunity = {
        ...testDataFactories.community({
          id: communityId,
          name: 'Leadership Development',
        }),
        members: [
          {
            userId: 'user-1',
            name: 'John Doe',
            role: 'member',
            joinedAt: '2024-01-01T00:00:00Z',
            lastActive: '2024-01-15T10:30:00Z',
            contributions: 15,
          },
          {
            userId: 'user-2',
            name: 'Jane Smith',
            role: 'moderator',
            joinedAt: '2024-01-02T00:00:00Z',
            lastActive: '2024-01-14T14:20:00Z',
            contributions: 25,
          },
        ],
        recentActivity: [
          {
            type: 'post',
            userId: 'user-1',
            content: 'Great discussion on leadership principles',
            createdAt: '2024-01-15T10:30:00Z',
          },
          {
            type: 'comment',
            userId: 'user-2',
            content: 'I agree with your points',
            createdAt: '2024-01-15T09:15:00Z',
          },
        ],
      };

      // Mock the database chain for community
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([mockCommunity]),
      }));

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/communities/${communityId}`
      );
      const response = await getCommunityById(request, {
        params: Promise.resolve({ id: communityId }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('members');
      expect(data).toHaveProperty('recentActivity');
      expect(Array.isArray(data.members)).toBe(true);
      expect(Array.isArray(data.recentActivity)).toBe(true);
    });

    it('should return 404 for non-existent community', async () => {
      const communityId = 'non-existent';

      // Mock empty community result
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
      }));

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/communities/${communityId}`
      );
      const response = await getCommunityById(request, {
        params: Promise.resolve({ id: communityId }),
      });

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/ministry/communities/[id]/join', () => {
    it('should allow users to join public communities', async () => {
      const communityId = 'community-123';
      const mockMembership = {
        id: 'membership-123',
        userId: 'user-123',
        communityId,
        role: 'member',
        status: 'active',
        joinedAt: new Date().toISOString(),
      };

      // Mock the database chain for membership creation
      vi.mocked(db).insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockMembership]),
        }),
      });

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/communities/${communityId}/join`,
        {
          method: 'POST',
          body: JSON.stringify({}),
        }
      );
      const response = await joinCommunity(request, {
        params: Promise.resolve({ id: communityId }),
      });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('id');
      expect(data.data).toHaveProperty('role', 'member');
      expect(data.data).toHaveProperty('status', 'active');
    });

    it('should handle joining private communities with approval', async () => {
      const communityId = 'private-community-123';
      const mockMembership = {
        id: 'membership-123',
        userId: 'user-123',
        communityId,
        role: 'member',
        status: 'pending',
        joinedAt: new Date().toISOString(),
      };

      // Mock the database chain for membership creation
      vi.mocked(db).insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockMembership]),
        }),
      });

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/communities/${communityId}/join`,
        {
          method: 'POST',
          body: JSON.stringify({}),
        }
      );
      const response = await joinCommunity(request, {
        params: Promise.resolve({ id: communityId }),
      });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('status', 'pending');
    });

    it('should prevent duplicate memberships', async () => {
      const communityId = 'community-123';

      // Mock existing membership check
      vi.mocked(db).select.mockReturnValueOnce({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([
          {
            id: 'existing-membership',
            userId: 'user-123',
            communityId,
            status: 'active',
          },
        ]),
      });

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/communities/${communityId}/join`,
        {
          method: 'POST',
          body: JSON.stringify({}),
        }
      );
      const response = await joinCommunity(request, {
        params: Promise.resolve({ id: communityId }),
      });
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.success).toBe(false);
      expect(data.error).toContain('already a member');
    });
  });
});
