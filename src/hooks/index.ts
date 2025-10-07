// Hooks Index
// Centralized exports for all data hooks
// Aligned with @/lib/contracts for type safety

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
} from './useDataState';

// User profile hooks
export {
  useCreateUserProfile,
  useDeactivateUser,
  useDeleteUser,
  useUpdateUserAssessmentScores,
  useUpdateUserProfile,
  useUserProfile,
  useUserProfileAdapter,
  useUserProfileByEmail,
  useUserProfileById,
  useUserProfileBySubdomain,
  useUserProfileDirect,
  useUsers,
} from './useUserProfile';

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
} from './useAssessment';

// Content hooks
export {
  useBulkDeleteContentItems,
  useBulkUpdateContentItems,
  useContentAnalytics,
  useContentById,
  useContentBySlug,
  useContentBySlugAdapter,
  useContentCategories,
  useContentItems,
  useContentItemsAdapter,
  useContentPerformance,
  useContentSearch,
  useContentSeries,
  useCreateContentItem,
  usePublishContentItem,
  useScheduleContentItem,
  useUpdateContentItem,
} from './useContent';

// Organization hooks
export {
  useBulkRemoveOrganizationMembers,
  useBulkUpdateOrganizationMemberships,
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
  useOrganizationSearch,
  useOrganizationStatistics,
  useOrganizations,
  useOrganizationsAdapter,
  useUpdateOrganization,
  useUpdateOrganizationMembership,
} from './useOrganization';
