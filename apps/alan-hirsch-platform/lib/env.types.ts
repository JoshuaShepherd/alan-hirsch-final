/**
 * Environment Variable Type Definitions
 *
 * This module provides TypeScript type definitions for environment variables
 * to ensure type safety throughout the application.
 */

// Base environment variable types
export type NodeEnv = 'development' | 'staging' | 'production';

export type FeatureFlag = 'true' | 'false';

// Environment variable interface
export interface EnvironmentVariables {
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;

  // Database Configuration
  POSTGRES_URL: string;

  // Authentication
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;

  // Node Environment
  NODE_ENV: NodeEnv;

  // Application Settings
  APP_NAME: string;
  APP_URL: string;
  ADMIN_EMAIL?: string;

  // Feature Flags
  ENABLE_AI_FEATURES: boolean;
  ENABLE_ANALYTICS: boolean;
  ENABLE_DEBUG_MODE: boolean;
  ENABLE_REGISTRATION?: boolean;

  // Redis Configuration (Optional)
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;

  // Stripe Configuration (Optional)
  STRIPE_SECRET_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;

  // Email Configuration (Optional)
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  SMTP_FROM?: string;

  // Analytics (Optional)
  VERCEL_ANALYTICS_ID?: string;
  GOOGLE_ANALYTICS_ID?: string;

  // Security (Optional)
  JWT_SECRET?: string;
  ENCRYPTION_KEY?: string;
  CORS_ORIGIN: string;

  // File Upload
  MAX_FILE_SIZE: number;
  UPLOAD_DIR: string;

  // Development & Debugging
  DEBUG?: boolean;
  LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';

  // Testing (Optional)
  VITEST_WORKER_ID?: string;
  TEST_DATABASE_URL?: string;
}

// Utility types for environment checks
export type EnvironmentCheck<T extends keyof EnvironmentVariables> =
  EnvironmentVariables[T] extends undefined ? false : true;

export type RequiredEnvVars = {
  [K in keyof EnvironmentVariables]: EnvironmentVariables[K] extends undefined
    ? never
    : K;
}[keyof EnvironmentVariables];

export type OptionalEnvVars = {
  [K in keyof EnvironmentVariables]: EnvironmentVariables[K] extends undefined
    ? K
    : never;
}[keyof EnvironmentVariables];

// Environment-specific types
export interface DevelopmentEnvironment extends EnvironmentVariables {
  NODE_ENV: 'development';
  ENABLE_DEBUG_MODE: true;
  LOG_LEVEL: 'debug';
}

export interface StagingEnvironment extends EnvironmentVariables {
  NODE_ENV: 'staging';
  ENABLE_DEBUG_MODE: false;
  LOG_LEVEL: 'info';
}

export interface ProductionEnvironment extends EnvironmentVariables {
  NODE_ENV: 'production';
  ENABLE_DEBUG_MODE: false;
  LOG_LEVEL: 'warn';
}

// Union type for all environments
export type Environment =
  | DevelopmentEnvironment
  | StagingEnvironment
  | ProductionEnvironment;

// Type guards for environment checking
export function isDevelopment(
  env: EnvironmentVariables
): env is DevelopmentEnvironment {
  return env.NODE_ENV === 'development';
}

export function isStaging(
  env: EnvironmentVariables
): env is StagingEnvironment {
  return env.NODE_ENV === 'staging';
}

export function isProduction(
  env: EnvironmentVariables
): env is ProductionEnvironment {
  return env.NODE_ENV === 'production';
}

// Feature flag type guards
export function isFeatureEnabled(
  env: EnvironmentVariables,
  feature: keyof Pick<
    EnvironmentVariables,
    | 'ENABLE_AI_FEATURES'
    | 'ENABLE_ANALYTICS'
    | 'ENABLE_DEBUG_MODE'
    | 'ENABLE_REGISTRATION'
  >
): boolean {
  return env[feature] === true;
}

// Environment variable validation result
export interface EnvValidationResult {
  success: boolean;
  errors?: Array<{
    variable: string;
    message: string;
    value?: string;
  }>;
  warnings?: Array<{
    variable: string;
    message: string;
    value?: string;
  }>;
}

// Environment variable accessor with type safety
export interface EnvAccessor {
  get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K];
  getRequired<K extends RequiredEnvVars>(
    key: K
  ): NonNullable<EnvironmentVariables[K]>;
  getOptional<K extends OptionalEnvVars>(
    key: K,
    defaultValue?: EnvironmentVariables[K]
  ): EnvironmentVariables[K];
  has<K extends keyof EnvironmentVariables>(key: K): boolean;
  validate(): EnvValidationResult;
}

// Environment configuration for different deployment targets
export interface DeploymentConfig {
  environment: NodeEnv;
  database: {
    url: string;
    ssl: boolean;
    poolSize: number;
  };
  redis?: {
    url: string;
    token: string;
  };
  features: {
    ai: boolean;
    analytics: boolean;
    debug: boolean;
    registration: boolean;
  };
  security: {
    cors: string[];
    jwtSecret: string;
    encryptionKey?: string;
  };
  monitoring: {
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    enableMetrics: boolean;
    enableTracing: boolean;
  };
}

// Export all types
export type {
  DeploymentConfig,
  DevelopmentEnvironment,
  EnvAccessor,
  EnvValidationResult,
  Environment,
  EnvironmentCheck,
  EnvironmentVariables,
  OptionalEnvVars,
  ProductionEnvironment,
  RequiredEnvVars,
  StagingEnvironment,
};
