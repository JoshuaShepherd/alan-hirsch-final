import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown...');
  
  // Clean up any global resources
  // e.g., close database connections, clean up test data, etc.
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;
