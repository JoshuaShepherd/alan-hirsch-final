// Database context type definition
// This file defines the context type used throughout the database layer

/**
 * Database context type containing tenant and user information
 * Used for multi-tenancy and user-scoped operations
 */
export type Ctx = {
  /** Organization/tenant identifier */
  tenantId: string;
  /** User identifier (optional for system operations) */
  userId?: string;
  /** User role within the tenant (optional) */
  role?: string;
};

/**
 * Extended context type with additional metadata
 * Used for operations that require more context information
 */
export type ExtendedCtx = Ctx & {
  /** Request timestamp */
  timestamp?: Date;
  /** Request ID for tracing */
  requestId?: string;
  /** Additional metadata */
  metadata?: Record<string, any>;
};

/**
 * System context type for operations that don't require user context
 * Used for background jobs, system maintenance, etc.
 */
export type SystemCtx = {
  /** System operation identifier */
  operation: string;
  /** Request timestamp */
  timestamp?: Date;
  /** Request ID for tracing */
  requestId?: string;
};

/**
 * Create a database context for API operations
 */
export function getDatabaseContext(): Ctx {
  return {
    tenantId: 'default', // For now, use a default tenant
    userId: 'system', // For auth operations, use system user
    role: 'admin',
  };
}
