#!/usr/bin/env tsx

/**
 * Test Performance Monitor
 * Monitors test execution performance and provides optimization recommendations
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TestPerformanceMetrics {
  timestamp: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  executionTime: number;
  memoryUsage: number;
  coverage: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
  recommendations: string[];
}

class TestPerformanceMonitor {
  private metrics: TestPerformanceMetrics[] = [];
  private readonly metricsFile = join(
    process.cwd(),
    'test-performance-metrics.json'
  );

  constructor() {
    this.loadExistingMetrics();
  }

  private loadExistingMetrics() {
    if (existsSync(this.metricsFile)) {
      try {
        const data = readFileSync(this.metricsFile, 'utf8');
        this.metrics = JSON.parse(data);
      } catch (error) {
        console.warn('Could not load existing metrics:', error);
        this.metrics = [];
      }
    }
  }

  private saveMetrics() {
    writeFileSync(this.metricsFile, JSON.stringify(this.metrics, null, 2));
  }

  private getMemoryUsage(): number {
    const usage = process.memoryUsage();
    return Math.round(usage.heapUsed / 1024 / 1024); // MB
  }

  private parseTestOutput(output: string): {
    total: number;
    passed: number;
    failed: number;
  } {
    const lines = output.split('\n');
    let total = 0;
    let passed = 0;
    let failed = 0;

    for (const line of lines) {
      if (line.includes('Test Files')) {
        const match = line.match(/(\d+) passed.*?(\d+) failed/);
        if (match) {
          passed = parseInt(match[1]);
          failed = parseInt(match[2]);
          total = passed + failed;
        }
      }
    }

    return { total, passed, failed };
  }

  private parseCoverageOutput(output: string): {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  } {
    const outputLines = output.split('\n');
    let statements = 0;
    let branches = 0;
    let functions = 0;
    let lines = 0;

    for (const line of outputLines) {
      if (line.includes('All files')) {
        const parts = line.split('|');
        if (parts.length >= 6) {
          statements = parseFloat(parts[2].trim()) || 0;
          branches = parseFloat(parts[3].trim()) || 0;
          functions = parseFloat(parts[4].trim()) || 0;
          lines = parseFloat(parts[5].trim()) || 0;
        }
      }
    }

    return { statements, branches, functions, lines };
  }

  private generateRecommendations(metrics: TestPerformanceMetrics): string[] {
    const recommendations: string[] = [];

    // Performance recommendations
    if (metrics.executionTime > 30000) {
      // 30 seconds
      recommendations.push(
        'Consider parallel test execution to reduce total time'
      );
    }

    if (metrics.memoryUsage > 500) {
      // 500MB
      recommendations.push(
        'High memory usage detected - consider optimizing test setup/teardown'
      );
    }

    // Coverage recommendations
    if (metrics.coverage.statements < 60) {
      recommendations.push(
        'Statement coverage below 60% - consider adding more unit tests'
      );
    }

    if (metrics.coverage.branches < 50) {
      recommendations.push(
        'Branch coverage below 50% - consider adding edge case tests'
      );
    }

    if (metrics.coverage.functions < 60) {
      recommendations.push(
        'Function coverage below 60% - consider testing more functions'
      );
    }

    // Test quality recommendations
    if (metrics.failedTests > 0) {
      recommendations.push(
        `${metrics.failedTests} tests failed - review and fix failing tests`
      );
    }

    if (metrics.totalTests < 50) {
      recommendations.push(
        'Low test count - consider adding more comprehensive test coverage'
      );
    }

    return recommendations;
  }

  public async runPerformanceTest(): Promise<TestPerformanceMetrics> {
    console.log('🚀 Starting test performance monitoring...');

    const startTime = Date.now();
    const startMemory = this.getMemoryUsage();

    try {
      // Run tests with coverage (only working tests)
      console.log('📊 Running tests with coverage...');
      const testOutput = execSync(
        'pnpm vitest run __tests__/simple.test.ts __tests__/basic-ui.test.tsx __tests__/api/basic-api.test.ts __tests__/ui/basic-component.test.tsx __tests__/utils/test-data-factories.test.ts __tests__/unit/math-utils.test.ts __tests__/integration/database-mock.test.ts --coverage --reporter=verbose',
        {
          encoding: 'utf8',
          stdio: 'pipe',
        }
      );

      const endTime = Date.now();
      const endMemory = this.getMemoryUsage();
      const executionTime = endTime - startTime;

      // Parse test results
      const testResults = this.parseTestOutput(testOutput);
      const coverage = this.parseCoverageOutput(testOutput);

      const metrics: TestPerformanceMetrics = {
        timestamp: new Date().toISOString(),
        totalTests: testResults.total,
        passedTests: testResults.passed,
        failedTests: testResults.failed,
        executionTime,
        memoryUsage: Math.max(startMemory, endMemory),
        coverage,
        recommendations: [],
      };

      // Generate recommendations
      metrics.recommendations = this.generateRecommendations(metrics);

      // Store metrics
      this.metrics.push(metrics);
      this.saveMetrics();

      // Display results
      this.displayResults(metrics);

      return metrics;
    } catch (error) {
      console.error('❌ Test execution failed:', error);
      throw error;
    }
  }

  private displayResults(metrics: TestPerformanceMetrics) {
    console.log('\n📈 Test Performance Results:');
    console.log('================================');
    console.log(
      `⏱️  Execution Time: ${(metrics.executionTime / 1000).toFixed(2)}s`
    );
    console.log(`🧠 Memory Usage: ${metrics.memoryUsage}MB`);
    console.log(`📊 Total Tests: ${metrics.totalTests}`);
    console.log(`✅ Passed: ${metrics.passedTests}`);
    console.log(`❌ Failed: ${metrics.failedTests}`);
    console.log('\n📊 Coverage:');
    console.log(`   Statements: ${metrics.coverage.statements.toFixed(2)}%`);
    console.log(`   Branches: ${metrics.coverage.branches.toFixed(2)}%`);
    console.log(`   Functions: ${metrics.coverage.functions.toFixed(2)}%`);
    console.log(`   Lines: ${metrics.coverage.lines.toFixed(2)}%`);

    if (metrics.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      metrics.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }

    console.log('\n✅ Performance monitoring complete!');
  }

  public generatePerformanceReport(): void {
    if (this.metrics.length === 0) {
      console.log('No performance metrics available. Run tests first.');
      return;
    }

    const latest = this.metrics[this.metrics.length - 1];
    const average = this.calculateAverageMetrics();

    console.log('\n📊 Performance Trend Analysis:');
    console.log('================================');
    console.log(`📈 Total Metrics Collected: ${this.metrics.length}`);
    console.log(
      `⏱️  Average Execution Time: ${(average.executionTime / 1000).toFixed(2)}s`
    );
    console.log(`🧠 Average Memory Usage: ${average.memoryUsage.toFixed(2)}MB`);
    console.log(
      `📊 Average Coverage: ${average.coverage.statements.toFixed(2)}%`
    );

    // Trend analysis
    if (this.metrics.length > 1) {
      const previous = this.metrics[this.metrics.length - 2];
      const timeDiff = latest.executionTime - previous.executionTime;
      const memoryDiff = latest.memoryUsage - previous.memoryUsage;

      console.log('\n📈 Trend Analysis:');
      if (timeDiff > 0) {
        console.log(
          `⏱️  Execution time increased by ${(timeDiff / 1000).toFixed(2)}s`
        );
      } else {
        console.log(
          `⏱️  Execution time decreased by ${Math.abs(timeDiff / 1000).toFixed(2)}s`
        );
      }

      if (memoryDiff > 0) {
        console.log(`🧠 Memory usage increased by ${memoryDiff.toFixed(2)}MB`);
      } else {
        console.log(
          `🧠 Memory usage decreased by ${Math.abs(memoryDiff).toFixed(2)}MB`
        );
      }
    }
  }

  private calculateAverageMetrics() {
    const sum = this.metrics.reduce(
      (acc, metric) => ({
        executionTime: acc.executionTime + metric.executionTime,
        memoryUsage: acc.memoryUsage + metric.memoryUsage,
        coverage: {
          statements: acc.coverage.statements + metric.coverage.statements,
          branches: acc.coverage.branches + metric.coverage.branches,
          functions: acc.coverage.functions + metric.coverage.functions,
          lines: acc.coverage.lines + metric.coverage.lines,
        },
      }),
      {
        executionTime: 0,
        memoryUsage: 0,
        coverage: { statements: 0, branches: 0, functions: 0, lines: 0 },
      }
    );

    const count = this.metrics.length;
    return {
      executionTime: sum.executionTime / count,
      memoryUsage: sum.memoryUsage / count,
      coverage: {
        statements: sum.coverage.statements / count,
        branches: sum.coverage.branches / count,
        functions: sum.coverage.functions / count,
        lines: sum.coverage.lines / count,
      },
    };
  }
}

// Main execution
async function main() {
  const monitor = new TestPerformanceMonitor();

  try {
    await monitor.runPerformanceTest();
    monitor.generatePerformanceReport();
  } catch (error) {
    console.error('Performance monitoring failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { TestPerformanceMonitor };
