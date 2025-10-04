// Database Monitoring and Logging Module
// Comprehensive logging and monitoring for database operations

import { and, count, desc, eq, or, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  auditLogs,
  communities,
  contentItems,
  organizations,
  userAnalyticsEvents,
  userAssessments,
  userProfiles,
} from '../schema';
import type { QueryContext } from './index';

// ============================================================================
// LOGGING TYPES
// ============================================================================

export interface QueryLogEntry {
  queryId: string;
  operation: string;
  table: string;
  userId?: string;
  organizationId?: string;
  duration: number;
  rowCount: number;
  error?: string;
  timestamp: Date;
  query?: string;
  parameters?: Record<string, unknown>;
}

export interface PerformanceMetrics {
  averageQueryTime: number;
  slowestQueries: Array<{
    query: string;
    averageTime: number;
    executionCount: number;
  }>;
  mostFrequentQueries: Array<{
    query: string;
    executionCount: number;
    averageTime: number;
  }>;
  errorRate: number;
  totalQueries: number;
}

export interface DatabaseHealth {
  connectionCount: number;
  activeConnections: number;
  slowQueries: number;
  errorRate: number;
  lastBackup?: Date;
  diskUsage: number;
  indexUsage: Array<{
    table: string;
    index: string;
    usage: number;
  }>;
}

// ============================================================================
// QUERY LOGGING
// ============================================================================

/**
 * Log database query execution
 */
export async function logQueryExecution(
  logEntry: QueryLogEntry,
  context: QueryContext
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId: context.userId,
      action: `QUERY_${logEntry.operation}`,
      resource: logEntry.table,
      resourceId: logEntry.queryId,
      riskLevel: logEntry.error ? 'high' : 'low',
      oldValues: null,
      newValues: {
        duration: logEntry.duration,
        rowCount: logEntry.rowCount,
        error: logEntry.error,
        query: logEntry.query,
        parameters: logEntry.parameters,
      },
      ipAddress: null,
      userAgent: null,
      createdAt: logEntry.timestamp,
    });
  } catch (error) {
    console.error('Failed to log query execution:', error);
  }
}

/**
 * Log slow query
 */
export async function logSlowQuery(
  query: string,
  duration: number,
  context: QueryContext
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId: context.userId,
      action: 'SLOW_QUERY',
      resource: 'database',
      resourceId: null,
      riskLevel: 'medium',
      oldValues: null,
      newValues: {
        query,
        duration,
        threshold: 1000, // 1 second threshold
      },
      ipAddress: null,
      userAgent: null,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to log slow query:', error);
  }
}

/**
 * Log database error
 */
export async function logDatabaseError(
  error: Error,
  query: string,
  context: QueryContext
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId: context.userId,
      action: 'DATABASE_ERROR',
      resource: 'database',
      resourceId: null,
      riskLevel: 'critical',
      oldValues: null,
      newValues: {
        error: error.message,
        stack: error.stack,
        query,
      },
      ipAddress: null,
      userAgent: null,
      createdAt: new Date(),
    });
  } catch (logError) {
    console.error('Failed to log database error:', logError);
  }
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Get query performance metrics
 */
