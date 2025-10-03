# API Documentation

_Alan Hirsch Digital Platform - Complete API Reference_

## Overview

This documentation covers all available API endpoints for the Alan Hirsch Digital Platform. The API follows RESTful conventions with comprehensive input validation using Zod schemas and type-safe responses.

## Contract-Based Architecture

Our API uses a **contract-first approach** where all responses are validated against Zod schemas defined in `@/lib/contracts`. This ensures:

- **Type Safety**: All responses match their contract definitions
- **Runtime Validation**: Zod validates data at API boundaries
- **Consistency**: No type drift between frontend and backend
- **Documentation**: Contracts serve as living documentation

### Data Flow

```
Database (Drizzle) → Mappers → Contracts → API Responses → Frontend Types
     ↓                ↓           ↓           ↓              ↓
  Raw Data    →  Transform  →  Validate  →  JSON Response → UI Components
```

## Authentication

All API routes require authentication via Supabase Auth. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Base URL

```
Production: https://alanhirsch.com/api
Development: http://localhost:3000/api
```

## Response Format

All API responses follow this standard format and are validated against Zod schemas:

```typescript
{
  data: T,           // Response data (varies by endpoint)
  success: boolean,  // Always true for successful responses
  error?: string     // Error message (only present on errors)
}
```

For paginated endpoints:

```typescript
{
  data: T[],         // Array of items
  pagination: {
    page: number,    // Current page
    limit: number,   // Items per page
    total: number,   // Total count of items
    hasMore: boolean // Whether there are more pages
  },
  success: boolean,
  error?: string
}
```

### Contract Validation

All responses are validated using Zod schemas from `@/lib/contracts`:

```typescript
// Example: Content API response validation
const response = toContentItemResponseDTO(dbRow);
const validatedResponse = contentItemResponseSchema.parse(response);
return NextResponse.json(validatedResponse);
```

This ensures that:

- All required fields are present
- Data types match contract definitions
- Computed fields are properly calculated
- Date formatting is consistent (ISO strings)

### Response Types

All response types are defined in `@/lib/contracts` and include:

- **ContentItemResponse**: Individual content items with computed fields
- **AssessmentResponse**: Assessment data with questions and scoring
- **UserProfile**: User profile information with ministry details
- **Organization**: Organization data with membership information
- **PaginatedResponse<T>**: Standardized pagination wrapper

### Mapper Functions

Data transformation is handled by mapper functions in `@/lib/mappers`:

- `toContentItemResponseDTO()`: Transforms content database rows to response format
- `toAssessmentResponseDTO()`: Transforms assessment data with computed fields
- `toUserProfileResponseDTO()`: Transforms user profile data
- `toOrganizationResponseDTO()`: Transforms organization data

Each mapper ensures:

- Contract compliance
- Proper date formatting
- Computed field calculation
- Null safety

---

## User Management

### Get User Profile

**GET** `/api/user/profile`

Get the current user's profile information.

**Response:**

```typescript
{
  data: {
    id: string
    email: string
    firstName: string
    lastName: string
    displayName?: string
    avatarUrl?: string
    ministryRole: 'senior_pastor' | 'associate_pastor' | 'church_planter' | 'denominational_leader' | 'seminary_professor' | 'seminary_student' | 'ministry_staff' | 'missionary' | 'marketplace_minister' | 'nonprofit_leader' | 'consultant' | 'academic_researcher' | 'emerging_leader' | 'other'
    denomination?: string
    churchSize?: 'small' | 'medium' | 'large' | 'enterprise'
    experience?: number
    apestProfile?: {
      apostolic: number
      prophetic: number
      evangelistic: number
      shepherd: number
      teacher: number
    }
    createdAt: string
    updatedAt: string
    lastActiveAt: string
  }
  success: boolean
}
```

### Update User Profile

**PUT** `/api/user/profile`

Update the current user's profile information.

**Request Body:**

