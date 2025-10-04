# Database Schema Validation System

This directory contains comprehensive Zod validation schemas based on the live database structure of the Alan Hirsch platform. These schemas provide type-safe validation for all database operations, API endpoints, and form inputs.

## Overview

The schema validation system is organized into several layers:

1. **Database Schemas** - Exact database structure validation
2. **CRUD Schemas** - Create, Update, Query operation variants
3. **API Schemas** - Loose validation for external interfaces
4. **Form Schemas** - User input validation for forms
5. **Shared Schemas** - Reusable components across domains
6. **Validation Helpers** - Utility functions for validation operations

## File Structure

```
src/lib/schemas/
├── index.ts                    # Main exports
├── database.schemas.ts         # Exact database structure
├── crud.schemas.ts            # CRUD operation variants
├── api.schemas.ts             # API request/response schemas
├── form.schemas.ts            # Form validation schemas
├── shared.schemas.ts          # Shared components
├── validation.helpers.ts      # Validation utility functions
├── schema.validation.test.ts  # Comprehensive test suite
└── README.md                  # This documentation
```

## Database Tables Covered

### User Management

- `user_profiles` - Extended user profiles with ministry context and APEST integration
- `organizations` - Multi-tenant organization structure
- `organization_memberships` - User-organization relationships with role-based access

### Content System

- `content_categories` - Hierarchical content categorization with APEST integration
- `content_items` - Main content repository with AI enhancement and network amplification

### Assessment System

- `assessments` - Assessment definitions and metadata with cultural adaptation
- `assessment_questions` - Individual questions within assessments
- `user_assessments` - User assessment attempts and results with AI insights
- `assessment_responses` - Individual question responses with timing and confidence

### Subscription & Billing

- `subscription_plans` - Tiered access plans with feature matrices
- `user_subscriptions` - User subscription records and billing with usage tracking

### Community

- `communities` - Discussion groups and networking spaces with cultural context

## Schema Types

### 1. Database Schemas (`database.schemas.ts`)

These schemas match the exact database structure and are used for:

- Validating data retrieved from the database
- Ensuring data integrity before database operations
- Type-safe database interactions

Example:

```typescript
import { databaseUserProfileSchema } from '@/lib/schemas';

// Validate data from database
const result = databaseUserProfileSchema.safeParse(databaseRow);
if (result.success) {
  // TypeScript knows this is a DatabaseUserProfile
  const userProfile = result.data;
}
```

### 2. CRUD Schemas (`crud.schemas.ts`)

These schemas provide variants for different operations:

- **New Schemas** - For creating records (omits id, timestamps)
- **Update Schemas** - For partial updates (all fields optional)
- **Query Schemas** - For filtering and searching (includes pagination, sorting)

Example:

```typescript
import { newUserProfileSchema, updateUserProfileSchema } from '@/lib/schemas';

// Create new user profile
const createResult = newUserProfileSchema.safeParse(userData);

// Update existing user profile
const updateResult = updateUserProfileSchema.safeParse(partialUserData);
```

### 3. API Schemas (`api.schemas.ts`)

These schemas provide loose validation for external interfaces:

- Public-facing data structures
- API request/response validation
- Search and filtering operations

Example:

```typescript
import { publicUserProfileApiSchema } from '@/lib/schemas';

// Validate public user profile for API response
const publicProfile = publicUserProfileApiSchema.parse(userProfile);
```

### 4. Form Schemas (`form.schemas.ts`)

These schemas validate user input from forms:

- Registration and login forms
- Profile update forms
- Content creation forms
- Assessment response forms

Example:

```typescript
import { userRegistrationFormSchema } from '@/lib/schemas';

// Validate form submission
const result = userRegistrationFormSchema.safeParse(formData);
if (!result.success) {
  // Display form errors
  const errors = result.error.errors;
}
```

### 5. Shared Schemas (`shared.schemas.ts`)

Reusable components used across multiple schemas:

- Base types (UUID, email, URL, etc.)
- Common enums and constraints
- JSON/JSONB validation
- Validation rules and messages

## Validation Helpers

The `validation.helpers.ts` file provides utility functions for common validation operations:

### Basic Validation

```typescript
import { validateUserProfile, validateOrganization } from '@/lib/schemas';

// Validate single record
const result = validateUserProfile(data);
if (result.success) {
  console.log('Valid data:', result.data);
} else {
  console.log('Validation errors:', result.errorMessage);
}
```

### Batch Validation

```typescript
import { validateUserProfiles } from '@/lib/schemas';

// Validate multiple records
const results = validateUserProfiles(userDataArray);
if (results.success) {
  console.log('All records valid:', results.data);
}
```

### Error Handling

