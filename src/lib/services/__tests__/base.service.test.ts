import { beforeEach, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { ApiError, ErrorCode } from '../../api/error-handler';
import { BaseService } from '../base.service';

// Mock entity for testing
const MockEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});

const MockCreateSchema = z.object({
  name: z.string(),
});

const MockUpdateSchema = z.object({
  name: z.string().optional(),
});

const MockListResponseSchema = z.object({
  data: z.array(MockEntitySchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

// Test service implementation
class TestService extends BaseService<z.infer<typeof MockEntitySchema>> {
  protected entityName = 'TestEntity';
  protected createSchema = MockCreateSchema;
  protected updateSchema = MockUpdateSchema;
  protected responseSchema = MockEntitySchema;
  protected listResponseSchema = MockListResponseSchema;

  async get(ctx: any, id: string) {
    return this.validateResponse({ id, name: 'test', createdAt: '2023-01-01' });
  }

  async list(ctx: any, params?: any) {
    const data = [{ id: '1', name: 'test', createdAt: '2023-01-01' }];
    const response = {
      data,
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    };
    return this.validateListResponse(response);
  }

  async create(ctx: any, input: any) {
    const valid = this.validateCreateInput(input);
    return this.validateResponse({
      id: '1',
      name: valid.name,
      createdAt: '2023-01-01',
    });
  }

  async update(ctx: any, id: string, input: any) {
    const valid = this.validateUpdateInput(input);
    return this.validateResponse({
      id,
      name: valid.name || 'updated',
      createdAt: '2023-01-01',
    });
  }

  async delete(ctx: any, id: string) {
    return { success: true };
  }
}

describe('BaseService', () => {
  let service: TestService;
  const mockCtx = {};

  beforeEach(() => {
    service = new TestService();
  });

  describe('validateCreateInput', () => {
    it('should validate valid input', () => {
      const input = { name: 'test' };
      const result = service['validateCreateInput'](input);
      expect(result).toEqual(input);
    });

    it('should throw validation error for invalid input', () => {
      const input = { name: 123 }; // Invalid type
      expect(() => service['validateCreateInput'](input)).toThrow();
    });
  });

  describe('validateUpdateInput', () => {
    it('should validate valid input', () => {
      const input = { name: 'test' };
      const result = service['validateUpdateInput'](input);
      expect(result).toEqual(input);
    });

    it('should throw validation error for invalid input', () => {
      const input = { name: 123 }; // Invalid type
      expect(() => service['validateUpdateInput'](input)).toThrow();
    });
  });

  describe('validateResponse', () => {
    it('should validate valid response', () => {
      const response = { id: '1', name: 'test', createdAt: '2023-01-01' };
      const result = service['validateResponse'](response);
      expect(result).toEqual(response);
    });

    it('should throw error for invalid response', () => {
      const response = { id: '1', name: 123, createdAt: '2023-01-01' }; // Invalid type
      expect(() => service['validateResponse'](response)).toThrow(ApiError);
    });
  });

  describe('handleDatabaseError', () => {
    it('should handle PostgreSQL unique violation error', () => {
      const error = { code: '23505', constraint: 'unique_name' };
      expect(() => service['handleDatabaseError'](error, 'create')).toThrow(
        ApiError
      );

      try {
        service['handleDatabaseError'](error, 'create');
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).code).toBe(ErrorCode.CONFLICT);
        expect((e as ApiError).statusCode).toBe(409);
      }
    });

    it('should handle PostgreSQL foreign key violation error', () => {
      const error = { code: '23503', constraint: 'fk_user' };
      expect(() => service['handleDatabaseError'](error, 'create')).toThrow(
        ApiError
      );

      try {
        service['handleDatabaseError'](error, 'create');
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).code).toBe(ErrorCode.VALIDATION_ERROR);
        expect((e as ApiError).statusCode).toBe(400);
      }
    });

    it('should handle not found error', () => {
      const error = new Error('TestEntity not found');
      expect(() => service['handleDatabaseError'](error, 'get')).toThrow(
        ApiError
      );

      try {
        service['handleDatabaseError'](error, 'get');
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).code).toBe(ErrorCode.NOT_FOUND);
        expect((e as ApiError).statusCode).toBe(404);
      }
    });

    it('should handle generic error', () => {
      const error = new Error('Something went wrong');
      expect(() => service['handleDatabaseError'](error, 'operation')).toThrow(
        ApiError
      );

      try {
        service['handleDatabaseError'](error, 'operation');
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).code).toBe(ErrorCode.INTERNAL_SERVER_ERROR);
        expect((e as ApiError).statusCode).toBe(500);
      }
    });
  });

  describe('service methods', () => {
    it('should implement get method', async () => {
      const result = await service.get(mockCtx, '1');
      expect(result).toEqual({
        id: '1',
        name: 'test',
        createdAt: '2023-01-01',
      });
    });

    it('should implement list method', async () => {
      const result = await service.list(mockCtx);
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should implement create method', async () => {
      const input = { name: 'new entity' };
      const result = await service.create(mockCtx, input);
      expect(result.name).toBe('new entity');
    });

    it('should implement update method', async () => {
      const input = { name: 'updated entity' };
      const result = await service.update(mockCtx, '1', input);
      expect(result.name).toBe('updated entity');
    });

    it('should implement delete method', async () => {
      const result = await service.delete(mockCtx, '1');
      expect(result).toEqual({ success: true });
    });
  });
});
