#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

interface HealthCheckResult {
  name: string;
  status: 'passed' | 'failed';
  message: string;
  duration?: number;
}

interface AuditResult {
  anyTypes: number;
  nonNullAssertions: number;
  unusedImports: number;
  consoleStatements: number;
}

class HealthChecker {
  private results: HealthCheckResult[] = [];

  async runHealthCheck(): Promise<void> {
    console.log('🔍 Running comprehensive health checks...\n');

    const startTime = Date.now();

    // Core checks
    await this.checkTypeScript();
    await this.checkESLint();
    await this.checkTests();

    // Code quality audit
    await this.runCodeQualityAudit();

    const totalDuration = Date.now() - startTime;

    this.printResults(totalDuration);

    // Exit with error code if any checks failed
    const hasFailures = this.results.some(result => result.status === 'failed');
    if (hasFailures) {
      process.exit(1);
    }

    console.log('\n🎉 All health checks passed!');
  }

  private async checkTypeScript(): Promise<void> {
    const startTime = Date.now();

    try {
      execSync('npx tsc --noEmit', {
        stdio: 'pipe',
        cwd: process.cwd(),
      });

      const duration = Date.now() - startTime;
      this.results.push({
        name: 'TypeScript',
        status: 'passed',
        message: 'No TypeScript compilation errors',
        duration,
      });
    } catch (error: any) {
      const duration = Date.now() - startTime;
      this.results.push({
        name: 'TypeScript',
        status: 'failed',
        message: `Compilation failed: ${error.message}`,
        duration,
      });
    }
  }

  private async checkESLint(): Promise<void> {
    const startTime = Date.now();

    try {
      execSync('npm run lint', {
        stdio: 'pipe',
        cwd: process.cwd(),
      });

      const duration = Date.now() - startTime;
      this.results.push({
        name: 'ESLint',
        status: 'passed',
        message: 'No linting errors',
        duration,
      });
    } catch (error: any) {
      const duration = Date.now() - startTime;
      this.results.push({
        name: 'ESLint',
        status: 'failed',
        message: `Linting failed: ${error.message}`,
        duration,
      });
    }
  }

  private async checkTests(): Promise<void> {
    const startTime = Date.now();

    try {
      execSync('npm test -- --run', {
        stdio: 'pipe',
        cwd: process.cwd(),
      });

      const duration = Date.now() - startTime;
      this.results.push({
        name: 'Tests',
        status: 'passed',
        message: 'All tests passing',
        duration,
      });
    } catch (error: any) {
      const duration = Date.now() - startTime;
      this.results.push({
        name: 'Tests',
        status: 'failed',
        message: `Tests failed: ${error.message}`,
        duration,
      });
    }
  }

  private async runCodeQualityAudit(): Promise<void> {
    const startTime = Date.now();

    try {
      const auditResult = await this.performCodeQualityAudit();
      const duration = Date.now() - startTime;

      const warnings = [];
      if (auditResult.anyTypes > 10) {
        warnings.push(`${auditResult.anyTypes} 'any' types detected`);
      }
      if (auditResult.nonNullAssertions > 5) {
        warnings.push(
          `${auditResult.nonNullAssertions} non-null assertions found`
        );
      }
      if (auditResult.consoleStatements > 0) {
        warnings.push(
          `${auditResult.consoleStatements} console statements in production code`
        );
      }

      const message =
        warnings.length > 0
          ? `Code quality issues: ${warnings.join(', ')}`
          : 'Code quality metrics within acceptable ranges';

      this.results.push({
        name: 'Code Quality',
        status: warnings.length > 0 ? 'failed' : 'passed',
        message,
        duration,
      });
    } catch (error: any) {
      const duration = Date.now() - startTime;
      this.results.push({
        name: 'Code Quality',
        status: 'failed',
        message: `Audit failed: ${error.message}`,
        duration,
      });
    }
  }

  private async performCodeQualityAudit(): Promise<AuditResult> {
    const result: AuditResult = {
      anyTypes: 0,
      nonNullAssertions: 0,
      unusedImports: 0,
      consoleStatements: 0,
    };

    try {
      // Get all TypeScript files
      const files = await glob('**/*.{ts,tsx}', {
        ignore: [
          'node_modules/**',
          'dist/**',
          'build/**',
          '.next/**',
          'coverage/**',
          'test-results/**',
          'docs-env/**',
          '**/*.d.ts',
        ],
      });

      for (const file of files) {
        if (!existsSync(file)) continue;

        try {
          const content = readFileSync(file, 'utf-8');

          // Count any types (excluding test files)
          if (!file.includes('.test.') && !file.includes('.spec.')) {
            result.anyTypes += (content.match(/:\s*any\b/g) || []).length;
          }

          // Count non-null assertions
          result.nonNullAssertions += (content.match(/!/g) || []).length;

          // Count console statements (excluding test files and scripts)
          if (
            !file.includes('.test.') &&
            !file.includes('.spec.') &&
            !file.includes('scripts/')
          ) {
            result.consoleStatements += (
              content.match(/console\./g) || []
            ).length;
          }
        } catch (fileError) {
          // Skip files that can't be read
          continue;
        }
      }
    } catch (error) {
      console.warn(
        'Warning: Could not perform full code quality audit:',
        error
      );
    }

    return result;
  }

  private printResults(totalDuration: number): void {
    console.log('\n📊 Health Check Results:');
    console.log('='.repeat(50));

    this.results.forEach(result => {
      const icon = result.status === 'passed' ? '✅' : '❌';
      const duration = result.duration ? ` (${result.duration}ms)` : '';
      console.log(`${icon} ${result.name}: ${result.message}${duration}`);
    });

    console.log('='.repeat(50));
    console.log(`⏱️  Total duration: ${totalDuration}ms`);

    const passedCount = this.results.filter(r => r.status === 'passed').length;
    const totalCount = this.results.length;
    console.log(
      `📈 Success rate: ${passedCount}/${totalCount} (${Math.round((passedCount / totalCount) * 100)}%)`
    );
  }
}

// Run health check if this script is executed directly
if (require.main === module) {
  const healthChecker = new HealthChecker();
  healthChecker.runHealthCheck().catch(error => {
    console.error('Health check failed:', error);
    process.exit(1);
  });
}

export { HealthChecker };
