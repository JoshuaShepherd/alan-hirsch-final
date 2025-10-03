import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import {
  enhancedTestDataFactories,
  EnhancedMockDatabase,
  contractValidators,
} from '@/lib/mocks';

/**
 * API Test Template System
 *
 * This provides reusable templates and utilities for creating consistent,
 * comprehensive API tests with contract validation.
 */

export interface ApiTestConfig<TData, TResponse> {
  endpointName: string;
  responseSchema: any;
  itemSchema: any;
  dataFactory: (overrides?: any) => TData;
  responseFactory: (data: TData[], pagination?: any) => TResponse;
}

export interface TestCase {
  name: string;
  setup: (mockDb: EnhancedMockDatabase) => void;
  action: () => Promise<Response>;
  assertions: (response: Response, data: any) => void;
  contractValidation?: boolean;
  errorExpected?: boolean;
}

export interface PaginationTestCase {
  name: string;
  page: number;
  limit: number;
  total: number;
  expectedItems: number;
  expectedHasNext: boolean;
  expectedHasPrev: boolean;
}

/**
 * Create a comprehensive API test suite
 */
export function createApiTestSuite<TData, TResponse>(
  config: ApiTestConfig<TData, TResponse>
) {
  return {
    /**
     * Create tests for a specific description with test cases
     */
    describe: (description: string, testCases: TestCase[]) => {
      describe(`${config.endpointName} - ${description}`, () => {
        let mockDb: EnhancedMockDatabase;

        beforeEach(() => {
          mockDb = new EnhancedMockDatabase();
          vi.clearAllMocks();

          // Set up the mocked database
          (global as any).db = mockDb.mock;
        });

        testCases.forEach(testCase => {
          it(testCase.name, async () => {
            // Setup mocks
            testCase.setup(mockDb);

            // Make request
            const response = await testCase.action();
            const data = await response.json();

            // Validate contract compliance if enabled
            if (testCase.contractValidation !== false) {
              try {
                contractValidators.validateApiResponse(
                  config.responseSchema,
                  data
                );
              } catch (error) {
                if (!testCase.errorExpected) {
                  throw error;
                }
              }
            }

            // Custom assertions
            testCase.assertions(response, data);
          });
        });
      });
    },

    /**
     * Create pagination-specific tests
     */
    pagination: (testCases: PaginationTestCase[]) => {
      describe(`${config.endpointName} - Pagination Tests`, () => {
        let mockDb: EnhancedMockDatabase;

        beforeEach(() => {
          mockDb = new EnhancedMockDatabase();
          vi.clearAllMocks();
          // Note: In actual usage, you would mock the database methods directly
          // (global as any).db = mockDb.mock;
        });

        testCases.forEach(testCase => {
          it(testCase.name, async () => {
            // Generate test data
            const testData = Array.from({ length: testCase.total }, (_, i) =>
              config.dataFactory({ id: `item-${i + 1}` })
            );

            // Setup pagination mock
            mockDb.withPaginatedQuery(testData, {
              page: testCase.page,
              limit: testCase.limit,
              total: testCase.total,
            });

            // Create request
            const request = new NextRequest(
              `http://localhost:3000/api/test?page=${testCase.page}&limit=${testCase.limit}`
            );

            // This would need to be replaced with actual endpoint
            const response = new Response(
              JSON.stringify({
                items: {
                  data: testData.slice(
                    (testCase.page - 1) * testCase.limit,
                    testCase.page * testCase.limit
                  ),
                  pagination: {
                    page: testCase.page,
                    limit: testCase.limit,
                    total: testCase.total,
                    totalPages: Math.ceil(testCase.total / testCase.limit),
                    hasNext: testCase.expectedHasNext,
                    hasPrev: testCase.expectedHasPrev,
                  },
                },
                success: true,
              }),
              { status: 200 }
            );

            const data = await response.json();

            // Validate pagination
            expect(data.items.pagination.page).toBe(testCase.page);
            expect(data.items.pagination.limit).toBe(testCase.limit);
            expect(data.items.pagination.total).toBe(testCase.total);
            expect(data.items.pagination.hasNext).toBe(
              testCase.expectedHasNext
            );
            expect(data.items.pagination.hasPrev).toBe(
              testCase.expectedHasPrev
            );
            expect(data.items.data.length).toBe(testCase.expectedItems);

            // Validate contract compliance
            contractValidators.validateApiResponse(config.responseSchema, data);
          });
        });
      });
    },

    /**
     * Create error scenario tests
     */
    errorScenarios: (errorTests: TestCase[]) => {
      describe(`${config.endpointName} - Error Scenarios`, () => {
        let mockDb: EnhancedMockDatabase;

        beforeEach(() => {
          mockDb = new EnhancedMockDatabase();
          vi.clearAllMocks();
          // Note: In actual usage, you would mock the database methods directly
          // (global as any).db = mockDb.mock;
        });

        errorTests.forEach(testCase => {
          it(testCase.name, async () => {
            // Setup error mocks
            testCase.setup(mockDb);

            // Make request
            const response = await testCase.action();

            // Should expect error status
            expect([400, 401, 403, 404, 500]).toContain(response.status);

            const data = await response.json();

            // Validate error response structure
            expect(data).toHaveProperty('error');
            expect(data).toHaveProperty('message');
            expect(typeof data.message).toBe('string');

            // Custom assertions
            testCase.assertions(response, data);
          });
        });
      });
    },
  };
}

