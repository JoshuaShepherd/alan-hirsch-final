# Type-Safe Database Services Layer

A comprehensive service layer that bridges Zod validation with Drizzle ORM operations while maintaining complete type safety throughout the application.

## 🎯 Overview

This service layer provides:

- **Complete Type Safety**: Full TypeScript inference from input validation to database output
- **Zod Integration**: Automatic validation of all inputs and outputs using existing schemas
- **Business Logic Encapsulation**: Entity-specific methods that handle complex operations
- **Transaction Support**: Safe multi-step operations with rollback capabilities
- **Consistent Error Handling**: Standardized error types and messages
- **Service Registry**: Centralized access to all database services

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Routes    │───▶│  Service Layer   │───▶│  Database (DB)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Zod Schemas     │
                       │  (Validation)    │
                       └──────────────────┘
```

## 📁 File Structure

```
lib/services/
├── index.ts                    # Service registry and exports
├── base.service.ts            # Generic base service class
├── user.service.ts            # User management operations
├── content.service.ts         # Content management operations
├── assessment.service.ts      # Assessment system operations
├── organization.service.ts    # Organization management operations
├── integration.example.ts     # API integration examples
├── service.test.ts           # Comprehensive test suite
└── README.md                 # This documentation
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { services } from '@/lib/services';

// Simple CRUD operations
const user = await services.user().create({
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  ministryRole: 'Pastor',
});

const foundUser = await services.user().findById(user.id);
```

### Advanced Operations

```typescript
// Complex business logic
const publishedContent = await services.contentItem().publish(contentId);

// Transaction operations
const result = await ServiceUtils.executeInTransaction(async services => {
  const user = await services.user().create(userData);
  const content = await services.contentItem().create({
    ...contentData,
    authorId: user.id,
  });
  return { user, content };
});
```

## 🔧 Service Classes

### BaseService

Generic base class providing common CRUD operations:

```typescript
class BaseService<TEntity, TCreateInput, TUpdateInput> {
  async create(data: TCreateInput): Promise<TEntity>;
  async findById(id: string): Promise<TEntity | null>;
  async findMany(filters?: QueryFilters): Promise<PaginatedResult<TEntity>>;
  async update(id: string, data: TUpdateInput): Promise<TEntity>;
  async delete(id: string): Promise<boolean>;
  async softDelete(id: string): Promise<TEntity>;
  async exists(id: string): Promise<boolean>;
  async count(filters?: QueryFilters): Promise<number>;
}
```

### UserService

User management with authentication logic:

```typescript
const userService = services.user();

// Core operations
await userService.create(userData);
await userService.findById(userId);
await userService.update(userId, updateData);

// Business logic methods
await userService.findByEmail(email);
await userService.updateLastActive(userId);
await userService.getUserStats(userId);
await userService.searchUsers(query);
await userService.deactivateUser(userId);
```

### ContentItemService

Content management with publishing workflow:

```typescript
const contentService = services.contentItem();

// Content operations
await contentService.create(contentData);
await contentService.findBySlug(slug);
await contentService.findByAuthor(authorId);

// Publishing workflow
await contentService.publish(contentId);
await contentService.unpublish(contentId);
await contentService.archive(contentId);

// Analytics
await contentService.incrementViewCount(contentId);
await contentService.getAuthorStats(authorId);
await contentService.getTrendingContent(options);
```

### AssessmentService

Assessment system with scoring and completion:

```typescript
const assessmentService = services.assessment();
const userAssessmentService = services.userAssessment();

// Assessment management
await assessmentService.findWithQuestions(assessmentId);
await userAssessmentService.startAssessment(userId, assessmentId);
await userAssessmentService.completeAssessment(assessmentId, completionData);

// Progress tracking
await userAssessmentService.updateProgress(assessmentId, progressData);
await userAssessmentService.findWithResponses(assessmentId);
```

### OrganizationService

Organization and membership management:

```typescript
const orgService = services.organization();
const membershipService = services.organizationMembership();

