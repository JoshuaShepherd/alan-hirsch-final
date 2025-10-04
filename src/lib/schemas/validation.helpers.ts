import { z } from 'zod';
import {
  databaseAssessmentQuestionSchema,
  databaseAssessmentResponseSchema,
  databaseAssessmentSchema,
  databaseCommunitySchema,
  databaseContentCategorySchema,
  databaseContentItemSchema,
  databaseOrganizationMembershipSchema,
  databaseOrganizationSchema,
  databaseSubscriptionPlanSchema,
  databaseUserAssessmentSchema,
  // Database schemas
  databaseUserProfileSchema,
  databaseUserSubscriptionSchema,
} from './database.schemas';

import {
  newAssessmentQuestionSchema,
  newAssessmentResponseSchema,
  newAssessmentSchema,
  newCommunitySchema,
  newContentCategorySchema,
  newContentItemSchema,
  newOrganizationMembershipSchema,
  newOrganizationSchema,
  newSubscriptionPlanSchema,
  newUserAssessmentSchema,
  // CRUD schemas
  newUserProfileSchema,
  newUserSubscriptionSchema,
  queryAssessmentQuestionSchema,
  queryAssessmentResponseSchema,
  queryAssessmentSchema,
  queryCommunitySchema,
  queryContentCategorySchema,
  queryContentItemSchema,
  queryOrganizationMembershipSchema,
  queryOrganizationSchema,
  querySubscriptionPlanSchema,
  queryUserAssessmentSchema,
  queryUserProfileSchema,
  queryUserSubscriptionSchema,
  updateAssessmentQuestionSchema,
  updateAssessmentResponseSchema,
  updateAssessmentSchema,
  updateCommunitySchema,
  updateContentCategorySchema,
  updateContentItemSchema,
  updateOrganizationMembershipSchema,
  updateOrganizationSchema,
  updateSubscriptionPlanSchema,
  updateUserAssessmentSchema,
  updateUserProfileSchema,
  updateUserSubscriptionSchema,
} from './crud.schemas';

// ============================================================================
// VALIDATION HELPER FUNCTIONS - Common validation operations
// ============================================================================

/**
 * Generic validation result type
 */
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
  errorMessage?: string;
};

/**
 * Generic validation function
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        errors: result.error,
        errorMessage: result.error.errors.map(err => err.message).join(', '),
      };
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}

/**
 * Validate multiple records at once
 */
export function validateRecords<T>(
  schema: z.ZodSchema<T>,
  records: unknown[]
): ValidationResult<T[]> {
  const results: T[] = [];
  const errors: z.ZodError[] = [];

  for (let i = 0; i < records.length; i++) {
    const result = schema.safeParse(records[i]);

    if (result.success) {
      results.push(result.data);
    } else {
      errors.push(result.error);
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      errorMessage: `Validation failed for ${errors.length} out of ${records.length} records`,
    };
  }

  return {
    success: true,
    data: results,
  };
}

// ============================================================================
// USER MANAGEMENT VALIDATION HELPERS
// ============================================================================

/**
 * Validate user profile data
 */
export function validateUserProfile(
  data: unknown
): ValidationResult<typeof databaseUserProfileSchema._type> {
  return validateData(databaseUserProfileSchema, data);
}

/**
 * Validate new user profile creation
 */
export function validateCreateUserProfile(
  data: unknown
): ValidationResult<typeof newUserProfileSchema._type> {
  return validateData(newUserProfileSchema, data);
}

/**
 * Validate user profile update
 */
export function validateUpdateUserProfile(
  data: unknown
): ValidationResult<typeof updateUserProfileSchema._type> {
  return validateData(updateUserProfileSchema, data);
}

/**
 * Validate user profile query parameters
 */
export function validateQueryUserProfile(
  data: unknown
): ValidationResult<typeof queryUserProfileSchema._type> {
  return validateData(queryUserProfileSchema, data);
}

/**
 * Validate organization data
 */
export function validateOrganization(
  data: unknown
): ValidationResult<typeof databaseOrganizationSchema._type> {
  return validateData(databaseOrganizationSchema, data);
}

/**
 * Validate new organization creation
 */
export function validateCreateOrganization(
  data: unknown
): ValidationResult<typeof newOrganizationSchema._type> {
  return validateData(newOrganizationSchema, data);
}

