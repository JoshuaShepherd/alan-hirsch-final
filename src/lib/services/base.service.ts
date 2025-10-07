import { z } from 'zod';

/**
 * Base service class that provides common CRUD operations and error handling
 * for all entity services in the platform.
 */
export abstract class BaseService<TEntity> {
  protected abstract entityName: string;
  protected abstract createSchema: z.ZodSchema<any>;
  protected abstract updateSchema: z.ZodSchema<any>;
  protected abstract responseSchema: z.ZodSchema<any>;
  protected abstract listResponseSchema: z.ZodSchema<any>;

  /**
   * Get entity by ID
   */
  abstract get(
    ctx: any,
    id: string
  ): Promise<
    | { ok: true; data: z.infer<typeof this.responseSchema> }
    | { ok: false; error: { code: string; message: string } }
  >;

  /**
   * List entities with pagination and filtering
   */
  abstract list(
    ctx: any,
    params?: any
  ): Promise<
    | { ok: true; data: z.infer<typeof this.listResponseSchema> }
    | { ok: false; error: { code: string; message: string } }
  >;

  /**
   * Create new entity
   */
  abstract create(
    ctx: any,
    input: any
  ): Promise<
    | { ok: true; data: z.infer<typeof this.responseSchema> }
    | { ok: false; error: { code: string; message: string } }
  >;

  /**
   * Update entity by ID
   */
  abstract update(
    ctx: any,
    id: string,
    input: any
  ): Promise<
    | { ok: true; data: z.infer<typeof this.responseSchema> }
    | { ok: false; error: { code: string; message: string } }
  >;

  /**
   * Delete entity by ID
   */
  abstract delete(
    ctx: any,
    id: string
  ): Promise<
    | { ok: true; data: { success: true } }
    | { ok: false; error: { code: string; message: string } }
  >;

  /**
   * Validate input data against the create schema
   */
  protected validateCreateInput(
    input: any
  ):
    | { ok: true; data: any }
    | { ok: false; error: { code: string; message: string } } {
    try {
      const result = this.createSchema.parse(input);
      return this.success(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return this.validationError(
          `${this.entityName} validation failed: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      return this.internalError('Unexpected validation error');
    }
  }

  /**
   * Validate input data against the update schema
   */
  protected validateUpdateInput(
    input: any
  ):
    | { ok: true; data: any }
    | { ok: false; error: { code: string; message: string } } {
    try {
      const result = this.updateSchema.parse(input);
      return this.success(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return this.validationError(
          `${this.entityName} validation failed: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      return this.internalError('Unexpected validation error');
    }
  }

  /**
   * Validate response data against the response schema
   */
  protected validateResponse(
    data: any
  ):
    | { ok: true; data: z.infer<typeof this.responseSchema> }
    | { ok: false; error: { code: string; message: string } } {
    try {
      const result = this.responseSchema.parse(data);
      return this.success(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return this.internalError(
          `${this.entityName} response validation failed: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      return this.internalError('Unexpected response validation error');
    }
  }

  /**
   * Validate list response data against the list response schema
   */
  protected validateListResponse(
    data: any
  ):
    | { ok: true; data: z.infer<typeof this.listResponseSchema> }
    | { ok: false; error: { code: string; message: string } } {
    try {
      const result = this.listResponseSchema.parse(data);
      return this.success(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return this.internalError(
          `${this.entityName} list response validation failed: ${error.errors.map(e => e.message).join(', ')}`
        );
      }
      return this.internalError('Unexpected list response validation error');
    }
  }

  /**
   * Handle database errors and convert them to appropriate error results
   */
  protected handleDatabaseError(
    error: unknown,
    operation: string
  ): { ok: false; error: { code: string; message: string } } {
    console.error(`Database error during ${operation}:`, error);

    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as any;

      // PostgreSQL error codes
      switch (dbError.code) {
        case '23505': // Unique violation
          return this.error('CONFLICT', `${this.entityName} already exists`);

        case '23503': // Foreign key violation
          return this.error(
            'VALIDATION_ERROR',
            `Referenced ${this.entityName} does not exist`
          );

        case '23502': // Not null violation
          return this.error(
            'VALIDATION_ERROR',
            `Required field is missing for ${this.entityName}`
          );

        default:
          return this.error(
            'DATABASE_ERROR',
            `Database error during ${operation}`
          );
      }
    }

    if (error instanceof Error) {
      // Check for common error patterns
      if (error.message.includes('not found')) {
        return this.notFound();
      }

      if (
        error.message.includes('permission') ||
        error.message.includes('access')
      ) {
        return this.error(
          'AUTHORIZATION_ERROR',
          `Insufficient permissions to ${operation} ${this.entityName}`
        );
      }
    }

    // Default error
    return this.internalError(`Unexpected error during ${operation}`);
  }

  /**
   * Execute operations within a database transaction
   * This is a placeholder for transaction support
   */
  protected async executeInTransaction<T>(
    ctx: any,
    operations: (txCtx: any) => Promise<T>
  ): Promise<T> {
    // TODO: Implement transaction support when database context supports it
    // For now, just execute the operations directly
    return await operations(ctx);
  }

  /**
   * Create a success result
   */
  protected success<T>(data: T): { ok: true; data: T } {
    return { ok: true, data };
  }

  /**
   * Create an error result
   */
  protected error(
    code: string,
    message: string
  ): { ok: false; error: { code: string; message: string } } {
    return { ok: false, error: { code, message } };
  }

  /**
   * Create a NOT_FOUND error result
   */
  protected notFound(message?: string): {
    ok: false;
    error: { code: string; message: string };
  } {
    return this.error('NOT_FOUND', message || `${this.entityName} not found`);
  }

  /**
   * Create a VALIDATION_ERROR error result
   */
  protected validationError(message: string): {
    ok: false;
    error: { code: string; message: string };
  } {
    return this.error('VALIDATION_ERROR', message);
  }

  /**
   * Create an INTERNAL_ERROR error result
   */
  protected internalError(message: string): {
    ok: false;
    error: { code: string; message: string };
  } {
    return this.error('INTERNAL_ERROR', message);
  }
}
