export * from './error-handler';
export * from './route-handler';
export * from './utils';
export * from './rate-limiter';
export * from './security';
export { withCORS, withErrorHandling, withInputOutputValidation, withPaginationValidation, withRateLimit, withValidation, } from './validation-middleware';
export type { ErrorCode } from './error-handler';
export type { RateLimitConfig } from './rate-limiter';
export type { SecurityHeaders } from './security';
export type { ApiResponse, PaginatedResponse, ValidationError } from './utils';
export { z };
export declare const commonSchemas: {
    readonly pagination: {
        readonly page: z.ZodDefault<z.ZodNumber>;
        readonly limit: z.ZodDefault<z.ZodNumber>;
    };
    readonly id: {
        readonly id: z.ZodString;
    };
    readonly empty: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    readonly search: {
        readonly search: z.ZodOptional<z.ZodString>;
        readonly sort: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
        readonly orderBy: z.ZodOptional<z.ZodString>;
    };
};
export declare const apiHelpers: {
    readonly success: <T>(data: T, message?: string) => {
        data: T;
        success: boolean;
        message: string | undefined;
        timestamp: string;
    };
    readonly error: (message: string, code?: string, details?: any) => {
        error: string;
        code: string;
        details: any;
        timestamp: string;
    };
    readonly paginated: <T>(items: T[], pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }) => {
        data: T[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
        success: boolean;
        timestamp: string;
    };
};
export declare const middleware: {
    readonly compose: <T>(...middlewares: Array<(handler: any) => any>) => (handler: any) => any;
    readonly withSecurity: (options?: any) => any;
    readonly withRateLimit: (limiter?: any) => any;
    readonly withCORS: (options?: any) => any;
    readonly withValidation: (schema: any) => any;
    readonly withErrorHandling: () => any;
};
export declare const defaultConfig: {
    readonly rateLimit: {
        readonly api: {
            readonly maxRequests: 100;
            readonly windowMs: number;
        };
        readonly auth: {
            readonly maxRequests: 5;
            readonly windowMs: number;
        };
        readonly upload: {
            readonly maxRequests: 10;
            readonly windowMs: number;
        };
    };
    readonly security: {
        readonly maxRequestSize: number;
        readonly allowedContentTypes: readonly ["application/json"];
        readonly allowedOrigins: readonly ["http://localhost:3000"];
        readonly blockedUserAgents: readonly ["bot", "crawler", "spider"];
    };
    readonly cors: {
        readonly origin: readonly ["http://localhost:3000"];
        readonly methods: readonly ["GET", "POST", "PUT", "DELETE", "OPTIONS"];
        readonly allowedHeaders: readonly ["Content-Type", "Authorization"];
        readonly credentials: true;
    };
};
import { z } from 'zod';
//# sourceMappingURL=index.d.ts.map