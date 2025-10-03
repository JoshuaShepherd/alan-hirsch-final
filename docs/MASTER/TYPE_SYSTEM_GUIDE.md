# Type System Guide

_Alan Hirsch Digital Platform - Complete Type System Architecture_

## Overview

The Alan Hirsch Digital Platform uses a **contract-first type system** that ensures type safety, data consistency, and eliminates type drift across the entire application. This guide explains how our type system works and how to maintain it effectively.

## Architecture Overview

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Database      │    │   Mappers    │    │  Contracts  │    │  Frontend    │
│   (Drizzle)     │───▶│              │───▶│   (Zod)     │───▶│   Types      │
│                 │    │              │    │             │    │              │
│ Raw Data Types  │    │ Transform    │    │ Validation  │    │ UI Components│
└─────────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

### Data Flow

1. **Database Layer**: Drizzle ORM defines database schemas and generates TypeScript types
2. **Mapper Layer**: Transforms raw database rows into contract-compliant objects
3. **Contract Layer**: Zod schemas define API contracts and validate data
4. **Frontend Layer**: TypeScript types derived from contracts power UI components

## Core Components

### 1. Database Schemas (`lib/db/schema/`)

Database schemas define the structure of our data at the lowest level:

```typescript
// lib/db/schema/content.ts
export const contentItems = pgTable('content_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  status: contentStatusEnum('status').notNull().default('draft'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type ContentItem = typeof contentItems.$inferSelect;
export type NewContentItem = typeof contentItems.$inferInsert;
```

**Key Points:**

- Uses Drizzle ORM for type-safe database operations
- Generates TypeScript types automatically
- Defines database constraints and relationships
- Raw data types (not suitable for API responses)

### 2. Mappers (`lib/mappers/`)

Mappers transform database rows into contract-compliant response objects:

```typescript
// lib/mappers/content.ts
import type { contentItems } from '../db/schema';
import type { ContentItemResponse } from '../contracts';

type ContentItemRow = typeof contentItems.$inferSelect;

export function toContentItemResponseDTO(
  row: ContentItemRow
): ContentItemResponse {
  return {
    // Map all required fields
    id: row.id,
    title: row.title,
    content: row.content,

    // Add computed fields
    isPublished: row.status === 'published',
    isDraft: row.status === 'draft',
    wordCount: row.content?.split(' ').length || 0,

    // Format dates as ISO strings
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),

    // Handle optional fields
    publishedAt: row.publishedAt?.toISOString(),
  };
}
```

**Key Points:**

- Transform raw database types to contract types
- Add computed fields not stored in database
- Format dates consistently (ISO strings)
- Handle null/undefined values properly
- Ensure contract compliance

### 3. Contracts (`lib/contracts/`)

Contracts define API response schemas using Zod for validation:

```typescript
// lib/contracts/content.response.ts
import { z } from 'zod';

export const contentItemResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  content: z.string().nullable(),

  // Computed fields
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  wordCount: z.number().int().min(0),

  // Date fields (ISO strings)
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().nullable(),
});

export type ContentItemResponse = z.infer<typeof contentItemResponseSchema>;
```

**Key Points:**

- Define API response structure
- Use Zod for runtime validation
- Include computed fields
- Standardize date formatting
- Serve as single source of truth

### 4. Frontend Types (`types/index.ts`)

Frontend types are re-exported from contracts to maintain consistency:

```typescript
// types/index.ts
// Re-export all contract types to maintain backward compatibility
export type {
  ContentItemResponse,
  AssessmentResponse,
  UserProfile,
  Organization,
  // ... all other contract types
} from '@/lib/contracts';
```

**Key Points:**

- Re-export contract types (no duplication)
- Provide utility types and error classes
- Maintain backward compatibility
- Centralize type imports

## Type System Benefits

### 1. Type Safety

- **Compile-time checking**: TypeScript catches type errors during development
- **Runtime validation**: Zod validates data at API boundaries
- **No type drift**: Types always match contracts

### 2. Developer Experience

- **IDE autocomplete**: Perfect IntelliSense support
- **Refactoring safety**: Change schema once, types update everywhere
- **Documentation**: Contracts serve as living documentation

### 3. Data Consistency

- **Standardized formatting**: Dates, enums, and computed fields
- **Null safety**: Proper handling of optional fields
- **Validation**: Runtime checks prevent invalid data

### 4. Maintainability

- **Single source of truth**: Contracts define all API responses
- **Easy updates**: Change contract, types update automatically
- **Clear boundaries**: Each layer has specific responsibilities

## Working with the Type System

### Creating New Entities

1. **Define Database Schema**

```typescript
// lib/db/schema/new-entity.ts
export const newEntities = pgTable('new_entities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

2. **Create Contract Schema**

```typescript
// lib/contracts/new-entity.response.ts
export const newEntityResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  createdAt: z.string().datetime(),
});

export type NewEntityResponse = z.infer<typeof newEntityResponseSchema>;
```

3. **Create Mapper Function**

```typescript
// lib/mappers/new-entity.ts
export function toNewEntityResponseDTO(row: NewEntityRow): NewEntityResponse {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.createdAt.toISOString(),
  };
}
```

4. **Export from Contracts**

```typescript
// lib/contracts/index.ts
export * from './new-entity.response';
```

5. **Re-export in Types**

```typescript
// types/index.ts
export type { NewEntityResponse } from '@/lib/contracts';
```

### Updating Existing Entities

1. **Update Database Schema** (if needed)
2. **Update Contract Schema** with new fields
3. **Update Mapper Function** to include new fields
4. **Update Tests** to verify contract compliance
5. **Update Documentation** to reflect changes

### Adding Computed Fields

Computed fields are added in mappers and defined in contracts:

```typescript
// In mapper
export function toContentItemResponseDTO(
  row: ContentItemRow
): ContentItemResponse {
  return {
    // ... other fields

    // Computed fields
    isPublished: row.status === 'published',
    isDraft: row.status === 'draft',
    wordCount: row.content?.split(' ').length || 0,
    estimatedReadingTime: Math.ceil(
      (row.content?.split(' ').length || 0) / 200
    ),
  };
}

