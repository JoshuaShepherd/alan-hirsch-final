#!/usr/bin/env tsx

/**
 * Test Setup Verification Script
 *
 * This script verifies that the test infrastructure is properly configured
 * and all tests can run successfully. It's part of Phase 1 of the test
 * improvement plan.
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface VerificationResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  message: string;
  details?: string;
}

class TestSetupVerifier {
  private results: VerificationResult[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  /**
   * Run all verification tests
   */
  async runAll(): Promise<void> {
    console.log('🧪 Verifying Test Infrastructure Setup...\n');

    await this.verifyVitestConfig();
    await this.verifyTestFiles();
    await this.verifyMockUtilities();
    await this.verifyTestDataFactories();
    await this.verifyTestRunner();
    await this.verifyCoverage();

    this.printResults();
  }

  /**
   * Verify vitest.config.ts is properly configured
   */
  private async verifyVitestConfig(): Promise<void> {
    const configPath = join(this.projectRoot, 'vitest.config.ts');

    if (!existsSync(configPath)) {
      this.addResult('vitest-config', 'FAIL', 'vitest.config.ts not found');
      return;
    }

    try {
      const configContent = readFileSync(configPath, 'utf-8');

      const checks = [
        { name: 'globals: true', pattern: /globals:\s*true/ },
        { name: 'environment: jsdom', pattern: /environment:\s*['"]jsdom['"]/ },
        { name: 'setupFiles', pattern: /setupFiles:\s*\[/ },
        { name: 'alias configuration', pattern: /alias:\s*{/ },
        { name: 'coverage thresholds', pattern: /thresholds:\s*{/ },
      ];

      let allPassed = true;
      for (const check of checks) {
        if (!check.pattern.test(configContent)) {
          this.addResult(
            'vitest-config',
            'FAIL',
            `Missing ${check.name} in vitest.config.ts`
          );
          allPassed = false;
        }
      }

      if (allPassed) {
        this.addResult(
          'vitest-config',
          'PASS',
          'vitest.config.ts is properly configured'
        );
      }
    } catch (error) {
      this.addResult(
        'vitest-config',
        'FAIL',
        `Error reading vitest.config.ts: ${error}`
      );
    }
  }

  /**
   * Verify test files exist and use consistent imports
   */
  private async verifyTestFiles(): Promise<void> {
    const testFiles = [
      '__tests__/simple.test.ts',
      '__tests__/db/integration.test.ts',
      '__tests__/api/assessments.test.ts',
      '__tests__/api/user/profile.test.ts',
    ];

    let allPassed = true;
    for (const testFile of testFiles) {
      const filePath = join(this.projectRoot, testFile);

      if (!existsSync(filePath)) {
        this.addResult(
          'test-files',
          'FAIL',
          `Test file not found: ${testFile}`
        );
        allPassed = false;
        continue;
      }

      try {
        const content = readFileSync(filePath, 'utf-8');

        // Check for Vitest imports
        if (!content.includes("from 'vitest'")) {
          this.addResult(
            'test-files',
            'FAIL',
            `${testFile} missing Vitest imports`
          );
          allPassed = false;
        }

        // Check for mock utilities usage
        if (testFile.includes('api/') && !content.includes('@/lib/mocks')) {
          this.addResult(
            'test-files',
            'FAIL',
            `${testFile} not using centralized mocks`
          );
          allPassed = false;
        }

        // Check for contract-compliant test data
        if (content.includes('testDataFactories')) {
          this.addResult(
            'test-files',
            'PASS',
            `${testFile} using contract-compliant test data`
          );
        }
      } catch (error) {
        this.addResult(
          'test-files',
          'FAIL',
          `Error reading ${testFile}: ${error}`
        );
        allPassed = false;
      }
    }

    if (allPassed) {
      this.addResult(
        'test-files',
        'PASS',
        'All test files properly configured'
      );
    }
  }

  /**
   * Verify mock utilities are properly set up
   */
  private async verifyMockUtilities(): Promise<void> {
    const mockFiles = [
      'lib/mocks/index.ts',
      'lib/mocks/database.ts',
      'lib/mocks/supabase.ts',
      'lib/mocks/stripe.ts',
    ];

    let allPassed = true;
    for (const mockFile of mockFiles) {
      const filePath = join(this.projectRoot, mockFile);

      if (!existsSync(filePath)) {
        this.addResult(
          'mock-utilities',
          'FAIL',
          `Mock file not found: ${mockFile}`
        );
        allPassed = false;
        continue;
      }

      try {
        const content = readFileSync(filePath, 'utf-8');

        // Check for proper exports
        if (!content.includes('export')) {
          this.addResult(
            'mock-utilities',
            'FAIL',
            `${mockFile} missing exports`
          );
          allPassed = false;
        }

        // Check for vi.fn() usage
        if (!content.includes('vi.fn()')) {
          this.addResult(
            'mock-utilities',
            'FAIL',
            `${mockFile} not using Vitest mocks`
          );
          allPassed = false;
        }
      } catch (error) {
        this.addResult(
          'mock-utilities',
          'FAIL',
          `Error reading ${mockFile}: ${error}`
        );
        allPassed = false;
      }
    }

    if (allPassed) {
      this.addResult(
        'mock-utilities',
        'PASS',
        'All mock utilities properly configured'
      );
    }
  }

  /**
   * Verify test data factories are properly set up
   */
  private async verifyTestDataFactories(): Promise<void> {
    const testUtilsPath = join(this.projectRoot, 'lib/test-utils.ts');

    if (!existsSync(testUtilsPath)) {
      this.addResult(
        'test-data-factories',
        'FAIL',
        'lib/test-utils.ts not found'
      );
      return;
    }

    try {
      const content = readFileSync(testUtilsPath, 'utf-8');

      const checks = [
        {
          name: 'testDataFactories export',
          pattern: /export const testDataFactories/,
        },
        { name: 'contract imports', pattern: /from ['"]\.\.\/contracts['"]/ },
        { name: 'userProfile factory', pattern: /userProfile:\s*\(/ },
        { name: 'assessment factory', pattern: /assessment:\s*\(/ },
        { name: 'organization factory', pattern: /organization:\s*\(/ },
        { name: 'contentItem factory', pattern: /contentItem:\s*\(/ },
      ];

      let allPassed = true;
      for (const check of checks) {
        if (!check.pattern.test(content)) {
          this.addResult(
            'test-data-factories',
            'FAIL',
            `Missing ${check.name} in test-utils.ts`
          );
          allPassed = false;
        }
      }

      if (allPassed) {
        this.addResult(
          'test-data-factories',
          'PASS',
          'Test data factories properly configured'
        );
      }
    } catch (error) {
      this.addResult(
        'test-data-factories',
        'FAIL',
        `Error reading test-utils.ts: ${error}`
      );
    }
  }

  /**
   * Verify test runner works
   */
  private async verifyTestRunner(): Promise<void> {
    try {
      console.log('  Running test runner verification...');

      // Run a simple test to verify the setup works
      const output = execSync(
        'npx vitest run __tests__/simple.test.ts --reporter=verbose',
        {
          cwd: this.projectRoot,
          encoding: 'utf-8',
          timeout: 30000,
        }
      );

      if (output.includes('PASS') || output.includes('✓')) {
        this.addResult('test-runner', 'PASS', 'Test runner working correctly');
      } else {
        this.addResult(
          'test-runner',
          'FAIL',
          'Test runner not working correctly',
          output
        );
      }
    } catch (error) {
      this.addResult('test-runner', 'FAIL', `Test runner error: ${error}`);
    }
  }

  /**
   * Verify coverage configuration
   */
  private async verifyCoverage(): Promise<void> {
    try {
      console.log('  Running coverage verification...');

      // Run coverage to verify it works
      const output = execSync('npx vitest run --coverage --reporter=verbose', {
        cwd: this.projectRoot,
        encoding: 'utf-8',
        timeout: 60000,
      });

      if (
        output.includes('Coverage report generated') ||
        output.includes('All files')
      ) {
        this.addResult(
          'coverage',
          'PASS',
          'Coverage reporting working correctly'
        );
      } else {
        this.addResult(
          'coverage',
          'FAIL',
          'Coverage reporting not working correctly',
          output
        );
      }
    } catch (error) {
      this.addResult('coverage', 'FAIL', `Coverage error: ${error}`);
    }
  }

  /**
   * Add a verification result
   */
  private addResult(
    test: string,
    status: 'PASS' | 'FAIL' | 'SKIP',
    message: string,
    details?: string
  ): void {
    this.results.push({ test, status, message, details });
  }

  /**
   * Print verification results
   */
  private printResults(): void {
    console.log('\n📊 Verification Results:\n');

    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const skipped = this.results.filter(r => r.status === 'SKIP').length;

    this.results.forEach(result => {
      const icon =
        result.status === 'PASS'
          ? '✅'
          : result.status === 'FAIL'
            ? '❌'
            : '⏭️';
      console.log(`${icon} ${result.test}: ${result.message}`);

      if (result.details && result.status === 'FAIL') {
        console.log(`   Details: ${result.details.substring(0, 200)}...`);
      }
    });

    console.log(
      `\n📈 Summary: ${passed} passed, ${failed} failed, ${skipped} skipped`
    );

    if (failed > 0) {
      console.log(
        '\n❌ Some verifications failed. Please fix the issues above.'
      );
      process.exit(1);
    } else {
      console.log(
        '\n✅ All verifications passed! Test infrastructure is ready.'
      );
    }
  }
}

// Run the verification if this script is executed directly
if (require.main === module) {
  const verifier = new TestSetupVerifier();
  verifier.runAll().catch(error => {
    console.error('Verification failed:', error);
    process.exit(1);
  });
}

export { TestSetupVerifier };
