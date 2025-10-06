# Contracts and Mappers Guide

**Updated:** 2025-01-27
**Source:** Current implementation analysis
**Project:** Alan Hirsch Digital Platform

## Overview

This document provides comprehensive documentation for the contracts and mappers system in the Alan Hirsch Digital Platform. The system ensures type safety and data consistency across all layers of the application.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Mappers       │    │   Contracts     │
│   (Drizzle)     │◄──►│   (Transform)   │◄──►│   (Zod Schemas) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Raw Data      │    │   Typed Data    │    │   API Response  │
│   (Database)    │    │   (Entities)    │    │   (Contracts)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Contracts Package Structure

### Location

```
packages/contracts/
├── src/
│   ├── entities/          # Single source of truth schemas
│   │   ├── user.schema.ts
│   │   ├── content.schema.ts
│   │   ├── assessment.schema.ts
│   │   ├── organization.schema.ts
│   │   └── index.ts
│   ├── operations/        # Derived operation schemas
│   │   ├── user.operations.ts
│   │   ├── content.operations.ts
│   │   ├── assessment.operations.ts
│   │   ├── organization.operations.ts
│   │   └── index.ts
│   ├── api/              # API contract schemas
│   │   ├── user.contracts.ts
│   │   ├── content.contracts.ts
│   │   ├── assessment.contracts.ts
│   │   ├── organization.contracts.ts
│   │   └── index.ts
│   └── index.ts          # Main exports
├── package.json
└── tsconfig.json
```

### Key Principles

1. **Entity-First Design**: All schemas derive from entity schemas
2. **Single Source of Truth**: Entity schemas are the authoritative source
3. **Type Safety**: Full TypeScript integration with Zod validation
4. **Consistency**: Uniform patterns across all domains

## Entity Schemas

### User Entity Schema

**File:** `packages/contracts/src/entities/user.schema.ts`

#### Core Types

```typescript
// Base user entity
export const UserEntitySchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),

  // Ministry context
  ministryRole: z.string(),
  denomination: z.string().optional(),
  organizationName: z.string().optional(),
  yearsInMinistry: z.number().int().positive().optional(),

  // Location & cultural context
  countryCode: z.string().length(2).optional(),
  timezone: z.string().optional(),
  culturalContext: z.string().optional(),

  // APEST assessment scores
  assessmentMovementAlignment: z.number().int().min(0).max(100).optional(),
  assessmentAudienceEngagement: z.number().int().min(0).max(100).optional(),
  assessmentContentReadiness: z.number().int().min(0).max(100).optional(),
  assessmentRevenuePotential: z.number().int().min(0).max(100).optional(),
  assessmentNetworkEffects: z.number().int().min(0).max(100).optional(),
  assessmentStrategicFit: z.number().int().min(0).max(100).optional(),
  assessmentTotal: z.number().int().min(0).max(500).optional(),

  // Leadership & platform
  leaderTier: z.string().optional(),
  subdomain: z.string().optional(),
  customDomain: z.string().optional(),
  platformTitle: z.string().optional(),
  languagePrimary: z.string().default('en'),
  subscriptionTier: z.string().default('free'),

  // Complex fields (JSONB)
  theologicalFocus: z.array(z.string()).default([]),
  brandColors: z
    .object({
      accent: z.string(),
      primary: z.string(),
      secondary: z.string(),
    })
    .default({
      accent: '#059669',
      primary: '#2563eb',
      secondary: '#64748b',
    }),
  emailNotifications: z
    .object({
      dailyDigest: z.boolean().default(true),
      revenueReports: z.boolean().default(true),
      communityUpdates: z.boolean().default(true),
      collaborationRequests: z.boolean().default(true),
    })
    .default({}),
  privacySettings: z
    .object({
      publicProfile: z.boolean().default(true),
      shareAnalytics: z.boolean().default(false),
      allowNetworking: z.boolean().default(true),
      showAssessmentResults: z.boolean().default(false),
    })
    .default({}),

  // Onboarding & status
  onboardingCompleted: z.boolean().default(false),
  onboardingStep: z.number().int().min(1).max(10).default(1),
  accountStatus: z
    .enum(['pending_verification', 'active', 'suspended', 'deleted'])
    .default('pending_verification'),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime(),
});

export type UserEntity = z.infer<typeof UserEntitySchema>;
```

#### Response Types

