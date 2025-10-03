# API Contracts

This document defines the contracts and interfaces for the Alan Hirsch Digital Platform.

## Overview

The platform follows a contract-first approach to ensure type safety and clear communication between frontend and backend components.

## Core Contracts

### User Profile Contract

```typescript
interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  ministryRole: MinistryRole;
  organizationId: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}
```

### Organization Contract

```typescript
interface Organization {
  id: string;
  name: string;
  description?: string;
  type: 'church' | 'ministry' | 'network' | 'individual';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
```

### Content Item Contract

```typescript
interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'video' | 'course' | 'assessment';
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  categoryId: string;
  apestRelevance: APESTRelevance;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

## API Endpoints

### Authentication

- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/session` - Get current session

### User Management

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/assessments` - Get user assessments
- `POST /api/user/assessments` - Create new assessment

### Content Management

- `GET /api/content` - List content items
- `GET /api/content/:id` - Get specific content item
- `POST /api/content` - Create content item
- `PUT /api/content/:id` - Update content item
- `DELETE /api/content/:id` - Delete content item

### Organizations

- `GET /api/organizations` - List organizations
- `GET /api/organizations/:id` - Get organization details
- `POST /api/organizations` - Create organization
- `PUT /api/organizations/:id` - Update organization

## Error Handling

All API endpoints follow a consistent error response format:

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
  path: string;
}
```

## Validation

All input data is validated using Zod schemas defined in `/validations/`.

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- Content endpoints: 100 requests per minute
- User endpoints: 50 requests per minute

## Security

- All endpoints require authentication except public content
- JWT tokens are used for session management
- Input validation and sanitization on all endpoints
- CORS is configured for allowed origins
- Rate limiting on all endpoints
