# Environment Variables Reference

This document provides a comprehensive reference for all environment variables used in the Alan Hirsch Digital Platform.

## Overview

Environment variables are used to configure the application for different environments (development, staging, production) and to store sensitive information securely.

## Required Variables

### Supabase Configuration

| Variable                        | Description               | Example                                   | Required |
| ------------------------------- | ------------------------- | ----------------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL      | `https://your-project.supabase.co`        | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | ✅       |

### Database Configuration

| Variable       | Description                  | Example                               | Required |
| -------------- | ---------------------------- | ------------------------------------- | -------- |
| `POSTGRES_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` | ✅       |
| `DATABASE_URL` | Alternative database URL     | `postgresql://user:pass@host:5432/db` | ❌       |

### Authentication

| Variable          | Description            | Example                 | Required |
| ----------------- | ---------------------- | ----------------------- | -------- |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | `your-secret-key-here`  | ✅       |
| `NEXTAUTH_URL`    | Application URL        | `http://localhost:3000` | ✅       |

## Optional Variables

### Email Configuration

| Variable    | Description          | Example                  | Default |
| ----------- | -------------------- | ------------------------ | ------- |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com`         | -       |
| `SMTP_PORT` | SMTP server port     | `587`                    | `587`   |
| `SMTP_USER` | SMTP username        | `your-email@gmail.com`   | -       |
| `SMTP_PASS` | SMTP password        | `your-app-password`      | -       |
| `SMTP_FROM` | From email address   | `noreply@alanhirsch.com` | -       |

### File Upload

| Variable        | Description                | Example     | Default           |
| --------------- | -------------------------- | ----------- | ----------------- |
| `MAX_FILE_SIZE` | Maximum file size in bytes | `10485760`  | `10485760` (10MB) |
| `UPLOAD_DIR`    | Upload directory path      | `./uploads` | `./uploads`       |

### Rate Limiting

| Variable                   | Description              | Example                         | Default |
| -------------------------- | ------------------------ | ------------------------------- | ------- |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST URL   | `https://your-redis.upstash.io` | -       |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token | `your-redis-token`              | -       |

### Analytics

| Variable              | Description         | Example             | Default |
| --------------------- | ------------------- | ------------------- | ------- |
| `VERCEL_ANALYTICS_ID` | Vercel Analytics ID | `your-analytics-id` | -       |
| `GOOGLE_ANALYTICS_ID` | Google Analytics ID | `GA-XXXXXXXXX-X`    | -       |

### Payments (Stripe)

| Variable                 | Description            | Example       | Default |
| ------------------------ | ---------------------- | ------------- | ------- |
| `STRIPE_SECRET_KEY`      | Stripe secret key      | `sk_test_...` | -       |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` | -       |
| `STRIPE_WEBHOOK_SECRET`  | Stripe webhook secret  | `whsec_...`   | -       |

### Application Settings

| Variable      | Description         | Example                        | Default                        |
| ------------- | ------------------- | ------------------------------ | ------------------------------ |
| `APP_NAME`    | Application name    | `Alan Hirsch Digital Platform` | `Alan Hirsch Digital Platform` |
| `APP_URL`     | Application URL     | `https://alanhirsch.com`       | `http://localhost:3000`        |
| `ADMIN_EMAIL` | Admin email address | `admin@alanhirsch.com`         | -                              |

### Security

| Variable         | Description               | Example                                             | Default |
| ---------------- | ------------------------- | --------------------------------------------------- | ------- |
| `JWT_SECRET`     | JWT signing secret        | `your-jwt-secret`                                   | -       |
| `ENCRYPTION_KEY` | Encryption key (32 chars) | `your-32-character-encryption-key`                  | -       |
| `CORS_ORIGIN`    | CORS allowed origins      | `https://alanhirsch.com,https://app.alanhirsch.com` | `*`     |

### Feature Flags

| Variable              | Description              | Example | Default |
| --------------------- | ------------------------ | ------- | ------- |
| `ENABLE_AI_FEATURES`  | Enable AI features       | `true`  | `false` |
| `ENABLE_ANALYTICS`    | Enable analytics         | `true`  | `true`  |
| `ENABLE_DEBUG_MODE`   | Enable debug mode        | `true`  | `false` |
| `ENABLE_REGISTRATION` | Enable user registration | `true`  | `true`  |

