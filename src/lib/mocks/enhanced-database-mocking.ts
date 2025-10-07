import { vi } from 'vitest';
import { createMockDatabase } from './database';

/**
 * Enhanced Database Mocking Utilities
 *
 * These utilities provide simplified, high-level patterns for mocking database
 * queries, making tests more readable and maintainable.
 */

export class EnhancedMockDatabase {
  private mockDb: any;

  constructor() {
    this.mockDb = createMockDatabase();
  }

  /**
   * Get the underlying mock database instance
   */
  get mock() {
    return this.mockDb;
  }

  // ============================================================================
  // PAGINATION MOCKING
  // ============================================================================

  /**
   * Mock a paginated query with data and count
   */
  withPaginatedQuery<T>(
    data: T[],
    options: {
      page: number;
      limit: number;
      total?: number;
    }
  ): EnhancedMockDatabase {
    const { page, limit, total = data.length } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageData = data.slice(startIndex, endIndex);

    // Mock the main data query
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              offset: vi.fn().mockResolvedValue(pageData),
            }),
          }),
        }),
      }),
    });

    // Mock the count query
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([{ count: total }]),
      }),
    });

    return this;
  }

  /**
   * Mock a paginated query with filters
   */
  withPaginatedQueryWithFilters<T>(
    data: T[],
    options: {
      page: number;
      limit: number;
      total?: number;
      filters?: Record<string, any>;
    }
  ): EnhancedMockDatabase {
    const { page, limit, total = data.length, filters = {} } = options;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageData = data.slice(startIndex, endIndex);

    // Mock the main data query with filters
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          and: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                offset: vi.fn().mockResolvedValue(pageData),
              }),
            }),
          }),
        }),
      }),
    });

    // Mock the count query with filters
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          and: vi.fn().mockResolvedValue([{ count: total }]),
        }),
      }),
    });

    return this;
  }

  // ============================================================================
  // SINGLE QUERY MOCKING
  // ============================================================================

  /**
   * Mock a single item query
   */
  withSingleQuery<T>(data: T | null): EnhancedMockDatabase {
    const result = data ? [data] : [];
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue(result),
        }),
      }),
    });

    return this;
  }

  /**
   * Mock a single item query with joins
   */
  withSingleQueryWithJoins<T>(data: T | null): EnhancedMockDatabase {
    const result = data ? [data] : [];
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        leftJoin: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue(result),
          }),
        }),
      }),
    });

    return this;
  }

  /**
   * Mock a query that returns multiple items without pagination
   */
  withMultipleQuery<T>(data: T[]): EnhancedMockDatabase {
    this.mockDb.select.mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockResolvedValue(data),
        }),
      }),
    });

    return this;
  }

  // ============================================================================
  // INSERT/UPDATE/DELETE MOCKING
  // ============================================================================

  /**
   * Mock an insert operation
   */
  withInsert<T>(data: T | T[]): EnhancedMockDatabase {
    const result = Array.isArray(data) ? data : [data];
    this.mockDb.insert.mockReturnValueOnce({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue(result),
      }),
    });

    return this;
  }

  /**
   * Mock an update operation
   */
  withUpdate<T>(data: T): EnhancedMockDatabase {
    this.mockDb.update.mockReturnValueOnce({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([data]),
        }),
      }),
    });

    return this;
  }

  /**
   * Mock a delete operation
   */
  withDelete(data: any = { deleted: true }): EnhancedMockDatabase {
    this.mockDb.delete.mockReturnValueOnce({
      where: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([data]),
      }),
    });

    return this;
  }

  // ============================================================================
  // ERROR MOCKING
  // ============================================================================

  /**
   * Mock a database error
   */
  withError(message: string = 'Database error'): EnhancedMockDatabase {
    this.mockDb.select.mockRejectedValue(new Error(message));
    return this;
  }

  /**
   * Mock a connection error
   */
  withConnectionError(): EnhancedMockDatabase {
    this.mockDb.select.mockRejectedValue(new Error('Connection failed'));
    return this;
  }

  /**
   * Mock a timeout error
   */
  withTimeoutError(): EnhancedMockDatabase {
    this.mockDb.select.mockRejectedValue(new Error('Query timeout'));
    return this;
  }

  /**
   * Mock a constraint violation error
   */
  withConstraintError(
    constraint: string = 'unique_violation'
  ): EnhancedMockDatabase {
    const error = new Error(`Constraint violation: ${constraint}`);
    (error as any).code = '23505'; // PostgreSQL unique violation code
    this.mockDb.insert.mockRejectedValue(error);
    return this;
  }

  // ============================================================================
  // TRANSACTION MOCKING
  // ============================================================================

  /**
   * Mock a successful transaction
   */
  withTransaction<T>(data: T): EnhancedMockDatabase {
    this.mockDb.transaction.mockImplementation(async (callback: any) => {
      return callback(this.mockDb);
    });

    // Set up the transaction to return the provided data
    this.mockDb.select.mockResolvedValue(data);
    this.mockDb.insert.mockResolvedValue(data);
    this.mockDb.update.mockResolvedValue(data);

    return this;
  }

  /**
   * Mock a failed transaction
   */
  withFailedTransaction(
    errorMessage: string = 'Transaction failed'
  ): EnhancedMockDatabase {
    this.mockDb.transaction.mockRejectedValue(new Error(errorMessage));
    return this;
  }

  // ============================================================================
  // VERIFICATION UTILITIES
  // ============================================================================

  /**
   * Verify that a select query was called
   */
  verifySelectCalled(): boolean {
    return this.mockDb.select.mock.calls.length > 0;
  }

  /**
   * Verify that an insert query was called
   */
  verifyInsertCalled(): boolean {
    return this.mockDb.insert.mock.calls.length > 0;
  }

  /**
   * Verify that an update query was called
   */
  verifyUpdateCalled(): boolean {
    return this.mockDb.update.mock.calls.length > 0;
  }

  /**
   * Verify that a delete query was called
   */
  verifyDeleteCalled(): boolean {
    return this.mockDb.delete.mock.calls.length > 0;
  }

  /**
   * Get all mock calls for debugging
   */
  getMockCalls() {
    return {
      select: this.mockDb.select.mock.calls,
      insert: this.mockDb.insert.mock.calls,
      update: this.mockDb.update.mock.calls,
      delete: this.mockDb.delete.mock.calls,
      transaction: this.mockDb.transaction?.mock?.calls || [],
    };
  }

  /**
   * Reset all mocks
   */
  reset(): EnhancedMockDatabase {
    vi.clearAllMocks();
    this.mockDb = createMockDatabase();
    return this;
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Create a new enhanced mock database instance
 */
export function createEnhancedMockDatabase(): EnhancedMockDatabase {
  return new EnhancedMockDatabase();
}

/**
 * Create a mock database with common APEST assessment data
 */
export function createMockDatabaseWithApestData(): EnhancedMockDatabase {
  const mockDb = new EnhancedMockDatabase();

  // Mock common APEST assessment queries
  mockDb.withSingleQuery({
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'APEST Ministry Assessment',
    slug: 'apest-ministry-assessment',
    assessmentType: 'apest',
    status: 'active',
    questionsCount: 25,
  });

  return mockDb;
}

/**
 * Create a mock database with paginated content
 */
export function createMockDatabaseWithContent(
  contentItems: any[],
  page: number = 1,
  limit: number = 10
): EnhancedMockDatabase {
  const mockDb = new EnhancedMockDatabase();
  mockDb.withPaginatedQuery(contentItems, { page, limit });
  return mockDb;
}

/**
 * Create a mock database that simulates network issues
 */
export function createMockDatabaseWithNetworkIssues(): EnhancedMockDatabase {
  const mockDb = new EnhancedMockDatabase();
  mockDb.withConnectionError();
  return mockDb;
}

// ============================================================================
// MOCK PATTERNS FOR COMMON SCENARIOS
// ============================================================================

/**
 * Common mock patterns for different API endpoints
 */
export const mockPatterns = {
  /**
   * Pattern for GET /api/assessments
   */
  assessmentsList: (
    assessments: any[],
    page: number = 1,
    limit: number = 10
  ) => {
    const mockDb = new EnhancedMockDatabase();
    return mockDb.withPaginatedQuery(assessments, { page, limit });
  },

  /**
   * Pattern for GET /api/assessments/[id]
   */
  assessmentById: (assessment: any, questions: any[] = []) => {
    const mockDb = new EnhancedMockDatabase();

    // Mock assessment query
    mockDb.withSingleQuery(assessment);

    // Mock questions query if provided
    if (questions.length > 0) {
      mockDb.withMultipleQuery(questions);
    }

    return mockDb;
  },

  /**
   * Pattern for GET /api/content
   */
  contentList: (content: any[], page: number = 1, limit: number = 10) => {
    const mockDb = new EnhancedMockDatabase();
    return mockDb.withPaginatedQuery(content, { page, limit });
  },

  /**
   * Pattern for POST /api/assessments (create)
   */
  createAssessment: (newAssessment: any, createdAssessment: any) => {
    const mockDb = new EnhancedMockDatabase();
    return mockDb.withInsert(createdAssessment);
  },

  /**
   * Pattern for PUT /api/assessments/[id] (update)
   */
  updateAssessment: (updatedAssessment: any) => {
    const mockDb = new EnhancedMockDatabase();
    return mockDb.withUpdate(updatedAssessment);
  },

  /**
   * Pattern for DELETE /api/assessments/[id]
   */
  deleteAssessment: () => {
    const mockDb = new EnhancedMockDatabase();
    return mockDb.withDelete();
  },
};