export async function getQueryPerformanceMetrics(
  context: QueryContext,
  options: {
    timeframe?: 'hour' | 'day' | 'week' | 'month';
    limit?: number;
  } = {}
): Promise<PerformanceMetrics> {
  const { timeframe = 'day', limit = 10 } = options;

  const timeCondition = {
    hour: sql`${auditLogs.createdAt} >= NOW() - INTERVAL '1 hour'`,
    day: sql`${auditLogs.createdAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${auditLogs.createdAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${auditLogs.createdAt} >= NOW() - INTERVAL '1 month'`,
  }[timeframe];

  const conditions = [sql`${auditLogs.action} LIKE 'QUERY_%'`, timeCondition];

  const [totalStats, slowestQueries, frequentQueries, errorStats] =
    await Promise.all([
      // Total query statistics
      db
        .select({
          totalQueries: count(auditLogs.id),
          averageTime: sql<number>`COALESCE(AVG((${auditLogs.newValues}->>'duration')::numeric), 0)`,
        })
        .from(auditLogs)
        .where(and(...conditions)),

      // Slowest queries
      db
        .select({
          query: sql<string>`${auditLogs.newValues}->>'query'`,
          averageTime: sql<number>`AVG((${auditLogs.newValues}->>'duration')::numeric)`,
          executionCount: count(auditLogs.id),
        })
        .from(auditLogs)
        .where(and(...conditions))
        .groupBy(sql`${auditLogs.newValues}->>'query'`)
        .orderBy(desc(sql`AVG((${auditLogs.newValues}->>'duration')::numeric)`))
        .limit(limit),

      // Most frequent queries
      db
        .select({
          query: sql<string>`${auditLogs.newValues}->>'query'`,
          executionCount: count(auditLogs.id),
          averageTime: sql<number>`AVG((${auditLogs.newValues}->>'duration')::numeric)`,
        })
        .from(auditLogs)
        .where(and(...conditions))
        .groupBy(sql`${auditLogs.newValues}->>'query'`)
        .orderBy(desc(count(auditLogs.id)))
        .limit(limit),

      // Error statistics
      db
        .select({
          errorCount: count(auditLogs.id),
        })
        .from(auditLogs)
        .where(and(sql`${auditLogs.action} = 'DATABASE_ERROR'`, timeCondition)),
    ]);

  const totalQueries = totalStats[0]?.totalQueries ?? 0;
  const errorCount = errorStats[0]?.errorCount ?? 0;

  return {
    averageQueryTime: totalStats[0]?.averageTime ?? 0,
    slowestQueries: slowestQueries.map(q => ({
      query: q.query || 'Unknown',
      averageTime: q.averageTime || 0,
      executionCount: q.executionCount || 0,
    })),
    mostFrequentQueries: frequentQueries.map(q => ({
      query: q.query || 'Unknown',
      executionCount: q.executionCount || 0,
      averageTime: q.averageTime || 0,
    })),
    errorRate: totalQueries > 0 ? errorCount / totalQueries : 0,
    totalQueries,
  };
}

/**
 * Get database health metrics
 */
export async function getDatabaseHealth(
  context: QueryContext
): Promise<DatabaseHealth> {
  const [connectionStats, slowQueryStats, errorStats, indexStats] =
    await Promise.all([
      // Connection statistics (simplified - would need actual connection monitoring)
      db
        .select({
          connectionCount: sql<number>`1`, // Placeholder
          activeConnections: sql<number>`1`, // Placeholder
        })
        .from(auditLogs)
        .limit(1),

      // Slow query count
      db
        .select({
          slowQueries: count(auditLogs.id),
        })
        .from(auditLogs)
        .where(
          and(
            sql`${auditLogs.action} = 'SLOW_QUERY'`,
            sql`${auditLogs.createdAt} >= NOW() - INTERVAL '1 hour'`
          )
        ),

      // Error rate
      db
        .select({
          errorCount: count(auditLogs.id),
          totalCount: sql<number>`COUNT(*)`,
        })
        .from(auditLogs)
        .where(sql`${auditLogs.createdAt} >= NOW() - INTERVAL '1 hour'`),

      // Index usage (simplified - would need actual index monitoring)
      db
        .select({
          table: sql<string>`'user_profiles'`,
          index: sql<string>`'idx_user_profiles_email'`,
          usage: sql<number>`100`,
        })
        .from(auditLogs)
        .limit(1),
    ]);

  const totalCount = errorStats[0]?.totalCount ?? 0;
  const errorCount = errorStats[0]?.errorCount ?? 0;

  return {
    connectionCount: connectionStats[0]?.connectionCount ?? 0,
    activeConnections: connectionStats[0]?.activeConnections ?? 0,
    slowQueries: slowQueryStats[0]?.slowQueries ?? 0,
    errorRate: totalCount > 0 ? errorCount / totalCount : 0,
    lastBackup: undefined, // Would need backup monitoring
    diskUsage: 0, // Would need disk usage monitoring
    indexUsage: indexStats.map(stat => ({
      table: stat.table || 'unknown',
      index: stat.index || 'unknown',
      usage: stat.usage || 0,
    })),
  };
}

