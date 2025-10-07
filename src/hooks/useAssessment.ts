// Assessment Data Hooks
// Specialized hooks for assessment data management with standard return shapes
// Aligned with @/lib/contracts for type safety

import type {
  AssessmentEntity,
  AssessmentResponseResponse,
  AssessmentSearchRequest,
  CompleteAssessmentRequest,
  CreateAssessmentRequest,
  SaveAssessmentResponsesRequest,
  StartAssessmentRequest,
  UpdateAssessmentRequest,
  UserAssessmentFiltersRequest,
  UserAssessmentResponse,
} from '@/lib/contracts';
import {
  assessmentEntitySchema,
  assessmentResponseResponseSchema,
  createAssessmentSchema,
  createUserAssessmentSchema,
  updateAssessmentSchema,
  userAssessmentEntitySchema,
} from '@/lib/contracts';
import { z } from 'zod';
import { apiClient } from '../lib/api-client';
import {
  API_ENDPOINTS,
  buildQueryString,
  createApiResponseFetcher,
  createPaginatedFetcher,
} from '../lib/utils/api';
import {
  useMutation,
  useSWRApiResponse,
  useSWRPaginatedResponse,
} from './useDataState';

// ============================================================================
// ASSESSMENT HOOKS
// ============================================================================

/**
 * Hook for fetching a specific assessment by ID with questions
 * Returns DataState<AssessmentWithQuestionsResponse> format
 */
export function useAssessment(assessmentId: string) {
  const fetcher = createApiResponseFetcher(assessmentEntitySchema);

  return useSWRApiResponse<AssessmentEntity>(
    assessmentId ? API_ENDPOINTS.assessments.byId(assessmentId) : null,
    fetcher
  );
}

/**
 * Hook for fetching user's assessment results
 * Returns PaginatedDataState<UserAssessmentResponse> format
 */
