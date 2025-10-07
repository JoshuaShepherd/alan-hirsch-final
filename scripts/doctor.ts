#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
}

class ProjectDoctor {
  private failures: CheckResult[] = [];
  private rootDir: string;

  constructor() {
    this.rootDir = process.cwd();
  }

  private addFailure(name: string, message: string, details?: string) {
    this.failures.push({
      name,
      passed: false,
      message,
      details,
    });
  }

  private addSuccess(name: string, message: string) {
    // We don't track successes, only failures
  }

  private checkTsConfig(): void {
    const tsconfigPath = join(this.rootDir, 'tsconfig.json');

    if (!existsSync(tsconfigPath)) {
      this.addFailure('tsconfig.json', 'tsconfig.json file not found');
      return;
    }

    try {
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));

      // Check baseUrl
      if (tsconfig.compilerOptions?.baseUrl !== './src') {
        this.addFailure(
          'tsconfig baseUrl',
          'baseUrl should be "./src"',
          `Found: ${tsconfig.compilerOptions?.baseUrl || 'undefined'}`
        );
      }

      // Check @ alias
      const paths = tsconfig.compilerOptions?.paths;
      if (!paths || !paths['@/*'] || !paths['@/*'].includes('./*')) {
        this.addFailure(
          'tsconfig @ alias',
          '@/* alias should map to ["./*"]',
          `Found: ${JSON.stringify(paths?.['@/*'] || 'undefined')}`
        );
      }
    } catch (error) {
      this.addFailure(
        'tsconfig.json',
        'Failed to parse tsconfig.json',
        String(error)
      );
    }
  }

  private checkVitestConfig(): void {
    const vitestPath = join(this.rootDir, 'vitest.config.ts');

    if (!existsSync(vitestPath)) {
      this.addFailure('vitest.config.ts', 'vitest.config.ts file not found');
      return;
    }

    try {
      const content = readFileSync(vitestPath, 'utf-8');

      // Check for @ alias configuration
      if (!content.includes("'@': resolve(__dirname, './src')")) {
        this.addFailure(
          'vitest @ alias',
          'Vitest should have @ alias pointing to ./src',
          "Expected: '@': resolve(__dirname, './src')"
        );
      }
    } catch (error) {
      this.addFailure(
        'vitest.config.ts',
        'Failed to read vitest.config.ts',
        String(error)
      );
    }
  }

  private checkNextConfig(): void {
    const nextConfigPath = join(this.rootDir, 'next.config.ts');

    if (!existsSync(nextConfigPath)) {
      this.addFailure('next.config.ts', 'next.config.ts file not found');
      return;
    }

    // Next.js config exists, which is good
  }

  private checkTailwindConfig(): void {
    const tailwindPath = join(this.rootDir, 'tailwind.config.ts');

    if (!existsSync(tailwindPath)) {
      this.addFailure(
        'tailwind.config.ts',
        'tailwind.config.ts file not found'
      );
      return;
    }

    try {
      const content = readFileSync(tailwindPath, 'utf-8');

      // Check content globs
      if (!content.includes('./src/**/*.{ts,tsx}')) {
        this.addFailure(
          'tailwind content',
          'Tailwind content should include ./src/**/*.{ts,tsx}',
          'Expected content glob pattern for src directory'
        );
      }
    } catch (error) {
      this.addFailure(
        'tailwind.config.ts',
        'Failed to read tailwind.config.ts',
        String(error)
      );
    }
  }

  private checkContractsIndex(): void {
    const contractsPath = join(this.rootDir, 'src/lib/contracts/index.ts');

    if (!existsSync(contractsPath)) {
      this.addFailure(
        'contracts index',
        'src/lib/contracts/index.ts not found'
      );
      return;
    }

    try {
      const content = readFileSync(contractsPath, 'utf-8');

      // Check for exports (including re-exports)
      const exportLines = content
        .split('\n')
        .filter(line => line.trim().startsWith('export'));

      if (exportLines.length === 0) {
        this.addFailure(
          'contracts exports',
          'src/lib/contracts/index.ts should export at least 1 schema',
          'No exports found'
        );
      }
    } catch (error) {
      this.addFailure(
        'contracts index',
        'Failed to read contracts index',
        String(error)
      );
    }
  }

  private checkQueriesDirectory(): void {
    const queriesPath = join(this.rootDir, 'src/lib/database/db/queries');

    if (!existsSync(queriesPath)) {
      this.addFailure(
        'queries directory',
        'src/lib/database/db/queries directory not found'
      );
      return;
    }

    try {
      const { readdirSync } = require('fs');
      const files = readdirSync(queriesPath).filter(
        (file: string) => file.endsWith('.ts') && !file.endsWith('.d.ts')
      );

      if (files.length === 0) {
        this.addFailure(
          'queries files',
          'src/lib/database/db/queries should contain at least 1 .ts file',
          'No TypeScript files found in queries directory'
        );
      }
    } catch (error) {
      this.addFailure(
        'queries directory',
        'Failed to check queries directory',
        String(error)
      );
    }
  }

  private checkBaseService(): void {
    const baseServicePath = join(
      this.rootDir,
      'src/lib/services/base.service.ts'
    );

    if (!existsSync(baseServicePath)) {
      this.addFailure(
        'base service',
        'src/lib/services/base.service.ts not found'
      );
      return;
    }
  }

  private checkPlatformImports(): void {
    try {
      // Search for @platform/* imports in the entire codebase
      const result = execSync(
        'grep -r "@platform/" src/ --include="*.ts" --include="*.tsx" || true',
        {
          encoding: 'utf-8',
          cwd: this.rootDir,
        }
      );

      if (result.trim()) {
        const lines = result.trim().split('\n');
        this.addFailure(
          'platform imports',
          `Found ${lines.length} @platform/* imports that should be removed`,
          lines.slice(0, 5).join('\n') + (lines.length > 5 ? '\n...' : '')
        );
      }
    } catch (error) {
      // grep returns non-zero exit code when no matches found, which is expected
      // Only add failure if it's a real error
      if (!String(error).includes('exit code 1')) {
        this.addFailure(
          'platform imports check',
          'Failed to check for @platform imports',
          String(error)
        );
      }
    }
  }

  private checkAliasResolvability(): void {
    try {
      // Try to resolve @ alias by checking if TypeScript can resolve it
      const result = execSync('npx tsc --noEmit --skipLibCheck', {
        encoding: 'utf-8',
        cwd: this.rootDir,
        timeout: 30000,
      });

      // If we get here without error, aliases are working
    } catch (error) {
      const errorOutput = String(error);
      if (
        errorOutput.includes('Cannot find module') &&
        errorOutput.includes('@/')
      ) {
        this.addFailure(
          'alias resolution',
          '@ alias is not properly resolvable',
          'TypeScript cannot resolve @ imports'
        );
      }
    }
  }

  public async runAllChecks(): Promise<void> {
    console.log('🔍 Running project doctor checks...\n');

    this.checkTsConfig();
    this.checkVitestConfig();
    this.checkNextConfig();
    this.checkTailwindConfig();
    this.checkContractsIndex();
    this.checkQueriesDirectory();
    this.checkBaseService();
    this.checkPlatformImports();
    this.checkAliasResolvability();

    this.printResults();
  }

  private printResults(): void {
    if (this.failures.length === 0) {
      console.log('✅ All checks passed! Project baseline is healthy.');
      process.exit(0);
    } else {
      console.log('❌ FAILURES DETECTED:\n');

      this.failures.forEach((failure, index) => {
        console.log(`${index + 1}. ${failure.name}`);
        console.log(`   ${failure.message}`);
        if (failure.details) {
          console.log(`   Details: ${failure.details}`);
        }
        console.log('');
      });

      console.log(`Total failures: ${this.failures.length}`);
      console.log('\nPlease fix these issues before proceeding.');
      process.exit(1);
    }
  }
}

// Run the doctor
const doctor = new ProjectDoctor();
doctor.runAllChecks().catch(error => {
  console.error('Doctor script failed:', error);
  process.exit(1);
});