// In contract
export const contentItemResponseSchema = z.object({
  // ... other fields

  // Computed fields
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  wordCount: z.number().int().min(0),
  estimatedReadingTime: z.number().int().min(0),
});
```

## Validation and Testing

### Runtime Validation

All API responses are validated using Zod schemas:

```typescript
// In API route
const response = toContentItemResponseDTO(dbRow);
const validatedResponse = contentItemResponseSchema.parse(response);
return NextResponse.json(validatedResponse);
```

### Unit Testing

Test mappers to ensure contract compliance:

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

### Integration Testing

Test end-to-end data flow:

```typescript
describe('Content API', () => {
  it('should return contract-compliant response', async () => {
    const response = await fetch('/api/content/123');
    const data = await response.json();

    // Validate response structure
    expect(() => contentItemResponseSchema.parse(data.data)).not.toThrow();
  });
});
```

## Common Patterns

### Date Formatting

All dates are formatted as ISO strings:

```typescript
// In mapper
createdAt: row.createdAt.toISOString(),
updatedAt: row.updatedAt.toISOString(),
publishedAt: row.publishedAt?.toISOString(), // Optional field
```

### Status Flags

Boolean flags based on status fields:

```typescript
// In mapper
isPublished: row.status === 'published',
isDraft: row.status === 'draft',
isScheduled: row.status === 'scheduled' && row.scheduledAt && new Date(row.scheduledAt) > new Date(),
```

### Nested Objects

Transform database relations to contract-compliant objects:

```typescript
// In mapper
author: row.author ? {
  id: row.author.id,
  firstName: row.author.firstName,
  lastName: row.author.lastName,
  displayName: row.author.displayName,
} : undefined,
```

### Array Handling

Always return arrays, never null/undefined:

```typescript
// In mapper
tags: row.tags?.map(tag => tag.name) || [],
categories: row.categories?.map(cat => ({
  id: cat.id,
  name: cat.name,
})) || [],
```

## Troubleshooting

### Common Issues

1. **Type Mismatches**
   - Check that mapper return type matches contract
   - Verify all required fields are mapped
   - Ensure date formatting is consistent

2. **Validation Errors**
   - Check Zod schema definitions
   - Verify data types match schema
   - Look for missing required fields

3. **Import Errors**
   - Ensure types are exported from contracts
   - Check import paths are correct
   - Verify contract index exports

### Debugging Tips

1. **Use TypeScript Strict Mode**
   - Enables strict type checking
   - Catches type errors early
   - Forces proper null handling

2. **Validate Mapper Output**
   - Use Zod schemas to validate mapper results
   - Add validation in tests
   - Log validation errors

3. **Check Contract Compliance**
   - Run tests to verify contract compliance
   - Use TypeScript compiler to catch type errors
   - Review contract definitions regularly

## Best Practices

### 1. Contract-First Development

- Define contracts before implementing mappers
- Use contracts as the single source of truth
- Validate all responses against contracts

### 2. Consistent Naming

- Use consistent naming conventions
- Follow established patterns
- Document naming decisions

### 3. Comprehensive Testing

- Test all mapper functions
- Validate contract compliance
- Test edge cases and error conditions

### 4. Documentation

- Document complex transformation logic
- Keep examples up to date
- Explain design decisions

### 5. Performance

- Avoid unnecessary object creation
- Use efficient array operations
- Consider caching for expensive computations

## Migration Guide

### From Legacy Types

If migrating from legacy type definitions:

1. **Identify Duplicate Types**
   - Find types defined in multiple places
   - Choose contracts as the source of truth
   - Remove duplicate definitions

2. **Update Imports**
   - Change imports from `@/types` to `@/lib/contracts`
   - Update import statements across codebase
   - Verify no broken imports

3. **Update Mappers**
   - Ensure mappers return contract types
   - Add missing computed fields
   - Fix date formatting issues

4. **Add Validation**
   - Add Zod validation to API routes
   - Create mapper tests
   - Verify contract compliance

### Gradual Migration

For large codebases, migrate gradually:

1. **Start with New Features**
   - Use contract-based approach for new features
   - Establish patterns and examples
   - Build team familiarity

2. **Migrate High-Impact Areas**
   - Focus on frequently used types
   - Prioritize error-prone areas
   - Update critical user flows

3. **Complete Migration**
   - Migrate remaining types
   - Remove legacy code
   - Update documentation

## Conclusion

The contract-first type system provides a robust foundation for the Alan Hirsch Digital Platform. By following these guidelines and patterns, you can maintain type safety, data consistency, and developer productivity.

**Key Takeaways:**

- Contracts are the single source of truth
- Mappers transform data and add computed fields
- Zod provides runtime validation
- TypeScript ensures compile-time safety
- Testing verifies contract compliance

**Remember:** The type system is only as good as the discipline with which it's maintained. Invest time in getting it right, and it will pay dividends in reduced bugs, better developer experience, and easier maintenance.
