/**
 * Content Queries Contract Tests
 * Ensures all required CRUD functions are exported and have correct signatures
 */

import { describe, expect, it } from 'vitest';
import type { Ctx } from '../_ctx';
import * as contentQueries from '../content.queries';

describe('Content Queries Contract', () => {
  it('should export all required CRUD functions', () => {
    // Type-level check - these should exist
    expect(typeof contentQueries.getById).toBe('function');
    expect(typeof contentQueries.list).toBe('function');
    expect(typeof contentQueries.create).toBe('function');
    expect(typeof contentQueries.update).toBe('function');
    expect(typeof contentQueries.remove).toBe('function');
  });

  it('should have correct function signatures', () => {
    // Mock context for type checking
    const mockCtx: Ctx = {
      tenantId: 'test-tenant',
      userId: 'test-user',
      role: 'admin',
      db: {} as any, // Mock db for type checking
    };

    // These should compile without errors (type-level check)
    const getByIdFn: (ctx: Ctx, id: string) => Promise<any> =
      contentQueries.getById;
    const listFn: (
      ctx: Ctx,
      params?: { page?: number; limit?: number; sort?: string; q?: string }
    ) => Promise<any> = contentQueries.list;
    const createFn: (ctx: Ctx, data: any) => Promise<any> =
      contentQueries.create;
    const updateFn: (ctx: Ctx, id: string, data: any) => Promise<any> =
      contentQueries.update;
    const removeFn: (ctx: Ctx, id: string) => Promise<boolean> =
      contentQueries.remove;

    expect(typeof getByIdFn).toBe('function');
    expect(typeof listFn).toBe('function');
    expect(typeof createFn).toBe('function');
    expect(typeof updateFn).toBe('function');
    expect(typeof removeFn).toBe('function');
  });

  it('should return list envelope with correct structure', async () => {
    const mockCtx: Ctx = {
      tenantId: 'test-tenant',
      userId: 'test-user',
      role: 'admin',
      db: {} as any,
    };

    // This should return the correct structure (type-level check)
    const result = await contentQueries.list(mockCtx);

    // Check that the result has the expected structure
    expect(result).toHaveProperty('rows');
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('page');
    expect(result).toHaveProperty('limit');
    expect(Array.isArray(result.rows)).toBe(true);
    expect(typeof result.total).toBe('number');
    expect(typeof result.page).toBe('number');
    expect(typeof result.limit).toBe('number');
  });
});

