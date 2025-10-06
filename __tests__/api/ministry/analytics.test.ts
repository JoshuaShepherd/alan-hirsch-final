/**
 * Ministry Analytics API Tests
 *
 * Tests for the ministry analytics endpoint that provides
 * organization-level analytics and insights.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockDatabase } from '../../utils/test-imports';

// Mock the database module
vi.mock('@platform/database/drizzle', () => ({
  db: createMockDatabase(),
}));

// Import the mocked database
import { db } from '@platform/database/drizzle';

// Mock the route handler
import { NextRequest } from 'next/server';
import { GET as getAnalytics } from '../../../apps/alan-hirsch-platform/app/api/ministry/analytics/route';

describe('/api/ministry/analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/ministry/analytics', () => {
    it('should return organization analytics for authenticated users', async () => {
      const mockAnalytics = {
        totalUsers: 150,
        activeUsers: 120,
        totalAssessments: 45,
        completedAssessments: 38,
        totalContent: 25,
        publishedContent: 20,
        engagementRate: 0.85,
        growthRate: 0.12,
        topContent: [
          {
            id: 'content-1',
            title: 'Leadership Principles',
            views: 1250,
            engagement: 0.92,
          },
        ],
        assessmentBreakdown: {
          apest: 15,
          spiritual_gifts: 12,
          personality: 11,
        },
        userGrowth: [
          { month: '2024-01', users: 100 },
          { month: '2024-02', users: 120 },
          { month: '2024-03', users: 150 },
        ],
      };

      // Mock database queries for analytics
      vi.mocked(db)
        .select.mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              count: vi.fn().mockResolvedValue([{ count: 150 }]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              count: vi.fn().mockResolvedValue([{ count: 120 }]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              count: vi.fn().mockResolvedValue([{ count: 45 }]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              count: vi.fn().mockResolvedValue([{ count: 38 }]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              count: vi.fn().mockResolvedValue([{ count: 25 }]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              count: vi.fn().mockResolvedValue([{ count: 20 }]),
            }),
          }),
        });

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/analytics'
      );
      const response = await getAnalytics(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('totalUsers');
      expect(data.data).toHaveProperty('activeUsers');
      expect(data.data).toHaveProperty('totalAssessments');
      expect(data.data).toHaveProperty('completedAssessments');
      expect(data.data).toHaveProperty('totalContent');
      expect(data.data).toHaveProperty('publishedContent');
      expect(data.data).toHaveProperty('engagementRate');
      expect(data.data).toHaveProperty('growthRate');
    });

    it('should return filtered analytics by date range', async () => {
      const startDate = '2024-01-01';
      const endDate = '2024-03-31';

      // Mock database queries with date filtering
      vi.mocked(db).select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            count: vi.fn().mockResolvedValue([{ count: 50 }]),
          }),
        }),
      });

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/analytics?startDate=${startDate}&endDate=${endDate}`
      );
      const response = await getAnalytics(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
    });

    it('should return analytics for specific organization', async () => {
      const organizationId = 'org-123';

      // Mock database queries with organization filtering
      vi.mocked(db).select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            count: vi.fn().mockResolvedValue([{ count: 25 }]),
          }),
        }),
      });

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/analytics?organizationId=${organizationId}`
      );
      const response = await getAnalytics(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
    });

    it('should handle analytics errors gracefully', async () => {
      // Mock database error
      vi.mocked(db).select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            count: vi.fn().mockRejectedValue(new Error('Database error')),
          }),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/analytics'
      );
      const response = await getAnalytics(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Database error');
    });
  });
});
