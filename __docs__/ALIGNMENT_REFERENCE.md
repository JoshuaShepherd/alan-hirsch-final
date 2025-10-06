# Alan Hirsch Platform - Complete Alignment Reference

**Created:** 2025-01-27
**Purpose:** Single source of truth for contracts, mappers, types, API, and validation patterns
**Status:** ✅ **COMPLETE** - All essential alignment information consolidated

---

## 📚 **TABLE OF CONTENTS**

1. [Architecture Overview](#architecture-overview)
2. [Contract Schemas (Zod)](#contract-schemas-zod)
3. [Mapper Functions](#mapper-functions)
4. [TypeScript Patterns](#typescript-patterns)
5. [API Endpoints & Services](#api-endpoints--services)
6. [Database Schema & Relationships](#database-schema--relationships)
7. [Validation Patterns](#validation-patterns)
8. [Error Handling](#error-handling)
9. [Best Practices](#best-practices)
10. [Quick Reference](#quick-reference)

---

## 🏗️ **ARCHITECTURE OVERVIEW**

### Data Flow Architecture

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

### Service Layer Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Routes    │    │   Services      │    │   Database      │
│   (Type-Safe)   │◄──►│   (Business)    │◄──►│   (Drizzle)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Validation    │    │   Mappers       │    │   Raw Data      │
│   (Zod)         │    │   (Transform)   │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📋 **CONTRACT SCHEMAS (ZOD)**

### User Entity Schema

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

### User Response Schema (with computed fields)

```typescript
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

```typescript
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

### Assessment Entity Schema

```typescript
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

```typescript
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

---

## 🔄 **MAPPER FUNCTIONS**

### User Mappers ✅ **ALIGNED**

**Purpose**: Transform user profile data between database and API formats.

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
): Omit<NewUserProfileRow, 'id' | 'createdAt' | 'updatedAt' | 'lastActiveAt'>;

// Transform UpdateUserProfile to database update format
export function fromUpdateUserProfile(
  data: UpdateUserProfile
): Partial<UserProfileRow>;

// Utility functions
export function isUserProfileComplete(profile: UserProfileResponse): boolean;
export function getUserDisplayName(profile: UserProfileResponse): string;
export function getAPESTProfile(
  profile: UserProfileResponse
): APESTProfile | null;
```

**Key Transformations**:

- Snake_case to camelCase field mapping
- Date objects to ISO strings
- Null values to undefined for optional fields
- Computed fields: `isActive`, `hasCompletedOnboarding`, `fullName`, `displayNameOrFullName`
- APEST gift calculation from assessment scores
- Boolean null handling: `hasCompletedOnboarding: row.onboardingCompleted === true`

### Content Mappers ✅ **ALIGNED**

**Purpose**: Transform content items, categories, and series data.

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

// Content Category mappers
export function toContentCategoryEntity(
  row: ContentCategoryRow
): ContentCategoryEntity;
export function toContentCategoryResponseDTO(
  row: ContentCategoryRow
): ContentCategoryResponse;
export function fromCreateContentCategory(
  data: CreateContentCategory
): Partial<ContentCategoryRow>;
export function fromUpdateContentCategory(
  data: UpdateContentCategory
): Partial<ContentCategoryRow>;

// Content Series mappers
export function toContentSeriesEntity(
  row: ContentSeriesRow
): ContentSeriesEntity;
export function toContentSeriesResponseDTO(
  row: ContentSeriesRow
): ContentSeriesResponse;
export function fromCreateContentSeries(
  data: CreateContentSeries
): Partial<ContentSeriesRow>;
export function fromUpdateContentSeries(
  data: UpdateContentSeries
): Partial<ContentSeriesRow>;
```

**Key Transformations**:

- Boolean null handling: `isAiEnhanced: row.aiEnhanced === true`
- Scheduled content validation: `isScheduled: row.status === 'scheduled' && !!row.scheduledAt && new Date(row.scheduledAt) > new Date()`
- Reading time estimation and formatting
- View count and engagement score calculations
- Series completion percentage calculation
- Null coalescing for optional fields: `?? undefined`

### Assessment Mappers ✅ **ALIGNED**

**Purpose**: Transform assessment data including questions, user assessments, and responses.

```typescript
// Transform database row to AssessmentEntity
export function toAssessmentResponseDTO(row: AssessmentRow): AssessmentEntity;

// Transform database row to AssessmentQuestionResponse with computed fields
export function toAssessmentQuestionResponseDTO(
  row: AssessmentQuestionRow
): AssessmentQuestionResponse;

// Transform database row to UserAssessmentResponse
export function toUserAssessmentResponseDTO(
  row: UserAssessmentRow
): UserAssessmentResponse;

// Transform database row to AssessmentResponseResponse
export function toAssessmentResponseResponseDTO(
  row: AssessmentResponseRow
): AssessmentResponseResponse;

// Create/Update mappers
export function fromCreateAssessment(
  data: CreateAssessment
): Partial<AssessmentRow>;
export function fromUpdateAssessment(
  data: UpdateAssessment
): Partial<AssessmentRow>;
export function fromCreateAssessmentQuestion(
  data: CreateAssessmentQuestion
): Partial<AssessmentQuestionRow>;
export function fromUpdateAssessmentQuestion(
  data: UpdateAssessmentQuestion
): Partial<AssessmentQuestionRow>;
export function fromCreateUserAssessment(
  data: CreateUserAssessment
): Partial<UserAssessmentRow>;
export function fromUpdateUserAssessment(
  data: UpdateUserAssessment
): Partial<UserAssessmentRow>;

// Utility functions
export function formatDuration(minutes: number | null): string | null;
export function formatResponseTime(seconds: number | null): string | null;
export function calculateScorePercentage(
  totalScore: number | null,
  maxPossibleScore: number | null
): number | null;
```

**Key Transformations**:

- Decimal field conversion: `validityScore: row.validityScore ? Number(row.validityScore) : undefined`
- Date objects to ISO strings
- APEST score calculations and gift determination
- Assessment completion status and progress tracking
- Response time and confidence level formatting
- Paginated list responses with proper data structure

### Organization Mappers ✅ **ALIGNED**

**Purpose**: Transform organization and membership data.

```typescript
// Transform database row to OrganizationEntity
export function toOrganizationEntity(row: OrganizationRow): OrganizationEntity;

// Transform database row to OrganizationResponse with computed fields
export function toOrganizationResponseDTO(
  row: OrganizationRow & {
    owner?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    members?: Array<{
      id: string;
      userId: string;
      role: string;
      status: string;
      joinedAt: string;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      };
    }>;
    memberCount?: number;
  }
): OrganizationResponse;

// Transform database row to OrganizationMembershipEntity
export function toOrganizationMembershipEntity(
  row: OrganizationMembershipRow
): OrganizationMembershipEntity;

// Transform database row to OrganizationMembershipResponse
export function toOrganizationMembershipResponseDTO(
  row: OrganizationMembershipRow
): OrganizationMembershipResponse;

// Create/Update mappers
export function fromCreateOrganization(
  data: CreateOrganization
): NewOrganizationRow;
export function fromUpdateOrganization(
  data: UpdateOrganization
): Partial<NewOrganizationRow>;
export function fromCreateOrganizationMembership(
  data: CreateOrganizationMembership
): Omit<
  NewOrganizationMembershipRow,
  'id' | 'createdAt' | 'updatedAt' | 'joinedAt'
>;
export function fromUpdateOrganizationMembership(
  data: UpdateOrganizationMembership
): Partial<NewOrganizationMembershipRow>;
```

**Key Transformations**:

- Date objects to ISO strings: `joinedAt: row.joinedAt?.toISOString() ?? undefined`
- Computed fields: `isActive`, `isTrial`, `hasCustomLogo`, `hasWebsite`, `memberCount`, `displayName`, `statusDisplay`, `licenseTypeDisplay`
- Membership computed fields: `isActive`, `isPending`, `canManage`, `roleDisplay`, `statusDisplay`
- Validation with `safeParse` for all mapper functions
- Null coalescing for optional fields: `?? undefined`
- Default values for create operations: `status: 'trial'`, `licenseType: 'individual'`, `maxUsers: 1`
- Partial updates handling for update operations

### AI Mappers ✅ **ALIGNED**

**Purpose**: Transform AI system data including conversations, messages, content jobs, and theological concepts.

```typescript
// Transform AI conversation row to response DTO
export function toAiConversationResponseDTO(
  row: AiConversationRow
): AiConversationResponse;

// Transform AI message row to response DTO
export function toAiMessageResponseDTO(row: AiMessageRow): AiMessageResponse;

// Transform AI content job row to response DTO
export function toAiContentJobResponseDTO(
  row: AiContentJobRow
): AiContentJobResponse;

// Transform AI cross-reference suggestion row to response DTO
export function toAiCrossReferenceSuggestionResponseDTO(
  row: AiCrossReferenceSuggestionRow
): AiCrossReferenceSuggestionResponse;

// Transform theological concept row to response DTO
export function toTheologicalConceptResponseDTO(
  row: TheologicalConceptRow
): TheologicalConceptResponse;

// Paginated list response mappers
export function toPaginatedAiConversationListResponseDTO(
  conversations: AiConversationRow[],
  pagination: PaginationInfo
): PaginatedAiConversationListResponse;

export function toPaginatedAiMessageListResponseDTO(
  messages: AiMessageRow[],
  pagination: PaginationInfo
): PaginatedAiMessageListResponse;

export function toPaginatedAiContentJobListResponseDTO(
  contentJobs: AiContentJobRow[],
  pagination: PaginationInfo
): PaginatedAiContentJobListResponse;

export function toPaginatedAiCrossReferenceSuggestionListResponseDTO(
  suggestions: AiCrossReferenceSuggestionRow[],
  pagination: PaginationInfo
): PaginatedAiCrossReferenceSuggestionListResponse;

export function toPaginatedTheologicalConceptListResponseDTO(
  concepts: TheologicalConceptRow[],
  pagination: PaginationInfo
): PaginatedTheologicalConceptListResponse;
```

**Key Transformations**:

- Complex computed fields for AI conversations: `isActive`, `isCompleted`, `isAbandoned`, `isArchived`, `hasUserRating`, `conversationDurationText`, `tokenUsageText`
- Message role-based computed fields: `isUserMessage`, `isAssistantMessage`, `isSystemMessage`, `hasUserRating`, `hasUserFeedback`, `isFlagged`, `processingTimeText`, `confidenceText`
- Content job status computed fields: `isPending`, `isProcessing`, `isCompleted`, `isFailed`, `isCancelled`, `hasError`, `needsHumanReview`, `isHighPriority`, `processingCostText`, `confidenceText`
- Cross-reference suggestion computed fields: `isPending`, `isApproved`, `isRejected`, `isImplemented`, `needsReview`, `hasHighConfidence`, `hasHighRelevance`
- Validation with `safeParse` for all response DTOs
- Complex nested object handling for theological context, user APEST profiles, and ministry context
- Decimal string conversion for confidence and relevance scores
- Array handling for referenced content, cited content, and related concepts

### Key Mapper Patterns ✅ **ALIGNED**

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

// Boolean null handling
hasCompletedOnboarding: row.onboardingCompleted === true;
isAiEnhanced: row.aiEnhanced === true;
isScheduled: row.status === 'scheduled' &&
  !!row.scheduledAt &&
  new Date(row.scheduledAt) > new Date();

// Decimal field conversion (database stores as strings)
validityScore: row.validityScore ? Number(row.validityScore) : undefined;
culturalAdjustmentFactor: row.culturalAdjustmentFactor
  ? Number(row.culturalAdjustmentFactor)
  : undefined;

// Null to undefined conversion
description: row.description ?? undefined;
customDomain: row.customDomain ?? undefined;

// Process.env access with index signature
process.env['NODE_ENV'] !== 'production';

// Import schemas as values for validation
import { userProfileResponseSchema } from '@platform/contracts'; // Not import type

// Computed boolean fields
isActive: row.account_status === 'active';
isPublished: row.status === 'published';
hasCustomDomain: !!row.custom_domain;

// Computed string fields
fullName: `${row.first_name} ${row.last_name}`;
displayNameOrFullName: row.display_name || fullName;

// Validation with safeParse (NEW PATTERN)
const validation = entitySchema.safeParse(entity);
if (!validation.success) {
  console.error('Entity validation failed:', validation.error);
  throw new Error('Invalid entity data');
}
return validation.data;

// Response DTO validation pattern
const validation = responseSchema.safeParse(response);
if (!validation.success) {
  console.error('Response validation failed:', validation.error);
  throw new Error('Invalid response data');
}
return validation.data;

// Create/Update mapper validation
const validation = createSchema.safeParse(data);
if (!validation.success) {
  console.error('Create data validation failed:', validation.error);
  throw new Error('Invalid create data');
}
const validatedData = validation.data;
```

---

## 📝 **TYPESCRIPT PATTERNS**

### API Response Types

```typescript
// Standard API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginated response
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error response
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
```

### Database Types

```typescript
// Base entity with common fields
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Assessment with relations
interface Assessment extends BaseEntity {
  title: string;
  description: string;
  userId: string;
  organizationId: string;
  status: 'draft' | 'published' | 'archived';
  questions: Question[];
  results?: AssessmentResult[];
}

// Question with proper typing
interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'boolean';
  options?: string[];
  required: boolean;
  order: number;
}
```

### Component Prop Patterns

```typescript
// Form component with proper typing
interface AssessmentFormProps {
  initialData?: Partial<Assessment>;
  onSubmit: (data: CreateAssessmentInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
}
```

---

## 🌐 **API ENDPOINTS & SERVICES**

### User API Endpoints

```
GET    /api/users                    - List users with pagination and filtering
POST   /api/users                    - Create new user
GET    /api/users/[id]               - Get user by ID
PUT    /api/users/[id]               - Update user
DELETE /api/users/[id]               - Delete user
GET    /api/user/profile             - Get current user profile
PUT    /api/user/profile             - Update current user profile
```

### Content API Endpoints

```
GET    /api/content                  - List content with pagination and filtering
POST   /api/content                  - Create new content
GET    /api/content/[id]             - Get content by ID
PUT    /api/content/[id]             - Update content
DELETE /api/content/[id]             - Delete content
POST   /api/content/[id]/publish     - Publish content
POST   /api/content/[id]/archive     - Archive content
```

### Assessment API Endpoints

```
GET    /api/assessments              - List assessments with pagination
POST   /api/assessments              - Create new assessment
GET    /api/assessments/[id]         - Get assessment by ID
PUT    /api/assessments/[id]         - Update assessment
DELETE /api/assessments/[id]         - Delete assessment
GET    /api/assessments/[id]/questions - Get assessment questions
POST   /api/assessments/[id]/questions - Add question to assessment
GET    /api/assessments/[id]/responses - Get assessment responses
POST   /api/assessments/[id]/responses - Submit assessment response
```

### Organization API Endpoints

```
GET    /api/organizations            - List organizations with pagination
POST   /api/organizations            - Create new organization
GET    /api/organizations/[id]       - Get organization by ID
PUT    /api/organizations/[id]       - Update organization
DELETE /api/organizations/[id]       - Delete organization
GET    /api/organizations/[id]/members - Get organization members
POST   /api/organizations/[id]/members - Add member to organization
POST   /api/organizations/[id]/invite - Invite user to organization
```

### Service Layer Methods

```typescript
// User Service
userService.create(data, context);
userService.findById(id);
userService.findByEmail(email);
userService.findBySubdomain(subdomain);
userService.updateAPESTScores(id, scores);
userService.completeOnboarding(id);
userService.getUserStats(id);

// Content Service
contentService.create(data, context);
contentService.publish(id, context);
contentService.archive(id, context);
contentService.incrementViewCount(id);
contentService.updateEngagementMetrics(id, metrics);
contentService.searchContent(query, filters);
contentService.getContentStats(id);

// Assessment Service
assessmentService.create(data, context);
assessmentService.addQuestion(id, question);
assessmentService.submitResponse(id, response, context);
assessmentService.startUserAssessment(id, userId);
assessmentService.completeUserAssessment(id, userId);
assessmentService.getAssessmentStats(id);
assessmentService.publish(id);

// Organization Service
organizationService.create(data, context);
organizationService.addMember(id, userId, role);
organizationService.inviteUser(id, email, role, context);
organizationService.acceptInvitation(id, userId);
organizationService.removeMember(id, userId, context);
organizationService.getOrganizationStats(id);
```

---

## 🗄️ **DATABASE SCHEMA & RELATIONSHIPS**

### Field Mapping Examples

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

### Content Field Mapping

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

### Schema Hierarchy

```
Entity Schema (Base)
    ├── Response Schema (Entity + Computed Fields)
    ├── Create Schema (Entity - Auto Fields)
    ├── Update Schema (Create Schema + Partial)
    └── Query Schema (Filtering & Pagination)
```

---

## ✅ **VALIDATION PATTERNS**

### Zod Schema Patterns

```typescript
// User validation schemas
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Assessment validation schemas
export const CreateAssessmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const CreateQuestionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['multiple-choice', 'text', 'rating', 'boolean']),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(true),
  order: z.number().min(0),
});
```

### Form Hook Patterns

```typescript
// Custom form hook with validation
export function useAssessmentForm(initialData?: Partial<Assessment>) {
  const [formData, setFormData] = useState<CreateAssessmentInput>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (data: CreateAssessmentInput): boolean => {
    try {
      CreateAssessmentSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const updateField = (field: keyof CreateAssessmentInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const submit = async (): Promise<boolean> => {
    if (!validate(formData)) return false;

    setLoading(true);
    try {
      // Submit logic here
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    updateField,
    submit,
    validate: () => validate(formData),
  };
}
```

---

## 🚨 **ERROR HANDLING**

### API Error Handling

```typescript
// API route error handling
export async function GET(request: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { success: false, error: 'Database error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Client-Side Error Handling

```typescript
// React component error handling
export function UserProfile({ userId }: ComponentProps) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}`);
        const result: ApiResponse<User> = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Failed to fetch user');
        }

        setUser(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

### Database Query Patterns

```typescript
// Type-safe database queries
export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error('Database error:', error);
    throw new DatabaseError('Failed to fetch user');
  }
}

// Insert with proper typing
export async function createUser(userData: CreateUserInput): Promise<User> {
  try {
    const result = await db
      .insert(users)
      .values({
        ...userData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!result[0]) {
      throw new DatabaseError('Failed to create user');
    }

    return result[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new DatabaseError('Failed to create user');
  }
}
```

---

## 🎯 **BEST PRACTICES**

### Do's ✅

- Always define explicit return types for functions
- Use proper interfaces for object shapes
- Prefer union types over `any`
- Use generic types for reusable components
- Handle null/undefined cases explicitly
- Validate all external data with Zod schemas
- Use proper error types, not `any`
- Implement error boundaries in React components
- Use Drizzle's type-safe queries
- Handle database errors gracefully
- Always use mappers for all transformations
- Use null coalescing for optional fields
- Always format dates as ISO strings
- Add computed fields in response mappers
- Always return arrays, never null
- Implement bidirectional mappers (toEntity, toResponseDTO, fromCreate, fromUpdate)
- Use safeParse validation in all mapper functions
- Handle partial updates correctly with Partial<> types
- Provide default values for create operations
- Use proper type exports for mapper functions

### Don'ts ❌

- Don't use `any` types without team discussion
- Don't use non-null assertions (`!`) unless absolutely necessary
- Don't ignore TypeScript errors
- Don't use implicit any in function parameters
- Don't expose sensitive data to client
- Don't skip input validation
- Don't use raw database rows in API responses
- Don't define Zod schemas outside contracts/validations directories
- Don't return raw database rows
- Don't leave null values for optional fields
- Don't return Date objects
- Don't leave computed fields undefined
- Don't return null for missing arrays
- Don't skip validation in mapper functions
- Don't use any types in mapper function signatures
- Don't expose internal database field names in API responses
- Don't forget to handle optional fields in create/update mappers

---

## 📚 **QUICK REFERENCE**

### File Locations

```
packages/contracts/src/entities/     - Entity schemas (Zod)
packages/contracts/src/operations/   - Operation schemas
packages/contracts/src/api/          - API contract schemas
apps/alan-hirsch-platform/lib/mappers/ - Mapper functions
apps/alan-hirsch-platform/lib/services/ - Business logic services
apps/alan-hirsch-platform/app/auth/api/ - API route handlers
packages/database/src/schema/        - Database schema (Drizzle)
```

### Common Patterns

```typescript
// 1. Database → Entity → Response
const row = await db.select().from(table).where(eq(id, userId));
const entity = toEntityMapper(row);
const response = toResponseMapper(row);

// 2. API Request → Entity → Database
const validatedData = CreateSchema.parse(requestBody);
const dbData = fromCreateMapper(validatedData);
const result = await db.insert(table).values(dbData).returning();

// 3. Update Flow
const updateData = UpdateSchema.parse(requestBody);
const dbUpdate = fromUpdateMapper(updateData);
const result = await db
  .update(table)
  .set(dbUpdate)
  .where(eq(id, userId))
  .returning();

// 4. Complete Bidirectional Mapper Pattern
export function toEntityMapper(row: Row): Entity {
  const entity = {
    // ... mapping logic
  };
  const validation = entitySchema.safeParse(entity);
  if (!validation.success) {
    console.error('Entity validation failed:', validation.error);
    throw new Error('Invalid entity data');
  }
  return validation.data;
}

export function toResponseDTOMapper(row: Row): ResponseDTO {
  const entity = toEntityMapper(row);
  const response = {
    ...entity,
    // ... computed fields
  };
  const validation = responseSchema.safeParse(response);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

export function fromCreateMapper(data: CreateData): NewRow {
  const validation = createSchema.safeParse(data);
  if (!validation.success) {
    console.error('Create data validation failed:', validation.error);
    throw new Error('Invalid create data');
  }
  const validatedData = validation.data;
  return {
    ...validatedData,
    // ... default values
  };
}

export function fromUpdateMapper(data: UpdateData): Partial<NewRow> {
  const validation = updateSchema.safeParse(data);
  if (!validation.success) {
    console.error('Update data validation failed:', validation.error);
    throw new Error('Invalid update data');
  }
  const validatedData = validation.data;
  // Filter out undefined values
  return Object.fromEntries(
    Object.entries(validatedData).filter(([_, value]) => value !== undefined)
  ) as Partial<NewRow>;
}
```

### Key Utilities

```typescript
// Check if user profile is complete for onboarding
isUserProfileComplete(profile: UserProfileResponse): boolean;

// Get user's display name with fallback
getUserDisplayName(profile: UserProfileResponse): string;

// Get user's APEST profile summary
getAPESTProfile(profile: UserProfileResponse): {
  primary: string;
  secondary: string;
  scores: Record<string, number>;
} | null;

// Check if content is publicly accessible
isContentPublic(content: ContentItemResponse): boolean;

// Get content reading time estimate
getReadingTimeEstimate(content: ContentItemResponse): string;
```

---

**This document serves as the single source of truth for all alignment patterns, contracts, mappers, types, API endpoints, and validation schemas in the Alan Hirsch Digital Platform.**

_Last updated: 2025-01-27_
