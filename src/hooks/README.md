# Data Hooks Documentation

This directory contains typed data hooks for the Alan Hirsch Digital Platform, aligned with `@/lib/contracts` for type safety and consistency.

## Overview

All hooks follow a consistent pattern and return standardized data shapes. They use the centralized HTTP client and provide proper error handling, loading states, and type safety. All hooks are fully aligned with the contracts package and provide runtime validation using Zod schemas.

## Architecture

The hooks system is built on three core principles:

1. **Type Safety**: All hooks use TypeScript types derived from `@/lib/contracts`
2. **Runtime Validation**: All API responses are validated against Zod schemas
3. **Consistent Patterns**: All hooks follow the same return shape and error handling patterns

## Data Flow

```
API Request → Contract Validation → HTTP Client → Response Validation → Hook State
     ↓              ↓                    ↓              ↓                ↓
  Zod Schema → Request Validation → Typed Response → Response Schema → Component
```

## Core Data State Hooks

### `useDataState<T>`

Generic hook for managing data state with loading, error, and success states.

```typescript
const { data, isLoading, error, isSuccess, isError } = useDataState(
  () => fetchData(),
  [dependency1, dependency2]
);
```

**Return Type:**

```typescript
interface DataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
}
```

### `usePaginatedDataState<T>`

Hook for managing paginated data state.

```typescript
const { data, pagination, isLoading, error, isSuccess, isError } =
  usePaginatedDataState(
    (page, limit) => fetchPaginatedData(page, limit),
    1, // page
    10 // limit
  );
```

**Return Type:**

```typescript
interface PaginatedDataState<T> extends DataState<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

### `useSWRDataState<T>`

SWR-based hook that returns DataState format.

```typescript
const { data, isLoading, error, isSuccess, isError } = useSWRDataState<T>(
  '/api/endpoint',
  customFetcher // optional
);
```

### `useSWRApiResponse<T>`

SWR hook for API responses that wrap data in `{ data: T, success: boolean }`.

```typescript
const { data, isLoading, error, isSuccess, isError } =
  useSWRApiResponse<UserProfileResponse>('/api/user/profile');
```

### `useSWRPaginatedResponse<T>`

SWR hook for paginated API responses.

```typescript
const { data, pagination, isLoading, error, isSuccess, isError } =
  useSWRPaginatedResponse<ContentItemResponse>('/api/content');
```

### `useMutation<TData, TVariables>`

Generic mutation hook for API operations.

```typescript
const { data, isLoading, error, isSuccess, isError, mutate, reset } =
  useMutation<UserResponse, CreateUserRequest>(async variables => {
    return apiClient.post('/api/users', variables);
  });

// Usage
await mutate({ name: 'John Doe', email: 'john@example.com' });
```

**Return Type:**

```typescript
interface MutationState {
  data: TData | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  mutate: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}
```

## Entity-Specific Hooks

### User Profile Hooks

#### `useUserProfile()`

Fetches current user profile data.

```typescript
const { data: user, isLoading, error } = useUserProfile();
```

**Contract:** `UserProfileResponse`

#### `useUpdateUserProfile()`

Updates user profile data.

```typescript
const { mutate: updateProfile, isLoading, error } = useUpdateUserProfile();

await updateProfile({
  firstName: 'Jane',
  lastName: 'Smith',
  bio: 'Updated bio',
});
```

**Contract:** `UpdateUserProfileApiRequest` → `UserProfileResponse`

#### `useUpdateUserAssessmentScores()`

Updates user APEST assessment scores.

```typescript
const {
  mutate: updateScores,
  isLoading,
  error,
} = useUpdateUserAssessmentScores();

await updateScores({
  assessmentMovementAlignment: 85,
  assessmentAudienceEngagement: 90,
  assessmentContentReadiness: 75,
});
```

**Contract:** `UserAssessmentScoresUpdateApiRequest` → `UserProfileResponse`

### Assessment Hooks

#### `useAssessment(assessmentId: string)`

Fetches a specific assessment with questions.

```typescript
const { data: assessment, isLoading, error } = useAssessment('assessment-123');
```

**Contract:** `AssessmentWithQuestionsResponse`

#### `useUserAssessments(filters?: UserAssessmentFiltersRequest)`

Fetches user's assessment results with optional filtering.

```typescript
const {
  data: assessments,
  pagination,
  isLoading,
  error,
} = useUserAssessments({
  page: 1,
  limit: 10,
  assessmentType: 'apest',
  completed: true,
});
```

**Contract:** `PaginatedUserAssessmentListResponse`

#### `useStartAssessment()`

Starts a new assessment for the user.

```typescript
const { mutate: startAssessment, isLoading, error } = useStartAssessment();

