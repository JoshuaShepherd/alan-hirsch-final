// ============================================================================
// BASE SERVICE CLASS
// ============================================================================
// Framework-agnostic base service class that orchestrates query modules + mappers
// Following alignment reference patterns for use-case functions

import type { z } from 'zod';
import {
  AuthHelpers,
  ForbiddenError,
  NotFoundError,
  PaginatedServiceResult,
  ServiceContext,
  ServiceError,
  ServiceResult,
  ValidationError,
} from './types';

/**
 * Base Service Interface
 * Defines the contract for all domain services
 */
export interface BaseServiceInterface<
  TEntity,
  TCreateInput,
  TUpdateInput,
  TQueryInput = Record<string, unknown>,
> {
  // CRUD Operations
  create(
    data: TCreateInput,
    context: ServiceContext
  ): Promise<ServiceResult<TEntity>>;
  findById(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<TEntity>>;
  findMany(
    query: TQueryInput,
    context: ServiceContext
  ): Promise<PaginatedServiceResult<TEntity>>;
  update(
    id: string,
    data: TUpdateInput,
    context: ServiceContext
  ): Promise<ServiceResult<TEntity>>;
  delete(id: string, context: ServiceContext): Promise<ServiceResult<boolean>>;

  // Authorization checks
  canCreate(context: ServiceContext): boolean;
  canRead(context: ServiceContext, resourceId?: string): boolean;
  canUpdate(context: ServiceContext, resourceId?: string): boolean;
  canDelete(context: ServiceContext, resourceId?: string): boolean;
}

/**
 * Abstract Base Service Class
 * Implements common service patterns following alignment reference
 */
export abstract class BaseService<
  TEntity,
  TCreateInput,
  TUpdateInput,
  TQueryInput = Record<string, unknown>,
> implements
    BaseServiceInterface<TEntity, TCreateInput, TUpdateInput, TQueryInput>
{
  protected abstract entityName: string;
  protected abstract createSchema: z.ZodSchema<any>;
  protected abstract updateSchema: z.ZodSchema<any>;
  protected abstract querySchema?: z.ZodSchema<any>;

  /**
   * Create a new entity
   * Flow: validate input → enforce business rules → map to DB → call query module → map to DTO
   */
  async create(
    data: TCreateInput,
    context: ServiceContext
  ): Promise<ServiceResult<TEntity>> {
    try {
      // 1. Validate input
      const validatedInput = this.validateCreateInput(data);

      // 2. Enforce business rules
      this.enforceCreateRules(validatedInput, context);

      // 3. Map DTO to DB format
      const dbData = this.mapCreateToDb(validatedInput, context);

      // 4. Call query module
      const dbResult = await this.executeCreate(dbData, context);

      // 5. Map DB to DTO
      const entity = this.mapDbToEntity(dbResult, context);

      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'create');
    }
  }

  /**
   * Find entity by ID
   * Flow: enforce access → call query module → map to DTO
   */
  async findById(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<TEntity>> {
    try {
      // 1. Enforce access rules
      this.enforceReadAccess(id, context);

      // 2. Call query module
      const dbResult = await this.executeFindById(id, context);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, id);
      }

      // 3. Map DB to DTO
      const entity = this.mapDbToEntity(dbResult, context);

      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'findById');
    }
  }

  /**
   * Find multiple entities with pagination
   * Flow: validate query → enforce access → call query module → map to DTOs
   */
  async findMany(
    query: TQueryInput,
    context: ServiceContext
  ): Promise<PaginatedServiceResult<TEntity>> {
    try {
      // 1. Validate query
      const validatedQuery = this.validateQueryInput(query);

      // 2. Enforce access rules
      this.enforceListAccess(context);

      // 3. Call query module
      const dbResult = await this.executeFindMany(validatedQuery, context);

      // 4. Map DB to DTOs
      const entities = dbResult.data.map(row =>
        this.mapDbToEntity(row, context)
      );

      return {
        success: true,
        data: entities,
        pagination: dbResult.pagination,
      };
    } catch (error) {
      return this.handleError(error, 'findMany');
    }
  }

  /**
   * Update entity
   * Flow: validate input → enforce access → map to DB → call query module → map to DTO
   */
  async update(
    id: string,
    data: TUpdateInput,
    context: ServiceContext
  ): Promise<ServiceResult<TEntity>> {
    try {
      // 1. Validate input
      const validatedInput = this.validateUpdateInput(data);

      // 2. Enforce access rules
      this.enforceUpdateAccess(id, context);

      // 3. Map DTO to DB format
      const dbData = this.mapUpdateToDb(validatedInput, context);

      // 4. Call query module
      const dbResult = await this.executeUpdate(id, dbData, context);

      if (!dbResult) {
        throw new NotFoundError(this.entityName, id);
      }

      // 5. Map DB to DTO
      const entity = this.mapDbToEntity(dbResult, context);

      return {
        success: true,
        data: entity,
      };
    } catch (error) {
      return this.handleError(error, 'update');
    }
  }

  /**
   * Delete entity
   * Flow: enforce access → call query module
   */
  async delete(
    id: string,
    context: ServiceContext
  ): Promise<ServiceResult<boolean>> {
    try {
      // 1. Enforce access rules
      this.enforceDeleteAccess(id, context);

      // 2. Call query module
      await this.executeDelete(id, context);

      return {
        success: true,
        data: true,
      };
    } catch (error) {
      return this.handleError(error, 'delete');
    }
  }

  // ============================================================================
  // AUTHORIZATION METHODS
  // ============================================================================

  canCreate(context: ServiceContext): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canRead(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'viewer');
  }

  canUpdate(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'member');
  }

  canDelete(context: ServiceContext, resourceId?: string): boolean {
    return AuthHelpers.hasRole(context, 'admin');
  }

  // ============================================================================
  // ABSTRACT METHODS - TO BE IMPLEMENTED BY SUBCLASSES
  // ============================================================================

  /**
   * Map database result to entity DTO
   */
  protected abstract mapDbToEntity(
    dbResult: unknown,
    context: ServiceContext
  ): TEntity;

  /**
   * Map create input to database format
   */
  protected abstract mapCreateToDb(
    data: TCreateInput,
    context: ServiceContext
  ): unknown;

  /**
   * Map update input to database format
   */
  protected abstract mapUpdateToDb(
    data: TUpdateInput,
    context: ServiceContext
  ): unknown;

  /**
   * Execute create operation in query module
   */
  protected abstract executeCreate(
    data: unknown,
    context: ServiceContext
  ): Promise<unknown>;

  /**
   * Execute find by ID operation in query module
   */
  protected abstract executeFindById(
    id: string,
    context: ServiceContext
  ): Promise<unknown | null>;

  /**
   * Execute find many operation in query module
   */
  protected abstract executeFindMany(
    query: TQueryInput,
    context: ServiceContext
  ): Promise<{ data: unknown[]; pagination: unknown }>;

  /**
   * Execute update operation in query module
   */
  protected abstract executeUpdate(
    id: string,
    data: unknown,
    context: ServiceContext
  ): Promise<unknown | null>;

  /**
   * Execute delete operation in query module
   */
  protected abstract executeDelete(
    id: string,
    context: ServiceContext
  ): Promise<void>;

  // ============================================================================
  // PROTECTED HELPER METHODS
  // ============================================================================

  /**
   * Validate create input against schema
   */
  protected validateCreateInput(data: TCreateInput): TCreateInput {
    try {
      return this.createSchema.parse(data);
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        throw new ValidationError(
          'Invalid create input',
          (error as any).issues
        );
      }
      throw new ValidationError('Invalid create input');
    }
  }

  /**
   * Validate update input against schema
   */
  protected validateUpdateInput(data: TUpdateInput): TUpdateInput {
    try {
      return this.updateSchema.parse(data);
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        throw new ValidationError(
          'Invalid update input',
          (error as any).issues
        );
      }
      throw new ValidationError('Invalid update input');
    }
  }

  /**
   * Validate query input against schema
   */
  protected validateQueryInput(data: TQueryInput): TQueryInput {
    if (!this.querySchema) return data;

    try {
      return this.querySchema.parse(data);
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        throw new ValidationError('Invalid query input', (error as any).issues);
      }
      throw new ValidationError('Invalid query input');
    }
  }

  /**
   * Enforce create business rules
   */
  protected enforceCreateRules(
    data: TCreateInput,
    context: ServiceContext
  ): void {
    if (!this.canCreate(context)) {
      throw new ForbiddenError(`Cannot create ${this.entityName}`);
    }
  }

  /**
   * Enforce read access rules
   */
  protected enforceReadAccess(id: string, context: ServiceContext): void {
    if (!this.canRead(context, id)) {
      throw new ForbiddenError(`Cannot read ${this.entityName}`);
    }
  }

  /**
   * Enforce list access rules
   */
  protected enforceListAccess(context: ServiceContext): void {
    if (!this.canRead(context)) {
      throw new ForbiddenError(`Cannot list ${this.entityName}s`);
    }
  }

  /**
   * Enforce update access rules
   */
  protected enforceUpdateAccess(id: string, context: ServiceContext): void {
    if (!this.canUpdate(context, id)) {
      throw new ForbiddenError(`Cannot update ${this.entityName}`);
    }
  }

  /**
   * Enforce delete access rules
   */
  protected enforceDeleteAccess(id: string, context: ServiceContext): void {
    if (!this.canDelete(context, id)) {
      throw new ForbiddenError(`Cannot delete ${this.entityName}`);
    }
  }

  /**
   * Handle service errors consistently
   */
  protected handleError(
    error: unknown,
    operation: string
  ): ServiceResult<never> {
    console.error(`${this.entityName} ${operation} error:`, error);

    if (error instanceof ServiceError) {
      return {
        success: false,
        error,
      };
    }

    if (error instanceof Error) {
      const serviceError = new ServiceError(
        `${this.entityName} ${operation} failed: ${error.message}`,
        'INTERNAL_ERROR',
        500
      );
      return {
        success: false,
        error: serviceError,
      };
    }

    const serviceError = new ServiceError(
      `${this.entityName} ${operation} failed: Unknown error`,
      'INTERNAL_ERROR',
      500
    );
    return {
      success: false,
      error: serviceError,
    };
  }
}
