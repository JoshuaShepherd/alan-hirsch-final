// Type Guards for Database Query Results
// Provides runtime type checking for database operations
/**
 * Type guard to check if an array has at least one element
 */
export function hasResults(results) {
    return results.length > 0;
}
/**
 * Type guard to check if a result exists and is not undefined
 */
export function isDefined(result) {
    return result !== undefined;
}
/**
 * Type guard to check if a result exists and is not null
 */
export function isNotNull(result) {
    return result !== null;
}
/**
 * Type guard to check if a result exists and is not null or undefined
 */
export function exists(result) {
    return result !== null && result !== undefined;
}
/**
 * Type guard for assessment objects
 */
export function isAssessment(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.slug === 'string');
}
/**
 * Type guard for user assessment objects
 */
export function isUserAssessment(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.userId === 'string' &&
        typeof obj.assessmentId === 'string');
}
/**
 * Type guard for assessment question objects
 */
export function isAssessmentQuestion(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.assessmentId === 'string' &&
        typeof obj.questionText === 'string');
}
/**
 * Type guard for assessment response objects
 */
export function isAssessmentResponse(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj.id === 'string' &&
        typeof obj.userAssessmentId === 'string' &&
        typeof obj.questionId === 'string');
}
/**
 * Safe array access with type guard
 */
export function safeArrayAccess(array, index) {
    return array[index];
}
/**
 * Safe array access with type guard that throws if not found
 */
export function requireArrayAccess(array, index, errorMessage) {
    const result = array[index];
    if (result === undefined) {
        throw new Error(errorMessage);
    }
    return result;
}
/**
 * Safe object property access with null check
 */
export function safePropertyAccess(obj, key) {
    return obj?.[key];
}
/**
 * Safe object property access with default value
 */
export function safePropertyAccessWithDefault(obj, key, defaultValue) {
    return obj?.[key] ?? defaultValue;
}
//# sourceMappingURL=type-guards.js.map