/**
 * Payment Method Query Module
 * Pure DB I/O operations for payment methods with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { paymentMethods } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type PaymentMethodRow = typeof paymentMethods.$inferSelect;
export type NewPaymentMethodRow = typeof paymentMethods.$inferInsert;

// ============================================================================
// PAYMENT METHOD QUERY FUNCTIONS
// ============================================================================

/**
 * List payment methods with pagination and filtering
 */
export async function listPaymentMethods(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: PaymentMethodRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get payment method by ID
 */
export async function getPaymentMethodById(
  ctx: Ctx,
  id: string
): Promise<PaymentMethodRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new payment method
 */
export async function createPaymentMethod(
  ctx: Ctx,
  input: NewPaymentMethodRow
): Promise<PaymentMethodRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update payment method by ID
 */
export async function updatePaymentMethod(
  ctx: Ctx,
  id: string,
  patch: Partial<PaymentMethodRow>
): Promise<PaymentMethodRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete payment method by ID
 */
export async function deletePaymentMethod(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getPaymentMethodById;
export const list = listPaymentMethods;
export const create = createPaymentMethod;
export const update = updatePaymentMethod;
export const remove = deletePaymentMethod;
