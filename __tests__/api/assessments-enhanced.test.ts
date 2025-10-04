import {
  contractValidators,
  createMockDatabase,
  enhancedTestDataFactories,
} from '@/lib/mocks';
import { NextRequest } from 'next/server';
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
    // Include all required fields from contract
    version: assessment.version || '1.0',
    language: assessment.language || 'en',
    culturalAdaptation: assessment.culturalAdaptation || 'universal',
    validityScore: assessment.validityScore || '0.85',
    reliabilityScore: assessment.reliabilityScore || '0.92',
    instructions: assessment.instructions || 'Test instructions',
    scoringMethod: assessment.scoringMethod || 'likert_5',
    isPublished: assessment.isPublished ?? true,
    isActive: assessment.isActive ?? true,
    estimatedDurationText: assessment.estimatedDurationText || '15 minutes',
    publishedAt: assessment.publishedAt || assessment.createdAt,
    estimatedDuration: assessment.estimatedDuration || 15,
    passingScore: assessment.passingScore || 70,
  })),
  toAssessmentWithQuestionsResponseDTO: vi.fn((assessment, questions) => ({
    ...assessment,
    questions: questions.map((q: any) => ({
      id: q.id,
      assessmentId: q.assessmentId,
      questionText: q.questionText,
      orderIndex: q.orderIndex,
      questionType: q.questionType,
      isRequired: q.isRequired ?? true,
      category: q.category || 'general',
      weight: q.weight || 1.0,
      reverseScored: q.reverseScored ?? false,
      apestDimension: q.apestDimension,
      answerOptions: q.answerOptions || [
        {
          value: 1,
          label: 'Strongly Disagree',
          description: 'This does not describe me at all',
        },
        {
          value: 2,
          label: 'Disagree',
          description: 'This rarely describes me',
        },
        {
          value: 3,
          label: 'Neutral',
          description: 'This sometimes describes me',
        },
        { value: 4, label: 'Agree', description: 'This often describes me' },
        {
          value: 5,
          label: 'Strongly Agree',
          description: 'This perfectly describes me',
        },
      ],
      hasAnswerOptions: true,
      isApestQuestion: !!q.apestDimension,
      createdAt: q.createdAt || new Date().toISOString(),
      updatedAt: q.updatedAt || new Date().toISOString(),
    })),
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
  paginatedAssessmentListResponseSchema: {
    parse: vi.fn(data => data),
  },
}));

// Import the route handlers after mocking
import { GET as getAssessmentById } from '@/app/api/assessments/[id]/route';
import { GET as getAssessments } from '@/app/api/assessments/route';