await startAssessment({
  assessmentId: 'assessment-123',
});
```

**Contract:** `StartAssessmentRequest` → `UserAssessmentResponse`

#### `useSaveAssessmentResponses()`

Saves assessment responses.

```typescript
const {
  mutate: saveResponses,
  isLoading,
  error,
} = useSaveAssessmentResponses();

await saveResponses({
  userAssessmentId: 'user-assessment-123',
  responses: [
    { questionId: 'q1', answer: 'Strongly Agree' },
    { questionId: 'q2', answer: 'Agree' },
  ],
});
```

**Contract:** `SaveAssessmentResponsesRequest` → `AssessmentResponseResponse[]`

#### `useCompleteAssessment()`

Completes an assessment.

```typescript
const {
  mutate: completeAssessment,
  isLoading,
  error,
} = useCompleteAssessment();

await completeAssessment({
  userAssessmentId: 'user-assessment-123',
});
```

**Contract:** `CompleteAssessmentRequest` → `UserAssessmentResponse`

### Content Hooks

#### `useContentItems(params?: ContentQueryParams)`

Fetches content items with pagination and filtering.

```typescript
const {
  data: contentItems,
  pagination,
  isLoading,
  error,
} = useContentItems({
  page: 1,
  limit: 10,
  status: 'published',
  category: 'articles',
});
```

**Contract:** `PaginatedContentItemListResponse`

#### `useContentById(contentId: string)`

Fetches a specific content item by ID.

```typescript
const { data: content, isLoading, error } = useContentById('content-123');
```

**Contract:** `ContentItemResponse`

#### `useContentBySlug(slug: string)`

Fetches a specific content item by slug.

```typescript
const { data: content, isLoading, error } = useContentBySlug('my-article-slug');
```

**Contract:** `ContentItemResponse`

#### `useCreateContentItem()`

Creates a new content item.

```typescript
const { mutate: createContent, isLoading, error } = useCreateContentItem();

await createContent({
  title: 'My Article',
  content: 'Article content...',
  contentType: 'article',
  status: 'draft',
});
```

**Contract:** `CreateContentItemApiRequest` → `ContentItemResponse`

#### `useUpdateContentItem()`

Updates an existing content item.

```typescript
const { mutate: updateContent, isLoading, error } = useUpdateContentItem();

await updateContent({
  id: 'content-123',
  title: 'Updated Title',
  content: 'Updated content...',
});
```

**Contract:** `UpdateContentItemApiRequest` → `ContentItemResponse`

#### `usePublishContentItem()`

Publishes a content item.

```typescript
const { mutate: publishContent, isLoading, error } = usePublishContentItem();

await publishContent({
  id: 'content-123',
  publishedAt: new Date().toISOString(),
});
```

**Contract:** `PublishContentItemApiRequest` → `ContentItemResponse`

### Organization Hooks

#### `useOrganizations(params?: OrganizationQueryParams)`

Fetches organizations with pagination and filtering.

```typescript
const {
  data: organizations,
  pagination,
  isLoading,
  error,
} = useOrganizations({
  page: 1,
  limit: 10,
  search: 'church',
  type: 'denomination',
});
```

**Contract:** `PaginatedOrganizationListResponse`

#### `useOrganization(organizationId: string)`

Fetches a specific organization by ID.

```typescript
const { data: organization, isLoading, error } = useOrganization('org-123');
```

**Contract:** `OrganizationResponse`

#### `useOrganizationBySubdomain(subdomain: string)`

Fetches organization by subdomain.

```typescript
const {
  data: organization,
  isLoading,
  error,
} = useOrganizationBySubdomain('my-church');
```

**Contract:** `OrganizationResponse`

#### `useOrganizationMembers(organizationId: string, params?: MemberQueryParams)`

Fetches organization members.

```typescript
const {
  data: members,
  pagination,
  isLoading,
  error,
} = useOrganizationMembers('org-123', {
  page: 1,
  limit: 10,
  role: 'admin',
  status: 'active',
});
```

**Contract:** `PaginatedOrganizationMembershipListResponse`

#### `useCreateOrganization()`

Creates a new organization.

```typescript
const {
  mutate: createOrganization,
  isLoading,
  error,
} = useCreateOrganization();

