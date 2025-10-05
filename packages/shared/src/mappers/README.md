# Mappers Package

The mappers package provides pure, type-safe data transformation functions that serve as the single source of truth for converting between database entities (Drizzle types) and DTOs (from contracts/).

## Purpose

Each mapper is responsible for:

- **Data Transformation**: Converting data between different formats (database rows ↔ DTOs)
- **Type Safety**: Ensuring all transformations are type-safe and validated
- **Validation**: Using Zod schemas for runtime validation in dev/test environments
- **Pure Functions**: No shared mutable state, making them easily testable

## Architecture

### Data Flow

```
Database (Drizzle) ←→ Mappers ←→ DTOs (Contracts)
     ↑                    ↑              ↑
  snake_case         Transformation    camelCase
  Date objects       Logic            ISO strings
  null values                         undefined
```

### Direction Mapping

- **toDTO()**: Database row → DTO (for API responses)
- **fromDTO()**: DTO → Database insert/update format

## Available Mappers

### User Profiles (`user-profiles.ts`)

**Purpose**: Transform user profile data between database and API formats.

**Functions**:

- `toUserProfileEntity(row: UserProfileRow): UserProfileEntity`
- `toUserProfileResponseDTO(row: UserProfileRow): UserProfileResponse`
- `fromCreateUserProfile(data: CreateUserProfile): NewUserProfileRow`
- `fromUpdateUserProfile(data: UpdateUserProfile): Partial<UserProfileRow>`

**Key Transformations**:

- Snake_case to camelCase field mapping
- Date objects to ISO strings
- Null values to undefined for optional fields
- Computed fields: `isActive`, `hasCompletedOnboarding`, `fullName`, `displayNameOrFullName`
- APEST gift calculation from assessment scores

### Organizations (`organizations.ts`)

**Purpose**: Transform organization and membership data.

**Functions**:

- `toOrganizationEntity(row: OrganizationRow): OrganizationEntity`
- `toOrganizationResponseDTO(row: OrganizationRow): OrganizationResponse`
- `toOrganizationMembershipEntity(row: OrganizationMembershipRow): OrganizationMembershipEntity`
- `toOrganizationMembershipResponseDTO(row: OrganizationMembershipRow): OrganizationMembershipResponse`

**Key Transformations**:

- Date objects to ISO strings for `joinedAt`, `invitedAt`
- Null handling for optional organization fields
- Membership status and role mapping

### Content (`content.ts`)

**Purpose**: Transform content items, categories, and series data.

**Functions**:

- `toContentItemEntity(row: ContentItemRow): ContentItemEntity`
- `toContentItemResponseDTO(row: ContentItemRow): ContentItemResponse`
- `toContentCategoryEntity(row: ContentCategoryRow): ContentCategoryEntity`
- `toContentCategoryResponseDTO(row: ContentCategoryRow): ContentCategoryResponse`
- `toContentSeriesEntity(row: ContentSeriesRow): ContentSeriesEntity`
- `toContentSeriesResponseDTO(row: ContentSeriesRow): ContentSeriesResponse`

**Key Transformations**:

- Boolean null handling (`aiEnhanced`, `isScheduled`)
- Reading time estimation and formatting
- View count and engagement score calculations
- Series completion percentage calculation

### Assessments (`assessments.ts`)

**Purpose**: Transform assessment data including questions, user assessments, and responses.

**Functions**:

- `toAssessmentResponseDTO(row: AssessmentRow): AssessmentEntity`
- `toAssessmentQuestionResponseDTO(row: AssessmentQuestionRow): AssessmentQuestionResponse`
- `toUserAssessmentResponseDTO(row: UserAssessmentRow): UserAssessmentResponse`
- `toAssessmentResponseResponseDTO(row: AssessmentResponseRow): AssessmentResponseResponse`

**Key Transformations**:

- Decimal field conversion (strings to numbers)
- APEST score calculations and gift determination
- Assessment completion status and progress tracking
- Response time and confidence level formatting
- Paginated list responses

