/**
 * Content Category Query Module
 * Pure DB I/O operations for content categories with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { contentCategories } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type ContentCategoryRow = typeof contentCategories.$inferSelect;
export type NewContentCategoryRow = typeof contentCategories.$inferInsert;

// ============================================================================
// CONTENT CATEGORY QUERY FUNCTIONS
// ============================================================================

/**
 * List content categories with pagination and filtering
 */
export async function listContentCategories(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: ContentCategoryRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get content category by ID
 */
export async function getContentCategoryById(
  ctx: Ctx,
  id: string
): Promise<ContentCategoryRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new content category
 */
export async function createContentCategory(
  ctx: Ctx,
  input: NewContentCategoryRow
): Promise<ContentCategoryRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update content category by ID
 */
export async function updateContentCategory(
  ctx: Ctx,
  id: string,
  patch: Partial<ContentCategoryRow>
): Promise<ContentCategoryRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete content category by ID
 */
export async function deleteContentCategory(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getContentCategoryById;
export const list = listContentCategories;
export const create = createContentCategory;
export const update = updateContentCategory;
export const remove = deleteContentCategory;
