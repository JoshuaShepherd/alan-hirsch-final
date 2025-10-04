import { db } from '@/lib/db/drizzle';
import { NotFoundError, ValidationError, type AppError } from '@/types';
import { and, count, desc, eq, sql, type SQL } from 'drizzle-orm';
import { z } from 'zod';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface QueryFilters {
  where?: Record<string, any>;
  orderBy?: { field: string; direction: 'asc' | 'desc' }[];
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

// ============================================================================
// BASE SERVICE CLASS
// ============================================================================

export abstract class BaseService<
  TEntity,
  TCreateInput,
  TUpdateInput,
  TQueryInput = any,
  TTable = any,
> {
  protected abstract table: TTable;
  protected abstract entityName: string;
  protected abstract createSchema: z.ZodSchema<TCreateInput>;
  protected abstract updateSchema: z.ZodSchema<TUpdateInput>;
  protected abstract querySchema?: z.ZodSchema<TQueryInput>;
  protected abstract outputSchema: z.ZodSchema<TEntity>;

  /**
   * Create a new entity with validation
   */
  async create(data: TCreateInput): Promise<TEntity> {
    try {
      // Validate input data
      const validatedData = this.createSchema.parse(data);

      // Insert into database
      const [result] = await db
        .insert(this.table as any)
        .values(validatedData)
        .returning();

      // Validate output
      const validatedResult = this.outputSchema.parse(result);

      return validatedResult;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          `Invalid ${this.entityName} data`,
          error.issues
        );
      }
      throw this.handleDatabaseError(error, 'create');
    }
  }

  /**
   * Find entity by ID
   */
  async findById(id: string): Promise<TEntity | null> {
    try {
      const [result] = await db
        .select()
        .from(this.table as any)
        .where(eq((this.table as any).id, id))
        .limit(1);

      if (!result) return null;

      // Validate output
      return this.outputSchema.parse(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          `Invalid ${this.entityName} data from database`,
          error.issues
        );
      }
      throw this.handleDatabaseError(error, 'findById');
    }
  }

  /**
   * Find multiple entities with filtering, pagination, and sorting
   */
  async findMany(filters?: QueryFilters): Promise<PaginatedResult<TEntity>> {
    try {
      // Validate query filters if schema provided
      let validatedFilters: QueryFilters = {};
      if (this.querySchema && filters) {
        validatedFilters = this.querySchema.parse(filters);
      } else if (filters) {
        validatedFilters = filters;
      }

      const {
        where = {},
        orderBy = [{ field: 'created_at', direction: 'desc' as const }],
        limit = 20,
        offset = 0,
      } = validatedFilters;

      // Build where conditions
      const whereConditions = this.buildWhereConditions(where);

      // Build order by conditions
      const orderConditions = this.buildOrderConditions(orderBy);

      // Execute query
      const [results, totalCountResult] = await Promise.all([
        db
          .select()
          .from(this.table as any)
          .where(whereConditions)
          .orderBy(...orderConditions)
          .limit(limit)
          .offset(offset),
        db
          .select({ count: count() })
          .from(this.table as any)
          .where(whereConditions),
      ]);

      const total = totalCountResult[0]?.count || 0;
      const page = Math.floor(offset / limit) + 1;
      const totalPages = Math.ceil(total / limit);

      // Validate outputs
      const validatedResults = results.map(result =>
        this.outputSchema.parse(result)
      );

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
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          `Invalid ${this.entityName} query or data`,
          error.issues
        );
      }
      throw this.handleDatabaseError(error, 'findMany');
    }
  }

  /**
   * Update entity by ID
   */
  async update(id: string, data: TUpdateInput): Promise<TEntity> {
    try {
      // Validate input data
      const validatedData = this.updateSchema.parse(data);

      // Check if entity exists
      const existing = await this.findById(id);
      if (!existing) {
        throw new NotFoundError(this.entityName, id);
      }

      // Update in database
      const [result] = await db
        .update(this.table as any)
        .set({ ...validatedData, updated_at: new Date() })
        .where(eq((this.table as any).id, id))
        .returning();

      // Validate output
      return this.outputSchema.parse(result);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          `Invalid ${this.entityName} update data`,
          error.issues
        );
      }
      throw this.handleDatabaseError(error, 'update');
    }
  }

  /**
   * Delete entity by ID
   */
  async delete(id: string): Promise<boolean> {
    try {
      // Check if entity exists
      const existing = await this.findById(id);
      if (!existing) {
        throw new NotFoundError(this.entityName, id);
      }

      // Delete from database
      const result = await db
        .delete(this.table as any)
        .where(eq((this.table as any).id, id));

      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw this.handleDatabaseError(error, 'delete');
    }
  }

  /**
   * Soft delete entity by ID (if supported by table)
   */
  async softDelete(id: string): Promise<TEntity> {
    try {
      // Check if entity exists
      const existing = await this.findById(id);
      if (!existing) {
        throw new NotFoundError(this.entityName, id);
      }

      // Check if table supports soft delete
      const tableColumns = Object.keys((this.table as any)._.columns);
      if (
        !tableColumns.includes('deleted_at') &&
        !tableColumns.includes('is_active')
      ) {
        throw new Error(
          `Table ${this.entityName} does not support soft delete`
        );
      }

      // Perform soft delete
      const updateData: any = { updated_at: new Date() };
      if (tableColumns.includes('deleted_at')) {
        updateData.deleted_at = new Date();
      }
      if (tableColumns.includes('is_active')) {
        updateData.is_active = false;
      }

      const [result] = await db
        .update(this.table as any)
        .set(updateData)
        .where(eq((this.table as any).id, id))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw this.handleDatabaseError(error, 'softDelete');
    }
  }

  /**
   * Check if entity exists
   */
  async exists(id: string): Promise<boolean> {
    try {
      const result = await this.findById(id);
      return result !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Count entities with filters
   */
  async count(filters?: QueryFilters): Promise<number> {
    try {
      const where = filters?.where || {};
      const whereConditions = this.buildWhereConditions(where);

      const [result] = await db
        .select({ count: count() })
        .from(this.table as any)
        .where(whereConditions);

      return result.count;
    } catch (error) {
      throw this.handleDatabaseError(error, 'count');
    }
  }

  // ============================================================================
  // PROTECTED HELPER METHODS
  // ============================================================================

  /**
   * Build where conditions from filter object
   */
  protected buildWhereConditions(where: Record<string, any>): SQL | undefined {
    const conditions: SQL[] = [];

    for (const [field, value] of Object.entries(where)) {
      if (value === null || value === undefined) continue;

      const column = (this.table as any)[field];
      if (!column) continue;

      if (Array.isArray(value)) {
        conditions.push(sql`${column} = ANY(${value})`);
      } else if (typeof value === 'object' && value.operator) {
        // Support for operators like { operator: 'gt', value: 10 }
        switch (value.operator) {
          case 'gt':
            conditions.push(sql`${column} > ${value.value}`);
            break;
          case 'gte':
            conditions.push(sql`${column} >= ${value.value}`);
            break;
          case 'lt':
            conditions.push(sql`${column} < ${value.value}`);
            break;
          case 'lte':
            conditions.push(sql`${column} <= ${value.value}`);
            break;
          case 'like':
            conditions.push(sql`${column} LIKE ${`%${value.value}%`}`);
            break;
          case 'ilike':
            conditions.push(sql`${column} ILIKE ${`%${value.value}%`}`);
            break;
          case 'in':
            conditions.push(sql`${column} = ANY(${value.value})`);
            break;
          case 'not_in':
            conditions.push(sql`${column} != ALL(${value.value})`);
            break;
          default:
            conditions.push(eq(column, value.value));
        }
      } else {
        conditions.push(eq(column, value));
      }
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }

  /**
   * Build order by conditions from sort array
   */
  protected buildOrderConditions(
    orderBy: { field: string; direction: 'asc' | 'desc' }[]
  ): any[] {
    const conditions: any[] = [];

    for (const { field, direction } of orderBy) {
      const column = (this.table as any)[field];
      if (!column) continue;

      if (direction === 'desc') {
        conditions.push(desc(column));
      } else {
        conditions.push(column);
      }
    }

    return conditions.length > 0
      ? conditions
      : [desc((this.table as any).created_at)];
  }

  /**
   * Handle database errors consistently
   */
  protected handleDatabaseError(
    error: unknown,
    operation: string
  ): ServiceError {
    const message = `${this.entityName} ${operation} failed: ${error instanceof Error ? error.message : 'Unknown error'}`;

    if (error instanceof Error) {
      // Check for common database errors
      if (error.message.includes('duplicate key')) {
        return new ValidationError(
          `${this.entityName} already exists`
        ) as ServiceError;
      }
      if (error.message.includes('foreign key')) {
        return new ValidationError(
          `Invalid reference in ${this.entityName}`
        ) as ServiceError;
      }
      if (error.message.includes('not null')) {
        return new ValidationError(
          `Required field missing in ${this.entityName}`
        ) as ServiceError;
      }
    }

    return new ValidationError(message) as ServiceError;
  }

  /**
   * Execute operations within a transaction
   */
  async executeInTransaction<T>(
    operations: (tx: any) => Promise<T>
  ): Promise<T> {
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
  async executeInTransaction<T>(
    operations: (tx: any) => Promise<T>
  ): Promise<T> {
    return db.transaction(operations);
  }

  /**
   * Execute multiple operations in parallel within a transaction
   */
  async executeInParallel<T extends readonly unknown[]>(
    operations: readonly ((tx: any) => Promise<unknown>)[]
  ): Promise<T> {
    return db.transaction(async tx => {
      const results = await Promise.all(operations.map(op => op(tx)));
      return results as T;
    });
  }
}

// ============================================================================
// QUERY VALIDATION SCHEMAS
// ============================================================================

export const QueryFiltersSchema = z.object({
  where: z.record(z.any()).optional(),
  orderBy: z
    .array(
      z.object({
        field: z.string(),
        direction: z.enum(['asc', 'desc']),
      })
    )
    .optional(),
  limit: z.number().int().positive().max(1000).default(20),
  offset: z.number().int().nonnegative().default(0),
  include: z.array(z.string()).optional(),
});

export type QueryFiltersType = z.infer<typeof QueryFiltersSchema>;

// ============================================================================
// EXPORTS
// ============================================================================

export type { PaginatedResult, QueryFilters, ServiceError, TransactionContext };