### AI (`ai.ts`)

**Purpose**: Transform AI-related data and insights.

### Ministry Platform (`ministry-platform.ts`)

**Purpose**: Transform ministry platform specific data.

## Usage Patterns

### Basic Usage

```typescript
import { toUserProfileResponseDTO } from '@platform/shared/mappers';

// Transform database row to API response
const userProfile = await db.query.userProfiles.findFirst();
const response = toUserProfileResponseDTO(userProfile);
```

### With Validation (Dev/Test)

```typescript
import { toUserProfileResponseDTO } from '@platform/shared/mappers';
import { userProfileResponseSchema } from '@platform/contracts';

const response = toUserProfileResponseDTO(userProfile);

// Validate in development/test environments
if (process.env['NODE_ENV'] !== 'production') {
  const validation = userProfileResponseSchema.safeParse(response);
  if (!validation.success) {
    throw new Error(
      `Invalid user profile response: ${validation.error.message}`
    );
  }
}
```

### Array Transformations

```typescript
import { toUserProfileResponseDTO } from '@platform/shared/mappers';

// Transform array of database rows
const userProfiles = await db.query.userProfiles.findMany();
const responses = userProfiles.map(toUserProfileResponseDTO);
```

## Type Safety

All mappers are fully typed with:

- **Input Types**: Database row types from Drizzle
- **Output Types**: DTO types from contracts
- **Generic Utilities**: Safe mapping functions for optional values, arrays, dates, etc.

### Generic Utilities

```typescript
// Safe mapping utilities available in index.ts
safeMapOptional<T, R>(value: T | null | undefined, mapper: (value: T) => R): R | undefined
safeMapArray<T, R>(array: T[] | null | undefined, mapper: (value: T) => R): R[]
safeMapDate(date: Date | null | undefined): string | undefined
safeMapBoolean(value: boolean | null | undefined): boolean
```

## Error Handling

Mappers use structured error handling:

```typescript
// Validation errors include field and reason
{
  field: 'email',
  reason: 'Invalid email format'
}
```

## Testing

Comprehensive tests are available in `__tests__/mappers/`:

- `user-mapper-alignment.test.ts` - User profile mapper tests
- `content-mapper-alignment.test.ts` - Content mapper tests
- `assessment-mapper-alignment.test.ts` - Assessment mapper tests
- `mapper-contract-validation.test.ts` - General mapper pattern tests

Each test file includes:

- Fixture data matching actual database types
- Both directions of transformation (toDTO/fromDTO)
- Null/undefined handling validation
- Computed field verification
- Type safety verification

## Related Files

### Contracts

- `@platform/contracts` - DTO schemas and types
- `@platform/contracts/entities/*.schema.ts` - Entity schemas
- `@platform/contracts/operations/*.operations.ts` - Operation schemas

### Database

- `@platform/database` - Drizzle schema definitions
- `@platform/database/src/db/schema/*.ts` - Table schemas

### Tests

- `__tests__/mappers/*.test.ts` - Mapper test suites
- `__tests__/mocks/*.ts` - Test fixture data

## Best Practices

1. **Always use explicit types** - Never use `any` or implicit returns
2. **Handle null/undefined consistently** - Use `?? undefined` for optional fields
3. **Validate in dev/test** - Use `safeParse` for runtime validation
4. **Keep mappers pure** - No side effects or shared state
5. **Test both directions** - Verify toDTO and fromDTO transformations
6. **Document computed fields** - Explain any calculated or derived values

## Migration Notes

When updating mappers:

1. Update input/output types first
2. Add/remove field mappings as needed
3. Update computed field logic
4. Add tests for new functionality
5. Update this documentation

## Performance Considerations

- Mappers are pure functions with no side effects
- Use array methods (`.map()`) for bulk transformations
- Consider memoization for expensive computed fields
- Validate only in development/test environments
