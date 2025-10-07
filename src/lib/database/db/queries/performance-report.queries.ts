/**
 * Performance Report Query Module
 * Pure DB I/O operations for performance reports with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { performanceReports } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type PerformanceReportRow = typeof performanceReports.$inferSelect;
export type NewPerformanceReportRow = typeof performanceReports.$inferInsert;

// ============================================================================
// PERFORMANCE REPORT QUERY FUNCTIONS
// ============================================================================

/**
 * List performance reports with pagination and filtering
 */
export async function listPerformanceReports(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: PerformanceReportRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get performance report by ID
 */
export async function getPerformanceReportById(
  ctx: Ctx,
  id: string
): Promise<PerformanceReportRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new performance report
 */
export async function createPerformanceReport(
  ctx: Ctx,
  input: NewPerformanceReportRow
): Promise<PerformanceReportRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update performance report by ID
 */
export async function updatePerformanceReport(
  ctx: Ctx,
  id: string,
  patch: Partial<PerformanceReportRow>
): Promise<PerformanceReportRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete performance report by ID
 */
export async function deletePerformanceReport(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getPerformanceReportById;
export const list = listPerformanceReports;
export const create = createPerformanceReport;
export const update = updatePerformanceReport;
export const remove = deletePerformanceReport;
