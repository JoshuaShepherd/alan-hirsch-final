/**
 * API Performance Monitoring Middleware
 *
 * This middleware provides comprehensive performance monitoring for API routes
 * as recommended in the API Infrastructure Improvements Plan.
 */

import { NextRequest, NextResponse } from 'next/server';
import { performance } from 'perf_hooks';

export interface PerformanceMetrics {
  requestId: string;
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
  userId?: string;
  organizationId?: string;
  error?: string;
}

export interface PerformanceStats {
  totalRequests: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  requestsPerMinute: number;
  slowestEndpoints: Array<{
    endpoint: string;
    averageResponseTime: number;
    requestCount: number;
  }>;
  errorEndpoints: Array<{
    endpoint: string;
    errorCount: number;
    errorRate: number;
  }>;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetrics[] = [];
  private static readonly MAX_METRICS = 10000;
  private static readonly SLOW_REQUEST_THRESHOLD = 1000; // 1 second

  /**
   * Middleware function for performance monitoring
   */
  static withMonitoring(
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    return async (request: NextRequest): Promise<NextResponse> => {
      const startTime = performance.now();
      const requestId = this.generateRequestId();
      const timestamp = new Date();

      // Extract request information
      const method = request.method;
      const url = request.url;
      const userAgent = request.headers.get('user-agent') || undefined;
      const ip = this.getClientIP(request);
      const userId = request.headers.get('X-User-ID') || undefined;
      const organizationId =
        request.headers.get('X-Organization-ID') || undefined;

      let response: NextResponse | undefined;
      let error: string | undefined;

      try {
        response = await handler(request);
        return response;
      } catch (err) {
        error = err instanceof Error ? err.message : 'Unknown error';

        // Record error metrics
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        const metrics: PerformanceMetrics = {
          requestId,
          method,
          url,
          statusCode: 500, // Default error status
          responseTime,
          timestamp,
          userAgent,
          ip,
          userId,
          organizationId,
          error,
        };

        this.recordMetrics(metrics);
        throw err;
      } finally {
        if (response) {
          const endTime = performance.now();
          const responseTime = endTime - startTime;

          // Record metrics
          const metrics: PerformanceMetrics = {
            requestId,
            method,
            url,
            statusCode: response.status,
            responseTime,
            timestamp,
            userAgent,
            ip,
            userId,
            organizationId,
            error,
          };

          this.recordMetrics(metrics);

          // Add performance headers
          response.headers.set('X-Request-ID', requestId);
          response.headers.set(
            'X-Response-Time',
            `${responseTime.toFixed(2)}ms`
          );

          if (responseTime > this.SLOW_REQUEST_THRESHOLD) {
            response.headers.set('X-Slow-Request', 'true');
          }
        }
      }
    };
  }

  /**
   * Record performance metrics
   */
  private static recordMetrics(metrics: PerformanceMetrics): void {
    this.metrics.push(metrics);

    // Keep only the most recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }

    // Log slow requests
    if (metrics.responseTime > this.SLOW_REQUEST_THRESHOLD) {
      console.warn(
        `Slow request detected: ${metrics.method} ${metrics.url} (${metrics.responseTime.toFixed(2)}ms)`
      );
    }

    // Log errors
    if (metrics.statusCode >= 400) {
      console.error(
        `API error: ${metrics.method} ${metrics.url} - ${metrics.statusCode} (${metrics.responseTime.toFixed(2)}ms)`
      );
    }
  }

  /**
   * Get performance statistics
   */
  static getPerformanceStats(): PerformanceStats {
    const totalRequests = this.metrics.length;

    if (totalRequests === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        errorRate: 0,
        requestsPerMinute: 0,
        slowestEndpoints: [],
        errorEndpoints: [],
      };
    }

    // Calculate response time statistics
    const responseTimes = this.metrics
      .map(m => m.responseTime)
      .sort((a, b) => a - b);
    const averageResponseTime =
      responseTimes.reduce((sum, time) => sum + time, 0) / totalRequests;
    const p95ResponseTime = responseTimes[Math.floor(totalRequests * 0.95)];
    const p99ResponseTime = responseTimes[Math.floor(totalRequests * 0.99)];

    // Calculate error rate
    const errorCount = this.metrics.filter(m => m.statusCode >= 400).length;
    const errorRate = errorCount / totalRequests;

