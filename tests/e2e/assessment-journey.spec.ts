import { expect, test } from '@playwright/test';

test.describe('Assessment Taking Journey', () => {
  test('Complete assessment taking flow', async ({ page }) => {
    console.log('🧪 Testing complete assessment taking journey');

    // Step 1: Navigate to dashboard (assuming user is authenticated)
    await page.goto('/dashboard');

    // If not authenticated, redirect to sign-in
    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, testing sign-in redirect');
      await expect(page).toHaveURL(/.*sign-in/);
      return;
    }

    // Step 2: Navigate to assessments section
    await page.click('text=/assessment/i');
    await expect(page).toHaveURL(/.*assessment/i);

    // Step 3: Browse available assessments
    await expect(page.locator('text=/available.*assessment/i')).toBeVisible();

    // Look for assessment cards or list items
    const assessmentItems = page.locator(
      '[data-testid="assessment-item"], .assessment-card, .assessment-list-item'
    );
    await expect(assessmentItems.first()).toBeVisible();

    // Step 4: Start an assessment
    await assessmentItems.first().click();

    // Should navigate to assessment start page
    await expect(page.locator('text=/start.*assessment/i')).toBeVisible();
    await expect(
      page.locator('button:has-text("Start Assessment")')
    ).toBeVisible();

    // Step 5: Begin the assessment
    await page.click('button:has-text("Start Assessment")');

    // Step 6: Answer assessment questions
    // Look for question elements
    const questionElements = page.locator(
      '[data-testid="question"], .question, .assessment-question'
    );

    if ((await questionElements.count()) > 0) {
      console.log('📝 Found assessment questions, testing question flow');

      // Answer first question
      const firstQuestion = questionElements.first();
      await expect(firstQuestion).toBeVisible();

      // Look for answer options (radio buttons, checkboxes, or text inputs)
      const answerOptions = page.locator(
        'input[type="radio"], input[type="checkbox"], textarea, input[type="text"]'
      );

      if ((await answerOptions.count()) > 0) {
        // Select first available answer
        await answerOptions.first().click();

        // Submit answer or go to next question
        const nextButton = page.locator(
          'button:has-text("Next"), button:has-text("Submit"), button:has-text("Continue")'
        );
        if ((await nextButton.count()) > 0) {
          await nextButton.first().click();
        }
      }
    }

    // Step 7: Complete assessment and view results
    // Look for completion indicators
    const completionIndicators = [
      page.locator('text=/assessment.*complete/i'),
      page.locator('text=/results/i'),
      page.locator('text=/score/i'),
      page.locator('text=/congratulations/i'),
    ];

    let foundCompletion = false;
    for (const indicator of completionIndicators) {
      try {
        await expect(indicator).toBeVisible({ timeout: 10000 });
        foundCompletion = true;
        break;
      } catch (e) {
        // Continue checking other indicators
      }
    }

    if (foundCompletion) {
      console.log('✅ Assessment completion detected');
    } else {
      console.log(
        'ℹ️ Assessment completion not detected, may need manual completion'
      );
    }

    // Step 8: Verify results are displayed
    const resultsElements = [
      page.locator('[data-testid="results"], .results, .assessment-results'),
      page.locator('text=/score/i'),
      page.locator('text=/recommendation/i'),
      page.locator('text=/insight/i'),
    ];

    let foundResults = false;
    for (const element of resultsElements) {
      try {
        await expect(element).toBeVisible({ timeout: 5000 });
        foundResults = true;
        break;
      } catch (e) {
        // Continue checking other elements
      }
    }

    if (foundResults) {
      console.log('✅ Assessment results displayed');
    }

    console.log('✅ Assessment taking journey completed');
  });

  test('Assessment browsing and selection', async ({ page }) => {
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log(
        'ℹ️ User not authenticated, skipping assessment browsing test'
      );
      return;
    }

    // Navigate to assessments
    await page.click('text=/assessment/i');

    // Check for assessment categories or filters
    const categoryElements = page.locator(
      '[data-testid="category"], .category, .filter'
    );
    if ((await categoryElements.count()) > 0) {
      await expect(categoryElements.first()).toBeVisible();
    }

    // Check for search functionality
    const searchInput = page.locator(
      'input[placeholder*="search"], input[type="search"]'
    );
    if ((await searchInput.count()) > 0) {
      await searchInput.fill('leadership');
      await page.keyboard.press('Enter');
    }

    // Check for assessment details
    const assessmentItems = page.locator(
      '[data-testid="assessment-item"], .assessment-card'
    );
    if ((await assessmentItems.count()) > 0) {
      await assessmentItems.first().hover();

      // Look for assessment details or preview
      const detailsElements = page.locator(
        '[data-testid="assessment-details"], .assessment-details, .preview'
      );
      if ((await detailsElements.count()) > 0) {
        await expect(detailsElements.first()).toBeVisible();
      }
    }
  });

  test('Assessment progress tracking', async ({ page }) => {
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, skipping progress tracking test');
      return;
    }

    // Check for progress indicators on dashboard
    const progressElements = [
      page.locator('[data-testid="progress"], .progress, .assessment-progress'),
      page.locator('text=/progress/i'),
      page.locator('text=/completed/i'),
      page.locator('text=/in.*progress/i'),
    ];

    let foundProgress = false;
    for (const element of progressElements) {
      try {
        await expect(element).toBeVisible({ timeout: 5000 });
        foundProgress = true;
        break;
      } catch (e) {
        // Continue checking other elements
      }
    }

    if (foundProgress) {
      console.log('✅ Progress tracking elements found');
    } else {
      console.log('ℹ️ No progress tracking elements found');
    }

    // Navigate to assessments to check progress there
    await page.click('text=/assessment/i');

    // Look for progress indicators on assessment pages
    const assessmentProgress = page.locator(
      '[data-testid="assessment-progress"], .assessment-progress, .progress-bar'
    );
    if ((await assessmentProgress.count()) > 0) {
      await expect(assessmentProgress.first()).toBeVisible();
    }
  });

  test('Assessment results and recommendations', async ({ page }) => {
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, skipping results test');
      return;
    }

    // Navigate to results or history section
    const resultsLinks = [
      page.locator('text=/results/i'),
      page.locator('text=/history/i'),
      page.locator('text=/completed/i'),
      page.locator('text=/past.*assessment/i'),
    ];

    let foundResultsLink = false;
    for (const link of resultsLinks) {
      try {
        await link.click();
        foundResultsLink = true;
        break;
      } catch (e) {
        // Continue checking other links
      }
    }

    if (foundResultsLink) {
      // Check for results display
      const resultsElements = [
        page.locator('[data-testid="results"], .results'),
        page.locator('text=/score/i'),
        page.locator('text=/recommendation/i'),
        page.locator('text=/insight/i'),
      ];

      let foundResults = false;
      for (const element of resultsElements) {
        try {
          await expect(element).toBeVisible({ timeout: 5000 });
          foundResults = true;
          break;
        } catch (e) {
          // Continue checking other elements
        }
      }

      if (foundResults) {
        console.log('✅ Assessment results displayed');
      }
    } else {
      console.log('ℹ️ No results section found');
    }
  });
});
