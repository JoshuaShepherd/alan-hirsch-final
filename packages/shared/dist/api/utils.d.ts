import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';
import { db } from '@/lib/db/drizzle';
export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
}
export interface ValidationError {
    field: string;
    message: string;
}
export interface ApiContext {
    user: {
        id: string;
        email: string;
        [key: string]: any;
    };
    db: typeof db;
}
export type ApiHandler<TInput, TOutput> = (input: TInput, context: ApiContext) => Promise<TOutput>;
export declare function createApiRoute<TInput, TOutput>(inputSchema: ZodSchema<TInput>, outputSchema: ZodSchema<TOutput>, handler: ApiHandler<TInput, TOutput>): (request: NextRequest) => Promise<NextResponse<{
    error: string;
}> | NextResponse<TOutput>>;
export declare function createApiRouteInputOnly<TInput>(inputSchema: ZodSchema<TInput>, handler: ApiHandler<TInput, any>): (request: NextRequest) => Promise<NextResponse<{
    error: string;
}> | NextResponse<ApiResponse<any>>>;
export declare function createPaginatedApiRoute<TInput, TItemOutput, TResponseOutput>(inputSchema: ZodSchema<TInput>, outputSchema: ZodSchema<TResponseOutput>, handler: ApiHandler<TInput, {
    items: TItemOutput[];
    pagination: any;
    success: boolean;
}>): (request: NextRequest) => Promise<NextResponse<{
    error: string;
}> | NextResponse<TResponseOutput>>;
export declare const createResponseSchema: <T>(dataSchema: ZodSchema<T>) => z.ZodObject<{
    data: z.ZodType<T, z.ZodTypeDef, T>;
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodType<T, z.ZodTypeDef, T>;
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: z.ZodType<T, z.ZodTypeDef, T>;
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}>, any>[k]; } : never, z.baseObjectInputType<{
    data: z.ZodType<T, z.ZodTypeDef, T>;
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
    data: z.ZodType<T, z.ZodTypeDef, T>;
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}>[k_1]; } : never>;
export declare const createPaginatedResponseSchema: <T>(itemSchema: ZodSchema<T>) => z.ZodObject<{
    items: z.ZodObject<{
        data: z.ZodArray<z.ZodType<T, z.ZodTypeDef, T>, "many">;
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            totalPages: z.ZodNumber;
            hasNext: z.ZodBoolean;
            hasPrev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }, {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: T[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }, {
        data: T[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    success: z.ZodBoolean;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    items: {
        data: T[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
    error?: string | undefined;
}, {
    success: boolean;
    items: {
        data: T[];
        pagination: {
            limit: number;
            total: number;
            page: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    };
    message?: string | undefined;
    error?: string | undefined;
}>;
export declare const paginationInputSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const idInputSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const emptyInputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
//# sourceMappingURL=utils.d.ts.map