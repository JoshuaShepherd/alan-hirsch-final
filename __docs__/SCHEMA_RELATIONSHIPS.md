# Schema Relationships Guide

**Updated:** 2025-01-27
**Project:** Alan Hirsch Digital Platform
**Status:** Production Ready

## Overview

This document explains the relationships between database schemas, contracts, mappers, and types in the Alan Hirsch Digital Platform. It serves as the definitive guide for understanding how data flows through our system and ensuring consistency across all layers.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Mappers       │    │   Contracts     │
│   (Drizzle)     │◄──►│   (Transform)   │◄──►│   (Zod Schemas) │
│   snake_case    │    │   (Type Safe)   │    │   camelCase     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Raw Data      │    │   Typed Data    │    │   API Response  │
│   (PostgreSQL)  │    │   (Entities)    │    │   (Validated)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Data Flow

The data flows through our system in the following sequence:

1. **Database (PostgreSQL)** - Raw data stored in snake_case columns
2. **Mappers** - Transform database rows to typed entities and responses
3. **Contracts** - Zod schemas validate and type the data
4. **API Responses** - Contract-compliant JSON sent to clients

## Field Mapping Examples

### User Profile Mapping

| Database Column       | Contract Field        | Mapper Logic                                                 | Type                     |
| --------------------- | --------------------- | ------------------------------------------------------------ | ------------------------ |
| `id`                  | `id`                  | Direct mapping                                               | `string.uuid()`          |
| `first_name`          | `firstName`           | Direct mapping                                               | `string.min(1).max(100)` |
| `last_name`           | `lastName`            | Direct mapping                                               | `string.min(1).max(100)` |
| `account_status`      | `isActive`            | Computed: `row.account_status === 'active'`                  | `boolean`                |
| `privacy_settings`    | `isPublicProfile`     | Computed: `row.privacy_settings?.publicProfile !== false`    | `boolean`                |
| `assessment_total`    | `assessmentCompleted` | Computed: `!!row.assessment_total`                           | `boolean`                |
| `years_in_ministry`   | `ministryExperience`  | Computed: `"${years} year${s !== 1 ? 's' : ''} in ministry"` | `string.optional()`      |
| `assessment_*` scores | `primaryGift`         | Computed: Highest APEST score                                | `string.optional()`      |
| `assessment_*` scores | `secondaryGift`       | Computed: Second highest APEST score                         | `string.optional()`      |

### Content Item Mapping

| Database Column          | Contract Field     | Mapper Logic                                          | Type                     |
| ------------------------ | ------------------ | ----------------------------------------------------- | ------------------------ |
| `id`                     | `id`               | Direct mapping                                        | `string.uuid()`          |
| `title`                  | `title`            | Direct mapping                                        | `string.min(1).max(500)` |
| `status`                 | `isPublished`      | Computed: `row.status === 'published'`                | `boolean`                |
| `status`                 | `isDraft`          | Computed: `row.status === 'draft'`                    | `boolean`                |
| `status`                 | `isScheduled`      | Computed: `row.status === 'scheduled' && future date` | `boolean`                |
| `featured_image_url`     | `hasFeaturedImage` | Computed: `!!row.featured_image_url`                  | `boolean`                |
| `view_count`             | `viewCountText`    | Computed: Format with K/M suffixes                    | `string`                 |
| `*_count` fields         | `engagementScore`  | Computed: Weighted algorithm (0-10)                   | `number.min(0).max(10)`  |
| `estimated_reading_time` | `readingTimeText`  | Computed: `"${time} min read"` or calculated          | `string`                 |

## Validation Chain

Our validation system operates in multiple layers:

### 1. Database Schema (Drizzle ORM)

- **Purpose**: Database structure and constraints
- **Location**: `packages/database/src/schema/`
- **Features**:
  - Column types and constraints
  - Foreign key relationships
  - Indexes and performance optimizations
  - RLS (Row Level Security) policies

### 2. Contract Schemas (Zod Validation)

- **Purpose**: Runtime type validation and API contracts
- **Location**: `packages/contracts/src/entities/`
- **Features**:
  - Entity schemas (base data structures)
  - Response schemas (with computed fields)
  - Create/Update schemas (for API operations)
  - Query schemas (for filtering and pagination)

### 3. Mapper Output Validation

- **Purpose**: Ensure mappers produce contract-compliant data
- **Location**: `apps/alan-hirsch-platform/lib/mappers/`
- **Features**:
  - Transform database rows to entities
  - Add computed fields for UI
  - Validate output against contract schemas
  - Handle optional fields and null values

### 4. API Response Validation

- **Purpose**: Final validation before sending to clients
- **Location**: API route handlers
- **Features**:
  - Validate mapper output against response schemas
  - Ensure consistent error handling
  - Maintain API contract compliance

