/**
 * AI Content Job Queries Contract Tests
 * Ensures all required CRUD functions are exported and have correct signatures
 */

import { describe, expect, it } from 'vitest';
import type { Ctx } from '../_ctx';
import * as aiContentJobQueries from '../ai-content-job.queries';

describe('AI Content Job Queries Contract', () => {
  it('should export all required CRUD functions', () => {
    // Type-level check - these should exist
    expect(typeof aiContentJobQueries.getById).toBe('function');
    expect(typeof aiContentJobQueries.list).toBe('function');
    expect(typeof aiContentJobQueries.create).toBe('function');
    expect(typeof aiContentJobQueries.update).toBe('function');
    expect(typeof aiContentJobQueries.remove).toBe('function');
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
      aiContentJobQueries.getById;
    const listFn: (
      ctx: Ctx,
      params?: { page?: number; limit?: number; sort?: string; q?: string }
    ) => Promise<any> = aiContentJobQueries.list;
    const createFn: (ctx: Ctx, data: any) => Promise<any> =
      aiContentJobQueries.create;
    const updateFn: (ctx: Ctx, id: string, data: any) => Promise<any> =
      aiContentJobQueries.update;
    const removeFn: (ctx: Ctx, id: string) => Promise<boolean> =
      aiContentJobQueries.remove;

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
    const result = await aiContentJobQueries.list(mockCtx);

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
