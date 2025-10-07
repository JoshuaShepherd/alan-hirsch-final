/**
 * Centralized Mock Exports
 *
 * This module provides a single entry point for all test mocks,
 * making it easy to import the mocks needed for any test.
 */

// Database mocks
export {
  createMockDatabase,
  createMockDatabaseWithCount,
  createMockDatabaseWithPagination,
  createMockDatabaseWithResponses,
  createMockDatabaseWithTransaction,
  mockDatabaseConfigs,
  resetMockDatabase,
  verifyDatabaseCalls,
  type MockDatabaseConfig,
  type MockQueryResult,
} from './database';

// Supabase mocks
export {
  createMockSupabaseClient,
  createMockSupabaseClientWithRLS,
  createMockSupabaseClientWithRealtime,
  createMockSupabaseClientWithResponses,
  mockSupabaseConfigs,
  resetMockSupabaseClient,
  type MockSupabaseConfig,
} from './supabase';

// Stripe mocks
export {
  createMockStripeClient,
  createMockStripeClientWithResponses,
  createMockStripeClientWithWebhooks,
  mockStripeConfigs,
  resetMockStripeClient,
  type MockCheckoutSession,
  type MockCustomer,
  type MockStripeConfig,
  type MockSubscription,
} from './stripe';

// Enhanced testing utilities
export {
  enhancedTestDataFactories,
  generateTimestamp,
  generateUUID,
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
  ContractValidationError,
  apiValidators,
  contractValidators,
  createApiTestValidator,
} from './contract-validators';

// Re-export test utilities for convenience
export {
  cleanupTestData,
  cleanupTestUser,
  createMockDatabase as createMockDb,
  createMockStripeClient as createMockStripe,
  createMockSupabaseClient as createMockSupabase,
  createTestRequest,
  createTestUser,
  mockDatabaseResponse,
  mockSupabaseAuth,
  seedTestUser,
  testDataFactories,
} from '@/lib/test-utils';
