// ============================================================================
// READINESS PROBE API ROUTES
// ============================================================================
// Type-safe API endpoints for readiness checks with proper validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import { db } from '@platform/database';
import { CacheService } from '@platform/shared/cache/redis';
import { z } from 'zod';
import { createGetHandler } from '../../../../lib/api/route-handlers';

// ============================================================================
// READINESS CHECK SCHEMAS
// ============================================================================

/**
 * Check result schema
 */
const CheckResultSchema = z.object({
  status: z.enum(['pass', 'fail']),
  message: z.string(),
  details: z.record(z.any()).optional(),
});

/**
 * Readiness result schema
 */
const ReadinessResultSchema = z.object({
  status: z.enum(['ready', 'not_ready']),
  timestamp: z.string().datetime(),
  checks: z.object({
    database: CheckResultSchema,
    cache: CheckResultSchema,
    environment: CheckResultSchema,
  }),
  details: z.object({
    version: z.string(),
    environment: z.string(),
    uptime: z.number().min(0),
  }),
});

// ============================================================================
// GET /api/ready - Readiness probe endpoint
// ============================================================================

export const GET = createGetHandler({
  inputSchema: undefined, // No input needed for readiness check
  outputSchema: ReadinessResultSchema,
  requireAuth: false, // Readiness checks should be publicly accessible
  handler: async () => {
    try {
      // Perform readiness checks
      const [databaseCheck, cacheCheck, environmentCheck] =
        await Promise.allSettled([
          checkDatabaseReadiness(),
          checkCacheReadiness(),
          checkEnvironmentReadiness(),
        ]);

      const checks = {
        database:
          databaseCheck.status === 'fulfilled'
            ? databaseCheck.value
            : {
                status: 'fail' as const,
                message: 'Database readiness check failed',
                details: {
                  error:
                    databaseCheck.status === 'rejected'
                      ? databaseCheck.reason?.message
                      : 'Unknown error',
                },
              },
        cache:
          cacheCheck.status === 'fulfilled'
            ? cacheCheck.value
            : {
                status: 'fail' as const,
                message: 'Cache readiness check failed',
                details: {
                  error:
                    cacheCheck.status === 'rejected'
                      ? cacheCheck.reason?.message
                      : 'Unknown error',
                },
              },
        environment:
          environmentCheck.status === 'fulfilled'
            ? environmentCheck.value
            : {
                status: 'fail' as const,
                message: 'Environment readiness check failed',
                details: {
                  error:
                    environmentCheck.status === 'rejected'
                      ? environmentCheck.reason?.message
                      : 'Unknown error',
                },
              },
      };

      // Determine overall readiness
      const allChecksPass = Object.values(checks).every(
        check => check.status === 'pass'
      );
      const overallStatus = allChecksPass ? 'ready' : 'not_ready';

      return {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        checks,
        details: {
          version: process.env['npm_package_version'] || '1.0.0',
          environment: process.env['NODE_ENV'] || 'development',
          uptime: process.uptime(),
        },
      };
    } catch (error) {
      return {
        status: 'not_ready' as const,
        timestamp: new Date().toISOString(),
        checks: {
          database: {
            status: 'fail' as const,
            message: 'Database readiness check failed',
          },
          cache: {
            status: 'fail' as const,
            message: 'Cache readiness check failed',
          },
          environment: {
            status: 'fail' as const,
            message: 'Environment readiness check failed',
          },
        },
        details: {
          version: process.env['npm_package_version'] || '1.0.0',
          environment: process.env['NODE_ENV'] || 'development',
          uptime: process.uptime(),
        },
      };
    }
  },
});

/**
 * Check database readiness
 */
async function checkDatabaseReadiness(): Promise<
  z.infer<typeof CheckResultSchema>
> {
  try {
    // Check if database connection is available
    await db.execute('SELECT 1 as readiness_check');

    // Check if we can perform a simple query on a core table
    await db.execute('SELECT COUNT(*) FROM user_profiles LIMIT 1');

    return {
      status: 'pass',
      message: 'Database is ready',
      details: {
        connection: 'active',
        tables: 'accessible',
      },
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Database is not ready',
      details: {
        error:
          error instanceof Error ? error.message : 'Unknown database error',
      },
    };
  }
}

/**
 * Check cache readiness
 */
async function checkCacheReadiness(): Promise<
  z.infer<typeof CheckResultSchema>
> {
  try {
    const cacheService = new CacheService(
      process.env['UPSTASH_REDIS_REST_URL'] || '',
      process.env['UPSTASH_REDIS_REST_TOKEN'] || ''
    );

    // Test cache connectivity
    const health = await cacheService.getHealth();

    if (health.status !== 'healthy') {
      return {
        status: 'fail',
        message: 'Cache is not ready',
        details: {
          status: health.status,
          error: health.error,
        },
      };
    }

    // Test cache operations
    const testKey = 'readiness-test';
    const testValue = { test: true, timestamp: Date.now() };

    await cacheService.set(testKey, testValue, { ttl: 10 });
    const retrieved = await cacheService.get(testKey);
    await cacheService.delete(testKey);

    if (!retrieved || JSON.stringify(retrieved) !== JSON.stringify(testValue)) {
      return {
        status: 'fail',
        message: 'Cache operations are not working correctly',
        details: {
          write: 'failed',
          read: 'failed',
        },
      };
    }

    return {
      status: 'pass',
      message: 'Cache is ready',
      details: {
        status: health.status,
        latency: health.latency,
        operations: 'working',
      },
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Cache is not ready',
      details: {
        error: error instanceof Error ? error.message : 'Unknown cache error',
      },
    };
  }
}

/**
 * Check environment readiness
 */
async function checkEnvironmentReadiness(): Promise<
  z.infer<typeof CheckResultSchema>
> {
  try {
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'POSTGRES_URL',
    ];

    const missingVars = requiredEnvVars.filter(
      varName => !process.env[varName]
    );

    if (missingVars.length > 0) {
      return {
        status: 'fail',
        message: 'Required environment variables are missing',
        details: {
          missing: missingVars,
        },
      };
    }

    // Check if we're in a valid environment
    const validEnvironments = ['development', 'staging', 'production'];
    const currentEnv = process.env['NODE_ENV'];

    if (!currentEnv || !validEnvironments.includes(currentEnv)) {
      return {
        status: 'fail',
        message: 'Invalid environment configuration',
        details: {
          current: currentEnv,
          valid: validEnvironments,
        },
      };
    }

    return {
      status: 'pass',
      message: 'Environment is ready',
      details: {
        environment: currentEnv,
        requiredVars: 'present',
      },
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Environment check failed',
      details: {
        error:
          error instanceof Error ? error.message : 'Unknown environment error',
      },
    };
  }
}