// ============================================================================
// AUDIT LOGGING
// ============================================================================

/**
 * Get audit logs with filtering
 */
export async function getAuditLogs(
  context: QueryContext,
  options: {
    userId?: string;
    action?: string;
    resource?: string;
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<
    typeof auditLogs.$inferSelect & {
      user: typeof userProfiles.$inferSelect | null;
    }
  >
> {
  const {
    userId,
    action,
    resource,
    riskLevel,
    dateFrom,
    dateTo,
    limit = 50,
    offset = 0,
  } = options;

  const conditions = [];

  if (userId) {
    conditions.push(eq(auditLogs.userId, userId));
  }
  if (action) {
    conditions.push(eq(auditLogs.action, action));
  }
  if (resource) {
    conditions.push(eq(auditLogs.resource, resource));
  }
  if (riskLevel) {
    conditions.push(eq(auditLogs.riskLevel, riskLevel));
  }
  if (dateFrom) {
    conditions.push(sql`${auditLogs.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    conditions.push(sql`${auditLogs.createdAt} <= ${dateTo}`);
  }

  const results = await db
    .select({
      ...auditLogs,
      user: userProfiles,
    })
    .from(auditLogs)
    .leftJoin(userProfiles, eq(auditLogs.userId, userProfiles.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

  return results;
}

/**
 * Get security events
 */
export async function getSecurityEvents(
  context: QueryContext,
  options: {
    riskLevel?: 'high' | 'critical';
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<
    typeof auditLogs.$inferSelect & {
      user: typeof userProfiles.$inferSelect | null;
    }
  >
> {
  const { riskLevel, dateFrom, dateTo, limit = 50, offset = 0 } = options;

  const conditions = [
    or(eq(auditLogs.riskLevel, 'high'), eq(auditLogs.riskLevel, 'critical')),
  ];

  if (riskLevel) {
    conditions.push(eq(auditLogs.riskLevel, riskLevel));
  }
  if (dateFrom) {
    conditions.push(sql`${auditLogs.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    conditions.push(sql`${auditLogs.createdAt} <= ${dateTo}`);
  }

  const results = await db
    .select({
      ...auditLogs,
      user: userProfiles,
    })
    .from(auditLogs)
    .leftJoin(userProfiles, eq(auditLogs.userId, userProfiles.id))
    .where(and(...conditions))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

  return results;
}

// ============================================================================
// ANALYTICS TRACKING
// ============================================================================

/**
 * Track user analytics event
 */
export async function trackAnalyticsEvent(
  eventData: {
    userId?: string;
    eventType: string;
    eventAction: string;
    eventLabel?: string;
    contentId?: string;
    communityId?: string;
    organizationId?: string;
    properties?: Record<string, unknown>;
  },
  context: QueryContext
): Promise<void> {
  try {
    await db.insert(userAnalyticsEvents).values({
      userId: eventData.userId || context.userId,
      leaderProfileId: context.userId,
      organizationId: eventData.organizationId || context.organizationId,
      eventType: eventData.eventType as any,
      eventAction: eventData.eventAction,
      eventLabel: eventData.eventLabel,
      contentId: eventData.contentId,
      communityId: eventData.communityId,
      properties: eventData.properties || {},
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to track analytics event:', error);
  }
}

/**
 * Get user analytics events
 */
export async function getUserAnalyticsEvents(
  userId: string,
  context: QueryContext,
  options: {
    eventType?: string;
    eventAction?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof userAnalyticsEvents.$inferSelect)[]> {
  const {
    eventType,
    eventAction,
    dateFrom,
    dateTo,
    limit = 50,
    offset = 0,
  } = options;

  const conditions = [eq(userAnalyticsEvents.userId, userId)];

  if (eventType) {
    conditions.push(eq(userAnalyticsEvents.eventType, eventType as any));
  }
  if (eventAction) {
    conditions.push(eq(userAnalyticsEvents.eventAction, eventAction));
  }
  if (dateFrom) {
    conditions.push(sql`${userAnalyticsEvents.createdAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    conditions.push(sql`${userAnalyticsEvents.createdAt} <= ${dateTo}`);
  }

  return db
    .select()
    .from(userAnalyticsEvents)
    .where(and(...conditions))
    .orderBy(desc(userAnalyticsEvents.createdAt))
    .limit(limit)
    .offset(offset);
}

// ============================================================================
// SYSTEM MONITORING
// ============================================================================

/**
 * Get system metrics
 */
export async function getSystemMetrics(context: QueryContext): Promise<{
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  publishedContent: number;
  totalCommunities: number;
  activeCommunities: number;
  totalOrganizations: number;
  activeOrganizations: number;
  totalAssessments: number;
  completedAssessments: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}> {
  const [
    userStats,
    contentStats,
    communityStats,
    organizationStats,
    assessmentStats,
    healthMetrics,
  ] = await Promise.all([
    // User statistics
    db
      .select({
        totalUsers: count(userProfiles.id),
        activeUsers: count(
          sql`CASE WHEN ${userProfiles.lastActiveAt} >= NOW() - INTERVAL '30 days' THEN 1 END`
        ),
      })
      .from(userProfiles),

    // Content statistics
    db
      .select({
        totalContent: count(contentItems.id),
        publishedContent: count(
          sql`CASE WHEN ${contentItems.status} = 'published' THEN 1 END`
        ),
      })
      .from(contentItems),

    // Community statistics
    db
      .select({
        totalCommunities: count(communities.id),
        activeCommunities: count(
          sql`CASE WHEN ${communities.isActive} = true THEN 1 END`
        ),
      })
      .from(communities),

    // Organization statistics
    db
      .select({
        totalOrganizations: count(organizations.id),
        activeOrganizations: count(
          sql`CASE WHEN ${organizations.status} = 'active' THEN 1 END`
        ),
      })
      .from(organizations),

    // Assessment statistics
    db
      .select({
        totalAssessments: count(userAssessments.id),
        completedAssessments: count(
          sql`CASE WHEN ${userAssessments.completedAt} IS NOT NULL THEN 1 END`
        ),
      })
      .from(userAssessments),

    // Health metrics
    getDatabaseHealth(context),
  ]);

  const systemHealth =
    healthMetrics.errorRate > 0.1
      ? 'critical'
      : healthMetrics.errorRate > 0.05
        ? 'warning'
        : 'healthy';

  return {
    totalUsers: userStats[0]?.totalUsers ?? 0,
    activeUsers: userStats[0]?.activeUsers ?? 0,
    totalContent: contentStats[0]?.totalContent ?? 0,
    publishedContent: contentStats[0]?.publishedContent ?? 0,
    totalCommunities: communityStats[0]?.totalCommunities ?? 0,
    activeCommunities: communityStats[0]?.activeCommunities ?? 0,
    totalOrganizations: organizationStats[0]?.totalOrganizations ?? 0,
    activeOrganizations: organizationStats[0]?.activeOrganizations ?? 0,
    totalAssessments: assessmentStats[0]?.totalAssessments ?? 0,
    completedAssessments: assessmentStats[0]?.completedAssessments ?? 0,
    systemHealth,
  };
}
