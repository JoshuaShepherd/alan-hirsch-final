/**
 * API Key Query Module
 * Pure DB I/O operations for API keys with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { apiKeys } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type ApiKeyRow = typeof apiKeys.$inferSelect;
export type NewApiKeyRow = typeof apiKeys.$inferInsert;

// ============================================================================
// API KEY QUERY FUNCTIONS
// ============================================================================

/**
 * List API keys with pagination and filtering
 */
export async function listApiKeys(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{ rows: ApiKeyRow[]; total: number; page: number; limit: number }> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get API key by ID
 */
export async function getApiKeyById(
  ctx: Ctx,
  id: string
): Promise<ApiKeyRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new API key
 */
export async function createApiKey(
  ctx: Ctx,
  input: NewApiKeyRow
): Promise<ApiKeyRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update API key by ID
 */
export async function updateApiKey(
  ctx: Ctx,
  id: string,
  patch: Partial<ApiKeyRow>
): Promise<ApiKeyRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete API key by ID
 */
export async function deleteApiKey(ctx: Ctx, id: string): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getApiKeyById;
export const list = listApiKeys;
export const create = createApiKey;
export const update = updateApiKey;
export const remove = deleteApiKey;