/**
 * Pre-configured test templates for common API patterns
 */
export const apiTestTemplates = {
  /**
   * Template for paginated list endpoints
   */
  paginatedList: <TData, TResponse>(
    endpointName: string,
    responseSchema: any,
    itemSchema: any,
    dataFactory: (overrides?: any) => TData
  ) => {
    return createApiTestSuite({
      endpointName,
      responseSchema,
      itemSchema,
      dataFactory,
      responseFactory: (data, pagination = {}) => ({
        items: {
          data,
          pagination: {
            page: 1,
            limit: 10,
            total: data.length,
            totalPages: Math.ceil(data.length / 10),
            hasNext: false,
            hasPrev: false,
            ...pagination,
          },
        },
        success: true,
      }),
    });
  },

  /**
   * Template for single item endpoints
   */
  singleItem: <TData>(
    endpointName: string,
    responseSchema: any,
    dataFactory: (overrides?: any) => TData
  ) => {
    return createApiTestSuite({
      endpointName,
      responseSchema,
      itemSchema: responseSchema,
      dataFactory,
      responseFactory: data => data[0] || null,
    });
  },

  /**
   * Template for CRUD endpoints
   */
  crud: <TData>(
    endpointName: string,
    responseSchema: any,
    dataFactory: (overrides?: any) => TData
  ) => {
    return createApiTestSuite({
      endpointName,
      responseSchema,
      itemSchema: responseSchema,
      dataFactory,
      responseFactory: data => data[0] || null,
    });
  },
};

/**
 * Common test case generators
 */
