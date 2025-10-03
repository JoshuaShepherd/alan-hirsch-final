/**
 * Centralized Mock Exports
 *
 * This module provides a single entry point for all test mocks,
 * making it easy to import the mocks needed for any test.
 */

// Database mocks
export {
  createMockDatabase,
  createMockDatabaseWithResponses,
  createMockDatabaseWithPagination,
  createMockDatabaseWithCount,
  createMockDatabaseWithTransaction,
  resetMockDatabase,
  verifyDatabaseCalls,
  mockDatabaseConfigs,
  type MockDatabaseConfig,
  type MockQueryResult,
} from './database';

// Supabase mocks
export {
  createMockSupabaseClient,
  createMockSupabaseClientWithResponses,
  createMockSupabaseClientWithRLS,
  createMockSupabaseClientWithRealtime,
  resetMockSupabaseClient,
  mockSupabaseConfigs,
  type MockSupabaseConfig,
} from './supabase';

// Stripe mocks
export {
  createMockStripeClient,
  createMockStripeClientWithResponses,
  createMockStripeClientWithWebhooks,
  resetMockStripeClient,
  mockStripeConfigs,
  type MockStripeConfig,
  type MockCustomer,
  type MockSubscription,
  type MockCheckoutSession,
} from './stripe';

// Enhanced testing utilities
export {
  enhancedTestDataFactories,
  generateUUID,
  generateTimestamp,
} from './enhanced-test-data-factories';

export {
  EnhancedMockDatabase,
  createEnhancedMockDatabase,
  createMockDatabaseWithApestData,
  createMockDatabaseWithContent,
  createMockDatabaseWithNetworkIssues,
  mockPatterns,
} from './enhanced-database-mocking';

export {
  contractValidators,
  ContractValidationError,
  createApiTestValidator,
  apiValidators,
} from './contract-validators';

// Re-export test utilities for convenience
export {
  testDataFactories,
  createTestUser,
  cleanupTestUser,
  createTestRequest,
  mockSupabaseAuth,
  mockDatabaseResponse,
  seedTestUser,
  cleanupTestData,
  createMockDatabase as createMockDb,
  createMockSupabaseClient as createMockSupabase,
  createMockStripeClient as createMockStripe,
} from '@/lib/test-utils';
