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
// PACKAGE METADATA
// ============================================================================
export const PACKAGE_VERSION = '0.1.0';
export const PACKAGE_NAME = '@platform/contracts';
/**
 * Validate data against a schema and return typed result
 */
export function validateSchema(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    }
    else {
        return {
            success: false,
            error: result.error,
        };
    }
}
/**
 * Validate data against a schema and throw on error
 */
export function validateSchemaOrThrow(schema, data) {
    return schema.parse(data);
}
/**
 * Check if data matches a schema without throwing
 */
export function isValidSchema(schema, data) {
    return schema.safeParse(data).success;
}
//# sourceMappingURL=index.js.map