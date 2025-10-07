// Type Guards for Database Query Results
// Provides runtime type checking for database operations

// Note: Using database types directly to avoid circular dependencies
// import type {
//   Assessment,
//   AssessmentQuestion,
//   AssessmentResponse,
//   UserAssessment,
// } from '@/lib/contracts';

// Define local types for type guards
type Assessment = any;
type AssessmentQuestion = any;
type AssessmentResponse = any;
type UserAssessment = any;

/**
 * Type guard to check if an array has at least one element
 */
export function hasResults<T>(results: T[]): results is [T, ...T[]] {
  return results.length > 0;
}

/**
 * Type guard to check if a result exists and is not undefined
 */
export function isDefined<T>(result: T | undefined): result is T {
  return result !== undefined;
}

/**
 * Type guard to check if a result exists and is not null
 */
export function isNotNull<T>(result: T | null): result is T {
  return result !== null;
}

/**
 * Type guard to check if a result exists and is not null or undefined
 */
export function exists<T>(result: T | null | undefined): result is T {
  return result !== null && result !== undefined;
}

/**
 * Type guard for assessment objects
 */
export function isAssessment(obj: any): obj is Assessment {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.slug === 'string'
  );
}

/**
 * Type guard for user assessment objects
 */
export function isUserAssessment(obj: any): obj is UserAssessment {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.userId === 'string' &&
    typeof obj.assessmentId === 'string'
  );
}

/**
 * Type guard for assessment question objects
 */
export function isAssessmentQuestion(obj: any): obj is AssessmentQuestion {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.assessmentId === 'string' &&
    typeof obj.questionText === 'string'
  );
}

/**
 * Type guard for assessment response objects
 */
export function isAssessmentResponse(obj: any): obj is AssessmentResponse {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.userAssessmentId === 'string' &&
    typeof obj.questionId === 'string'
  );
}

/**
 * Safe array access with type guard
 */
export function safeArrayAccess<T>(array: T[], index: number): T | undefined {
  return array[index];
}

/**
 * Safe array access with type guard that throws if not found
 */
export function requireArrayAccess<T>(
  array: T[],
  index: number,
  errorMessage: string
): T {
  const result = array[index];
  if (result === undefined) {
    throw new Error(errorMessage);
  }
  return result;
}

/**
 * Safe object property access with null check
 */
export function safePropertyAccess<T, K extends keyof T>(
  obj: T | null | undefined,
  key: K
): T[K] | undefined {
  return obj?.[key];
}

/**
 * Safe object property access with default value
 */
export function safePropertyAccessWithDefault<T, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
  defaultValue: T[K]
): T[K] {
  return obj?.[key] ?? defaultValue;
}
