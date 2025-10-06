#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Files to fix
const filesToFix = [
  'packages/shared/src/mappers/ministry-platform.ts',
  'packages/shared/src/middleware/cache-middleware.ts',
];

// Property access patterns to fix
const propertyAccessPatterns = [
  // Direct property access on objects with index signatures
  { pattern: /(\w+)\.(\w+)/g, replacement: "$1['$2']" },
  // Environment variable access
  { pattern: /process\.env\.(\w+)/g, replacement: "process.env['$1']" },
];

function fixIndexSignatureAccess(filePath: string) {
  const fullPath = join(process.cwd(), filePath);
  let content = readFileSync(fullPath, 'utf-8');

  console.log(`Fixing index signature access in ${filePath}...`);

  // Apply fixes
  for (const { pattern, replacement } of propertyAccessPatterns) {
    content = content.replace(pattern, replacement);
  }

  writeFileSync(fullPath, content);
  console.log(`Fixed ${filePath}`);
}

// Fix all files
for (const file of filesToFix) {
  try {
    fixIndexSignatureAccess(file);
  } catch (error) {
    console.error(`Error fixing ${file}:`, error);
  }
}

console.log('Index signature access fixes completed!');
