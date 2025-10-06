import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Performance optimizations
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 2,
      },
    },
    
    // Test execution optimizations
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Parallel execution
    maxConcurrency: 4,
    
    // Caching optimizations
    cache: {
      dir: './node_modules/.vitest-cache',
    },
    
    // Reporter optimizations
    reporter: ['basic', 'json'],
    outputFile: {
      json: './test-results/results.json',
    },
    
    // Environment optimizations
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    
    // Module resolution optimizations
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
        '@/lib': resolve(__dirname, './lib'),
        '@/components/ui': resolve(__dirname, './packages/ui/src'),
        '@/app': resolve(__dirname, './app'),
        '@/types': resolve(__dirname, './types'),
        '@/validations': resolve(__dirname, './validations'),
        '@platform/database': resolve(__dirname, './packages/database/src'),
        '@platform/database/drizzle': resolve(__dirname, './packages/database/src/db/drizzle'),
        '@platform/shared': resolve(__dirname, './packages/shared/src'),
        '@platform/shared/mappers': resolve(__dirname, './packages/shared/src/mappers'),
        '@platform/shared/contracts': resolve(__dirname, './packages/shared/src/contracts'),
        '@platform/contracts': resolve(__dirname, './packages/contracts/src'),
        '@platform/ui': resolve(__dirname, './packages/ui/src'),
      },
    },
    
    // Test file patterns for better performance
    include: [
      '**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    
    // Exclude patterns for better performance
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
  },
});