## Schema Hierarchy

```
Entity Schema (Base)
    ├── Response Schema (Entity + Computed Fields)
    ├── Create Schema (Entity - Auto Fields)
    ├── Update Schema (Create Schema + Partial)
    └── Query Schema (Filtering & Pagination)
```

### Example: User Profile Schema Hierarchy

```typescript
// Base entity schema
userProfileEntitySchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1).max(100),
  // ... all database fields
});

// Response schema with computed fields
userProfileResponseSchema = userProfileEntitySchema.extend({
  isActive: z.boolean(),
  fullName: z.string(),
  hasCustomDomain: z.boolean(),
  // ... computed fields
});

// Create schema (omits auto-generated fields)
createUserProfileSchema = userProfileEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastActiveAt: true,
});

// Update schema (partial create schema)
updateUserProfileSchema = createUserProfileSchema.partial().omit({
  email: true, // Email cannot be changed
});
```

## Computed Field Patterns

### Boolean Computed Fields

```typescript
// Status-based booleans
isActive: row.account_status === 'active';
isPublished: row.status === 'published';
isDraft: row.status === 'draft';

// Existence checks
hasCustomDomain: !!row.custom_domain;
hasFeaturedImage: !!row.featured_image_url;
hasAttachments: Array.isArray(row.attachments) && row.attachments.length > 0;

// Complex logic
canReceiveNotifications: Object.values(row.email_notifications || {}).some(
  Boolean
);
assessmentCompleted: !!row.assessment_total;
```

### String Computed Fields

```typescript
// Concatenation
fullName: `${row.first_name} ${row.last_name}`;

// Conditional formatting
displayNameOrFullName: row.display_name || fullName;
ministryExperience: row.years_in_ministry
  ? `${row.years_in_ministry} year${row.years_in_ministry !== 1 ? 's' : ''} in ministry`
  : undefined;

// Formatted counts
viewCountText: formatCount(row.view_count || 0); // "1.2K", "5.3M"
readingTimeText: row.estimated_reading_time
  ? `${row.estimated_reading_time} min read`
  : row.word_count
    ? `${Math.ceil(row.word_count / 200)} min read`
    : 'Unknown';
```

### Numeric Computed Fields

```typescript
// Engagement score calculation (0-10)
engagementScore: calculateEngagementScore({
  views: row.view_count || 0,
  likes: row.like_count || 0,
  shares: row.share_count || 0,
  comments: row.comment_count || 0,
  bookmarks: row.bookmark_count || 0,
});

// Completion percentage
completionPercentage: row.total_episodes > 0
  ? Math.round(((row.published_episodes || 0) / row.total_episodes) * 100)
  : 0;
```

### Complex Computed Fields

```typescript
// APEST gift calculation
const apestScores = {
  apostolic: row.assessment_movement_alignment || 0,
  prophetic: row.assessment_audience_engagement || 0,
  evangelistic: row.assessment_network_effects || 0,
  shepherding: row.assessment_strategic_fit || 0,
  teaching: row.assessment_content_readiness || 0,
};

const sortedGifts = Object.entries(apestScores)
  .sort(([, a], [, b]) => b - a)
  .map(([gift]) => gift);

primaryGift: sortedGifts[0];
secondaryGift: sortedGifts[1];
```

## Error Handling Patterns

### Database Level

- Use proper constraints and foreign keys
- Implement RLS policies for security
- Handle null values appropriately

### Mapper Level

```typescript
// Safe array handling
theologicalFocus: Array.isArray(row.theological_focus)
  ? row.theological_focus
  : [];

// Safe object handling with defaults
brandColors: row.brand_colors || {
  accent: '#059669',
  primary: '#2563eb',
  secondary: '#64748b',
};

// Safe date handling
createdAt: row.created_at.toISOString();
publishedAt: row.published_at?.toISOString() || undefined;
```

### Contract Level

```typescript
// Zod validation with proper error messages
firstName: z.string()
  .min(1, 'First name is required')
  .max(100, 'First name too long');

// Optional fields with defaults
languagePrimary: z.string().max(10).default('en');
subscriptionTier: z.string().max(50).default('free');

// Complex validation
email: z.string().email('Invalid email format');
```

## Best Practices

### 1. Always Use Mappers

```typescript
// ✅ Good: Use mappers for all transformations
const user = toUserProfileResponseDTO(dbRow);

// ❌ Bad: Return raw database rows
return dbRow;
```

### 2. Handle Optional Fields Properly

```typescript
// ✅ Good: Use null coalescing for optional fields
description: row.description ?? undefined,

// ❌ Bad: Leave null values
description: row.description,
```

