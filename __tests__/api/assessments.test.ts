import { createMockDatabase, testDataFactories } from '@/lib/mocks';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the database module
vi.mock('@/lib/db/drizzle', () => ({
  db: createMockDatabase(),
}));

// Import the mocked database
import { db } from '@/lib/db/drizzle';

// Mock the mappers
vi.mock('@/lib/mappers/assessments', () => ({
  toAssessmentResponseDTO: vi.fn(assessment => ({
    id: assessment.id,
    name: assessment.name,
    slug: assessment.slug,
    description: assessment.description,
    assessmentType: assessment.assessmentType,
    status: assessment.status,
    questionsCount: assessment.questionsCount,
    researchBacked: assessment.researchBacked,
    createdAt: assessment.createdAt,
    updatedAt: assessment.updatedAt,
  })),
  toAssessmentWithQuestionsResponseDTO: vi.fn((assessment, questions) => ({
    id: assessment.id,
    name: assessment.name,
    slug: assessment.slug,
    description: assessment.description,
    assessmentType: assessment.assessmentType,
    status: assessment.status,
    questionsCount: assessment.questionsCount,
    researchBacked: assessment.researchBacked,
    questions: questions.map((q: any) => ({
      id: q.id,
      questionText: q.questionText,
      orderIndex: q.orderIndex,
      questionType: q.questionType,
    })),
    createdAt: assessment.createdAt,
    updatedAt: assessment.updatedAt,
  })),
}));

// Mock the contracts
vi.mock('@/lib/contracts', () => ({
  createAssessmentRequestSchema: {
    parse: vi.fn(data => data),
  },
  assessmentListResponseSchema: {
    parse: vi.fn(data => data),
  },
  assessmentResponseDTOSchema: {
    parse: vi.fn(data => data),
  },
  assessmentWithQuestionsResponseSchema: {
    parse: vi.fn(data => data),
  },
}));

// Import the route handlers after mocking
import { GET as getAssessmentById } from '@/app/api/assessments/[id]/route';
import { GET as getAssessments } from '@/app/api/assessments/route';
import { NextRequest } from 'next/server';

describe('/api/assessments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/assessments', () => {
    it('should return active assessments', async () => {
      // Use contract-compliant test data
      const mockAssessments = [
        testDataFactories.assessment({
          id: 'test-assessment-1',
          name: 'APEST Ministry Assessment',
          slug: 'apest-ministry-assessment',
          description: 'Test assessment',
          assessmentType: 'apest',
          status: 'active',
          questionsCount: 25,
          researchBacked: true,
        }),
      ];

      const mockCount = [{ count: 1 }];

      // Mock the database chain for assessments query
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        offset: vi.fn().mockResolvedValue(mockAssessments),
      }));

      // Mock the database chain for count query
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockResolvedValue(mockCount),
      }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10&status=active'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.items.data)).toBe(true);
    });

    it('should filter assessments by type', async () => {
      // Use contract-compliant test data
      const mockAssessments = [
        testDataFactories.assessment({
          id: 'test-assessment-1',
          name: 'APEST Ministry Assessment',
          slug: 'apest-ministry-assessment',
          description: 'Test assessment',
          assessmentType: 'apest',
          status: 'active',
          questionsCount: 25,
          researchBacked: true,
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
        'http://localhost:3000/api/assessments?page=1&limit=10&assessmentType=apest'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // Check that all returned assessments are APEST type
      data.items.data.forEach((assessment: any) => {
        expect(assessment.assessmentType).toBe('apest');
      });
    });
  });

  describe('GET /api/assessments/[id]', () => {
    it('should return assessment with questions', async () => {
      const assessmentId = '550e8400-e29b-41d4-a716-446655440000';

      // Use contract-compliant test data
      const mockAssessment = testDataFactories.assessment({
        id: assessmentId,
        name: 'APEST Ministry Assessment',
        slug: 'apest-ministry-assessment',
        description: 'Test assessment',
        assessmentType: 'apest',
        status: 'active',
        questionsCount: 25,
        researchBacked: true,
      });

      // Use contract-compliant test data for questions
      const mockQuestions = [
        testDataFactories.assessmentQuestionResponse({
          id: 'q1',
          assessmentId: assessmentId,
          questionText: 'Test question 1',
          orderIndex: 1,
          questionType: 'multiple_choice',
        }),
        testDataFactories.assessmentQuestionResponse({
          id: 'q2',
          assessmentId: assessmentId,
          questionText: 'Test question 2',
          orderIndex: 2,
          questionType: 'multiple_choice',
        }),
      ];

      // Mock the database chain for assessment
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([mockAssessment]),
        }))
        // Mock the database chain for questions
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue(mockQuestions),
        }));

      const request = new NextRequest(
        `http://localhost:3000/api/assessments/${assessmentId}`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: assessmentId }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('questions');
      expect(Array.isArray(data.questions)).toBe(true);
      expect(data.questions.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existent assessment', async () => {
      const assessmentId = '550e8400-e29b-41d4-a716-446655440001';

      // Mock empty assessment result
      vi.mocked(db).select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
      }));

      const request = new NextRequest(
        `http://localhost:3000/api/assessments/${assessmentId}`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: assessmentId }),
      });

      expect(response.status).toBe(404);
    });
  });
});

// Integration test for the assessment flow
describe('Assessment Flow Integration', () => {
  it('should have APEST assessment with correct structure', async () => {
    // Use contract-compliant test data
    const mockAssessments = [
      testDataFactories.assessment({
        id: 'test-assessment-1',
        name: 'APEST Ministry Assessment',
        slug: 'apest-ministry-assessment',
        description: 'Test assessment',
        assessmentType: 'apest',
        status: 'active',
        questionsCount: 25,
        researchBacked: true,
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
      'http://localhost:3000/api/assessments?page=1&limit=10&assessmentType=apest'
    );
    const response = await getAssessments(request);
    const data = await response.json();

    expect(response.status).toBe(200);

    const apestAssessment = data.items.data.find(
      (a: any) => a.slug === 'apest-ministry-assessment'
    );
    expect(apestAssessment).toBeDefined();
    expect(apestAssessment.assessmentType).toBe('apest');
    expect(apestAssessment.status).toBe('active');
    expect(apestAssessment.questionsCount).toBe(25);
    expect(apestAssessment.researchBacked).toBe(true);
  });
});
