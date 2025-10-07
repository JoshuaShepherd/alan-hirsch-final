// User Profile Data Hooks
// Specialized hooks for user profile data management
// Aligned with @/lib/contracts for type safety

import type {
  CreateUserProfile,
  ListUsersApiQuery,
  UpdateUserAssessmentScoresApiRequest,
  UpdateUserProfileApiRequest,
  UserProfileResponse,
} from '@/lib/contracts';
import {
  createUserProfileSchema,
  updateUserProfileSchema,
  userProfileResponseSchema,
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
// USER PROFILE HOOKS
// ============================================================================

/**
 * Hook for fetching user profile data
 * Returns DataState<UserProfileResponse> format
 */
export function useUserProfile() {
  const fetcher = createApiResponseFetcher(userProfileResponseSchema);
  return useSWRApiResponse<UserProfileResponse>(
    API_ENDPOINTS.users.profile,
    fetcher
  );
}

/**
 * Adapter hook for components expecting the old format
 * Returns { data: { data: UserProfileResponse, success: boolean }, error, isLoading }
 */
export function useUserProfileAdapter() {
  const dataState = useUserProfile();

  return {
    data: dataState.isSuccess
      ? {
          data: dataState.data,
          success: true,
        }
      : undefined,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Hook for fetching user profile with direct access to user data
 * Returns { user: UserProfileResponse | null, ...dataState }
 */
export function useUserProfileDirect() {
  const dataState = useUserProfile();

  return {
    user: dataState.data,
    ...dataState,
  };
}

// ============================================================================
// USER PROFILE MUTATION HOOKS
// ============================================================================

/**
 * Hook for updating user profile
 * Returns mutation functions and state
 */
export function useUpdateUserProfile() {
  return useMutation<UserProfileResponse, UpdateUserProfileApiRequest>(
    async data => {
      // Validate request data
      const validatedData = updateUserProfileSchema.parse(data);

      // Make API call with validation
      return apiClient.patchWithValidation(
        API_ENDPOINTS.users.updateProfile,
        validatedData,
        userProfileResponseSchema
      );
    }
  );
}

/**
 * Hook for updating user assessment scores
 * Returns mutation functions and state
 */
export function useUpdateUserAssessmentScores() {
  return useMutation<UserProfileResponse, UpdateUserAssessmentScoresApiRequest>(
    async data => {
      // Make API call with validation
      return apiClient.patchWithValidation(
        API_ENDPOINTS.users.assessmentScores,
        data,
        userProfileResponseSchema
      );
    }
  );
}

// ============================================================================
// ADDITIONAL USER PROFILE HOOKS
// ============================================================================

/**
 * Hook for creating a new user profile
 * Returns mutation functions and state
 */
export function useCreateUserProfile() {
  return useMutation<UserProfileResponse, CreateUserProfile>(async data => {
    // Validate request data
    const validatedData = createUserProfileSchema.parse(data);

    // Make API call with validation
    return apiClient.postWithValidation(
      API_ENDPOINTS.users.list,
      validatedData,
      userProfileResponseSchema
    );
  });
}

/**
 * Hook for fetching user profile by ID
 * Returns DataState<UserProfileResponse> format
 */
export function useUserProfileById(userId: string) {
  const fetcher = createApiResponseFetcher(userProfileResponseSchema);
  return useSWRApiResponse<UserProfileResponse>(
    userId ? API_ENDPOINTS.users.byId(userId) : null,
    fetcher
  );
}

/**
 * Hook for fetching user profile by email
 * Returns DataState<UserProfileResponse> format
 */
export function useUserProfileByEmail(email: string) {
  const fetcher = createApiResponseFetcher(userProfileResponseSchema);
  const url = email
    ? `${API_ENDPOINTS.users.list}?email=${encodeURIComponent(email)}`
    : null;
  return useSWRApiResponse<UserProfileResponse>(url, fetcher);
}

/**
 * Hook for fetching user profile by subdomain
 * Returns DataState<UserProfileResponse> format
 */
export function useUserProfileBySubdomain(subdomain: string) {
  const fetcher = createApiResponseFetcher(userProfileResponseSchema);
  const url = subdomain
    ? `${API_ENDPOINTS.users.list}?subdomain=${encodeURIComponent(subdomain)}`
    : null;
  return useSWRApiResponse<UserProfileResponse>(url, fetcher);
}

// ============================================================================
// ADDITIONAL USER HOOKS
// ============================================================================

/**
 * Hook for fetching users list with pagination and filtering
 * Returns PaginatedDataState<UserProfileResponse> format
 */
export function useUsers(params?: ListUsersApiQuery) {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_ENDPOINTS.users.list}${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(userProfileResponseSchema);
  return useSWRPaginatedResponse<UserProfileResponse>(url, fetcher);
}

/**
 * Hook for deleting a user
 * Returns mutation functions and state
 */
export function useDeleteUser() {
  return useMutation<{ success: boolean }, string>(async userId => {
    return apiClient.deleteWithValidation(
      API_ENDPOINTS.users.byId(userId),
      z.object({ success: z.boolean() })
    );
  });
}

/**
 * Hook for deactivating a user
 * Returns mutation functions and state
 */
export function useDeactivateUser() {
  return useMutation<UserProfileResponse, string>(async userId => {
    return apiClient.patchWithValidation(
      API_ENDPOINTS.users.byId(userId),
      { accountStatus: 'inactive' },
      userProfileResponseSchema
    );
  });
}
