// Shared Package - Shared utilities and types
// This package contains shared business logic, services, mappers, and utilities

// Export services
export * from './services';

// Export mappers
export * from './mappers';

// Export API utilities (avoid duplicate exports)
export {
  apiHelpers,
  commonSchemas,
  defaultConfig,
  middleware,
  withCORS,
  withErrorHandling,
  withInputOutputValidation,
  withPaginationValidation,
  withRateLimit,
  withValidation,
} from './api';
export type { ErrorCode } from './api/error-handler';
export type { RateLimitConfig } from './api/rate-limiter';
export type { SecurityHeaders } from './api/security';

// Export contracts (avoid duplicate exports)
export {
  type ApiError,
  // Re-export specific types to avoid conflicts
  type ApiResponse,
  type PaginatedResponse,
} from './contracts';

// Export utilities (avoid duplicate exports)
export * from './utils';

// Export forms
export * from './forms';

// Export payments
export * from './payments';

// Export assessments
export * from './assessments';

// Export auth
export * from './auth';

// Export types
export * from './types';
