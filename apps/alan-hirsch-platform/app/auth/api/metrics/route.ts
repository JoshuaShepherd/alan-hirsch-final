// ============================================================================
// METRICS API ROUTES
// ============================================================================
// Type-safe API endpoints for system metrics with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import { CacheService } from '@platform/shared/cache/redis';
import { QueryOptimizer } from '@platform/shared/utils/query-optimizer';
import { z } from 'zod';
import { createGetHandler } from '../../../../lib/api/route-handlers';

export interface MetricsResult {
  timestamp: string;
  system: SystemMetrics;
  performance: PerformanceMetrics;
  cache: CacheMetrics;
  database: DatabaseMetrics;
  api: ApiMetrics;
}

export interface SystemMetrics {
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
  };
  version: string;
  environment: string;
}

export interface PerformanceMetrics {
  responseTime: {
    average: number;
    p95: number;
    p99: number;
  };
  throughput: {
    requestsPerSecond: number;
    requestsPerMinute: number;
  };
  errorRate: number;
}

export interface CacheMetrics {
  hitRate: number;
  missRate: number;
  totalRequests: number;
  averageResponseTime: number;
  memoryUsage: number;
}

export interface DatabaseMetrics {
  queryCount: number;
  averageQueryTime: number;
  slowQueries: number;
  connectionPool: {
    active: number;
    idle: number;
    total: number;
  };
}

export interface ApiMetrics {
  totalRequests: number;
  requestsByMethod: Record<string, number>;
  requestsByEndpoint: Record<string, number>;
  statusCodes: Record<string, number>;
  averageResponseTime: number;
}

// Define metrics response schema
const MetricsResponseSchema = z.object({
  timestamp: z.string(),
  system: z.object({
    uptime: z.number(),
    memory: z.object({
      used: z.number(),
      total: z.number(),
      percentage: z.number(),
    }),
    cpu: z.object({
      usage: z.number(),
    }),
    version: z.string(),
    environment: z.string(),
  }),
  performance: z.object({
    responseTime: z.object({
      average: z.number(),
      p95: z.number(),
      p99: z.number(),
    }),
    throughput: z.object({
      requestsPerSecond: z.number(),
      requestsPerMinute: z.number(),
    }),
    errorRate: z.number(),
  }),
  cache: z.object({
    hitRate: z.number(),
    missRate: z.number(),
    totalRequests: z.number(),
    averageResponseTime: z.number(),
    memoryUsage: z.number(),
  }),
  database: z.object({
    queryCount: z.number(),
    averageQueryTime: z.number(),
    slowQueries: z.number(),
    connectionPool: z.object({
      active: z.number(),
      idle: z.number(),
      total: z.number(),
    }),
  }),
  api: z.object({
    totalRequests: z.number(),
    requestsByMethod: z.record(z.number()),
    requestsByEndpoint: z.record(z.number()),
    statusCodes: z.record(z.number()),
    averageResponseTime: z.number(),
  }),
});

export const GET = createGetHandler({
  inputSchema: z.object({}), // No input parameters needed
  outputSchema: MetricsResponseSchema,
  handler: async () => {
    try {
      // Collect metrics from various sources
      const [
        systemMetrics,
        performanceMetrics,
        cacheMetrics,
        databaseMetrics,
        apiMetrics,
      ] = await Promise.allSettled([
        getSystemMetrics(),
        getPerformanceMetrics(),
        getCacheMetrics(),
        getDatabaseMetrics(),
        getApiMetrics(),
      ]);

      const metricsResult: MetricsResult = {
        timestamp: new Date().toISOString(),
        system:
          systemMetrics.status === 'fulfilled'
            ? systemMetrics.value
            : getDefaultSystemMetrics(),
        performance:
          performanceMetrics.status === 'fulfilled'
            ? performanceMetrics.value
            : getDefaultPerformanceMetrics(),
        cache:
          cacheMetrics.status === 'fulfilled'
            ? cacheMetrics.value
            : getDefaultCacheMetrics(),
        database:
          databaseMetrics.status === 'fulfilled'
            ? databaseMetrics.value
            : getDefaultDatabaseMetrics(),
        api:
          apiMetrics.status === 'fulfilled'
            ? apiMetrics.value
            : getDefaultApiMetrics(),
      };

      return metricsResult;
    } catch (error) {
      // Return basic metrics even if collection fails
      const metricsResult: MetricsResult = {
        timestamp: new Date().toISOString(),
        system: getDefaultSystemMetrics(),
        performance: getDefaultPerformanceMetrics(),
        cache: getDefaultCacheMetrics(),
        database: getDefaultDatabaseMetrics(),
        api: getDefaultApiMetrics(),
      };

      return metricsResult;
    }
  },
});

