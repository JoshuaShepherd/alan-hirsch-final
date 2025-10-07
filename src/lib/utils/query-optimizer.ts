/**
 * Query Optimization Utilities
 *
 * This module provides utilities for monitoring and optimizing database queries
 * to improve API performance as recommended in the API Infrastructure Improvements Plan.
 */

import { performance } from 'perf_hooks';

export interface QueryMetrics {
  query: string;
  duration: number;
  timestamp: Date;
  parameters?: any[];
  error?: string;
}

export interface QueryOptimizationResult {
  slowQueries: QueryMetrics[];
  recommendations: string[];
  averageQueryTime: number;
  totalQueries: number;
}

export class QueryOptimizer {
  private static queryLog: QueryMetrics[] = [];
  private static readonly MAX_LOG_SIZE = 1000;
  private static readonly SLOW_QUERY_THRESHOLD = 100; // milliseconds

  /**
   * Wrap a database query with performance monitoring
   */
  static async withMonitoring<T>(
    queryFn: () => Promise<T>,
    query: string,
    parameters?: any[]
  ): Promise<T> {
    const startTime = performance.now();
    let error: string | undefined;

    try {
      const result = await queryFn();
      return result;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.logQuery({
        query,
        duration,
        timestamp: new Date(),
        parameters,
        error,
      });
    }
  }

  /**
   * Log a query execution
   */
  private static logQuery(metrics: QueryMetrics): void {
    this.queryLog.push(metrics);

    // Keep only the most recent queries
    if (this.queryLog.length > this.MAX_LOG_SIZE) {
      this.queryLog = this.queryLog.slice(-this.MAX_LOG_SIZE);
    }

    // Log slow queries immediately
    if (metrics.duration > this.SLOW_QUERY_THRESHOLD) {
      console.warn(
        `Slow query detected: ${metrics.query} (${metrics.duration.toFixed(2)}ms)`
      );
    }
  }

  /**
   * Get query performance analysis
   */
  static getQueryAnalysis(): QueryOptimizationResult {
    const slowQueries = this.queryLog.filter(
      q => q.duration > this.SLOW_QUERY_THRESHOLD
    );

    const totalQueries = this.queryLog.length;
    const averageQueryTime =
      totalQueries > 0
        ? this.queryLog.reduce((sum, q) => sum + q.duration, 0) / totalQueries
        : 0;

    const recommendations = this.generateRecommendations(
      slowQueries,
      averageQueryTime
    );

    return {
      slowQueries,
      recommendations,
      averageQueryTime,
      totalQueries,
    };
  }

  /**
   * Generate optimization recommendations
   */
  private static generateRecommendations(
    slowQueries: QueryMetrics[],
    averageQueryTime: number
  ): string[] {
    const recommendations: string[] = [];

    if (averageQueryTime > 50) {
      recommendations.push(
        'Consider adding database indexes for frequently queried columns'
      );
    }

    if (slowQueries.length > 0) {
      recommendations.push(
        'Review and optimize slow queries identified in the log'
      );
    }

    // Analyze common slow query patterns
    const queryPatterns = this.analyzeQueryPatterns(slowQueries);

    if (queryPatterns.includes('SELECT *')) {
      recommendations.push(
        'Avoid SELECT * queries - specify only needed columns'
      );
    }

    if (queryPatterns.includes('ORDER BY')) {
      recommendations.push('Ensure ORDER BY columns are indexed');
    }

    if (queryPatterns.includes('WHERE')) {
      recommendations.push('Ensure WHERE clause columns are indexed');
    }

    if (queryPatterns.includes('JOIN')) {
      recommendations.push('Review JOIN conditions and ensure proper indexing');
    }

    return recommendations;
  }

  /**
   * Analyze query patterns in slow queries
   */
  private static analyzeQueryPatterns(slowQueries: QueryMetrics[]): string[] {
    const patterns: string[] = [];

    for (const query of slowQueries) {
      const queryText = query.query.toUpperCase();

      if (queryText.includes('SELECT *')) {
        patterns.push('SELECT *');
      }
      if (queryText.includes('ORDER BY')) {
        patterns.push('ORDER BY');
      }
      if (queryText.includes('WHERE')) {
        patterns.push('WHERE');
      }
      if (queryText.includes('JOIN')) {
        patterns.push('JOIN');
      }
    }

    return [...new Set(patterns)];
  }

  /**
   * Clear query log
   */
  static clearLog(): void {
    this.queryLog = [];
  }

  /**
   * Get slow queries for a specific time range
   */
  static getSlowQueries(startTime?: Date, endTime?: Date): QueryMetrics[] {
    let filtered = this.queryLog.filter(
      q => q.duration > this.SLOW_QUERY_THRESHOLD
    );

    if (startTime) {
      filtered = filtered.filter(q => q.timestamp >= startTime);
    }

    if (endTime) {
      filtered = filtered.filter(q => q.timestamp <= endTime);
    }

    return filtered;
  }

