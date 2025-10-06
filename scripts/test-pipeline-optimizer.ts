#!/usr/bin/env tsx

/**
 * Test Pipeline Optimizer
 * Optimizes test execution by analyzing test patterns and suggesting improvements
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface TestOptimization {
  category: string;
  currentTime: number;
  optimizedTime: number;
  improvement: number;
  recommendations: string[];
}

class TestPipelineOptimizer {
  private readonly testCategories = [
    'unit',
    'integration',
    'api',
    'ui',
    'utils',
  ];

  public async analyzeTestPerformance(): Promise<TestOptimization[]> {
    console.log('🔍 Analyzing test performance...');

    const optimizations: TestOptimization[] = [];

    for (const category of this.testCategories) {
      console.log(`\n📊 Analyzing ${category} tests...`);

      const optimization = await this.analyzeCategory(category);
      optimizations.push(optimization);
    }

    return optimizations;
  }

  private async analyzeCategory(category: string): Promise<TestOptimization> {
    const startTime = Date.now();

    try {
      // Run tests for this category
      const testPattern = this.getTestPattern(category);
      execSync(`pnpm vitest run ${testPattern} --reporter=verbose`, {
        encoding: 'utf8',
        stdio: 'pipe',
      });
    } catch (error) {
      console.warn(
        `⚠️  Some ${category} tests failed, but continuing analysis...`
      );
    }

    const currentTime = Date.now() - startTime;

    // Generate optimization recommendations
    const recommendations = this.generateOptimizations(category, currentTime);
    const optimizedTime = this.estimateOptimizedTime(
      currentTime,
      recommendations
    );
    const improvement = ((currentTime - optimizedTime) / currentTime) * 100;

    return {
      category,
      currentTime,
      optimizedTime,
      improvement,
      recommendations,
    };
  }

  private getTestPattern(category: string): string {
    const patterns = {
      unit: '__tests__/unit/',
      integration: '__tests__/integration/',
      api: '__tests__/api/',
      ui: '__tests__/ui/',
      utils: '__tests__/utils/',
    };

    return patterns[category as keyof typeof patterns] || '__tests__/';
  }

  private generateOptimizations(
    category: string,
    currentTime: number
  ): string[] {
    const recommendations: string[] = [];

    // Time-based optimizations
    if (currentTime > 10000) {
      // 10 seconds
      recommendations.push('Consider parallel execution with --threads flag');
    }

    if (currentTime > 5000) {
      // 5 seconds
      recommendations.push('Use --reporter=basic for faster output');
    }

    // Category-specific optimizations
    switch (category) {
      case 'unit':
        recommendations.push('Use --run flag to avoid watch mode overhead');
        recommendations.push(
          'Consider grouping related tests in describe blocks'
        );
        break;

      case 'integration':
        recommendations.push('Mock external dependencies to reduce setup time');
        recommendations.push('Use --pool=threads for better parallelization');
        break;

      case 'api':
        recommendations.push('Use --testTimeout=10000 for API tests');
        recommendations.push('Mock database connections in tests');
        break;

      case 'ui':
        recommendations.push('Use --environment=jsdom for faster DOM testing');
        recommendations.push('Consider using --coverage=false for faster runs');
        break;

      case 'utils':
        recommendations.push('Use --no-coverage for utility tests');
        recommendations.push('Group utility tests by functionality');
        break;
    }

    // General optimizations
    recommendations.push('Use --bail flag to stop on first failure');
    recommendations.push(
      'Consider using --reporter=json for CI/CD integration'
    );

    return recommendations;
  }

  private estimateOptimizedTime(
    currentTime: number,
    recommendations: string[]
  ): number {
    let optimizedTime = currentTime;

    // Apply optimization estimates
    if (recommendations.some(r => r.includes('parallel'))) {
      optimizedTime *= 0.6; // 40% improvement with parallelization
    }

    if (recommendations.some(r => r.includes('mock'))) {
      optimizedTime *= 0.8; // 20% improvement with mocking
    }

    if (recommendations.some(r => r.includes('no-coverage'))) {
      optimizedTime *= 0.7; // 30% improvement without coverage
    }

    if (recommendations.some(r => r.includes('basic'))) {
      optimizedTime *= 0.9; // 10% improvement with basic reporter
    }

    return Math.round(optimizedTime);
  }

  public generateOptimizedConfig(): void {
    console.log('\n⚙️  Generating optimized test configuration...');

    const optimizedConfig = `import { defineConfig } from 'vitest/config';
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
});`;

    writeFileSync(
      join(process.cwd(), 'vitest.config.optimized.ts'),
      optimizedConfig
    );
    console.log(
      '✅ Optimized configuration saved to vitest.config.optimized.ts'
    );
  }

  public generateOptimizedScripts(): void {
    console.log('\n📝 Generating optimized package.json scripts...');

    const optimizedScripts = {
      'test:fast': 'vitest run --reporter=basic --no-coverage',
      'test:parallel': 'vitest run --threads --maxConcurrency=4',
      'test:unit': 'vitest run __tests__/unit/ --reporter=basic --no-coverage',
      'test:integration':
        'vitest run __tests__/integration/ --threads --testTimeout=15000',
      'test:api': 'vitest run __tests__/api/ --testTimeout=10000 --threads',
      'test:ui':
        'vitest run __tests__/ui/ --environment=jsdom --reporter=basic',
      'test:utils':
        'vitest run __tests__/utils/ --no-coverage --reporter=basic',
      'test:ci':
        'vitest run --coverage --reporter=json --outputFile=test-results/results.json',
      'test:watch:fast': 'vitest --watch --reporter=basic --no-coverage',
      'test:performance': 'tsx scripts/test-performance-monitor.ts',
    };

    console.log('\n🚀 Optimized test scripts:');
    Object.entries(optimizedScripts).forEach(([script, command]) => {
      console.log(`  "${script}": "${command}"`);
    });

    // Save to file
    const scriptsContent = JSON.stringify(optimizedScripts, null, 2);
    writeFileSync(
      join(process.cwd(), 'optimized-test-scripts.json'),
      scriptsContent
    );
    console.log('\n✅ Optimized scripts saved to optimized-test-scripts.json');
  }

  public displayOptimizationReport(optimizations: TestOptimization[]): void {
    console.log('\n📊 Test Pipeline Optimization Report');
    console.log('=====================================');

    let totalCurrentTime = 0;
    let totalOptimizedTime = 0;

    optimizations.forEach(opt => {
      totalCurrentTime += opt.currentTime;
      totalOptimizedTime += opt.optimizedTime;

      console.log(`\n📁 ${opt.category.toUpperCase()} Tests:`);
      console.log(`   Current Time: ${(opt.currentTime / 1000).toFixed(2)}s`);
      console.log(
        `   Optimized Time: ${(opt.optimizedTime / 1000).toFixed(2)}s`
      );
      console.log(`   Improvement: ${opt.improvement.toFixed(1)}%`);

      if (opt.recommendations.length > 0) {
        console.log(`   Recommendations:`);
        opt.recommendations.forEach((rec, index) => {
          console.log(`     ${index + 1}. ${rec}`);
        });
      }
    });

    const totalImprovement =
      ((totalCurrentTime - totalOptimizedTime) / totalCurrentTime) * 100;

    console.log('\n🎯 Overall Optimization Summary:');
    console.log(
      `   Total Current Time: ${(totalCurrentTime / 1000).toFixed(2)}s`
    );
    console.log(
      `   Total Optimized Time: ${(totalOptimizedTime / 1000).toFixed(2)}s`
    );
    console.log(`   Total Improvement: ${totalImprovement.toFixed(1)}%`);
    console.log(
      `   Time Saved: ${((totalCurrentTime - totalOptimizedTime) / 1000).toFixed(2)}s`
    );

    if (totalImprovement > 20) {
      console.log('\n🎉 Excellent optimization potential!');
    } else if (totalImprovement > 10) {
      console.log('\n✅ Good optimization potential!');
    } else {
      console.log('\n📈 Some optimization potential available.');
    }
  }
}

// Main execution
async function main() {
  const optimizer = new TestPipelineOptimizer();

  try {
    console.log('🚀 Starting test pipeline optimization...');

    const optimizations = await optimizer.analyzeTestPerformance();
    optimizer.displayOptimizationReport(optimizations);

    optimizer.generateOptimizedConfig();
    optimizer.generateOptimizedScripts();

    console.log('\n✅ Test pipeline optimization complete!');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { TestPipelineOptimizer };
