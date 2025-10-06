/**
 * Ministry Assessments API Tests
 *
 * Tests for the ministry assessments endpoint that provides
 * organization-level assessment management.
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
import { GET as getAssessmentById } from '../../../apps/alan-hirsch-platform/app/api/ministry/assessments/[id]/route';
import { GET as getAssessments } from '../../../apps/alan-hirsch-platform/app/api/ministry/assessments/route';

describe('/api/ministry/assessments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/ministry/assessments', () => {
    it('should return organization assessments with usage statistics', async () => {
      const mockAssessments = [
        {
          ...testDataFactories.assessment({
            id: 'assessment-1',
            name: 'APEST Ministry Assessment',
            assessmentType: 'apest',
            status: 'active',
          }),
          usageStats: {
            totalCompletions: 45,
            completionRate: 0.85,
            averageScore: 78.5,
            lastCompleted: '2024-01-15T10:30:00Z',
          },
        },
        {
          ...testDataFactories.assessment({
            id: 'assessment-2',
            name: 'Spiritual Gifts Assessment',
            assessmentType: 'spiritual_gifts',
            status: 'active',
          }),
          usageStats: {
            totalCompletions: 32,
            completionRate: 0.72,
            averageScore: 82.1,
            lastCompleted: '2024-01-14T14:20:00Z',
          },
        },
      ];

      const mockCount = [{ count: 2 }];

      // Mock the database chain for assessments query
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(mockAssessments),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue(mockCount),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/assessments?page=1&limit=10'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.items.data)).toBe(true);
      expect(data.items.data[0]).toHaveProperty('usageStats');
      expect(data.items.data[0].usageStats).toHaveProperty('totalCompletions');
      expect(data.items.data[0].usageStats).toHaveProperty('completionRate');
      expect(data.items.data[0].usageStats).toHaveProperty('averageScore');
    });

    it('should filter assessments by type', async () => {
      const mockAssessments = [
        testDataFactories.assessment({
          id: 'assessment-1',
          assessmentType: 'apest',
          status: 'active',
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
          offset: vi.fn().mockResolvedValue(mockAssessments),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue(mockCount),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/assessments?assessmentType=apest'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.items.data[0].assessmentType).toBe('apest');
    });

    it('should return assessment performance metrics', async () => {
      const mockAssessments = [
        {
          ...testDataFactories.assessment({
            id: 'assessment-1',
            name: 'APEST Ministry Assessment',
          }),
          performanceMetrics: {
            completionRate: 0.85,
            averageTimeMinutes: 25.5,
            dropOffRate: 0.15,
            retakeRate: 0.08,
            satisfactionScore: 4.2,
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
          offset: vi.fn().mockResolvedValue(mockAssessments),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue(mockCount),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/ministry/assessments?includeMetrics=true'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.items.data[0]).toHaveProperty('performanceMetrics');
      expect(data.items.data[0].performanceMetrics).toHaveProperty(
        'completionRate'
      );
      expect(data.items.data[0].performanceMetrics).toHaveProperty(
        'averageTimeMinutes'
      );
    });
  });

  describe('GET /api/ministry/assessments/[id]', () => {
    it('should return detailed assessment with organization usage', async () => {
      const assessmentId = 'assessment-123';
      const mockAssessment = {
        ...testDataFactories.assessment({
          id: assessmentId,
          name: 'APEST Ministry Assessment',
        }),
        organizationUsage: {
          totalCompletions: 45,
          uniqueUsers: 38,
          completionRate: 0.84,
          averageScore: 78.5,
          scoreDistribution: {
            '0-20': 2,
            '21-40': 5,
            '41-60': 8,
            '61-80': 15,
            '81-100': 10,
          },
          recentCompletions: [
            {
              userId: 'user-1',
              completedAt: '2024-01-15T10:30:00Z',
              score: 85,
            },
            {
              userId: 'user-2',
              completedAt: '2024-01-14T14:20:00Z',
              score: 72,
            },
          ],
        },
      };

      // Mock the database chain for assessment
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([mockAssessment]),
      }));

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/assessments/${assessmentId}`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: assessmentId }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('organizationUsage');
      expect(data.organizationUsage).toHaveProperty('totalCompletions');
      expect(data.organizationUsage).toHaveProperty('scoreDistribution');
      expect(data.organizationUsage).toHaveProperty('recentCompletions');
    });

    it('should return 404 for non-existent assessment', async () => {
      const assessmentId = 'non-existent';

      // Mock empty assessment result
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
      }));

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/assessments/${assessmentId}`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: assessmentId }),
      });

      expect(response.status).toBe(404);
    });

    it('should include assessment questions with usage statistics', async () => {
      const assessmentId = 'assessment-123';
      const mockAssessment = {
        ...testDataFactories.assessment({
          id: assessmentId,
        }),
        questions: [
          {
            ...testDataFactories.assessmentQuestion({
              id: 'q1',
              assessmentId,
              questionText: 'Test question 1',
            }),
            usageStats: {
              responseCount: 45,
              averageResponseTime: 12.5,
              skipRate: 0.02,
              mostCommonResponse: 'Agree',
            },
          },
        ],
      };

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([mockAssessment]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue(mockAssessment.questions),
        }));

      const request = new NextRequest(
        `http://localhost:3000/api/ministry/assessments/${assessmentId}?includeQuestions=true`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: assessmentId }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('questions');
      expect(Array.isArray(data.questions)).toBe(true);
      expect(data.questions[0]).toHaveProperty('usageStats');
    });
  });
});