```typescript
// User profile response with computed fields
export const UserProfileResponseSchema = UserEntitySchema.extend({
  // Computed fields
  isActive: z.boolean(),
  hasCompletedOnboarding: z.boolean(),
  fullName: z.string(),
  displayNameOrFullName: z.string(),
  hasCustomDomain: z.boolean(),
  hasSubdomain: z.boolean(),
  isPublicProfile: z.boolean(),
  canReceiveNotifications: z.boolean(),
  assessmentCompleted: z.boolean(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  ministryExperience: z.string().optional(),
  locationDisplay: z.string().optional(),

  // Related data
  organization: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      type: z.string(),
    })
    .optional(),
  subscription: z
    .object({
      id: z.string().uuid(),
      planName: z.string(),
      status: z.string(),
      tier: z.string(),
    })
    .optional(),
});

export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
```

### Content Entity Schema

**File:** `packages/contracts/src/entities/content.schema.ts`

#### Core Types

```typescript
// Content item entity
export const ContentItemEntitySchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),

  // Author information
  authorId: z.string().uuid(),
  coAuthors: z
    .array(
      z.object({
        id: z.string().uuid(),
        firstName: z.string(),
        lastName: z.string(),
        displayName: z.string().optional(),
      })
    )
    .default([]),

  // Content classification
  contentType: z.enum([
    'article',
    'video',
    'audio',
    'podcast',
    'course',
    'book',
  ]),
  format: z
    .enum(['text', 'markdown', 'html', 'video', 'audio'])
    .default('text'),

  // Content metrics
  wordCount: z.number().int().positive().optional(),
  estimatedReadingTime: z.number().int().positive().optional(),

  // Engagement metrics
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  bookmarkCount: z.number().int().min(0).default(0),

  // Categorization
  primaryCategoryId: z.string().uuid().optional(),
  secondaryCategories: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  theologicalThemes: z.array(z.string()).default([]),

  // Series information
  seriesId: z.string().uuid().optional(),
  seriesOrder: z.number().int().positive().optional(),

  // Visibility & status
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  status: z
    .enum(['draft', 'published', 'scheduled', 'archived'])
    .default('draft'),

  // AI enhancement
  networkAmplificationScore: z.number().min(0).max(10).default(0),
  crossReferenceCount: z.number().int().min(0).default(0),
  aiEnhanced: z.boolean().default(false),
  aiSummary: z.string().optional(),
  aiKeyPoints: z.array(z.string()).default([]),

  // Media & attachments
  featuredImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        type: z.string(),
        size: z.number().int().positive(),
      })
    )
    .default([]),

  // SEO & metadata
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  originalSource: z.string().optional(),

  // Publication & scheduling
  publishedAt: z.string().datetime().optional(),
  scheduledAt: z.string().datetime().optional(),

  // Licensing
  licenseType: z
    .enum(['all_rights_reserved', 'creative_commons', 'public_domain'])
    .default('all_rights_reserved'),
  attributionRequired: z.boolean().default(true),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ContentItemEntity = z.infer<typeof ContentItemEntitySchema>;
```

#### Response Types

```typescript
// Content item response with computed fields
export const ContentItemResponseSchema = ContentItemEntitySchema.extend({
  // Computed fields
  isPublished: z.boolean(),
  isDraft: z.boolean(),
  isScheduled: z.boolean(),
  isArchived: z.boolean(),
  hasFeaturedImage: z.boolean(),
  hasVideo: z.boolean(),
  hasAudio: z.boolean(),
  hasAttachments: z.boolean(),
  isAiEnhanced: z.boolean(),
  readingTimeText: z.string(),
  viewCountText: z.string(),
  engagementScore: z.number().min(0).max(10),

  // Related data
  author: z
    .object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string().optional(),
      avatarUrl: z.string().url().optional(),
    })
    .optional(),
  primaryCategory: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
    })
    .optional(),
  series: z
    .object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
      totalEpisodes: z.number().int().min(0),
    })
    .optional(),
  coAuthors: z
    .array(
      z.object({
        id: z.string().uuid(),
        firstName: z.string(),
        lastName: z.string(),
        displayName: z.string().optional(),
      })
    )
    .default([]),
});

export type ContentItemResponse = z.infer<typeof ContentItemResponseSchema>;
```

### Assessment Entity Schema

**File:** `packages/contracts/src/entities/assessment.schema.ts`

#### Core Types