```typescript
import { formatValidationErrors, getFirstValidationError } from '@/lib/schemas';

const result = validateUserProfile(data);
if (!result.success && result.errors) {
  const errorMessages = formatValidationErrors(result.errors);
  const firstError = getFirstValidationError(result.errors);
}
```

## Type Safety

All schemas export TypeScript types using `z.infer<>`:

```typescript
import type {
  DatabaseUserProfile,
  NewUserProfile,
  UpdateUserProfile,
  QueryUserProfile,
  PublicUserProfileApi,
  UserProfileUpdateForm,
} from '@/lib/schemas';
```

## Database Type Mappings

### PostgreSQL → Zod Type Mappings

| PostgreSQL Type | Zod Schema              | Notes                    |
| --------------- | ----------------------- | ------------------------ |
| `uuid`          | `z.string().uuid()`     | Validates UUID format    |
| `text`          | `z.string()`            | With length constraints  |
| `varchar(n)`    | `z.string().max(n)`     | With max length          |
| `integer`       | `z.number().int()`      | With min/max constraints |
| `numeric`       | `z.number()`            | For decimal values       |
| `boolean`       | `z.boolean()`           | With default values      |
| `timestamp`     | `z.string().datetime()` | ISO 8601 format          |
| `jsonb`         | `z.record(z.unknown())` | Flexible JSON validation |
| `enum`          | `z.enum([...])`         | Enum validation          |

### Constraint Handling

- **NOT NULL** → Required fields (no `.optional()`)
- **UNIQUE** → Validation in application layer
- **CHECK constraints** → Enum validation or custom refinements
- **DEFAULT values** → `.default()` in schemas
- **Foreign Keys** → UUID validation (referential integrity in application layer)

## Error Messages

All schemas include user-friendly error messages:

```typescript
const emailSchema = z.string().email({
  message: 'Must be a valid email address',
});

const apestScoreSchema = z.number().int().min(0).max(100, {
  message: 'APEST scores must be between 0 and 100',
});
```

## Testing

The `schema.validation.test.ts` file contains comprehensive tests that:

- Validate schemas against sample database data
- Test edge cases and error conditions
- Verify CRUD operation schemas
- Test batch validation scenarios
- Validate complex JSONB structures

Run tests with:

```bash
npm test src/lib/schemas/schema.validation.test.ts
```

## Usage Examples

### API Route Validation

```typescript
import { validateCreateUserProfile } from '@/lib/schemas';

export async function POST(request: Request) {
  const body = await request.json();

  const validation = validateCreateUserProfile(body);
  if (!validation.success) {
    return Response.json({ error: validation.errorMessage }, { status: 400 });
  }

  // Use validated data
  const userProfile = validation.data;
  // ... create user profile
}
```

### Form Validation

```typescript
import { userRegistrationFormSchema } from '@/lib/schemas';

export function RegistrationForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (formData: FormData) => {
    const result = userRegistrationFormSchema.safeParse(formData);

    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach(error => {
        if (error.path.length > 0) {
          errorMap[error.path[0] as string] = error.message;
        }
      });
      setErrors(errorMap);
      return;
    }

    // Submit valid data
    submitRegistration(result.data);
  };
}
```

### Database Query Validation

```typescript
import { validateQueryContentItem } from '@/lib/schemas';

export async function getContentItems(queryParams: unknown) {
  const validation = validateQueryContentItem(queryParams);
  if (!validation.success) {
    throw new Error(`Invalid query parameters: ${validation.errorMessage}`);
  }

  const query = validation.data;
  // Build database query with validated parameters
  return await db.query.contentItems({
    where: buildWhereClause(query),
    limit: query.limit,
    offset: query.offset,
    orderBy: query.order_by,
    orderDirection: query.order_direction,
  });
}
```

## Migration from Existing Validation

If you're migrating from the existing validation system:

1. **Replace imports**: Update imports to use new schema paths
2. **Update function calls**: Use new validation helper functions
3. **Type updates**: Use new TypeScript types
4. **Error handling**: Update error handling to use new error formats

## Best Practices

1. **Always validate input data** before database operations
2. **Use appropriate schema types** for different operations (Create vs Update vs Query)
3. **Handle validation errors gracefully** with user-friendly messages
4. **Test schemas thoroughly** with real database data
5. **Keep schemas in sync** with database migrations
6. **Use TypeScript types** for better development experience

## Maintenance

- **Update schemas** when database structure changes
- **Add new validation rules** as business requirements evolve
- **Test with real data** to ensure compatibility
- **Document changes** in schema comments
- **Keep error messages** user-friendly and actionable

## Performance Considerations

- **Validation is fast** - Zod is optimized for performance
- **Batch validation** is available for multiple records
- **Lazy validation** - schemas are only parsed when needed
- **Type inference** - TypeScript types are generated at compile time

This schema validation system provides a robust foundation for type-safe database operations and API validation in the Alan Hirsch platform.