### Development

| Variable    | Description         | Example       | Default       |
| ----------- | ------------------- | ------------- | ------------- |
| `NODE_ENV`  | Node.js environment | `development` | `development` |
| `DEBUG`     | Debug mode          | `true`        | `false`       |
| `LOG_LEVEL` | Logging level       | `debug`       | `info`        |

### Testing

| Variable            | Description       | Example                                      | Default |
| ------------------- | ----------------- | -------------------------------------------- | ------- |
| `VITEST_WORKER_ID`  | Vitest worker ID  | `1`                                          | -       |
| `TEST_DATABASE_URL` | Test database URL | `postgresql://test:test@localhost:5432/test` | -       |

## Environment-Specific Configuration

### Development

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_URL=https://your-dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-dev-service-role-key
POSTGRES_URL=postgresql://postgres:password@localhost:5432/alan_hirsch_dev
NEXTAUTH_SECRET=dev-secret-key
NEXTAUTH_URL=http://localhost:3000
ENABLE_DEBUG_MODE=true
LOG_LEVEL=debug
```

### Staging

```bash
# .env.staging
NODE_ENV=staging
NEXT_PUBLIC_SUPABASE_URL=https://your-staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key
POSTGRES_URL=postgresql://postgres:password@staging-db:5432/alan_hirsch_staging
NEXTAUTH_SECRET=staging-secret-key
NEXTAUTH_URL=https://staging.alanhirsch.com
ENABLE_DEBUG_MODE=false
LOG_LEVEL=info
```

### Production

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-role-key
POSTGRES_URL=postgresql://postgres:password@prod-db:5432/alan_hirsch_prod
NEXTAUTH_SECRET=production-secret-key
NEXTAUTH_URL=https://alanhirsch.com
ENABLE_DEBUG_MODE=false
LOG_LEVEL=warn
```

## Security Best Practices

### 1. Never Commit Secrets

- Add `.env*` files to `.gitignore`
- Use `.env.example` for reference
- Store secrets in environment-specific secure storage

### 2. Use Strong Secrets

- Generate cryptographically secure random strings
- Use at least 32 characters for encryption keys
- Rotate secrets regularly

### 3. Environment Isolation

- Use different secrets for each environment
- Never share secrets between environments
- Use separate Supabase projects for each environment

### 4. Access Control

- Limit access to production secrets
- Use role-based access control
- Monitor secret usage and access

## Validation

### Runtime Validation

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  POSTGRES_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### Build-Time Validation

```typescript
// next.config.ts
import { envSchema } from './lib/env';

// Validate environment variables at build time
envSchema.parse(process.env);
```

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Check `.env.local` file exists
   - Verify variable names match exactly
   - Ensure variables are exported

2. **Invalid Values**
   - Check URL formats
   - Verify secret lengths
   - Validate boolean values

3. **Build Failures**
   - Check required variables are set
   - Verify variable types
   - Check for typos in variable names

### Debugging

```bash
# Check environment variables
node -e "console.log(process.env)"

# Validate specific variable
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"

# Check build-time variables
npm run build 2>&1 | grep -i env
```

## Migration Guide

### Adding New Variables

1. **Update Documentation**
   - Add to this reference
   - Update `.env.example`
   - Document in changelog

2. **Update Validation**
   - Add to `envSchema` in `lib/env.ts`
   - Update TypeScript types
   - Add runtime validation

3. **Update Deployment**
   - Add to CI/CD environment
   - Update deployment scripts
   - Configure in hosting platform

### Removing Variables

1. **Deprecation Notice**
   - Mark as deprecated in docs
   - Add console warnings
   - Set removal timeline

2. **Code Cleanup**
   - Remove from validation schema
   - Update TypeScript types
   - Remove from codebase

3. **Documentation Update**
   - Remove from reference
   - Update migration guide
   - Update changelog

## Support

For questions about environment variables:

1. Check this documentation
2. Review `.env.example` file
3. Check application logs
4. Contact development team

## Changelog

### v1.0.0

- Initial environment variable configuration
- Supabase integration
- Authentication setup
- Database configuration

### v1.1.0

- Added Stripe payment integration
- Added email configuration
- Added feature flags
- Enhanced security settings