/**
 * Get system metrics
 */
async function getSystemMetrics(): Promise<SystemMetrics> {
  const memUsage = process.memoryUsage();
  const totalMemory = memUsage.heapTotal + memUsage.external;
  const usedMemory = memUsage.heapUsed;

  return {
    uptime: process.uptime(),
    memory: {
      used: usedMemory,
      total: totalMemory,
      percentage: (usedMemory / totalMemory) * 100,
    },
    cpu: {
      usage: 0, // CPU usage would need additional monitoring
    },
    version: process.env['npm_package_version'] || '1.0.0',
    environment: process.env['NODE_ENV'] || 'development',
  };
}

/**
 * Get performance metrics
 */
async function getPerformanceMetrics(): Promise<PerformanceMetrics> {
  // This would typically come from a metrics collection system
  // For now, we'll return default values
  return {
    responseTime: {
      average: 150,
      p95: 300,
      p99: 500,
    },
    throughput: {
      requestsPerSecond: 10,
      requestsPerMinute: 600,
    },
    errorRate: 0.01, // 1% error rate
  };
}

/**
 * Get cache metrics
 */
async function getCacheMetrics(): Promise<CacheMetrics> {
  try {
    const cacheService = new CacheService(
      process.env['UPSTASH_REDIS_REST_URL'] || '',
      process.env['UPSTASH_REDIS_REST_TOKEN'] || ''
    );

    const stats = cacheService.getStats();

    return {
      hitRate: stats.hitRate,
      missRate: 1 - stats.hitRate,
      totalRequests: stats.totalRequests,
      averageResponseTime: 5, // Would need actual measurement
      memoryUsage: 0, // Would need Redis memory info
    };
  } catch (error) {
    return getDefaultCacheMetrics();
  }
}

/**
 * Get database metrics
 */
async function getDatabaseMetrics(): Promise<DatabaseMetrics> {
  try {
    const queryStats = QueryOptimizer.getQueryStatistics();

    return {
      queryCount: queryStats.totalQueries,
      averageQueryTime: queryStats.averageQueryTime,
      slowQueries: queryStats.slowQueries,
      connectionPool: {
        active: 5, // Would need actual pool metrics
        idle: 10,
        total: 15,
      },
    };
  } catch (error) {
    return getDefaultDatabaseMetrics();
  }
}

/**
 * Get API metrics
 */
async function getApiMetrics(): Promise<ApiMetrics> {
  // This would typically come from a metrics collection system
  // For now, we'll return default values
  return {
    totalRequests: 1000,
    requestsByMethod: {
      GET: 800,
      POST: 150,
      PUT: 30,
      DELETE: 20,
    },
    requestsByEndpoint: {
      '/api/assessments': 300,
      '/api/content': 250,
      '/api/user/profile': 200,
      '/api/health': 150,
      '/api/metrics': 100,
    },
    statusCodes: {
      '200': 950,
      '400': 30,
      '401': 10,
      '404': 5,
      '500': 5,
    },
    averageResponseTime: 150,
  };
}

/**
 * Default metrics when collection fails
 */
function getDefaultSystemMetrics(): SystemMetrics {
  return {
    uptime: process.uptime(),
    memory: {
      used: 0,
      total: 0,
      percentage: 0,
    },
    cpu: {
      usage: 0,
    },
    version: process.env['npm_package_version'] || '1.0.0',
    environment: process.env['NODE_ENV'] || 'development',
  };
}

function getDefaultPerformanceMetrics(): PerformanceMetrics {
  return {
    responseTime: {
      average: 0,
      p95: 0,
      p99: 0,
    },
    throughput: {
      requestsPerSecond: 0,
      requestsPerMinute: 0,
    },
    errorRate: 0,
  };
}

function getDefaultCacheMetrics(): CacheMetrics {
  return {
    hitRate: 0,
    missRate: 0,
    totalRequests: 0,
    averageResponseTime: 0,
    memoryUsage: 0,
  };
}

function getDefaultDatabaseMetrics(): DatabaseMetrics {
  return {
    queryCount: 0,
    averageQueryTime: 0,
    slowQueries: 0,
    connectionPool: {
      active: 0,
      idle: 0,
      total: 0,
    },
  };
}

function getDefaultApiMetrics(): ApiMetrics {
  return {
    totalRequests: 0,
    requestsByMethod: {},
    requestsByEndpoint: {},
    statusCodes: {},
    averageResponseTime: 0,
  };
}
