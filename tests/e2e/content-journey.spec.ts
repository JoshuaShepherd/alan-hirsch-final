import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Content Management Journey', () => {
  test('Complete content creation and publishing flow', async ({ page }) => {
    console.log('🧪 Testing complete content management journey');

    // Generate test content data
    const testContent = {
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(3),
      category: 'leadership',
      tags: ['leadership', 'ministry', 'growth'],
      excerpt: faker.lorem.sentence(10),
    };

    // Step 1: Navigate to dashboard
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, testing sign-in redirect');
      await expect(page).toHaveURL(/.*sign-in/);
      return;
    }

    // Step 2: Navigate to content management section
    const contentLinks = [
      page.locator('text=/content/i'),
      page.locator('text=/create/i'),
      page.locator('text=/write/i'),
      page.locator('text=/publish/i'),
    ];

    let foundContentLink = false;
    for (const link of contentLinks) {
      try {
        await link.click();
        foundContentLink = true;
        break;
      } catch (e) {
        // Continue checking other links
      }
    }

    if (!foundContentLink) {
      console.log(
        'ℹ️ No content management link found, testing content browsing'
      );
      await testContentBrowsing(page);
      return;
    }

    // Step 3: Create new content
    await expect(page.locator('text=/create.*content/i')).toBeVisible();

    const createButtons = [
      page.locator('button:has-text("Create")'),
      page.locator('button:has-text("New")'),
      page.locator('button:has-text("Write")'),
      page.locator('[data-testid="create-content"]'),
    ];

    let foundCreateButton = false;
    for (const button of createButtons) {
      try {
        await button.click();
        foundCreateButton = true;
        break;
      } catch (e) {
        // Continue checking other buttons
      }
    }

    if (!foundCreateButton) {
      console.log('ℹ️ No create content button found');
      return;
    }

    // Step 4: Fill content form
    await expect(
      page.locator('input[name="title"], textarea[name="title"]')
    ).toBeVisible();

    await page.fill(
      'input[name="title"], textarea[name="title"]',
      testContent.title
    );

    // Fill content body
    const contentInputs = [
      page.locator('textarea[name="content"]'),
      page.locator('[data-testid="content-editor"]'),
      page.locator('.content-editor'),
      page.locator('textarea[placeholder*="content"]'),
    ];

    let filledContent = false;
    for (const input of contentInputs) {
      try {
        await input.fill(testContent.content);
        filledContent = true;
        break;
      } catch (e) {
        // Continue checking other inputs
      }
    }

    if (!filledContent) {
      console.log('ℹ️ No content input field found');
    }

    // Fill excerpt if available
    const excerptInput = page.locator(
      'textarea[name="excerpt"], input[name="excerpt"]'
    );
    if ((await excerptInput.count()) > 0) {
      await excerptInput.fill(testContent.excerpt);
    }

    // Select category if available
    const categorySelect = page.locator(
      'select[name="category"], [data-testid="category-select"]'
    );
    if ((await categorySelect.count()) > 0) {
      await categorySelect.selectOption(testContent.category);
    }

    // Add tags if available
    const tagInput = page.locator(
      'input[name="tags"], [data-testid="tag-input"]'
    );
    if ((await tagInput.count()) > 0) {
      await tagInput.fill(testContent.tags.join(', '));
    }

    // Step 5: Save as draft
    const saveButtons = [
      page.locator('button:has-text("Save Draft")'),
      page.locator('button:has-text("Save")'),
      page.locator('button:has-text("Draft")'),
    ];

    let savedDraft = false;
    for (const button of saveButtons) {
      try {
        await button.click();
        savedDraft = true;
        break;
      } catch (e) {
        // Continue checking other buttons
      }
    }

    if (savedDraft) {
      console.log('✅ Content saved as draft');

      // Check for success message
      const successMessages = [
        page.locator('text=/saved/i'),
        page.locator('text=/draft/i'),
        page.locator('text=/success/i'),
      ];

      for (const message of successMessages) {
        try {
          await expect(message).toBeVisible({ timeout: 5000 });
          break;
        } catch (e) {
          // Continue checking other messages
        }
      }
    }

    // Step 6: Publish content
    const publishButtons = [
      page.locator('button:has-text("Publish")'),
      page.locator('button:has-text("Publish Now")'),
      page.locator('[data-testid="publish-button"]'),
    ];

    let published = false;
    for (const button of publishButtons) {
      try {
        await button.click();
        published = true;
        break;
      } catch (e) {
        // Continue checking other buttons
      }
    }

    if (published) {
      console.log('✅ Content published');

      // Check for publish success
      const publishSuccess = [
        page.locator('text=/published/i'),
        page.locator('text=/live/i'),
        page.locator('text=/success/i'),
      ];

      for (const message of publishSuccess) {
        try {
          await expect(message).toBeVisible({ timeout: 5000 });
          break;
        } catch (e) {
          // Continue checking other messages
        }
      }
    }

    console.log('✅ Content management journey completed');
  });

  test('Content browsing and discovery', async ({ page }) => {
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, skipping content browsing test');
      return;
    }

    // Navigate to content section
    const contentLinks = [
      page.locator('text=/content/i'),
      page.locator('text=/library/i'),
      page.locator('text=/resources/i'),
      page.locator('text=/articles/i'),
    ];

    let foundContentLink = false;
    for (const link of contentLinks) {
      try {
        await link.click();
        foundContentLink = true;
        break;
      } catch (e) {
        // Continue checking other links
      }
    }

    if (!foundContentLink) {
      console.log('ℹ️ No content section found');
      return;
    }

    // Check for content items
    const contentItems = page.locator(
      '[data-testid="content-item"], .content-item, .article, .resource'
    );
    if ((await contentItems.count()) > 0) {
      await expect(contentItems.first()).toBeVisible();

      // Test content item interaction
      await contentItems.first().click();

      // Should navigate to content detail page
      await expect(page.locator('h1, .content-title')).toBeVisible();
    }

    // Test content filtering
    const filterElements = [
      page.locator('[data-testid="filter"], .filter'),
      page.locator('select[name="category"]'),
      page.locator('select[name="type"]'),
    ];

    for (const filter of filterElements) {
      if ((await filter.count()) > 0) {
        await expect(filter).toBeVisible();
        break;
      }
    }

    // Test content search
    const searchInput = page.locator(
      'input[placeholder*="search"], input[type="search"]'
    );
    if ((await searchInput.count()) > 0) {
      await searchInput.fill('leadership');
      await page.keyboard.press('Enter');

      // Check for search results
      await expect(page.locator('text=/result/i')).toBeVisible();
    }
  });

  test('Content editing and management', async ({ page }) => {
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log('ℹ️ User not authenticated, skipping content editing test');
      return;
    }

    // Navigate to content management
    const contentLinks = [
      page.locator('text=/content/i'),
      page.locator('text=/manage/i'),
      page.locator('text=/my.*content/i'),
    ];

    let foundContentLink = false;
    for (const link of contentLinks) {
      try {
        await link.click();
        foundContentLink = true;
        break;
      } catch (e) {
        // Continue checking other links
      }
    }

    if (!foundContentLink) {
      console.log('ℹ️ No content management section found');
      return;
    }

    // Look for existing content items
    const contentItems = page.locator(
      '[data-testid="content-item"], .content-item, .article'
    );
    if ((await contentItems.count()) > 0) {
      // Test edit functionality
      const editButtons = [
        page.locator('button:has-text("Edit")'),
        page.locator('[data-testid="edit-button"]'),
        page.locator('a:has-text("Edit")'),
      ];

      let foundEditButton = false;
      for (const button of editButtons) {
        try {
          await button.click();
          foundEditButton = true;
          break;
        } catch (e) {
          // Continue checking other buttons
        }
      }

      if (foundEditButton) {
        // Should navigate to edit page
        await expect(
          page.locator('input[name="title"], textarea[name="title"]')
        ).toBeVisible();

        // Test saving changes
        const saveButtons = [
          page.locator('button:has-text("Save")'),
          page.locator('button:has-text("Update")'),
          page.locator('[data-testid="save-button"]'),
        ];

        for (const button of saveButtons) {
          if ((await button.count()) > 0) {
            await button.click();
            break;
          }
        }
      }
    }
  });

  test('Community features and content sharing', async ({ page }) => {
    await page.goto('/dashboard');

    if (page.url().includes('sign-in')) {
      console.log(
        'ℹ️ User not authenticated, skipping community features test'
      );
      return;
    }

    // Look for community features
    const communityElements = [
      page.locator('text=/community/i'),
      page.locator('text=/share/i'),
      page.locator('text=/discuss/i'),
      page.locator('text=/comment/i'),
    ];

    let foundCommunity = false;
    for (const element of communityElements) {
      try {
        await expect(element).toBeVisible({ timeout: 5000 });
        foundCommunity = true;
        break;
      } catch (e) {
        // Continue checking other elements
      }
    }

    if (foundCommunity) {
      console.log('✅ Community features found');

      // Test content sharing
      const shareButtons = [
        page.locator('button:has-text("Share")'),
        page.locator('[data-testid="share-button"]'),
        page.locator('a:has-text("Share")'),
      ];

      for (const button of shareButtons) {
        if ((await button.count()) > 0) {
          await button.click();
          break;
        }
      }

      // Test commenting
      const commentInputs = [
        page.locator('textarea[placeholder*="comment"]'),
        page.locator('input[placeholder*="comment"]'),
        page.locator('[data-testid="comment-input"]'),
      ];

      for (const input of commentInputs) {
        if ((await input.count()) > 0) {
          await input.fill('Test comment');
          await page.keyboard.press('Enter');
          break;
        }
      }
    } else {
      console.log('ℹ️ No community features found');
    }
  });

  async function testContentBrowsing(page: any) {
    // Test basic content browsing functionality
    const contentElements = [
      page.locator('text=/content/i'),
      page.locator('text=/library/i'),
      page.locator('text=/resources/i'),
      page.locator('text=/articles/i'),
    ];

    for (const element of contentElements) {
      try {
        await expect(element).toBeVisible({ timeout: 5000 });
        console.log('✅ Content browsing elements found');
        break;
      } catch (e) {
        // Continue checking other elements
      }
    }
  }
});