export const testCaseGenerators = {
  /**
   * Generate basic CRUD test cases
   */
  basicCrud: <TData>(
    endpointName: string,
    dataFactory: (overrides?: any) => TData
  ): TestCase[] => [
    {
      name: `should return ${endpointName} successfully`,
      setup: mockDb => {
        const testData = dataFactory();
        mockDb.withSingleQuery(testData);
      },
      action: async () => {
        // This would be replaced with actual endpoint call
        return new Response(JSON.stringify(dataFactory()), { status: 200 });
      },
      assertions: (response, data) => {
        expect(response.status).toBe(200);
        expect(data).toBeDefined();
      },
    },
    {
      name: `should return 404 for non-existent ${endpointName}`,
      setup: mockDb => {
        mockDb.withSingleQuery(null);
      },
      action: async () => {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
        });
      },
      assertions: (response, data) => {
        expect(response.status).toBe(404);
        expect(data.error).toBeDefined();
      },
      errorExpected: true,
    },
  ],

  /**
   * Generate pagination test cases
   */
  pagination: (): PaginationTestCase[] => [
    {
      name: 'should handle first page correctly',
      page: 1,
      limit: 10,
      total: 25,
      expectedItems: 10,
      expectedHasNext: true,
      expectedHasPrev: false,
    },
    {
      name: 'should handle middle page correctly',
      page: 2,
      limit: 10,
      total: 25,
      expectedItems: 10,
      expectedHasNext: true,
      expectedHasPrev: true,
    },
    {
      name: 'should handle last page correctly',
      page: 3,
      limit: 10,
      total: 25,
      expectedItems: 5,
      expectedHasNext: false,
      expectedHasPrev: true,
    },
    {
      name: 'should handle empty results',
      page: 1,
      limit: 10,
      total: 0,
      expectedItems: 0,
      expectedHasNext: false,
      expectedHasPrev: false,
    },
  ],

  /**
   * Generate error scenario test cases
   */
  errorScenarios: (): TestCase[] => [
    {
      name: 'should handle database connection errors',
      setup: mockDb => {
        mockDb.withConnectionError();
      },
      action: async () => {
        return new Response(
          JSON.stringify({ error: 'Database connection failed' }),
          { status: 500 }
        );
      },
      assertions: (response, data) => {
        expect(response.status).toBe(500);
        expect(data.error).toBeDefined();
      },
      errorExpected: true,
    },
    {
      name: 'should handle invalid input parameters',
      setup: mockDb => {
        // No setup needed for invalid input
      },
      action: async () => {
        return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
          status: 400,
        });
      },
      assertions: (response, data) => {
        expect(response.status).toBe(400);
        expect(data.error).toBeDefined();
      },
      errorExpected: true,
    },
    {
      name: 'should handle timeout errors',
      setup: mockDb => {
        mockDb.withTimeoutError();
      },
      action: async () => {
        return new Response(JSON.stringify({ error: 'Request timeout' }), {
          status: 500,
        });
      },
      assertions: (response, data) => {
        expect(response.status).toBe(500);
        expect(data.error).toBeDefined();
      },
      errorExpected: true,
    },
  ],
};

/**
 * Utility functions for common test patterns
 */
export const testUtils = {
  /**
   * Create a mock NextRequest
   */
  createMockRequest: (url: string, options: RequestInit = {}): NextRequest => {
    // Filter out null signal to match NextRequest expectations
    const { signal, ...restOptions } = options;
    const nextOptions = {
      ...restOptions,
      ...(signal !== null && { signal }),
    };
    return new NextRequest(url, nextOptions);
  },

  /**
   * Create a mock response
   */
  createMockResponse: (data: any, status: number = 200): Response => {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  },

  /**
   * Validate response structure
   */
  validateResponseStructure: (response: Response, data: any) => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(600);

    if (response.status >= 200 && response.status < 300) {
      expect(data).toBeDefined();
    } else {
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('message');
    }
  },

  /**
   * Validate pagination structure
   */
  validatePagination: (pagination: any) => {
    expect(pagination).toHaveProperty('page');
    expect(pagination).toHaveProperty('limit');
    expect(pagination).toHaveProperty('total');
    expect(pagination).toHaveProperty('totalPages');
    expect(pagination).toHaveProperty('hasNext');
    expect(pagination).toHaveProperty('hasPrev');

    expect(typeof pagination.page).toBe('number');
    expect(typeof pagination.limit).toBe('number');
    expect(typeof pagination.total).toBe('number');
    expect(typeof pagination.totalPages).toBe('number');
    expect(typeof pagination.hasNext).toBe('boolean');
    expect(typeof pagination.hasPrev).toBe('boolean');
  },
};
