/**
 * Coupon Query Module
 * Pure DB I/O operations for coupons with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { coupons } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type CouponRow = typeof coupons.$inferSelect;
export type NewCouponRow = typeof coupons.$inferInsert;

// ============================================================================
// COUPON QUERY FUNCTIONS
// ============================================================================

/**
 * List coupons with pagination and filtering
 */
export async function listCoupons(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{ rows: CouponRow[]; total: number; page: number; limit: number }> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get coupon by ID
 */
export async function getCouponById(
  ctx: Ctx,
  id: string
): Promise<CouponRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new coupon
 */
export async function createCoupon(
  ctx: Ctx,
  input: NewCouponRow
): Promise<CouponRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update coupon by ID
 */
export async function updateCoupon(
  ctx: Ctx,
  id: string,
  patch: Partial<CouponRow>
): Promise<CouponRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete coupon by ID
 */
export async function deleteCoupon(ctx: Ctx, id: string): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getCouponById;
export const list = listCoupons;
export const create = createCoupon;
export const update = updateCoupon;
export const remove = deleteCoupon;
