import { z } from 'zod';
export interface BulkOperation<T> {
    id?: string;
    action: 'create' | 'update' | 'delete';
    data?: T;
}
export interface BulkOperationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    id?: string;
}
export interface BulkOperationResponse<T> {
    results: BulkOperationResult<T>[];
    summary: {
        total: number;
        successful: number;
        failed: number;
    };
}
/**
 * Creates a bulk operation schema for a given item schema
 */
export declare function createBulkOperationSchema<T>(itemSchema: z.ZodSchema<T>): z.ZodObject<{
    operations: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }>[k_1]; } : never>, "many">;
}, "strip", z.ZodTypeAny, {
    operations: (z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }>, any> extends infer T_3 ? { [k in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }>, any>[k]; } : never)[];
}, {
    operations: (z.baseObjectInputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }> extends infer T_4 ? { [k_1 in keyof T_4]: z.baseObjectInputType<{
        id: z.ZodOptional<z.ZodString>;
        action: z.ZodEnum<["create", "update", "delete"]>;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
    }>[k_1]; } : never)[];
}>;
/**
 * Creates a bulk operation response schema
 */
export declare function createBulkOperationResponseSchema<T>(itemSchema: z.ZodSchema<T>): z.ZodObject<{
    results: z.ZodArray<z.ZodObject<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }>, any> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }>, any>[k]; } : never, z.baseObjectInputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }> extends infer T_2 ? { [k_1 in keyof T_2]: z.baseObjectInputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }>[k_1]; } : never>, "many">;
    summary: z.ZodObject<{
        total: z.ZodNumber;
        successful: z.ZodNumber;
        failed: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: number;
        failed: number;
        successful: number;
    }, {
        total: number;
        failed: number;
        successful: number;
    }>;
}, "strip", z.ZodTypeAny, {
    results: (z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }>, any> extends infer T_3 ? { [k in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }>, any>[k]; } : never)[];
    summary: {
        total: number;
        failed: number;
        successful: number;
    };
}, {
    results: (z.baseObjectInputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }> extends infer T_4 ? { [k_1 in keyof T_4]: z.baseObjectInputType<{
        success: z.ZodBoolean;
        data: z.ZodOptional<z.ZodType<T, z.ZodTypeDef, T>>;
        error: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
    }>[k_1]; } : never)[];
    summary: {
        total: number;
        failed: number;
        successful: number;
    };
}>;
/**
 * Creates a bulk operation route handler
 */
export declare function createBulkOperationHandler<T, TCreate, TUpdate>(config: {
    itemSchema: z.ZodSchema<T>;
    createSchema: z.ZodSchema<TCreate>;
    updateSchema: z.ZodSchema<TUpdate>;
    service: {
        create: (data: TCreate, context: any) => Promise<T>;
        update: (id: string, data: TUpdate, context: any) => Promise<T>;
        delete: (id: string, context: any) => Promise<void>;
    };
}): (request: import("next/server").NextRequest, { params }?: {
    params?: Record<string, string>;
}) => Promise<import("next/server").NextResponse<unknown>>;
export interface FileUploadConfig {
    maxFileSize: number;
    allowedTypes: string[];
    maxFiles: number;
}
export declare const createFileUploadSchema: (config: FileUploadConfig) => z.ZodObject<{
    files: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodString;
        size: z.ZodNumber;
        data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        data: string;
        name: string;
        size: number;
    }, {
        type: string;
        data: string;
        name: string;
        size: number;
    }>, "many">;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    files: {
        type: string;
        data: string;
        name: string;
        size: number;
    }[];
    metadata?: Record<string, unknown> | undefined;
}, {
    files: {
        type: string;
        data: string;
        name: string;
        size: number;
    }[];
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const defaultFileUploadConfig: FileUploadConfig;
//# sourceMappingURL=bulk-operations.d.ts.map