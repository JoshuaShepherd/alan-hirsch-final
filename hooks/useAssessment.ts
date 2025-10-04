// Assessment Data Hooks
// Specialized hooks for assessment data management with standard return shapes

import type {
  AssessmentResponseResponse,
  AssessmentSearchRequest,
  AssessmentWithQuestionsResponse,
  CompleteAssessmentRequest,
  CreateAssessmentRequest,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
  SaveAssessmentResponsesRequest,
  StartAssessmentRequest,
  UpdateAssessmentRequest,
  UserAssessmentFiltersRequest,
  UserAssessmentResponse,
} from '@/lib/contracts';
import { useCallback, useState } from 'react';
import { useSWRDataState } from './useDataState';

// ============================================================================
// ASSESSMENT HOOKS
// ============================================================================

/**
 * Hook for fetching a specific assessment by ID with questions
 * Returns DataState<AssessmentWithQuestionsResponse> format
 */
export function useAssessment(assessmentId: string) {
  return useSWRDataState<AssessmentWithQuestionsResponse>(
    assessmentId ? `/api/assessments/${assessmentId}` : null
  );
}

/**
 * Hook for fetching user's assessment results
 * Returns DataState<PaginatedUserAssessmentListResponse> format
 */
export function useUserAssessments(filters?: UserAssessmentFiltersRequest) {
  const params = new URLSearchParams();
  if (filters?.page) params.set('page', filters.page.toString());
  if (filters?.limit) params.set('limit', filters.limit.toString());
  if (filters?.assessmentType)
    params.set('assessmentType', filters.assessmentType);
  if (filters?.completed !== undefined)
    params.set('completed', filters.completed.toString());

  const queryString = params.toString();
  return useSWRDataState<PaginatedUserAssessmentListResponse>(
    `/api/user/assessments${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Hook for fetching a specific user assessment by ID
 * Returns DataState<UserAssessmentResponse> format
 */
export function useUserAssessment(userAssessmentId: string) {
  return useSWRDataState<UserAssessmentResponse>(
    userAssessmentId ? `/api/user/assessments/${userAssessmentId}` : null
  );
}

/**
 * Hook for fetching assessment responses
 * Returns DataState<AssessmentResponseResponse[]> format
 */
export function useAssessmentResponses(userAssessmentId: string) {
  return useSWRDataState<AssessmentResponseResponse[]>(
    userAssessmentId
      ? `/api/user/assessments/${userAssessmentId}/responses`
      : null
  );
}

/**
 * Hook for starting a new assessment
 * Returns mutation functions and state
 */
export function useStartAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startAssessment = useCallback(async (input: StartAssessmentRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start assessment');
      }

      const result = await response.json();
      return result.data; // Return the created user assessment
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    startAssessment,
    isLoading,
    error,
  };
}

/**
 * Hook for saving assessment responses
 * Returns mutation functions and state
 */
export function useSaveAssessmentResponses() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveResponses = useCallback(
    async (input: SaveAssessmentResponsesRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/user/assessments/${input.userAssessmentId}/responses`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save responses');
        }

        const result = await response.json();
        return result.data; // Return the saved responses
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    saveResponses,
    isLoading,
    error,
  };
}

/**
 * Hook for completing an assessment
 * Returns mutation functions and state
 */
export function useCompleteAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completeAssessment = useCallback(
    async (input: CompleteAssessmentRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/user/assessments/${input.userAssessmentId}/complete`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to complete assessment');
        }

        const result = await response.json();
        return result.data; // Return the completed assessment
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    completeAssessment,
    isLoading,
    error,
  };
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
  return useSWRDataState<PaginatedAssessmentListResponse>(
    `/api/assessments${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Hook for creating a new assessment
 * Returns mutation functions and state
 */
export function useCreateAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAssessment = useCallback(
    async (input: CreateAssessmentRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/assessments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create assessment');
        }

        const result = await response.json();
        return result.data; // Return the created assessment
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    createAssessment,
    isLoading,
    error,
  };
}

/**
 * Hook for updating an assessment
 * Returns mutation functions and state
 */
export function useUpdateAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAssessment = useCallback(
    async (input: UpdateAssessmentRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/assessments/${input.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update assessment');
        }

        const result = await response.json();
        return result.data; // Return the updated assessment
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    updateAssessment,
    isLoading,
    error,
  };
}

/**
 * Hook for deleting an assessment
 * Returns mutation functions and state
 */
export function useDeleteAssessment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAssessment = useCallback(async (assessmentId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/assessments/${assessmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete assessment');
      }

      const result = await response.json();
      return result.data; // Return the deletion result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    deleteAssessment,
    isLoading,
    error,
  };
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