```typescript
{
  firstName?: string
  lastName?: string
  displayName?: string
  avatarUrl?: string
  ministryRole?: 'senior_pastor' | 'associate_pastor' | 'church_planter' | 'denominational_leader' | 'seminary_professor' | 'seminary_student' | 'ministry_staff' | 'missionary' | 'marketplace_minister' | 'nonprofit_leader' | 'consultant' | 'academic_researcher' | 'emerging_leader' | 'other'
  denomination?: string
  churchSize?: 'small' | 'medium' | 'large' | 'enterprise'
  experience?: number
  apestProfile?: {
    apostolic: number
    prophetic: number
    evangelistic: number
    shepherd: number
    teacher: number
  }
}
```

### Create User Profile

**POST** `/api/user/profile`

Create a new user profile (typically used during onboarding).

**Request Body:**

```typescript
{
  firstName: string
  lastName: string
  displayName?: string
  ministryRole: 'senior_pastor' | 'associate_pastor' | 'church_planter' | 'denominational_leader' | 'seminary_professor' | 'seminary_student' | 'ministry_staff' | 'missionary' | 'marketplace_minister' | 'nonprofit_leader' | 'consultant' | 'academic_researcher' | 'emerging_leader' | 'other'
  denomination?: string
  churchSize?: 'small' | 'medium' | 'large' | 'enterprise'
  experience?: number
}
```

---

## Content Management

### Get Content Items

**GET** `/api/content`

Get a paginated list of content items with search and filtering capabilities.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search term for title, excerpt, or content
- `contentType` (string, optional) - Filter by content type
- `status` (string, default: 'published') - Filter by publication status
- `visibility` (string, optional) - Filter by visibility level
- `categoryId` (string, optional) - Filter by category
- `authorId` (string, optional) - Filter by author
- `tags` (string[], optional) - Filter by tags
- `theologicalThemes` (string[], optional) - Filter by theological themes

**Response:**

