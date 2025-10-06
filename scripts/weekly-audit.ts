#!/usr/bin/env tsx

import { existsSync, readFileSync } from 'fs';
import { glob } from 'glob';

interface AuditResult {
  anyTypes: number;
  nonNullAssertions: number;
  unusedImports: number;
  consoleStatements: number;
  totalFiles: number;
  testFiles: number;
  productionFiles: number;
}

interface FileAnalysis {
  file: string;
  anyTypes: number;
  nonNullAssertions: number;
  consoleStatements: number;
  isTestFile: boolean;
}

class WeeklyAuditor {
  private results: AuditResult = {
    anyTypes: 0,
    nonNullAssertions: 0,
    unusedImports: 0,
    consoleStatements: 0,
    totalFiles: 0,
    testFiles: 0,
    productionFiles: 0,
  };

  private fileAnalyses: FileAnalysis[] = [];

  async runWeeklyAudit(): Promise<void> {
    console.log('📊 Running Weekly Code Quality Audit...\n');

    const startTime = Date.now();

    // Perform comprehensive audit
    await this.performComprehensiveAudit();

    const duration = Date.now() - startTime;

    this.printAuditResults(duration);
    this.printRecommendations();
    this.generateReport();

    // Check if audit passes quality thresholds
    const passesAudit = this.checkQualityThresholds();

    if (!passesAudit) {
      console.log(
        '\n⚠️  Audit failed quality thresholds. Review recommendations above.'
      );
      process.exit(1);
    }

    console.log('\n🎉 Weekly audit passed all quality thresholds!');
  }

  private async performComprehensiveAudit(): Promise<void> {
    try {
      // Get all TypeScript files
      const files = await glob('**/*.{ts,tsx}', {
        ignore: [
          'node_modules/**',
          'dist/**',
          'build/**',
          '.next/**',
          'coverage/**',
          'test-results/**',
          'docs-env/**',
          '**/*.d.ts',
        ],
      });

      this.results.totalFiles = files.length;

      for (const file of files) {
        if (!existsSync(file)) continue;

        const isTestFile = file.includes('.test.') || file.includes('.spec.');
        if (isTestFile) {
          this.results.testFiles++;
        } else {
          this.results.productionFiles++;
        }

        try {
          const content = readFileSync(file, 'utf-8');
          const analysis = this.analyzeFile(file, content, isTestFile);

          this.fileAnalyses.push(analysis);

          // Aggregate results
          this.results.anyTypes += analysis.anyTypes;
          this.results.nonNullAssertions += analysis.nonNullAssertions;
          this.results.consoleStatements += analysis.consoleStatements;
        } catch (fileError) {
          console.warn(`Warning: Could not analyze file ${file}:`, fileError);
          continue;
        }
      }
    } catch (error) {
      console.error('Error during audit:', error);
      throw error;
    }
  }

  private analyzeFile(
    file: string,
    content: string,
    isTestFile: boolean
  ): FileAnalysis {
    const analysis: FileAnalysis = {
      file,
      anyTypes: 0,
      nonNullAssertions: 0,
      consoleStatements: 0,
      isTestFile,
    };

    // Count any types (excluding test files)
    if (!isTestFile) {
      analysis.anyTypes = (content.match(/:\s*any\b/g) || []).length;
    }

    // Count non-null assertions
    analysis.nonNullAssertions = (content.match(/!/g) || []).length;

    // Count console statements (excluding test files and scripts)
    if (!isTestFile && !file.includes('scripts/')) {
      analysis.consoleStatements = (content.match(/console\./g) || []).length;
    }

    return analysis;
  }

  private printAuditResults(duration: number): void {
    console.log('📊 Weekly Audit Results:');
    console.log('='.repeat(60));

    console.log(`📁 Total Files Analyzed: ${this.results.totalFiles}`);
    console.log(`   - Production Files: ${this.results.productionFiles}`);
    console.log(`   - Test Files: ${this.results.testFiles}`);

    console.log('\n🔍 Code Quality Metrics:');
    console.log(`   Any Types: ${this.results.anyTypes}`);
    console.log(`   Non-null Assertions: ${this.results.nonNullAssertions}`);
    console.log(`   Console Statements: ${this.results.consoleStatements}`);

    console.log('\n⏱️  Audit Duration:', `${duration}ms`);

    // Show files with issues
    this.printProblematicFiles();
  }