/**
 * Validate organization update
 */
export function validateUpdateOrganization(
  data: unknown
): ValidationResult<typeof updateOrganizationSchema._type> {
  return validateData(updateOrganizationSchema, data);
}

/**
 * Validate organization query parameters
 */
export function validateQueryOrganization(
  data: unknown
): ValidationResult<typeof queryOrganizationSchema._type> {
  return validateData(queryOrganizationSchema, data);
}

/**
 * Validate organization membership data
 */
export function validateOrganizationMembership(
  data: unknown
): ValidationResult<typeof databaseOrganizationMembershipSchema._type> {
  return validateData(databaseOrganizationMembershipSchema, data);
}

/**
 * Validate new organization membership creation
 */
export function validateCreateOrganizationMembership(
  data: unknown
): ValidationResult<typeof newOrganizationMembershipSchema._type> {
  return validateData(newOrganizationMembershipSchema, data);
}

/**
 * Validate organization membership update
 */
export function validateUpdateOrganizationMembership(
  data: unknown
): ValidationResult<typeof updateOrganizationMembershipSchema._type> {
  return validateData(updateOrganizationMembershipSchema, data);
}

/**
 * Validate organization membership query parameters
 */
export function validateQueryOrganizationMembership(
  data: unknown
): ValidationResult<typeof queryOrganizationMembershipSchema._type> {
  return validateData(queryOrganizationMembershipSchema, data);
}

// ============================================================================
// CONTENT SYSTEM VALIDATION HELPERS
// ============================================================================

/**
 * Validate content category data
 */
export function validateContentCategory(
  data: unknown
): ValidationResult<typeof databaseContentCategorySchema._type> {
  return validateData(databaseContentCategorySchema, data);
}

/**
 * Validate new content category creation
 */
export function validateCreateContentCategory(
  data: unknown
): ValidationResult<typeof newContentCategorySchema._type> {
  return validateData(newContentCategorySchema, data);
}

/**
 * Validate content category update
 */
export function validateUpdateContentCategory(
  data: unknown
): ValidationResult<typeof updateContentCategorySchema._type> {
  return validateData(updateContentCategorySchema, data);
}

/**
 * Validate content category query parameters
 */
export function validateQueryContentCategory(
  data: unknown
): ValidationResult<typeof queryContentCategorySchema._type> {
  return validateData(queryContentCategorySchema, data);
}

/**
 * Validate content item data
 */
export function validateContentItem(
  data: unknown
): ValidationResult<typeof databaseContentItemSchema._type> {
  return validateData(databaseContentItemSchema, data);
}

/**
 * Validate new content item creation
 */
export function validateCreateContentItem(
  data: unknown
): ValidationResult<typeof newContentItemSchema._type> {
  return validateData(newContentItemSchema, data);
}

/**
 * Validate content item update
 */
export function validateUpdateContentItem(
  data: unknown
): ValidationResult<typeof updateContentItemSchema._type> {
  return validateData(updateContentItemSchema, data);
}

/**
 * Validate content item query parameters
 */
export function validateQueryContentItem(
  data: unknown
): ValidationResult<typeof queryContentItemSchema._type> {
  return validateData(queryContentItemSchema, data);
}

// ============================================================================
// ASSESSMENT SYSTEM VALIDATION HELPERS
// ============================================================================

/**
 * Validate assessment data
 */
export function validateAssessment(
  data: unknown
): ValidationResult<typeof databaseAssessmentSchema._type> {
  return validateData(databaseAssessmentSchema, data);
}

/**
 * Validate new assessment creation
 */
export function validateCreateAssessment(
  data: unknown
): ValidationResult<typeof newAssessmentSchema._type> {
  return validateData(newAssessmentSchema, data);
}

/**
 * Validate assessment update
 */
export function validateUpdateAssessment(
  data: unknown
): ValidationResult<typeof updateAssessmentSchema._type> {
  return validateData(updateAssessmentSchema, data);
}

/**
 * Validate assessment query parameters
 */
export function validateQueryAssessment(
  data: unknown
): ValidationResult<typeof queryAssessmentSchema._type> {
  return validateData(queryAssessmentSchema, data);
}

/**
 * Validate assessment question data
 */
export function validateAssessmentQuestion(
  data: unknown
): ValidationResult<typeof databaseAssessmentQuestionSchema._type> {
  return validateData(databaseAssessmentQuestionSchema, data);
}

