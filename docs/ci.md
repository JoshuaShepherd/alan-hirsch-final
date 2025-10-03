# Continuous Integration Guide

This document outlines the CI/CD pipeline and deployment strategy for the Alan Hirsch Digital Platform.

## Overview

Our CI/CD pipeline ensures code quality, security, and reliable deployments through automated testing, linting, and deployment processes.

## Pipeline Stages

### 1. Code Quality Checks

#### Linting and Formatting
```yaml
- name: Lint Code
  run: npm run lint

- name: Check Formatting
  run: npm run format:check

- name: Type Check
  run: npm run type-check
```

#### Security Scanning
```yaml
- name: Security Audit
  run: npm audit --audit-level moderate

- name: Dependency Check
  run: npm run security:check
```

### 2. Testing

#### Unit and Integration Tests
```yaml
- name: Run Tests
  run: npm run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

#### End-to-End Tests
```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E Tests
  run: npm run test:e2e

- name: Upload E2E Results
  uses: actions/upload-artifact@v3
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/
```

### 3. Build and Deploy

#### Build Verification
```yaml
- name: Build Application
  run: npm run build

- name: Verify Build
  run: npm run start &
  sleep 10
  curl -f http://localhost:3000/api/health || exit 1
```

#### Deployment
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    working-directory: ./
```

## GitHub Actions Workflow

### Main Workflow (`.github/workflows/ci.yml`)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm run lint

      - name: Type check
        run: pnpm run type-check

      - name: Format check
        run: pnpm run format:check

  test:
    name: Tests
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: pnpm run test:e2e

      - name: Upload E2E results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [test, e2e]
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: .next/

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

## Environment Management

### Environment Variables

#### Development
```bash
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_URL=your_dev_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
```

#### Staging
```bash
NODE_ENV=staging
NEXT_PUBLIC_SUPABASE_URL=your_staging_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_staging_anon_key
```

#### Production
```bash
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_prod_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
```

### Secrets Management

Required GitHub Secrets:
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `DATABASE_URL` - Production database URL

## Deployment Strategy

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

### Deployment Flow

1. **Feature Development**
   - Create feature branch from `develop`
   - Implement feature with tests
   - Open PR to `develop`

2. **Development Testing**
   - Merge to `develop` triggers staging deployment
   - Run full test suite
   - Manual testing on staging environment

3. **Production Release**
   - Create PR from `develop` to `main`
   - Code review and approval
   - Merge to `main` triggers production deployment

### Rollback Strategy

#### Automatic Rollback
- Health check failures
- Error rate thresholds
- Performance degradation

#### Manual Rollback
```bash
# Rollback to previous deployment
vercel rollback

# Rollback to specific deployment
vercel rollback <deployment-url>
```

## Monitoring and Alerting

### Health Checks

#### Application Health
```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    await db.select().from(userProfiles).limit(1);
    
    // Check external services
    await checkSupabaseConnection();
    
    return Response.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    );
  }
}
```

#### Database Health
```sql
-- Check database connectivity
SELECT 1;

-- Check table accessibility
SELECT COUNT(*) FROM user_profiles LIMIT 1;
```

### Monitoring Metrics

- **Performance**: Response times, throughput
- **Errors**: Error rates, error types
- **Availability**: Uptime, health check status
- **Security**: Failed authentication attempts, suspicious activity

### Alerting Rules

- **Critical**: Application down, database unavailable
- **Warning**: High error rate, slow response times
- **Info**: Deployment success, feature usage

## Security Considerations

### Code Security

- **Dependency Scanning**: Automated vulnerability detection
- **Secret Scanning**: Prevent secret leakage
- **Code Analysis**: Static analysis for security issues

### Infrastructure Security

- **Network Security**: VPC, firewall rules
- **Access Control**: IAM roles, permissions
- **Encryption**: Data at rest and in transit

### Compliance

- **GDPR**: Data protection and privacy
- **SOC 2**: Security and availability
- **ISO 27001**: Information security management

## Performance Optimization

### Build Optimization

- **Bundle Analysis**: Monitor bundle size
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Lazy load components

### Runtime Optimization

- **Caching**: Redis, CDN caching
- **Database**: Query optimization, indexing
- **Monitoring**: Performance metrics, profiling

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check dependency versions
   - Verify environment variables
   - Review build logs

2. **Test Failures**
   - Update test data
   - Check mock implementations
   - Verify test environment

3. **Deployment Issues**
   - Check Vercel logs
   - Verify environment variables
   - Test locally first

### Debugging Tools

- **Vercel Dashboard**: Deployment logs and metrics
- **GitHub Actions**: CI/CD pipeline logs
- **Supabase Dashboard**: Database and API logs
- **Browser DevTools**: Client-side debugging

## Best Practices

### Code Quality

- **Small PRs**: Easier review and testing
- **Clear Commit Messages**: Follow conventional commits
- **Code Reviews**: Required for all changes
- **Testing**: Comprehensive test coverage

### Deployment

- **Blue-Green Deployment**: Zero-downtime deployments
- **Feature Flags**: Gradual feature rollouts
- **Monitoring**: Real-time health monitoring
- **Documentation**: Keep deployment docs updated

### Security

- **Least Privilege**: Minimal required permissions
- **Regular Updates**: Keep dependencies current
- **Security Scanning**: Automated vulnerability detection
- **Incident Response**: Clear escalation procedures
