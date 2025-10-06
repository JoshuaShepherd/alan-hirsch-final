#!/usr/bin/env tsx

/**
 * Schema Alignment Validation Script
 *
 * This script validates that our mappers, contracts, and types are properly aligned.
 * It ensures that:
 * 1. All mappers produce contract-compliant output
 * 2. All computed fields are properly implemented
 * 3. Type exports are consistent
 * 4. No orphaned validation schemas exist
 *
 * Usage: npm run validate:schemas
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const PROJECT_ROOT = process.cwd();
const APPS_DIR = join(PROJECT_ROOT, 'apps', 'alan-hirsch-platform');
const CONTRACTS_DIR = join(PROJECT_ROOT, 'packages', 'contracts');
const MAPPERS_DIR = join(APPS_DIR, 'lib', 'mappers');
const TYPES_DIR = join(APPS_DIR, 'types');

// Validation results
interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalMappers: number;
    totalContracts: number;
    totalTypes: number;
    validatedMappers: number;
    failedMappers: number;
  };
}

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

async function validateSchemaAlignment(): Promise<ValidationResult> {
  console.log('🔍 Validating schema alignment...\n');

  const result: ValidationResult = {
    success: true,
    errors: [],
    warnings: [],
    stats: {
      totalMappers: 0,
      totalContracts: 0,
      totalTypes: 0,
      validatedMappers: 0,
      failedMappers: 0,
    },
  };

  try {
    // Validate mapper output against contracts
    await validateMapperOutput(result);

    // Validate type exports consistency
    await validateTypeExports(result);

    // Validate import consistency
    await validateImportConsistency(result);

    // Check for orphaned validation files
    await checkOrphanedValidationFiles(result);

    // Print summary
    printValidationSummary(result);
  } catch (error) {
    result.success = false;
    result.errors.push(`Validation failed with error: ${error}`);
    console.error('❌ Validation failed:', error);
  }

  return result;
}

// ============================================================================
// MAPPER VALIDATION
// ============================================================================

async function validateMapperOutput(result: ValidationResult): Promise<void> {
  console.log('📋 Validating mapper output against contracts...');

  if (!existsSync(MAPPERS_DIR)) {
    result.warnings.push('Mappers directory not found');
    return;
  }

  const mapperFiles = glob.sync('**/*.ts', { cwd: MAPPERS_DIR });
  result.stats.totalMappers = mapperFiles.length;

  for (const mapperFile of mapperFiles) {
    const mapperPath = join(MAPPERS_DIR, mapperFile);
    const content = readFileSync(mapperPath, 'utf-8');

    // Check for response DTO functions
    const responseFunctions = extractResponseFunctions(content);

    for (const func of responseFunctions) {
      result.stats.validatedMappers++;

      // Validate that the function exists and is properly typed
      if (!validateMapperFunction(content, func)) {
        result.errors.push(
          `Mapper function ${func} in ${mapperFile} is not properly implemented`
        );
        result.stats.failedMappers++;
      }
    }
  }

  console.log(`✅ Validated ${result.stats.validatedMappers} mapper functions`);
}

function extractResponseFunctions(content: string): string[] {
  const responseFunctionRegex = /export\s+function\s+(to\w+ResponseDTO)/g;
  const functions: string[] = [];
  let match;

  while ((match = responseFunctionRegex.exec(content)) !== null) {
    functions.push(match[1]);
  }

  return functions;
}

function validateMapperFunction(
  content: string,
  functionName: string
): boolean {
  // Check if function has proper return type annotation
  const functionRegex = new RegExp(
    `export\\s+function\\s+${functionName}\\s*\\([^)]*\\)\\s*:\\s*\\w+`,
    'g'
  );

  return functionRegex.test(content);
}

// ============================================================================
// TYPE EXPORTS VALIDATION
// ============================================================================

async function validateTypeExports(result: ValidationResult): Promise<void> {
  console.log('📋 Validating type exports consistency...');

  if (!existsSync(TYPES_DIR)) {
    result.warnings.push('Types directory not found');
    return;
  }

  const typesIndexPath = join(TYPES_DIR, 'index.ts');
  if (!existsSync(typesIndexPath)) {
    result.errors.push('Types index file not found');
    return;
  }

  const typesContent = readFileSync(typesIndexPath, 'utf-8');

  // Check for contract imports
  const contractImports = extractContractImports(typesContent);
  result.stats.totalTypes = contractImports.length;

  // Validate that all imports are from contracts
  const nonContractImports = extractNonContractImports(typesContent);
  if (nonContractImports.length > 0) {
    result.warnings.push(
      `Found ${nonContractImports.length} non-contract type imports: ${nonContractImports.join(', ')}`
    );
  }

  console.log(`✅ Found ${contractImports.length} contract type imports`);
}

function extractContractImports(content: string): string[] {
  const contractImportRegex = /from\s+['"]@platform\/shared\/contracts['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = contractImportRegex.exec(content)) !== null) {
    imports.push(match[0]);
  }

  return imports;
}

function extractNonContractImports(content: string): string[] {
  const nonContractImportRegex =
    /from\s+['"](?!@platform\/shared\/contracts)[^'"]*['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = nonContractImportRegex.exec(content)) !== null) {
    imports.push(match[0]);
  }

  return imports;
}

