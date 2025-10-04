import { auditLogs, userAnalyticsEvents, userProfiles } from '../schema';
import type { QueryContext } from './index';
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
/**
 * Log database query execution
 */
export declare function logQueryExecution(logEntry: QueryLogEntry, context: QueryContext): Promise<void>;
/**
 * Log slow query
 */
export declare function logSlowQuery(query: string, duration: number, context: QueryContext): Promise<void>;
/**
 * Log database error
 */
export declare function logDatabaseError(error: Error, query: string, context: QueryContext): Promise<void>;
/**
 * Get query performance metrics
 */
export declare function getQueryPerformanceMetrics(context: QueryContext, options?: {
    timeframe?: 'hour' | 'day' | 'week' | 'month';
    limit?: number;
}): Promise<PerformanceMetrics>;
/**
 * Get database health metrics
 */
export declare function getDatabaseHealth(context: QueryContext): Promise<DatabaseHealth>;
/**
 * Get audit logs with filtering
 */
export declare function getAuditLogs(context: QueryContext, options?: {
    userId?: string;
    action?: string;
    resource?: string;
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
}): Promise<Array<typeof auditLogs.$inferSelect & {
    user: typeof userProfiles.$inferSelect | null;
}>>;
/**
 * Get security events
 */
export declare function getSecurityEvents(context: QueryContext, options?: {
    riskLevel?: 'high' | 'critical';
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
}): Promise<Array<typeof auditLogs.$inferSelect & {
    user: typeof userProfiles.$inferSelect | null;
}>>;
/**
 * Track user analytics event
 */
export declare function trackAnalyticsEvent(eventData: {
    userId?: string;
    eventType: string;
    eventAction: string;
    eventLabel?: string;
    contentId?: string;
    communityId?: string;
    organizationId?: string;
    properties?: Record<string, unknown>;
}, context: QueryContext): Promise<void>;
/**
 * Get user analytics events
 */
export declare function getUserAnalyticsEvents(userId: string, context: QueryContext, options?: {
    eventType?: string;
    eventAction?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
}): Promise<(typeof userAnalyticsEvents.$inferSelect)[]>;
/**
 * Get system metrics
 */
export declare function getSystemMetrics(context: QueryContext): Promise<{
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
}>;
//# sourceMappingURL=monitoring.d.ts.map