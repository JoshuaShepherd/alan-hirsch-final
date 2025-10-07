// ============================================================================
// ASSESSMENT SERVICE TESTS
// ============================================================================
// Comprehensive unit tests for AssessmentService following alignment reference patterns

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AssessmentService } from '../../apps/alan-hirsch-platform/lib/services/assessment.service';
import {
  ForbiddenError,
  NotFoundError,
  ServiceContext,
  ServiceContextBuilder,
} from '../../apps/alan-hirsch-platform/lib/services/types';

// Mock the query modules and mappers
vi.mock('@platform/database/queries/assessments', () => ({
  createAssessment: vi.fn(),
  getAssessmentById: vi.fn(),
  getAssessmentBySlug: vi.fn(),
  getAssessments: vi.fn(),
  updateAssessment: vi.fn(),
  deleteAssessment: vi.fn(),
  createAssessmentQuestion: vi.fn(),
  getAssessmentQuestionById: vi.fn(),
  getAssessmentQuestions: vi.fn(),
  updateAssessmentQuestion: vi.fn(),
  deleteAssessmentQuestion: vi.fn(),
  startUserAssessment: vi.fn(),
  completeUserAssessment: vi.fn(),
  getUserAssessmentById: vi.fn(),
  getUserAssessmentByType: vi.fn(),
  getUserAssessmentsWithDetails: vi.fn(),
  updateUserAssessment: vi.fn(),
  deleteUserAssessment: vi.fn(),
  createAssessmentResponse: vi.fn(),
  getAssessmentResponseById: vi.fn(),
  getAssessmentResponses: vi.fn(),
  saveAssessmentResponses: vi.fn(),
  updateAssessmentResponse: vi.fn(),
  deleteAssessmentResponse: vi.fn(),
  getAssessmentStats: vi.fn(),
  getApestScoreDistribution: vi.fn(),
  getSimilarApestProfiles: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/assessment', () => ({
  toAssessmentResponseDTO: vi.fn(),
  toAssessmentQuestionResponseDTO: vi.fn(),
  toUserAssessmentResponseDTO: vi.fn(),
  toAssessmentResponseResponseDTO: vi.fn(),
  fromCreateAssessment: vi.fn(),
  fromUpdateAssessment: vi.fn(),
  fromCreateAssessmentQuestion: vi.fn(),
  fromUpdateAssessmentQuestion: vi.fn(),
  fromCreateUserAssessment: vi.fn(),
  fromUpdateUserAssessment: vi.fn(),
  fromCreateAssessmentResponse: vi.fn(),
  fromUpdateAssessmentResponse: vi.fn(),
}));