/**
 * Validate new assessment question creation
 */
export function validateCreateAssessmentQuestion(
  data: unknown
): ValidationResult<typeof newAssessmentQuestionSchema._type> {
  return validateData(newAssessmentQuestionSchema, data);
}

/**
 * Validate assessment question update
 */
export function validateUpdateAssessmentQuestion(
  data: unknown
): ValidationResult<typeof updateAssessmentQuestionSchema._type> {
  return validateData(updateAssessmentQuestionSchema, data);
}

/**
 * Validate assessment question query parameters
 */
export function validateQueryAssessmentQuestion(
  data: unknown
): ValidationResult<typeof queryAssessmentQuestionSchema._type> {
  return validateData(queryAssessmentQuestionSchema, data);
}

/**
 * Validate user assessment data
 */
export function validateUserAssessment(
  data: unknown
): ValidationResult<typeof databaseUserAssessmentSchema._type> {
  return validateData(databaseUserAssessmentSchema, data);
}

/**
 * Validate new user assessment creation
 */
export function validateCreateUserAssessment(
  data: unknown
): ValidationResult<typeof newUserAssessmentSchema._type> {
  return validateData(newUserAssessmentSchema, data);
}

/**
 * Validate user assessment update
 */
export function validateUpdateUserAssessment(
  data: unknown
): ValidationResult<typeof updateUserAssessmentSchema._type> {
  return validateData(updateUserAssessmentSchema, data);
}

/**
 * Validate user assessment query parameters
 */
export function validateQueryUserAssessment(
  data: unknown
): ValidationResult<typeof queryUserAssessmentSchema._type> {
  return validateData(queryUserAssessmentSchema, data);
}

/**
 * Validate assessment response data
 */
export function validateAssessmentResponse(
  data: unknown
): ValidationResult<typeof databaseAssessmentResponseSchema._type> {
  return validateData(databaseAssessmentResponseSchema, data);
}

/**
 * Validate new assessment response creation
 */
export function validateCreateAssessmentResponse(
  data: unknown
): ValidationResult<typeof newAssessmentResponseSchema._type> {
  return validateData(newAssessmentResponseSchema, data);
}

/**
 * Validate assessment response update
 */
export function validateUpdateAssessmentResponse(
  data: unknown
): ValidationResult<typeof updateAssessmentResponseSchema._type> {
  return validateData(updateAssessmentResponseSchema, data);
}

/**
 * Validate assessment response query parameters
 */
export function validateQueryAssessmentResponse(
  data: unknown
): ValidationResult<typeof queryAssessmentResponseSchema._type> {
  return validateData(queryAssessmentResponseSchema, data);
}

// ============================================================================
// SUBSCRIPTION & BILLING VALIDATION HELPERS
// ============================================================================

/**
 * Validate subscription plan data
 */
export function validateSubscriptionPlan(
  data: unknown
): ValidationResult<typeof databaseSubscriptionPlanSchema._type> {
  return validateData(databaseSubscriptionPlanSchema, data);
}

/**
 * Validate new subscription plan creation
 */
export function validateCreateSubscriptionPlan(
  data: unknown
): ValidationResult<typeof newSubscriptionPlanSchema._type> {
  return validateData(newSubscriptionPlanSchema, data);
}

/**
 * Validate subscription plan update
 */
export function validateUpdateSubscriptionPlan(
  data: unknown
): ValidationResult<typeof updateSubscriptionPlanSchema._type> {
  return validateData(updateSubscriptionPlanSchema, data);
}

/**
 * Validate subscription plan query parameters
 */
export function validateQuerySubscriptionPlan(
  data: unknown
): ValidationResult<typeof querySubscriptionPlanSchema._type> {
  return validateData(querySubscriptionPlanSchema, data);
}

/**
 * Validate user subscription data
 */
export function validateUserSubscription(
  data: unknown
): ValidationResult<typeof databaseUserSubscriptionSchema._type> {
  return validateData(databaseUserSubscriptionSchema, data);
}

/**
 * Validate new user subscription creation
 */
export function validateCreateUserSubscription(
  data: unknown
): ValidationResult<typeof newUserSubscriptionSchema._type> {
  return validateData(newUserSubscriptionSchema, data);
}

/**
 * Validate user subscription update
 */
