import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema } from 'zod';
export interface ValidationError {
    field: string;
    message: string;
    code: string;
}
export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
    validationErrors?: ValidationError[];
    success?: boolean;
}
export interface MiddlewareContext {
    user: {
        id: string;
        email: string;
        [key: string]: any;
    };
    validatedData?: any;
}
export declare function withValidation<T>(schema: ZodSchema<T>, handler: (data: T, context: MiddlewareContext, request: NextRequest) => Promise<Response>): (request: NextRequest) => Promise<Response>;
export declare function withInputOutputValidation<TInput, TOutput>(inputSchema: ZodSchema<TInput>, outputSchema: ZodSchema<TOutput>, handler: (data: TInput, context: MiddlewareContext, request: NextRequest) => Promise<TOutput>): (request: NextRequest) => Promise<NextResponse<ApiResponse<any>>>;
export declare function withPaginationValidation<TInput, TOutput>(inputSchema: ZodSchema<TInput>, outputSchema: ZodSchema<TOutput>, handler: (data: TInput, context: MiddlewareContext, request: NextRequest) => Promise<{
    items: TOutput[];
    total: number;
}>): (request: NextRequest) => Promise<NextResponse<ApiResponse<any>>>;
export declare function withRateLimit(maxRequests?: number, windowMs?: number): <T>(handler: (data: T, context: MiddlewareContext, request: NextRequest) => Promise<Response>) => (request: NextRequest) => Promise<Response>;
export declare function withCORS(allowedOrigins?: string[], allowedMethods?: string[], allowedHeaders?: string[]): <T>(handler: (data: T, context: MiddlewareContext, request: NextRequest) => Promise<Response>) => (request: NextRequest) => Promise<Response>;
export declare function withErrorHandling<T>(handler: (data: T, context: MiddlewareContext, request: NextRequest) => Promise<Response>): (request: NextRequest) => Promise<Response>;
//# sourceMappingURL=validation-middleware.d.ts.map