/**
 * Readiness Probe API Endpoint
 *
 * This endpoint provides readiness checks for the API infrastructure
 * to determine if the service is ready to serve requests.
 */

import { db } from '@platform/database';
import { CacheService } from '@platform/shared/cache/redis';
import { NextRequest, NextResponse } from 'next/server';

export interface ReadinessResult {
  status: 'ready' | 'not_ready';
  timestamp: string;
  checks: {
    database: CheckResult;
    cache: CheckResult;
    environment: CheckResult;
  };
  details: {
    version: string;
    environment: string;
    uptime: number;
  };
}

export interface CheckResult {
  status: 'pass' | 'fail';
  message: string;
  details?: Record<string, any>;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

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

    const readinessResult: ReadinessResult = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks,
      details: {
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
      },
    };

    const httpStatus = overallStatus === 'ready' ? 200 : 503;

    return NextResponse.json(readinessResult, {
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Readiness-Check': 'true',
      },
    });
  } catch (error) {
    const readinessResult: ReadinessResult = {
      status: 'not_ready',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: 'fail',
          message: 'Database readiness check failed',
        },
        cache: { status: 'fail', message: 'Cache readiness check failed' },
        environment: {
          status: 'fail',
          message: 'Environment readiness check failed',
        },
      },
      details: {
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
      },
    };

    return NextResponse.json(readinessResult, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Readiness-Check': 'true',
      },
    });
  }
}

/**
 * Check database readiness
 */
async function checkDatabaseReadiness(): Promise<CheckResult> {
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
async function checkCacheReadiness(): Promise<CheckResult> {
  try {
    const cacheService = new CacheService(
      process.env.UPSTASH_REDIS_REST_URL || '',
      process.env.UPSTASH_REDIS_REST_TOKEN || ''
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
async function checkEnvironmentReadiness(): Promise<CheckResult> {
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
    const currentEnv = process.env.NODE_ENV;

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