  /**
   * Get query statistics
   */
  static getQueryStatistics(): {
    totalQueries: number;
    slowQueries: number;
    averageQueryTime: number;
    slowestQuery: QueryMetrics | null;
    fastestQuery: QueryMetrics | null;
  } {
    const totalQueries = this.queryLog.length;
    const slowQueries = this.queryLog.filter(
      q => q.duration > this.SLOW_QUERY_THRESHOLD
    ).length;

    const averageQueryTime =
      totalQueries > 0
        ? this.queryLog.reduce((sum, q) => sum + q.duration, 0) / totalQueries
        : 0;

    const slowestQuery =
      this.queryLog.length > 0
        ? this.queryLog.reduce((prev, current) =>
            prev.duration > current.duration ? prev : current
          )
        : null;

    const fastestQuery =
      this.queryLog.length > 0
        ? this.queryLog.reduce((prev, current) =>
            prev.duration < current.duration ? prev : current
          )
        : null;

    return {
      totalQueries,
      slowQueries,
      averageQueryTime,
      slowestQuery,
      fastestQuery,
    };
  }
}

/**
 * Database query optimization helpers
 */
export class DatabaseOptimizer {
  /**
   * Check if a query needs optimization
   */
  static needsOptimization(query: string): boolean {
    const upperQuery = query.toUpperCase();

    // Check for common performance issues
    const issues = [
      'SELECT *',
      'ORDER BY RAND()',
      'LIKE %pattern%',
      'NOT IN (SELECT',
      'OR conditions without proper indexing',
    ];

    return issues.some(issue => upperQuery.includes(issue));
  }

  /**
   * Suggest query optimizations
   */
  static suggestOptimizations(query: string): string[] {
    const suggestions: string[] = [];
    const upperQuery = query.toUpperCase();

    if (upperQuery.includes('SELECT *')) {
      suggestions.push('Replace SELECT * with specific column names');
    }

    if (upperQuery.includes('ORDER BY RAND()')) {
      suggestions.push(
        'Replace ORDER BY RAND() with a more efficient random selection method'
      );
    }

    if (upperQuery.includes('LIKE %')) {
      suggestions.push(
        'Consider using full-text search instead of LIKE with leading wildcards'
      );
    }

    if (upperQuery.includes('NOT IN (SELECT')) {
      suggestions.push(
        'Consider using NOT EXISTS or LEFT JOIN instead of NOT IN with subquery'
      );
    }

    if (upperQuery.includes('OR') && !upperQuery.includes('INDEX')) {
      suggestions.push('Ensure OR conditions are properly indexed');
    }

    return suggestions;
  }

  /**
   * Generate index suggestions based on query patterns
   */
  static suggestIndexes(query: string): string[] {
    const suggestions: string[] = [];
    const upperQuery = query.toUpperCase();

    // Extract table and column information (simplified)
    const whereMatch = upperQuery.match(/WHERE\s+(\w+)\.(\w+)/g);
    if (whereMatch) {
      whereMatch.forEach(match => {
        const [, table, column] = match.match(/WHERE\s+(\w+)\.(\w+)/) || [];
        if (table && column) {
          suggestions.push(
            `CREATE INDEX idx_${table}_${column} ON ${table}(${column})`
          );
        }
      });
    }

    const orderByMatch = upperQuery.match(/ORDER BY\s+(\w+)\.(\w+)/g);
    if (orderByMatch) {
      orderByMatch.forEach(match => {
        const [, table, column] = match.match(/ORDER BY\s+(\w+)\.(\w+)/) || [];
        if (table && column) {
          suggestions.push(
            `CREATE INDEX idx_${table}_${column}_order ON ${table}(${column})`
          );
        }
      });
    }

    return suggestions;
  }
}

/**
 * Performance monitoring decorator for database operations
 */
export function monitorQuery(query: string, parameters?: any[]) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return QueryOptimizer.withMonitoring(
        () => method.apply(this, args),
        query,
        parameters
      );
    };

    return descriptor;
  };
}

/**
 * Utility to format query performance metrics for logging
 */
export function formatQueryMetrics(metrics: QueryMetrics): string {
  return `Query: ${metrics.query} | Duration: ${metrics.duration.toFixed(2)}ms | Time: ${metrics.timestamp.toISOString()}`;
}

/**
 * Utility to generate query performance report
 */
export function generatePerformanceReport(): string {
  const analysis = QueryOptimizer.getQueryAnalysis();
  const stats = QueryOptimizer.getQueryStatistics();

  return `
Query Performance Report
========================
Total Queries: ${stats.totalQueries}
Slow Queries: ${stats.slowQueries}
Average Query Time: ${stats.averageQueryTime.toFixed(2)}ms
Slowest Query: ${stats.slowestQuery ? formatQueryMetrics(stats.slowestQuery) : 'N/A'}

Recommendations:
${analysis.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

Slow Queries:
${analysis.slowQueries.map((q, i) => `${i + 1}. ${formatQueryMetrics(q)}`).join('\n')}
  `.trim();
}
