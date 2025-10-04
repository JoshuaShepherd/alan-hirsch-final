# Query Modules Documentation

This directory contains comprehensive query modules for the Alan Hirsch Digital Platform, implementing pure functions with context-aware access control for all Ministry Platform entities.

## Overview

The query modules provide:

- **Type-safe database operations** using Drizzle ORM
- **Context-aware access control** with organization and user filtering
- **Pure functions** for better testability and maintainability
- **Performance optimization** with EXPLAIN plans and index recommendations
- **Comprehensive logging and monitoring** for database operations
- **Advanced search and analytics** capabilities

## Architecture

### Core Principles

1. **Pure Functions**: All query functions are pure, accepting context and returning data without side effects
2. **Context-Aware Security**: Every query respects user permissions and organization boundaries
3. **Type Safety**: Full TypeScript support with Drizzle ORM type inference
4. **Performance First**: Optimized queries with monitoring and EXPLAIN plans
5. **Comprehensive Logging**: All database operations are logged for audit and performance tracking

### Query Context

All query functions accept a `QueryContext` object:

```typescript
interface QueryContext {
  organizationId?: string;
  userId?: string;
  role?: string;
}
```

This context is used for:

- **Access Control**: Filtering data based on user permissions
- **Organization Isolation**: Ensuring multi-tenant data separation
- **Audit Logging**: Tracking who performed what operations

## Module Structure

### Core Query Modules

#### `/users.ts` - User Profile Queries

- User profile CRUD operations
- APEST assessment score retrieval
- Ministry context and preferences
- Platform customization settings
- Onboarding status tracking

#### `/organizations.ts` - Organization Queries

- Organization management
- Member management and invitations
- Billing and subscription tracking
- Organization statistics

#### `/content.ts` - Content Management Queries

- Content item CRUD operations
- Content categorization
- Content series management
- Content statistics and analytics

#### `/communities.ts` - Community Queries

- Community management
- Member management
- Community posts and interactions
- Community analytics

#### `/assessments.ts` - Assessment System Queries

- Assessment CRUD operations
- User assessment tracking
- Assessment responses
- APEST scoring and analytics

#### `/subscriptions.ts` - Subscription & Billing Queries

- Subscription plan management
- User subscription tracking
- Transaction management
- Payment method handling

### Advanced Query Modules

#### `/analytics.ts` - Analytics and Reporting

- User engagement metrics
- Content performance analytics
- Community engagement analytics
- Organization analytics
- Platform-wide analytics
- Assessment analytics

#### `/search.ts` - Advanced Search and Filtering

- Global search across all entities
- Ministry-specific search criteria
- APEST profile search
- Theological theme search
- Cultural context search

#### `/monitoring.ts` - Database Monitoring and Logging

- Query execution logging
- Performance monitoring
- Audit logging
- Analytics event tracking
- System health monitoring

#### `/performance.ts` - Performance Optimization

- EXPLAIN plans for top 10 queries
- Index recommendations
- Query optimization suggestions
- Performance metrics and reporting

## Usage Examples

### Basic User Query

```typescript
import { getUserProfileById, createQueryContext } from '@/lib/db/queries';

const context = createQueryContext({
  userId: 'user-123',
  organizationId: 'org-456',
  role: 'member',
});

const user = await getUserProfileById('user-123', context);
```

### Content Search with Filters

```typescript
import { searchContent, createQueryContext } from '@/lib/db/queries';

const context = createQueryContext({
  userId: 'user-123',
  organizationId: 'org-456',
});

const results = await searchContent('ministry leadership', context, {
  contentType: 'article',
  categoryId: 'leadership-category',
  limit: 20,
  offset: 0,
});
```

### Analytics Query

```typescript
import { getUserEngagementMetrics, createQueryContext } from '@/lib/db/queries';

const context = createQueryContext({
  userId: 'user-123',
  organizationId: 'org-456',
});

const metrics = await getUserEngagementMetrics('user-123', context, {
  timeframe: 'month',
  eventTypes: ['content_view', 'assessment_complete'],
});
```

## Performance Optimization

### Top 10 Queries

The system identifies and optimizes the top 10 most frequently executed queries:

1. **Get User by Email** - User authentication
2. **Get Published Content** - Content listing with pagination
3. **Get User Assessments** - Assessment history
4. **Get Organization Members** - Member management
5. **Search Content** - Full-text search
6. **Get Community Posts** - Community interactions
7. **Get User Subscription** - Subscription status
8. **Get Content by Category** - Category-based content
9. **Get Trending Content** - Popular content
10. **Get User Analytics** - User activity tracking

### Index Recommendations

Each query includes specific index recommendations:

```sql
-- Example: User email lookup optimization
CREATE UNIQUE INDEX idx_user_profiles_email_active
ON user_profiles (email, account_status)
WHERE account_status = 'active';

-- Example: Content listing optimization
CREATE INDEX idx_content_items_published_public
ON content_items (status, visibility, published_at DESC)
WHERE status = 'published' AND visibility = 'public';
```