// Organization operations
await orgService.create(orgData);
await orgService.findWithMembers(orgId);
await orgService.getOrganizationStats(orgId);

// Membership management
await membershipService.addMember(userId, orgId, role);
await membershipService.updateMemberRole(userId, orgId, newRole);
await membershipService.hasRole(userId, orgId, 'admin');
```

## 🔄 Transaction Management

### Simple Transactions

```typescript
const transactionService = services.transaction();

const result = await transactionService.executeInTransaction(async tx => {
  const user = await userService.create(userData, tx);
  const content = await contentService.create(
    {
      ...contentData,
      authorId: user.id,
    },
    tx
  );
  return { user, content };
});
```

### Complex Workflows

```typescript
const result = await ServiceUtils.executeInTransaction(async services => {
  // Start assessment
  const assessment = await services
    .userAssessment()
    .startAssessment(userId, assessmentId);

  // Save responses
  const responses = await services
    .assessmentResponse()
    .bulkSaveResponses(assessment.id, responseData);

  // Complete assessment
  const completed = await services
    .userAssessment()
    .completeAssessment(assessment.id, calculateScores(responses));

  return { assessment: completed, responses };
});
```

## 🔍 Query Operations

### Filtering and Pagination

```typescript
// Simple queries
const users = await services.user().findMany({
  where: { ministryRole: 'Pastor', accountStatus: 'active' },
  orderBy: [{ field: 'lastActiveAt', direction: 'desc' }],
  limit: 20,
  offset: 0,
});

// Complex filtering
const content = await services.contentItem().findMany({
  where: {
    status: 'published',
    visibility: 'public',
    publishedAt: { operator: 'gte', value: startDate },
  },
  include: ['author', 'category'],
});
```

### Search Operations

```typescript
// Text search
const searchResults = await services.contentItem().searchContent('leadership', {
  contentType: 'article',
  status: 'published',
  limit: 20,
});

// User search
const users = await services.user().searchUsers('John', 50);
```

## ⚠️ Error Handling

### Error Types

```typescript
import { ValidationError, NotFoundError } from '@/types';

try {
  const user = await services.user().create(invalidData);
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors (400)
    console.error('Validation failed:', error.details);
  } else if (error instanceof NotFoundError) {
    // Handle not found errors (404)
    console.error('Resource not found:', error.message);
  } else {
    // Handle other errors (500)
    console.error('Unexpected error:', error);
  }
}
```

### Consistent Error Handling

All services provide consistent error handling:

- **ValidationError**: Input/output validation failures
- **NotFoundError**: Resource not found
- **ServiceError**: Database or business logic errors

## 🧪 Testing

### Unit Testing Services

```typescript
import { describe, it, expect, vi } from 'vitest';
import { services } from '@/lib/services';

describe('UserService', () => {
  it('should create user with validation', async () => {
    const userData = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      ministryRole: 'Pastor',
    };

    const user = await services.user().create(userData);

    expect(user).toMatchObject({
      email: 'test@example.com',
      firstName: 'John',
    });
  });
});
```

### Integration Testing

```typescript
describe('User-Content Workflow', () => {
  it('should handle complete user content creation workflow', async () => {
    const user = await services.user().create(userData);
    const content = await services.contentItem().create({
      ...contentData,
      authorId: user.id,
    });
    const published = await services.contentItem().publish(content.id);

    expect(published.authorId).toBe(user.id);
    expect(published.status).toBe('published');
  });
});
```

## 🔧 Service Registry

### Accessing Services

```typescript
import { services, getService, ServiceFactory } from '@/lib/services';

// Recommended: Use the services object
const user = await services.user().findById(id);

// Alternative: Use getService function
const userService = getService<UserService>('user');
const user = await userService.findById(id);

