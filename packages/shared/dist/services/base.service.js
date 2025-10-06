import { db } from '@platform/database';
import { and, count, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { ApiError, ErrorCode } from '../api/error-handler';
// ============================================================================
// BASE SERVICE CLASS
// ============================================================================
export class BaseService {
    /**
     * Create a new entity with validation
     */
    async create(data) {
        try {
            // Validate input data
            const validatedData = this.createSchema.parse(data);
            // Insert into database
            const [result] = await db
                .insert(this.table)
                .values(validatedData)
                .returning();
            // Validate output
            const validatedResult = this.outputSchema.parse(result);
            return validatedResult;
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                throw new ApiError(`Invalid ${this.entityName} data`, ErrorCode.VALIDATION_ERROR, 400);
            }
            throw this.handleDatabaseError(error, 'create');
        }
    }
    /**
     * Find entity by ID
     */
    async findById(id) {
        try {
            const [result] = await db
                .select()
                .from(this.table)
                .where(eq(this.table.id, id))
                .limit(1);
            if (!result)
                return null;
            // Validate output
            return this.outputSchema.parse(result);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                throw new ApiError(`Invalid ${this.entityName} data from database`, ErrorCode.VALIDATION_ERROR, 400);
            }
            throw this.handleDatabaseError(error, 'findById');
        }
    }
    /**
     * Find multiple entities with filtering, pagination, and sorting
     */
    async findMany(filters) {
        try {
            // Validate query filters if schema provided
            let validatedFilters = {};
            if (this.querySchema && filters) {
                validatedFilters = this.querySchema.parse(filters);
            }
            else if (filters) {
                validatedFilters = filters;
            }
            const { where = {}, orderBy = [{ field: 'created_at', direction: 'desc' }], limit = 20, offset = 0, } = validatedFilters;
            // Build where conditions
            const whereConditions = this.buildWhereConditions(where);
            // Build order by conditions
            const orderConditions = this.buildOrderConditions(orderBy);
            // Execute query
            const [results, totalCountResult] = await Promise.all([
                db
                    .select()
                    .from(this.table)
                    .where(whereConditions)
                    .orderBy(...orderConditions)
                    .limit(limit)
                    .offset(offset),
                db
                    .select({ count: count() })
                    .from(this.table)
                    .where(whereConditions),
            ]);
            const total = totalCountResult[0]?.count || 0;
            const page = Math.floor(offset / limit) + 1;
            const totalPages = Math.ceil(total / limit);
            // Validate outputs
            const validatedResults = results.map(result => this.outputSchema.parse(result));
            return {
                data: validatedResults,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasMore: page < totalPages,
                },
            };
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                throw new ApiError(`Invalid ${this.entityName} query or data`, ErrorCode.VALIDATION_ERROR, 400);
            }
            throw this.handleDatabaseError(error, 'findMany');
        }
    }
    /**
     * Update entity by ID
     */
    async update(id, data) {
        try {
            // Validate input data
            const validatedData = this.updateSchema.parse(data);
            // Check if entity exists
            const existing = await this.findById(id);
            if (!existing) {
                throw new ApiError(`${this.entityName} not found`, ErrorCode.NOT_FOUND, 404);
            }
            // Update in database
            const [result] = await db
                .update(this.table)
                .set({ ...validatedData, updated_at: new Date() })
                .where(eq(this.table.id, id))
                .returning();
            // Validate output
            return this.outputSchema.parse(result);
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            if (error instanceof z.ZodError) {
                throw new ApiError(`Invalid ${this.entityName} update data`, ErrorCode.VALIDATION_ERROR, 400);
            }
            throw this.handleDatabaseError(error, 'update');
        }
    }
    /**
     * Delete entity by ID
     */
    async delete(id) {
        try {
            // Check if entity exists
            const existing = await this.findById(id);
            if (!existing) {
                throw new ApiError(`${this.entityName} not found`, ErrorCode.NOT_FOUND, 404);
            }
            // Delete from database
            const result = await db
                .delete(this.table)
                .where(eq(this.table.id, id));
            return true;
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw this.handleDatabaseError(error, 'delete');
        }
    }
    /**
     * Soft delete entity by ID (if supported by table)
     */
    async softDelete(id) {
        try {
            // Check if entity exists
            const existing = await this.findById(id);
            if (!existing) {
                throw new ApiError(`${this.entityName} not found`, ErrorCode.NOT_FOUND, 404);
            }
            // Check if table supports soft delete
            const tableColumns = Object.keys(this.table._.columns);
            if (!tableColumns.includes('deleted_at') &&
                !tableColumns.includes('is_active')) {
                throw new Error(`Table ${this.entityName} does not support soft delete`);
            }
            // Perform soft delete
            const updateData = { updated_at: new Date() };
            if (tableColumns.includes('deleted_at')) {
                updateData.deleted_at = new Date();
            }
            if (tableColumns.includes('is_active')) {
                updateData.is_active = false;
            }
            const [result] = await db
                .update(this.table)
                .set(updateData)
                .where(eq(this.table.id, id))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw this.handleDatabaseError(error, 'softDelete');
        }
    }
    /**
     * Check if entity exists
     */
    async exists(id) {
        try {
            const result = await this.findById(id);
            return result !== null;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Count entities with filters
     */
    async count(filters) {
        try {
            const where = filters?.where || {};
            const whereConditions = this.buildWhereConditions(where);
            const [result] = await db
                .select({ count: count() })
                .from(this.table)
                .where(whereConditions);
            return result.count;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'count');
        }
    }
    // ============================================================================
    // PROTECTED HELPER METHODS
    // ============================================================================
    /**
     * Build where conditions from filter object
     */
    buildWhereConditions(where) {
        const conditions = [];
        for (const [field, value] of Object.entries(where)) {
            if (value === null || value === undefined)
                continue;
            const column = this.table[field];
            if (!column)
                continue;
            if (Array.isArray(value)) {
                conditions.push(sql `${column} = ANY(${value})`);
            }
            else if (typeof value === 'object' && value.operator) {
                // Support for operators like { operator: 'gt', value: 10 }
                switch (value.operator) {
                    case 'gt':
                        conditions.push(sql `${column} > ${value.value}`);
                        break;
                    case 'gte':
                        conditions.push(sql `${column} >= ${value.value}`);
                        break;
                    case 'lt':
                        conditions.push(sql `${column} < ${value.value}`);
                        break;
                    case 'lte':
                        conditions.push(sql `${column} <= ${value.value}`);
                        break;
                    case 'like':
                        conditions.push(sql `${column} LIKE ${`%${value.value}%`}`);
                        break;
                    case 'ilike':
                        conditions.push(sql `${column} ILIKE ${`%${value.value}%`}`);
                        break;
                    case 'in':
                        conditions.push(sql `${column} = ANY(${value.value})`);
                        break;
                    case 'not_in':
                        conditions.push(sql `${column} != ALL(${value.value})`);
                        break;
                    default:
                        conditions.push(eq(column, value.value));
                }
            }
            else {
                conditions.push(eq(column, value));
            }
        }
        return conditions.length > 0 ? and(...conditions) : undefined;
    }
    /**
     * Build order by conditions from sort array
     */
    buildOrderConditions(orderBy) {
        const conditions = [];
        for (const { field, direction } of orderBy) {
            const column = this.table[field];
            if (!column)
                continue;
            if (direction === 'desc') {
                conditions.push(desc(column));
            }
            else {
                conditions.push(column);
            }
        }
        return conditions.length > 0
            ? conditions
            : [desc(this.table.created_at)];
    }
    /**
     * Handle database errors consistently
     */
    handleDatabaseError(error, operation) {
        const message = `${this.entityName} ${operation} failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
        if (error instanceof Error) {
            // Check for common database errors
            if (error.message.includes('duplicate key')) {
                return new ApiError(`${this.entityName} already exists`, ErrorCode.CONFLICT, 409);
            }
            if (error.message.includes('foreign key')) {
                return new ApiError(`Invalid reference in ${this.entityName}`, ErrorCode.VALIDATION_ERROR, 400);
            }
            if (error.message.includes('not null')) {
                return new ApiError(`Required field missing in ${this.entityName}`, ErrorCode.VALIDATION_ERROR, 400);
            }
        }
        return new ApiError(message, ErrorCode.INTERNAL_SERVER_ERROR, 500);
    }
    /**
     * Execute operations within a transaction
     */
    async executeInTransaction(operations) {
        return db.transaction(operations);
    }
}
// ============================================================================
// TRANSACTION SERVICE
// ============================================================================
export class TransactionService {
    /**
     * Execute multiple operations within a single transaction
     */
    async executeInTransaction(operations) {
        return db.transaction(operations);
    }
    /**
     * Execute multiple operations in parallel within a transaction
     */
    async executeInParallel(operations) {
        return db.transaction(async (tx) => {
            const results = await Promise.all(operations.map(op => op(tx)));
            return results;
        });
    }
}
// ============================================================================
// QUERY VALIDATION SCHEMAS
// ============================================================================
export const QueryFiltersSchema = z.object({
    where: z.record(z.any()).optional(),
    orderBy: z
        .array(z.object({
        field: z.string(),
        direction: z.enum(['asc', 'desc']),
    }))
        .optional(),
    limit: z.number().int().positive().max(1000).default(20),
    offset: z.number().int().nonnegative().default(0),
    include: z.array(z.string()).optional(),
});
// ============================================================================
// EXPORTS
// ============================================================================
// Export types - these are already defined above, no need to re-export
//# sourceMappingURL=base.service.js.map