await createOrganization({
  name: 'My Church',
  organizationType: 'church',
  description: 'A local church community',
});
```

**Contract:** `CreateOrganizationApiRequest` → `OrganizationResponse`

#### `useUpdateOrganization()`

Updates an existing organization.

```typescript
const {
  mutate: updateOrganization,
  isLoading,
  error,
} = useUpdateOrganization();

await updateOrganization({
  id: 'org-123',
  name: 'Updated Church Name',
  description: 'Updated description',
});
```

**Contract:** `UpdateOrganizationApiRequest` → `OrganizationResponse`

#### `useInviteUserToOrganization()`

Invites a user to an organization.

```typescript
const { mutate: inviteUser, isLoading, error } = useInviteUserToOrganization();

await inviteUser({
  organizationId: 'org-123',
  email: 'user@example.com',
  role: 'member',
});
```

**Contract:** `InviteUserToOrganizationApiRequest` → `OrganizationMembershipResponse`

## Adapter Hooks

For backward compatibility, adapter hooks are provided that return data in the old format:

- `useUserProfileAdapter()` - Returns `{ data: { data, success }, error, isLoading }`
- `useContentItemsAdapter()` - Returns `{ items, pagination, error, isLoading }`
- `useOrganizationAdapter()` - Returns `{ organization, error, isLoading }`

## Error Handling

All hooks use the centralized error handling system:

- **Network errors** are automatically retried (configurable)
- **Validation errors** are not retried
- **HTTP errors** include status codes and detailed error information
- **Error messages** are user-friendly and localized

## Type Safety

All hooks are fully typed using TypeScript and `@/lib/contracts`:

- Request/response types are enforced at compile time
- API contracts are validated against schemas
- IntelliSense support for all parameters and return values
- No `any` types used anywhere

## Caching

Hooks use SWR for intelligent caching:

- Automatic revalidation on focus
- Background updates
- Optimistic updates for mutations
- Cache invalidation after mutations

## Usage Examples

### Basic Data Fetching

```typescript
import { useUserProfile, useContentItems } from '@/hooks';

function UserDashboard() {
  const { data: user, isLoading: userLoading, error: userError } = useUserProfile();
  const { data: content, isLoading: contentLoading, error: contentError } = useContentItems({
    page: 1,
    limit: 5,
    status: 'published'
  });

  if (userLoading || contentLoading) return <LoadingSpinner />;
  if (userError || contentError) return <ErrorMessage />;

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <ContentList items={content} />
    </div>
  );
}
```

### Mutations with Error Handling

```typescript
import { useUpdateUserProfile } from '@/hooks';

