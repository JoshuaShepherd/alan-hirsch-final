# Deployment Guide

_Alan Hirsch Digital Platform - Production Deployment Instructions_

## Overview

This guide provides step-by-step instructions for deploying the Alan Hirsch Digital Platform to production. The platform is designed to run on Vercel with Supabase as the backend service.

---

## Prerequisites

### Required Accounts

- **Vercel**: Hosting and deployment platform
- **Supabase**: Database and authentication backend
- **Stripe**: Payment processing
- **Domain Provider**: For custom domain setup

### Required Tools

- **Git**: Version control
- **Vercel CLI**: For local deployment testing
- **Supabase CLI**: For database management

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass (`pnpm test`)
- [ ] TypeScript compilation succeeds (`pnpm type-check`)
- [ ] Linting passes (`pnpm lint`)
- [ ] No console.log statements in production code
- [ ] All environment variables are properly configured
- [ ] Database migrations are up to date

### Security Review

- [ ] No hardcoded secrets in code
- [ ] All API routes have proper authentication
- [ ] Row Level Security policies are enabled
- [ ] Input validation is implemented
- [ ] Rate limiting is configured

### Performance

- [ ] Images are optimized
- [ ] Database queries are efficient
- [ ] API responses are cached where appropriate
- [ ] Bundle size is optimized

---

## Step 1: Supabase Production Setup

### 1.1 Create Production Project

```bash
# Login to Supabase
supabase login

# Create production project
supabase projects create alan-hirsch-prod \
  --org-id your-org-id \
  --region us-east-1 \
  --db-password your-secure-password
```

### 1.2 Configure Production Database

```bash
# Link to production project
supabase link --project-ref your-prod-project-ref

# Deploy all migrations
supabase db push

# Set up RLS policies
supabase db push --file supabase/migrations/20250101_rls_policies.sql

# Seed initial data (if needed)
supabase db push --file supabase/seed.sql
```

### 1.3 Configure Authentication

1. Go to Authentication > Settings in Supabase dashboard
2. Configure site URL: `https://alanhirsch.com`
3. Add redirect URLs:
   - `https://alanhirsch.com/auth/callback`
   - `https://alanhirsch.com/dashboard`
4. Configure email templates
5. Set up email providers (if using custom SMTP)

### 1.4 Enable Row Level Security

```sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Apply policies (see schema/RLS_POLICIES.md for complete policies)
-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Content policies
CREATE POLICY "Anyone can view published content" ON content_items
  FOR SELECT USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Authors can manage own content" ON content_items
  FOR ALL USING (auth.uid() = author_id);
```

---

## Step 2: Stripe Production Setup

### 2.1 Configure Live Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Complete account verification
3. Get live API keys from Developers > API keys
4. Configure business information

### 2.2 Set Up Webhooks

1. Go to Developers > Webhooks
2. Add endpoint: `https://alanhirsch.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret

### 2.3 Configure Products and Prices

```bash
# Use Stripe CLI to create products (or use dashboard)
stripe products create --name "Alan Hirsch Premium" --description "Premium access to Alan Hirsch content"
stripe prices create --product prod_xxx --unit-amount 2999 --currency usd --recurring interval=month
```

---

## Step 3: Vercel Deployment

### 3.1 Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave empty)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

### 3.2 Environment Variables

Add all production environment variables in Vercel:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-role-key

# Database
POSTGRES_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Authentication
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://alanhirsch.com
JWT_SECRET=your-production-jwt-secret

# Stripe (Live Keys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# App Settings
APP_NAME=Alan Hirsch Digital Platform
APP_URL=https://alanhirsch.com
ADMIN_EMAIL=admin@alanhirsch.com

# Security
ENCRYPTION_KEY=your-32-character-encryption-key
CORS_ORIGINS=https://alanhirsch.com

# Feature Flags
ENABLE_AI_FEATURES=true
ENABLE_ANALYTICS=true
ENABLE_DEBUG_MODE=false
ENABLE_TEST_MODE=false

# Analytics
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

### 3.3 Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy from GitHub (automatic on push to main)
git push origin main
```

---

## Step 4: Custom Domain Setup

### 4.1 Add Domain in Vercel

1. Go to Project Settings > Domains
2. Add your domain: `alanhirsch.com`
3. Configure DNS records as instructed

### 4.2 DNS Configuration

Add these DNS records with your domain provider:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4.3 SSL Certificate

Vercel automatically provisions SSL certificates. Verify HTTPS is working:

- Visit `https://alanhirsch.com`
- Check certificate validity in browser

---

## Step 5: Post-Deployment Configuration

### 5.1 Update Supabase Settings

1. Update site URL in Supabase dashboard to production domain
2. Update redirect URLs for OAuth providers
3. Configure production email templates

### 5.2 Test Critical Functionality