describe('/api/assessments - Enhanced Testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/assessments - Contract Compliance', () => {
    it('should return contract-compliant assessment data', async () => {
      // Create contract-compliant test data
      const mockAssessments =
        enhancedTestDataFactories.generateMultipleAssessments(2);
      const paginatedResponse =
        enhancedTestDataFactories.paginatedAssessmentListResponse(
          mockAssessments,
          { page: 1, limit: 10, total: 2 }
        );

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
        where: vi.fn().mockResolvedValue([{ count: 2 }]),
      }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10&status=active'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      // Validate response structure
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.items.data)).toBe(true);

      // Explicit contract validation
      contractValidators.validatePaginatedAssessmentListResponse(data);

      // Validate each assessment item
      data.items.data.forEach((assessment: any) => {
        contractValidators.validateAssessmentResponse(assessment);
      });
    });

    it('should filter assessments by type with contract validation', async () => {
      const apestAssessments = [
        enhancedTestDataFactories.assessmentResponse({
          assessmentType: 'apest',
          status: 'active',
        }),
      ];

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(apestAssessments),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ count: 1 }]),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10&assessmentType=apest'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      // Validate contract compliance
      contractValidators.validatePaginatedAssessmentListResponse(data);

      // Check that all returned assessments are APEST type
      data.items.data.forEach((assessment: any) => {
        expect(assessment.assessmentType).toBe('apest');
        contractValidators.validateAssessmentResponse(assessment);
      });
    });

    it('should handle empty results with proper contract structure', async () => {
      // Mock empty results
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue([]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ count: 0 }]),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10&status=archived'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.items.data).toEqual([]);
      expect(data.items.pagination.total).toBe(0);

      // Validate contract compliance for empty response
      contractValidators.validatePaginatedAssessmentListResponse(data);
    });
  });

  describe('GET /api/assessments/[id] - Enhanced Validation', () => {
    it('should return assessment with questions using contract validation', async () => {
      const assessmentId = '550e8400-e29b-41d4-a716-446655440000';

      // Create contract-compliant test data
      const mockAssessment = enhancedTestDataFactories.assessmentResponse({
        id: assessmentId,
        name: 'APEST Ministry Assessment',
        assessmentType: 'apest',
      });

      const mockQuestions = [
        enhancedTestDataFactories.assessmentQuestionResponse({
          assessmentId,
          orderIndex: 1,
          apestDimension: 'apostolic',
        }),
        enhancedTestDataFactories.assessmentQuestionResponse({
          assessmentId,
          orderIndex: 2,
          apestDimension: 'prophetic',
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
      expect(data).toHaveProperty('questions');
      expect(Array.isArray(data.questions)).toBe(true);
      expect(data.questions.length).toBeGreaterThan(0);

      // Validate contract compliance
      contractValidators.validateAssessmentWithQuestionsResponse(data);

      // Validate each question
      data.questions.forEach((question: any) => {
        contractValidators.validateAssessmentQuestionResponse(question);
      });
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

    it('should validate assessment with specific APEST dimensions', async () => {
      const assessmentId = '550e8400-e29b-41d4-a716-446655440000';

      const mockAssessment = enhancedTestDataFactories.assessmentResponse({
        id: assessmentId,
        assessmentType: 'apest',
      });

      const apestQuestions = [
        enhancedTestDataFactories.assessmentQuestionResponse({
          assessmentId,
          orderIndex: 1,
          apestDimension: 'apostolic',
          questionText:
            'I naturally see opportunities for new ministry initiatives.',
        }),
        enhancedTestDataFactories.assessmentQuestionResponse({
          assessmentId,
          orderIndex: 2,
          apestDimension: 'prophetic',
          questionText:
            "I have a strong sense of God's direction for the future.",
        }),
      ];

      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([mockAssessment]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue(apestQuestions),
        }));

      const request = new NextRequest(
        `http://localhost:3000/api/assessments/${assessmentId}`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: assessmentId }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);

      // Validate contract compliance
      contractValidators.validateAssessmentWithQuestionsResponse(data);

      // Validate APEST-specific properties
      data.questions.forEach((question: any) => {
        expect(question.isApestQuestion).toBe(true);
        expect(question.apestDimension).toBeDefined();
        expect([
          'apostolic',
          'prophetic',
          'evangelistic',
          'shepherding',
          'teaching',
        ]).toContain(question.apestDimension);
      });
    });
  });

  describe('Error Scenarios - Enhanced Testing', () => {
    it('should handle database connection errors', async () => {
      // Mock database error
      vi.mocked(db).select.mockImplementationOnce(() => {
        throw new Error('Connection failed');
      });

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10'
      );
      const response = await getAssessments(request);

      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data.error).toBeDefined();
      expect(data.message).toBeDefined();
    });

    it('should handle invalid assessment IDs', async () => {
      const invalidId = 'invalid-uuid';

      const request = new NextRequest(
        `http://localhost:3000/api/assessments/${invalidId}`
      );
      const response = await getAssessmentById(request, {
        params: Promise.resolve({ id: invalidId }),
      });

      expect(response.status).toBe(400);
    });

    it('should handle query timeout errors', async () => {
      vi.mocked(db).select.mockImplementationOnce(() => {
        throw new Error('Query timeout');
      });

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10'
      );
      const response = await getAssessments(request);

      expect(response.status).toBe(500);
    });
  });

  describe('APEST Assessment Integration - Contract Validation', () => {
    it('should have APEST assessment with correct contract structure', async () => {
      const apestAssessments = [
        enhancedTestDataFactories.assessmentResponse({
          name: 'APEST Ministry Assessment',
          slug: 'apest-ministry-assessment',
          assessmentType: 'apest',
          status: 'active',
          questionsCount: 25,
          researchBacked: true,
        }),
      ];

      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(apestAssessments),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ count: 1 }]),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=10&assessmentType=apest'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);

      // Validate contract compliance
      contractValidators.validatePaginatedAssessmentListResponse(data);

      const apestAssessment = data.items.data.find(
        (a: any) => a.slug === 'apest-ministry-assessment'
      );

      expect(apestAssessment).toBeDefined();
      expect(apestAssessment.assessmentType).toBe('apest');
      expect(apestAssessment.status).toBe('active');
      expect(apestAssessment.questionsCount).toBe(25);
      expect(apestAssessment.researchBacked).toBe(true);

      // Validate specific APEST contract properties
      contractValidators.validateAssessmentResponse(apestAssessment);

      // Validate specific properties
      expect(apestAssessment.assessmentType).toBe('apest');
      expect(apestAssessment.status).toBe('active');
      expect(apestAssessment.researchBacked).toBe(true);
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle large datasets efficiently', async () => {
      const largeAssessmentList =
        enhancedTestDataFactories.generateMultipleAssessments(100);

      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(largeAssessmentList.slice(0, 50)),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ count: 100 }]),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=1&limit=50'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.items.data.length).toBe(50);
      expect(data.items.pagination.total).toBe(100);

      // Validate contract compliance for large dataset
      contractValidators.validatePaginatedAssessmentListResponse(data);
    });

    it('should handle pagination edge cases', async () => {
      const assessments =
        enhancedTestDataFactories.generateMultipleAssessments(5);

      // Test last page with fewer items than limit
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockResolvedValue(assessments.slice(0, 2)),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([{ count: 5 }]),
        }));

      const request = new NextRequest(
        'http://localhost:3000/api/assessments?page=3&limit=2'
      );
      const response = await getAssessments(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.items.data.length).toBe(2);
      expect(data.items.pagination.page).toBe(3);
      expect(data.items.pagination.hasNext).toBe(false);
      expect(data.items.pagination.hasPrev).toBe(true);

      // Validate contract compliance
      contractValidators.validatePaginatedAssessmentListResponse(data);
    });
  });
});
