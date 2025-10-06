// Base Service - Database Integration Layer
// Provides common database operations for all services

import { db } from '@platform/database';
import { and, asc, desc, eq } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export interface QueryFilters {
  where?: Record<string, any>;
  orderBy?: Array<{
    field: string;
    direction: 'asc' | 'desc';
  }>;
  limit?: number;
  offset?: number;
  include?: string[];
}

export abstract class BaseService<
  TEntity,
  TCreate,
  TUpdate,
  TQuery extends QueryFilters,
  TTable extends PgTable,
> {
  protected abstract table: TTable;
  protected abstract entityName: string;
  protected abstract createSchema: z.ZodSchema<any>;
  protected abstract updateSchema: z.ZodSchema<any>;
  protected abstract querySchema: z.ZodSchema<any>;
  protected abstract outputSchema: z.ZodSchema<any>;

  /**
   * Create a new entity
   */
  async create(data: TCreate): Promise<TEntity> {
    try {
      // Validate input data
      const validatedData = this.createSchema.parse(data);

      const [result] = await db
        .insert(this.table as any)
        .values({
          ...validatedData,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
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

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findById');
    }
  }

  /**
   * Find all entities with optional filters
   */
  async findAll(filters?: TQuery): Promise<TEntity[]> {
    try {
      const query = db.select().from(this.table as any);

      if (filters) {
        const validatedFilters = this.querySchema.parse(filters);

        // Apply where conditions
        if (validatedFilters.where) {
          const whereConditions = Object.entries(validatedFilters.where).map(
            ([key, value]) => {
              const column = (this.table as any)[key];
              if (!column) {
                throw new Error(
                  `Column ${key} not found in table ${this.entityName}`
                );
              }
              return eq(column, value);
            }
          );
          query.where(and(...whereConditions));
        }

        // Apply ordering
        if (validatedFilters.orderBy && validatedFilters.orderBy.length > 0) {
          const orderConditions = validatedFilters.orderBy.map(
            ({ field, direction }: any) => {
              const column = (this.table as any)[field];
              if (!column) {
                throw new Error(
                  `Column ${field} not found in table ${this.entityName}`
                );
              }
              return direction === 'asc' ? asc(column) : desc(column);
            }
          );
          query.orderBy(...orderConditions);
        }

        // Apply pagination
        if (validatedFilters.limit) {
          query.limit(validatedFilters.limit);
        }
        if (validatedFilters.offset) {
          query.offset(validatedFilters.offset);
        }
      }

      const results = await query;
      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findAll');
    }
  }

  /**
   * Update entity by ID
   */
  async update(id: string, data: TUpdate): Promise<TEntity> {
    try {
      // Validate input data
      const validatedData = this.updateSchema.parse(data);

      const [result] = await db
        .update(this.table as any)
        .set({
          ...validatedData,
          updatedAt: new Date(),
        } as any)
        .where(eq((this.table as any).id, id))
        .returning();

      if (!result) {
        throw new Error(`${this.entityName} with ID ${id} not found`);
      }

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'update');
    }
  }

  /**
   * Delete entity by ID
   */
  async delete(id: string): Promise<boolean> {
    try {
      const result = await db
        .delete(this.table as any)
        .where(eq((this.table as any).id, id))
        .returning({ id: (this.table as any).id });

      return result.length > 0;
    } catch (error) {
      throw this.handleDatabaseError(error, 'delete');
    }
  }

  /**
   * Execute database operations in a transaction
   */
  protected async executeInTransaction<T>(
    callback: (tx: any) => Promise<T>
  ): Promise<T> {
    try {
      return await db.transaction(callback);
    } catch (error) {
      throw this.handleDatabaseError(error, 'transaction');
    }
  }

  /**
   * Handle database errors with proper logging and error transformation
   */
  protected handleDatabaseError(error: unknown, operation: string): Error {
    console.error(`Database error in ${this.entityName}.${operation}:`, error);

    if (error instanceof Error) {
      // Handle specific database errors
      if (error.message.includes('duplicate key')) {
        return new Error(`${this.entityName} already exists`);
      }
      if (error.message.includes('foreign key')) {
        return new Error(`Referenced ${this.entityName} not found`);
      }
      if (error.message.includes('not null')) {
        return new Error(`Required field missing for ${this.entityName}`);
      }
      return error;
    }

    return new Error(`Database operation failed for ${this.entityName}`);
  }
}