export function validateUpdateUserSubscription(
  data: unknown
): ValidationResult<typeof updateUserSubscriptionSchema._type> {
  return validateData(updateUserSubscriptionSchema, data);
}

/**
 * Validate user subscription query parameters
 */
export function validateQueryUserSubscription(
  data: unknown
): ValidationResult<typeof queryUserSubscriptionSchema._type> {
  return validateData(queryUserSubscriptionSchema, data);
}

// ============================================================================
// COMMUNITY VALIDATION HELPERS
// ============================================================================

/**
 * Validate community data
 */
export function validateCommunity(
  data: unknown
): ValidationResult<typeof databaseCommunitySchema._type> {
  return validateData(databaseCommunitySchema, data);
}

/**
 * Validate new community creation
 */
export function validateCreateCommunity(
  data: unknown
): ValidationResult<typeof newCommunitySchema._type> {
  return validateData(newCommunitySchema, data);
}

/**
 * Validate community update
 */
export function validateUpdateCommunity(
  data: unknown
): ValidationResult<typeof updateCommunitySchema._type> {
  return validateData(updateCommunitySchema, data);
}

/**
 * Validate community query parameters
 */
export function validateQueryCommunity(
  data: unknown
): ValidationResult<typeof queryCommunitySchema._type> {
  return validateData(queryCommunitySchema, data);
}

// ============================================================================
// BATCH VALIDATION HELPERS
// ============================================================================

/**
 * Validate multiple user profiles
 */
export function validateUserProfiles(
  profiles: unknown[]
): ValidationResult<(typeof databaseUserProfileSchema._type)[]> {
  return validateRecords(databaseUserProfileSchema, profiles);
}

/**
 * Validate multiple content items
 */
export function validateContentItems(
  items: unknown[]
): ValidationResult<(typeof databaseContentItemSchema._type)[]> {
  return validateRecords(databaseContentItemSchema, items);
}

/**
 * Validate multiple assessments
 */
export function validateAssessments(
  assessments: unknown[]
): ValidationResult<(typeof databaseAssessmentSchema._type)[]> {
  return validateRecords(databaseAssessmentSchema, assessments);
}

/**
 * Validate multiple assessment responses
 */
export function validateAssessmentResponses(
  responses: unknown[]
): ValidationResult<(typeof databaseAssessmentResponseSchema._type)[]> {
  return validateRecords(databaseAssessmentResponseSchema, responses);
}

// ============================================================================
// ERROR HANDLING HELPERS
// ============================================================================

/**
 * Format validation errors for user display
 */
export function formatValidationErrors(error: z.ZodError): string[] {
  return error.errors.map(err => {
    const path = err.path.length > 0 ? `${err.path.join('.')}: ` : '';
    return `${path}${err.message}`;
  });
}

/**
 * Get the first validation error message
 */
export function getFirstValidationError(error: z.ZodError): string {
  const formatted = formatValidationErrors(error);
  return formatted[0] || 'Validation error';
}

/**
 * Check if a field has a specific validation error
 */
export function hasFieldError(error: z.ZodError, fieldPath: string[]): boolean {
  return error.errors.some(
    err =>
      err.path.length === fieldPath.length &&
      err.path.every((segment, index) => segment === fieldPath[index])
  );
}

/**
 * Get validation error for a specific field
 */
export function getFieldError(
  error: z.ZodError,
  fieldPath: string[]
): string | undefined {
  const fieldError = error.errors.find(
    err =>
      err.path.length === fieldPath.length &&
      err.path.every((segment, index) => segment === fieldPath[index])
  );
  return fieldError?.message;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a validation function with custom error handling
 */
export function createValidator<T>(
  schema: z.ZodSchema<T>,
  customErrorMessage?: string
) {
  return (data: unknown): ValidationResult<T> => {
    const result = validateData(schema, data);

    if (!result.success && customErrorMessage) {
      result.errorMessage = customErrorMessage;
    }

    return result;
  };
}

/**
 * Validate data and throw on failure
 */
export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(
      `Validation failed: ${result.error.errors.map(err => err.message).join(', ')}`
    );
  }

  return result.data;
}

/**
 * Validate data and return default on failure
 */
export function validateWithDefault<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  defaultValue: T
): T {
  const result = schema.safeParse(data);
  return result.success ? result.data : defaultValue;
}
