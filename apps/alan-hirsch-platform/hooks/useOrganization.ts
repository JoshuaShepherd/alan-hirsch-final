// Organization Data Hooks
// Specialized hooks for organization data management
// Aligned with @platform/contracts for type safety

import type {
  CreateOrganizationApiRequest,
  CreateOrganizationMembershipApiRequest,
  InviteUserToOrganizationApiRequest,
  OrganizationMembershipQuery,
  OrganizationMembershipResponse,
  OrganizationQuery,
  OrganizationResponse,
  UpdateOrganizationApiRequest,
  UpdateOrganizationMembership,
  UpdateOrganizationMembershipApiRequest,
} from '@platform/contracts';
import {
  createOrganizationMembershipSchema,
  createOrganizationSchema,
  organizationMembershipResponseSchema,
  organizationResponseSchema,
  updateOrganizationMembershipSchema,
  updateOrganizationSchema,
} from '@platform/contracts';
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
// ORGANIZATION HOOKS
// ============================================================================

/**
 * Hook for fetching organizations with pagination and filtering
 * Returns PaginatedDataState<OrganizationResponse> format
 */
export function useOrganizations(params?: OrganizationQuery) {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_ENDPOINTS.organizations.list}${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(organizationResponseSchema);
  return useSWRPaginatedResponse<OrganizationResponse>(url, fetcher);
}

/**
 * Hook for fetching a specific organization by ID
 * Returns DataState<OrganizationResponse> format
 */
export function useOrganization(organizationId: string) {
  const fetcher = createApiResponseFetcher(organizationResponseSchema);
  return useSWRApiResponse<OrganizationResponse>(
    organizationId ? API_ENDPOINTS.organizations.byId(organizationId) : null,
    fetcher
  );
}

/**
 * Hook for fetching organization by subdomain
 * Returns DataState<OrganizationResponse> format
 */
export function useOrganizationBySubdomain(subdomain: string) {
  const fetcher = createApiResponseFetcher(organizationResponseSchema);
  return useSWRApiResponse<OrganizationResponse>(
    subdomain ? API_ENDPOINTS.organizations.bySubdomain(subdomain) : null,
    fetcher
  );
}

// ============================================================================
// ORGANIZATION MUTATION HOOKS
// ============================================================================

/**
 * Hook for creating a new organization
 * Returns mutation functions and state
 */
export function useCreateOrganization() {
  return useMutation<OrganizationResponse, CreateOrganizationApiRequest>(
    async data => {
      // Validate request data
      const validatedData = createOrganizationSchema.parse(data);

      // Make API call with validation
      return apiClient.postWithValidation(
        API_ENDPOINTS.organizations.list,
        validatedData,
        organizationResponseSchema
      );
    }
  );
}

/**
 * Hook for updating an existing organization
 * Returns mutation functions and state
 */
export function useUpdateOrganization() {
  return useMutation<OrganizationResponse, UpdateOrganizationApiRequest>(
    async data => {
      // Validate request data
      const validatedData = updateOrganizationSchema.parse(data);

      // Make API call with validation
      return apiClient.patchWithValidation(
        API_ENDPOINTS.organizations.byId(data.id),
        validatedData,
        organizationResponseSchema
      );
    }
  );
}

// ============================================================================
// ORGANIZATION MEMBERSHIP HOOKS
// ============================================================================

/**
 * Hook for fetching organization members
 * Returns PaginatedDataState<OrganizationMembershipResponse> format
 */
export function useOrganizationMembers(
  organizationId: string,
  params?: OrganizationMembershipQuery
) {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_ENDPOINTS.organizations.members(organizationId)}${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(organizationMembershipResponseSchema);
  return useSWRPaginatedResponse<OrganizationMembershipResponse>(
    organizationId ? url : null,
    fetcher
  );
}

/**
 * Hook for fetching organization memberships
 * Returns PaginatedDataState<OrganizationMembershipResponse> format
 */
export function useOrganizationMemberships(
  organizationId: string,
  params?: OrganizationMembershipQuery
) {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_ENDPOINTS.organizations.memberships(organizationId)}${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(organizationMembershipResponseSchema);
  return useSWRPaginatedResponse<OrganizationMembershipResponse>(
    organizationId ? url : null,
    fetcher
  );
}

// ============================================================================
// ORGANIZATION MEMBERSHIP MUTATION HOOKS
// ============================================================================

/**
 * Hook for creating a new organization membership
 * Returns mutation functions and state
 */
export function useCreateOrganizationMembership() {
  return useMutation<
    OrganizationMembershipResponse,
    CreateOrganizationMembershipApiRequest
  >(async data => {
    // Validate request data
    const validatedData = createOrganizationMembershipSchema.parse(data);

    // Make API call with validation
    return apiClient.postWithValidation(
      API_ENDPOINTS.organizations.memberships(data.organizationId),
      validatedData,
      organizationMembershipResponseSchema
    );
  });
}

/**
 * Hook for updating an organization membership
 * Returns mutation functions and state
 */
export function useUpdateOrganizationMembership() {
  return useMutation<
    OrganizationMembershipResponse,
    UpdateOrganizationMembershipApiRequest
  >(async data => {
    // Validate request data
    const validatedData = updateOrganizationMembershipSchema.parse(data);

    // Make API call with validation
    return apiClient.patchWithValidation(
      API_ENDPOINTS.organizations.memberships(data.organizationId) +
        `/${data.id}`,
      validatedData,
      organizationMembershipResponseSchema
    );
  });
}

