# Environment Setup Guide
*Alan Hirsch Digital Platform - Complete Environment Configuration*

## Overview

This guide provides comprehensive instructions for setting up development, staging, and production environments for the Alan Hirsch Digital Platform. The platform uses Next.js, Supabase, Drizzle ORM, and various third-party services.

---

## Prerequisites

### Required Software
- **Node.js**: Version 18.x or higher
- **pnpm**: Package manager (recommended) or npm
- **Git**: Version control
- **PostgreSQL**: Version 14+ (for local development)
- **Supabase CLI**: For database management

### Required Accounts
- **Supabase**: Database and authentication
- **Vercel**: Deployment platform
- **Stripe**: Payment processing
- **Upstash**: Redis for rate limiting
- **SMTP Provider**: Email notifications (SendGrid, AWS SES, etc.)

---

## Environment Variables

### Core Configuration

#### Supabase Setup
```env
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Database Configuration
```env
# Direct PostgreSQL connection (for Drizzle)
POSTGRES_URL=postgresql://username:password@localhost:5432/alan_hirsch_dev

# Or use Supabase connection string
POSTGRES_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

#### Authentication
```env
# NextAuth.js configuration
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=http://localhost:3000  # Change for production

# JWT secret for custom tokens
JWT_SECRET=your-jwt-secret-key
```

### Third-Party Services

#### Stripe (Payment Processing)
```env
# Test keys (development)
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# Live keys (production)
STRIPE_SECRET_KEY=sk_live_51...
STRIPE_PUBLISHABLE_KEY=pk_live_51...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Email Service
```env
# SendGrid example
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key

# AWS SES example
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-access-key
SMTP_PASS=your-ses-secret-key
```

#### Rate Limiting (Upstash Redis)
```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

### Application Settings

#### Basic Configuration
```env
APP_NAME=Alan Hirsch Digital Platform
APP_URL=http://localhost:3000  # Change for production
ADMIN_EMAIL=admin@alanhirsch.com
```

#### File Upload
```env
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_DIR=./uploads
```

#### Security
```env
# 32-character encryption key for sensitive data
ENCRYPTION_KEY=your-32-character-encryption-key

# CORS origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,https://alanhirsch.com
```

#### Feature Flags
```env
ENABLE_AI_FEATURES=false
ENABLE_ANALYTICS=true
ENABLE_DEBUG_MODE=true
ENABLE_TEST_MODE=false
```

#### Analytics (Optional)
```env
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Environment-Specific Configurations

### Development Environment

Create `.env.local` for local development:

```env
# Copy from .env.example and fill in values
NODE_ENV=development
JEST_WORKER_ID=1

# Use local Supabase instance or development project
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-dev-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-dev-service-key

# Use test Stripe keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Use test email service or local mail server
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=

# Enable debug features
ENABLE_DEBUG_MODE=true
ENABLE_TEST_MODE=true
```

### Staging Environment

For staging deployment:

```env
NODE_ENV=production
NEXTAUTH_URL=https://staging.alanhirsch.com

# Use staging Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-key

# Use test Stripe keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Use staging email service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-staging-sendgrid-key

# Disable debug features
ENABLE_DEBUG_MODE=false
ENABLE_TEST_MODE=true
```

### Production Environment

For production deployment:

```env
NODE_ENV=production
NEXTAUTH_URL=https://alanhirsch.com

# Use production Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-key

# Use live Stripe keys
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Use production email service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-prod-sendgrid-key

# Production settings
ENABLE_DEBUG_MODE=false
ENABLE_TEST_MODE=false
ENABLE_AI_FEATURES=true
```

---

## Setup Instructions

### 1. Local Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/alan-hirsch-final.git
cd alan-hirsch-final

# Install dependencies
pnpm install

# Copy environment template
cp env.example .env.local

# Edit .env.local with your values
nano .env.local

# Set up Supabase (choose one method)
# Option A: Use Supabase Cloud
supabase login
supabase link --project-ref your-project-ref

# Option B: Use local Supabase
supabase start

# Set up database
pnpm db:setup
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev
```

### 2. Supabase Project Setup

#### Create New Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose organization and enter project details
4. Set strong database password
5. Wait for project creation (2-3 minutes)