```typescript
// Assessment entity
export const AssessmentEntitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  assessmentType: z.enum([
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ]),
  questionsCount: z.number().int().positive(),
  estimatedDuration: z.number().int().positive().optional(),
  passingScore: z.number().int().min(0).optional(),
  validityScore: z.number().min(0).max(1).optional(),
  reliabilityScore: z.number().min(0).max(1).optional(),
  instructions: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  version: z.string().default('1.0'),
  language: z.string().default('en'),
  culturalAdaptation: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
    ])
    .default('universal'),
  researchBacked: z.boolean().default(false),
  scoringMethod: z
    .enum(['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'])
    .default('likert_5'),
  status: z
    .enum(['draft', 'active', 'archived', 'under_review'])
    .default('draft'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type AssessmentEntity = z.infer<typeof AssessmentEntitySchema>;
```

### Organization Entity Schema

**File:** `packages/contracts/src/entities/organization.schema.ts`

#### Core Types

```typescript
// Organization entity
export const OrganizationEntitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  organizationType: z.string(),
  sizeCategory: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
  billingEmail: z.string().email().optional(),
  accountOwnerId: z.string().uuid().optional(),
  licenseType: z
    .enum(['individual', 'team', 'enterprise'])
    .default('individual'),
  maxUsers: z.number().int().positive().default(1),
  status: z
    .enum(['trial', 'active', 'suspended', 'cancelled'])
    .default('trial'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type OrganizationEntity = z.infer<typeof OrganizationEntitySchema>;
```

## Mappers Implementation

### Location

```
apps/alan-hirsch-platform/lib/mappers/
├── user.ts              # User profile mappers
├── content.ts           # Content mappers
└── index.ts             # Mapper exports
```

### User Mappers

**File:** `apps/alan-hirsch-platform/lib/mappers/user.ts`

#### Key Functions

```typescript
// Transform database row to UserProfileEntity
export function toUserProfileEntity(row: UserProfileRow): UserProfileEntity;

// Transform database row to UserProfileResponse with computed fields
export function toUserProfileResponseDTO(
  row: UserProfileRow & {
    organization?: { id: string; name: string; slug: string; type: string };
    subscription?: {
      id: string;
      planName: string;
      status: string;
      tier: string;
    };
  }
): UserProfileResponse;

// Transform CreateUserProfile to database insert format
export function fromCreateUserProfile(
  data: CreateUserProfile
): Partial<UserProfileRow>;

// Transform UpdateUserProfile to database update format
export function fromUpdateUserProfile(
  data: UpdateUserProfile
): Partial<UserProfileRow>;

// Transform multiple database rows to arrays
export function toUserProfileResponseArray(
  rows: UserProfileRow[]
): UserProfileResponse[];
export function toUserProfileEntityArray(
  rows: UserProfileRow[]
): UserProfileEntity[];
```

#### Utility Functions

```typescript
// Check if user profile is complete for onboarding
export function isUserProfileComplete(profile: UserProfileResponse): boolean;

// Get user's display name with fallback
export function getUserDisplayName(profile: UserProfileResponse): string;

// Get user's APEST profile summary
export function getAPESTProfile(profile: UserProfileResponse): {
  primary: string;
  secondary: string;
  scores: Record<string, number>;
} | null;

// Check if user has specific permission
export function hasUserPermission(
  profile: UserProfileResponse,
  permission: string
): boolean;

// Get user's subscription status
export function getUserSubscriptionStatus(profile: UserProfileResponse): {
  tier: string;
  isActive: boolean;
  isPremium: boolean;
};
```

### Content Mappers

**File:** `apps/alan-hirsch-platform/lib/mappers/content.ts`

#### Key Functions

```typescript
// Transform database row to ContentItemEntity
export function toContentItemEntity(row: ContentItemRow): ContentItemEntity;

// Transform database row to ContentItemResponse with computed fields
export function toContentItemResponseDTO(
  row: ContentItemRow & {
    author?: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
    primaryCategory?: { id: string; name: string; slug: string };
    series?: { id: string; title: string; slug: string; totalEpisodes: number };
    coAuthors?: Array<{
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
    }>;
  }
): ContentItemResponse;

// Transform CreateContentItem to database insert format
export function fromCreateContentItem(
  data: CreateContentItem
): Partial<ContentItemRow>;

// Transform UpdateContentItem to database update format
export function fromUpdateContentItem(
  data: UpdateContentItem
): Partial<ContentItemRow>;

// Transform multiple database rows to arrays
export function toContentItemResponseArray(
  rows: ContentItemRow[]
): ContentItemResponse[];
export function toContentCategoryResponseArray(
  rows: ContentCategoryRow[]
): ContentCategoryResponse[];
export function toContentSeriesResponseArray(
  rows: ContentSeriesRow[]
): ContentSeriesResponse[];
```

