# Mapper Development Guidelines

_Alan Hirsch Digital Platform - Best Practices for Data Transformation_

## Overview

Mappers are the critical bridge between our database layer (Drizzle) and our API contracts. They ensure type safety, data consistency, and proper transformation of raw database rows into contract-compliant response objects.

## Architecture

```
Database Row → Mapper → Contract Response → API Response
     ↓           ↓           ↓              ↓
  Raw Data → Transform → Validate → Frontend Types
```

## Core Principles

### 1. Contract-First Development

- **Always return contract-compliant types**
- Mappers should never return raw database types
- Use TypeScript strict mode to catch type mismatches
- Import response types from `@/lib/contracts`

### 2. Complete Field Mapping

- **Include all computed fields** defined in contracts
- Handle null coalescing properly for optional fields
- Format dates as ISO strings consistently
- Add missing fields that are required by the contract

### 3. Data Transformation

- Transform database enums to contract enums
- Calculate derived fields (e.g., `isPublished`, `isDraft`)
- Format complex objects (e.g., nested author information)
- Handle array transformations properly

## Mapper Structure

### Basic Template

```typescript
import type { tableName } from '../db/schema';
import type { ResponseType } from '../contracts';

type TableRow = typeof tableName.$inferSelect;

export function toResponseTypeDTO(row: TableRow): ResponseType {
  return {
    // Map all required fields
    id: row.id,
    name: row.name,

    // Handle optional fields with null coalescing
    description: row.description ?? undefined,

    // Format dates as ISO strings
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),

    // Add computed fields
    isActive: row.status === 'active',
    isPublished: row.status === 'published',

    // Transform nested objects
    author: row.author
      ? {
          id: row.author.id,
          name: row.author.name,
          email: row.author.email,
        }
      : undefined,

    // Handle arrays
    tags: row.tags || [],
    categories:
      row.categories?.map(cat => ({
        id: cat.id,
        name: cat.name,
      })) || [],
  };
}
```

### Advanced Template with Relations

```typescript
import type { tableName } from '../db/schema';
import type { ResponseType } from '../contracts';

type TableRow = typeof tableName.$inferSelect;
type TableRowWithRelations = TableRow & {
  author?: { id: string; name: string; email: string };
  categories?: Array<{ id: string; name: string }>;
  tags?: Array<{ id: string; name: string }>;
};

export function toResponseTypeDTO(row: TableRowWithRelations): ResponseType {
  return {
    // Basic fields
    id: row.id,
    title: row.title,
    content: row.content,

    // Computed fields
    wordCount: row.content?.split(' ').length || 0,
    estimatedReadingTime: Math.ceil(
      (row.content?.split(' ').length || 0) / 200
    ),
    isPublished: row.status === 'published',
    isDraft: row.status === 'draft',
    isScheduled:
      row.status === 'scheduled' &&
      row.scheduledAt &&
      new Date(row.scheduledAt) > new Date(),

    // Date formatting
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: row.publishedAt?.toISOString(),
    scheduledAt: row.scheduledAt?.toISOString(),

    // Nested objects
    author: row.author
      ? {
          id: row.author.id,
          firstName: row.author.firstName,
          lastName: row.author.lastName,
          displayName: row.author.displayName,
          avatarUrl: row.author.avatarUrl,
        }
      : undefined,

    // Array transformations
    categories:
      row.categories?.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],

    tags: row.tags?.map(tag => tag.name) || [],

    // Complex computed fields
    engagement: {
      viewCount: row.viewCount || 0,
      likeCount: row.likeCount || 0,
      shareCount: row.shareCount || 0,
      commentCount: row.commentCount || 0,
    },
  };
}
```

## Field Mapping Guidelines

### Required Fields

- **Always map all required fields** from the contract
- Use TypeScript strict mode to ensure completeness
- Throw descriptive errors for missing required data

### Optional Fields

- Use null coalescing operator (`??`) for optional fields
- Return `undefined` instead of `null` for missing optional fields
- Follow the contract's optional field definitions exactly

### Date Fields

- **Always format dates as ISO strings** using `.toISOString()`
- Handle null/undefined dates properly
- Use consistent date formatting across all mappers

### Computed Fields

- Calculate all computed fields defined in contracts
- Use consistent logic for boolean flags (e.g., `isPublished`, `isDraft`)
- Handle edge cases in calculations (e.g., empty content for word count)

### Nested Objects

- Transform nested database relations to contract-compliant objects
- Handle missing relations gracefully
- Maintain consistent structure across all mappers

### Arrays

- Always return arrays, never null/undefined
- Use empty arrays (`[]`) for missing array data
- Transform array items to match contract structure

## Common Patterns

### Status-Based Computed Fields

```typescript
// Content status flags
isPublished: row.status === 'published',
isDraft: row.status === 'draft',
isScheduled: row.status === 'scheduled' && row.scheduledAt && new Date(row.scheduledAt) > new Date(),
isArchived: row.status === 'archived',

// User status flags
isActive: row.status === 'active',
isPending: row.status === 'pending',
isSuspended: row.status === 'suspended',
```

