/**
 * Environment Variable Validation
 *
 * This module provides runtime validation for environment variables
 * to catch configuration issues early and provide better error messages.
 */

import { z } from 'zod';

// Environment variable validation schema
const envSchema = z.object({
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase anon key is required'),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'Supabase service role key is required'),

  // Database Configuration
  POSTGRES_URL: z.string().url('Invalid PostgreSQL URL'),

  // Authentication
  NEXTAUTH_SECRET: z
    .string()
    .min(32, 'NextAuth secret must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL'),

  // Node Environment
  NODE_ENV: z.enum(['development', 'staging', 'production'], {
    errorMap: () => ({
      message: 'NODE_ENV must be development, staging, or production',
    }),
  }),

  // Optional variables with defaults
  APP_NAME: z.string().default('Alan Hirsch Digital Platform'),
  APP_URL: z.string().url().default('http://localhost:3000'),

  // Feature flags
  ENABLE_AI_FEATURES: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
  ENABLE_ANALYTICS: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
  ENABLE_DEBUG_MODE: z
    .string()
    .transform(val => val === 'true')
    .default('false'),

  // Optional Redis configuration
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Optional Stripe configuration
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Optional email configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z
    .string()
    .transform(val => parseInt(val, 10))
    .optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Optional analytics
  VERCEL_ANALYTICS_ID: z.string().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),

  // Optional security
  JWT_SECRET: z.string().optional(),
  ENCRYPTION_KEY: z.string().optional(),
  CORS_ORIGIN: z.string().default('*'),

  // Optional file upload
  MAX_FILE_SIZE: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('10485760'),
  UPLOAD_DIR: z.string().default('./uploads'),

  // Optional admin
  ADMIN_EMAIL: z.string().email().optional(),
});

// Parse and validate environment variables
let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Environment variable validation failed:');
    error.errors.forEach(err => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    console.error(
      '\nPlease check your .env.local file and ensure all required variables are set.'
    );
    console.error(
      'See __docs__/env-reference.md for a complete list of required variables.'
    );
    process.exit(1);
  }
  throw error;
}

// Export validated environment variables
export { env };

// Export individual variables for convenience
export const {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  POSTGRES_URL,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  NODE_ENV,
  APP_NAME,
  APP_URL,
  ENABLE_AI_FEATURES,
  ENABLE_ANALYTICS,
  ENABLE_DEBUG_MODE,
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  VERCEL_ANALYTICS_ID,
  GOOGLE_ANALYTICS_ID,
  JWT_SECRET,
  ENCRYPTION_KEY,
  CORS_ORIGIN,
  MAX_FILE_SIZE,
  UPLOAD_DIR,
  ADMIN_EMAIL,
} = env;

// Type exports
export type Env = typeof env;
export type NodeEnv = 'development' | 'staging' | 'production';

// Utility functions
export const isDevelopment = NODE_ENV === 'development';
export const isStaging = NODE_ENV === 'staging';
export const isProduction = NODE_ENV === 'production';

export const isDebugMode = isDevelopment || ENABLE_DEBUG_MODE;

// Validation helpers
export function validateRequiredEnvVar(
  name: string,
  value: string | undefined
): string {
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`);
  }
  return value;
}

export function validateOptionalEnvVar(
  name: string,
  value: string | undefined,
  defaultValue: string
): string {
  return value || defaultValue;
}
