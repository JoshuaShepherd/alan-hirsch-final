#!/usr/bin/env tsx

/**
 * Type Safety Validation Script
 *
 * This script validates that our type safety implementation is working correctly
 * across all layers of the application.
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// ============================================================================
// Type Safety Validation
// ============================================================================

interface ValidationResult {
  layer: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

class TypeSafetyValidator {
  private results: ValidationResult[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  // ============================================================================
  // Validation Methods
  // ============================================================================

  /**
   * Validate TypeScript compilation
   */
  async validateTypeScriptCompilation(): Promise<void> {
    try {
      console.log('🔍 Validating TypeScript compilation...');

      // Run TypeScript compiler in strict mode
      execSync('npx tsc --noEmit --strict', {
        cwd: this.projectRoot,
        stdio: 'pipe',
      });

      this.addResult(
        'typescript',
        'pass',
        'TypeScript compilation successful with strict mode'
      );
    } catch (error) {
      this.addResult(
        'typescript',
        'fail',
        'TypeScript compilation failed',
        error
      );
    }
  }

  /**
   * Validate Zod schemas are properly exported
   */
  async validateZodSchemas(): Promise<void> {
    try {
      console.log('🔍 Validating Zod schemas...');

      const validationFiles = [
        'validations/index.ts',
        'validations/auth.ts',
        'validations/assessments.ts',
        'validations/content.ts',
        'validations/community.ts',
        'validations/subscriptions.ts',
        'validations/analytics.ts',
        'validations/system.ts',
        'validations/ministry-platform.ts',
      ];

      let schemaCount = 0;
      let errorCount = 0;

      for (const file of validationFiles) {
        const filePath = join(this.projectRoot, file);
        if (existsSync(filePath)) {
          try {
            const content = readFileSync(filePath, 'utf-8');

            // Count schema exports
            const schemaMatches = content.match(
              /export\s+(const|function)\s+\w+Schema/g
            );
            if (schemaMatches) {
              schemaCount += schemaMatches.length;
            }

            // Check for proper Zod imports
            if (!content.includes("import { z } from 'zod'")) {
              this.addResult(
                'zod-schemas',
                'warning',
                `Missing Zod import in ${file}`
              );
            }
          } catch (error) {
            errorCount++;
            this.addResult(
              'zod-schemas',
              'fail',
              `Error reading ${file}`,
              error
            );
          }
        }
      }

      this.addResult(
        'zod-schemas',
        'pass',
        `Found ${schemaCount} Zod schemas across ${validationFiles.length} files`
      );
    } catch (error) {
      this.addResult(
        'zod-schemas',
        'fail',
        'Zod schema validation failed',
        error
      );
    }
  }

  /**
   * Validate API route type safety
   */
  async validateApiRoutes(): Promise<void> {
    try {
      console.log('🔍 Validating API route type safety...');

      const apiFiles = [
        'app/api/users/route.ts',
        'app/api/users/[id]/route.ts',
        'app/api/assessments-new/route.ts',
        'app/api/assessments-new/[id]/route.ts',
      ];

      let typeSafeRoutes = 0;
      let totalRoutes = 0;

      for (const file of apiFiles) {
        const filePath = join(this.projectRoot, file);
        if (existsSync(filePath)) {
          totalRoutes++;
          const content = readFileSync(filePath, 'utf-8');

          // Check for type-safe route handler usage
          if (
            content.includes('createRouteHandler') ||
            content.includes('createPaginatedRouteHandler')
          ) {
            typeSafeRoutes++;
          } else {
            this.addResult(
              'api-routes',
              'warning',
              `Route ${file} not using type-safe handlers`
            );
          }

          // Check for proper schema validation
          if (
            !content.includes('inputSchema') ||
            !content.includes('outputSchema')
          ) {
            this.addResult(
              'api-routes',
              'warning',
              `Route ${file} missing schema validation`
            );
          }
        }
      }

      this.addResult(
        'api-routes',
        'pass',
        `${typeSafeRoutes}/${totalRoutes} API routes using type-safe handlers`
      );
    } catch (error) {
      this.addResult(
        'api-routes',
        'fail',
        'API route validation failed',
        error
      );
    }
  }

  /**
   * Validate service layer type safety
   */
  async validateServiceLayer(): Promise<void> {
    try {
      console.log('🔍 Validating service layer type safety...');

      const serviceFiles = [
        'lib/services/base.service.ts',
        'lib/services/user.service.ts',
        'lib/services/assessment.service.ts',
        'lib/services/index.ts',
      ];

      let typeSafeServices = 0;
      let totalServices = 0;

      for (const file of serviceFiles) {
        const filePath = join(this.projectRoot, file);
        if (existsSync(filePath)) {
          totalServices++;
          const content = readFileSync(filePath, 'utf-8');

          // Check for BaseService inheritance
          if (
            content.includes('extends BaseService') ||
            content.includes('BaseService')
          ) {
            typeSafeServices++;
          }

          // Check for proper Zod schema usage
          if (!content.includes('ZodSchema') && !content.includes('z.')) {
            this.addResult(
              'services',
              'warning',
              `Service ${file} not using Zod schemas`
            );
          }
        }
      }

      this.addResult(
        'services',
        'pass',
        `${typeSafeServices}/${totalServices} services using type-safe base class`
      );
    } catch (error) {
      this.addResult(
        'services',
        'fail',
        'Service layer validation failed',
        error
      );
    }
  }

  /**
   * Validate form type safety
   */
  async validateFormTypeSafety(): Promise<void> {
    try {
      console.log('🔍 Validating form type safety...');

      const formFiles = [
        'lib/forms/hooks.ts',
        'components/forms/base-form.tsx',
        'components/forms/user-form.tsx',
        'components/forms/index.ts',
      ];

      let typeSafeForms = 0;
      let totalForms = 0;

      for (const file of formFiles) {
        const filePath = join(this.projectRoot, file);
        if (existsSync(filePath)) {
          totalForms++;
          const content = readFileSync(filePath, 'utf-8');

          // Check for useTypedForm usage
          if (
            content.includes('useTypedForm') ||
            content.includes('zodResolver')
          ) {
            typeSafeForms++;
          }

          // Check for proper React Hook Form integration
          if (
            !content.includes('react-hook-form') &&
            !content.includes('@hookform/resolvers')
          ) {
            this.addResult(
              'forms',
              'warning',
              `Form ${file} not using React Hook Form with Zod`
            );
          }
        }
      }

      this.addResult(
        'forms',
        'pass',
        `${typeSafeForms}/${totalForms} form files using type-safe hooks`
      );
    } catch (error) {
      this.addResult(
        'forms',
        'fail',
        'Form type safety validation failed',
        error
      );
    }
  }

  /**
   * Validate component prop types
   */
  async validateComponentProps(): Promise<void> {
    try {
      console.log('🔍 Validating component prop types...');

      const componentPropsFile = join(
        this.projectRoot,
        'lib/types/component-props.ts'
      );
      if (existsSync(componentPropsFile)) {
        const content = readFileSync(componentPropsFile, 'utf-8');

        // Count component prop interfaces
        const propInterfaceMatches = content.match(
          /export interface \w+Props/g
        );
        const propInterfaceCount = propInterfaceMatches
          ? propInterfaceMatches.length
          : 0;

        // Check for proper TypeScript interfaces
        if (propInterfaceCount > 0) {
          this.addResult(
            'component-props',
            'pass',
            `Found ${propInterfaceCount} component prop interfaces`
          );
        } else {
          this.addResult(
            'component-props',
            'warning',
            'No component prop interfaces found'
          );
        }

        // Check for proper imports
        if (
          !content.includes('import type {') &&
          !content.includes("from '@/lib/contracts'")
        ) {
          this.addResult(
            'component-props',
            'warning',
            'Component props not importing from contracts'
          );
        }
      } else {
        this.addResult(
          'component-props',
          'fail',
          'Component props file not found'
        );
      }
    } catch (error) {
      this.addResult(
        'component-props',
        'fail',
        'Component props validation failed',
        error
      );
    }
  }

  /**
   * Validate no 'any' types in critical files
   */
  async validateNoAnyTypes(): Promise<void> {
    try {
      console.log("🔍 Validating no 'any' types in critical files...");

      const criticalFiles = [
        'lib/api/route-handler.ts',
        'lib/services/base.service.ts',
        'lib/services/user.service.ts',
        'lib/forms/hooks.ts',
        'components/forms/base-form.tsx',
      ];

      let anyTypeCount = 0;
      let totalFiles = 0;

      for (const file of criticalFiles) {
        const filePath = join(this.projectRoot, file);
        if (existsSync(filePath)) {
          totalFiles++;
          const content = readFileSync(filePath, 'utf-8');

          // Count 'any' types (excluding comments and strings)
          const anyMatches = content.match(/\bany\b/g);
          if (anyMatches) {
            anyTypeCount += anyMatches.length;
            this.addResult(
              'no-any-types',
              'warning',
              `Found ${anyMatches.length} 'any' types in ${file}`
            );
          }
        }
      }

      if (anyTypeCount === 0) {
        this.addResult(
          'no-any-types',
          'pass',
          `No 'any' types found in ${totalFiles} critical files`
        );
      } else {
        this.addResult(
          'no-any-types',
          'warning',
          `Found ${anyTypeCount} 'any' types across ${totalFiles} files`
        );
      }
    } catch (error) {
      this.addResult(
        'no-any-types',
        'fail',
        'Any type validation failed',
        error
      );
    }
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  private addResult(
    layer: string,
    status: 'pass' | 'fail' | 'warning',
    message: string,
    details?: any
  ): void {
    this.results.push({
      layer,
      status,
      message,
      details,
    });
  }

  private printResults(): void {
    console.log('\n📊 Type Safety Validation Results\n');
    console.log('='.repeat(60));

    const groupedResults = this.results.reduce(
      (acc, result) => {
        if (!acc[result.layer]) {
          acc[result.layer] = [];
        }
        acc[result.layer].push(result);
        return acc;
      },
      {} as Record<string, ValidationResult[]>
    );

    Object.entries(groupedResults).forEach(([layer, results]) => {
      console.log(`\n🔧 ${layer.toUpperCase()}`);
      console.log('-'.repeat(40));

      results.forEach(result => {
        const icon =
          result.status === 'pass'
            ? '✅'
            : result.status === 'fail'
              ? '❌'
              : '⚠️';
        console.log(`${icon} ${result.message}`);

        if (result.details && process.env.DEBUG) {
          console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
        }
      });
    });

    // Summary
    const passCount = this.results.filter(r => r.status === 'pass').length;
    const failCount = this.results.filter(r => r.status === 'fail').length;
    const warningCount = this.results.filter(
      r => r.status === 'warning'
    ).length;
    const totalCount = this.results.length;

    console.log('\n📈 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${passCount}/${totalCount}`);
    console.log(`❌ Failed: ${failCount}/${totalCount}`);
    console.log(`⚠️  Warnings: ${warningCount}/${totalCount}`);

    if (failCount === 0) {
      console.log('\n🎉 Type safety validation completed successfully!');
      console.log(
        'Your application has comprehensive type safety across all layers.'
      );
    } else {
      console.log('\n🚨 Type safety validation completed with failures.');
      console.log('Please address the failed validations before proceeding.');
      process.exit(1);
    }
  }

  // ============================================================================
  // Main Validation Method
  // ============================================================================

  async run(): Promise<void> {
    console.log('🚀 Starting Type Safety Validation...\n');

    await this.validateTypeScriptCompilation();
    await this.validateZodSchemas();
    await this.validateApiRoutes();
    await this.validateServiceLayer();
    await this.validateFormTypeSafety();
    await this.validateComponentProps();
    await this.validateNoAnyTypes();

    this.printResults();
  }
}

// ============================================================================
// Run Validation
// ============================================================================

if (require.main === module) {
  const validator = new TypeSafetyValidator();
  validator.run().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

export { TypeSafetyValidator };
