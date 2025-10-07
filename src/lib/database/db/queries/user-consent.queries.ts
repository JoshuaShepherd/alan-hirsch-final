/**
 * User Consent Query Module
 * Pure DB I/O operations for user consents with tenant scoping
 *
 * Inputs: Context with tenantId, userId, role
 * Outputs: Raw Drizzle row types (no DTOs, no mappers)
 */

import { userConsents } from '../schema';
import { Ctx } from './_ctx';

// ============================================================================
// ROW TYPES (from Drizzle schema)
// ============================================================================

export type UserConsentRow = typeof userConsents.$inferSelect;
export type NewUserConsentRow = typeof userConsents.$inferInsert;

// ============================================================================
// USER CONSENT QUERY FUNCTIONS
// ============================================================================

/**
 * List user consents with pagination and filtering
 */
export async function listUserConsents(
  ctx: Ctx,
  params: { page?: number; limit?: number; filter?: Record<string, unknown> }
): Promise<{
  rows: UserConsentRow[];
  total: number;
  page: number;
  limit: number;
}> {
  /* TODO */
  return { rows: [], total: 0, page: 1, limit: 20 };
}

/**
 * Get user consent by ID
 */
export async function getUserConsentById(
  ctx: Ctx,
  id: string
): Promise<UserConsentRow | null> {
  /* TODO */
  return null;
}

/**
 * Create new user consent
 */
export async function createUserConsent(
  ctx: Ctx,
  input: NewUserConsentRow
): Promise<UserConsentRow> {
  /* TODO */
  throw new Error('Not implemented');
}

/**
 * Update user consent by ID
 */
export async function updateUserConsent(
  ctx: Ctx,
  id: string,
  patch: Partial<UserConsentRow>
): Promise<UserConsentRow | null> {
  /* TODO */
  return null;
}

/**
 * Delete user consent by ID
 */
export async function deleteUserConsent(
  ctx: Ctx,
  id: string
): Promise<boolean> {
  /* TODO */
  return false;
}

// Standardized wrapper functions for service layer compatibility
export const getById = getUserConsentById;
export const list = listUserConsents;
export const create = createUserConsent;
export const update = updateUserConsent;
export const remove = deleteUserConsent;