  private printProblematicFiles(): void {
    const problematicFiles = this.fileAnalyses.filter(
      analysis =>
        analysis.anyTypes > 0 ||
        analysis.nonNullAssertions > 2 ||
        analysis.consoleStatements > 0
    );

    if (problematicFiles.length > 0) {
      console.log('\n⚠️  Files Requiring Attention:');
      console.log('-'.repeat(40));

      problematicFiles.forEach(analysis => {
        const issues = [];
        if (analysis.anyTypes > 0)
          issues.push(`${analysis.anyTypes} any types`);
        if (analysis.nonNullAssertions > 2)
          issues.push(`${analysis.nonNullAssertions} non-null assertions`);
        if (analysis.consoleStatements > 0)
          issues.push(`${analysis.consoleStatements} console statements`);

        console.log(`   ${analysis.file}: ${issues.join(', ')}`);
      });
    }
  }

  private printRecommendations(): void {
    console.log('\n💡 Recommendations:');
    console.log('-'.repeat(40));

    if (this.results.anyTypes > 0) {
      console.log(
        `   • Replace ${this.results.anyTypes} 'any' types with proper TypeScript types`
      );
    }

    if (this.results.nonNullAssertions > 5) {
      console.log(
        `   • Review ${this.results.nonNullAssertions} non-null assertions for safety`
      );
    }

    if (this.results.consoleStatements > 0) {
      console.log(
        `   • Remove ${this.results.consoleStatements} console statements from production code`
      );
    }

    if (
      this.results.anyTypes === 0 &&
      this.results.nonNullAssertions <= 5 &&
      this.results.consoleStatements === 0
    ) {
      console.log(
        '   • Excellent! Code quality metrics are within acceptable ranges'
      );
    }

    // Performance recommendations
    if (this.results.totalFiles > 100) {
      console.log('   • Consider code splitting for better maintainability');
    }

    if (this.results.testFiles / this.results.totalFiles < 0.2) {
      console.log('   • Consider increasing test coverage');
    }
  }

  private generateReport(): void {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.results,
      summary: {
        qualityScore: this.calculateQualityScore(),
        recommendations: this.getRecommendations(),
      },
    };

    // Save report to file
    try {
      const fs = require('fs');
      const reportPath = 'audit-report.json';
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    } catch (error) {
      console.warn('Could not save audit report:', error);
    }
  }

  private calculateQualityScore(): number {
    let score = 100;

    // Deduct points for issues
    score -= this.results.anyTypes * 5; // 5 points per any type
    score -= Math.max(0, this.results.nonNullAssertions - 5) * 2; // 2 points per excess non-null assertion
    score -= this.results.consoleStatements * 3; // 3 points per console statement

    return Math.max(0, score);
  }

  private getRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.results.anyTypes > 0) {
      recommendations.push('Replace any types with proper TypeScript types');
    }

    if (this.results.nonNullAssertions > 5) {
      recommendations.push('Review non-null assertions for safety');
    }

    if (this.results.consoleStatements > 0) {
      recommendations.push('Remove console statements from production code');
    }

    if (this.results.testFiles / this.results.totalFiles < 0.2) {
      recommendations.push('Increase test coverage');
    }

    return recommendations;
  }

  private checkQualityThresholds(): boolean {
    const thresholds = {
      maxAnyTypes: 10,
      maxNonNullAssertions: 5,
      maxConsoleStatements: 0,
    };

    return (
      this.results.anyTypes <= thresholds.maxAnyTypes &&
      this.results.nonNullAssertions <= thresholds.maxNonNullAssertions &&
      this.results.consoleStatements <= thresholds.maxConsoleStatements
    );
  }
}

// Run audit if this script is executed directly
if (require.main === module) {
  const auditor = new WeeklyAuditor();
  auditor.runWeeklyAudit().catch(error => {
    console.error('Weekly audit failed:', error);
    process.exit(1);
  });
}

export { WeeklyAuditor };

