# Testing Guide for Alan Hirsch Digital Platform

## What is Testing and Why It Matters

Testing is like having a safety net for your code. Imagine you're building a bridge - you wouldn't open it to traffic without testing that it can hold weight, right? Software testing works the same way. It's a systematic way to verify that your code works correctly, catches bugs before users do, and ensures that changes don't break existing functionality.

In our context, we're building a complex platform with assessments, content management, user profiles, and more. Testing helps us ensure that:

- Users can actually take assessments without errors
- Data is saved correctly to the database
- API endpoints return the right information
- New features don't break old ones

## Our Testing Tech Stack

### Core Testing Framework: Vitest

- **What it is**: Vitest is a modern, fast testing framework built for Vite projects
- **Why we use it**: It's lightning-fast, has excellent TypeScript support, and integrates perfectly with our Next.js setup
- **What it does**: Runs our tests, provides assertions, mocking capabilities, and coverage reporting

### Testing Libraries

- **@testing-library/react**: Helps us test React components by simulating user interactions
- **@testing-library/user-event**: Simulates real user interactions (clicks, typing, etc.)
- **node-mocks-http**: Mocks HTTP requests for API testing

### Mocking Strategy

- **Database Mocking**: We mock our Drizzle database operations so tests run fast and don't need a real database
- **Supabase Mocking**: We mock Supabase client calls for authentication and data operations
- **API Mocking**: We mock external services like Stripe for payment testing

## How Our Testing Works

### Test Structure

Our tests are organized in the `__tests__` directory:

```
__tests__/
├── api/           # API endpoint tests
├── db/            # Database integration tests
├── mocks/         # Mock utilities and factories
└── simple.test.ts # Basic functionality tests
```

### Test Types We Use

#### 1. Unit Tests

- **What**: Test individual functions or components in isolation
- **Example**: Testing that an assessment scoring algorithm calculates correctly
- **Speed**: Very fast (milliseconds)

#### 2. Integration Tests

- **What**: Test how different parts work together
- **Example**: Testing that an API endpoint correctly saves data to the database
- **Speed**: Fast (seconds)

#### 3. API Tests

- **What**: Test our REST API endpoints
- **Example**: Testing that `/api/assessments` returns the correct data format
- **Speed**: Fast (seconds)

#### 4. Contract Tests

- **What**: Verify that our API responses match our defined contracts (Zod schemas)
- **Example**: Ensuring assessment responses have all required fields
- **Speed**: Very fast

### Contracts as Single Source of Truth

Our `lib/contracts/` directory is crucial - it contains:

- **Zod schemas**: Define the exact shape of data going in/out of APIs
- **TypeScript types**: Auto-generated from schemas for type safety
- **Request/Response DTOs**: Standardized data transfer objects

This means:

1. Our API responses MUST match the contract schemas
2. Our tests verify this compliance
3. Frontend and backend are guaranteed to work together
4. Changes to contracts automatically update types everywhere

## Current Test Status Analysis

### ✅ What's Working Well

1. **Test Infrastructure**: All 27 tests are passing
2. **Mock System**: Comprehensive mocking for database, Supabase, and external services
3. **Contract Compliance**: Tests use contract-compliant data factories
4. **Coverage**: Tests cover API endpoints, database operations, and basic functionality

### 🔧 Areas for Improvement

1. **Test Data Factories**: Some inconsistencies in mock data generation
2. **Database Mocking**: Complex chaining could be simplified
3. **Contract Validation**: Could be more explicit in test assertions
4. **Error Scenarios**: Need more tests for failure cases

## Test Data Factories

We use factory functions to create consistent test data:

```typescript
// Example: Creating test assessment data
const mockAssessment = testDataFactories.assessmentResponse({
  id: 'test-assessment-1',
  name: 'APEST Ministry Assessment',
  assessmentType: 'apest',
  status: 'active',
  questionsCount: 25,
  researchBacked: true,
});
```

This ensures:

- Consistent data structure across tests
- Easy to modify test scenarios
- Compliance with contract schemas

## Database Mocking Strategy

Our database mocking creates a fake database that:

- Responds with predictable data
- Simulates real query chains (select → from → where → limit)
- Can be configured for different scenarios (success, error, pagination)

```typescript
// Example: Mocking a paginated query
db.select.mockReturnValueOnce({
  from: vi.fn().mockReturnValue({
    where: vi.fn().mockReturnValue({
      orderBy: vi.fn().mockReturnValue({
        limit: vi.fn().mockReturnValue({
          offset: vi.fn().mockResolvedValue(mockData),
        }),
      }),
    }),
  }),
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Use Descriptive Test Names**: "should return 404 for non-existent assessment" is better than "test 404"
3. **Arrange-Act-Assert**: Structure tests clearly with setup, action, and verification
4. **Mock External Dependencies**: Keep tests fast and isolated
5. **Test Edge Cases**: Don't just test the happy path
6. **Keep Tests Simple**: One concept per test

## Common Test Patterns

### API Endpoint Testing

```typescript
it('should return assessments with correct structure', async () => {
  // Arrange: Set up mock data
  const mockAssessments = [testDataFactories.assessmentResponse()];

  // Act: Make the API call
  const response = await getAssessments(request);
  const data = await response.json();

  // Assert: Verify the response
  expect(response.status).toBe(200);
  expect(data.success).toBe(true);
  expect(Array.isArray(data.items.data)).toBe(true);
});
```

### Database Operation Testing

```typescript
it('should save assessment responses correctly', async () => {
  // Mock database insert
  db.insert.mockReturnValueOnce({
    values: vi.fn().mockReturnValue({
      returning: vi.fn().mockResolvedValue([savedResponse]),
    }),
  });

  // Test the operation
  const result = await saveAssessmentResponse(responseData);

  // Verify database was called correctly
  expect(db.insert).toHaveBeenCalledWith(expect.any(Object));
});
```

## Troubleshooting Common Issues

### Tests Hanging

- Usually caused by unresolved promises or infinite loops in mocks
- Check that all async operations are properly awaited
- Ensure mocks return resolved/rejected promises

### Mock Not Working

- Verify mock is set up before importing the module being tested
- Check that mock functions return the expected chain structure
- Use `vi.clearAllMocks()` in `beforeEach` to reset state

### Type Errors

- Ensure test data matches contract schemas
- Use proper TypeScript types from contracts
- Check that mock return types match expected interfaces

## Next Steps for Improvement

1. **Expand Error Testing**: Add more tests for failure scenarios
2. **Performance Testing**: Add tests for query performance
3. **E2E Testing**: Implement end-to-end tests with Playwright
4. **Contract Testing**: Add explicit contract validation tests
5. **Test Documentation**: Add more inline documentation for complex tests

This testing setup gives us confidence that our platform works correctly and continues to work as we add new features. It's an investment in code quality and developer productivity.