/**
 * Hook for inviting a user to an organization
 * Returns mutation functions and state
 */
export function useInviteUserToOrganization() {
  return useMutation<
    OrganizationMembershipResponse,
    InviteUserToOrganizationApiRequest
  >(async data => {
    // Make API call with validation
    return apiClient.postWithValidation(
      API_ENDPOINTS.organizations.invite(data.organizationId),
      data,
      organizationMembershipResponseSchema
    );
  });
}

// ============================================================================
// ORGANIZATION DASHBOARD & ANALYTICS HOOKS
// ============================================================================

/**
 * Hook for fetching organization dashboard data
 * Returns DataState<OrganizationDashboardResponse> format
 */
export function useOrganizationDashboard(organizationId: string) {
  const fetcher = createApiResponseFetcher(
    z.object({
      organization: organizationResponseSchema,
      memberCount: z.number(),
      activeMembers: z.number(),
      recentActivity: z.array(
        z.object({
          id: z.string(),
          type: z.string(),
          description: z.string(),
          timestamp: z.string().datetime(),
        })
      ),
      statistics: z.object({
        totalMembers: z.number(),
        activeMembers: z.number(),
        pendingInvitations: z.number(),
        contentItems: z.number(),
        assessments: z.number(),
      }),
    })
  );

  return useSWRApiResponse(
    organizationId
      ? API_ENDPOINTS.organizations.dashboard(organizationId)
      : null,
    fetcher
  );
}

/**
 * Hook for fetching organization statistics
 * Returns DataState<OrganizationStatisticsResponse> format
 */
export function useOrganizationStatistics(organizationId: string) {
  const fetcher = createApiResponseFetcher(
    z.object({
      memberCount: z.number(),
      activeMembers: z.number(),
      pendingInvitations: z.number(),
      contentItems: z.number(),
      assessments: z.number(),
      engagementScore: z.number(),
      growthRate: z.number(),
      topContent: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          viewCount: z.number(),
        })
      ),
      memberActivity: z.array(
        z.object({
          date: z.string(),
          activeMembers: z.number(),
          newMembers: z.number(),
        })
      ),
    })
  );

  return useSWRApiResponse(
    organizationId
      ? API_ENDPOINTS.organizations.statistics(organizationId)
      : null,
    fetcher
  );
}

// ============================================================================
// ADAPTER HOOKS (for backward compatibility)
// ============================================================================

/**
 * Adapter hook for components expecting the old format
 * Returns { organizations: OrganizationResponse[], pagination, error, isLoading }
 */
export function useOrganizationsAdapter(params?: OrganizationQuery) {
  const dataState = useOrganizations(params);

  return {
    organizations: dataState.data || [],
    pagination: dataState.pagination,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Adapter hook for organization with old format
 * Returns { organization: OrganizationResponse | null, error, isLoading }
 */
export function useOrganizationAdapter(organizationId: string) {
  const dataState = useOrganization(organizationId);

  return {
    organization: dataState.data,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

/**
 * Adapter hook for organization members with old format
 * Returns { members: OrganizationMembershipResponse[], pagination, error, isLoading }
 */
export function useOrganizationMembersAdapter(
  organizationId: string,
  params?: OrganizationMembershipQuery
) {
  const dataState = useOrganizationMembers(organizationId, params);

  return {
    members: dataState.data || [],
    pagination: dataState.pagination,
    error: dataState.error,
    isLoading: dataState.isLoading,
  };
}

// ============================================================================
// ORGANIZATION SEARCH HOOKS
// ============================================================================

/**
 * Hook for searching organizations
 * Returns PaginatedDataState<OrganizationResponse> format
 */
export function useOrganizationSearch(
  query: string,
  filters?: Partial<OrganizationQuery>
) {
  const params = {
    search: query,
    ...filters,
  };

  const queryString = buildQueryString(params);
  const url = `${API_ENDPOINTS.organizations.list}/search${queryString ? `?${queryString}` : ''}`;

  const fetcher = createPaginatedFetcher(organizationResponseSchema);
  return useSWRPaginatedResponse<OrganizationResponse>(url, fetcher);
}

// ============================================================================
// ORGANIZATION BULK OPERATIONS
// ============================================================================

/**
 * Hook for bulk updating organization memberships
 * Returns mutation functions and state
 */
export function useBulkUpdateOrganizationMemberships() {
  return useMutation<
    OrganizationMembershipResponse[],
    {
      organizationId: string;
      updates: Array<{
        id: string;
        updates: Partial<UpdateOrganizationMembership>;
      }>;
    }
  >(async data => {
    // Make API call with validation
    return apiClient.patchWithValidation(
      API_ENDPOINTS.organizations.memberships(data.organizationId) + '/bulk',
      data,
      z.array(organizationMembershipResponseSchema)
    );
  });
}

/**
 * Hook for bulk removing organization members
 * Returns mutation functions and state
 */
export function useBulkRemoveOrganizationMembers() {
  return useMutation<
    { removedCount: number },
    {
      organizationId: string;
      memberIds: string[];
    }
  >(async data => {
    // Make API call with validation
    return apiClient.postWithValidation(
      API_ENDPOINTS.organizations.members(data.organizationId) + '/bulk-remove',
      data,
      z.object({
        removedCount: z.number(),
      })
    );
  });
}
