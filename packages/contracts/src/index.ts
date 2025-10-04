// ============================================================================
// CONTRACTS PACKAGE - UNIFIED SCHEMA SYSTEM
// ============================================================================
// This package provides the single source of truth for all data structures
// in the Alan Hirsch Digital Platform. All schemas are derived from entity
// schemas to ensure consistency and eliminate duplication.

// Entity Schemas - Single Source of Truth
export * from './entities';

// Operations - Derived from Entity Schemas
export * from './operations';

// API Contracts - Derived from Operations
export * from './api';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

// Re-export commonly used schemas for backward compatibility
export type {
  CreateUser,
  PublicUser,
  UpdateUser,
  UserEntity,
  UserForm,
  UserQuery,
} from './entities/user.schema';

export type {
  AssessmentEntity,
  AssessmentQuery,
  AssessmentQuestionEntity,
  AssessmentResponseEntity,
  AssessmentResponseQuery,
  CreateAssessment,
  CreateAssessmentQuestion,
  CreateAssessmentResponse,
  CreateUserAssessment,
  UpdateAssessment,
  UpdateAssessmentQuestion,
  UpdateAssessmentResponse,
  UpdateUserAssessment,
  UserAssessmentEntity,
  UserAssessmentQuery,
} from './entities/assessment.schema';

export type {
  CreateOrganization,
  CreateOrganizationMembership,
  OrganizationEntity,
  OrganizationForm,
  OrganizationInvitation,
  OrganizationMembershipEntity,
  OrganizationMembershipQuery,
  OrganizationQuery,
  UpdateOrganization,
  UpdateOrganizationMembership,
} from './entities/organization.schema';

export type {
  ContentCategoryEntity,
  ContentCategoryQuery,
  ContentCrossReferenceEntity,
  ContentCrossReferenceQuery,
  ContentItemEntity,
  ContentItemQuery,
  ContentSeriesEntity,
  ContentSeriesQuery,
  CreateContentCategory,
  CreateContentCrossReference,
  CreateContentItem,
  CreateContentSeries,
  UpdateContentCategory,
  UpdateContentCrossReference,
  UpdateContentItem,
  UpdateContentSeries,
} from './entities/content.schema';

// ============================================================================
// PACKAGE METADATA
// ============================================================================

export const PACKAGE_VERSION = '0.1.0';
export const PACKAGE_NAME = '@platform/contracts';

// ============================================================================
// SCHEMA VALIDATION UTILITIES
// ============================================================================

import { z } from 'zod';

/**
 * Validate data against a schema and return typed result
 */
export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
):
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: z.ZodError;
    } {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    return {
      success: false,
      error: result.error,
    };
  }
}

/**
 * Validate data against a schema and throw on error
 */
export function validateSchemaOrThrow<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}

/**
 * Check if data matches a schema without throwing
 */
export function isValidSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): data is T {
  return schema.safeParse(data).success;
}
