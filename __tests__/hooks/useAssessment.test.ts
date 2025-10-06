// Assessment Hooks Tests
// Tests for assessment data hooks aligned with @platform/contracts

import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  useAssessment,
  useAssessments,
  useCreateAssessment,
  useDeleteAssessment,
  useSaveAssessmentResponses,
  useStartAssessment,
  useUpdateAssessment,
  useUserAssessment,
  useUserAssessments,
} from '../../apps/alan-hirsch-platform/hooks/useAssessment';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockAssessment = {
  id: 'assessment-123',
  name: 'APEST Assessment',
  slug: 'apest-assessment',
  description: 'Test APEST assessment',
  assessmentType: 'apest' as const,
  questionsCount: 50,
  estimatedDuration: 15,
  passingScore: 70,
  validityScore: 0.95,
  reliabilityScore: 0.92,
  instructions: 'Complete all questions honestly',
  publishedAt: '2023-01-01T00:00:00Z',
  version: '1.0',
  language: 'en',
  culturalAdaptation: 'universal' as const,
  researchBacked: true,
  scoringMethod: 'likert_5' as const,
  status: 'active' as const,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

const mockAssessmentWithQuestions = {
  assessment: mockAssessment,
  questions: [
    {
      id: 'question-1',
      text: 'I naturally see opportunities for growth and expansion',
      type: 'likert_5' as const,
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      required: true,
      order: 1,
    },
    {
      id: 'question-2',
      text: 'I enjoy building systems and structures',
      type: 'likert_5' as const,
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ],
      required: true,
      order: 2,
    },
  ],
};

const mockUserAssessment = {
  id: 'user-assessment-123',
  userId: 'user-123',
  assessmentId: 'assessment-123',
  status: 'in_progress' as const,
  startedAt: '2023-01-01T00:00:00Z',
  completedAt: null,
  totalScore: null,
  scorePercentage: null,
  responses: [],
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

const mockAssessmentResponse = {
  id: 'response-123',
  userAssessmentId: 'user-assessment-123',
  questionId: 'question-1',
  answer: 'Strongly Agree',
  score: 5,
  confidence: 0.9,
  responseTime: 15,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

// ============================================================================
// MSW SERVER SETUP
// ============================================================================

const server = setupServer(
  rest.get('/api/assessments/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockAssessmentWithQuestions,
      })
    );
  }),

  rest.get('/api/assessments', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockAssessment],
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

  rest.get('/api/user/assessments', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockUserAssessment],
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

  rest.get('/api/user/assessments/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockUserAssessment,
      })
    );
  }),

  rest.get('/api/user/assessments/:id/responses', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [mockAssessmentResponse],
      })
    );
  }),

  rest.post('/api/assessments', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockAssessment, ...req.body },
      })
    );
  }),

  rest.patch('/api/assessments/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockAssessment, ...req.body },
      })
    );
  }),

  rest.delete('/api/assessments/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { success: true },
      })
    );
  }),

  rest.post('/api/user/assessments', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockUserAssessment,
      })
    );
  }),

  rest.post('/api/user/assessments/:id/responses', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [mockAssessmentResponse],
      })
    );
  }),

  rest.post('/api/user/assessments/:id/complete', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          ...mockUserAssessment,
          status: 'completed',
          completedAt: new Date().toISOString(),
        },
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