    // Calculate requests per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentRequests = this.metrics.filter(
      m => m.timestamp.getTime() > oneMinuteAgo
    ).length;
    const requestsPerMinute = recentRequests;

    // Find slowest endpoints
    const endpointStats = new Map<
      string,
      { totalTime: number; count: number }
    >();
    this.metrics.forEach(metric => {
      const endpoint = this.extractEndpoint(metric.url);
      const existing = endpointStats.get(endpoint) || {
        totalTime: 0,
        count: 0,
      };
      endpointStats.set(endpoint, {
        totalTime: existing.totalTime + metric.responseTime,
        count: existing.count + 1,
      });
    });

    const slowestEndpoints = Array.from(endpointStats.entries())
      .map(([endpoint, stats]) => ({
        endpoint,
        averageResponseTime: stats.totalTime / stats.count,
        requestCount: stats.count,
      }))
      .sort((a, b) => b.averageResponseTime - a.averageResponseTime)
      .slice(0, 10);

    // Find error endpoints
    const errorStats = new Map<
      string,
      { errorCount: number; totalCount: number }
    >();
    this.metrics.forEach(metric => {
      const endpoint = this.extractEndpoint(metric.url);
      const existing = errorStats.get(endpoint) || {
        errorCount: 0,
        totalCount: 0,
      };
      errorStats.set(endpoint, {
        errorCount: existing.errorCount + (metric.statusCode >= 400 ? 1 : 0),
        totalCount: existing.totalCount + 1,
      });
    });

    const errorEndpoints = Array.from(errorStats.entries())
      .map(([endpoint, stats]) => ({
        endpoint,
        errorCount: stats.errorCount,
        errorRate: stats.errorCount / stats.totalCount,
      }))
      .filter(stat => stat.errorCount > 0)
      .sort((a, b) => b.errorCount - a.errorCount)
      .slice(0, 10);

    return {
      totalRequests,
      averageResponseTime,
      p95ResponseTime,
      p99ResponseTime,
      errorRate,
      requestsPerMinute,
      slowestEndpoints,
      errorEndpoints,
    };
  }

  /**
   * Get metrics for a specific time range
   */
  static getMetricsForTimeRange(
    startTime: Date,
    endTime: Date
  ): PerformanceMetrics[] {
    return this.metrics.filter(
      metric => metric.timestamp >= startTime && metric.timestamp <= endTime
    );
  }

  /**
   * Get slow requests
   */
  static getSlowRequests(
    threshold: number = this.SLOW_REQUEST_THRESHOLD
  ): PerformanceMetrics[] {
    return this.metrics.filter(metric => metric.responseTime > threshold);
  }

  /**
   * Get error requests
   */
  static getErrorRequests(): PerformanceMetrics[] {
    return this.metrics.filter(metric => metric.statusCode >= 400);
  }

  /**
   * Clear metrics
   */
  static clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Generate a unique request ID
   */
  private static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Extract endpoint from URL
   */
  private static extractEndpoint(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url;
    }
  }

  /**
   * Get client IP address
   */
  private static getClientIP(request: NextRequest): string | undefined {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');

    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    if (forwarded) return forwarded.split(',')[0].trim();

    return undefined;
  }
}

/**
 * Performance monitoring decorator for API routes
 */
export function monitorPerformance(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;

  descriptor.value = async function (request: NextRequest) {
    return PerformanceMonitor.withMonitoring(method.bind(this))(request);
  };

  return descriptor;
}

/**
 * Utility to generate performance report
 */
export function generatePerformanceReport(): string {
  const stats = PerformanceMonitor.getPerformanceStats();
  const slowRequests = PerformanceMonitor.getSlowRequests();
  const errorRequests = PerformanceMonitor.getErrorRequests();

  return `
API Performance Report
=====================
Total Requests: ${stats.totalRequests}
Average Response Time: ${stats.averageResponseTime.toFixed(2)}ms
P95 Response Time: ${stats.p95ResponseTime.toFixed(2)}ms
P99 Response Time: ${stats.p99ResponseTime.toFixed(2)}ms
Error Rate: ${(stats.errorRate * 100).toFixed(2)}%
Requests Per Minute: ${stats.requestsPerMinute}

Slowest Endpoints:
${stats.slowestEndpoints
  .map(
    (endpoint, i) =>
      `${i + 1}. ${endpoint.endpoint} - ${endpoint.averageResponseTime.toFixed(2)}ms (${endpoint.requestCount} requests)`
  )
  .join('\n')}

Error Endpoints:
${stats.errorEndpoints
  .map(
    (endpoint, i) =>
      `${i + 1}. ${endpoint.endpoint} - ${endpoint.errorCount} errors (${(endpoint.errorRate * 100).toFixed(2)}% error rate)`
  )
  .join('\n')}

Recent Slow Requests:
${slowRequests
  .slice(-5)
  .map(
    (req, i) =>
      `${i + 1}. ${req.method} ${req.url} - ${req.responseTime.toFixed(2)}ms`
  )
  .join('\n')}

Recent Errors:
${errorRequests
  .slice(-5)
  .map(
    (req, i) =>
      `${i + 1}. ${req.method} ${req.url} - ${req.statusCode} (${req.responseTime.toFixed(2)}ms)`
  )
  .join('\n')}
  `.trim();
}