#### Utility Functions

```typescript
// Check if content is publicly accessible
export function isContentPublic(content: ContentItemResponse): boolean;

// Get content display information
export function getContentDisplayInfo(content: ContentItemResponse): {
  title: string;
  author: string;
  category: string;
  status: string;
  engagement: string;
};

// Check if content needs attribution
export function requiresAttribution(content: ContentItemResponse): boolean;

// Get content reading time estimate
export function getReadingTimeEstimate(content: ContentItemResponse): string;
```

## Data Flow Patterns

### Pattern 1: Database → Entity → Response

```typescript
// 1. Database query returns raw row
const row = await db
  .select()
  .from(userProfiles)
  .where(eq(userProfiles.id, userId));

// 2. Transform to entity
const entity = toUserProfileEntity(row);

// 3. Transform to response with computed fields
const response = toUserProfileResponseDTO(row);
```

### Pattern 2: API Request → Entity → Database

```typescript
// 1. Validate request data
const createData = CreateUserProfileSchema.parse(requestBody);

// 2. Transform to database format
const dbData = fromCreateUserProfile(createData);

// 3. Insert into database
const result = await db.insert(userProfiles).values(dbData).returning();
```

### Pattern 3: Update Flow

```typescript
// 1. Validate update data
const updateData = UpdateUserProfileSchema.parse(requestBody);

// 2. Transform to database format
const dbUpdate = fromUpdateUserProfile(updateData);

// 3. Update database
const result = await db
  .update(userProfiles)
  .set(dbUpdate)
  .where(eq(userProfiles.id, userId))
  .returning();
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

## Validation and Testing

### Schema Validation

```typescript
// Validate mapper output against contract schema
const result = toUserProfileResponseDTO(row);
const validated = UserProfileResponseSchema.parse(result);
```

### Unit Testing

```typescript
describe('User Mappers', () => {
  it('should produce valid UserProfileResponse', () => {
    const mockRow = {
      id: '123',
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      // ... other required fields
    };

    const result = toUserProfileResponseDTO(mockRow);

    // Validate against contract schema
    expect(() => UserProfileResponseSchema.parse(result)).not.toThrow();

    // Verify specific fields
    expect(result.isActive).toBe(true);
    expect(result.fullName).toBe('John Doe');
  });
});
```

## Migration Guide

### From Legacy Mappers

1. **Update imports** to use new contract types
2. **Add computed fields** to response mappers
3. **Handle optional fields** with proper null coalescing
4. **Format dates** as ISO strings consistently
5. **Add utility functions** for common operations

### Adding New Mappers

1. **Create entity schema** in contracts package
2. **Create response schema** with computed fields
3. **Implement mapper functions** following established patterns
4. **Add utility functions** for common operations
5. **Write comprehensive tests** for all functions

## Troubleshooting

### Common Issues

1. **Type Mismatches**: Ensure mapper output matches contract schema
2. **Missing Fields**: Add all required fields to mappers
3. **Date Formatting**: Always use `.toISOString()` for dates
4. **Array Handling**: Use proper array validation and defaults
5. **Optional Fields**: Handle null/undefined values properly

### Debug Mode

Enable debug mode for detailed validation information:

```typescript
// Add validation logging
const result = toUserProfileResponseDTO(row);
try {
  const validated = UserProfileResponseSchema.parse(result);
  console.log('✅ Mapper output is valid');
} catch (error) {
  console.error('❌ Mapper output validation failed:', error);
}
```

## Success Metrics

### ✅ Complete When:

1. **All mappers** produce contract-compliant output
2. **No raw database types** are returned from API endpoints
3. **All computed fields** are properly calculated
4. **Date formatting** is consistent across all mappers
5. **Array handling** is consistent and safe
6. **Utility functions** cover all common use cases
7. **Tests** validate all mapper functions

### 🚨 Red Flags:

- Mappers returning raw database types
- Missing computed fields in responses
- Inconsistent date formatting
- Null arrays instead of empty arrays
- Missing validation in mapper output
- No utility functions for common operations

---

_This guide ensures that the contracts and mappers system maintains type safety and data consistency across the entire application._
