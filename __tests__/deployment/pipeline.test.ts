import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Deployment Pipeline Testing', () => {
  let pipelineStartTime: number;
  let pipelineEndTime: number;

  beforeAll(async () => {
    console.log('🚀 Starting deployment pipeline testing...');
    pipelineStartTime = Date.now();
  });

  afterAll(async () => {
    pipelineEndTime = Date.now();
    const pipelineDuration = pipelineEndTime - pipelineStartTime;
    console.log(
      `⏱️ Pipeline testing completed in ${(pipelineDuration / 1000).toFixed(2)} seconds`
    );
  });

  describe('CI/CD Configuration', () => {
    it('should have Vercel configuration', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      expect(existsSync(vercelConfig)).toBe(true);
      console.log('✅ Vercel configuration found');
    });

    it('should have proper Vercel configuration structure', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config).toHaveProperty('buildCommand');
      expect(config).toHaveProperty('installCommand');
      expect(config).toHaveProperty('framework');
      expect(config).toHaveProperty('functions');
      expect(config).toHaveProperty('headers');

      console.log('✅ Vercel configuration structure valid');
    });

    it('should configure build command correctly', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config.buildCommand).toBe('pnpm build');
      console.log('✅ Build command configured correctly');
    });

    it('should configure install command correctly', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config.installCommand).toBe('pnpm install');
      console.log('✅ Install command configured correctly');
    });

    it('should set framework to Next.js', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config.framework).toBe('nextjs');
      console.log('✅ Framework configured as Next.js');
    });

    it('should configure deployment regions', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config.regions).toBeDefined();
      expect(Array.isArray(config.regions)).toBe(true);
      expect(config.regions.length).toBeGreaterThan(0);
      console.log(
        `✅ Deployment regions configured: ${config.regions.join(', ')}`
      );
    });
  });

  describe('Function Configuration', () => {
    it('should configure API function settings', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config.functions).toBeDefined();
      expect(config.functions['app/api/**/*.ts']).toBeDefined();
      expect(config.functions['app/api/**/*.ts'].maxDuration).toBe(30);
      console.log('✅ API function configuration valid');
    });

    it('should have reasonable function timeout', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      const {maxDuration} = config.functions['app/api/**/*.ts'];
      expect(maxDuration).toBeGreaterThan(0);
      expect(maxDuration).toBeLessThanOrEqual(300); // 5 minutes max
      console.log(`✅ Function timeout reasonable: ${maxDuration}s`);
    });
  });

  describe('Security Headers Configuration', () => {
    it('should configure security headers', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      expect(config.headers).toBeDefined();
      expect(Array.isArray(config.headers)).toBe(true);
      expect(config.headers.length).toBeGreaterThan(0);
      console.log('✅ Security headers configured');
    });

    it('should include X-Frame-Options header', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      const {headers} = config.headers[0];
      const frameOptions = headers.find(
        (h: any) => h.key === 'X-Frame-Options'
      );

      expect(frameOptions).toBeDefined();
      expect(frameOptions.value).toBe('DENY');
      console.log('✅ X-Frame-Options header configured');
    });

    it('should include X-Content-Type-Options header', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      const {headers} = config.headers[0];
      const contentTypeOptions = headers.find(
        (h: any) => h.key === 'X-Content-Type-Options'
      );

      expect(contentTypeOptions).toBeDefined();
      expect(contentTypeOptions.value).toBe('nosniff');
      console.log('✅ X-Content-Type-Options header configured');
    });

    it('should include Referrer-Policy header', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      const {headers} = config.headers[0];
      const referrerPolicy = headers.find(
        (h: any) => h.key === 'Referrer-Policy'
      );

      expect(referrerPolicy).toBeDefined();
      expect(referrerPolicy.value).toBe('origin-when-cross-origin');
      console.log('✅ Referrer-Policy header configured');
    });

    it('should include Strict-Transport-Security header', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      const {headers} = config.headers[0];
      const hsts = headers.find(
        (h: any) => h.key === 'Strict-Transport-Security'
      );

      expect(hsts).toBeDefined();
      expect(hsts.value).toContain('max-age=');
      expect(hsts.value).toContain('includeSubDomains');
      expect(hsts.value).toContain('preload');
      console.log('✅ Strict-Transport-Security header configured');
    });
  });

  describe('Environment Variables', () => {
    it('should have environment example file', () => {
      const envExample = join(process.cwd(), 'env.example');
      expect(existsSync(envExample)).toBe(true);
      console.log('✅ Environment example file found');
    });

    it('should document required environment variables', () => {
      const envExample = join(process.cwd(), 'env.example');
      const envContent = readFileSync(envExample, 'utf8');

      const requiredVars = [
        'SUPABASE_URL',
        'SUPABASE_ANON_KEY',
        'SUPABASE_SERVICE_ROLE_KEY',
        'POSTGRES_URL',
        'STRIPE_SECRET_KEY',
        'STRIPE_PUBLISHABLE_KEY',
      ];

      for (const varName of requiredVars) {
        expect(envContent).toContain(varName);
      }
      console.log('✅ Required environment variables documented');
    });

    it('should have proper environment variable format', () => {
      const envExample = join(process.cwd(), 'env.example');
      const envContent = readFileSync(envExample, 'utf8');

      const lines = envContent.split('\n');
      const envLines = lines.filter(
        line => line.trim() && !line.startsWith('#')
      );

      for (const line of envLines) {
        expect(line).toMatch(/^[A-Z_]+=.*$/);
      }
      console.log('✅ Environment variables have proper format');
    });
  });

  describe('Database Migration Pipeline', () => {
    it('should have database migration files', () => {
      const migrationsDir = join(process.cwd(), 'supabase/migrations');
      expect(existsSync(migrationsDir)).toBe(true);
      console.log('✅ Database migrations directory found');
    });

    it('should have Drizzle configuration', () => {
      const drizzleConfig = join(process.cwd(), 'drizzle.config.ts');
      expect(existsSync(drizzleConfig)).toBe(true);
      console.log('✅ Drizzle configuration found');
    });

    it('should have database setup scripts', () => {
      const packageJson = join(process.cwd(), 'package.json');
      const packageContent = JSON.parse(readFileSync(packageJson, 'utf8'));

      expect(packageContent.scripts).toHaveProperty('db:generate');
      expect(packageContent.scripts).toHaveProperty('db:migrate');
      expect(packageContent.scripts).toHaveProperty('db:setup');
      console.log('✅ Database setup scripts configured');
    });
  });

  describe('Health Check Configuration', () => {
    it('should have health check script', () => {
      const healthCheck = join(process.cwd(), 'scripts/health-check.ts');
      expect(existsSync(healthCheck)).toBe(true);
      console.log('✅ Health check script found');
    });

    it('should have health check npm script', () => {
      const packageJson = join(process.cwd(), 'package.json');
      const packageContent = JSON.parse(readFileSync(packageJson, 'utf8'));

      expect(packageContent.scripts).toHaveProperty('health-check');
      console.log('✅ Health check npm script configured');
    });

    it('should have weekly audit script', () => {
      const weeklyAudit = join(process.cwd(), 'scripts/weekly-audit.ts');
      expect(existsSync(weeklyAudit)).toBe(true);
      console.log('✅ Weekly audit script found');
    });
  });

  describe('Testing Pipeline Integration', () => {
    it('should have pre-deployment test scripts', () => {
      const packageJson = join(process.cwd(), 'package.json');
      const packageContent = JSON.parse(readFileSync(packageJson, 'utf8'));

      expect(packageContent.scripts).toHaveProperty('test');
      expect(packageContent.scripts).toHaveProperty('test:e2e');
      expect(packageContent.scripts).toHaveProperty('test:all');
      console.log('✅ Pre-deployment test scripts configured');
    });

    it('should have linting and formatting scripts', () => {
      const packageJson = join(process.cwd(), 'package.json');
      const packageContent = JSON.parse(readFileSync(packageJson, 'utf8'));

      expect(packageContent.scripts).toHaveProperty('lint');
      expect(packageContent.scripts).toHaveProperty('format');
      expect(packageContent.scripts).toHaveProperty('verify');
      console.log('✅ Linting and formatting scripts configured');
    });

    it('should have type checking script', () => {
      const packageJson = join(process.cwd(), 'package.json');
      const packageContent = JSON.parse(readFileSync(packageJson, 'utf8'));

      expect(packageContent.scripts).toHaveProperty('type-check');
      console.log('✅ Type checking script configured');
    });
  });

  describe('Deployment Readiness', () => {
    it('should have proper package.json configuration', () => {
      const packageJson = join(process.cwd(), 'package.json');
      const packageContent = JSON.parse(readFileSync(packageJson, 'utf8'));

      expect(packageContent.private).toBe(true);
      expect(packageContent.scripts).toHaveProperty('build');
      expect(packageContent.scripts).toHaveProperty('start');
      console.log('✅ Package.json deployment ready');
    });

    it('should have proper Next.js configuration', () => {
      const nextConfig = join(process.cwd(), 'next.config.ts');
      const configContent = readFileSync(nextConfig, 'utf8');

      expect(configContent).toContain('NextConfig');
      expect(configContent).toContain('experimental');
      expect(configContent).toContain('images');
      console.log('✅ Next.js configuration deployment ready');
    });

    it('should have proper TypeScript configuration', () => {
      const tsConfig = join(process.cwd(), 'tsconfig.json');
      expect(existsSync(tsConfig)).toBe(true);
      console.log('✅ TypeScript configuration found');
    });

    it('should have proper ESLint configuration', () => {
      const eslintConfig = join(process.cwd(), 'eslint.config.js');
      expect(existsSync(eslintConfig)).toBe(true);
      console.log('✅ ESLint configuration found');
    });
  });

  describe('Performance Optimization', () => {
    it('should have Tailwind CSS configuration', () => {
      const tailwindConfig = join(process.cwd(), 'tailwind.config.ts');
      expect(existsSync(tailwindConfig)).toBe(true);
      console.log('✅ Tailwind CSS configuration found');
    });

    it('should have PostCSS configuration', () => {
      const postcssConfig = join(process.cwd(), 'postcss.config.mjs');
      expect(existsSync(postcssConfig)).toBe(true);
      console.log('✅ PostCSS configuration found');
    });

    it('should have proper image optimization', () => {
      const nextConfig = join(process.cwd(), 'next.config.ts');
      const configContent = readFileSync(nextConfig, 'utf8');

      expect(configContent).toContain('remotePatterns');
      expect(configContent).toContain('supabase.co');
      console.log('✅ Image optimization configured');
    });
  });

  describe('Security Configuration', () => {
    it('should have middleware configuration', () => {
      const middleware = join(process.cwd(), 'middleware.ts');
      expect(existsSync(middleware)).toBe(true);
      console.log('✅ Middleware configuration found');
    });

    it('should have proper security headers in Next.js config', () => {
      const nextConfig = join(process.cwd(), 'next.config.ts');
      const configContent = readFileSync(nextConfig, 'utf8');

      expect(configContent).toContain('X-Frame-Options');
      expect(configContent).toContain('X-Content-Type-Options');
      expect(configContent).toContain('Referrer-Policy');
      console.log('✅ Security headers in Next.js config');
    });

    it('should have proper security headers in Vercel config', () => {
      const vercelConfig = join(process.cwd(), 'vercel.json');
      const config = JSON.parse(readFileSync(vercelConfig, 'utf8'));

      const {headers} = config.headers[0];
      const securityHeaders = headers.map((h: any) => h.key);

      expect(securityHeaders).toContain('X-Frame-Options');
      expect(securityHeaders).toContain('X-Content-Type-Options');
      expect(securityHeaders).toContain('Referrer-Policy');
      expect(securityHeaders).toContain('Strict-Transport-Security');
      console.log('✅ Security headers in Vercel config');
    });
  });
});