```bash
# Test authentication
curl -X POST https://alanhirsch.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test API endpoints
curl -H "Authorization: Bearer $TOKEN" \
  https://alanhirsch.com/api/user/profile

# Test Stripe webhook
curl -X POST https://alanhirsch.com/api/stripe/webhook \
  -H "Stripe-Signature: $SIGNATURE" \
  -d @test-webhook.json
```

### 5.3 Monitor Performance

1. Check Vercel Analytics dashboard
2. Monitor Supabase database performance
3. Review error logs in Vercel Functions
4. Set up uptime monitoring

---

## Step 6: Monitoring and Maintenance

### 6.1 Set Up Monitoring

#### Vercel Analytics

- Enable in project settings
- Monitor Core Web Vitals
- Track user engagement

#### Error Tracking

```bash
# Install Sentry (optional)
npm install @sentry/nextjs

# Configure in next.config.js
const { withSentry } = require('@sentry/nextjs');
module.exports = withSentry(nextConfig);
```

#### Uptime Monitoring

- Set up UptimeRobot or similar service
- Monitor critical endpoints:
  - `https://alanhirsch.com`
  - `https://alanhirsch.com/api/health`
  - `https://alanhirsch.com/api/auth/signin`

### 6.2 Database Monitoring

```sql
-- Monitor query performance
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Check connection count
SELECT count(*) FROM pg_stat_activity;

-- Monitor table sizes
SELECT schemaname, tablename, pg_size_pretty(size) as size
FROM (
  SELECT schemaname, tablename, pg_total_relation_size(schemaname||'.'||tablename) as size
  FROM pg_tables
) t
ORDER BY size DESC;
```

### 6.3 Regular Maintenance Tasks

#### Weekly

- [ ] Review error logs
- [ ] Check database performance
- [ ] Monitor API response times
- [ ] Review security alerts

#### Monthly

- [ ] Update dependencies
- [ ] Review and rotate secrets
- [ ] Analyze usage patterns
- [ ] Check storage usage

#### Quarterly

- [ ] Security audit
- [ ] Performance optimization
- [ ] Backup verification
- [ ] Disaster recovery testing

---

## Troubleshooting

### Common Deployment Issues

#### Build Failures

```bash
# Check build logs in Vercel dashboard
# Common fixes:
pnpm install  # Ensure dependencies are installed
pnpm type-check  # Fix TypeScript errors
pnpm lint  # Fix linting issues
```

#### Environment Variable Issues

```bash
# Verify all required variables are set
vercel env ls

# Add missing variables
vercel env add VARIABLE_NAME
```

#### Database Connection Issues

- Verify `POSTGRES_URL` is correct
- Check Supabase project status
- Ensure RLS policies are not blocking connections

#### Authentication Issues

- Verify Supabase URL and keys
- Check site URL configuration in Supabase
- Ensure redirect URLs are correct

### Rollback Procedure

```bash
# Rollback to previous deployment
vercel rollback [deployment-url]

# Or redeploy from specific commit
git checkout [previous-commit]
git push origin main --force
```

### Emergency Procedures

#### Database Recovery

```bash
# Restore from backup
supabase db reset --db-url your-backup-url

# Or restore specific tables
pg_restore --dbname=your-db --table=user_profiles backup.sql
```

#### Application Recovery

```bash
# Deploy stable version
git checkout stable-release
vercel --prod

# Or use Vercel's automatic rollback
# (configure in project settings)
```

---

## Security Considerations

### Production Security Checklist

- [ ] All secrets are environment variables
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] Rate limiting is active
- [ ] Input validation is enabled
- [ ] RLS policies are enforced
- [ ] Error messages don't leak information
- [ ] Logs don't contain sensitive data

### Security Headers

Add to `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## Performance Optimization

### Database Optimization

```sql
-- Add indexes for common queries
CREATE INDEX idx_content_items_published ON content_items(published_at);
CREATE INDEX idx_content_items_author ON content_items(author_id);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_organizations_type ON organizations(type);

-- Monitor slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
WHERE mean_time > 1000  -- queries taking > 1 second
ORDER BY mean_time DESC;
```

### API Optimization

```typescript
// Implement caching for expensive queries
import { unstable_cache } from 'next/cache';

const getCachedContent = unstable_cache(
  async (categoryId: string) => {
    return db
      .select()
      .from(contentItems)
      .where(eq(contentItems.categoryId, categoryId));
  },
  ['content-by-category'],
  { revalidate: 3600 } // Cache for 1 hour
);
```

---

## Backup and Recovery

### Database Backups

```bash
# Automated daily backup (set up cron job)
pg_dump $POSTGRES_URL > backup-$(date +%Y%m%d).sql

# Store in cloud storage (AWS S3, etc.)
aws s3 cp backup-$(date +%Y%m%d).sql s3://your-backup-bucket/
```

### Application Backups

```bash
# Backup code and configuration
tar -czf app-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .
```

This completes the comprehensive deployment guide for the Alan Hirsch Digital Platform.
