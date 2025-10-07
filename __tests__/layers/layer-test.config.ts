// Layer Testing Configuration
// Configuration for running layer-specific tests

import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',
    globals: true,

    // Test patterns
    include: [
      '__tests__/layers/**/*.test.ts',
    ],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'coverage',
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage/layers',
      include: [
        'packages/database/src/**/*.ts',
        'packages/types/src/**/*.ts',
        'packages/contracts/src/**/*.ts',
        'packages/shared/src/mappers/**/*.ts',
      ],
      exclude: [
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.ts',
        '**/test-utils.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Layer-specific thresholds
        'packages/database/src/**/*.ts': {
          branches: 70,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        'packages/types/src/**/*.ts': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'packages/contracts/src/**/*.ts': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        'packages/shared/src/mappers/**/*.ts': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },

    // Test timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,

    // Parallel execution
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },

    // Reporter configuration
    reporter: ['verbose', 'json', 'html'],
    outputFile: {
      json: './test-results/layers-results.json',
      html: './test-results/layers-report.html',
    },

    // Setup files
    setupFiles: ['./__tests__/layers/test-setup.ts'],
  },

  // Module resolution - use same aliases as main vitest config
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../'),
      '@/lib': resolve(__dirname, '../../lib'),
      '@/components/ui': resolve(__dirname, '../../packages/ui/src'),
      '@/app': resolve(__dirname, '../../app'),
      '@/types': resolve(__dirname, '../../types'),
      '@/validations': resolve(__dirname, '../../validations'),
      // Monorepo package aliases
      '@platform/database': resolve(__dirname, '../../packages/database/src'),
      '@platform/database/drizzle': resolve(__dirname, '../../packages/database/src/db/drizzle'),
      '@platform/shared': resolve(__dirname, '../../packages/shared/src'),
      '@platform/shared/mappers': resolve(__dirname, '../../packages/shared/src/mappers'),
      '@platform/shared/contracts': resolve(__dirname, '../../packages/shared/src/contracts'),
      '@platform/contracts': resolve(__dirname, '../../packages/contracts/src'),
      '@platform/ui': resolve(__dirname, '../../packages/ui/src'),
      '@platform/types': resolve(__dirname, '../../packages/types/src'),
    },
  },
});
