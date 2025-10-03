// Assessment API Tests
// Tests for the assessment system endpoints

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createMocks } from 'node-mocks-http';
import {
  GET as getAssessments,
  POST as createAssessment,
} from '@/app/api/assessments/route';
import { GET as getAssessmentById } from '@/app/api/assessments/[id]/route';

describe('/api/assessments', () => {
  describe('GET /api/assessments', () => {
    it('should return active assessments', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          page: '1',
          limit: '10',
          status: 'active',
        },
      });

      await getAssessments(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data.items)).toBe(true);
    });

    it('should filter assessments by type', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          page: '1',
          limit: '10',
          assessmentType: 'apest',
        },
      });

      await getAssessments(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);

      // Check that all returned assessments are APEST type
      data.data.items.forEach((assessment: any) => {
        expect(assessment.assessmentType).toBe('apest');
      });
    });
  });

  describe('GET /api/assessments/[id]', () => {
    it('should return assessment with questions', async () => {
      // First, get the APEST assessment ID
      const { req: listReq, res: listRes } = createMocks({
        method: 'GET',
        query: {
          page: '1',
          limit: '10',
          assessmentType: 'apest',
        },
      });

      await getAssessments(listReq, listRes);
      const listData = JSON.parse(listRes._getData());

      if (listData.data.items.length > 0) {
        const assessmentId = listData.data.items[0].id;

        const { req, res } = createMocks({
          method: 'GET',
          query: { id: assessmentId },
        });

        await getAssessmentById(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(data.success).toBe(true);
        expect(data.data).toHaveProperty('id');
        expect(data.data).toHaveProperty('name');
        expect(data.data).toHaveProperty('questions');
        expect(Array.isArray(data.data.questions)).toBe(true);
        expect(data.data.questions.length).toBeGreaterThan(0);
      }
    });

    it('should return 404 for non-existent assessment', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: '00000000-0000-0000-0000-000000000000' },
      });

      await getAssessmentById(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });
});

// Integration test for the assessment flow
describe('Assessment Flow Integration', () => {
  it('should have APEST assessment with correct structure', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        page: '1',
        limit: '10',
        assessmentType: 'apest',
      },
    });

    await getAssessments(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());

    const apestAssessment = data.data.items.find(
      (a: any) => a.slug === 'apest-ministry-assessment'
    );
    expect(apestAssessment).toBeDefined();
    expect(apestAssessment.assessmentType).toBe('apest');
    expect(apestAssessment.status).toBe('active');
    expect(apestAssessment.questionsCount).toBe(25);
    expect(apestAssessment.researchBacked).toBe(true);
  });
});
