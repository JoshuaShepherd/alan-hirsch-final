import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: [
      '**/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}',
      '**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'coverage',
      'tests/e2e/**/*',
      'lib/db/setup.ts',
      'lib/db/seed.ts',
      'lib/db/reset.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/migrations/**',
        '**/seed.ts',
        '**/setup.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    testTimeout: 5000,
    hookTimeout: 5000,
    teardownTimeout: 5000,
    // Ensure proper module resolution for tests
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@/lib': resolve(__dirname, './lib'),
      '@/components/ui': resolve(__dirname, './packages/ui/src'),
      '@/app': resolve(__dirname, './app'),
      '@/types': resolve(__dirname, './types'),
      '@/validations': resolve(__dirname, './validations'),
      // Monorepo package aliases
      '@platform/database': resolve(__dirname, './packages/database/src'),
      '@platform/database/drizzle': resolve(__dirname, './packages/database/src/db/drizzle'),
      '@platform/shared': resolve(__dirname, './packages/shared/src'),
      '@platform/shared/mappers': resolve(__dirname, './packages/shared/src/mappers'),
      '@platform/shared/contracts': resolve(__dirname, './packages/shared/src/contracts'),
      '@platform/contracts': resolve(__dirname, './packages/contracts/src'),
      '@platform/ui': resolve(__dirname, './packages/ui/src'),
    },
  },
  // Ensure proper handling of ES modules and CommonJS
  esbuild: {
    target: 'node14',
  },
});
