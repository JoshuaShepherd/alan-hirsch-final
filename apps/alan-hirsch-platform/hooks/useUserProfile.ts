// User Profile Data Hooks
// Specialized hooks for user profile data management

import { useSWRApiResponse } from './useDataState';
import type { UserProfile } from '@platform/shared/contracts';

// ============================================================================
// USER PROFILE HOOKS
// ============================================================================

/**
 * Hook for fetching user profile data
 * Returns DataState<UserProfile> format
 */
export function useUserProfile() {
  return useSWRApiResponse<UserProfile>('/api/user/profile');
}

/**
 * Adapter hook for components expecting the old format
 * Returns { data: { data: UserProfile, success: boolean }, error, isLoading }
 */
export function useUserProfileAdapter() {
  const dataState = useUserProfile();
  
  return {
    data: dataState.isSuccess ? { 
      data: dataState.data, 
      success: true 
    } : undefined,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Hook for fetching user profile with direct access to user data
 * Returns { user: UserProfile | null, ...dataState }
 */
export function useUserProfileDirect() {
  const dataState = useUserProfile();
  
  return {
    user: dataState.data,
    ...dataState,
  };
}
