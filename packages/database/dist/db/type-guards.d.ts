import type { Assessment, AssessmentQuestion, UserAssessment, AssessmentResponse } from '@/lib/contracts';
/**
 * Type guard to check if an array has at least one element
 */
export declare function hasResults<T>(results: T[]): results is [T, ...T[]];
/**
 * Type guard to check if a result exists and is not undefined
 */
export declare function isDefined<T>(result: T | undefined): result is T;
/**
 * Type guard to check if a result exists and is not null
 */
export declare function isNotNull<T>(result: T | null): result is T;
/**
 * Type guard to check if a result exists and is not null or undefined
 */
export declare function exists<T>(result: T | null | undefined): result is T;
/**
 * Type guard for assessment objects
 */
export declare function isAssessment(obj: any): obj is Assessment;
/**
 * Type guard for user assessment objects
 */
export declare function isUserAssessment(obj: any): obj is UserAssessment;
/**
 * Type guard for assessment question objects
 */
export declare function isAssessmentQuestion(obj: any): obj is AssessmentQuestion;
/**
 * Type guard for assessment response objects
 */
export declare function isAssessmentResponse(obj: any): obj is AssessmentResponse;
/**
 * Safe array access with type guard
 */
export declare function safeArrayAccess<T>(array: T[], index: number): T | undefined;
/**
 * Safe array access with type guard that throws if not found
 */
export declare function requireArrayAccess<T>(array: T[], index: number, errorMessage: string): T;
/**
 * Safe object property access with null check
 */
export declare function safePropertyAccess<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined;
/**
 * Safe object property access with default value
 */
export declare function safePropertyAccessWithDefault<T, K extends keyof T>(obj: T | null | undefined, key: K, defaultValue: T[K]): T[K];
//# sourceMappingURL=type-guards.d.ts.map