### Date Formatting

```typescript
// Standard date fields
createdAt: row.createdAt.toISOString(),
updatedAt: row.updatedAt.toISOString(),

// Optional date fields
publishedAt: row.publishedAt?.toISOString(),
scheduledAt: row.scheduledAt?.toISOString(),
deletedAt: row.deletedAt?.toISOString(),
```

### Engagement Metrics

```typescript
// Content engagement
engagement: {
  viewCount: row.viewCount || 0,
  likeCount: row.likeCount || 0,
  shareCount: row.shareCount || 0,
  commentCount: row.commentCount || 0,
  bookmarkCount: row.bookmarkCount || 0,
},

// User engagement
activity: {
  postsCount: row.postsCount || 0,
  commentsCount: row.commentsCount || 0,
  likesGiven: row.likesGiven || 0,
  lastActiveAt: row.lastActiveAt?.toISOString(),
},
```

### Nested Author Information

```typescript
author: row.author ? {
  id: row.author.id,
  firstName: row.author.firstName,
  lastName: row.author.lastName,
  displayName: row.author.displayName,
  avatarUrl: row.author.avatarUrl,
  ministryRole: row.author.ministryRole,
} : undefined,
```

## Error Handling

### Validation Errors

- Use Zod schemas to validate mapper output
- Provide descriptive error messages
- Log validation failures for debugging

### Missing Data

- Handle missing required data gracefully
- Provide fallback values where appropriate
- Log data inconsistencies

### Type Safety

- Use TypeScript strict mode
- Import types from contracts, not database schemas
- Avoid `any` types in mappers

## Testing Guidelines

### Unit Tests

- Test all mapper functions with mock data
- Verify contract compliance using Zod schemas
- Test edge cases (null values, empty arrays, etc.)

### Integration Tests

- Test mappers with real database data
- Verify end-to-end data flow
- Test with various data scenarios

### Example Test

```typescript
import { toContentItemResponseDTO } from '@/lib/mappers/content';
import { contentItemResponseSchema } from '@/lib/contracts';

describe('Content Mappers', () => {
  it('should produce valid ContentItemResponse', () => {
    const mockRow = {
      id: '123',
      title: 'Test Article',
      content: 'Test content',
      status: 'published',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02'),
      // ... other required fields
    };

    const result = toContentItemResponseDTO(mockRow);

    // Validate against contract schema
    expect(() => contentItemResponseSchema.parse(result)).not.toThrow();

    // Verify specific fields
    expect(result.isPublished).toBe(true);
    expect(result.isDraft).toBe(false);
    expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
  });
});
```

## Performance Considerations

### Efficient Transformations

- Avoid unnecessary object creation
- Use efficient array operations
- Minimize string operations

### Memory Usage

- Don't hold references to large database objects
- Use streaming for large datasets
- Clean up temporary variables

### Caching

- Consider caching computed fields for expensive calculations
- Use memoization for repeated transformations
- Cache frequently accessed nested data

## Common Pitfalls

### ❌ Don't Do This

```typescript
// Wrong: Returning raw database types
export function toContentItemDTO(row: ContentRow): ContentRow {
  return row; // This doesn't transform anything!
}

// Wrong: Inconsistent date formatting
export function toContentItemDTO(row: ContentRow): ContentItemResponse {
  return {
    createdAt: row.createdAt, // Should be ISO string
    updatedAt: row.updatedAt.toString(), // Inconsistent format
  };
}

// Wrong: Missing computed fields
export function toContentItemDTO(row: ContentRow): ContentItemResponse {
  return {
    id: row.id,
    title: row.title,
    // Missing isPublished, isDraft, etc.
  };
}
```

### ✅ Do This Instead

```typescript
// Correct: Proper transformation with all fields
export function toContentItemDTO(row: ContentRow): ContentItemResponse {
  return {
    id: row.id,
    title: row.title,
    content: row.content,

    // Computed fields
    isPublished: row.status === 'published',
    isDraft: row.status === 'draft',

    // Consistent date formatting
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),

    // Proper null handling
    publishedAt: row.publishedAt?.toISOString(),
  };
}
```

## Maintenance Guidelines

### Regular Reviews

- Review mappers when contracts change
- Update tests when adding new fields
- Refactor mappers for better performance

### Documentation

- Document complex transformation logic
- Add JSDoc comments for mapper functions
- Keep examples up to date

### Version Control

- Commit mapper changes with contract changes
- Use descriptive commit messages
- Tag releases with mapper updates

## Tools and Utilities

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### ESLint Rules

```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### Zod Validation

```typescript
import { z } from 'zod';

// Validate mapper output
const result = toContentItemDTO(row);
const validated = contentItemResponseSchema.parse(result);
```

## Conclusion

Following these guidelines ensures that mappers maintain type safety, data consistency, and contract compliance. This creates a robust foundation for the entire application's data flow and prevents runtime errors from type mismatches.

Remember: **Mappers are the critical bridge between your database and your API contracts. Invest time in getting them right, and the rest of your application will be much more reliable.**
