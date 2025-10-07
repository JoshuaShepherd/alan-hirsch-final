import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],

    // Unified test patterns
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

    // Performance settings
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,

    // Pool configuration
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },

    // Coverage (can be enabled with --coverage flag)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
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
  },

  // Unified module resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/components/ui': resolve(__dirname, './src/lib/ui'),
      '@/app': resolve(__dirname, './src/app'),
      '@/types': resolve(__dirname, './src/lib/types'),
      '@/validations': resolve(__dirname, './src/lib/contracts'),
    },
  },

  // ESBuild configuration
  esbuild: {
    target: 'node18',
  },
});