function ProfileForm() {
  const { mutate: updateProfile, isLoading, error, isSuccess } = useUpdateUserProfile();

  const handleSubmit = async (formData) => {
    try {
      await updateProfile(formData);
      // Success handled by isSuccess state
    } catch (error) {
      // Error handled by error state
      console.error('Update failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
      {error && <div className="error">{error}</div>}
      {isSuccess && <div className="success">Profile updated!</div>}
    </form>
  );
}
```

### Pagination

```typescript
import { useContentItems } from '@/hooks';

function ContentList() {
  const [page, setPage] = useState(1);
  const { data: content, pagination, isLoading, error } = useContentItems({
    page,
    limit: 10
  });

  return (
    <div>
      <ContentGrid items={content} />
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      )}
    </div>
  );
}
```

## Best Practices

1. **Always handle loading and error states** in your components
2. **Use the appropriate hook** for your data needs (single item vs. list vs. paginated)
3. **Leverage TypeScript** for compile-time type checking
4. **Use mutations for data changes** and queries for data fetching
5. **Handle optimistic updates** when appropriate for better UX
6. **Invalidate cache** after mutations to keep data fresh
7. **Use adapter hooks** only when migrating from old code

## Migration Guide

When migrating from old hooks to new ones:

1. Replace manual fetch calls with typed hooks
2. Update component prop types to match new return shapes
3. Use adapter hooks for backward compatibility during transition
4. Remove manual error handling (now handled by hooks)
5. Update loading state handling to use new boolean flags

## Hook Catalog

### User Profile Hooks

| Hook                                   | Purpose                    | Parameters                   | Return Type                                                      | Contract                                             |
| -------------------------------------- | -------------------------- | ---------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------- |
| `useUserProfile()`                     | Fetch current user profile | None                         | `DataState<UserProfileResponse>`                                 | `UserProfileResponse`                                |
| `useUserProfileById(id)`               | Fetch user by ID           | `id: string`                 | `DataState<UserProfileResponse>`                                 | `UserProfileResponse`                                |
| `useUserProfileByEmail(email)`         | Fetch user by email        | `email: string`              | `DataState<UserProfileResponse>`                                 | `UserProfileResponse`                                |
| `useUserProfileBySubdomain(subdomain)` | Fetch user by subdomain    | `subdomain: string`          | `DataState<UserProfileResponse>`                                 | `UserProfileResponse`                                |
| `useUsers(params?)`                    | Fetch users list           | `params?: ListUsersApiQuery` | `PaginatedDataState<UserProfileResponse>`                        | `PaginatedUserListResponse`                          |
| `useCreateUserProfile()`               | Create new user profile    | None                         | `MutationState<UserProfileResponse, CreateUserProfile>`          | `CreateUserProfile` → `UserProfileResponse`          |
| `useUpdateUserProfile()`               | Update user profile        | None                         | `MutationState<UserProfileResponse, UpdateUserProfile>`          | `UpdateUserProfile` → `UserProfileResponse`          |
| `useUpdateUserAssessmentScores()`      | Update APEST scores        | None                         | `MutationState<UserProfileResponse, UserAssessmentScoresUpdate>` | `UserAssessmentScoresUpdate` → `UserProfileResponse` |
| `useDeleteUser()`                      | Delete user                | None                         | `MutationState<{success: boolean}, string>`                      | `string` → `{success: boolean}`                      |
| `useDeactivateUser()`                  | Deactivate user            | None                         | `MutationState<UserProfileResponse, string>`                     | `string` → `UserProfileResponse`                     |

### Assessment Hooks

| Hook                           | Purpose                         | Parameters                               | Return Type                                                                   | Contract                                                          |
| ------------------------------ | ------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `useAssessment(id)`            | Fetch assessment with questions | `id: string`                             | `DataState<AssessmentWithQuestionsResponse>`                                  | `AssessmentWithQuestionsResponse`                                 |
| `useAssessments(filters?)`     | Fetch assessments list          | `filters?: AssessmentSearchRequest`      | `PaginatedDataState<AssessmentResponse>`                                      | `PaginatedAssessmentListResponse`                                 |
| `useUserAssessment(id)`        | Fetch user assessment           | `id: string`                             | `DataState<UserAssessmentResponse>`                                           | `UserAssessmentResponse`                                          |
| `useUserAssessments(filters?)` | Fetch user's assessments        | `filters?: UserAssessmentFiltersRequest` | `PaginatedDataState<UserAssessmentResponse>`                                  | `PaginatedUserAssessmentListResponse`                             |
| `useAssessmentResponses(id)`   | Fetch assessment responses      | `id: string`                             | `DataState<AssessmentResponseResponse[]>`                                     | `AssessmentResponseResponse[]`                                    |
| `useCreateAssessment()`        | Create new assessment           | None                                     | `MutationState<AssessmentEntity, CreateAssessment>`                           | `CreateAssessment` → `AssessmentEntity`                           |
| `useUpdateAssessment()`        | Update assessment               | None                                     | `MutationState<AssessmentEntity, UpdateAssessment>`                           | `UpdateAssessment` → `AssessmentEntity`                           |
| `useDeleteAssessment()`        | Delete assessment               | None                                     | `MutationState<{success: boolean}, string>`                                   | `string` → `{success: boolean}`                                   |
| `useStartAssessment()`         | Start user assessment           | None                                     | `MutationState<UserAssessmentResponse, StartAssessmentRequest>`               | `StartAssessmentRequest` → `UserAssessmentResponse`               |
| `useSaveAssessmentResponses()` | Save assessment responses       | None                                     | `MutationState<AssessmentResponseResponse[], SaveAssessmentResponsesRequest>` | `SaveAssessmentResponsesRequest` → `AssessmentResponseResponse[]` |
| `useCompleteAssessment()`      | Complete assessment             | None                                     | `MutationState<UserAssessmentResponse, CompleteAssessmentRequest>`            | `CompleteAssessmentRequest` → `UserAssessmentResponse`            |

### Content Hooks

| Hook                                | Purpose                   | Parameters                                           | Return Type                                                      | Contract                                             |
| ----------------------------------- | ------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------- |
| `useContentItems(params?)`          | Fetch content items       | `params?: ContentItemQuery`                          | `PaginatedDataState<ContentItemResponse>`                        | `PaginatedContentItemListResponse`                   |
| `useContentById(id)`                | Fetch content by ID       | `id: string`                                         | `DataState<ContentItemResponse>`                                 | `ContentItemResponse`                                |
| `useContentBySlug(slug)`            | Fetch content by slug     | `slug: string`                                       | `DataState<ContentItemResponse>`                                 | `ContentItemResponse`                                |
| `useContentCategories()`            | Fetch content categories  | None                                                 | `DataState<ContentCategoryResponse[]>`                           | `ContentCategoryResponse[]`                          |
| `useContentSeries()`                | Fetch content series      | None                                                 | `DataState<ContentSeriesResponse[]>`                             | `ContentSeriesResponse[]`                            |
| `useCreateContentItem()`            | Create content item       | None                                                 | `MutationState<ContentItemResponse, CreateContentItem>`          | `CreateContentItem` → `ContentItemResponse`          |
| `useUpdateContentItem()`            | Update content item       | None                                                 | `MutationState<ContentItemResponse, UpdateContentItem>`          | `UpdateContentItem` → `ContentItemResponse`          |
| `usePublishContentItem()`           | Publish content item      | None                                                 | `MutationState<ContentItemResponse, PublishContentItemRequest>`  | `PublishContentItemRequest` → `ContentItemResponse`  |
| `useScheduleContentItem()`          | Schedule content item     | None                                                 | `MutationState<ContentItemResponse, ScheduleContentItemRequest>` | `ScheduleContentItemRequest` → `ContentItemResponse` |
| `useContentAnalytics(id)`           | Fetch content analytics   | `id: string`                                         | `DataState<ContentAnalyticsResponse>`                            | `ContentAnalyticsResponse`                           |
| `useContentPerformance(id)`         | Fetch content performance | `id: string`                                         | `DataState<ContentPerformanceResponse>`                          | `ContentPerformanceResponse`                         |
| `useContentSearch(query, filters?)` | Search content            | `query: string, filters?: Partial<ContentItemQuery>` | `PaginatedDataState<ContentItemResponse>`                        | `PaginatedContentItemListResponse`                   |
| `useBulkUpdateContentItems()`       | Bulk update content       | None                                                 | `MutationState<ContentItemResponse[], BulkUpdateRequest>`        | `BulkUpdateRequest` → `ContentItemResponse[]`        |
| `useBulkDeleteContentItems()`       | Bulk delete content       | None                                                 | `MutationState<{deletedCount: number}, BulkDeleteRequest>`       | `BulkDeleteRequest` → `{deletedCount: number}`       |

### Organization Hooks

| Hook                                      | Purpose                         | Parameters                                            | Return Type                                                                   | Contract                                                          |
| ----------------------------------------- | ------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `useOrganizations(params?)`               | Fetch organizations             | `params?: OrganizationQuery`                          | `PaginatedDataState<OrganizationResponse>`                                    | `PaginatedOrganizationListResponse`                               |
| `useOrganization(id)`                     | Fetch organization by ID        | `id: string`                                          | `DataState<OrganizationResponse>`                                             | `OrganizationResponse`                                            |
| `useOrganizationBySubdomain(subdomain)`   | Fetch organization by subdomain | `subdomain: string`                                   | `DataState<OrganizationResponse>`                                             | `OrganizationResponse`                                            |
| `useOrganizationMembers(id, params?)`     | Fetch organization members      | `id: string, params?: OrganizationMembershipQuery`    | `PaginatedDataState<OrganizationMembershipResponse>`                          | `PaginatedOrganizationMembershipListResponse`                     |
| `useOrganizationMemberships(id, params?)` | Fetch organization memberships  | `id: string, params?: OrganizationMembershipQuery`    | `PaginatedDataState<OrganizationMembershipResponse>`                          | `PaginatedOrganizationMembershipListResponse`                     |
| `useOrganizationDashboard(id)`            | Fetch organization dashboard    | `id: string`                                          | `DataState<OrganizationDashboardResponse>`                                    | `OrganizationDashboardResponse`                                   |
| `useOrganizationStatistics(id)`           | Fetch organization statistics   | `id: string`                                          | `DataState<OrganizationStatisticsResponse>`                                   | `OrganizationStatisticsResponse`                                  |
| `useCreateOrganization()`                 | Create organization             | None                                                  | `MutationState<OrganizationResponse, CreateOrganization>`                     | `CreateOrganization` → `OrganizationResponse`                     |
| `useUpdateOrganization()`                 | Update organization             | None                                                  | `MutationState<OrganizationResponse, UpdateOrganization>`                     | `UpdateOrganization` → `OrganizationResponse`                     |
| `useCreateOrganizationMembership()`       | Create membership               | None                                                  | `MutationState<OrganizationMembershipResponse, CreateOrganizationMembership>` | `CreateOrganizationMembership` → `OrganizationMembershipResponse` |
| `useUpdateOrganizationMembership()`       | Update membership               | None                                                  | `MutationState<OrganizationMembershipResponse, UpdateOrganizationMembership>` | `UpdateOrganizationMembership` → `OrganizationMembershipResponse` |
| `useInviteUserToOrganization()`           | Invite user to organization     | None                                                  | `MutationState<OrganizationMembershipResponse, InviteUserRequest>`            | `InviteUserRequest` → `OrganizationMembershipResponse`            |
| `useOrganizationSearch(query, filters?)`  | Search organizations            | `query: string, filters?: Partial<OrganizationQuery>` | `PaginatedDataState<OrganizationResponse>`                                    | `PaginatedOrganizationListResponse`                               |
| `useBulkUpdateOrganizationMemberships()`  | Bulk update memberships         | None                                                  | `MutationState<OrganizationMembershipResponse[], BulkUpdateRequest>`          | `BulkUpdateRequest` → `OrganizationMembershipResponse[]`          |
| `useBulkRemoveOrganizationMembers()`      | Bulk remove members             | None                                                  | `MutationState<{removedCount: number}, BulkRemoveRequest>`                    | `BulkRemoveRequest` → `{removedCount: number}`                    |

## Type Definitions

### Core Hook Return Types

```typescript
// Standard data state for single entities
interface DataState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
  refetch: () => Promise<void>;
}

// Standard data state for paginated lists
interface PaginatedDataState<T> extends DataState<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
}

// Standard mutation state
interface MutationState<TData, TVariables> {
  data: TData | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
  mutate: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}
```

## Error Handling

All hooks provide consistent error handling with the following error types:

- **ValidationError**: Request/response data doesn't match schema
- **NetworkError**: Network connectivity issues
- **TimeoutError**: Request timeout
- **ApiClientError**: General API errors with status codes

## Troubleshooting

### Common Issues

1. **Type errors**: Ensure you're importing types from `@/lib/contracts`
2. **Cache issues**: Use SWR's `mutate` function to invalidate cache
3. **Network errors**: Check API endpoint configuration and network connectivity
4. **Validation errors**: Verify request data matches the expected schema

### Debug Mode

Enable debug logging by setting `NODE_ENV=development`:

```typescript
// API requests and responses will be logged to console
const { data } = useUserProfile(); // Check console for request/response logs
```

### Validation Errors

When validation errors occur, check the console for detailed error information:

```typescript
// Example validation error handling
const { data, error } = useUserProfile();

if (error && error.includes('validation')) {
  console.error('Validation failed:', error);
  // Check the request/response data format
}
```
