// ============================================================================
// CONTRACT UTILITIES
// ============================================================================
// Utilities for working with @platform/contracts schemas and types
// Provides validation, transformation, and type safety utilities

import {
  isValidSchema,
  validateSchema,
  validateSchemaOrThrow,
} from '@platform/contracts';
import type { z } from 'zod';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Create a safe validator that returns a result instead of throwing
 */
export function createSafeValidator<T>(schema: z.ZodSchema<T>) {
  return (
    data: unknown
  ): { success: true; data: T } | { success: false; error: z.ZodError } => {
    return validateSchema(schema, data);
  };
}

/**
 * Create a validator that throws on error
 */
export function createStrictValidator<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => {
    return validateSchemaOrThrow(schema, data);
  };
}

/**
 * Create a type guard validator
 */
export function createTypeGuard<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): data is T => {
    return isValidSchema(schema, data);
  };
}

// ============================================================================
// REQUEST/RESPONSE VALIDATORS
// ============================================================================

/**
 * Validate API request data
 */
export function validateApiRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  const result = validateSchema(schema, data);
  if (!result.success) {
    throw new Error(`Request validation failed: ${result.error.message}`);
  }
  return result.data;
}

/**
 * Validate API response data
 */
export function validateApiResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  const result = validateSchema(schema, data);
  if (!result.success) {
    throw new Error(`Response validation failed: ${result.error.message}`);
  }
  return result.data;
}

/**
 * Safe validate API response data (returns result instead of throwing)
 */
export function safeValidateApiResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  return validateSchema(schema, data);
}

// ============================================================================
// SCHEMA UTILITIES
// ============================================================================

/**
 * Create a partial schema from a full schema
 */
export function createPartialSchema<T>(schema: z.ZodSchema<T>) {
  return schema.partial();
}

/**
 * Create a pick schema from a full schema
 */
export function createPickSchema<T, K extends keyof T>(
  schema: z.ZodSchema<T>,
  keys: K[]
) {
  return schema.pick(Object.fromEntries(keys.map(key => [key, true])) as any);
}

/**
 * Create an omit schema from a full schema
 */
export function createOmitSchema<T, K extends keyof T>(
  schema: z.ZodSchema<T>,
  keys: K[]
) {
  return schema.omit(Object.fromEntries(keys.map(key => [key, true])) as any);
}

// ============================================================================
// TYPE EXTRACTION UTILITIES
// ============================================================================

/**
 * Extract the input type from a Zod schema
 */
export type SchemaInput<T extends z.ZodSchema> = z.input<T>;

/**
 * Extract the output type from a Zod schema
 */
export type SchemaOutput<T extends z.ZodSchema> = z.output<T>;

/**
 * Extract the inferred type from a Zod schema
 */
export type SchemaInfer<T extends z.ZodSchema> = z.infer<T>;

// ============================================================================
// CONTRACT HELPERS
// ============================================================================

/**
 * Create a contract validator that validates both request and response
 */
export function createContractValidator<TRequest, TResponse>(
  requestSchema: z.ZodSchema<TRequest>,
  responseSchema: z.ZodSchema<TResponse>
) {
  return {
    validateRequest: (data: unknown): TRequest =>
      validateApiRequest(requestSchema, data),
    validateResponse: (data: unknown): TResponse =>
      validateApiResponse(responseSchema, data),
    safeValidateRequest: (data: unknown) => validateSchema(requestSchema, data),
    safeValidateResponse: (data: unknown) =>
      validateSchema(responseSchema, data),
  };
}

/**
 * Create a paginated contract validator
 */
export function createPaginatedContractValidator<T>(
  itemSchema: z.ZodSchema<T>
) {
  const paginatedSchema = z.object({
    data: z.array(itemSchema),
    meta: z.object({
      pagination: z.object({
        page: z.number(),
        limit: z.number(),
        total: z.number(),
        total_pages: z.number(),
        has_next: z.boolean(),
        has_prev: z.boolean(),
      }),
    }),
  });

  return {
    validatePaginatedResponse: (data: unknown) =>
      validateApiResponse(paginatedSchema, data),
    safeValidatePaginatedResponse: (data: unknown) =>
      validateSchema(paginatedSchema, data),
  };
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

/**
 * Format Zod validation errors for display
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
  const errors = formatValidationErrors(error);
  return errors[0] || 'Validation failed';
}

/**
 * Check if an error is a validation error
 */
export function isValidationError(error: unknown): error is z.ZodError {
  return error instanceof z.ZodError;
}

// ============================================================================
// DEVELOPMENT UTILITIES
// ============================================================================

/**
 * Log validation errors in development
 */
export function logValidationErrors(
  context: string,
  error: z.ZodError,
  data?: unknown
): void {
  if (process.env['NODE_ENV'] === 'development') {
    console.group(`❌ Validation Error: ${context}`);
    console.error('Errors:', formatValidationErrors(error));
    if (data) {
      console.log('Data:', data);
    }
    console.groupEnd();
  }
}

/**
 * Create a development-only validator that logs errors
 */
export function createDevValidator<T>(schema: z.ZodSchema<T>, context: string) {
  return (data: unknown): T => {
    const result = validateSchema(schema, data);
    if (!result.success) {
      logValidationErrors(context, result.error, data);
      throw new Error(
        `Validation failed in ${context}: ${getFirstValidationError(result.error)}`
      );
    }
    return result.data;
  };
}