export function useUserAssessments(filters?: UserAssessmentFiltersRequest) {
  const queryString = filters ? buildQueryString(filters) : '';
  const url = `${API_ENDPOINTS.assessments.userAssessments}${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(userAssessmentEntitySchema);
  return useSWRPaginatedResponse<UserAssessmentResponse>(url, fetcher);
}

/**
 * Hook for fetching a specific user assessment by ID
 * Returns DataState<UserAssessmentResponse> format
 */
export function useUserAssessment(userAssessmentId: string) {
  const fetcher = createApiResponseFetcher(userAssessmentEntitySchema);
  return useSWRApiResponse<UserAssessmentResponse>(
    userAssessmentId ? `/api/user/assessments/${userAssessmentId}` : null,
    fetcher
  );
}

/**
 * Hook for fetching assessment questions
 * Returns DataState<AssessmentQuestionEntity[]> format
 */
export function useAssessmentQuestions(assessmentId: string) {
  const fetcher = createApiResponseFetcher(
    z.array(
      z.object({
        id: z.string().uuid(),
        assessmentId: z.string().uuid(),
        questionText: z.string(),
        questionType: z.string(),
        orderIndex: z.number(),
        category: z.string().optional(),
        apestDimension: z.string().optional(),
        answerOptions: z
          .array(
            z.object({
              value: z.number(),
              label: z.string(),
              description: z.string().optional(),
            })
          )
          .optional(),
        isRequired: z.boolean(),
        weight: z.number(),
        reverseScored: z.boolean(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      })
    )
  );
  return useSWRApiResponse<any[]>(
    assessmentId ? `/api/assessments/${assessmentId}/questions` : null,
    fetcher
  );
}

/**
 * Hook for fetching assessment responses
 * Returns DataState<AssessmentResponseResponse[]> format
 */
export function useAssessmentResponses(userAssessmentId: string) {
  const fetcher = createApiResponseFetcher(
    z.array(assessmentResponseResponseSchema)
  );
  return useSWRApiResponse<AssessmentResponseResponse[]>(
    userAssessmentId
      ? `/api/user/assessments/${userAssessmentId}/responses`
      : null,
    fetcher
  );
}

/**
 * Hook for starting a new assessment
 * Returns mutation functions and state
 */
export function useStartAssessment() {
  return useMutation<UserAssessmentResponse, StartAssessmentRequest>(
    async input => {
      // Validate request data
      const validatedData = createUserAssessmentSchema.parse(input);

      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.assessments.userAssessments,
        validatedData,
        userAssessmentEntitySchema
      );
    }
  );
}

/**
 * Hook for saving assessment responses
 * Returns mutation functions and state
 */
export function useSaveAssessmentResponses() {
  return useMutation<
    AssessmentResponseResponse[],
    SaveAssessmentResponsesRequest
  >(async input => {
    // Make API call with validation
    return apiClient.postWithValidation(
      API_ENDPOINTS.assessments.userAssessmentResponses(input.userAssessmentId),
      input,
      z.array(assessmentResponseResponseSchema)
    );
  });
}

/**
 * Hook for completing an assessment
 * Returns mutation functions and state
 */
export function useCompleteAssessment() {
  return useMutation<UserAssessmentResponse, CompleteAssessmentRequest>(
    async input => {
      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.assessments.userAssessmentComplete(
          input.userAssessmentId
        ),
        input,
        userAssessmentEntitySchema
      );
    }
  );
}

// ============================================================================
// ADDITIONAL HOOKS
// ============================================================================

/**
 * Hook for fetching assessments list with search and filters
 * Returns DataState<PaginatedAssessmentListResponse> format
 */
export function useAssessments(filters?: AssessmentSearchRequest) {
  const params = new URLSearchParams();
  if (filters?.page) params.set('page', filters.page.toString());
  if (filters?.limit) params.set('limit', filters.limit.toString());
  if (filters?.search) params.set('search', filters.search);
  if (filters?.assessmentType)
    params.set('assessmentType', filters.assessmentType);
  if (filters?.status) params.set('status', filters.status);
  if (filters?.language) params.set('language', filters.language);
  if (filters?.culturalAdaptation)
    params.set('culturalAdaptation', filters.culturalAdaptation);
  if (filters?.researchBacked !== undefined)
    params.set('researchBacked', filters.researchBacked.toString());

  const queryString = params.toString();
  const fetcher = createPaginatedFetcher(assessmentEntitySchema);
  return useSWRPaginatedResponse<AssessmentEntity>(
    `/api/assessments${queryString ? `?${queryString}` : ''}`,
    fetcher
  );
}

/**
 * Hook for creating a new assessment
 * Returns mutation functions and state
 */
export function useCreateAssessment() {
  return useMutation<AssessmentEntity, CreateAssessmentRequest>(async input => {
    // Validate request data
    const validatedData = createAssessmentSchema.parse(input);

    // Make API call with validation
    return apiClient.postWithValidation(
      API_ENDPOINTS.assessments.list,
      validatedData,
      assessmentEntitySchema
    );
  });
}

/**
 * Hook for updating an assessment
 * Returns mutation functions and state
 */
export function useUpdateAssessment() {
  return useMutation<AssessmentEntity, UpdateAssessmentRequest>(async input => {
    // Validate request data
    const validatedData = updateAssessmentSchema.parse(input);

    // Make API call with validation
    return apiClient.patchWithValidation(
      API_ENDPOINTS.assessments.byId(input.id),
      validatedData,
      assessmentEntitySchema
    );
  });
}

/**
 * Hook for deleting an assessment
 * Returns mutation functions and state
 */
export function useDeleteAssessment() {
  return useMutation<{ success: boolean }, string>(async assessmentId => {
    // Make API call with validation
    return apiClient.deleteWithValidation(
      API_ENDPOINTS.assessments.byId(assessmentId),
      z.object({ success: z.boolean() })
    );
  });
}

/**
 * Adapter hook for components expecting the old manual state management
 * Returns { assessment, isLoading, error, setAssessment, fetchAssessment }
 */
export function useAssessmentAdapter(assessmentId: string) {
  const dataState = useAssessment(assessmentId);

  return {
    assessment: dataState.data,
    isLoading: dataState.isLoading,
    error: dataState.error,
    setAssessment: () => {}, // No-op for compatibility
    fetchAssessment: () => {}, // No-op for compatibility
  };
}

/**
 * Hook for assessment with manual state management (for complex flows)
 * Returns DataState<AssessmentWithQuestionsResponse> with additional control methods
 */
export function useAssessmentWithControls(assessmentId: string) {
  const dataState = useAssessment(assessmentId);

  const refetch = async () => {
    // SWR will handle refetching automatically
    // This is here for compatibility with manual state management
  };

  return {
    ...dataState,
    refetch,
  };
}
