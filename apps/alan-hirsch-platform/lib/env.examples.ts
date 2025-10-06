/**
 * Environment Usage Examples
 *
 * This file demonstrates how to use the environment validation and type definitions
 * throughout the application.
 */

import { env, isDevelopment, isFeatureEnabled, isProduction } from './env';
import type { EnvironmentVariables } from './env.types';

// Example 1: Basic environment variable access
export function getDatabaseConfig() {
  return {
    url: env.POSTGRES_URL,
    ssl: isProduction(env),
    poolSize: isDevelopment(env) ? 5 : 20,
  };
}

// Example 2: Feature flag checking
export function shouldEnableAIFeatures(): boolean {
  return isFeatureEnabled(env, 'ENABLE_AI_FEATURES');
}

// Example 3: Environment-specific configuration
export function getLogLevel(): 'debug' | 'info' | 'warn' | 'error' {
  if (isDevelopment(env)) return 'debug';
  if (isProduction(env)) return 'warn';
  return 'info';
}

// Example 4: Conditional functionality based on environment
export function getApiBaseUrl(): string {
  if (isDevelopment(env)) {
    return 'http://localhost:3000/api';
  }
  return env.APP_URL + '/api';
}

// Example 5: Safe environment variable access with fallbacks
export function getRedisConfig() {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Redis configuration not available, using in-memory cache');
    return null;
  }

  return {
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  };
}

// Example 6: Environment validation in API routes
export function validateEnvironmentForRoute(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is required');
  }

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY is required');
  }

  if (isProduction(env) && !env.NEXTAUTH_SECRET) {
    errors.push('NEXTAUTH_SECRET is required in production');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Example 7: Type-safe environment variable accessor
export class EnvironmentService {
  private env: EnvironmentVariables;

  constructor(environment: EnvironmentVariables) {
    this.env = environment;
  }

  get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] {
    return this.env[key];
  }

  getRequired<K extends keyof EnvironmentVariables>(
    key: K
  ): NonNullable<EnvironmentVariables[K]> {
    const value = this.env[key];
    if (value === undefined || value === null) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value as NonNullable<EnvironmentVariables[K]>;
  }

  getOptional<K extends keyof EnvironmentVariables>(
    key: K,
    defaultValue?: EnvironmentVariables[K]
  ): EnvironmentVariables[K] {
    const value = this.env[key];
    return value !== undefined
      ? value
      : (defaultValue as EnvironmentVariables[K]);
  }

  has<K extends keyof EnvironmentVariables>(key: K): boolean {
    const value = this.env[key];
    return value !== undefined && value !== null && value !== '';
  }

  isDevelopment(): boolean {
    return this.env.NODE_ENV === 'development';
  }

  isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }

  isStaging(): boolean {
    return this.env.NODE_ENV === 'staging';
  }
}

// Example 8: Environment-specific service configuration
export function createServiceConfig() {
  const baseConfig = {
    appName: env.APP_NAME,
    appUrl: env.APP_URL,
    nodeEnv: env.NODE_ENV,
  };

  if (isDevelopment(env)) {
    return {
      ...baseConfig,
      debug: true,
      logLevel: 'debug' as const,
      enableHotReload: true,
      enableSourceMaps: true,
    };
  }

  if (isProduction(env)) {
    return {
      ...baseConfig,
      debug: false,
      logLevel: 'warn' as const,
      enableHotReload: false,
      enableSourceMaps: false,
      enableCompression: true,
      enableCaching: true,
    };
  }

  // Staging
  return {
    ...baseConfig,
    debug: false,
    logLevel: 'info' as const,
    enableHotReload: false,
    enableSourceMaps: true,
    enableCompression: true,
    enableCaching: true,
  };
}

// Example 9: Environment variable validation for deployment
export function validateDeploymentEnvironment(): {
  valid: boolean;
  missing: string[];
  warnings: string[];
} {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Required for all environments
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'POSTGRES_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ] as const;

  required.forEach(key => {
    if (!env[key]) {
      missing.push(key);
    }
  });

  // Production-specific requirements
  if (isProduction(env)) {
    if (!env.ADMIN_EMAIL) {
      warnings.push('ADMIN_EMAIL not set - admin notifications will not work');
    }

    if (!env.JWT_SECRET) {
      warnings.push('JWT_SECRET not set - using NextAuth secret as fallback');
    }

    if (env.ENABLE_DEBUG_MODE) {
      warnings.push(
        'ENABLE_DEBUG_MODE is true in production - consider disabling'
      );
    }
  }

  // Development-specific warnings
  if (isDevelopment(env)) {
    if (!env.ENABLE_DEBUG_MODE) {
      warnings.push(
        'ENABLE_DEBUG_MODE is false in development - consider enabling'
      );
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

// Example 10: Environment-aware error handling
export function handleEnvironmentError(error: Error, context?: string): void {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  if (isDevelopment(env)) {
    console.error('Development Error:', errorInfo);
  } else {
    // In production, you might send to an error tracking service
    console.error('Production Error:', errorInfo);
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }
}