describe('useAssessment', () => {
  it('should fetch assessment with questions successfully', async () => {
    const { result } = renderHook(() => useAssessment('assessment-123'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockAssessmentWithQuestions);
    expect(result.current.error).toBe(null);
  });

  it('should not fetch when ID is empty', () => {
    const { result } = renderHook(() => useAssessment(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it('should handle API errors', async () => {
    server.use(
      rest.get('/api/assessments/:id', (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            success: false,
            error: 'Assessment not found',
          })
        );
      })
    );

    const { result } = renderHook(() => useAssessment('assessment-123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('Assessment not found');
  });
});

describe('useAssessments', () => {
  it('should fetch assessments list successfully', async () => {
    const { result } = renderHook(() => useAssessments());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockAssessment]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should handle filters', async () => {
    const filters = {
      assessmentType: 'apest',
      status: 'active',
      page: 1,
      limit: 10,
    };

    const { result } = renderHook(() => useAssessments(filters));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useUserAssessments', () => {
  it('should fetch user assessments successfully', async () => {
    const { result } = renderHook(() => useUserAssessments());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockUserAssessment]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should handle filters', async () => {
    const filters = {
      assessmentType: 'apest',
      completed: false,
      page: 1,
      limit: 10,
    };

    const { result } = renderHook(() => useUserAssessments(filters));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useUserAssessment', () => {
  it('should fetch user assessment successfully', async () => {
    const { result } = renderHook(() =>
      useUserAssessment('user-assessment-123')
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUserAssessment);
  });

  it('should not fetch when ID is empty', () => {
    const { result } = renderHook(() => useUserAssessment(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useStartAssessment', () => {
  it('should start assessment successfully', async () => {
    const { result } = renderHook(() => useStartAssessment());

    expect(result.current.isLoading).toBe(false);

    const startData = {
      assessmentId: 'assessment-123',
    };

    await result.current.mutate(startData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUserAssessment);
  });

  it('should validate request data', async () => {
    const { result } = renderHook(() => useStartAssessment());

    const invalidData = {
      // Missing assessmentId
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

describe('useSaveAssessmentResponses', () => {
  it('should save assessment responses successfully', async () => {
    const { result } = renderHook(() => useSaveAssessmentResponses());

    const saveData = {
      userAssessmentId: 'user-assessment-123',
      responses: [
        {
          questionId: 'question-1',
          answer: 'Strongly Agree',
          score: 5,
        },
      ],
    };

    await result.current.mutate(saveData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockAssessmentResponse]);
  });
});

describe('useCreateAssessment', () => {
  it('should create assessment successfully', async () => {
    const { result } = renderHook(() => useCreateAssessment());

    const createData = {
      name: 'New Assessment',
      description: 'A new assessment',
      assessmentType: 'apest' as const,
      questionsCount: 30,
    };

    await result.current.mutate(createData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockAssessment,
      ...createData,
    });
  });

  it('should validate create data', async () => {
    const { result } = renderHook(() => useCreateAssessment());

    const invalidData = {
      // Missing required fields
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

describe('useUpdateAssessment', () => {
  it('should update assessment successfully', async () => {
    const { result } = renderHook(() => useUpdateAssessment());

    const updateData = {
      id: 'assessment-123',
      name: 'Updated Assessment',
      description: 'Updated description',
    };

    await result.current.mutate(updateData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockAssessment,
      ...updateData,
    });
  });

  it('should validate update data', async () => {
    const { result } = renderHook(() => useUpdateAssessment());

    const invalidData = {
      id: 'assessment-123',
      // Invalid data
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

describe('useDeleteAssessment', () => {
  it('should delete assessment successfully', async () => {
    const { result } = renderHook(() => useDeleteAssessment());

    await result.current.mutate('assessment-123');

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({ success: true });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Assessment Hooks Integration', () => {
  it('should handle complete assessment workflow', async () => {
    // 1. Fetch available assessments
    const { result: assessmentsResult } = renderHook(() => useAssessments());

    await waitFor(() => {
      expect(assessmentsResult.current.isLoading).toBe(false);
    });

    expect(assessmentsResult.current.isSuccess).toBe(true);

    // 2. Start an assessment
    const { result: startResult } = renderHook(() => useStartAssessment());

    const startData = {
      assessmentId: 'assessment-123',
    };

    await startResult.current.mutate(startData);
    expect(startResult.current.isSuccess).toBe(true);

    // 3. Save responses
    const { result: saveResult } = renderHook(() =>
      useSaveAssessmentResponses()
    );

    const saveData = {
      userAssessmentId: 'user-assessment-123',
      responses: [
        {
          questionId: 'question-1',
          answer: 'Strongly Agree',
          score: 5,
        },
      ],
    };

    await saveResult.current.mutate(saveData);
    expect(saveResult.current.isSuccess).toBe(true);
  });
});

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

describe('Error Handling', () => {
  it('should handle network errors', async () => {
    server.use(
      rest.get('/api/assessments/:id', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );

    const { result } = renderHook(() => useAssessment('assessment-123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Network error');
  });

  it('should handle validation errors', async () => {
    server.use(
      rest.get('/api/assessments/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            data: {
              // Invalid data structure
              assessment: { id: 'invalid' },
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useAssessment('assessment-123'));

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
  it('should enforce correct types for assessment data', () => {
    const { result } = renderHook(() => useAssessment('assessment-123'));

    if (result.current.data) {
      const assessmentData = result.current.data;
      expect(typeof assessmentData.assessment.id).toBe('string');
      expect(typeof assessmentData.assessment.name).toBe('string');
      expect(Array.isArray(assessmentData.questions)).toBe(true);
    }
  });

  it('should enforce correct types for mutation data', () => {
    const { result } = renderHook(() => useCreateAssessment());

    const createData = {
      name: 'Test Assessment',
      description: 'Test description',
      assessmentType: 'apest' as const,
      questionsCount: 25,
    };

    expect(() => result.current.mutate(createData)).not.toThrow();
  });
});
