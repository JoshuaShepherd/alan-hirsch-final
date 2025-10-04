import { z } from 'zod';
import { createRouteHandler } from './route-handler';

// ============================================================================
// Bulk Operations Utilities
// ============================================================================

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
export function createBulkOperationSchema<T>(itemSchema: z.ZodSchema<T>) {
  return z.object({
    operations: z
      .array(
        z.object({
          id: z.string().uuid().optional(),
          action: z.enum(['create', 'update', 'delete']),
          data: itemSchema.optional(),
        })
      )
      .min(1)
      .max(100), // Limit to 100 operations per request
  });
}

/**
 * Creates a bulk operation response schema
 */
export function createBulkOperationResponseSchema<T>(
  itemSchema: z.ZodSchema<T>
) {
  return z.object({
    results: z.array(
      z.object({
        success: z.boolean(),
        data: itemSchema.optional(),
        error: z.string().optional(),
        id: z.string().optional(),
      })
    ),
    summary: z.object({
      total: z.number().int().min(0),
      successful: z.number().int().min(0),
      failed: z.number().int().min(0),
    }),
  });
}

/**
 * Creates a bulk operation route handler
 */
export function createBulkOperationHandler<T, TCreate, TUpdate>(config: {
  itemSchema: z.ZodSchema<T>;
  createSchema: z.ZodSchema<TCreate>;
  updateSchema: z.ZodSchema<TUpdate>;
  service: {
    create: (data: TCreate, context: any) => Promise<T>;
    update: (id: string, data: TUpdate, context: any) => Promise<T>;
    delete: (id: string, context: any) => Promise<void>;
  };
}) {
  const bulkSchema = createBulkOperationSchema(
    z.union([config.createSchema, config.updateSchema])
  );
  const responseSchema = createBulkOperationResponseSchema(config.itemSchema);

  return createRouteHandler({
    inputSchema: bulkSchema,
    outputSchema: responseSchema,
    method: 'POST',
    handler: async (input, context) => {
      const results: BulkOperationResult<T>[] = [];
      let successful = 0;
      let failed = 0;

      for (const operation of input.operations) {
        try {
          let result: BulkOperationResult<T>;

          switch (operation.action) {
            case 'create':
              if (!operation.data) {
                throw new Error('Data is required for create operation');
              }
              const created = await config.service.create(
                operation.data as TCreate,
                context
              );
              result = {
                success: true,
                data: created,
                id: (created as any).id,
              };
              successful++;
              break;

            case 'update':
              if (!operation.id || !operation.data) {
                throw new Error(
                  'ID and data are required for update operation'
                );
              }
              const updated = await config.service.update(
                operation.id,
                operation.data as TUpdate,
                context
              );
              result = {
                success: true,
                data: updated,
                id: operation.id,
              };
              successful++;
              break;

            case 'delete':
              if (!operation.id) {
                throw new Error('ID is required for delete operation');
              }
              await config.service.delete(operation.id, context);
              result = {
                success: true,
                id: operation.id,
              };
              successful++;
              break;

            default:
              throw new Error(`Unknown operation: ${operation.action}`);
          }

          results.push(result);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
          results.push({
            success: false,
            error: errorMessage,
            id: operation.id,
          });
          failed++;
        }
      }

      return {
        results,
        summary: {
          total: input.operations.length,
          successful,
          failed,
        },
      };
    },
  });
}

// ============================================================================
// File Upload Utilities
// ============================================================================

export interface FileUploadConfig {
  maxFileSize: number; // in bytes
  allowedTypes: string[];
  maxFiles: number;
}

export const createFileUploadSchema = (config: FileUploadConfig) =>
  z.object({
    files: z
      .array(
        z.object({
          name: z.string(),
          type: z.string(),
          size: z.number().max(config.maxFileSize),
          data: z.string(), // base64 encoded
        })
      )
      .min(1)
      .max(config.maxFiles),
    metadata: z.record(z.unknown()).optional(),
  });

export const defaultFileUploadConfig: FileUploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  maxFiles: 5,
};

// ============================================================================
// Export Types
// ============================================================================

export type {
  BulkOperation,
  BulkOperationResponse,
  BulkOperationResult,
  FileUploadConfig,
};
