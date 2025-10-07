/**
 * Movement Metric Query Module
 * Pure DB I/O operations for movement metrics with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { movementMetrics } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type MovementMetricRow = typeof movementMetrics.$inferSelect;
export type NewMovementMetricRow = typeof movementMetrics.$inferInsert;

// ============================================================================
// MOVEMENT METRIC QUERY FUNCTIONS
// ============================================================================

/**
 * List movement metrics with pagination and filtering
 */
export async function listMovementMetrics(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: MovementMetricRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get movement metric by ID
 */
export async function getMovementMetricById(
  ctx: Ctx,
  id: string
): Promise<MovementMetricRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new movement metric
 */
export async function createMovementMetric(
  ctx: Ctx,
  input: NewMovementMetricRow
): Promise<MovementMetricRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update movement metric by ID
 */
export async function updateMovementMetric(
  ctx: Ctx,
  id: string,
  patch: Partial<MovementMetricRow>
): Promise<MovementMetricRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete movement metric by ID
 */
export async function deleteMovementMetric(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getMovementMetricById;
export const list = listMovementMetrics;
export const create = createMovementMetric;
export const update = updateMovementMetric;
export const remove = deleteMovementMetric;
