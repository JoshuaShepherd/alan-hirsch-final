import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('User Registration Journey', () => {
  test('Complete user registration flow', async ({ page }) => {
    // Generate test user data
    const testUser = {
      email: faker.internet.email(),
      password: 'TestPassword123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      organizationName: faker.company.name(),
      ministryRole: 'senior_pastor',
      churchSize: '100-500',
      yearsInMinistry: '10-20',
    };

    console.log(`🧪 Testing registration for: ${testUser.email}`);

    // Step 1: Navigate to sign-up page
    await page.goto('/sign-up');
    await expect(page).toHaveURL(/.*sign-up/);
    await expect(page.locator('h1')).toContainText(/sign up|register/i);

    // Step 2: Fill out registration form
    await page.fill('input[name="email"]', testUser.email);
    await page.fill('input[name="password"]', testUser.password);
    await page.fill('input[name="confirmPassword"]', testUser.password);
    await page.fill('input[name="firstName"]', testUser.firstName);
    await page.fill('input[name="lastName"]', testUser.lastName);

    // Step 3: Fill organization details
    await page.fill(
      'input[name="organizationName"]',
      testUser.organizationName
    );
    await page.selectOption(
      'select[name="ministryRole"]',
      testUser.ministryRole
    );
    await page.selectOption('select[name="churchSize"]', testUser.churchSize);
    await page.selectOption(
      'select[name="yearsInMinistry"]',
      testUser.yearsInMinistry
    );

    // Step 4: Submit registration
    await page.click('button[type="submit"]');

    // Step 5: Verify successful registration
    // Should redirect to dashboard or show success message
    await page.waitForURL(/.*dashboard|.*success|.*verify/i, {
      timeout: 10000,
    });

    // Check for success indicators
    const successIndicators = [
      page.locator('text=/welcome/i'),
      page.locator('text=/success/i'),
      page.locator('text=/dashboard/i'),
      page.locator('text=/verify.*email/i'),
    ];

    let foundSuccess = false;
    for (const indicator of successIndicators) {
      try {
        await expect(indicator).toBeVisible({ timeout: 5000 });
        foundSuccess = true;
        break;
      } catch (e) {
        // Continue checking other indicators
      }
    }

    expect(foundSuccess).toBe(true);

    // Step 6: Verify user profile was created
    // If redirected to dashboard, check profile info
    if (page.url().includes('dashboard')) {
      await expect(page.locator(`text=${testUser.firstName}`)).toBeVisible();
      await expect(page.locator(`text=${testUser.lastName}`)).toBeVisible();
      await expect(
        page.locator(`text=${testUser.organizationName}`)
      ).toBeVisible();
    }

    console.log(`✅ Registration journey completed for: ${testUser.email}`);
  });

  test('Registration form validation', async ({ page }) => {
    await page.goto('/sign-up');

    // Test empty form submission
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=/required/i')).toBeVisible();

    // Test invalid email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=/invalid.*email/i')).toBeVisible();

    // Test password mismatch
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.fill('input[name="confirmPassword"]', 'DifferentPassword123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=/password.*match/i')).toBeVisible();

    // Test weak password
    await page.fill('input[name="password"]', '123');
    await page.fill('input[name="confirmPassword"]', '123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=/password.*strong/i')).toBeVisible();
  });

  test('Email verification flow', async ({ page }) => {
    // This test would require email testing setup
    // For now, we'll test the verification page structure
    await page.goto('/auth/verify-email');

    // Check for verification page elements
    await expect(page.locator('text=/verify.*email/i')).toBeVisible();
    await expect(page.locator('text=/check.*inbox/i')).toBeVisible();
  });

  test('Welcome flow after registration', async ({ page }) => {
    // Test the welcome/onboarding flow
    await page.goto('/dashboard');

    // If user is not authenticated, should redirect to sign-in
    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, testing redirect behavior');
      await expect(page).toHaveURL(/.*sign-in/);
      return;
    }

    // If authenticated, check for welcome elements
    await expect(page.locator('text=/welcome/i')).toBeVisible();
    await expect(page.locator('text=/get.*started/i')).toBeVisible();
  });
});
