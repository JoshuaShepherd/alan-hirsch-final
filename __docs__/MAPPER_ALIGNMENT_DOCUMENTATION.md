# Mapper Alignment Documentation

**Created:** 2025-01-27
**Purpose:** Document mapper transformations, assumptions, and non-reversible operations
**Status:** ✅ **COMPLETE** - All mappers aligned with contracts and properly documented

---

## 📚 **TABLE OF CONTENTS**

1. [Overview](#overview)
2. [Mapper Architecture](#mapper-architecture)
3. [Transformation Patterns](#transformation-patterns)
4. [Non-Reversible Transformations](#non-reversible-transformations)
5. [Type Safety Guidelines](#type-safety-guidelines)
6. [Error Handling](#error-handling)
7. [Testing Strategy](#testing-strategy)
8. [Best Practices](#best-practices)

---

## 🏗️ **OVERVIEW**

The mapper layer serves as the bridge between the database layer (Drizzle ORM) and the API layer (Zod contracts). All mappers are pure functions that transform data between these layers while maintaining type safety and consistency.

### Key Principles

- **Pure Functions**: All mappers are side-effect free
- **Type Safety**: Explicit input/output types from contracts
- **Consistency**: Standardized transformation patterns
- **Validation**: Schema validation on all outputs
- **Documentation**: Clear assumptions and limitations

---

## 🔄 **MAPPER ARCHITECTURE**

### Data Flow

```
Database (Drizzle) → Mapper → Contract (Zod) → API Response
     ↓                    ↓           ↓
snake_case         Transform    camelCase
Date objects       Process      ISO strings
Raw data          Compute      Computed fields
```

### Mapper Categories

1. **Entity Mappers**: `toUserProfileEntity()`, `toContentItemEntity()`
2. **Response Mappers**: `toUserProfileResponseDTO()`, `toContentItemResponseDTO()`
3. **Create Mappers**: `fromCreateUserProfile()`, `fromCreateContentItem()`
4. **Update Mappers**: `fromUpdateUserProfile()`, `fromUpdateContentItem()`
5. **Utility Functions**: `isUserProfileComplete()`, `getReadingTimeEstimate()`

---

## 🔄 **TRANSFORMATION PATTERNS**

### 1. Field Name Transformation

**Database (snake_case) → Contract (camelCase)**

```typescript
// Database field → Contract field
first_name → firstName
last_name → lastName
account_status → accountStatus
created_at → createdAt
updated_at → updatedAt
```

### 2. Date Handling

**Database (Date objects) → Contract (ISO strings)**

```typescript
// Database
createdAt: Date;

// Contract
createdAt: string; // ISO format: "2023-01-01T00:00:00.000Z"
```

### 3. Null Handling

**Database (null) → Contract (undefined or default values)**

```typescript
// Optional fields become undefined
displayName: row.displayName || undefined;

// Required fields get default values
theologicalFocus: Array.isArray(row.theological_focus)
  ? row.theological_focus
  : [];
```

### 4. Array Safety

**Safe array handling with defaults**

```typescript
// Safe array handling
coAuthors: Array.isArray(row.co_authors) ? row.co_authors : [];
tags: Array.isArray(row.tags) ? row.tags : [];
```

### 5. Complex Object Handling

**JSONB fields with type safety**

```typescript
// Safe object handling with defaults
brandColors: row.brand_colors || {
  accent: '#059669',
  primary: '#2563eb',
  secondary: '#64748b',
};
```

---

## ⚠️ **NON-REVERSIBLE TRANSFORMATIONS**

### 1. Computed Fields

These fields are **computed from other fields** and cannot be reversed:

#### User Profile Computed Fields

```typescript
// Computed from accountStatus
isActive: row.account_status === 'active';

// Computed from multiple fields
fullName: `${row.first_name} ${row.last_name}`;

// Computed from displayName or fullName
displayNameOrFullName: row.display_name || fullName;

// Computed from boolean flags
hasCustomDomain: !!row.custom_domain;
hasSubdomain: !!row.subdomain;

// Computed from privacy settings
isPublicProfile: row.privacy_settings?.publicProfile !== false;

// Computed from notification settings
canReceiveNotifications: Object.values(row.email_notifications || {}).some(
  Boolean
);

// Computed from assessment total
assessmentCompleted: !!row.assessment_total;

// Computed from APEST scores (highest two)
primaryGift: sortedGifts[0]; // Cannot reverse to individual scores
secondaryGift: sortedGifts[1]; // Cannot reverse to individual scores

// Computed from years in ministry
ministryExperience: `${years} year${s !== 1 ? 's' : ''} in ministry`;

// Computed from location data
locationDisplay: `${countryCode}${timezone ? ` (${timezone})` : ''}`;
```

#### Content Computed Fields

```typescript
// Computed from status
isPublished: row.status === 'published';
isDraft: row.status === 'draft';
isScheduled: row.status === 'scheduled' && future_date;
isArchived: row.status === 'archived';

// Computed from media fields
hasFeaturedImage: !!row.featured_image_url;
hasVideo: !!row.video_url;
hasAudio: !!row.audio_url;
hasAttachments: Array.isArray(row.attachments) && row.attachments.length > 0;

// Computed from AI enhancement
isAiEnhanced: row.ai_enhanced || false;

// Computed from reading time/word count
readingTimeText: estimated_reading_time
  ? `${estimated_reading_time} min read`
  : word_count
    ? `${Math.ceil(word_count / 200)} min read`
    : 'Unknown';

// Computed from view count (formatted)
viewCountText: count >= 1000000
  ? `${(count / 1000000).toFixed(1)}M`
  : count >= 1000
    ? `${(count / 1000).toFixed(1)}K`
    : count.toString();

// Computed engagement score (weighted algorithm)
engagementScore: weighted_algorithm(views, likes, shares, comments, bookmarks);
```

### 2. Date Formatting

**Date objects → ISO strings (irreversible)**

```typescript
// Database stores Date objects
createdAt: Date;

// Contract requires ISO strings
createdAt: row.created_at.toISOString(); // "2023-01-01T00:00:00.000Z"

// ⚠️ CANNOT REVERSE: ISO string cannot be converted back to original Date object
// The exact millisecond precision is lost in the transformation
```

### 3. Array/Object Defaults

**Null values → Default arrays/objects**

```typescript
// Database allows null
theological_focus: null;

// Contract requires array with default
theologicalFocus: row.theological_focus || [];

// ⚠️ CANNOT REVERSE: Empty array cannot distinguish from "never set"
```

---

## 🛡️ **TYPE SAFETY GUIDELINES**

### 1. Explicit Type Signatures

**All mapper functions must have explicit input/output types:**

```typescript
// ✅ Good: Explicit types
export function toUserProfileEntity(row: UserProfile): UserProfileEntity;

// ❌ Bad: Implicit any
export function toUserProfileEntity(row: any): any;
```

### 2. Schema Validation

**All mapper outputs must be validated against schemas:**

```typescript
// Validate output against schema
const validatedResult = userProfileEntitySchema.parse(result);
return validatedResult;
```

### 3. Null Coalescing

**Use consistent null handling patterns:**

```typescript
// ✅ Good: Explicit null handling
displayName: row.displayName || undefined;

// ✅ Good: Default values for required fields
theologicalFocus: Array.isArray(row.theologicalFocus)
  ? row.theologicalFocus
  : [];

// ❌ Bad: Inconsistent handling
displayName: row.displayName; // Could be null
```

### 4. Type Guards

**Use type guards for complex transformations:**

```typescript
// ✅ Good: Type guard for arrays
if (Array.isArray(row.co_authors)) {
  return row.co_authors;
}
return [];

// ❌ Bad: Unsafe casting
return row.co_authors as string[];
```

---

## 🚨 **ERROR HANDLING**

### 1. Input Validation

**Validate inputs before transformation:**

```typescript
export function toUserProfileEntity(row: UserProfile): UserProfileEntity {
  try {
    if (!row) {
      throw new Error('UserProfile is null or undefined');
    }
    // ... transformation logic
  } catch (error) {
    console.error('Error in toUserProfileEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowEmail: row?.email,
    });
    throw new Error(
      `Failed to transform UserProfileRow to UserProfileEntity: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
```

### 2. Schema Validation Errors

**Handle Zod validation errors gracefully:**

```typescript
try {
  const validatedResult = userProfileEntitySchema.parse(result);
  return validatedResult;
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Schema validation failed:', error.errors);
    throw new Error('Invalid user profile data structure');
  }
  throw error;
}
```

### 3. Database Constraint Violations

**Handle database-specific errors:**

```typescript
// In create/update mappers
try {
  return await db.insert(users).values(dbData).returning();
} catch (error) {
  if (error.code === '23505') {
    // Unique constraint violation
    throw new Error('User with this email already exists');
  }
  throw new Error('Database error occurred');
}
```

---

## 🧪 **TESTING STRATEGY**

### 1. Unit Tests

**Test all mapper functions with comprehensive fixtures:**

```typescript
describe('toUserProfileEntity', () => {
  it('should transform database row to UserProfileEntity correctly', () => {
    const result = toUserProfileEntity(mockUserProfileRow);
    expect(result).toMatchObject(expectedOutput);
  });

  it('should handle null and undefined values correctly', () => {
    const result = toUserProfileEntity(rowWithNulls);
    expect(result.displayName).toBeUndefined();
  });
});
```

### 2. Edge Case Testing

**Test edge cases and error conditions:**

```typescript
it('should handle empty arrays safely', () => {
  const result = toContentItemEntity(rowWithEmptyArrays);
  expect(result.tags).toEqual([]);
  expect(result.coAuthors).toEqual([]);
});

it('should throw error for invalid input', () => {
  expect(() => toUserProfileEntity(null)).toThrow();
});
```

### 3. Integration Tests

**Test mapper integration with contracts:**

```typescript
it('should produce valid contract output', () => {
  const result = toUserProfileEntity(mockRow);
  expect(() => userProfileEntitySchema.parse(result)).not.toThrow();
});
```

---

## ✅ **BEST PRACTICES**

### 1. Do's ✅

- **Always use explicit type signatures**
- **Validate all outputs against schemas**
- **Handle null/undefined values consistently**
- **Use type guards for complex transformations**
- **Provide meaningful error messages**
- **Test edge cases thoroughly**
- **Document non-reversible transformations**
- **Use pure functions only**
- **Format dates as ISO strings**
- **Provide default values for required fields**
- **Use null coalescing operators**
- **Validate array types before processing**

### 2. Don'ts ❌

- **Don't use `any` types**
- **Don't skip schema validation**
- **Don't ignore null/undefined values**
- **Don't use unsafe type casting**
- **Don't create side effects in mappers**
- **Don't return Date objects to API layer**
- **Don't leave computed fields undefined**
- **Don't skip error handling**
- **Don't use implicit returns**
- **Don't mutate input objects**
- **Don't skip edge case testing**
- **Don't forget to document assumptions**

---

## 📋 **MAPPER CHECKLIST**

### Before Implementing a New Mapper:

- [ ] Define explicit input/output types from contracts
- [ ] Plan transformation logic for all fields
- [ ] Identify computed fields and document them
- [ ] Plan null/undefined handling strategy
- [ ] Plan error handling approach
- [ ] Write comprehensive unit tests
- [ ] Test edge cases and error conditions
- [ ] Validate output against schema
- [ ] Document any non-reversible transformations
- [ ] Review type safety and consistency

### Before Deploying Mapper Changes:

- [ ] All tests pass
- [ ] No linting errors
- [ ] Schema validation works
- [ ] Error handling is comprehensive
- [ ] Documentation is updated
- [ ] Non-reversible transformations are documented
- [ ] Edge cases are tested
- [ ] Performance is acceptable
- [ ] Type safety is maintained

---

## 🔗 **RELATED DOCUMENTATION**

- [Alignment Reference](../ALIGNMENT_REFERENCE.md) - Complete alignment patterns
- [Contracts Guide](../CONTRACTS_AND_MAPPERS_GUIDE.md) - Contract system overview
- [Type System Guide](../MASTER/TYPE_SYSTEM_GUIDE.md) - TypeScript patterns
- [API Documentation](../MASTER/API_DOCUMENTATION.md) - API layer patterns

---

**This document serves as the authoritative guide for mapper implementation, transformation patterns, and alignment principles in the Alan Hirsch Digital Platform.**

_Last updated: 2025-01-27_
