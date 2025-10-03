import { vi } from 'vitest';
import type { testDataFactories } from '@/lib/test-utils';

/**
 * Centralized Database Mock Utilities
 *
 * This module provides consistent database mocking patterns for all tests.
 * It ensures that database mocks behave predictably and can be easily
 * configured for different test scenarios.
 *
 * Based on Drizzle ORM patterns from contracts and mappers as SSOT.
 */

export interface MockDatabaseConfig {
  shouldThrowError?: boolean;
  errorMessage?: string;
  delay?: number;
}

export interface MockQueryResult<T = any> {
  data: T[];
  error: any;
  count?: number;
}

/**
 * Creates a mock query builder that properly chains Drizzle ORM methods
 */
function createMockQueryBuilder<T = any>(finalResult: T[] = []) {
  const mockQueryBuilder = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    leftJoin: vi.fn().mockReturnThis(),
    rightJoin: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    groupBy: vi.fn().mockReturnThis(),
    having: vi.fn().mockReturnThis(),
    and: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    // Final execution methods that return actual data
    then: vi.fn().mockResolvedValue(finalResult),
    // For direct await calls
    [Symbol.toStringTag]: 'Promise',
  };

  // Make it thenable for async/await
  return Object.assign(mockQueryBuilder, {
    then: vi.fn().mockResolvedValue(finalResult),
  });
}

/**
 * Creates a mock insert query builder
 */
function createMockInsertBuilder<T = any>(finalResult: T[] = []) {
  return {
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue(finalResult),
    onConflictDoNothing: vi.fn().mockReturnThis(),
    onConflictDoUpdate: vi.fn().mockReturnThis(),
    // For direct await calls
    then: vi.fn().mockResolvedValue(finalResult),
  };
}

/**
 * Creates a mock update query builder
 */
function createMockUpdateBuilder<T = any>(finalResult: T[] = []) {
  return {
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue(finalResult),
    // For direct await calls
    then: vi.fn().mockResolvedValue(finalResult),
  };
}

/**
 * Creates a mock delete query builder
 */
function createMockDeleteBuilder<T = any>(finalResult: T[] = []) {
  return {
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue(finalResult),
    // For direct await calls
    then: vi.fn().mockResolvedValue(finalResult),
  };
}

/**
 * Creates a mock database instance with configurable behavior
 * Implements proper Drizzle ORM method chaining
 */
export function createMockDatabase(config: MockDatabaseConfig = {}) {
  const {
    shouldThrowError = false,
    errorMessage = 'Database error',
    delay = 0,
  } = config;

  const mockDb = {
    // SELECT operations
    select: vi.fn().mockImplementation(() => createMockQueryBuilder()),

    // INSERT operations
    insert: vi.fn().mockImplementation(() => createMockInsertBuilder()),

    // UPDATE operations
    update: vi.fn().mockImplementation(() => createMockUpdateBuilder()),

    // DELETE operations
    delete: vi.fn().mockImplementation(() => createMockDeleteBuilder()),

    // Direct methods for backward compatibility
    returning: vi.fn().mockResolvedValue([]),
    limit: vi.fn().mockResolvedValue([]),
    offset: vi.fn().mockResolvedValue([]),
    orderBy: vi.fn().mockResolvedValue([]),
    from: vi.fn().mockResolvedValue([]),
    where: vi.fn().mockResolvedValue([]),

    // Transaction support
    transaction: vi.fn().mockImplementation(async callback => {
      if (shouldThrowError) {
        throw new Error(errorMessage);
      }
      // Create a transaction mock that behaves like the main db
      const txMock = createMockDatabase({ ...config, shouldThrowError: false });
      return await callback(txMock);
    }),
  };

  // Configure mock behavior based on config
  if (shouldThrowError) {
    const errorFn = vi.fn().mockRejectedValue(new Error(errorMessage));
    mockDb.select.mockImplementation(() => {
      const builder = createMockQueryBuilder();
      builder.then = errorFn;
      return builder;
    });
    mockDb.insert.mockImplementation(() => {
      const builder = createMockInsertBuilder();
      builder.returning = errorFn;
      return builder;
    });
    mockDb.update.mockImplementation(() => {
      const builder = createMockUpdateBuilder();
      builder.returning = errorFn;
      return builder;
    });
    mockDb.delete.mockImplementation(() => {
      const builder = createMockDeleteBuilder();
      builder.returning = errorFn;
      return builder;
    });
  }

  return mockDb;
}

/**
 * Creates a mock database with predefined responses for common queries
 */
