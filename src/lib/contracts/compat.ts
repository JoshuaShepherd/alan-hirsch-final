// DTO alias exports for all entities - compatibility layer
// This file provides consistent DTO naming conventions across the platform

// Re-export all DTOs from dto-aliases
export * from './dto-aliases';

// Additional validation schemas that were missing from the report
import { z } from 'zod';

// Cross-entity validation schema
export const crossEntityValidationSchema = z.object({
  entityType: z.enum([
    'user',
    'organization',
    'assessment',
    'content',
    'community',
  ]),
  entityId: z.string().uuid(),
  relatedEntityType: z
    .enum(['user', 'organization', 'assessment', 'content', 'community'])
    .optional(),
  relatedEntityId: z.string().uuid().optional(),
  validationRules: z.array(z.string()).optional(),
});

// Ministry platform error schema
export const ministryPlatformErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
  timestamp: z.string().datetime(),
  context: z
    .object({
      userId: z.string().uuid().optional(),
      organizationId: z.string().uuid().optional(),
      action: z.string().optional(),
    })
    .optional(),
});

// Role-based validation schema
export const roleBasedValidationSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid().optional(),
  requiredRoles: z.array(z.enum(['admin', 'member', 'viewer', 'owner'])),
  currentRole: z.enum(['admin', 'member', 'viewer', 'owner']).optional(),
});

// Ministry paginated response schema
export const ministryPaginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive().max(100),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  }),
  meta: z
    .object({
      organizationId: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      timestamp: z.string().datetime(),
    })
    .optional(),
});

// Ministry platform response schema
export const ministryPlatformResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z
    .object({
      code: z.string(),
      message: z.string(),
      details: z.record(z.any()).optional(),
    })
    .optional(),
  meta: z
    .object({
      organizationId: z.string().uuid().optional(),
      userId: z.string().uuid().optional(),
      timestamp: z.string().datetime(),
      requestId: z.string().uuid().optional(),
    })
    .optional(),
});

// Organization scoped request schema
export const organizationScopedRequestSchema = z.object({
  organizationId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  role: z.enum(['admin', 'member', 'viewer', 'owner']).optional(),
  permissions: z.array(z.string()).optional(),
});

// OrganizationCreateSchema is already exported from dto-aliases.ts