### Query Optimization

The system provides optimized versions of common queries:

- **Full-text search** using PostgreSQL tsvector instead of ILIKE
- **Composite indexes** for multi-column WHERE clauses
- **Cursor-based pagination** for large result sets
- **Materialized views** for complex aggregations

## Security and Access Control

### Row Level Security (RLS)

All queries respect PostgreSQL RLS policies:

- **User Data Isolation**: Users can only access their own data
- **Organization Access**: Members can access organization data
- **Content Visibility**: Only published content is publicly accessible
- **Assessment Privacy**: Assessment results are private to users

### Context-Based Filtering

Every query includes context-based filtering:

```typescript
// Example: Organization-based filtering
if (context.organizationId) {
  conditions.push(
    sql`EXISTS (
      SELECT 1 FROM organization_memberships
      WHERE user_id = user_profiles.id
      AND organization_id = ${context.organizationId}
      AND status = 'active'
    )`
  );
}
```

## Monitoring and Logging

### Query Execution Logging

All database operations are logged with:

- Query execution time
- Row count returned
- Error information (if any)
- User context
- Query parameters

### Performance Monitoring

The system tracks:

- Average query execution times
- Slow query identification
- Error rates
- Index usage statistics
- Connection pool metrics

### Audit Logging

All data modifications are logged for:

- Security auditing
- Compliance requirements
- Change tracking
- User activity monitoring

## Testing

### Unit Testing

Each query module includes comprehensive unit tests:

```typescript
describe('User Queries', () => {
  it('should get user profile by ID with context', async () => {
    const context = createQueryContext({
      userId: 'user-123',
      organizationId: 'org-456',
    });

    const user = await getUserProfileById('user-123', context);
    expect(user).toBeDefined();
    expect(user.id).toBe('user-123');
  });
});
```

### Integration Testing

Integration tests verify:

- Database connectivity
- Query performance
- Access control enforcement
- Data consistency

### Performance Testing

Performance tests ensure:

- Query execution times meet SLA requirements
- Index usage is optimal
- Memory usage is within limits
- Connection pooling works correctly

## Migration and Deployment

### Database Migrations

Index recommendations are implemented via migrations:

```sql
-- Migration: Add performance indexes
CREATE INDEX CONCURRENTLY idx_user_profiles_email_active
ON user_profiles (email, account_status)
WHERE account_status = 'active';

CREATE INDEX CONCURRENTLY idx_content_items_published_public
ON content_items (status, visibility, published_at DESC)
WHERE status = 'published' AND visibility = 'public';
```

### Deployment Checklist

Before deploying query module changes:

1. ✅ Run all unit tests
2. ✅ Run integration tests
3. ✅ Verify EXPLAIN plans
4. ✅ Check index recommendations
5. ✅ Validate access control
6. ✅ Test performance benchmarks
7. ✅ Review audit logging
8. ✅ Update documentation

## Best Practices

### Query Design

1. **Use prepared statements** for all user input
2. **Implement proper pagination** for large result sets
3. **Add appropriate indexes** for WHERE clauses
4. **Use transactions** for multi-table operations
5. **Implement query timeouts** for long-running queries

### Security

1. **Always validate context** before executing queries
2. **Use parameterized queries** to prevent SQL injection
3. **Implement proper error handling** without exposing internals
4. **Log all security-relevant operations**
5. **Regular security audits** of query patterns

### Performance

1. **Monitor query performance** continuously
2. **Use EXPLAIN ANALYZE** for optimization
3. **Implement query caching** where appropriate
4. **Use connection pooling** for better resource utilization
5. **Regular index maintenance** and optimization

## Troubleshooting

### Common Issues

#### Slow Queries

- Check EXPLAIN plans for missing indexes
- Verify query parameters are properly typed
- Review query complexity and joins
- Consider query result caching

#### Access Control Issues

- Verify user context is properly set
- Check organization membership status
- Review RLS policies
- Validate query context filtering

#### Memory Issues

- Monitor connection pool usage
- Check for memory leaks in long-running queries
- Review query result set sizes
- Implement proper pagination

### Debug Tools

- **Query execution logging** for performance analysis
- **EXPLAIN plans** for optimization
- **Index usage statistics** for maintenance
- **Connection monitoring** for resource management

## Contributing

### Adding New Queries

1. **Follow the pure function pattern**
2. **Include proper TypeScript types**
3. **Add context-aware access control**
4. **Include comprehensive error handling**
5. **Add unit tests**
6. **Update documentation**
7. **Consider performance implications**

### Performance Guidelines

1. **Always include EXPLAIN plans** for new queries
2. **Recommend appropriate indexes**
3. **Consider query optimization opportunities**
4. **Add to performance monitoring**
5. **Document performance characteristics**

---

For more detailed information about specific query modules, see the individual documentation files in this directory.
