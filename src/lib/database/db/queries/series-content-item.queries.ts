/**
 * Series Content Item Query Module
 * Pure DB I/O operations for series content items with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { seriesContentItems } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type SeriesContentItemRow = typeof seriesContentItems.$inferSelect;
export type NewSeriesContentItemRow = typeof seriesContentItems.$inferInsert;

// ============================================================================
// SERIES CONTENT ITEM QUERY FUNCTIONS
// ============================================================================

/**
 * List series content items with pagination and filtering
 */
export async function listSeriesContentItems(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: SeriesContentItemRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get series content item by ID
 */
export async function getSeriesContentItemById(
  ctx: Ctx,
  id: string
): Promise<SeriesContentItemRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new series content item
 */
export async function createSeriesContentItem(
  ctx: Ctx,
  input: NewSeriesContentItemRow
): Promise<SeriesContentItemRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update series content item by ID
 */
export async function updateSeriesContentItem(
  ctx: Ctx,
  id: string,
  patch: Partial<SeriesContentItemRow>
): Promise<SeriesContentItemRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete series content item by ID
 */
export async function deleteSeriesContentItem(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getSeriesContentItemById;
export const list = listSeriesContentItems;
export const create = createSeriesContentItem;
export const update = updateSeriesContentItem;
export const remove = deleteSeriesContentItem;
