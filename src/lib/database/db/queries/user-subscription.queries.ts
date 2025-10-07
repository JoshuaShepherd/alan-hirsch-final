/**
 * User Subscription Query Module
 * Pure DB I/O operations for user subscriptions with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { userSubscriptions } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type UserSubscriptionRow = typeof userSubscriptions.$inferSelect;
export type NewUserSubscriptionRow = typeof userSubscriptions.$inferInsert;

// ============================================================================
// USER SUBSCRIPTION QUERY FUNCTIONS
// ============================================================================

/**
 * List user subscriptions with pagination and filtering
 */
export async function listUserSubscriptions(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: UserSubscriptionRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get user subscription by ID
 */
export async function getUserSubscriptionById(
  ctx: Ctx,
  id: string
): Promise<UserSubscriptionRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new user subscription
 */
export async function createUserSubscription(
  ctx: Ctx,
  input: NewUserSubscriptionRow
): Promise<UserSubscriptionRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update user subscription by ID
 */
export async function updateUserSubscription(
  ctx: Ctx,
  id: string,
  patch: Partial<UserSubscriptionRow>
): Promise<UserSubscriptionRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete user subscription by ID
 */
export async function deleteUserSubscription(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getUserSubscriptionById;
export const list = listUserSubscriptions;
export const create = createUserSubscription;
export const update = updateUserSubscription;
export const remove = deleteUserSubscription;
