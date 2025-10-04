#!/usr/bin/env tsx

/**
 * Phase 6: End-to-End User Journey Testing Runner
 *
 * This script runs comprehensive E2E tests to validate complete user workflows
 * from start to finish without manual intervention.
 */

import { execSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TestResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  details?: string;
}

interface Phase6Report {
  timestamp: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  totalDuration: number;
  testResults: TestResult[];
  summary: {
    registrationJourney: boolean;
    assessmentJourney: boolean;
    contentJourney: boolean;
    overallStatus: 'success' | 'partial' | 'failed';
  };
}

class Phase6E2ETestRunner {
  private report: Phase6Report;
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
    this.report = {
      timestamp: new Date().toISOString(),
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      skippedTests: 0,
      totalDuration: 0,
      testResults: [],
      summary: {
        registrationJourney: false,
        assessmentJourney: false,
        contentJourney: false,
        overallStatus: 'failed',
      },
    };
  }

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Phase 6: End-to-End User Journey Testing');
    console.log('='.repeat(60));

    try {
      // Test 1: User Registration Journey
      await this.runRegistrationJourneyTests();

      // Test 2: Assessment Taking Journey
      await this.runAssessmentJourneyTests();

      // Test 3: Content Management Journey
      await this.runContentJourneyTests();

      // Generate final report
      this.generateFinalReport();
    } catch (error) {
      console.error('❌ Phase 6 testing failed:', error);
      this.report.summary.overallStatus = 'failed';
    }
  }

  private async runRegistrationJourneyTests(): Promise<void> {
    console.log('\n📝 Testing User Registration Journey...');

    try {
      const startTime = Date.now();

      // Run registration journey tests
      const result = execSync(
        'npx playwright test tests/e2e/registration-journey.spec.ts --reporter=json',
        {
          encoding: 'utf8',
          stdio: 'pipe',
        }
      );

      const duration = Date.now() - startTime;

      // Parse test results
      const testResults = this.parsePlaywrightResults(result);

      this.report.testResults.push(...testResults);
      this.report.summary.registrationJourney = testResults.every(
        t => t.status === 'passed'
      );

      console.log(
        `✅ Registration Journey Tests: ${testResults.filter(t => t.status === 'passed').length}/${testResults.length} passed`
      );
    } catch (error: any) {
      console.error('❌ Registration Journey Tests failed:', error.message);

      this.report.testResults.push({
        testName: 'User Registration Journey',
        status: 'failed',
        duration: 0,
        error: error.message,
      });

      this.report.summary.registrationJourney = false;
    }
  }

  private async runAssessmentJourneyTests(): Promise<void> {
    console.log('\n📊 Testing Assessment Taking Journey...');

    try {
      const startTime = Date.now();

      // Run assessment journey tests
      const result = execSync(
        'npx playwright test tests/e2e/assessment-journey.spec.ts --reporter=json',
        {
          encoding: 'utf8',
          stdio: 'pipe',
        }
      );

      const duration = Date.now() - startTime;

      // Parse test results
      const testResults = this.parsePlaywrightResults(result);

      this.report.testResults.push(...testResults);
      this.report.summary.assessmentJourney = testResults.every(
        t => t.status === 'passed'
      );

      console.log(
        `✅ Assessment Journey Tests: ${testResults.filter(t => t.status === 'passed').length}/${testResults.length} passed`
      );
    } catch (error: any) {
      console.error('❌ Assessment Journey Tests failed:', error.message);

      this.report.testResults.push({
        testName: 'Assessment Taking Journey',
        status: 'failed',
        duration: 0,
        error: error.message,
      });

      this.report.summary.assessmentJourney = false;
    }
  }

  private async runContentJourneyTests(): Promise<void> {
    console.log('\n📚 Testing Content Management Journey...');

    try {
      const startTime = Date.now();

      // Run content journey tests
      const result = execSync(
        'npx playwright test tests/e2e/content-journey.spec.ts --reporter=json',
        {
          encoding: 'utf8',
          stdio: 'pipe',
        }
      );

      const duration = Date.now() - startTime;

      // Parse test results
      const testResults = this.parsePlaywrightResults(result);

      this.report.testResults.push(...testResults);
      this.report.summary.contentJourney = testResults.every(
        t => t.status === 'passed'
      );

      console.log(
        `✅ Content Journey Tests: ${testResults.filter(t => t.status === 'passed').length}/${testResults.length} passed`
      );
    } catch (error: any) {
      console.error('❌ Content Journey Tests failed:', error.message);

      this.report.testResults.push({
        testName: 'Content Management Journey',
        status: 'failed',
        duration: 0,
        error: error.message,
      });

      this.report.summary.contentJourney = false;
    }
  }

  private parsePlaywrightResults(result: string): TestResult[] {
    try {
      const results = JSON.parse(result);
      const testResults: TestResult[] = [];

      if (results.suites) {
        for (const suite of results.suites) {
          if (suite.specs) {
            for (const spec of suite.specs) {
              if (spec.tests) {
                for (const test of spec.tests) {
                  testResults.push({
                    testName: `${suite.title} - ${spec.title} - ${test.title}`,
                    status:
                      test.results?.[0]?.status === 'passed'
                        ? 'passed'
                        : 'failed',
                    duration: test.results?.[0]?.duration || 0,
                    error: test.results?.[0]?.error?.message,
                    details: test.results?.[0]?.status,
                  });
                }
              }
            }
          }
        }
      }

      return testResults;
    } catch (error) {
      console.error('Failed to parse Playwright results:', error);
      return [];
    }
  }

  private generateFinalReport(): void {
    this.report.totalDuration = Date.now() - this.startTime;
    this.report.totalTests = this.report.testResults.length;
    this.report.passedTests = this.report.testResults.filter(
      t => t.status === 'passed'
    ).length;
    this.report.failedTests = this.report.testResults.filter(
      t => t.status === 'failed'
    ).length;
    this.report.skippedTests = this.report.testResults.filter(
      t => t.status === 'skipped'
    ).length;

    // Determine overall status
    const allJourneysPassed =
      this.report.summary.registrationJourney &&
      this.report.summary.assessmentJourney &&
      this.report.summary.contentJourney;

    const someJourneysPassed =
      this.report.summary.registrationJourney ||
      this.report.summary.assessmentJourney ||
      this.report.summary.contentJourney;

    if (allJourneysPassed) {
      this.report.summary.overallStatus = 'success';
    } else if (someJourneysPassed) {
      this.report.summary.overallStatus = 'partial';
    } else {
      this.report.summary.overallStatus = 'failed';
    }

    // Save reports
    this.saveReports();

    // Display summary
    this.displaySummary();
  }

  private saveReports(): void {
    const outputDir = join(process.cwd(), '_output');
    mkdirSync(outputDir, { recursive: true });

    // Save JSON report
    const jsonReportPath = join(outputDir, 'phase6-e2e-report.json');
    writeFileSync(jsonReportPath, JSON.stringify(this.report, null, 2));

    // Save Markdown report
    const markdownReport = this.generateMarkdownReport();
    const markdownReportPath = join(outputDir, 'phase6-e2e-report.md');
    writeFileSync(markdownReportPath, markdownReport);

    console.log(`\n📊 Reports saved to:`);
    console.log(`   JSON: ${jsonReportPath}`);
    console.log(`   Markdown: ${markdownReportPath}`);
  }

  private generateMarkdownReport(): string {
    const {
      summary,
      testResults,
      totalTests,
      passedTests,
      failedTests,
      skippedTests,
      totalDuration,
    } = this.report;

    return `# Phase 6: End-to-End User Journey Testing Report

## Summary

**Overall Status**: ${summary.overallStatus.toUpperCase()}
**Test Execution Time**: ${new Date(this.report.timestamp).toLocaleString()}
**Total Duration**: ${(totalDuration / 1000).toFixed(2)} seconds

## Test Results

- **Total Tests**: ${totalTests}
- **Passed**: ${passedTests} ✅
- **Failed**: ${failedTests} ❌
- **Skipped**: ${skippedTests} ⏭️

## Journey Status

- **User Registration Journey**: ${summary.registrationJourney ? '✅ PASSED' : '❌ FAILED'}
- **Assessment Taking Journey**: ${summary.assessmentJourney ? '✅ PASSED' : '❌ FAILED'}
- **Content Management Journey**: ${summary.contentJourney ? '✅ PASSED' : '❌ FAILED'}

## Detailed Test Results

${testResults
  .map(
    test => `
### ${test.testName}
- **Status**: ${test.status.toUpperCase()}
- **Duration**: ${test.duration}ms
${test.error ? `- **Error**: ${test.error}` : ''}
${test.details ? `- **Details**: ${test.details}` : ''}
`
  )
  .join('\n')}

## Recommendations

${this.generateRecommendations()}

---
*Report generated on ${new Date().toISOString()}*
`;
  }

  private generateRecommendations(): string {
    const { summary } = this.report;
    const recommendations: string[] = [];

    if (!summary.registrationJourney) {
      recommendations.push('- Fix user registration flow issues');
      recommendations.push('- Verify form validation and submission');
      recommendations.push('- Check email verification process');
    }

    if (!summary.assessmentJourney) {
      recommendations.push('- Fix assessment taking flow issues');
      recommendations.push('- Verify question display and navigation');
      recommendations.push('- Check results calculation and display');
    }

    if (!summary.contentJourney) {
      recommendations.push('- Fix content management flow issues');
      recommendations.push('- Verify content creation and publishing');
      recommendations.push('- Check content browsing and discovery');
    }

    if (summary.overallStatus === 'success') {
      recommendations.push('- All user journeys are working correctly');
      recommendations.push('- System is ready for production deployment');
    }

    return recommendations.length > 0
      ? recommendations.join('\n')
      : 'No specific recommendations at this time.';
  }

  private displaySummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 PHASE 6: END-TO-END USER JOURNEY TESTING SUMMARY');
    console.log('='.repeat(60));

    console.log(
      `\n🎯 Overall Status: ${this.report.summary.overallStatus.toUpperCase()}`
    );
    console.log(
      `⏱️  Total Duration: ${(this.report.totalDuration / 1000).toFixed(2)} seconds`
    );

    console.log(`\n📈 Test Results:`);
    console.log(`   Total Tests: ${this.report.totalTests}`);
    console.log(`   ✅ Passed: ${this.report.passedTests}`);
    console.log(`   ❌ Failed: ${this.report.failedTests}`);
    console.log(`   ⏭️  Skipped: ${this.report.skippedTests}`);

    console.log(`\n🛤️  Journey Status:`);
    console.log(
      `   📝 Registration: ${this.report.summary.registrationJourney ? '✅ PASSED' : '❌ FAILED'}`
    );
    console.log(
      `   📊 Assessment: ${this.report.summary.assessmentJourney ? '✅ PASSED' : '❌ FAILED'}`
    );
    console.log(
      `   📚 Content: ${this.report.summary.contentJourney ? '✅ PASSED' : '❌ FAILED'}`
    );

    if (this.report.summary.overallStatus === 'success') {
      console.log('\n🎉 All user journeys are working correctly!');
      console.log('🚀 System is ready for production deployment.');
    } else if (this.report.summary.overallStatus === 'partial') {
      console.log('\n⚠️  Some user journeys have issues that need attention.');
      console.log('🔧 Review failed tests and fix issues before deployment.');
    } else {
      console.log('\n❌ Multiple user journeys have critical issues.');
      console.log(
        '🛠️  Significant work needed before system is production-ready.'
      );
    }

    console.log('\n' + '='.repeat(60));
  }
}

// Run the tests
async function main() {
  const runner = new Phase6E2ETestRunner();
  await runner.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

export { Phase6E2ETestRunner };
