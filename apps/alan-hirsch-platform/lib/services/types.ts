// ============================================================================
// SERVICE CONTEXT TYPES
// ============================================================================
// Context types for service layer authorization and tenant isolation

import type { UserProfileResponse } from '@platform/contracts';

/**
 * Service Context - Contains authorization and tenant information
 * Used by all service functions for business rule enforcement
 */
export interface ServiceContext {
  /** Current user ID making the request */
  userId: string;

  /** Organization/tenant ID for multi-tenant isolation */
  tenantId?: string;

  /** User's role within the current context */
  role?: 'owner' | 'admin' | 'member' | 'viewer' | 'guest';

  /** Current user profile (cached to avoid repeated queries) */
  user?: UserProfileResponse;

  /** Request metadata */
  requestId?: string;
  timestamp?: Date;
}

/**
 * Authorization Context - Simplified context for permission checks
 */
export interface AuthContext {
  userId: string;
  tenantId?: string;
  role?: string;
}

/**
 * Service Error Types
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class NotFoundError extends ServiceError {
  constructor(resource: string, id: string) {
    super(`${resource} with ID ${id} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends ServiceError {
  constructor(message: string = 'Access forbidden') {
    super(message, 'FORBIDDEN', 403);
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends ServiceError {
  constructor(
    message: string,
    public validationErrors?: unknown[]
  ) {
    super(message, 'VALIDATION', 400);
    this.name = 'ValidationError';
  }
}

export class ConflictError extends ServiceError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
    this.name = 'ConflictError';
  }
}

/**
 * Service Result Types
 */
export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: ServiceError;
}

/**
 * Paginated Service Result
 */
export interface PaginatedServiceResult<T> {
  success: boolean;
  data?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  error?: ServiceError;
}

/**
 * Authorization Helper Functions
 */
export class AuthHelpers {
  /**
   * Check if user has required role
   */
  static hasRole(context: ServiceContext, requiredRole: string): boolean {
    if (!context.role) return false;

    const roleHierarchy = ['guest', 'viewer', 'member', 'admin', 'owner'];
    const userRoleIndex = roleHierarchy.indexOf(context.role);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

    return userRoleIndex >= requiredRoleIndex;
  }

  /**
   * Check if user is owner or admin
   */
  static isOwnerOrAdmin(context: ServiceContext): boolean {
    return context.role === 'owner' || context.role === 'admin';
  }

  /**
   * Check if user can access resource
   */
  static canAccessResource(
    context: ServiceContext,
    resourceOwnerId: string,
    requiredRole: string = 'viewer'
  ): boolean {
    // Owner can always access their own resources
    if (context.userId === resourceOwnerId) return true;

    // Check role-based access
    return this.hasRole(context, requiredRole);
  }

  /**
   * Check if user can access organization resource
   */
  static canAccessOrganizationResource(
    context: ServiceContext,
    organizationId: string,
    requiredRole: string = 'member'
  ): boolean {
    // Must have tenantId matching organizationId
    if (context.tenantId !== organizationId) return false;

    // Check role-based access
    return this.hasRole(context, requiredRole);
  }

  /**
   * Validate context has required fields
   */
  static validateContext(context: ServiceContext): void {
    if (!context.userId) {
      throw new ValidationError('User ID is required in service context');
    }
  }
}

/**
 * Service Context Builder
 */
export class ServiceContextBuilder {
  private context: Partial<ServiceContext> = {};

  static create(): ServiceContextBuilder {
    return new ServiceContextBuilder();
  }

  withUserId(userId: string): ServiceContextBuilder {
    this.context.userId = userId;
    return this;
  }

  withTenantId(tenantId: string): ServiceContextBuilder {
    this.context.tenantId = tenantId;
    return this;
  }

  withRole(role: ServiceContext['role']): ServiceContextBuilder {
    this.context.role = role;
    return this;
  }

  withUser(user: UserProfileResponse): ServiceContextBuilder {
    this.context.user = user;
    return this;
  }

  withRequestId(requestId: string): ServiceContextBuilder {
    this.context.requestId = requestId;
    return this;
  }

  build(): ServiceContext {
    AuthHelpers.validateContext(this.context as ServiceContext);
    return {
      ...this.context,
      timestamp: new Date(),
    } as ServiceContext;
  }
}
