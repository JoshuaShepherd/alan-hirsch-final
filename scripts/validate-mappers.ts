#!/usr/bin/env node

/**
 * Mapper Validation Script
 *
 * Scans src/lib/mappers/*.ts and verifies required exports exist per entity.
 * Required exports for each entity mapper:
 * - to<Entity>DTO(row: RowType): EntityDTO
 * - fromCreate<Entity>DTO(dto: EntityCreateDTO): InsertType
 * - fromUpdate<Entity>DTO(dto: EntityUpdateDTO): UpdateType
 * - to<Entity>DTOs(rows: RowType[]) (array helper)
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  file: string;
  entity: string;
  missing: string[];
  hasPlaceholders: boolean;
}

const MAPPER_DIR = join(process.cwd(), 'src/lib/mappers');
const REQUIRED_EXPORTS = ['toDTO', 'fromCreateDTO', 'fromUpdateDTO', 'toDTOs'];

function extractEntityName(filename: string): string {
  // Convert filename like "user-profiles.mapper.ts" to "UserProfile"
  return filename
    .replace('.mapper.ts', '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function validateMapperFile(filePath: string): ValidationResult {
  const content = readFileSync(filePath, 'utf-8');
  const filename = filePath.split('/').pop()!;
  const entity = extractEntityName(filename);

  const missing: string[] = [];
  const hasPlaceholders =
    content.includes('TODO: Map') || content.includes('// TODO:');

  // Check for required exports (more flexible patterns)
  const exportPatterns = [
    // Look for toXXXDTO pattern (flexible casing)
    /export\s+(function\s+)?to\w+DTO\b/i,
    // Look for fromCreateXXXDTO pattern
    /export\s+(function\s+)?fromCreate\w+DTO\b/i,
    // Look for fromUpdateXXXDTO pattern
    /export\s+(function\s+)?fromUpdate\w+DTO\b/i,
    // Look for toXXXDTOs pattern (array helper)
    /export\s+(function\s+)?to\w+DTOs\b/i,
  ];

  const exportNames = [
    'toXXXDTO',
    'fromCreateXXXDTO',
    'fromUpdateXXXDTO',
    'toXXXDTOs',
  ];

  exportPatterns.forEach((pattern, index) => {
    if (!pattern.test(content)) {
      missing.push(exportNames[index]);
    }
  });

  return {
    file: filename,
    entity,
    missing,
    hasPlaceholders,
  };
}

function main() {
  console.log('🔍 Validating mapper files...\n');

  const mapperFiles = readdirSync(MAPPER_DIR)
    .filter(file => file.endsWith('.mapper.ts'))
    .map(file => join(MAPPER_DIR, file));

  const results: ValidationResult[] = [];
  let totalIssues = 0;

  for (const filePath of mapperFiles) {
    const result = validateMapperFile(filePath);
    results.push(result);

    if (result.missing.length > 0 || result.hasPlaceholders) {
      totalIssues++;
    }
  }

  // Report results
  console.log('📊 Validation Results:\n');

  const issues = results.filter(r => r.missing.length > 0 || r.hasPlaceholders);

  if (issues.length === 0) {
    console.log('✅ All mapper files are valid!');
    process.exit(0);
  }

  console.log(`❌ Found issues in ${issues.length} mapper files:\n`);

  issues.forEach(result => {
    console.log(`📁 ${result.file} (${result.entity}):`);

    if (result.hasPlaceholders) {
      console.log('  ⚠️  Contains placeholder implementations (TODO comments)');
    }

    if (result.missing.length > 0) {
      console.log('  ❌ Missing exports:');
      result.missing.forEach(exportName => {
        console.log(`     - ${exportName}`);
      });
    }

    console.log('');
  });

  console.log(`\n📈 Summary:`);
  console.log(`   Total mapper files: ${mapperFiles.length}`);
  console.log(`   Files with issues: ${issues.length}`);
  console.log(
    `   Files with placeholders: ${issues.filter(r => r.hasPlaceholders).length}`
  );
  console.log(
    `   Files missing exports: ${issues.filter(r => r.missing.length > 0).length}`
  );

  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
