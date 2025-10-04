import { type AppError } from '@/types';
import { type SQL } from 'drizzle-orm';
import { z } from 'zod';
export interface QueryFilters {
    where?: Record<string, any>;
    orderBy?: {
        field: string;
        direction: 'asc' | 'desc';
    }[];
    limit?: number;
    offset?: number;
    include?: string[];
}
export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}
export interface ServiceError extends AppError {
    type: 'VALIDATION' | 'NOT_FOUND' | 'DATABASE' | 'BUSINESS_RULE';
}
export interface TransactionContext {
    executeInTransaction<T>(operations: (tx: any) => Promise<T>): Promise<T>;
}
export declare abstract class BaseService<TEntity, TCreateInput, TUpdateInput, TQueryInput = any, TTable = any> {
    protected abstract table: TTable;
    protected abstract entityName: string;
    protected abstract createSchema: z.ZodSchema<TCreateInput>;
    protected abstract updateSchema: z.ZodSchema<TUpdateInput>;
    protected abstract querySchema?: z.ZodSchema<TQueryInput>;
    protected abstract outputSchema: z.ZodSchema<TEntity>;
    /**
     * Create a new entity with validation
     */
    create(data: TCreateInput): Promise<TEntity>;
    /**
     * Find entity by ID
     */
    findById(id: string): Promise<TEntity | null>;
    /**
     * Find multiple entities with filtering, pagination, and sorting
     */
    findMany(filters?: QueryFilters): Promise<PaginatedResult<TEntity>>;
    /**
     * Update entity by ID
     */
    update(id: string, data: TUpdateInput): Promise<TEntity>;
    /**
     * Delete entity by ID
     */
    delete(id: string): Promise<boolean>;
    /**
     * Soft delete entity by ID (if supported by table)
     */
    softDelete(id: string): Promise<TEntity>;
    /**
     * Check if entity exists
     */
    exists(id: string): Promise<boolean>;
    /**
     * Count entities with filters
     */
    count(filters?: QueryFilters): Promise<number>;
    /**
     * Build where conditions from filter object
     */
    protected buildWhereConditions(where: Record<string, any>): SQL | undefined;
    /**
     * Build order by conditions from sort array
     */
    protected buildOrderConditions(orderBy: {
        field: string;
        direction: 'asc' | 'desc';
    }[]): any[];
    /**
     * Handle database errors consistently
     */
    protected handleDatabaseError(error: unknown, operation: string): ServiceError;
    /**
     * Execute operations within a transaction
     */
    executeInTransaction<T>(operations: (tx: any) => Promise<T>): Promise<T>;
}
export declare class TransactionService {
    /**
     * Execute multiple operations within a single transaction
     */
    executeInTransaction<T>(operations: (tx: any) => Promise<T>): Promise<T>;
    /**
     * Execute multiple operations in parallel within a transaction
     */
    executeInParallel<T extends readonly unknown[]>(operations: readonly ((tx: any) => Promise<unknown>)[]): Promise<T>;
}
export declare const QueryFiltersSchema: z.ZodObject<{
    where: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    orderBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        direction: z.ZodEnum<["asc", "desc"]>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        direction: "asc" | "desc";
    }, {
        field: string;
        direction: "asc" | "desc";
    }>, "many">>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    where?: Record<string, any> | undefined;
    orderBy?: {
        field: string;
        direction: "asc" | "desc";
    }[] | undefined;
    include?: string[] | undefined;
}, {
    where?: Record<string, any> | undefined;
    orderBy?: {
        field: string;
        direction: "asc" | "desc";
    }[] | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    include?: string[] | undefined;
}>;
export type QueryFiltersType = z.infer<typeof QueryFiltersSchema>;
export type { PaginatedResult, QueryFilters, ServiceError, TransactionContext };
//# sourceMappingURL=base.service.d.ts.map