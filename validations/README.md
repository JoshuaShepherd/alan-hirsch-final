# Validation Schemas

This directory contains comprehensive Zod validation schemas that mirror the Drizzle table definitions for the Alan Hirsch Digital Platform. These schemas provide runtime type validation and ensure data integrity throughout the application.

## ⚠️ Implementation Status

**✅ IMPLEMENTED TABLES:**
- `user_profiles` - Extended user profiles with ministry context
- `organizations` - Churches, denominations, seminaries, networks  
- `organization_memberships` - User-organization relationships
- `content_categories` - Hierarchical content taxonomy
- `content_items` - Main content repository
- `subscription_plans` - Tiered access plans
- `user_subscriptions` - Active user subscriptions
- `communities` - Discussion groups and networking spaces

**⏳ PLANNED TABLES (Not Yet Deployed):**
- Assessment system (APEST, MDNA, etc.)
- AI conversation system
- Advanced content features (series, cross-references)
- Community features (posts, memberships, collaborations)
- Financial system (transactions, payment methods)
- Analytics and tracking system
- System administration features

Schemas marked with "⏳ PLANNED" are ready for future implementation but not yet deployed to the database.

## Structure

The validation schemas are organized to match the database schema structure:

- **`auth.ts`** - User profiles, organizations, and membership validation
- **`assessments.ts`** - APEST and other ministry assessment validation
- **`content.ts`** - Content management system validation
- **`ai.ts`** - AI conversations, jobs, and theological concepts validation
- **`community.ts`** - Community posts, memberships, and collaborations validation
- **`subscriptions.ts`** - Subscription plans, transactions, and payments validation
- **`analytics.ts`** - User analytics, interactions, and performance metrics validation
- **`system.ts`** - Audit logs, feature flags, notifications, and system administration validation

## Usage

### Basic Validation

```typescript
import { userProfileSchema, newUserProfileSchema } from '@/lib/validations/auth';

// Validate existing user profile
const userProfile = userProfileSchema.parse(data);

// Validate new user profile (omits timestamps and optional id)
const newUser = newUserProfileSchema.parse(formData);
```

### Form Validation

```typescript
import { z } from 'zod';
import { contentItemSchema } from '@/lib/validations/content';

// Create form schema from content item schema
const contentFormSchema = contentItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
  likeCount: true,
  shareCount: true,
  commentCount: true,
  bookmarkCount: true
});

// Use in form validation
const formData = contentFormSchema.parse(input);
```

### API Validation

```typescript
import { assessmentSchema } from '@/lib/validations/assessments';

// Validate API request body
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = assessmentSchema.parse(body);
    
    // Process validated data...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.errors }, { status: 400 });
    }
  }
}
```

## Schema Features

### Comprehensive Type Safety

All schemas include:
- **UUID validation** for ID fields
- **Email validation** for email fields
- **URL validation** for URL fields
- **Enum validation** for constrained string values
- **Date validation** for timestamp fields
- **Number constraints** (min/max values, integer validation)
- **Array validation** with proper element types
- **Object validation** for complex nested structures

### Business Logic Validation

Schemas enforce business rules such as:
- **APEST scores** must be between 0-100
- **Percentage values** must be between 0-100
- **Currency codes** must be 3 characters
- **Slugs** must match URL-friendly patterns
- **Assessment scores** have proper min/max constraints
- **Revenue shares** must sum to 100%

### Flexible Insert/Update Schemas

Each table has two schema variants:
- **Full schema** - For complete records with all fields
- **New/Insert schema** - Omits auto-generated fields (timestamps, auto-increment IDs)

### JSONB Field Validation

Complex JSONB fields are properly typed:
- **APEST relevance scores** with all five dimensions
- **Brand colors** with primary/secondary/accent
- **Email notification preferences**
- **Privacy settings**
- **Feature matrices** for subscription plans
- **Metadata objects** with flexible key-value pairs

## Best Practices

### 1. Use Appropriate Schema Variant

```typescript
// For creating new records
const newUser = newUserProfileSchema.parse(formData);

// For validating existing records
const existingUser = userProfileSchema.parse(dbRecord);
```

### 2. Handle Validation Errors

```typescript
import { z } from 'zod';

try {
  const validData = schema.parse(input);
} catch (error) {
  if (error instanceof z.ZodError) {
    // Handle validation errors
    console.error('Validation failed:', error.errors);
  }
}
```

### 3. Extend Schemas for Specific Use Cases

```typescript
// Create a registration schema from user profile
const registrationSchema = newUserProfileSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
  ministryRole: true
}).extend({
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
```

### 4. Use Transform for Data Processing

```typescript
const processedSchema = baseSchema.transform(data => ({
  ...data,
  slug: data.title.toLowerCase().replace(/\s+/g, '-'),
  createdAt: new Date()
}));
```

## Type Exports

Each validation file exports TypeScript types:

```typescript
// Inferred types from schemas
export type UserProfile = z.infer<typeof userProfileSchema>;
export type NewUserProfile = z.infer<typeof newUserProfileSchema>;
```

These types can be used throughout the application for type safety:

```typescript
import type { UserProfile, NewUserProfile } from '@/lib/validations/auth';

function createUser(userData: NewUserProfile): Promise<UserProfile> {
  // Implementation...
}
```

## Integration with Drizzle

The validation schemas are designed to work seamlessly with Drizzle ORM:

```typescript
import { db } from '@/lib/db/drizzle';
import { userProfiles } from '@/lib/db/schema';
import { newUserProfileSchema } from '@/lib/validations/auth';

// Validate before database insert
const userData = newUserProfileSchema.parse(input);
const [newUser] = await db.insert(userProfiles).values(userData).returning();
```

This ensures that all data is validated before reaching the database, providing an additional layer of data integrity beyond database constraints.