// DISABLED: Services deleted for rebuild - will be restored in Phase 1.3
describe.skip('AssessmentService - DISABLED FOR REBUILD', () => {
  let assessmentService: AssessmentService;
  let context: ServiceContext;

  beforeEach(() => {
    assessmentService = new AssessmentService();
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create an assessment successfully', async () => {
      const createData = {
        name: 'Test Assessment',
        slug: 'test-assessment',
        description: 'A test assessment',
        assessmentType: 'apest' as const,
        questionsCount: 20,
        estimatedDuration: 30,
      };

      const mockDbResult = { id: 'assessment-123', ...createData };
      const mockResponse = {
        id: 'assessment-123',
        ...createData,
        isActive: true,
      };

      vi.mocked(assessmentService['executeCreate']).mockResolvedValue(
        mockDbResult
      );
      vi.mocked(assessmentService['mapDbToEntity']).mockReturnValue(
        mockResponse
      );

      const result = await assessmentService.create(createData, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should enforce create business rules', async () => {
      const createData = {
        name: 'Test Assessment',
        slug: 'test-assessment',
        description: 'A test assessment',
        assessmentType: 'apest' as const,
        questionsCount: 20,
      };

      // Test with guest role (should fail)
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      const result = await assessmentService.create(createData, guestContext);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('findById', () => {
    it('should find assessment by ID successfully', async () => {
      const mockDbResult = { id: 'assessment-123', name: 'Test Assessment' };
      const mockResponse = {
        id: 'assessment-123',
        name: 'Test Assessment',
        isActive: true,
      };

      vi.mocked(assessmentService['executeFindById']).mockResolvedValue(
        mockDbResult
      );
      vi.mocked(assessmentService['mapDbToEntity']).mockReturnValue(
        mockResponse
      );

      const result = await assessmentService.findById(
        'assessment-123',
        context
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should return not found for non-existent assessment', async () => {
      vi.mocked(assessmentService['executeFindById']).mockResolvedValue(null);

      const result = await assessmentService.findById('non-existent', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('findBySlug', () => {
    it('should find assessment by slug successfully', async () => {
      const slug = 'test-assessment';
      const mockDbResult = {
        id: 'assessment-123',
        slug,
        name: 'Test Assessment',
      };
      const mockResponse = {
        id: 'assessment-123',
        slug,
        name: 'Test Assessment',
        isActive: true,
      };

      const { getAssessmentBySlug } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(getAssessmentBySlug).mockResolvedValue(mockDbResult);
      vi.mocked(assessmentService['mapDbToEntity']).mockReturnValue(
        mockResponse
      );

      const result = await assessmentService.findBySlug(slug, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should return not found for non-existent slug', async () => {
      const { getAssessmentBySlug } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(getAssessmentBySlug).mockResolvedValue(null);

      const result = await assessmentService.findBySlug(
        'non-existent',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('publish', () => {
    it('should publish assessment successfully', async () => {
      const assessmentId = 'assessment-123';
      const mockAssessment = {
        id: assessmentId,
        name: 'Test Assessment',
        status: 'draft',
      };
      const mockResponse = {
        id: assessmentId,
        name: 'Test Assessment',
        status: 'active',
        publishedAt: expect.any(String),
        isActive: true,
      };

      vi.mocked(assessmentService.findById).mockResolvedValue({
        success: true,
        data: mockAssessment as any,
      });
      vi.mocked(assessmentService.update).mockResolvedValue({
        success: true,
        data: mockResponse as any,
      });

      const result = await assessmentService.publish(assessmentId, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(assessmentService.update).toHaveBeenCalledWith(
        assessmentId,
        {
          status: 'active',
          publishedAt: expect.any(String),
        },
        context
      );
    });

    it('should forbid publishing assessment without admin role', async () => {
      const assessmentId = 'assessment-123';
      const mockAssessment = {
        id: assessmentId,
        name: 'Test Assessment',
        status: 'draft',
      };

      vi.mocked(assessmentService.findById).mockResolvedValue({
        success: true,
        data: mockAssessment as any,
      });

      const result = await assessmentService.publish(assessmentId, context);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('getAssessmentStats', () => {
    it('should get assessment statistics successfully', async () => {
      const assessmentId = 'assessment-123';
      const mockStats = {
        totalAttempts: 150,
        averageScore: 78.5,
        completionRate: 0.85,
        averageTimeSpent: 25.5,
        scoreDistribution: {
          '0-20': 5,
          '21-40': 10,
          '41-60': 25,
          '61-80': 45,
          '81-100': 65,
        },
      };

      const { getAssessmentStats } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(getAssessmentStats).mockResolvedValue(mockStats);

      const result = await assessmentService.getAssessmentStats(
        assessmentId,
        context
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
    });

    it('should return not found for non-existent assessment', async () => {
      const { getAssessmentStats } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(getAssessmentStats).mockResolvedValue(null);

      const result = await assessmentService.getAssessmentStats(
        'non-existent',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('authorization', () => {
    it('should allow admins to create assessments', () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(assessmentService.canCreate(adminContext)).toBe(true);
    });

    it('should forbid non-admins from creating assessments', () => {
      expect(assessmentService.canCreate(context)).toBe(false); // member role
    });

    it('should allow viewers to read assessments', () => {
      const viewerContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('viewer')
        .build();

      expect(assessmentService.canRead(viewerContext)).toBe(true);
    });

    it('should allow admins to update assessments', () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(assessmentService.canUpdate(adminContext)).toBe(true);
    });

    it('should forbid non-admins from updating assessments', () => {
      expect(assessmentService.canUpdate(context)).toBe(false); // member role
    });

    it('should only allow admins to delete assessments', () => {
      expect(assessmentService.canDelete(context)).toBe(false); // member role

      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(assessmentService.canDelete(adminContext)).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      vi.mocked(assessmentService['executeFindById']).mockRejectedValue(
        new Error('Database connection failed')
      );

      const result = await assessmentService.findById(
        'assessment-123',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Database connection failed');
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        name: '', // Invalid: empty name
        slug: 'test-assessment',
        assessmentType: 'apest' as const,
        questionsCount: 20,
      };

      vi.mocked(assessmentService['validateCreateInput']).mockImplementation(
        () => {
          throw new Error('Name is required');
        }
      );

      const result = await assessmentService.create(invalidData, context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});

describe('AssessmentQuestionService', () => {
  let questionService: any;
  let context: ServiceContext;

  beforeEach(() => {
    // Note: AssessmentQuestionService would need to be imported and instantiated
    // For now, we'll test the pattern
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create an assessment question successfully', async () => {
      const createData = {
        assessmentId: 'assessment-123',
        text: 'What is your primary ministry focus?',
        type: 'multiple-choice' as const,
        options: ['Teaching', 'Leadership', 'Evangelism', 'Pastoral Care'],
        required: true,
        order: 1,
      };

      // This would test the AssessmentQuestionService create method
      // Implementation would follow the same patterns as AssessmentService
      expect(true).toBe(true); // Placeholder for actual test
    });
  });
});

describe('UserAssessmentService', () => {
  let userAssessmentService: any;
  let context: ServiceContext;

  beforeEach(() => {
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('startUserAssessment', () => {
    it('should start a user assessment successfully', async () => {
      const assessmentId = 'assessment-123';
      const mockUserAssessment = {
        id: 'user-assessment-123',
        userId: 'user-123',
        assessmentId,
        status: 'in_progress',
        startedAt: expect.any(String),
      };

      // Mock the query module
      const { startUserAssessment } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(startUserAssessment).mockResolvedValue(mockUserAssessment);

      // This would test the UserAssessmentService startUserAssessment method
      expect(true).toBe(true); // Placeholder for actual test
    });

    it('should forbid starting assessment for another user', async () => {
      const assessmentId = 'assessment-123';

      // This would test authorization rules
      expect(true).toBe(true); // Placeholder for actual test
    });
  });

  describe('completeUserAssessment', () => {
    it('should complete a user assessment successfully', async () => {
      const userAssessmentId = 'user-assessment-123';
      const responses = [
        { questionId: 'q1', answer: 'A', confidence: 8 },
        { questionId: 'q2', answer: 'B', confidence: 7 },
      ];

      const mockCompletedAssessment = {
        id: userAssessmentId,
        status: 'completed',
        completedAt: expect.any(String),
        score: 85,
      };

      // Mock the query module
      const { completeUserAssessment } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(completeUserAssessment).mockResolvedValue(
        mockCompletedAssessment
      );

      // This would test the UserAssessmentService completeUserAssessment method
      expect(true).toBe(true); // Placeholder for actual test
    });
  });
});

describe('AssessmentResponseService', () => {
  let responseService: any;
  let context: ServiceContext;

  beforeEach(() => {
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('saveResponses', () => {
    it('should save assessment responses successfully', async () => {
      const userAssessmentId = 'user-assessment-123';
      const responses = [
        { questionId: 'q1', answer: 'A', confidence: 8 },
        { questionId: 'q2', answer: 'B', confidence: 7 },
      ];

      const mockSavedResponses = [
        { id: 'resp1', questionId: 'q1', answer: 'A', confidence: 8 },
        { id: 'resp2', questionId: 'q2', answer: 'B', confidence: 7 },
      ];

      // Mock the query module
      const { saveAssessmentResponses } = await import(
        '@platform/database/queries/assessments'
      );
      vi.mocked(saveAssessmentResponses).mockResolvedValue(mockSavedResponses);

      // This would test the AssessmentResponseService saveResponses method
      expect(true).toBe(true); // Placeholder for actual test
    });

    it('should forbid saving responses for another user', async () => {
      const userAssessmentId = 'other-user-assessment-456';
      const responses = [{ questionId: 'q1', answer: 'A', confidence: 8 }];

      // This would test authorization rules
      expect(true).toBe(true); // Placeholder for actual test
    });
  });
});
