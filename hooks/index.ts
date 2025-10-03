// Hooks Index
// Centralized exports for all data hooks

// Core data state hooks
export {
  useDataState,
  usePaginatedDataState,
  useSWRDataState,
  useSWRApiResponse,
  useSWRPaginatedResponse,
  useSWRAdapter,
  useApiResponseAdapter,
  usePaginatedAdapter,
} from './useDataState';

// User profile hooks
export {
  useUserProfile,
  useUserProfileAdapter,
  useUserProfileDirect,
} from './useUserProfile';

// Assessment hooks
export {
  useAssessment,
  useUserAssessments,
  useUserAssessment,
  useAssessmentAdapter,
  useAssessmentWithControls,
} from './useAssessment';

// Content hooks
export {
  useContentItems,
  useContentBySlug,
  useContentById,
  useContentItemsAdapter,
  useContentBySlugAdapter,
  useContentCategories,
  useContentSeries,
} from './useContent';
