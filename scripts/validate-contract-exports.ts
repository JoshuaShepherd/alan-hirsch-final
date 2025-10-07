#!/usr/bin/env tsx

/**
 * Contract Export Validator
 *
 * This script validates that all contract files export the canonical schema names:
 * - <Entity>CreateSchema
 * - <Entity>UpdateSchema
 * - <Entity>ResponseSchema
 * - <Entity>ListResponseSchema
 *
 * Usage: pnpm validate-contracts
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  file: string;
  entity: string;
  missing: string[];
  present: string[];
  hasCanonicalNames: boolean;
}

const CONTRACTS_DIR = 'src/lib/contracts';
const REQUIRED_EXPORTS = [
  'CreateSchema',
  'UpdateSchema',
  'ResponseSchema',
  'ListResponseSchema',
];

function extractEntityName(filename: string): string {
  // Remove .contract.ts extension and convert to PascalCase
  const baseName = filename.replace(/\.contract\.ts$/, '');
  return baseName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function validateContractFile(filePath: string): ValidationResult {
  const content = readFileSync(filePath, 'utf-8');
  const filename = filePath.split('/').pop() || '';
  const entity = extractEntityName(filename);

  const missing: string[] = [];
  const present: string[] = [];

  for (const exportName of REQUIRED_EXPORTS) {
    const fullExportName = `${entity}${exportName}`;
    const regex = new RegExp(
      `export\\s+(const|function)\\s+${fullExportName}\\s*=`,
      'g'
    );

    if (regex.test(content)) {
      present.push(fullExportName);
    } else {
      missing.push(fullExportName);
    }
  }

  return {
    file: filePath,
    entity,
    missing,
    present,
    hasCanonicalNames: missing.length === 0,
  };
}

function findContractFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip subdirectories for now
        continue;
      }

      if (entry.endsWith('.contract.ts')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return files;
}

function main() {
  console.log('🔍 Validating contract exports...\n');

  const contractFiles = findContractFiles(CONTRACTS_DIR);

  if (contractFiles.length === 0) {
    console.log('❌ No contract files found in', CONTRACTS_DIR);
    process.exit(1);
  }

  console.log(`Found ${contractFiles.length} contract files\n`);

  const results: ValidationResult[] = [];
  let validCount = 0;
  let invalidCount = 0;

  for (const file of contractFiles) {
    const result = validateContractFile(file);
    results.push(result);

    if (result.hasCanonicalNames) {
      validCount++;
      console.log(`✅ ${result.entity} - All canonical exports present`);
    } else {
      invalidCount++;
      console.log(
        `❌ ${result.entity} - Missing exports: ${result.missing.join(', ')}`
      );
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📊 Validation Summary:`);
  console.log(`   Valid: ${validCount}`);
  console.log(`   Invalid: ${invalidCount}`);
  console.log(`   Total: ${results.length}`);

  if (invalidCount > 0) {
    console.log('\n❌ Validation failed! Missing exports:');
    for (const result of results) {
      if (!result.hasCanonicalNames) {
        console.log(`\n📄 ${result.file}`);
        console.log(`   Entity: ${result.entity}`);
        console.log(`   Missing: ${result.missing.join(', ')}`);
        console.log(`   Present: ${result.present.join(', ')}`);
      }
    }
    process.exit(1);
  }

  console.log('\n✅ All contract files have canonical exports!');
}

if (require.main === module) {
  main();
}

export { REQUIRED_EXPORTS, extractEntityName, validateContractFile };