export function createMockDatabaseWithResponses<T = any>(
  responses: Record<string, T[]>,
  config: MockDatabaseConfig = {}
) {
  const mockDb = createMockDatabase(config);
  let callCount = 0;

  // Get the next response in sequence
  const getNextResponse = () => {
    const responseKeys = Object.keys(responses);
    if (responseKeys.length === 0) return [];
    const responseKey = responseKeys[callCount % responseKeys.length];
    callCount++;
    return responses[responseKey as keyof typeof responses] || [];
  };

  // Override the query builders to return predefined responses
  mockDb.select.mockImplementation(() => {
    const result = getNextResponse();
    return createMockQueryBuilder(result);
  });

  mockDb.insert.mockImplementation(() => {
    const result = getNextResponse();
    return createMockInsertBuilder(result);
  });

  mockDb.update.mockImplementation(() => {
    const result = getNextResponse();
    return createMockUpdateBuilder(result);
  });

  mockDb.delete.mockImplementation(() => {
    const result = getNextResponse();
    return createMockDeleteBuilder(result);
  });

  return mockDb;
}

/**
 * Creates a mock database that simulates pagination
 */
export function createMockDatabaseWithPagination<T = any>(
  allData: T[],
  pageSize: number = 10
) {
  const mockDb = createMockDatabase();
  let currentPage = 0;

  // Override select to handle pagination
  mockDb.select.mockImplementation(() => {
    const queryBuilder = createMockQueryBuilder();

    // Override limit to return paginated data
    queryBuilder.limit = vi.fn().mockImplementation((limit: number) => {
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + limit;
      const pageData = allData.slice(startIndex, endIndex);
      return createMockQueryBuilder(pageData);
    });

    // Override offset to track current page
    queryBuilder.offset = vi.fn().mockImplementation((offset: number) => {
      currentPage = Math.floor(offset / pageSize);
      return queryBuilder;
    });

    return queryBuilder;
  });

  return mockDb;
}

/**
 * Creates a mock database that simulates count queries
 */
export function createMockDatabaseWithCount<T = any>(
  data: T[],
  count: number = data.length
) {
  const mockDb = createMockDatabase();

  // Configure the mock to return different results based on the query
  mockDb.select.mockImplementation((fields?: any) => {
    const queryBuilder = createMockQueryBuilder();

    // Check if this is a count query
    if (fields && typeof fields === 'object' && 'count' in fields) {
      // Return count result
      return createMockQueryBuilder([{ count }]);
    }

    // Return regular data
    return createMockQueryBuilder(data);
  });

  return mockDb;
}

/**
 * Creates a mock database that simulates transaction behavior
 */
export function createMockDatabaseWithTransaction<T = any>(
  data: T[],
  shouldRollback: boolean = false
) {
  const mockDb = createMockDatabase();

  const mockTransaction = vi
    .fn()
    .mockImplementation(async (callback: (tx: any) => Promise<any>) => {
      if (shouldRollback) {
        throw new Error('Transaction rolled back');
      }

      // Create a transaction mock that behaves like the main db
      const txMock = createMockDatabase();

      // Configure transaction mock to return the specified data
      txMock.select.mockImplementation(() => createMockQueryBuilder(data));
      txMock.insert.mockImplementation(() => createMockInsertBuilder(data));
      txMock.update.mockImplementation(() => createMockUpdateBuilder(data));
      txMock.delete.mockImplementation(() => createMockDeleteBuilder(data));

      return await callback(txMock);
    });

  mockDb.transaction = mockTransaction;

  return mockDb;
}

/**
 * Utility to reset all mocks in a database mock
 */
export function resetMockDatabase(mockDb: any) {
  Object.keys(mockDb).forEach(key => {
    const method = mockDb[key as keyof typeof mockDb];
    if (vi.isMockFunction(method)) {
      method.mockClear();
    }
  });
}

/**
 * Utility to verify database calls
 */
export function verifyDatabaseCalls(mockDb: any, expectedCalls: string[]) {
  expectedCalls.forEach(call => {
    const method = mockDb[call as keyof typeof mockDb];
    if (method) {
      expect(method).toHaveBeenCalled();
    }
  });
}

/**
 * Common mock database configurations for different test scenarios
 */
export const mockDatabaseConfigs = {
  // Success scenarios
  success: (data: any[] = []) =>
    createMockDatabaseWithResponses({ default: data }),

  // Error scenarios
  connectionError: () =>
    createMockDatabase({
      shouldThrowError: true,
      errorMessage: 'Connection failed',
    }),

  constraintError: () =>
    createMockDatabase({
      shouldThrowError: true,
      errorMessage: 'Unique constraint violation',
    }),

  foreignKeyError: () =>
    createMockDatabase({
      shouldThrowError: true,
      errorMessage: 'Foreign key constraint violation',
    }),

  // Pagination scenarios
  paginated: (data: any[], pageSize: number = 10) =>
    createMockDatabaseWithPagination(data, pageSize),

  // Count scenarios
  withCount: (data: any[], count?: number) =>
    createMockDatabaseWithCount(data, count),

  // Transaction scenarios
  withTransaction: (data: any[], shouldRollback: boolean = false) =>
    createMockDatabaseWithTransaction(data, shouldRollback),
};
