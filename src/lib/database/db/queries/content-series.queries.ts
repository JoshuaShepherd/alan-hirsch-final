/**
 * Content Series Query Module
 * Pure DB I/O operations for content series with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { contentSeries } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type ContentSeriesRow = typeof contentSeries.$inferSelect;
export type NewContentSeriesRow = typeof contentSeries.$inferInsert;

// ============================================================================
// CONTENT SERIES QUERY FUNCTIONS
// ============================================================================

/**
 * List content series with pagination and filtering
 */
export async function listContentSeries(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: ContentSeriesRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get content series by ID
 */
export async function getContentSeriesById(
  ctx: Ctx,
  id: string
): Promise<ContentSeriesRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new content series
 */
export async function createContentSeries(
  ctx: Ctx,
  input: NewContentSeriesRow
): Promise<ContentSeriesRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update content series by ID
 */
export async function updateContentSeries(
  ctx: Ctx,
  id: string,
  patch: Partial<ContentSeriesRow>
): Promise<ContentSeriesRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete content series by ID
 */
export async function deleteContentSeries(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getContentSeriesById;
export const list = listContentSeries;
export const create = createContentSeries;
export const update = updateContentSeries;
export const remove = deleteContentSeries;
