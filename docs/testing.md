# Testing Guide

This document outlines the testing strategy and best practices for the Alan Hirsch Digital Platform.

## Testing Philosophy

We follow a comprehensive testing approach with multiple layers:

1. **Unit Tests** - Test individual functions and components
2. **Integration Tests** - Test component interactions and API endpoints
3. **End-to-End Tests** - Test complete user workflows
4. **Visual Regression Tests** - Test UI consistency

## Testing Stack

- **Unit/Integration**: Vitest + Testing Library
- **E2E**: Playwright
- **Coverage**: Vitest Coverage
- **Mocking**: Vitest mocks + MSW

## Test Structure

```
tests/
├── setup.ts                 # Global test setup
├── e2e/                     # End-to-end tests
│   ├── global-setup.ts      # E2E global setup
│   ├── global-teardown.ts   # E2E global teardown
│   └── example.spec.ts      # Example E2E tests
├── __mocks__/               # Mock implementations
├── fixtures/                # Test data fixtures
└── utils/                   # Test utilities
```

## Unit Testing

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### API Route Testing

```typescript
import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/user/profile/route';

describe('/api/user/profile', () => {
  it('returns user profile for authenticated user', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    vi.mocked(getUserProfile).mockResolvedValue(mockUser);

    const request = new Request('http://localhost:3000/api/user/profile');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockUser);
  });
});
```

### Database Testing

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '@/lib/db/drizzle';
import { userProfiles } from '@/lib/db/schema';

describe('Database Queries', () => {
  beforeEach(async () => {
    // Clean up test data
    await db.delete(userProfiles);
  });

  it('creates user profile', async () => {
    const userData = {
      id: 'test-id',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
    };

    const result = await db.insert(userProfiles).values(userData).returning();
    expect(result[0]).toMatchObject(userData);
  });
});
```

## Integration Testing

### API Integration Tests

```typescript
import { describe, it, expect } from 'vitest';
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/user/profile/route';

describe('User Profile API Integration', () => {
  it('handles complete user profile flow', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: 'Bearer valid-token',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email');
  });
});
```

## End-to-End Testing

### Page Object Model

```typescript
// tests/e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Authentication Flow', () => {
  test('user can sign in and access dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('/sign-in');
    await loginPage.login('test@example.com', 'password123');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});
```

## Test Data Management

### Fixtures

```typescript
// tests/fixtures/users.ts
export const testUsers = {
  admin: {
    id: 'admin-id',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  regular: {
    id: 'user-id',
    email: 'user@example.com',
    firstName: 'Regular',
    lastName: 'User',
    role: 'member',
  },
};
```

### Database Seeding

```typescript
// tests/utils/seed.ts
import { db } from '@/lib/db/drizzle';
import { userProfiles } from '@/lib/db/schema';
import { testUsers } from '../fixtures/users';

export async function seedTestData() {
  await db.insert(userProfiles).values(Object.values(testUsers));
}

export async function cleanupTestData() {
  await db.delete(userProfiles);
}
```

## Mocking Strategies

### API Mocking with MSW

```typescript
// tests/__mocks__/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/user/profile', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      })
    );
  }),
];
```

### Component Mocking

```typescript
// Mock external dependencies
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(),
      signIn: vi.fn(),
    },
  })),
}));
```

## Coverage Requirements

- **Unit Tests**: 80% line coverage
- **Integration Tests**: 70% line coverage
- **E2E Tests**: Critical user paths covered

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

## Best Practices

### 1. Test Organization

- Group related tests in `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Test Data

- Use factories for test data creation
- Clean up test data after each test
- Use realistic test data

### 3. Assertions

- Use specific assertions
- Test both positive and negative cases
- Verify side effects

### 4. Performance

- Keep tests fast and focused
- Use parallel execution where possible
- Mock expensive operations

### 5. Maintenance

- Update tests when requirements change
- Remove obsolete tests
- Keep test code clean and readable

## Continuous Integration

Tests run automatically on:
- Pull request creation
- Push to main branch
- Scheduled nightly runs

## Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm run test tests/unit/Button.test.tsx

# Run tests matching pattern
npm run test -- --grep "Button component"

# Debug mode
npm run test -- --inspect-brk
```

### E2E Tests

```bash
# Run specific test
npm run test:e2e -- tests/e2e/auth.spec.ts

# Debug mode
npm run test:e2e:debug

# Run with browser visible
npm run test:e2e -- --headed
```
