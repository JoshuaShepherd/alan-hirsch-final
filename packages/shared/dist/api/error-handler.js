import { NextResponse } from 'next/server';
import { z } from 'zod';
// Error types
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    ErrorCode["AUTHORIZATION_ERROR"] = "AUTHORIZATION_ERROR";
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["CONFLICT"] = "CONFLICT";
    ErrorCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["DATABASE_ERROR"] = "DATABASE_ERROR";
    ErrorCode["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
})(ErrorCode || (ErrorCode = {}));
// Custom error class
export class ApiError extends Error {
    code;
    statusCode;
    details;
    constructor(message, code = ErrorCode.INTERNAL_SERVER_ERROR, statusCode = 500, details) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
    }
}
// Error response schema
export const errorResponseSchema = z.object({
    error: z.string(),
    message: z.string(),
    code: z.nativeEnum(ErrorCode),
    details: z.any().optional(),
    timestamp: z.string(),
    path: z.string().optional()
});
// Error handler function
export function handleApiError(error, path) {
    console.error('API Error:', error);
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
        return NextResponse.json({
            error: 'Validation failed',
            message: 'Request data is invalid',
            code: ErrorCode.VALIDATION_ERROR,
            details: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
                code: err.code
            })),
            timestamp: new Date().toISOString(),
            path
        }, { status: 400 });
    }
    // Handle custom API errors
    if (error instanceof ApiError) {
        return NextResponse.json({
            error: error.message,
            message: error.message,
            code: error.code,
            details: error.details,
            timestamp: new Date().toISOString(),
            path
        }, { status: error.statusCode });
    }
    // Handle database errors
    if (error && typeof error === 'object' && 'code' in error) {
        const dbError = error;
        // PostgreSQL error codes
        if (dbError.code === '23505') { // Unique violation
            return NextResponse.json({
                error: 'Conflict',
                message: 'Resource already exists',
                code: ErrorCode.CONFLICT,
                details: { constraint: dbError.constraint },
                timestamp: new Date().toISOString(),
                path
            }, { status: 409 });
        }
        if (dbError.code === '23503') { // Foreign key violation
            return NextResponse.json({
                error: 'Invalid reference',
                message: 'Referenced resource does not exist',
                code: ErrorCode.VALIDATION_ERROR,
                details: { constraint: dbError.constraint },
                timestamp: new Date().toISOString(),
                path
            }, { status: 400 });
        }
        if (dbError.code === '23502') { // Not null violation
            return NextResponse.json({
                error: 'Validation failed',
                message: 'Required field is missing',
                code: ErrorCode.VALIDATION_ERROR,
                details: { column: dbError.column },
                timestamp: new Date().toISOString(),
                path
            }, { status: 400 });
        }
    }
    // Handle generic errors
    if (error instanceof Error) {
        // Check for common error patterns
        if (error.message.includes('not found')) {
            return NextResponse.json({
                error: 'Not found',
                message: error.message,
                code: ErrorCode.NOT_FOUND,
                timestamp: new Date().toISOString(),
                path
            }, { status: 404 });
        }
        if (error.message.includes('permission') || error.message.includes('access')) {
            return NextResponse.json({
                error: 'Forbidden',
                message: error.message,
                code: ErrorCode.AUTHORIZATION_ERROR,
                timestamp: new Date().toISOString(),
                path
            }, { status: 403 });
        }
        if (error.message.includes('unauthorized') || error.message.includes('authentication')) {
            return NextResponse.json({
                error: 'Unauthorized',
                message: error.message,
                code: ErrorCode.AUTHENTICATION_ERROR,
                timestamp: new Date().toISOString(),
                path
            }, { status: 401 });
        }
    }
    // Default error response
    return NextResponse.json({
        error: 'Internal server error',
        message: 'An unexpected error occurred',
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path
    }, { status: 500 });
}
// Success response helper
export function createSuccessResponse(data, message) {
    return NextResponse.json({
        data,
        success: true,
        message,
        timestamp: new Date().toISOString()
    });
}
// Paginated response helper
export function createPaginatedResponse(items, pagination, message) {
    return NextResponse.json({
        data: items,
        pagination,
        success: true,
        message,
        timestamp: new Date().toISOString()
    });
}
// Validation error helper
export function createValidationError(field, message, code = 'invalid_type') {
    return new ApiError('Validation failed', ErrorCode.VALIDATION_ERROR, 400, [{ field, message, code }]);
}
// Not found error helper
export function createNotFoundError(resource, id) {
    const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`;
    return new ApiError(message, ErrorCode.NOT_FOUND, 404);
}
// Conflict error helper
export function createConflictError(resource, field) {
    const message = field
        ? `${resource} with this ${field} already exists`
        : `${resource} already exists`;
    return new ApiError(message, ErrorCode.CONFLICT, 409);
}
// Authorization error helper
export function createAuthorizationError(action) {
    return new ApiError(`Insufficient permissions to ${action}`, ErrorCode.AUTHORIZATION_ERROR, 403);
}
// Authentication error helper
export function createAuthenticationError() {
    return new ApiError('Authentication required', ErrorCode.AUTHENTICATION_ERROR, 401);
}
//# sourceMappingURL=error-handler.js.map