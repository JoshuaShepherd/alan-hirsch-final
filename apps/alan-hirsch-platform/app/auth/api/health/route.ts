// ============================================================================
// HEALTH CHECK API ROUTES
// ============================================================================
// Type-safe API endpoints for health checks with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import { db } from '@platform/database';
import { CacheService } from '@platform/shared/cache/redis';
import { z } from 'zod';
import { createGetHandler } from '../../../../lib/api/route-handlers';

// ============================================================================
// HEALTH CHECK SCHEMAS
// ============================================================================

/**
 * Service health schema
 */
const ServiceHealthSchema = z.object({
  status: z.enum(['healthy', 'unhealthy', 'degraded']),
  responseTime: z.number().int().min(0),
  error: z.string().optional(),
  details: z.record(z.any()).optional(),
});

/**
 * Health check result schema
 */
const HealthCheckResultSchema = z.object({
  status: z.enum(['healthy', 'unhealthy', 'degraded']),
  timestamp: z.string().datetime(),
  services: z.object({
    database: ServiceHealthSchema,
    cache: ServiceHealthSchema,
    auth: ServiceHealthSchema,
    storage: ServiceHealthSchema,
  }),
  metrics: z.object({
    responseTime: z.number().int().min(0),
    uptime: z.number().min(0),
    version: z.string(),
  }),
});

// ============================================================================
// GET /api/health - Health check endpoint
// ============================================================================

export const GET = createGetHandler({
  inputSchema: undefined, // No input needed for health check
  outputSchema: HealthCheckResultSchema,
  requireAuth: false, // Health checks should be publicly accessible
  handler: async () => {
    const startTime = Date.now();

    try {
      // Check all services in parallel
      const [databaseHealth, cacheHealth, authHealth, storageHealth] =
        await Promise.allSettled([
          checkDatabase(),
          checkCache(),
          checkAuth(),
          checkStorage(),
        ]);

      const responseTime = Date.now() - startTime;

      // Determine overall health status
      const services = {
        database:
          databaseHealth.status === 'fulfilled'
            ? databaseHealth.value
            : {
                status: 'unhealthy' as const,
                responseTime: 0,
                error:
                  databaseHealth.status === 'rejected'
                    ? databaseHealth.reason?.message
                    : 'Unknown error',
              },
        cache:
          cacheHealth.status === 'fulfilled'
            ? cacheHealth.value
            : {
                status: 'unhealthy' as const,
                responseTime: 0,
                error:
                  cacheHealth.status === 'rejected'
                    ? cacheHealth.reason?.message
                    : 'Unknown error',
              },
        auth:
          authHealth.status === 'fulfilled'
            ? authHealth.value
            : {
                status: 'unhealthy' as const,
                responseTime: 0,
                error:
                  authHealth.status === 'rejected'
                    ? authHealth.reason?.message
                    : 'Unknown error',
              },
        storage:
          storageHealth.status === 'fulfilled'
            ? storageHealth.value
            : {
                status: 'unhealthy' as const,
                responseTime: 0,
                error:
                  storageHealth.status === 'rejected'
                    ? storageHealth.reason?.message
                    : 'Unknown error',
              },
      };

      const overallStatus = determineOverallStatus(services);

      return {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        services,
        metrics: {
          responseTime,
          uptime: process.uptime(),
          version: process.env['npm_package_version'] || '1.0.0',
        },
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      return {
        status: 'unhealthy' as const,
        timestamp: new Date().toISOString(),
        services: {
          database: {
            status: 'unhealthy' as const,
            responseTime: 0,
            error: 'Health check failed',
          },
          cache: {
            status: 'unhealthy' as const,
            responseTime: 0,
            error: 'Health check failed',
          },
          auth: {
            status: 'unhealthy' as const,
            responseTime: 0,
            error: 'Health check failed',
          },
          storage: {
            status: 'unhealthy' as const,
            responseTime: 0,
            error: 'Health check failed',
          },
        },
        metrics: {
          responseTime,
          uptime: process.uptime(),
          version: process.env['npm_package_version'] || '1.0.0',
        },
      };
    }
  },
});

/**
 * Check database health
 */
async function checkDatabase(): Promise<z.infer<typeof ServiceHealthSchema>> {
  const startTime = Date.now();

  try {
    // Simple query to check database connectivity
    await db.execute('SELECT 1 as health_check');

    const responseTime = Date.now() - startTime;

    return {
      status: 'healthy',
      responseTime,
      details: {
        connectionPool: 'active',
        queryTime: responseTime,
      },
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return {
      status: 'unhealthy',
      responseTime,
      error:
        error instanceof Error ? error.message : 'Database connection failed',
    };
  }
}

/**
 * Check cache health
 */
async function checkCache(): Promise<z.infer<typeof ServiceHealthSchema>> {
  const startTime = Date.now();

  try {
    const cacheService = new CacheService(
      process.env['UPSTASH_REDIS_REST_URL'] || '',
      process.env['UPSTASH_REDIS_REST_TOKEN'] || ''
    );

    const health = await cacheService.getHealth();
    const responseTime = Date.now() - startTime;

    return {
      status: health.status,
      responseTime: health.latency,
      error: health.error,
      details: {
        latency: health.latency,
        stats: cacheService.getStats(),
      },
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return {
      status: 'unhealthy',
      responseTime,
      error: error instanceof Error ? error.message : 'Cache connection failed',
    };
  }
}

/**
 * Check authentication service health
 */
async function checkAuth(): Promise<z.infer<typeof ServiceHealthSchema>> {
  const startTime = Date.now();

  try {
    // Check if Supabase auth service is accessible
    const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
    const supabaseKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    // Simple health check request to Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        status: 'healthy',
        responseTime,
        details: {
          supabaseUrl,
          responseStatus: response.status,
        },
      };
    } else {
      return {
        status: 'degraded',
        responseTime,
        error: `Supabase returned status ${response.status}`,
        details: {
          supabaseUrl,
          responseStatus: response.status,
        },
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return {
      status: 'unhealthy',
      responseTime,
      error:
        error instanceof Error ? error.message : 'Auth service check failed',
    };
  }
}

/**
 * Check storage service health
 */
async function checkStorage(): Promise<z.infer<typeof ServiceHealthSchema>> {
  const startTime = Date.now();

  try {
    // Check if Supabase storage is accessible
    const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
    const supabaseKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    // Simple health check request to Supabase storage
    const response = await fetch(`${supabaseUrl}/storage/v1/`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        status: 'healthy',
        responseTime,
        details: {
          supabaseUrl,
          responseStatus: response.status,
        },
      };
    } else {
      return {
        status: 'degraded',
        responseTime,
        error: `Supabase storage returned status ${response.status}`,
        details: {
          supabaseUrl,
          responseStatus: response.status,
        },
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return {
      status: 'unhealthy',
      responseTime,
      error:
        error instanceof Error ? error.message : 'Storage service check failed',
    };
  }
}

/**
 * Determine overall health status based on individual services
 */
function determineOverallStatus(
  services: z.infer<typeof HealthCheckResultSchema>['services']
): 'healthy' | 'unhealthy' | 'degraded' {
  const serviceStatuses = Object.values(services).map(
    service => service.status
  );

  if (serviceStatuses.every(status => status === 'healthy')) {
    return 'healthy';
  }

  if (serviceStatuses.some(status => status === 'unhealthy')) {
    return 'unhealthy';
  }

  return 'degraded';
}
