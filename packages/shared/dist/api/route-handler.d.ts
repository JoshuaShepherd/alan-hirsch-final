import { NextRequest } from 'next/server';
import { ZodSchema, z } from 'zod';
export interface AuthenticatedUser {
    id: string;
    email: string;
    [key: string]: unknown;
}
export interface RouteContext {
    user: AuthenticatedUser;
    request: NextRequest;
    params?: Record<string, string>;
}
export interface RouteHandler<TInput = unknown, TOutput = unknown> {
    (input: TInput, context: RouteContext): Promise<TOutput>;
}
export interface PaginatedRouteHandler<TInput = unknown, TOutput = unknown> {
    (input: TInput, context: RouteContext): Promise<{
        items: TOutput[];
        total: number;
    }>;
}
/**
 * Creates a type-safe API route handler with automatic validation and error handling
 */
export declare function createRouteHandler<TInput, TOutput>(config: {
    inputSchema?: ZodSchema<TInput>;
    outputSchema?: ZodSchema<TOutput>;
    requireAuth?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    handler: RouteHandler<TInput, TOutput>;
}): (request: NextRequest, { params }?: {
    params?: Record<string, string>;
}) => Promise<import("next/server").NextResponse<unknown>>;
/**
 * Creates a paginated route handler with automatic pagination logic
 */
export declare function createPaginatedRouteHandler<TInput, TOutput>(config: {
    inputSchema?: ZodSchema<TInput>;
    outputSchema?: ZodSchema<TOutput>;
    requireAuth?: boolean;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    handler: PaginatedRouteHandler<TInput, TOutput>;
}): (request: NextRequest, { params }?: {
    params?: Record<string, string>;
}) => Promise<import("next/server").NextResponse<unknown>>;
/**
 * Creates a complete CRUD route handler for a resource
 */
export declare function createCrudRoutes<TEntity, TCreateInput, TUpdateInput, TQueryInput>(config: {
    entityName: string;
    createSchema: ZodSchema<TCreateInput>;
    updateSchema: ZodSchema<TUpdateInput>;
    querySchema: ZodSchema<TQueryInput>;
    responseSchema: ZodSchema<TEntity>;
    service: {
        create: (data: TCreateInput, context: RouteContext) => Promise<TEntity>;
        findById: (id: string, context: RouteContext) => Promise<TEntity | null>;
        findMany: (query: TQueryInput, context: RouteContext) => Promise<{
            items: TEntity[];
            total: number;
        }>;
        update: (id: string, data: TUpdateInput, context: RouteContext) => Promise<TEntity>;
        delete: (id: string, context: RouteContext) => Promise<void>;
    };
}): {
    list: (request: NextRequest, { params }?: {
        params?: Record<string, string>;
    }) => Promise<import("next/server").NextResponse<unknown>>;
    create: (request: NextRequest, { params }?: {
        params?: Record<string, string>;
    }) => Promise<import("next/server").NextResponse<unknown>>;
    getById: (request: NextRequest, { params }?: {
        params?: Record<string, string>;
    }) => Promise<import("next/server").NextResponse<unknown>>;
    update: (request: NextRequest, { params }?: {
        params?: Record<string, string>;
    }) => Promise<import("next/server").NextResponse<unknown>>;
    delete: (request: NextRequest, { params }?: {
        params?: Record<string, string>;
    }) => Promise<import("next/server").NextResponse<unknown>>;
};
/**
 * Extracts and validates route parameters
 */
export declare function extractRouteParams<T extends Record<string, ZodSchema>>(params: Record<string, string> | undefined, schema: z.ZodObject<T>): z.infer<z.ZodObject<T>>;
/**
 * Creates a query parameter schema with common pagination fields
 */
export declare function createQuerySchema<T extends z.ZodRawShape>(baseSchema: T): z.ZodObject<T & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}>, any>[k]; } : never, z.baseObjectInputType<T & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<T & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}>[k_1]; } : never>;
/**
 * Creates an ID parameter schema
 */
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
/**
 * Creates a bulk operation schema
 */
export declare function createBulkSchema<T>(itemSchema: ZodSchema<T>): z.ZodObject<{
    items: z.ZodArray<ZodSchema<T, z.ZodTypeDef, T>, "many">;
}, "strip", z.ZodTypeAny, {
    items: T[];
}, {
    items: T[];
}>;
export type { AuthenticatedUser, PaginatedRouteHandler, RouteContext, RouteHandler, };
//# sourceMappingURL=route-handler.d.ts.map