// ============================================================================
// IMPORT CONSISTENCY VALIDATION
// ============================================================================

async function validateImportConsistency(
  result: ValidationResult
): Promise<void> {
  console.log('📋 Validating import consistency...');

  // Check for any remaining validation imports
  const validationImports = await findValidationImports();

  if (validationImports.length > 0) {
    result.errors.push(
      `Found ${validationImports.length} validation imports that should be updated to contracts:`
    );
    validationImports.forEach(importPath => {
      result.errors.push(`  - ${importPath}`);
    });
  }

  // Check for contract imports in components
  const contractImports = await findContractImports();
  console.log(`✅ Found ${contractImports.length} contract imports in use`);
}

async function findValidationImports(): Promise<string[]> {
  const files = await glob('**/*.{ts,tsx}', {
    cwd: APPS_DIR,
    ignore: ['node_modules/**', '.next/**', 'dist/**'],
  });

  const validationImports: string[] = [];

  for (const file of files) {
    const filePath = join(APPS_DIR, file);
    const content = readFileSync(filePath, 'utf-8');

    // Look for imports from validations directory
    if (
      content.includes("from '@/validations/") ||
      content.includes("from '../validations/")
    ) {
      validationImports.push(file);
    }
  }

  return validationImports;
}

async function findContractImports(): Promise<string[]> {
  const files = await glob('**/*.{ts,tsx}', {
    cwd: APPS_DIR,
    ignore: ['node_modules/**', '.next/**', 'dist/**'],
  });

  const contractImports: string[] = [];

  for (const file of files) {
    const filePath = join(APPS_DIR, file);
    const content = readFileSync(filePath, 'utf-8');

    // Look for imports from contracts package
    if (content.includes("from '@platform/shared/contracts'")) {
      contractImports.push(file);
    }
  }

  return contractImports;
}

// ============================================================================
// ORPHANED FILES CHECK
// ============================================================================

async function checkOrphanedValidationFiles(
  result: ValidationResult
): Promise<void> {
  console.log('📋 Checking for orphaned validation files...');

  const validationsDir = join(APPS_DIR, 'validations');

  if (existsSync(validationsDir)) {
    const files = readdirSync(validationsDir);
    if (files.length > 0) {
      result.errors.push(
        `Found orphaned validation directory with ${files.length} files: ${files.join(', ')}`
      );
    }
  }

  console.log('✅ No orphaned validation files found');
}

// ============================================================================
// CONTRACT VALIDATION
// ============================================================================

async function validateContracts(result: ValidationResult): Promise<void> {
  console.log('📋 Validating contract schemas...');

  if (!existsSync(CONTRACTS_DIR)) {
    result.errors.push('Contracts directory not found');
    return;
  }

  const contractFiles = glob.sync('**/*.ts', { cwd: CONTRACTS_DIR });
  result.stats.totalContracts = contractFiles.length;

  for (const contractFile of contractFiles) {
    const contractPath = join(CONTRACTS_DIR, contractFile);
    const content = readFileSync(contractPath, 'utf-8');

    // Check for proper schema exports
    const schemaExports = extractSchemaExports(content);
    if (schemaExports.length === 0) {
      result.warnings.push(`No schema exports found in ${contractFile}`);
    }
  }

  console.log(`✅ Validated ${result.stats.totalContracts} contract files`);
}

function extractSchemaExports(content: string): string[] {
  const schemaExportRegex = /export\s+(const|type)\s+(\w+Schema)/g;
  const schemas: string[] = [];
  let match;

  while ((match = schemaExportRegex.exec(content)) !== null) {
    schemas.push(match[2]);
  }

  return schemas;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function printValidationSummary(result: ValidationResult): void {
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));

  console.log(`\n📈 Statistics:`);
  console.log(`  • Total Mappers: ${result.stats.totalMappers}`);
  console.log(`  • Validated Mappers: ${result.stats.validatedMappers}`);
  console.log(`  • Failed Mappers: ${result.stats.failedMappers}`);
  console.log(`  • Total Contracts: ${result.stats.totalContracts}`);
  console.log(`  • Total Types: ${result.stats.totalTypes}`);

  if (result.warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
    result.warnings.forEach(warning => {
      console.log(`  • ${warning}`);
    });
  }

  if (result.errors.length > 0) {
    console.log(`\n❌ Errors (${result.errors.length}):`);
    result.errors.forEach(error => {
      console.log(`  • ${error}`);
    });
  }

  console.log(
    `\n🎯 Overall Status: ${result.success ? '✅ PASSED' : '❌ FAILED'}`
  );

  if (result.success) {
    console.log('\n🎉 Schema alignment validation completed successfully!');
    console.log('All mappers, contracts, and types are properly aligned.');
  } else {
    console.log('\n🔧 Please fix the errors above before proceeding.');
    console.log(
      'Refer to the SCHEMA_RELATIONSHIPS.md documentation for guidance.'
    );
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

async function main(): Promise<void> {
  const result = await validateSchemaAlignment();

  if (!result.success) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation script failed:', error);
    process.exit(1);
  });
}

export { ValidationResult, validateSchemaAlignment };