### 3. Format Dates Consistently

```typescript
// ✅ Good: Always format dates as ISO strings
createdAt: row.created_at.toISOString(),

// ❌ Bad: Return Date objects
createdAt: row.created_at,
```

### 4. Compute Derived Fields

```typescript
// ✅ Good: Add computed fields in response mappers
isPublished: row.status === 'published',
fullName: `${row.first_name} ${row.last_name}`,

// ❌ Bad: Leave computed fields undefined
```

### 5. Handle Arrays Properly

```typescript
// ✅ Good: Always return arrays, never null
tags: Array.isArray(row.tags) ? row.tags : [],

// ❌ Bad: Return null for missing arrays
tags: row.tags,
```

## Performance Considerations

### Database Queries

- Use proper indexes for frequently queried fields
- Implement pagination for large datasets
- Use RLS policies for security without performance impact

### Mapper Performance

- Keep computed field calculations simple
- Cache expensive calculations when possible
- Use efficient array/object operations

### Contract Validation

- Zod schemas are fast for runtime validation
- Use `.safeParse()` for error handling
- Avoid deep object validation in hot paths

## Security Considerations

### Data Privacy

- Use RLS policies to control data access
- Implement proper field-level permissions
- Sanitize sensitive data in computed fields

### Input Validation

- Always validate input against create/update schemas
- Use Zod's built-in validation for common patterns
- Implement custom validators for business logic

### Output Sanitization

- Ensure computed fields don't expose sensitive data
- Use proper type coercion for display values
- Validate all data before sending to clients

## Troubleshooting

### Common Issues

1. **Type Mismatches**
   - **Problem**: Mapper output doesn't match contract schema
   - **Solution**: Validate mapper output against contract schemas
   - **Check**: Ensure all required fields are present and correctly typed

2. **Missing Fields**
   - **Problem**: Computed fields not implemented in mappers
   - **Solution**: Add missing computed fields to response mappers
   - **Check**: Compare mapper output with contract response schema

3. **Date Formatting Issues**
   - **Problem**: Inconsistent date formatting across mappers
   - **Solution**: Always use `.toISOString()` for dates
   - **Check**: Ensure all dates are strings in ISO format

4. **Array Handling Issues**
   - **Problem**: Null arrays instead of empty arrays
   - **Solution**: Use proper array validation and defaults
   - **Check**: Ensure all arrays are properly initialized

5. **Optional Field Issues**
   - **Problem**: Null values where undefined expected
   - **Solution**: Use null coalescing operator (`??`)
   - **Check**: Handle null/undefined values consistently

### Debug Mode

Enable debug mode for detailed validation information:

```typescript
// Add validation logging
const result = toUserProfileResponseDTO(row);
try {
  const validated = userProfileResponseSchema.parse(result);
  console.log('✅ Mapper output is valid');
} catch (error) {
  console.error('❌ Mapper output validation failed:', error);
}
```

## Migration Guide

### Adding New Computed Fields

1. **Update Contract Schema**

   ```typescript
   // Add to response schema
   export const userProfileResponseSchema = userProfileEntitySchema.extend({
     // ... existing fields
     newComputedField: z.string(),
   });
   ```

2. **Update Mapper**

   ```typescript
   // Add computed field logic
   export function toUserProfileResponseDTO(
     row: UserProfileRow
   ): UserProfileResponse {
     // ... existing logic
     return {
       ...entity,
       // ... existing computed fields
       newComputedField: calculateNewField(row),
     };
   }
   ```

3. **Add Tests**
   ```typescript
   // Test the new computed field
   expect(result.newComputedField).toBeDefined();
   expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
   ```

### Adding New Entities

1. **Create Database Schema** (Drizzle)
2. **Create Contract Schema** (Zod)
3. **Create Mappers** (Transform functions)
4. **Add Tests** (Validation tests)
5. **Update Documentation** (This guide)

## Success Metrics

### ✅ Complete When:

1. **All mappers** produce contract-compliant output
2. **No raw database types** are returned from API endpoints
3. **All computed fields** are properly calculated
4. **Date formatting** is consistent across all mappers
5. **Array handling** is consistent and safe
6. **Utility functions** cover all common use cases
7. **Tests** validate all mapper functions
8. **Documentation** is complete and up-to-date

### 🚨 Red Flags:

- Mappers returning raw database types
- Missing computed fields in responses
- Inconsistent date formatting
- Null arrays instead of empty arrays
- Missing validation in mapper output
- No utility functions for common operations
- Outdated or missing documentation

---

_This guide ensures that the contracts and mappers system maintains type safety and data consistency across the entire application. For questions or updates, refer to the contracts package documentation._
