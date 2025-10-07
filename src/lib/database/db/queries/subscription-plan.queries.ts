/**
 * Subscription Plan Query Module
 * Pure DB I/O operations for subscription plans with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { subscriptionPlans } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type SubscriptionPlanRow = typeof subscriptionPlans.$inferSelect;
export type NewSubscriptionPlanRow = typeof subscriptionPlans.$inferInsert;

// ============================================================================
// SUBSCRIPTION PLAN QUERY FUNCTIONS
// ============================================================================

/**
 * List subscription plans with pagination and filtering
 */
export async function listSubscriptionPlans(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: SubscriptionPlanRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get subscription plan by ID
 */
export async function getSubscriptionPlanById(
  ctx: Ctx,
  id: string
): Promise<SubscriptionPlanRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new subscription plan
 */
export async function createSubscriptionPlan(
  ctx: Ctx,
  input: NewSubscriptionPlanRow
): Promise<SubscriptionPlanRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update subscription plan by ID
 */
export async function updateSubscriptionPlan(
  ctx: Ctx,
  id: string,
  patch: Partial<SubscriptionPlanRow>
): Promise<SubscriptionPlanRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete subscription plan by ID
 */
export async function deleteSubscriptionPlan(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getSubscriptionPlanById;
export const list = listSubscriptionPlans;
export const create = createSubscriptionPlan;
export const update = updateSubscriptionPlan;
export const remove = deleteSubscriptionPlan;