#### Get Project Credentials
1. Go to Project Settings > API
2. Copy Project URL and anon key
3. Copy service_role key (keep secret!)
4. Go to Settings > Database for connection string

#### Enable Row Level Security
```sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
-- ... (see RLS_PLAYBOOK.md for complete policies)
```

### 3. Database Migration

```bash
# Generate migration files
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Seed with initial data
pnpm db:seed

# Verify setup
pnpm db:studio
```

### 4. Stripe Setup

#### Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Complete account setup
3. Get API keys from Developers > API keys

#### Configure Webhooks
1. Go to Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `invoice.payment_succeeded`, etc.
4. Copy webhook signing secret

### 5. Email Service Setup

#### SendGrid (Recommended)
1. Create [SendGrid account](https://sendgrid.com)
2. Verify sender identity
3. Create API key with Mail Send permissions
4. Use API key as SMTP password with username "apikey"

#### AWS SES
1. Create AWS account
2. Verify email addresses/domains
3. Create IAM user with SES permissions
4. Generate access keys

### 6. Redis Setup (Upstash)

#### Create Upstash Account
1. Go to [Upstash Console](https://console.upstash.com)
2. Create new Redis database
3. Copy REST URL and token
4. Add to environment variables

---

## Testing Environment

### Test Configuration
```env
# Testing-specific variables
NODE_ENV=test
JEST_WORKER_ID=1

# Use test database
POSTGRES_URL=postgresql://test:test@localhost:5432/alan_hirsch_test

# Mock external services in tests
STRIPE_SECRET_KEY=sk_test_mock
SMTP_HOST=localhost
SMTP_PORT=1025
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test user/profile.test.ts

# Watch mode for development
pnpm test:watch
```

---

## Deployment

### Vercel Deployment

#### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Configure build settings:
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

#### 2. Environment Variables
Add all production environment variables in Vercel dashboard:
- Go to Project Settings > Environment Variables
- Add each variable from your `.env.production` file
- Set appropriate environments (Production, Preview, Development)

#### 3. Custom Domains
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Database Deployment

#### Production Database Setup
```bash
# Create production Supabase project
supabase projects create alan-hirsch-prod

# Link to production project
supabase link --project-ref your-prod-ref

# Deploy migrations
supabase db push

# Set up RLS policies
supabase db push --file supabase/migrations/20250101_rls_policies.sql
```

---

## Security Checklist

### Environment Variables
- [ ] All secrets are in environment variables, not code
- [ ] `.env.local` is in `.gitignore`
- [ ] Production secrets are different from development
- [ ] Service role keys are kept secure
- [ ] JWT secrets are cryptographically secure

### Database Security
- [ ] Row Level Security is enabled on all tables
- [ ] RLS policies are properly configured
- [ ] Database connection uses SSL
- [ ] Service role key has minimal required permissions

### API Security
- [ ] Rate limiting is configured
- [ ] CORS is properly configured
- [ ] Input validation is enabled
- [ ] Authentication is required for protected routes

### Deployment Security
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] Secrets are not exposed in client-side code
- [ ] Error messages don't leak sensitive information

---

## Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check connection string format
POSTGRES_URL=postgresql://username:password@host:port/database

# Test connection
psql $POSTGRES_URL -c "SELECT 1;"
```

#### Supabase Authentication Issues
- Verify project URL and keys are correct
- Check if RLS policies are blocking access
- Ensure user has proper permissions

#### Stripe Webhook Issues
- Verify webhook endpoint URL is accessible
- Check webhook signing secret matches
- Ensure webhook events are properly configured

#### Email Delivery Issues
- Verify SMTP credentials are correct
- Check sender email is verified
- Review email service logs for errors

### Debug Mode
Enable debug mode for detailed logging:

```env
ENABLE_DEBUG_MODE=true
NODE_ENV=development
```

### Logs and Monitoring
- **Vercel**: View deployment logs in dashboard
- **Supabase**: Check logs in project dashboard
- **Stripe**: Monitor webhook delivery in dashboard
- **Application**: Use console.log or proper logging library

---

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review and rotate secrets quarterly
- [ ] Monitor database performance
- [ ] Check security advisories
- [ ] Backup database regularly

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Monitor API response times
- [ ] Track error rates
- [ ] Monitor database query performance

This completes the comprehensive environment setup guide for the Alan Hirsch Digital Platform.
