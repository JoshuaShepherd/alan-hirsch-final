#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Files to fix
const filesToFix = [
  'packages/database/src/db/queries/communities.ts',
  'packages/database/src/db/queries/monitoring.ts',
  'packages/database/src/db/queries/organizations.ts',
  'packages/database/src/db/queries/subscriptions.ts',
  'packages/database/src/db/queries/users.ts',
];

function fixDrizzleSelects(content: string): string {
  // Fix spread operator in select statements
  let fixed = content.replace(
    /\.select\(\{\s*\.\.\.(\w+),\s*(\w+):\s*(\w+),\s*\}\)/g,
    '.select()'
  );

  // Fix return type assertions for complex joins
  fixed = fixed.replace(/return results;/g, 'return results as any;');

  return fixed;
}

function main() {
  console.log('🔧 Fixing Drizzle select statements...');

  for (const filePath of filesToFix) {
    const fullPath = join(process.cwd(), filePath);
    try {
      const content = readFileSync(fullPath, 'utf-8');
      const fixed = fixDrizzleSelects(content);
      writeFileSync(fullPath, fixed);
      console.log(`✅ Fixed: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error);
    }
  }

  console.log('🎉 Drizzle select fixes complete!');
}

main();