```typescript
{
  items: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    authorId: string;
    contentType:
      | 'article'
      | 'video'
      | 'podcast'
      | 'framework'
      | 'tool'
      | 'case_study'
      | 'interview'
      | 'course_lesson';
    format: 'text' | 'video' | 'audio' | 'interactive' | 'pdf' | 'presentation';
    wordCount: number;
    estimatedReadingTime: number;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    bookmarkCount: number;
    primaryCategoryId: string;
    secondaryCategories: string[];
    tags: string[];
    theologicalThemes: string[];
    seriesId?: string;
    seriesOrder?: number;
    visibility: 'public' | 'premium' | 'vip' | 'private' | 'organization';
    status: 'draft' | 'published' | 'archived' | 'under_review' | 'scheduled';
    featuredImageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
    attachments: string[];
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    scheduledAt?: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
    category?: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Content Item

**POST** `/api/content`

Create a new content item.

**Request Body:**

```typescript
{
  title: string
  slug: string
  excerpt: string
  content: string
  contentType: 'article' | 'video' | 'podcast' | 'framework' | 'tool' | 'case_study' | 'interview' | 'course_lesson'
  format?: 'text' | 'video' | 'audio' | 'interactive' | 'pdf' | 'presentation'
  status?: 'draft' | 'published' | 'archived' | 'under_review' | 'scheduled'
  visibility?: 'public' | 'premium' | 'vip' | 'private' | 'organization'
  primaryCategoryId?: string
  secondaryCategories?: string[]
  tags?: string[]
  theologicalThemes?: string[]
  seriesId?: string
  seriesOrder?: number
  featuredImageUrl?: string
  videoUrl?: string
  audioUrl?: string
  attachments?: string[]
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  originalSource?: string
  licenseType?: string
  attributionRequired?: boolean
  publishedAt?: string
  scheduledAt?: string
}
```

### Get Content Item by ID

**GET** `/api/content/[id]`

Get a specific content item by its ID.

**Response:** Same as individual content item in the list endpoint.

### Update Content Item

**PUT** `/api/content/[id]`

Update a content item (author or admin only).

**Request Body:** Same as create content item (all fields optional).

### Delete Content Item

**DELETE** `/api/content/[id]`

Delete a content item (author or admin only).

---

## Assessments

### Get Assessments

**GET** `/api/assessments`

Get a paginated list of available assessments.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search term for name or description
- `assessmentType` (string, optional) - Filter by assessment type
- `status` (string, default: 'active') - Filter by status
- `language` (string, optional) - Filter by language
- `culturalAdaptation` (string, optional) - Filter by cultural adaptation
- `researchBacked` (boolean, optional) - Filter by research backing

**Response:**

```typescript
{
  items: Array<{
    id: string;
    name: string;
    description: string;
    assessmentType:
      | 'apest'
      | 'mdna'
      | 'cultural_intelligence'
      | 'leadership_style'
      | 'spiritual_gifts'
      | 'other';
    category: string;
    status: 'draft' | 'active' | 'archived' | 'under_review';
    timeLimitMinutes?: number;
    language: string;
    culturalAdaptation?:
      | 'western'
      | 'eastern'
      | 'african'
      | 'latin_american'
      | 'middle_eastern'
      | 'oceanic'
      | 'universal';
    researchBacked: boolean;
    questions: Array<{
      id: string;
      text: string;
      type: 'multiple_choice' | 'likert_scale' | 'text' | 'ranking';
      options?: string[];
      required: boolean;
    }>;
    scoringAlgorithm: string;
    resultInterpretation: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Assessment

**POST** `/api/assessments`

Create a new assessment (admin only).

**Request Body:**

```typescript
{
  name: string
  description: string
  assessmentType: 'apest' | 'mdna' | 'cultural_intelligence' | 'leadership_style' | 'spiritual_gifts' | 'other'
  category: string
  status?: 'draft' | 'active' | 'archived' | 'under_review'
  timeLimitMinutes?: number
  language: string
  culturalAdaptation?: 'western' | 'eastern' | 'african' | 'latin_american' | 'middle_eastern' | 'oceanic' | 'universal'
  researchBacked: boolean
  questions: Array<{
    text: string
    type: 'multiple_choice' | 'likert_scale' | 'text' | 'ranking'
    options?: string[]
    required: boolean
  }>
  scoringAlgorithm: string
  resultInterpretation: string
}
```

### Get Assessment by ID

**GET** `/api/assessments/[id]`

Get a specific assessment by its ID.

**Response:** Same as individual assessment in the list endpoint.

---

## User Assessments

### Get User Assessments

**GET** `/api/user/assessments`

Get assessments taken by the current user.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `status` (string, optional) - Filter by completion status

### Start Assessment

**POST** `/api/user/assessments`

Start a new assessment.

**Request Body:**

```typescript
{
  assessmentId: string;
}
```

### Submit Assessment Response

**POST** `/api/user/assessments/[id]/responses`

Submit responses for an assessment.

**Request Body:**

```typescript
{
  responses: Array<{
    questionId: string;
    answer: string | number | string[];
  }>;
}
```

### Complete Assessment

**POST** `/api/user/assessments/[id]/complete`

Mark an assessment as completed and generate results.

---

## Organizations

### Get Organizations

**GET** `/api/organizations`

Get a paginated list of organizations.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search term
- `type` (string, optional) - Filter by organization type
- `isPublic` (boolean, optional) - Filter by public visibility

### Create Organization

**POST** `/api/organizations`

Create a new organization.

**Request Body:**

```typescript
{
  name: string
  description?: string
  website?: string
  type: 'church' | 'denomination' | 'seminary' | 'network' | 'ministry' | 'other'
  size?: 'small' | 'medium' | 'large' | 'enterprise'
  location?: string
  isPublic: boolean
}
```

### Get Organization Members

**GET** `/api/organizations/[id]/members`

Get members of a specific organization.

---

## Content Categories

### Get Content Categories

**GET** `/api/content/categories`

Get the hierarchical content category structure.

**Response:**

```typescript
{
  data: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
    level: number;
    children?: Array<Category>;
  }>;
  success: boolean;
}
```

---

## Content Series

### Get Content Series

**GET** `/api/content/series`

Get a paginated list of content series.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search term for title or description
- `seriesType` (string, optional) - Filter by series type
- `difficulty` (string, optional) - Filter by difficulty level
- `status` (string, default: 'published') - Filter by publication status
- `visibility` (string, optional) - Filter by visibility level
- `authorId` (string, optional) - Filter by author

**Response:**

```typescript
{
  items: Array<{
    id: string;
    title: string;
    slug: string;
    description?: string;
    excerpt?: string;
    authorId: string;
    seriesType:
      | 'course'
      | 'learning_path'
      | 'book_series'
      | 'podcast_series'
      | 'video_series'
      | 'framework';
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    totalItems: number;
    estimatedDuration?: number;
    primaryCategoryId?: string;
    tags: string[];
    visibility: 'public' | 'premium' | 'vip' | 'private' | 'organization';
    status: 'draft' | 'published' | 'archived' | 'under_review';
    featuredImageUrl?: string;
    metaDescription?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
    category?: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Content Series

**POST** `/api/content/series`

Create a new content series.

**Request Body:**

```typescript
{
  title: string
  slug: string
  description?: string
  excerpt?: string
  seriesType: 'course' | 'learning_path' | 'book_series' | 'podcast_series' | 'video_series' | 'framework'
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  totalItems?: number
  estimatedDuration?: number
  primaryCategoryId?: string
  tags?: string[]
  visibility?: 'public' | 'premium' | 'vip' | 'private' | 'organization'
  status?: 'draft' | 'published' | 'archived' | 'under_review'
  featuredImageUrl?: string
  metaDescription?: string
}
```

### Get Content Series by ID

**GET** `/api/content/series/[id]`

Get a specific content series by its ID.

**Response:** Same as individual series in the list endpoint.

### Update Content Series

**PUT** `/api/content/series/[id]`

Update a content series (author or admin only).

**Request Body:** Same as create content series (all fields optional).

### Delete Content Series

**DELETE** `/api/content/series/[id]`

Delete a content series (author or admin only).

### Get Series Content Items

**GET** `/api/content/series/[id]/items`

Get content items within a specific series.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page

**Response:**

```typescript
{
  items: Array<{
    id: string;
    seriesId: string;
    contentId: string;
    orderIndex: number;
    prerequisites: string[];
    createdAt: string;
    content: {
      id: string;
      title: string;
      slug: string;
      excerpt?: string;
      contentType: string;
      status: string;
      visibility: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Add Content to Series

**POST** `/api/content/series/[id]/items`

Add a content item to a series.

**Request Body:**

```typescript
{
  contentId: string
  orderIndex: number
  prerequisites?: string[]
}
```

### Remove Content from Series

**DELETE** `/api/content/series/[id]/items/[contentId]`

Remove a content item from a series.

---

## Content Cross-References

### Get Content Cross-References

**GET** `/api/content/cross-references`

Get content cross-references for network amplification.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `sourceContentId` (string, optional) - Filter by source content
- `targetContentId` (string, optional) - Filter by target content
- `referenceType` (string, optional) - Filter by reference type
- `isAuthorApproved` (boolean, optional) - Filter by approval status

**Response:**

```typescript
{
  items: Array<{
    id: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType:
      | 'builds_on'
      | 'contradicts'
      | 'supports'
      | 'extends'
      | 'applies'
      | 'critiques'
      | 'synthesizes';
    relevanceScore: number;
    qualityScore: number;
    contextDescription?: string;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    createdAt: string;
    updatedAt: string;
    sourceContent: {
      id: string;
      title: string;
      slug: string;
    };
    targetContent: {
      id: string;
      title: string;
      slug: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Content Cross-Reference

**POST** `/api/content/cross-references`

Create a new content cross-reference.

**Request Body:**

```typescript
{
  sourceContentId: string
  targetContentId: string
  referenceType: 'builds_on' | 'contradicts' | 'supports' | 'extends' | 'applies' | 'critiques' | 'synthesizes'
  relevanceScore?: number
  qualityScore?: number
  contextDescription?: string
  isAuthorApproved?: boolean
  isAiGenerated?: boolean
}
```

### Update Content Cross-Reference

**PUT** `/api/content/cross-references/[id]`

Update a content cross-reference (author or admin only).

**Request Body:** Same as create cross-reference (all fields optional).

### Delete Content Cross-Reference

**DELETE** `/api/content/cross-references/[id]`

Delete a content cross-reference (author or admin only).

---

## Community Management

### Get Communities

**GET** `/api/communities`

Get a paginated list of communities.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search term for name or description
- `communityType` (string, optional) - Filter by community type
- `visibility` (string, optional) - Filter by visibility
- `isActive` (boolean, optional) - Filter by active status

**Response:**

```typescript
{
  items: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
    communityType:
      | 'general_discussion'
      | 'church_planting_cohort'
      | 'leadership_development'
      | 'theological_study'
      | 'regional_network'
      | 'ministry_focus'
      | 'apest_group';
    geographicFocus: string[];
    culturalContext:
      | 'western'
      | 'eastern'
      | 'african'
      | 'latin_american'
      | 'middle_eastern'
      | 'oceanic'
      | 'global';
    languagePrimary: string;
    languagesSupported: string[];
    visibility: 'public' | 'private' | 'invite_only' | 'organization';
    joinApprovalRequired: boolean;
    maxMembers?: number;
    allowGuestPosts: boolean;
    moderationLevel: 'open' | 'moderated' | 'strict';
    currentMemberCount: number;
    totalPostsCount: number;
    guidelines?: string;
    rules: string[];
    createdBy: string;
    moderators: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    creator: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Community

**POST** `/api/communities`

Create a new community.

**Request Body:**

```typescript
{
  name: string
  slug: string
  description?: string
  communityType: 'general_discussion' | 'church_planting_cohort' | 'leadership_development' | 'theological_study' | 'regional_network' | 'ministry_focus' | 'apest_group'
  geographicFocus?: string[]
  culturalContext?: 'western' | 'eastern' | 'african' | 'latin_american' | 'middle_eastern' | 'oceanic' | 'global'
  languagePrimary?: string
  languagesSupported?: string[]
  visibility?: 'public' | 'private' | 'invite_only' | 'organization'
  joinApprovalRequired?: boolean
  maxMembers?: number
  allowGuestPosts?: boolean
  moderationLevel?: 'open' | 'moderated' | 'strict'
  guidelines?: string
  rules?: string[]
}
```

### Get Community by ID

**GET** `/api/communities/[id]`

Get a specific community by its ID.

**Response:** Same as individual community in the list endpoint.

### Update Community

**PUT** `/api/communities/[id]`

Update a community (creator or admin only).

**Request Body:** Same as create community (all fields optional).

### Delete Community

**DELETE** `/api/communities/[id]`

Delete a community (creator or admin only).

### Get Community Members

**GET** `/api/communities/[id]/members`

Get members of a specific community.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `role` (string, optional) - Filter by member role
- `status` (string, optional) - Filter by membership status

**Response:**

```typescript
{
  items: Array<{
    id: string;
    userId: string;
    communityId: string;
    role: 'member' | 'moderator' | 'admin' | 'owner';
    status: 'active' | 'inactive' | 'pending' | 'banned' | 'left';
    postsCount: number;
    commentsCount: number;
    lastActiveAt?: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    joinedAt?: string;
    approvedAt?: string;
    leftAt?: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Join Community

**POST** `/api/communities/[id]/join`

Join a community.

**Request Body:**

```typescript
{
  message?: string
}
```

### Leave Community

**POST** `/api/communities/[id]/leave`

Leave a community.

### Get Community Posts

**GET** `/api/communities/[id]/posts`

Get posts in a specific community.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `postType` (string, optional) - Filter by post type
- `status` (string, optional) - Filter by post status
- `parentPostId` (string, optional) - Filter by parent post (for replies)

**Response:**

```typescript
{
  items: Array<{
    id: string;
    communityId: string;
    authorId: string;
    title?: string;
    content: string;
    postType:
      | 'discussion'
      | 'question'
      | 'announcement'
      | 'resource_share'
      | 'prayer_request'
      | 'testimony';
    parentPostId?: string;
    replyCount: number;
    upvotes: number;
    downvotes: number;
    viewCount: number;
    tags: string[];
    status: 'published' | 'draft' | 'pending_review' | 'flagged' | 'removed';
    flaggedCount: number;
    moderationNotes?: string;
    attachments: Array<{
      name: string;
      url: string;
      type: string;
      size: number;
    }>;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Community Post

**POST** `/api/communities/[id]/posts`

Create a new post in a community.

**Request Body:**

```typescript
{
  title?: string
  content: string
  postType?: 'discussion' | 'question' | 'announcement' | 'resource_share' | 'prayer_request' | 'testimony'
  parentPostId?: string
  tags?: string[]
  attachments?: Array<{
    name: string
    url: string
    type: string
    size: number
  }>
}
```

### Vote on Community Post

**POST** `/api/communities/posts/[id]/vote`

Vote on a community post.

**Request Body:**

```typescript
{
  voteType: 'upvote' | 'downvote';
}
```

### Remove Vote from Community Post

**DELETE** `/api/communities/posts/[id]/vote`

Remove your vote from a community post.

---

## Collaborations

### Get Collaborations

**GET** `/api/collaborations`

Get a paginated list of collaborations.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string, optional) - Search term for title or description
- `collaborationType` (string, optional) - Filter by collaboration type
- `status` (string, optional) - Filter by status
- `leadAuthorId` (string, optional) - Filter by lead author

**Response:**

```typescript
{
  items: Array<{
    id: string;
    title: string;
    description?: string;
    collaborationType:
      | 'content_creation'
      | 'research_project'
      | 'course_development'
      | 'book_writing'
      | 'event_planning';
    leadAuthorId: string;
    collaborators: Array<{
      userId: string;
      role: string;
      revenueShare: number;
      joinedAt: string;
    }>;
    revenueShareModel: 'equal' | 'weighted' | 'lead_majority' | 'custom';
    totalRevenueShare: number;
    status: 'planning' | 'active' | 'review' | 'completed' | 'cancelled';
    startDate?: string;
    targetCompletionDate?: string;
    actualCompletionDate?: string;
    expectedDeliverables: Array<{
      type: string;
      description: string;
      dueDate: string;
      completed: boolean;
    }>;
    networkAmplificationGoal?: number;
    actualNetworkImpact?: number;
    communicationChannels: Array<{
      type: string;
      url: string;
      primary: boolean;
    }>;
    createdAt: string;
    updatedAt: string;
    leadAuthor: {
      id: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      avatarUrl?: string;
    };
  }>;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Create Collaboration

**POST** `/api/collaborations`

Create a new collaboration.

**Request Body:**

```typescript
{
  title: string
  description?: string
  collaborationType: 'content_creation' | 'research_project' | 'course_development' | 'book_writing' | 'event_planning'
  collaborators?: Array<{
    userId: string
    role: string
    revenueShare: number
  }>
  revenueShareModel?: 'equal' | 'weighted' | 'lead_majority' | 'custom'
  totalRevenueShare?: number
  startDate?: string
  targetCompletionDate?: string
  expectedDeliverables?: Array<{
    type: string
    description: string
    dueDate: string
    completed?: boolean
  }>
  networkAmplificationGoal?: number
  communicationChannels?: Array<{
    type: string
    url: string
    primary?: boolean
  }>
}
```

### Get Collaboration by ID

**GET** `/api/collaborations/[id]`

Get a specific collaboration by its ID.

**Response:** Same as individual collaboration in the list endpoint.

### Update Collaboration

**PUT** `/api/collaborations/[id]`

Update a collaboration (lead author or admin only).

**Request Body:** Same as create collaboration (all fields optional).

### Delete Collaboration

**DELETE** `/api/collaborations/[id]`

Delete a collaboration (lead author or admin only).

---

## Team Management

### Get Team Members

**GET** `/api/team`

Get team members and their roles.

---

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

### Error Response Format

```typescript
{
  error: string
  details?: any
  code?: string
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_REQUIRED` - Valid authentication required
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Unexpected server error

---

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour
- **Burst limit**: 10 requests per second

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## SDKs and Libraries

### JavaScript/TypeScript

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Example: Get user profile
const { data, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('id', user.id)
  .single();
```

### cURL Examples

```bash
# Get user profile
curl -H "Authorization: Bearer $TOKEN" \
  https://alanhirsch.com/api/user/profile

# Create content item
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Article","slug":"new-article","content":"..."}' \
  https://alanhirsch.com/api/content
```

---

## Testing

All API endpoints have comprehensive test coverage. Run tests with:

```bash
npm test
npm run test:coverage
```

Test files are located in `__tests__/api/` and follow the naming convention `*.test.ts`.

---

## Changelog

### v1.0.0 (Current)

- Initial API release
- User profile management
- Content management
- Assessment system
- Organization management
- Comprehensive authentication and authorization
- Rate limiting and security measures
