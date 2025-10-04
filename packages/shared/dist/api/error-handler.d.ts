import { NextResponse } from 'next/server';
import { z } from 'zod';
export declare enum ErrorCode {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
    AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    DATABASE_ERROR = "DATABASE_ERROR",
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR"
}
export declare class ApiError extends Error {
    readonly code: ErrorCode;
    readonly statusCode: number;
    readonly details?: any;
    constructor(message: string, code?: ErrorCode, statusCode?: number, details?: any);
}
export declare const errorResponseSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodString;
    code: z.ZodNativeEnum<typeof ErrorCode>;
    details: z.ZodOptional<z.ZodAny>;
    timestamp: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: ErrorCode;
    message: string;
    error: string;
    timestamp: string;
    path?: string | undefined;
    details?: any;
}, {
    code: ErrorCode;
    message: string;
    error: string;
    timestamp: string;
    path?: string | undefined;
    details?: any;
}>;
export declare function handleApiError(error: unknown, path?: string): NextResponse;
export declare function createSuccessResponse<T>(data: T, message?: string): NextResponse<{
    data: T;
    success: boolean;
    message: string | undefined;
    timestamp: string;
}>;
export declare function createPaginatedResponse<T>(items: T[], pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
}, message?: string): NextResponse<{
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
    success: boolean;
    message: string | undefined;
    timestamp: string;
}>;
export declare function createValidationError(field: string, message: string, code?: string): ApiError;
export declare function createNotFoundError(resource: string, id?: string): ApiError;
export declare function createConflictError(resource: string, field?: string): ApiError;
export declare function createAuthorizationError(action: string): ApiError;
export declare function createAuthenticationError(): ApiError;
//# sourceMappingURL=error-handler.d.ts.map