// For testing: Create new instances
const userService = ServiceFactory.createUserService();
const user = await userService.findById(id);
```

### Available Services

```typescript
const availableServices = {
  // User Management
  user: UserService,

  // Content Management
  contentItem: ContentItemService,
  contentCategory: ContentCategoryService,

  // Assessment System
  assessment: AssessmentService,
  assessmentQuestion: AssessmentQuestionService,
  userAssessment: UserAssessmentService,
  assessmentResponse: AssessmentResponseService,

  // Organization Management
  organization: OrganizationService,
  organizationMembership: OrganizationMembershipService,

  // Transaction Management
  transaction: TransactionService,
};
```

## 📊 Performance Considerations

### Batch Operations

```typescript
// Efficient batch processing
const users = await Promise.all(
  userData.map(data => services.user().create(data))
);
```

### Query Optimization

```typescript
// Use specific methods instead of generic findMany when possible
const activeUsers = await services.user().findActiveUsers(); // Optimized
// vs
const activeUsers = await services.user().findMany({
  where: { accountStatus: 'active' },
}); // Generic but flexible
```

### Caching Integration

Services are designed to easily integrate with caching layers:

```typescript
class CachedUserService extends UserService {
  async findById(id: string): Promise<User | null> {
    const cached = await this.getFromCache(`user:${id}`);
    if (cached) return cached;

    const result = await super.findById(id);
    if (result) {
      await this.setCache(`user:${id}`, result);
    }
    return result;
  }
}
```

## 🔗 API Integration

### Example API Route

```typescript
// app/api/users/[id]/route.ts
import { services } from '@/lib/services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await services.user().findById(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## 🎯 Best Practices

### 1. Use Entity-Specific Methods

```typescript
// ✅ Good: Use specific business methods
await services.user().updateLastActive(userId);
await services.contentItem().publish(contentId);

// ❌ Avoid: Generic update when specific method exists
await services.user().update(userId, { lastActiveAt: new Date() });
```

### 2. Handle Errors Consistently

```typescript
// ✅ Good: Proper error handling
try {
  const result = await services.user().create(data);
  return { success: true, data: result };
} catch (error) {
  if (error instanceof ValidationError) {
    return { error: error.message, status: 400 };
  }
  return { error: 'Internal error', status: 500 };
}
```

### 3. Use Transactions for Complex Operations

```typescript
// ✅ Good: Use transactions for related operations
await ServiceUtils.executeInTransaction(async services => {
  const user = await services.user().create(userData);
  const content = await services.contentItem().create({
    ...contentData,
    authorId: user.id,
  });
  return { user, content };
});
```

### 4. Validate Input Early

```typescript
// ✅ Good: Services handle validation automatically
const user = await services.user().create(data); // Validates automatically

// ❌ Avoid: Manual validation when service handles it
const validatedData = userSchema.parse(data);
const user = await services.user().create(validatedData);
```

## 🚀 Migration Guide

### From Direct Database Queries

```typescript
// Before: Direct database queries
const user = await db
  .select()
  .from(userProfiles)
  .where(eq(userProfiles.id, userId));

// After: Service layer
const user = await services.user().findById(userId);
```

### From Manual Validation

```typescript
// Before: Manual validation
const validatedData = userSchema.parse(data);
const user = await db.insert(userProfiles).values(validatedData);

// After: Automatic validation
const user = await services.user().create(data);
```

## 📈 Future Enhancements

- **Caching Layer**: Redis integration for frequently accessed data
- **Audit Logging**: Automatic tracking of all service operations
- **Rate Limiting**: Built-in rate limiting for service methods
- **Metrics**: Performance monitoring and analytics
- **Background Jobs**: Queue integration for async operations
- **Multi-tenancy**: Organization-scoped data access

## 🤝 Contributing

When adding new services:

1. Extend `BaseService` for standard CRUD operations
2. Add entity-specific business methods
3. Include comprehensive error handling
4. Write tests for all methods
5. Update the service registry
6. Document new methods and usage patterns

## 📚 Additional Resources

- [Base Service Documentation](./base.service.ts)
- [Integration Examples](./integration.example.ts)
- [Test Suite](./service.test.ts)
- [Zod Schema Documentation](../../../validations/README.md)
- [Database Schema Documentation](../../../__docs__/schema/README.md)
