// ============================================================================
// HOOKS LIBRARY - CENTRALIZED EXPORTS
// ============================================================================
// Centralized exports for all data hooks aligned with @/lib/contracts
// Provides typed, predictable data access that mirrors API contracts

// Core data state hooks
export {
  useApiResponseAdapter,
  useDataState,
  useMutation,
  usePaginatedAdapter,
  usePaginatedDataState,
  useSWRAdapter,
  useSWRApiResponse,
  useSWRDataState,
  useSWRPaginatedResponse,
  type DataState,
  type MutationState,
  type PaginatedDataState,
} from '../../hooks/useDataState';

// User profile hooks
export {
  useUpdateUserAssessmentScores,
  useUpdateUserProfile,
  useUserProfile,
  useUserProfileAdapter,
  useUserProfileDirect,
} from '../../hooks/useUserProfile';

// Assessment hooks
export {
  useAssessment,
  useAssessmentAdapter,
  useAssessmentResponses,
  useAssessmentWithControls,
  useAssessments,
  useCompleteAssessment,
  useCreateAssessment,
  useDeleteAssessment,
  useSaveAssessmentResponses,
  useStartAssessment,
  useUpdateAssessment,
  useUserAssessment,
  useUserAssessments,
} from '../../hooks/useAssessment';

// Content hooks
export {
  useContentById,
  useContentBySlug,
  useContentBySlugAdapter,
  useContentCategories,
  useContentItems,
  useContentItemsAdapter,
  useContentSeries,
  useCreateContentItem,
  usePublishContentItem,
  useScheduleContentItem,
  useUpdateContentItem,
} from '../../hooks/useContent';

// Organization hooks
export {
  useCreateOrganization,
  useCreateOrganizationMembership,
  useInviteUserToOrganization,
  useOrganization,
  useOrganizationAdapter,
  useOrganizationBySubdomain,
  useOrganizationDashboard,
  useOrganizationMembers,
  useOrganizationMembersAdapter,
  useOrganizationMemberships,
  useOrganizationStatistics,
  useOrganizations,
  useOrganizationsAdapter,
  useUpdateOrganization,
  useUpdateOrganizationMembership,
} from '../../hooks/useOrganization';

// ============================================================================
// HOOK FACTORY FUNCTIONS
// ============================================================================

import type { z } from 'zod';
import { useMutation, useSWRApiResponse } from '../../hooks/useDataState';
import { apiClient } from '../api-client';

/**
 * Create a typed GET hook for a single entity
 */
export function createEntityHook<T>(
  endpointBuilder: (id: string) => string,
  responseSchema: z.ZodSchema<T>
) {
  return function useEntity(id: string) {
    return useSWRApiResponse<T>(
      id ? endpointBuilder(id) : null,
      async (url: string) => {
        return apiClient.getWithValidation(url, responseSchema);
      }
    );
  };
}

/**
 * Create a typed GET hook for a list of entities
 */
export function createEntityListHook<T>(
  endpoint: string,
  responseSchema: z.ZodSchema<T[]>
) {
  return function useEntityList(params?: Record<string, unknown>) {
    const queryString = params
      ? new URLSearchParams(
          Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => [key, String(value)])
        ).toString()
      : '';

    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return useSWRApiResponse<T[]>(url, async (url: string) => {
      return apiClient.getWithValidation(url, responseSchema);
    });
  };
}

/**
 * Create a typed mutation hook for creating entities
 */
export function createCreateEntityHook<TData, TVariables>(
  endpoint: string,
  requestSchema: z.ZodSchema<TVariables>,
  responseSchema: z.ZodSchema<TData>
) {
  return function useCreateEntity() {
    return useMutation<TData, TVariables>(async (variables: TVariables) => {
      const validatedData = requestSchema.parse(variables);
      return apiClient.postWithValidation(
        endpoint,
        validatedData,
        responseSchema
      );
    });
  };
}

/**
 * Create a typed mutation hook for updating entities
 */
export function createUpdateEntityHook<TData, TVariables>(
  endpointBuilder: (id: string) => string,
  requestSchema: z.ZodSchema<TVariables>,
  responseSchema: z.ZodSchema<TData>
) {
  return function useUpdateEntity() {
    return useMutation<TData, TVariables & { id: string }>(
      async (variables: TVariables & { id: string }) => {
        const { id, ...data } = variables;
        const validatedData = requestSchema.parse(data);
        return apiClient.patchWithValidation(
          endpointBuilder(id),
          validatedData,
          responseSchema
        );
      }
    );
  };
}

/**
 * Create a typed mutation hook for deleting entities
 */
export function createDeleteEntityHook<TData>(
  endpointBuilder: (id: string) => string,
  responseSchema: z.ZodSchema<TData>
) {
  return function useDeleteEntity() {
    return useMutation<TData, string>(async (id: string) => {
      return apiClient.deleteWithValidation(
        endpointBuilder(id),
        responseSchema
      );
    });
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Extract the data type from a hook return type
 */
export type HookData<T> = T extends { data: infer U } ? U : never;

/**
 * Extract the error type from a hook return type
 */
export type HookError<T> = T extends { error: infer U } ? U : never;

/**
 * Extract the loading state from a hook return type
 */
export type HookLoading<T> = T extends { isLoading: infer U } ? U : never;

/**
 * Standard hook return shape for single entities
 */
export type UseEntityReturn<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
  refetch: () => Promise<void>;
};

/**
 * Standard hook return shape for entity lists
 */
export type UseEntityListReturn<T> = {
  data: T[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
  refetch: () => Promise<void>;
};

/**
 * Standard hook return shape for paginated entity lists
 */
export type UsePaginatedEntityListReturn<T> = {
  data: T[] | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
  refetch: () => Promise<void>;
};

/**
 * Standard mutation hook return shape
 */
export type UseMutationReturn<TData, TVariables> = {
  data: TData | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
  mutate: (variables: TVariables) => Promise<TData>;
  reset: () => void;
};
